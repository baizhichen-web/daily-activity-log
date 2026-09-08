---
title: "AI Harness（Agent 线束）"
type: concept
tags: [agent, harness, 工程架构, 记忆]
date_created: 2026-08-24
last_updated: 2026-08-28
---

# AI Harness（Agent 线束）

## 核心定义

**Agent = Model + Harness**（Viv Trivedy，2026）：harness 是模型之外的一切——提示词文件、工具、上下文策略、hooks、沙箱、子代理编排、反馈与恢复路径。"如果你不是模型，你就是 harness。" Scaffolding（脚手架）是其中**行为定义层**（系统提示、工具描述、格式约定），harness 偏**执行层**（调用循环、工具执行、停止条件）；广义用法两者都含。

## 要点

- 学科谱系三步：prompt engineering → context engineering → **harness engineering**（2026 上半年正式命名；OpenAI 官方文、martinfowler.com、O'Reilly 均有专文）
- **九组件解剖**：loop engine / context 管理（compaction）/ skills-tools 注册表 / 子代理管理 / 内建技能 / 会话持久化 / 动态系统提示组装 / 生命周期 hooks / 权限与安全。"loop 无人在场跑得越久，权限层越是监督本身"
- Böckeler 用户视角框架：**Guides（前馈）**= AGENTS.md 类；**Sensors（反馈）**= 测试/lint/审计。人的角色 = steering loop（迭代 harness 本身）
- 棘轮原则："好的 AGENTS.md 每行都应追溯到一次真实失败。Ratchet; don't brainstorm."（Osmani）
- DSH（deepseek-harness）= 该定义的极致实现：一切皆插件（Cordis 时空可组合性论文）；Codex = HaaS 平台化路线（app-server/SDK/exec 三层，"应用拥有 context/tools/boundaries，harness 拥有 loop/sandbox"）
- ARC-AGI-3 定量证据：仅 retained reasoning + context compaction 两个 harness 手段，分数 13.3%→38.3%、输出 token 降 6 倍——harness 改变结果不靠换模型
- 个人实证（Scott Fryxell，2026-08）：跨 Cursor/Claude/Pi 三 TUI 共享同一套 skills + AGENTS.md → "统一体验、模型商品化、迁移零焦虑"；planner/worker/critic/promoter 四角色管线 + prewalk（前沿模型只做规划与首个任务再移交）→ 前沿用量降 75%；"harness as jig"（工装夹具）隐喻；harness 本体开源（brayness）

## 与本工作空间的关系

工作空间本体（AGENTS.md 体系+看板+审计+巡检）= 个人级 outer harness，且是把 harness engineering **迁移到非代码域**（知识/写作/项目治理）的少数实例——命名权空白（详见 [[wiki/entities/MemoraX]] 之外的赛道全景）。

**两层框架**（白纸，2026-08-28，源自 Fryxell 实证的推广）：第一层 harness = 各具体工具（Codex/DSH/ZCode 等）连同其 TUI/GUI；第二层 harness = 个人工作空间本体。跨第一层无痛迁移的结构性原因 = 第二层不变——AGENTS.md、脚本、目录结构是"众多终端 UI 可互换的前提下不变的核心层"。Fryxell 的不变层在 repo 级（brayness/ 单目录），白纸推广到多项目多域工作空间。

## 来源

- HF《Harness, Scaffold, and the AI Agent Terms Worth Getting Right》（2026-05）
- addyosmani《Agent Harness Engineering》；Birgitta Böckeler《Harness engineering for coding agent users》（martinfowler.com, 2026-04）
- OpenAI《Harness engineering》《Codex as a platform》；deepseek-harness docs/architecture.md + cordiverse/paper
- [[wiki/sources/Scott-Fryxell-The-Harness-is-the-Thing]]（2026-08）——单人开发者 harness 实证：商品化/四角色管线/prewalk/不变核心层
- 深挖笔记：[[notes/2026-08-23-Workspace作为AI-Harness-第二层拆解]]

## 来源

- HF《Harness, Scaffold, and the AI Agent Terms Worth Getting Right》（2026-05）
- addyosmani《Agent Harness Engineering》；Birgitta Böckeler《Harness engineering for coding agent users》（martinfowler.com, 2026-04）
- OpenAI《Harness engineering》《Codex as a platform》；deepseek-harness docs/architecture.md + cordiverse/paper
- 深挖笔记：[[notes/2026-08-23-Workspace作为AI-Harness-第二层拆解]]
