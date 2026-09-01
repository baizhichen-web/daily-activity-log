# 模板拆解区（Template Decomposition）— 施工总图

> 状态：**v0.1 施工草案（2026-09-01 AI 起草 · 🤖 待白纸圈定）** · 属 design-system 项目（L2+L3 支线）
> 定位：把两个网上模板（magic-portfolio / ruixen/portfolio）**拆成基础元素→设计元件→组件**，在 Figma「模板拆解」画布可视化呈现；可复用件经 BST 换皮后成为「另规划的 AI」可按名调用的元件。
> 三裁决（白纸 2026-09-01）：①只做两站；②**另起拆解区**（不混入 Components.md v2 现有 14 件正文，该文件只挂指针）；③**生成机器可读清单**（`component-manifest.json`）。
> 铁律：拆解区所有件**一律换绑 BST Tokens v1**（`--ink`/纯白/灰阶/字阶/间距/圆角）——模板的色值（Once UI cyan-red / shadcn oklch zinc）只是「来源示意」，绝不带进我方元件。禁数值重复：件条目引用变量名，不写死数值。

## 0. 两站家底速览（来源实证）

| | magic-portfolio | ruixen/portfolio |
|---|---|---|
| 技术 | Next.js 16 + **Once UI** 设计系统 + SCSS module | Next.js 15 + Tailwind v4 + shadcn 语义令牌（oklch） |
| 范式 | 多页路由：Home 居中宣言 → Work 卡列表 → About 简历流 → Gallery | **单页滚动**：信息流（名字+韦恩图）→ 贡献热力 → 项目手风琴 → 经历 → 大字标页脚；底部 dock 导航 |
| 组件源 | src/components（Header/Footer/ProjectCard/ThemeToggle…）+ @once-ui-system/core 库件（Avatar/Carousel/Button/Tag…） | components/（dock/skills-venn/testimonial/wordmark-footer/toc/pager/reveal-on-load…）+ features/（blog/contribution…） |
| 与我们 MVP | 撞名不撞心：它有页无「翻页书」 | 热区图（贡献热力）与我方 G-16 同物种，**可直接对照** |

## 1. 拆解区命名约定

- 画布：**「模板拆解」**（MY WEBSIDE 新 page，区块编号从 **20** 起：20-legend / 21-atoms / 22-magic / 23-ruixen）
- 顶层件命名 `tpl-<源>-<件>`：mp=magic-portfolio，rx=ruixen；Figma 显示名 **`TPL/<源>/<件>`**（与 Components.md 六组件 `page-*/card-*` 正交，一眼分家）
- 每个件 = 一个 auto layout frame（或 component 集），内含固定三层：
  1. **头**：`TPL/mp/pill-nav` + 徽章（映射态：`新件`/`映射→page-page-indicator`/`借结构`）+ 来源路径
  2. **示意**：真实结构复刻（auto layout + BST token 换皮）；多状态件并排画态（default/hover/expanded）
  3. **注**：槽位表（slot 名+类型+例值）+ 用法一句话 + 🤖 规则注记（引用 Craft.md/Design.md 条款号）
- 原子层（21-atoms）两栏对照：左=来源令牌系统**示意**（Once UI 三级语义 / Tailwind 语义组，色卡标来源值），右=对应 **BST 落点**变量名；箭头表映射，不表抄值
- 机器消费：本目录 `component-manifest.json`（稳定 id / 槽位 / 映射态 / Figma nodeId 回写）——「另规划的 AI」按 id 点名，ZCode 侧 `use_figma` 或白纸手动实例化

## 2. 拆解清单（v0.1 · 24 件候选 · 圈定=划掉不要的）

### 2A. magic-portfolio（8 件候选）

| 件 | 拆出物（元件/组件层级） | 槽位 | BST 映射 | 映射态 | 个人站用途候选 |
|---|---|---|---|---|---|
| TPL/mp/pill-nav | 顶部居中悬浮胶囊导航（icon+标签+active 反白药丸+主题钮） | pages[], activeIdx | radius-pill / surface-card / ink；active=墨底反白（≈Components #6/#1 的兄弟） | **映射→nav-overlay + page-page-indicator**（形借神换：MP 的 active 药丸喂「页码指示器」点击态） | 翻页书页指示器视觉基准 |
| TPL/mp/hero-statement | 居中大字宣言 + 灰从句副行 + 头像胶囊入口（三段式起手） | headline, subline, ctaChip{avatar,name,href} | fs-display / leading-tight / weight-800（座右铭 Hero=同构） | **新件** | 页 01 Hero 版式参照 |
| TPL/mp/featured-badge | 「标签 ┃ 灰话术」横排徽章行（vertical Line+mono 小字） | tag, caption | mono fs-l2 / border-hairline | **新件**（并入 hero 槽位亦可） | 项目页「招牌/进行中」角标 |
| TPL/mp/project-card-row | 左 5:右 7 图字分栏卡：轮播图 + 标题 + 摘要 + 团队头像组 + Read case study 箭头链 | media[carousel], title, summary, team[], link | card-project 的 list 变体；间距 space-5/6；文字 measure | **映射→card-project**（翻页书=一项目一页，MP=列表行；同一 content model 两种排法） | 项目清单页（若加总览页） |
| TPL/mp/gallery-masonry | 竖排大图流（横竖混排、无文字） | images[{src,orientation}] | 占位槽制 | **借结构** | 作品图墙（backlog 可玩展区） |
| TPL/mp/about-toc | 左侧目录（active 跟随滚动）+ 右侧分节流 | sections[], activeId | toc-thumb 同物种（rx 也有）→ **合并为 tpl-shared/toc** | **新件（两站共有）** | 长文页/简历页导航 |
| TPL/mp/og-share | 分享件（X/LinkedIn/复制链接按钮组） | platforms[] | Button 组 | 不采（V1 无社交分享需求） | — |
| TPL/mp/footer-social | 页脚：版权+署名链+右缘图标行 | year, credit, links[] | mono fs-l2 / faint；**红线：去模板署名** | **映射→尾页联系件** | 尾页骨架 |

### 2B. ruixen/portfolio（10 件候选）

| 件 | 拆出物 | 槽位 | BST 映射 | 映射态 | 个人站用途候选 |
|---|---|---|---|---|---|
| TPL/rx/dock-nav | 底部居中悬浮 dock：圆钮图标组+分隔线+状态点（active 高亮） | items[{icon,label,href}], activeIdx | radius-pill / hairline 描边 / 反白 active | **新件**（与 pill-nav 同槽竞争：顶指示器 vs 底 dock——拆解时并列给白纸看） | 翻页书全局导航备选 |
| TPL/rx/venn-skills | 四圆交叠韦恩图+中心头像（能力声明可视化） | center, {top,left,right,bottom} | 装饰性图；**二创红线**：中文圈层文案定稿后做 | **借结构** | 「设计×工程×AI」三角自我声明（首页彩蛋候选） |
| TPL/rx/contrib-grid | GitHub 贡献热力：**52 周×7 行**列式格子+月份标+起止日期+计数行 | days[{date,count}], range, legend | heatmap-1..5（我们已有同款五档） | **映射→data-heatmap 兄弟**：rx=滚动周视图/中性灰，BST=年历/墨阶；**两者都收进拆解区给 MVP 热区图做参照** | G-16 热区图版式升级参照（我们的 EvidenceBoard 即此物种） |
| TPL/rx/projects-accordion | 手风琴列表：icon+标题+期段行+chevron 展开出描述+skills 标签行 | items[{icon,title,period,end,skills[],desc}], defaultOpen | card-details（G-21）的列表版；chevron=项目色作用域① | **映射→card-details** | 项目「展开看细节」机制参照 |
| TPL/rx/experiences-timeline | 经历卡：建筑 icon+公司+外链箭头+期段+展开详情 | items[{org,url,period,role,detail}] | 同上手风琴形态复用 | 映射→card-details（简历页） | 简历页经历区 |
| TPL/rx/testimonial-spotlight | 评语聚焦卡（大引号+作者+期）+ 次要行卡 | quote, author, tagline, date | VoiceSlots 同物种（**零假数据**：无真实评语整块隐藏，rx 已支持空数组） | **借结构** | Voice 评语区（backlog，素材到位解锁） |
| TPL/rx/wordmark-footer | 页脚巨型字母标（姓名大字裁切出血） | text | fs-display 放大 / weight-800 / faint 描边感 | **新件** | 尾页收口视觉锤 |
| TPL/rx/reveal-on-load | 入场渐显机制（delay/duration 参数化） | — | dur-fast/base + reduced-motion 瞬退 | **借机制** | loader-motto 逐字渐显的推广版（页内元素级） |
| TPL/rx/toc-thumb | 右缘缩略目录轨（点即跳） | sections[] | 与 mp/about-toc 合并 tpl-shared/toc | 新件（共有） | 同 2A |
| TPL/rx/pulse-dot | 状态呼吸点（live 指示） | — | era 色作用域外/heat-5 | 借结构 | 状态行「正在做什么」的活体标记 |

### 2C. 原子层对照（21-atoms，不算件）

| 轴 | Once UI（MP 源） | Tailwind/shadcn（rx 源） | **BST 落点（唯一合法）** |
|---|---|---|---|
| 色彩语义 | `neutral-background-strong / on-background-weak / border-medium` 三级 12 档（实测 scheme-gray-100 `#0A0A0A` … 1200 `#F9F9F9`——BST 灰阶即其改名法+实底来源） | `--foreground / --muted / --border / --radius` 等 14 个语义槽（oklch 值） | `--gray-100..1200` + 角色层 `--color-ink/--color-muted/--color-faint/--border-hairline/--surface-card` |
| 圆角 | 组件 class `rounded-max/full/l/m/xs`（pill 当家） | `--radius: 0.625rem` 单源派生 | `--radius-xs..xl + --radius-pill` 六档+嵌套公式 |
| 字阶 | variant×size×weight 三维矩阵（heading/display/body/label/code × s–xl × 三级） | text-* 工具类（无系统） | `--fs-display..l3` 8 档 + weight 仅 4 档 |
| 间距 | `--spacing-*` 档位 class（gap/padding 同族） | Tailwind 默认刻度 | `--space-1..11`（4px 模数+跳变≥25%） |

> 拆解区色卡**只画 BST 档**；Once/shadcn 侧用一行灰字标「源值示例」供对照（如 Once UI gray-100=#0A0A0A ↔ BST gray-100 同源）。绝不把 cyan/red/oklch-zinc 当决策色画我方件上。

## 3. 施工批次与验收

| 批 | 内容 | 子代理任务要点 |
|---|---|---|
| ① | 20-legend（拆解区使用说明+命名法+红线卡）+ 21-atoms 对照板 | 建 page「模板拆解」；frame 全部 auto layout；文字用 Text Style；**变量 scope 规矩+fontSize 不可绑**照 FIGMA-MCP-USAGE 坑 16/17 |
| ② | 22-magic：8 件（含 pill-nav/hero/card-row 三重点件的多态画） | 逐件 get_screenshot→ZCode 目检；建为 component（非裸 frame），命名 `TPL/mp/*` |
| ③ | 23-ruixen：10 件（重点 dock/contrib-grid/accordion） | 同②；contrib-grid 用我方真实热区数据（133 会话/38 日）画一版示意 |
| ④ | 回写 `component-manifest.json` 的 figmaNodeId + 截图验收 | ZCode 侧完成 |

**验收标准**：① 每件套三层齐全（头/示意/注）；② 全 auto layout；③ 色/距/圆角零写死值（Variables 引用）；④ 截图目检无叠字无碎图；⑤ manifest id 与 Figma 显示名一一对应；⑥ 不碰画布 1–14 已有内容、不碰 BST Tokens 变量本体。

**红线**：拆的是结构与手法，**抄的是骨架不抄皮相**——MP 的 cyan 品牌色、rx 的 zinc 灰、字体（Geist/Inter 巧合相同除外）一律不带入；来源标注精确到文件路径（本文件 2A/2B 表已备）。

## 4. 与 Components.md 的关系

本文件为拆解区**施工档案**（design-system 项目内）。白纸圈定后，转正件（`新件`/`映射` 态中被点名的）在 `studio/design/Components.md`「模板拆解」追加节登记（按 §3 条目格式含双通道搜索记录），manifest 同步转正状态；`不采/借结构` 件留此归档即可。

## 5. 建成实况（09-01 凌晨五批施工完毕 · ✅ 目检通过 · 🤖 待白纸圈定）

- **page「模板拆解」54:7**；20-legend `55:7` / 21-atoms `56:7`（四轴×三列对照，BST 列全绑变量）
- **22-magic 64:11**：pill-nav `66:7` / hero-statement `66:57` / featured-badge `66:78` / footer-social `66:96` / project-card-row `72:55` / gallery-masonry `72:87` / shared-toc `72:106`；og-share 判「不采」未建
- **23-ruixen 85:7**：dock-nav `85:11` / flip-line `86:109` / venn-skills `87:7` / accordion-entry `88:38` / contrib-grid `97:26` / testimonial-spotlight `98:7` / wordmark-footer `98:33` / reveal-on-load `98:61` / pulse-dot `98:89`
- 实况修正三点：①§2B 的 experiences-timeline 未单建——与 accordion-entry 同机制，已并入其注记；②contrib-grid 真实矩阵实为 **24 周**（2026-03-02 起），非 27；③ruixen 无 mono 用 JetBrains 处均落 Atkinson Hyperlegible Mono（文件内可用字体）
- 子代理自检+ZCode 目检双轨：全卡三层齐、零尺寸 0、文字不塌（lineHeight×100 全避）、绑定反查无非 BST 决策色；截图八张存 `temp/`（清单见 manifest buildSummary）
- 施工新增坑 19–23 已回写 FIGMA-MCP-USAGE.md
- **下一步（白纸）**：Figma 内过一遍 → 圈定转正件（在 manifest 把对应 status 改 promoted 或口头指令）→ 点名「哪件套到翻页书哪一页」，AI 即可按 manifest 取件施工
