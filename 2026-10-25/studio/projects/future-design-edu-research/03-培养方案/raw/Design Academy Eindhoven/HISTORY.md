# HISTORY.md — Design Academy Eindhoven 历史版采集记录（已尝试的查询与结果）

> 抓取日期 2026-10-04。只记「查了什么 / 返回什么」。
> 结论先说：**历史版到手 2 个时间点**（2018-05-13、2020-01-03），但**只到「方向（department）名单」这一层**；**历史版的学分/模块结构未取到**（标 `?`）。

## 1. 已到手的时间点（方向名单层）

| 时间点 | 来源 | Master 方向（照抄） | 方向数 |
|---|---|---|---|
| 2018-05-13 | Wayback 快照 `Study/Master/General.aspx` 与首页导航 | Contextual Design；Social Design；Information Design；**Design Curating and Writing** | 4 |
| 2020-01-03 | Wayback 快照 `/study/master/general` 与首页导航 | Contextual Design；Social Design；Information Design；**The Critical Inquiry Lab**；**GEO-DESIGN** | 5 |
| 2026-10-04 | 现网 `page/398/master-programme` + TER Article 1 | Critical Inquiry Lab；Geo—Design；Contextual Design；Social Design；Information Design | 5 |

## 2. 查询与结果明细

### 2.1 现网（designacademy.nl）

- `archive.org/wayback/available?url=www.designacademy.nl&timestamp=2019` → **`archived_snapshots: {}`**（空）
- `…&timestamp=2018` → **`archived_snapshots: {}`**（空）
- `…&timestamp=2020` → 返回 **20201231183211**（`http://web.archive.org/web/20201231183211/https://www.designacademy.nl/`），实测回放只有 3,111 字节的跳转页。
- 逐 URL CDX（exact URL，`url=www.designacademy.nl`，`from=2018&to=2021`）→ **187 行**，含 2018-01-03 起密集快照，可正常取用。

### 2.2 Wayback CDX 过滤查询

| 查询形式 | 结果 |
|---|---|
| `matchType=domain` + `filter=urlkey:.*master.*`（limit 800） | **HTTP 502**（重试 3 次），后以 limit 250 成功但结果被 `DesktopModules/DnnForge - NewsArticles/ImageHandler.ashx?...` 图片 URL 占满（其 query 串含目标词），非页面 |
| `matchType=domain` + `filter=urlkey:.*regeling.*` | 成功，仅 2 行：`klachtenregeling_ongewenst_gedrag.pdf`（2025 年投诉条例），**无历年 OER/TER** |
| `matchType=domain` + **两个** `filter`（`mimetype:application/pdf` 且 `urlkey:.*(regeling\|examen\|oer\|studiegids\|curriculum).*`） | **HTTP 502**（重试 3 次，全部失败） |

### 2.3 历年 TER / OER

- 现网 `page/5612/governance-regulations` 只挂 **2026-2027** 的 TER/OER（attachment id 10080/10079/10078）与 2025-2026 的 **Student Charter**（id 8611/8612）；**没有 2025-2026 及更早的 TER/OER 直链**。
- Wayback CDX 对 `designacademy.nl` 域下的 PDF 过滤查询：**未命中任何历年 TER/OER**（见 §2.2）。
- 即：**历史版的学分表（Credit Table）未取到，标 `?`**。
- 已知与此相关的可核事实（现网原文）：现网项目页写 `In 2024, the DAE Masters programme was analysed by an external jury to gain accreditation from the Dutch Government.`（现网 `page/398/master-programme`）。

### 2.4 其它

- 旧站路径为 `…/Study/Master/General.aspx`（2018，DNN 站点），2020 年改为小写短路径 `…/study/master/general`；解析规则需按年份分别写（已验证：两版 HTML 结构不同）。
- 2018 与 2020 两版 Master 总览页与方向页的正文中，`\bECTS\b` 命中数均为 **0**，`\bEC\b` 命中数均为 **0**——即当年的网站同样不发布学分。

## 3. 未取到 / 未展开的（口径边界）

- 2018–2020 的 **TER/OER 与 Credit Table**：未取到，标 `?`。
- 2018–2020 的 **方向页正文全文**：已存 4 份方向页 + 1 份总览页原件（见 SOURCES.md §3），但本批未做逐句结构化。
- 1990–2017 年的任何结构：本轮未查询。

*本文件只记事实与失败原因，不含推断。*