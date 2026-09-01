# Components.md — 设计声明 · 仓库级（重写草案骨格）

> 状态：**重写草案**（2026-08-31 起；首版 08-25 从旧静态站提取，其苔绿/纸白令牌已被 Design.md v2 + tokens 取代，作废）· 属 VIBE-DESIGNING 第三章
> 定位：**元件定义 + 格式指南（L3）**——元件组的清晰命名、用法、四态交互定义；与 Figma「元件后台页」（L2，MY WEBSIDE）**互为镜像**：Figma 放件、本文件写怎么用；令牌一律引用 Design.md v2 指针（Figma Variables / tokens.css），不重复写数值
> AI native 注记：每件写「🤖 AI 规则注记」= 适用工艺规则/动效纪律（Craft.md 引用：refactoring-ui/Emil/HIG 条目）

## 1. 元件分组与命名约定（白纸 L2 要求：清晰组合+命名+标记）
- 命名：`<组>-<件>`（英文小写连字符，Figma 同名同步）；组按职责：nav / page / card / text / state / data
- 标记体系：✅ 已定 · 🤖 建议待审 · ⏳ 待白纸供料

## 2. 元件清单（翻页书优先序，待圈定首轮范围 🤖）

**P0（翻页书骨架件，MVP 必须）**
1. `page-page-indicator` 页码指示器（顶部中央：页码+内容名）
2. `page-flip-container` 翻页容器（scroll-snap 一屏一页；Lenis 锁滚动）
3. `loader-motto` 座右铭载入屏（逐字渐显；短+可跳过；reduced-motion 瞬退）
4. `nav-overlay` 全屏菜单
5. `card-project` 项目卡（Behance 式大图占位槽+少字；G-21 展开挂载点）

**P1（简历页/信息页件）**
6. `state-pill` 状态胶囊（active 墨底反白，每条目最多一个）
7. `text-emphasis` 强调词（700/800 字重；括号编号 (01) 与方括号 [ ] mono 标签）
8. `data-stats` 数据带活数字（I-06 NumberFlow 参考；G-31 语法化数字碎片）
9. `data-heatmap` 热区图（灰阶五档；图例+年度计数）
10. `text-status-line` 状态句（"Accepting…"式，Domain 语义直通）

**P2（成长区/彩蛋件，backlog）**
11. `card-details` 展开卡（details 语法，G-21）
12. `card-polaroid` 拍立得证据卡伴行（G-31 碎片）
13. `data-era` 时代彩条（era 五色专用）
14. `nav-toc` 左缘刻度尺目录（G-23 候选）

## 3. 元件条目格式（每件一节，首件示例 👇）

### page-page-indicator
- **Web/registry 侧搜索**（2026-09-01）：shadcn Pagination（数字式，实现期抄写候选）· react-bits/beUI/rare-ui/Magic UI 均无"顶中页码+内容名"形态→ 数字样式借 shadcn/SDS，形态自建（示例条目）
- **用途**：翻页书顶部中央——"第 N 页 · 内容名"，替代常规导航
- **令牌**：bg-page / color-ink / color-faint / mono（fs-l2）；数据源=当前屏 index（App 级状态）
- **四态（L3 要求）**：静止=faint 灰页号+ink 当前页 · 翻页过渡=随翻页滑换 ≤300ms · 焦点=Tab 可达、focus ring=ink 描边 · 禁用=无
- **动效纪律**：与页面翻动同源触发；transition 可打断；reduced-motion 只留淡切
- **红线**：永远中性色（项目色作用域外）；字号固定档位不得自行缩放
- **🤖 AI 注记**：层级=尺寸+字重（Craft 四·2）；光学对齐（四·5）；AA 对比度（Craft 一·1）
- **库内搜索记录**（2026-09-01）：SDS Pagination×4（数字页号/列表/单页/前后，段落式零风格）→ **决策：页码数字部分以 SDS Pagination 为引用基底**（L2 v2 实例化换绑）；轮播圆点式库内无 → 自建
- **来源**：R-06 Trestle 录屏拆解 + HIG 反馈/加载篇 + G-30 括号编号件 + SDS Pagination

### page-flip-container
- **Web/registry 侧搜索**（2026-09-01）：react-bits Carousel/DepthCarousel（机制参考）· beUI cylinder-carousel · shadcn Carousel（实现期机制候选）· Magic UI 无对件→ 结构仍 scroll-snap 自建，翻页机制实现期抄 shadcn/自写（克制动效，DepthCarousel 炫技不采）
- **用途**：翻页容器——一屏一页（scroll-snap）+ Lenis 锁滚动
- **库内搜索记录**（2026-09-01）：M3 Carousel（Uniform/Full screen，移动范式自带风格重）→ **决策：形制参考**（"项+横滑"结构借鉴），容器骨架自建（frame+auto layout；scroll-snap 在 Web 实现）——库内无合适件
- **来源**：Product.md §8 + Baseline 规格（Lenis 定式已入 web/）+ M3 Carousel（参考）

### loader-motto
- **Web/registry 侧搜索**（2026-09-01）：react-bits SplitText/BlurText（I-02 MVP 指定参考，零依赖）· beUI chromatic-text-reveal/text-reveal（I-08 备选）· Magic UI morphing/aurora-text（偏花不采）→ 机制照旧抄 react-bits，仅渐显逻辑
- **库内搜索记录**（2026-09-01）：M3 Circular-indeterminate/Loading indicator、SDS Loader（均为"进度指示器"物种）→ **决策：不适用**——本件是座右铭 splash（HIG：splash 与 loading 指示器是两类东西；幕布内进度=填空条，Baseline 定式已在 web/ 实现）；M3 圆环件存为"未来内容区短时加载"候选
- **来源**：Product.md §8 逐字渐显拍板 + HIG Launching/Motion + react-bits SplitText（机制参考）

### nav-overlay
- **Web/registry 侧搜索**（2026-09-01）：react-bits FlowingMenu/InfiniteMenu/StaggeredMenu/BubbleMenu（结构件，FM 需翻译）· beUI bloom-menu/drawer/bottom-sheet · rare-ui family-drawer · Magic UI 无→ 菜单项基底 SDS Menu Item（Figma）+ 入场机制实现期抄 react-bits 任一（翻译/克制动效），容器自建
- **库内搜索记录**（2026-09-01）：SDS Menu set/Menu Item（段落级 slot）、M3 Navigation Drawer（App 风格）→ **决策：菜单项以 SDS Menu Item 为引用基底**（换绑）；全屏容器自建（库内无 fullscreen 件）
- **来源**：web/ MenuOverlay 沿用 + R-03 全屏菜单（截图 10）+ SDS Menu Item

### card-project
- **Web/registry 侧搜索**（2026-09-01）：shadcn Card（基础骨架，实现期抄）· react-bits ProfileCard/CardSwap（花样偏炫不采）· beUI tilt-card（hover 微倾斜候选）· Magic UI magic-card（hover 反馈参考）/bento-grid（项目网格布局参考）· rare-ui grid-reveal（入场渐现候选）→ Figma 基底 SDS Card Slot（已定）+ 代码实现期 shadcn Card 骨架
- **库内搜索记录**（2026-09-01）：SDS Card (Slot)=零自带风格最佳基底 / Card Grid Image=配图式 / Examples Portfolio=整页示例 → **决策：以 Card Slot + Card Grid Image 为引用基底**（实例化换绑）；Examples/Portfolio 形制参考；M3 卡（自带圆角表面色）不适用
- **来源**：Product.md §8 Behance 式占位槽 + G-21（R-27 平移）+ SDS Card Slot/Grid

## 4. 区块模板（每件必含）
用途 / 令牌 / 四态（静止·过渡·焦点·禁用）/ 动效纪律 / 红线 / AI 注记 / **库内搜索记录** / 来源
全文禁数值重复：一律 `var(--xxx)` 引用，改值回 Figma Variables

## 状态注记（2026-09-01 白纸裁决）
**元件设计整体挂起**——白纸对当前 Figma L2 页与 demo 呈现均不满意，决定不采用现状；元件实现时"由白纸另找参考再定"。本骨格文件保留结构模板与搜索记录，元件形态全部 ⏸ 待白纸参考。
- [x] 🤖 白纸圈定 P0/P1 首轮范围（08-31 批复：**按建议，P0 五件先行**）
- [x] 库内搜索评估（2026-09-01：五件逐件搜 SDS/M3，决策已回写条目）
- [x] 经 Claude 子代理在 MY WEBSIDE 建「DS L2 · 元件后台页」（P0 五件四态帧，首批；**L2 v2=引用基底件实例化换绑**：Pagination/Card Slot/Menu Item，2026-09-01 完成，自检截图 `temp/figma-l2-p0-v2.png`）
- [ ] 逐件补全条目（与 Figma 页同批）

## 5. 模板拆解区（指针，不在此展开）

元件挂起裁决（09-01）的后续：白纸指定把两站模板拆成基础元素→元件→组件做**可视化参考区**，与本文 14 件正文两轨并行、不混登：

- 施工总图（24 件候选+映射态+原子对照）：`studio/projects/design-system/template-decomposition.md`
- 机器清单（AI 按 id 点名调件）：`studio/projects/design-system/component-manifest.json`
- Figma 落位：MY WEBSIDE 新画布「模板拆解」（区块 20–23），命名 `TPL/<源>/<件>` 与六组正文件正交
- 转正通道：拆解件经白纸过目圈定后，`新件/映射` 态者按 §3 格式登记（届时元件挂起状态一并解冻复核）
- **09-01 建成**：Figma「模板拆解」54:7 共 17 件（magic 7+shared 1、ruixen 9、atoms 对照板），全绑 BST 变量、目检通过；圈定入口见施工档案 §5