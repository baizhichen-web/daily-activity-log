/* 条目页（?article= / ?project=）的**运行时**结构化数据。
   为什么要有两份：站内是单页应用，条目页与首页共用同一个 index.html，
   服务端没法为不同的查询参数注入不同的 head —— 所以：
     · 静态 .html 副本        → 生成器内联一份（爬虫不跑 JS 也读得到，这是主路径）
     · 站内条目页（本模块）    → 挂载时注入一份（服务会执行 JS 的爬虫，主要是搜索引擎）
   数据形状取自 src/lib/entry-jsonld.mjs —— 与生成器共用同一份实现，不另写一版。
   ⚠️ 域名从 window.__SITE_URL__ 读（构建期由生成器从 process.env.SITE_URL 注入），
      避免浏览器侧再读一次环境变量而产生两个真相。 */
import { useEffect } from "react";
import { buildEntryJsonLd } from "./entry-jsonld.mjs";

const SITE_URL: string = (globalThis as { __SITE_URL__?: string }).__SITE_URL__ ?? "";

export function useEntryJsonLd(
  entry: Record<string, unknown> | null | undefined,
  kind: "writing" | "project",
  authorName: string,
) {
  useEffect(() => {
    if (!entry) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.entryJsonLd = "1";
    el.textContent = JSON.stringify(buildEntryJsonLd(entry, kind, { siteUrl: SITE_URL, authorName, authorAlias: "白纸上" }));
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [entry, kind, authorName]);
}
