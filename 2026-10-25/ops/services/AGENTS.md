# ops/services/ — 常驻本地服务

> 运维层的常驻/本地服务，长期运行；与 `ops/scripts/`（一次性脚本）区分。

## 这是什么

- `text-catcher/` — 文字捕手：F2 唤起→捕获→写入 `bAI/bAI/raw/`（YAML frontmatter）；项目入口与文档见 `studio/projects/text-catcher/`，代码在此
- `dsh-remote/` — DSH 手机远程操控网关：签名链接+二维码+HTTP/WebSocket 反向代理（`ops/services/dsh-remote/start.cmd`，源码 `gateway.mjs`）
- `dsh-reminder/` — DSH→飞书手机提醒插件：监听会话事件→`lark-cli` 推送到飞书 P2P（部署于 `~/.dsh/profiles/web/` 的 `cordis.patch.yml` + `dshrm-1` 动态插件）

## 与相似目录的区别

- `ops/scripts/` 是一次跑完的脚本；`ops/services/` 是需启动后常驻的服务。
- `studio/projects/text-catcher/` 是立项与文档，本目录是代码实现；两者通过 `AGENTS.md` 互指，不重复。
- 本目录前身为 ops 下 tools（2026-08-21 更名）；旧文档中的旧名均应改指本目录 ops/services。

## 进入后第一步

- 先读 `ops/AGENTS.md` 与根 `AGENTS.md`；再读各服务的 `README.md`（启动/配置/故障说明）。
- 涉及安装/自启/端口/防火墙的变更，按根规范「安装与持久性变更必先报批」执行。

## 注意事项

- `dsh-remote` 涉及局域网端口与签名校验，勿暴露公网；`dsh-reminder` 依赖 `lark-cli` 可用。
- 运行时数据不落本目录，日志/统计见 `ops/reports/` 与 `ops/stats/`。
