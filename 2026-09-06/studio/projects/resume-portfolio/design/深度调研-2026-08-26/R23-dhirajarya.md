# R-23 dhirajarya.in — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：白底标准作品集 + 四格状态徽章矩阵——把"我是谁/在哪/几年/在找工作"做成信息卡。

## 1. 加载方式与技术栈
- 18 外链脚本 + 53KB 内联 JS、1 stylesheet + 96KB 内联 CSS——中等偏重。
- 字体：Poppins（正文）+ **Dynalight（复古手写体做 logo "DA"）**；白底；7 图（SVG 优先，6 lazy）。
- 页面 2190px（约 3.3 屏）；1 sticky 导航。

## 2. 设计巧思与组件
- **四格状态徽章矩阵**：About 区用 2×2 信息卡——「India · Location」「2+ Years · Experience」「Full-Stack Web · Focus」「Open to Work · Status」——身份元数据卡片化，recruiter 扫一眼拿全关键事实。
- **Dynalight 手写 logo** 与 Poppins 正文的反差配对。
- 「Beyond the Code」收尾区（代码之外的人）——与「Behind the Code」对称命名。

## 3. 网页内容
Self-taught full-stack 开发者（Next.js/MERN/SaaS）。结构：导航（Work/Blog/Contact/Resume）→ Hero（👋 问候+定位）→ About（Behind the Code + 徽章矩阵）→ Tools & Technologies → Projects（BlogDrop / QueryMate / SmartForm / QuickFormX）→ Beyond the Code。含 Resume/CV 按钮。

## 4. 交互
- 12 组 keyframes、2 条 hover 规则、1 个动画元素——模板级动效。
- 无 canvas/video；徽章矩阵是静态卡。

## 5. 对我们的启示
- **取**：**状态徽章矩阵的"元数据卡片化"**（白纸版候选：「中国·泉州→北京」「设计本科→未来设计学院 26 级」「硬件 PM 方向」「AI 原生工作流」四格——把身份关键事实做成扫读卡，可放 Hero 下方或 About；是否采用待白纸裁决）；对称命名小趣味（Behind/Beyond the Code）。
- **不取**：模板脸（无记忆点）；Resume/CV 按钮（边界冲突）；👋 emoji 语气（与 HY-LAB 克制调性不符）。
- **对照价值**：徽章矩阵 vs R-18 状态行 vs R-20 状态三合一——同一信息（身份+状态）的三种密度，我们按版面位置选型。
