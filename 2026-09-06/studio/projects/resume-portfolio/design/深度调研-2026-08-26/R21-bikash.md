# R-21 bikash.useiota.space — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：暗底标准作品集模板型——无突出巧思，价值在"标准件清单"与 react-activity-calendar 再确认。

## 1. 加载方式与技术栈
- Next.js 系（Geist/Geist Mono + **Doto 点阵字体**做展示标题）；11 外链脚本 + 10KB 内联、1 stylesheet + 86KB 内联 CSS。
- 暗底（lab ≈ 纯黑）；页面 2823px（约 4.2 屏）；4 张 PNG、12 个 SVG；无 canvas/video。
- **热区图第 5 处实例**：`react-activity-calendar`（与 R-09 同库）。

## 2. 设计巧思与组件
- 无突出原创巧思——标准模板件：Hero → Selected Projects（iota 动画工具 / RevPDF 阅读器 / 多租户 Chatbot / Better-components）→ Work Experience → Education → Blog → GitHub Contributions → Connect。
- 项目条目带状态标注（"(WIP)"）——R-15 状态体系的零散版。
- Doto 点阵字体是唯一视觉记忆点。

## 3. 网页内容
Bikash Sahu，Software Engineer（Next.js/React/TS/Kotlin）。一句话（"Always building, always learning"）+ 六标准区块。项目描述具体（"Local PDF, EPUB reader with Chrome-style selection search"）。

## 4. 交互
- 6 组 keyframes、零 hover 规则、1 fixed；热区图横向滚动。
- 模板级交互，无定制动效。

## 5. 对我们的启示
- **取**：负样本价值为主——证明"标准模板"路线没有记忆点（我们差异化路线的对照）；(WIP) 状态标注再次佐证 G-17。
- **不取**：整页暗底模板脸；"Always building, always learning" 式空话（白纸已否定的宣言式文案同类）。
- **热区图统计**：至此 5/19 站有热区图（R-09/10/16/17/21）——G-16 的行业验证充分。
