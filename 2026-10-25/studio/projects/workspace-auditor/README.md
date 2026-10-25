# workspace-auditor（工作空间审计官）

> DSH（DeepSeek Harness）专属 Agent preset：定期审计工作空间、维护审计台账、自我进化。

## 这是什么

一个以「定期体检 + 记录 + 进化」为核心的工作空间审计官：

- **五维审计**：A 看板提醒 / B 结构符合度（乱放检查）/ C 日志踩坑 / D 优化建议 / E 会话轨迹
- **审计台账**（进化循环）：`ops/reports/audit/`（open-items 闭环、pitfalls 去重、rules 提炼）
- **周期提醒**：host 层 `dsh-schedule`（schedule_create，方案 A：会话内每周全量 + 每日快速）
- **会话归档索引**：`ops/reports/session-archive/index.md`

## 组件分布

| 组件 | 位置 |
|---|---|
| preset 组合（persona + skill 挂载 + session 查询工具）| `~/.dsh/.agent-presets/workspace-auditor/agent.cordis.yml` |
| 审计手册 | `~/.dsh/.agent-presets/workspace-auditor/skills/workspace-audit/SKILL.md` |
| 审计台账 | `ops/reports/audit/`（latest / open-items / pitfalls / rules / history）|
| 会话归档索引 | `ops/reports/session-archive/index.md` |
| 周期提醒插件（host 补丁层）| `~/.dsh/profiles/web/cordis.patch.yml`（dsh-schedule）|
| 会话查询工具（链接包）| `~/.dsh/profiles/node_modules/@deepseek-ai/dsh-tool-session-query` |（2026-10-25 注：该链接包路径已失效，会话审计现走 ops/scripts/agent-nav-audit.py）

## 时间线

- **2026-08-14**：建立（复制 standard 定制）；首次勘察 + 首次全量审计（B-）；修复 7 项 open items；发现并修复 schedule 插件平面错误（O-013）
- **2026-08-15**：补立项（本项目）；会话维度（E）落地（session 工具 + 归档索引）；规范加「有产出的工作必须立项」

## 关联

- 看板：「workspace-auditor（DSH 审计官）」记录；「审计Bot (Auditor)」（P1，飞书 Bot 版计划，等待外部成熟）——本项目是它的 **v0（DSH 侧已落地）**，飞书 Bot 版可作为后续阶段
