# JD 实词基线（文献线工作底稿）

> 目的：为"报告热词 vs JD 实词"落差比对提供 JD 侧事实基线。
> 数据归属：`02-jd/` 线所有，本文件**只读引用**，不改动其任何文件。
> 本笔记记录的是"JD 里写了什么"的事实，不含任何"学院该教什么"的推断。

## 一、数据与方法

- **索引文件**：`02-jd/meta/jd-index.csv`（快照行 329 条，fetched_at 截至 2026-09-30）
- **核查对象**：`02-jd/jd-raw/` 下 329 个 `.md` 正文文件
- **核查日期**：2026-10-01
- **方法**：大小写不敏感正则匹配，文件级计数（同一文件内多次出现只计 1 个文件）；工具为 Grep（ripgrep）与 PowerShell `[IO.File]::ReadAllText`
- **稀有命中均已回读原文上下文**，见下方"语境分类"

### 口径警告（两条，写最终报告前必须处理）

1. **分母口径**：JD 线统计纪律要求频次只从 `is_primary=1` 的 **268 条**（去同岗多地重复）计算。本次 grep 覆盖全部 329 文件（含重复挂牌），**只能用于"有没有这个实词"的定性判断**；最终报告若报频次，须按 268 口径重算。
2. **构成口径**：329 条全部为 `tier=overseas-ats`——Databricks 107、OpenAI 96、Anthropic 81、Scale AI 28、Linear 17，均为海外（美国为主）AI/科技公司。`manual-cn/`、`manual-sme/` 目录已建但索引中无记录（国内 JD、传统制造 JD 尚未投料）。
   → 因此"JD 中找不到"目前**仅等于"这 5 家海外 AI 科技公司的 JD 中找不到"**，不能外推到国内雇主与传统制造业。这正是交叉矩阵敏感性检验"剔海外层重算"目前无法执行的原因。

## 二、文献式抽象能力名词的命中（落差比对重点）

| 文献常用词（英文词形） | 命中文件数/329 | 实际语境（原文 + 位置） |
|---|---|---|
| literacy（含 AI/data/visual literacy） | 1 | 唯一命中是 **"Data literacy and experience with data analytics"**（Scale AI Staff PM, Agentic Platform，要求项，`:65`）。无 "AI literacy"、"visual literacy" |
| critical thinking | 1 | "a detail-oriented technical author with **strong critical thinking skills**"（Anthropic 技术文档/标准岗，`:53`） |
| computational（computational thinking/design） | 2（3 处） | 全部是**领域知识**："computational biology"（Anthropic Research Engineer, Life Sciences，`:45`）、"computational chemist / computational biology, cheminformatics"（Anthropic PM Claude Science，`:29,:79`）。无一条把"计算设计/计算思维"作为设计能力 |
| design thinking | 3 | 两条是作品集固定句式 "A portfolio demonstrating **user-centered design thinking** and polished UI craftsmanship"（Anthropic 设计师岗）；一条 "bring **crisp design thinking** to technical trade-offs"（OpenAI Product Designer, Codex，`:51`） |
| lifelong learning / continuous learning | 2 | 一条是技术名词 "**continuous learning loops**"（Scale AI 研究工程岗，`:33`，指 agent 的持续学习机制）；一条是产品语境 "classrooms, careers, and **lifelong learning**"（OpenAI PM Education & Learning，`:25`，描述其产品面向的场景，非岗位能力要求） |
| creativity / creative thinking | 8 | 多为营销/产品语境（如 "driving business results..." 等）；无 "creative thinking" 作为独立能力项的表述 |
| human-centered / user-centered | 3 | 即上述作品集句式（user-centered design thinking），无其他用法 |
| sustainab* | 3 | 零散出现，未见作为设计师能力要求 |

## 三、JD 式动作/姿态词的命中（对照组）

| JD 实际用词 | 命中文件数/329 | 语境说明 |
|---|---|---|
| collaborat* | 205 | 跨职能协作，最高频动作词 |
| agent | 188 | agent 系统/agentic 产品与工作流 |
| ambigu*（ambiguity/ambiguous） | 120 | "thrive/navigate under ambiguity"，模糊环境推进 |
| workflow | 104 | 把 AI 嵌入 workflow |
| ethic*（ethics/ethical） | 83 | 多为 AI ethics / responsible AI，集中在研究与政策岗 |
| curiosity / curious | 79 | 个人特质要求 |
| ownership | 73 | "own outcomes"，端到端负责 |
| judgment / judgement | 72 | "crisp judgment"、技术与产品判断 |
| prototype / prototyping | 68 | 原型动作，含代码原型 |
| fluency / fluent | 57 | 三类：**technical fluency**（"能跟平台工程师真正对话，不是深度写代码"，Scale/OpenAI 多岗）、自然语言流利（如 "fluent in Arabic and English"）、模型能力（"multilingual fluency"）。**无 "AI fluency" 这一能力名词** |
| craft | 52 | "visual and interaction craft"、UI craftsmanship |
| agility / adaptability / adaptable | 47 | 适应变化的动作表述 |
| storytelling / storytell | 21 | 叙事能力 |
| AI tool(s) | 18 | "use AI tools daily" 等具体用法 |
| front-end / frontend / HTML/CSS | 25 | "prototyping with front-end code (HTML/CSS/JS)" |
| design system(s) | 14 | 设计系统岗，含 design tokens/theming |
| taste / aesthetic | 12 | 审美判断，如产品 taste |
| design tool(s) | 9 |  |
| prompting / prompt（裸词） | 3 + 4（有重叠） | 写法均为**动手经验**："Hands-on experience building with LLM APIs, **prompting**, or agent frameworks"（Anthropic Product Engineer, Computer Use，`:49`）；"comfortable going deep on model behavior, **prompting**, and evaluation methodology"（Anthropic PM Claude Science，`:63`）；"**prompting** changes landed"（Anthropic Product Ops，`:39`）。**无 "prompt engineering literacy/提示工程素养" 写法** |
| creative partner | 3 | 含 "use AI tools such as Claude Code **as a creative partner** in your own design practice"（Anthropic Product Designer, Safeguards，最低资历） |
| legible / legibility | 5 | 见下 |

### "legible" 五条全部语境

1. "Make the system **legible to Claude as well as people**: the guidance, metadata and evals that show whether Claude uses it correctly"（Anthropic Product Designer, Design Systems，职责，`:51`）
2. "Can make dense information feel calm, **legible**, and useful without oversimplifying important complexity"（OpenAI PD Engineering Acceleration，`:57`）
3. "You make complex technical trade-offs **legible to business leaders**"（OpenAI Deployment Lead, Singapore，`:63`）
4. 同上（OpenAI Deployment Lead, Tokyo，`:63`）
5. "build the mechanisms that keep them tracked, consistent, and **legible** — so stakeholders know what was decided, why, and who owns what"（Anthropic Head of Policy Design, Societal Harms，`:37`）

→ 5 条中仅 1 条是"对模型可读"，其余 4 条是"对人可读"，但用的是同一个词 legible。

### 2026-10-03 增补核查（Shi 2023 笔记触发，分母仍为海外 329）

| 词 | 命中文件数/329 | 语境结论（稀有命中已逐条回读） |
|---|---|---|
| explainab\* | 0 | ✗ 无 |
| interpret\* | 81 | **全部 ML 模型可解释性语境**（Anthropic 使命句 "reliable, interpretable, and steerable AI"、Interpretability 团队/研究岗）；无"人解读 AI 输出"的个人能力义 |
| multimodal | 87 | **全部模型能力语境**（multimodal models/capabilities/health data）；非个人能力主张 |
| \bbias\* | 18 | **全部 "bias for action"（行动偏好成语）**；AI 偏见义 0 |
| interdisciplin\* | 2 | OpenAI PM："deeply curious and interested in interdisciplinary fields such as human-computer interaction, psychology, philosophy"（动机性要求） |
| 3d model\* | 2 | Revit/AutoCAD/Civil 3D/SolidWorks/BIM **工程语境**，非 HCI 设计岗 |
| typograph\* | 1 | OpenAI Product Designer, Accessibility：无障碍审计检查项列举中的 typography，非字体设计能力要求 |
| plagiar\* | 0 | ✗ 无 |
| text-to-image | 0 | ✗ 无 |
| novice | 0 | ✗ 无 |
| design knowledge | 0 | ✗ 无 |
| knowing | 4 | 均为动词（"knowing how the model is really behaving" 等），无能力主张义 |

> ⚠ 技术备忘：本轮发现（1）`02-jd/jd-raw/` 实际按公司子目录存放，grep 必须限定五家海外目录（anthropic/databricks/linear/openai/scaleai），否则会误扫 manual-* 新投料；（2）`manual-ai/`(3)、`manual-cn/`(5)、`manual-sme/`(1) 已有 9 个 2026-10-03 投料的 md 文件——**新投料后本基线须按纪律整体重算并注明新分母**；（3）PDF/正文短语计数须容忍跨行断词（`design\s+thinking`），否则漏计。

### 2026-10-03 增补核查·第二轮（Musiienko/Lindell/Deng 三篇笔记触发，分母仍为海外 329）

| 词 | 命中文件数/329 | 语境结论（稀有命中已逐条回读） |
|---|---|---|
| prompt engineering | 0 | ✗ 无（裸词 prompting 3+4 见上表，均为动手经验写法） |
| prompt craft | 0 | ✗ 无 |
| curator | 0 | ✗ 无 |
| curation | 4 | **全部为"训练数据 curation"（dataset/training-data curation，ML 数据管护义）**；无一条"按设计标准策展 AI 产出"义 |
| self-direct | 5 | **全部为 "self-directed, full-lifecycle builder"（员工自主姿态，正面要求）**；与 Lindell 教师侧"学生过度自主是风险"**同词反义** |
| upskill | 1 | 第三方组织 enablement/"upskilling teams"（B 端培训语境），非个人能力要求 |
| reskill | 0 | ✗ 无 |
| foundational | 19 | **全部为 "foundational systems/models/positioning"（技术基建/底座义）**；无一条"学科基础理解/基础学习"义 |
| communication | 185 | 高频通用动作词（JD 第二高频，仅次 collaborat* 205） |
| AI literacy | 0 | ✗ 无（与例 1 一致，精确短语再核） |
| social interaction / interpersonal | interpersonal 有命中（如 "written, verbal, and interpersonal skills"） | 通用软技能写法 |

### 2026-10-04 增补核查·第三轮（Huh/Liu/Jog 三篇笔记触发，分母仍为海外 329）

| 词 | 命中文件数/329 | 语境结论 |
|---|---|---|
| ideation | 16 | 早期概念生成语境（设计/产品岗） |
| transparent | 5 | 透明沟通/流程义，非"使用披露"义 |
| accountability | 13 | "跨职能问责驱动"（岗位责任义）；与 Jog 的认识论义（对思考负责）同词族弱收敛 |
| metacog（metacognition） | 0 | ✗ 无——**R12 候选成立**（Tankelevitch 2024＋Jog 2026 文献侧在讲，JD 0） |
| self-regulation | 0 | ✗ 无 |
| curiosity（仅精确词） | 71 | 与基线 "curiosity/curious 79" 一致（另 8 条为 curious） |

### 2026-10-04 增补核查·第四轮（HBS 播客投料触发："作品证明"命题，分母仍为海外 329）

| 词 | 命中文件数/329 | 语境结论 |
|---|---|---|
| portfolio | **32** | 作品集要求（含设计师岗固定句式 "A portfolio demonstrating user-centered design thinking…"）——**雇主文本确实要作品集** |
| side project | 1 | 极少 |
| built things / have built | 17 | "I've built things"式证明叙事（HBS Cook 与 Phil Chen/bonjour 的"拿作品说话"同向） |
| resume | **0** | ✗ JD 文本不提简历 |
| cover letter | **0** | ✗ JD 文本不提求职信 |

### 2026-10-04 增补核查·第五轮（intlsy《才华埋葬在昨天》触发："被埋葬的手艺"还剩多少雇主需求，分母仍为海外 329）

| 词 | 命中文件数/329 | 语境结论（短词根已加词边界复核） |
|---|---|---|
| PTX | **0** | ✗ 无 |
| SASS | **0** | ✗ 无 |
| CUDA | **4** | 工具清单义（"proficient in frameworks and tools such as CUDA, Pytorch, transformers, flash attention"），**非算子级手写优化要求** |
| kernel | 7 | **全部为操作系统/固件安全语境**（kernel hardening、firmware、bootloader、host software）；**GPU/算子 kernel 义 0** |
| assembly | 13 | **全部为制造装配义**（cable/connector assembly、assembly methods、wire prep/welding）；**汇编语言义 0** |
| profiling / latency / optimiz | 8 / 12 / 59 | 性能语汇存在但为通用工程要求（无一条指向手写底层算子优化） |

> ⚠ 语料构成限制（引用本表前必带）：五家海外 AI 公司岗位描述、偏设计/产品/通用工程岗；**"本语料内为 0"不等于"就业市场为 0"**。此轮事实只支撑一句话——**在 329 条 JD 里，"手写高性能 GPU 算子"这门手艺没有任何一条岗位描述在要求它**。





## 四、本基线的使用规则

- 每份报告笔记做"JD 对应实词"判断时，以本文件为准；新投料 JD 后本文件须整体重算并注明新分母。
- 本表所有数字是**文件级存在性计数（分母 329，含重复挂牌）**，不是最终频次，不得直接写进最终报告的结论段。
- ✗ 与 ? 分开标：上表均为已实际 grep + 回读（✗/确认事实）；尚未核查的词不进表。
