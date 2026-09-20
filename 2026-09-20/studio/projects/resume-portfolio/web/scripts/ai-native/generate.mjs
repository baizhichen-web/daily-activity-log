/* AI Native 第一波生成器（白纸 2026-09-13 拍板，HANDOFF §4-bis）：
   构建时产出 /llms.txt、/llms-full.txt、每页 .md 副本、/robots.txt；JSON-LD 注入 <head>。
   数据单源：全部事实取自 content/resume.{zh,en}.yml 与 src/data/githubHeatmap.json，
   与页面渲染同一份（第二波⑥「对外数字口径统一」的实现方式）。
   内容文件（content/projects/*.yml）经 mini-yaml 解析；解析失败=构建失败（可见，不静默）。
   块类型以 Decap schema 为准；note 块=草稿旁注，不随发布渲染（内容架构 §2.3）。 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseMiniYaml } from "./mini-yaml.mjs";
import { buildEntryJsonLd } from "../../src/lib/entry-jsonld.mjs";

import { POSTER_WALL } from "../../src/data/poster-wall.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(HERE, "../../content/projects");
const WRITING_DIR = path.resolve(HERE, "../../content/writing");
const HEATMAP = JSON.parse(fs.readFileSync(path.resolve(HERE, "../../src/data/githubHeatmap.json"), "utf-8"));

/* 简历数据源（2026-09-14 白纸拍板迁出代码）：content/resume.{zh,en}.yml
   —— 与页面渲染同一份（src/lib/content.ts 走同一个解析器），副本不会与页面分叉 */
function loadResume() {
  const read = (loc) => {
    const f = path.resolve(HERE, `../../content/resume.${loc}.yml`);
    if (!fs.existsSync(f)) throw new Error(`[ai-native] 缺 content/resume.${loc}.yml`);
    const r = parseMiniYaml(fs.readFileSync(f, "utf-8"));
    if (!r || !r.identity || !r.identity.name) throw new Error(`[ai-native] resume.${loc}.yml: 缺 identity.name`);
    return r;
  };
  return { zh: read("zh"), en: read("en") };
}
const RESUME = loadResume();
const ZH = RESUME.zh;

/* 部署上线后填正式域名（如 https://baizhichen.pages.dev）。
   ⚠️ 一处改全站生效：llms.txt / .md 头部链接 / JSON-LD url / sitemap 全部取这里。
   2026-09-17：优先读环境变量 SITE_URL —— 托管方构建时在面板里填一次即可，不必为上线再改代码。
   为空时链接保持根相对（llms.txt 规范允许），sitemap 不产出（sitemap 协议要求绝对 URL）。 */
const SITE_URL = String(process.env.SITE_URL ?? "").replace(/\/+$/, "");

const abs = (p) => (SITE_URL ? SITE_URL + p : p);

/* ---------- 内容文件读取与校验 ---------- */

const KNOWN_BLOCKS = new Set(["paragraph", "heading", "figure", "gallery", "video", "quote", "process", "note", "metrics", "compare"]);

function loadEntries(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml") || f.endsWith(".yaml")).sort();
  return files.map((f) => {
    const p = parseMiniYaml(fs.readFileSync(path.join(dir, f), "utf-8"));
    if (!p.title || !p.slug) throw new Error(`[ai-native] ${f}: 缺 title 或 slug 字段`);
    if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`[ai-native] ${f}: slug 含非法字符（只允许 a-z 0-9 -）：${p.slug}`);
    for (const [bi, b] of (p.body ?? []).entries()) {
      if (!b || typeof b !== "object" || !b.type) throw new Error(`[ai-native] ${f}: body[${bi}] 缺 type`);
      if (!KNOWN_BLOCKS.has(b.type)) throw new Error(`[ai-native] ${f}: body[${bi}] 未知块类型「${b.type}」（known: ${[...KNOWN_BLOCKS].join("/")}）`);
    }
    return { ...p };
  });
}

function loadProjects() {
  return loadEntries(CONTENT_DIR);
}

/* 文章（content/writing/*.yml）：与项目同一正文块模型，多 date/kind/calligraphy 三字段。
   2026-09-15 白纸任务 3b「文章内部要有下载入口」→ 先得有东西可下，故副本在此产出。 */
function loadWritings() {
  return loadEntries(WRITING_DIR).sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
}

/* ---------- 块 → Markdown ---------- */

function blockToMd(b) {
  switch (b.type) {
    case "paragraph": return `${b.text}\n`;
    case "heading": return `${b.level === "h3" ? "###" : "##"} ${b.text}\n`;
    case "figure": return `![${b.caption ?? ""}](${abs(b.image)})\n${b.caption ? `*${b.caption}*\n` : ""}`;
    case "gallery": return (b.images ?? []).map((im) => `![${im.caption ?? ""}](${abs(im.image)})${im.caption ? `\n*${im.caption}*` : ""}`).join("\n\n") + "\n";
    case "video": return `[视频](${abs(b.src)})${b.poster ? `（封面：${abs(b.poster)}）` : ""}${b.caption ? `\n*${b.caption}*` : ""}\n`;
    case "quote": return `> ${b.text.split("\n").join("\n> ")}${b.source ? `\n> —— ${b.source}` : ""}\n`;
    case "metrics": return (b.items ?? []).map((m) => `- **${m.value}** ${m.label ?? ""}`).join("\n") + "\n";
    case "process":
      return [
        `- **问题**：${b.problem ?? "（待填）"}`,
        `- **决策**：${b.decision ?? "（待填）"}`,
        `- **取舍**：${b.tradeoff ?? "（待填）"}`,
        `- **结果**：${b.result ?? "（待填）"}`,
      ].join("\n") + "\n";
    case "note": return ""; // 草稿旁注不渲染
    case "compare": return `[前后对比](${abs(b.before ?? "")} → ${abs(b.after ?? "")})\n`;
    default: return "";
  }
}

/* ---------- 各页 Markdown ---------- */

const H = (t, l = 2) => `${"#".repeat(l)} ${t}\n\n`;

function renderResumeMd() {
  const zh = ZH.identity;
  const out = [];
  out.push(H("陈柏志 · 简历", 1));
  out.push(`${zh.name} — ${ZH.identity.role}\n\n`);
  out.push(`> 来源：[${abs("/resume.md")}](${abs("/resume.md")})（本站页面 "简历" 的 Markdown 副本）\n\n`);
  out.push(`${zh.meta.join("　\n\n")}\n\n`);
  zh.lines.forEach((l) => out.push(`${l}\n\n`));
  out.push(H("教育经历"));
  ZH.education.forEach((e) => out.push(`- **${e.title}** — ${e.sub}（${e.period}）\n  - ${e.lines.join("\n  - ")}\n`));
  out.push("\n");
  out.push(`GitHub：[baizhichen-web](https://github.com/baizhichen-web) · 过去一年 ${HEATMAP.total} 次贡献 / ${HEATMAP.activeDays} 个活跃日（${HEATMAP.from} → ${HEATMAP.to}）\n\n`);
  out.push(H("关于"));
  ZH.about.forEach((p) => out.push(`${p}\n\n`));
  out.push(H("专业之外"));
  out.push(`${ZH.beyond.intro}\n\n`);
  ZH.beyond.items.forEach((b) => out.push(`**${b.title}** — ${b.text}\n\n`));
  out.push(H("实习经历"));
  ZH.work.forEach((w) => {
    out.push(`**${w.title}** — ${w.sub}（${w.period}）\n\n`);
    w.lines.forEach((l) => out.push(`- ${l}\n`));
    out.push("\n");
  });
  out.push(H("其他项目经历"));
  ZH.otherProjects.forEach((r) => {
    out.push(`**${r.title}** — ${r.highlight}（${r.period}）\n\n`);
    r.lines.forEach((l) => out.push(`${l}\n\n`));
  });
  out.push(docsMd("projects"));
  out.push(H("获奖"));
  out.push(`设计获奖\n\n`);
  ZH.awardsDesign.forEach((a) => out.push(`- ${a}\n`));
  out.push(`\n荣誉获奖\n\n`);
  ZH.awardsHonor.forEach((a) => out.push(`- ${a}\n`));
  out.push("\n");
  out.push(docsMd("awards"));
  out.push(H("部分课程成绩"));
  ZH.courses.forEach((g) => {
    out.push(`**${g.group}**\n\n`);
    g.items.forEach((c) => out.push(`- ${c.name}：${c.score}\n`));
    out.push("\n");
  });
  out.push(docsMd("courses"));
  out.push(H("自我评价"));
  out.push(`${ZH.selfEval.body[0].short}\n\n${ZH.selfEval.body[1].short}\n\n`);
  out.push(`${ZH.selfEval.intro}\n\n`);
  ZH.selfEval.quotes.forEach((q) => out.push(`> ${q}\n\n`));
  out.push(`${ZH.selfEval.body[0].full}\n\n${ZH.selfEval.body[1].full}\n\n`);
  out.push(H("联系"));
  out.push(`接受实习与合作咨询，欢迎来信！我会阅读所有邮件或者消息，并回复大部分邮件。\n\n`);
  out.push(`- 邮箱：${ZH.contact.email}\n- 小红书：${ZH.contact.xiaohongshu}\n- GitHub：https://github.com/baizhichen-web\n`);
  out.push(docsMd("contact"));
  return out.join("");
}

/* 证明材料（2026-09-14 白纸指令：页面上不再单开一节，改成挂在对应章节下面）
   ——副本跟着页面走：同一份 ZH.docs 按 section 撒进各节，不再有「证明材料」标题 */
function docsMd(section) {
  const list = ZH.docs.filter((d) => d.section === section);
  if (!list.length) return "";
  return list.map((d) => `- ${d.title}（${d.sub}）${d.href ? `：${abs(d.href)}` : "：待上传"}\n`).join("") + "\n";
}

function renderHomeMd(projects) {
  const out = [];
  out.push(H("陈柏志 · 白纸上（首页）", 1));
  out.push(`> 来源：[${abs("/index.md")}](${abs("/index.md")})（本站首页的 Markdown 副本）\n\n`);
  /* 定位句：原为 zh.lines[1]（当时两行：就读经历 / 兴趣定位）。
     白纸 2026-09-14 删去就读那行后只剩一行，改取"最后一行"以免写死下标变 undefined */
  out.push(`${ZH.identity.lines[ZH.identity.lines.length - 1]}\n\n`);
  out.push(H("作品集项目（海报墙）"));
  POSTER_WALL.forEach((p) => out.push(`- **${p.title}**（${p.date}）— ${p.desc.zh}\n`));
  out.push(`\n（以上封面与详情页内容待白纸供料后补齐——当前为占位标注，零假数据。）\n\n`);
  if (projects.length) {
    out.push(H("项目详情页（内容系统）"));
    projects.forEach((p) => out.push(`- [${p.title}](${abs(`/projects/${p.slug}.md`)})${p.summary ? ` — ${p.aiSummary || p.summary}` : ""}\n`));
    out.push("\n");
  }
  return out.join("");
}

function renderProjectMd(p) {
  return renderEntryMd(p, "project");
}

/* 条目 → Markdown（项目与文章共用；差异只在事实行：项目=时期·角色·状态，文章=时间·体裁）
   文章封面是书画取景（画框内的那一段），.md 里给原图坐标无从表达，故只附作品原图并注明。 */
function renderEntryMd(p, kind) {
  const isWriting = kind === "writing";
  const base = isWriting ? "writing" : "projects";
  const out = [];
  out.push(H(`${p.title}`, 1));
  out.push(`> 来源：[${abs(`/${base}/${p.slug}.md`)}](${abs(`/${base}/${p.slug}.md`)})（本站${isWriting ? "文章" : "项目页"}的 Markdown 副本）\n\n`);
  const facts = isWriting
    ? [p.date && `时间：${p.date}`, p.kind && `体裁：${p.kind}`]
    : [
        p.period && `时期：${p.period}`,
        p.role && `角色：${p.role}`,
        p.status && `状态：${{ latest: "最新", ongoing: "进行中", archived: "已归档" }[p.status] ?? p.status}`,
      ];
  out.push(`${facts.filter(Boolean).join(" · ")}\n\n`);
  if (isWriting && p.calligraphy?.image) {
    out.push(`![${p.title}——封面取自${p.calligraphy.chars ? `「${p.calligraphy.chars}」所在局部` : "作品局部"}](${abs(p.calligraphy.image)})\n\n`);
  }
  if (p.metrics?.length) out.push(p.metrics.map((m) => `- **${m.value}** ${m.label}`).join("\n") + "\n\n");
  (p.tags ?? []).forEach((t) => out.push(`\`${t}\` `));
  if (p.tags?.length) out.push("\n\n");
  if (p.summary) out.push(`**摘要** — ${p.aiSummary || p.summary}\n\n`);
  (p.body ?? []).forEach((b) => {
    const md = blockToMd(b);
    if (md) out.push(md + "\n");
  });
  return out.join("");
}

/* ---------- llms.txt / llms-full.txt / robots.txt / JSON-LD ---------- */

function renderLlmsTxt(projects, writings) {
  const out = [];
  out.push(`# 陈柏志（白纸上）\n\n`);
  out.push(`陈柏志 — 工业设计出身的硬件产品经理，用 AI 原生工作流做产品。个人作品集与公开证据链。\n\n`);
  out.push(`本站全部页面提供 Markdown 副本；llms-full.txt 为全站合并版。数据与页面渲染同源（简历事实、贡献数字一致）。\n\n`);
  out.push(`## 页面\n\n`);
  out.push(`- [简历](${abs("/resume.md")})：教育、实习、项目经历、获奖、课程成绩、自我评价、联系（证明材料随各节附出）\n`);
  out.push(`- [首页（作品集总览）](${abs("/index.md")})：海报墙项目一览\n`);
  if (writings.length) {
    out.push(`\n## 文章\n\n`);
    /* ai-summary = 给机器的一句话（与给人看的 summary 受众不同）；缺省回落 summary */
    writings.forEach((w) => {
      out.push(`- [${w.title}](${abs(`/writing/${w.slug}.md`)})${w.date ? `（${w.date}）` : ""}${(w.aiSummary || w.summary) ? `：${w.aiSummary || w.summary}` : ""}\n`);
      /* 英文副本（2026-09-20 英文版）：同一篇有 en 正文才列，链接指 .en.md */
      if (w.en?.body?.length) {
        const enTitle = w.en.title || w.title;
        const enDesc = w.en["ai-summary"] || w.en.summary || w.summary;
        out.push(`- [${enTitle}](${abs(`/writing/${w.slug}.en.md`)})${w.date ? ` (${w.date})` : ""}${enDesc ? ` — ${enDesc}` : ""} · English\n`);
      }
    });
  }
  if (projects.length) {
    out.push(`\n## 项目\n\n`);
    projects.forEach((p) => out.push(`- [${p.title}](${abs(`/projects/${p.slug}.md`)})${(p.aiSummary || p.summary) ? `：${p.aiSummary || p.summary}` : ""}\n`));
  }
  return out.join("");
}

function renderLlmsFull(projects, writings) {
  return [
    renderLlmsTxt(projects, writings),
    "\n\n---\n\n",
    renderHomeMd(projects),
    "\n\n---\n\n",
    renderResumeMd(),
    ...writings.map((w) => "\n\n---\n\n" + renderEntryMd(w, "writing")),
    ...writings.filter((w) => w.en?.body?.length).map((w) => "\n\n---\n\n" + renderEntryMd({ ...w, title: w.en.title || w.title, kind: w.en.kind || w.kind, summary: w.en.summary ?? w.summary, body: w.en.body }, "writing")),
    ...projects.map((p) => "\n\n---\n\n" + renderEntryMd(p, "project")),
  ].join("");
}

const ROBOTS = `# AI 爬虫显式欢迎（AI Native 第一波，白纸 2026-09-13 拍板）

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /
`;

/* sitemap 只在有正式域名时产出，robots 的 Sitemap 行也随之只在有域名时追加——
   没域名却指路等于给爬虫一个 404（2026-09-17 审查发现此前 robots 是纯常量、永不指路）。 */
const robotsTxt = () => (SITE_URL ? `${ROBOTS}\nSitemap: ${SITE_URL}/sitemap.xml\n` : ROBOTS);

/* ---------- Markdown → HTML（下载用 HTML 副本，2026-09-13 白纸新增） ----------
   只承诺本生成器自己产出的 md 子集：标题/段落/列表/引用/分隔线 + 行内粗体/链接/代码。
   独立文档：内联样式（衬线 16/1.75、680px 版心、黑白），双击即可打开阅读。 */

function escapeHtml(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inlineMd(t) {
  return t
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
export function mdToHtml(md) {
  const out = [];
  let list = null; // "ul" | "ol" | null
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeList(); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { closeList(); out.push(`<h${h[1].length}>${inlineMd(escapeHtml(h[2]))}</h${h[1].length}>`); continue; }
    if (/^(---|\*\*\*)$/.test(line.trim())) { closeList(); out.push("<hr />"); continue; }
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) { if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; } out.push(`<li>${inlineMd(escapeHtml(ul[1]))}</li>`); continue; }
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) { if (list !== "ol") { closeList(); out.push("<ol>"); list = "ol"; } out.push(`<li>${inlineMd(escapeHtml(ol[1]))}</li>`); continue; }
    const q = line.match(/^>\s?(.*)$/);
    if (q) { closeList(); out.push(`<blockquote>${inlineMd(escapeHtml(q[1]))}</blockquote>`); continue; }
    closeList();
    out.push(`<p>${inlineMd(escapeHtml(line))}</p>`);
  }
  closeList();
  return out.join("\n");
}

function pageHtml(title, md, jsonLd) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n` : ""}<style>
  body { margin: 0; background: #ffffff; color: #141414; font-family: "Noto Serif SC","Source Han Serif SC",Georgia,"Times New Roman",serif; font-size: 16px; line-height: 1.75; }
  main { max-width: 680px; margin: 0 auto; padding: 64px 24px; }
  h1 { font-size: 28px; line-height: 1.3; margin: 0 0 8px; }
  h2 { font-size: 20px; margin: 40px 0 12px; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0; }
  h3 { font-size: 17px; margin: 28px 0 10px; }
  p { margin: 0 0 16px; }
  ul, ol { margin: 0 0 16px; padding-left: 24px; }
  li { margin-bottom: 6px; }
  blockquote { margin: 0 0 16px; padding: 4px 16px; border-left: 3px solid #e0e0e0; color: #555555; }
  a { color: inherit; text-underline-offset: 4px; }
  code { font-family: ui-monospace, "JetBrains Mono", Consolas, monospace; font-size: 14px; background: #f3f3f3; padding: 1px 5px; border-radius: 3px; }
  hr { border: 0; border-top: 1px solid #e0e0e0; margin: 40px 0; }
  footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #757575; }
</style>
</head>
<body>
<main>
${mdToHtml(md)}
<footer>陈柏志 · 白纸上 — ${title.replace(/</g, "&lt;")}</footer>
</main>
</body>
</html>
`;
}

function buildJsonLd(projects) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ZH.identity.name,
    alternateName: ["白纸上", RESUME.en.identity.name],
    description: "陈柏志 — 工业设计出身的硬件产品经理，用 AI 原生工作流做产品。个人作品集与公开证据链。",
    jobTitle: "硬件产品经理",
    email: "mailto:202622089004@mail.bnu.edu.cn",
    telephone: "+86 182 5069 8500",
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "华侨大学（工业设计，本科）" },
      { "@type": "CollegeOrUniversity", name: "北京师范大学未来设计学院（设计，硕士在读）" },
    ],
    knowsAbout: ["服务设计", "工业设计", "硬件产品", "人因工程"],
    sameAs: ["https://github.com/baizhichen-web", ZH.contact.xiaohongshu],
    award: [...ZH.awardsHonor, ...ZH.awardsDesign],
  };
  if (SITE_URL) ld.url = SITE_URL;
  return ld;
}

/* 条目级结构化数据（2026-09-17 二波）：文章=Article、项目=CreativeWork。
   用途＝让 AI/搜索引擎确定「这条能不能引、是谁写的、什么时候写的」。
   ⚠️ 实现放在 src/lib/entry-jsonld.mjs —— 站内页面注入的那份与之共用，避免两处分叉。 */
const entryJsonLd = (entry, kind) => buildEntryJsonLd(entry, kind, {
  siteUrl: SITE_URL, authorName: ZH.identity.name, authorAlias: "白纸上",
});

/* ---------- 出口：vite 插件 ---------- */

export function buildAllFiles() {
  const projects = loadProjects().map((p) => ({ ...p, aiSummary: p["ai-summary"] ?? null }));
  const writings = loadWritings().map((w) => ({ ...w, aiSummary: w["ai-summary"] ?? null }));
  const resumeMd = renderResumeMd();
  const homeMd = renderHomeMd(projects);
  const entryLd = new Map([
    ...projects.map((p) => [`projects/${p.slug}`, entryJsonLd(p, "project")]),
    ...writings.map((w) => [`writing/${w.slug}`, entryJsonLd(w, "writing")]),
  ]);
  /* ⚠️ 目录名与 kind 不同名（kind="project" 落在 projects/ 下）——键统一用目录名拼，别用 kind */
  const entryHtml = (kind, e) => {
    const base = kind === "writing" ? "writing" : "projects";
    return pageHtml(String(e.title), renderEntryMd(e, kind), entryLd.get(`${base}/${e.slug}`));
  };
  const files = {
    "llms.txt": renderLlmsTxt(projects, writings),
    "llms-full.txt": renderLlmsFull(projects, writings),
    "robots.txt": robotsTxt(),
    "index.md": homeMd,
    "resume.md": resumeMd,
    /* HTML 下载副本（2026-09-13 白纸新增）：独立样式文档，双击可读。
       首页叫 home.html——/index.html 是站点本体，不能覆盖。
       contact.md/contact.html 已随独立联系页撤除（09-13）：联系方式并入 resume 副本尾段 */
    "home.html": pageHtml("陈柏志 · 白纸上（首页）", homeMd),
    "resume.html": pageHtml("陈柏志 · 简历", resumeMd),
    ...Object.fromEntries(projects.map((p) => [`projects/${p.slug}.md`, renderEntryMd(p, "project")])),
    ...Object.fromEntries(projects.map((p) => [`projects/${p.slug}.html`, entryHtml("project", p)])),
    /* 文章副本（2026-09-15 任务 3b）：路径与页面 ?article= 平行，供文章内下载入口取用 */
    ...Object.fromEntries(writings.map((w) => [`writing/${w.slug}.md`, renderEntryMd(w, "writing")])),
    ...Object.fromEntries(writings.map((w) => [`writing/${w.slug}.html`, entryHtml("writing", w)])),
    /* 英文副本（2026-09-20）：只有该篇 yml 里有 en 正文才产出；
       站内 MD 菜单按 hasEnglishCopy() 指向这里，故两边不会指空 */
    ...Object.fromEntries(
      writings.filter((w) => w.en?.body?.length).flatMap((w) => {
        const enView = { ...w, title: w.en.title || w.title, kind: w.en.kind || w.kind, summary: w.en.summary ?? w.summary, body: w.en.body };
        const enLd = buildEntryJsonLd({ ...enView }, "writing", { siteUrl: SITE_URL, authorName: ZH.identity.name, authorAlias: "白纸上" });
        return [
          [`writing/${w.slug}.en.md`, renderEntryMd(enView, "writing")],
          [`writing/${w.slug}.en.html`, pageHtml(String(enView.title), renderEntryMd(enView, "writing"), enLd)],
        ];
      }),
    ),
  };
  /* sitemap 只在有正式域名时产出（协议要求绝对 URL）；空域名下产出等于给爬虫一堆半截地址 */
  if (SITE_URL) files["sitemap.xml"] = renderSitemap(projects, writings);
  const jsonLd = buildJsonLd(projects);
  return { files, jsonLd, projects, writings };
}

/* ---------- sitemap.xml（2026-09-17 二波）----------
   站内页面是「单页 + 查询参数」路由，故 URL 就按这个形态列（静态托管零配置的前提）。
   只列人能读的页面；.md / .html 副本不进 sitemap（它们是给机器取的，已在 llms.txt 里声明）。 */
function renderSitemap(projects, writings) {
  const urls = [
    { loc: "/", priority: "1.0" },
    ...writings.map((w) => ({ loc: `/?article=${w.slug}`, priority: "0.8" })),
    ...projects.map((p) => ({ loc: `/?project=${p.slug}`, priority: "0.7" })),
  ];
  const out = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  urls.forEach((u) => {
    out.push(`  <url>`, `    <loc>${SITE_URL}${u.loc}</loc>`, `    <priority>${u.priority}</priority>`, `  </url>`);
  });
  out.push("</urlset>", "");
  return out.join("\n");
}

/* 静态托管响应头（Netlify/Cloudflare Pages 的 _headers 格式）：
   .txt/.md 必须带 charset=utf-8，否则中文 Windows 浏览器按 GBK 渲染 → 乱码
   （2026-09-13 实测：vite preview 裸 text/plain 白纸看是乱码）。托管方不支持 _headers 时无害。 */
const STATIC_HEADERS = `/*.txt
  Content-Type: text/plain; charset=utf-8
/*.md
  Content-Type: text/markdown; charset=utf-8
`;

export function aiNativePlugin() {
  /* files/jsonLd 不再init时一次算死：dev/preview 每请求现算，
     Decap 改完 yml 刷新即见，不用重启服务 */
  const serveGenerated = (req, res, next) => {
    const url = (req.url ?? "").split("?")[0];
    const key = url.replace(/^\//, "").replace(/\/$/, "");
    const { files } = buildAllFiles();
    if (key in files) {
      /* 扩展名 → 类型：.html 副本必须是 text/html，否则浏览器按纯文本渲染它
         （2026-09-17 实测：三种产物都落到 else 分支被发成 text/markdown） */
      const ct = key.endsWith(".txt") ? "text/plain; charset=utf-8"
        : key.endsWith(".html") ? "text/html; charset=utf-8"
          : "text/markdown; charset=utf-8";
      res.setHeader("Content-Type", ct);
      res.end(files[key]);
      return;
    }
    next();
  };
  return {
    name: "ai-native",
    /* 生产构建：产物写进 dist（_headers 一并带出） */
    generateBundle() {
      const { files } = buildAllFiles();
      for (const [p, content] of Object.entries(files)) this.emitFile({ type: "asset", fileName: p, source: content });
      this.emitFile({ type: "asset", fileName: "_headers", source: STATIC_HEADERS });
    },
    /* dev(5175) 与 preview(4173) 都接管生成文件的响应头（charset=utf-8）。
       ⚠️ 只拦显式的生成文件路径；/ 必须放行给站点本身 */
    configureServer(server) {
      server.middlewares.use(serveGenerated);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveGenerated);
    },
    /* JSON-LD 注入 head（dev 每次加载现算，build 时一次）
       另有 window.__SITE_URL__：站内条目页的运行时结构化数据要用同一个域名，
       一处来源（process.env.SITE_URL），不让浏览器侧再读一遍环境变量而产生两个真相 */
    transformIndexHtml() {
      const { jsonLd } = buildAllFiles();
      return [
        { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(jsonLd, null, 2), injectTo: "head" },
        { tag: "script", children: `window.__SITE_URL__=${JSON.stringify(SITE_URL)};`, injectTo: "head" },
      ];
    },
  };
}
