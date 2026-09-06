# R-13 devchauhan.in — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：全站 15KB 的极端克制文档流——零外链脚本、系统字体、星标数前置。

## 1. 加载方式与技术栈
- **本批 19 站的轻量冠军**：外链脚本 **0 个**、内联 JS 4KB、1 个 stylesheet（11KB）、系统字体栈（零 webfont 请求）、图片仅 6 张（WebP/SVG 优先）。整站文本+样式 <20KB。
- 纯静态 HTML+少量原生 JS，无框架、无 canvas/video、无 service worker。
- 页面总长 1099px（**约 1.6 屏**）——比 R-09 还短。

## 2. 设计巧思与组件
- **星标数前置**：项目行「★ 1,257 Reicon — Open-source visual asset library…」——数字在名字前面，证据先于描述。
- **一句话资源化定位**：自我介绍不写"热爱"，写维护的东西（"maintaining reicon.dev — 2,700+ SVG icons, 4,900+ logos, 71k+ illustrations"）。
- 白底、系统字、无装饰——设计退场，内容全裸。

## 3. 网页内容
Frontend Developer & Open Source Maintainer（B.Tech 在读）。结构：名字 → 身份两句 → 社交行（GitHub/LinkedIn/X/Email）→ Projects（Reicon ★1,257 / LessBytes 压图工具）→ Blog（2 篇）。完。

## 4. 交互
- 几乎为零：1 个 button，无 keyframes/hover 探测命中，无滚动动效。
- 交互成本全部让位给加载速度——这本身是它的"交互设计"。

## 5. 对我们的启示
- **取**：**数字前置句式**（youtube-vault-bridge 的「42 测试通过 / 4k+ 下载」应放在项目名前面，不是描述里）；系统字体栈做降级层（我们 webfont 加载失败时的 fallback 策略参照）；"维护中的开源工具"作为身份定义方式。
- **不取**：内容太薄（无经历/教育/证据链，撑不起硬件 PM 的复杂叙事）。
- **定位对照**：它是"下限样本"——证明 15KB 也能成立；我们的上限诉求（证据链+动效+热区图）注定更重，但每个字节都该像它一样有理由。
