# AGENTS.md — 消息桥项目规范

> Agent 进入本项目先读本文件。目标见 [README.md](README.md)，规范正文单一来源 = [design.md](design.md)。
> **状态值禁写于此（看板 `recvu906Rmc49i` 为准）**——本文件只放稳定契约。

## 核心结论（2026-09-03 立项时点）

1. 微信侧全自动不可得：协议/hook 方案因封号风险全部排除；官方 ClawBot（`Tencent/openclaw-weixin`）仅支持私信，Issue #198 未解决。SOP v1 = 人工投飞书「自动化通知」群 + AI 处理。
2. 数据真身三分离：消息卡 → `E:\Desktop\学业与申请\消息中台\`；行动项 → 飞书看板/日程；知识 → bAI raw 只放指针卡。任何环节不复制全文。
3. 处理链路全用现成设施（lark-cli + 9:00 晨间 automation + 工作区 git），M1 零代码；写代码从 M2 起、须评审通过。

## Top 3 紧急项

1. 等白纸评审 design v0.1，拍板开放决策 D1-D6（见 design §6）
2. D5 定了投递口令（默认 `#收件`）后，改晨间 automation prompt：插入「消息中台扫描」步骤
3. 评审通过后首晚试运行 SOP v1，用真实消息检验卡片规范与批次卡粒度

## 资源速查

- 飞书群（收件口）：chat_id `oc_748101c9fa6326c2df919bf2b98eb5b1`（lark-cli im 读：先 `--help` 确认子命令写法，不猜）
- 工作空间看板：base `URbrbJeWRa9ME4szDt8chJFlnJh` / table `tblHQm7JwFc7bxGT`；关联记录：开学季规划 `recvtYye1BVt5j`、读书电子化 `recvtYyfETvb3R`
- 日程：`lark-cli calendar +create`，重要节点带原生提醒
- 晨间提醒：ZCode automation `automation-abe11f27`（每日 9:00，回执出口）
- ClawBot 跟踪：`gh api repos/Tencent/openclaw-weixin` + `.../issues/198`（只读；升级判据见 design §5）

## 项目特有规则

1. SOP v1 期间 AI 处理**由白纸会话触发**（未批常驻自动化前，不开扫描类定时任务）
2. git commit 消息卡 = AI 的数据写授权（D6，默认开启）；commit 前先数文件数+字节数对账
3. 子目录分类是临时脚手架：增删合并改名随消息流，AI 可建议、改结构报白纸
4. 工具调用失败（lark-cli/gh 等）如实上报，不静默降级、不假装归档成功
5. 涉及本流水线的操作纪要追加 `bAI/bAI/wiki/log.md`；迭代日志 `bAI/bAI/notes/YYYY-MM-DD-消息桥-notes.md`

## 状态

- 2026-09-03：立项（README + AGENTS + design v0.1 + 看板登记）；评审卡点：白纸
