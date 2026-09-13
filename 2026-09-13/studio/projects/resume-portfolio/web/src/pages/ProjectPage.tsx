import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { projectBySlug, type ProjectBlock } from "../lib/content";
import { navigateProject, withViewTransition } from "../lib/route";
import { readLang, readTheme, saveLang, saveTheme, type Lang, type Theme } from "../lib/prefs";
import { prefersReducedMotion } from "../hooks/useReveal";
import "../demo/flipbook.css"; // 复用头栏/语言/主题/MD/发丝线体系（fb-*）
import "../styles/project.css";

/* ============================================================
   项目详情页（博文式长文）· 2026-09-13 pilot
   形态对标 Scott Fryxell 博文（R-27 同作者的单栏长文流）：
   H1 + meta + 摘要 → h2 小节（自动进左栏目录）→ 段落/图/图组/引用/四问/数字行。
   内容源 content/projects/<slug>.yml：与 Decap 后台、AI-Native 生成器三方同源。
   说明：语言切换只作用于页框 chrome；正文 en 版待白纸供稿（内容架构 §2.2 en 缺省回落中文）。
   ============================================================ */

const T = {
  zh: {
    back: "← 作品集",
    toc: "目录",
    mdTitle: "本页 Markdown 副本",
    mdCopy: "复制 Markdown",
    mdDownload: "下载 .md",
    mdDownloadHtml: "下载 HTML",
    mdCopied: "Markdown 已复制",
    mdFail: "复制不可用，请用下载",
    pendingMeta: "（时期与角色待补）",
  },
  en: {
    back: "← Portfolio",
    toc: "Contents",
    mdTitle: "This page as Markdown",
    mdCopy: "Copy Markdown",
    mdDownload: "Download .md",
    mdDownloadHtml: "Download HTML",
    mdCopied: "Markdown copied",
    mdFail: "Copy unavailable — use download",
    pendingMeta: "(period & role pending)",
  },
} as const;

const STATUS: Record<string, string> = { latest: "最新", ongoing: "进行中", archived: "归档" };

/* sun/moon 线稿（与 FlipbookDemo 头栏同款 Feather path；暂不抽公共件，简历页验收期内不动它） */
const SunIcon = () => (
  <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function ProjectPage({ slug }: { slug: string }) {
  const project = projectBySlug(slug);
  /* 主题/语言读 localStorage（与翻页书共用 prefs）——在书内切了黑夜/英文，进项目页不断档 */
  const [lang, setLang] = useState<Lang>(() => readLang());
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  useEffect(() => { document.documentElement.dataset.theme = theme; saveTheme(theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; saveLang(lang); }, [lang]);
  useEffect(() => {
    document.title = project ? `${project.title} · 陈柏志` : "条目不存在 · 陈柏志";
    return () => { document.title = "陈柏志 · 白纸上"; };
  }, [project]);

  const t = T[lang];
  const [lightbox, setLightbox] = useState<string | null>(null);
  const back = () => navigateProject(null);

  /* MD 副本（与首页头栏同款交互；路径 = 生成器产物 /projects/<slug>.md） */
  const mdPath = `/projects/${slug}.md`;
  const htmlPath = `/projects/${slug}.html`;
  const [mdOpen, setMdOpen] = useState(false);
  const mdRef = useRef<HTMLDivElement | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!mdOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMdOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (mdRef.current && !mdRef.current.contains(e.target as Node)) setMdOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [mdOpen]);
  const copyMd = () => {
    fetch(mdPath)
      .then((r) => { if (!r.ok) throw new Error("not-found"); return r.text(); })
      .then((text) => {
      const done = () => { setToast(t.mdCopied); clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(null), 1600); };
      const fail = () => { setToast(t.mdFail); clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(null), 2200); };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, fail);
      else fail();
      setMdOpen(false);
    })
    .catch(() => { setToast(t.mdFail); clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(null), 2200); });
  };

  /* Esc：MD 菜单开着→只关菜单；灯箱开着→只关灯箱；否则返回作品集 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || mdOpen) return;
      if (lightbox) setLightbox(null);
      else back();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, mdOpen]);

  /* 块渲染 + h2 自动编号/目录收集（note=草稿旁注不渲染，与生成器口径一致；
     h2 < 3 不渲染目录——内容架构 §5 边界） */
  const { blocks, toc } = useMemo(() => {
    const tocList: { id: string; text: string }[] = [];
    const out: ReactNode[] = [];
    let h2n = 0;
    (project?.body ?? []).forEach((b, i) => {
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
      out.push(<BlockView key={i} b={b} onZoom={setLightbox} />);
    });
    return { blocks: out, toc: tocList };
  }, [project]);

  /* 目录滚动高亮：IntersectionObserver（不做 scroll 轮询——内容架构 §5） */
  const [activeSec, setActiveSec] = useState<string | null>(null);
  useEffect(() => {
    if (toc.length < 3) return;
    const els = toc.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActiveSec(e.target.id); }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  if (!project) {
    return (
      <div className="pj-page">
        <header className="fb-header">
          <div className="fb-header-id">
            <span className="fb-header-name">白纸上</span>
            <span className="fb-header-tag">HUMANIST DESIGN ENGINEER</span>
          </div>
          <nav className="fb-header-nav">
            <a href="/" onClick={(e) => { e.preventDefault(); back(); }}>{t.back}</a>
          </nav>
        </header>
        <div className="pj-article">
          <p className="pj-p">内容条目不存在：{slug}</p>
        </div>
      </div>
    );
  }

  const accentStyle = project.accent ? ({ "--pj-accent": project.accent } as CSSProperties) : undefined;
  const metaLine = [project.period, project.role].filter(Boolean).join(" · ");
  const tocNav = (cls: string) => (
    <nav className={cls} aria-label={t.toc}>
      {toc.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={activeSec === s.id ? "is-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
          }}>
          {s.text}
        </a>
      ))}
    </nav>
  );

  return (
    <div className="pj-page" style={accentStyle}>
      <header className="fb-header">
        <div className="fb-header-id">
          <span className="fb-header-name">白纸上</span>
          <span className="fb-header-tag">HUMANIST DESIGN ENGINEER</span>
        </div>
        <nav className="fb-header-nav">
          <a href="/" onClick={(e) => { e.preventDefault(); back(); }}>{t.back}</a>
          <button type="button" className="fb-langbtn" aria-label="切换语言 / switch language"
            onClick={() => withViewTransition(() => setLang((l) => (l === "zh" ? "en" : "zh")))}>
            <span className={lang === "zh" ? "seg on" : "seg"}>中</span>
            <span className={lang === "en" ? "seg on" : "seg"}>EN</span>
          </button>
          <button type="button" className="fb-iconbtn" aria-label={theme === "light" ? "切换到黑夜模式" : "切换到白天模式"}
            onClick={() => withViewTransition(() => setTheme((v) => (v === "light" ? "dark" : "light")))}>
            <SunIcon /><MoonIcon />
          </button>
          <div className="fb-md" ref={mdRef}>
            <button type="button" className="fb-mdbtn" onClick={() => setMdOpen((v) => !v)}
              aria-expanded={mdOpen} aria-haspopup="menu" aria-label={t.mdTitle}>MD</button>
            {mdOpen && (
              <div className="fb-mdmenu" role="menu" aria-label={t.mdTitle}>
                <span className="fb-mdmenu-title">{t.mdTitle}</span>
                <button type="button" role="menuitem" className="fb-mdmenu-item" onClick={copyMd}>{t.mdCopy}</button>
                <a role="menuitem" className="fb-mdmenu-item" href={mdPath} download>{t.mdDownload}</a>
                <a role="menuitem" className="fb-mdmenu-item" href={htmlPath} download>{t.mdDownloadHtml}</a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {toc.length >= 3 && (
        <div className="pj-toc-rail">
          <p className="pj-toc-label">{t.toc}</p>
          {tocNav("pj-toc")}
        </div>
      )}

      <article className="pj-article">
        {toc.length >= 3 && (
          <details className="pj-toc-m">
            <summary>{t.toc}</summary>
            {tocNav("pj-toc-m-list")}
          </details>
        )}

        <header className="pj-head">
          {project.status && <span className="pj-status">{STATUS[project.status] ?? project.status}</span>}
          <h1 className="pj-title">{project.title}</h1>
          <p className="pj-meta">{metaLine || t.pendingMeta}</p>
          {project.summary && <p className="pj-standfirst">{project.summary}</p>}
          {project.cover && <img className="pj-cover" src={project.cover} alt={`${project.title} 封面`} />}
          {!!project.metrics?.length && (
            <div className="pj-metrics">
              {project.metrics.map((m, i) => (
                <div className="pj-metric" key={i}>
                  <span className="pj-metric-v">{m.value}</span>
                  {m.label && <span className="pj-metric-l">{m.label}</span>}
                </div>
              ))}
            </div>
          )}
          {!!project.tags?.length && <p className="pj-tags">{project.tags.map((x) => `#${x}`).join("　")}</p>}
        </header>

        {blocks}

        <footer className="pj-foot">
          <a href="/" onClick={(e) => { e.preventDefault(); back(); }}>{t.back}</a>
        </footer>
      </article>

      {toast && <div className="fb-toast" role="status">{toast}</div>}
      <dialog className="pj-lightbox" open={lightbox !== null} onClick={() => setLightbox(null)}>
        {lightbox && <img src={lightbox} alt="" />}
      </dialog>
    </div>
  );
}

/* 块 → 版式（compare 有意偏离：先两栏并排+前后标注，滑杆交互后补——pilot 以内容通道优先） */
function BlockView({ b, onZoom }: { b: ProjectBlock; onZoom: (src: string) => void }) {
  switch (b.type) {
    case "paragraph": {
      const pending = /^（(占位|待补)/.test(b.text);
      return <p className={"pj-p" + (pending ? " is-pending" : "")}>{b.text}</p>;
    }
    case "heading":
      return <h3 className="pj-h3">{b.text}</h3>;
    case "figure":
      return (
        <figure className="pj-figure">
          <img src={b.image} alt={b.caption ?? ""} loading="lazy" onClick={() => onZoom(b.image)} />
          {b.caption && <figcaption className="pj-cap">{b.caption}</figcaption>}
        </figure>
      );
    case "gallery":
      return (
        <div className={"pj-gallery" + ((b.images?.length ?? 0) > 2 ? " is-three" : "")}>
          {(b.images ?? []).map((im, i) => (
            <figure className="pj-figure" key={i}>
              <img src={im.image} alt={im.caption ?? ""} loading="lazy" onClick={() => onZoom(im.image)} />
              {im.caption && <figcaption className="pj-cap">{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="pj-quote">
          <p>{b.text}</p>
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
              {b.poster && <img src={b.poster} alt={b.caption ?? "视频封面"} loading="lazy" />}
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
                <img src={src} alt={`${label}（${b.caption ?? ""}）`} loading="lazy" onClick={() => onZoom(src)} />
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
