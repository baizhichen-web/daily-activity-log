# PROGRESS — 项目进度与飞书看板

> 看板读写、里程碑更新、跨项目依赖。由 AGENTS.md 指针表「看板读写/里程碑更新」分支触发。

## 看板

- **看板地址**：[飞书项目看板](https://my.feishu.cn/base/URbrbJeWRa9ME4szDt8chJFlnJh?table=tblHQm7JwFc7bxGT&view=vew0rik3TR)
- **base_token**：`URbrbJeWRa9ME4szDt8chJFlnJh`
- **table_id**：`tblHQm7JwFc7bxGT`

## 读取项目进度

推荐（所有 Agent 可用）：读本地快照 `ops/reports/board-snapshot.md`；有 lark-cli 的环境用 `node ops/scripts/board-snapshot.mjs` 刷新。

lark-cli 已装在 npm 全局（`@larksuite/cli`），但沙箱无法枚举/执行 `AppData\Roaming\npm` 目录——必须用 escalation 运行（建议持久化 prefix rule `["lark-cli"]`）。

有 lark-cli 的环境可直接查询/更新看板（record-list / record-search / record-upsert），命令示例见 `bAI/bAI/notes/2026-08-07-lark-cli-环境与使用方法.md`。

## 更新项目进度

完成里程碑任务后必须更新飞书看板：

```bash
lark-cli base +record-upsert --base-token URbrbJeWRa9ME4szDt8chJFlnJh --table-id tblHQm7JwFc7bxGT --record-id <record_id> --json '{"进度":"✅ 完成 OAuth 授权\n📋 下一步：测试消息卡片"}' --as user
```

进度更新规则：

1. **里程碑更新**：完成重要任务后，更新"进度"字段
2. **状态变更**：项目状态变化时，更新"状态"字段（进行中/计划中/已归档）
3. **规划更新**：调整优先级或新增任务时，更新"描述"字段
4. **辅助记录**：详细过程写入 `bAI/bAI/notes/`，git log 记录代码变更

## 跨项目协作

跨项目协作看「管线 / 依赖 / 卡点方」三列：内容线（youtube-vault-bridge）/ 资产线（eagle-bridge）/ 方法线（Vibe Designing）/ 呈现面（个人网站）的依赖边与卡点归属就在看板本身——依赖边或卡点换手后用 lark-cli 回写对应记录。看板另有「管线全景」「卡点看板」视图与「工作空间总览」仪表盘。

## 单一事实源与人类视角

git log 和 notes/ 是辅助记录，不是主要状态源。人类可以在飞书 UI 中直接查看和编辑项目看板。
