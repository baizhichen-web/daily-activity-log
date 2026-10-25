/* 个人网站一键部署（工程票 #12，工作区侧配套）—— 收敛四步人肉流程，消掉「忘带 SITE_URL」坑。
   用法: node ops/scripts/deploy-personal-website.mjs [--skip-smoke] [--message "deploy: xxx"]

   三仓职责（交接档 2026-10-14）：
     编辑源 = studio/projects/resume-portfolio/web/（改动经 issue→分支→PR→merge 进发布仓）
     发布仓 = temp/personal-website   → CF Pages 从它自动构建（面板变量 SITE_URL，merge 即触发）
     dist 仓 = temp/gh-pages-push     → github.io 渠道，由本脚本构建后同步推送

   步骤：断言两部署仓干净且在 main、远端正确 → ff 拉取 → 编辑源↔发布仓漂移检查
   （漂移=有人绕过 PR 直接改了发布仓，或发布仓 merge 了而工作区还没同步过来——都停）
   → 带 SITE_URL 构建（护栏 validate/build/check-links 全在里面跑）
   → 冒烟回归（4 页 console/EN 扫描，--skip-smoke 可跳）→ 同步 dist → 推送。 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WEB = path.join(ROOT, "studio/projects/resume-portfolio/web");
const PUB = path.join(ROOT, "temp/personal-website");
const DIST_REPO = path.join(ROOT, "temp/gh-pages-push");
const SITE_URL = "https://baizhichen-web.github.io";

const EXPECT_REMOTE = new Map([
  [PUB, "git@github.com:baizhichen-web/personal-website.git"],
  [DIST_REPO, "git@github.com:baizhichen-web.github.io.git"],
]);

const args = process.argv.slice(2);
const skipSmoke = args.includes("--skip-smoke");
const msgIdx = args.indexOf("--message");
const message = msgIdx >= 0 ? args[msgIdx + 1] : null;

const run = (cwd, cmd) => {
  const r = spawnSync(cmd, { cwd, shell: true, encoding: "utf-8" });
  if (r.status !== 0) throw new Error(`[${path.basename(cwd)}] ${cmd}\n${r.stdout}${r.stderr}`);
  return r.stdout.trim();
};
const fail = (msg) => {
  console.error(`\n[deploy] ✗ ${msg}`);
  process.exit(1);
};

/* ---------- 1) 部署仓状态断言 + 拉取 ---------- */

for (const [dir, expect] of EXPECT_REMOTE) {
  if (!fs.existsSync(path.join(dir, ".git"))) fail(`${dir} 不是 git 仓`);
  const branch = run(dir, "git rev-parse --abbrev-ref HEAD");
  if (branch !== "main") fail(`${dir} 当前在 ${branch}，须在 main 上部署`);
  const dirty = run(dir, "git status --porcelain");
  if (dirty) fail(`${dir} 工作区不干净：\n${dirty}`);
  const url = run(dir, "git remote get-url origin");
  if (!url.includes(expect.replace("git@github.com:", ""))) fail(`${dir} 远端是 ${url}，期望 ${expect}（勿推错仓）`);
  /* gh-pages-push 未设 upstream，显式 refspec；本地领先远端时 ff-only 会拒绝（先查为什么没推过） */
  run(dir, "git pull --ff-only origin main");
}
console.log("[deploy] ① 两部署仓 main 干净、远端正确、已拉取");

/* ---------- 2) 编辑源 ↔ 发布仓漂移检查 ---------- */

const EXCLUDE = new Set([".git", "node_modules", "dist", "preview.log", "src/data/githubHeatmap.json"]);
/* 分仓有意差异（两边内容就该不同，不算漂移）：README 各自说明本仓角色；
   cms-server.mjs 各自解析自己的仓库根；仓库版 .gitignore 多一行 temp/ */
const DRIFT_ALLOW = new Set([".gitignore", "README.md", "scripts/cms-server.mjs"]);
const snapshot = (base) => {
  const out = new Map();
  const walk = (relDir) => {
    const abs = path.join(base, relDir);
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const rel = relDir ? `${relDir}/${e.name}` : e.name;
      if (EXCLUDE.has(rel) || e.name === ".git" || e.name === "node_modules") continue;
      if (e.isDirectory()) walk(rel);
      else {
        /* 行尾归一化后再比（本机 autocrlf 检出 CRLF，工作区多为 LF，字节级差异全是行尾噪音） */
        const raw = fs.readFileSync(path.join(base, rel));
        const norm = Buffer.from(raw.toString("latin1").replace(/\r\n/g, "\n"), "latin1");
        out.set(rel, crypto.createHash("md5").update(norm).digest("hex"));
      }
    }
  };
  walk("");
  return out;
};
const webSnap = snapshot(WEB);
const pubSnap = snapshot(PUB);
const drift = [];
for (const [f, h] of webSnap) if (!DRIFT_ALLOW.has(f) && pubSnap.get(f) !== h) drift.push(f + (pubSnap.has(f) ? "（内容不同）" : "（发布仓缺）"));
for (const f of pubSnap.keys()) if (!webSnap.has(f) && !DRIFT_ALLOW.has(f)) drift.push(f + "（编辑源缺）");
if (drift.length)
  fail(`编辑源与发布仓有漂移，先走 issue→分支→PR 流程对齐：\n  ${drift.join("\n  ")}`);
console.log(`[deploy] ② 漂移检查通过（${webSnap.size} 个源文件一致；heatmap 为构建产物已豁免）`);

/* ---------- 3) 带 SITE_URL 构建（护栏全跑） ---------- */

console.log(`[deploy] ③ 构建（SITE_URL=${SITE_URL}，validate → tsc/vite → check-links）…`);
const build = spawnSync("npm run build", { cwd: WEB, shell: true, encoding: "utf-8", env: { ...process.env, SITE_URL } });
const buildOut = `${build.stdout}${build.stderr}`.split("\n").filter((l) => /\[validate\]|\[check-links\]|error|✓ built/.test(l));
console.log("    " + buildOut.join("\n    "));
if (build.status !== 0) fail("构建失败（护栏或编译报错），不部署");

/* ---------- 4) 冒烟回归 ---------- */

if (skipSmoke) console.log("[deploy] ④ 冒烟按参数跳过");
else {
  console.log("[deploy] ④ 冒烟回归（Python+msedge，4 页）…");
  const smoke = spawnSync(`python "${path.join(ROOT, "ops/scripts/personal-website-smoke.py")}"`, {
    cwd: ROOT, shell: true, encoding: "utf-8",
  });
  console.log(smoke.stdout.split("\n").filter((l) => l.startsWith("[smoke]")).join("\n"));
  if (smoke.status !== 0) fail("冒烟未过，不部署");
}

/* ---------- 5) 同步 dist → dist 仓并推送 ---------- */

for (const e of fs.readdirSync(DIST_REPO)) if (e !== ".git") fs.rmSync(path.join(DIST_REPO, e), { recursive: true, force: true });
fs.cpSync(path.join(WEB, "dist"), DIST_REPO, { recursive: true });
const changed = run(DIST_REPO, "git status --porcelain");
if (!changed) {
  console.log("[deploy] ⑤ dist 与线上完全一致，无需推送");
} else {
  const srcHash = run(PUB, "git rev-parse --short HEAD");
  const msg = message ?? `deploy: sync ${srcHash}`;
  run(DIST_REPO, "git add -A");
  run(DIST_REPO, `git commit -m "${msg}"`);
  run(DIST_REPO, "git push origin HEAD");
  console.log(`[deploy] ⑤ 已推送 github.io（${msg}，${changed.split("\n").length} 处变更）`);
}

console.log(`\n[deploy] ✓ 完成。双渠道：github.io 已推（~2 分钟后生效，验证前先等）；
  CF Pages 由发布仓 main 的 merge 自动构建（护栏已在 CF 构建里生效）。`);
