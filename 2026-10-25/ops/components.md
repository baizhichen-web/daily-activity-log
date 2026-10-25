# 外挂组件注册表（Component Registry）

> 本表 = 工作空间「组成三层次」中 **②软件 与 ③插件** 的登记表（①文档与文件夹由 git 管理，无需登记）。
> 三层次定义见根 `LAYOUT.md`（由根 AGENTS.md 指针表分流）；接入形态只允许两种：**SKILL.md**（Agent 主动调用）与 **MCP/本地服务**（协议级集成）；使用政策条目进根/`studio` AGENTS.md，操作细节进各 SKILL.md 或项目文档。
> **新增/升级/变更任何组件时必须更新本表并做波及分析**（哪些 sensor/规范/动线引用了它）。

| 组件 | 功能 | 接入形态 | 版本/锁定 | 健康检查 | 回退方式 | 详细文档 |
| --- | --- | --- | --- | --- | --- | --- |
| **Evolver (EvoMap)** | 工作空间自进化引擎（GEP 基因库：distill 直种/recall 召回/cycle 周期） | CLI 直驱（独立引擎不挑宿主）+ evolution skill | v2.0.23（锁版本；上游混淆发布+转 source-available，升级需重跑回归） | `evolver doctor`；`~/.evomap/assets/genes.jsonl` 行数 | npm uninstall -g + 删 ~/.evomap + 删 _third-party/evolver | domains/evolution-survey.md §六 |
| **MemoraX Code** ⛔ 已停用（2026-09-08） | 跨 harness 经验记忆（hooks 自动捕获 + CLI 检索写入）；P1 观察期判据不达线（真实召回实例仅 2），白纸裁决停用，ZCode hooks 已断 | —（npm/插件/skill/缓存已于 09-08 移除） | — | 不适用 | 归档 `temp/archive/memorax-停用-20260908/`；终判七判据指针见 component-baseline §三 | domains/memory-plan-b-memorax.md |
| **dotMD**（vault-search） ⛔ 已弃用（2026-10-20） | vault 本地语义检索（bge-small-zh + LanceDB）；因索引长期滞后（最后成功 2026-08-24）且维护成本 > 收益，改回 index.md + grep 检索 | CLI skill（已归档） | — | 不适用 | 归档在 `temp/archive/context-audit-20261020/skills/vault-search/`；`~/.dotmd` 数据保留未删 | — |
| **anysearch** ⛔ 已弃用（2026-10-20） | 联网检索；能力已由宿主原生 `web_search` / `web_fetch`（DeepSeek Search/Fetch API）覆盖 | CLI skill（已归档） | 无版本锁定 | 不适用 | 归档在 `temp/archive/context-audit-20261020/anysearch/`，需要时移回 | — |
| **Eagle MCP** | 设计/视觉素材库（31 工具：AI 搜索/条目/标签/文件夹） | MCP http（127.0.0.1:41596/mcp，工作区 config enabled） | server v0.3.1 | initialize 握手 + tools/list | .zcode/config.json disable | studio/projects/eagle-bridge/design.md |
| **Figma MCP** | 设计文件读取与设计→代码上下文（官方远程 Dev Mode MCP；Vibe Designing D8 基础设施前置） | MCP http（https://mcp.figma.com/mcp，OAuth 授权；本地 3845 备选 enabled=false） | 官方远程服务（无本地版本号） | `curl -o /dev/null -w "%{http_code}" https://mcp.figma.com/mcp` → 405 即存活；tools 挂载看新会话 | .zcode/config.json enabled=false | studio/projects/figma-agent-打通/ |
| **lark-cli** | 飞书看板/文档读写（single source of truth 操作面） | npm 全局 CLI | v1.0.95（2026-09-12 升级；`lark-cli update` 一条命令连官方 skills 一起升） | `+record-list` 冒烟 | npm uninstall -g | notes/2026-08-07-lark-cli-环境与使用方法.md |
| **bailian-cli（百炼）** | 阿里云百炼多模态生成：文本（qwen3）/图像（qwen-image/wan2.x）/视频（happyhorse/wan2.6）/Omni 对话/视觉理解，另有知识库 RAG、记忆、Agent 应用、web-search | npm 全局 CLI + 9 个 bailian-* skills（~/.agents/skills/ 与 ~/.claude/skills/、~/.zcode/skills/ 三处同步） | v1.17.1（`bl update` 升级） | `bl --version`；`bl auth status` | npm uninstall -g bailian-cli + 删三处 skills 目录 | bailian.aliyun.com/cli（安装文档）；skills 自带 usage |
| **react-best-practices skill** | React 代码质量清单（Vercel 官方维护）：64 条规则/8 类按优先级，写/改 React 组件后对照检查（组件结构/hooks/无障碍/性能/TS 模式） | 静态 skill（SKILL.md + rules/ 66 文件 + AGENTS.md 汇总；无运行时、无依赖） | 同步自 vercel/vercel-plugin repo skills/react-best-practices（2026-08-30） | 目录存在 + SKILL.md 可读；用 MCP 写代码后人工触发对照 | 删 ~/.agents/skills/react-best-practices/ 目录即卸载 | 本条目；MVP（resume-portfolio web/）验收时启用 |
| **Emil Kowalski 动效 skills ×6** | 动效决策规则（动效权威、sonner 作者）：animate 建动效决策链/review-animations 严审/improve-animations 全库审计/find-animation-opportunities 该不该动/animation-vocabulary 术语/emil-design-eng 主件 | 静态 skill ×6（~/.agents/skills/；无运行时；官方 CLI 装机失败——其内部 git clone 内存爆炸，手动 clone+拷贝完成） | 同步自 emilkowalski/skills repo（2026-08-31，33.6k★ MIT；仓库内另有 apple-design/prototype/pick-ui-library/write-swift/animate-expo 未装） | 目录存在 + SKILL.md 可读；MVP 动效实现/评审时人工触发 | 删 ~/.agents/skills/{六个目录} 即卸载 | studio/design/Skill-装机与使用时机.md；从属条款=已拍动效纪律（G-21 预算线/spring.ts 三档/HIG reduced-motion）优先 |
| **notion skill（自研最小实现）** | Notion 云内容**只读**接入：search 搜页面 / page 读整页 / database 查库 / blocks 读子树（供毕业设计等项目资料调研） | CLI skill（python requests 直连 api.notion.com；**无第三方代码**，token 存本目录 .env） | 手写 v1（2026-09-12；Notion-Version 2022-06-28） | `python ~/.agents/skills/notion/scripts/notion_api.py search "毕业设计"`（需先配 token，且页面须 Share to integration） | 删 ~/.agents/skills/notion/ 目录即卸载（.env 凭据一并删除） | 本条目；首个用途=毕业设计项目页素材调研 |
| **grill skill（Grill Toolkit）** | 方案压力测试工具箱：模式A 无状态盘问（只锐化理解）/ 模式B 盘问+留痕（术语入 `CONTEXT.md`、不可逆决策入 ADR）/ 模式C wayfinder（超大 effort 画决策地图一次解一票）；用户主动触发，AI 不自动调用 | 静态 skill（~/.agents/skills/grill/，SKILL.md 单文件自包含 + README + LICENSE；无运行时、无依赖） | 同步自 KAIXUAN-zhang-bot/grillme-skill（2026-10-06；上游 mattpocock/skills，MIT，来源已核实） | 目录存在 + 三文件与源 diff 逐字节一致；人工喊 `/grill-me` 冒烟 | 删 ~/.agents/skills/grill/ 目录即卸载 | 本条目；上游全集多数工程 skill 评估为错配不装（writing-for-agents/handoff/retro/wait-what 四项同日已装，见下条） |
| **mattpocock/skills 精选 ×4** | writing-for-agents（给 agent 写文档的方法论：context load/cognitive load 两预算、渐进披露判据、leading words、禁令反噬）/ handoff（会话压缩成交接文档，带「建议技能」段+敏感信息脱敏）/ retro（会话后复盘 agent 环境本身，最严重优先）/ wait-what（对方消息没落地时按术语表重讲） | 静态 skill ×4（~/.agents/skills/ 下四目录；上游原版英文整目录拷贝、未改写；无运行时无依赖） | 同步自 mattpocock/skills（2026-10-06；MIT） | 四目录存在 + 与源 `diff -r` 一致（仅多 LICENSE）；人工喊 wait-what / handoff 冒烟 | 删 ~/.agents/skills/{四目录} 即卸载 | 本条目；grilling 家族由 grill skill 覆盖，上游对应 5 件不重复装 |

*波及（2026-08-28）：lark-cli 1.0.61→1.0.91 升级。破坏性变更：①`+record-batch-create --json` 结构由 `{"fields","rows"}` 改为 `{"create_records":[字段映射]}`（已修 `ops/scripts/daily-scan-push.mjs`、`daily-event-scan.mjs`）；②不带 `+` 前缀的连字符子命令（如 `record-list`）已移除，一律用 `+shortcut`；③`docs +update --command str_replace` 参数由 `--old/--new` 改为 `--pattern`+`--content`（仅 bridge 归档提示词引用，未改）；④`+record-search --filter-json` 结构改为 `{"logic","conditions":[[字段,操作符,值]]}`（仅 bridge 归档代码引用，未改）。`--as user` 身份参数不变；看板读写主链路（board-snapshot.mjs / +record-upsert）验证通过。*
*波及（2026-08-26）：新组件零既有引用，新增能力面无冲突；政策未定（多模态生成任务是否强制走 bl 待用户裁决）；bailian-web-search 与 anysearch 政策（强制）并存不替代（anysearch 于 2026-10-20 退役归档）；产出图/视频可进 Eagle 库（与 eagle-bridge 协同）。*
*波及（2026-09-12）：①lark-cli 1.0.91→1.0.95（白纸批准，`lark-cli update` 连官方 skills 一并更新）；升级后复验 docs +fetch/+create 正常，看板链路（board-snapshot.mjs / record-upsert）未动。②新增 notion skill（自研只读，非下载第三方）：零既有引用、无 MCP 配置变更、无重启要求；凭据红线=token 只存 skill 目录 .env，不入 git、不外发；只暴露 search/page/database/blocks 四个只读命令，无写面。*
*波及（2026-10-06）：新增 grill skill（白纸批「先只装 grill」）。零既有引用——无 sensor/规范/动线指向它，触发完全靠用户喊话；与工作空间交互定式（一次一问带默认答案/事实自查/决策权归用户）同源，属纪律产品化而非新能力面。上游 mattpocock/skills 全集评估=多数工程 skill（TDD/triage/PR 等）与工作空间错配不装，四项精选同日安装见下条。⚠️上游 scripts/link-skills.sh 为维护者 dev 脚本（symlink 全仓库进 ~/.agents/skills 与 ~/.claude/skills 且会 rm -rf 目标同名真实目录），本机禁用。ZCode 技能列表新会话加载后可见。*
*波及（2026-10-06②）：按白纸「值得单独装的 4 个都装了」安装 writing-for-agents / handoff / retro / wait-what（上游原版英文整目录拷贝，含被引用的 SKILL-MECHANICS.md 与 agents/openai.yaml；未翻译未改写以保持对上游可 diff 更新）。零既有引用、无 MCP 配置变更、无重启要求；与同日 grill skill 零重叠（grill 管「盘问」，本批管「文档/交接/复盘/重讲」）。若白纸要求中文触发需另行翻译并脱离可 diff 性，待其裁决。*
*波及（2026-10-20，审计第 3 组）：vault-search/dotMD、notion、claude-api、pixso×5、superdesign、qwen-mm-plugins-api 退役归档，统一移到 `temp/archive/context-audit-20261020/skills/`；Superdesign 用户配置移到 `temp/archive/context-audit-20261020/superdesign/config.json`。文档同步：AGENTS.md（ai-homes 禁同步）、LAYOUT.md（vault 检索 + Eagle 可用性）、README.md（插件示例）、bAI/bAI/AGENTS.md（Query 改 index+grep）、studio/AGENTS.md（检索与分流）、studio/projects/读书电子化/AGENTS.md、PROGRESS.md（lark-cli 可直接执行）、studio/design/Skill-装机与使用时机.md。*
*波及（2026-10-20）：anysearch 退役——能力已由 DeepSeek Search/Fetch API（宿主原生 `web_search` / `web_fetch`）覆盖。处置：①skill 目录归档 `temp/archive/context-audit-20261020/anysearch/`（含 `.env` key，随目录保留）；②改写根 AGENTS.md、CODING_STANDARDS.md、studio/AGENTS.md、README.md、LAYOUT.md，以及 future-design-edu-research 的 AGENTS/README/SESSION-PROMPT/HANDOFF 与陶瓷项目启动提示词；③无 MCP、服务、重启变更。*

1. **波及分析前置**：新组件上线 = 输出影响清单（sensor/规范/动线/AGENTS 政策表）并逐项处置——范例：vault-search 上线六处补丁（2026-08-24）
2. **政策与操作分离**：AGENTS.md §六 只写「何时必须用/优先级」（强制/优先/分流），SKILL.md 写「怎么用」
3. **健康检查可执行化**：每个组件的检查命令必须是能直接跑的一条命令，纳入周审计 B 节数据源候选
4. **中文 Windows 环境惯例**：凡遇 EIO/路径错误优先排查中文用户名路径（C:\Users\陈柏志\...），解法=HOME/DATA_DIR 类 env 重定向到 ASCII 路径（案例：MemoraX staging、dotMD graphdb）

---
*建表：ox-alpha，2026-08-24。维护者：全体 Agent（变更时更新本表为收尾动作之一）。*


## 2026-10-05 · Cloudflare Agent Setup（白纸指令，来源 developers.cloudflare.com/agent-setup/prompt.md）
- **skills（全局，~/.agents/skills/）**：cloudflare / cloudflare-email-service / cloudflare-one / cloudflare-one-migrations / nextjs-on-cloudflare / workers-best-practices / wrangler —— 经 `npx -y skills add cloudflare/skills --skill '*' --yes --global` 安装，安装时 wrangler 子技能报「PromptScript 不支持全局安装」警告（其余成功）。
- **MCP（工作区 .zcode/config.json）**：cloudflare / cloudflare-docs / cloudflare-bindings / cloudflare-builds / cloudflare-observability 五个 http 型 server（docs 免鉴权，其余 OAuth）。⚠️下次 ZCode 重启才加载（MCP 静默丢弃老毛病，重启后到 Settings→MCP 核对）。
- **未装**：官方 beta `cf` CLI（doc 说可选、先问用户；wrangler 4.147 已在用，避免重复工具面）。
- 波及：ZCode 用这些 skills/MCP 操作 Cloudflare（Worker/Pages/R2 等）；首例消费=job-search 的 baizhi-analyzer 中转（详见 studio/projects/job-search/worker 与 analyzer-pages/）。
