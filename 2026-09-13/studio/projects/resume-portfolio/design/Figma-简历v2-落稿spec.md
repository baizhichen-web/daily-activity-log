# Figma 落稿 spec · 简历页 v2 全量内容 + tokens 规范（2026-09-13）

> 执行者：Claude Code 子代理（经 Figma MCP）。发起人：ZCode 主会话。
> 目标：把**当前线上简历页的完整内容与排版**在 Figma 里重建为可微调的稿（旧 `sec-resume-doc` 138:7 已过时，本稿替代之）；同时产出本节 tokens 规范。
> 白纸用途：在 Figma 里直接微调文案/间距/字号 → 后续 round-trip 读节点回写代码。

## 0. 目标位置

- **Figma 文件**：`lspIyYnJDLjIM7kmDT3Xgu`
- **页面**：`30-首页排版稿`（node 126:7）
- **新 frame**：`resume 简历 · v2（2026-09-13 全量）`，x=0，y=6200（避开 y4400 一带的旧稿与 Frame 3），宽 **1440**，auto-layout 纵向，白底
- 落位后先盘点该页已有节点坐标，若 6200 起有冲突则下移到空档，并在回报里说明最终坐标

## 1. 数据源（三个文件都在工作区，先读再动手）

| 文件 | 取什么 |
|---|---|
| `studio/projects/resume-portfolio/web/src/data/resume.ts` | 全部文案（**zh 版逐字**，含标点；不得改写、不得总结） |
| `studio/projects/resume-portfolio/web/src/styles/tokens.css` | token 名与值（颜色/字号/圆角/间距） |
| `studio/projects/resume-portfolio/web/src/demo/flipbook.css` | 简历页各区块的实际排版值（字号/行高/间距/发丝线）——`.fb-identity*` `.fb-sec*` `.fb-prose` `.fb-row*` `.fb-awardrow` `.fb-course*` `.fb-doccard*` 等类 |

内容取舍：**只要 zh 主文**（EN 变体在 resume.ts 里，不入稿）。§3/§4 用**展开态明细**，§7 用**展开态全文**（引言+两条引文+完整两段）——稿要承载全部信息供微调，收起/展开的交互态在代码里，不在稿里。

## 2. 结构（frame 内从上到下）

1. **身份块**（Frame 3 规范，白纸手稿定稿）：头像圆 90（可用灰色占位圆+「头像」字样）→ 姓名「陈柏志」26px 黑体加粗 → 角色「设计专硕研究生在读」16 mono → meta 两行（政治面貌/外语、联系方式/邮箱）16 mono → 定位句两段 18 mono/1.75 → GitHub 热区图占位块（灰底圆角矩形 + 「GitHub 贡献热区图 331 contributions」字样）
2. **§1 关于**：6 段正文（衬线 16/1.75）
3. **§2 专业之外**：引言 1 段 + 4 词条（标题+正文）
4. **§3 实习经历**：2 条目（名称+职务+期间+职责行）
5. **§4 其他项目经历**：5 条目（同 §3 结构，含论文条目的英文题名与 DOI 行）
6. **§5 获奖**：「设计获奖」8 行 + 「荣誉获奖」9 行（年月+名称+详情）
7. **§6 部分课程成绩**：4 组（组名+课程名+分数）
8. **§7 自我评价**：展开全文（引言 1 段 + 引文 2 条 + 完整两段）
9. **§8 证明材料**：5 张卡（名称+「TRANSCRIPT · PDF」式副标 + 待上传标注）

每节：`§ N` 编号 + 节名 + 发丝分隔线（1px，hairline 色），间距取 flipbook.css 实际值。

## 3. Tokens 规范（两件都要做，做不了的降级并回报）

### 3a. Figma Variables（若 MCP 工具支持写入）
- 建集合 **`BST Resume Tokens v1`**，从 `tokens.css` 提取简历页实际用到的变量建 color 变量（命名保持 `--` 去掉的 kebab，如 `color-ink`、`bg-page`、`color-muted`、`color-faint`、`border-hairline`、`surface-card` 等）+ radius 变量；值与 tokens.css **逐一对齐**
- 能绑定就把稿内填充/描边/文字色绑定到对应变量；不能绑定就用原值落色，但变量仍要建

### 3b. 「Tokens 规范板」frame（无论如何都要，白纸要看的参考板）
- 放在主 frame 右侧（x=1560，y=6200），宽 ~520：色板卡（色块+变量名+hex+用途注释）· 字阶表（font family 栈/字号/行高/字重，衬线/黑体/mono 三组）· 间距阶 · 圆角阶 · 发丝线示例
- 每项标注「token 名 ↔ tokens.css 变量名」对照，供白纸对着调

## 4. 硬约束

- **零假数据**：待上传/占位的地方照原文标注（如「待上传」），不编造
- 全部用 auto-layout；命名语义化（`identity/name`、`s3/entry-1` 式）
- 不动页面里任何已有节点（只新增）
- 字体：中文黑体用 Figma 可用的 `Noto Sans SC`（缺则 Inter+系统中文回退并回报）；mono 用 `JetBrains Mono`（缺则 `Roboto Mono`/`Courier New` 回退并回报）；正文衬线用 `Noto Serif SC`（缺则 Georgia 回退并回报）。**Figma 里装不上字体就选最接近的可用字体并在回报里列缺口**

## 5. 自检与回报（必须）

- 落稿完成后对该 frame 截图自查：文字无溢出、层级无塌、颜色对 tokens
- 回报格式：
  1. 实际用到的 mcp__figma__* 工具清单（哪些写入工具存在/不存在）
  2. Variables 集合建了没有、变量数、绑定情况
  3. 主 frame 与规范板 node ID + 最终坐标
  4. 字体缺口清单
  5. 内容完整性核对：§1–§8 每节条目数（应为 6 段/4 词条/2 条目/5 条目/17 行/17 课/全文/5 卡）
