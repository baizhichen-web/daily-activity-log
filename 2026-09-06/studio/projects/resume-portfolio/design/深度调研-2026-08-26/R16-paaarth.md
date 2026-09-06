# R-16 paaarth.tech — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：暗色 Next.js 标准作品集——热区图独立成区、状态行置顶、hover 体系最密。

## 1. 加载方式与技术栈
- **Next.js（styled-jsx 哈希类 `jsx-7fb9e64c47d7e12f`）+ Tailwind**：16 个外链脚本 + 15KB 内联 JS、2 stylesheet + 52KB 内联 CSS。
- 字体：GeistSans + GeistMono + Inter（Vercel 系三件套）。
- canvas×1（Hero 流体渐变横幅）、SVG 33 个、图片 5 张 PNG（4 lazy）。
- 暗底 rgb(10,10,10)；页面 4600px（约 6.8 屏）；sticky×3 + fixed×1。

## 2. 设计巧思与组件
- **状态行置顶**：「COOKING SOMETHING」横幅在最顶——"正在做什么"是页面第一行（活人感件的位置学：状态比名字先出现）。
- **热区图独立成区**：「95 contributions in the last year」+ 月标签（Aug→Aug）+ Mon/Wed/Fri 行标 + Less/More 图例——GitHub 热区图完整移植（本批第 4 处：R-09/R-10/R-16/R-17）。
- **等宽字 meta 行**：「@pawrx0 · Maharashtra, India」用等宽字体——身份元数据做成终端参数的样子。
- **Hackathons 独立区块**：黑客松经历单列（学生开发者的"实战证据"专区）。
- **Resume 直链**：导航里放简历下载（我们边界是不放 PDF 全文，记录对照）。

## 3. 网页内容
Frontend Engineer（Maharashtra, India，AI 工具方向）。区块序列：状态横幅 → Hero（名字+一句话+社交）→ 热区图 → About → Stack（Next.js/React/TS/Node/Tailwind/Python/C++…）→ Projects（TruthLens / Pievot / minicli / IMÁGENT）→ Hackathons → Contact → "Let's work together" 收尾。

## 4. 交互
- **hover 规则 52 条（本批最密）**：卡片/链接/项目行的 hover 反馈是主要动效语言；keyframes 仅 2 组。
- canvas 流体渐变横幅（Hero 视觉）；热区图横向滚动容器（overflow-x-auto）。
- 3 个 sticky（导航/侧栏/进度类）。

## 5. 对我们的启示
- **取**：**状态行置顶**（我们可在 Hero meta 区加「正在做：北师大入学准备 / 个人站 v2」类状态——比"最近更新"更活）；**热区图图例与年度计数**（"N contributions in the last year" 的数字摘要句式，G-16 实现时抄）；等宽 meta 行（我们已有同类基因）；Hackathons 专区思路（竞赛/工作坊证据单列——白纸的毕设/国奖可类比）。
- **不取**：暗底（我们是暗面 Hero+亮面主体的混合，不整页暗）；Stack 罗列式技能清单（形容词化，证据力弱）。
- **数据点**：热区图月标 Aug→Aug（滚动 12 月窗口）而非自然年——G-16 可选"近 12 个月"窗口。
