import { Fragment, useEffect, useRef, useState } from "react";
import { ClipText } from "../components/ClipText";
import { prefersReducedMotion } from "../hooks/useReveal";
import "./flipbook.css";

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
    labels: { about: "关于", reading: "阅读与兴趣", work: "实习", projects: "项目", writing: "写作", goals: "目标" },
    restPeriod: { cert: "证书", club: "社团" } as Record<string, string>,
    hello: "接受实习与合作咨询，欢迎来信。",
    status: "状态 · 开放中（2026 Q4）",
    copyToast: "邮箱已复制",
  },
  en: {
    pages: ["Home", "Resume", "Contact"],
    motto: "I saw the angel in the marble, and carved until I set him free.",
    loaderHint: "Click to enter · skippable",
    coverMark: "COVER · PLACEHOLDER",
    imgslot: "Project image stream below · awaiting Figma export",
    labels: { about: "About", reading: "Reading & Interests", work: "Selected Work", projects: "Projects", writing: "Writing", goals: "Goals" },
    restPeriod: { cert: "CERT", club: "CLUB" } as Record<string, string>,
    hello: "Open to internships and collaborations — write to me.",
    status: "STATUS · OPEN (2026 Q4)",
    copyToast: "Email copied",
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

const PROJECTS = [
  { no: "01", title: "如切如磋，如琢如磨", date: "2026", accent: "#c8674f",
    desc: {
      zh: "陶瓷 CMF + AI 工具的实验型作品集中心页。封面由白纸 Figma 导出后填入——当前为占位封面（示意几何+项目主色初值，色值🤖待定稿）。",
      en: "Experimental portfolio hub page for ceramic CMF + AI tooling. Cover to be filled from the author's Figma export — placeholder for now (geometry demo + project accent draft, color pending)." },
    body: {
      zh: [
        "这是展开态的样章占位（零假数据：整段均为示意文本，待白纸供稿后替换）。项目标题、日期与主色来自数据表。",
        "第一部分 · 项目缘起：为什么做、为谁做、从哪个问题出发。（占位段）",
        "过程线 · 从草图到实体：关键决策点如何演进，哪一步回头了、为什么。（占位段）",
        "证据 · 数字与结果：实验数据、用户反馈、获奖记录写在这里，全部来自真实积累。（占位段）",
      ],
      en: [
        "Sample-chapter placeholder (zero fake data: all text is draft, replaced once supplied). Title, date and accent come from the data table.",
        "Part 1 · Origin: why, for whom, from which question. (placeholder)",
        "Process · from sketch to object: how key decisions evolved, where we backtracked and why. (placeholder)",
        "Evidence · numbers and results: experiments, feedback, awards — all from real work. (placeholder)",
      ] } },
  { no: "02", title: "共燃窑火", date: "2024", accent: "#b85c38",
    desc: { zh: "漆艺 × 工艺史线上展——素材在作品集 PDF 中待拆分；封面占位。",
            en: "Lacquer art × craft-history online exhibition — assets to be split from the portfolio PDF; cover placeholder." },
    body: { zh: ["样章占位 · 展览叙事结构说明。（占位）", "样章占位 · 线上展的交互与观看路径。（占位）"],
            en: ["Placeholder · exhibition narrative structure. (placeholder)", "Placeholder · interaction and viewing path. (placeholder)"] } },
  { no: "03", title: "闽南奥德赛", date: "2024", accent: "#5a7d9a",
    desc: { zh: "游戏化服务设计项目；封面占位。", en: "Gamified service-design project; cover placeholder." },
    body: { zh: ["样章占位 · 游戏化机制设计、调研与迭代。（占位）"],
            en: ["Placeholder · game mechanics, research and iteration. (placeholder)"] } },
  { no: "04", title: "萤野流声", date: "2025", accent: "#8a6d3b",
    desc: { zh: "ESP32 光纤装置；封面占位。", en: "ESP32 fiber-optic installation; cover placeholder." },
    body: { zh: ["样章占位 · 硬件装置与交互逻辑。（占位）"],
            en: ["Placeholder · hardware installation and interaction logic. (placeholder)"] } },
];

/* 简历页数据——真实素材源=input/简历-陈柏志-补充版-2026-08-03.md（零编造）；
   ⚠️draft:true 条目=AI 起草占位（2026-09-01 白纸授权"先生成填进去，后面我再修改"），
   替换时整条删改即可；清单见 wiki log 当日条目 */

const RESUME_HEADLINE: Record<Lang, { text: string; strong: boolean }[]> = {
  zh: [
    { text: "设计出身的硬件产品经理", strong: true },
    { text: "——已推免北京师范大学；在校绩点第一，两次获得国家奖学金。", strong: false },
  ],
  en: [
    { text: "Hardware product manager with a design background", strong: true },
    { text: " — recommended admission to Beijing Normal University; top GPA, two National Scholarships.", strong: false },
  ],
};

/* § 1 About 自我介绍（事实均来自简历；语气=简净第一人称。en=AI 直译待校） */
const RESUME_ABOUT: { draft?: boolean; zh: string[]; en: string[] } = {
  zh: [
    "我是陈柏志，工业设计本科出身，方向是硬件产品。设计教会我先看见问题，工程教会我把东西做出来——我喜欢站在这两者中间。",
    "本科四年绩点第一，两次国家奖学金；2026 年推免进入北京师范大学未来设计学院。此前在厦门鹿匠科技做硬件产品经理实习，统筹过 10 款热敏打印硬件从需求定义到量产交付的全过程；更早之前用 Stable Diffusion 搭过文创产品的研发工作流，训练的品牌插画模型在 Civitai 拿过新人榜前 100。作品拿过米兰设计周中国高校设计学科师生优秀作品展国赛二等奖。",
    "工作之外，我写作，也做陶瓷和漆艺的手作观察——在校担任过文学社负责人、班级团支书。这个网站是一本持续更新的书——项目、过程与证据都在里面。",
  ],
  en: [
    "I'm Chen Baizhi, an industrial-design trained hardware product person. Design taught me to see the problem first; engineering taught me to ship it — I like living between the two.",
    "I graduated top of my class with two National Scholarships, and I'm now a recommended-admission graduate student at Beijing Normal University's School of Future Design. Previously I interned as a hardware product manager at Xiamen Lujang Tech, shepherding 10 thermal-printer products from definition to mass production; before that I built an AIGC pipeline for cultural products and trained a brand illustration model that ranked top-100 on Civitai.",
    "Outside work I write, and I keep a craftsman's eye on ceramics and lacquer. This site is a book that keeps updating itself — projects, process and evidence all inside.",
  ],
};

/* § 2 Reading & Interests（draft：方向真实、具体书单待白纸亲填——AI 起草） */
const RESUME_READING: { draft: boolean; zh: string[]; en: string[] } = {
  draft: true,
  zh: [
    "读书偏两类：一类是设计的工艺现场——陶瓷、漆艺、材料与造物的过程记录；一类是写作的手艺——散文与白描，怎么把一件小事说得准确。（书单整理中 · AI 起草占位，待亲改）",
    "兴趣在手作与工具之间：观察一把壶怎么成型，也研究一条 AI 工作流怎么搭。最近在把暑期的一段观察写成自传的开头。（AI 起草占位，待亲改）",
  ],
  en: [
    "Reading sits in two shelves: the craft floor — ceramics, lacquer, materials and the record of making things — and the writer's craft: essays and plain description. (Book list pending — AI draft, to be replaced.)",
    "Interests live between hand and tool: watching a pot take shape, studying how an AI workflow comes together. Lately I'm turning a summer of observation into the opening of a memoir. (AI draft, to be replaced.)",
  ],
};

/* § 3 Selected Work 数据源；教育信息已并入 §1 About（国奖/推免/实习均在其文中） */

const RESUME_WORK = [
  { period: "2025.11–26.03", title: "厦门鹿匠科技", sub: "硬件产品经理",
    desc: "统筹 10 款热敏打印硬件从需求定义到量产交付的全生命周期，新品研发量产周期缩短 18%；深度参与 1 款 AI 打印机的 ID 设计与 PRD 编制。" },
  { period: "2024.03–12", title: "厦门芸善科技", sub: "工业设计",
    desc: "基于 Stable Diffusion 搭建文创产品研发工作流；训练品牌专属插画模型，Civitai 新人榜前 100，下载量 4k+。" },
];

/* § 4 Projects（真实素材：大创/AI 打印机来自简历；作品条目与海报墙同源） */
const RESUME_PROJECTS = [
  { period: "2023.09–24.12", title: "臭氧催化氧化配套反应装置", note: "大创国家级立项 · 产品负责人（第二负责人）",
    desc: "统筹化工与设计跨学科团队，把实验室催化材料技术转化为可落地的硬件方案；负责产品结构定义与外观设计，获实用新型专利、中国“互联网+”大学生创新创业大赛校级银奖、青苔国际工业设计大赛 TOP100。" },
  { period: "2025.11–26.03", title: "AI 打印机", note: "ID 设计与 PRD",
    desc: "深度参与 1 款 AI 打印产品的前期定义：基于用户数据与使用场景输出 ID 方案与效果图，编制 PRD。" },
  { period: "2024", title: "闽南奥德赛", note: "游戏化服务设计",
    desc: "游戏化机制设计、调研与迭代——海报墙第 03 章，详情页待补。（占位）" },
  { period: "2025", title: "萤野流声", note: "ESP32 光纤装置",
    desc: "硬件装置与交互逻辑——海报墙第 04 章，详情页待补。（占位）" },
];

/* § 5 Writing（draft：1/2 条目真实（自传项目），其余 AI 起草占位） */
const RESUME_WRITING = [
  { draft: false, title: "自传 · 暑期写作", note: "写作中" },
  { draft: true, title: "小店观察", note: "散文 · 草稿" },
  { draft: true, title: "造物手记 · 陶瓷篇", note: "企划中" },
];

/* § 6 Goals（draft：方向真实，措辞 AI 起草待校） */
const RESUME_GOALS: { draft: boolean; items: { title: string; note?: string }[] } = {
  draft: true,
  items: [
    { title: "完成研究生阶段的设计研究", note: "从作品走向方法：把本科的项目经验沉淀成可复用的研究框架" },
    { title: "补齐硬件产品经理的闭环", note: "从 ID 到量产的链路已经走过，下一步是更大的产品与更完整的团队协作" },
    { title: "让这本网站的书持续更新", note: "每完成一件值得记录的事，就多一页证据" },
  ],
};

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
  const [lang, setLang] = useState<Lang>("zh");
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const toggleLang = () => withViewTransition(() => setLang((l) => (l === "zh" ? "en" : "zh")));
  const toggleTheme = () => withViewTransition(() => setTheme((v) => (v === "light" ? "dark" : "light")));
  const t = T[lang];
  const base = THEME_BASES[theme];
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
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const artWrapRef = useRef<HTMLDivElement | null>(null);
  const detailsHRef = useRef(0); // 展开正文实测高（mount 时测一次，供高度动画用）
  const total = 3;

  useEffect(() => {
    if (reduced) { setReady(true); return; }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, [reduced]);

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
      {!ready && <LoaderMotto onClick={() => setReady(true)} motto={t.motto} hint={t.loaderHint} />}

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
            {PROJECTS.map((p, i) => {
              const isThis = shownIdx === i;
              const pr = isThis ? expProg : 0;
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

        {/* ---- P2 简历页（结构化简化版 = Product.md §8.4；内容源=补充版 2026-08-03） ---- */}
        <section className="fb-page" id="fb-1">
          <div className="fb-col">
            <p className="fb-resume-headline">
              {RESUME_HEADLINE[lang].map((s) => (
                <span key={s.text} className={s.strong ? "fb-strong" : undefined}>{s.text}</span>
              ))}
            </p>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 1</span>{t.labels.about}</h3>
            <div className="fb-prose">
              {RESUME_ABOUT[lang].map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 2</span>{t.labels.reading}</h3>
            <div className="fb-prose">
              {RESUME_READING[lang].map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 3</span>{t.labels.work}</h3>
            <div className="fb-list">
              {RESUME_WORK.map((w) => (
                <div key={w.title} className="fb-row">
                  <div className="fb-row-head">
                    <span className="fb-row-title">{w.title}</span>
                    {w.sub && <span className="fb-row-note">— {w.sub}</span>}
                    <span className="fb-row-period">{w.period}</span>
                  </div>
                  <p className="fb-row-desc">{w.desc}</p>
                </div>
              ))}
            </div>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 4</span>{t.labels.projects}</h3>
            <div className="fb-list">
              {RESUME_PROJECTS.map((r) => (
                <div key={r.title} className="fb-row">
                  <div className="fb-row-head">
                    <span className="fb-row-title">{r.title}</span>
                    <span className="fb-row-note">— {r.note}</span>
                    <span className="fb-row-period">{r.period}</span>
                  </div>
                  <p className="fb-row-desc">{r.desc}</p>
                </div>
              ))}
            </div>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 5</span>{t.labels.writing}</h3>
            <div className="fb-list">
              {RESUME_WRITING.map((w, i) => (
                <div key={w.title} className="fb-numrow">
                  <span className="fb-numrow-no">{i + 1}</span>
                  <span className="fb-numrow-title">{w.title}</span>
                  <span className="fb-numrow-note">— {w.note}</span>
                </div>
              ))}
            </div>
            <h3 className="fb-sec"><span className="fb-sec-no">§ 6</span>{t.labels.goals}</h3>
            <div className="fb-list">
              {RESUME_GOALS.items.map((g, i) => (
                <div key={g.title} className="fb-numrow">
                  <span className="fb-numrow-no">{i + 1}</span>
                  <span className="fb-numrow-title">{g.title}</span>
                  {g.note && <span className="fb-numrow-note">— {g.note}</span>}
                </div>
              ))}
            </div>
            {/* PDF 卡片件（参考站 Research Papers 卡同款版式；链接待白纸上传后接通） */}
            <a className="fb-pdfcard" href="#" onClick={(e) => e.preventDefault()} aria-disabled="true" title="待上传">
              <svg className="fb-pdfcard-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
              </svg>
              <span className="fb-pdfcard-main">
                <span className="fb-pdfcard-title">简历 · 双语 PDF</span>
                <span className="fb-pdfcard-sub">VIEW / DOWNLOAD →</span>
              </span>
            </a>
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

function LoaderMotto({ onClick, motto, hint }: { onClick: () => void; motto: string; hint: string }) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 80);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fb-loader" onClick={onClick}>
      <div className="fb-loader-title">
        <ClipText text={motto} by="char" ready={reveal} baseDelay={120} stagger={110} />
      </div>
      <div className="fb-loader-hint">{hint}</div>
    </div>
  );
}
