# AGENTS.md — 多 Agent 工作空间配置

> 这是白纸上（baizhichen-web）的个人 AI 工作空间。
> **本文件是协同规范的唯一完整来源。** ZCode / Codex / OpenCode / QClawd / WorkBuddy / Claude Code 等 Agent 进入此目录时均加载本文件（Claude Code 通过 `CLAUDE.md` 自动加载钩子跳转到这里）。
> `CLAUDE.md`（自动加载钩子）、`README.md`（人类入口）只保留各自独特内容，规范主体一律引用本文件，不在别处重复。

## 工作空间概述

**组成三层次**（按生命周期归属划分，与下方四层内容结构正交——四层说"信息放在哪"，三层次说"东西是什么形态、怎么维护"）：

| 层 | 是什么 | 例 | Agent 操作含义 |
| --- | --- | --- | --- |
| ① 文档与文件夹 | 我们写的全部文本：目录结构、AGENTS.md 链、wiki 卡、notes、脚本 | `studio/`、`bAI/bAI/wiki/`、`ops/scripts/` | 可直接读写；回退靠 git |
| ② 软件 | 独立应用与运行时 | Obsidian、Eagle、DSH、ZCode/Codex 等 harness 本体、Python/Node | 只经 MCP/API/CLI 交互；安装升级须报批 |
| ③ 插件 | 寄生在宿主上的扩展：包、MCP servers、hooks、skills | memorax-code、dotMD、anysearch skill、Eagle MCP server、lark-cli | 可协助安装配置；**必须登记 `ops/components.md` 并做波及分析** |

排障第一步 = 判断问题在哪一层（① git 回退 / ② 重启或重装报批 / ③ 查注册表与健康检查命令）。

四层内容结构：
- **studio/** — 项目层（在做什么）
- **bAI/bAI/** — 知识层（知识库 Obsidian vault，Wiki Schema 见 `bAI/bAI/AGENTS.md`）
- **bAI/bWrite/** — 写作层（写作白板 Obsidian vault，规范见 `bAI/bWrite/AGENTS.md`）
- **ops/** — 运维层（工具 + 运行数据，bridge、日志、统计、报告）

**知识资产双库**（处理知识/素材任务时须知）：
- **bAI vault（文字知识）**：概念/来源/实体/综合卡，检索用 `vault-search` skill（语义检索，优先于翻文件）
- **Eagle 库（设计/视觉素材）**：经 MCP 接入（工作区 `.zcode/config.json` 已配，`http://127.0.0.1:41596/mcp`，31 工具：条目增改查/标签/AI 语义搜索/文件夹管理）。设计类内容的理解、归纳、入库、打标走 Eagle MCP；入库与打标规范见 `studio/projects/eagle-bridge/design.md`

另有辅助目录与运行时目录：
- **ops/scripts/** — 一次性脚本：`content-ingest.py`（CLI 批量入库，`python ops/scripts/content-ingest.py --dump <url>`）、`board-snapshot.mjs`、`clippings-ingest.ps1` 等；与 `ops/services/text-catcher` 的 GUI 捕获互补（历史位置 `tools/` 已于 2026-08-21 并入 `ops/`）
- **ops/services/** — 常驻本地服务：`text-catcher/` / `dsh-remote/` / `dsh-reminder/`（详见 `ops/AGENTS.md`；历史路径 `ops/tools/` 已更名）
- **ops/scripts/prompts/** — 审计等提示词模板（`agents-md-audit.md`）
- **temp/** — 临时文件与中间产物（不入 git）：`archive/`（归档）、`reclip/`（剪藏批处理中间产物）、`lark-cli/`（lark-cli 工作目录）；DSH 运行时缓存（bench-runs/、bench-tools/、dsh-home-test/、dsh-remote-shots/、npm-cache/、pw-browsers/、session-inspect/ 等）随用随清
- **.claude/、.zcode/** — Claude Code / ZCode 以本目录为工作目录时自动生成的运行时目录（配置、计划、技能注册等），均不入 git。**不要删除或移动**，否则可能影响这些工具的运行（`.clawhub/` 曾并列于此，2026-08-18 已归档至 `temp/archive/clawhub-20260818/`——Clawhub 工具已停用，仅留 lock.json 遗迹）
- **`.dsh-vision/`** — dsh-vision-fallback-bridge 插件（`studio/projects/dsh-vision-fallback/`）的运行时上传目录，写 `<workspace>/.dsh-vision/uploads/`（2026-08-18 用户裁决：保留工作区内 + 文档化管理）。`uploads/` 不入 git，但目录内 `AGENTS.md`/`README.md` 说明文件入库——任何 Agent 进入先读它们；不要移动删除本目录，上传文件用完即清
- **ai-homes/** — 各 AI 工具主目录迁入区（claude/ lark-cli/ opencode-* qwen-mm-plugins 等；2026-08-21 迁入）。**内含 token/credentials，已整体 .gitignore，禁止入库、禁止把其中内容复制到库内其他位置或对外发送**；迁移记录见 `bAI/bAI/notes/2026-08-21-ai-homes-migration-notes.md`

## 进入后第一步

读完本文件后按需执行（不需要全读）：

1. 读 `studio/AGENTS.md` — Studio 层协同规范（职责划分、Karpathy 原则、状态恢复）
2. 读 `bAI/bAI/AGENTS.md` — 知识库 Wiki Schema（涉及知识库时）
3. 读 `bAI/bWrite/AGENTS.md` — 写作 vault 规范（涉及写作时）
4. 读 `ops/AGENTS.md` — 运维层说明（涉及运维数据时）
5. 读 `ops/reports/board-snapshot.md` 了解项目进度（有 lark-cli 的环境可刷新，见"项目进度管理"）。**跨项目协作看「管线 / 依赖 / 卡点方」三列**：内容线（youtube-vault-bridge）/ 资产线（eagle-bridge）/ 方法线（Vibe Designing）/ 呈现面（个人网站）的依赖边与卡点归属就在看板本身——依赖边或卡点换手后用 lark-cli 回写对应记录；看板另有「管线全景」「卡点看板」视图与「工作空间总览」仪表盘（甘特图暂未启用——当前无带明确日期的任务，未来日期数据成型后一条 `+view-create` 即可重建）
6. 读 `studio/VIBE-DESIGNING.md` — 工作空间设计规则（涉及 UI/设计工作时；含设计声明六级 `studio/design/`、Design Skill 流程、Evaluator 验收；方法论活文档见 `studio/UI-DESIGN-PRINCIPLES.md`）
7. 涉及 **E 盘个人文件区**（工作空间之外的用户文件）时：先读 `E:\AGENTS.md`（分区地图/不动区红线/批量移动操作规范），找文件用 `E:\FILE-MAP.md` / `E:\file-map.json`（刷新：`node ops/scripts/file-index.mjs`，项目见 `studio/projects/file-map/`）

## 核心规则

- **先读规范再行动。** 进入工作空间先按"进入后第一步"读规范，不凭直觉工作。
- **不要假设。** 不确定就问。多个方案存在时呈现出来，不要自己默默选一个。
- **不要改不该改的。** 每行改动都应追溯到用户的请求。发现无关问题，提出来，不要顺手改。
- **先调研再动手。** 新功能启动前，先问"有没有人做过类似的"，去 GitHub 等平台调研，站在巨人肩膀上。
- **不替人做方向性决策。** 方向性/不可逆的决策必须问人类，即使 AI 有把握。
- **记录而非只在脑子里。** 过程文档写入 `bAI/bAI/notes/`，操作日志追加到 `bAI/bAI/wiki/log.md`。
- **有产出的工作必须立项。** 产出文档、插件、可复用的工作模式、系统性方案等有真正产出的工作，必须在 `studio/projects/<name>/` 建目录（README + AGENTS.md）并在飞书看板登记；临时小事（咨询、单次修改）不必立项。
- **先立项、再写 PRD、评审后才开工。** 有产出项目须按 `立项 → PRD/design.md v0.1 → 人类评审/拍板 → 再写实现代码` 执行；评审通过前只做调研与方案对比，不写/不改实现代码（`studio/projects/<name>/` 内不落实现产物，已拷的第三方源码仅作 `temp/` 调研参照）。
- **收到可引用原文时，反问不要总结。** 先存 `bAI/bAI/raw/`，再引导用户思考。总结给的是知识幻觉。
- **工具调用失败必须上报。** 任何 CLI/API 调用失败（lark-cli、git、node 等）如实上报，不静默降级、不假装成功。这是信任红线。
- **联网检索用 anysearch，不用 web_search。** 本 DSH 环境的 `web_search` 走 DeepSeek 官方搜索，每次按其 `DEEPSEEK_API_KEY` 对应用户在 DeepSeek 平台的余额计费；该账户当前无余额（2026-08-20 起，充值前一直视为不可用）。联网检索一律改用已安装的 `anysearch` skill：工具在 `~/.agents/skills/anysearch`，key 在 `~/.agents/skills/anysearch/.env`。调用用 node / OpenSSL 通道（其 PowerShell 版 CLI 因本机 schannel TLS 故障不可用）。本规则为用户要求，跨会话持续生效。
- **安装与持久性变更必先报批。** 安装软件包（pip/npm/全局工具/系统组件）、注册服务或计划任务、修改防火墙与 ACL、增减开机自启等持久性系统变更，必须先向用户说明「装什么、装在哪、影响什么」，获批后才执行；只读检查与临时进程终止不受此限。
- **操作可回退。** 删除改移动（进 `temp/archive/`）；破坏性操作前确认 git 历史可恢复；改动分主题提交，便于 revert。
- **不轻易写 C 盘。** 新建文件默认只落工作区内；确需写 `C:\...`（用户主目录、系统位置等）时，先向用户说清「写哪、写什么、为什么」并获批再动（沙箱同样拦截，需显式放行）。禁止把中间产物/临时文件随手写进 C 盘。

## 行为约束阶梯

写代码之前，先理解问题（读代码、追流程），然后停在第一个适用的阶梯：

1. 这东西需要存在吗？→ 不需要就跳过
2. 代码库里已经有了吗？→ 复用，不要重写
3. 标准库能做吗？→ 用标准库
4. 原生平台功能能做吗？→ 用原生功能
5. 已安装的依赖能做吗？→ 用已有依赖
6. 一行能搞定吗？→ 就写一行
7. 以上都不行：写最小可用的代码

不偷懒的：理解问题、输入验证、防数据丢失、安全、用户明确要求的。

## 项目进度管理

### 飞书项目看板

- **看板地址**：[飞书项目看板](https://my.feishu.cn/base/URbrbJeWRa9ME4szDt8chJFlnJh?table=tblHQm7JwFc7bxGT&view=vew0rik3TR)
- **base_token**：`URbrbJeWRa9ME4szDt8chJFlnJh`
- **table_id**：`tblHQm7JwFc7bxGT`

### 读取项目进度

**推荐（所有 Agent 可用）**：读本地快照 `ops/reports/board-snapshot.md`；有 lark-cli 的环境用 `node ops/scripts/board-snapshot.mjs` 刷新。

> **Codex/沙箱注意**：lark-cli 已装在 npm 全局（`@larksuite/cli` v1.0.91），但沙箱无法枚举/执行 `AppData\Roaming\npm` 目录——必须用 escalation 运行（建议持久化 prefix rule `["lark-cli"]`）。

有 lark-cli 的环境可直接查询/更新看板（record-list / record-search / record-upsert），命令示例见 `bAI/bAI/notes/2026-08-07-lark-cli-环境与使用方法.md`。

### 更新项目进度

当完成里程碑任务后，**必须**更新飞书看板：

```bash
# 更新项目进度（示例）
lark-cli base +record-upsert --base-token URbrbJeWRa9ME4szDt8chJFlnJh --table-id tblHQm7JwFc7bxGT --record-id <record_id> --json '{"进度":"✅ 完成 OAuth 授权\n📋 下一步：测试消息卡片"}' --as user
```

### 进度更新规则

1. **里程碑更新**：完成重要任务后，更新"进度"字段
2. **状态变更**：项目状态变化时，更新"状态"字段（进行中/计划中/已归档）
3. **规划更新**：调整优先级或新增任务时，更新"描述"字段
4. **辅助记录**：详细过程写入 `bAI/bAI/notes/`，git log 记录代码变更

### 人类视角

- 人类可以在飞书 UI 中直接查看和编辑项目看板
- 飞书看板是项目进度的 **single source of truth**
- git log 和 notes/ 是辅助记录，不是主要状态源

## 飞书 Bot（已停用，2026-08-17 归档）

三个飞书 Bot（Calliope/Clio/Erato，经 ops/bridge 桥接）已停用；完整配置与历史归档于 `studio/projects/feishu-agent-bot/ARCHIVE-2026-08-17-停用归档.md`（看板状态：已归档）。

---

## 用户信息

- GitHub: https://github.com/baizhichen-web
- 称呼: 白纸上
- 背景: 华侨大学工业设计本科毕业，2026 年入读北京师范大学未来设计学院研究生。方向偏硬件产品经理。

### GitHub 访问方式（Agent 可直接使用，不用再问用户）

- GitHub 用户名：`baizhichen-web`
- SSH 私钥：`~/.ssh/id_ed25519_dsh`（**绝不上传、不打印、不写入知识库**）
- SSH 公钥已添加到该 GitHub 账号
- SSH 配置：`~/.ssh/config` 中 `github.com` 使用 `IdentityFile ~/.ssh/id_ed25519_dsh`
- SSH 认证已验证可用：
  ```bash
  ssh -T git@github.com
  # 预期输出：Hi baizhichen-web! You've successfully authenticated...
  ```
- Git 提交身份（本机项目级已配置）：
  ```text
  user.name  = baizhichen-web
  user.email = baizhichen-web@users.noreply.github.com
  ```
- 优先使用 SSH 方式推送/拉取：
  ```text
  git@github.com:baizhichen-web/<repo>.git
  ```

#### GitHub CLI（`gh`）

- `gh` 已安装，并已登录：
  ```text
  Logged in to github.com account baizhichen-web
  Git operations protocol: ssh
  Token scopes: gist, read:org, repo
  ```
- 可直接使用 `gh repo create` / `gh issue` / `gh pr` / `gh release` 等 API 功能。
- **不要向用户索要 GitHub Token / 密码，也不要让用户把 Token 发到对话里。**

#### 已知仓库

- `dsh-vision-fallback-bridge`
  - HTTPS: https://github.com/baizhichen-web/dsh-vision-fallback-bridge
  - SSH: git@github.com:baizhichen-web/dsh-vision-fallback-bridge.git
- `daily-activity-log`（每日产出自动归档，由 18:00 巡检任务提交推送）
  - HTTPS: https://github.com/baizhichen-web/daily-activity-log
  - SSH: git@github.com:baizhichen-web/daily-activity-log.git

---

*本文件不维护手写更新日期（手写必然漂移并制造「已过时」歧义，2026-08 曾因此误判）。变更历史以 git log 为准，操作纪要以 bAI/bAI/wiki/log.md 为准。*
*本文档是多 Agent 工作空间的统一配置，定义了项目状态、Skill 加载、用户信息*
