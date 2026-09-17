/* 条目级结构化数据（Article / CreativeWork）——**生成器（Node）与站内页面（浏览器）共用这一份**。
   为什么要共用：静态 .html 副本里内联一份（爬虫不跑 JS 也读得到），站内条目页再注入一份；
   两处若各写一版，字段迟早分叉，而结构化数据分叉的后果是「同一篇文章有两个互相矛盾的机器描述」。
   本模块不依赖任何 Node API，故两侧都能 import。

   ⚠️ date 是「2026.09」这种月粒度，datePublished 只能给到月（schema.org 接受 YYYY-MM）。
   ⚠️ ai-summary（给机器的一句话）优先于 summary（给人的导语）——受众不同，别混。 */

export function buildEntryJsonLd(entry, kind, opts = {}) {
  const { siteUrl = "", authorName = "", authorAlias = "" } = opts;
  const isWriting = kind === "writing";
  const path = isWriting ? "article" : "project";
  const ld = {
    "@context": "https://schema.org",
    "@type": isWriting ? "Article" : "CreativeWork",
    headline: entry.title,
    name: entry.title,
    inLanguage: "zh-CN",
    author: { "@type": "Person", name: authorName, alternateName: authorAlias, url: siteUrl || undefined },
  };
  if (siteUrl) {
    ld.isPartOf = { "@type": "WebSite", name: `${authorName} · 个人网站`, url: siteUrl };
    ld.url = `${siteUrl}/?${path}=${entry.slug}`;
  }
  if (entry.date) ld.datePublished = String(entry.date).replace(/\./g, "-");
  if (entry.summary) ld.abstract = entry["ai-summary"] || entry.summary;
  if (entry.kind) ld.genre = entry.kind;
  if (entry.tags?.length) ld.keywords = entry.tags.join(", ");
  if (entry.calligraphy?.image) ld.image = siteUrl ? siteUrl + entry.calligraphy.image : entry.calligraphy.image;
  return ld;
}
