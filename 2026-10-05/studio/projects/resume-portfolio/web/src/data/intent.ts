/* 「我要找工」意图数据 · job-search M2.2（2026-10-05 白纸拍板：证据下沉到词条；AI 边界独立声明）
   素材来源：白纸 2026-10-05 提供的鹿匠实习成果/AIGC/学术训练原文（拆分进各词条 ev）+ KEYWORD-MAP-v1.md。
   ⚠️ 改词条/证据/提示词只改这个文件；Decap 化（content/intent.yml）后置。
   SecKey＝简历页各节的 DOM id 后缀（FlipbookDemo 里 h3 id="fb-sec-<key>"）。 */

export type SecKey = "education" | "about" | "beyond" | "work" | "projects" | "awards" | "courses" | "self" | "contact";

export type Lang = "zh" | "en";

/* ---------- 意图 chips（ev＝词条被选中时展示的证据行；地点/身份无证据） ---------- */
export type IntentOption = { id: string; zh: string; en: string; secs: SecKey[]; ev?: { zh: string; en: string } };
export type IntentGroup = { key: string; zh: string; en: string; options: IntentOption[] };

export const INTENT_GROUPS: IntentGroup[] = [
  {
    key: "field", zh: "方向", en: "Field",
    options: [
      {
        id: "hw", zh: "智能硬件", en: "Smart hardware", secs: ["work", "projects"],
        ev: {
          zh: "实习时全程跟了 10 款热敏打印硬件，从需求定义一直管到量产出货。",
          en: "At Lujang I shepherded 10 thermal-printer products from brief to shipment.",
        },
      },
      {
        id: "ai", zh: "AI 应用", en: "AI applications", secs: ["work", "projects", "beyond"],
        ev: {
          zh: "2023 年起自己训练了几十个风格 LoRA 放上开源社区，被跑了上万次；后来在公司用 Stable Diffusion 做文创，卖了一万多。",
          en: "Into AIGC since 2023 — trained dozens of style LoRAs (10k+ community runs); at work I built the Stable-Diffusion pipeline that sold ¥10k+ of merchandise.",
        },
      },
      {
        id: "svc", zh: "服务设计", en: "Service design", secs: ["courses", "beyond"],
        ev: {
          zh: "当过校文学社负责人：一年 15 场校级活动、一千多人次参加；毕业展的策展和视觉也归我。",
          en: "Ran the campus literary society: 15 events, 1,000+ attendees; also curated and designed the graduation show.",
        },
      },
      {
        id: "tool", zh: "设计工具", en: "Design tooling", secs: ["beyond"],
        ev: {
          zh: "Figma、Rhino、Keyshot 是吃饭的家伙——你现在看的这个网站也是我搭的，JD 匹配这些功能都是。",
          en: "Figma, Rhino and Keyshot pay my bills — and this website, JD matching included, is my own build.",
        },
      },
    ],
  },
  {
    key: "role", zh: "职能", en: "Role",
    options: [
      {
        id: "product", zh: "产品", en: "Product", secs: ["work", "projects"],
        ev: {
          zh: "那 10 款产品的跨部门对齐、节点跟进和量产交付都归我管；AI 打印机的前期定义和 PRD 也是我写的。",
          en: "I ran cross-team alignment and delivery for all 10 products, and wrote the AI printer's early definition and PRD.",
        },
      },
      {
        id: "design", zh: "设计", en: "Design", secs: ["projects", "awards"],
        ev: {
          zh: "AI 打印机的 ID 方案和效果图是我画的；米兰设计周国赛二等奖、青苔 TOP100 都是这批作品。",
          en: "The AI printer's ID proposal and renders are mine; the work won a national 2nd prize at Milan Design Week and Qingtai TOP100.",
        },
      },
      {
        id: "eng", zh: "研发工程", en: "R&D engineering", secs: ["work"],
        ev: {
          zh: "样机归我测——功能、固件、可靠性、兼容性一遍过；攒了 80 多条测试用例，九成问题在研发期就被拦住；BOM、SOP、工艺卡整套量产文件也是我编的。",
          en: "I owned prototype validation end to end — function, firmware, reliability, compatibility — built an 80-case test library that catches 90%+ of issues, and wrote the full BOM/SOP/process docs.",
        },
      },
      {
        id: "data", zh: "数据分析", en: "Data", secs: ["projects", "courses"],
        ev: {
          zh: "拿 9000 条售后数据建过分析模型；做过两个像样的研究——招 30 个人在光学实验室做的人因实验、回收 300 多份问卷的用户信任研究；SCI 论文我是第三作者。",
          en: "Modelled 9,000 after-sales records; ran a 30-subject optics experiment (human factors) and a 300-survey trust study; third author on our SCI paper.",
        },
      },
    ],
  },
  {
    key: "place", zh: "地点", en: "Location",
    options: [
      { id: "zhuhai", zh: "珠海", en: "Zhuhai", secs: [] },
      { id: "shenzhen", zh: "深圳", en: "Shenzhen", secs: [] },
      { id: "guangzhou", zh: "广州", en: "Guangzhou", secs: [] },
      { id: "remote", zh: "远程", en: "Remote", secs: [] },
    ],
  },
  {
    key: "type", zh: "身份", en: "Looking for",
    options: [
      { id: "intern", zh: "2027 届实习", en: "2027 internship", secs: [] },
      { id: "fulltime", zh: "可转正", en: "Return offer", secs: [] },
    ],
  },
];

export const OPTION_BY_ID: Record<string, IntentOption> = Object.fromEntries(
  INTENT_GROUPS.flatMap((g) => g.options.map((o) => [o.id, o])),
);

/* ---------- JD 匹配方向（词面匹配，全部本地）。ev＝报告行内的方向证据（与上方词条证据同源）。 ---------- */
export type JdDir = { id: string; zh: string; en: string; secs: SecKey[]; core: string[]; related: string[]; ev: { zh: string; en: string } };

export const JD_DIRS: JdDir[] = [
  {
    id: "hw", zh: "硬件产品", en: "Hardware product", secs: ["work", "projects"],
    core: ["NPI", "量产", "BOM", "SOP", "样机", "可靠性", "结构设计", "供应链", "硬件", "嵌入式", "跨部门", "工艺文件"],
    related: ["ESP32", "Arduino", "3D打印", "3D 打印", "打印机", "成本", "良率", "DFM", "ID 方案", "开模", "模具", "工艺", "测试用例", "固件"],
    ev: {
      zh: "10 款打印硬件从需求到量产都是我跟进的；研发周期缩短 18%，交付物全部标准化。",
      en: "I shepherded 10 printer products from brief to shipment; cycle −18%, everything standardized.",
    },
  },
  {
    id: "pdt", zh: "产品与交互设计", en: "Product & interaction design", secs: ["projects", "awards"],
    core: ["交互设计", "产品设计", "用户研究", "原型", "Figma", "Rhino", "Keyshot", "外观设计", "工业设计", "ID 设计"],
    related: ["设计思维", "CMF", "视觉设计", "建模", "渲染", "手绘", "Sketch", "效果图", "PRD"],
    ev: {
      zh: "AI 打印机的 ID 方案、效果图和 PRD 出自我手；米兰设计周国赛二等奖、青苔 TOP100 都是这批作品。",
      en: "The AI printer's ID proposal, renders and PRD are mine; Milan Design Week national 2nd prize, Qingtai TOP100.",
    },
  },
  {
    id: "svc", zh: "服务设计", en: "Service design", secs: ["courses", "beyond", "projects"],
    core: ["服务设计", "服务蓝图", "用户旅程", "商业系统", "策展", "活动策划", "触点"],
    related: ["组织协调", "社团", "班级", "公益", "运营"],
    ev: {
      zh: "文学社一年 15 场活动、一千多人次；毕业展策展与视觉执行也是我做的。",
      en: "15 society events a year with 1,000+ attendees; I curated and designed the graduation show.",
    },
  },
  {
    id: "uxr", zh: "用户研究与数据", en: "UX research & data", secs: ["projects", "courses"],
    core: ["用户研究", "问卷", "数据分析", "SPSS", "实证研究", "人因工程", "统计", "实验设计", "建模"],
    related: ["Tableau", "Python", "被试", "访谈", "可用性", "眼动", "SEM", "售后数据"],
    ev: {
      zh: "两个像样的研究：30 人的光学实验室人因实验、300 多份问卷的用户信任研究；另外拿 9000 条售后数据建过模型。",
      en: "Two proper studies: a 30-subject optics experiment and a 300-survey trust study; plus a 9,000-row after-sales data model.",
    },
  },
  {
    id: "ai", zh: "AI 应用与工作流", en: "AI applications & workflows", secs: ["work", "projects", "beyond"],
    core: ["Stable Diffusion", "ComfyUI", "LoRA", "AI Agent", "Langflow", "AIGC", "大模型", "AI 工作流", "模型微调"],
    related: ["提示词", "生成式", "扩散模型", "文生图", "Agent", "MJ", "Midjourney", "Google Cloud"],
    ev: {
      zh: "几十个自训 LoRA 在开源社区被跑了上万次；公司的 Stable Diffusion 文创工作流卖了一万多。",
      en: "Dozens of self-trained LoRAs with 10k+ community runs; the company SD merch pipeline I built sold ¥10k+.",
    },
  },
];

/* ---------- 文案 ---------- */
export const INTENT_TEXT: Record<Lang, {
  intro: string; jdPlaceholder: string; jdNote: string; best: string; match: string;
  seeSecs: string; copyLink: string; copied: string; noHit: string; hint: string;
  aiTitle: string; aiTag: string; aiRun: string;
  aiLoading: string; aiFail: string; aiPrivacy: string;
}> = {
  zh: {
    intro: "点几枚词条看对应证据，或直接粘贴 JD 看匹配。",
    jdPlaceholder: "把招聘 JD 全文粘进来……",
    jdNote: "词面匹配只在你浏览器本地进行。",
    best: "最匹配方向：",
    match: "匹配",
    seeSecs: "看对应经历",
    copyLink: "复制定制简历链接",
    copied: "链接已复制",
    noHit: "这段 JD 里没有命中简历关键词——换个岗位再试，或直接邮箱联系我。",
    hint: "选中的词条会生成一条定制链接，打开即高亮对应经历。",
    aiTitle: "AI 深度分析",
    aiTag: "外部 API",
    aiRun: "用大模型分析这段 JD",
    aiLoading: "分析中……",
    aiFail: "调用失败",
    aiPrivacy: "分析由本站部署的中转服务完成：JD 与简历摘要会经它发送给大模型服务商；每日限额 60 次。站点代码不含任何密钥，不填也没有关系——上方本地匹配随时可用。",
  },
  en: {
    intro: "Pick a few chips to see the evidence, or paste a JD to see the match.",
    jdPlaceholder: "Paste the full job description here……",
    jdNote: "Keyword matching runs locally in your browser.",
    best: "Best match: ",
    match: "match",
    seeSecs: "See evidence",
    copyLink: "Copy tailored résumé link",
    copied: "Link copied",
    noHit: "No keywords from this JD matched the résumé — try another posting, or just email me.",
    hint: "Selected chips form a tailored link that highlights the matching experience.",
    aiTitle: "AI deep analysis",
    aiTag: "EXTERNAL API",
    aiRun: "Analyse this JD with an LLM",
    aiLoading: "Analysing……",
    aiFail: "Call failed",
    aiPrivacy: "Analysis runs through a relay deployed by this site: the JD text and a résumé digest are forwarded to the LLM provider; capped at 60 runs/day. No key exists in the site code — the local matching above always works.",
  },
};

/* 提示词已上移到中转服务（studio/projects/job-search/analyzer-pages/functions/analyze.js）——前端零密钥。 */
