/* 迷你 YAML 子集解析器 —— 只承诺解析本仓库内容系统（Decap → js-yaml dump）产出的形态。
   支持：嵌套映射 / 块序列（含内联首键）、flow 数组、单双引号（含折行）、plain 折行、块标量 | 与 >。
   明确不做：锚点 &、多文档 ---、复杂键、类型推断（除 flow 数组外一律产出字符串）。
   解析不了的语法直接 throw（带行号），绝不静默给错值——内容 schema 校验失败的代价是构建报错可见。
   约定：readScalar 系列被调用时，游标 i 已越过标量所在行；只有当它们自行消费了折行时才推进 i。
   # 只在行首（含缩进）视为注释；键取首个「: 」或行尾冒号。 */

export function parseMiniYaml(src) {
  const lines = String(src).replace(/\r\n?/g, "\n").split("\n");
  let i = 0;

  const err = (msg) => {
    throw new Error(`[mini-yaml] 第 ${i + 1} 行：${msg}\n→ ${lines[i] ?? "<EOF>"}`);
  };
  const isBlank = (l) => l.trim() === "" || l.trim().startsWith("#");
  const indentOf = (l) => {
    let n = 0;
    while (n < l.length && l[n] === " ") n++;
    return n;
  };
  const nextSignificant = (from) => {
    let j = from;
    while (j < lines.length && isBlank(lines[j])) j++;
    return j;
  };
  /** 键：值 切分（键为简单标识，不含 #；值可含冒号） */
  const splitKV = (text) => {
    const m = text.match(/^([^:#]+?):(?:\s+(.*))?\s*$/);
    if (!m) return null;
    return { key: m[1].trim().replace(/^['"]|['"]$/g, ""), rest: (m[2] ?? "").trim() };
  };
  const unescapeChar = (c) => ({ n: "\n", t: "\t", '"': '"', "\\": "\\", "/": "/" })[c] ?? c;

  /** 从 buf[0]=开引号起扫描闭合引号；闭合返回 {closed:true, val}，未闭合返回 {closed:false} */
  const scanQuoted = (buf) => {
    const q = buf[0];
    let val = "";
    let k = 1;
    while (k < buf.length) {
      const c = buf[k];
      if (q === "'" && c === "'") {
        if (buf[k + 1] === "'") { val += "'"; k += 2; continue; }
        return { closed: true, val };
      }
      if (q === '"' && c === "\\") { val += unescapeChar(buf[k + 1]); k += 2; continue; }
      if (q === '"' && c === '"') return { closed: true, val };
      val += c;
      k += 1;
    }
    return { closed: false };
  };

  /** 带引号标量（跨行时折叠续接，空格连接） */
  const readQuoted = (text) => {
    let buf = text;
    for (;;) {
      const r = scanQuoted(buf);
      if (r.closed) return r.val;
      const j = nextSignificant(i);
      if (j >= lines.length) err("引号未闭合");
      buf += " " + lines[j].trim();
      i = j + 1;
    }
  };

  /** flow 数组（跨行时拼接到方括号平衡） */
  const readFlowSeq = (text) => {
    let buf = text;
    for (;;) {
      if (countUnbalanced(buf, "[", "]") <= 0) break;
      const j = nextSignificant(i);
      if (j >= lines.length) err("flow 数组未闭合");
      buf += " " + lines[j].trim();
      i = j + 1;
    }
    const inner = buf.slice(1, buf.lastIndexOf("]")).trim();
    if (inner === "") return [];
    return splitFlow(inner).map(flowItem);
  };

  /** 块标量：| 保留换行，> 折叠为空格；chomping 统一为去尾换行 */
  const readBlockScalar = (marker, keyIndent) => {
    const folded = marker[0] === ">";
    const out = [];
    for (;;) {
      if (i >= lines.length) break;
      const cand = lines[i];
      if (cand.trim() === "") { out.push(""); i += 1; continue; }
      if (indentOf(cand) <= keyIndent) break;
      out.push(cand.trim());
      i += 1;
    }
    while (out.length && out[out.length - 1] === "") out.pop();
    return folded ? out.join(" ") : out.join("\n");
  };

  /** plain 标量折行（缩进比键深的后续行，空格连接） */
  const foldContinuations = (text, foldIndent) => {
    let out = text;
    for (;;) {
      const j = nextSignificant(i);
      if (j >= lines.length) break;
      const ind = indentOf(lines[j]);
      if (ind <= foldIndent) break;
      const t = lines[j].trim();
      // plain 折行不会以「- 」或「key:」开头；命中即说明上一标量已结束
      if (/^(-\s|[^:#]+:(\s|$))/.test(t)) break;
      out += " " + t;
      i = j + 1;
    }
    return out;
  };

  /** 行内标量分派（引号 / flow / 块标量 / plain） */
  const readScalar = (text, keyIndent) => {
    if (text[0] === "'" || text[0] === '"') return readQuoted(text);
    if (text[0] === "[") return readFlowSeq(text);
    if (text[0] === "|" || text[0] === ">") return readBlockScalar(text, keyIndent);
    return foldContinuations(text, keyIndent);
  };

  const countUnbalanced = (s, open, close) => {
    let n = 0, q = null;
    for (let k = 0; k < s.length; k++) {
      const c = s[k];
      if (q) { if (c === q) q = null; continue; }
      if (c === "'" || c === '"') q = c;
      else if (c === open) n++;
      else if (c === close) n--;
    }
    return n;
  };
  const splitFlow = (inner) => {
    const parts = [];
    let depth = 0, q = null, cur = "";
    for (const c of inner) {
      if (q) { cur += c; if (c === q) q = null; continue; }
      if (c === "'" || c === '"') { q = c; cur += c; continue; }
      if (c === "[" || c === "{") { depth++; cur += c; continue; }
      if (c === "]" || c === "}") { depth--; cur += c; continue; }
      if (c === "," && depth === 0) { parts.push(cur.trim()); cur = ""; continue; }
      cur += c;
    }
    if (cur.trim() !== "") parts.push(cur.trim());
    return parts;
  };
  const flowItem = (s) => (s.startsWith("'") || s.startsWith('"') ? scanQuoted(s).val : s);

  /** 递归下降：解析缩进恰为 ind 的映射 */
  const parseMap = (ind) => {
    const obj = {};
    for (;;) {
      i = nextSignificant(i);
      if (i >= lines.length) break;
      const line = lines[i];
      const cur = indentOf(line);
      if (cur < ind) break;
      if (cur > ind) err(`意外缩进（期望 ${ind}，实际 ${cur}）`);
      if (line.trimStart().startsWith("- ")) break; // 序列项交还上层
      const kv = splitKV(line.trim());
      if (!kv) err("无法解析的映射行");
      i += 1;
      if (kv.rest === "") {
        // 嵌套块：更深缩进，或同缩进的「- 」序列
        const j = nextSignificant(i);
        if (j < lines.length) {
          const nInd = indentOf(lines[j]);
          const isDash = lines[j].trimStart().startsWith("- ");
          if (nInd > ind || (nInd === ind && isDash)) {
            obj[kv.key] = isDash && nInd === ind ? parseSeq(ind) : parseBlock(nInd);
            continue;
          }
        }
        obj[kv.key] = null;
      } else {
        obj[kv.key] = readScalar(kv.rest, ind);
      }
    }
    return obj;
  };

  /** 解析缩进恰为 ind 的块序列 */
  const parseSeq = (ind) => {
    const arr = [];
    for (;;) {
      i = nextSignificant(i);
      if (i >= lines.length) break;
      const line = lines[i];
      if (indentOf(line) !== ind || !line.trimStart().startsWith("-")) break;
      const rest = line.trim().replace(/^-\s+/, "").trim();
      if (rest === "") {
        i += 1;
        arr.push(parseBlock(ind + 1));
        continue;
      }
      const kv = splitKV(rest);
      if (!kv) {
        // 纯标量序列项（含折行）
        i += 1;
        arr.push(readScalar(rest, ind));
        continue;
      }
      // 映射序列项：把「- 」换成等宽空格后按映射解析（键落位 ind+2）
      lines[i] = line.replace("-", " ");
      arr.push(parseMap(ind + 2));
    }
    return arr;
  };

  const parseBlock = (minIndent) => {
    const j = nextSignificant(i);
    if (j >= lines.length) return null;
    const ind = indentOf(lines[j]);
    if (ind < minIndent) return null;
    i = j;
    if (lines[j].trimStart().startsWith("- ")) return parseSeq(ind);
    return parseMap(ind);
  };

  const out = parseBlock(0);
  const trailing = nextSignificant(i);
  if (trailing < lines.length) err("存在未能归属的残余行");
  return out;
}
