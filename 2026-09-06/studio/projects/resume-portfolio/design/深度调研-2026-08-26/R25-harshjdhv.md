# R-25 harshjdhv.com — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：近白底"零图片"极简专业站——像素图标字体系统 + "Updated" 日期戳 + 价值观陈述收尾。

## 1. 加载方式与技术栈
- 11 外链脚本 + 27KB 内联、1 stylesheet（66KB）；Inter + **GeistPixel 五件套**（PixelSquare/Grid/Circle/Triangle/Line——像素几何图标字体，图标即字体零请求）。
- **零图片**（imgTotal=0，全站 SVG 10 个）——与 R-12 并列全批最"轻视觉"。
- 近白底 rgb(253,253,252)；页面 1101px（约 1.6 屏）；3 个 fixed（主题切换/导航类）；6 个自定义光标元素（局部）。

## 2. 设计巧思与组件
- **"Updated Jul 25, 2026" 日期戳**：Hero 角落标注页面更新时间——"活文档"信号（⚠️ 若手写会腐烂；正解是构建时从 git 自动注入——与我们"禁手写日期"规则不冲突，冲突的是手写）。
- **像素图标字体系统**：GeistPixel 系列——图标做成字体，加载一次缩放无损（工程化巧思）。
- **价值观陈述**：「I care about software that is **calm, useful, reliable, and polished enough** t…」——四个形容词的工作价值观，放在介绍段尾（比独立宣言区轻）。
- **数字信任状**：Componentry「backed by the Vercel OSS Program and visited by more than 20,000 people every month」——背书+月访客双数字。

## 3. 网页内容
Harsh Jadhav（harshjdhv），Design Engineer @ Archil。结构：Hero（名字+Updated 戳+三段式自述：职责范围→当前职务→业余 OSS+价值观）→ Experience → Selected work → Open source。1.6 屏讲完专业全貌。

## 4. 交互
- 11 个动画元素、4 组 keyframes、0 hover 规则——动效为入场与微反馈。
- Toggle theme（明暗切换，R-09 彩蛋的常规化版本）。

## 5. 对我们的启示
- **取**：**构建时注入的 Updated 日期戳**（若做，必须从 git 构建时自动生成，绝不手写——与既有规则兼容的实现路径）；**价值观四词组**（白纸版候选：「克制、可证、生长、可用」——放介绍段尾不独立成区）；**数字信任状句式**（背书方+月量双数字）；图标字体化思路（我们 SVG 已够用，记录备选）。
- **不取**：零图片的极端（设计岗需要视觉证据，我们反其道）。
- **收尾对照**：全批调研到此——19 站光谱：极简文字（R13/14/19/24/25）↔ 重视觉人格（R07/11/12/22）↔ 超长档案（R10/17）；我们定位：视觉克制+证据密度+活人感件，与 R-20 最亲、以 R-09/R-10 为功能蓝本。
