---
title: Vibe Designing
type: concept
date: 2026-08-19
最近修改时间: 2026-08-21
tags: [AI设计, 设计范式, 生成式UI, 设计工程, Agent, AIDesigning]
---

# Vibe Designing

## 定义

**意图驱动的 AI 设计范式**：AI Coding 平权之后，一个人说出意图，Agent 就有机会把它变成代码、界面、工具和产品。此时设计的关键不再是「谁会写代码」，而是**一个意图如何被 Agent 高质量地实现为产品体验**——设计师的岗位从工具使用者，转向**设计能力系统的构建者**。

## 核心框架：CloudAI Design（阿里云实践）

1. **Design Foundation（设计工程）**：把设计经验、组件规范、业务知识、文化素材、设计方法和验收标准转化为 Agent 可调用、可执行、可复用的工程资产。
   - **设计声明**（什么是好的设计）控制质量
   - **执行契约**（怎么做出好的设计）控制过程
   - 第一件事不是堆 prompt，而是打开 Agent 黑盒，理解它如何生成。
2. **Generative Runtime（动态交互 / GenUI）**：体验随意图被实时组织，产品从 UX（人如何理解系统）转向 **AX / Agent eXperience**（Agent 如何理解人的意图并帮人完成目标）。界面既可以被设计出来，也可以在意图中被组织出来。
3. **Evolution Loop（自我进化）**：把质量规则和 **taste** 判断沉淀为 Agent 可执行的评估机制（evaluator + 体验巡检），让体验从 baseline 逐步走向更成熟、更有张力的状态。

## 三个口号

- **Design is the new code.**
- **GenUI is the new interface.**
- **Taste is the new engine.**

## 关键判断

- 从意图到体验，中间不是一个 prompt、也不是一个模型，而是一套**能力系统**。
- taste 不只视觉审美，更包含对文化、叙事、产品气质和交互细节的综合判断；真正优秀的体验靠 taste 牵引、质量兜底。
- AI 不是设计的未来，但 AI 一定在重塑未来的设计；机会在于把专业能力、业务理解、审美判断和创造方法变成 Agent 时代新的设计基础设施。

## 与工作空间的关联

- 「为 AI 读而设计的网页」（llms.txt / JSON-LD / AI 阅读指南）= 把作品集内容工程化为 Agent 可理解的设计声明。
- 做 AI Native 作品集 = 用本文的三层框架做一个小的能力系统：内容资产（Design Foundation）→ 视觉（taste）→ 对话体验（Generative Runtime / evaluator）。

## 关联

- [[wiki/sources/Vibe-Designing-意图驱动的AI设计范式进化]] — 原始来源
- [[wiki/concepts/设计工程化]] — 2026-08-21 用户澄清后的重点概念：文件如何指导 AI 设计
- [[wiki/concepts/UI契约反向校验]] — 契约层为 UI 验收而变更的迭代原则
- [[wiki/concepts/AI原生设计]]
- [[wiki/concepts/过程生成]]
- [[wiki/concepts/策略性上下文解耦]]
- [[wiki/concepts/Harness工程与演化]]
- [[wiki/concepts/设计师战略领导力]]
- [[wiki/concepts/判断力]]

## 认知演变

- 2026-08-19：初始理解（杨涛 D20 演讲入库）
- 2026-08-21：用户澄清重点 = **设计工程化——用文件指导 AI 设计**（设计声明控质量 + 执行契约控过程）；衍生 [[wiki/concepts/设计工程化]]，首个文件实例落地 `youtube-cinema-caption/design/`

## 待深挖

- taste 工程化的具体可执行指标
- GenUI 的边界与评测
- 个人作品集 V3 的落地路径
