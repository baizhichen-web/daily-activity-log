import { Fragment, memo, useEffect, useRef, useState, type ReactNode } from "react";
import { GithubHeatmap } from "../components/GithubHeatmap";
import { prefersReducedMotion } from "../hooks/useReveal";
import { navigateContact, navigateEntry } from "../lib/route";
import { readLang, readTheme, saveLang, saveTheme } from "../lib/prefs";
import { mixHex, THEME_BASES } from "../lib/color";
import { RESUME, WRITINGS, type Calligraphy, type ProjectBlock, type ResumeDoc } from "../lib/content";
import { CalligraphyArt } from "../components/CalligraphyArt";
import { EntryDownload, renderBody, type DownloadText, type TocItem } from "../components/blocks";
import "./flipbook.css";
import { POSTER_WALL } from "../data/poster-wall.mjs";

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
    pages: ["首页", "简历"],
    motto: "如切如磋，如琢如磨",
    loaderHint: "点按进入 · 可跳过",
    coverMark: "COVER · 占位",
    imgslot: "下方为项目图流位置 · 待 Figma 导出",
    labels: { about: "关于", beyond: "专业之外", work: "实习经历", projects: "其他项目经历", awards: "获奖", courses: "部分课程成绩", self: "自我评价", contact: "联系", education: "教育" },
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
    dlLabel: "下载这篇文章",
    dlMd: "Markdown（.md）",
    dlHtml: "独立网页（HTML）",
    readMore: "阅读全文",
    toBuild: "待建设",
    toBuildEn: "TO BE BUILT",
    toBuildNote: "以下项目正在建设当中——封面与正文尚未完成，暂以编号与主色占位。每完成一个，即升入上方文章列（编号随之重排）。",
    pendingMark: "待建设",
  },
  en: {
    pages: ["Home", "Resume"],
    motto: "I saw the angel in the marble, and carved until I set him free.",
    loaderHint: "Click to enter · skippable",
    coverMark: "COVER · PLACEHOLDER",
    imgslot: "Project image stream below · awaiting Figma export",
    labels: { about: "About", beyond: "Beyond the Major", work: "Internships", projects: "Other Projects", awards: "Awards", courses: "Selected Coursework", self: "Self-Assessment", contact: "Contact", education: "Education" },
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
    dlLabel: "Download this article",
    dlMd: "Markdown (.md)",
    dlHtml: "Standalone page (HTML)",
    readMore: "Read more",
    toBuild: "To Be Built",
    toBuildEn: "TO BE BUILT",
    toBuildNote: "Projects in progress — covers and texts not yet made; placeholders shown by number and accent colour.",
    pendingMark: "TO BE BUILT",
  },
} as const;

/* 正文下载区文案：**必须是模块级常量**。
   WallBody 是 memo 的。若像最初那样在 JSX 里内联 `t={{…}}`，父组件每次重渲染都换引用 →
   memo 恒失效 → 展开动画（useProgress 逐帧 setProg）期间整篇正文与目录观察器逐帧重建
   （2026-09-17 实测量级：一次展开约 57 次重渲染），正好抵消 09-14 那次「收放动画卡顿」的修复。 */
const DL_TEXT: Record<Lang, DownloadText> = {
  zh: { label: T.zh.dlLabel, md: T.zh.dlMd, html: T.zh.dlHtml },
  en: { label: T.en.dlLabel, md: T.en.dlMd, html: T.en.dlHtml },
};

/* 混色基准与 mixHex 已抽到 src/lib/color.ts（与项目页横幅共用，2026-09-13） */

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

function useProgress(open: boolean, reduced: boolean) {
  const [prog, setProg] = useState(reduced ? (open ? 1 : 0) : 0);
  const tRef = useRef<HTMLSpanElement | null>(null); // 探针直写 DOM：rAF 60fps 不触发 React 重渲染
  const progRef = useRef(prog);
  useEffect(() => {
    if (reduced) { setProg(open ? 1 : 0); progRef.current = open ? 1 : 0; return; }
    if (!open && progRef.current === 0) return; // 挂载即关闭态：不跑"收起"动画（防展开态闪帧）
    const target = open ? 1 : 0;
    const from = open ? 0 : 1;
    /* 展开/收起时长：600→900 · 350→550（2026-09-14 白纸"动画再放慢一点"）。
       ⚠️ 超出 Craft.md 红线 5「动效预算 ≤600ms」——白纸要求放慢、属有意破例；
       要收回就改回 tokens 的 --dur-page(600) / 350。 */
    const dur = open ? 900 : 550;
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

/* 简历页（P2）：2026-09-14 抽成 memo 组件——页面墙做收放动画时，这里几百个节点不再逐帧重渲染（白纸：动画卡顿） */
const ResumePage = memo(function ResumePage({ lang, t }: { lang: Lang; t: (typeof T)[Lang] }) {
  const R = RESUME[lang];
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({});
  const isOpen = (k: string) => !!openSecs[k];
  const toggleSec = (k: string) => setOpenSecs((s) => ({ ...s, [k]: !s[k] }));
  return (
    <div className="fb-col">
            {/* 页首身份块 */}
            <div className="fb-identity">
              {/* 头像：/media/avatar.jpg 存在则显示，否则退回姓氏字（零假数据，不塞占位图） */}
              <div className="fb-avatar">
                <span className="fb-avatar-fallback" aria-hidden>陈</span>
                <img src="/media/avatar.jpg" alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <p className="fb-identity-name">{R.identity.name}</p>
              <p className="fb-identity-role">{R.identity.role}</p>
              <ul className="fb-identity-meta">
                {R.identity.meta.map((m) => <li key={m}>{m}</li>)}
              </ul>
              {R.identity.lines.map((l, li) => (
                <p key={l} className={"fb-identity-line" + (li > 0 ? " is-secondary" : "")}>{l}</p>
              ))}
              <GithubHeatmap />
            </div>

            {/* § 1 教育（2026-09-13 白纸指令：格式与各 § 节完全一致；校徽撤除；
                原 §1–§9 顺延为 §2–§10，内容顺序不变） */}
            <h3 className="fb-sec"><span className="fb-sec-no">§ 1</span>{t.labels.education}
              <SectionToggle open={isOpen("edu")} onToggle={() => withViewTransition(() => toggleSec("edu"))} t={t} />
            </h3>
            {!isOpen("edu") && (
              <div className="fb-compact">
                {R.education.map((e, ei) => <CompactRow key={e.title} title={e.title} note={e.sub} period={e.period} vt={!isOpen("edu") ? `vt-edu-${ei}` : undefined} />)}
              </div>
            )}
            <Reveal open={isOpen("edu")}>
              <div className="fb-list">
                {R.education.map((e, ei) => <EntryRow key={e.title} {...e} vt={isOpen("edu") ? `vt-edu-${ei}` : undefined} />)}
              </div>
            </Reveal>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 2</span>{t.labels.about}</h3>
            <div className="fb-prose">
              {R.about.map((text, i) => <p key={i}>{text}</p>)}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 3</span>{t.labels.beyond}
              <SectionToggle open={isOpen("beyond")} onToggle={() => toggleSec("beyond")} t={t} />
            </h3>
            <div className="fb-prose"><p>{R.beyond.intro}</p></div>
            <div className="fb-swap" key={isOpen("beyond") ? "beyond-d" : "beyond-o"}>
              {!isOpen("beyond") ? (
                <div className="fb-chips">
                  {R.beyond.items.map((b) => <span key={b.title} className="fb-chip">{b.title}</span>)}
                </div>
              ) : (
                <div className="fb-list">
                  {R.beyond.items.map((b) => (
                    <div key={b.title} className="fb-row">
                      <div className="fb-row-head"><span className="fb-row-title">{b.title}</span></div>
                      <p className="fb-row-desc">{b.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 4</span>{t.labels.work}
              <SectionToggle open={isOpen("work")} onToggle={() => withViewTransition(() => toggleSec("work"))} t={t} />
            </h3>
            {!isOpen("work") && (
              <div className="fb-compact">
                {R.work.map((w, wi) => <CompactRow key={w.title} title={w.title} note={w.sub} period={w.period} vt={!isOpen("work") ? `vt-work-${wi}` : undefined} />)}
              </div>
            )}
            <Reveal open={isOpen("work")}>
              <div className="fb-list">
                {R.work.map((w, wi) => <EntryRow key={w.title} {...w} vt={isOpen("work") ? `vt-work-${wi}` : undefined} />)}
              </div>
            </Reveal>

            <h3 className="fb-sec"><span className="fb-sec-no">§ 5</span>{t.labels.projects}
              <SectionToggle open={isOpen("projects")} onToggle={() => withViewTransition(() => toggleSec("projects"))} t={t} />
            </h3>
            {!isOpen("projects") && (
              <div className="fb-compact">
                {R.otherProjects.map((r, ri) => <CompactRow key={r.title} title={r.title} highlight={r.highlight} period={r.period} vt={!isOpen("projects") ? `vt-proj-${ri}` : undefined} />)}
              </div>
            )}
            <Reveal open={isOpen("projects")}>
              <div className="fb-list">
                {R.otherProjects.map((r, ri) => <EntryRow key={r.title} {...r} vt={isOpen("projects") ? `vt-proj-${ri}` : undefined} />)}
              </div>
            </Reveal>
            <DocsFor docs={R.docs} section="projects" />

            <h3 className="fb-sec"><span className="fb-sec-no">§ 6</span>{t.labels.awards}</h3>
            <p className="fb-subsec">设计获奖</p>
            <div className="fb-list">
              {R.awardsDesign.map((a) => <AwardRow key={a} raw={a} />)}
            </div>
            <p className="fb-subsec">荣誉获奖</p>
            <div className="fb-list">
              {R.awardsHonor.map((a) => <AwardRow key={a} raw={a} />)}
            </div>
            <DocsFor docs={R.docs} section="awards" />

            <h3 className="fb-sec"><span className="fb-sec-no">§ 7</span>{t.labels.courses}</h3>
            <div className="fb-list">
              {R.courses.map((g) => <CourseGroup key={g.group} {...g} />)}
            </div>
            <DocsFor docs={R.docs} section="courses" />

            <h3 className="fb-sec"><span className="fb-sec-no">§ 8</span>{t.labels.self}
              <SectionToggle open={isOpen("self")} onToggle={() => toggleSec("self")} t={t} />
            </h3>
            {/* 收起＝结论（正反两面的自我总结） / 展开＝全文（引言+引文+完整两段） */}
            {!isOpen("self") && (
              <div className="fb-prose">
                {R.selfEval.body.map((b) => <p key={b.short}>{b.short}</p>)}
              </div>
            )}
            <Reveal open={isOpen("self")}>
              <div className="fb-prose">
                <p>{R.selfEval.intro}</p>
                {R.selfEval.quotes.map((q) => <blockquote key={q} className="fb-selfquote">{q}</blockquote>)}
                {R.selfEval.body.map((b) => <p key={b.full}>{b.full}</p>)}
              </div>
            </Reveal>

            {/* § 9 联系（2026-09-13 白纸指令：Scott 式纯文字段，「这里」跳联系页 ?contact=1
                （页内=小红书+邮箱）；文案为白纸亲拟句。编号由 §10 前移——原 §9 证明材料
                已按白纸 2026-09-14 指令打散进各章节，不再单开一节 */}
            <h3 className="fb-sec"><span className="fb-sec-no">§ 9</span>{t.labels.contact}</h3>
            <div className="fb-prose">
              <p>
                {lang === "zh"
                  ? <>接受实习与合作咨询，欢迎来信！我会阅读所有邮件或者消息，并回复大部分邮件，通过<a className="fb-inlink" href="?contact=1" onClick={(e) => { e.preventDefault(); navigateContact(true); }}>这里</a>可以联系我。</>
                  : <>Open to internships and collaborations — say hi! I read every message and reply to most; you can reach me <a className="fb-inlink" href="?contact=1" onClick={(e) => { e.preventDefault(); navigateContact(true); }}>here</a>.</>}
              </p>
            </div>
            <DocsFor docs={R.docs} section="contact" />
          </div>
  );
});

/* 展开态内联全文（可能上千字）：memo 化——逐帧动画时整棵子树不再重渲染
   （白纸 2026-09-14：收放动画「阻塞/割裂」，大头在这里） */
/* 取景窗 → 画框比例（白纸 Figma 稿）：画框高恒 = 可用宽 ÷ 作品比例（满幅、不裁、不留白边）。
   ⚠️ 2026-09-17 前的两版都不对：①高度封顶 72vh → 画框比例≠取景窗比例，cover 裁掉作品上下 15%（白纸：展开前位置不对）；
   ②宽度按比例缩窄居中 → 两侧留白边（白纸：两边有白边）。任何高度上限或宽度缩窄都会破坏「取景窗↔画框」1:1，
   所以高度只能由作品比例决定。 */
function windowAspect(c: Calligraphy | undefined, which: "from" | "to"): number | null {
  if (!c || !c.imgAspect) return null;
  const s = which === "from" ? c.cropFrom : c.cropTo;
  if (!s) return null;
  const v = s.split(",").map((x) => Number(x.trim()));
  if (v.length !== 4 || v.some((n) => !Number.isFinite(n))) return null;
  const w = (v[2] - v[0]) / 100, h = (v[3] - v[1]) / 100;
  if (w <= 0 || h <= 0) return null;
  return c.imgAspect * (w / h);
}

/* 墙内展开态目录（2026-09-14 白纸："加上可以跳转的目录，类似 notion 那种"）：
   桌面 ≥1280 在正文列右侧浮动（大纲式：h2/h3 缩进、当前节高亮、点击平滑跳转）；
   窄屏折成正文顶部一条 <details>。只在某条展开时渲染 → 全文只有一个实例，id 不会撞。
   小节数 <2 时不出（一条的大纲没有意义）。 */
const WallToc = memo(function WallToc({ toc }: { toc: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (toc.length < 2) return;
    const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-12% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);
  if (toc.length < 2) return null;
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  const list = (cls: string) => (
    <nav className={cls} aria-label="本节目录">
      {toc.map((t) => (
        <a key={t.id} href={`#${t.id}`} onClick={jump(t.id)}
          className={"fb-toc-link" + (t.level === 3 ? " is-sub" : "") + (active === t.id ? " is-active" : "")}>
          {t.text}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <div className="fb-toc-rail">{list("fb-toc")}</div>
      <details className="fb-toc-m">
        <summary>目录</summary>
        {list("fb-toc-m-list")}
      </details>
    </>
  );
});

const WallBody = memo(function WallBody({ body, onZoom, slug, t }: { body?: ProjectBlock[]; onZoom: (src: string) => void; slug?: string; t: DownloadText }) {
  const { blocks, toc } = renderBody(body, { onZoom, eager: true, tocH3: true });
  return (
    <div className="fb-poster-body">
      <WallToc toc={toc} />
      {blocks}
      {/* 正文末尾的下载区（2026-09-17 白纸任务 3b）：墙内展开即全文，读完就能取走 */}
      {slug && <EntryDownload slug={slug} kind="article" t={t} />}
    </div>
  );
});

/* 文章在墙面展开态的摘要：取其正文首段（与详情页同源，零改写） */
function firstParagraphs(body: ProjectBlock[] | undefined, n: number): string[] {
  const out: string[] = [];
  for (const b of body ?? []) {
    if (b.type === "paragraph" && b.text) { out.push(b.text); if (out.length >= n) break; }
  }
  return out;
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
  /* toast 反馈（MD 菜单复制用；邮箱复制已随 § 10 改链跳移交联系页） */
  const [toast, setToast] = useState<string | null>(null);
  const [wallZoom, setWallZoom] = useState<string | null>(null); // 墙内展开正文的图片灯箱（复用 .pj-lightbox）
  const toastTimer = useRef<number | undefined>(undefined);
  const [openIdx, setOpenIdx] = useState<number | null>(null);  const [lastOpen, setLastOpen] = useState(0);
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
  /* --vw：可用宽度（不含经典滚动条）。画框比例锁与 right 居中都要与海报的 100% 同基准，
     而 100vw 含滚动条宽，在 Windows 经典滚动条下会多出十几像素（2026-09-17 审查发现）。 */
  useEffect(() => {
    const setVW = () => document.documentElement.style.setProperty("--vw", `${document.documentElement.clientWidth}px`);
    setVW();
    window.addEventListener("resize", setVW);
    return () => window.removeEventListener("resize", setVW);
  }, []);
  /* 展开正文实测高（供高度动画用）：2026-09-14 由「mount 测一次」改 ResizeObserver——
     文章全文内联后含图片，懒加载/尺寸落定会让高度后长，一次性测量会裁掉文末 */
  const detailsElRef = useRef<HTMLDivElement | null>(null);
  const [detailsH, setDetailsH] = useState(640);
  const total = 2; /* 2026-09-13 白纸指令：§9 联系并入简历页尾，独立联系页撤除，全书两页 */

  /* ---- MD 副本按钮（AI Native 第一波②）：当前页的 .md 复制/下载 ----
     页→文件映射与生成器产物一一对应；项目页有独立路由后在此追加映射 */
  /* MD/HTML 副本映射（HTML=2026-09-13 白纸新增；首页 HTML 叫 home.html——/index.html 是站点本体） */
  const MD_FILES = [
    { md: "/index.md", html: "/home.html" },
    { md: "/resume.md", html: "/resume.html" },
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
  const openIdxParam = Number(new URLSearchParams(window.location.search).get("open") ?? "NaN"); // 调试直达 ?open=N（0 基，展开+滚到位）
  const scrollParam = Number(new URLSearchParams(window.location.search).get("scroll") ?? "NaN"); // 调试直达 ?scroll=N（仅滚，不展开）
  const probe = new URLSearchParams(window.location.search).has("probe");
  const debugPage = Number(new URLSearchParams(window.location.search).get("page") ?? "NaN"); // 调试直达 ?page=N
  useEffect(() => { if (autoExpand) setOpenIdx(0); }, [autoExpand]);
  useEffect(() => {
    if (!Number.isFinite(openIdxParam) || openIdxParam < 0) return;
    setOpenIdx(openIdxParam);
    /* 调试直达：把第 N 条滚到视口（瞬时定位，不依赖平滑滚动——无头截图用） */
    const t = setTimeout(() => {
      const wall = document.querySelector<HTMLElement>(".fb-page--wall");
      const el = document.querySelectorAll<HTMLElement>(".fb-poster-collapse")[openIdxParam];
      if (wall && el) wall.scrollTop += el.getBoundingClientRect().top - wall.getBoundingClientRect().top;
    }, 120);
    return () => clearTimeout(t);
  }, [openIdxParam]);
  useEffect(() => {
    if (!Number.isFinite(scrollParam) || scrollParam < 0) return;
    const t = setTimeout(() => {
      const wall = document.querySelector<HTMLElement>(".fb-page--wall");
      const el = document.querySelectorAll<HTMLElement>(".fb-poster-collapse")[scrollParam];
      if (wall && el) wall.scrollTop += el.getBoundingClientRect().top - wall.getBoundingClientRect().top;
    }, 120);
    return () => clearTimeout(t);
  }, [scrollParam]);

  /* 展开正文高度持续测量（2026-09-14：文章全文内联 + 图片加载会让高度后长，
     一次性测量会裁掉文末——改 ResizeObserver 跟随） */
  useEffect(() => {
    const el = detailsElRef.current;
    if (!el) return;
    const measure = () => setDetailsH(el.scrollHeight || 640);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [shownIdx]);
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
    }, 950); /* 等展开动画（900ms）走完再滚——否则图柱还在变宽时页面先动了 */
    return () => clearTimeout(t);
  }, [openIdx]);

  /* ---------- 墙面条目 = 作品集海报（占位）＋ 文章（书画封面） ----------
     白纸 2026-09-13 定：Scott 用油画，我们换中国书画；「一缩一放」由 pr 驱动（CalligraphyArt：
     收起=整幅见全貌，展开=放大至文眼几字）。文章条目在展开态出正文首段，非「待补」。 */
  const WALL_ITEMS = [
    /* 文章在前（白纸 09-13：站上先只放自己的文章，作品暂不入列） */
    ...WRITINGS.map((w, i) => ({
      group: "writing" as const,
      no: String(i + 1).padStart(2, "0"),
      title: w.title,
      date: w.date ?? "",
      accent: w.accent ?? "#b3402e",
      slug: w.slug as string | undefined,
      calli: w.calligraphy,
      pending: false,
      linkKind: "article" as const,
      desc: { zh: w.summary ?? "", en: w.summary ?? "" },
      body: { zh: firstParagraphs(w.body, 1), en: firstParagraphs(w.body, 1) },
      fullBody: w.body, /* 展开态内联全文（Scott 同款；2026-09-14 白纸：要全文） */
      tags: (w.tags ?? []) as string[],
    })),
    /* 作品统一入「待建设」模块（封面/正文未完成；编号保留原项目号） */
    ...POSTER_WALL.map((p) => ({
      group: "pending" as const,
      ...p,
      calli: undefined as Calligraphy | undefined,
      pending: true,
      linkKind: "project" as const,
      tags: [] as string[],
      fullBody: undefined as ProjectBlock[] | undefined,
    })),
  ];

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
            {WALL_ITEMS.map((p, i) => {
              const isThis = shownIdx === i;
              const pr = isThis ? expProg : 0;
              const slug = p.slug; // 有 slug=内容系统已有该条目的长页（项目 ?project= / 文章 ?article=）
              /* 书画条目：按 Figma 取景窗比例锁画框（收起=整幅比例 / 展开=局部比例）
                 ⚠️ 收起态宽度曾写死 100%：只有「窗口够高、--poster-h 取到 100vw/比例」时
                 画框比例才恰好等于作品比例。窗口一矮 72vh 生效，画框就变成 100vw×72vh
                 （1536×674 上是 3.17 vs 作品 2.22），cover 再把作品上下各切掉 15%
                 —— 白纸点名的「展开前位置不对」即此（1440×900 恰好相等，故长期未暴露）。
                 2026-09-17：宽度恒按比例推，画框比例在任何窗口高矮下都等于取景窗比例。 */
              const bandAspect = windowAspect(p.calli, "from");
              const artAspect = windowAspect(p.calli, "to");
              const frameAspect = bandAspect && artAspect ? bandAspect + (artAspect - bandAspect) * pr : null;
              /* 展开进度插值（2026-09-14）：--pr 是唯一通道，CSS 按它插值字号/内边距/位置，
                 颜色因为要在两端 hex 间插值改由下面逐帧算；--scrim-op 控制托底渐变的淡出 */
              const tCol = Math.min(1, Math.max(0, (pr - 0.55) / 0.2));   // 浅字 → 墨色（托底淡出后才转）
              const scrimOp = Math.max(0, Math.min(1, (0.8 - pr) / 0.3));  // 托底：pr≤0.5 满，0.8 前淡尽
              const extraOp = Math.max(0, Math.min(1, (pr - 0.5) / 0.25)); // 摘要/标签
              const wordOp = Math.max(0, 1 - pr * 2);                      // 装饰大字（原在 pr=0.5 处硬切）
              return (
              <Fragment key={p.group + p.no}>
                {/* 「待建设」模块头（白纸 09-13：作品从正列移出、另立模块——元素同源、模块可辨识） */}
                {p.group === "pending" && WALL_ITEMS[i - 1]?.group === "writing" && (
                  <header className="fb-tobuild">
                    <p className="fb-tobuild-eyebrow">{t.toBuildEn}</p>
                    <h2 className="fb-tobuild-title">{t.toBuild}</h2>
                    <p className="fb-tobuild-note">{t.toBuildNote}</p>
                  </header>
                )}
                {/* 海报+正文包进同一个随进度收起的高度动画容器：
                    maxHeight = 海报 72vh 恒定 + pr×正文实测高（收起=图扩回与正文裁高同步，
                    替代此前"details 瞬间卸载"的突兀断帧）；海报本体透明度不受影响 */}
                <div className="fb-poster-collapse" style={{
                    maxHeight: `calc(var(--poster-h, 72vh) + ${pr * detailsH}px)`,
                    /* 书画条目的画框高 = 可用宽 ÷ 作品比例 —— **満幅、不设 72vh 上限**。
                       为什么不封顶：任何高度上限都会让画框比例≠取景窗比例，cover 于是裁掉作品
                       （「展开前位置不对」的根因）；缩窄居中又会两侧留白边（白纸 09-17 反馈）。
                       两个都不行，所以高度只能由作品比例决定：作品铺满整条，海报随之变高。
                       实测四条作品比例 1.9–2.5 → 16:9 屏上占视口高约 72–88%，正常。
                       ⚠️ 用 --vw 不用 100vw：100vw 含经典滚动条宽，会让比例锁差约 1%。 */
                    ...(bandAspect ? { ["--poster-h"]: `calc(var(--vw, 100vw) / ${bandAspect.toFixed(4)})` } : {}),
                  } as React.CSSProperties}>
                  <article key={p.no} className={"fb-poster" + (isThis ? " is-open" : "")}
                style={{
                    ...(bandAspect ? { height: "var(--poster-h, 72vh)" } : {}),
                    ["--pr"]: pr.toFixed(4),
                    ["--scrim-op"]: scrimOp.toFixed(3),
                  } as React.CSSProperties}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenIdx(openIdx === i ? null : i)}
                role="button" tabIndex={0} aria-expanded={openIdx === i}>
                <div className="fb-poster-art" aria-hidden
                  ref={isThis ? (el) => { artWrapRef.current = el; } : undefined}
                  style={{
                    /* 宽度：常规 100% → 27%；书画条目 = 画框高 × 当前取景窗比例。
                       收起态 画框高 = 可用宽 ÷ 整幅比例 → 乘回去正好等于可用宽 = 满幅（不留白边）；
                       展开态按局部比例收窄，靠右（Scott 原式） */
                    width: frameAspect ? `calc(var(--poster-h, 72vh) * ${frameAspect.toFixed(4)})` : `${100 - pr * 73}%`,
                    /* 书画条目：纸面=页面地面（白纸/暗纸），不铺项目色渐变 */
                    background: p.calli ? "var(--bg-page)"
                      : `radial-gradient(120% 90% at 20% 15%, ${mixHex(base.white, p.accent, 0.42)}, ${mixHex(base.white, p.accent, 0.1)} 62%),
                 linear-gradient(160deg, ${mixHex(base.white, p.accent, 0.18)}, ${mixHex(base.card, p.accent, 0.34)})`,
                  }}>
                  <span className="fb-poster-art-no" style={{ color: mixHex(base.white, p.accent, 0.68), maxWidth: `${100 - pr * 73}%` }}>{p.no}</span>
                  {p.calli ? (
                    <CalligraphyArt image={p.calli.image || undefined} cropFrom={p.calli.cropFrom} cropTo={p.calli.cropTo}
                      imgAspect={p.calli.imgAspect} zoomImage={p.calli.zoomImage} focus={p.calli.focus} chars={p.calli.chars}
                      frameAspect={frameAspect ?? undefined} pr={pr} />
                  ) : (
                    <>
                      <span className="fb-poster-art-word" style={{ color: mixHex(base.ink, p.accent, 0.55), opacity: wordOp, maxWidth: `${100 - pr * 73}%` }}>{p.title.slice(0, 6)}</span>
                      <span className="fb-poster-art-mark" style={{ color: mixHex("#9a9a9a", p.accent, 0.45), opacity: wordOp, maxWidth: `${100 - pr * 73}%` }}>{t.pendingMark}</span>
                    </>
                  )}
                </div>
                {/* 面板：收起=贴底标题条，展开=左栏居中。位置/字号/内边距全部按 --pr 插值（见 flipbook.css），
                    颜色逐帧算——原先按 pr≥0.5 二选一，正是"标题突然变大变小"的来源 */}
                <div className="fb-poster-meta">
                  <div className="fb-poster-head">
                    {/* 标题即链接（白纸 09-13 点名 Scott 机制：悬停出下划线、点进项目页）；
                        展开/收起仍走整张卡的点按——标题点击阻断冒泡，两者互不打架 */}
                    <h3 className="fb-poster-title" style={{ color: mixHex("#f7f5f2", base.ink, tCol) }}>
                      {slug ? (
                        <a className="fb-poster-titlelink" href={`?${p.linkKind === "article" ? "article" : "project"}=${slug}`}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateEntry(p.linkKind, slug); }}
                          onKeyDown={(e) => e.stopPropagation()}>
                          {p.title}
                        </a>
                      ) : p.title}
                    </h3>
                    <p className="fb-poster-date" style={{ color: mixHex("#f7f5f2", base.muted, tCol) }}>{p.date}</p>
                    {/* 展开态左面板补内容（白纸 09-13：圈出的空白要有内容；排法照 Scott——题·时间·摘要）。
                        绝对定位在题·日期之下：若让它占位，收起态标题会被顶高 */}
                    <div className="fb-poster-extra" style={{ opacity: extraOp }}>
                      {p.desc[lang] && <p className="fb-poster-summary">{p.desc[lang]}</p>}
                      {!!p.tags?.length && <p className="fb-poster-tags">{p.tags.map((x) => `#${x}`).join("　")}</p>}
                    </div>
                  </div>
                  {/* 收起=点转正后的 +（× 即 plus，点击冒泡到 article toggle）；不再放独立 close 按钮——避免双 × */}
                </div>
                <span className="fb-poster-plus" aria-hidden
                  style={{
                    /* 半程右锚→半程左锚：两分支必须互相显式清对侧，否则 left+right 双边约束把符号拉成巨块。
                       终点左缘 = --ppad-to（与标题左缘成一条竖线）；纵向不插值、全程贴底 → 不会压字 */
                    right: pr < 0.5 ? `calc(50% + (var(--space-6) - 50%) * ${1 - pr * 2})` : "auto",
                    left: pr >= 0.5 ? `calc(50% + (var(--ppad-to) - 50%) * ${pr * 2 - 1})` : "auto",
                    transform: pr > 0 ? `rotate(${45 * pr}deg)` : undefined,
                    /* 底是"托底渐变压过的画面/渐变"（实测亮度 ~0.15），灰字读不出来 → 收起态一律白
                       （白纸 Figma 183:22 原式）；展开后 × 落在白页上，转回 muted */
                    color: mixHex("#f7f5f2", base.muted, tCol),
                  }}>+</span>
              </article>
              {shownIdx === i && (
                <div className="fb-poster-details" style={{
                    opacity: pr,
                  }}
                  ref={detailsElRef}>
                  {p.pending ? (
                    <>
                      {p.body[lang].map((b, bi) => <p key={bi} className="fb-poster-desc fb-poster-tobefilled">{b}</p>)}
                      <p className="fb-poster-tobefilled">{t.imgslot}</p>
                    </>
                  ) : (
                    /* 文章条目：展开即全文（Scott 同款——列表项内联整篇；2026-09-14 白纸：要全文不放节选） */
                    <WallBody body={p.fullBody} onZoom={setWallZoom} slug={p.linkKind === "article" ? slug : undefined}
                      t={DL_TEXT[lang]} />
                  )}
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
          <ResumePage lang={lang} t={t} />
        </section>
      </div>
      {toast && <div className="fb-toast" role="status">{toast}</div>}
      {wallZoom && (
        <dialog className="pj-lightbox" open onClick={() => setWallZoom(null)}>
          <img src={wallZoom} alt="" />
        </dialog>
      )}
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

function CourseGroup({ group, items }: { group: string; items: { name: string; score: string }[] }) {
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

/* 证明材料（2026-09-14 白纸指令：不再单开一节，改成挂在**对应章节的下面**）——
   一份材料一个 section，DocsFor 只渲染落在自己这一节里的那些；没有则整块不出 */
type DocItem = ResumeDoc["docs"][number];
function DocRow({ d }: { d: DocItem }) {
  return d.href ? (
    <a className="fb-docrow" href={d.href} target="_blank" rel="noreferrer">
      <DocIcon />
      <span className="fb-docrow-title">{d.title}</span>
      <span className="fb-docrow-meta">{d.sub} · 打开 →</span>
    </a>
  ) : (
    <span className="fb-docrow is-pending">
      <DocIcon />
      <span className="fb-docrow-title">{d.title}</span>
      <span className="fb-docrow-meta">{d.sub} · 待上传</span>
    </span>
  );
}

function DocsFor({ docs, section }: { docs: DocItem[]; section: DocItem["section"] }) {
  const list = docs.filter((d) => d.section === section);
  if (!list.length) return null;
  return (
    <div className="fb-doclist fb-doclist--under">
      {list.map((d) => <DocRow key={d.title} d={d} />)}
    </div>
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
