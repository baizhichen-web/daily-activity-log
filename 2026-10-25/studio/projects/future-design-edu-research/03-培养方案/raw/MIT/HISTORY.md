# MIT 历史版采集记录（HISTORY.md，线 C 会话）

采集日期：2026-10-04。本文件只记「查了什么、结果如何」，不含推断。

## 结果摘要

| 时间点 | 快照日期 | 原件 | 状态 |
|---|---|---|---|
| MIT Catalog 2019-2020 学年 MAS 院系页 + 全量课程条目 | 2021-12-16（CDX 时间戳 20211216165424） | wayback-2019-2020-mit-mas-school-page.html（155,403 字节） | **到手** |

## 已尝试但未取到的查询

1. **MIT Catalog 其他学年归档（逐学年 exact-URL CDX）**
   - `catalog.mit.edu/archive/2015-2016/schools/architecture-planning/media-arts-sciences/` → CDX 有 200（20180406221522）
   - `catalog.mit.edu/archive/2017-2018/...` → CDX 有 200（20181006040602）
   - `catalog.mit.edu/archive/2018-2019/...` → CDX 有 200（20211216165551）
   - 但用 `web/<ts>id_/` 与 `web/<ts>/` 两种形式取回 **均为 0 字节**（多次重试；0 字节空文件已清理，未留在目录内），故未取到第二时间点
   - `2016-2017`、`2020-2021`、`2021-2022`：CDX 查询多次重试后失败（Internet Archive 偶发不可用）
2. **Media Lab Fall 2018 课表**
   - 现站 `https://www.media.mit.edu/posts/fall-2018-mas-course-list/` 抓取 200，但页面正文为 JS 空壳：页面文本 3,844 字符、`MAS.` 命中 **0** → **未取到内容**（≠ 确认没有课表）
3. **`catalog.mit.edu/degree-charts/master-design/`**
   - 2026-10-04 实测 404；CDX 查询 `master-art-culture-technology*` 只命中 SMACT，无 Master of Design 学位图

## 可作为第二时间点的事实

- Media Lab 学期课表帖可从现站取到 Fall 2023 / Fall 2024 / Fall 2025 / Spring 2026 / Fall 2026（原件已存同目录），但**这些是「现站仍在挂的历史学期清单」，不是 Wayback 快照**，使用时需注明其性质。

## 落盘验收（grep）

- wayback-2019-2020-mit-mas-school-page.html：`units` 命中 48 处，`courseblockhours|Terms in residence|research thesis` 命中 70 处 → 非空壳
- mit-catalog-subjects-mas.html：`MAS.` 命中 72 条课程条目 → 非空壳
- mit-medialab-fall2018-course-list.html：`MAS.` 命中 0 → 标注为「JS 空壳或错误页」，未取到内容
