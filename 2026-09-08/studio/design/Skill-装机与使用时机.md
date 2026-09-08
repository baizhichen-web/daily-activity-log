# Skill 装机与使用时机（设计相关全景）

> 2026-08-31 白纸问："装了这么多设计相关的 skill，你知道什么时候要用什么吗？"——本文件即答案的持久化。**Agent 做设计/UI 任务前先查本表，主动取用，不等点名**（与 AIDesigning 时机表同纪律）。
> 总规则（从属条款，高于一切 skill 默认值）：**已拍声明永远优先**——Product.md/设计基因库 G-xx/VIBE 三硬规则/已拍动效纪律（G-21 预算线 150-600ms、spring.ts 三档弹簧、HIG reduced-motion）。skill 是检查表与决策规则，**不是审美来源**；颜色/字体/语气一律回 Design.md 与基因库。

## 一、本项目自装（有明确触发时机）

| Skill | 是什么 | 什么时候用 | 什么时候不用 |
|---|---|---|---|
| **animate**（Emil） | 从零建一个动效，按决定顺序走：该不该动→目的→工具→属性→曲线时长→打断→出场 | MVP 给某元素加动效时（Loader/翻页/展开 G-21/悬停） | 只改参数不新建时 |
| **review-animations**（Emil） | 按其规则严审已有动效 | VIBE 评审段/验收段，动效部分的检查器 | 写码过程中逐行用（太早） |
| **improve-animations**（Emil） | 全库动效审计→优先级整改清单 | MVP 动效全部写完后的体检（用法同 react-best-practices：写完对照，非开工前读） | 单文件小改动 |
| **find-animation-opportunities**（Emil） | 找值得动的地方 + **不该动清单** | 低保真→高保真之间定动效预算时；克制动效红线的执行器 | 已拍过的区块重查 |
| **animation-vocabulary**（Emil） | 动效术语对齐 | 向 AI 描述动效需求、或把白纸的口语描述转译成精确动效参数时 | — |
| **emil-design-eng**（Emil 主件） | 动效为主+设计工程建议 | 以上场景的背景知识库，被各 skill 引用 | 独立读 |
| **react-best-practices**（Vercel） | 64 条 React 规则/8 类 | MVP 代码写完后对照检查 | 开工前通读（白纸已拒） |
| **pixso ×5**（官方） | 画布读写/DSL/D2C/组件配置 | **备介质** Pixso 画布操作时（正路=Variables→Components→组装，code_to_design 只用于导入外部参考） | 主力活（走 Figma） |
| **figma ×12**（官方） | Figma 全链路 skills | **主力介质**：Figma MCP 消费（Claude Code 子代理跑 `claude -p`，Full 席位）——M3 Kit 设计系统、Variables 令牌、稿→码 | ZCode 直连（两路已堵，08-26 终审） |
| **superdesign** | 设计画布（低保真三稿流程） | 白纸点名开画布时（08-25 用过三稿；init 六文件未产出，接入半成品） | 默认不开 |

## 二、环境里可用、本项目默认不用（防串味）

- **frontend-design / brand-guidelines（env 内置版）/ canvas-design / theme-factory / algorithmic-art / web-artifacts-builder**：通用生成类，自带现成审美默认——只在白纸点名时用（判例=refactoring-ui 不装机理由：色调空窗期防隐性默认）。
- **webapp-testing**：验收段真机过页面时可用（视觉验证管线补充），属工具非审美。
- **Emil 仓库未装款**（apple-design / prototype / pick-ui-library / write-swift / animate-expo）：与本项目无关或未评估，白纸点名再装。

## 二B、已评估不装（防止重复提议）

- **Impeccable**（64k★）/ **jakubkrehel skills ×11** / **baoyu-design**：2026-08-31 白纸拍板全不装。理由各自见素材索引；可借鉴处（检测器思路/工艺规则/生成玩法）走文档与按需取件，不进常驻 skill。

## 三、主线与触发口诀（v2 · 2026-08-31 白纸纠正后重写）

> ⚠️ 白纸纠正（08-31）：初版口诀直接照搬 Emil 的 skill 流程，把我们自己的设计工程化丢了——**这样前面做的声明体系就白费了。站在巨人肩膀上继续攀登：借他的决策规则，走我们的流程。**
> **主线 = VIBE 六步设计流程 + 声明体系；外部 skill 只是注入各步骤的工具，永远不替代左列。**

| VIBE 步骤 | 我们自己的内容（**主角**） | 注入的外部工具（配角） |
|---|---|---|
| 1 定向 | 读 **Product.md**（性质/座右铭/特色）+ **基因库**取基因 + Domain/Craft 已有条目 | find-animation-opportunities（产出=动效预算，交稿用） |
| 2 低保真 | **先稿后码**三硬规则；基因封闭；superdesign/Figma 稿 | — |
| 3 高保真 | **Design.md 令牌 + Components.md 规范**统治外观；Templates 结构 | animation-vocabulary（描述动效需求时对齐术语） |
| 4 评审 | **稿=验收基准**；VIBE 评审检查单 | review-animations（只审动效段，作为子检查器） |
| 5 实现 | **抄写管线**（按需取件→三道翻译）+ 自建 **spring.ts 三档**；稿不为码让路 | animate（决策链建动效）；react-best-practices（写完对照） |
| 6 验收 | **Evaluator 检查单** + G-xx 红线复核 + HIG 硬指标（对比度 4.5:1/reduced-motion/可跳过） | improve-animations（动效全库体检） |

**口诀（主线版）**：定向先读声明层 → 低保真先稿后码 → 高保真令牌统治 → 评审稿为基准 → 实现翻译+对照 → 验收清单+体检。
介质线（不变）：稿在 Figma（经 MCP 走 Claude Code 子代理）、备 Pixso、superdesign 点名才开。

## 四、未来件：属于我们自己的 design skill（白纸 2026-08-31 提议，未到时机）

> 白纸问："到后面要开始设计的时候，综合现在这些内容，能不能做一个属于自己的 design skill？"——**能，且这就是声明体系的终局打包**。但**现在不动手**：Design.md/Craft.md 未过审、MVP 未验证，用草稿内容做 skill = 把未定调的审美烤成默认值（隐性默认陷阱的自家版）。
- **形态**：薄 skill（SKILL.md = 触发时机 + 红线 + 指针）+ 厚声明（内容留在 Product/Design/Components/Craft.md，skill 只装路由——沿用 studio AGENTS「全局指针化」原则）
- **内容源**：声明六层 + VIBE 三硬规则 + 本册触发口诀 + G-xx 基因红线 + HIG 摘读硬指标 + Emil 决策链（animate 顺序）+ Vercel design.md 的结构范本（优先级序/拒绝清单/双测）
- **时机**：Design.md + Craft.md 过审、MVP 验收通过后蒸馏——它本身就是「终局双产物」的第一件（我们自己的 AI 设计流程，可发布可复用）
- **占位**：本表登记为其将来的挂靠点

