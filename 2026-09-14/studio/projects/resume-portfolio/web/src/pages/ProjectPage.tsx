import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { projectBySlug, writingBySlug, type ProjectBlock } from "../lib/content";
import { navigateProject, withViewTransition } from "../lib/route";
import { readLang, readTheme, saveLang, saveTheme, type Lang, type Theme } from "../lib/prefs";
import { mixHex, THEME_BASES } from "../lib/color";
import { CalligraphyArt } from "../components/CalligraphyArt";
import { renderBody } from "../components/blocks";
import { prefersReducedMotion } from "../hooks/useReveal";
import "../demo/flipbook.css"; // 复用头栏/语言/主题/MD/发丝线体系（fb-*）
import "../styles/project.css";

/* ============================================================
   长页详情（项目 + 文章，同一渲染口）· 2026-09-13
   与海报墙（列表）共用同一副骨架（对标 Scott Fryxell：列表项与博文页同为
   figure 结构——右侧画面 / 左侧标题·时间·小注 / 下方正文），跳转前后近似 → 连续性。
   · kind="project"：内容源 content/projects/<slug>.yml（与 Decap/生成器三方同源），封面=渐变占位；
   · kind="writing"：内容源 content/writing/<slug>.yml（2026-09-13 晚新增），封面=书画（放大的文眼）。
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

/* 归一形状：项目与文章共用同一渲染口（文章无 status/cover/metrics，封面走书画） */
type EntryLike = {
  title: string;
  slug: string;
  accent?: string;
  summary?: string;
  body?: ProjectBlock[];
  status?: string;
  period?: string;
  role?: string;
  cover?: string;
  metrics?: { value: string; label?: string }[];
  tags?: string[];
  date?: string;
  kind?: string;
  calligraphy?: { chars?: string; image?: string; cropFrom?: string; cropTo?: string; zoomImage?: string; focus?: string };
};

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

export function ProjectPage({ slug, kind = "project" }: { slug: string; kind?: "project" | "writing" }) {
  const isWriting = kind === "writing";
  const project = (isWriting ? writingBySlug(slug) : projectBySlug(slug)) as EntryLike | undefined;
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

  /* 块渲染 + h2 自动编号/目录收集：共用 components/blocks（墙内展开态同一份实现） */
  const { blocks, toc } = useMemo(() => renderBody(project?.body, { onZoom: setLightbox }), [project]);

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

  /* 目录出现时机（白纸 09-13：钉在页面下方不好看）：滚到正文才开始显示、位置回到左上。
     横幅占满首屏时目录不出现；正文顶进入视口上 35% 才亮起（IO，无滚动轮询）。 */
  const [tocOn, setTocOn] = useState(false);
  useEffect(() => {
    if (toc.length < 3) return;
    const el = document.querySelector(".pj-body");
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setTocOn(e.isIntersecting)),
      { rootMargin: "0px 0px -65% 0px" },
    );
    io.observe(el);
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
        <div className="pj-main">
          <div className="pj-body">
            <p className="pj-p">内容条目不存在：{slug}</p>
          </div>
        </div>
      </div>
    );
  }

  const accentStyle = project.accent ? ({ "--pj-accent": project.accent } as CSSProperties) : undefined;
  const metaLine = isWriting
    ? [project.date, project.kind].filter(Boolean).join(" · ")
    : [project.period, project.role].filter(Boolean).join(" · ");
  /* 横幅占位视觉与海报墙同源（同一混色公式）：真封面到位前，两处渐变一致，连续性可见；
     书画条目不走渐变（纸面 = 页面地面） */
  const base = THEME_BASES[theme];
  const artStyle = !project.calligraphy && project.accent ? {
    background:
      `radial-gradient(120% 90% at 20% 15%, ${mixHex(base.white, project.accent, 0.42)}, ${mixHex(base.white, project.accent, 0.1)} 62%),` +
      `linear-gradient(160deg, ${mixHex(base.white, project.accent, 0.18)}, ${mixHex(base.card, project.accent, 0.34)})`,
  } : undefined;
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
          {/* MD/HTML 副本菜单：仅项目条目（生成器产物在 /projects/ 下；
              文章的 .md 副本待生成器扩展，见 HANDOFF 待办） */}
          {!isWriting && (
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
          )}
        </nav>
      </header>

      {toc.length >= 3 && (
        <div className={"pj-toc-rail" + (tocOn ? " is-on" : "")}>
          <p className="pj-toc-label">{t.toc}</p>
          {tocNav("pj-toc")}
        </div>
      )}

      <main className="pj-main">
        {/* 项目横幅：与海报墙同一副骨架（右图 / 左题·时间·小注 / 下正文）——
            白纸 09-13：「跳转之后，整个页面结构还是近似的」，连续性由同一 figure 结构承担 */}
        <figure className="pj-band">
          {/* 文章 = 书画（放大的文眼，与墙面展开态同一画面）；项目 = 渐变占位/真封面 */}
          <div className={"pj-band-art" + (project.calligraphy ? " is-calli" : "")} style={artStyle}>
            {project.calligraphy ? (
              <CalligraphyArt
                image={project.calligraphy.image || undefined}
                cropFrom={project.calligraphy.cropFrom}
                cropTo={project.calligraphy.cropTo}
                zoomImage={project.calligraphy.zoomImage}
                focus={project.calligraphy.focus}
                chars={project.calligraphy.chars}
                pr={1}
              />
            ) : project.cover ? (
              <img src={project.cover} alt="" />
            ) : (
              <span className="pj-band-mark">COVER · 占位</span>
            )}
          </div>
          <figcaption className="pj-band-cap">
            {project.status && <span className="pj-status">{STATUS[project.status] ?? project.status}</span>}
            <h1 className="pj-title">{project.title}</h1>
            <p className="pj-meta">{metaLine || t.pendingMeta}</p>
            {project.summary && <p className="pj-standfirst">{project.summary}</p>}
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
            {/* 返回 ×（Scott 博文页同款位：横幅左下角，字符「+」转 45°）——头栏「←」之外的第二入口 */}
            <a className="pj-back" href="/" onClick={(e) => { e.preventDefault(); back(); }} aria-label={t.back}>+</a>
          </figcaption>
        </figure>

        <div className="pj-body">
          {toc.length >= 3 && (
            <details className="pj-toc-m">
              <summary>{t.toc}</summary>
              {tocNav("pj-toc-m-list")}
            </details>
          )}

          {blocks}

          <footer className="pj-foot">
            <a href="/" onClick={(e) => { e.preventDefault(); back(); }}>{t.back}</a>
          </footer>
        </div>
      </main>

      {toast && <div className="fb-toast" role="status">{toast}</div>}
      <dialog className="pj-lightbox" open={lightbox !== null} onClick={() => setLightbox(null)}>
        {lightbox && <img src={lightbox} alt="" />}
      </dialog>
    </div>
  );
}
