# HISTORY.md — Aalto University 历史版采集记录（已尝试的查询与结果）

> 抓取日期 2026-10-04。只记「查了什么 / 返回什么」。
> 结论先说：**2018–2020 学制期的课程表未取到**（标 `?`）。已到手的历史层是 **2022–2024 学制期**（在线 + Wayback 2023-09-25 快照）。

## 1. 已到手的时间点

| 时间点 | 来源形态 | 是否课程级 | 位置 |
|---|---|---|---|
| 学制期 2022–2024 | aalto.fi 在线课程页 + Wayback 2023-09-25 快照 | 是（Code / Course name / ECTS credits，含分组） | `2022-2024-aalto-…-curriculum.html`；`wayback-2023-09-25-…html` |
| 学制期 2024–2026 | aalto.fi 在线课程页 + Wayback 2024-05-24 起 4 个快照 | 是 | `2024-2026-aalto-…-curriculum.html` |
| 学制期 2026–2028 | aalto.fi 在线课程页（当前版） | 是 | `2026-2028-aalto-…-curriculum.html` |
| 课程替换 2024-2026 → 2026-2028 | 官方 Kurssikorvaavuudet PDF ×3 | 是（旧课码↔新课码） | `2026-aalto-Kurssikorvaavuudet_*.pdf` |
| 2019-05-03 | 官方 PDF「Aalto Bachelor's Programme in Design」（本科，非硕士） | 是（按 Period 排课 + cr） | `2019-aalto-aalto_bachelor_in_design.pdf` |

## 2. 学制期 URL 逐条实测（aalto.fi 在线）

请求 `https://www.aalto.fi/en/programmes/masters-programme-in-design/curriculum-<期>`：

| 学制期 | HTTP | 是否含 ECTS 表 |
|---|---|---|
| 2026-2028 | 200 | 是 |
| 2025-2027 | 404 | 否 |
| 2024-2026 | 200 | 是 |
| 2023-2025 | 404 | 否 |
| 2022-2024 | 200 | 是 |
| 2021-2023 | 404 | 否 |
| 2020-2022 | 404 | 否 |
| 2019-2021 | 404 | 否 |
| 2018-2020 | 404 | 否 |

## 3. Wayback Machine 尝试

### 3.1 逐 URL CDX（exact URL，`output=json`）

| 查询的 URL | 快照数 | 最早 | 最晚 |
|---|---|---|---|
| www.aalto.fi/en/programmes/masters-programme-in-design | 7 | 2023-03-28 | 2026-09-23 |
| www.aalto.fi/en/programmes/masters-programme-in-design/curriculum-2022-2024 | 4 | 2023-09-25 | 2025-01-24 |
| www.aalto.fi/en/programmes/masters-programme-in-design/curriculum-2024-2026 | 4 | 2024-05-24 | 2026-09-23 |
| www.aalto.fi/fi/ohjelmat/muotoilun-maisteriohjelma | 13 | 2024-07-23 | 2025-01-25 |
| www.aalto.fi/en/study-options | 100 | 2019-06-24 | 2026-10-01 |
| www.aalto.fi/en/study-options/masters-programme-design | **0** | — | — |
| www.aalto.fi/en/study-options/masters-programme-in-design | **0** | — | — |

### 3.2 具体失败与原因

- `www.aalto.fi/en/study-options` 有 2019-06-24、2019-11-14 快照，但**该页当年是空落地页**（只有导航与 quicklinks，无项目/课程内容），因此不能当课程层证据。已存原件备查。
- `aalto.fi/en/study-options/*` 形式的 CDX 通配查询：连续 3 次返回 **HTTP 502**，未取得列表。
- `matchType=domain` + `filter=urlkey:.*masters-programme-design.*` 的全域查询：先返回 **HTTP 504**（超时），未完成。
- `into.aalto.fi`（Aalto 学生门户 / 旧 Study Guide）下列候选 URL 经 `archive.org/wayback/available` 实测 `archived_snapshots: {}`（**无存档**）：
  - into.aalto.fi/display/ENMasterofArts
  - into.aalto.fi/display/ENMasterofArts/Design
  - into.aalto.fi/display/ENStudyguide/Design
  - into.aalto.fi/display/ENVCDM
  - into.aalto.fi/display/ENVCDM/Curriculum+2018-2020
  - into.aalto.fi/download/temp/pdfexport-20200715-150720-1304-84831/envcdm-Curriculum2018-2020-150720-1304-84832.pdf
- 上述 `into.aalto.fi` 的「Curriculum 2018-2020」PDF 直链**在线已失效**：GET 返回 `text/html`（82,596 字节的通用错误页），非 PDF。`into.aalto.fi/download/temp/…` 是临时导出路径，已过期。
- Wayback「id_」原始字节模式对 aalto.fi 稳定返回 **HTTP 502**（连续 5 次），改用**普通回放模式**（`/web/<ts>/<url>`）与 **if_ 模式**后 200 成功。

## 4. 关于「Aalto 是否发布 2018–2020 的硕士课程表」

本轮**只记录实测结果，不作判断**：
- 官网现有 curriculum 页面最早为 2022–2024 期；2018–2020、2019–2021、2020–2022、2021–2023、2023–2025、2025–2027 六个期的 URL 全部 404。
- Wayback 对项目页/课程页的最早快照是 2023-03-28；2019 年的 aalto.fi 快照只覆盖 `/en/study-options` 空落地页。
- 因此**本项目 2018–2020 的课程级清单标 `?`（没查到）**，不是 `✗`（确认没有）。

## 5. 未取到 / 未展开的（口径边界）

- 课程替换单 `2024-2026 → 2026-2028` 已取；`2022-2024 → 2024-2026` 的 3 份 PDF 全部 403/404，未取到，标 `?`。
- 各 major 的「二选一 / 任选 N ECTS」组合未展开。

*本文件只记事实与失败原因，不含推断。*