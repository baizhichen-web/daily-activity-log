# design-system — AI native 设计系统（BST）

> 状态以飞书看板为准。母体：resume-portfolio（个人站=首个消费方）；方法依据：`studio/VIBE-DESIGNING.md` + `studio/design/Design.md`（决策宪法 v2）；过审过程档已归档 `temp/archive/2026-08-31-Design-过审议程.md`。
> 一句话（白纸 2026-08-31 定调）：**把 AI 新生材料（skills 规则/组件库 registry/检测器/生成物经验）与传统 Figma 组件生态（SDS/M3/Variables）融合进同一个设计系统——它既是人看人调的设计工具，也是喂给 AI 的可分享上下文。**

## 核心命题（理论轴）

设计系统本是设计团队的规范工作方式。AI 加入个人设计者之后，**协作接口长什么样**？本项目的回答：三层介质一套系统——
- **Figma**（可视化事实源）：人看、人调、可分享——白纸的原子五层实践；
- **声明文档**（决策宪法）：Design.md（品牌决策）/ Components.md（元件+格式指南）/ Craft.md（通用工艺）；
- **tokens**（机器可读值）：Figma Variables ↔ `tokens.css`，AI 执行只走确定性数值，不靠"眯眼"。

## 原子五层架构（白纸蓝图 08-31）

| 层 | 内容 | 介质 | 状态 |
|---|---|---|---|
| **L1 基础元素** | 颜色/字体/特效/圆角/间距/常用数值 → Variables + styles | Figma `BST Tokens v1` 集合 + `tokens.css` 镜像 | ✅ **已落地**（08-31 白纸验收；76 变量+可视化页） |
| **L2 设计元件** | 元件集中一页="系统后台"，改动只在此页；清晰组合+命名+标记 | Figma 组件页 + Components.md | 待启（SDS/M3 消费链已验证） |
| **L3 格式指南** | 元件怎么用：hover/Tab 焦点/点击呼出等交互定义，写进指南 | Components.md do/don't + 每组件四态 | 与 L2 同批 |
| **L4 项目特殊元件** | 项目专用件不入通用系统，项目页单放 | MY WEBSIDE resume-portfolio 专页 | 翻页书页型元件（候补） |
| **L5 项目文件** | 引用系统做设计，按 user stories 分页 | 翻页书各屏 | resume-portfolio 主战场 |

迭代回路（VIBE 既有）：自动排版保回溯 → 新需求 → 讨论 → 回补元件库/指南/声明层。

## tokens v1.1 速览（详表在过审议程档）

灰阶 12 级（Once 实底·每档 AA 用途标注）· 纯白地面+墨黑强调（白纸拍板）· 项目色运行时注入位 · 热区图灰阶化 · 时代色保留 · Inter+思源黑+JetBrains Mono（sans-only）· 字阶 8 档含 display · 间距 4px 模数+**相邻跳变≥25%** · 圆角 6 档+嵌套公式 · 行高反比律+行长 34em · 字重仅 400/600/700/800 · 动效五档时长+reduced-motion。
数值法源：Once UI（命名骨架）/ refactoring-ui（尺度规则法）/ Tailwind v4（模数参照）/ Vercel vbg（语义命名）/ fluid-functionalism（弹簧三档）/ HIG（硬底线）——**借结构规则与已拍色值，不借他人色相**。

## 资产地图

- **Figma**：MY WEBSIDE `lspIyYnJDLjIM7kmDT3Xgu`（本系统主战场）；库=SDS（网页段落件）+ M3（平台件）；操作通道=**Claude Code 子代理**（规范见 `../figma-agent-打通/FIGMA-MCP-USAGE.md`，13 坑+红线必读）
- **代码**：`resume-portfolio/web/src/styles/tokens.css`（Figma 导出后覆盖苔绿旧版）
- **参考家底**：`studio/projects/resume-portfolio/input/设计参考-素材库与工具索引.md`（I-02~I-15）+ Eagle「素材库与工具」夹

## 组件生产规范（2026-09-01 固化）
**先搜库（双通道），后动手**：新元件按序执行 ①Figma 库（SDS/M3，search_design_system）②Web/registry（react-bits 本地/beUI·rare-ui·Magic UI registry/shadcn）→ 评估 → 记录决策于元件条目 → 双侧无合适件才自建。白纸 2026-09-01 指正：组件库是拿来用的，不是摆设。

## 红线

动 MY WEBSIDE 白纸手工内容前先问；发布团队库无程序化通道（要发布给白纸手动步骤）；数值唯一源=Figma Variables，文档侧只引用不重复；一切视觉决策受 Design.md（宪法）+ 基因库（封闭）管辖。

## 里程碑

1. ✅ L1：tokens v1.1 已写入 Figma（76 变量+可视化页，白纸验收通过）→ tokens.css 已导出（`resume-portfolio/web/src/styles/tokens.css`，含旧名兼容段）
2. ✅ Design.md v2 落盘（决策宪法，指向 L1 实物）
3. ⏳ L2+L3：元件页+格式指南（翻页书所需组件优先）
4. ⏳ 自有 design skill（终局打包：薄 skill+厚声明指针，等过审+MVP 验收蒸馏）
