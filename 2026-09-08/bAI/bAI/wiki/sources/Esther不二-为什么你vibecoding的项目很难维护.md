---
title: "为什么你vibecoding的项目很难维护 - Esther不二"
type: source
source_type: transcript
date: 2026-08-28
最近修改时间: 2026-08-28
tags: [AIDesigning, VibeCoding, 可维护性, 前端框架]
source_url: https://www.xiaohongshu.com/discovery/item/6a826877000000000502bbb5
---

# 为什么你vibecoding的项目很难维护 - Esther不二（小红书视频）

## 一句话总结

Vibe Coding 的「惊艳初作、烂尾维护」根源是 AI 默认把结构/样式/逻辑全塞进单个 HTML 大文件；解法是开工前就向 AI 指定 React/Vue + TypeScript + Vite 的可维护工程线，纯 HTML 旧项目尽早重构而不是往上堆。

## 关键摘录

> 小项目的话你直接用 HTML 倒还好，但是我觉得大项目的话，我们一定要有一个意识——就是我们前期有什么工具、有自己比较熟悉的那一套工具，我们可以直接让 AI 告诉它"我就想用这个来做"

> 大多数人 Vibe Coding 第一次能做出很惊艳的作品，但是呢，这个作品后面维护不了了，很可能是这个原因……大文件越写越改不动

> 你是一个专业的前端工程师，你要用专业的视角写一个可以维护、可以长期维护的前端项目。是不是它就会鞭策一下 AI，就不要偷懒

> 已有的纯 HTML 项目，不要继续往上堆，尽早重构

> 我觉得 AI 编程一个很重要的步骤，就是维护好你的目录结构，维护好你的模块关系

## 我的反射

- 这条视频几乎是 [[personal-website-project]] 8 月路线的后验印证：site/ 就是「纯 HTML 长到改不动」的原型（原生 vanilla），web/ 就是视频开出的药方（React 18 + Vite 6 + TS strict）——我们在 08-25 主动完成了视频劝告的「尽早重构」，决策当时叫「可维护优先于轻量」
- 「一开始就告诉 AI 用什么框架」= 我们 AGENTS.md 行为阶梯与开工提示词里已有雏形，但未成文为规则；可上升为 Vibe Designing 执行契约的开工条款
- 「让 AI 学 React Practice 最佳实践清单」是一个待办动作：MVP 翻页书实现前可让 AI 先读官方最佳实践，替代笼统的"专业视角"
- 视频受众是前端小白，价值不在新知而在「把工程师的默认常识翻译成了设计师能听懂的话」——这个翻译动作本身是 AI Designing 素材

## 使用时机

- MVP 翻页书实现开工时：作为「为什么我们用 React+Vite+TS」的大众语言参照（写文章/发社媒时直接引用其奶茶店比喻）
- 给别人做 vibe coding 顾问/教学时：整条视频就是教学模板（诊断案例 → 三要素 → 框架原理 → 实操）

## 关联

- [[wiki/concepts/AI-Designing]] — 观点簇成员，使用时机表已登记
- [[wiki/concepts/软件熵与复杂度]] — 大文件牵一发动全身即软件熵的视频版表述
- [[personal-website-project]] — site/（vanilla）→ web/（React+Vite+TS）迁移史与视频论点一一对应
- [[wiki/concepts/UI契约反向校验]] — 互补：视频管"开工选型"，契约反向校验管"开工之后的迭代方式"

## 待深挖

- React Practice 最佳实践清单原文（视频口播提到，未给链接）——MVP 实现前检索补入
