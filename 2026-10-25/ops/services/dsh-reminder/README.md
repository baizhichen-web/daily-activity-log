# dsh-reminder — DSH → 飞书手机提醒插件

监听 DSH agent 事件，通过 lark-cli 推送飞书消息到手机（Erato bot 与用户的 P2P 会话）。

## 触发事件

| 事件 | 条件 | 消息 |
|------|------|------|
| `agent/status` running→idle | 根会话**任意回合**完成 | 【DSH】✅ 任务完成（耗时 X 秒）+ 会话块 |
| `agent/status` 持续运行 | 根会话超过 5 分钟未完成 | 【DSH】⏳ 进行中（已运行 X 分钟）+ 会话块（每轮一次） |
| `agent/error` | 根会话出错 | 【DSH】⚠️ 任务出错：<message> + 会话块（该回合不再推 ✅） |
| `session/event` approval/asked | 会话策略为 ask | 【DSH】🔔 需要审批 + 工具/会话块 |
| `session/event` approval/decided | 会话策略为 never 且 outcome=rejected | 【DSH】🔕 权限请求被自动拒绝 + 工具/原因/会话块 |

> 审批通知基于**会话日志事件**（`approval/asked`/`approval/decided`）而非 `approval/request` 瀑布：
> never 策略下瀑布根本不分发（静默自动拒绝），而日志事件在两种策略下都会落——这是唯一可靠来源
> （2026-08-14 实证：HMR 热重载后瀑布监听收不到事件，日志监听正常）。

**会话块**（每条消息都带，用于区分是哪个会话的状态）：

```
会话：「标题」（无标题时用任务开头 20 字兜底）
任务：<最近一条用户消息的前 60 字>
🆔 <完整会话 id>（可对照桌面端会话列表/URL）
```

消息为纯状态文本，不带链接；插件注入类消息不计入"任务"摘要。

## 部署与热更新

部署副本：`C:\Users\陈柏志\.dsh\profiles\web\dsh-feishu-reminders-v2.mjs`（2026-10-25 注：此前本文件已不在该路径；DSH 插件现处停用状态，见 notes/2026-10-03）
（patch 行 `name: './dsh-feishu-reminders-v2.mjs'`）。

**修改插件后的热更新流程**（无需重启 DSH，利用 HMR 结构变更重载）：

1. 改工作空间源码 `plugin.mjs`
2. 复制到部署目录的**新文件名**（结构变更才触发重载）：
   `Copy-Item plugin.mjs "C:\Users\陈柏志\.dsh\profiles\web\dsh-feishu-reminders-v3.mjs"`
3. 编辑 `cordis.patch.yml`，把行指向新文件名
4. 等待数秒，飞书收到新版「提醒服务已上线」即为生效
5. 清理旧的部署副本文件

> 注意：纯覆盖同名文件**不会**触发重载（loader 对比解析后的结构，且 Node 模块缓存不刷新）；
> 只有 patch 行指向的文件名变化才会触发重载生效。

## 配置（环境变量，均有默认值）

| 变量 | 默认 | 说明 |
|------|------|------|
| `DSH_FEISHU_CHAT_ID` | `oc_e4f3c8ddffedea7a39e5caee3887ca76` | 推送目标（Erato↔用户 P2P） |
| `DSH_REMIND_PROGRESS_MIN` | 5 | 进行中提醒的分钟阈值（0 = 关闭） |
| `DSH_LARK_CLI` | `%APPDATA%\npm\lark-cli.ps1` | lark-cli 路径 |
| `DSH_PWSH` | 自动探测 pwsh 7 → powershell 5.1 | PowerShell 路径 |

## 验证

- `node test/smoke.mjs` — mock ctx 冒烟（会真实推送测试消息）
- `node test/completion-smoke.mjs` — 完成路径（真实 61s 等待 + 真实推送）
- 已通过 `lark-cli im +chat-messages-list` 回读消息确认真实送达
- 热更新验证：patch 行改文件名后，新版「已上线」消息即出现
