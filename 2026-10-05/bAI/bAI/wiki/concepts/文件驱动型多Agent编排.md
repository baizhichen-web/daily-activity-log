---
title: 文件驱动型多Agent编排
type: concept
tags: [Agent编排, 文件系统, 双轨制, 上下文工程]
date_created: 2026-05-04
last_updated: 2026-05-04
---

# 文件驱动型多 Agent 编排

## 定义

文件驱动型多 Agent 编排是一种去中心化的 Agent 协调模式：Agent 之间不直接在对话上下文中传递全量信息，而是通过**文件系统作为共享中介**——一个 Agent 写文件，文件即合同，下一个 Agent 读文件继续工作。

与对话驱动型（AutoGen）和图状态机型（LangGraph）不同，文件驱动型将文件系统本身作为编排基础设施。

## 核心理念

来自 2025 年 12 月发表的论文《Everything is Context: Agentic File System Abstraction for Context Engineering》，提出将 Unix "一切皆文件"哲学引入 Agent 上下文管理。

## 三层记忆架构

| 层 | 用途 | 特征 | 本 Workspace 对应 |
|---|------|------|-----------------|
| **History** | 不可变真相来源 | 全量记录，跨会话共享，完全可追溯 | `bAI/bAI/raw/` — 论文PDF、转录、网页剪藏 |
| **Memory** | 结构化索引视图 | 情节/事实/经验/过程/用户记忆亚型 | `bAI/bAI/wiki/` — concepts/entities/sources + index |
| **Scratchpad** | 临时工作区 | 任务级推理状态，完成后提取/归档 | `studio/projects/` — STATUS.txt + 过程文档 |

## 五大文件驱动模式（ChatBotKit 参考架构）

| 模式 | 机制 | 适用场景 |
|------|------|---------|
| Swarm Agent | 多 Agent 通过共享目标文件协调 | 开放式探索 |
| Self-improving Agent | Agent 读自身规范 → 学习 → 写回改进版 | 工作流迭代优化 |
| Multi-agent Task Management | Manager 写 TODO 文件 → Worker 读取执行 | 项目分解执行 |
| Failure Logging | 结构化失败日志形成审计追踪 | 踩坑记录 |
| Dynamic Document Template | 运行时动态发现和检索文件模板 | 自适应任务 |

## 与其他编排范式的对比

| 维度 | 文件驱动型 | 对话驱动型 (AutoGen) | 图状态机型 (LangGraph) |
|------|-----------|---------------------|---------------------|
| 协调介质 | 文件系统 | Agent 间对话 | 有向图 + State |
| Token 消耗 | 低（按需读文件） | 高（全量对话上下文） | 中（State 传递） |
| 可恢复性 | 天然可恢复（文件持久） | 需额外持久化 | Checkpoint 机制 |
| 去中心化 | 是 | 半中心化 | 中心化图定义 |
| 适用场景 | 长周期、多会话、知识密集型 | 开放式探索、代码执行 | 复杂分支、需人工审核 |

## 本 Workspace 已有的文件驱动要素

- 飞书看板 → 项目/任务状态（单一事实源；本地不写状态值，不用 STATUS.txt）
- `AGENTS.md` → Agent 行为规范
- `bAI/bAI/notes/` → 阶段间摘要传递
- `wiki/log.md` → 全局操作日志（倒序，最新在前）
- `wiki/index.md` → 知识定位索引

缺失的：Agent 间传递的**结构化格式**（阶段输出模板）、**原子任务领取**机制（claimed by [Agent]）

## 关键来源

- [[wiki/sources/Everything-is-Context论文]] — 文件系统级 Agent 上下文工程（2025.12）
- [[ClaudeCode使用技巧]] — ClaudeCode 上下文管理实践

## 关联概念

- [[wiki/concepts/两段式记忆系统]] — 本 workspace 的双轨制就是文件驱动型的实例
- [[wiki/concepts/ClaudeCode上下文管理]] — compact/clear 与文件驱动状态恢复的关系
- [[wiki/concepts/Karpathy原则]] — "最小改动"原则与文件驱动的一致性
