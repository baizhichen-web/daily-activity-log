# R-24 maheshpawar.me — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：白底小写活人感流——2 屏讲完，项目一句话带"人无我有"的差异点，下班人格一段话。

## 1. 加载方式与技术栈
- 12 外链脚本 + 27KB 内联、1 stylesheet（36KB）；Geist + Geist Mono；4 图（3 lazy）。
- 白底；页面 **1391px（约 2 屏）**——本批最短之一；零 fixed/sticky。

## 2. 设计巧思与组件
- **全小写人格**：标题、导航全小写（"hi, i'm mahesh pawar"）——非正式语气流派的干净实现。
- **下班人格一段话**：「when i'm not coding, you'll find me reading books, listening to music, watching movies, or taking long walks in nature」——工作外的人一段话带过，不占区块。
- **项目一句话差异点**：codebase-cli——「ask questions about any codebase, get answers with **real file:line citations – runs fully local**」——差异点（可溯源引用+全本地）写进一句话；backendkit——「every tool a backend dev googles daily」——用户痛点句式。
- **信念区入口**：「curious about what drives me? here are some things i believe in」——信念单独成页/区，主页只留钩子。

## 3. 网页内容
Backend Engineer（Python/Django/Postgres，自学）。结构：小写 Hero → about（含下班人格）→ projects（2 个开源）→ my journey（Teson LLP）→ education → skills → 信念钩子。2 屏极简。

## 4. 交互
- 3 组 keyframes、3 条 hover 规则、6 个动画元素——入场淡入级。
- 无 canvas/video/光标戏法——纯文档流微动效。

## 5. 对我们的启示
- **取**：**项目一句话差异点句式**（youtube-vault-bridge 一句话模板：「只收片段+批注，三视图勾选导出——本地运行」式，把"人无我有"写进第一句）；**下班人格一段话**（活人感的最低成本形态——比 R-17 Spotify 卡轻两个量级，适合我们）；**信念区钩子**（主页一句话+详情外链，控制主页长度）。
- **不取**：全小写在中文语境失效（中文无大小写，对应物是标点/语气词选择——我们已定克制调性）；内容太薄无证据链。
- **2 屏 vs 16 屏光谱**：R-24（2 屏）↔ R-10/R-17（16 屏）——我们落地页约 8 屏居中，方向正确。
