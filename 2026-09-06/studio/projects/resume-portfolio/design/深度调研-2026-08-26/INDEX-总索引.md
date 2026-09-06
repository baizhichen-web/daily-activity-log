# 深度调研总索引 — 19 站全要素横向结论

> 调研：2026-08-26 · chrome-devtools 逐站实测（DOM/样式表/字体/动画/网络/滚动容器全要素探测）
> 逐站档案：本目录 R07-R25 共 19 份 · 上一轮扫描（截图+快照）：`input/设计参考-灵感扫描-2026-08-25/`
> 与上轮差异：本轮补齐**加载方式/技术栈/字体策略/动效预算/交互机制**五类硬数据，并修正上轮三处误读（见 §4）。

## 1. 逐站速览

| 站 | 技术栈 | 重量/长度 | 字体策略 | 核心巧思 | 档案 |
|---|---|---|---|---|---|
| R07 jackiezhang | **Framer 平台** | 77 请求/10.6 屏 | 10 家族拼贴 | 速写本人格+信念便利贴+切割垫标本区 | R07 |
| R08 momcilo | Vite 原生 JS | 6 图/单屏 | 单家族 | 省略号展开+天数计数器+hover 显影 | R08 |
| R09 fardeen | 静态+react-activity-calendar | 极轻/3.3 屏 | 系统栈 | 热区图门面+proof of work+双域名彩蛋 | R09 |
| R10 chanhdai | 静态全内联 | **873KB JS+366KB CSS**/16.7 屏 | 衬线+手写+Geist | 组件库即作品集+时段问候+事件流履历 | R10 |
| R11 ample | 自研 CSS Modules | 4 视频(R2)/内滚 | GeistSans | 左人右作品双栏+视频作品+cal.com | R11 |
| R12 harshdayal | Tailwind+WebGL | **零图片**/单屏双门 | 像素字体×2 | 双门受众分流（/minimal 与 /creative 两路由） | R12 |
| R13 devchauhan | 纯静态 | **<20KB 全站**/1.6 屏 | 系统栈 | 星标数前置+零外链脚本 | R13 |
| R14 monisazeem | 纯静态 | ~2KB/1.3 屏 | 系统栈 | 自嘲语气+数字证据直给 | R14 |
| R15 vivekupasni | 轻静态 | 2 图/1.75 屏 | SF Pro | **状态标签 (latest/archived)** 出处 | R15 |
| R16 paaarth | Next.js | canvas 横幅/6.8 屏 | Geist+Inter | 状态行置顶+热区图图例+52 条 hover | R16 |
| R17 khe.money | 轻脚本 | canvas 热区图/16.3 屏 | Instrument Serif | 起源故事+Currently Listening+年龄开场 | R17 |
| R18 mshahnawaz | 轻静态 | 1 图/3 屏 | Inter+JetBrains Mono | agent_host: active 状态行+求职明示 | R18 |
| R19 abhinav | GitHub Pages | **零图片零脚本**/6 屏 | EB Garamond | § 编号九章节+诚实写作 | R19 |
| R20 liri | 轻静态 | 2 图/6 屏 | Instrument Serif+Mono | **Life/Building now/Built/Next 四态**+复制邮箱 toast | R20 |
| R21 bikash | Next.js 系 | 模板件/4.2 屏 | Geist+Doto | 负样本：模板无记忆点 | R21 |
| R22 farix | 轻静态 | 20 图+4 视频/3 屏 | Inter | **Gallery 可玩交互小样**+自定义光标+每日日期 | R22 |
| R23 dhirajarya | 中等 | 7 图/3.3 屏 | Poppins+Dynalight | 四格状态徽章矩阵 | R23 |
| R24 maheshpawar | 轻静态 | 4 图/**2 屏** | Geist | 项目一句话差异点+下班人格 | R24 |
| R25 harshjdhv | 轻静态 | **零图片**/1.6 屏 | Inter+GeistPixel×5 | Updated 日期戳+图标字体化+价值观四词 | R25 |

## 2. 跨站模式（硬数据）

**热区图 5/19**（R09/10/16/17/21）：三种实现——react-activity-calendar（SVG，R09/21）、自研 canvas（R17）、表格/自定义（R10）。配图例+年度计数（"N contributions in the last year"）是标配。→ G-16 行业验证充分。

**状态/活人感件光谱**（成本从低到高）：
静态状态标签（R15）→ 每日日期（R22）→ Updated 构建戳（R25）→ 状态行（R16/18/20）→ 时段问候（R10）→ 下班人格段（R24）→ 实时"此刻"件（R17 Spotify）。

**字体趋势**：Geist 系 6/19（Vercel 生态扩散）；单/双家族为主流（12/19 ≤2 家族）；衬线展示体回潮（Instrument Serif ×2、EB Garamond、IBM Plex Serif）；极端反例 R07 十家族。**我们"衬线/纸感 + mono 元数据"双声部路线与 R17/R20/R10 同频。**

**加载策略三派**：全内联换首屏（R10：1.2MB HTML）、平台 CDN 分块（R07 Framer）、极简零依赖（R08/13/14/19）。我们 React 按需 chunk 属第四条路，无冲突。

**长度光谱**：2 屏（R24）↔ 16.7 屏（R10）；≤4 屏 9/19。**我们约 8 屏居中偏长——必须有锚点导航与清晰分区。**

**动效预算**：hover 规则中位数 ~4 条；keyframes 中位数 3 组；重视觉站（R12/22）动效集中在 canvas/光标而非 CSS。与我们 150-600ms 预算制同路。

## 3. 对我们站点的可执行清单（供 Product.md/后续层裁决）

**已验证应做**：热区图 G-16（含图例+计数句式）；状态标签 G-17；复制邮箱+toast；状态行/正在做；项目一句话差异点句式；数字前置；起源故事写进项目条目；信念钩子（主页一句+详情）。

**候选待裁决**：§ 编号章节 vs 现有区块命名；四格身份徽章矩阵；Life/Building now/Built/Next 四态结构；构建时 Updated 戳；价值观四词组；"可玩展区"（热区图 hover 当日详情）。

**明确不取**：全站自定义光标；像素字体/太空主题；Resume PDF 按钮（⚠️ 08-27 白纸裁决翻案：简历以链接跳转形式上站，4/19 站有此先例）；Stack 罗列式技能清单；宣言式空话（R21"Always building"类——白纸已否定）。

## 4. 修正上轮误读三处

1. **R09 彩蛋**：黑白→彩色不是页内切换，是**双域名孪生站**（fardeenmansoori.com ↔ fardeen.me）。
2. **R12 双门**：不是单页两区块，是**两条真实路由**（/minimal 与 /creative），落地页只有门。
3. **R11 结构**：右栏不是整页滚动，是**内滚容器**（body 不滚），左栏人物真常驻。
