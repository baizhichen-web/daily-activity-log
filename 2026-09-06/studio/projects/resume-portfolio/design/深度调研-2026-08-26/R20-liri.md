# R-20 liri.today — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：暖纸底三段叙事——Instrument Serif + JetBrains Mono 双声部，"Life / Building now / Built" 的活人感结构。

## 1. 加载方式与技术栈
- 极轻：1 外链脚本 + 1 module + 2KB 内联、1 stylesheet（43KB CSS）、图片仅 2 张（WebP/JPG）。
- **双字体声部**：Instrument Serif（展示衬线）+ JetBrains Mono（元数据/标签）——与 R-17 同款衬线，但配了 mono 第二声部。
- **暖纸底 rgb(245,241,232)**——全批与我们 #FAFAF7 最接近的色彩（佐证暖纸白方向）。
- 页面 4032px（约 6 屏）；1 个 fixed 元素（复制邮箱后的 toast）；零动效 keyframes。

## 2. 设计巧思与组件
- **三段叙事结构**：**Life**（搬到 HSR 为了靠近创业者群体、备战首个半马）→ **Building now** → **Built** → **Next & experiments**——"生活/在建/建成/下一步"四态，天然带时间方向（生长型叙事的区块化）。
- **点击复制邮箱 + 内联 toast**：「email copied — drop me a line」——不跳邮件客户端，复制后页面内反馈（fixed toast）。
- **产品哲学句**：「tech is an optimization function for human attention — clear the logistics so the harder problems get the focus they deserve」——一句可被引用的工作观（比宣言具体，比介绍深刻）。
- **状态行**：「HSR, bengaluru · training for my first half marathon」+「open to founding & product-engineering roles」——地点+正在做的事+开放状态三合一。

## 3. 网页内容
Srihari，Builder & Product Engineer（班加罗尔，agentic 系统）。结构：名字+哲学句 → 状态行 → Life（个人语境散文）→ Building now → Built → Next & experiments → 联系。内容重心在"现在进行时"。

## 4. 交互
- 零 keyframes、4 条 hover 规则、零滚动动效——交互只有：点击复制邮箱（toast 反馈）、链接 hover。
- 阅读型页面，交互密度极低但每一处都有用。

## 5. 对我们的启示
- **取**：**Life/Building now/Built/Next 四态结构**（比 Work/Education 更有时间方向感——白纸版可对应「在建：个人站 v2 / 已建：youtube-vault-bridge… / 下一步」）；**点击复制邮箱+toast**（比 mailto 体验好，白纸"只要邮箱"边界的最佳实现方式）；**状态行三合一**（地点·正在做·开放状态）；暖纸底佐证；哲学句式（一句工作观，白纸版候选：「工具为人服务，AI 是杠杆不是替代」——需白纸自己写）。
- **不取**：作品视觉展示弱（2 图，无证据板）；Life 散文比例对 60 秒测试偏重。
- **综合评价**：全批与我们调性最接近的一站（暖纸+衬线+mono+克制动效+状态行），结构可整体参考。
