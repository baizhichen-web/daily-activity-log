# dsh-vision-fallback 设计文档

> 状态：v0.3（2026-08-15）。方向已按用户诉求修正：**模型自主调用多模态能力**（非 harness 自动切换）。选型：Qwen-MM-Plugins（用户决策，大厂出品）。落地步骤 1–5 已完成，待重启 DSH 实测。

## 1. 目标与非目标（v0.2 修正）

**目标**：DeepSeek V4 PRO/FLASH（纯文本主模型）在遇到图片、设计、读图等需要多模态的场景时，**自主调用多模态模型**（引擎：opencode GO 网关的 mimo-v2.5），拿到文字分析后继续用 DeepSeek 推理。

**非目标**：
- ~~harness 检测图片自动切换模型~~（v0.1 方向，已放弃）
- 为纯文本模型"变出"原生视觉（模态是模型能力）
- 音频/视频理解（GO 网关无 Omni 模型，见风险表）

## 2. 参考调研（2026-08-15，用户提供）

| 项目 | 机制 | 与 DSH 的契合 |
|---|---|---|
| [asuojun/claude-vision-skill](https://github.com/asuojun/claude-vision-skill) | Skill + vision.js：模型跑脚本，读图（路径/URL/剪贴板）→ base64 → OpenAI 兼容视觉 API → 返回文字 | 模式正确但脚本式；备选方案 |
| [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | Skill + MCP server 全家桶；**文档含 DeepSeek Harness 手动接入教程**（`$DSH_HOME/skills` + `dsh-mcp-client`，rc.6 验证） | **选定方案**（大厂出品，架构完整） |

两个仓库 clone 在 `temp/vision-refs/`（不入 git）。

## 3. 选定方案：Qwen-MM-Plugins api 能力 + opencode GO 引擎

### 3.1 关键事实（从源码/文档确认）

- api 能力（`qwen-mm-plugins-api`）提供 `vision_chat` / `ocr` / `grounding`（VL，OpenAI 兼容端点）与 Omni 音频/视频工具
- **引擎可换**：`DASHSCOPE_BASE_URL` 覆盖端点、`QWEN_MM_API_VL_MODEL` 覆盖默认模型（默认 qwen3.7-plus）、每次调用还可显式 `model` 参数
- → 配置指向 `https://opencode.ai/zen/go/v1` + `mimo-v2.5`（pi-ai 0.82 目录确认其 input=[text,image]）即可用现有 OPENCODE GO 订阅，**零新增密钥**
- `vision_chat` 接受本地路径/URL，返回**文本** → 不受"DSH 丢弃 MCP 媒体块"限制（该限制只影响 image/audio/resource 块）
- core 能力（本地读图/可视化，无 key）输出 image 块 → DSH 丢弃（模型看到 content discarded）→ 仅用于本地准备（crop/save_view 写盘后交给 vision_chat）
- Windows：官方仅验证 Ubuntu WSL2；原生 Windows 需手动方式（skill 复制 + cordis.patch.yml），依赖 `uv`/uvx

### 3.2 架构

```
DeepSeek (主模型)
  │ 看到图片路径/URL 或用户发图（附引用）
  ├─▶ skill 目录提示（$DSH_HOME/skills/qwen-mm-plugins-api）
  ├─▶ 调用 MCP 工具 vision_chat(images=[...], prompt=...)
  │        │
  │        ▼  dsh-mcp-client (stdio) → uvx → qwen-mm-plugins-api MCP server
  │        ▼  HTTP POST {DASHSCOPE_BASE_URL}/chat/completions
  │               model = mimo-v2.5（QWEN_MM_API_VL_MODEL）
  │               key = OPENCODE GO key（共享 config 文件，非 env——DSH 过滤传给 MCP 子进程的凭据 env）
  │        ◀── 文字分析（文本块，DSH 可传递）
  ◀─ 拿到分析继续推理
```

### 3.3 配置清单（`~/.qwen-mm-plugins/config`，权限 600）

```text
DASHSCOPE_API_KEY=<opencode GO key，与 .credentials.yaml 的 OPENCODE_GO_API_KEY 相同>
DASHSCOPE_BASE_URL=https://opencode.ai/zen/go/v1
QWEN_MM_API_VL_MODEL=mimo-v2.5
```

注意：DSH 会过滤传给 MCP 子进程的凭据类环境变量（manual_harnesses.md 明示），所以用共享 config 文件而非环境变量。**key 不写入任何项目/知识库文件**。

### 3.4 DSH 接入步骤（manual_harnesses.md "DeepSeek Harness" 一节）

1. 安装 `uv`（uvx 运行 MCP server）：`pip install uv` 或 winget
2. clone Qwen-MM-Plugins 到稳定 tag（`qwen-mm-plugins-api-v<version>` 不可变 tag）
3. 复制 skill：`$DSH_HOME/skills/qwen-mm-plugins-api`（+ 可选 `-core`）
4. 写共享 config（3.3）
5. `$DSH_HOME/profiles/web/cordis.patch.yml` 追加 dsh-mcp-client 条目（stdio + uvx 命令，manual_harnesses.md 有现成模板）
6. 重启 DSH → 新会话 → 发图/给路径实测

### 3.5 工具面（模型可见）

- 可用：`vision_chat`（单/多图、视频帧，本地路径或 URL）、`ocr`、`grounding`（返回归一化框，可配合 core 的 draw_bbox 标注）
- 不可用（GO 引擎下）：Omni 音频/视频工具（`omni_*`）、`transcribe_audio`、`segmentation`——模型非 Omni，GO 网关无对应模型；如未来需要，另配 DashScope key 启用
- core 的 read_image 输出对 DSH 模型不可见（媒体块丢弃），但 crop/save_view 可用于准备图片

### 3.6 落地记录（2026-08-15）

- uv 已装到 `~/.local/uv/bin`（`uv` / `uvx` 0.12.5）；DSH MCP 配置使用该绝对路径
- 已 fetch Qwen-MM-Plugins tag 并 checkout `qwen-mm-plugins-api-v1.0.3`
- 已复制 api skill 到 `~/.dsh/skills/qwen-mm-plugins-api`（core 未装，保持最小面）；本机 skill 副本已标注仅 VL 工具可用，Omni/ASR/segmentation 勿用（⚠️项目已于 2026-10-25 归档，该部署路径未落地，此为历史方案记录）
- 已写共享配置 `~/.qwen-mm-plugins/config`（仅当前用户可读写）：
  - `DASHSCOPE_BASE_URL=https://opencode.ai/zen/go/v1`
  - `QWEN_MM_API_VL_MODEL=mimo-v2.5`
  - `DASHSCOPE_API_KEY` 来自 `~/.dsh/.credentials.yaml` 的 `OPENCODE_GO_API_KEY`（值不写入本文件）
- 已在 `~/.dsh/profiles/web/cordis.patch.yml` 追加 `mcp-qwen-mm-plugins-api`（dsh-mcp-client，stdio + uvx；`PYTHONIOENCODING=utf-8` 避免 GBK 输出问题）
- 已用 openai SDK 直连 GO 端点验证：`mimo-v2.5` 返回 HTTP 200、`content` 为文本
- 已用 MCP stdio initialize 握手验证：`qwen_mm_plugins_api` v1.0.3 正常响应（仅提示 ffmpeg 缺失，不影响 VL）
- 已调研 GitHub 插件 `loudMore/dsh-drop-to-path` 与 `Anionex/dsh-vision-toolkit`，吸收“上传→路径”思路，未安装第三方插件
- 已自研轻量插件 `dsh-vision-fallback-bridge`：
  - 源码：`studio/projects/dsh-vision-fallback/dsh-vision-fallback-bridge/`
  - 已安装到 `~/.dsh/profiles/web/node_modules/@dsh-external/dsh-vision-fallback-bridge`
  - 已在 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles` 加入 `@dsh-external/dsh-vision-fallback-bridge`
  - 图片 + 常见文档上传后保存到 `<workspace>/.dsh-vision/uploads/`，发送时以 `[图片]` / `[文件]` 路径清单交给 DeepSeek
  - 未引入 vision-toolkit / Python runtime / manifest.json，保持轻量
- 待办：重启 DSH → 新会话 → 直接粘贴/拖入图片和文件实测

## 4. 验证方案

1. MCP 连接验证：`lark-cli` 无关；DSH 会话里直接问"列出 MCP 工具"或发图触发
2. 功能验证：新会话 → 给本地图片路径 → 要求描述/OCR → 应看到模型调用 vision_chat 且返回 mimo-v2.5 的分析
3. 回归验证：纯文本对话应完全走 deepseek，无 MCP 调用
4. 失败路径：MCP server 未起 → 工具调用报错应点名 server（如实上报，不静默）

## 5. 风险与待确认

| 项 | 说明 |
|---|---|
| ~~opencode GO 网关对 mimo-v2.5 图片请求的接受度~~ ✅ | **已通过**（2026-08-15，GUI 发图实测成功） |
| Windows 原生环境 | 官方仅验证 WSL2；uvx + stdio MCP 在原生 Windows 预计可行，需实测 |
| DSH 版本 | Qwen 文档以 rc.6 验证；本机 checkout 为 rc.5，机制应一致（skill-filesystem + dsh-mcp-client 均在） |
| Omni/音频 | GO 引擎下不可用；后续可选 DashScope 补齐 |
| key 安全 | 共享 config 文件权限 600；不进 git、不进知识库 |