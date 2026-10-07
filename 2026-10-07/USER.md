# USER — 用户与 GitHub 访问

> 用户身份与 GitHub/gh 访问方式。由 AGENTS.md 指针表「用户背景/GitHub 访问」分支触发。

## 用户信息

- GitHub: https://github.com/baizhichen-web
- 称呼: 白纸上
- 背景: 华侨大学工业设计本科毕业，2026 年入读北京师范大学未来设计学院研究生。方向偏硬件产品经理。

## GitHub 访问方式（Agent 可直接使用，不用再问用户）

- GitHub 用户名：`baizhichen-web`
- SSH 私钥：`~/.ssh/id_ed25519_dsh`（禁上传/打印/入库，见 AGENTS.md 红线·凭证）
- SSH 公钥已添加到该 GitHub 账号
- SSH 配置：`~/.ssh/config` 中 `github.com` 使用 `IdentityFile ~/.ssh/id_ed25519_dsh`
- SSH 认证已验证可用：

  ```bash
  ssh -T git@github.com
  # 预期输出：Hi baizhichen-web! You've successfully authenticated...
  ```

- Git 提交身份（本机项目级已配置）：

  ```text
  user.name  = baizhichen-web
  user.email = baizhichen-web@users.noreply.github.com
  ```

- 优先使用 SSH 方式推送/拉取：`git@github.com:baizhichen-web/<repo>.git`

## GitHub CLI（`gh`）

已安装并登录：account `baizhichen-web`，Git operations protocol: ssh，Token scopes: gist, read:org, repo。可直接使用 `gh repo create` / `gh issue` / `gh pr` / `gh release` 等 API 功能。不要向用户索要 GitHub Token / 密码，也不要让用户把 Token 发到对话里（见 AGENTS.md 红线·凭证）。

## 已知仓库

- `dsh-vision-fallback-bridge`
  - HTTPS: https://github.com/baizhichen-web/dsh-vision-fallback-bridge
  - SSH: git@github.com:baizhichen-web/dsh-vision-fallback-bridge.git
- `daily-activity-log`（每日产出自动归档，由 18:00 巡检任务提交推送）
  - HTTPS: https://github.com/baizhichen-web/daily-activity-log
  - SSH: git@github.com:baizhichen-web/daily-activity-log.git
