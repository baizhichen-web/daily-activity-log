/* 项目内容装载（渲染侧）—— content/projects/*.yml 单一事实源：
   Decap 后台写它、本模块渲染它、scripts/ai-native/generate.mjs 生成 llms.txt/.md 也读它。
   解析器共用 mini-yaml（同规格、同「解析不了就抛错」纪律）；校验口径与生成器 loadProjects() 对齐。
   eager 加载：任一内容文件损坏 → 整站加载即抛错（可见，不静默），与构建侧行为一致。 */
import { parseMiniYaml } from "../../scripts/ai-native/mini-yaml.mjs";

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
