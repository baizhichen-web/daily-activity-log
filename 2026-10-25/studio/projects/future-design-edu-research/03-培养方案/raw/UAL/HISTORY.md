# UAL 历史版采集记录（HISTORY.md，线 C 会话补充）

采集日期：2026-10-04。本文件只记「查了什么、结果如何」，不含推断。

## 结果摘要

| 时间点 | 快照日期 | 原件 | 状态 |
|---|---|---|---|
| CSM 研究生课程指南 2019/20 | 2020-01-28（CDX 时间戳 20200128080715） | wayback-2020-01-28-ual-CSM-postgraduate-course-guide-2019-20.pdf（35 页，文本层 77,859 字符） | **到手**（但有口径限制，见下） |
| MA Design (CSM) Programme Spec 2021/22 | 2021-04-15（CDX 时间戳 20210415181950） | wayback-2021-04-15-ual-MA-Design-CSM-programme-spec-2021-22.pdf | **未取到可用内容** |

## 2019-20 指南的内容口径

- 该 PDF 是 **CSM 研究生招生宣传指南**，不是培养方案：全 35 页 grep `credits` 命中 **0**、无 unit/module 表。
- 可用事实：它列出了 CSM 2019/20 的 MA 课程名（照抄原文，去重后 74 个 `MA ...` 字符串，含 Design (Ceramics)、Design (Furniture)、Design (Jewellery)、Industrial Design、Material Futures、Design（总称）、Biodesign、Narrative Environments、Cities 等）。
- 该指南**不能**用于课程层对比（无学分、无模块结构）。

## 已尝试但未取到的查询

1. **MA Design (CSM) 2021/22 Programme Spec**
   - 查询：CDX `url=arts.ac.uk/__data/assets/pdf_file/0033/244797/CSMMADX01-MA-Design-Programme-Spec-for-202122-entry.pdf`
   - 结果：仅有 1 个 200 快照（20210415181950），但经代理取回的文件为 **1,048,576 字节被截断体**，PyMuPDF `page_count=0`，无法解析
2. **UAL 现站 PDF 直链**
   - `https://www.arts.ac.uk/__data/assets/pdf_file/0033/244797/...pdf` 与 `.../0016/155401/CSM-Postgraduate-Course-Guide-2019_20.pdf`
   - Node fetch 直连均返回 **403（Cloudflare challenge）**；`web_fetch` 对 `application/pdf` 返回 `unsupported content type`（两条通道均不通）
3. **UAL 课程页 URL 猜测（全部 404）**
   - `/colleges/central-saint-martins/courses/postgraduate-courses/ma-design`
   - `/colleges/central-saint-martins/courses/postgraduate-courses/ma-industrial-design`
   - `/colleges/london-college-of-communication/courses/postgraduate-courses/ma-interaction-design`
   - `/colleges/central-saint-martins/courses/postgraduate-courses/ma-design-ceramics-furniture-jewellery`
   - `/colleges/central-saint-martins/courses/postgraduate-courses/ma-material-futures`
   - 原因：UAL 课程详情页现路径为 `/subjects/<subject>/postgraduate/<slug>`（经 web_search 得到实例），且页面正文为 JS 渲染，web_fetch 取回的 HTML 中 `Course units` 命中 0
4. **Wayback 中 arts.ac.uk 域名级 CDX**
   - `matchType=domain` 的多次查询在多次重试后返回失败或 `limit` 截断结果，未能系统性枚举 2018-2020 的课程页/PDF

## 与当前版的并列（仅事实）

- 2026-10-04 抓取的 UAL 现行 programme spec 原件（同目录 `ual-spec-*.pdf`，由并行会话采集）：MA Design (Ceramics, Furniture, Jewellery) 2023-24 与 2024-25、MA Regenerative Design 2024-25；其正文含 `Course Credits 180`。
- 2019-20 指南中文案：`MA Design focuses on your individual design ...`（指南的描述层文字，非模块层）。
