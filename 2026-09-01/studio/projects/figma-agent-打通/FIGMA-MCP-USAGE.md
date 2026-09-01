# Figma MCP 使用指南 — AI 操作手册

> **读者**：在本工作区干活的 AI Agent（ZCode / Claude Code / 其他）。**目的**：接到设计类任务时，按本文档直接用对工具、走对链路、避开已踩过的坑。
> 事实源层级：本文档（怎么用）← 记忆 `claude-code-subagent-setup` / `figma-mcp-endpoint`（现状）← git log / wiki log（变更史）。发现文档与实况不符时，以实况为准并回改本文档。

---

## 一、架构：谁干什么

```
白纸（说人话需求）
  └─ ZCode（主界面：分析、拆解、验收）
       └─ Claude Code（设计子代理，headless 驱动）
            └─ Figma 远程 MCP（mcp.figma.com，OAuth 已授权）
                 └─ Figma 云端文件（设计实操）
```

- **ZCode 内直连 Figma MCP 不可用**（动态客户端注册被 Figma 403 确定性拒绝，2026-08-26 终审）。所有 Figma 操作**必须经 Claude Code**。
- 驱动范式：`claude -p "<任务描述>" --allowedTools 'mcp__figma__*'`，**工作目录设为工作空间根**（Claude Code 的"工作空间"= 启动目录）。
  - ⚠️ **2026-08-31 实测修正（第 14 坑）**：旧写法 `--allowedTools 'mcp__figma:*'` 已被新版 Claude Code 拒绝（allow 规则不许 server 段通配，只许 `mcp__figma__` 前缀后的 tool 位通配，或逐工具全名列举如 `'mcp__figma__use_figma'`）。
- 模型档：默认 OpenCode Go（deepseek-v4-flash 主 / minimax-m2.5 辅）；切换百炼加 `--settings 'C:\Users\陈柏志\.claude\settings.bailian.json'`（qwen3.8-max 主 / qwen-flash 辅）。
  - ⚠️ **2026-08-31 实测**：默认档可完成 Figma 写任务（会打 `[claude-code:unrecognized_model]` 警告但链路通，警告待观察）；**bailian 档当日实报 `qwen3.8-max` unrecognized**（其顶层 `model=claude-sonnet-4-6` 与 dashscope base_url 冲突）+ 曾触发小图尺寸 API 错误（"height/width must be larger than 10"）——**修好前勿用 bailian 档跑 Figma**；子代理截图/验证元素尺寸保持 ≥10px 规避图像限制。
- 长任务分批跑（每批一个 `claude -p`，控制在 10 分钟内），`run_in_background` + 轮询；报告常被 `tail` 截头，**读输出文件全文或从转录捞**（转录在 `~/.claude/projects/<目录名改写>/<会话id>.jsonl`）。

## 二、资产地图（fileKey 速查）

| 资产 | fileKey | 说明 |
| --- | --- | --- |
| **MY WEBSIDE**（设计主文件） | `lspIyYnJDLjIM7kmDT3Xgu` | 个人网站设计用；已挂 SDS + M3 两库；白纸本人维护 |
| AntD 5 Spec Board（验证板） | `5hHk3iI634cZcJsVBkQm9y` | AI 自建的 AntD 规范速查板：11 区块 59 组件帧、11 色彩 Variables + 6 字阶。全是裸 frame（非 component），**只作参考，不作组件源** |
| Simple Design System 库 | （经 Add library 挂载） | **网页设计主力**：1844 组件，段落级 slot 组件（Hero/Pricing/Testimonial/Footer…） |
| Material 3 Design Kit 库 | （经 Add library 挂载） | 平台 UI 件（357 组件）；分层令牌教科书 |
| 团队 | 749842820's team | Full 席位（student），key `team::1355207215678936947` |
| 测试残留 | MY WEBSIDE 画布 3 个 MCP-Test 实例（2:129/2:146/2:156） | 链路验证证据，白纸可删，动其他内容前先问 |

社区 UI Kit 可选（白纸手动 Add）：Apple 系 iOS/macOS/watchOS/visionOS 各版。

## 三、工具面速查

Figma MCP（远程）可用工具约 19 个，常用的：

| 工具 | 用途 | 注意 |
| --- | --- | --- |
| `get_metadata` | 读文件/节点结构（XML 摘要） | 只读入口，先读再写 |
| `get_screenshot` | 截图验收 | 返回**短时有效** URL，须 curl 下载后 Read 目检；CC 会话内可能看不到图，要 ZCode 侧目检 |
| `get_variable_defs` | 读节点的变量绑定 | 空画布/无选中会报 "nothing selected" |
| `get_libraries` | 列已启用库 | 需要 fileKey |
| `search_design_system` | 库内搜组件/变量/样式 | **必须带 `includeLibraryKeys`，否则永远空**（第一坑） |
| `create_new_file` | 新建设计文件 | 返回 fileKey 要记下 |
| `use_figma` | 万能写入（跑 Figma 插件 JS） | 见第五节规矩 |
| `get_design_context` / `get_code` | 设计转代码 | 实现阶段用 |
| `generate_design` / `generate_diagram` / `generate_library` | 生成类 | 生成前先和白纸对齐意图 |

12 个 figma skills（figma-design-to-code 等）在 ZCode 内也可用（流程指导类，不依赖 MCP 连接）。

## 四、标准作业流程（SOP）

### 读（调研/验收）
1. `get_metadata` 摸结构 → 2. 需要看视觉就 `get_screenshot` → curl 下载 → Read 目检 → 3. 查令牌绑定用 `get_variable_defs`。

### 写（建令牌/组件/排版）
0. **组件生产必先搜库（双通道）**（2026-09-01 教训固化+白纸扩展）：任何新元件，①Figma 通道=`get_libraries`+`search_design_system`（SDS/M3，带 includeLibraryKeys）；②Web/registry 通道=react-bits（本地 temp/refs，目录即清单）/ beUI·rare-ui·Magic UI（registry JSON 在线拉）/ shadcn（名义清单，单件按需拉）。两头评估（形制是否匹配/可否换绑 token/或仅参考）→**记录决策**（引用/自建+理由）到该元件条目（Components.md 库内+Web 两行）；双侧均无合适件才自建。禁止跳过搜索直接自建。
1. 先读后写：动白纸的文件前 `get_metadata` 确认现状，**区块编号续接**（如 12、13…），不碰已有内容
2. 令牌一律走 **Variables**（单源），组件/色卡绑定变量，不写死色值（确需令牌集外的 spec 色可字面值，报告里声明）
3. 全部 auto layout；文字用 Text Style
4. 写完自检：只读脚本核对节点存在/尺寸/绑定 → `get_screenshot` 交 ZCode 目检
5. 报告固定四件套：fileKey 与 URL、已建清单、工具限制、截图 URL

### 消费组件库（SDS/M3）——已实测打通
```
search_design_system（带 includeLibraryKeys）拿到 componentKey
  → use_figma: figma.importComponentSetByKeyAsync(key)   ← 组件集用这个！
  → component.createInstance() → appendChild → 定位
  → get_variable_defs 验证令牌引用解析
```
选库口径：网页/段落级 → SDS；App UI/平台件 → M3。

## 五、坑位清单（每条都真踩过）

| # | 坑 | 正确姿势 |
| --- | --- | --- |
| 1 | ZCode 直连 Figma MCP 被 DCR 403 | 一律走 Claude Code 子代理 |
| 2 | `search_design_system` 裸查全空 | 必须传 `includeLibraryKeys` |
| 3 | 组件集 `importComponentByKeyAsync` 报误导性 "not found" | 组件集（component_set）用 `importComponentSetByKeyAsync`；该函数只认单组件 |
| 4 | `figma.teamLibrary.*` 导入不是函数 | 用顶层 `figma.importComponent*ByKeyAsync` / `importStyleByKeyAsync` |
| 5 | 无 SVG 导入 API | 图标用 `createVector()` 手写 path；复杂图形宁可占位+说明 |
| 6 | `layoutSizingHorizontal='FILL'` 报错 | 必须先 `appendChild` 挂到 auto-layout 父级再设 FILL |
| 7 | 虚线属性 | 此环境无 `strokeDashPattern`，用 `dashPattern` |
| 8 | `ELLIPSE` 不吃 auto layout | 圆形+文字居中用 frame 包裹 + 圆作绝对定位背景 |
| 9 | `figma.createFrame()` 默认 100×100 | 显式设尺寸/清填充 |
| 10 | 文字 `resize()` 会重置 `textAutoResize` 成 NONE 致不换行 | 固定宽文字节点改完后检查/重设 textAutoResize |
| 11 | 导入产生**本地组件副本**，源库更新不自动同步 | 库更新后旧实例需人工处理；重要设计记录导入时间点 |
| 12 | `claude config list` 挂起勿用 | 查状态用 `claude mcp list` / 读 `~/.claude.json` |
| 13 | `get_libraries` 报 fileKey required | 先有文件再查库（新文件 create 后才有 fileKey） |
| 14 | `--allowedTools 'mcp__figma:*'` 被新版 Claude Code 拒绝（08-31 实测） | allow 规则只许 tool 位通配：写 `'mcp__figma__*'` 或逐工具全名 |
| 15 | bailian 档 `qwen3.8-max` unrecognized + 小图触发图像尺寸 API 错（08-31） | Figma 任务暂用默认档；子代理无图像输入，**视觉验收必须回 ZCode/白纸做**；元素保持 ≥10px |
| 16 | 变量 scope 不显式设就绑不上/语义混乱（08-31） | 建变量即设 scope：color→ALL_FILLS(+STROKE_COLOR)、space→WIDTH_HEIGHT、radius→CORNER_RADIUS、type-size→FONT_SIZE、line-height→LINE_HEIGHT、weight→FONT_WEIGHT、motion→EFFECT_FLOAT |
| 17 | fontSize/lineHeight/fontWeight **不可绑变量**（08-31） | 排版类只能按 token 值直写（值仍以 Variables 单源）；只有 fill/radius/cornerRadius/gap/尺寸可 setBoundVariable |
| 18 | `node.verticalAlignItems` 不存在；`boundVariables` 读出是 `{type,id}` 对象非字符串（08-31） | HORIZONTAL 布局用 `counterAxisAlignItems`；核验绑定按对象结构读 |
| 19 | `lineHeight:{unit:'PERCENT',value}` 的 value 语义是「100=100%」，写 1.2/1.5/1.65 被当成 1.2% → 文字高度塌成 0（批① 16 个文字节点全中招，09-01 实测） | 行高值一律 ×100（1.65→165）；建板后自检「文字节点 height>0」，检测条件 `lineHeight.value<10 即疑似` |
| 20 | 本模型子代理无图像输入（坑 15 延伸）：Read 截图返回 Unsupported Image | 子代理只能做结构自检（节点数/零尺寸/绑定反查），**目检必回 ZCode curl+Read** |
| 21 | `get_metadata` 顶层页列表只返回第一页 | 枚举全页用 `use_figma` 只读脚本遍历 `figma.root.children`（实测有 Page1/DS L1/DS L2） |
| 22 | 填色/描边绑定 API 不是 node 方法（09-01 拆解批实测）：`node.setBoundVariableForPaint` 与 `node.setBoundVariable('fill')` 都不存在 | 填色走 `figma.variables.setBoundVariableForPaint(paint,'color',varObj)`（同步返回新 paint，回填 `node.fills`）；cornerRadius/itemSpacing/padding 才用 `node.setBoundVariable(...)` |
| 23 | `fontWeight` 属性只读；auto layout 新建 frame 自带白色 SOLID 填充；`counterAxisAlignItems` 不吃 'FILL'（09-01 实测） | 字重经 fontName 样式（Inter ExtraBold/Bold/SemiBold）；容器建完清填充或绑变量（否则白底穿帮）；子元素拉满用子级 `layoutSizingHorizontal='FILL'`（先 appendChild，坑 6） |

## 六、边界与红线

- **发布团队库无程序化通道**（MCP/插件 API 均无 publish）——需要发布时给白纸手动步骤：文件须在 Team project（不能 Drafts）→ Assets → Libraries → Publish。当前社区 Kit 直接 Add library 即用，发布只在自造令牌跨文件共享时需要。
- **Community 资源不能 MCP 直拉**，新增 UI Kit 要白纸手动 Add。
- **动白纸手工内容前先问**；AI 自建内容可自主管理但报告清楚。
- 教育版席位事实：Full seat / student 层级；本地 Dev Mode server（127.0.0.1:3845）无开关，别再试。
- 涉及二创/设计产出，遵守 `studio/VIBE-DESIGNING.md` 三硬规则（先稿后码、稿=验收基准、基因封闭）。

## 七、变更记录

- 2026-08-26：链路全通（CC 升级、双模型档、OAuth、whoami 验收）
- 2026-08-27：AntD 验证板建成；M3/SDS 调研；MY WEBSIDE 挂库；库消费链路实测打通
- 2026-08-29：本文档成稿（白纸宣布 Figma 测试阶段完成）
