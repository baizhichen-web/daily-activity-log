# daily-activity-log

个人工作空间的每日活动公开归档，由自动化任务自动生成与推送。

## 内容

- `YYYY-MM-DD/MANIFEST.md` — 当日收集文件清单（含安全过滤记录）
- `YYYY-MM-DD/今日提交摘要.md` — 工作空间主仓库当日提交摘要
- `YYYY-MM-DD/…` — 当日新增/修改的产出文件副本（笔记、报告等）

敏感内容（凭据、token、私钥）自动排除，永不进入本仓库。

## 生成方式

每日 18:00 看板巡检任务收尾时由 `ops/scripts/daily-activity-collect.mjs` 自动收集、提交并推送。