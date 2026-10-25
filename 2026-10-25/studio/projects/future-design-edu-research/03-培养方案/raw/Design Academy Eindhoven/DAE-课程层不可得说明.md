# Design Academy Eindhoven · 课程层提取（纯数据层 + 不可得说明）

> 来源：本目录 `dae-master-programme.html`、`dae-masters.html`（designacademy.nl，Node fetch 抓取，抓取日 2026-10-04，均 HTTP 200）。
> 本文不含「这说明/结论是」类句子。

## 0. ⚠️ 本文结论已被覆盖（高优先，先读本节）

本文原结论「DAE 课程层公开不可得」**只查了两个 URL**（`/page/398/master-programme`、`/page/5740/masters`），**已被后续采集覆盖**。

并行采集会话从 `/page/5612/governance-regulations` 找到 **TER/OER**（2026-2027 英文版），其 **Appendix 1 = Master Credit Table**，给出完整积分表：**Module 1–6b，Year 1 = 60 EC + Year 2 = 60 EC = 120 EC**。

**因此正确结论应修正为：课程级（逐门课）不可得，但模块/学分结构可得。**
正确数据以 `2026-2027-dae-Master-programme-结构化提取.md` 为准。历史版仍为 2 个时间点（2018-05-13、2020-01-03），但**只到方向名单层**（2018 四方向 → 2020 五方向），历年学分/模块结构未取到。

*本节为纠错后补写，不删改下方原文。*

## 1. 硕士方向清单（原文，取自站点导航）

| # | 方向（原文） |
|---|---|
| 1 | Contextual Design |
| 2 | Critical Inquiry Lab |
| 3 | Geo—Design |
| 4 | Information Design |
| 5 | Social Design |

> 本科层另有 Fundamentals / Studios / Reflections / Internship / Focus / Exams 等栏目（同为导航原文），本文件未展开。

## 2. 课程层不可得（机械判据 + 已尝试的查询）

| 判据 | 结果 |
|---|---|
| 页面文本中 `ECTS` 出现次数 | 0 |
| 课程代码样式（`^[A-Za-z]{2,6}[.-][A-Za-z0-9.]{2,}$`）命中 | 0 |
| 页面文本长度 | master-programme 10,060 字符；masters 7,862 字符 |

已尝试的 URL：

- `https://www.designacademy.nl/page/398/master-programme` → HTTP 200，仅方向导航，无课程/学分
- `https://www.designacademy.nl/page/5740/masters` → HTTP 200，同上
- 检索命中的 `intranet.designacademy.nl/.../DAE_jaarverslag_2017_web.pdf`（年度报告）→ **属校内网域名，不抓**（不绕登录态）

## 3. 本提取未覆盖的（口径边界）

- 五个方向的**子页未抓**（如 Information Design 方向页）——若其中有课程结构，需再采一轮。
- DAE 是否公开「培养方案/课程清单」这份文档，本文件**不下结论**；只记录本次两个 URL 的结果。
- 按项目纪律：**不得用推测填补**。此处空缺即为空缺。
