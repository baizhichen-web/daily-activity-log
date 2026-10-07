# LAYOUT — 目录结构与三层次

> 工作区空间结构与排障分层。由 AGENTS.md 指针表「排障分层/目录语义」分支触发。

## 三层次（按生命周期归属）

与四层内容结构正交：三层次说「东西是什么形态、怎么维护」，四层说「信息放在哪」。

| 层 | 是什么 | 例 | Agent 操作含义 |
| --- | --- | --- | --- |
| ① 文档与文件夹 | 我们写的全部文本：目录结构、AGENTS.md 链、wiki 卡、notes、脚本 | `studio/`、`bAI/bAI/wiki/`、`ops/scripts/` | 可直接读写；回退靠 git |
| ② 软件 | 独立应用与运行时 | Obsidian、Eagle、DSH、ZCode/Codex 等 harness 本体、Python/Node | 只经 MCP/API/CLI 交互；安装升级须报批 |
| ③ 插件 | 寄生在宿主上的扩展：包、MCP servers、hooks、skills | memorax-code、dotMD、anysearch skill、Eagle MCP server、lark-cli | 可协助安装配置；**必须登记 `ops/components.md` 并做波及分析** |

排障第一步 = 判断问题在哪一层（① git 回退 / ② 重启或重装报批 / ③ 查注册表与健康检查命令）。

## 四层内容结构

- **studio/** — 项目层（在做什么）
- **bAI/bAI/** — 知识层（知识库 Obsidian vault，Wiki Schema 见 `bAI/bAI/AGENTS.md`）
- **bAI/bWrite/** — 写作层（写作白板 Obsidian vault，规范见 `bAI/bWrite/AGENTS.md`）
- **ops/** — 运维层（工具 + 运行数据，bridge、日志、统计、报告）

## 知识资产双库

- **bAI vault（文字知识）**：概念/来源/实体/综合卡，检索用 `vault-search` skill（语义检索，优先于翻文件）
- **Eagle 库（设计/视觉素材）**：经 MCP 接入（工作区 `.zcode/config.json` 已配，`http://127.0.0.1:41596/mcp`，31 工具：条目增改查/标签/AI 语义搜索/文件夹管理）。设计类内容的理解、归纳、入库、打标走 Eagle MCP；入库与打标规范见 `studio/projects/eagle-bridge/design.md`

## 辅助目录与运行时目录

- **ops/scripts/** — 一次性脚本：`content-ingest.py`（CLI 批量入库，`python ops/scripts/content-ingest.py --dump <url>`）、`board-snapshot.mjs`、`clippings-ingest.ps1` 等；与 `ops/services/text-catcher` 的 GUI 捕获互补
- **ops/services/** — 常驻本地服务：`text-catcher/` / `dsh-remote/` / `dsh-reminder/`（详见 `ops/AGENTS.md`）
- **ops/scripts/prompts/** — 审计等提示词模板（`agents-md-audit.md`）
- **temp/** — 临时文件与中间产物（不入 git）：`archive/`（归档）、`reclip/`（剪藏批处理中间产物）、`lark-cli/`（lark-cli 工作目录）；DSH 运行时缓存（bench-runs/、bench-tools/、dsh-home-test/、dsh-remote-shots/、npm-cache/、pw-browsers/、session-inspect/ 等）随用随清
- **.claude/、.zcode/** — Claude Code / ZCode 以本目录为工作目录时自动生成的运行时目录（配置、计划、技能注册等），均不入 git；不删不移动（见 AGENTS.md 红线·运行时）
- **.dsh-vision/** — dsh-vision-fallback-bridge 插件的运行时上传目录，写 `<workspace>/.dsh-vision/uploads/`；`uploads/` 不入 git，目录内 `AGENTS.md`/`README.md` 说明文件入库，任何 Agent 进入先读它们；不移动删除，上传文件用完即清（见 AGENTS.md 红线·运行时）
- **ai-homes/** — 各 AI 工具主目录迁入区（claude/ lark-cli/ opencode-* qwen-mm-plugins 等）；内含 token/credentials，已整体 .gitignore，禁止入库、禁止把其中内容复制到库内其他位置或对外发送（见 AGENTS.md 红线·凭证）；迁移记录见 `bAI/bAI/notes/2026-08-21-ai-homes-migration-notes.md`
