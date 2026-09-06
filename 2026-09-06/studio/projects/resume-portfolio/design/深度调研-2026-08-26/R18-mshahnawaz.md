# R-18 mshahnawaz.me — 深度调研档案

> 调研：2026-08-26 · chrome-devtools 实测
> 一句话：暗底终端拟态——等宽字占 2/3 元素，「agent_host: active」状态行 + 求职状态明示。

## 1. 加载方式与技术栈
- 极轻：**1 个外链脚本**、2 stylesheet（18KB）、Inter + JetBrains Mono 双字体。
- **等宽字重度使用**：前 300 个元素中 199 个用 mono 字体——全站以终端语言为主声部，Inter 只做正文辅助。
- 暗底 rgb(9,9,11)；页面 2024px（约 3 屏）；1 个 sticky 导航；图片仅 1 张。

## 2. 设计巧思与组件
- **终端状态行**：「agent_host: active」——把"我在岗"写成服务进程的状态输出（比 "Available for work" 多一层工程师人格）。
- **求职状态明示**：「Seeking junior backend or AI engineering roles」直接写在 Hero——目标岗位不含糊（对 recruiter 零翻译成本）。
- **定位句式**：「I bridge the gap between deterministic backend systems and agentic AI models」——一句话讲清自己的生态位。
- Skills 按四类分区（Languages / AI-ML & GenAI / Web & APIs / Developer Tools）——分类而非堆砌。

## 3. 网页内容
Backend SWE（AI 基础设施 / FastAPI / MCP 工具链）。区块序列：导航 → Hero（名字+状态行+定位+求职意向+社交+View Resume）→ About → Experience（合同工 + 开源贡献者）→ Projects（ResumeXAnalyzer / MedAI / SmartLearn / Irrigo 智能灌溉）→ Skills 四类 → Education & Certs。结构完整传统，终端皮+简历骨。

## 4. 交互
- 13 条 hover 规则、1 组 keyframes、1 sticky——克制。
- 无 canvas/video；交互全在链接与卡片 hover。

## 5. 对我们的启示
- **取**：**状态行的进程化写法**（白纸版可玩「dsh_agent: running」「portfolio: v2 building」——与工作空间叙事互文）；**求职意向明示**（recruiter 快读路径的终点句——我们 Product.md 的 recruiter 读法可加一句目标明示，需白纸拍板）；定位句"桥接 A 与 B"句式（白纸版：「桥接设计判断与 AI 工程」候选）。
- **不取**：整页暗底+全 mono（调性冲突）；Skills 分类堆砌（证据力弱，我们用项目带技能）。
- **对照**：它是"传统简历结构 + 主题皮肤"流派——内容组织保守、视觉人格化；我们相反：结构创新（证据链）、视觉克制。两条路线它更安全，我们更有差异化。
