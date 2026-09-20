/* 项目内容装载（渲染侧）—— content/projects/*.yml 单一事实源：
   Decap 后台写它、本模块渲染它、scripts/ai-native/generate.mjs 生成 llms.txt/.md 也读它。
   解析器共用 mini-yaml（同规格、同「解析不了就抛错」纪律）；校验口径与生成器 loadProjects() 对齐。
   eager 加载：任一内容文件损坏 → 整站加载即抛错（可见，不静默），与构建侧行为一致。 */
import { parseMiniYaml } from "../../scripts/ai-native/mini-yaml.mjs";
import type { Lang } from "./prefs";

export type GalleryItem = { image: string; caption?: string };
export type MetricItem = { value: string; label?: string };

export type ProjectBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: "h2" | "h3"; text: string }
  | { type: "figure"; image: string; caption?: string }
  | { type: "gallery"; images?: GalleryItem[] }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "quote"; text: string; source?: string }
  | { type: "process"; problem?: string; decision?: string; tradeoff?: string; result?: string }
  | { type: "metrics"; items?: MetricItem[] }
  | { type: "compare"; before?: string; after?: string; caption?: string }
  | { type: "note"; text: string };

export type Project = {
  title: string;
  slug: string;
  period?: string;
  role?: string;
  status?: string;
  accent?: string;
  cover?: string;
  summary?: string;
  "ai-summary"?: string;
  tags?: string[];
  metrics?: MetricItem[];
  body?: ProjectBlock[];
};

const RAW = import.meta.glob("../../content/projects/*.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const PROJECTS: Project[] = Object.entries(RAW)
  .map(([file, src]) => {
    const p = parseMiniYaml(src) as unknown as Project;
    if (!p || typeof p !== "object" || !p.title || !p.slug) throw new Error(`[content] ${file}: 缺 title 或 slug`);
    if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`[content] ${file}: slug 含非法字符（只允许 a-z 0-9 -）：${p.slug}`);
    return p;
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/* ---------- 写作集合（writing/*.yml，2026-09-13 晚随「文章上站」新增） ----------
   文章 = 已写成的文字（随笔/自传），封面用书画（CalligraphyArt）而非项目图；
   字段超集复用 Project 的正文块模型（同一渲染器）。 */

/* 书画封面字段（2026-09-13 二次修正：书法=图片；09-14 三次修正：白纸 Figma 双蒙版稿）：
   image=收起态宽裁 · zoomImage=展开态局部竖裁（缺省退化为单图 focus 变焦）· chars=文眼字（占位标注用） */
export type Calligraphy = { chars?: string; image?: string; imgAspect?: number; cropFrom?: string; cropTo?: string; zoomImage?: string; focus?: string };

/* 英文版：同一文件里的 `en:` 块（2026-09-20 白纸授权"全部按 AI 翻译来，后面再改"）。
   只放可翻的字段——封面（文眼字是汉字）、日期、slug、图片路径都不翻。 */
export type WritingEn = {
  title?: string;
  kind?: string;
  summary?: string;
  tags?: string[];
  body?: ProjectBlock[];
};

export type Writing = {
  title: string;
  slug: string;
  date?: string;
  kind?: string;
  accent?: string;
  summary?: string;
  calligraphy?: Calligraphy;
  tags?: string[];
  body?: ProjectBlock[];
  en?: WritingEn;
};

const RAW_WRITING = import.meta.glob("../../content/writing/*.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const WRITINGS: Writing[] = Object.entries(RAW_WRITING)
  .map(([file, src]) => {
    const w = parseMiniYaml(src) as unknown as Writing;
    if (!w || typeof w !== "object" || !w.title || !w.slug) throw new Error(`[content] ${file}: 缺 title 或 slug`);
    if (!/^[a-z0-9-]+$/.test(w.slug)) throw new Error(`[content] ${file}: slug 含非法字符（只允许 a-z 0-9 -）：${w.slug}`);
    return w;
  })
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export function writingBySlug(slug: string): Writing | undefined {
  return WRITINGS.find((w) => w.slug === slug);
}

/* 按语言取文章：英文且有 en 块 → 用英文的标题/体裁/摘要/标签/正文；
   封面（文眼字是汉字）、日期、slug、图片路径一律不翻。en 缺哪个字段就回落中文哪个。 */
export function localizedWriting(w: Writing | undefined, lang: Lang): Writing | undefined {
  if (!w) return w;
  if (lang !== "en" || !w.en) return w;
  const e = w.en;
  return {
    ...w,
    title: e.title || w.title,
    kind: e.kind || w.kind,
    summary: e.summary || w.summary,
    tags: e.tags ?? w.tags,
    body: e.body ?? w.body,
  };
}

/** 英文副本是否已备好（决定 MD 菜单指向 <slug>.md 还是 <slug>.en.md） */
export function hasEnglishCopy(w: Writing | undefined): boolean {
  return !!w?.en?.body?.length;
}

/* ---------- 简历（content/resume.{zh,en}.yml，2026-09-14 白纸拍板迁出代码） ----------
   与文章/项目同一套「内容即文件」：Decap 后台写它、这里渲染它、生成器读它出 .md 副本。
   中英各一份文件（Decap 的 files 集合下两个条目），结构完全对称。
   ⚠️ mini-yaml 只回字符串：courses[].items[].score 是 '97' 这样的字符串（只作显示）。 */
export type ResumeDoc = {
  identity: { name: string; role: string; meta: string[]; lines: string[]; socials: { kind: string; label: string; href: string }[] };
  education: { period: string; title: string; sub: string; lines: string[] }[];
  about: string[];
  beyond: { intro: string; items: { title: string; text: string }[] };
  work: { period: string; title: string; sub: string; lines: string[] }[];
  otherProjects: { period: string; title: string; highlight: string; note: string; lines: string[] }[];
  awardsDesign: string[];
  awardsHonor: string[];
  courses: { group: string; items: { name: string; score: string }[] }[];
  selfEval: { intro: string; quotes: string[]; body: { short: string; full: string }[] };
  docs: { title: string; sub: string; section: "edu" | "projects" | "awards" | "courses" | "contact"; href: string }[];
  contact: { email: string; xiaohongshu: string };
};

const RAW_RESUME = import.meta.glob("../../content/resume.*.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const readResume = (loc: "zh" | "en"): ResumeDoc => {
  const hit = Object.entries(RAW_RESUME).find(([f]) => f.endsWith(`resume.${loc}.yml`));
  if (!hit) throw new Error(`[content] 缺 content/resume.${loc}.yml`);
  const r = parseMiniYaml(hit[1]) as unknown as ResumeDoc;
  if (!r || typeof r !== "object" || !r.identity?.name) throw new Error(`[content] ${hit[0]}: 缺 identity.name`);
  return r;
};

export const RESUME: Record<Lang, ResumeDoc> = { zh: readResume("zh"), en: readResume("en") };
