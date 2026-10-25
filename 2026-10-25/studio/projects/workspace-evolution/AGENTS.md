# AGENTS.md — workspace-evolution

> Agent 进入本项目先读本文件与 `README.md`，路线图全文在 `bAI/bAI/notes/2026-08-23-工作空间能力域重设计路线图.md`（含各域判定表）。

## 当前状态（2026-08-24）

- P0 ✅：立项 + 看板登记（record `recvt7JLXbMk0U`）。
- **P1 部署侧 ✅ 收官，当前处于观察期（至约 2026-09-07）**：
  - B′（MemoraX Code）：正式账号 baizhichen83，四 harness（Codex/Claude/DSH）+ ZCode（memorax-cli skill `~/.agents/skills/memorax/`）五面接入，add→search 闭环验证通过。排障实录与商业化情况见 `domains/memory-plan-b-memorax.md`。（⚠️MemoraX 已于 2026-09-08 停用、skill 路径已移除，此为历史接入记录）
  - 方案 A：**v0.3 零新增定稿**（`domains/memory-plan-a.md`）——HANDOFF/PITFALLS 均砍，架构 = 看板管路由、MemoraX 管经验、notes/L2 管原文、auto-memory 管原生。
  - 观察期任务：随日常使用记录召回实例到 `domains/memory-watch-log.md`（✅记得/❌忘了/⚠️错乱）；检验免费配额；Mem0 自托管为备选不动。
- P2（知识库检索层）待观察期后启动，设计输入已备（Mem0 多信号检索、ReFind BM25 迭代）。

## Agent 行为约定

1. **会话收尾双动作**（P1 落地规则）：会话产生了跨会话价值的经验 → `memorax-cli add`（按四类 type，skill `memorax` 含纪律）；项目状态变化 → lark-cli 回写看板（既有规则）。
2. **接手任务的标准动线**：读快照定位管线与依赖 → `memorax-cli search` 召回相关经验 → `vault-search` skill 查知识库是否讲过相关概念 → 需要时 L2 深查原文。用户只说「继续做 X」时不要求用户提供会话链接。
3. **记忆纪律**：记忆当假设、用当前产物验证；search 带具体关键词、单任务 ≤2 次；一次性指令不入库；意图不明先问；CLI 失败如实上报。重要经验除写 MemoraX 外在当日 notes 双写一笔（迁移兜底）。
4. **红线**：不改 auto-memory 现有目录结构；根 AGENTS.md 的改动整体提交评审，不顺手改；凭据类内容不写入对话或文档正文。
5. 每次会话结束回写本文件「当前状态」+ 看板（「进度」只收百分比文本，明细写「描述」）。
