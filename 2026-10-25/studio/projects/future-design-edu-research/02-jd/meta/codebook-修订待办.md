
---

## G. B1／B2 两批补充（2026-10-04 追加）

### G1. codebook 自身的内部缺陷（不是边界问题，是文件缺陷）

| # | 缺陷 | 证据 | 建议 |
|---|---|---|---|
| G1a | **A1 与 B3 的包含例引了同一句原文** | 同一句「Use concrete product failures and emerging user needs to identify gaps, form hypotheses」同时出现在 A1 与 B3 的包含例下 | 两项事实上不可分。拆句或删其一，否则任何含此句的 JD 都会被双编 |
| G1b | **引用了不存在的项「B4」** | A 组排除例写「那是 B4 设计系统」、C3 排除例写「属 B4」，而 23 项清单**没有 B4**（设计系统实际落 H3） | 删掉 B4 指代，或补登记。**会直接误导编码员** |
| G1c | **项数与正文不符** | 文末写「目前这 16 项里」，清单是 23 项 | B1/B2 两批均报告此点（与既有待决项一致） |
| G1d | **edu_major 三档不够用** | 4 条 OpenAI JD **通篇无任何学历/专业字段**；现 open/soft/hard 无法表达「字段缺失」 | **增设 `absent` 档**，否则「不写专业」会被误读为「开放专业」——直接影响门槛统计 |

### G2. 新暴露的框架缺口

| # | 缺口 | 证据原句 |
|---|---|---|
| G2a | **管理／带团队能力无项可落** | 「Own hiring, development, and day-to-day leadership」（Scale Senior Design Manager）；E2 排除例说「带团队属 D1/管理项」，但**没有管理项** |
| G2b | **「生产级 AI 系统实现」无处安放** | 「Design and implement production AI applications and agentic systems」（OpenAI FDE）——C1 排除例把它推向工具项，C2 又限定「原型验证」，只能勉强记 C2 |
| G2c | **薪资字段缺失，数据已在手却丢失** | B2 批有 4 条带薪资区间（Scale $233,600–292,000；Scale Staff PD $200,000–260,000 与 $180,000–290,000；Anthropic×2 $305,000–385,000），字段表**无 compensation 位** → 未落文件 |

### G3. 新的边界争点（B1/B2）

- **F2 是否含「准入／资格门禁」**：「Anthropic 分层年龄核验流程」「sensitive deployment 的 Integrity controls 与 readiness criteria」结构上是「加摩擦换安全」，**对象却是身份/资格而非产品内动作**。B1 一律未编并记存疑。
- **G2 的宾语被写死为「LLM 能力与工具栈」**：`Keep up to date with emerging AI policy enforcement best practices` 与 G2 句式完全同构、只是对象是领域实践；B1 未编。建议改为「持续跟进本领域最新变化并转化为流程/产品」。
- **A2 缺正向判据**：只有排除例、无正向定义。B1 自定口径＝(a) 与用户/客户直接接触 ＋(b) 目的为了解或获取反馈，两条同时满足才编。**需统一**。
- **D1 过松风险**：B1 按字面把 `own the roadmap`、`ownership of technically complex products` 算作端到端，结果 **D1＝9/11 接近天花板**。需明确该类资格句是否单独成立。
- **E2 混合句**：`lead a team` 被排除，但同一句里常混写 influence cross-functional teams。B1 只取 influence 分句编、纯 leadership 句留白。需统一。
- **C1/C2 句级不可分**：`write specs, prototype solutions` 与 `make product calls grounded in real technical understanding` 出现在同一句（4683446005）。
- **E3 与 H1 的「作品集」无判法**：B2 自定「作品集/用户中心设计→H1；开源项目、技术影响力证据→E3」。
- **A1 与 B2 在「定义路线图/指标」上重叠**：B2 自定「句中有 measures/metrics/成功标准→B2；无→不编」。
- **§3 套话词表漏项**：`Deeply customer-centric…`（A2 排除例）与 `Make design decisions informed by research, data, and user insights`（B2 排除例）不在词表但明显应记 generic_flags。

### G4. ⚠️ 跨批次口径不一致（**这是有效性问题，不是理论问题**）

**（1）「要求／加分」判法各批不同。**
- B1：把 JD 里的 `Ideally, You would Have` 段计为**要求**（只有明确 `Nice to haves` 才算加分）→ 62 个命中里**仅 1 个加分**；
- B4：Preferred／Nice to have 段「基本只装工具与年限，不装能力项」→ 8 条里 1 个加分；
- B2：3 个加分。
→ **结论：汇总表里的「要求/加分」两列跨批不可比，只能作单批次内部信息。**已在 `04-综合/编码口径敏感性-批次波动.md` 记录。

**（2）D1 与 E2 的松紧差异最大。** D1 各批为 45%–91%（波动 46pp），E2 在 B2 为 11/11。**总体最高的两项恰是门槛最有争议的两项**，引用须说明口径依赖。

**（3）批次间波动总览**（详见上述敏感性文件）：多数能力项波动 **18–82 个百分点**；波动最大的 A2 与 C2 均为 82pp，B2 为 70pp。**该波动可作为编码口径不确定性的下界。**

### G5. 两条对本项目直接有用的实证（来自 B1/B2）

1. **设计岗点名校招专业的极少**：B2 的 11 条**产品设计岗**里，**仅 1 条点名设计相关专业**（`Have a degree in HCI, Computer Science, or Graphic Design`，属 hard 档）；Anthropic 两条是 open 话术；**其余 8 条完全不写专业**。→ 直接支持「工具可跨、专业不跨」这一发现，且**比市场侧那 2.5% 更精确**（这是产品设计岗内部的比例）。
2. **H 组的零命中是岗位构成造成的**：B1（PM/AI治理）与 B3（部署/研究）里 H1–H4 **全为 0**，而 B2（产品设计）里 H3 8/11、H2 7/11。B1 的编码员原话：「可作为『岗位族选择』的证据而非『市场变了』」。
