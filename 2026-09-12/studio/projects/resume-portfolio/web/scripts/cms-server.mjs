// 启动 Decap 本地写入代理（本地后台用）
// 背景：Decap 的路径相对 **git 仓库根**（工作空间根），而本脚本位于站点子目录，
// 故显式把 cwd 设为仓库根再拉起 decap-server——这样 admin/config.yml 里
// 的 studio/projects/... 前缀才能正确解析。用法：npm run cms
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../../../.."); // web/scripts → …→ 工作空间根
const server = path.join(here, "../node_modules/decap-server/dist/index.js");

console.log(`[cms] repo root = ${repoRoot}`);
const child = spawn(process.execPath, [server], { cwd: repoRoot, stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
