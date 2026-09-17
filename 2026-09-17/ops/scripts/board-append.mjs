/* 看板回写助手（2026-09-17）：把一段文本**追加**到某条记录的「描述」字段。
   为什么走 node 而不是直接敲 lark-cli：描述里带 <br> 与长文本，经 cmd 传参会报
   「此时不应有 <」。这里用 execFileSync（**不经 shell**、argv 数组直传）零转义。
   做法＝先 record-get 取现值，拼接后再 upsert —— 避免整格覆盖掉历史叙事。

   用法：node ops/scripts/board-append.mjs <record_id> <正文文件路径> [字段名=描述] */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

/* 真正的可执行体是这个 .exe；npm 的 lark-cli.cmd 在 Node 18+ 下不经 shell 跑不起来 */
const CLI = path.join(process.env.APPDATA ?? "", "npm/node_modules/@larksuite/cli/bin/lark-cli.exe");
const BASE = "URbrbJeWRa9ME4szDt8chJFlnJh";
const TABLE = "tblHQm7JwFc7bxGT";

const [recordId, bodyFile, fieldArg] = process.argv.slice(2);
if (!recordId || !bodyFile) {
  console.error("用法：node ops/scripts/board-append.mjs <record_id> <正文文件路径> [字段名=描述]");
  process.exit(2);
}
if (!existsSync(CLI)) {
  console.error(`[board] 找不到 lark-cli：${CLI}`);
  process.exit(2);
}
const FIELD = fieldArg ?? "描述";
const add = readFileSync(bodyFile, "utf-8").trim();
const common = ["--base-token", BASE, "--table-id", TABLE, "--as", "user"];
const run = (args) => execFileSync(CLI, args, { encoding: "utf-8", maxBuffer: 32 * 1024 * 1024 });

/* 1) 取现值 */
const outFile = path.join(process.cwd(), "temp", `board-get-${recordId}.json`);
const raw = run(["base", "+record-get", "--record-id", recordId, "--format", "json", ...common]);
let cur = "";
try {
  /* ⚠️ --format json 返回的是**矩阵**：data.data 是按 data.fields（列名，与 field_id_list 平行）
     的列序排列的行。按列名找下标再取值，别想当然按字段名取 key（会静默拿到 undefined）。 */
  const j = JSON.parse(raw);
  const d = j?.data ?? j;
  const cols = d.fields ?? [];
  const idx = cols.indexOf(FIELD);
  if (idx < 0) throw new Error(`返回里没有「${FIELD}」列；列序 = ${cols.join(" | ")}`);
  const row = (d.data ?? [])[0] ?? [];
  const cell = row[idx];
  cur = cell == null ? "" : String(Array.isArray(cell) ? cell.map((x) => (typeof x === "object" ? x.text ?? "" : x)).join("") : cell);
} catch (e) {
  const dump = path.join(process.cwd(), "temp", `board-get-${recordId}-raw.txt`);
  (await import("node:fs")).writeFileSync(dump, raw);
  console.error(`[board] 解析现值失败，原始返回已存 ${dump}：${e.message}`);
  process.exit(3);
}
if (!cur) {
  console.error(`[board] 「${FIELD}」现值读出为空 —— 为免覆盖已中止（如确为空请人工确认）`);
  process.exit(3);
}

/* 2) 追加后回写 */
const next = add.startsWith("<br>") ? cur + add : `${cur}${add}`;
const res = run(["base", "+record-upsert", "--record-id", recordId, "--json", JSON.stringify({ [FIELD]: next }), ...common]);
console.log(`[board] 已追加 ${add.length} 字到「${FIELD}」；现值长度 ${cur.length} → ${next.length}`);
console.log(String(res).trim().slice(0, 400));
