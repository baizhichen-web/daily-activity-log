# HANDOFF · 文献线交接（AI → 白纸 / 另一个会话 / 组员）

> 本文件是文献线的**进度与事实交接**，不是结论。
> 所有"发现"在此都只是登记到的事实对，引用到具体报告页码；**判断与拍板归白纸**。
> 最近更新：2026-10-03。

---

## 一、当前进度（一句话）

已投料并拆完 **WEF《Future of Jobs Report》三个年份版本**（2018 / 2020 / 2025），三份逐份笔记已落盘；`SOURCES.md` 已登记；`文献综合.md` **未启动**（按约定等全部报告到齐再写）。

| 报告 | 时代定性 | 样本（公司） | 覆盖 | 代表雇员 | 笔记 |
|---|---|---|---|---|---|
| WEF 2018（9 月，第二版） | 疫情前 | 313 | 20 经济体 / GDP 70% | 1,513 万 | `notes/2018-WEF-Future-of-Jobs.md` |
| WEF 2020（10 月，第三版） | 疫情时 | 291 | 26 国 / GDP 80% | >770 万 | `notes/2020-WEF-Future-of-Jobs.md` |
| WEF 2025（1 月，第五版） | AI 背景 | 1,043 | 55 国 / GDP 88% | 1,410 万 | `notes/2025-WEF-Future-of-Jobs.md` |

三份均为**一手雇主问卷**（含 LinkedIn/Coursera/Indeed/ADP 平台二手数据，伙伴有商业利益相关）。三版**均未披露回收率**。

---

## 二、已登记的核心事实对（交接重点）

### A. 用户例 1「AI 素养 / AI 思维」——WEF 自身几乎不这么说

- "literacy" 三版命中 **0 / 1 / 121**：
  - 2020 唯一命中是方法学技能表标签 "Digital Literacy"（PDF p.155）；
  - 2025 的 121 处中 **118 处是分类标签 "technological literacy"** 在 profile 表重复；**"AI literacy" 精确短语仅 1 处、"GenAI literacy" 仅 1 处，同在 p.44**（Box 3.1 结论句）。
- "mindset"：**8 / 0 / 1**（2025 p.49 非能力义）；**"AI 思维 / AI mindset" 三版 0**。
- **待办事实**：用户所说"报告满篇 AI 素养/AI 思维"的真正出处应在 **UNESCO / 学术论文**，这批未投料，例 1 目前未达"≥2 份不同机构"门槛。

### B. 新登记、成系统的一组（JD 高频实词，WEF 三版全部 0）

> 已逐词加词边界复核（早期脚本两处子串误报见下"勘误"）。分母 329 个 JD 文件。

| JD 实词（/329） | WEF 2018 | 2020 | 2025 |
|---|---|---|---|
| ambiguity 120 | 0 | 0 | 0 |
| workflow 104 | 0 | 0 | 0 |
| prototype 68 | 0 | 0 | 0 |
| ownership 73 | 版权声明×1 | 0 | 版权声明×1 |
| storytelling 21 | 0 | 0 | 0 |
| design system 14 | 0 | 0 | 0 |
| taste/aesthetic 12 | 0 | 0 | 0 |
| legible 5 | 0 | 0 | 0 |
| fluency 57 | 0 | 0 | 0 |

即：**9 个 JD 高频姿态/动作词，WEF 三版一个都没有**，与例 1 方向相反、同样成系统。JD 侧原文与文件:行见 `notes/_JD实词基线.md`。

### C. 两侧收敛点（2025 新出现、JD 也高频，作对照）

- **curiosity**：WEF 0 / 0 / **82**（核心技能 50%、净增 61）↔ JD 79；
- **alongside/with AI**：WEF 0 / 0 / **151**（77% 雇主战略，PDF p.62–63；45/55 经济体首选）↔ JD 52（含 "creative partner" 3 处）；
- **human-centred**：0 / 0 / **8**（p.5,40,43,45,95）↔ JD 3；
- **sustainab\***：0 / 5 / 22 ↔ JD 3。

### D. WEF 三版自身的时间序列现象

- **标签替换**：critical thinking **36 / 90 / 0**、creativity **37 / 70 / 0** → creative thinking **0 / 0 / 131**；WEF 未给新旧标签映射表。
- **literacy 话语**：0 / 1 / 121（主体是 taxonomy 标签）。
- **design thinking、computational design 三版全部 0** → 候选落差例 2 在 WEF 内不成立，只能靠设计教育专门报告检验。
- **prompt**：2018 仅动词 1 处（p.21）、2020 = 0、2025 = 3；"prompt-writing" 仅 2025 p.12/p.44。

---

## 三、必须先解决的数字冲突（引用时间序列前处理）

技能不稳定/变化率出现**三个互相不一致的数字**：

- WEF 2020 报告自身：**40%**（PDF p.12）与 **44%**（PDF p.8 Box 1.1）；
- WEF 2025 报告 Figure 3.1（PDF p.33）回溯把 2020 vintage 标为 **57%**；
- 报告未解释口径差异（不同切分 / 重新加权 / 图表错误均未说明）。

2025 报告给出的历史序列（Fig 3.1，p.33）：2016:35%、2018:42%、2020:57%（高点）、2023:44%、2025:39%。

---

## 四、已直接标注、未软化的可疑点

1. **Box 3.1（p.43–44）方法学薄弱**："AI 替代能力"由 **GPT-4o 自我评估**得出、无外部校验，存在自评偏差；数据截至 2024-08，时效强。样本为 Indeed 库 2,800+ 细粒度技能：0 项"极高"、69% 极低/低、28.5% 中等。
2. **样本门槛 2025 提高到 ≥500 人**（2020 为 ≥100），<500 人企业整体排除，结论实为"大企业视角"。
3. **"平面设计师将衰退"为首次预测**，基于雇主主观预期，报告直接归因 GenAI，但无实际雇佣变化数据——因果归因超出问卷能直接支撑范围（PDF p.26）。
4. 平台伙伴（LinkedIn/Coursera/Indeed/ADP）数据展示同时服务其平台业务，报告未标注利益相关。
5. 三版均排除非正规部门；2018/2020 明确排除 SME。

---

## 五、还缺什么（下一阶段投料清单）

`文献综合.md` 与 ≥2 机构门槛，依赖下列材料（官方链接见 `notes/00-文献检索清单.md`）：

| 优先级 | 待补材料 | 用来检验 |
|---|---|---|
| ★★★ | **UNESCO《AI Competency Framework for Students》（2024）** | 例 1 的真正出处、定义变体 |
| ★★★ | **设计教育专门文献**：Cumulus 白皮书、IJADE 等学术论文 | 例 2（计算思维/设计思维）、AI 与设计教育能力框架 |
| ★★☆ | **OECD** 技能/创意产业/未来教育报告 | 例 1、例 4 的第二机构来源 |
| ★★☆ | **国内一手**：教育部/工信部数字创意产业与艺术设计教育文件、中国工业设计协会报告 | 国内证据（当前整体最大缺口） |
| ★★☆ | **行业一手**：Adobe / Autodesk / Figma / Design Council 年度报告（须标厂商利益相关） | 热词定义与 JD 对照 |
| ★☆ | 公众号 / 知乎 / 行业媒体深度文（证据等级最低，仅线索） | — |

> 提醒：JD 侧同样 100% 为海外 AI 公司（manual-cn / manual-sme 未投料），任何落差例在国内 JD 投料后都需重查。

---

## 六、文件索引（交接给接手方）

- 逐份笔记：`notes/2018-WEF-Future-of-Jobs.md`、`notes/2020-WEF-Future-of-Jobs.md`、`notes/2025-WEF-Future-of-Jobs.md`
- 工作底稿：`notes/_热词落差追踪.md`（例 1–5、R1–R9、C1–C4 状态表）、`notes/_JD实词基线.md`、`notes/00-文献检索清单.md`、`notes/_笔记模板.md`
- 元数据：`SOURCES.md`
- 待产出：`notes/文献综合.md`（全部报告到齐后）

### 勘误（2026-10-01 词频脚本子串误报，已修正）

- `legib` 命中实为 "e**legib**le"；`fluen` 命中实为 in**fluen**tial/influencing；`craft` 唯一命中是岗位名 "Handicraft Workers"。
- 教训：含常见词缀的短词根必须加词边界 `\b` 复核，稀有命中逐条回读。

---

# 七、学术文献线交接（2026-10-03 新增）

> 以 **Bankins & Jooss (2024, JVB)** 为种子，雪球法＋主题补盲。**收集阶段已完成，逐篇笔记未启动**（按白纸指示，本轮只收集、登记、交接）。

## 7.1 进度与计数

- 雪球 249（向后 138/164＋向前 111）＋主题补盲 82（原始 96）→ 合并去重 **329 候选** → 核心集 **18 篇**（封顶 15–25）。
- **全文已取 16 篇**（13 PDF＋3 开放 HTML 转存 md，均在 `raw/`）；**2 篇未取**：
  - **Meron 2023**（Cambridge gold，Cloudflare 安全验证在浏览器中也未自动通过）→ 需人工下载 PDF（DOI 10.1017/dsj.2023.28）；
  - **Bankins 2024 种子**（ScienceDirect 付费墙）→ 需机构权限（PII S0001879124000526）；OpenAlex 完整记录已存 agent `lit-out/seed-full.json`。（2026-10-25 注：seed-full.json 已不在 lit-out/，现存 seed-search-openalex.json）
- 检索式已全部登记 `SOURCES.md`（S0/S1/S2＋T1–T8，含命中/取用数）；纳入排除标准见 `notes/_纳入排除标准.md`。

## 7.2 18 篇核心集（分组与文件，详见 SOURCES.md 表）

- **A 设计教育/设计师（6）**：Shi 2023 SLR(93 篇)、Inie 2023(N=23)、Gmeiner 2023、Kalving 2024(n=49+6+6)、Meron 2023(待取)、Wang 2025。
- **B AI 素养定义/框架（4）**：Long&Magerko 2020、Ng 2021(30 篇)、Walter 2024(观点)、Chiu 2025(editorial)。
- **C GenAI 高教实证（3）**：Chan&Hu 2023(N=399)、Chan 2023(457+180)、Crompton 2023(PRISMA 138)。
- **D AI 职业/能力（4）**：Bankins 2024(待取)、Portocarrero 2025、Tankelevitch 2024、Seeber（**仅 2018 workshop 版**，非 I&M 2020 正式版）。
- **E 21 世纪技能（1）**：Thornhill-Miller 2023(4C)。

## 7.3 方法学发现（已固化，供接手方直接用）

1. **学科引用孤岛**：种子 249 个邻里无一篇设计教育文献，设计教育类全靠主题补盲进入——单一种子引用图无法跨学科，最终报告方法部分应交代。
2. **版本陷阱**：Seeber 仅得 workshop 版，写笔记/引用须注明，不能冒充 I&M 2020 页码。
3. **证据级提醒**：Walter 2024（discussion）、Chiu 2025（editorial）、Tankelevitch 2024（概念框架）属专家判断级，权重低于实证与 PRISMA；Portocarrero/Gmeiner 的样本与方法须在写笔记时核实回填，勿照摘要假设。

## 7.4 接手方下一步（按顺序）

1. 取 2 篇缺口全文（Meron 人工/浏览器、Bankins 机构权限）；
2. 18 篇逐篇走 `notes/_笔记模板.md`，每条主张标 **论文:页码**；
3. 能力主张按 `notes/_热词落差追踪.md` 格式登记**事实对（论文:页码 ↔ JD 文件:行）**，JD 频次以 `notes/_JD实词基线.md` 为准（02-jd 只读）；
4. 向前雪球 2024–2026 新进展（Wang/Portocarrero/Chiu/Kalving）标注年份；
5. 全部报告（WEF＋学术＋行业/机构）到齐后写 `notes/文献综合.md`。
6. **未决**：书籍 3–5 本选目（候选 Chan & Colloton 2024《Generative AI in Higher Education》Routledge, DOI 10.4324/9781003459026）；中文 CNKI 检索需有权限环境。

## 7.5 脚本与中间产物位置（agent 工作区，可复现）

- agent 工作区：`...\.sessions\38444979162802434\agents\m_0cwpYZAoXaS\`
- 脚本：`litapi.mjs`(核验/搜索)、`snowball.mjs`(雪球)、`targeted.mjs`(8 组补盲)、`screen.mjs`(分桶打分)、`finalize.mjs`(固化核心集)、`getpdf.mjs`(node 直连下载，用法 `node getpdf.mjs <url> <file>`)。
- 中间产物 `lit-out/`：`seed-full.json`、`core-full.json`、`core-manifest.md`、`candidates-raw.json`、`screen-buckets.txt`、`targeted-shortlist.md`、`download-report.json`。
- 运行环境：node v22（OpenSSL 通道，可靠）；Python 3.10（PDF 库齐全，路径见会话）；S2 持续 429、S2_API_KEY 空。
