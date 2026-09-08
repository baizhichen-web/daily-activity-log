# 2026-08-27 OpenCode Go/Zen 模型列表变更核查（Ox Alpha 退役）

白纸询问最近两天 opencode go 模型列表有无更新。用现有 key 实拉两端点 `/v1/models` + 逐个最小请求实测，对照基线：[2026-08-21](2026-08-21-opencode-free-models.md) 与 [2026-08-24](2026-08-24-dsh-自定义模型消失排查与Go网关协议拆分.md)。

## 核心结论

**Ox Alpha 三条免费通道本周内全部关闭**——不是下线，是匿名内测结束转正。OpenRouter 报错原文揭秘身份：*"This model was ZAI's GLM-5.3 Flash"*。

| 通道 | 模型 | 状态 |
| --- | --- | --- |
| OpenCode Zen | `x-preview-f-free` | ✗ 列表移除（64→63），请求返回 ModelError |
| OpenCode Go | `ox-alpha-free` | ✗ 列表移除，请求 ModelError（8-24 实测还是 200） |
| OpenRouter | `stealth/ox-alpha` | ✗ 404，指向实名版 `z-ai/glm-5.3-flash` |

## Go 端点净变化（27→31）

新增 4 个：`glm-5.3-flash`、`grok-4.6`、`longcat-2.0`、`deepseek-v4-flash-vision-exp`。
其中 vision-exp 最迟 8-24 已在（8-24 笔记已实测其 vision input）；真正这两天的增量约三个，上游无精确时间戳，以「相对 8-24 基线」为准。零移除。

## Zen 免费层现状

原 9 个免费模型中 Ox Alpha 一个消失，其余 8 个都在（big-pickle / mimo-v2.5-free / hy3-free / nemotron-3-ultra-free / nemotron-3.5-lightning-free / muse-spark-1.2-contributor-free / deepseek-v4-flash-free / laguna-s-2.1-free）。hy3-free 实测 200 正常。

## 对现役配置的影响

- **eagle 打标流水线 tagger.mjs 三路由全灭**（zen/go/openrouter 都是 ox-alpha）——Batch 2 断点续跑前必须换工人
- youtube-vault-bridge（go+minimax-m2.5）、DSH 默认（opencode-go/deepseek-v4-flash）：无恙
- DSH/ZCode 配置里残留的 ox-alpha-free / x-preview-f-free 条目不会炸命名空间（assertServiceable 是配置级校验不查上游），但选中即报错；下次动 settings.yaml 时顺手摘除

## 替代建议（待白纸拍板再动手）

- 首选：Go 订阅内 **`deepseek-v4-flash-vision-exp`**——已实测视觉输入可用，走订阅额度（$12/5h/…），tagger 改 baseURL/model 即可
- OpenRouter 低价备胎：`z-ai/glm-5.3-flash`（$0.075/$0.25 per M tok，正是 ox-alpha 本尊）、`meituan/longcat-2.0`（$0.3/$1.2）
- 不改则不动手：仅记录影响面

## 白纸裁决与执行记录（同日）

**裁决**：
1. 打标工人换血列入待办、执行时机后定——新工人定为 **OpenCode Go 的 `mimo-v2.5`**（小米 MiMo V2.5，youtube-vault-bridge 同款用法；PRD 实证支持 [text,image] 输入，看得懂缩略图）。本轮不改 tagger.mjs
2. **模型目录立即清理**：所有常用 harness 移除 ox-alpha 系模型条目

**清理执行（同日完成）**：
| 位置 | 改动 |
| --- | --- |
| DSH `~/.dsh/settings.yaml` | ① 默认 agent 模型 openrouter/stealth-ox-alpha → 恢复 opencode-go/deepseek-v4-flash；② opencode-go-completions 摘除 ox-alpha-free；③ opencode-zen-free 摘除 x-preview-f-free（余 7 免费模型）；④ 整条 openrouter 路由删除（唯一装的就是 stealth/ox-alpha）。改后校验器 `RESULT: OK — all routes serviceable` |
| ZCode `~/.zcode/v2/config.json` | 「OpenCode Go (Chat Completions)」摘 ox-alpha-free；「OpenCode Zen Free」摘 x-preview-f-free；空壳「OpenRouter」provider 整体删除（余 12 provider）。node 结构化删除 + JSON 复验通过 |

**待办**：tagger.mjs 工人换 `mimo-v2.5` @ `zen/go/v1/chat/completions` + OPENCODE_GO_API_KEY，Batch 2 断点续跑(state.json)继续用；已回写飞书看板。

**备份**：`temp/archive/model-cleanup-20260827/`（dsh-settings.yaml.bak / zcode-config.json.bak）。OPENROUTER_API_KEY 留在 `~/.dsh/.credentials.yaml` 未动（将来接 glm-5.3-flash 实名版可复用）。
生效提醒：DSH 需重启 dsh web；ZCode 需重启且重启前别在 GUI 动设置。
