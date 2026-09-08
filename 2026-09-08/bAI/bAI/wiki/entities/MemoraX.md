---
title: "MemoraX"
type: entity
tags: [公司, agent-memory, 工具, AML]
date_created: 2026-08-24
last_updated: 2026-09-08
source_url: https://code.memorax.net/
---

# MemoraX（⚠️ 2026-09-08 用户裁决：已停用移除，记录保留）

> ⚠️ **状态：已停用（2026-09-08）**——接入 14 天观察期真实使用为零，判据不达线，用户裁决移除；使用记录与停用分析见 `notes/2026-09-08-MemoraX使用记录与停用.md`

## 是什么

Agent Memory 公司（2026 年成立不足半年即拿 Seed++ 数千万美元），2026-07 AML（Agent Memory Leaderboard）商业榜第一（58.02 分，七维全领先，超 Mem0/腾讯/网易）。技术体系：可学习记忆策略 + 记忆基模 + **自进化 Agent Harness**；双回路——在线（意图→记忆→执行，不全量灌上下文按需裁剪）+ 离线（Agentic RL 飞轮：写入/召回/任务结果三类 Reward）。

## 产品形态

- **memorax-code**（MIT 开源客户端，npm）：接入 Codex/Claude Code/DeepSeek Harness/OpenCode 四 harness（hooks+skills），另有 CLI（add/search/status）可接任意工具
- **MemoraX Cloud**（闭源服务）：记忆智能本体；Personal/Procedure Memory 留本地 `.repo_memory/`，Coding/Repo Memory 走云
- 商业化：SaaS（开源客户端获客+云收费）；developer preview 期无公开定价，匿名试用免费有配额
- 四类记忆边界：Coding（坑/失败尝试/修复）、Repo（架构/入口/证据）、Personal（偏好）、Procedure（流程）

## 与本工作空间的关系

P1（workspace-evolution）方案 B′ 选型，2026-08-23/24 完成五面接入（DSH/Codex/Claude 原生 + ZCode 经 CLI + 正式账号 baizhichen83）。**对 Mem0 的差异**：Mem0 是可自托管的通用记忆引擎（装进自己的产品），MemoraX 是开箱服务（装进自己的工具，不可自托管）——后者为我们已调研的备选换路线。运维要点与排障实录见 `studio/projects/workspace-evolution/domains/memory-plan-b-memorax.md`（根因：Windows Defender 拦截，DEFER 开关绕过）。

## 使用纪律（写入治理）

等价请求不写入；冲突更新并删旧表述；一次性指令不入库；意图不明先问；**记忆当假设、用当前产物验证、不全量扫描**。

## 来源

- [[wiki/sources/AML发布-Datawhale]]、[[wiki/sources/MemoraX-Code打通Claude-Code和Codex]]、GlobeNewswire 2026-08-17
