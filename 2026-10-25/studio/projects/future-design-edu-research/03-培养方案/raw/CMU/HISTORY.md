# CMU 历史版采集记录（HISTORY.md）

采集日期：2026-10-04。本文件只记「查了什么、结果如何」，不含推断。

## 结果摘要

| 时间点 | 快照日期 | 原件 | 状态 |
|---|---|---|---|
| 2019 年设计学院研究生项目页 | 2019-06-19（CDX 时间戳 20190619163100） | wayback-2019-06-19-cmu-design-programs-grad.html | **到手** |
| 2019 年设计学院首页 | 2019-06-19（同上时间戳） | wayback-2019-06-19-cmu-design-home.html | **到手** |
| 2019 年 HCII MHCI 项目页 | 2019-06-20（CDX 时间戳 20190620135700） | wayback-2019-06-20-cmu-hcii-mhci.html | **到手**（页面本身不含核心课逐门清单，只有课程表链接） |

## 已尝试但未取到的查询

1. **CMU MDes 现路径的历史快照**
   - 查询：CDX `url=design.cmu.edu/about-our-programs/masters-degrees/master-design-design-interactions`
   - 结果：最早快照 2024-04-14，之后密集到 2025-06；**2018-2020 区间无快照**（✗，非 ?）
2. **CMU 设计学院旧路径猜测**
   - `design.cmu.edu/mdes`、`/mdes/`、`/graduate`、`/academics/mdes`、`/programs/mdes`：CDX 全部无记录或空数组（✗）
   - `design.cmu.edu/programs-degrees/masters-degrees`：`wayback/available` 返回 `archived_snapshots: {}`（✗）
3. **HCII 核心课历史页**
   - 查询：`hcii.cmu.edu/academics/mhci/core-curriculum`，timestamp 2019-06-01
   - 结果：`archived_snapshots: {}`（✗）；2019 年 MHCI 页面里的 Curriculum 一节只写「Learn more about the interdisciplinary core courses」，链接目标无快照
4. **下载快照为空文件的情形**
   - `web.archive.org/web/20190619163100id_/https://design.cmu.edu/programs-degrees/masters-degrees` → 0 字节
   - `web.archive.org/web/20190620135700id_/https://hcii.cmu.edu/academics/mhci/core-curriculum` → 0 字节
   - 原因（实测现象）：这两个 URL 本身无 200 快照，Wayback 返回空体；同一时间戳对确实存在的 URL 可正常取到（见上表已到手三条）

## 口径说明

- 2019 年设计学院页把硕士路径写作 **MA（一年）/ MPS（一年）/ MDes（两年）/ PhD（四年）**；对应文字见 `wayback-2019-06-19-cmu-design-programs-grad.html` 原文。
- 2019 年 HCII 页面在「Masters Programs」下所列项目与 2026 年不同：2019 为 MHCI / Accelerated MHCI / METALS / MCDS / MSPM；2026 为 MHCI / MHCI-AS / Accelerated MHCI / MSLE（MSLE 原文注「formerly known as the Accelerated Master of Educational Technology and Applied Learning Sciences (A-METALS)」）。
- 以上两条均为**原文对照事实**；「这说明什么」不在本文件内。
