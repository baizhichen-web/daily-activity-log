---
title: Vibe Designing：意图驱动的 AI 设计范式进化
type: source
source_type: 演讲记录（公众号）
date: 2026-08-19
最近修改时间: 2026-08-19
tags: [AI设计, Vibe Designing, 设计范式, 生成式UI, Agent, 阿里云, AIDesigning]
source_url: https://mp.weixin.qq.com/s/s6i3D-pv7Lzpz8GtdcdRRA
---

# Vibe Designing：意图驱动的 AI 设计范式进化

> 演讲者：阿里云 AI Native 产品设计负责人 杨涛。场合：全球设计院长峰会 D20 2026「设计新生」· 阿里云智能专场「Go Vibe Designing」（2026-07-11，阿里巴巴全球总部）。原文照录见 `raw/2026-08-19-Vibe-Designing-意图驱动的AI设计范式进化.md`。

## 一句话总结

AI Coding 平权后，设计范式的关键转变是：**设计师从工具使用者，转向设计能力系统的构建者**。杨涛给出 CloudAI Design 三层能力系统——设计工程（Design Foundation）/ 动态交互（Generative Runtime）/ 自我进化（Evolution Loop）——并浓缩为三句口号：**Design is the new code / GenUI is the new interface / Taste is the new engine**。

## 关键摘录

- **AI Coding 正在从开发者的专属能力，变成通识性创造能力**：一个人可以用自然语言表达意图和判断，参与软件、工具、页面、体验和服务的创造。对设计师意味着：终于可以更快把脑子里的想法，变成**可以运行、可以验证、可以被别人使用**的东西——这是生产力的变化，也是设计范式的变化。
- 三个层面的信号：个人层面（阿里云设计师用 AI Coding 做小工具发布 npm，两天 150+ 下载）、团队层面（全员 Vibe Designing Jam，40+ 参赛作品，覆盖产品设计/市场传播/体验度量）、教育层面（浙大陈晓皎把 AI Coding 引入文化计算课，学生能把文化研究+视觉表达+交互体验连接成可运行作品）。
- **真正的问题是「一个意图如何被 Agent 高质量地实现为产品体验」**。从意图到体验，中间不是 prompt、也不是模型，而是一套能力系统。
- **设计工程（Design Foundation）**：把设计经验、组件规范、业务知识、文化素材、设计方法和验收标准转化为 Agent 可调用、可执行、可复用的工程资产，让 Agent 不再「裸生成」。第一件事不是继续堆 prompt，而是**主动打开 Agent 的黑盒，理解它到底是怎么生成的**。
  - 拆成两类能力：**设计声明**（什么是好的设计：产品结构、业务语义、设计风格、交互逻辑、组件约束、通用体验原则）控制质量；**执行契约**（怎么做出好的设计：把设计师的经验、流程和判断变成 Agent 能力）控制过程。设计不再只是一个交付物，而是一种新的工程能力。
- **动态交互 / GenUI（Generative Runtime）**：体验随意图被实时组织。产品从「人如何理解系统」（UX）转向「**Agent 如何理解人的意图并帮人完成目标**」（AX，Agent eXperience）。界面不再只是被设计出来，也可以在意图中被组织出来。
- **自我进化（Evolution Loop）**：真正优秀的体验仍需要 **Taste 牵引和质量兜底**。质量关注语义准确、场景合理、业务合规、交互可用、视觉一致；taste 不只视觉审美，更包含对文化、叙事、产品气质和交互细节的综合判断。关键是把这些规则和判断**沉淀为 Agent 可执行的评估机制**（evaluator + 体验巡检），把体验从 baseline 推向更成熟、更有张力的状态。
- 结尾主张：**AI 不是设计的未来，但 AI 一定在重塑未来的设计**。真正的机会是把专业能力、业务理解、审美判断和创造方法，变成 Agent 时代新的设计基础设施。作品形态不再只是静态图或 Figma 文件，可能是可交互的动态网站、可被 Agent 调用的 Design skill、能持续巡检体验质量的 evaluator、或把业务数据/组件/规则组织成体验的 Runtime 机制。

## 我的反射

（AI 反射，供作者阅读与裁决；与「AI Native 作品集」项目直接相关）

- 这篇与「AI Native 作品集」六步流程完全同频：先定义产品/整理内容（= 设计声明），再视觉探索（= taste 牵引），后期再上对话体验（= Generative Runtime）。**做作品集本身，就是在按 Vibe Designing 的方式建一个小的能力系统**。
- 「为 AI 读而设计的网页」≈ 把作品集的内容工程化为 Agent 能理解的「设计声明」：llms.txt / JSON-LD / AI 阅读指南，就是让 Agent 先知道「你是谁、什么是你的好作品」——对应文中「不再裸生成，而在真实语境和设计系统中生成」。
- 对 V1 的直接指导：**先别碰皮肤，先把内容整理成结构化资产**（Design Foundation 的雏形）；对作品集而言，内容比视觉更稀缺，正是文中「做页面越来越容易，内容越来越稀缺」的佐证。
- 与 [[wiki/concepts/策略性上下文解耦]] 呼应：给 Agent 带去「真实语境 + 设计系统」而不是堆 prompt。
- 一篇作品集给人看 vs 给 AI 看是两种阅读协议：本文给「为 AI 读而设计」提供了上层理由——让 Agent 用我们的业务语义和设计语言来读，而不是用默认审美/通用经验读。

## 关联

- [[wiki/concepts/Vibe-Designing]] — 本文核心概念页
- [[wiki/concepts/AI原生设计]] — AI 原生设计范式
- [[wiki/concepts/过程生成]] — 生成式设计 / GenUI 相邻概念
- [[wiki/concepts/策略性上下文解耦]] — 给 Agent 真实语境而非堆 prompt
- [[wiki/concepts/Harness工程与演化]] — 把能力工程化为 Agent 可调用资产
- [[wiki/concepts/设计师战略领导力]] — 设计师从执行向系统构建演进
- [[wiki/concepts/判断力]] — taste 源于综合判断
- [[wiki/sources/交互型个人作品集网站技术调研]] — 作品集技术路径调研（背景）
- [[wiki/sources/Sci-FiSpark-科幻构思人机共创系统]] — 创意生成也可工程化

## 待深挖

- CloudAI Design 的具体落地形态 / 是否开源 / 与 Figma MCP 的关系
- GenUI 与「自由界面」的边界、可靠性评测方法
- taste 如何工程化为可执行 evaluator（具体指标与回灌机制）
- 与个人作品集 V3「可对话体验」的具体接法

## 附录：演讲真图三张（2026-08-25 自微信缓存抢救归档）

> 原文为公众号文字转录，演讲现场图以微信图片流传；源缓存随时可能被清，已复印至本库。此处补上当时失败的指向（附录任务 2026-08-31 审计补完）：

1. `raw/assets/2026-08-25-ali-cloudai-vibe-designing-3layers.png`（412KB）——三层能力系统总览
2. `raw/assets/2026-08-25-ali-cloudai-design-io-flow.png`（131KB）——Design I/O 流程图
3. `raw/assets/2026-08-25-ali-cloudai-design-io-layers.png`（152KB）——设计声明×执行契约分层图（studio/design/ 六层体系直接据此类比落地）
