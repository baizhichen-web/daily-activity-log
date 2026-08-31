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

### page-page-indicator（示例条目）
- **用途**：翻页书顶部中央——"第 N 页 · 内容名"，替代常规导航
- **令牌**：bg-page / color-ink / color-faint / mono（fs-l2）；数据源=当前屏 index（App 级状态）
- **四态（L3 要求）**：静止=faint 灰页号+ink 当前页 · 翻页过渡=随翻页滑换 ≤300ms · 焦点=Tab 可达、focus ring=ink 描边 · 禁用=无
- **动效纪律**：与页面翻动同源触发；transition 可打断；reduced-motion 只留淡切
- **红线**：永远中性色（项目色作用域外）；字号固定档位不得自行缩放
- **🤖 AI 注记**：层级=尺寸+字重（Craft 四·2）；光学对齐（四·5）；AA 对比度（Craft 一·1）
- **来源**：R-06 Trestle 录屏拆解 + HIG 反馈/加载篇 + G-30 括号编号件

## 4. 区块模板（每件必含）
用途 / 令牌 / 四态（静止·过渡·焦点·禁用）/ 动效纪律 / 红线 / AI 注记 / 来源
全文禁数值重复：一律 `var(--xxx)` 引用，改值回 Figma Variables

## 待办
- [ ] 🤖 白纸圈定 P0/P1 首轮范围（建议 P0 五件先行）
- [ ] 经 Claude 子代理在 MY WEBSIDE 建「DS L2 · 元件后台页」（SDS/M3 实例化+自有件+四态帧）
- [ ] 逐件补全条目（与 Figma 页同批）