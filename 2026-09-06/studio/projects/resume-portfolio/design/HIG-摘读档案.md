# Apple HIG 摘读档案

> 溯源：白纸 2026-08-30 提议「能否作为我们界面设计的第一标准」→ AI 全文爬取 + 精读核对；**候选状态，待白纸口令**（条款在 `studio/design/Craft.md` 待填区）
> 全文快照：`temp/hig-corpus/`（173 文件 ≈1.4MB，随用随清；重抓方法见第五节）

## 一、真实结构（2026-08-30 爬取核实，非记忆）

- **六大区**：入门 Getting started / 基础 Foundations / 模式 Patterns / 组件 Components / 输入 Inputs / 技术 Technologies（旧版顶栏的「资源」已不在）
- 规模：入门 8 篇（设计原则 + 7 平台）· 基础 17 · 模式约 25 · **组件 8 组 64 条目** · 输入 15 · 技术约 25
- **设计原则 = 八大**（页面 Change log：2026-06-08 "Reintroduced design principles"）：
  **Purpose / Agency / Responsibility / Familiarity / Flexibility / Simplicity / Craft / Delight**
  —— 旧版「清晰/遵从内容/层次」三原则**已非现行框架**
- 每页自带 Change log（如 Motion 2025-09 加入 Liquid Glass）——这是一份自我记录变更的活标准

## 二、八大原则 × 我们的对应（全文精读后）

| 原则 | 核心句 | 直指我们 |
|---|---|---|
| Purpose | "Investigate existing solutions, and avoid re-creating them" | 先调研再动手 / MIT 库逐件抄写策略 |
| Agency | 不挡路、自由探索、**可撤销** | 界面退后内容为主；操作可回退 |
| Responsibility | 透明、护数据 | 零假数据 |
| Familiarity | 一致性、明确反馈 | 基因封闭 |
| Flexibility | 为所有人设计、多输入、保留上下文 | reduced-motion、键盘可达 |
| Simplicity | **"Simplicity isn't minimalism"** | 翻页书少字大图 |
| Craft | 品质定调、上线不是终点 | VIBE 验收闭环 |
| Delight | 定义时刻，但**勿把愉悦当装饰** | 彩蛋类基因（G-27/G-28）的边界 |

## 三、对 MVP 翻页书的硬指标（精读摘录）

- **Loading**：「最好的加载体验在人察觉前完成；否则**尽快显示占位**」——图片占位槽的直接依据
- **Launching**：launch screen 不是艺术表达；但 **splash screen 合法**（可在启动完成/onboarding 开头展示）——座右铭逐字渐显 = 合法 splash，约束：短 + 可跳过（Motion 篇：「让人能跳过动画，别让人等动画结束才能操作」）
- **Accessibility**：正文对比度 ≥ **4.5:1**（17pt 以下）、大字/粗体 3:1（引 WCAG AA）；字号支持 ≥**200%** 放大；信息不能只靠颜色区分；iOS 控件最小 28×28pt
- **Motion**：动效必须有目的；**频繁交互别加动效**；reduced-motion 下收紧弹簧、用淡入淡出替代位移动画（与 fluid-functionalism 三档弹簧相接）
- **Materials**：Liquid Glass（2025-09）= Apple 全平台统一设计语言——Apple 语境产物，web 不搬，只取「层次服务内容」的思路

## 四、「第一标准」建议（AI 建议，待白纸拍板）

分层采纳：HIG 作 **Craft.md（通用工艺层）的第一参考标准**——通用体验判断先查它，再查 refactoring-ui 消化条目（HIG 管原则与反例，refactoring-ui 管具体手法）；**不越界**——Apple 平台语境（SF 字体/系统控件/Liquid Glass）不统治品牌视觉层，长什么样归 Design.md/设计基因库（白纸拍板地盘）。

## 五、诚实边界与重抓方法

- **全文精读 7 篇**：Design principles / Motion / Loading / Feedback / Accessibility / Launching / Materials
- 其余 166 篇：**标题级图谱核对**（`temp/hig-corpus/DIGEST-标题图谱.txt`），未逐字读；用哪篇前先读那篇
- 重抓方法：网页是纯 JS 渲染（直接抓只有空壳），真接口在
  `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json`
  （landing → 六区 → 各题 → components 8 组 → 64 条目，逐层从 topicSections 取 identifier→url）

## 六、Eagle 落位

- 书签 `MTG0I1ZY0RSZS`，标签：素材库与工具 / 设计标准 / HIG / Apple / 界面设计规范 / 候选第一标准
- ⚠️ Eagle 本地 API 无移动/删除端点，条目暂在库根——**需手动拖入「素材库与工具」夹**（一步）；书签名会被 Eagle 自动同步回页面标题（已知行为，无害）
