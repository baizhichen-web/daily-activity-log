---
title: The Harness Is the Thing（Scott Fryxell）
type: source
source_type: article
date: 2026-08-25
最近修改时间: 2026-08-28
tags: [harness, agent, 模型商品化, 多角色编排, AGENTS.md]
source_url: https://scott-fryxell.github.io/blog/the-harness-is-the-thing/
---

# The Harness Is the Thing（Scott Fryxell）

## 一句话总结

单人开发者的 harness 实证宣言：**harness 才是关键——"我的预期与模型能力交汇的支点"**。跨 Cursor/Claude/Pi 三个 TUI 共享同一套 skills + AGENTS.md → 体验统一、模型商品化、迁移零焦虑；配合 planner/worker/critic/promoter 四角色管线与 prewalk 分层用模型，前沿模型用量降 75%；产品（Realness）经 harness 触达后能力被反向放大。

## 关键摘录

> the harness is the thing; the fulcrum from which my expectations meet the LLM's capabilities.
> （harness 才是关键——我的预期与模型能力交汇的支点）

> All three share my skills and AGENTS.md. Though I am using three TUIs, I have a unified experience. This has commodified the models for me… I have zero anxiety about the transition from Cursor to Codex.
> （三个 TUI 共享一套 skills+AGENTS.md，体验统一 → 模型商品化，迁移零焦虑）

> a single prompt that plans, executes, and critiques itself confuses its own objectives, so each role gets isolated instead.
> （一个同时规划、执行、自我批评的 prompt 会搞混自己的目标——所以角色必须隔离）

> the critic gives way to a promoter, which is my reminder that a job is not complete until you've properly communicated it to others.
> （critic 之后是 promoter——工作没有正确地沟通给他人之前不算完成）

> The LLM helped me figure this out and wrote a script that I keep in my harness; so it can run a billion times without burning tokens. The product got more powerful because the harness can reach it.
> （脚本存进 harness 可跑十亿次不烧 token；产品因 harness 能触达而变强）

> Harness as jig is the way I'm trying to think of it.
> （harness 如工装夹具：LLM 陪着我边干活边修配置， discipline 与专注兼得）

> I am learning to lighten the specificity, and that there is a line past which you are burning tokens mansplaining to clankers.
> （学着减轻 skills 的具体度——过线就是在烧 token 给铁疙瘩说教）

> Skills, extensions, and AGENTS.md are first-class citizens at the root, waiting to be modified and built upon. TUIs have to toe the line.
> （skills/扩展/AGENTS.md 是根目录一等公民；TUI 必须服从 harness 这条线）

## 我的反射（白纸的理解，2026-08-28）

**1. Harness 是分层的，无痛迁移发生在两层之间。**
Codex、DeepSeek（DSH）、ZCode 这些具体工具——连同各自的 TUI/GUI——都是第一层 harness；在此之外的个人工作空间是第二层、更深层的 harness。换第一层不伤第二层，这就是"从某个 harness 换到另一个都能无痛迁移"的结构性原因。Fryxell 的"zero anxiety"说的就是这件事，但他只在工具层内部换 TUI；白纸把第二层显式提出来，比他的框架多了一层。

**2. 不变的核心层。**
AGENTS.md、脚本、目录结构，就是众多终端 UI 可互换的前提下不变的那一层——"这点我们差不多"。差异在尺度：Fryxell 的不变层在 repo 级（brayness/ 一个目录装下全部：AGENTS.md/prompts/plans/skills/extensions/artifacts/work），白纸的不变层是整个多项目、多域工作空间（含知识库/写作/运维等非代码域）——从"个人装备"推广为"个人级 outer harness"（见 [[wiki/concepts/AI-Harness]]），这正是非代码域迁移的命名权空白所在。

**3. 可向他学的（白纸点名要展开的点）：**
- **Promoter 角色**：把"对外沟通"纳入完成的定义，对抗"做完就跑"。与工作空间"记录而非只在脑子里"的规则同构——可考虑形式化为一个 skill/收尾协议（里程碑 → 看板回写 + log/notes + 史书）。
- **Prewalk 分层降本**：前沿模型只做规划 + 首个任务建立模式，然后移交便宜模型跑完 → 前沿用量降 75%。与既定调（免费模型当工人、收费模型监工；qwen3.8-flash 日常 / 3.8-max 攻坚）同构，可直接借"先走一遍再移交"的具体机制。
- **四角色管线与显式 DAG**：planner 出显式任务图、worker 逐节点实现、critic 可打回——角色隔离防目标混淆。对齐 [[wiki/concepts/文件驱动型多Agent编排]]，可在大重构类任务试点。
- **Harness 触达产品**：把产品经 headless browser/CLI 暴露给 harness，LLM 写脚本沉淀成一条命令，"跑十亿次不烧 token"。启发：个人网站、Eagle 库、DSH 等都可以做 harness 可驱动的入口，产品能力被 harness 反向放大。
- **Harness as jig（工装夹具）隐喻**：nvim 配置放进工作目录让 LLM 边陪练边修改——把"正在学的技能"本身纳入 harness 辖区。可用于学新工具/新领域时搭练习脚手架。
- **artifacts/ 目录 = 可审计**：指示所有 TUI 把产物留在固定目录，根目录无 git 历史、靠 skill 同步 repo——与 temp/ 归档制异曲同工，但更严格。
- **指令克制**：棘轮原则（每行追溯到真实失败）之外的另一面——定期减重，过细的 skills 是 token 黑洞。
- **开源参照物**：他的 harness 本体开源在 github.com/scott-fryxell/brayness，目录结构与 skills 清单可直接调研借鉴。

## 关联

- [[wiki/concepts/AI-Harness]] — 分层 harness、不变核心层、模型商品化直接充实本概念；白纸两层框架的实证参照
- [[wiki/concepts/Harness工程与演化]] — harness 可搭建、可演化、可被 Agent 修改；brayness 是个人级演化实例
- [[wiki/concepts/Token成本与供应链]] — prewalk + 角色分层 = 前沿用量降 75% 的成本机制
- [[wiki/concepts/文件驱动型多Agent编排]] — planner/worker/critic/promoter 显式 DAG 编排的同族思路
- [[wiki/sources/Pi与DSH-Harness对象化]] — 同主题来源：Pi 作为 harness 之一的另一视角（对象化 vs 实用主义 rigs）

## 待深挖

- brayness 仓库（github.com/scott-fryxell/brayness）：目录约定、skills 清单、brayness-sync 机制能否借鉴进工作空间
- prewalk 原文（stencil.so/blog/prewalk）与《Building an Advanced Agentic Harness》（data4sci.com）：移交时机的具体判定
- Promoter 角色是否落成工作空间收尾协议（对齐飞书史书"里程碑必入史"的既有义务）
