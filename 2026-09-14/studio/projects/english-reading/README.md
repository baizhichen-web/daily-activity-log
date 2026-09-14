# 英语原版精读（english-reading）

> 用一本专业原版书 + AI 陪读，把英语从"能考试"推到"能读文献"。

## 状态

- 状态以飞书看板为准（看板项目「english-reading（英语阅读）」）
- 项目 Agent 规范见 `AGENTS.md`；方案见 `PRD.md`（v0.1，待白纸评审）

## 要解决的问题

白纸的英语目标是**读文献/专业资料**（主）+ **六级、雅思阅读**（次），强度 **每天 1 小时**。
用一本书当载体，边读边由 AI 兜底，把"读不懂"变成"读得动"。

## 当前材料

**《Things We Could Design: For More Than Human-Centered Worlds》** — Ron Wakkary，MIT Press 2021（后人类主义设计理论）

| 版本 | 路径 | 用途 |
| --- | --- | --- |
| 纯英文版 | `F:\Calibre 书库\Ron Wakkary\Things We Could Design (31)\` | 主读本 |
| 双语版 | `F:\Calibre 书库\Ron Wakkary\Things We Could Design (38)\` | 仅作答案册（卡住时的最后一道） |

体量：章节正文约 8.3 万英文词，8 章 + 4 篇 prologue，章内有 h2/h3 小节可作每日断点。

**读书空间**：`books/` — 书架级。一本书一个文件夹，通用陪读规则在 `books/AGENTS.md`，书架索引（分组 / 状态 / 断点）在 `books/README.md`，新书用 `books/_template/` 复制。开新会话时贴目标书 `README.md` 里的提示词。

## 起点诊断（2026-09-10 实测）

第一章首段 181 词，白纸标记生词 12 个 → **覆盖率 93.4%**；6 句平均 30 词，最长 61 词。
结论：**词汇接近门槛（95%），真正的瓶颈是长句结构**。方案按此设计。

## 联动

- `studio/projects/ai-reading/`：共享"AI 提问引导、不替人总结"的陪读原则（该项目为中文方法论书线，当前停用）
- `studio/projects/frag-knowledge/`：词卡沉淀（待定，见 PRD 待裁决项）
- 知识库：`bAI/bAI/`（读法笔记与生词档案入库路径待定）
