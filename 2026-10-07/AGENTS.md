# AGENTS.md — 多 Agent 工作空间协同规范

> 白纸上（baizhichen-web）的个人 AI 工作空间。**本文件是协同规范唯一完整来源**：红线每轮生效，细则按下方指针分流至 `CODING_STANDARDS.md` / `LAYOUT.md` / `USER.md` / `PROGRESS.md`；`CLAUDE.md`（自动加载钩子）、`README.md`（人类入口）只保留各自独特内容，规范主体不在这五个文件之外重复。

## 红线（每轮必守）

- **报批**：安装与持久性系统变更（软件包、服务/计划任务、防火墙/ACL、开机自启）前，向用户说清「装什么、装在哪、影响什么」并获批；只读检查与临时进程终止例外。
- **问人**：方向性/不可逆决策必须问人类，即使 AI 有把握；不确定就问，多方案并存时呈现出来，不默默选一个。
- **上报**：工具调用失败（CLI/API）如实上报，不静默降级、不假装成功——信任红线。
- **原文**：收到可引用原文先存 `bAI/bAI/raw/` 再引导用户思考；总结给的是知识幻觉。
- **立项**：真正产出（文档/插件/可复用模式/系统性方案）在 `studio/projects/<name>/` 建目录（README + AGENTS.md）并登记看板；咨询与单次修改例外。
- **评审门**：先写 PRD/design.md v0.1 交人类评审拍板，之后才写实现代码；评审前只做调研与方案对比，`studio/projects/<name>/` 内不落实现产物（第三方源码仅作 `temp/` 参照）。
- **凭证**：`ai-homes/`、`~/.ssh/id_ed25519_dsh` 等 token/credentials/私钥，禁止上传、打印、入库、复制、外发；不向用户索要 GitHub Token/密码，不让 Token 进对话。
- **运行时**：`.claude/`、`.zcode/`、`.dsh-vision/` 等运行时目录不删不移动；`.dsh-vision/uploads/` 用完即清。
- **落盘**：新建文件默认落工作区内；确需写 `C:\`（用户主目录、系统位置）先报批「写哪、写什么、为什么」（沙箱会拦截，需显式放行）；临时文件走工作区 `temp/`。
- **回退**：删除/改/移动先进 `temp/archive/`；破坏性操作前确认 git 历史可恢复；改动分主题提交，便于 revert。
- **追溯**：每行改动都追溯到用户请求；发现无关问题提出来，不顺手改。
- **记录**：过程文档写 `bAI/bAI/notes/`，操作日志追加 `bAI/bAI/wiki/log.md`。
- **看板**：飞书看板是项目进度 single source of truth，完成里程碑必须更新。
- **检索**：`web_search` 与 `anysearch` 均可用——简单事实性检索用前者，垂直领域/批量多查询/抓网页正文用后者。

## 指针（按触发分支取规范，再动手）

| 触发分支 | 目标 |
| --- | --- |
| 工程纪律：写码/改动/提交/新功能调研/联网检索 | `CODING_STANDARDS.md` |
| 排障分层/目录语义/插件登记/bAI+Eagle 双库/temp 与运行时目录 | `LAYOUT.md` |
| 用户背景/GitHub 访问/gh/已知仓库 | `USER.md` |
| 看板读写/里程碑更新/跨项目依赖 | `PROGRESS.md` |
| Studio 协同：人机分工/Karpathy/项目管理/状态恢复 | `studio/AGENTS.md` |
| 知识库/wiki 卡/检索/ingest | `bAI/bAI/AGENTS.md` |
| 写作 vault 规范 | `bAI/bWrite/AGENTS.md` |
| 运维层：服务/bridge/日志/环境变量 | `ops/AGENTS.md` |
| UI/设计工作 | `studio/VIBE-DESIGNING.md` |
| E 盘个人文件区 | `E:\AGENTS.md` 与 `E:\FILE-MAP.md`（刷新 `node ops/scripts/file-index.mjs`） |

*不写手写更新日期；历史以 git log 与 `bAI/bAI/wiki/log.md` 为准。*
