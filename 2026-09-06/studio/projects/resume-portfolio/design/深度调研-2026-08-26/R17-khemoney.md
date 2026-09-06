# R-17 khe.money — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：白底超密全档案流——超长时间线 + canvas 热区图 + "Currently Listening" 活人感件。

## 1. 加载方式与技术栈
- 轻脚本重样式：5 个外链脚本 + 2KB 内联、2 stylesheet + 77KB 内联 CSS；单字体 **Instrument Serif**（衬线展示体撑全站调性）。
- **GitHub Activity 热区图是 canvas 渲染**（`github-graph-frame` 容器 + canvas）——非 SVG 方案的实例。
- 15 图（WebP/SVG 优先，12 lazy）、79 个 SVG 图标；canvas 共 1。
- 页面 10973px（**约 16.3 屏**，与 R-10 同级的超长单文档）；零 fixed/sticky。

## 2. 设计巧思与组件
- **年龄开场**：「19. Building products since 5 years.」——年龄+年限两个数字把"年轻但老练"一句话立住。
- **Currently Listening（Spotify 卡）**：实时显示正在听的歌（Kho Sa Gaya Hoon）——活人感件的极致形态（数据源是 Spotify API，页面有"此刻"）。
- **超长时间线**：Experience 每条带月份区间（Feb 2025 – Present），叙事细节到「Originated from a 24-hour hackathon and refined through continuous playtesting」——**项目的起源故事**写进条目。
- **What people say 证言区** + Partners 区——第三方声音进档案。
- "What's Happening Today?" 问候式栏目标题。

## 3. 网页内容
Harshit Khemani，19 岁创始人型开发者（AI/设计/生产力系统）。区块序列：Hero（名字+What's Happening+宣言+年龄）→ Partners → Experience（Smash&Clash 游戏创业等，带起源叙事）→ Affiliates → Education → GitHub Activity 热区图 → Currently Listening → 证言 → 收尾。含 DOWNLOAD CV。

## 4. 交互
- 6 组 keyframes、**零 hover 规则**——动效只在入场与 canvas 热区图。
- 长滚动叙事（16 屏），无 fixed/sticky——纯文档流阅读。
- Spotify 卡实时刷新（外部 API 数据内嵌）。

## 5. 对我们的启示
- **取**：**"起源故事"写进项目条目**（youtube-vault-bridge 可写「源于某次看视频存不下来的晚上」——叙事证据）；**Currently Listening 式"此刻"件**（白纸版可做「正在读/正在做/正在听」——数据源可以是 DSH 会话流或手动状态，比热区图更有温度）；年龄+年限开场（白纸版：「22，与 AI 协作第 N 天」）；canvas 热区图方案佐证（G-20 同路线）。
- **不取**：16 屏无锚点的长度（必须有导航/分区）；DOWNLOAD CV（边界冲突）。
- **活人感件光谱**：状态行（R-16）< 时段问候（R-10）< Currently Listening（本站）——越右越"此刻"，维护成本也越高。
