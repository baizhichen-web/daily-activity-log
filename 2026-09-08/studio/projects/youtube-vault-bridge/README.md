# youtube-vault-bridge — YouTube 金句直达知识库

> 状态：已实现（fork + vault 导出，待真机验证）· 看板 recvo1O06mwPEN | YouTube→知识库
> 定位：看 YouTube 播客时，把特定时间戳的金句 + 你的批注一键写入 bAI/bAI/raw → wiki/sources，复用现有 Wiki Schema。

## 为什么做

- youtube-digest 能把字幕打成带时间戳的卡片、基于 Supadata 抓字幕、基于 AI 做章节/金句/润色，但笔记只留在 chrome.storage.local，没有落到 vault 的出口。
- 工作空间的入口是 bAI/bAI/raw/ → wiki/sources（transcript 类型），已有 Clippings → clippings-ingest → raw 与 ops/scripts/content-ingest.py → raw 两条链路；需要给视频补一条同构的入口。
- 本项目只做金句粒度，不做整期总结 — 符合深度输入/信息减法的原则：少而精、逐段咀嚼。

## 当前决策（已定）

- 粒度：只收金句片段 + 批注（02:14-03:05 这类卡片级别），不收整期概览。
- 模型：走你已有的 opencode GO 网关 + mimo-v2.5（https://opencode.ai/zen/go/v1），不新增 DeepSeek/Supadata 以外的密钥面。
- 形态：Fork zarazhangrui/youtube-digest 加一个 Export to Vault 出口，产出 raw 可直接 ingest 的 Markdown（方案细节见 PRD）。

## 交付

- extension/ — Fork 后的扩展源码（opencode GO 接入 + Vault 导出）
- PRD.md — 需求与方案（v0.1 已定版）
- AGENTS.md — 项目级 Agent 规范

## 安装（加载已解压的扩展）

1. 打开 chrome://extensions，开启右上角“开发者模式”
2. 点击“加载已解压的扩展程序”，选择本项目的 extension/ 文件夹（需包含 manifest.json）
3. 打开扩展的 Settings，填入：
   - Supadata API key（抓字幕）
   - opencode GO API key（与你现有的 OPENCODE_GO_API_KEY 相同，走 mimo-v2.5）
4. 打开一个带字幕的 youtube.com/watch 视频，点扩展图标打开侧边栏

## 使用

- Transcript 栏（Original/中文/双语均可）：勾选若干段字幕（Shift+点击可连选一段范围）→ 有勾选时 Copy=复制所选的 Vault Markdown、Export=导出所选；无勾选时保持原插件行为（全量字幕）
- Notes 栏：看视频时按 n / 点 📝 收藏的时刻 → 「⬇ 入库」把当前列表（This Video 或 All Notes）导出为一个知识库 Markdown
- **入库直写**：首次点 Export（有勾选）或 ⬇ 入库时会弹出文件夹选择器——选一次 `bAI/bAI/raw`，之后文件直接写入该文件夹（重名自动加 -2 后缀，不覆盖）；取消选择或拒绝授权则回退为浏览器下载，手动移入 raw 即可
- 不依赖 Overview 的 AI 分析；Overview/Notes 保持原功能，不再承担导出

## 验证

- 扩展内：npm test（42 passed）、bash scripts/check-release.sh（22 files）
- 落盘：Clippings → clippings-ingest → raw 已冒烟验证

## 调研参照（不入本目录）

- temp/youtube-digest-src/ — youtube-digest 源码快照（zip 解压，仅作方案对照）
- temp/youtube-digest.zip / temp/youtube-digest-unzip/ — 原始下载产物，随用随清