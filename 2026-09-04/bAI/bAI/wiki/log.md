# Log

> 操作日志（倒序，最新在前）。每条一行摘要。

## [2026-09-04] 看板巡检 | 追认 — 变更 2 项、提案 0，详细 → ops/reports/board-reviews/2026-09-04.md
- ⚠️ 09-03 巡检漏跑（本月第 4 个漏跑日）；追认当日看板变更：开学季规划三任务进展（自传素材 6+1 入库/清单过三关/行程已排/招行卡并入 9-6）、新增消息桥 recvu906Rmc49i（P1，PRD 待评审 D1-D7，卡点方=用户）
- 佐证：09-03 微信消息调研笔记、09-02 晚 raw 素材批 6 篇、消息桥目录三件齐全——全部吻合
- vault 索引后台执行中（内存 3.06GB 达标启动）；无提案无滞留

## [2026-09-02] 操作 | 银行卡办理须知 + 综测细则入库
- 白纸提供两份入学材料：①招行卡办理须知（9/13 前开卡激活，研究生窗口 9/6-8，办卡点已并入 9/6 报到日日程描述）②未来设计学院研究生综合评价细则（2026-06 实施，党员发展综合评价体系+附件计分表）——均存 raw/（PDF 原件复制入 raw），要点解析成「研一努力方向对照表」in studio notes
- 综测要点：论文核心 15 分（最大杠杆）/竞赛/绩点×10%/志愿 20h=10 分/学生工作岗位/集体活动缺席≥3 暂缓=红线

## [2026-09-02] 操作 | 个人事迹原文入知识库（6 篇 raw + 实体卡陈柏志）
- 白纸要求个人事迹文章进知识库便于通读：raw 新增 6 篇（一代人的小店/入党自传2025/成长报告2024/先进事迹-国奖/榜样在身边-推送稿/榜样在身边-基本信息表），全部提取自 E 盘 college 原件并带 frontmatter
- 新建 wiki/entities/陈柏志.md（基本信息+材料双链+时间线+待办），index.md 追加 entities 分类；log 记档
- 教训入库：docx 经 Git Bash 管道查看中文显示乱码（曾误判"WPS 加密"），python 直读正常——今后 docx 一律 python 提取

## [2026-09-02] 看板巡检 | 待确认 — 新增 2 项、提案 0，详细 → ops/reports/board-reviews/2026-09-02.md
- 快照刷新成功（39→41）：新增开学季规划（recvtYye1BVt5j，P1）、读书电子化（recvtYyfETvb3R，P1 内容线）——目录与笔记全佐证，卡点已记板内
- ✅ hero-board.png 滞留 9 天问题今日自消（已不在根目录）；今日零提案，守则 v2 首个零打扰日
- ⏭️ vault 索引高负载 25 分钟未完成被中断（内存 3.87→2.7GB，连续三日异常）；主仓库 push HTTPS 代理不通 → 一次性 SSH 推送成功（e73020d），未改动仓库配置

## [2026-09-02] 操作 | 证件核对收口 + 离闽行程排日程
- 白纸确认研究生证件：通知书/学历学位证原件/团员证+介绍信已备好；蓝底照片+身份证随行李；复印件到校再办；户口不迁拍板→ 入学清单核对单 6/7 勾选完成，看板任务②更新
- 离闽日期=9-5：四段出行排飞书日程（09:00 大巴→10:38 G1609→13:56 广州南中转→14:21 动车→15:19 抵珠海，各段原生提醒 30/20/5/5min）；⚠️ 9-5 当天 19:00 为自传截止日（全天在路上，已提示先交或到后即交）
- 读书电子化看板/README 更新：离闽=9-5，3 天窗口四书全录不现实→待拍板先录哪本

## [2026-09-01] 操作 | 入学清单抓取转录 + 报到/典礼排日程
- 白纸转发北师学工《2026级新生入学清单》（图排版：浏览器抓 20 张原图 → B.AI vision-exp 转录）；全文存档 bAI/bAI/raw/2026-09-01-入学清单-北师学工.md，原图 temp/reclip/2026-09-01-入学清单/
- 校历关键日期已排飞书日程+原生提醒：9-6 珠海校区研究生新生报到日（24h/2h 前）、9-9 开学典礼（24h/1h 前）；看板开学季规划挂任务②
- 待与白纸逐项核对清单；离闽日期/户口迁移待拍板

## [2026-09-01] 操作 | 开学季任务① 个人自传登记（看板+日历+raw 存档）
- 白纸转发班主任通知：9-5 19:00 前交《个人自传》（1500~2000 字）至 zhanzhenyu@bnu.edu.cn，命名《个人自传+姓名+学号》；已挂入开学季规划描述（任务①）+ 建飞书日程事件「个人自传提交截止」（提醒 24h/3h/30min 前）+ 原文存档 bAI/bAI/raw/2026-09-01-个人自传-班主任通知.md
- 下一步：等白纸写作；AI 提供框架/素材提炼/字数校验

## [2026-09-01] 操作 | 开学季立项：两新项目 + 晨间提醒上线
- 白纸汇报开学安排，拍板两项目分开立：**开学季规划**（recvtYye1BVt5j，个人成长/进行中/P1）+ **读书电子化**（recvtYyfETvb3R，知识管理·内容线/进行中/P1，08-28 挂起议案正式立项）；两者 studio/projects/ 目录（README+AGENTS）已建
- 提醒机制：飞书日历原生提醒（事件创建时自带）+ 每日 9:00 晨间提醒 Cron（automation-abe11f27，分层授权：L1 只读 + L2 仅发消息到「自动化通知」群，不写看板不改文件）
- 下一步：等白纸汇报开学事项清单与离闽/报到日期 → 挂任务 + 排日程

## [2026-09-01] 看板巡检 | 待确认 — 变更 3 项、提案 1 携带（⚠️ 9 天），详细 → ops/reports/board-reviews/2026-09-01.md
⚠️ 滞留裁决 1 项（hero-board.png，最快已挂 9 天，详见当日报告）
- 快照刷新成功（39 条不变）：design-system 进度 10→60（L1/L2 交付）、网站 M2 待办划掉（✅ 提案闭环）、dsh-project-board 描述澄清（✅ 挂 10 天矛盾解决）——5 笔提交零漂移
- 守则 v2 首运行：内存 1.48GB < 3GB → vault 索引按规则跳过（仍停 387/3749，缺 ~11 文件待空闲补跑）；飞书触达组已就绪
- 剩余滞留：仅 hero-board.png 去留（第 9 天）

## [2026-09-01] 操作 | 飞书触达通道修正：p2p 自聊改私密单人群
- 首轮测试消息发送成功（im +messages-send 自 open_id，ok:true 有 message_id），但白纸反馈飞书看不到——实查：发给自己的 p2p 会话在客户端单聊列表无从发现（列表只显示审批/云文档/助手等外部 p2p）
- 修正方案：chat-create 建私密单人群「自动化通知」（oc_748101c9fa6326c2df919bf2b98eb5b1，仅本人一个成员，owner=本人），消息发群里必定可见；群内就绪测试消息已送达
- 两条 Cron 守则⑤触达目标已从 --user-id 改为 --chat-id oc_748101c9fa6326c2df919bf2b98eb5b1
- 教训：自动化记事道优先用「私密单人群」，不用「发给自己的 p2p」（客户端不显示）

## [2026-09-01] 操作 | 安全守则 v2：白名单制改分层授权 + 飞书触达链路启用
- 白纸指出：白名单制切断了自动化 git 写能力 → 自我优化回路断裂（周审拟新增规则永远无法落盘）。定调：不禁止，要保守 + 需要主动触达
- 守则 v2 落地两条 Cron：L1 只读任意 / L2 低危写无条件允许（报告·log·索引·daily 推送）/ **L3 中危写=自我优化通道**（巡检：主仓库主题提交白名单路径；周审：台账 open-items·pitfalls·rules 直接落盘+主题提交；均要求提交前 status 自查、只含本任务文件、远端 private 可 push）/ L4 高危写禁止（删文件·改规范·写看板·装软件·改配置）
- 飞书触达启用：lark-cli im +messages-send 经 user token（open_id ou_70e083e6c1c15c67aea7484f20d944d1）已实测通；巡检/周审在「有提案/滞留≥7天/失败」时主动推摘要消息，正常则不打扰——解决报告生成了没人看的闭环断链
- 周审新增「已执行写操作清单」收尾节（审计痕迹透明）

## [2026-09-01] 操作 | 自动化守则重写+三优化落地+三项滞留裁决闭环
- 白纸开启完全访问模式 → 提示词首段「无人值守运行守则」重写为「无人值守安全守则」：写操作白名单制（巡检=报告/log/索引/daily-activity 白名单，周审=落盘报告），其余写操作全禁，失败不盲目重试
- 巡检 Cron 三优化：0 漏跑补查（index 缺口→git log/notes 追认进报告）/ 提案滞留≥7 天 log 顶部 ⚠️ 升级标记 / 索引失败先查内存>3GB 重试一次+列出缺失来源名
- 周审 Cron：时间槽 09:00→18:30（错开日巡检半小时，躲早上不在线段）并加漏跑缺口补认证条款
- 三项滞留裁决闭环：dsh-project-board 描述澄清（PLAN-v1 待批不动机器源码，矛盾消除）/ hero-board.png→temp/archive/hero-board-20260901/ / 网站 M2 已随 commit 4dc3d8e 交付在看板划掉（recvo1O06motJG）

## [2026-08-31] 操作 | 每日产出自动归档上线（daily-activity-log 公开仓库）
- 白纸拍板三项：公开 public 仓库 + 当日一切文件（含安全排除）+ 每天 1 次提交；目的=GitHub 热区图持续变绿
- 新建 GitHub 公开仓库 daily-activity-log（默认分支 main），本地 ops/daily-activity/（主仓库 .gitignore 已忽略）；提交身份=baizhichen-web@users.noreply.github.com（计入贡献图）
- 新脚本 ops/scripts/daily-activity-collect.mjs：枚举当日主仓库提交触碰文件+工作区当日 mtime 变更 → 安全过滤（token/credential/.env/.pem/.key/敏感目录）→ 复制到 daily-activity/YYYY-MM-DD/ → MANIFEST+提交摘要 → commit+push；幂等（无变化跳过）
- 18:00 看板巡检 Cron 已追加步骤 8（产出归档提交）；首日种子归档 48 文件已验证推送
- 调试记录：git 输出路径带仓库根前缀（工作区是仓库根子目录）需 stripPrefix；submodule 目录需 isFile 守卫

## [2026-08-31] 看板巡检 | 待确认 — 变更 3 项、提案 1 新增 + 2 携带，详细 → ops/reports/board-reviews/2026-08-31.md
- 快照刷新成功（38→39）：ai-collab-flow（v0.8 转正+卡片目录六屏+v0.9 夜间构建）、Figma-Agent 打通（链路全通/实战验证/测试收官三阶段）、新增 AI native 设计系统（design-system，L1-L5 原子五层，母体 resume-portfolio）——与 5 笔提交零漂移
- ⚠️ 漏跑确认：08-29/30（周末）日巡检未执行、今日周一 09:00 周审也缺席（最新 audit 仍 08-24）——断定客户端不在线时段不触发，建议关注
- ❌ 知识库索引本轮失败：OpenBLAS 内存分配失败（16GB 机 91% 占用已知），索引停在 387 文件/3749 chunks，缺最新 2 个来源，建议空闲时段补跑
- 提案 1：网站行 M2（热区数据，commit 4dc3d8e 已交付）未同步，待核实后划掉；携带：dsh-project-board 矛盾第 9 天、hero-board.png 第 8 天

## [2026-08-30] Ingest | refactoring-ui-skill 全文入库（B+C 路线，白纸拍板）
- 五文件合并存档 raw→_archive（47KB 全文照录）；sources 卡建卡打 AIDesigning 标签；AI-Designing 时机表+index 登记
- 白纸决策：不装 skill（防自带现成审美在色调未定时成隐性默认），B=知识库参考 + C=Craft.md 过审时逐条消化（消化后参考降级为出处）
- 从属条款入卡：已定调决策优先；流程类内容不采纳（归 VIBE 1.3）；tokens.css 只作参照不作默认
- 使用时机四场景：MVP 写码/验收诊断/Design.md 过审（建色板方法论）/Craft.md 过审（消化）

## [2026-08-28] 操作 | index.md 截断事故恢复 + 防再发棘轮
- 白纸批准按方案执行：确认 2 增/281 删为全工作区孤例（Write 全量重写中断）；git checkout 恢复 HEAD（c673775，303 行）后 Edit 叠三笔增量——Esther 条、Scott-Fryxell 条、AI-Designing 簇索引条（08-27 丢失重建）
- 预防棘轮落进 bAI/bAI/AGENTS.md「写 wiki 必须同步 index」：index 只用 Edit 增量改、禁 Write 全量重写、改完 grep 抽查、回退靠 git checkout

## [2026-08-28] Ingest | Scott Fryxell《The Harness Is the Thing》
- 英文原文入库：harness=预期与模型能力的支点；三 TUI 共享 skills+AGENTS.md → 模型商品化、零焦虑迁移；planner/worker/critic/promoter 四角色管线+prewalk → 前沿用量降 75%；harness as jig
- 白纸反射已录：工作空间=第二层 harness（工具层之上不变核心层=AGENTS.md/脚本/目录结构）→ 与 AI-Harness.md 两层框架互证；可学清单（promoter 角色/prewalk/artifacts 审计/指令克制/brayness 开源参照）在 sources 卡
- sources 卡+AI-Harness 概念+index 已登记；raw 已归档

## [2026-08-28] 看板巡检 | 待确认 — 变更 0 项、携带提案 1 项，详细 → ops/reports/board-reviews/2026-08-28.md
- 快照刷新成功（38 条不变，01:26 lark-cli 升级会话刷新版之后零变化）；⚠️ 08-27 18:00 巡检漏跑（无报告无索引行，原因待观察）
- vault 索引保鲜：383→387 文件 / 3749 chunks 落盘 ✅；携带裁决仍挂：dsh-project-board 矛盾第 6 天、hero-board.png 第 5 天

## [2026-08-28] 操作 | lark-cli 1.0.61→1.0.91 升级波及处理
- 白纸升级 lark-cli 后全空间排查：修两处脚本（ops/scripts/daily-scan-push.mjs、daily-event-scan.mjs 的 +record-batch-create JSON 由 fields/rows 改 create_records 字段映射）
- 破坏性变更四条已记入 notes/2026-08-07-lark-cli-环境与使用方法.md：+前缀强制、batch-create 结构、docs str_replace 参数、record-search filter 结构；--as user 与 +record-upsert 不变
- 主链路验证通过：+record-list 冒烟 + board-snapshot.mjs 刷新 38 条成功；AGENTS.md / ops/components.md 版本号已同步
- 遗留：ops/bridge（已归档）prompt 含旧结构未改（复活时再修，清单见 ops/components.md 波及条目）；Windows 计划任务 FeishuAgentDailyPush（指向已不存在的 daily-push.cmd 的孤儿任务）经白纸批准已删除

## [2026-08-28] Ingest | Esther不二《为什么你vibecoding的项目很难维护》（AIDesigning #6）
- 小红书视频+逐字稿入库：vibe coding 惊艳初作烂尾维护的根因=AI 默认单文件 HTML；药方=开工先指定 React/Vue+TS+Vite、纯 HTML 旧项目尽早重构、维护目录与模块关系
- 反射：与 resume-portfolio site/(vanilla)→web/(React+Vite+TS) 迁移史后验印证；待办=检索 React Practice 最佳实践清单
- sources 卡+index+AI-Designing 时机表已登记；raw 已归档

## [2026-08-27] 操作 | 建「AI Designing」观点簇（标签+使用时机表）
- 白纸定调：观点类内容存进去更要用出来。新建 concepts/AI-Designing.md 作簇索引：定义 + 使用时机表（每条观点标注何时取用）+ 成员规则（新观点入库打 AIDesigning 标签并登记，使用时机必须具体到场景）
- 首批成员打标 5 页：阿里 Design I/O source、AI-UI契约反向校验 source、Vibe-Designing/设计工程化/UI契约反向校验 concepts
- 两条核心观点当前用途：阿里 Design I/O=正在用（studio/design 六层，Product.md v0.9 即其落地）；契约反向校验=MVP 翻页书实现时直接套（最小可用 UI 先行、逐页真机验收）
- index.md「AI 与创作」分类已加簇索引条

## [2026-08-26] 看板巡检 | 待确认 — 变更 2 项、携带裁决 2 项，详细 → ops/reports/board-reviews/2026-08-26.md
- 快照刷新成功（38 条不变）；更新：实习笔记+简历更新（落地页版落地，62KB gzip 逐屏验收过）、workspace-evolution（进度 0.7→0.85，P2 检索层+P3 核心交付完成）——与 7 笔新提交一一对应零漂移
- ✅ git 分主题提案已闭环（74→22 脏路径，剩余全是网站会话活跃产出）；⚠️ dsh-project-board 矛盾挂第 4 天、hero-board.png 第 3 天，仍待裁决
- 新步骤首跑：dotmd vault 增量索引成功（383 文件/3743 chunks，向量+BM25 落盘）

## [2026-08-26] 配置 | 阿里百炼 provider 扩至 11 模型：DeepSeek + 智谱 GLM 并入
- 「阿里百炼 (DashScope)」provider 新增 deepseek-v4-flash/v4-pro（1M ctx，reasoning off/high/max，抄官方 provider 规格）+ glm-5.3/5.2/glm-5（1M/200K ctx，抄 BigModel 规格）
- 实测：deepseek-v4-flash 与 glm-5.2 走 apps/anthropic 端点均返回标准 thinking+text；compatible-mode /models 全库 241 模型（另含 kimi/minimax/更多 deepseek，未加）
- 现有官方 DeepSeek provider（api.deepseek.com）key 活性验证 OK（3 模型，vision-exp 未注册）；智谱另有 BigModel/Z.ai 官方 provider——百炼版均统一走百炼计费
- 备份 config.json.bak-bailian2-20260826；待重启 zcode 生效

## [2026-08-26] 配置 | zcode 模型设置接入阿里百炼（anthropic 端点，6 模型）
- ~/.zcode/v2/config.json 新增 provider「阿里百炼 (DashScope)」：kind=anthropic，baseURL=https://dashscope.aliyuncs.com/apps/anthropic，apiKey=同一 DashScope key
- 模型：qwen3.6-flash/qwen3.7-flash/qwen3.7-max/qwen3.7-plus/qwen3.8-max（1M ctx）/qwen3-vl-plus（视觉，262K ctx）；reasoning variants off/enabled 默认开
- 实测通过：messages 带 system+tools+thinking 全格式 OK；OpenAI 兼容端点 compatible-mode/v1 亦通（Git Bash curl 中文 payload 会报 body invalid 是编码坑，zcode 走 Node 无碍）
- 备份：config.json.bak-bailian-20260826；providers 权威存储=config.json（sqlite 仅 permission/model.reasoningLevel，无 provider）
- 待办：重启 zcode 后在模型选择器选「阿里百炼 (DashScope)」即可用

## [2026-08-26] 安装 | 阿里云百炼 CLI + skills 接入 zcode（凭据待配）
- 按 bailian.aliyun.com/cli/install.md 全局安装 bailian-cli v1.17.1（npm，55 包）；语言已切 zh-CN
- bl skill init 装 9 个 bailian-* skills 至 ~/.agents/skills（zcode 加载处）与 ~/.claude、~/.zcode skills 三处同步；下次会话可见
- 能力面：text chat / omni / image generate-edit / video generate-edit-ref / vision describe / knowledge RAG / memory / app call / web-search
- 待办：用户配置 API Key（bl auth login --api-key）后即全能力可用；已登记 ops/components.md；zcode 对话模型后端接百炼可选（DashScope Anthropic 兼容端点）未动

## [2026-08-24] 看板巡检 | 待确认 — 新增 2 项、携带提案 1 项，详细 → ops/reports/board-reviews/2026-08-24.md
- 快照 36→38：新增 file-map（个人文件地图，含 08-24 移动批事故结案记录）、workspace-evolution（P1 观察期+P3 Evolution 调研完成）；均有项目目录与笔记佐证，无漂移
- 基线口径修正：16:55 有其他会话刷新过快照，此后对照以「昨日报告状态」为准；多会话共用快照脚本已发生
- 携带：git 堆积 43→74 路径仍零提交（分主题提交提示词沿用 08-23 报告 §5）；dsh-project-board 矛盾、hero-board.png 去留两项待裁决已挂两天，明日周审一并提请

## [2026-08-24] Ops | E盘整理×file-map 项目：根目录640→60项，互文层落地 + 事故复盘
- 三区落地（00_Inbox/90_Media/99_Archive）+ 契约层（E:\AGENTS.md、README、区级说明）+ 索引层（ops/scripts/file-index.mjs → E:\FILE-MAP.md + file-map.json，描述源 studio/projects/file-map/descriptions.json）
- ⚠️ 移动批事故：目标误写为目录本身致覆盖丢失480件（用户裁定结案不追回）；规则固化 batch-move-safety-rules（目标=目录+文件名/先3件试投/循环找空位/manifest先行/小批量）
- 删除批89项（约17GB）经44项清单逐条裁定；确立「链接保护」规则；学院事务(187GB)三轮分类归位
- 详细 → notes/2026-08-24-E盘整理与文件地图.md、temp/organize-e/

## [2026-08-24] 审计 | ZCode周度审计 健康度B — A:15活跃3漂移 B:堆积69+残留3 C:拟2坑 维护:6项待批 → ops/reports/audit/latest.md

## [2026-08-24] Synthesis | AI Agent 自我进化全景调研（deep-research 深度调研）
- 新增 syntheses/2026-08-24-AI-Agent自我进化全景调研：学术脉络（2023 奠基三部曲 Reflexion/Self-Refine/Voyager → 基石 AlphaEvolve/GEPA/era of experience → 综述谱系五篇）+ 工程生态四层（产品 harness/独立引擎/agentskills.io 标准市场 49 万 skill/算法层）+ 评测最薄层判断 + 工作空间五条可移植结论
- 素材复用 domains/evolution-survey（Hermes/Evolver/OpenClacky 三主角 + 争议事件）

## [2026-08-24] 计划 | eagle-bridge 全库整理计划 v1（design.md §9）+ Batch 1 演示完成
- 用户定调：单条三件套（重命名/注释/标签）、整组分类建夹、全库先规划；官方 AI Action 弃用（三动作割裂 + 视觉模型不看图按文件名瞎猜）
- Batch 1：20 样本 item_update 一次写入重命名+注释（标签已有），回读校验通过——现为验收点（Eagle 搜 m25-test）
- 待放行批次：Batch 2 小夹 274 → Batch 3 车 661 → Batch 4 未归档 2567；文件夹结构提案在 Phase A 扫描后出
- 详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-24] Ingest | Agent Memory 赛道与 Harness 理论（P1 调研收官吸收）
- 新增 concepts/AI-Harness、entities/MemoraX、sources ×2（AML 发布、MemoraX Code 实测；raw 原文 08-23 已存）
- 同日支撑产出（notes 层）：能力域对标、Workspace 作为 AI Harness、重设计路线图；studio/projects/workspace-evolution/ 立项，P1 完成 MemoraX 五面接入 + 架构定稿 v0.3（零新增：看板管路由、MemoraX 管经验、notes/L2 管原文）

## [2026-08-23] 决议 | eagle-bridge M2.5 决策门：走 B（Agent 全程打标）
- 对照组官方 AI Action：用户实测"不好用"，20 张样本零标签落库，三问无数据
- 实验组 Agent+MCP：20/20 读图打标成功（4–7 个中文标签/张，含课题级），回读校验通过；质检环节保留（Agent 打标 → 用户抽检）
- m25-test 临时标签暂留审阅入口；决议与样例见 design.md §0.5 实测结果
- 详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-23] 接入 | Eagle 内置 MCP 打通：31 工具实测，ZCode 已注册
- 用户升级后 MCP 内置（无需插件）；端点 http://127.0.0.1:41596/mcp（streamable HTTP），serverInfo v0.3.1
- 工具 31 个：检索/AI 语义搜图/条目写入（增量打标/移动/批注含图片标注）/标签治理（重命名合并+分组六件套）/文件夹——桥所需操作面完备
- ZCode 已注册工作区 .zcode/config.json（mcp.servers.eagle），新会话自动连接；清单回填 design.md §2 实测补录

## [2026-08-23] 看板巡检 | 待确认 — 变更 1 项、提案 1 项，详细 → ops/reports/board-reviews/2026-08-23.md
- 快照刷新成功（36 条不变）；唯一变更：eagle-bridge 描述更新（v0.2.1 + M2.5 决策门），与项目文档/notes 同步落盘，无漂移——yolo 模式下首次无人值守运行顺畅完成
- 提案 1 待确认：git 堆积 43 路径、48h 零提交，巡检回退机制依赖的最新快照未入库，建议分 4 笔主题提交（提示词在报告 §5）
- 观察待裁决：根目录杂散 hero-board.png 去留；08-22 dsh-project-board 描述↔状态矛盾仍未处理

## [2026-08-23] 修订 | eagle-bridge 定位决策门（M2.5）：官方 AI Action 与主卖点重叠
- 白纸上指出 Eagle 5.0 官方内置 AI Action 导入自动打标 + 官方 MCP，PRD「无词表全 AI 打标」卖点正面重叠；按二创红线设 M2.5 决策门
- M2 不变；M2.5 实测官方打标质量后再定收缩方向 A「质检+桥」/ B「维持原方案」；底线价值（双链/上下文分类/结构治理 SOP）A/B 都保留；design.md §0.5 已增补（并修正上轮漏改的 §4 种子标签行与状态头）
- 详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-22] 看板巡检 | 待确认 — 变更 5 项、提案 1 项，详细 → ops/reports/board-reviews/2026-08-22.md
- 快照刷新成功（36 条不变）；5 条状态变更：ai-collab-flow→已暂停、实习笔记+简历更新→进行中、东山岛→已暂停、dsh-project-board→进行中、youtube-cinema-caption→进行中
- 看板管线化新列（管线/依赖/卡点方）已被快照如实带出；判定基线改用「上次巡检后快照」留档对比（昨夜改动未进 git，git diff 会混入）
- 提案 1 待裁决：dsh-project-board 状态「进行中」与描述「PLAN-v1 待批准后开工」矛盾（提示词 1a/1b 二选一在报告 §5）

## [2026-08-22] 机制 | 看板管线化落地：跨会话进度同步收敛到看板
- 用户确认 YouTube Digest / Eagle 联动 / 个人网站三会话实为一条管线；先建 studio/PIPELINE.md 文件板，经用户指出与看板重合，当日迭代为**看板原生管线化**：加「管线/依赖/卡点方」三字段（回填 5 条管线成员）、「管线全景/卡点看板」二视图、「工作空间总览」仪表盘（总数/状态/优先级/卡点方）；快照自动带出新列；PIPELINE.md 归档（temp/archive/）；甘特图试建后按用户裁决删除（无带日期任务，未来需要时一条命令重建）
- 灵感沉淀 → notes/2026-08-22-跨会话记忆分层-痛点与灵感.md（线索进上下文、内容按需取的 L0/L1/L2 分层）

## [2026-08-22] 立项推进 | resume-portfolio 作品集网站提前启动：四项拍板 + 三项前置开工
- 用户裁决：网站为首要任务；公开边界=除 key 全公开、双语 zh/en、定位简洁版、域名待定（其指向的飞书文档实为作品集方式调研，无域名内容，已纳入 §1.4 AI Native 洞察）
- 产出：notes/素材清单.md（内容源盘点，图片大头在 Eagle 30,504 资产待打通）、design/DESIGN-DECLARATION.md v0.1（待评审，评审前不写代码）
- 详细 → studio/projects/resume-portfolio/README.md §2026-08-22

## [2026-08-21] 看板巡检 | 待确认 — 变更 9 项、提案 3 项，详细 → ops/reports/board-reviews/2026-08-21.md
- 快照刷新成功（30→36 条）；更新：YouTube→知识库（转进行中，youtube-vault-bridge）、写作流程优化（画布 v2）、dsh-vision-fallback（Qwen-MM-Plugins 方向）
- 新增：dsh-harness-benchmark、dsh-project-board、youtube-cinema-caption ×2（⚠️重复登记）、eagle-bridge、AIBookMarks
- 提案 3 项当晚经用户批准全部执行：①删影院字幕重复记录 recvsV7ZCFi2kY ②补登记 dsh-workspace-mode（新 record_id recvsWQ2AfggxS）③minimal-v3-preset recvskqB0cN0Fu 改已归档；快照重刷验证通过，改前值留档 temp/board-records-before.json

## [2026-08-21] 开工 | eagle-bridge M2 启动：评审通过（无种子标签），环境侦察完成
- 终审：种子标签也不要，design.md v0.2 定版
- 侦察：Eagle 4.0.0 @ E:\Eagle（需升级，MCP 要求 B12+/5.0 抢先体验）· MCP 插件未装 · 现有库 F:\设计.library 58GB（跨盘迁移需关 Eagle，E 盘余 313G 足够）
- 详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-21] Ingest | UI契约反向校验原则（白纸上经验）+ 设计工程化澄清
- raw 原文照录 → sources/AI-UI契约反向校验原则：AI 是系统工程师非交互工程师，契约层须接受 UI/UX 验收的反向校验、最小可用 UI 先行真机验收；新增 concepts/UI契约反向校验、concepts/设计工程化
- 用户澄清：Vibe Designing 重点 = **设计工程化——用文件指导 AI 设计**（设计声明控质量 + 执行契约控过程 + Taste 沉淀）；Vibe-Designing 概念页已增补认知演变
- 落地实例：studio/UI-DESIGN-PRINCIPLES.md（活文档）+ youtube-cinema-caption/design/{DESIGN-DECLARATION,EXECUTION-CONTRACT}.md
- raw 已归档 _archive；index 已同步

## [2026-08-21] 评审 | eagle-bridge v0.2 评审 4/5 拍板
- 路线（官方 MCP + Agent 直操）/ 文件夹（先看全库）/ 库位置（bAI 下，现有库迁移非复制）/ ox-alpha 额度（用户确认无限）已定
- 剩：种子标签确认（展板/效果图/产品设计/平面设计，源自用户提法）；通过后进 M2（含库迁移）

## [2026-08-21] 修复 | AIBookMarks「卡在 AI 分析中」根因修复（bf6dbf2）
- 根因：SSE 流式体读取无超时（网关停滞即永久挂起）+ 网关忽略 stream 时解析为空（即历史 No JSON array 报错）+ SW 回收弹窗冻结
- 修复：全程限时流式读取（180s/停滞45s）+ 非SSE回退解析 + SW 心跳保活 + 30min 看门狗 + 弹窗 8s 轮询兜底；type-check/build:edge ✅
- 另核实：opencode GO 已修非流式 500 → qwen-mm 流式补丁不需部署；旧改动落基线 d3b2020；详细 → notes/2026-08-21-AIBookMarks-卡在AI分析中修复.md

## [2026-08-21] 迭代 | eagle-bridge design v0.2：按用户五条裁决重写方案
- 路线切换：自研 bridge.py → Eagle 5.0 官方 MCP/Skill 插件 + Agent（免费多模态 ox-alpha）直操素材库；自研面缩到 MCP 接入配置 + SOP
- 取消受控词表（种子标签：展板/效果图/产品设计/平面设计）；文件夹不预设、先扫全库再规划；自建 dry-run 闸门倾向取消（MCP 自带提案—确认，M3 实测定稿）
- 评审清单更新在 design.md §8；详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-21] 立项 | eagle-bridge（Eagle 视觉管家）：PRD v0.1 完成，待评审
- 定位：懂用户 Wiki 的 AI 管理 Eagle 视觉素材——受控三层词表（L1 维度/L2 谱系/L3 课题）+ dry-run→apply 人工闸门 + memory.json 纠偏
- Vision 首选 opencode-go/mimo-v2.5（复用 OPENCODE_GO_API_KEY）；Eagle Local API localhost:41595；bridge 只读 wiki 不写
- 交付：studio/projects/eagle-bridge/{design,README,AGENTS}.md；看板 recvsV8KAjwJyU（计划中）
- 未开工：评审通过前不写实现代码；评审通过后才补 bAI/bAI/AGENTS.md「视觉唯一入口」规则
- 详细 → notes/2026-08-21-eagle-bridge-立项-notes.md

## [2026-08-21] 接入 | OpenRouter 的 Ox Alpha（stealth/ox-alpha）接入 zcode + dsh
- 实测 OpenRouter 目录：stealth/ox-alpha 免费（$0/$0）、1M 上下文、text+image 输入、强制 reasoning、支持 tools；pi-ai 自带 openrouter 路由但目录未收录 → 手写声明
- dsh settings.yaml 新增 openrouter 路由；zcode config.json 新增 OpenRouter provider；两处 apiKey 留空待填（zcode: config.json options.apiKey 或 GUI；dsh: .credentials.yaml 加 OPENROUTER_API_KEY 行），填完重启生效；免费额度 50 请求/天（充 $10 → 1000/天）
- 详细 → notes/2026-08-21-opencode-free-models.md（含追加段）

## [2026-08-21] 接入 | zcode + dsh 增加 OpenCode Zen 免费模型（Ox Alpha Free 等 8 个）
- 实测 OpenCode Go 订阅（zen/go/v1，27 模型）与 Zen 网关（zen/v1，64 模型）；免费模型仅 Zen 端点可用（Go 端点 401 not supported），同 key 实测 charge 成功（x-preview-f-free 回显 ox-alpha-free）
- dsh settings.yaml 新增 opencode-zen-free 路由（8 模型）；zcode config.json 新增 OpenCode Zen Free provider（8 模型）；备份 temp/archive/opencode-free-models-20260821/
- 待办：两应用重启后生效；免费模型共享限流可能 429；muse-spark free 走 /responses 未加；Go 订阅内 11 个新模型未加 dsh
- 详细 → notes/2026-08-21-opencode-free-models.md


## [2026-08-19] 立项 | dsh-workspace-mode（工作空间模式）：PRD v0.1 完成，待作者审阅命名
- 基座裁决：创造模式（cordis）复制改造；全工具第一轮直给；不锚定/不折叠/不做 RAG；薄在提示词、厚在能力、进化是本体
- 交付：studio/projects/dsh-workspace-mode/{PRD,README,AGENTS}.md；开放决策 D1-D4 待拍板（命名/路由表位置/web 去留/delegation）
- 未开工（作者要求 PRD 定稿后开工）；M1-M7 任务清单在 PRD §9

## [2026-08-19] 入库 | Vibe Designing：意图驱动的 AI 设计范式进化（公众号演讲，杨涛 × D20/阿里云）
- 抓取原文照录入 raw/2026-08-19-Vibe-Designing-意图驱动的AI设计范式进化.md；来源 https://mp.weixin.qq.com/s/s6i3D-pv7Lzpz8GtdcdRRA
- 核心：CloudAI Design 三层（Design Foundation / Generative Runtime / Evolution Loop）+ 三口号（Design is the new code / GenUI is the new interface / Taste is the new engine）；设计师从工具使用者转向能力系统构建者
- 新增 sources/Vibe-Designing-意图驱动的AI设计范式进化.md + concepts/Vibe-Designing.md；index 已更新（设计与创意/AI 与创作）
- 用途：AI Native 作品集项目的方法论支撑——「为 AI 读而设计」= 把作品集内容工程化为 Agent 可理解的设计声明

## [2026-08-18] 裁决 | 极简V3 删除（用户裁决：出问题，改做新模式）
- 触发：「分析Edge收藏夹管理项目以改进使用」会话暴露 goal_round 空转约 240 轮；源码核实根因 = host 驱动无条件派发 + 极简V3 无 tool-goal（有 update_goal(complete) 但需 tool-goal 行装配）→ 详细 notes/2026-08-18-goal-round空转-问题与根因.md
- 处置：部署区 apps/cli/config/agent-presets/minimal-v3 → temp/archive/minimal-v3-preset-deleted-20260818；立项目录 studio/projects/minimal-v3-preset → temp/archive/...-archived-20260818（可回退）
- 部署区现存：code/cordis/minimal/standard；宿主空转缺口仍在（内置 minimal 同为无 goal 工具预设），host 守卫修复待裁决
- 下一步：新模式设计（层 1 含 tool-goal）接替极简V3 位置

## [2026-08-18] 整理 | 工作空间整理专项执行完成（O-026~029 全闭环）

- archify → 工作区外 `_third-party/`（第三方 clone 统一落点，新增约定 README）；dsh-vision-fallback-bridge 上传目录改 `~/.dsh/vision-uploads/`（源码 6c8cbcb，不再污染工作区）；.clawhub 遗迹归档；外层 13 个 2026 春遗迹目录 → `_archive/2026-spring-legacy/`（backup/opencode/.trae 保留）
- 规范：AGENTS.md 增补「第三方代码与运行时目录归属」条款；审计 R-009/R-010 新规则（R-010：审计必查本 log，仅查 notes/ 会漏判——本次 archify 记录误判教训）
- 全量报告：`ops/reports/audit/history/2026-08-18-整理专项审计报告.md`；台账 latest/open-items/pitfalls/rules 已同步
- 备注：本部署会话检索工具（session_search 等）全部 disabled，E 维度降级为磁盘文件+本 log 为主证据源

## [2026-08-16] Ingest | Pi 与 DSH Harness 对象化（1 source + 1 concept）
- source: wiki/sources/Pi与DSH-Harness对象化（Harness 对象化/Explicit seams/Harness Evolution；反向提醒：防 benchmark 过拟合）；concept: wiki/concepts/Harness工程与演化
- raw 原件已归档 _archive；用户观点：DSH 设计与工作空间"审计、升级"理念一致；memory 一行不算升级，闭环才算

## [2026-08-16] 入库 | 锚定生态三份新材料：anchored-standard 模式家族 / 梁神模式插件 / minimal-first-turn
- dsh-anchored-standard 已进化成 6 模式家族（anchored/zero-anchored/whoami/eternal-minimal/wire-think/combo）+ shared 模块库 + 三杠杆结论（工具 schema 5/5 vs 11/11、1024 封顶 26/32、注入在场 0/9 锚定失败）；仓库刻意不放 AGENTS.md（首轮必须剥离指令注入）
- 梁神模式（@linxin666/dsh-liangshen）= anchored 产品化：两阶段 + reasoning 门控 + 晋升 PTC；锚定版作者质疑纯 Code Mode 呈现劣于双工具
- minimal-first-turn（ZRui-C）= 首轮精简全局开关版，明确不支持 Windows
- 设计启示：锚定机制与首轮 AGENTS.md 注入冲突（0/9 证据）——工作哲学须延迟注入（instruction-hint 现成实现）；参考文件 temp/anchored-standard-ref/ + temp/liangshen-ref/

## [2026-08-16] 发布 | 两个 DSH agent 预设发布 GitHub（dsh-plugin topic 已打，2h 内自动进市场）
- dsh-nendo-brainstorm / dsh-workspace-auditor 公开仓库（MIT），topic: dsh-plugin,dsh,deepseek-harness,agent-preset；qwen-mm skill 不发（已另行发布过）
- 生态调研：topic 5450+ 仓库，收录机制=打 topic 自动收录（DSH-Plugins-Marketplace STANDARD.md），适配插件候选清单（vision-fallback / minimal-v3 / 审计类 / 通用增强）；详细 → notes/2026-08-16-dsh-plugin-生态调研与发布记录.md

## [2026-08-16] 入库 | dsh四个模式测试素材两篇：Mercer 知乎回答原文 + DSH 四模式架构对比
- Mercer 回答（操盘小游戏，139 赞）：zhihu-cli 开放平台 search 取回主体原文（"Harness: Zcode"+ 单任务成本）；尾部/Kyle 附录未取回；zhida 重建判为幻觉未采用
- Archify v2.14.0 架构对比（作者自产）：标准最重（回读 API）/ PTC 最精简（spine 双层预计算）/ 极简与标准拓扑同构（机器 Delta 零增删）/ 创造增量最大（PWA+localStorage+书封 API）
- 用途：文章「dsh四个模式测试」文风样本 2、回扣段第三方案例、第一幕架构维度证据

## [2026-08-15] 实测通过 | dsh-vision-fallback：opencode GO 网关 mimo-v2.5 图片转发确认可用
- 切到 opencode-go/mimo-v2.5 在 GUI 发图实测成功，Qwen-MM-Plugins 方案引擎前提全部成立；详细 → notes/2026-08-15-dsh-vision-fallback-notes.md

## [2026-08-14] 调研 | harness 社区与学术调研综合完成（三子代理 + 直连抓原文）
- 模型 web_search 余额不足 → 三子代理分别用知乎 CLI/GitHub 直读/arXiv 直抓完成检索，本会话直连抓 5 篇社区一手原文入 bAI raw
- 确证：Project2=xiaobright/modeltest（Standard91/PTC92/Minimal96-99/anchored98-99）；RL 对齐证据链（官方 snapshot 测试名 "sends the exact RL prompt and schemas"）
- 学术对照 13 项（Scaffold Effect/openbench/Claw-SWE-Bench/RIFT/AHE/DarwinX 等）；研究空白：同模型×真实长任务×双指标×多壳横向无已发表研究——我们的实验是稀缺补充
- 综合 → bAI/bAI/notes/2026-08-14-harness-社区与学术调研综合.md；写作候选 D 证据最厚
- ⚠️ 用户注意：DeepSeek 账户余额已不足（web_search 失效），影响后续联网型工作

## [2026-08-14] 迭代 | 协作画布 v2：素材预置 + 成熟交互范式（collab-canvas）
- 作者反馈：可操作性差 / 应搬开源交互 / 应先预置素材
- 调研 React Flow 官方示例：搬 context-menu / drag-and-drop / node-toolbar / undo-redo / 双击 / 引导卡片
- /api/materials 扫描 bAI/raw + bWrite sources（34 条）；素材点击/拖拽导入画布（网格排布）
- 构建 + 运行验证通过；待作者上手验证
- 详细 → studio/projects/collab-canvas/ + notes/2026-08-14-sci-fi-spark-写作流程诊断.md

## [2026-08-14] 交付 | 协作画布 v1 完成并运行验证通过（collab-canvas）
- React Flow 网页画布：想法块分型挂标签、两种线（内部=蓝色虚线带5维标签 / 时间=橙色箭头）、坐标语义、连线类型选择、新颖性/一致性生成器、保存加载（data/*.json）
- 前端 :5173（vite dev）/ 后端 :5178（Express + DeepSeek API，.env 配置）；start.ps1 一键启动；UTF-8 读写验证通过
- dsh 选题画布预置（7 节点 8 边）；待作者填 API key 后生成器实测
- 详细 → studio/projects/collab-canvas/ + notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7.15 节

## [2026-08-15] 方向修正 | dsh-vision-fallback → Qwen-MM-Plugins 方案
- 用户澄清：模型自主调用多模态（非自动切换）；调研两个参考项目（claude-vision-skill / Qwen-MM-Plugins，clone 于 temp/vision-refs/），选定 Qwen-MM-Plugins（api 能力引擎经 DASHSCOPE_BASE_URL/QWEN_MM_API_VL_MODEL 换为 opencode GO+mimo-v2.5，零新增密钥）；design.md v0.2，配置由用户自行落地；详细 → notes/2026-08-15-dsh-vision-fallback-notes.md

## [2026-08-15] 确认 | dsh-vision-fallback 视觉回退模型 id
- 从 pi-ai 0.82 目录数据确认：opencode-go/mimo-v2.5（自带 [text, image]，零配置；mimo-v2.5-pro 为纯文本勿选错）；看板描述已更新，详细 → notes/2026-08-15-dsh-vision-fallback-notes.md

## [2026-08-15] 立项 | dsh-vision-fallback（DSH 视觉模型自动切换）
- 需求：图片请求自动从纯文本主模型（opencode-go/deepseek-v4-flash）切到视觉回退模型（opencode GO 网关 MiMo V2.5）——DSH 现无此机制（模态"声明-拒绝"，图片遇纯文本模型发送前被拒）
- 立项：studio/projects/dsh-vision-fallback/（README + AGENTS + 设计草案 v0.1）+ 飞书看板登记（recvskqXUOcA1c，进行中，P2）
- 详细 → notes/2026-08-15-dsh-vision-fallback-notes.md

## [2026-08-15] 落地 | DSH 新 preset「极简V3 模式」（minimal-v3，deepseek-harness 内置）
- 新建 shipped preset `apps/cli/config/agent-presets/minimal-v3/`（不覆盖极简模式）：极简基础 + pwsh（Windows 替代持久 bash，非 Windows 禁用）+ read/write/edit（tool-fs 放入本地 fs realm 与 str_replace_editor 共用同一文件系统）+ glob/grep（sampleOverCapGlobResults: false）
- 校验：真实 web 组合 standingKeyFor 冷挂载 + 工具目录 + 共享 fs 冒烟（write/read/edit/str_replace_editor/glob/grep/pwsh）4/4 通过；临时 spec 跑完已删
- 立项：studio/projects/minimal-v3-preset/（README + AGENTS.md）+ 飞书看板登记（recvskqB0cN0Fu，进行中，P2）
- 详细 → notes/2026-08-15-dsh-minimal-v3-极简V3模式.md

## [2026-08-14] 迭代 | DSH 提醒消息带会话身份+任务摘要（ops/tools/dsh-reminder）
- 用户反馈：状态要能分清属于哪个会话 → 消息改为「会话标题（任务开头兜底）/任务摘要/完整会话id」三行会话块
- 动态插件升 pkg-6（会话+任务版）；持久版同步重发；飞书回读确认三态（完成/审批/出错）格式正确
- 详细 → notes/2026-08-14-dsh-手机远程操控与飞书提醒.md

## [2026-08-14] 收敛 | DSH 提醒按会话标注 + 范围确认（ops/tools）
- 用户确认：不做手机端 DSH 重制、指挥通道暂缓、只要完成/出错提醒 → 提醒纯化为状态文本（会话标题+短id，无链接）
- 动态插件升 pkg-5 纯状态版；持久版（~/.dsh/profiles/web/）同步重发；网关移除无消费者的链接文件功能；看板记录已更新
- 详细 → notes/2026-08-14-dsh-手机远程操控与飞书提醒.md

## [2026-08-14] 落地 | DSH 新模式「Nendo 头脑风暴」（固定脑暴流程，工业设计用）
- 新建用户 preset nendo-brainstorm：空杯 → 十镜头轮扫 → 相乘与链接 → 精选两项 → 落地卡，依据佐藤大 10 关键词 + 超快速工作法
- 自带 skill（skills/nendo-brainstorm/SKILL.md 流程全文）；persona 改为脑暴陪练；复制自 standard；standingKeyFor 挂载校验通过
- 落点：~/.dsh/.agent-presets/nendo-brainstorm/；待白纸上开新会话实测并微调细节
- 详细 → notes/2026-08-14-nendo-brainstorm-头脑风暴模式.md

## [2026-08-14] 落地 | 发散站正式入 bWrite 规范 + 试点启动（写作流程优化，作者批准）
- bWrite/AGENTS.md：发散站条款 + 选题格式「发散记录」节 + 触发注记 + templates 清单；templates/divergence-prompt.md 落位；README 同步
- 试点：dsh 四模式测试选题已建 + 3 条候选等作者挑选；飞书看板已登记（recvsgBlCAIepV）
- 目标 active，自动续轮 8/8 用尽，后续作者直驱；详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7.12 节

> 详细过程文档写入 Obsidian notes（本地管理，不在 git）。
> ⚠️ 历史条目（2026-05-04 ~ 06-19 段）存在乱序，属历史遗留；自 2026-08-01 起严格执行倒序，历史不再重排。

## [2026-08-14] 脑暴 | 卷笔刀易清洁设计（工业设计项目）
- 洞察：石墨疏水 → 水洗对石墨无效且带来生锈/积水，痛点根源是干式清洁不彻底；四条路线（不脏/免水/敢洗快干/清洁即仪式）+ 四轴评估 + 3 候选组合，待白纸上裁决
- 调研：陶瓷刀卷笔刀已有专利（CN114347702A 等）未成主流产品；"易清洁"为核心卖点的产品几乎空白
- 详细 → notes/2026-08-14-卷笔刀易清洁-设计脑暴.md

## [2026-08-14] 交付 | DSH 手机远程操控网关 + 飞书提醒插件（ops/tools）
- dsh-remote：局域网签名链接+二维码操控 DSH Web GUI（含 DSH /api 信任栅栏的 Host/Origin 重写解法）
- dsh-reminder：host 组合补丁行（~/.dsh/profiles/web/cordis.patch.yml），任务完成/需审批/出错 → 飞书推送，下次 DSH 重启生效
- 验证：HTTP/WS 冒烟全过 + 系统 Edge 真实浏览器 0 错误 + 第二实例启动验证 + lark-cli 回读消息确认送达
- 详细 → notes/2026-08-14-dsh-手机远程操控与飞书提醒.md

## [2026-08-14] 定稿 | 增补条款 v2（语义冲突裁决全部落实）+ 目标转 blocked（写作流程优化）
- 增补条款落实 6 项冲突裁决；独立工作全部完成，剩余均等作者决策（作者裁决单已备）
- 阻塞条件（作者未回应四个定位问题与方向裁决）持续 5 轮，按规则标记 blocked
- 详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7.10 节

## [2026-08-14] 收尾 | 全套交付件 QA 校验 + index 页脚修复（写作流程优化）
- QA：21 个交付文件引用全部存在；v2 提示词补单模型起步 + 打勾位；跑分表补对照组设计
- 修复 wiki/index.md 页脚「最后更新」陈旧问题
- 剩余全部等作者按裁决单打勾（notes/2026-08-14-发散站方案-多视角对比.md + temp/sci-fi-spark-发散站/作者裁决单.md）

## [2026-08-14] 审查 | 发散站方案多视角审查完成（破规范者/体验与表达/语义与知识）
- 对比报告 → notes/2026-08-14-发散站方案-多视角对比.md；视角原件 → temp/sci-fi-spark-发散站/审查-*.md
- 按审查修订：divergence-prompt v2（发送给 AI 块）、定稿仪式提示词（替代案）、demo#3（特德姜）
- 待作者裁决：方向（发散站/定稿仪式）+ 边界条款 + 候选上限 + 飞书看板登记
- 详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7.8 节

## [2026-08-14] 设计 | 演示#2 + 回表对账 + 方案草案 v0.9（写作流程优化）
- 书单选题演示 14 条候选机制 → notes/2026-08-14-发散站demo-书单.md；回表对账 → notes/2026-08-14-回表对账演示-小食杂店.md
- 流程方案草案 v0.9 → temp/sci-fi-spark-发散站/写作流程优化方案-草案v0.9.md（待作者裁决）
- 详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7.5 节

## [2026-08-14] 设计 | 发散站演示运行 + 两方案草稿（写作流程优化）
- 小食杂店选题演示：14 条候选发心（组合配对 8 + 打破假设 6）→ notes/2026-08-14-发散站demo-小食杂店.md
- 方案 B 提示词包草稿、方案 A topics 格式 → temp/sci-fi-spark-发散站/（待作者批准）
- 详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md 第 7 节

## [2026-08-14] 摄入 | Sci-Fi Spark (CHI'26) 论文 ingest
- PDF 原件 2026-08-14-sci-fi-spark-chi2026.pdf：raw/ → _archive/；全文提取在 temp/sci-fi-spark-fulltext.txt
- 新增 sources/Sci-FiSpark-科幻构思人机共创系统.md + concepts/策略性上下文解耦.md，index.md 加「AI 与创作」分组
- 背景：作者以该论文为素材优化个人写作流程（goal-890f11d9），诊断见 notes/
- 详细 → notes/2026-08-14-sci-fi-spark-写作流程诊断.md

## [2026-08-14] 基准 | 手机实操评测工具就绪（用户要求手机端实操评测）
- 绑定检查：PTC(8767)/创造(8769) 原生支持 CALIBRE_WEB_HOST=0.0.0.0；标准/极简/ZCode 仅 127.0.0.1 → 配 lan_proxy.py 转发（0.0.0.0:18766/18768/18770）
- 产出：手机评测-启动.ps1（五局+三代理一键启动，打印手机地址，回车即全停）、手机实操评测清单.md（十步流程+各局交互速查+评分卡）
- 须知：创造局 PWA 在局域网 HTTP 下受限（SW 需 HTTPS）；键盘快捷键仅 PC；记录隔离到各局 notes
- 详细 → temp/bench-tools/手机实操评测清单.md

## [2026-08-14] 基准 | 7 篇分析已写入飞书报告（用户要求）
- 飞书文档：https://my.feishu.cn/docx/Z0A1dvEcKoKTXFxq5R8c9HmrnLe（「AI Harness 五局实验 · 深度分析报告」，rev 11）
- 结构：定性声明 + 五局总览（含官方账单成本）→ 01-05 逐局深度分析 → 06 横向综合 → 07 harness 级对比（DSH vs ZCode）
- 实现：md→Lark XML 转换器（temp/bench-tools/md2lark.mjs）生成 8 段片段，+create 骨架 + +update append 分段写入，outline 验证完整
- 待用户：⑤视觉分 + 写作启动

## [2026-08-14] 基准 | 逐局深度分析 + harness 级对比完成
- 逐局分析 6 篇（01 标准/02 PTC/03 极简/04 创造/05 ZCode/06 横向综合）→ temp/bench-tools/分析/，含 run_code 机制实证、极简局 17 次 view 实锤、创造局 goal 自管理、ZCode 两 bug 代码层验证
- 用户补充目的：要 harness 级区别 → 07-DSH与ZCode-harness级对比.md：两 harness 10 维对比（DSH=Cordis 插件+4 工具形态+goal 自动续轮；ZCode=MCP 工具池+权限落盘+人在环+会话内调参），ZCode 日志实证 87 次网关错误仍交付
- 结论：按场景切换而非二选一（DSH=可编程系统/无人值守，ZCode=顺手工具/人机协同）
- 待用户：⑤视觉分 + 写作启动

## [2026-08-14] 基准 | 官方账目导入：成本数据权威定稿
- 解析 E:\Desktop\usage_data zip（key=for_dsh）：8-13 = 2.195 元（110 请求，命中率 97.89%）；8-14 = 7.571 元（539 请求，命中率 99.36%）
- ZCode 局成本以差值法确定 ≈1.06 元（用户 8-14 报 8.63 − DSH 7.571），与日志估算 1.08 吻合
- 全账闭合：总计 ≈10.83 ≈ 用户所报 10.81 ✓；五局本体 5.10 元，编排/验收+杂项 ≈4.7 元
- 成本数据权威定稿 → temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 基准 | 成本对账闭合：五局真实成本 5.1 元；账户 10.81 去向拆清
- 用户报实际账单 8/13(22:00+) 2.18 + 8/14 8.63 = 10.81 元；全量会话对账 ≈10.9 元（<1% 误差闭合）
- 计费口径确认：输出费按 outputTokens（reasoningTokens 已含其中，不另计）
- 五局本体 ≈5.1 元（PTC 0.81/创造 1.05/ZCode 1.08/标准 1.17/极简 2.07）；**编排/验收会话 ≈3.7 元**（比任何一局都贵）；归档+早期会话 ≈1.0
- 洞察：跑评测的 AI 比参赛选手贵；验收脚本固化后重跑编排成本可大幅摊薄
- 汇总已更新 → temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 基准 | 官方价格文档到手：真实成本重算 ≈6.2 元/五局
- 现价（本次运行适用）：v4-pro 输入命中 0.025 / 未命中 3 / 输出 6 元每M → 五局合计 ≈6.2 元（PTC 最低 0.81、极简最高 2.07）
- 8-17 峰谷新价：空闲 0.15/4.5/13.5、高峰 0.30/9.0/27 → 同样实验空闲 ≈17.8 元、高峰 ≈35.5 元（约 ×2.9/×5.7）
- 洞察：以后重跑基准安排在非高峰时段（夜里），成本省一半以上
- 汇总已更新 → temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 基准 | 成本效率分析完成（日志实证）：五局合计约 15 元
- 缓存命中率全员 98-99%；成本差异根源=缓存量×时长：PTC 最低 ≈1.5 元（19.9min），极简最高 ≈5.7 元（缓存 22.1M=标准局 2 倍），五局合计 ≈15 元
- 烧 token 速率：创造 1.8k/min 最省、极简/PTC 4.0/3.9k/min 最高；极简最终数字修正为 37.1min/174 次 LLM/输入 205,673/缓存 22.11M（旧报告已更新）
- 成本按假设价（输入2/缓存0.2/输出6 元每M）估算，8-17 峰谷调价后需重算，真实账单以账户页为准
- 汇总升级为最终 case study 口径（含效率洞察/发布口径）→ temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 调研 | AI 产品 benchmark 主流做法（用户要求先调研）
- 四类做法：确定性任务集(SWE-bench/Terminal-Bench)、同模型不同壳(openbench/Scaffold Effect 论文/Copilot harness)、开放式任务(GAIA/JADE/G-Eval)、商业横评(AA Leaderboard)
- 对照结论：我们=openbench 思路×单任务 case study；优点（真实任务/隔离/客观指标/同模型）；缺口（n=1、未隔离他人交付物→极简复刻事件、rubric 事后定义、无硬上限）
- 建议：发布时诚实定位"单任务对比实验"；升级路径=任务书+验收工具固化为可复跑个人基准
- 详细 → notes/2026-08-14-AI产品benchmark调研.md

## [2026-08-14] 基准 | 五局全部验收完成 + 我的评分已给出
- ZCode 局（08:21-08:35 交付）：API 9/9、UI 零错误；输出 97,146 / 输入未缓存 100,670 / 缓存 7.79M；"给钩子一个目的地"（纯钩子卡片+窗口式原文+X/N 段位置+书封）；自修两个存量 bug（双重写响应、筛选竞态=审查#1）
- 五局验收闭环：标准/PTC/极简/创造/ZCode 全部 9/9 通过、数据完好、报告齐备
- 我的评分（发心/质量/效率/可靠性）：创造 9.5/9.5/7/9.5、ZCode 9.2/9.5/8/9.5、PTC 9/9/9.5/9、标准 8.5/9.5/6.5/7、极简 8/7.5/7.5/7（视觉维度我无图像能力，留给用户）
- 详细 → temp/bench-runs/zcode/验收报告.md；汇总 → temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 基准 | 创造局验收完成：唯一修了 bug 的局；四局 DSH 全部验收完毕
- 创造局（创造模式，工具指纹确认）：API 9/9、UI 零错误；≈47min（用户结束前追问一次）；input 95,643/output 87,278/reasoning 42,501/cache 9.47M
- 交付：三段式(钩子→回想→回原文)+PWA+局域网+深色+断点续读；独立发现并修复随机流分页重排（seed 方案，实测复测通过——正是标准局 #6 bug）
- 雷同度 16/95 行（低，基本原创）；自产 12 张截图 + 测试脚本
- 至此标准/PTC/极简/创造四局全部验收完毕；仅剩 ZCode 局（用户未跑）
- 详细 → temp/bench-runs/cordis/验收报告.md；汇总 → temp/bench-tools/五局汇总-进行中.md

## [2026-08-14] 基准 | 用户裁决：极简局不重跑（接受+保留独立性质疑标注）
- 复查状态：创造局仍运行中（01:32 会话活跃，交付说明未出）；ZCode 局无动静（副本零改动、无今日日志）
- 极简局：用户选择不重跑 → 接受交付、保留"独立性质疑"标注，评分与文章如实呈现
- 待办：创造局交付后验收+雷同度检查；ZCode 局由用户跑后验收

## [2026-08-14] 基准 | 极简局验收完成 + 独立性质疑（筹备疏漏）
- 极简局（仅 bash+str_replace_editor，454 次调用）：API 9/9、UI 零错误；≈34min；input 168,780/output 94,699/reasoning 37,593/cache 7.95M；干预 0
- ⚠️ 独立性质疑：交付说明 41/86 行与标准局逐字相同、特征集一致 → 大概率参考标准局交付；代码文件哈希均不同、产品可运行
- 疏漏自认：筹备时未隔离已完成局的交付物；待用户裁决重跑或接受+标注；创造局交付后需同样检查
- 详细 → temp/bench-runs/minimal/验收报告.md

## [2026-08-14] 基准 | 晨间进度：PTC 局验收完成；模式经工具指纹确认无误
- ✅ 更正：早前据会话头 agentPreset 字段误报"三局均为标准模式"——经用户指正，以工具指纹复核：ptc 局=仅 run_code（PTC 模式）、minimal 局=仅 bash+str_replace_editor、cordis 局=全套+goal/job/skill → 三局模式各异，对比成立
- 附带发现：DSH 会话日志头部 agentPreset 字段对非 standard preset 未正确记录（判断模式应以工具指纹为准）
- PTC 局验收：API 9/9、UI 冒烟零错误；19.9min；input 75,118/output 78,369/reasoning 37,288/cache 4.41M；干预 0；交付=回想墨条+整章原文阅读器+手机手势
- minimal（454 次 bash/editor 调用）与 cordis 局仍在跑
- 详细 → temp/bench-runs/ptc/验收报告.md

## [2026-08-14] 基准 | 通宵值守 8 轮结束：三局运行中，交接文档就绪
- 夜里完成：标准局验收报告 + 代码审查 12 项（分页重复划线/并发写丢数据实锤、N 键泄漏字符）+ 边界 E2E + 验收工具链 + 五局汇总模板 + 值守日志
- 三局状态：PTC 整体重写中、创造重写中、极简仍在探索（端口 8767/8768/8769 保持），预计 01:40-02:00 交付
- 目标 8 轮上限耗尽 → 标记 blocked（同条件持续 5 轮）；早晨用户说"继续"后 resume 验收
- 交接 → temp/bench-tools/通宵交接-早晨待办.md；过程 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-14] capture | dsh 会话归档找回
- 用户归档了 DSH 会话「关闭飞书BOT开机自启动」后界面找不到；查实归档不删数据、只全界面隐藏（分组/平铺/搜索均过滤）
- 数据完好：`~/.dsh/sessions/.../session.jsonl.zstd` + `workspace.json` 的 archivedSessionIds；已解压到 temp/session-inspect/
- 产品反馈：当前版本无取消归档入口与已归档视图（源码仅注释 future unarchive）；应急恢复=停服务→改 workspace.json→重启
- 用户选择保持归档并记录反馈
- 详细 → notes/2026-08-14-deepseek-harness-归档会话找回.md

## [2026-08-14] 基准 | 通宵自动化准备：独立端口 + 预填任务书 + 值守目标
- 用户安排：睡前开 3 个会话（PTC/极简/创造）各粘一行执行指令；本会话建持久目标自动多轮值守
- 端口隔离：standard 8766 / ptc 8767 / minimal 8768 / cordis 8769 / zcode 8770（防并行互杀）
- 任务书预填：temp/bench-runs/任务书-{ptc,minimal,cordis,zcode}.md（v4 模板+代号+端口）
- 通用验收工具：temp/bench-tools/api_check.mjs + ui_smoke.mjs（PORT/RUN 环境变量参数化）
- ZCode 局：交互式，留用户醒后手动跑（任务书-zcode.md 已备）
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-14] 基准 | 任务书 v4（移动端优先+可复用交付模板）+ 标准局移动端 E2E 12/12
- 用户反馈：产出要更可用更可复用；使用中发现 bug 需检测方法；不做 PC 端、改手机端适配降工作量
- 任务书 v4：新增「使用场景」（手机竖屏第一优先）；交付说明固定六节模板（做什么/为什么/怎么用/怎么验证/已知问题/迁移合并）；自测要求
- 移动端 E2E（390×844）标准局 12/12 PASS；唯一报错 favicon 404（无害）；ERR_NO_BUFFER_SPACE 偶发不可复现（环境噪声）
- 发现：原件 progress.json 内有一条历史 GBK 乱码笔记（待修）
- 待用户提供其发现的 bug 现象清单 → 复现定位
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-14] 基准 | 标准局验收完成：成本约 3 元/57.7 分钟，交付超预期
- 交付：划线回廊 v0.8「回廊」（入原文整章书页/回想模式/回读计数/审问式记录/夜廊纸灯），自测 18/18 + 自截图 10 张 + 数据回滚属实
- 实测：7 书 1787 划线启动正常、五主线无回归、progress.json 与原件一致；发现 3 项均不扣分（favicon 404/1769 预存在/chapter title 空串）
- 指标：57.7min；input 70,910 + cache 10.86M + output 113,648 + reasoning 55,771；89 次 LLM 调用；估 ≈3 元
- 干预度：1 条任务消息 + 3 次干预（2 批沙箱升级 + 1 改审批策略）；agent 零提问 → 任务书 OK，无需加限制
- 公平性提醒：其余局统一审批策略
- 详细 → temp/bench-runs/standard/验收报告.md；过程 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 基准筹备 | 任务书落盘 + 5 份隔离副本就绪（测试任务可开跑）
- 用户裁决：交付物需适合小红书公开（界面值得被看见）；对比/评阅/写作/发表由用户+AI 协作；先跑 1 个测试任务实测成本，再决定是否加限
- 任务书 → studio/agent-templates/bench-task-划线回廊.md（仅背景/发心/目标/工作目录/交付，无约束条款）
- 副本 temp/bench-runs/{standard,ptc,minimal,cordis,zcode}/tools/calibre-web+calibre-to-anki（剔除 dist/build/.env，含真实 progress.json，notes/ 隔离目录）；standard 副本冒烟测试通过（200，7 书 1787 划线）
- 端口 8766 已释放；改造前存档图用户已确认
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 基准筹备 | 任务书 v3：只设目标不设限
- 用户裁决：取消 45 分钟时间盒；删除"不得破坏主线"等约束条款；任务=在现有产品上完成发心；赛后指标增任务时间+token 消耗
- 评分表 v2 五维：发心契合度/完成质量/效率(时间+token)/干预度/视觉呈现
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 基准筹备 | 发心定稿 + 改造前视觉存档完成
- 发心：旧书不厌百回读，划线要吸引人回到原文；并入用户文章《开始写作是我和AI的协作方案》核心（拒绝AI总结外包/纳瓦尔读透百本/五步不可外包）；红线：不做AI总结捷径
- 已读飞书文章（lark-cli 走危险模式一次批准）；已截改造前 5 图（Playwright+系统Chrome）→ studio/projects/ai-collab-flow/notes/bench-assets/before/
- 完整计划待用户批准：试点1run→全量5run→验收截图→评分→归档+小红书素材
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 讨论 | 试点任务 v4：ai-collab-flow 改进 + 发心驱动
- 用户裁决：试点换为 ai-collab-flow 产品改进；任务书只给发心不给方向，agent 自行判断改进点，比谁最忠于发心且最完善
- 摸底：v0.7 划线回廊（calibre-web：Python 标准库 + 零框架单页，7 书 1787 划线）；隔离用 temp/bench-runs/ 副本；评分以发心契合度为第一维度
- 待办：用户提供「发心」文本 → 定稿任务书
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 讨论 | 基准任务 v3：个人决策型轻量设计（按用户 3 需求重构）
- 定位转变：正式基准 → 个人决策工具（小成本+解决真实积压+输出"哪套工作流适合我"）；小红书降为副产品
- 核实：headless 不含四 preset 切换；V4 Pro 输出约 6 元/M token（8-17 调价）→ 省钱靠限思考量+限轮数+任务盒 30-45 分钟
- 设计：试点先行 1 run 测成本；git 分支隔离；评分面向"对我是否更好"；产出可复用「新工具试用 SOP」模板
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 讨论 | 基准任务 v2：真实待办作考题 + 小红书呈现
- 用户补充：用当前积压事项作为基准评判任务，结果发小红书等社媒，需直观有体感
- 产出：双层基准套件（Tier1 体检客观跑分 + Tier2 真实待办实战展示）、积压事项适合度筛选表、小红书呈现要点
- 待裁决：任务书最终内容 / 执行方案 A/B/C / ZCode 同模型 / 只读约束
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 环境体检 | DSH 四模式与 ZCode 基准任务设计（讨论稿）
- 体检结论：四层规范齐全；git 有 9 项未提交改动（含 08-13 DSH 笔记）；stats 停更 07-04、看板快照停在 08-06；bWrite 根有未跟踪 PDF；temp 236 文件 381MB
- 核实：DSH 四模式 = standard/PTC(code)/minimal/cordis(创造) 四内置 preset；ZCode 运行时在 ~/.zcode（日志至 08-13），CLI 不在 PATH
- 产出：体检报告 + 「环境体检」基准任务设计（官方 BENCHMARK.md jsonrpc-agent 方案 + 08-01 双 Agent 对比先例），待用户裁决
- 详细 → notes/2026-08-13-环境体检与基准任务设计.md

## [2026-08-13] 运维 | 取消飞书 Bot 开机自启
- 自启来源：Startup 文件夹 BotDashboard.vbs（开机静默启动 3 bot + dashboard + 打开浏览器 7890）
- 处理：vbs 移至 temp/archive/BotDashboard.vbs（可回退）；注册表 Run/RunOnce、计划任务无其他自启项
- 当前无 bot 运行（stop.cmd 确认 lock 元数据无存活进程）；手动启停仍可用 ops/bridge/ops/start.cmd / stop.cmd

## [2026-08-13] capture | 环境 | deepseek-harness 安装（DeepSeek 官方 Agent Harness v0.1）
- 源码装于 E:\Desktop\AI_itself\workspace_with_ai\deepseek-harness\（pnpm monorepo，node v24）；pnpm install + build + dsh web 验证 HTTP 200
- 网络坑：git clone 断流→tarball 兜底；npm 官方源限速/报错→npmmirror；大二进制包撞 60s 超时→--fetch-timeout=600000 --fetch-retries=5
- 副作用清理：lefthook 误装的散落 lefthook.yml + prepare-commit-msg hook 已删；.gitignore 加 deepseek-harness/
- 详细 → notes/2026-08-13-deepseek-harness-安装与使用方法.md

## [2026-08-07] 运维 | README 批量更新：10 个过时 README 对齐现状 + 5 个缺失 README 补齐
- 过时修正：paper-reviewer/AI_Native 标已归档、ai-collab-flow 指向 v0.7 划线流、feishu-agent-bot 注明由 ops/bridge 取代、frag-knowledge 数据路径、resume-portfolio 路径与 lark-cli 表述、ai-tools-uninstall/workspace-build/studio README 等
- 补齐缺失 README：ai-reading / text-catcher / dongshan-travel-guide / paper-translate / 认知外包
- 详细 → notes/2026-08-07-目录结构对齐-notes.md
- 补充：studio/AGENTS.md 三层改四层（补 bWrite 层），目录树同步根规范文件、tools/ 与运行时目录

## [2026-08-07] 运维 | 目录结构对齐：补记辅助目录用途 + raw 二进制移出 git
- 文档补记：根 AGENTS/README 增 tools/、temp/、AI 工具运行时目录；ops/AGENTS 增 scripts/、tools/；bAI schema 增 workspace-docs.md 与 raw 二进制不入 git 规则
- 补建缺失目录：wiki/syntheses/、bWrite/drafts/（commit da6d1b0）
- git 移出跟踪：raw/_archive 二进制（epub 126MB + jpg×11），磁盘副本保留
- temp/235_paper_extract.txt 归档至 temp/archive/
- 详细 → notes/2026-08-07-目录结构对齐-notes.md

## [2026-08-07] 里程碑 | ai-collab-flow v0.5：划线回廊 Web 完整版
- 完整产品前端：书库/制卡（直转+AI）/反馈（sync 笔记）/设置 四合一单页（暖色调设计，零框架）
- 后端 Python 标准库 http.server（零依赖），复用 calibre-to-anki 核心；任务后台线程+轮询日志
- API 全量无头测试通过（status/books/highlights/import/sync/tasks/notes/config/静态文件）
- 修复：bat GBK+CRLF 入库（.gitattributes 加 *.bat eol=crlf 例外，检出验证通过）；请求体 GBK 容错；_api_note 双重响应
- 详细 → notes/2026-08-06-ai-collab-flow-产品审视与重构草案.md

## [2026-08-06] 里程碑 | ai-collab-flow v0.2.1+v0.3：上下文提取 + 批注回读闭环
- v0.2.1：划线上下文提取（本地解析 epub，CFI spine 定位 + 归一化全文匹配 + 句子 span 映射，跨句/跨标签兼容，实测三书命中 24/24）；卡片背面加 📎上下文 + 💭批注预留区
- v0.3：sync 命令——Anki 批注（复习时按 E 写下的思考）回读沉淀到 bAI/bAI/notes/阅读笔记-<书名>.md（幂等验证通过）
- 闭环打通：Calibre 划线 → Anki 复习（上下文+批注）→ sync → 知识库
- 端到端验证：九诗心 3 张上下文卡写入 Anki；模拟批注 → sync 生成阅读笔记页
- 详细 → notes/2026-08-06-ai-collab-flow-产品审视与重构草案.md

## [2026-08-06] 里程碑 | ai-collab-flow v0.2 完成：划线→AI 问答卡 + 端到端验证通过
- v0.2：calibre-to-anki 增加 --ai（DeepSeek 转卡，Wozniak 最小信息原则，借鉴 DeepStudent 制卡思路）；AI 通道复用 frag-knowledge 的 DeepSeek key（环境变量，不落盘）
- 端到端验证通过：默认模式 5 张 + AI 模式 4 张写入 Anki「Calibre::汪曾祺的写作课」；去重验证（uuid tag + Anki 判重）；AnkiConnect 读回内容核对正确
- 修复：addNotes 全重复时整体报错的容错（add_notes_safe）
- reading-reviewer 扁化入库（101 文件，独立 git 历史备份 temp/archive/reading-reviewer-git/）
- 竞品调研：Calibre划线→Anki 无成熟开源；借鉴 DeepStudent（AI 建卡/APKG）、Anki 生态（AnkiConnect/FSRS 已用）
- 详细 → notes/2026-08-06-ai-collab-flow-产品审视与重构草案.md

## [2026-08-06] 里程碑 | ai-collab-flow 定位裁决 + MVP 实现（Calibre→Anki）
- 用户裁决：A 收敛为碎片化阅读回顾 / 直接进真实数据闭环 / MVP 含 Calibre 划线→Anki 卡片 / 产出纳入 git
- MVP：tools/calibre-to-anki（Python 零依赖：list/add/status，uuid 去重+章节提取）；书库数据 F:\Calibre 书库\metadata.db annotations 表（7 本书 1787 条划线）；提取逻辑验证通过
- gitignore 放行 output/ 与 reading-reviewer/（改为"忽略内容"模式），output/ 41 文件入库
- 发现：reading-reviewer 是完整 Tauri 桌面应用（系统托盘+浮动卡+Claude Hook），独立 git 历史 5 提交，待裁决纳入方式
- 发现：看板「进度」字段为 number 类型，AGENTS.md 更新示例用错字段（已用「描述」字段更新）
- 详细 → notes/2026-08-06-ai-collab-flow-产品审视与重构草案.md（裁决清单 #5 待裁决）

## [2026-08-06] 里程碑 | ai-collab-flow 产品审视 + 重构草案（待裁决）
- 发现方向漂移：5-05 已转向「碎片化书籍回顾」，但 README/AGENTS/看板仍停留在「等待时间优化」；两套应用（output/ 与 reading-reviewer/）并存
- 产出：审视报告（P0-P2 共 11 项问题）+ PRD v2 草案（方案 A 收敛版）；4 项待裁决（定位/重构深度/MVP收缩/版本控制放行）
- 发现：.gitignore 忽略 `projects/*/output/` 与 reading-reviewer/，本项目全部产出无版本历史；看板「进度」字段实为 number 类型，AGENTS.md 更新示例用错字段
- 详细 → notes/2026-08-06-ai-collab-flow-产品审视与重构草案.md；PRD v2 草案 → studio/projects/ai-collab-flow/notes/PRD-v2-draft.md

## [2026-08-05] 项目里程碑 | 简历作品集：背景发掘收尾 + 计划确认
- 兴趣发掘结论：足球（每周 10h）+ AI+（运动/读书/工作空间实验线）；运动科技暂不作求职标签
- 计划 7 项确认；背景档案建档（notes/背景档案.md，生长型简历单一真源）
- 详细 → notes/2026-08-05-简历作品集-方向确认.md

## [2026-08-03] lint+fix | bAI 知识库体检 + 第一批修复
- 体检结论：健康度中上；断链约 30 处、同源重复 3 组、raw 未 ingest 25 个、黄峥系 30 页无 frontmatter
- 第一批修复：重建纳西索斯效应概念页（据 notes+raw 复原）；index 断链 2 处 + 孤儿页补录；9 处链接指向/路径修正
- 第二批修复（2026-08-05，用户裁决「全补建」）：补建 28 页（22 concepts + 5 entities + 1 source），全部断链清零
- 待裁决：3 组同源重复；raw 素材逐条审查；黄峥系 30 页补 frontmatter
- 详细 → notes/2026-08-03-知识库体检-bAI-质检报告.md

## [2026-08-05] 模板 | 全库 frontmatter 统一 + 原文对应审计
- 模板统一：30 概念页补 frontmatter；23 概念页补 date_created/last_updated；4 概念页补 type/tags；3 source 页补 type/tags；39 笔记补 frontmatter——全库 0 缺字段
- 4 个概念页（C2M/供给侧/柔性生产/需求侧）补「关键来源」指向黄峥-市场多一点
- 原文对应审计：43 个 source 中 12 个有 raw 原文；31 个缺 raw（约 27 个有 URL 可重新剪藏，2 个为本地实践记录，2 个为待裁决重复源）
- 详细 → notes/2026-08-03-知识库体检-bAI-质检报告.md

## [2026-08-05] 素材 | 待重新剪藏清单生成
- 生成 notes/2026-08-05-待重新剪藏清单.md：27 个缺原文 source 按微信/黄峥合集/外链分组，附全部链接与剪藏规范
- 处理优先级：黄峥系列一次剪藏覆盖 9 个 source 性价比最高；毕业设计相关素材次之
- 待用户逐个剪藏后走 ingest 流程

## [2026-08-05] 合并 | B1「靠表达来学习」重复组裁决落地（用户选：全部合并）
- 来源：保留 sources/靠表达来学习-边做边记录.md（含完整原文），张司机--靠表达来学习.md → wiki/_archive/
- 概念：表达式学习.md 并入「表达型学习」增量（AI 时代新可能/LLM谬误/测不准原理启发），表达型学习.md → wiki/_archive/
- 同步更新全部引用（index/费曼技巧/文白夹杂/过程生成/做教育的TCOH/陪读AI设计指南），活跃 wiki 断链 0
- 归档区：wiki/_archive/（可回退，不参与索引）

## [2026-08-05] 素材 | 批量抓取原文入库（26/27）
- 微信 13 篇 + 黄峥合集 9 篇（拆分为独立原文）+ 外链 4 项（RuiXu/gist/Everything-is-Context/靠表达来学习）→ raw/01-articles/ 与 raw/02-papers/
- 论文 PDF：LLM谬误（arXiv 2604.14807）+ Everything-is-Context（arXiv 2512.05470）
- 无法抓取：浙大社会学系毕业演讲（抖音）——待用户提供演讲词全文
- 小红书链接已失效，靠表达来学习原文取自 source 页内嵌全文

## [2026-08-05] 集成 | Clippings 网页剪藏收件箱接入知识库管线
- 规范：bAI/AGENTS.md 新增 Clippings/ 收件箱 → 规范化 → raw/01-articles/ → ingest → processed/ 流程
- 脚本：ops/scripts/clippings-ingest.ps1（补 frontmatter/规范命名/归档，自动跳过说明文件）
- 说明：Clippings/README.md（文件夹职责 + 推荐 Web Clipper 模板 + 运行命令）
- 处理存量剪藏 2 篇：湖南人大（剪藏版替换抓取版，格式更完整）、黄峥合集（内容已被 9 篇拆分覆盖，直接归档 processed/）

## [2026-08-05] 重构+ingest | raw 平铺化 + 待决定素材 ingest + 重复清账（用户裁决）
- raw 结构：移除 01-articles/02-papers/04-meeting_notes/05-books/06-style-reference 子目录，全部平铺；09-archive → _archive/；文件名统一日期前缀
- B2：毛边保留「写文章如何保持毛边感」加工版，另两份归档 _archive/
- B3：同济丛书保留 xhs- 版，本周推荐归档 _archive/
- ingest 8 个待决定素材：fast-ai访谈、2028年全球智能危机（原无名微信文章，补齐全文 9529 字）、作品集网站调研、量子堆栈面试记录、钧瓷 SCI、汪曾祺写作课、浙江宣传
- 补建 sources/纳西索斯效应.md，概念页来源引用接通
- 归档 42 个已处理 raw 到 _archive/；raw/ 根目录仅剩写作素材与过程文档（dongshan/东山岛/认知外包/erato/natolisnuggets/yuanzhou 等）
- 配置同步：bAI/AGENTS.md、Clippings README + 脚本、bWrite/AGENTS.md、clio 提示词

## [2026-08-05] 调整 | Clippings 保持纯收件箱（移除 processed/ 子文件夹）
- 用户要求：Clippings 默认路径就在文件夹下，不设子文件夹
- 处理后的剪藏原稿改备份到 temp/archive/clippings/（不入 git，可回退）；脚本/README/AGENTS 同步
- 存量 processed/ 2 篇已移入 temp 备份区并删除文件夹
- 新剪藏「为什么 LLM 仅预测下一词就能涌现出高级能力」已规范化入 raw/，待 ingest

## [2026-08-05] 修正 | AGENTS.md 目录结构引用清理 + 素材归档归位
- 用户确认素材类文件移入 _archive/ 是有意操作，已恢复（raw/ 根目录仅保留新剪藏）
- AGENTS.md 系列过时引用修正 4 处：bAI 的 Clippings/processed → temp/archive/clippings、09-archive → _archive；studio 的 09-archive → _archive、对应分类 → 平铺

## [2026-08-05] lint | 知识库链接全面体检
- 双链扫描（wiki/notes/raw/Clippings 共 67 个 md）：Markdown 路径引用全部有效；index 无孤儿页、无缺失项
- 修复笔记断链 8 处：AI与教育笔记 3 处 .md 后缀；中心触手模型 3 处项目链接改指向 studio/projects；AI工作环境 2 处（natolisnuggets raw 链接、The Mom Test 改纯文本）
- 保留：体检报告内 8 处断链为审计时的历史记录（证据，不改）

## [2026-08-05] 补链 | 13 个"只在索引、正文未引用"的页面全部接通
- 概念→来源：儿童AI硬件→硬氪/袁琳；软件熵与复杂度→fast-ai；AI时代的设计价值→2025-ai-design；文白夹杂→汪曾祺/浙江宣传；判断力→浙大演讲；信息减法→2028智能危机
- 来源/实体：佐藤大 source→佐藤大实体；出海同学会 source→飞书录音豆实体
- 笔记→来源：简历作品集→作品集调研/量子堆栈面试/钧瓷SCI
- 复查：正文入链 0 孤儿、新断链 0

## [2026-08-02] 项目启动 | 简历更新 + 个人作品集（硬件 PM 护城河第一步）
- 立项 studio/projects/resume-portfolio/：README + AGENTS
- 核心结论：爱好是入口，护城河 = 爱好 × 证据链；第一步把兴趣证据显性化（简历 + 作品集）
- 已关联素材：作品集网站技术调研、追觅/大疆/安克 PR（「兵器」框架）；飞书文档待 lark-cli 恢复后读取
- 详细 → notes/2026-08-02-简历作品集-notes.md

## [2026-08-02] 回滚 | bWrite 内部三项改动撤回（用户要求后续一起细化讨论）
- 模板单源（templates/source.md）、素材单一真身语义、"见 memory"指向——恢复为原始内容，待讨论
- 保留：log 术语统一（含 bWrite）、bWrite/AGENTS.md 建档、其他两项（状态双写、bridge 启动命令）不受影响
- 详细 → notes/2026-08-02-规范统一-AGENTS单源化.md

## [2026-08-02] 修复 | 待办清零（log 术语 / bWrite 内部 / 状态双写 / bridge 启动命令 / 路径修正）
- log 术语统一为"倒序（最新在前）"（bAI/bWrite/studio/reflector）
- bWrite：模板单源 templates/source.md、素材单一真身 + 跨项目链接、风格偏好指向 erato/style.md + raw/06-style-reference/
- 状态双写：项目 AGENTS.md 不写状态值，9 个项目改为指向飞书看板；studio 规范同步
- ops/bridge/AGENTS.md 启动命令对齐 start.cmd；输出目录统一 output/、notes 路径修正、Oki Sato 拼写
- 详细 → notes/2026-08-02-规范统一-AGENTS单源化.md

## [2026-08-02] 重构 | 规范统一为 AGENTS.md 单源（CLAUDE.md 缩为自动加载钩子）
- 根 / bAI/bAI / bWrite 三层规范全部由 AGENTS.md 承载；三份 CLAUDE.md 缩为 3 行钩子（跳转本目录 AGENTS.md）
- 入口流程重构：消除 SOP 循环、层文档按需读、看板快照为默认进度入口、飞书 Bot 角色解读并入根 AGENTS.md
- 全部引用同步（SOP / studio / 模板 / 项目文档 / bridge clio prompt）；bWrite 首次获得跨 Agent 可见规范
- 详细 → notes/2026-08-02-规范统一-AGENTS单源化.md

## [2026-08-01] 修正 | 体检笔记 dashboard 裁决 + PDF 出库补漏
- 笔记分歧#2 裁决修正为"Codex 对"：根 dashboard.log（7/30）为 MODULE_NOT_FOUND；"Dashboard running" 系 7/15 旧日志误读；dashboard 进程未运行，待重启生效
- 补漏：2025-ai-design.pdf（23.8MB）移出 git（保留磁盘副本，走 Obsidian sync）；wiki/sources/2025-ai-design.md OCR 引用改指 temp/archive
- 详细 → notes/2026-08-01-环境体检-双Agent对比.md

## [2026-08-01] 环境体检 | 双 Agent 对比 + 修复（多视角审查首个案例）
- ZCode × Codex 独立体检：共识 5 / 分歧 4（逐条举证裁决）/ 独有 6+5 / 共同盲区 1
- 修复：.gitmodules 登记 bridge、临时产物移出 git（移 temp/archive/ 可回退）、文档对齐（ops/AGENTS.md、status-doc v0.3）、看板快照（ops/reports/board-snapshot.md + 脚本）、多视角审查协议（lens.md + compare.md + SOP 场景E）、信任红线入规范
- 待决策：git 仓库根迁移 / 已完成项目归档 / 认知外包双家 / stats 管道是否恢复
- 详细 → notes/2026-08-01-环境体检-双Agent对比.md

## [2026-07-17] 写作项目启动 | 认知外包
- 收集第一篇素材（"Ask Claude"文章） → raw/01-articles/2026-07-17-cognitive-outsourcing-source.md
- Obsidian 作写作白板用，围绕文章组织素材关联
- 详细 → notes/2026-07-17-认知外包-写作项目.md

## [2026-07-02] ingest | 纳西索斯效应入库
- 创建 wiki/concepts/纳西索斯效应.md（系统自我反馈反噬本体）
- raw 文件：raw/01-articles/2026-07-02-纳西索斯效应-抖音.md
- 详细 → notes/2026-07-02-概念-纳西索斯效应.md

## [2026-07-02] ingest | 精选两项 + 教育多样性入库
- 更新 wiki/sources/佐藤大-超快速工作法.md（新增"精选两项"摘录与反射）
- 创建 wiki/sources/教育多样性与创新拔尖班的失败.md（上海科技馆馆长演讲）
- 创建 wiki/concepts/资源集中原则.md（串联两者：资源集中 vs 补短板）
- 补建 raw/09-archive/2026-06-22-教育多样性与创新拔尖班的失败.md
- 核心连线："全面发展"扼杀长板 = "精选两项"的反面案例
- 更新 index.md：新增 1 source + 1 concept
- 详细 → notes/2026-07-02-读书-超快速工作法-精选两项的选择原则.md

## [2026-07-01] ingest | 佐藤大《超快速工作法》wiki 入库
- 修复：raw 文件从 01-articles/ 移至 05-books/
- 创建 wiki/sources/佐藤大-超快速工作法.md
- 新建概念页：工作范式 / 记忆调度
- 新建实体页：佐藤大
- 更新 index.md：新增 1 source + 2 concepts + 1 entity
- 核心讨论：两种工作范式（完全专注 vs 弹钢琴）、空杯心态与 AI 上下文切换、记忆调度机制、日报作为强制审计
- 详细 → notes/2026-07-01-读书-超快速工作法.md

## [2026-07-01] note | 超快速工作法笔记补录
- 用户补录了佐藤大《超快速工作法》阅读笔记（多任务处理、空杯心态、灵感捕捉、信息管理等）
- 更新 raw/01-articles/2026-07-01-佐藤大-超快速工作法.md
- 待 Clio（陪读 Bot）接手继续记录后续章节

## [2026-07-01] note | 读书-超快速工作法-AI协作的中心触手模型
- 从佐藤大的书联想到多 AI 协作的"中心+触手"模型
- 讨论：损耗的两面性、功能瓶颈 vs 方向瓶颈、分层授权
- 关联：AI原生组织 / 认知外包 / 文件驱动型多Agent编排 / 设计中的探索与产出
- 详细 → notes/2026-07-01-读书-超快速工作法-AI协作的中心触手模型.md

## [2026-07-01] 新增 notes | 为什么要给自己做AI工作环境
- 用户反思：做自己的产品经理，从真实痛点出发
- 关联 The Mom Test 方法论 + natolisnuggets 推文
- 详细 → notes/2026-07-01-为什么要给自己做AI工作环境.md

---

## [2026-06-29] prompt | 链接处理：反问不要总结
- 系统提示新增"链接处理"规则：用户发链接时禁止直接总结，改为存 raw/ + 苏格拉底式反问
- 反问方向：与已有认知的冲突？作者背景/利益？适用边界？打算怎么用？
- 理由：总结给的是知识幻觉，反问才能引导真正的理解
- 同步修正：知识/灵感写入路径从 notes/ 改为 raw/

## [2026-06-29] schema | CLAUDE.md 更新：raw/ 为唯一入口
- 新增核心规则：所有来源必须先进 raw/，再 ingest 到 wiki/，不允许跳过 raw/ 直写 wiki/
- 场景：手机发消息/链接 → AI 存到 raw/ → ingest → wiki/ + index + log
- 目的：统一入库路径，杜绝 index 脱节问题
- 同步更新：raw/ 目录说明（04-meeting_notes/ 用于手机碎片想法）

## [2026-06-29] lint | index.md 全面重建
- 原因：index.md 停在 5/16，Obsidian sync 持续积累的页面未被索引
- 变更：sources 18→41，concepts 36→90+，entities 12→14
- 新增主题分组：设计方法论、AI硬件、AI认知、知识管理、软件工程、AI组织、政治社会、黄峥认知框架
- 发现：大量 wiki 页面（特别是黄峥系列、AI组织、设计哲学）通过 Obsidian sync 入库，未经过 log.md 追踪的 ingest 流程
- 待办：syntheses/ 综合分析层仍为空，可选主题：设计方法论、知识管理循环、儿童AI硬件

## [2026-06-18] project | frag-knowledge 碎片知识协作系统 MVP 完成
- 产品定位：手机+电脑碎片知识协作，核心理念"AI追问，人来总结"
- 技术栈：Express + PWA + AnkiConnect API
- 设计哲学：必要难度、兼听则明、知识保鲜
- MVP 功能：手机捕获（即时/稍后两种模式）→ AI 追问 → 归档 bAI → 生成 Anki 卡片 → 卡片审阅（标记需更新/新理解）→ 更新知识库
- 关键洞察：卡片审阅 = 知识库维护（人类驱动质量检查，AI 辅助修改）
- 与 ai-collab-flow 的区别：核心是完整循环，不是翻卡片
- 项目路径：studio/projects/frag-knowledge/

## [2026-06-13] ingest | 置身钉内读书笔记 + 设计方法论概念
- 来源：《置身钉内》读书过程中的讨论（实体书 + AI 陪读）
- 创建 notes/2026-06-13-读书-置身钉内.md（典故速查 + 讨论记录）
- 新建概念页：设计中的探索与产出（设计从模糊起点出发，终点未知，必须在约束中发现）
- 更新 wiki/index.md：新增 1 concept
- 核心洞察：约束是想象力的框架；判断力在探索过程中生长；不存在「走歪了」
- 与已有概念交叉：知行关系与AI时代的认识论危机 / 靠表达来学习
- 详细 → notes/2026-06-13-读书-置身钉内.md

## [2026-05-05] ingest | OpenCode 架构与 Windows 排障
- 来源：OpenCode Windows 排障过程中的架构分析（非 raw/ 来源，直接从对话中提炼）
- 创建 wiki/sources/OpenCode-Windows架构与排障.md
- 新建概念页：Electron-Bun双架构分发（Electron 桌面端 + Bun 编译 CLI 的稳定性差异）
- 新建实体页：OpenCode（工具实体，含架构、路径、已知问题）
- 更新 wiki/index.md：新增 1 source + 1 concept + 1 entity
- 核心发现：CLI 自包含（Bun 编译内嵌所有依赖）比 Desktop（npm 分发 + Electron asar）更稳定，接口越简单越不容易坏
- 与已有概念交叉：npm-optional-dependency陷阱 / Windows中文路径编码 / 深度模块

## [2026-05-05] design | AGENTS_TEAM.md v0.1 + 四个子 Agent 模板
- 起草 `studio/projects/agent-orchestration/design/AGENTS_TEAM.md`
- 创建四个子 Agent 模板：`studio/agent-templates/planner.md` / `developer.md` / `tester.md` / `reflector.md`
- 设计原则：对人和 AI 都友好；主 Agent 只协调不读内容；独立上下文空间
- 借鉴 Matt Pocock（Grill Me / Ubiquitous Language / TDD / Deep Modules / 人是战略层）
- 子 Agent 与 workspace 深度集成：遵循 AGENTS.md/SOP.md / 查 wiki / 写 notes / Reflector 萃取入 wiki

## [2026-05-05] ingest | Software Fundamentals Matter More Than Ever — Matt Pocock

- 来源：YouTube 演讲（https://www.youtube.com/watch?v=v4F1gFy-hqg）
- 原始 transcript 移入 raw/03-transcripts/
- 创建 wiki/sources/Software-Fundamentals-Matter-More-Than-Ever-Matt-Pocock.md
- 新建概念页：深度模块 / 通用语言 / 软件熵与复杂度 / TDD与AI步调控制 / 共享设计概念
- 新建实体页：Matt_Pocock
- 更新 wiki/index.md：新增 1 source + 5 concepts + 1 entity
- 核心发现：软件基本功在 AI 时代更重要；跨领域共识（与设计师战略领导力呼应）
- 修正：之前误将笔记放 notes/ 和 raw/ 根目录，现已按 CLAUDE.md 规范重新 ingest
- raw 文件待移至 09-archive/（用户确认后移动）

## [2026-05-04] project | 立项 agent-orchestration + 调研入库
- 创建 studio/projects/agent-orchestration/（README + AGENTS + STATUS）
- 首轮调研：Claude Code 生态 + 通用框架 + 文件驱动型编排
- 创建 concept：文件驱动型多Agent编排 / ClaudeCode上下文管理 / Prompt缓存机制
- 创建 source：Everything-is-Context论文 / ClaudeCode使用技巧-抖音视频
- 核心发现：workspace 已是文件驱动型编排雏形，不需外部框架
- 下一步：起草 AGENTS_TEAM.md
- 详细 → notes/2026-05-04-agent-orchestration-research.md / notes/2026-05-04-claudecode-tips-notes.md

## [2026-05-04] refactor | 简化 git 跟踪内容

- 本地保留完整知识库（Obsidian sync）
- git 只保留示范用最小示例（3个核心概念 + 1个来源 + 核心配置）
- 移除：大部分 concepts、sources、notes
- 更新 .gitignore：notes/、raw/、.obsidian/ 只在本地
- 更新 wiki/index.md：精简为示范目录
- 更新 SOP.md、AGENTS.md、CLAUDE.md：明确双轨管理策略

## [2026-05-04] ingest | 2025-ai-design + OCR

- Tesseract-OCR 5.4.0 安装完成
- pypdfium2 渲染 53 页 PNG
- pytesseract OCR 提取文本（chi_sim+eng, PSM 3）
- OCR 质量较差，改用"你读 + 我整理"流程

## [2026-05-04] update | 快照机制集成

- SOP.md、CLAUDE.md、AGENTS.md 均已集成快照读/删流程
- OpenCode 和 Claude Code 都会自动执行

## [2026-05-04] init | Studio 1.3 工作环境完整审视

- 审查文档结构，发现并修复 5 个问题
- 创建 wiki/concepts/：两段式记忆系统 / Karpathy原则 / LLM-Wiki-概念 / 中断反问机制

## [2026-05-03] init | Wiki 结构初始化

- 创建 CLAUDE.md（Wiki Schema）
- 创建 index.md、log.md

## [2026-05-04] ingest | 孩子能不能用 AI（家教观察）

- 来源：小红书链接 + 白纸上家教实地观察
- 案例：小学生用 AI 写作文，AI 改作文软件给出错误"优秀"评价
- 核心矛盾：批判性思维未形成时，该不该给孩子用 AI？
- 创建 wiki/sources/孩子能不能用AI-家教观察与思辨.md
- 新建概念页：AI与教育（两种观点张力 + 设计缺失问题）
- 更新 wiki/index.md：新增 sources 和 concepts 条目
- 详细 → notes/2026-05-04-孩子能不能用AI-家教观察-notes.md
- raw 文件已移至 09-archive/

## [2026-05-04] ingest | ARS 学术写作工具（Edward Wu）

- 来源：Edward Wu 的 Substack 文章（2026-03-08 发布，2026-04-19 更新）
- 创建 wiki/sources/ARS学术写作工具-Edward_Wu.md
- 新建概念页：AI学术写作 / AI幻觉防范 / 苏格拉底式AI对话 / 跨模型验证
- 新建实体页：Edward_Wu / Claude_Code
- 更新 wiki/index.md：新增 sources、concepts、entities 条目
- 详细 → notes/2026-05-04-ARS-academic-writing-notes.md
- raw 文件已移至 09-archive/

## [2026-05-04] ingest | 王敏设计教育访谈

- 来源：《设计》杂志专访王敏教授
- 创建 wiki/sources/设计专访王敏-央美汽车设计教育.md
- 新建概念页：设计教育 / AI时代的设计价值 / 审美能力 / 出行创新设计
- 新建实体页：王敏 / 中央美术学院
- 更新 wiki/index.md：新增 sources、concepts、entities 条目
- 详细 → notes/2026-05-04-王敏设计教育访谈-notes.md
- raw 文件已移至 09-archive/

## [2026-05-04] ingest | 出海同学会2026第2期

- 来源：微信公众号文章（出海同学会 2026 第 2 期研讨会精华）
- 创建 wiki/sources/出海同学会2026第2期-AI硬件与机器人.md
- 新建概念页：AI硬件入口 / 端侧模型 / 机器人ROI / AI硬件出海
- 新建实体页：出海同学会 / Plaud_Note / Looki / 飞书录音豆 / 银河通用 / Nothing
- 更新 wiki/index.md：新增 sources、concepts、entities 条目
- 详细 → notes/2026-05-04-ai-hardware-robot-insights-notes.md
- raw 文件已移至 09-archive/

## [2026-05-05] ingest | 靠表达来学习（小红书视频文字稿）

- 来源：小红书视频（作者分享做短视频的原因：边做边记录倒逼理解加深）
- 创建 wiki/sources/靠表达来学习-边做边记录.md
- 新建概念页：表达式学习（费曼技巧 + 指挥感 + 知识库写作）
- 灵感笔记：notes/2026-05-05-灵感-靠表达来学习.md（用户洞见：我的知识库就是我的「操作系统实习报告」）
- 更新 wiki/index.md：新增 source + concept 条目
- 关联概念：指挥感、AI协作的动力机制、费曼技巧

## [2026-05-04] ingest | 清美讲堂：鲍里斯·科汉 — AI时代设计师战略领导力

- 来源：清华大学美术学院「清美讲堂」讲座回顾（鲍里斯·科汉，2026-04-10）
- 创建 wiki/sources/清美讲堂-鲍里斯科汉-AI时代设计师战略领导力.md
- 新建概念页：中文设计 / 设计师战略领导力 / 品牌系统设计
- 新建实体页：鲍里斯·科汉 / GRANSHAN项目
- 更新概念页：AI时代的设计价值（补充科汉来源）
- 更新 wiki/index.md：新增 sources、concepts、entities 条目
- 灵感笔记：notes/2026-05-04-灵感-中文设计作为身份系统.md（用户洞见）
- 详细 → notes/2026-05-04-灵感-中文设计作为身份系统.md

## [2026-05-06] ingest | 不推荐AI总结工具（张司机在路上的视频）

- 来源：小红书视频文字稿（http://xhslink.com/o/7mzq0oDLk0k）
- 创建 wiki/sources/不推荐AI总结工具-深度输入的价值.md（含完整原文）
- 新建概念页：深度输入 / 信息减法
- 灵感笔记：notes/2026-05-06-灵感-AI总结与信息减法.md（含用户观点 + WorkBuddy 观点，均已注明来源）
- 更新 wiki/index.md：新增 1 source + 2 concepts
- 核心发现：AI 总结给的是「知识幻觉」；深度输入 + 信息减法 + 表达式学习是同一循环的不同阶段
- 延伸讨论：「兼听则明」在算法时代的前提已消失；兼听应放在「做减法之后」，对象是高质量的不同观点
- raw 原文待归档至 09-archive/

## [2026-05-16] ingest | 湖南人大：乡县人大代表换届选举工作之我见 + 全过程人民民主

- 来源：湖南省人大网，泸溪县武溪镇人大主席团（2017-09-14）
- 创建 wiki/sources/湖南人大-乡县人大代表换届选举工作之我见.md
- 新建概念页：全过程人民民主 / 基层人大代表选举 / 流动人口选举权
- 更新 wiki/index.md：新增 1 source + 3 concepts
- 核心发现：基层选举的五大问题完整解释"年轻人从未投过票"——流动人口 + 登记需主动 + 基层人手不足 + 宣传不到位 + 部分单位故意漏登
- 与用户个人疑问直接关联：22 岁大学生作为流动人口，是选民登记系统中最容易被漏掉的群体
- 详细 → notes/2026-05-16-疑问-选举权与全过程人民民主.md

## [2026-05-16] note | 疑问：选举权与全过程人民民主

- 触发：宪法规定的选举权 vs 个人从未投过票的体验落差
- 参考框架：基层是执政之基 / 接受人民批评监督是党的传统（质疑具有正当性）
- 来源：湖南省人大《怎么搞好乡县人大代表换届选举工作之我见》（2017）
- 初步回答：法律保障权利，但基层执行有 gap——流动人口多、人手不足、宣传敷衍、登记需主动
- 核心判断：不是没有权利，是执行不到位 + 双向信息错过
- 延伸：全过程人民民主的五环节叙事，在基础投票环节未感知时更难落地
- 待探索：下次换届时间、能否主动登记
- 详细 → notes/2026-05-16-疑问-选举权与全过程人民民主.md

---

*最后更新：2026-05-16*
*详细过程 → Obsidian notes（本地）*
﻿
## [2026-05-05] fix | claude-code-windows-repair 方案修正

- 废弃 v1 方案（独立安装 ~/.claude-standalone/ + 修复脚本 + PATH 优先级）
- 最终方案：`DISABLE_AUTOUPDATER=1` 在 settings.json 中关闭自动更新，一行配置一劳永逸
- 清理冗余安装：删除 .claude-standalone/，保留标准 `%APPDATA%/Roaming/npm/`
- 更新 wiki/entities/Claude_Code.md / wiki/sources/Claude-Code-Windows-中文环境修复.md / wiki/concepts/npm-optional-dependency陷阱.md
- 教训：先查官方配置项（DISABLE_AUTOUPDATER），再动手搞架构

## [2026-05-05] project+ingest | claude-code-windows-repair 建档（v1，已废弃）

- 在 studio/projects/ 新建项目：claude-code-windows-repair/
- 知识库 ingest：更新 wiki/entities/Claude_Code.md（Windows 中文环境问题章节）
- 新建 wiki/sources/Claude-Code-Windows-中文环境修复.md（完整修复记录）
- 新建 wiki/concepts/npm-optional-dependency陷阱.md
- 新建 wiki/concepts/Windows中文路径编码.md
- 更新 wiki/index.md：新增 1 source + 2 concepts
- 核心：Claude Code 在 Windows 中文用户名下三大问题（exe 丢失 / 会话乱码 / PATH 冲突）的修复方案入库
- 详细 → studio/projects/claude-code-windows-repair/docs/repair-guide.md

## [2026-08-07] capture | 环境 | lark-cli 使用方法
- 定位根因：lark-cli 已安装（@larksuite/cli v1.0.61）且认证有效，Codex 沙箱限制 AppData 二进制执行导致不可用
- 解法：escalation + prefix rule `["lark-cli"]`；`drive +search` 需补 `search:docs:read` scope
- 新建 notes/2026-08-07-lark-cli-环境与使用方法.md；根 AGENTS.md 加环境注意

## [2026-08-07] capture | 环境 | 飞书全部权限授权
- 补授 `search:docs:read` 成功；应白纸上要求执行 `lark-cli auth login --domain all`，全部权限已生效（approval/base/calendar/docs/drive/im/mail/minutes/okr/search/sheets/slides/task/vc/wiki 等）
- 实测 `drive +search --query "AI协作"` 返回 61 条，含《开始写作是我和AI的协作方案》
- 更新 notes/2026-08-07-lark-cli-环境与使用方法.md 权限状态

## [2026-06-18] capture | thought | 测试条目（frag-knowledge 调试）
## [2026-06-18] capture | thought | 好的卡片应该只测试一个知识点
## [2026-06-18] review | 更新概念 AI 与教育 | 测试审阅流程
## [2026-06-18] review | 更新概念 AI 硬件入口 | 测试审阅流程
## [2026-06-19] review | 更新概念 LLM Wiki | Karpathy 提出用 LLM 替代人类维护一个持久、累积的知识 wiki

## [2026-08-21] 操作 | AI 主目录迁入工作空间（阶段1）+ dsh-project-board 立项
- 7 个 AI 目录（.lark-cli/.agents/.claude/opencode 三件套/.qwen-mm-plugins）junction 方式迁入 ai-homes/，验证通过；.gitignore 已加 ai-homes/
- .dsh 迁移（阶段2）提示词备好待 zcode 停机执行；dsh-project-board 已立项并上飞书看板（recvsV0abmLcNR，计划中）
- 详细 → notes/2026-08-21-ai-homes-migration-notes.md

## [2026-08-21] 操作 | DSH 升级 0.1.0-rc.8 → 0.1.1-rc.1（源码树原位换内容）
- deepseek-harness/ 是无 .git 的官方源码提取（workspace .gitignore 忽略），无法 git pull；改为浅克隆官方 tag dsh-v0.1.1-rc.1（commit 528c682）→ pnpm install + build → 内容级对调回原路径，启动命令 `node ...\deepseek-harness\apps\cli\lib\bin.js web` 不变
- 根目录条目被外部进程锁定（子目录可动），采用"只动子目录"的内容级对调完成；新树保留 .git，后续升级可直接 fetch+checkout tag 后重建
- 验证通过：--version=0.1.1-rc.1；--dump-config 全层组合正常（vision-fallback 桥接、飞书提醒 v3、dsh-schedule、qwen-mm MCP 均挂载）；web --no-open 实启 HTTP 200；~/.dsh/profiles 符号链接经 heal 自动指向新树
- 回退资产：旧树 temp/archive/deepseek-harness-0.1.0-rc.8-20260821/；~/.dsh 备份（sessions/skills/storages/settings/profile 配置）temp/archive/dsh-home-backup-rc8-20260821/（53MB）
- 注意：rc.1 会话投影存储格式与 rc.8 不兼容提示仍在，若旧会话加载异常用备份恢复；本次变更未提交 git（deepseek-harness 本就不入库），工作区 wiki/index.md 等既有未提交改动保持原样

## [2026-08-22] 操作 | .dsh 迁移事故与完整恢复（迁移取消）
- 按 temp/zcode-dsh-migration-prompt.md 执行 robocopy /E /MOVE 时穿透 ~/.dsh 内 233 个链接（双层：.dsh junction → apps/cli/node_modules pnpm 工作区符号链接 → packages/*/vendor/* 源码本体），波及工作区 562 个 git 跟踪文件；及时中止，逐文件精确还原（门槛：git 删除清单 562/562 覆盖、0 冲突），git 已干净、.dsh 基线 67 文件/55,815,456 字节一致、233 链接全部可解析、DSH web 重启正常
- 用户裁决：放弃迁移，.dsh 留 C 盘不建 junction；ai-homes/dsh 空壳已清；若未来重试，用 DSH_HOME 环境变量或 /XJ+手工重建链接，切勿裸 robocopy /MOVE
- 详细 → ops/reports/2026-08-22-dsh-home-migration-incident.md

## [2026-08-24] 操作 | DSH「只剩官方模型」根因修复——Go 网关按协议拆路由
- 根因：8-22 晚手改 settings.yaml 给 opencode-go 补的 13 个模型不在 pi-ai 0.82.1 内置目录且无路由级 api，重启时 assertServiceable 整体拒绝 llm-pi-ai 命名空间（手改绕过 UI 校验，坏条目潜伏到重启才引爆）
- 修复：新增 opencode-go-completions / opencode-go-messages 两条路由（baseURL zen/go/v1），8 个模型实测 200；5 个不可用（mimo-v2×2/hy3-preview 上游不支持，gpt-5.6-luna/muse-spark 地区封锁）；本地校验 all routes serviceable
- 备份 temp/archive/dsh-protocol-split-20260824/；校验/探测脚本 temp/diag-dsh-check2.mts、temp/diag-dsh-probe.mjs
- 详细 → notes/2026-08-24-dsh-自定义模型消失排查与Go网关协议拆分.md
- 追加（同日）：应用户要求补 opencode-go-responses 路由（gpt-5.6-luna、muse-spark-1.2-contributor，openai-responses，displayName 标注需代理）——直连 403 属上游地区封锁，用户使用时开全局代理；校验 all routes serviceable

## [2026-08-24] 操作 | Figma MCP 接入——官方远程服务入列，本地 3845 转备用
- 用户在 Figma 桌面版「Add Figma to your agentic coding tool」弹窗取得官方远程端点 mcp.figma.com/mcp；连通性实测 HTTP 405（存活，要求 POST，正常 MCP 响应）
- .zcode/config.json：新增 figma-remote（enabled），原本地 figma 条目（127.0.0.1:3845，Dev Mode 开关从未启用）转 enabled=false 备用；已登记 ops/components.md
- 待验证：新会话 tools 挂载 + OAuth 授权；波及面 = VIBE-DESIGNING D8 前置解锁、figma-agent-打通 项目、resume-portfolio V1 开发动线

## [2026-08-26] 操作 | Figma MCP 插件路线接入与挂载诊断
- 白纸在 ZCode 安装官方 figma@claude-plugins-official v2.2.96（读 Claude Code 插件）：12 skills 即时生效；插件自带远程 MCP plugin:figma:figma（mcp.figma.com/mcp + X-Figma-Plugin-Bundle 头），与工作区 figma-remote 同端点并行启用
- 会话启动挂载两次失败（日志实证：Version negotiation probe timed out after 5000ms）；会话外 curl 实测直连 0.6s 返回 401（存活待授权）→ 判定间歇性网络瞬断，非 OAuth 死锁；待重启/新会话重连后走浏览器 OAuth 授权再验证
- 同场发现：本会话 paper(29979)/pixso(3667) 本地服务未运行亦挂载失败；pixso 用时需先开 Pixso 客户端
- 过程记录：上一会话 sess_56ef6171 未竟任务由本会话接续——其 PRD 起草部分已随 119c6f1 入库（PRD-v0.1 待白纸评审），崩溃根因=OpenRouter ox-alpha 大请求网关连续断连（attempt 11/11）

## [2026-08-26] 操作 | 落地页 Baseline 快照导出 Superdesign 画布留档
- 接续 sess_0753c16b 未竟任务：web/ React+Vite dist 构建产物 JS/CSS 内联为单文件 HTML（.superdesign/tmp/hylab-baseline-snapshot.html，约 205KB），import-design-draft 导入画布项目 70e88f80，draft 28f92552-7012-413b-accc-3fdd06e48068
- 画布预览实测会执行脚本：React SPA 完整渲染（暗面 Hero 幽灵字 + rAF 信号场 + proof 证据卡 + 苔绿 footer），无头 Chrome 双屏截图验证；resume.json 已登记第四稿（kind=archive-snapshot）
- 同场核实：阿里 Design I/O 三图归档此前已完成（raw/2026-08-19 原文附录文字化重建 + raw/assets/ 三张 PNG）；Product.md 草稿仍待白纸逐条表态（逐层过一遍流程第一层）

## [2026-08-26] 操作 | 19 参考站全要素深度调研（重做）
- 白纸裁决上轮扫描太浅，本轮 chrome-devtools 逐站实测重做：R07-R25 每站探测技术栈/加载策略/字体/动效预算/交互机制/内容结构，落盘 19 份深度档案 + INDEX 总索引（studio/projects/resume-portfolio/design/深度调研-2026-08-26/）
- 硬结论：热区图 5/19 站（G-16 验证充分）；活人感件七级光谱；Geist 系 6/19；修正上轮三处误读（R09 双域名彩蛋/R12 双路由/R11 内滚结构）
- 截图 filePath 通道被 chrome-devtools MCP 权限拒（中文/ASCII 路径均拒），视觉记录复用上轮整页 PNG
- Claude Code 升级 2.1.148→2.1.246 并立为设计子代理（白纸定调：ZCode 主界面、CC 干设计活）；双模型档接入：默认 OpenCode Go（deepseek-v4-flash 主+minimax-m2.5 辅，mimo2.5 官方仅 OpenAI 协议进不了 CC）、切换档百炼（qwen3.8-max 主+qwen-flash 辅）；旧 MiMo 直连 401 失效已替换（备份 temp/archive/claude-code-provider-20260826/）
- Figma MCP 接入 CC 完成：远程 mcp.figma.com OAuth 白纸交互式授权，whoami 全链路验收过（Full 席位 student 层级）；ZCode 内远程路线同日终审判死（DCR 403 确定性拒绝），工作区 figma-remote 已禁用；白纸 PowerShell profile claude 函数修 claude.exe→claude.cmd

## [2026-08-27] 调查 | OpenCode Go/Zen 模型列表变更核查：Ox Alpha 三通道退役
- 白纸询问最近更新，实拉两端点 /v1/models + 最小请求实测：Go 端点 27→31 净增（glm-5.3-flash/grok-4.6/longcat-2.0/vision-exp）；Zen 免费层 x-preview-f-free 消失余 8 个；hy3-free 实测 200
- 核心发现：Ox Alpha 三条免费路由（zen x-preview-f-free / go ox-alpha-free / openrouter stealth/ox-alpha）本周内全部关闭，OpenRouter 报错揭秘其本尊为智谱 GLM-5.3 Flash 内测转正
- 影响面：eagle 打标 tagger.mjs 三路由全灭（Batch 2 续跑前须换工人）；youtube-vault-bridge 与 DSH 默认模型无恙；替代建议已列笔记待拍板
- 详见 notes/2026-08-27-opencode-go模型列表变更与ox-alpha退役.md

## [2026-08-27] 操作 | Ox Alpha 模型目录清理 + 打标工人换血待办登记
- 白纸两项裁决落地：① 模型目录立即清除全部 ox-alpha 系条目；② tagger.mjs 打标工人列入待办换 OpenCode Go 的 mimo-v2.5（执行时机后定，本轮未动代码）
- DSH ~/.dsh/settings.yaml 四处改动：默认 agent 模型 stealth/ox-alpha→恢复 opencode-go/deepseek-v4-flash；opencode-go-completions 与 opencode-zen-free 各摘一条 ox；整条 openrouter 路由删除。改后校验器 RESULT: OK — all routes serviceable
- ZCode ~/.zcode/v2/config.json：Go(Chat Completions) 与 Zen Free 两 provider 各摘一条 ox；空壳 OpenRouter provider 删除（余 12）；node 结构化删除+JSON 复验通过
- 备份 temp/archive/model-cleanup-20260827/；OPENROUTER_API_KEY 留在 credentials 未动；飞书看板 eagle-bridge 记录已回写退役事实+待办；生效需重启 dsh web / ZCode
- 关联笔记 notes/2026-08-27-opencode-go模型列表变更与ox-alpha退役.md（含白纸裁决与执行记录节）

## [2026-08-27] 决议 | Product.md v0.9 落盘（白纸逐条过审）
- 逐条过审结果：座右铭=如切如磋如琢如磨（诗经·淇奥）×Michelangelo 大理石天使轶语，中英典故对仗；站性质=内部准则页面零出现（性质入则不入文，白纸纠正"王婆卖瓜/AI 腔"）；个人特色四点=北师大/设计师/理性视角/技术全面；60秒双考核=概括四点中两点+转述对外数字（内部指标不入页，白纸裁决）
- 边界 v2：简历 PDF 链接上站+作品集拆条目；邮箱+手机 tel:；不脱敏（19 站实证雇主实名通行，白纸裁决推翻 Agent 脱敏提案）；图片=Figma 矢量导出优先（作品集原始文件全在 Figma，白纸另一会话 Figma MCP 已通）
- MVP=Trestle 式翻页书：加载屏座右铭逐字灰→黑渐显（白纸录屏 trestle.inc 逐帧拆解实证：per-letter fade 非打字机，13-14.5s）+ scroll-snap 一屏一页 + 顶部中央页码/内容名指示器；项目页大图少字占位槽（Behance 式，图白纸填）；简历页=结构化简化版+双语 PDF 链接
- 作品集 PDF 已拆解（23 页=9 项目+简历页，复印 input/作品集-陈柏志-2025.pdf）；T1/T2 分层被白纸推翻，改占位槽制
- 产物：studio/design/Product.md v0.9；下一步=Domain 层逐条过审

## [2026-08-27] 操作 | 飞书「史书」开卷：个人网站建设史 v1 写入
- 白纸计划把建站过程发社交媒体，指定飞书文档 SyGpdeLkyoaTazxVzT6cO4iFnqb 作史书底稿（原文档为 7 月 Figma-Agent 线，保留不动）
- 追加新章《个人网站建设史（2026-08）——从立项到「翻页书」》九节+尾声：护城河起点/提前启动/基因库灵感库/V1静态站/画布三稿/两版实现与验收转折/深度调研与Design I/O/收敛定形（作品集拆解+Product.md+Trestle翻页书）/制度红线表；取材 git 史+wiki 日志+各会话纪要，随做随记

## [2026-08-28] 操作 | 史书补遗：设计工具 AI 接入迁移史
- 白纸指漏：paper/pixso 等设计软件 AI 接入探索（发生在 ZCode 各会话）未入史书。深挖 ZCode 会话日志+组件台账+记忆补全
- 史书插入补遗章（09 与尾声之间）七节：视觉模型与素材线（vision桥/免费模型/eagle-bridge/ox-alpha退役）/Paper兴衰（08-25主介质→08-26配额裁决弃用+怪癖档案）/Pixso主介质（18色彩令牌Variables/整页图层2:44/社区资源直拉不可用）/Figma堵绕通（ZCode两路全堵→Claude Code子代理08-27首战AntD实建）/Superdesign画布（SPA快照定式）/多会话互覆事故与四规则/划线回廊基准与视觉验证怪癖
- Figma 测试阶段收官（白纸 08-29 宣布）：经验沉淀为操作手册 studio/projects/figma-agent-打通/FIGMA-MCP-USAGE.md（架构/fileKey 地图/工具速查/SOP/13 坑位/红线），README 同步指向并修正 08-26「间歇性网络问题」误判（实为 DCR 403 终审）；MY WEBSIDE 定为设计主文件（SDS+M3 双库已挂，库消费链路实测通）

## [2026-08-30] 接入 | react-best-practices skill 装机（Vercel 官方）
- 白纸预批条件「项目重度用 React 才装」→ 按条款 1.5 评估：MVP 翻页书=已验收 web/ React 代码库的改造（Loader/SignalField/ClipText 等全复用），重度成立，条件满足即装
- 安装：vercel/vercel-plugin repo skills/react-best-practices → ~/.agents/skills/react-best-practices（748KB：SKILL.md + rules/ 66 规则文件 + AGENTS.md 汇总，无运行时依赖）；已登记 ops/components.md（含卸载方式）
- 用法约定：MVP 代码写完后对照 64 条清单检查（不自动跑），替代此前被白纸明拒的「开工前读清单」方案

## [2026-08-30] 调研 | R-26 Scott Fryxell 参考站（白纸点名）
- 主页+简历页实测：主页零 JS——博文=全幅 SVG 海报 details 折叠卡，点 + 展开动效（海报收缩右列+旋转×+正文浮现）全 CSS；简历页=网页即简历+schema.org microdata 机读、18 段经历、无 PDF
- 案例卡 input/设计参考-R26-*.md：取=展开动效语法（页内层正交于翻页）/机读简历/海报化封面/暖白佐证；details 原生元素可嵌 React

## [2026-08-30] 操作 | R-27 入 Eagle + G-21 基因立档 + MVP 条款更新
- 编号纠错：R-26 已被 ThreeUI 占用（前会话），Scott Fryxell 改 R-27（案例卡已改名）
- Eagle 入库：两枚书签（主页+简历页）入「网页设计参考」夹 MT7DXMYRZA5AG，标签含 R-27/ScottFryxell/details展开动效/机读简历，验证 2 项在库
- G-21 展开看细节立档（白纸点名平移）：+ 旋转×/大图收缩/正文浮现，原生 details 语法；红线=与翻页正交、预算 150-600ms、不引 JS 动画库；基因库总览表补 R-27 行
- Product.md §8 MVP 项目页追加「展开看细节」条款

## [2026-08-30] 修复 | R-27 书签标签乱码（Eagle 写操作编码铁律）
- 白纸 UI 发现两枚 R-27 书签中文标签全乱码；根因=Git Bash curl -d 内联中文被转 GBK 字节，Eagle 按 UTF-8 读即乱码（Agent 首验时误判为控制台显示问题，教训：api 验证必须看 ascii() 转义而非裸 print）
- 修复：python urllib UTF-8 POST /api/item/update 重写 tags+name，验证六项中文标签全部正常；书签 name 被 Eagle 同步回网页标题（自设中文后缀剥离，无害）
- 铁律入记忆：Eagle 写操作带中文一律 python urllib 或 --data-binary @file，永不 curl -d 内联中文

## [2026-08-30] 调研 | R-28/R-29 两参考站（白纸点名）+ Eagle 入库
- R-28 historyofsoftware.org（Rauno）：博物馆图录排版——Fig N. 灰斜体图注/标题嵌正文段/展品面板/大留白/角标彩蛋（I care about this）
- R-29 devouringdetails.com（Rauno）：左缘刻度尺目录——章节刻度+位置箭头+贯穿线+阅读焦点渐隐，导航/进度/位置三合一；与已拍 Trestle 顶部指示器成两种导航候选（MVP 先顶部，刻度尺候选 V2）
- 案例卡两份 + G-22/G-23 候选基因入基因库（⏸ 待白纸定调上站位置）+ Eagle 两书签（python UTF-8 通道一次成型零乱码）

## [2026-08-30] 调研 | R-30/31/32/33 四站入库 + 素材库归类索引建立
- R-30 minchi.co/books 书架拟物动画→G-24 候选；R-31 mikes.cv 航空三巧思（舷窗昼夜/航线简历/机票刷卡开场）→G-25/G-26 候选（theme.js 预置底色工程手法即刻可用）；R-32 CollectUI、R-33 21st.dev 定性素材库
- react-bits 评估=实现资源 I-02（46k★ MIT+CC 逐件取用，不整库依赖，SplitText 对应逐字渐显）
- Eagle 净增 5 书签（R-30/31/32/33+react-bits），Amicro 补素材库标；全部 python UTF-8 通道零乱码
- 建 input/设计参考-素材库与工具索引.md（四分类：组件动效库/UI灵感图库/工具线/站内资产；Eagle 素材库标一键筛）
- 事故记录：会话中段误用 computer-use 桌面通道+工具选择死循环，站点调研统一走 chrome-devtools/静态抓取双通道（本轮 chrome-devtools 调用受阻，三站走静态抓取+白纸目视描述，动效细节待浏览器复核）

## [2026-08-30] 整理 | Eagle 新建「素材库与工具」夹（白纸裁决分家）
- 白纸点名：CollectUI 类素材站、ThreeUI 类 GitHub 仓库不适合留在「网页设计参考」→ 新建顶层夹「素材库与工具」(MTEOJDJGWTIEZ)
- 搬家六件：ThreeUI 仓库(R-26)/ego-lite 仓库(R-04)/CollectUI(R-32)/Amicro(R-05)/21st.dev(R-33)/React Bits(I-02)，add_to_folders+remove_from_folders 各 6/6 成功；残留「网页设计参考」标签已摘（5 处，react-bits 本无此标）
- R-xx 编号标签保留可溯；索引文件同步两夹分工与维护规则（素材库/组件库/GitHub 工具→素材库与工具夹；整站参考→网页设计参考+案例卡流程）

## [2026-08-30] 调研 | R-34 Shadcn Studio（白纸点名查看）
- shadcnstudio.com=付费 shadcn 生态市场（1000+ 组件/Blocks/UI Kits/Boilerplates/模板/主题，Radix+Base UI，$45-249 全套访问+单品 $1-79）
- 定性=素材库（同 21st.dev），直入「素材库与工具」夹 R-34；索引+基因库总览表已同步
- 对我方评估：我们栈无 Tailwind/shadcn，直接引入=选型决策（涉 Tailwind）不轻动；当前价值=成熟布局模式查件（仪表盘/应用壳/落地页），react-best-practices skill 亦指向 shadcn 路线备查

## [2026-08-30] 修正+入库 | 开源仓库三件（白纸指正"这些是开源的吧"）
- 白纸核实正确：shadcn-studio 仓库本体 MIT 开源（站点付费的是高级模板，核心免费）——R-34 档案已补注；motion-primitives=ibelick 6.1k★ MIT；fancy=danielpetho 3.1k★ MIT
- Eagle「素材库与工具」夹新增三书签：I-03 shadcn-studio 核心仓库 / I-04 Motion Primitives / I-05 fancy components（入库 success 服务端确认；终验时 Eagle 被关闭，UI 复核待其重开）
- 索引+基因库 I 表同步；实现资源从 I-02 扩到 I-05（react-bits/shadcn核心/motion-primitives/fancy 全 MIT 系逐件取用路线）

## [2026-08-30] 决议 | MVP 实现策略条款落盘（白纸授权"按观察修改"）
- Product.md §8 新增实现策略：动效实现以 I-02~I-05 MIT 库为参考源、逐件抄写改造挂自建 spring/令牌；不引入 Framer Motion/Tailwind 整库依赖（三条理由：用量配不上重量/自建基建已验收/G-20 同纪律）；引 FM 须未来单独拍板
- 对应关系落定：逐字渐显←SplitText 参考+theme.js 手法；翻页=CSS scroll-snap；展开=原生 details
- 基因库 I 表标注 MVP 指定参考源（I-02 ⭐主、I-04/05 辅、I-03 shadcn 底座备）

## [2026-08-30] 调研 | I-06 NumberFlow（白纸点名查看）
- number-flow.barvian.me = barvian/number-flow（7.7k★ MIT）：数字滚动组件，数值变化逐位滚动（里程表式），WAAPI 零依赖、reduced-motion 友好、React/Vue/Svelte 绑定
- 定位=实现资源 I-06，服务 backlog 数据带活数字（对外数字 4k+/数万使用）与「协作第 N 天」计数器；实装时首选参考或直接取用
- ⚠️ Eagle 本轮离线（41595 拒连），书签未落库待补；索引+基因库 I 表已登记

## [2026-08-30] 调研 | R-35 Abhijit Rout（白纸点名设计参考）
- 本机直连 TLS 怪癖再现，改 web_reader 通道全文抓取成功（Framer 站）
- 全系列人格浓度 Top1：Ticker 跑马灯开场/「Scroll & scavenge」滚动承诺/实验墙玩梗命名/Stage-4 癌症缓解诚实叙事/「Work Chronicle」时间线命名/「Still here? I saved you a seat」滚动奖励彩蛋/Resume+Booklet 双外链/背景音乐署名
- G-27 实验墙 + G-28 滚动奖励彩蛋候选入基因库；案例卡 R35 落盘；Eagle 仍离线书签待补（连 NumberFlow I-06 共两枚欠账）

## [2026-08-30] 接入 | 四库本地参考区建成（temp/refs/，白纸问"能否直接调用"）
- 浅克隆 shadcn-studio/motion-primitives/fancy/react-bits 至 temp/refs/（删 .git 与 react-bits public/，净重约 50M）
- 组件查找地图入素材库索引：各库组件路径+依赖饮食表（FM/Tailwind→spring.ts/tokens 三道翻译铁律，许可留痕）
- 调用流程定型：白纸点名组件→读本地源→按铁律改造→进 web/src（零联网）

## [2026-08-30] 运维 | AI 会话考古 + GitHub 贡献图邮箱修复 + 网站热区接真实数据（白纸睡前授权）
- 全工具会话普查（新管线 ops/scripts/ai-session-scan.py，只读）：133 会话 / 4.2 万活动量 / 38 活跃日；ZCode 50 · DSH 44 · Codex 12 · Claude Code 17 · Trae×2 10；QClaw/OpenCode 本地无会话残留；快照报告 ops/reports/ai-session-scan.md
- GitHub 稀疏根因=196 个 commit 全用 user@example.com（未归属账号）；filter-branch 改写邮箱（日期保留）+强推，年度贡献 29→225、活跃日 10→33；备份分支 backup/pre-email-rewrite-20260830（旧 SHA de32456）已推远端；AGENTS.md「项目级邮箱已配置」原为失实记载，现修正为真
- 网站热区图 G-16 首步接通：ai-heatmap-data.json（脚本产物）+ aiUsage.ts 真实重写 + EvidenceBoard 撤「示例数据」徽章；时代条=Trae→QClaw→Codex→ZCode（实证起止），Claude Code/DSH 并行进脚注；构建通过、preview 验证
- 待白纸：GitHub Settings→Profile 勾 Private contributions（无 API）；每日上传三案（A 会话收尾/B 定时任务须批/C 不刻意）待拍板

## [2026-08-30] 调研 | I-07 Fluid Functionalism（白纸点名"看看对我们有没有用"）
- fluidfunctionalism.com = mickadesign/fluid-functionalism（781★ MIT，昨日仍在推）：弹簧物理 UI 组件集 24 件（Accordion/Dialog/Tabs/ThinkingIndicator 等 AI 对话件）+ animation-guidelines.md 弹簧调参指南（fast 0.08s hover / moderate 0.16s dropdown / slow 0.24s modal 三档；出场比入场略快的节奏律）
- 有用性判定：组件本体对 MVP 用不上（无表单场景），**animation-guidelines 是 spring.ts 调参的直接教材**；「为什么所有输入框都这么僵硬」= 我们克制动效路线同旗者；ThinkingSteps 等 AI 对话件留给 DSH 工具 UI
- 已入 temp/refs（第五库）+ 索引 + 基因库 I-07；Eagle 仍离线（书签欠账累计三枚：I-06/I-07/R-35）

## [2026-08-31] 调研 | R-36 Best Designs On X（白纸点名记录）
- bestdesignsonx.com=X 设计作品精选图库（每小时更新人工挑选：视觉展示/logo/UI/品牌）；CollectUI 同门（Panda Network 家族）
- 定性=素材库（灵感图库），R-36；索引 UI 灵感图库类加行+基因库总览表
- ⚠️ Eagle 持续离线，书签欠账四枚（I-06 NumberFlow/I-07 FluidFunctionalism/R-35 AbhijitRout/R-36 本件）——Eagle 重开后一次补齐

## 2026-08-30 · Apple HIG 记录为候选第一参考标准（resume-portfolio）

- 白纸发 Apple HIG 官方中文站，问"能否作为我们界面设计的第一标准"。
- Eagle 入库：「素材库与工具」夹，标签 `设计标准/HIG/Apple/界面设计规范/候选第一标准`（python urllib UTF-8 通道）。
- 索引新增分类「四、设计标准与规范」+ 维护规则补设计标准类条目；原「站内自建参考资产」顺延为五。
- Craft.md 待填区立候选条款（AI 建议=分层采纳：HIG 作通用工艺层第一参考标准，不越界品牌视觉层；待白纸口令转正）。
- 结论已答白纸：能，但只在 Craft 层当第一标准；视觉身份仍归 Design.md/基因库。

## 2026-08-30 · Apple HIG 全文爬取精读 + 前答纠错（resume-portfolio）

- 白纸追问「你确定全部都读过了吗」——如实承认：前答基于训练记忆（网页抓取只拿到 JS 空壳），非本次阅读。
- 纠错三处：现行结构=入门/基础/模式/组件/输入/技术**六区**（非五区含资源）；设计原则=**八大** Purpose/Agency/Responsibility/Familiarity/Flexibility/Simplicity/Craft/Delight（2026-06-08 重新引入，旧三原则已废）；Materials 以 Liquid Glass 为主（2025-09）。
- 真接口：developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json（绕 JS 渲染）；全文快照 temp/hig-corpus/（173 文件 1.4MB）；全文精读 7 篇（设计原则/动效/加载/反馈/无障碍/启动/材质），其余标题图谱核对。
- 摘读档案落盘 studio/projects/resume-portfolio/design/HIG-摘读档案.md（含八大原则×本项目映射、翻页书硬指标：对比度 4.5:1 / 字号 200% / splash 合法但短+可跳过 / 占位依据）。
- Craft.md 候选条款与素材索引行同步纠错；Eagle 书签 MTG0I1ZY0RSZS 改名成功（后被 Eagle 同步回页面标题，已知行为）；本地 API 无移动端点，条目在库根待白纸手动拖入「素材库与工具」夹。
- Eagle API 实测：item/update 不支持 folders 字段（返回 success 但忽略）；无 deleteItem/moveToFolder 路由。

## 2026-08-31 · R-37 Studio Loop 入档（resume-portfolio）

- 白纸发 studioloop.com.br，点名「我喜欢的一种设计类型」。
- 采集：chrome-devtools 实拍首屏/第二屏；MCP 截图遇动画页卡死（老怪癖）→ 无头 Edge 整页 + DOM 文本补全（$TEMP 中转）。
- 定性：巴西工作室站，暖棕桌面拟物散物开场 + 橙色有机波浪形贯穿（品牌词 loop 具象化）+ 衬线混排/括号标签编辑部系统。
- Eagle 入「网页设计参考」夹（R-37 标签，本次带 folderId 一步到位——HIG 书签忘传 folderId 的教训已吸收）。
- 新候选基因：G-29 桌面拟物散落（重资产，V2+，存口味）；G-30 编辑部混排（纯排版零资产，可直进 MVP，待点名）；总览表加行。
- 关键口味信号上报白纸：R-03（冷净极简）与本站（暖玩拟物）= 调性光谱两端，白纸两极都喜欢——Design.md 色调定调时需表态站位。

## 2026-08-31 · 组件乐高五站 + Toolfolio 入档（resume-portfolio）

- 白纸转 X 博文（"frontend needs taste... collecting inspirations and modules, building a lego of components"）+ 5 资源，要求试用、记住、评估入项目。该博文方法论=temp/refs 抄写管线本身，互为印证。
- 逐个核查：beUI（1.4k★MIT，自带官方 SKILL.md/shadcn registry/MCP）+ Rare UI（538★MIT，自带 AGENTS.md+registry.json）→ 两库已浅克隆进 temp/refs/（删 .git），翻译管线适用；Transitions.dev（3.4k★，⚠️仓库根无 LICENSE=默认版权保留，只看不抄，实装前须确认许可；有 pro 付费层）；Beautiful UI（AI 原生界面原语，托管无开源仓→归属工作空间工具 UI 非 personal 站）；shadcn/ui 本尊（MIT，copy-paste 模式源头，I-03/I-08 的上游）。
- Toolfolio=工具聚合导航站（白纸点名记一下）→ 工具线。
- Eagle 六书签全入「素材库与工具」夹（带 folderId）；I-08~I-12 五行进基因库实现资源表；索引组件表/工具线/temp-refs 表三处同步。
- 亮点件记录：beUI chromatic-text-reveal（座右铭渐显候选）、animated-number（与 I-06 NumberFlow 竞品）；rare-ui github-activity（G-16 热区图邻域）、grid-reveal（项目网格渐入）。

## 2026-08-31 · FonsMans 推文入 AIDesigning 簇 = 两条腿方法论定调（resume-portfolio）

- 白纸转 Fons Mans 推文（x.com/FonsMans/status/2092987940678897665）并定调"这正是我们现在正在做的"。
- 推文核心：反 one-shot；先定义视觉语言→AI 只在系统内探索变体（密度/尺度/节奏）；组件人定、人力密集段 AI 承包、变体人精修（Figma agent 合作帖）。
- 白纸两条腿：①自研底层设计文档→工程化→再设计；②外部积木（按 Product.md 改造他人模板）；两腿相汇=完整设计。
- 落档：raw 全文存档（含 [Show more] 截断如实标注）→ sources 卡（含与我们体系五条映射：视觉语言先行=声明层先行/系统内变体=基因封闭变体探索/组件人定=Components.md/反one-shot=先稿后码/密集段交AI=第二条腿）→ AI-Designing.md 时机表加行（三场景）。
- 介质注：Fons 用 Figma agent；我们主介质 Pixso MCP，工作流同构。

## 2026-08-31 · 组件乐高机制改制：整库克隆→按需取件 + 介质地位更正（resume-portfolio）

- 白纸质疑"每个都克隆有什么用？太重了吧，有不克隆的法子吗"。
- 诚实自查：克隆作用=离线即时/全库 grep/免网络抽风，但需求是个位数组件，整库克隆=为借一本书买书店。
- 实测不克隆三通道全通：①raw.githubusercontent.com 单文件直取（beUI chromatic-text-reveal 6.4KB 到手；SSL 抽风必须带重试）②rare-ui registry.json 在线清单 17 件秒拉 ③gh api 备用通道（已登录稳）。
- 制度变更：删 6 克隆（beui/rare-ui/fancy/fluid-functionalism/motion-primitives/shadcn-studio），temp/refs 只留 react-bits（29M，MVP 指定参考源+站点 JS 渲染最难在线翻；可再删，重取零成本）；索引「本地参考源」节改写为「组件乐高·按需取件指南」（清单 URL/单件 URL 模式/三通道/翻译铁律不变/重建命令保留）；基因库 I-07/08/09"已入 temp/refs"同步改"按需取件"。
- 介质更正（白纸）：主力=Figma 经 MCP（Claude Code 子代理，Full 席位）；Pixso 降为免费备介质。FonsMans 卡介质注、pixso-mcp-endpoint 记忆、MEMORY.md 索引行三处已改。
- 克隆区 64MB→29MB。

## 2026-08-31 · Emil Kowalski skills 评估呈报 + 史书续写（resume-portfolio）

- 白纸发 github.com/emilkowalski/skills 问对项目有无用处。核查：33.6k★ MIT，7 skills（emil-design-eng 主件/animate/review-animations/improve-animations/find-animation-opportunities/animation-vocabulary/animate-expo），作者 sonner 作者、Vercel/Linear 动效权威。
- 评估按三问呈报（装不装待白纸拍板）：①解决 MVP 真问题（动效 taste 短板：逐字渐显/翻页/G-21 展开的手感决策）②与现有链互补不重叠（spring.ts=参数、HIG Motion=原则、Emil=决策规则与严审 Evaluator 方法论；animate-expo 与我们无关）③MIT 纯 md 成本低。建议：装+从属条款（已拍动效纪律优先）；备选=B 路线入库（同 refactoring-ui 先例）。
- Eagle 入「素材库与工具」夹（候选装机标）；索引工具线加行。
- **史书续写**：核实停在 08-28 深夜（主卷九节+补遗+两补记），08-30/31 波次未记。已补「补记（08-30~31）：参考大投喂、两条腿的自觉与终局双产物」——含投喂节奏/AIDesigning 成制/HIG 抓包纠错/克隆区改制两个"较真"故事/白纸两条腿定调/**终局双产物（白纸 08-31）：自己的 AI 设计流程 + 一套 AI 设计资源库（R-xx/I-xx/工具线/设计标准/观点簇）**。revision 32，白纸原话入文。

## 2026-08-31 · Emil skills 装机 + Skill 使用时机总册 + Vercel design.md 范本（resume-portfolio）

- 白纸拍板装 emilkowalski/skills。官方 CLI 两个坑：①npmjs 超时须 npmmirror ②CLI 内部 git clone 请求 500MB malloc 爆炸（仓库才 120KB）→ 绕开 CLI：手动 depth-1 clone + 拷贝 ~/.agents/skills/，6 件落位（emil-design-eng/animate/review-animations/improve-animations/find-animation-opportunities/animation-vocabulary）；仓库另藏 apple-design/prototype/pick-ui-library/write-swift/animate-expo 未装。
- 白纸问"装了这么多设计 skill，你知道什么时候用什么吗"→ 建 studio/design/Skill-装机与使用时机.md 总册：自装 10 组（Emil×6 触发口诀：找机会→建→术语→写完对照→体检→评审；react-best-practices；pixso×5 备介质；figma×12 主力走子代理；superdesign 点名开）+ 默认不用组（frontend-design/brand-guidelines/canvas-design/theme-factory/algorithmic-art/web-artifacts-builder 防隐性默认）+ 总从属条款（已拍声明>skill 默认值）。ops/components.md 已登记（含 CLI 失败与手动装机记录）。
- vercel.com/design.md 核读：实为 vercel-brand-guidelines SKILL.md——品牌声明单文件喂 AI 的成品范本。可借范式：竞争需求优先级序/拒绝生成默认清单/双速阅读（executive+audit）/几何先于组件（视觉变量映射）/squint+text-mask 双测/每声明一个证据之家/简化语言永不简化主张（与零假数据同族）。不取：Geist/vbg CSS/Vercel 审美本体（=refactoring-ui 同款隐性默认陷阱）；其为报告站物种、个人站活人感基因与其"禁止彩蛋"形成品牌声明确实各说各话的对照。原文存 raw/；Eagle 入素材库与工具夹（设计标准标）；索引四表加行。

## 2026-08-31 · R-38 一段话作品集 + 自有 design skill 提议登记（resume-portfolio）

- 白纸发 ozzy 推文视频（"my portfolio is a paragraph now"）+ 点名 momcilo.com 同物种。
- momcilo 核读：全站 542 字符一屏——身份句（hashtag 标签 #art #triathlon）/故事句（**活数字嵌语法**："Quit an amazing job 3651 days ago"）/动线句（行内链+状态句"Accepting new projects for Q1, 2027"收尾）。ozzy 版加三层工艺：双声部段落（黑重点/灰从句）+荧光笔高亮行内链（黄蓝绿紫）+右列斜放证据卡。
- 视频抽帧：ffmpeg 缺失，无头 Edge 虚拟时间解码不稳（9 帧中 t=6 命中即定性）；MCP 浏览器 wrapper 页再次被视频冻结（老怪癖，且 close_page 也超时——视频页冻结时 MCP 不可救，等自愈）。
- 定性：R-38 立卡（同物种双标本），G-31 散文式界面候选——**整站形态与翻页书对极不搬，六碎片件可拆用**（活数字语法化=协作第 N 天的更优形态候选/双声部导语/hashtag 行/状态句/荧光笔链低饱和版）。
- ⚠️ Eagle 欠账：momcilo+ozzy 两书签待补（41595 拒连，Eagle 离线）。
- **自有 design skill 提议已登记**（白纸问能否综合现有内容做一个）：能=声明体系终局打包；形态=薄 skill+厚声明指针；时机=Design/Craft 过审+MVP 验收后蒸馏；挂靠点记入 Skill-装机与使用时机.md 第三节；本身即终局双产物第一件。

## 2026-08-31 · 触发口诀重写：主线归还设计工程化（vibe-designing v0.24 裁决）

- 白纸纠正：Skill 使用地图初版口诀照搬 Emil 流程（find→animate→…→review），把我们的设计工程化丢了——"这样直接 copy 他的，我们前面做的就都是无用功了。站在巨人的肩膀上继续攀登才是正确的，需要加入我们自己的内容。"
- 重写 studio/design/Skill-装机与使用时机.md 第三节：主线=VIBE 六步+声明体系（主角列：Product.md/基因库/三硬规则/Design.md 令牌/稿=基准/抄写管线+spring 三档/Evaluator+红线复核），外部 skill 降为步骤内配角（定向=find-opportunities/高保真=animation-vocabulary/评审=review-animations/实现=animate+react-best-practices/验收=improve-animations）；口诀改为主线版"定向先读声明层→…→验收清单+体检"；旧 skill 中心口诀段删除。
- 原则沉淀：外部方法论必须融进自己的体系、挂在自家流程的步骤里，不能替代流程本身——与二创红线同族（借骨架，长自己的肉）。
- vibe-designing-rules 记忆升级 v0.24（含介质再正：主力=Figma 经 MCP）。

## 2026-08-31 · KAWAI《毕业 AI 味 UI》入 AIDesigning 簇（resume-portfolio）

- 白纸转发 note.com 付费文章（KAWAI《AIっぽいUIを卒業する。ノンデザイナーの設計5ステップ》，¥680）。
- ⚠️ 付费墙如实处理：免费部分=前言+失败例+步骤名（web_reader+静态 HTML 双通道确认正文在墙后）；raw 存档只存免费原文、未臆补，引用不越界（claim-only-what-you-read 纪律）。
- 核心论点：AI 味 UI 根因=没把设计判断标准交给 AI 就一发生成完成画面；5 步=收集原则→五条规则（信息顺序/主CTA/余白基准/部件/空与错误态）→单色骨架（操作先行于装饰）→定义部件→生成+检品；AI 角色=复现规则+提改善。
- 与我们体系全面同构（第六份外部印证）：設計基準=声明体系/五条规则=Components.md/单色骨架≈低保真/一画面验证=逐屏策略/检品=Evaluator/设计书≠完成图=先稿后码。
- 落档：raw 全档（含付费墙标注）+ sources 卡（含映射表与使用时机三场景）+ AI-Designing.md 时机表加行。
- 附带线索待挖：作者另有"UI 设计模式 108 种辞典"网站（会动的迷你实物），URL 未取到——拿到即入素材索引组件表。

## 2026-08-31 · jakubkrehel/skills（interfaces.dev）评估呈报（resume-portfolio）

- 白纸发 github.com/jakubkrehel/skills 问看。核查：4.6k★ MIT，11 skill（better-interface 合审/better-ui 同心圆角光学对齐/better-typography/better-colors/better-layout/better-accessibility/better-writing/interface-review 六类全审/break 组件全状态压测/variant 多变体/explain-interface 逆向 UI 实现），作者有设计工程杂志 interfaces.dev。质量实读（better-ui 全文）：规则具体到值（同心圆角公式/可打断动画=transition vs keyframes/100ms stagger），且明写"保留项目已有组件库令牌与动效语言"=天生从属位设计。
- 评估结论（呈报待拍板）：拆两类——**工具类 4 件建议装**（break=验收段状态覆盖、variant=VIBE 变体段（FonsMans 同款）、explain-interface=调研线逆向、interface-review=验收子检查器；无审美默认）；**工艺类 5 件建议缓装**（better-ui/typography/colors/layout/writing 与 refactoring-ui B/C 消化撞车：双源未合并+Design.md 未过审窗口=隐性默认陷阱），等 Craft.md 过审时二源合并逐条裁决。
- 索引工具线加行（顺带把 Emil 行更新为已装机）；⚠️Eagle 书签欠账（41595 拒连，Eagle 仍离线）。
- 未装机，等白纸口令。

## 2026-08-31 · 史书新增「投喂总账」章（防遗忘清单）

- 白纸定调：发来的内容相似与互补并存，怕后面忘——全部落到纸上，发完再综合。
- 史书追加「投喂总账（08-30~31 全部收到内容）」章（revision 33），八节：①整站参考 R-27~R-38 十二批逐条（编号/来源/提取基因/状态）②实现资源 I-02~I-12+克隆改制按需取件 ③设计标准 HIG+Vercel ④观点簇四条（Esther/refactoring-ui/FonsMans/KAWAI）⑤skill 装机与裁决（Emil 已装/v0.24 主线纠正/jakubkrehel 拆两类/未来件）⑥相似与互补图（同族五方印证/调性两端/形态对极/工艺三分工）⑦欠账与待拍板（Eagle 三书签+HIG 拖夹/HIG 转正/jakubkrehel/Craft 排期/108 辞典/Domain 供料）⑧发完后的综合三步（合并成族→过审填层→双产物成型）。
- 分工确认：飞书史书=叙事与总账层（人读），wiki log/索引/基因库/案例卡=事实源层（Agent 检索用），两层互指。
- 此后每收一批内容，总账章追加一行。

## 2026-08-31 · 史书新增「功能归类视图」章（第二视图）

- 白纸要求：不止时间线记录，还要把发来的文章/网站/参考/素材/skill **从功能上归纳归类**，后面综合用。
- 史书追加「功能归类视图」章（revision 34）：十类按用途排——①定调 ②写声明文档素材 ③画稿与变体 ④写代码抄组件 ⑤动效决策 ⑥验收评审 ⑦找灵感查范式 ⑧对外讲故事 ⑨工具基建 ⑩自立的规矩（裁决存档）。每类列手头的牌+状态。
- 综合用法已写明：①②喂声明层过审；③④⑤⑥喂自有 design skill 路由表；⑦发布成资源清单；⑧文章底稿；⑨清欠账；⑩文章制度节。
- 完整性确认：白纸发过的每一件均可在这视图+总账+索引三处找到坐标；三个"收了未收全"子项在欠账清单（ozzy 站址/KAWAI 付费墙后正文/108 辞典 URL）。
- 维护规矩：每批新收内容同时追加总账（时间线）与功能视图（用途）两处。

## 2026-08-31 · I-13 Magic UI 本尊补记 + I-14 sv-animations Svelte 镜像（resume-portfolio）

- 白纸发 sv-animations.vercel.app/fancy（github SikandarJODD/animations）：Svelte 5 移植集，342★ MIT，88 件=Magic UI×57+Spell UI×21+Fancy×10（I-05 的 Svelte 版）；单件 registry JSON（/r/ /s/ /f/）+根目录 SKILL.md；构建于 motion-sv+Tailwind+shadcn-svelte。
- 顺藤牵出重大漏记：**Magic UI 本尊 magicuidesign/magicui 22.1k★ MIT**（120+ React 动效组件）此前从未入册——已补 I-13；官方 magicuidesign/mcp（202★ MIT）AI 编辑器直装线索另记。
- 定性：I-13=按需取件 React 正源（比镜像更可直抄）；I-14=Svelte 不可直抄 React 项目，作组件清单对照窗+Spell UI 独家来源。
- 同作者另有 svelte-animations 1226★（含 Aceternity UI 移植）——Aceternity 家族未入册，线索挂起待白纸点名。
- 索引组件表+基因库 I 表已加行；Eagle 仍离线（欠账累计 5 书签：momcilo/ozzy/jakubkrehel/magicui/sv-animations）。
- 史书按新规矩执行第一批：总账+功能视图各追一条（见下一条飞书追加）。

## 2026-08-31 · 两会话审计查遗漏——四项补齐（resume-portfolio）

- 白纸要求回顾 Superdesign 会话+本会话查漏（"我觉得肯定有"）。用 ReadSessionContext 翻档核实，坐实四项：
- ① **阿里真图附录任务补完**：08-25 三张 Design I/O 微信图抢救归档后，sources 卡附录指向编辑失败未补（当时工具连续报错）——已补（Vibe-Designing 卡加「附录：演讲真图三张」节）。
- ② **Baseline 落地页规格抢救归档**：规格原文只活在对话，已入 raw/（头部逐字+截断如实标注+骨架×我们内容合并方案表；动效体系已完整转录进 web/ 代码，以代码为准）。
- ③ **react-bits-skills（DavidHDev）处置补记**：不装——I-02 本体已入册按需取件，skill 版只是索引壳，工程检查已由 react-best-practices 覆盖。
- ④ 旧批次 R-01~R-26 核对：主卷+深度调研档案已覆盖（chanhdai=R10 确认在档），不重复。
- 史书总账追加「审计补账」块（rev 36）。结论：补齐后两会话无已知遗漏。

## 2026-08-31 · 三件新投喂评估（resume-portfolio）

- 白纸发三条：inspora.design / pbakaus impeccable / JimLiu baoyu-design。
- **Inspora**：AI 生成界面精选画廊（作品+真实 prompt）——灵感图库+「AI 能生成什么水平」对照样本库，入素材索引+Eagle。
- **Impeccable**：64k★ Apache-2.0（Paul Bakaus 前 Google/Amazon）。1 skill+23 命令（shape/critique/audit/polish/animate/typeset…）+61 条无 LLM 确定性检测规则+浏览器实况迭代；反 AI 味清单（禁 Inter/紫蓝渐变/卡片套卡片/灰字压彩底/纯黑/弹跳缓动）与 Vercel/HIG 拒绝清单同族；init 写 PRODUCT/DESIGN.md=与我们声明体系同构。**评估呈报待拍板**：独特价值=61 条确定性检测器（可无 LLM 跑）=Evaluator 现成执行器；风险=其 init/document 写自家声明文件（双事实源），必须配置为读我们的 Product/Design.md；与 Emil（animate）/jakubkrehel（typeset/layout/interface-review）重叠命令按主线表路由。AI 建议=试装+强从属条款。
- **baoyu-design**：宝玉打包 Claude Design 引擎为本地 skill（MIT），自包含 HTML 出 UI 稿/原型/线框/幻灯片，Best with Opus 4.8。**AI 倾向不装**：生成类自带审美默认（隐性默认陷阱），模型栈不符（锚定 Opus）；白纸想玩 mockup 可单开侧会话。
- Eagle 三书签全入；索引工具线三行；史书追账（rev 37）。

## 2026-08-31 · 装机三项拍板=全不装（resume-portfolio）

- 白纸口令「都不装」：Impeccable / jakubkrehel skills×11 / baoyu-design 三项全部不装。
- 档案落位：素材索引三行改「❌ 白纸拍板不装」（各留可借鉴处与理由）；Skill-装机与使用时机.md 新增「二B、已评估不装」节防重复提议。
- 可借鉴处不变：Impeccable 61 条无 LLM 检测器思路→自建 Evaluator 时借鉴；jakubkrehel 工艺规则→Craft.md 消化池与 refactoring-ui 二源合并；baoyu-design→想玩时侧会话。
- 待白纸拍板剩：HIG 转正与否（候选条款在 Craft.md 待填区）。

## 2026-08-31 · 短链解谜=Thinking orbs（I-15）（resume-portfolio）

- 白纸发 t.co 短链 → 解出 orbs.jakubantalik.com：Jakub Antalik（=I-10 transitions.dev 同作者，此次有 LICENSE）×Alex Brinza 的 AI/Agent 思考态点阵球指示器。
- 核查：npm thinking-orbs v0.3.1 **MIT**，10 状态（Working/Searching/Solving/Listening/Connecting/Weaving/Composing/Breathing/Shaping/Planning），React/SwiftUI/RN 三栈；仓库=Jakubantalik/Libraries 2.6k★ MIT，另有 Border beam/Liquid Gooey 两件效果。
- 定性：**个人站不用**（AI 思考态件，工作空间工具 UI 归档，与 I-07 ThinkingSteps/I-11 Beautiful UI 同位）；将来 DSH/Agent 界面建设的思考态候选。I-15 入基因库 I 表+索引组件表。
- ⚠️ Eagle 欠账：thinking-orbs 书签待补（41595 拒连）。

## 2026-08-31 · 划线回廊设计系统测试：六步流程首次全程跑通（ai-collab-flow）

- 白纸发起「用闲置项目测试自建设计系统」，选定 ai-collab-flow（划线回廊）；三项拍板：**点卡片=打开原书那一页**（v0.8「回到原文」语义转正，08-14 基准交付悬置决策就此落定）、桌面优先、探索新视觉方向。
- 设计工程文件建档于项目 design/（不触 studio/design/ 主线）：Product-补充节（含拍板记录表+决策溯源标注）· 设计基因库 22 条 G-xx（方向「卡片目录 Card Catalog」：抽屉暗底×索引卡×红头线×楷体荧光钩子×印章状态）· 执行契约 v0.2（Evaluator 项目实例化，六步挂接）。
- ②低保真+③高保真六屏交付：卡片/原文视图/记录/我的记录/边界态/空态，全部真实数据（Calibre 只读取 1,787 条划线、真实封面、九诗心第四章 141/378 段真实原文）；PNG 八张归档 + 可双击自包含预览 HTML（双模式+交互+基因标注层）+ 评审包（7 项待裁决）。
- 对照诊断：DSH 四副本（无流程）共性=装饰先行/bug 进稿（undefined、文字重叠）/元素遮挡/无事实源/空间失衡；可吸收想法=minimal/standard 的「回想模式」门牌（候选 backlog 注明出处）。
- 工程文件数 12（design/ 内 3 MD+1 HTML+8 PNG+评审包）；看板已回写（recvnWUwy9i9jm 描述列）。待白纸④评审→⑤ v0.8 副本换皮合回→⑥截图比对验收。

## 2026-08-31 凌晨 · 夜间构建：v0.9 预览皮肤「卡片目录」可真实上手（ai-collab-flow）

- 白纸睡前授权夜间消耗免费额度推进项目；产出：基于 v0.8 拍板语义的 **v0.9 换皮预览副本**（temp/aicf-design/v0.9-preview/，端口 8767），static 三件套全量重写落码基因库 G-01~G-22，app.py 仅端口+AICF_NO_BROWSER 开关两处预览专用改动，原产品/v0.8 副本零改动。
- **Playwright 35/35 断言通过、JS 零错误**（桌面 1440+手机 390 无横向溢出；回原文/荧光呼吸/盖章节奏 120+380ms/记录落沙箱/记录本/空态字条全链路）；verify_v09.py。
- ⑥验收预演证据：实现预览 PNG×5 + 稿 vs 实现并排比对图 S1/S2 归档项目 design/；progress.json 已恢复基线。
- 实现发现 → G-23 候选（楷体栈英文回退出打字机等宽，38 号书实证），列评审包第 8 项待裁决；S4 三页签受 v0.8 后端 API 边界未实现（需后端小改，留评审后）。
- 项目根落「早报-2026-08-31.md」三分钟晨读；评审包增补三分钟评审路径与夜间交付节；看板同步。

## 2026-08-31 凌晨 · 第二波：优化+进化（剩余额度续命轮）

- **优化**（v0.9 副本六处修复）：空态动作行收起（G-22 增补提案）· 手机原文头按钮 nowrap · 荧光跨行 clone · 卡片 aria-label · 快捷键 preventDefault 防漏字 · 移除 CSS smooth 对 JS 瞬时定位的干扰。Playwright **36/36 ×双连跑全绿**（新增空态动作行断言；两条抖动断言改轮询）。
- **进化**（实现→设计系统回流，全部 AI 提案待白纸复核）：基因库 §5 新增 G-23（拉丁字回退打字机感）/G-24（移动保可用变体 ≤640px）/G-22 增补（空态收起动作行）；执行契约新增「实现纪律」四条（behavior:'auto' 禁用于瞬时定位、快捷键必 preventDefault、状态显隐单一 class 链路、验收断言轮询化）。
- 比对图重出、S6/手机-原文重归档；沙箱再清理（notes 空、progress 基线）；看板同步。

## 2026-08-31 · Design.md 过审会·下半场：tokens 层裁决 + 骨架定值表 v1

- 白纸层级三连问（数值该不该进 Design.md/议题能不能少/9-10 是人用的）全部成立 → 裁决：Design.md 定位改「品牌决策宪法」（议题1-5 留，6-10 移出——反例归 Craft、数值归 tokens、五问双测归 Craft/自有 skill）。
- tokens 方法论（白纸原创背景认知，已入史书理论线章 rev39）：设计系统本是团队规范工作方式，AI 时代新命题=AI 与个人设计者怎么协作；tokens 不该是文档、要可视化进 Figma；操作分工=AI 写入、人看与调。
- 决策 A=完整色阶体系〔白纸拍板〕；决策 B/C 未逐条答，AI 按色阶路线直接出表（间距 4px 模数=AI 提案待审）。
- 参考挖掘：Once UI 真 tokens.css（magic-portfolio-try 里，1616 token，三层命名 static/scheme/语义）=大参考底子〔白纸授权"大范围参考再改"〕；Vercel vbg 命名/Impeccable 反例/refactoring-ui/旧草稿 A3A4/HIG 底线全部对上号。
- 骨架定值表 v1 写入《Design-过审议程》T1-T8：灰阶12级(Once 实底,WCAG 公式实算 gray-500=4.61:1 全旅程 AA✓)/纯白底/ink141414/muted/faint 重定(草稿 9A9A9A 2.8:1 被否)/热区图灰阶化/时代色保留/状态=墨底反白/字阶7级+新增 display56·t1=18·b1=16〔AI 候选〕/间距模数/圆角含嵌套公式/动效 tokens/断点。
- 下一步：白纸过表 → AI 走 Claude Code 子代理把 Variables 写入 MY WEBSIDE(lspIyYnJDLjIM7kmDT3Xgu,FIGMA-MCP-USAGE SOP+13坑+红线已重读)→ 截图自检 → 白纸 Figma 看实物可调 → 导出 tokens.css → Design.md v2 落盘。

## 2026-08-31 · design-system 项目立项 + tokens v1.1 + Figma L1 落地启动（方法线）

- 白纸给出原子五层蓝图（基础元素/元件后台页/格式指南/项目件/项目文件+迭代回路）并定调"AI native 设计系统"为正式项目：融合 AI 新生材料（skills/registry/检测器经验）与 Figma 组件生态（SDS/M3/Variables），系统=AI 可读、人可调、可分享。
- tokens v1.1 三处升级写入过审议程档（T1 灰阶 AA 用途标注/T5 间距相邻跳变≥25% 律[删 40/56/72/160]/T4 行高反比律+measure 544+字重仅 400/600/700/800）。tokens 参考五源盘点：Once UI（命名骨架）/refactoring-ui（尺度规则法，色相不用）/Tailwind v4（模数参照）/Vercel vbg（语义命名）/fluid-functionalism（弹簧）+HIG 底线。
- 项目目录 studio/projects/design-system/README.md 建成（理论轴/五层表/AI native 定义/资产地图/红线/四里程碑）。看板登记成功（方法线/P1-重要/卡点方=用户/进度10）——顺带查明板子字段类型：进度=number、管线/状态/优先级/卡点方/分类=select、项目文档=text（record-upsert 需按此喂值）。
- Figma 落地启动：任务书 temp/figma-l1-task.md（约 76 变量+四区可视化卡片+红线全套）；claude mcp list 实测 figma ✔ Connected；烟雾测试（建页+4 变量+绑定验证）经 claude -p 百炼档后台跑批中。
- 史书追加立项节（理论线后续）。Design.md v2 落盘时机正式改为"L1 在 Figma 定稿后"。

## 2026-08-31 · Figma L1 落地：第 1 批 76 变量全成 + 第 14/15 坑入库

- 烟雾测试暴露 FIGMA-MCP-USAGE 两处过时：①`--allowedTools 'mcp__figma:*'` 被新版 Claude Code 拒（server 段不许通配，须 `mcp__figma__*`）②bailian 档 qwen3.8-max 报 unrecognized（顶层 model=claude-sonnet-4-6 与 dashscope 冲突）+小图触发图像尺寸限制 → 手册已回写修正（其"以实况为准回改"条款首次生效），主任务用默认 deepseek 档（有 unrecognized_model 警告但链路实测可用）。
- **第 1 批完成（claude -p 子代理）**：`BST Tokens v1` 集合 mode Light，**76/76 变量**（gray12/brand2/semantic17/space14/radius6/type8/leading4/weight4/motion5/bp4），**12 alias 全解析**，值逐位核对 0 误差；烟雾残留 3 变量被识别合并（只补 73 未重建）。落地决定（子代理自报，待白纸过审确认）：命名=组/变量名前缀制；scope 显式设定（color=ALL_FILLS+STROKE、radius=CORNER_RADIUS 等）；motion=FLOAT 毫秒（非 TIMING）。红线遵守：未碰已有页面。
- 第 2 批（四区可视化卡片+新页 DS L1 · tokens v1.1+删 DS-SMOKE-TEST）后台跑批中。

## 2026-08-31 · Figma L1 落地收官（第 1+2 批）：BST Tokens v1 全量在 MY WEBSIDE

- 第 2 批（claude -p 默认档）：新页「DS L1 · tokens v1.1」四区可视化卡全建（页顶说明板含 ✅🤖⏳ 标记体系/灰阶带 12+white+ink 带 AA 注/语义层 17 行含项目色注入位提示/heatmap+era/space+radius+type-size 尺度卡+四列表）；space/radius/fill 真绑变量，抽查 5 处+alias 12/12 全对；清理了第 1 批页内 smoke 残留与 DS-SMOKE-TEST 页；未碰 Page 1 及白纸内容。截图 temp/figma-l1-page.png（155KB）ZCode 目检通过。
- ⚠️ 一处疑点待白纸 Figma 实看：语义层首行 bg-page 色点截图呈深色（脚本验证绑定正确，疑为白块描边渲染），重点核对；小瑕疵=heatmap 标注小字截半、space 9-10 档轻微重叠。
- 子代理经验 5 条入库为手册坑位 #14–18（allowedTools 通配位/bailian 档失效+无图像输入须回 ZCode 目检/scope 显式设定/fontSize 类不可绑变量/verticalAlignItems 不存在与 boundVariables 对象结构）。
- 看板 recvtRMKNiBtzX 进度 10→25。下一步=白纸 Figma 验收（改数值直接在 Variables 面板）→ 定稿后导出 tokens.css + Design.md v2 落盘 → 启动 L2/L3。

## 2026-08-31 · 下一步收官：tokens.css 导出 + Design.md v2 落盘 + 过审议程归档

- 白纸 Figma 过审 L1（"我看着还行"）→ 里程碑 1-2 关门：
- **tokens.css 导出**（resume-portfolio/web/src/styles/tokens.css 全量重写）：BST 语义命名空间 76 变量镜像 + 旧名兼容段（苔绿→墨黑、faint 8A8A8A(2.8:1)→gray-500(4.61:1)、heat 三档→灰阶、moss→ink、moss-soft→gray-1000；amber 系标注"翻页书重构时复核"）；font-sans=Inter+思源黑、mono=JetBrains Mono。
- **Design.md v2 落盘**（决策宪法版）：A1 调性（纯白/极简现代/暖走项目色）A2 双层强调（全局墨黑+项目主色注入位+作用域三不染）A3 sans-only 三栈+serif Backlog+字重四档 A4 排版四件 A5 规则红线 A6 优先级序五级；B 指针块（数值→Figma Variables、反例/五问/双测→Craft、组件→Components、项目语义→Domain）；修订记录 v1 数值表作废声明。
- 基因库 G-08 同步升级为"色彩克制两级制"（原荧光色块整屏废止）；过审议程档归档 temp/archive/2026-08-31-Design-过审议程.md；design-system README 里程碑 1-2 打 ✅；看板 25→40；记忆索引补 design-system 条目。
- 下一步（L2/L3）：元件页+格式指南——SDS/M3 消费链实例化+refactoring-ui/Emil 规则注入组件定义。待白纸口令即可开工。

## 2026-08-31 · 包1+包2 开工：Craft.md 过审草案 + Components.md 重写骨格

- Craft.md v0.2 草案落盘（六节）：一 硬底线 8 条（HIG 实算值+白纸 loader 纪律，含【🤖HIG 转正条款】待口令）；二 反例总表（Vercel/Impeccable/深度调研/Design 已拍，按排版色彩字体内容交互五类）；三 判断工具（KAWAI 五问/眯眼/文字遮罩/深读评审序）；四 refactoring-ui×jakubkrehel 二源合并表 11 条（8 吸收 2 参照 1 不采——流程归 VIBE、tokens 色相不采）；五 动效决策链（Emil 顺序+弹簧三档+600ms 预算）；六 种子内容保留。全部条目带 [源] 标注，🤖 待白纸逐条过审。
- Components.md 重写骨格落盘（旧苔绿版作废）：分组命名约定（nav/page/card/text/state/data 六组+✅🤖⏳标记）+14 件清单（P0 翻页书五件/P1 五件/P2 四件待圈定）+条目格式模板（用途/令牌/四态/动效纪律/红线/AI 注记/来源）+页码指示器示例条目（完整示范）。数值零重复，全引用 tokens。
- 待白纸拍板三点：①HIG 转正 ②Craft 合并表 11 条 ③Components P0/P1 首轮圈定。

## 2026-09-01 · 白纸指正：组件必须先搜库（教训+补做+制度固化）

- 白纸问"我们不是有很多组件库吗，你不能先搜索吗"——**认账**：L2 P0 起草时未执行"先调研再动手"（AGENTS 铁律），未在 SDS/M3 里 search_design_system 就自建了五件。补做：
- 子代理只读搜索（SDS lk-e0ffcff1…/M3 lk-5a31d104…）：页码指示器→SDS Pagination×4（引用基底）；翻页容器→M3 Carousel（形制参考，库内无合适件）；loader→M3/SDS 进度件（物种不适用：座右铭 splash≠loading 指示器）；全屏菜单→SDS Menu Item 基底+容器自建；项目卡→SDS Card Slot/Grid 最佳基底。决策表已回写 Components.md 五件条目（库内搜索记录行）。
- **制度固化三处**：FIGMA-MCP-USAGE.md SOP 写步骤「先搜库后动手」第 0 条；design-system README 加「组件生产规范」；Components.md 条目模板加「库内搜索记录」必填行。
- L2 v2 已派：三件实例化 SDS 基底+换绑 BST tokens（Pagination/Card Slot/Menu Item），loader/flip 保留自建+注理由。

## 2026-09-01 · Web/代码侧组件仓库扫描（五件逐一，双通道 SOP 固化）

- 白纸指示"还需要搜索 Web/代码侧组件仓库"。扫描结果：
- **react-bits 本地**（temp/refs/src/content/ 类目 grep）：loader→SplitText/BlurText（I-02 指定参考）；flip→Carousel/DepthCarousel（机制参考，炫技不采）；nav→FlowingMenu/InfiniteMenu/StaggeredMenu/BubbleMenu（结构件，FM 须翻译）；card→ProfileCard/CardSwap 偏炫、PixelCard 等；page indicator 无。
- **beUI**（registry 112 件）：chromatic-text-reveal/text-reveal（loader 备选 I-08）、cylinder-carousel（flip）、bloom-menu/drawer/bottom-sheet（nav）、tilt-card（card hover）、loader、dock。
- **Magic UI**（registry 210 件）：morphing/aurora-text（loader 偏花）、scroll-progress、magic-card（card hover 参考）、bento-grid（项目网格布局参考）、marquee。
- **rare-ui**（17 件）：grid-reveal（card 入场渐现候选）、family-drawer（nav 后备）、scroll-progress。
- **shadcn**（名义清单，目录 API 受限故按已知目录核对）：Pagination/Carousel/Card（实现期抄写候选——数字页码/翻页机制/卡片骨架）。
- 五件决策已回写 Components.md（库内 Figma+Web 双行）；SOP 升级为双通道先搜（手册+README）；21st.dev 属市场无 API 检索通道（如需人工浏览另议）。

## 2026-09-01 · L2 v2 完成：三件 SDS 基底换绑全绿 + 过程观察（子代理越权 commit 待白纸知悉）

- L2 v2（claude -p）：page-page-indicator 页码→SDS Pagination Page×3、nav-overlay 菜单项→SDS Menu Item×15、card-project→SDS Card (Slot)×3+Card Grid Image 组级标本（1200×999 段落级件塞不进 300px 卡→改参考标本，如实偏离）；loader/flip 保持自建+帧注补库内记录行；bind 抽查三处全绿（fill/radius/stroke→BST 变量）；截图 temp/figma-l2-p0-v2.png。FOO 待白纸目检。
- ⚠️ 过程观察（如实上报）：子代理在无授权情况下自行 edit Components.md（勾 L2 v2 待办）并 git commit ab93914——内容真实无害，但越权了。教训：任务书须明示"禁改仓库文件/禁 commit，报告即可"，已记入下次派单措辞。
- Components.md 现每条五件=三行来源链（决策/库内 Figma/Web registry）+L2 v2 勾选完成。

## 2026-09-01 · 12 仓使用审计（白纸复核对账）落飞书

- 白纸列 12 个 GitHub 链接要求核对"用在什么地方/有没有真用到"，并归纳进飞书。审计实迹口径，三档结论：
- ✅生产性 3：react-bits（本地克隆+载入屏机制）、refactoring-ui（tokens 法源+ Craft 合并）、fluid-functionalism（弹簧三档入 tokens+Craft）。
- ◐6：beUI/rare-ui（registry 通道检索+候选）、shadcn（实现期候选）、number-flow（数据带候选）、emil ✓已装**但未实跑**（触发点=Skill 时机表，等 MVP）、impeccable 与 jakubkrehel（拍板不装，思路/规则入 Craft）。
- ❌2 仅登记：motion-primitives/fancy（零依赖栈无调用场景）；transitions.dev 因无 LICENSE 零使用。
- 过程发现：DavidHDev/react-bits-skills 原仓 404（fork= lumacoder/react-bits-skills）——本体本地克隆不受影响。
- 规则：◐→✅ 的转正都必须有实现里程碑证据，不悄悄转。史书 rev41。

## 2026-09-01 · HIG 暂缓转正（白纸拍板）+ L2 审阅需求

- 白纸拍板「HIG 先不转正」：Craft 条款改[暂缓]——不进正典、不设制度链；其数值仅作硬底线依据来源引用继续有效，改口随时可转。
- 白纸新需求：Figma 填充组件须加审阅解释——评论方式（MCP 工具面无评论工具，如实告知）→ 用替代方案：元件旁建"审查分析卡"（PM 分析页式：作用/来源/四态/红线/AI 注记）+ sticky 便签三色标记（黄=来源 蓝=作用 绿=效果）。

## 2026-09-01 · 验收物改道真机：翻页书第一屏 Demo（回应"静态看不懂/不知道动起来什么样"）

- 白纸批评：Figma 元件是静态的、看不懂动起来什么样、对组件设计不满。认账根因：把系统后台当验收物、绕过真机验收段（VIBE 定案）。
- 动作：五件元件直接实现为浏览器真机 Demo（web/src/demo/FlipbookDemo.tsx+flipbook.css），hash 路由 #demo 挂载（不破坏落地页版）：
  - loader-motto=座右铭逐字渐显（ClipText 级联 110ms+点按可跳过+reduced-motion 瞬退）
  - page-flip-container=scroll-snap 一屏一页×3屏
  - page-page-indicator=顶部中央 01/名称/03，scroll 监听联动（实测 01→02 正常）
  - card-project=4:3 虚线占位槽+标题+描述（大字少字 Behance 式）+hover 反色钮
  - nav-overlay=全屏墨色菜单（Esc 关，实测三链接在位）
  - 全部样式走 tokens.css 变量（黑白体系，无一处硬写值）
- 构建 63KB gzip 零错误；dev server :5175 实测通过（截图为证）。访问 http://localhost:5175/#demo。
- 文件未 commit（工作区留待白纸看完再定）。

## 2026-09-01 · Craft.md v1 定稿（白纸「就按照这样来」）

- 轻版 v1 落盘：定位句+HIG 适用章节索引（六场景）+白纸补充红线 7 条+凭据（HIG 暂缓注记/更替记录/Evaluator 引用）。
- v0.2 草案（反例 23 条/五问/双测/合并表 11 条）按"不用综合"裁决全文归档 temp/archive/2026-09-01-Craft-v0.2-草案-归档.md；tokens 已吸收的 4 条规则（跳变律/嵌套圆角/行高反比/AA 标注）留在 tokens 注记不受影响。
- Craft 层全部决策关闭：HIG=暂缓不转正、合并表=不综合。Evaluator 可按「索引+红线」编写。

## 2026-09-01 · 翻页书 Demo v2（对标 ruixen 工艺）完成

- 白纸反馈：不满意 v1 设计；给出 ruixen/portfolio 版为基准（截图存 .dsh-vision/uploads）。拆解其设计语言：mono 大写小节标签/60-70% 透明度描述/宽松行高/入场错峰（0/.15/.3）/行式项目列表（40px 圆角图块+悬停箭头上浮+下划线）/四角活数据仪表（时间+屏宽实况）/悬停下划线细节。
- v2 重做（web/src/demo/FlipbookDemo.tsx+flipbook.css）：三屏保留（作品/简历/联系）；作品页=Selected Projects 行式列表（编号 mono+48px 虚线占位+标题悬停 ↗+描述 52ch 单行省略+mono 标签）；简历页=简版 bio 双段+经历行（期间/院校/注）+数据带（412+/31/8 示例徽章）；联系页=状态句+邮箱+开放中状态；四角活数据（时间 top-left/屏宽 bottom-left/操作提示 bottom-right）；入场 .rv 错峰揭示（根 is-ready 挂载）；loader 不变（可跳过）。全 tokens，无硬写。reduce-motion 降级。
- 验证（本环境模型无图像输入，用 DOM 计算样式核对非目检，如实）：rows=6/labels=Selected Projects·Resume—简版·Contact/指示器 01→02 联动正常/bio+counters 在位/标签=JetBrains Mono+1px tracking/虚线 0.8px rgb(117,117,117)=gray-500/root 纯白=bg-page。构建 64KB gzip 零错误。URL=http://localhost:5175/#demo（dev server 仍在跑）。
- 视觉验收仍待白纸（浏览器实看）。

## 2026-09-01 · 组件挂起裁决 + Templates v2 落盘（下一步）

- 白纸裁决：组件部分（Figma L2 页+demo 呈现）不满意→整体挂起，实现时"由白纸另找参考再定"；demo 与后台档案保留不删、不进 MVP 实现路径。Components.md 已加状态注记（骨格/四态模板/双通道搜索记录保留可用）。
- 下一步执行=Templates.md v2 落盘：翻页书全局规则（一屏一页 scroll-snap/页码指示器常驻顶中/错峰揭示/四角活数据/全局中性/禁手写日期）+页面模板 T2.1-T2.6（开场 loader/封面/项目页/详情页纵滚+展开正交/简历页/收尾状态句）+装配源指向（App 路由+FlipbookDemo 工艺已验证→真片替换占位数据即 MVP）。
- 至此声明六层：Product✅ Design✅ Craft✅ Templates✅(v2 草案) / Components⏸挂起(等白纸参考) / Domain⏳(等供料) / Evaluator 待写。

## 2026-09-01 · 首页装配拍板（Scott/R-27 海报墙）：Templates 更新 + demo 改版

- 白纸口述拍板（口头=决策，原话进档）：首页=①左上姓名/简介 ②右上简历链接 ③进场即项目海报墙（分 项目/博文 两组，图=最有代表性一张，先用占位槽等图）④点入=G-21 展开动画（图缩一侧+正文列++/×）+下方整串图文介绍。对标 scott-fryxell.github.io（快照实测其结构：name+tagline 左上/Resume 右上/全墙 details）。
- Templates.md T2.2 重写为「首页＝海报墙」（✅白纸拍板标注）+ T2.3 项目详情面修订（入口唯一=海报格）。
- demo 第一屏同步改版（FlipbookDemo v3）：fb-id 左上/简历链接右上（菜单按钮撤下）、Projects 3 格+Writing 2 格（占位注"待白纸供稿"守零假数据）、点击展开=is-open 占满双列+aspect 16/6+「+→×」；构建 64KB 零错误；DOM 验证展开态 1/-1×is-open×plus=× 全对。视觉最终态待白纸浏览器目检。

## 2026-09-01 · 翻页输入拍板：滚轮翻页（禁 ← →）

- 白纸裁决：翻页用滚轮不用方向键。demo 已实装（wheel deltaY→横向 scrollLeft；页内可纵滚内容优先吃滚轮到底才翻页；snap 照常吸页），提示文案改「滚轮翻页 · 点击海报展开」。真机验证 01→02 正常。全局规则入 Templates.md。

## 2026-09-01 · 白纸批评"排版混乱"→ 首页精确复刻 Scott（v4）

- 白纸裁决：demo 排版不满意，要求"完全按照 Scott 页面设计"。认账：v2/v3 我自作主张造了两列网格+四角活数据（ruixen 混入），偏离拍板对象。
- 实测 Scott DOM（全幅无 max-w/海报 72vh=485px/缝 1px/标题压图左下 31px·300/头 sticky/单列墙）。
- Templates T2.2 重写为实测规格（数值级）；FlipbookDemo 整体干净重写 v4：撤 grid/撤四角/fb-id/resume 浮动件，=fixed 头栏+全幅 72vh 海报×4（占位槽）+1px 缝+压图标题（fs-display·weight-normal，体系内最轻档）+右下 + → 展开 G-21 长图文+墙内纵滚优先滚轮逻辑保留。
- 中途事故记录：多条 python heredoc 断言失败导致 CSS 文件堆积半写段落（v2 底子+v3/v4 追加混杂）→ 全文件干净重写解决。教训：连续 patch 失败两次就该整文件重写，不打第三个补丁。
- 真机复测全对：posterW 1521/1536 全幅·H 485=72vh·gap 1px·header fixed·墙可纵滚·构建 63.9KB 零错误。视觉终态待白纸目检。

## 2026-09-01 · 首页双版并存（v2 散文双栏）+ 白纸提出协作流程三步论

- 白纸验收 Scott 版："暂时就这样（还缺少动效）"；追加要求另做一版：左段话（关键词跳转、点击弹窗）+右项目轮播（附图=ozzy 式）。
- 新建 FlipbookDemo2.tsx + flipbook2.css（#demo2）：左 34em 大字散文（黑重点/灰从句/链接词加粗下划线点→弹层）；右 6 卡自动轮播列（4s 可暂停可打断，首位大卡阴影层级、二三位渐小渐淡）；弹层=遮罩+白卡 pop 动效+Esc 关+占位图位。DOM 验证：弹层开关/轮播走位全通。构建 65KB 零错误。两版并存供对比择优，未开新文件夹（候选记录走 Templates T2.2/T2.2b，理由：候选要能被裁决才成文，新文件=文档增殖）。
- 白纸提出人机协作实际流程三步（原话）：①人发截图/素材给 AI→②提取入库（Figma 或 Eagle）→③转化为人自己的形态。并问"工程化设计文档是否有用"。AI 回应（待白纸表态）：文档不是生成器是管道滤网——选哪些参考/能不能进/怎么改才像我们/改完记下来防下次跑偏；三步管道与基因库流水线（接收→吸收→转化）同构，建议升格为 VIBE 标准流程（截图入库归 AI 手艺、转化形态归白纸主导）。Scott 版=v4 即此三步第一圈完整实证。

## [2026-09-01] 施工 | 模板拆解区建成（design-system L2 支线 · 17 件 Figma 元件，白纸睡前授权）
- 三裁决落位：只做两站（magic-portfolio/ruixen）、另起 Figma 画布「模板拆解」不混 Components.md 正文、生成机器清单 component-manifest.json（AI 按 id 点名调件）
- 五批 Claude Code 子代理施工（各批 ZCode 侧截图目检通过）：page 54:7 · 20-legend 55:7 · 21-atoms 四轴三列 56:7 · 22-magic 64:11 七件（pill-nav 双态/hero 三段式/featured-badge/footer/项目行卡/图墙/双态 toc；og-share 判不采）· 23-ruixen 85:7 九件（dock/flip-line/venn/accordion/contrib-grid 真实热区 133 会话 24 周/testimonial/wordmark 出血/reveal 相位/pulse-dot）
- 全件绑 BST Tokens v1 零越界色（子代理 get_variable_defs 反查+ZCode 目检双轨）；施工图 template-decomposition.md、清单 component-manifest.json 落 design-system 项目；截图八张 temp/
- 手册补坑 19–23（lineHeight×100 塌字/子代理无图输入/get_metadata 首页限/fill 绑定 API 真身/白填与字重怪癖）
- 下一步待白纸：Figma 过目圈定转正件→点名「哪件套翻页书哪页」；AI 调用面已就绪（manifest v0.1）

## 2026-09-01 · 白纸裁决首页定版 v1（Scott 全幅海报墙）；v2 降级对比稿

- Templates T2.2 标"继续推进 v1=首页定版"；T2.2b v2 降级候选（#demo2 保留可复活，弹层思路可回流详情页）。下一步=v1 动效轮。

## 2026-09-01 · v1 定版后首动：进度盘点落文件 + v1 动效轮实装

- 新建 studio/projects/design-system/进度盘点.md（六节一页账：声明六层/L1-L5里程碑/真机/资产账/挂起清单/下一步；状态口径 ✅🟡⏳，只作导航不载决策——守"决策唯一源"）。
- v1 动效轮实装（flipbook.css+FlipbookDemo.tsx）：①海报滚动驱动入场（IntersectionObserver root=墙，进视口淡入上浮 24px，一次性）②G-21 展开完整化（grid-rows 0fr→1fr 平滑撑开；+恒在、is-open 转 45°=× —— Scott 原版手法）③页码指示器换页 fb-fadein。reduced-motion 三项全撤。
- 真机验证：4 海报/in 3/展开 169px/plus rotate 生效。dev server 掉线重启一次。

## 2026-09-01 · 首页 v1 灰屏攻坚（HANDOFF 续）：抓到旧内核真元凶，保守化重写动效驱动

- 接手卡点"我的环境全绿 vs 用户旧 Edge 整块灰"。无头 Edge + chrome-devtools 双通道实测，抓到四类真凶（此前 inset/color-mix 排查方向全歪）：
  ①**致命**：`.fb-poster` 初始 `opacity:0` 靠 IntersectionObserver 点亮——旧内核 IO/rAF 任一失效=全墙隐形，露 wallstack 灰底（用户"整块灰、点第二张才正常"完全吻合，且探针在动不矛盾：探针在、内容隐形）。
  ②plus 符号 `left`+`right` 双边约束实测被拉成 1025px 巨块（旋转 45°=展开态左上角怪 ×，两分支须互清对侧锚点）。
  ③useProgress 单靠 rAF：无头虚拟时间预算下实锤 rAF 永不推进（旧内核节流同类死法）→ 加 150ms 墙钟定时器兜底（健康浏览器零影响）+ StrictMode 双挂载计时起点重置守卫。
  ④存量小坏：挂载即跑 1→0 收起动画闪帧（progRef 守卫）；art 底色 washed-out（accent 混色回归）；details 透灰底（白底）；meta 谷值曲线（闭合态标题恒可见→后半程浮起）；CSS `.is-open` 面板/plus 布局规则全删→JS inline 单一驱动（守"动效归 JS"纪律）。
- 自测链路全过（build index-CzD9s2Sa）：closed 全幅彩底封面+压图标题；click 展开 0.6s 图缩右柱 27%+标题面板浮起+plus 移左下转正=× +正文 clip 揭示白底；点 × 收起还原；切换第二张正常。截图+DOM rect 双证。
- 教训入档：**用户端"新语法不支持"排查穷尽后，下一嫌疑是"新 API 静默失效"（IO/rAF/observer）——任何以 JS API 成功为前提的初始隐形态都是旧内核地雷，降级设计必须"JS 失效仍可读"**。
- 球在用户：无痕开 http://localhost:4173/ 实测；若仍异常报 edge://version 版本号，候补方案 B（art/meta 尺寸全 JS inline px）弹药已备。demo 两文件本次首次入库（web/ 目录历史未跟踪）。

## 2026-09-01 · 收起动画修复 + 首页排版稿入 Figma（白纸启动"Figma 调稿→回写代码"回路）

- 白纸实测：展开动效已通，但**收起无动画**。根因=setOpenIdx(null) 瞬间 pr 归属丢失（动画还在 1→0 跑但没人消费）→ 加 shownIdx 归属期（关闭动画期间海报仍认领进度），实测 398→1475px 平滑回弹（build index-Bo_sBbcq 已部署 :4173）。
- 白纸新流程裁决（AI 提案 1A/2A 未逐条确认，按原话执行）："Figma 放占位内容，先完成第一页项目的写作和排版设计"——首页海报墙=占位封面×4+项目文案+展开态正文，全部进 Figma 供白纸亲笔调。
- 通道=MEMORY [[figma-mcp-endpoint]] 实锤：ZCode 直连死路，走 Claude Code 子代理 `claude -p --allowedTools 'mcp__figma__*'`（[[claude-code-subagent-setup]]），目标文件 MY WEBSIDE lspIyYnJDLjIM7kmDT3Xgu。
- 建成页「30-首页排版稿」(126:7)：sec-home-wall（头栏+海报 01 虚线占位图版+02/03/04 项目主色渐变版，压图标题带+竖排装饰字+COVER 标，全 auto-layout，颜色绑 BST brand/gray 变量，装饰渐变字面值声明）+ sec-expanded-01（左标题面板/右图柱/× 位/正文四段+图流虚线位）。自检脚本全绿（无塌字/无越界/绑定核对）。ZCode curl 截图目检通过；发现规格手误：× 摆到左上（应左下，web 版=plus 转正落左下）——批二子代理已修正（y 28→604 回读核实）。
- 回路约定（AI 侧，勿说成白纸拍板）：白纸在 Figma 改完后，报"改好了"→ AI 读节点数值回写 tokens.css/flipbook.css+TSX（Figma-first 数值单源，[[design-md-review-progress]] 既定）。
- 球在白纸：开 Figma「30-首页排版稿」写作+调排版。
- 补（同日）：白纸反馈收起仍突兀——details 卸载瞬间断帧。改「海报+正文」共装 `.fb-poster-collapse` 容器，maxHeight=72vh+pr×实测正文高逐帧收拢（overflow 裁剪与 clip-path 下沿同步），实测 783→527 连续曲线落地零跳变（build DJu1UnBE）。

## 2026-09-03 · 消息桥立项（消息中台流水线，PRD v0.1 待白纸拍板 D1-D6）

- 立项完成：`studio/projects/消息桥/`（README + AGENTS + design.md v0.1）+ 飞书看板记录 `recvu906Rmc49i`；`E:\Desktop\学业与申请\消息中台\` = 数据区，新建区级 AGENTS.md（规范指针），README 更新（卡片速览对齐 + 项目指针）。
- 链路形态：白纸上微信合并转发→贴飞书「自动化通知」群→AI 四动作（建卡入数据区/排日程/挂看板/bAI raw 指针卡）→晨间 9:00 回执。SOP v1 人肉版已在运行，design v0.1 把规范成定稿草案。
- 规范要点：两级卡（夜收件默认批次卡，⚠️/参考/带附件升单卡）；判级「宁高勿低」；三处数据各一真身不双写（卡=数据区、行动=看板日程、知识=指针卡）。
- ClawBot 顺检：Issue #198 仍 open（7/25 后无更新）；repo 活跃（9/1 发 v2.4.8，无群聊支持迹象）→ 维持 L0 人肉投递，巡检台账在 design §10。
- 球在白纸：评审 design §6 开放决策 D1-D6（目录形态 C 推荐 / 处理时机 / 晨间扫描扩展现有 automation / 看板挂法 / 投递口令 / git 自动 commit）→ 拍板后 M0 试运行；拍板前零实现代码。

## 2026-09-03 · 消息桥首次处理两则消息归档

- 处理两则文件通知（白纸发来，已在前置会话见过）：
  1. 银行卡办理须知 → 04_后勤生活/（⚠️ 有截止，9月13日），已建飞书日程截止提醒 `1ea57a0e-716e-4bf6-a61b-1386f1ff0091_0`，看板追加开学季规划
  2. 研究生发展与管理综合评价细则 → 02_学院通知/（参考），已建指针卡入 bAI raw
- 同时调整 AGENTS.md 定位为「独立但互联」框架：本地规则自管 + 工作空间设施可调用

## 2026-09-03 · 消息桥处理体检通知

- 归档硕博新生入学体检通知（⚠️ 有截止）→ 04_后勤生活/；原文消息+两附件PDF已入目录
- 已建飞书日程提醒：9月7日 8:30-9:00 理工楼4号楼A区体检（event_id 3e008afa-4c37-4303-ad94-8d7f326141ec_0）
- 开学季规划看板已追加体检项

## 2026-09-03 · 消息桥整合晨间自动化 + 处理学籍照通知

- 处理学籍照采集通知（⚠️ 有截止）→ 02_学院通知/；已建日程 9/8 08:00-08:45
- 发现我新建的独立自动化（消息桥巡检）与已有晨间提醒重复，已删除并整合：将消息桥待办段落嵌入原有晨间提醒 prompt，统一为 automation-9f5f0902-5bfc-48ba-9c71-af10ecc1dfd8
- 消息卡格式简化定型：去掉"处理"追踪行，字段精简为 判级/来源/原文/截止时间/备注

## 2026-09-04 · 晨间自动化未触发排查 + 会话兜底规则落地

- 根因（电源日志实锤）：03:02 合盖睡眠 → 16:34 唤醒，07:00 沉在睡眠窗内；应用级定时器无 Windows 唤醒计时器，错过即顺延（runCount=0，跳到次日）。9/3 能发是因为当天 9:01 时机器醒着（17:29 前无睡眠记录），非「合盖也能跑」。
- 补发：16:45 手动补发 9/4 晨间提醒到「自动化通知」群（om_x100b669c1fb5a8a4c12f831ceebdfd8），含 ⏰ 9/5 党员信息表截止提前提醒。
- 落地会话兜底（B）：消息中台 AGENTS.md 规则10（过 7 点查群无提醒即补发）+ ZCode 持久记忆 morning-reminder-fallback。
- C 澄清：飞书日程原生提醒实测为默认「提前 5 分钟」（lark-cli +create/+update 均无自定义提醒参数）；「提前 1-3 天」由晨间提醒承担，日历 5 分钟提醒为最后保险。
