# Craft.md — 设计声明 · 通用级

> 状态：**v1**（2026-09-01 白纸定稿：不综合、轻结构——HIG 作通用判断的唯一外部基准 + 一页自家拍板红线）· 属 VIBE-DESIGNING.md 第三章
> 定位：**通用体验判断的唯一入口**。怎么做好、怎么判错，先查 Apple HIG 对应章节，再查下方"白纸补充红线"。不复制 HIG 内容——全文本地档 `temp/hig-corpus/`（173 页），摘读与章节地图见 `studio/projects/resume-portfolio/design/HIG-摘读档案.md`。

## 一、HIG 适用章节索引（web 场景查这几章）

| 判断场景 | 查 HIG |
|---|---|
| 动效该不该加 / 怎么调 | Motion 篇 |
| 加载 / 开场 / 进度 | Loading + Launching 篇 |
| 对比度 / 字号 / 可达性 | Accessibility 篇 |
| 状态与反馈 | Feedback 篇 |
| 排版 / 层级 / 留白 | Typography + Layout 篇 |
| 控件 / 导航模式 | 对应组件章（用哪件查哪件） |

## 二、白纸补充红线（HIG 没有、我们拍的）

1. 零假数据；对外数字才入页（Product.md）
2. 禁手写日期（全站）
3. 色彩=黑白双层制，项目色不溢出全局（Design.md A2）
4. 座右铭 loader=短 + 可跳过（loader 纪律）
5. 动效预算 ≤600ms；reduced-motion 降级（G-21 / HIG Motion）
6. 文案：宣言空话、王婆卖瓜不写（性质条款）
7. 数值一律走 tokens，材料不硬写值（工程红线）

## 三、凭据

- **HIG 转正状态**：2026-09-01 白纸"先不转正"——本节索引作为 Craft 本体**生效**；"通用判断先查 HIG"的**制度化指针**暂缓，白纸改口随时转正。
- **更替记录**：v0.2 草案（反例总表/五问/双测/refactoring-ui×jakubkrehel 合并表 11 条）按白纸"不用综合"裁决不采纳，全文归档 `temp/archive/2026-09-01-Craft-v0.2-草案-归档.md`；其中已被 tokens 吸收的规则（间距相邻跳变≥25%、圆角嵌套公式、行高反比律、灰阶 AA 标注法）继续留在 tokens 注记，不丢。
- Evaluator.md 引用本节（索引 + 红线）执行验收。