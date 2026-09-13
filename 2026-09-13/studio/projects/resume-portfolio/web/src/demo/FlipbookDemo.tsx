import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { GithubHeatmap } from "../components/GithubHeatmap";
import { prefersReducedMotion } from "../hooks/useReveal";
import { navigateProject } from "../lib/route";
import { readLang, readTheme, saveLang, saveTheme } from "../lib/prefs";
import "./flipbook.css";
import {
  IDENTITY, ABOUT, BEYOND_INTRO, BEYOND, WORK, OTHER_PROJECTS, POSTER_WALL,
  AWARDS_DESIGN, AWARDS_HONOR, COURSES, SELF_EVAL_INTRO, SELF_EVAL_QUOTES, SELF_EVAL_BODY, DOCS, ROLE_LINE,
} from "../data/resume";

/* ============================================================
   翻页书 Demo v4 —— 首页精确对标 Scott Fryxell / R-27（实测数据：
   全幅 100vw · 海报 72vh · 缝 1px · 标题压图左下 · 细体大字 · 头 sticky）
   结构：loader-motto → 全幅海报墙（页内纵滚）→ G-21 展开 → 简历页 → 联系页
   翻页=滚轮（页内可纵滚内容优先，到底才翻页）· 无 ← → 键（白纸拍板）
   令牌：tokens.css（BST v1.1）· 零假数据（占位皆标注）· reduced-motion 降级
   ============================================================ */

/* ============================================================
   双语（zh/en）与黑夜（light/dark）——2026-09-01 白纸要求，替换头栏 Contact 位。
   分工（AI 提案，待白纸校）：UI chrome + 占位提示双语；简历条目/项目名保留中文
   （专名不硬造英文名；条目英文版待白纸校对后另上）。en 加载屏=英文配铭（Product.md §3）。
   ============================================================ */
type Lang = "zh" | "en";
type Theme = "light" | "dark";

const T = {
  zh: {
    pages: ["首页", "简历", "联系"],
    motto: "如切如磋，如琢如磨",
    loaderHint: "点按进入 · 可跳过",
    coverMark: "COVER · 占位",
    imgslot: "下方为项目图流位置 · 待 Figma 导出",
    labels: { about: "关于", beyond: "专业之外", work: "实习经历", projects: "其他项目经历", awards: "获奖", courses: "部分课程成绩", self: "自我评价", docs: "证明材料" },
    restPeriod: { cert: "证书", club: "社团" } as Record<string, string>,
    hello: "接受实习与合作咨询，欢迎来信。",
    status: "状态 · 开放中（2026 Q4）",
    seeMore: "展开",
    seeLess: "收起",
    copyToast: "邮箱已复制",
    mdTitle: "本页 Markdown 副本",
    mdCopy: "复制 Markdown",
    mdDownload: "下载 .md",
    mdDownloadHtml: "下载 HTML",
    mdCopied: "Markdown 已复制",
    mdFail: "复制不可用，请用下载",
    readMore: "阅读全文",
  },
  en: {
    pages: ["Home", "Resume", "Contact"],
    motto: "I saw the angel in the marble, and carved until I set him free.",
    loaderHint: "Click to enter · skippable",
    coverMark: "COVER · PLACEHOLDER",
    imgslot: "Project image stream below · awaiting Figma export",
    labels: { about: "About", beyond: "Beyond the Major", work: "Internships", projects: "Other Projects", awards: "Awards", courses: "Selected Coursework", self: "Self-Assessment", docs: "Documents" },
    restPeriod: { cert: "CERT", club: "CLUB" } as Record<string, string>,
    hello: "Open to internships and collaborations — write to me.",
    status: "STATUS · OPEN (2026 Q4)",
    seeMore: "See more",
    seeLess: "See less",
    copyToast: "Email copied",
    mdTitle: "This page as Markdown",
    mdCopy: "Copy Markdown",
    mdDownload: "Download .md",
    mdDownloadHtml: "Download HTML",
    mdCopied: "Markdown copied",
    mdFail: "Copy unavailable — use download",
    readMore: "Read more",
  },
} as const;

/* 混色基准随主题：dark 下以深地面为底混项目色（渐变占位封面双态可用） */
const THEME_BASES: Record<Theme, { white: string; card: string; ink: string }> = {
  light: { white: "#ffffff", card: "#f3f3f3", ink: "#141414" },
  dark: { white: "#0a0a0a", card: "#151515", ink: "#f9f9f9" },
};

/* 离散状态切换（主题/语言）的全页过渡：View Transition API cross-fade；
   旧内核无此 API → 降级直接切换（try 结构 + 特性检测，绝不阻断切换本身） */
const withViewTransition = (fn: () => void) => {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (typeof doc.startViewTransition === "function") doc.startViewTransition(fn);
  else fn();
};

/* sun/moon 线稿（Feather path，shadcn/magic 同源手法：双图标叠放，切换时旋转缩放交叉） */
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

const dirYingze = (p: number) => 1 - Math.pow(1 - p, 3); // easeOutCubic
/* 动画进度：rAF 驱动 + 150ms 兜底定时器。
   ⚠️部分旧内核/特殊窗口模式下 rAF 会被节流或暂停（用户旧 Edge「动效不动」头号嫌疑）；
   定时器走 performance.now 墙钟，保证动画至少以 ~7fps 推进。两者同写一个进度，无冲突。 */

/* hex 混色（替代 color-mix——旧 Edge 不支持会整条 background 失效） */
function mixHex(a: string, b: string, wt: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (sh: number) => {
    const x = ((pa >> sh) & 255) * (1 - wt) + ((pb >> sh) & 255) * wt;
    return Math.round(x).toString(16).padStart(2, "0");
  };
  return `#${ch(16)}${ch(8)}${ch(0)}`;
}

function useProgress(open: boolean, reduced: boolean) {
  const [prog, setProg] = useState(reduced ? (open ? 1 : 0) : 0);
  const tRef = useRef<HTMLSpanElement | null>(null); // 探针直写 DOM：rAF 60fps 不触发 React 重渲染
  const progRef = useRef(prog);
  useEffect(() => {
    if (reduced) { setProg(open ? 1 : 0); progRef.current = open ? 1 : 0; return; }
    if (!open && progRef.current === 0) return; // 挂载即关闭态：不跑"收起"动画（防展开态闪帧）
    const target = open ? 1 : 0;
    const from = open ? 0 : 1;
    const dur = open ? 600 : 350;
    let stop = false;
    let t0: number | null = null;
    const apply = (now: number): boolean => {
      if (t0 === null) t0 = now;
      const raw = Math.min(1, (now - t0) / dur);
      const v = from + (target - from) * dirYingze(raw);
      progRef.current = v;
      setProg(v);
      if (tRef.current) tRef.current.textContent = v.toFixed(2);
      return raw >= 1;
    };
    const wallNow = () => (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    let raf = 0;
    const step = (ts: number) => { if (!stop && !apply(ts)) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    /* 兜底定时器：rAF 被节流/暂停时按墙钟继续推进（旧内核保险），完成即自停 */
    const iv = setInterval(() => { if (!stop) { if (apply(wallNow())) clearInterval(iv); } }, 150);
    return () => { stop = true; cancelAnimationFrame(raf); clearInterval(iv); };
  }, [open, reduced]);
  return [prog, tRef] as const;
}

export function FlipbookDemo() {
  const reduced = prefersReducedMotion();
  /* 主题/语言持久化（2026-09-13 随项目页 pilot 加）：与项目页共用 prefs，
     进出项目页黑夜/英文不断档；首访默认 zh/light（与原行为一致） */
  const [lang, setLang] = useState<Lang>(() => readLang());
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  useEffect(() => { document.documentElement.dataset.theme = theme; saveTheme(theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; saveLang(lang); }, [lang]);
  const toggleLang = () => withViewTransition(() => setLang((l) => (l === "zh" ? "en" : "zh")));
  const toggleTheme = () => withViewTransition(() => setTheme((v) => (v === "light" ? "dark" : "light")));
  const t = T[lang];
  const base = THEME_BASES[theme];
  /* 各节渐进披露开关（默认收起=紧凑态） */
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({});
  const isOpen = (k: string) => !!openSecs[k];
  const toggleSec = (k: string) => setOpenSecs((s) => ({ ...s, [k]: !s[k] }));
  /* 邮箱点击复制（Product.md §7.2 拍板件）+ toast 反馈；
     clipboard API 不可用时降级为仅 toast（访客手动复制），绝不报错打断 */
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const copyMail = (text: string) => {
    const done = () => {
      setToast(t.copyToast);
      clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(done);
    else done();
  };
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [lastOpen, setLastOpen] = useState(0);
  const [expProg, probeTRef] = useProgress(openIdx !== null, reduced);
  /* 收起动画期仍归属那张海报：openIdx 清空瞬间 expProg 才从 1→0 跑，
     若 pr 直接归零，图宽/面板/× 全部瞬移——就是"返回没有动画"的根因 */
  const shownIdx = openIdx !== null ? openIdx : (expProg > 0.001 ? lastOpen : null);
  useEffect(() => { if (openIdx !== null) setLastOpen(openIdx); }, [openIdx]);
  /* 加载屏每会话只播一次（sessionStorage bs-entered，2026-09-13 随项目页 pilot 加）：
     从项目页返回书内不重播开场；新开标签页/新会话仍完整播放 */
  const [ready, setReady] = useState(() => sessionStorage.getItem("bs-entered") === "1");
  const [loaderPhase, setLoaderPhase] = useState<"visible" | "leaving" | "gone">(
    () => (sessionStorage.getItem("bs-entered") === "1" ? "gone" : "visible"),
  );
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const artWrapRef = useRef<HTMLDivElement | null>(null);
  const detailsHRef = useRef(0); // 展开正文实测高（mount 时测一次，供高度动画用）
  const total = 3;

  /* ---- MD 副本按钮（AI Native 第一波②）：当前页的 .md 复制/下载 ----
     页→文件映射与生成器产物一一对应；项目页有独立路由后在此追加映射 */
  /* MD/HTML 副本映射（HTML=2026-09-13 白纸新增；首页 HTML 叫 home.html——/index.html 是站点本体） */
  const MD_FILES = [
    { md: "/index.md", html: "/home.html" },
    { md: "/resume.md", html: "/resume.html" },
    { md: "/contact.md", html: "/contact.html" },
  ];
  const mdPath = (MD_FILES[page] ?? MD_FILES[0]).md;
  const htmlPath = (MD_FILES[page] ?? MD_FILES[0]).html;
  const [mdOpen, setMdOpen] = useState(false);
  const mdRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (reduced) { setReady(true); return; }
    /* 兜底墙钟：正常由 TrestleLoader 时间轴 onDone 先到（~2.1s），此处只防旧内核定时器被冻结 */
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, [reduced]);

  /* 加载屏退场：visible → leaving（淡出+上移 320ms）→ gone（卸载）
     ⚠️必须显式三态：若用"!ready || leaving"条件，ready 翻转当帧 leaving 尚未置位，
     加载屏会被直接卸载，退场动画永不播放（2026-09-12 实测踩到） */
  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem("bs-entered", "1");
    setLoaderPhase((p) => (p === "gone" ? "gone" : "leaving"));
    const t = setTimeout(() => setLoaderPhase("gone"), prefersReducedMotion() ? 0 : 320);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      const idx = Math.round(vp.scrollLeft / vp.clientWidth);
      const active = vp.children[idx] as HTMLElement | undefined;
      if (active && active.scrollHeight > active.clientHeight + 4) {
        const canUp = active.scrollTop > 0 && e.deltaY < 0;
        const canDown = active.scrollTop < active.scrollHeight - active.clientHeight - 4 && e.deltaY > 0;
        if (canUp || canDown) return; // 页内纵滚优先
        if (e.deltaY < 0) { active.scrollTop = 0; }
        if (e.deltaY > 0) { active.scrollTop = active.scrollHeight; }
      }
      e.preventDefault();
      vp.scrollLeft += e.deltaY || e.deltaX;
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(vp.scrollLeft / vp.clientWidth);
        setPage((prev) => (prev !== i ? i : prev));
      });
    };
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => { vp.removeEventListener("scroll", onScroll); vp.removeEventListener("wheel", onWheel); cancelAnimationFrame(raf); };
  }, []);

  const autoExpand = new URLSearchParams(window.location.search).has("expand");
  const probe = new URLSearchParams(window.location.search).has("probe");
  const debugPage = Number(new URLSearchParams(window.location.search).get("page") ?? "NaN"); // 调试直达 ?page=N
  useEffect(() => { if (autoExpand) setOpenIdx(0); }, [autoExpand]);
  useEffect(() => {
    if (!Number.isFinite(debugPage) || debugPage < 1) return;
    const vp = viewportRef.current; if (!vp) return;
    vp.scrollLeft = vp.clientWidth * debugPage; setPage(debugPage);
  }, [debugPage]);

  /* 滚动驱动揭示：海报进视口加 is-in（一次性，reduced-motion 全显） */
  useEffect(() => {
    if (!ready) return;
    const wall = document.querySelector<HTMLElement>('.fb-page--wall');
    if (!wall) return;
    if (prefersReducedMotion()) { wall.querySelectorAll('.fb-poster').forEach((el) => el.classList.add("is-in")); return; }
    const posters = wall.querySelectorAll<HTMLElement>('.fb-poster');
    /* 先补视口内已可见的（不依赖 IO），其余交给 IO */
    posters.forEach((el) => {
      if (el.getBoundingClientRect().top < wall.clientHeight) el.classList.add("is-in");
    });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { root: wall, threshold: 0.18 });
    posters.forEach((el) => { if (!el.classList.contains("is-in")) io.observe(el); });
    return () => io.disconnect();
  }, [ready]);
  const go = (i: number) => { setOpenIdx(null); viewportRef.current?.scrollTo({ left: viewportRef.current.clientWidth * i, behavior: "smooth" }); };

  /* 展开时若海报整张在折叠线以下：等宽收缩结束后把图柱滚入视野 */
  useEffect(() => {
    if (openIdx === null) return;
    const t = setTimeout(() => {
      const el = artWrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const wall = document.querySelector<HTMLElement>('.fb-page--wall');
      if (!wall) return;
      const wr = wall.getBoundingClientRect();
      if (r.top >= wr.bottom || r.bottom <= wr.top) {
        el.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    }, 650);
    return () => clearTimeout(t);
  }, [openIdx]);

  return (
    <div className={"fb-root" + (ready ? " is-ready" : "")}>
      {probe && (
        <div style={{ position: "fixed", top: 4, right: 4, zIndex: 99, background: "#fff", border: "1px solid #000", padding: "6px 10px", font: "12px monospace", color: "#000" }}>
          t=<span ref={probeTRef}>0.00</span> · w={(100 - expProg * 73).toFixed(0)}
        </div>
      )}
      {loaderPhase !== "gone" && (
        <TrestleLoader onClick={() => setReady(true)} leaving={loaderPhase === "leaving"} onDone={() => setReady(true)} />
      )}

      <header className="fb-header">
        <div className="fb-header-id">
          <span className="fb-header-name">白纸上</span>
          <span className="fb-header-tag">HUMANIST DESIGN ENGINEER</span>
        </div>
        <nav className="fb-header-nav">
          <a href="#fb-1" onClick={(e) => { e.preventDefault(); go(1); }}>Resume</a>
          {/* 语言胶囊：双段，激活段墨底反白（A4 active 拍板）；主题：sun/moon 图标钮（magic/shadcn 手法） */}
          <button type="button" className="fb-langbtn" onClick={toggleLang} aria-label="切换语言 / switch language">
            <span className={lang === "zh" ? "seg on" : "seg"}>中</span>
            <span className={lang === "en" ? "seg on" : "seg"}>EN</span>
          </button>
          <button type="button" className="fb-iconbtn" onClick={toggleTheme}
            aria-label={theme === "light" ? "切换到黑夜模式" : "切换到白天模式"}>
            <SunIcon /><MoonIcon />
          </button>
          {/* MD 副本（AI Native 第一波②）：与生成器产物同源；项目页有独立路由后在此追加映射 */}
          <div className="fb-md" ref={mdRef}>
            <button type="button" className="fb-mdbtn" onClick={() => setMdOpen((v) => !v)}
              aria-expanded={mdOpen} aria-haspopup="menu" aria-label="本页 Markdown 副本 / this page as Markdown">MD</button>
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

      <header className="fb-indicator" aria-label="页码指示器">
        <span className="fb-indicator-page">{String(page + 1).padStart(2, "0")}</span>
        <span className="fb-indicator-name" key={page}>{t.pages[page]}</span>
        <span className="fb-indicator-divider">/</span>
        <span className="fb-indicator-total">{String(total).padStart(2, "0")}</span>
      </header>

      <div className="fb-viewport" ref={viewportRef}>
        {/* ---- P1 首页 = Scott 式全幅海报墙（页内纵滚） ---- */}
        <section className="fb-page fb-page--wall" id="fb-0">
          <div className="fb-wallstack">
            {POSTER_WALL.map((p, i) => {
              const isThis = shownIdx === i;
              const pr = isThis ? expProg : 0;
              const slug = p.slug; // 有 slug=内容系统已有该项目的条目，展开态出「阅读全文」入口
              return (
              <Fragment key={p.no}>
                {/* 海报+正文包进同一个随进度收起的高度动画容器：
                    maxHeight = 海报 72vh 恒定 + pr×正文实测高（收起=图扩回与正文裁高同步，
                    替代此前"details 瞬间卸载"的突兀断帧）；海报本体透明度不受影响 */}
                <div className="fb-poster-collapse" style={{
                    maxHeight: `calc(72vh + ${pr * (detailsHRef.current || 640)}px)`,
                  }}>
                  <article key={p.no} className={"fb-poster" + (isThis ? " is-open" : "")}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenIdx(openIdx === i ? null : i)}
                role="button" tabIndex={0} aria-expanded={openIdx === i}>
                <div className="fb-poster-art" aria-hidden
                  ref={isThis ? (el) => { artWrapRef.current = el; } : undefined}
                  style={{
                    width: `${100 - pr * 73}%`, /* 100% → 27%；JS 逐帧插值驱动，任何浏览器一致 */
                    background: `radial-gradient(120% 90% at 20% 15%, ${mixHex(base.white, p.accent, 0.42)}, ${mixHex(base.white, p.accent, 0.1)} 62%),
                 linear-gradient(160deg, ${mixHex(base.white, p.accent, 0.18)}, ${mixHex(base.card, p.accent, 0.34)})`,
                  }}>
                  <span className="fb-poster-art-no" style={{ color: mixHex(base.white, p.accent, 0.68), maxWidth: `${100 - pr * 73}%` }}>{p.no}</span>
                  <span className="fb-poster-art-word" style={{ color: mixHex(base.ink, p.accent, 0.55), opacity: pr < 0.5 ? 1 : (pr - 0.5) * 2, maxWidth: `${100 - pr * 73}%` }}>{p.title.slice(0, 6)}</span>
                  <span className="fb-poster-art-mark" style={{ color: mixHex("#9a9a9a", p.accent, 0.45), opacity: pr < 0.5 ? 1 : (pr - 0.5) * 2, maxWidth: `${100 - pr * 73}%` }}>{t.coverMark}</span>
                </div>
                <div className="fb-poster-meta" style={(() => {
                    const panel = pr >= 0.5; // 前半段=底部标题条原样，后半段才进入左面板（避免布局跳变）
                    const k = (pr - 0.5) * 2;
                    return panel ? {
                      left: 0, right: "27%", top: 0, bottom: 0,
                      display: "flex", flexDirection: "column" as const, justifyContent: "center",
                      paddingLeft: "var(--space-8)",
                      opacity: Math.max(0, k),
                      transform: `translateY(${18 * (1 - k)}px)`,
                      background: k < 0.75 ? "var(--meta-scrim)" : "none",
                    } : {
                      left: 0, right: 0, bottom: 0,
                      opacity: 1,
                      background: "var(--meta-scrim)",
                    };
                  })()}>
                  <h3 className="fb-poster-title">{p.title}</h3>
                  <p className="fb-poster-date">{p.date}</p>
                  {/* 收起=点转正后的 +（× 即 plus，点击冒泡到 article toggle）；不再放独立 close 按钮——避免双 × */}
                </div>
                <span className="fb-poster-plus" aria-hidden
                  style={{
                    /* 半程右锚→半程左锚：两分支必须互相显式清对侧，否则 left+right 双边约束把符号拉成巨块 */
                    right: pr < 0.5 ? `calc(50% + (var(--space-6) - 50%) * ${1 - pr * 2})` : "auto",
                    left: pr >= 0.5 ? `calc(50% + (var(--space-5) - 50%) * ${pr * 2 - 1})` : "auto",
                    transform: pr > 0 ? `rotate(${45 * pr}deg)` : undefined,
                  }}>+</span>
              </article>
              {shownIdx === i && (
                <div className="fb-poster-details" style={{
                    clipPath: `inset(0 0 ${(1 - pr) * 100}% 0)`,
                    opacity: pr,
                  }}
                  ref={(el) => { if (el) detailsHRef.current = el.scrollHeight; }}>
                  <p className="fb-poster-desc">{p.desc[lang]}</p>
                  {slug && (
                    <a className="fb-poster-more" href={`?project=${slug}`}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateProject(slug); }}
                      onKeyDown={(e) => e.stopPropagation()}>
                      {t.readMore} →
                    </a>
                  )}
                  {p.body[lang].map((b, bi) => <p key={bi} className="fb-poster-desc fb-poster-tobefilled">{b}</p>)}
                  <p className="fb-poster-tobefilled">{t.imgslot}</p>
                </div>
              )}
                </div>
              </Fragment>
              );
            })}
          </div>
        </section>

        {/* ---- P2 简历页（2026-09-12 白纸全量换血：身份块 + §1–§7 + 证明材料；数据源 src/data/resume.ts） ---- */}
        <section className="fb-page" id="fb-1">
          <div className="fb-col">
            {/* 页首身份块 */}
            <div className="fb-identity">
              {/* 头像：/media/avatar.jpg 存在则显示，否则退回姓氏字（零假数据，不塞占位图） */}
              <div className="fb-avatar">
                <span className="fb-avatar-fallback" aria-hidden>陈</span>
                <img src="/media/avatar.jpg" alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <p className="fb-identity-name">{IDENTITY[lang].name}</p>
              <p className="fb-identity-role">{ROLE_LINE}</p>
              <ul className="fb-identity-meta">
                {IDENTITY[lang].meta.map((m) => <li key={m}>{m}</li>)}
              </ul>
              {IDENTITY[lang].lines.map((l, li) => (
                <p key={l} className={"fb-identity-line" + (li > 0 ? " is-secondary" : "")}>{l}</p>
              ))}
              <GithubHeatmap />
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 1</span>{t.labels.about}</h3>
            <div className="fb-prose">
              {ABOUT.map((text, i) => <p key={i}>{text}</p>)}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 2</span>{t.labels.beyond}
              <SectionToggle open={isOpen("beyond")} onToggle={() => toggleSec("beyond")} t={t} />
            </h3>
            <div className="fb-prose"><p>{BEYOND_INTRO}</p></div>
            <div className="fb-swap" key={isOpen("beyond") ? "beyond-d" : "beyond-o"}>
              {!isOpen("beyond") ? (
                <div className="fb-chips">
                  {BEYOND.map((b) => <span key={b.title} className="fb-chip">{b.title}</span>)}
                </div>
              ) : (
                <div className="fb-list">
                  {BEYOND.map((b) => (
                    <div key={b.title} className="fb-row">
                      <div className="fb-row-head"><span className="fb-row-title">{b.title}</span></div>
                      <p className="fb-row-desc">{b.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 3</span>{t.labels.work}
              <SectionToggle open={isOpen("work")} onToggle={() => withViewTransition(() => toggleSec("work"))} t={t} />
            </h3>
            {!isOpen("work") && (
              <div className="fb-compact">
                {WORK.map((w, wi) => <CompactRow key={w.title} title={w.title} note={w.sub} period={w.period} vt={!isOpen("work") ? `vt-work-${wi}` : undefined} />)}
              </div>
            )}
            <Reveal open={isOpen("work")}>
              <div className="fb-list">
                {WORK.map((w, wi) => <EntryRow key={w.title} {...w} vt={isOpen("work") ? `vt-work-${wi}` : undefined} />)}
              </div>
            </Reveal>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 4</span>{t.labels.projects}
              <SectionToggle open={isOpen("projects")} onToggle={() => withViewTransition(() => toggleSec("projects"))} t={t} />
            </h3>
            {!isOpen("projects") && (
              <div className="fb-compact">
                {OTHER_PROJECTS.map((r, ri) => <CompactRow key={r.title} title={r.title} highlight={r.highlight} period={r.period} vt={!isOpen("projects") ? `vt-proj-${ri}` : undefined} />)}
              </div>
            )}
            <Reveal open={isOpen("projects")}>
              <div className="fb-list">
                {OTHER_PROJECTS.map((r, ri) => <EntryRow key={r.title} {...r} vt={isOpen("projects") ? `vt-proj-${ri}` : undefined} />)}
              </div>
            </Reveal>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 5</span>{t.labels.awards}</h3>
            <p className="fb-subsec">设计获奖</p>
            <div className="fb-list">
              {AWARDS_DESIGN.map((a) => <AwardRow key={a} raw={a} />)}
            </div>
            <p className="fb-subsec">荣誉获奖</p>
            <div className="fb-list">
              {AWARDS_HONOR.map((a) => <AwardRow key={a} raw={a} />)}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 6</span>{t.labels.courses}</h3>
            <div className="fb-list">
              {COURSES.map((g) => <CourseGroup key={g.group} {...g} />)}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 7</span>{t.labels.self}
              <SectionToggle open={isOpen("self")} onToggle={() => toggleSec("self")} t={t} />
            </h3>
            {/* 收起＝结论（正反两面的自我总结） / 展开＝全文（引言+引文+完整两段） */}
            {!isOpen("self") && (
              <div className="fb-prose">
                {SELF_EVAL_BODY.map((b) => <p key={b.short}>{b.short}</p>)}
              </div>
            )}
            <Reveal open={isOpen("self")}>
              <div className="fb-prose">
                <p>{SELF_EVAL_INTRO}</p>
                {SELF_EVAL_QUOTES.map((q) => <blockquote key={q} className="fb-selfquote">{q}</blockquote>)}
                {SELF_EVAL_BODY.map((b) => <p key={b.full}>{b.full}</p>)}
              </div>
            </Reveal>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 8</span>{t.labels.docs}</h3>
            <div className="fb-doclist">
              {DOCS.map((d) => (
                d.href
                  ? (
                    <a key={d.title} className="fb-docrow" href={d.href} target="_blank" rel="noreferrer">
                      <DocIcon />
                      <span className="fb-docrow-title">{d.title}</span>
                      <span className="fb-docrow-meta">{d.sub} · 打开 →</span>
                    </a>
                  )
                  : (
                    <span key={d.title} className="fb-docrow is-pending">
                      <DocIcon />
                      <span className="fb-docrow-title">{d.title}</span>
                      <span className="fb-docrow-meta">{d.sub} · 待上传</span>
                    </span>
                  )
              ))}
            </div>
          </div>
        </section>

        {/* ---- P3 联系页（T2.6 收尾：状态句+邮箱点击复制+toast+tel；数据源=简历 md 真实联系方式） ---- */}
        <section className="fb-page" id="fb-2">
          <div className="fb-col fb-col--center">
            <p className="fb-label">{t.pages[2]}</p>
            <p className="fb-hello">{t.hello}</p>
            <button type="button" className="fb-mail" onClick={() => copyMail("749842820@qq.com")}>749842820@qq.com</button>
            <a className="fb-tel" href="tel:18250698500">+86 182 5069 8500</a>
            <p className="fb-status">{t.status}</p>
          </div>
        </section>
      </div>
      {toast && <div className="fb-toast" role="status">{toast}</div>}
    </div>
  );
}

/* 渐进披露（2026-09-12 学自 maxkatz.me：节标题行右侧切换 + 紧凑态/完整态切换）
   Reveal=JS 测高 + max-height 过渡（旧内核无新属性依赖）；reduced-motion 直接瞬时 */
function Reveal({ open, children }: { open: boolean; children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  const reduced = prefersReducedMotion();
  useEffect(() => {
    const measure = () => setH(innerRef.current?.scrollHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);
  const dur = reduced ? "0ms" : "var(--dur-base)";
  return (
    <div className="fb-reveal" style={{
      maxHeight: open ? h : 0,
      transition: `max-height ${dur} cubic-bezier(0.22, 1, 0.36, 1)`,
    }}>
      <div
        ref={innerRef}
        className={"fb-reveal-inner" + (open ? " is-open" : "")}
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "none" : "translateY(4px)",
          transition: `opacity ${dur} ease-out, transform ${dur} cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SectionToggle({ open, onToggle, t }: { open: boolean; onToggle: () => void; t: { seeMore: string; seeLess: string } }) {
  return (
    <button type="button" className="fb-sec-action" aria-expanded={open} onClick={onToggle}>
      <span>{open ? t.seeLess : t.seeMore}</span>
      <svg className="fb-sec-action-ico" viewBox="0 0 12 12" aria-hidden>
        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* 条目行 / 编号行 / 课程组 —— 三处复用（§3 §4 §5 §6） */
function EntryRow({ title, note, period, sub, lines, vt }: { title: string; note?: string; sub?: string; period: string; lines: string[]; highlight?: string; vt?: string }) {
  return (
    <div className="fb-row">
      <div className="fb-row-head">
        <span className="fb-row-title" style={vt ? { viewTransitionName: vt } : undefined}>{title}</span>
        {(note || sub) && <span className="fb-row-note">— {note || sub}</span>}
        <span className="fb-row-period">{period}</span>
      </div>
      {lines.map((l, i) => <p key={i} className="fb-row-desc">{l}</p>)}
    </div>
  );
}

/* 概览（收起态）专用组件：与"明细"是两种表示，不是截断——学自 maxkatz.me
   （其收起态=横向时间轴概览全部条目，展开才切明细列表） */
function CompactRow({ title, note, highlight, period, vt }: { title: string; note?: string; highlight?: string; period?: string; vt?: string }) {
  return (
    <div className="fb-crow">
      <span className="fb-crow-t" style={vt ? { viewTransitionName: vt } : undefined}>{title}</span>
      {(highlight || note) && <span className="fb-crow-n">— {highlight || note}</span>}
      {period && <span className="fb-crow-p">{period}</span>}
    </div>
  );
}

/* 获奖行：年份（等宽、定宽列）+ 奖项 + 等级详情（一条一目了然，不再折叠——
   2026-09-12 白纸指出"获奖栏的展开没有意义"：收起态已列全，展开只是换排法） */
function AwardRow({ raw }: { raw: string }) {
  const [year, rest] = raw.split("\u3000");
  const parts = (rest || year || "").split("\uff1a");
  const name = parts[0];
  const detail = parts[1];
  return (
    <div className="fb-awardrow">
      <span className="fb-awardrow-y">{rest ? year : ""}</span>
      <span className="fb-awardrow-n">{name}</span>
      {detail && <span className="fb-awardrow-d">— {detail}</span>}
    </div>
  );
}

function CourseGroup({ group, items }: { group: string; items: { name: string; score: number }[] }) {
  return (
    <div className="fb-coursegroup">
      <p className="fb-coursegroup-title">{group}</p>
      <ul className="fb-courselist">
        {items.map((c) => (
          <li key={c.name}>
            <span className="fb-course-name">{c.name}</span>
            <span className="fb-course-score">{c.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DocIcon() {
  return (
    <svg className="fb-pdfcard-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

/* 加载屏 v2（2026-09-13 白纸指令：完全照搬 trestle.inc 开场，全英文；文字=Product.md §3 英文配铭）。
   机制 1:1 实测自 trestle.inc/assets/js/app.js 的「stamp reveal」：
   词 i 时刻 = TEXT_DELAY 0.19 + i×BASE_GAP 0.072 + sine.inOut(i/(n-1))×0.34；
   opacity 0→1（0.055s）与 scale 0.965→1（0.16s）同步起跑，ease power1.out，transform-origin 50% 60%。
   有意偏离（记录）：①底/墨色用站点 tokens（不抄其奶油底——双主题一致性优先）；
   ②无 GSAP，CSS animation 等价实现（power1.out ≈ cubic-bezier(0,0,0.58,1)，0.055/0.16=34% 处 opacity 到位）；
   ③尾行出处小字为自家配铭惯例（Product.md §3 典故对仗）。点击跳过保留（无障碍安全阀，不再显示提示文字）。 */
const LOADER_QUOTE = "I saw the angel in the marble, and carved until I set him free.";
const LOADER_ATTR = "— Michelangelo";
const easeSineInOut = (p: number) => 0.5 - Math.cos(Math.PI * p) / 2;
const loaderWordDelay = (i: number, total: number) =>
  0.19 + i * 0.072 + easeSineInOut(total <= 1 ? 0 : i / (total - 1)) * 0.34;

function TrestleLoader({ onClick, leaving, onDone }: { onClick: () => void; leaving?: boolean; onDone: () => void }) {
  const words = LOADER_QUOTE.split(" ");
  const total = words.length;
  useEffect(() => {
    /* 出处行在末词揭示后紧接出现（+0.21s），给它 0.4s 入场 + 0.35s 停留再整层退场——
       否则出处行只在退场前闪 36ms（首轮实测踩到） */
    const attrAt = loaderWordDelay(total - 1, total) + 0.16 + 0.05;
    const t = setTimeout(onDone, Math.round((attrAt + 0.75) * 1000));
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"fb-loader" + (leaving ? " is-leaving" : "")} onClick={onClick} aria-label={`${LOADER_QUOTE} ${LOADER_ATTR}`}>
      <p className="fb-loader-title" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="fb-loader-word" style={{ animationDelay: `${loaderWordDelay(i, total).toFixed(3)}s` }}>{w}</span>
        ))}
      </p>
      <p className="fb-loader-attr" aria-hidden="true" style={{ animationDelay: `${(loaderWordDelay(total - 1, total) + 0.21).toFixed(3)}s` }}>{LOADER_ATTR}</p>
    </div>
  );
}
