# Craft.md — 设计声明 · 通用级（v0.2 过审草案）

> 状态：**草案**（2026-08-31 起草，逐条待白纸过审；🤖=待你表态，[源]=作者/出处，✅A=白纸已拍决策）· 属 VIBE-DESIGNING.md 第三章
> 回答什么：超越单个产品的**通用体验原则与反例**——一眼判错的条目；"怎么判断好坏"的家（Design.md v2 B 指针指向此处）
> 填法：经真实设计任务检验后定稿 + 白纸拍板逐条过审
> 来源注：refactoring-ui（B 路线文档）/ HIG（Apple 人机界面指南 173 页全文已爬）/ Vercel design.md / KAWAI（《毕业 AI 味 UI》）/ Impeccable（64k★ 检测器仓库）/ Emil Kowalski skills（已装）/ jakubkrehel（Libraries 工艺 skill，二源合并对象）/ fluid-functionalism（弹簧三档）

## 一、硬底线（数值依据：temp/hig-corpus；Design.md v2 引用）

1. **正文对比度 ≥4.5:1**，大字/粗体 ≥3:1（[HIG Accessibility]）；我的可用灰阶最低档 = gray-500（4.61:1 已实算）——faint 禁低于此档
2. **字号支持 200% 放大不破版**（[HIG]）
3. **信息不靠颜色单通道**（配形状/文字/纹样）（[HIG]）
4. **reduced-motion 全局降级**：位移动画→淡入淡出、弹簧收紧（[HIG Motion]）
5. **开场/加载**：占位尽快显示（不空白等待）；splash 合法但**短 + 可跳过**、不等动画完才可操作（[HIG Loading/Launching + 白纸 loader 纪律]）
6. **动效可打断**：交互态状态切换用 transition（可中途打断），一次性段子才用 keyframes（[Emil][jakubkrehel][HIG]）
7. **控件最小可点区**约 28px 最小档（[HIG Accessibility·iOS 参照]）
8. **键盘可达 + 焦点可见**；源顺序=阅读顺序（[Vercel][HIG]）

> **【🤖 HIG 转正条款】候选第一参考标准，待白纸口令**：转正后本节为 Craft 第一条正典——通用体验判断先查 HIG 对应章节（动效→Motion、加载→Loading、无障碍→Accessibility），再查本节以下条目；HIG 只管"怎么做好"，不统治品牌视觉（Design.md 领地）。

## 二、反例总表（一眼判错）

**排版与结构**
- 大写全宽追踪 eyebrow/kicker 滥用（[Vercel]）
- 卡片套卡片；一切皆卡（[Vercel/Impeccable]）
- 居中 hero + 卡片阵列的模板味（[Vercel]）
- 标题上方圆角图标块（[Vercel]）
- 假对称/凑满栅格（[Vercel]）
- 相邻字号尺度无序混用（16 与 18 邻居）（[refactoring-ui]→tokens 跳变律兜底）

**色彩（黑白时代）**
- 灰字压彩色底（[Impeccable]）；纯白之外**大面积**纸黄/米色底（[✅A 08-31：暖只走项目色]）
- 项目色外溢全局（导航/页码/全局文字）（[✅A 08-31 Design A2 作用域]）
- 装饰渐变/发光/blob/玻璃拟态（[Vercel]）
- 弹跳/橡皮筋缓动（[Impeccable]）
- 荧光笔彩色高亮块（[✅A 08-31 弃]）
- 仅靠色差区别状态（红绿/蓝橙）（[HIG]）

**字体**
- Inter 当无脑默认——本项目已豁免（作品集人格连续，理由见 Design.md A3），此条保留为通用提醒（[Impeccable]）
- meta/标签无 mono 声部（[Design 旧规延续]）
- 衬线在 Backlog 期提前进场（[✅A 08-31 serif 禁]）

**内容与数据**
- 装饰图表/假截图/库存图/英雄图硬塞（[Vercel + 零假数据]）
- 同义反复的 summary/recommendation 节（[Vercel]）
- 宣言空话（[深度调研"明确不取"]）

**交互与动效**
- 无目的动效/装饰动画/hover 大戏/常驻跑马灯/打字光标模拟（[Emil][Vercel]）
- 阅读被动画门控（[HIG Motion][✅A loader 短+可跳过]）
- 自研手势替换平台惯例（[HIG]）

## 三、判断工具（给"怎么评"用）

- **每屏五问**（[KAWAI，白纸已裁决归位]）：①信息顺序对吗？②主操作明显吗？③余白有意图吗？④用的都是 Components 里的件吗？⑤空态/错误态想过了吗？
- **眯眼测试**：眯眼看整屏——主体一眼突出、阅读路径稳定（[Vercel]）
- **文字遮罩测试**：模糊文字只看灰度块——层级仍在说话（[Vercel]）
- 深读评审序（可选参考）：首读→语言→构成→排版→证据→克制→主题与重排→信任与无障碍（[Vercel]）

## 四、工艺规则（refactoring-ui × jakubkrehel 二源合并 · 逐条待审 🤖）

| # | 条目 | 源 | 建议处置 |
|---|---|---|---|
| 1 | 尺度相邻档跳变 ≥25% | refactoring-ui | ✅ 吸收（已入 tokens 间距律） |
| 2 | 层级三手法：大小/粗细/颜色（灰阶度） | refactoring-ui | ✅ 吸收（黑白时代颜色→灰阶 100→500 档） |
| 3 | 好色板浮于冷暖灰、不用纯灰 | refactoring-ui | ✅ 吸收为原则：灰可带微暖倾向（tokens 值仍纯中性，待处）🤖 |
| 4 | 圆角嵌套公式：外角=内角+padding | jakubkrehel | ✅ 吸收（已入 tokens 注） |
| 5 | 光学对齐优先于几何对齐 | jakubkrehel | ✅ 吸收 |
| 6 | 阴影造层级、边框表结构 | jakubkrehel | ✅ 吸收（黑白时代最实用的一条） |
| 7 | 可打断动画（transition 优先） | jakubkrehel/Emil | ✅ 吸收（入硬底线 6） |
| 8 | 入场 stagger ~100ms、频繁交互不 stagger | jakubkrehel | ✅ 吸收（动效注） |
| 9 | 诊断表（间距/层级问题定位） | refactoring-ui | 参照（Evaluator 引用） |
| 10 | 流程七步 | refactoring-ui | ❌ 不采纳（流程归 VIBE 1.3） |
| 11 | 其 tokens.css 冷灰蓝色相资产 | refactoring-ui | ❌ 不采纳（只借规则，色值守 Design/tokens） |

## 五、动效决策链（收录引用；细则在 VIBE 与 spring.ts）

- **决策顺序**：该不该动→目的→工具→属性→曲线与时长→打断→出场（[Emil animate]）
- 弹簧三档 0.08 / 0.16 / 0.24s，**出场快于入场**（[fluid-functionalism]）
- 页级动效预算 ≤600ms（[✅A G-21]）

## 六、种子内容保留（工作空间工具链实践，2026-08-25 cinema-caption）
反例：挡住主要内容 / 常驻可见杂乱元素 / 迫使用户视线跳转 / 需学习成本的操作 / 为窄形态拉宽容器
原则：默认关闭可开关 / hover 显现不常驻 / 占位保留防跳动 / 关闭后行为与原版一致 / 操作可回退

## 待办
- [ ] 🤖 白纸逐条过审（重点：一·HIG 转正；四·合并表 11 条；二·反例表是否全收）
- [ ] 过审后升版 v1：去 🤖 标记、状态改"白纸已审"、列修订记录
- [ ] Evaluator.md 引用本节（硬底线+反例表+三·判断工具）