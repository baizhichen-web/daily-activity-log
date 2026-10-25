# HISTORY.md — 米兰理工大学 历史版采集记录（已尝试的查询与结果）

> 抓取日期 2026-10-04。本文件只记「查了什么 / 返回什么」，不含判断。
> 结论先说：**历史版已到手 2 个时间点**（AY 2021/2022 课程级清单、2018 年官方 Manifesto PDF 3 份），另有 2019/2020 与 2022–2025 的失败/回落记录如下。

## 1. 已到手的时间点

| 时间点 | 来源形态 | 是否课程级 | 位置 |
|---|---|---|---|
| AY 2021/2022（2017 级后按 ord. 270/04） | ManifestoPublic 服务 `aa=2021`，7 个项目，代码 1262/1091/1097/1162/1260/1261/1159 | 是（共同课程 + 每项目 1 个 track 必修） | §2 of `2026-2027-polimi-Design-MSc-programme-structure-结构化提取.md` |
| 2017/18 与 2018/19 招生年度 | Wayback 快照的年度 Manifesto PDF（Design & Engineering 2017/18；Interior Design 2017/18；Product Service System Design 2018/19，PDF 内标 `cod. 1059`） | 是（PDF 内以 CFU 列课，版式为图形化分栏，未逐行结构化） | `2018-polimi-*.pdf` 与 `.extracted.txt` |
| 2019-08 / 2020-09 | Wayback 快照的「Manifesto degli studi e programmi」目录页（记录各项目 `aa=2019` 链接与旧托管 www4.ceda.polimi.it） | 否（目录页） | `wayback-2019-08-17-*.html`、`wayback-2020-09-24-*.html` |

## 2. ⚠️ 已实测的「回落页」陷阱（重要，别把这批数据当历年课程表）

ManifestoPublic 服务对一个不存在的 `(aa, k_corso_la, k_indir)` 组合**不报错，而是回落到另一个年份/另一个项目**。实测（请求 `k_corso_la=1026`，即 2026 版 Digital and Interaction Design）：

| 请求的 aa | 页面实际选中的学年 | 页面实际选中的项目 | 课程数 |
|---|---|---|---|
| 2026 | 2026/2027 | Digital and Interaction Design (1026) | 5 |
| 2025 | 2025/2026 | Digital and Interaction Design (1026) | 5 |
| 2024 | 2024/2025 | **Interaction Design (1014)，Laurea（本科）** | 7 |
| 2023 | 2023/2024 | **Interior Design (1087)，Laurea（本科）** | 15 |
| 2022 | 2022/2023 | **Interior Design (1087)** | 15 |
| 2021 | 2021/2022 | **Interior Design (1087)** | 16 |
| 2020 | 2021/2022（回落） | **Interior Design (1087)** | 16 |
| 2019 | 2021/2022（回落） | **Interior Design (1087)** | 16 |
| 2018 | 2021/2022（回落） | **Interior Design (1087)** | 16 |
| 2017 | 2021/2022（回落） | **Interior Design (1087)** | 16 |
| 2016 | 2021/2022（回落） | **Interior Design (1087)** | 16 |

判定方法：逐页读 `<select name="k_corso_la">` 与 `<select name="aa">` 的 `SELECTED` 项。

**服务可用的最早学年 = 2021/2022**：请求 `aa=2020` 及更早，页面选中学年一律显示 2021/2022。

因此：任何把 `aa=2016…2024` 当作「1026 项目历年课程表」的数据都是错的——那些年是另一个项目。

## 3. 各条通道的尝试与结果

### 3.1 ManifestoPublic 的 `aa` 参数（当前托管 onlineservices.polimi.it）

- 尝试：`aa` 取 2016–2026 各值，`k_corso_la` 固定 1026。
- 结果：只有 `aa=2026`、`aa=2025` 返回本项目；其余回落（见 §2）。
- 尝试：改用 ord. 270/04 的 2021 年代码（1262 等）+ `aa=2021`。
- 结果：**成功**，页面 `Name` 与 `Class of degree` 均确认为对应项目、学制 2 年、`LM-12`。已按此取 7 个项目。

### 3.2 旧托管 www4.ceda.polimi.it（2019 年目录页给出的地址）

- 尝试：直接 GET `https://www4.ceda.polimi.it/manifesti/...ManifestoPublic.do?aa=2019&k_corso_la=1262...`。
- 结果：**HTTP 404**（主机已废弃）。
- 尝试：用 Wayback 取 www4.ceda 的 Manifesto 页面。
- 结果：`archive.org/wayback/available` 对该 PDF 返回 `archived_snapshots: {}`（未存档）；CDX 的 `matchType=prefix` 与带 `filter=` 的查询连续返回 **HTTP 502**（每次重试 4 次，均 502），未能列出 www4.ceda 下的 Manifesto 快照。
  - 未采用：`matchType=domain` 无 filter 的查询可用，但结果按 urlkey 排序，前 500 条被 `aunicaaccount2/...` 等无关 URL 占满，未命中 Manifesto 条目。

### 3.3 学院年度 Manifesto PDF（design.polimi.it/fileadmin/...）

- 尝试：直接 GET `https://www.design.polimi.it/fileadmin/files/verbali/...` 4 份 PDF。
- 结果：**4 份全部 HTTP 404**（现行站点已迁移 fileadmin 结构）。
- 尝试：走 Wayback `web/<快照>/id_/<原URL>`，每份最多重试 5 次。
- 结果：3 份 **HTTP 200 + application/pdf** 成功；1 份（Digital and Interaction Design 2018，`verbali/giunta_30-1-18/180130_Allegato_2-7_Manifesto_DID.pdf`）**未存档**，反复返回 404，已放弃并删除占位文件。
  - 注：Internet Archive 首次调用多次返回 **502**，隔 4 秒重试后成功——「失败先重试 2–3 次」这条经验有效。

### 3.4 CDX 查询

- 可用：`url=design.polimi.it&matchType=domain&output=json&collapse=urlkey&limit=1000&filter=mimetype:application/pdf`（mimetype 过滤可用）。
- 可用：`url=design.polimi.it&matchType=domain&...&filter=urlkey:.*manifesto.*`。
- **不可用**：`matchType=prefix`、以及 `filter=original:.*ManifestoPublic.*` 形式的查询，稳定返回 HTTP 502。

## 4. 未取到 / 未展开的（口径边界）

- AY 2019/2020 的课程级清单：未取到（旧托管 404、Wayback 无存、CDX 前缀查询 502）。标 `?`（没查到），非 `✗`。
- AY 2022/2023、2023/2024、2024/2025、2025/2026 的课程级清单：未按「本项目的正确代码」重新探测；已知 2026 版代码在这几年会回落，标 `?`。
- 2018 年 3 份 PDF 内的表格未做逐行结构化（版式为分栏图形，PYMuPDF 取文本后行序不可靠）；原文已存 `*.extracted.txt`，供人工核对。

*本文件只记事实与失败原因，不含推断。*