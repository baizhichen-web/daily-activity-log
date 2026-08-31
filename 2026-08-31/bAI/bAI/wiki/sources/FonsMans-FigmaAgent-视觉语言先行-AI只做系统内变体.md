---
title: FonsMans-FigmaAgent-视觉语言先行-AI只做系统内变体
type: source
tags: [AIDesigning, VibeDesigning, AI协作, 设计工程化]
date_created: 2026-08-31
source_url: https://x.com/FonsMans/status/2092987940678897665
author: Fons Mans
raw: "bAI/bAI/raw/2026-08-31-X-FonsMans-推文-视觉语言先行-AI只做系统内变体.md"
---

# Fons Mans：视觉语言先行，AI 只做系统内变体

> 采集 2026-08-31 · 原文全文见 raw/（thread 5 条，X 抓取）

## 核心观点（原文浓缩）

1. **反对 one-shot 整设计**："I'm not really interested in one-shotting entire designs with AI"——AI 的价值不在替你决定设计，而在**既定视觉方向内迭代单个元素**
2. **顺序是命门**："Instead of asking AI what the design should be, I can define the visual language first, then use the agent to explore density, scale, rhythm, and variations **within that system**"——先定义视觉语言，AI 只在系统内探索密度/尺度/节奏的变体
3. **AI 接手的是人力密集段**：密集图案、精细线条、重复物件、几十个元素要精确摆放——"恰恰是这些部分"交给 agent，一个想法裂变出一堆受控变体，不用逐版手搓
4. **组件仍由人定义**："I still want to define the individual components. I just don't need to manually make every possible version"——看到有趣的变体后，**人再回去精修**

## 白纸的两条腿（2026-08-31 定调，本文最重要的批注）

> "这正是我们现在正在做的：
> 1. 先完成一整套底层的设计文档，通过这个来进行工程化，然后在这工程化基础上再进行设计。
> 2. 另一条正在进行的，是利用网上现有的东西来'搭积木'——用别人现有的模板去改造，根据现有的 Product.md 去改造我自己的内容。
> 最后这两条内容相汇：一条是我自己决定下来的设计（工程化文档和规范），另一条是别人做过的东西。**两者结合，就是一个完整的设计。**"

## 与我们体系的逐条映射

| Fons 的说法 | 我们的对应物 |
|---|---|
| define the visual language first | **声明层先行**：Product.md（已过审）→ Design.md/基因库（基因封闭=变体的边界） |
| explore variations within that system | VIBE 流程的**变体探索段**（低保真出多案）；基因封闭三硬规则保证变体不出格 |
| I still want to define the individual components | **Components.md 组件规范**——件由人定，变体由 AI |
| not one-shotting entire designs | **先稿后码**、不替人做方向性决策（同一条价值观，独立得出） |
| 人力密集段交给 agent | 模板/组件库改造（temp/refs 抄写管线、Magic 模板 B 版）=第二条腿的"积木" |

## 使用时机

- **AI 出设计变体时**（低保真多案、批量换色/换排版）：开工前重读"系统内变体"纪律——AI 只在基因内探索，不许自由发挥方向
- **向别人解释我们为什么先写一堆文档再开工时**：这篇是最短的外部佐证（知名设计师独立得出同一工作流）
- **两条腿路线动摇时**（比如嫌写声明慢想直接开码）：回看白纸自己的两条腿批注
- 介质注：Fons 用 Figma agent（付费合作）；**我们主力同样是 Figma——经 MCP（Claude Code 子代理跑，Full 席位，2026-08-31 白纸确认"我们的主力也是 figma，但是通过 mcp"）**，工作流同构（Pixso 为免费备介质）
