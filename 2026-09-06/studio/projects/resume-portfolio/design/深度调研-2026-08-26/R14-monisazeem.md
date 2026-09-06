# R-14 monisazeem.com — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：黑底等宽纯文本的"零设计即设计"——2KB 级页面，幽默与数字证据直给。

## 1. 加载方式与技术栈
- **全批最轻**：外链脚本 1 个、内联 CSS ~1KB、零图片/零 canvas/零 SVG、系统字体（声明 Noto Sans SC）、12 个纯文本链接。
- 页面总长 880px（约 1.3 屏）。黑底 rgb(0,0,0) + 白字——终端拟态的最简实现（连等宽字体都没强制，靠排版暗示）。

## 2. 设计巧思与组件
- **自嘲语气校准**：「hi i am monis. welcome to my very cool looking professional website :)」——用自嘲消解"作品集"的正式感。
- **速度玩笑**：「also fastest on planet earth」——把极端轻量这个事实变成一句笑话（性能指标人格化）。
- **数字证据直给**：「responsible for tokenizing **$5B+** of digital assets」「**20K+** view」——经历与项目全带硬数字。

## 3. 网页内容
Full stack developer。结构：问候+玩笑 → 邮箱/GitHub → 工作经历（zoniqx RWA 代币化 1.2 年 $5B+ / 保险业 WhatsApp bot POC）→ 项目（buddy macOS AI 助手·OpenAI Codex Hackathon / claude code from scratch / browzerai 浏览器侧边栏助手 20K+ 浏览）。无标题层级，纯段落流。

## 4. 交互
- 零动效、零 hover 体系、零滚动效果。链接即全部交互。
- "交互设计" = 加载即全内容（0 阻塞）。

## 5. 对我们的启示
- **取**：**自嘲幽默的语气点缀**（我们全站严肃证据链里可以有一处玩笑，如页脚彩蛋——但白纸调性偏克制，仅记录）；**数字证据直给**句式（与 R-13 数字前置同源：经历必须带量纲）。
- **不取**：整体风格（黑底终端与 HY-LAB 纸感冲突）；零结构（无区块、无锚点，深读体验缺失）。
- **光谱定位**：R-13（白底极简）↔ R-14（黑底极简）是同一哲学两副面孔；我们的站在光谱中段——证据密度高、装饰克制。
