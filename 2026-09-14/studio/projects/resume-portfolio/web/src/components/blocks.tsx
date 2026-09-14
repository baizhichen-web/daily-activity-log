import type { ReactNode } from "react";
import type { ProjectBlock } from "../lib/content";

/* ============================================================
   正文块渲染（2026-09-14 自 ProjectPage 抽出共享）
   使用方：项目/文章长页（ProjectPage）· 海报墙展开态（FlipbookDemo，Scott 式「展开即全文」）
   口径：note=草稿旁注不渲染（与生成器一致）；h2 自动编号（§ 01…）并收集目录项；
        eager=true 时图片立即加载——墙内展开态用：懒加载图未进视口时高度为 0，
        会破坏展开容器的高度测量（2026-09-14 实测教训）。
   ============================================================ */

/* 行内 **加粗** → <strong>（白纸文稿用 ** 标重点；这里最小支持，不做完整 markdown） */
export function inline(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((seg, i) => (i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg));
}

export function BlockView({ b, onZoom, eager }: { b: ProjectBlock; onZoom: (src: string) => void; eager?: boolean }) {
  const load = eager ? "eager" : "lazy";
  switch (b.type) {
    case "paragraph": {
      const pending = /^（(占位|待补)/.test(b.text);
      return <p className={"pj-p" + (pending ? " is-pending" : "")}>{inline(b.text)}</p>;
    }
    case "heading":
      return <h3 className="pj-h3">{b.text}</h3>;
    case "figure":
      return (
        <figure className="pj-figure">
          <img src={b.image} alt={b.caption ?? ""} loading={load} onClick={() => onZoom(b.image)} />
          {b.caption && <figcaption className="pj-cap">{b.caption}</figcaption>}
        </figure>
      );
    case "gallery":
      return (
        <div className={"pj-gallery" + ((b.images?.length ?? 0) > 2 ? " is-three" : "")}>
          {(b.images ?? []).map((im, i) => (
            <figure className="pj-figure" key={i}>
              <img src={im.image} alt={im.caption ?? ""} loading={load} onClick={() => onZoom(im.image)} />
              {im.caption && <figcaption className="pj-cap">{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="pj-quote">
          <p>{inline(b.text)}</p>
          {b.source && <cite className="pj-quote-src">—— {b.source}</cite>}
        </blockquote>
      );
    case "process":
      return (
        <div className="pj-process">
          {([
            ["01", "问题", b.problem],
            ["02", "决策", b.decision],
            ["03", "取舍", b.tradeoff],
            ["04", "结果", b.result],
          ] as const).map(([no, label, text]) => (
            <div className="pj-process-item" key={no}>
              <span className="pj-process-no">{no}</span>
              <span className="pj-process-label">{label}</span>
              <p className="pj-process-text">{text}</p>
            </div>
          ))}
        </div>
      );
    case "metrics":
      return (
        <div className="pj-metrics">
          {(b.items ?? []).map((m, i) => (
            <div className="pj-metric" key={i}>
              <span className="pj-metric-v">{m.value}</span>
              {m.label && <span className="pj-metric-l">{m.label}</span>}
            </div>
          ))}
        </div>
      );
    case "video": {
      const external = /^https?:\/\//.test(b.src);
      if (external) {
        return (
          <figure className="pj-figure">
            <a className="pj-video-card" href={b.src} target="_blank" rel="noreferrer">
              {b.poster && <img src={b.poster} alt={b.caption ?? "视频封面"} loading={load} />}
              <span className="pj-video-mark">▶ {b.caption || "观看视频（外链）"}</span>
            </a>
          </figure>
        );
      }
      return (
        <figure className="pj-figure">
          <video className="pj-video" controls preload="none" poster={b.poster} src={b.src} />
          {b.caption && <figcaption className="pj-cap">{b.caption}</figcaption>}
        </figure>
      );
    }
    case "compare":
      return (
        <div className="pj-compare">
          {([["前", b.before], ["后", b.after]] as const).map(([label, src]) =>
            src ? (
              <figure className="pj-figure" key={label}>
                <img src={src} alt={`${label}（${b.caption ?? ""}）`} loading={load} onClick={() => onZoom(src)} />
                <figcaption className="pj-cap">{label}{b.caption ? ` · ${b.caption}` : ""}</figcaption>
              </figure>
            ) : null,
          )}
        </div>
      );
    default:
      return null;
  }
}

export function renderBody(
  body: ProjectBlock[] | undefined,
  opts: { onZoom: (src: string) => void; eager?: boolean },
): { blocks: ReactNode[]; toc: { id: string; text: string }[] } {
  const tocList: { id: string; text: string }[] = [];
  const out: ReactNode[] = [];
  let h2n = 0;
  (body ?? []).forEach((b, i) => {
    if (b.type === "note") return;
    if (b.type === "heading" && b.level !== "h3") {
      h2n += 1;
      const id = `pj-sec-${h2n}`;
      tocList.push({ id, text: b.text });
      out.push(
        <h2 key={i} id={id} className="fb-sec pj-sec">
          <span className="fb-sec-no">§ {String(h2n).padStart(2, "0")}</span>
          {b.text}
        </h2>,
      );
      return;
    }
    out.push(<BlockView key={i} b={b} onZoom={opts.onZoom} eager={opts.eager} />);
  });
  return { blocks: out, toc: tocList };
}
