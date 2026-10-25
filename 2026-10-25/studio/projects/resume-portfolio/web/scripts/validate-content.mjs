/* 构建期内容护栏（工程票 #12）—— npm run build 第一步，失败即构建失败（CF Pages 同享）。
   两类断言，都是历史上真实咬过人的：
   1) yml 结构审计：mini-yaml 对「序列项以引号开头 + 引号内含半角冒号+空格」的标量会误切成
      嵌套映射（2026-10 DOI: 10.x 事故：字符串数组里混进对象，React 直接 error #31 崩站）。
      误切分不落在语法层（解析不报错），所以用三张网从源文本与解析树两头夹：
      A1 源文本级——逐行找「引号开头的序列项，且首个闭合引号前含 」: 」精确命中即报（这是
         解析器必然切错的位置，零误报；不依赖后续结构）；
      A2 解析树级——key 含空白（内容系统的 key 一律是 Decap 标识符，含空格=被误切分剥了引号）；
      A3 解析树级——数组类型混杂（字符串与映射/null 混排，误切分最常见的落点）。
   2) EN 残留断言：resume.en.yml 全文 + writing/*.yml 的 en: 子树里不许出现白名单外的
      CJK 字符（票 #1 修过一轮，这里防复发）。白名单按「字符集覆盖 + 子串在场」双条件判定：
      含 CJK 的值必须①值中每个 CJK 字符都落在该文件白名单条目的字符并集内（防一条短白名单
      放行整句中文）②值中至少出现一条白名单子串（证明这是带引文/专名的值，不是碰巧字都认识）。 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseMiniYaml } from "./ai-native/mini-yaml.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.resolve(HERE, "../content");
const ALLOWLIST_FILE = path.resolve(HERE, "en-cjk-allowlist.json");

/* CJK 判定：汉字（基本区+扩展A+兼容）+ 假名 + CJK 标点 + 全角形式。
   EN 文本里这些出现即视为残留（全角空格/逗号句号也算——但可白名单，如日期对齐用全角空格）。 */
const CJK = /[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/;
const cjkChars = (s) => [...new Set([...String(s)].filter((c) => CJK.test(c)))];

/* ---------- 收集内容文件 ---------- */

const ymlFiles = [];
for (const dir of ["", "projects/", "writing/"]) {
  const d = path.join(CONTENT, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).sort()) {
    if (f.endsWith(".yml") || f.endsWith(".yaml")) ymlFiles.push(path.join(d, f));
  }
}
if (ymlFiles.length === 0) {
  console.error("[validate] content/ 下一个 yml 都没找到，路径不对");
  process.exit(1);
}

const rel = (f) => path.relative(CONTENT, f).replaceAll("\\", "/");
const violations = [];
const say = (file, where, msg) => violations.push(`${rel(file)}${where ? " " + where : ""}: ${msg}`);

/* ---------- 1) yml 结构审计 ---------- */

/* A1 源文本级：引号开头的序列项 + span内「第一个冒号」后跟空格 → 必然被误切分。
   只看第一个冒号：splitKV 的 key 类 [^:#] 跨不过任何冒号，只有首个冒号是切分候选
   （其后须跟空格或行尾才算 KV）——所以 https://doi.org/... 里无空格的冒号反而救场。
   span 终点=下一个同类引号（不处理 '' 转义，最多漏报不会误报）。 */
for (const f of ymlFiles) {
  const lines = fs.readFileSync(f, "utf-8").split(/\r?\n/);
  lines.forEach((line, idx) => {
    const m = line.match(/^\s*-\s+(['"])/);
    if (!m) return;
    const q = m[1];
    const rest = line.slice(line.indexOf(m[0]) + m[0].length);
    const close = rest.indexOf(q);
    const span = close >= 0 ? rest.slice(0, close) : rest;
    const colon = span.indexOf(":");
    if (colon >= 0 && /\s|^$/.test(span.slice(colon + 1, colon + 2)))
      say(f, `第${idx + 1}行`, `序列项引号内首个冒号后跟空格 → 会被误切分为嵌套映射：${span.slice(0, 40)}`);
  });
}

/* A2/A3 解析树级 */
const parsed = new Map(); // file → tree（供 EN 扫描复用）
for (const f of ymlFiles) {
  const src = fs.readFileSync(f, "utf-8");
  let tree;
  try {
    tree = parseMiniYaml(src);
  } catch (e) {
    say(f, "", `mini-yaml 解析失败 → ${e.message.split("\n")[0]}`);
    continue;
  }
  parsed.set(f, tree);

  const walk = (v, where) => {
    if (Array.isArray(v)) {
      const kinds = new Set(v.map((x) => (x === null ? "null" : typeof x === "object" ? "object" : typeof x)));
      if (kinds.has("null") && v.length > 0) say(f, where, "数组含 null 项（疑似空序列项/误切分）");
      if (kinds.has("object") && (kinds.has("string") || kinds.has("number")))
        say(f, where, "数组类型混杂（字符串与映射混排，疑似冒号误切分）");
      v.forEach((x, i) => walk(x, `${where}[${i}]`));
      return;
    }
    if (v && typeof v === "object") {
      for (const [k, val] of Object.entries(v)) {
        if (/\s/.test(k)) say(f, `${where}.${k}`, "key 含空白字符（内容系统 key 一律为标识符，疑似误切分）");
        walk(val, where ? `${where}.${k}` : k);
      }
    }
  };
  walk(tree, "");
}

/* ---------- 2) EN 残留断言 ---------- */

const allowlist = JSON.parse(fs.readFileSync(ALLOWLIST_FILE, "utf-8"));
/* 结构：{ entries: [{ file: "resume.en.yml", s: "　", why: "全角空格做日期对齐" }, ...]
   file 相对 content/；s=允许的 CJK 子串。判定见文件头注释。 */
const rulesByFile = new Map(); // rel(file) → { chars: Set, subs: string[] }
for (const e of allowlist.entries ?? []) {
  if (!e.file || !e.s) continue;
  const r = rulesByFile.get(e.file) ?? { chars: new Set(), subs: [] };
  cjkChars(e.s).forEach((c) => r.chars.add(c));
  r.subs.push(e.s);
  rulesByFile.set(e.file, r);
}

const scanEn = (file, tree, where) => {
  const rules = rulesByFile.get(rel(file)) ?? { chars: new Set(), subs: [] };
  const walk = (v, loc) => {
    if (typeof v === "string") {
      const found = cjkChars(v);
      if (!found.length) return; // 纯 ASCII 值与白名单无关
      const bad = found.filter((c) => !rules.chars.has(c));
      const hasSub = rules.subs.some((s) => v.includes(s));
      if (bad.length) say(file, loc, `EN 残留 CJK「${bad.join("")}」（白名单外） → ${v.slice(0, 40)}`);
      else if (!hasSub) say(file, loc, `含 CJK 但未命中任何白名单子串 → ${v.slice(0, 40)}`);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${loc}[${i}]`));
    else if (v && typeof v === "object") for (const [k, val] of Object.entries(v)) walk(val, `${loc}.${k}`);
  };
  walk(tree, where);
};

for (const [file, tree] of parsed) {
  const r = rel(file);
  if (r === "resume.en.yml") {
    scanEn(file, tree, "");
    continue;
  }
  if (r.startsWith("writing/")) {
    // 英文在同一文件的 en: 块里（content.ts 约定：只放可翻字段）
    if (tree && typeof tree === "object" && tree.en) scanEn(file, tree.en, "en");
  }
}

/* ---------- 汇总 ---------- */

if (violations.length) {
  console.error(`\n[validate] ✗ ${violations.length} 处内容违规：`);
  for (const v of violations) console.error(`  - ${v}`);
  console.error("\n处理指引：结构类→修 yml 写法（半角冒号+空格进标量必须整段正确加引号或改全角）；");
  console.error("EN 残留→翻译进 en 块，确属有意保留的在 scripts/en-cjk-allowlist.json 登记并写 why。");
  process.exit(1);
}
console.log(`[validate] ✓ ${ymlFiles.length} 个内容文件通过（结构审计 A1/A2/A3 + EN 残留断言）`);
