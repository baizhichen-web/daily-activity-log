/* 构建后死链检查（工程票 #12）—— npm run build 最后一步。
   扫描 dist 里三类引用源，核对每个站内路径真实存在：
   1) *.html 的 href/src/srcset（vite 产物用双引号，兼容单引号）；
   2) llms.txt / llms-full.txt / sitemap.xml / robots.txt（AI-native 层）；
   3) *.md 副本里的链接。
   外部链接（http/https 指向别的域）不查——离线构建不做网络请求；
   以 SITE_URL 开头的绝对链接剥前缀后按站内路径查。 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(HERE, "../dist");
const SITE_URL = String(process.env.SITE_URL ?? "").replace(/\/+$/, "");

if (!fs.existsSync(DIST)) {
  console.error("[check-links] dist/ 不存在，先跑 vite build");
  process.exit(1);
}

/* ---------- 收集 dist 已有路径 ---------- */

const exists = new Set(); // "/rel/path" 形式
const walkFiles = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p);
    else exists.add("/" + path.relative(DIST, p).replaceAll("\\", "/"));
  }
};
walkFiles(DIST);
/* 目录式 URL："/foo" 命中 "/foo/index.html" 即有效 */
const dirIndex = new Set();
for (const p of exists) {
  const m = p.match(/^(.*)\/index\.html$/);
  if (m) dirIndex.add(m[1] || "/");
}
const has = (p) => exists.has(p) || dirIndex.has(p);

/* ---------- 归一化引用 ---------- */

const normalize = (raw, fromFile) => {
  let u = raw.trim();
  if (!u || u.startsWith("#")) return null; // 纯锚点
  if (/^(mailto:|tel:|data:|javascript:|blob:)/i.test(u)) return null;
  if (/^https?:\/\//i.test(u)) {
    if (SITE_URL && u.startsWith(SITE_URL)) u = u.slice(SITE_URL.length);
    else return null; // 外域，离线不查
  }
  if (!u.startsWith("/")) u = "/" + u.replace(/^\.\//, ""); // 相对路径按站点根解析（全部页面都在根下，查询参数路由）
  const clean = u.split(/[?#]/)[0];
  return clean === "" ? "/" : clean;
};

const refs = []; // { from, path }
const addRef = (from, raw) => {
  const p = normalize(raw, from);
  if (p) refs.push({ from, path: p });
};

for (const p of exists) {
  const abs = path.join(DIST, p.slice(1));
  const text = fs.readFileSync(abs, "utf-8");
  if (p.endsWith(".html")) {
    for (const m of text.matchAll(/(?:href|src)\s*=\s*"([^"]+)"/g)) addRef(p, m[1]);
    for (const m of text.matchAll(/(?:href|src)\s*=\s*'([^']+)'/g)) addRef(p, m[1]);
    for (const m of text.matchAll(/srcset\s*=\s*"([^"]+)"/g))
      for (const cand of m[1].split(",")) addRef(p, cand.trim().split(/\s+/)[0]);
  } else if (p.endsWith(".txt") || p.endsWith(".md")) {
    /* 只认 markdown 链接 ](url) 与裸绝对 URL——正文普通括号 (RED) 不是链接 */
    for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) addRef(p, m[1]);
    for (const m of text.matchAll(/https?:\/\/[^\s)\]<>]+/g)) addRef(p, m[0]);
  } else if (p.endsWith(".xml")) {
    for (const m of text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) addRef(p, m[1]);
  }
}
if (fs.existsSync(path.join(DIST, "robots.txt"))) {
  for (const m of fs.readFileSync(path.join(DIST, "robots.txt"), "utf-8").matchAll(/^Sitemap:\s*(\S+)\s*$/gim))
    addRef("/robots.txt", m[1]);
}

/* ---------- 核对 ---------- */

const missing = [];
const seen = new Set();
for (const { from, path: p } of refs) {
  const key = from + " → " + p;
  if (seen.has(key)) continue;
  seen.add(key);
  if (!has(p)) missing.push(key);
}

if (missing.length) {
  console.error(`[check-links] ✗ ${missing.length} 个站内引用在 dist 中不存在：`);
  for (const m of missing) console.error(`  - ${m}`);
  console.error("\n排查：media/docs 文件是否进了 public/；生成器拼的路径与实际产物是否一致；查询参数路由目标页是否单独产出。");
  process.exit(1);
}
console.log(`[check-links] ✓ ${seen.size} 个站内引用全部命中（dist 内 ${exists.size} 个文件）`);
