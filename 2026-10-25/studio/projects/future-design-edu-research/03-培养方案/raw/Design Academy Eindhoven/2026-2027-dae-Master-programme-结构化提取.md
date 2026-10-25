# Design Academy Eindhoven · Master（设计硕士，MFAD Design track）课程结构逐项提取（纯数据层）

> DAE 的「培养方案」对应物是 **Teaching- and Examination Regulations (TER)** / 荷兰语 **Onderwijs- en Examenregeling (OER)**，每年一版，附 **Credit Table**。项目网页本身**不含课程表、不含学分**。
> 本文件只列原文事实与机械计数，不含「这说明 / 因此 / 缺口 / 建议」类句子。学分单位为 **EC**（原文用 EC，等同 ECTS）。

---

## 1. 来源块

### 1.1 当前版（2026–2027）

| 原件文件名 | 完整 URL | 抓取日期 | 文件类型 |
|---|---|---|---|
| 2026-2027-dae-Teaching-and-Examination-Regulations-Master.pdf | https://www.designacademy.nl/media/attachment/id/10080 | 2026-10-04 | PDF 12 页（英文 TER；含 Appendix 1 Master Credit Table 2026-2027） |
| 2026-2027-dae-Onderwijs-en-Examenregeling-Master.pdf | https://www.designacademy.nl/media/attachment/id/10079 | 2026-10-04 | PDF 12 页（荷兰语 OER；BIJLAGE 1 Master Credit Table） |
| 2026-2027-dae-Teaching-and-Examination-Regulations-Bachelor.pdf | https://www.designacademy.nl/media/attachment/id/10078 | 2026-10-04 | PDF 15 页（本科 TER，作对照） |
| 2026-dae-398_master-programme.html | https://www.designacademy.nl/page/398/master-programme | 2026-10-04 | HTML（项目总览；**无课程表、无学分**） |
| 2026-dae-contextual-design.html | https://www.designacademy.nl/page/405/contextual-design | 2026-10-04 | HTML（方向介绍；**无课程表、无学分**） |
| 2026-dae-critical-inquiry-lab.html | https://www.designacademy.nl/page/408/critical-inquiry-lab | 2026-10-04 | HTML（方向介绍；**无课程表、无学分**） |
| 2026-dae-geo-design.html | https://www.designacademy.nl/page/5809/geo-design | 2026-10-04 | HTML（方向介绍；**无课程表、无学分**） |
| 2026-dae-information-design.html | https://www.designacademy.nl/page/5827/information-design | 2026-10-04 | HTML（方向介绍；**无课程表、无学分**） |
| 2026-dae-social-design.html | https://www.designacademy.nl/page/5839/social-design | 2026-10-04 | HTML（方向介绍；**无课程表、无学分**） |
| 2026-dae-governance-regulations.html | https://www.designacademy.nl/page/5612/governance-regulations | 2026-10-04 | HTML（条例附件索引页，上列 PDF 的出处） |

> 上述 PDF 均另有同名 `.extracted.txt` 伴生件（PyMuPDF 文本提取）。

### 1.2 历史版（Wayback Machine）

| 原件文件名 | 快照日期 | web.archive.org 完整 URL | 原站 URL | 文件类型 |
|---|---|---|---|---|
| wayback-2018-05-13-dae-homepage.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/ | https://www.designacademy.nl/ | HTML（当年首页，含导航结构） |
| wayback-2018-05-13-dae-Study-Master-General.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/Study/Master/General.aspx | https://www.designacademy.nl/Study/Master/General.aspx | HTML（当年 Master 总览页） |
| wayback-2018-05-13-dae-ContextualDesign.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/Study/Master/General/ContextualDesign.aspx | https://www.designacademy.nl/Study/Master/General/ContextualDesign.aspx | HTML（方向页） |
| wayback-2018-05-13-dae-SocialDesign.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/Study/Master/General/SocialDesign.aspx | https://www.designacademy.nl/Study/Master/General/SocialDesign.aspx | HTML（方向页） |
| wayback-2018-05-13-dae-InformationDesign.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/Study/Master/General/InformationDesign.aspx | https://www.designacademy.nl/Study/Master/General/InformationDesign.aspx | HTML（方向页） |
| wayback-2018-05-13-dae-DesignCuratingandWriting.html | 2018-05-13 | http://web.archive.org/web/20180513174955/https://www.designacademy.nl/Study/Master/General/DesignCuratingandWriting.aspx | https://www.designacademy.nl/Study/Master/General/DesignCuratingandWriting.aspx | HTML（方向页；该方向现已不在官网） |
| wayback-2019-dae-homepage.html | （回放至）2020-01-03 | http://web.archive.org/web/20200103034646/https://www.designacademy.nl/ | https://www.designacademy.nl/ | HTML（含 2019/2020 学年的 Master 导航结构） |
| wayback-2020-01-03-dae-study-master-general.html | 2020-01-03 | http://web.archive.org/web/20200103034646/https://www.designacademy.nl/study/master/general | https://www.designacademy.nl/study/master/general | HTML（当年 Master 总览页） |

---

## 2. 项目结构（TER/OER 原文照录）

来源：`2026-2027-dae-Teaching-and-Examination-Regulations-Master.extracted.txt`。

| 字段 | 原文（English TER 2026-2027） |
|---|---|
| Programme of study | DAE's full-time Master degree programme, Design track, within the generic Master of Arts in Fine Art and Design (MFAD – CROHO 49114). |
| Department | the Master degree programme is divided into five research departments: Contextual Design, Social Design, Information Design, the Critical Inquiry Lab and Geo-Design. |
| Examination | takes place in the last trimester of the second year of study, Module 6b, in the form of a final examination during which the final design is presented and the Master degree thesis is submitted. |
| Research proposal | assignment in Module 3b (see article 3), that students must complete in preparation for the second year of study. |
| Master proof | part of the examination centred around the verbal presentation of the project. |
| 授课语言 | the education, evaluations, assessments and examinations are conducted in English |
| 学制 | two-year Master degree programme（项目网页原文：each of the full-time, two-year programmes） |

### 2.1 Article 3 · Structure of Master programme（原文照录）

```text
Article 3
 Structure of Master programme
1.
The Master degree programme is structured as follows (see Appendix 1):
Year 1: Module 1; Module 2; Module 3a; Module 3b.
Year 2: Module 4; Module 5; Module 6a; Module 6b.
2.
The first year represents a study load of 60 EC, as can be seen in the Credit 
Table in Appendix 1. It focusses on developing research and design methods. 
The first year includes the following modules:
a.
Module 1 (20 EC) in which students discover research and design 
methods;
b.
Module 2 (20 EC) in which students deepen and apply their understanding 
of research and design methods.
c.
Module 3 consists of two parallel parts:
i. Module 3a (10 EC) in which students specify their research and design 
methods through an individual or a collaborative assignment.
MA-TER 2026-2027
3

=== page 4 ===
P4/12
ii. Module 3b (10 EC) in which a research proposal is developed in 
preparation for the second year.
3.
The second year is the final year of the two-year Master degree programme, 
represents a study load of 60 EC (see Appendix 1) and focuses on the 
graduation research and the final design. It consists of the following modules:
a.
Module 4 (20 EC), in which the student conducts research and starts 
writing the thesis.
b.
Module 5 (20 EC), students finalise the thesis and start the design project. 
c.
Module 6 (20 EC) in which Masterproof, thesis and graduation design 
project are assessed in final exam with an external examiner.  All 
components of final exam are assessed without an external examiner 
during a compulsory midterm. During this assessment the Assessment 
Committee assesses its confidence in whether the student is able to 
successfully complete the final examination.
```

### 2.2 APPENDIX 1 · MASTER CREDIT TABLE 2026-2027（原文照录）

```text
=== page 11 ===
P11/12
APPENDIX 1 
MASTER CREDIT 
TABLE 2026-2027
FIRST YEAR
Trimester 1
Trimester 2
Trimester 3
1 study year
Module 1
20EC
Module 2
20EC
Module 3A
10EC
Module 3B (thesis 
proposal)
10EC
Total trimester 1
20EC
Total trimester 2
20EC
Total trimester 3
20E
C
Total year 1
60EC
SECOND YEAR
Trimester 1
Trimester 2
Trimester 3
1 study year
Module 4 (thesis 
research)
20EC
Module 5 (Design)
20EC
Module 6A (green light)
10EC
Module 6B (final exam)
10EC
Total trimester 1
20EC
Total trimester 2
20EC
Total trimester 3
20E
C
Total year 2
60EC
Total Master Programme
120EC
MA-TER 2026-2027
11
```

> 荷兰语版 OER 的同一附表（`BIJLAGE 1`）数值与英文版一致：Module 1 20EC / Module 2 20EC / Module 3A 10EC / Module 3B (thesis proposal) 10EC = Total year 1 60EC；Module 4 (theses research) 20EC / Module 5 20EC / Module 6A (green light) 10EC / Module 6B (final exam) 10EC = Total year 2 60EC；**Total Master Programme 120EC**。

### 2.3 模块逐项（据 §2.1 与 §2.2 归并，课名/模块名照抄原文）

| 学年 | 模块（原文） | EC | 原文说明（照抄） | 网页 Project 页的括号注释 |
|---|---|---|---|---|
| 1 | Module 1 | 20 | in which students discover research and design methods |  |
| 1 | Module 2 | 20 | in which students deepen and apply their understanding of research and design methods |  |
| 1 | Module 3a | 10 | in which students specify their research and design methods through an individual or a collaborative assignment |  |
| 1 | Module 3b | 10 | in which a research proposal is developed in preparation for the second year | (thesis proposal) |
| 2 | Module 4 | 20 | in which the student conducts research and starts writing the thesis | (thesis research) / (theses research，荷语版) |
| 2 | Module 5 | 20 | students finalise the thesis and start the design project | (Design) |
| 2 | Module 6a | 10 | Module 6 consists of two parallel parts（原文于 Article 3 未细分 6a/6b 的说明） | (green light) |
| 2 | Module 6b | 10 | Masterproof, thesis and graduation design project are assessed in final exam with an external examiner | (final exam) |

---

## 3. 五个方向（departments）——名称与可核事实

| 方向（原文，2026 官网） | 该方向页正文中的可核陈述（照抄） |
|---|---|
| Contextual Design | In Contextual Design we consider design as a way to make sense of the world, as a practice of cultural critique. |
| Critical Inquiry Lab | Critical Inquiry Lab is a full-time, two-year Master programme committed to research-based design as a vehicle for public activation, where materials, experimental processes, fieldwork, theory and writing converge in equal measure. |
| Geo—Design | Founded in 2020, Geo—Design is the youngest master programme at the DAE. |
| Information Design | MA Information Design is a programme dedicated to the exploration of the politics and agency of information and its modes and contexts of production. |
| Social Design | The Social Design Master's programme envisions itself as an incubator for radical hope |

> 另有 **Pre-Master Programme**（项目网页原文：The Pre-Master is a Saturday course for people from diverse backgrounds），不属于硕士学分结构。

## 4. 历史对照：Master 方向（departments）名单

| 时间点 | 来源 | 官网列出的 Master 方向（照抄导航/正文原文） | 方向数 |
|---|---|---|---|
| 2018-05-13（快照） | `wayback-2018-05-13-dae-Study-Master-General.html` | Master General; Contextual Design; Social Design; Information Design; **Design Curating and Writing** | 4 |
| 2020-01-03（快照） | `wayback-2020-01-03-dae-study-master-general.html` | Master General; Contextual Design; Social Design; Information Design; **The Critical Inquiry Lab**; **GEO-DESIGN** | 5 |
| 2026-10-04（当前） | `2026-dae-398_master-programme.html` + TER Art.1 | Critical Inquiry Lab; Geo—Design; Contextual Design; Social Design; Information Design | 5 |

| 方向名（原文） | 2018-05-13 | 2020-01-03 | 2026-10-04 |
|---|---|---|---|
| Contextual Design | ✓ | ✓ | ✓ |
| Social Design | ✓ | ✓ | ✓ |
| Information Design | ✓ | ✓ | ✓ |
| Design Curating and Writing | ✓ | ? | ✗（官网与 TER 的方向名单中均未出现） |
| The Critical Inquiry Lab / Critical Inquiry Lab | ✗（2018 快照中未出现） | ✓ | ✓ |
| Geo—Design / GEO-DESIGN | ✗（2018 快照中未出现） | ✓ | ✓ |

> `✗` = 该时间点名单中确认没有；`?` = 未查到（2020-01-03 的 Master 总览页导航未列出该名）。

---

## 5. 课程名/学分关键词机械计数（分母 = 扫过的原件数）

### 5.1 网页原件（共 11 份当前网页 + 9 份 Wayback 快照）

| 原件 | 文本字符数 | `\bECTS\b` | `\bEC\b` | credit(s) | module(s) | course(s) |
|---|---|---|---|---|---|---|
| 2026-dae-368_study-at-dae.html | 7656 | 0 | 0 | 0 | 0 | 1 |
| 2026-dae-398_master-programme.html | 10056 | 0 | 0 | 0 | 0 | 4 |
| 2026-dae-contextual-design.html | 11469 | 0 | 0 | 0 | 0 | 2 |
| 2026-dae-critical-inquiry-lab.html | 10380 | 0 | 0 | 1 | 0 | 0 |
| 2026-dae-geo-design.html | 8268 | 0 | 0 | 0 | 0 | 0 |
| 2026-dae-governance-regulations.html | 3668 | 0 | 0 | 0 | 0 | 0 |
| 2026-dae-information-design.html | 9335 | 0 | 0 | 0 | 0 | 0 |
| 2026-dae-master-programme.html | 10056 | 0 | 0 | 0 | 0 | 4 |
| 2026-dae-social-design.html | 8039 | 0 | 0 | 0 | 0 | 0 |
| dae-master-programme.html | 10056 | 0 | 0 | 0 | 0 | 4 |
| dae-masters.html | 7858 | 0 | 0 | 0 | 0 | 6 |
| wayback-2018-05-13-dae-ContextualDesign.html | 10690 | 0 | 0 | 0 | 0 | 1 |
| wayback-2018-05-13-dae-DesignCuratingandWriting.html | 12861 | 0 | 0 | 0 | 0 | 9 |
| wayback-2018-05-13-dae-homepage.html | 4889 | 0 | 0 | 0 | 0 | 1 |
| wayback-2018-05-13-dae-InformationDesign.html | 12751 | 0 | 0 | 0 | 0 | 1 |
| wayback-2018-05-13-dae-SocialDesign.html | 7055 | 0 | 0 | 0 | 0 | 1 |
| wayback-2018-05-13-dae-Study-Master-General.html | 13505 | 0 | 0 | 0 | 0 | 8 |
| wayback-2019-dae-homepage.html | 4822 | 0 | 0 | 0 | 0 | 2 |
| wayback-2020-01-03-dae-study-master-general.html | 11111 | 0 | 0 | 0 | 0 | 7 |
| wayback-2020-12-31-dae-homepage.html | 162 | 0 | 0 | 0 | 0 | 0 |

> 说明：正则用词边界 `\bECTS\b`。不加词边界会命中 `objECTS` / `projECTS` / `aspECTS` 等词的子串（实测仅 `contextual-design` 一页即有 11 处此类假命中）。

### 5.2 条例 PDF

| 原件 | 页数 | `\bECTS\b` | `\bEC\b` | credit(s) | module(s) |
|---|---|---|---|---|---|
| 2026-2027-dae-Teaching-and-Examination-Regulations-Master.pdf | 12 | 0 | 14 | 3 | 57 |
| 2026-2027-dae-Onderwijs-en-Examenregeling-Master.pdf | 12 | 0 | 6 | 2 | 59 |
| 2026-2027-dae-Teaching-and-Examination-Regulations-Bachelor.pdf | 15 | 0 | 28 | 4 | 7 |

> 单位口径：DAE 用 **EC**，页面上**不用 ECTS 这个写法**。Module 总数 = 6 个模块号（1、2、3a、3b、4、5、6a、6b 合计 8 个模块单位；Article 3 把 3 与 6 各写作两个并列部分）。

---

## 6. 本提取未覆盖的（口径边界）

- **课程（course）级别清单：确认没有**（`✗`）。DAE 官网项目页与方向页均无课程表、无课程名清单、无 ECTS；TER 只到 **Module 1–6b** 这一层。
- **历史版的学分/模块结构（2018–2020 的 TER/OER）：未取到**（`?`）。详见同目录 `HISTORY.md`；Wayback 只存到 DAE 的 2025 年「klachtenregeling」（投诉条例），无历年 OER。
- **各模块的实际课时/学时**：TER 只有 EC，无学时。
- **每个 Module 的教学内容/考核方式细则**：TER 只给一句话描述，Assessment 部分只写程序性规定（次数、补考、缺席 NP），无教学内容。
- **本科层**：本文件只取了本科 TER 作对照（§1.1 第 3 项），未展开其 Credit Table。
- **Pre-Master Programme**：项目网页有介绍，本文件只登记名称，未展开。
- **2020-12-31 的首页快照**只有 3,111 字节（回放为跳转页），无内容，未作为证据使用。
- 课名/模块名/方向名照抄英文原文，未翻译。

---

*本文件为纯数据层，抓取日期 2026-10-04。任何「对应某项能力 / 是否属于缺口 / 是否变新」的判断由人类作出，不在本文件内。*