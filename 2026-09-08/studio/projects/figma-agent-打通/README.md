# Figma-Agent 打通

> 项目级规范入口。状态一律以飞书看板为准（当前：进行中，P0-紧急，[看板记录](https://my.feishu.cn/base/URbrbJeWRa9ME4szDt8chJFlnJh)），本文件不维护状态值。

## 核心结论

- 目标（来自看板）：通过 Figma Agent 完成某一产品的 UI 设计测试——[AI Design 优先事项]
- 项目文档：https://my.feishu.cn/docx/NcVOdRH9yoATCrx0AGYcrcienmh
- **操作手册：[FIGMA-MCP-USAGE.md](FIGMA-MCP-USAGE.md)**——AI 在本工作区使用 Figma MCP 的权威文档（架构/fileKey 地图/SOP/13 坑位清单/红线），任何 Agent 做设计任务前先读它

## 接入进展

- **2026-08-24**：Figma MCP 官方远程服务完成配置（`mcp.figma.com/mcp`，OAuth 授权；本地 3845 Dev Mode 服务器经实测教育版无开关，判死备用）。
- **2026-08-26**：~~挂载失败判为间歇性网络问题~~ → **同日终审推翻**：真实根因=Figma 拒绝动态客户端注册（DCR 403，确定性），**ZCode 内直连两路全堵**。终局方案落地：Claude Code（官方支持客户端）作为设计子代理承接全部 Figma 操作，OAuth 由白纸交互式完成，whoami 全链路验收通过。详见操作手册。
- **2026-08-27**：实战验证完成——AntD 规范板建成（11 区块 59 组件帧）；白纸建 **MY WEBSIDE** 主文件并挂载 Simple Design System（1844 组件，网页设计主力）+ Material 3（357 组件）两库；AI 库消费链路（检索→导入→实例化→变量绑定）实测打通。
- **2026-08-29**：白纸宣布 Figma 测试阶段完成；经验沉淀为操作手册 [FIGMA-MCP-USAGE.md](FIGMA-MCP-USAGE.md)。
- 用途定位：Vibe Designing D8 定案的「Figma MCP 基础设施前置」，服务本项目的 UI 设计测试目标与 resume-portfolio V1 开发动线。

## Top 3 紧急项

1. ~~确认测试产品与 UI 范围~~（已定：MY WEBSIDE + SDS 库，服务个人网站）
2. ~~验证挂载与 OAuth~~（08-26 验收通过）
3. 下一单实战：用 SDS 组件跑 Vibe Designing 六步流程的首个设计任务（等白纸指令）

## 约定

- 产出物放本目录（input/ 原始素材、output/ 结果、notes/ 过程记录）
- 完成里程碑后更新飞书看板「进度」字段
