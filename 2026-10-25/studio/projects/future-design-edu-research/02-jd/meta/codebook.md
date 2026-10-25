# codebook v0.1（初稿 · 待白纸与组内冻结）

> 第 3 题编码手册。本文件是**初稿**，不是定稿——AI 起草、人审冻结后才允许全量编码。
>
> 起草方式：抽样精读 14 条跨岗位族 JD（Anthropic / OpenAI / Databricks / Scale AI / Linear），
> 从**真实原文**归纳能力项，不是凭空设计分类。每条的"包含例"均为原文引用，标出处。
>
> **修改本文件需要记录**：改了哪个能力项、改的理由、谁改的。冻结后再改要开新版本。

---

## 0. 使用规则（先读这段）

1. **禁止关键词匹配。** 每条 JD 要人工/LLM 读完判断语义。设计专业训练的核心能力，在雇主笔下换了一套词汇（见 §1 的说明）。
2. **一个 JD 可命中多个能力项**，也可一个都不命中（纯工程/纯法务岗）。
3. **每个命中必须标 `硬性` 或 `加分`**——两者权重不同，直接影响优先级排序。
4. **命中位置标 `职责` / `要求` / `加分`**——写在职责里的是雇主认为的核心工作，写在加分里的是偏好。
5. **边界情况写进附录，不要静默归类。** 例如"快速拆解 MVP"算不算 #1？记下你的判断和理由。
6. **工具项、学历项、经验年限项单独记，不计入能力项频次。** 理由见 §4。

---

## 1. 为什么必须语义判断（血泪证据）

同一条能力，设计专业和雇主用词完全不同：

| 设计专业内部说法 | 雇主 JD 里的实际写法 |
|---|---|
| 用户洞察 / 需求调研 | "conduct **discovery** with customers"（Anthropic FDE） |
| 问题定义 | "Use concrete product failures and emerging user needs to **identify gaps, form hypotheses**"（OpenAI PM, Core Models） |
| 系统思维 | "a **systems-oriented product thinker** who can **reason across complex states, dependencies, policies**"（OpenAI Product Designer） |
| 原型能力 | "**prototyping with front-end code** (e.g., HTML/CSS/JS)"（Anthropic Product Designer，加分项） |
| 快速迭代 | "prefer to **ship in days, not months**"（Anthropic Product Designer, Design Systems） |

用中文词表去匹配英文 JD，命中数会是 **0**。这不是发现，这是方法失败。

---

## 2. 能力项清单（23 项：A×3 B×3 C×3 D×3 E×3 F×2 G×2 H×4）

每项格式：**定义 / 包含例（原文） / 排除例**

### A. 问题定义与洞察

**A1 模糊需求拆解与问题定义**
- 定义：把含糊、巨大、无边界的问题拆成可执行、可交付的小问题。
- 包含例："深入行业场景，将**模糊需求拆解为可执行的技术路线图**"（腾讯 AI前线部署工程师FDE，岗位职责 1）；"面对模糊的现实问题能迅速拆解并**提炼 MVP**"（同岗，岗位要求 6）；"Use concrete product failures and emerging user needs to **identify gaps, form hypotheses**"（OpenAI Product Manager, Core Models）
- 排除例：仅写"有产品经验""有敏锐洞察力"而无具体拆解动作描述的，不算命中。

**A2 客户/用户现场发现**
- 定义：进入用户/客户的真实环境做一手信息采集，而不是靠二手文档或内部转述。
- 包含例："Strong communication skills to **conduct discovery with customers**"（Anthropic FDE）；"FDEs deliver with **customer empathy**, integrating with client systems"（Databricks FDE - Financial Services）
- 排除例："customer-centric mindset""以用户为中心"这类态度表述，属 §3 套话词表，不计命中。

**A3 行业与业务流程理解**
- 定义：理解某个具体产业的既有流程、例外处理、决策链条，并能说清哪些环节不该自动化。
- 包含例："Work **within customer systems** to build production applications"（Anthropic FDE，职责 1）
- 排除例：泛泛的"business acumen""行业敏感度"，属套话。

---

### B. 系统与权衡

**B1 心智模型建构**
- 定义：在没有既有范式可循的地方，为用户建立一套新的理解模型或交互规范。
- 包含例："**Define mental models and interaction patterns** for human-to-agent and agent-to-agent identity"（OpenAI Product Designer, Identity and Safety）；"You'll help define how users understand **what an agent can access**"（同岗）
- 排除例：在已有设计系统内做组件适配，不算（那是 B4 设计系统）。

**B2 多目标权衡与指标定义**
- 定义：在质量、延迟、安全、可靠性、成本等多个冲突目标间做取舍并定义成功标准。
- 包含例："**Define success across offline evaluations and online product metrics, balancing model quality, usefulness, latency, safety, reliability, and cost**"（OpenAI Product Manager, Core Models）；"can **distinguish a useful metric from a convenient one**"（同岗）
- 排除例：只提"数据驱动""用数据说话"而无具体权衡动作的，属套话。

**B3 从失败与新需求识别缺口**
- 定义：把具体的产品失败案例和涌现的用户需求，转成可验证的假设与投入方向。
- 包含例："Use concrete **product failures** and emerging user needs to identify gaps, form hypotheses, and shape the next wave of research and product investment"（OpenAI Product Manager, Core Models）
- 排除例：常规的用户反馈收集，不算；必须是"从失败中推出方向"。

---

### C. 技术判断（AI 时代的新中间层）

**C1 技术可行性判断**
- 定义：**不要求独立开发**，但要能判断什么做得到、做不到、风险在哪。这是本轮样本里最值得注意的新增项。
- 包含例："能通过**低代码平台或代码进行原型验证**"（腾讯 FDE，加分项 1）；"**can reason** across complex states, dependencies, policies, and user types"（OpenAI Product Designer）
- 排除例：要求精通 Python/Java 写生产系统的，属工具项（§4）不属本项。

**C2 AI 原型验证**
- 定义：用 AI 工具或代码把想法变成可运行的东西，再据此迭代。
- 包含例："**Experience using AI tools such as Claude Code as a creative partner in your own design practice**"（Anthropic Product Designer, Safeguards，最低资历）；"**Prototype in code and ship**: land changes in the design-system package alongside engineers, using Claude Code"（Anthropic Product Designer, Design Systems，职责）
- 排除例：只提"会用 Figma/Photoshop"，属工具项。

**C3 为 AI 可读性设计**
- 定义：把设计系统、界面、文档做成**模型也能正确使用**的形态。这是样本里全新的一类要求。
- 包含例："Make the system **legible to Claude as well as people**: the guidance, metadata and evals that show whether Claude uses it correctly"（Anthropic Product Designer, Design Systems，职责）
- 排除例：传统的无障碍（accessibility）要求，属 B4。

---

### D. 交付与落地

**D1 端到端负责**
- 定义：从需求到上线到迭代全程 Own，而不是交付一段就被别人接手。
- 包含例："具备端到端 **Own 项目结果**的主人翁意识"（腾讯 FDE，岗位要求 6）；"Proven track record of **executing end-to-end** on large and complex products... **in ambiguous environments**"（Anthropic Product Designer, Safeguards）
- 排除例：只写"有责任心""主人翁意识"而无端到端表述，属套话——**注意腾讯那条是两者都写，按 D1 计**。

**D2 快速交付与节奏**
- 定义：以天/周为单位迭代，而非以月/季度为单位。
- 包含例："prefer to **ship in days, not months**"（Anthropic Product Designer, Design Systems）
- 排除例："fast-paced environment"属套话环境描述，不计。

**D3 客户现场部署与培训**
- 定义：在客户现场做部署、把手把手教会对方用，并沉淀可复用的模式。
- 包含例："Provide **white glove deployment support** for Anthropic products in enterprise environments"（Anthropic FDE）；"**Identify and codify repeatable deployment patterns**"（同岗）；"开展**客户与内部技术培训和运营推广**，把 AI 工具嵌入到生产工作流"（腾讯 FDE，岗位职责 4）
- 排除例：纯售前演示，不算。

---

### E. 协作与影响力

**E1 跨域技术沟通**
- 定义：把高度技术性的内容讲给非技术方听懂，同时不失去技术可信度。
- 包含例："comfortable **explaining highly technical concepts to non-technical stakeholders**"（Anthropic Product Policy Manager）；"能与非技术高管讨论 ROI 也能与研发团队深入对齐技术方案"（腾讯 FDE，岗位要求 6）；"**convey technical concepts to diverse stakeholders** while maintaining a low ego"（Anthropic FDE）
- 排除例：泛泛的"沟通能力强"，属套话。

**E2 无权威影响力与跨职能协作**
- 定义：在没有管理权和指挥权的情况下推动事情发生。
- 包含例："collaborate across cross-functional teams and **influence without authority**"（Anthropic Product Designer, Safeguards）；"Earn the trust of researchers and engineers through technical depth, **crisp judgment**"（OpenAI Product Manager, Core Models）
- 排除例：带团队经验（lead a team）属 D1/管理项，不计本项。

**E3 影响力证据生产**
- 定义：产出可对外展示的技术影响力证据。**这是从"作品集"迁移出来的新形态。**
- 包含例："拥有**技术博客、开源项目（1000+ stars）、技术大会演讲或有影响力的技术作品**"（腾讯 FDE，加分项 3）；"A **portfolio** demonstrating user-centered design thinking"（Anthropic Product Designer，传统形态）
- 排除例：只写"有作品集"，归 E3 的传统子形态，不另立项。

---

### F. 责任与伦理

**F1 AI 风险识别与治理意识**
- 定义：识别 AI 的滥用风险与治理要求，并能把安全考虑嵌进产品开发。
- 包含例："Have a thorough understanding of **AI ethics, responsible AI principles, and current debates surrounding AI safety and governance**"（Anthropic Product Policy Manager）；"Have conducted **risk evaluations** of novel products in fast moving organizations"（同岗）；"Demonstrated expertise collaborating with product and engineering teams to **integrate safety considerations into product development**"（同岗）
- 排除例：合规/法务类岗位本身，不计。

**F2 安全性设计**
- 定义：为高风险动作设计确认机制，用摩擦换安全。
- 包含例："Design **security checks and confirmation flows** that protect sensitive actions while minimizing unnecessary friction"（OpenAI Product Designer, Identity and Safety，职责）
- 排除例：一般性安全培训，不算。

---

### G. 自主与适应性

**G1 模糊环境下的自主推进**
- 定义：在方向不清、约束不全时自己定路径并推进。
- 包含例："We expect our FDEs to **operate autonomously, thrive under ambiguity**"（Anthropic FDE）；"**High agency** with an ability to navigate ambiguity present in complex organizations"（同岗）；"Move quickly in **ambiguous environments**"（OpenAI Product Manager, Core Models）
- 排除例：只写"能在压力下工作"，属套话。

**G2 技术跟踪与栈演进**
- 定义：主动跟进 LLM 能力与工具栈的最新变化并转化为应用。
- 包含例："Maintain strong knowledge of the **latest developments in LLM capabilities**, implementation patterns, and AI product development stacks"（Anthropic FDE）
- 排除例：要求"精通某框架"，属工具项。

---

### H. 设计专业保留项（对照组，不可省）

**H1 用户中心设计思维与作品集**
- 包含例："**A portfolio** demonstrating user-centered design thinking and polished UI craftsmanship"（Anthropic Product Designer, Safeguards）
- **为什么要留**：作为对照组。如果全样本只有 H1 类岗位要求传统设计能力，说明调研样本选偏了，而不是市场变了。

**H2 视觉与交互工艺（craft）**
- 包含例："**Strong visual and interaction craft**"；"Care about the smallest details as much as the big picture, from a pixel to how the whole app fits together"（Anthropic Product Designer, Design Systems）
- 排除例：pixel-level 视觉执行，不算"UI craftsmanship"以外的东西。

**H3 设计系统与无障碍标准**
- 包含例："Experience with **design tokens, theming and accessibility standards**"（Anthropic Product Designer, Design Systems）
- 排除例：C3（为 AI 可读性设计）与本项不同，两者都要记。

**H4 屏外与多模态交互**
- 包含例："Has shipped **voice or other beyond-the-screen work**"（Anthropic Product Designer, Design Systems，加分项）
- 排除例：纯屏内交互，不算。

---

## 3. 套话词表（命中则标记 `generic`，不计入优先级）

这些词在 JD 里高频出现但无区分度，统计时单列：

```
self-starter  fast-paced  team player  strong work ethic  detail-oriented
passionate about  think outside the box  wear many hats
excellent communication skills（单独出现时）
hard-working  motivated  proactive  organized  reliable
```

**判定规则**：`excellent communication skills` 若**只写沟通能力、无具体对象与技术内容** → `generic`；若出现 E1 的具体形态（讲给非技术方、讨论 ROI） → 计 **E1**。

---

## 4. 单独记录、不计入能力项频次的字段

| 字段 | 记什么 | 为什么不并入能力项 |
|---|---|---|
| `tools` | Figma / Python / LangChain / RAG / Docker / Claude Code… | 工具会变。把"会用 Cursor"算成能力，一年后这个结论就废了 |
| `edu_major` | 专业要求原文 + 是否点名设计类 | 这是**门槛**不是**能力**，单独统计才有意义（见 design.md §3） |
| `edu_level` | 学士/硕士要求 | 同上 |
| `years` | 经验年限 | 同上 |
| `compensation` | 薪资区间 | 只能做辅助参考，不能进结论 |

**特别规则**：`edu_major` 要按三档记——
- `open`：完全不写专业要求，或写"relevant to the role, as demonstrated through coursework, training, or professional experience"
- `soft`：写"XX 等相关专业"，用"等"字兜底（联想硬件产品经理式）
- `hard`：逐一列举专业且不含兜底（腾讯 FDE 式）

这一栏是本次调研里**最直接回答"设计专业学生能不能进"**的证据，务必记全。

---

## 5. 编码输出格式

```json
{
  "source_key": "anthropic",
  "job_id": "4949336008",
  "title": "ML/Research Engineer, Safeguards",
  "family": "AI治理/政策/安全",
  "is_primary": "1",
  "abilities": [
    {"code": "E1", "level": "要求", "section": "要求"},
    {"code": "F1", "level": "要求", "section": "要求"}
  ],
  "generic_flags": ["strong work ethic"],
  "edu_major": "open",
  "edu_level": "Bachelor's or equivalent combination",
  "years": "4+",
  "tools": ["Python", "ML systems"],
  "coder": "ai-draft",
  "review": "pending",
  "notes": ""
}
```

`review: pending` 必须由人工过一遍才改成 `reviewed`。

---

## 6. 待组内讨论冻结的分歧点

以下是我拿不准的，**故意留着让组员吵**：

1. **A1 和 D2 的边界**："面对模糊问题迅速拆解并提炼 MVP"——这是问题定义（A1）还是快速交付（D2）？我倾向两条都记，但如果一个 JD 大量出现这种表述，会导致能力项虚高。
2. **C1 和 C2 的关系**：技术可行性判断是"能判断"，AI 原型验证是"能做出"。合成一个还是分开？分开会让"技术判断力"这个新结论更醒目，我倾向分开。
3. **E3 是否该合并 H1**：都是"拿作品说话"，但形态已经变了（从设计作品集到技术影响力证据）。我的判断是合并统计、分开解读。
4. **要不要新增"AI 伦理"之外的"环境可持续"维度**：本轮样本没看到，但样本只有海外 AI 公司，可能是构成偏差造成的假象。别因为没看到就断定不存在。

---

*初稿基于 14 条样本归纳，样本量不足以冻结。正式编码前建议扩到 30 条，且必须覆盖国内 JD 与传统制造 JD——目前这 16 项里，有几条很可能只存在于海外语境。*
