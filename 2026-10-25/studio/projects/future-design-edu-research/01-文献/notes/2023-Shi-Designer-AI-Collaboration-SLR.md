# Understanding Design Collaboration Between Designers and AI: A Systematic Literature Review 分析笔记

- **来源文件**：raw/2023-Shi-Designer-AI-Collaboration-SLR.pdf
- **机构 / 年份**：Yang Shi, Tian Gao, Xiaohan Jiao, Nan Cao（同济大学智能大数据可视化实验室）/ Proc. ACM Hum.-Comput. Interact. Vol.7, CSCW2, Article 368；2023 年 10 月发表
- **DOI**：10.1145/3610217
- **证据类型**：二手综述（系统综述，PRISMA 流程）
- **样本量**：纳入文献 93 篇，年份范围 2007–2022，全部为核心 HCI 场馆（ACM DL 单库）
- **笔记处理日期**：2026-10-03
- **页码基准**：PDF 原文页码（Article 368 连续页 1–35；下列 p.N 均为 PDF 页）

## 核心命题

> 论文是"AI for design 研究图景"综述，非教育论文；其"人需要什么"的主张以隐含方式散布在协作特征与讨论章节。逐条登记，不合并。

1. 设计师与 AI 互补：AI 助力设计师的 discovery / visualization / creation / test 四类技能；设计师反向做 AI 做不到的 Train（用设计知识训练 AI）与 Regulate（约束 AI 行为）（p.1 Abstract；§6.1–6.2 p.14–16）
2. 设计师-AI 协作可由五特征刻画：scope（覆盖工作流范围）/ access（参与所需专业门槛）/ agency（谁主导）/ flexibility / visibility（p.16–18）
3. **access 由 design knowledge 与 design skills 两因素决定；3D 建模、制作原型等技能有时被设为与 AI 交互的先决条件**（p.17，举 SimuLearn 例：须会用 CAD 工具、会 3D 打印）
4. 设计师对 AI 输出信任有限，原因是"无法控制生成过程、不知道如何解读输出"；因此主张提升 AI 的可解释性，让设计师能"充分理解并恰当采纳"AI 建议（p.20）
5. AI 输出中的偏见可能源于设计师建数据集时无意带入的有害刻板印象；**设计师应依据伦理准则（accountability、privacy）仔细审查其收集/创建的设计**；数据集应由文化背景更多元的设计师建立（p.20–21）
6. AI 时代的署名与报酬问题：风格迁移可被用于抄袭/冒充设计师；主张用 AI 增强 designers 的 testing ability（度量相似度、预警抄袭风险）（p.21）
7. **novice 设计师从人机协作中获益多于专家（引 3 篇实证）；但用 AI"一键生成"可能不利于 novice 成长为成熟设计师，因为设计是 action-oriented 职业、设计知识靠 knowing-in-action 获得**（p.21）
8. 专家与 novice 早期 problem framing 差异大（专家"范围、深度、细节层级"更优）；专家常需要工程师、电子安全专家等跨专业建议 → **未来 AI 应用跨学科知识训练，而非只懂设计知识**（p.21）
9. research-practice gap：学界 AI 设计工具"很少被业界 UX 从业者实际使用"；语料中 67.7%（63/93）的贡献类型是算法，真实设计需求不是研究优先项（p.21–22）
10. 创意从业者采纳工具看多重因素：功能、**与既有 workflow 的整合**、性能、界面与体验、支持、财务成本、甚至与工具的情感连接；学界只看重前两者（p.22）
11. 早期设计任务（理解用户需求、发展新方案）"需要 design thinking"，AI 处理非结构化数据的能力在此可发挥（p.22，转述 Lu et al. [106]）

## 高频主张词

> 计数口径：正文 p.1–22（参考文献从 p.23 起不计）；同一页多次出现只计 1 页。大小写不敏感、跨行断词已用空白容错重跑。

| 词（原文词形） | 该报告的定义 / 用法 | 出现页数级次数 | 中文译法 |
|---|---|---|---|
| collaborat\* | 全文主题词（designer-AI collaboration） | 20 | 协作 |
| designer-AI | 复合术语，论文自建框架单位 | 10 | 设计师-人工智能 |
| creativ\* | 多指 collaborative creativity；未下操作定义 | 9 | 创造力（未定义） |
| train\* | **绝大多数为"训练 AI"义**（train AI with design data），非"人的培训" | 8 | 训练（主语多为 AI/模型） |
| explainab\* | explainability 作为可信 AI 原则；主张用于设计输出 | 6 | 可解释性 |
| prototyp\* | 原型制作=与 AI 交互的前提技能之一（p.17）；另多为工具功能例 | 6 | 原型（制作） |
| knowledge / design knowledge | design knowledge=p.17 access 两因素之一；未给正式定义 | 6（design knowledge 4） | 设计知识 |
| skill\* | discovery/visualization/creation/test skills 四分法（p.1、16）；design skills 单列 1 页（p.17） | 5 | 技能 |
| workflow | 工具应整合既有 workflow（p.22）；scope 特征涉及 workflow 覆盖 | 5 | 工作流 |
| interpret\* | 解读 AI 输出（p.20）；另为 ML 可解释性技术义 | 5 | 解读/可解释 |
| expert | 专家设计师（problem framing 优势） | 5 | 专家 |
| ethic\* | AI 伦理准则：accountability、privacy；bias、plagiarism | 4 | 伦理 |
| novice | 新手设计师（获益更多；一键生成阻碍成长） | 3 | 新手 |
| interdisciplinary | "跨学科知识训练 AI，而非只懂设计知识"（p.21） | 2 | 跨学科 |
| multimodal | 多模态交互输入（p.20，建议探索） | 2 | 多模态 |
| design thinking | 仅 1 处，转述 [106]，p.22 | 1 | 设计思维（未定义） |
| trust | "设计师对 AI 输出信任有限"（p.20） | 1 | 信任 |
| knowing-in-action | Schön 术语，引自 [37]；论证一键生成不利于成长 | 1 | 行动中认识 |
| literacy | **正文 0 页** | 0 | — |
| education / educate | **正文 0 页** | 0 | — |

> ★ 结构性事实：这篇"AI×设计"系统综述正文**完全不含 literacy / education 话语**——设计教育议题在 HCI 的 AI-for-design 研究图景中不出现。与交接文件 7.3"学科引用孤岛"发现同向，从语料内容侧再添一证。

## 时间线信息

- **报告发布时间**：2023-10（PACMHCI CSCW2）
- **引用的更早报告**：无雇主报告类；方法论遵循 PRISMA；综述对象为 2007–2022 HCI 论文
- **预测的目标年份**：无
- **⚠ 时效边界（引用时必须交代）**：数据检索截止 **2022-06**（ACM-DL 末次检索，p.5）；ChatGPT 于 2022-11 发布——**正文 0 次 ChatGPT/GPT**，生成式 AI 仅在 p.4、p.18 以 "generative" 提及，text-to-image（DALL·E/Midjourney）只作为"潜力方向"（p.20）。本文结论反映**前 GenAI 时代**的 AI-for-design 图景，不能当作 GenAI 冲击后的证据引用。

## 证据与方法

- **数据基础**：文献综述（PRISMA 四步：identification → screening → eligibility → inclusion，p.4–6）
- **样本框**：ACM Digital Library **单库**（五库资格率抽查后选定：ACM 15.0%、IEEE 5.0%、ScienceDirect 7.5%、T&F 0%、Wiley 2.5%，p.5）；检索式=AI 词族（AI/ML/DL/NN/RL/generative/style transfer/NLP/data driven）× 设计词（design/designer）
- **是否一手**：否（二手综述）
- **关键统计数字清单**：
  - 2,682 初检 → 去重 44 + 非同行评议全文 64 → 2,574 → 标题/摘要筛 → 212 全文复审 → 排除 96 → **93 纳入**（p.5–6）
  - 筛选一致性：20% 样本（515 篇）双人独立筛，Cohen's Kappa > 0.8（p.6）
  - 输入模态：仅 15/93 使用视觉以外模态（语言 7、触 6、手势 2）（p.20）
  - 未区分用户专业组：64.5%（60/93）（p.21）
  - 贡献类型算法主导：67.7%（63/93）（p.21）

## 与本项目的关系

- **主张了哪些"未来需要的能力"**：见核心命题 3、4、5、7、8、10——AI 时代设计师侧被要求：设计知识+设计技能（含 3D/原型，p.17）、解读 AI 输出（p.20）、伦理审查（bias/plagiarism，p.20–21）、与工具情感/成本等多维判断（p.22）；同时论文主张"AI 侧"应更可解释、应跨学科、应按 novice/expert 分层适配（p.20–21）。
- **这些主张在 JD 里能找到对应实词吗**（JD 频次基线 `notes/_JD实词基线.md`，分母 329；新核查 2026-10-03，稀有命中已逐条回读语境）：
  - ✗ **explainab\***（p.20 可解释性主张）：0/329——新落差候选，已登记 `_热词落差追踪.md` 例 6；
  - ⚠ **interpret\***（p.20"解读输出"）：JD 81/329 形同实异——**全部为 ML 模型可解释性语境**（Anthropic 使命句 "reliable, interpretable, and steerable AI"、Interpretability 团队/研究岗），无一条是"设计师须能解读 AI 输出"的个人能力主张；
  - ✗ **novice / design knowledge**（p.17、21）：各 0/329；
  - ✗ **multimodal**（p.20 多模态输入）：87/329 但**全部为模型能力语境**（multimodal models/capabilities），非个人能力；
  - ✗ **bias**（p.20 偏见审查义）：18/329 **全部是 "bias for action"（行动偏好成语）**，与 AI 偏见语义无关；ethic\* 83/329（基线已有，集中于 AI ethics/responsible AI 研究与政策岗）；
  - ⚠ **interdisciplinary**（p.21）：2/329——OpenAI PM："deeply curious and interested in interdisciplinary fields such as human-computer interaction, psychology, philosophy"（动机性要求，弱收敛）；
  - ⚠ **3d model**（p.17 技能前提）：2/329——均为 **Revit/AutoCAD/Civil 3D/SolidWorks/BIM 工程语境**，非 HCI 设计岗；
  - ✓ **prototyp\***（p.17"原型制作是交互前提"）：68/329（基线已有）——同向；
  - ⚠ **workflow**（p.22"工具应整合既有 workflow"）：104/329（基线 R3 已登记"WEF 0"）——本篇是第一篇 workflow 命中的文献，但主体不同（Shi 说**工具**应整合 workflow，JD 说**人**应能把 AI 嵌入 workflow）；已更新 R3 注记；
  - ✗ plagiarism（p.21）：0/329；text-to-image（p.20）：0/329。
- **与其他报告冲突的说法**：暂无直接冲突（首篇进入对照的学术综述）；其"novice 获益更多"与"一键生成阻碍成长"张力共存于同页（p.21），最终报告引用时两者都要带。

## 可疑之处

- **单库检索**（ACM-DL，p.5）：作者以五库资格率抽查自证，但 93 篇全部来自 HCI 场馆——设计学期刊（Design Studies、IJADE 等）不在样本内。其"研究图景"实为"**HCI 视角下**的 AI-for-design 图景"，外推到设计学科整体须谨慎。
- **单人完成 80% 筛选**（p.6）：仅 20% 双评（Kappa>0.8），其余 2,059 篇标题/摘要筛由一人执行，存在单筛者偏倚风险。
- **检索截止 2022-06**：不含 GenAI 爆发（见时间线节）；涉及"生成式 AI 能力主张"的内容均为展望性质，非实证。
- **novice 主张的实证基础薄弱**：64.5% 语料未区分用户组（p.21，作者自认）；"novice 获益更多"仅建立在引文 [97,104,163] 三篇之上。
- 语料内 AI 工具多为实验室原型，作者自己指出其"很少被业界使用"（p.21–22）——即本文"协作五特征"刻画的对象与产业实际使用的工具（JD 世界）之间存在对象错位。
