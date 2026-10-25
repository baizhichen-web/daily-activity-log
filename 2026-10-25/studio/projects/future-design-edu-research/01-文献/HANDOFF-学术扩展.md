# HANDOFF · 学术文献系统性扩展（白纸 → 文献会话，2026-10-03）

> 用法：把下面 `====` 之间的内容整段粘贴给文献会话。
> 配套文件：`SESSION-PROMPT.md`（原始任务）、`notes/00-文献检索清单.md`（已有检索清单）。

====

## 新增任务：学术文献的系统性收集与分析

在现有 WEF 报告线之外，增加一条**学术文献线**：系统性收集与本项目主题相关的论文和书籍并分析。主题边界：**AI 时代的能力需求 / 职业结构变化 / 设计教育与人才培养**。

### 种子论文（已核验真实存在）

**Bankins, S., & Jooss, S. (2024). Navigating career stages in the age of artificial intelligence: A systematic interdisciplinary review and agenda for future research. *Journal of Vocational Behavior*.**
ScienceDirect PII: S0001879124000526 ｜ Semantic Scholar 可查

用法（雪球法）：
- **向后**：把它参考文献里与"能力/技能/教育"直接相关的条目拉进来
- **向前**：用 Semantic Scholar / OpenAlex 查"引用了它的论文"，找 2024–2026 的新进展

### 检索工具——先读本机，再上 GitHub（已核验，不用摸黑）

**① 本机已装 skill（优先用）**：`deep-research`（`~/.agents/skills/deep-research`），自带 **lit-review 模式**和 **systematic review 模式（PRISMA）**，含检索式设计、来源核验、偏倚评估。做系统性收集时优先触发它，不要从零自造流程。

**② API（免费、可编程、结果可登记复现）**：
- Semantic Scholar API：`api.semanticscholar.org`（引用链、相关推荐、批量摘要）
- OpenAlex API：`api.openalex.org`（覆盖最全，适合算合作网络/年份分布）
- arXiv API：AI+教育预印本

**③ GitHub 参考项目（读其提示词设计，不必引入运行）**：
- `assafelovic/gpt-researcher`——多源研究 agent 的检索提示词组织方式
- `Future-House/paper-qa`——文献问答的引文核验（citation verification）设计
- GitHub topics：`semantic-scholar`、`literature-review`、`systematic-review`
- 工具类（非 GitHub，做对照）：Connected Papers（图谱）、Elicit、Scite——**不要求使用**，它们的"相关论文"发现逻辑可以借鉴

### 检索式纪律

- 每个检索式登记进 `SOURCES.md`（数据库、检索串、日期、命中数、取用数）——**检索式本身是原始资料，附录要交**
- 同义词族展开，例：`(career OR employment OR occupation) AND ("artificial intelligence" OR "generative AI" OR AIGC) AND (education OR curriculum OR "design education" OR competency)`
- 中英文各一套；中文走 CNKI 检索式（见 `00-文献检索清单.md` 已列）

### 范围护栏（防跑偏，重要）

- **核心集 15–25 篇/本封顶**（书籍 3–5 本）。够三角验证即可，不做无限综述
- 证据分层照旧：**系统性综述（PRISMA）> 实证（有样本量）> 观点论文 > 媒体**。观点论文进`专家判断`级
- **产出服从交叉逻辑**：论文的能力主张，同样按 `_热词落差追踪.md` 的格式登记事实对（论文:页码 ↔ JD 文件）；不单独写一篇游离的"文献综述"
- 每篇笔记仍走 `_笔记模板.md` 结构

====
