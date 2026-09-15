/* ============================================================
   简历页数据（2026-09-12 白纸全量换血版）
   内容源：白纸 2026-09-12 亲发简历全文；文字尽量逐字保留，
   仅做标点整理与个别明显笔误修正（如「跨部内」→「跨部门」）。
   结构：页首身份块 + §1 关于 / §2 专业之外 / §3 实习经历 /
        §4 其他项目经历 / §5 获奖 / §6 部分课程成绩 / §7 自我评价 + 证明材料
   待补占位以（待补：…）显式标注（零假数据纪律）
   ============================================================ */

export type Lang = "zh" | "en";

/* 页首身份块（2026-09-12 按参考站重排：头像 + 姓名 + 角色 + 社交链接行） */
export const ROLE_LINE = "设计专硕研究生在读";

/* 社交链接（2026-09-12 白纸定：图标行，参照其所给参考站；不要 X，换邮箱）
   kind 决定图标；href 为空＝待白纸补链接（渲染为不可点） */
export const SOCIALS: { kind: "mail" | "github" | "red"; label: string; href: string | null }[] = [
  { kind: "mail", label: "邮箱", href: "mailto:202622089004@mail.bnu.edu.cn" },
  { kind: "github", label: "GitHub", href: "https://github.com/baizhichen-web" },
  { kind: "red", label: "小红书", href: null },
];

export const IDENTITY: Record<Lang, { name: string; meta: string[]; lines: string[] }> = {
  zh: {
    name: "陈柏志",
    /* Frame 3（白纸手稿 2026-09-13）：两行、顺序为 政治面貌/外语 与 联系方式/地址
       （地址与联系方式对调、邮箱取用 BNU 学邮；间隔字符照 Figma 原样）
       2026-09-14 白纸指令：删去「联系方式」那行——§ 9 联系已给电话与邮箱，开头不再重复 */
    meta: [
      "政治面貌：中共党员　外语：CET6-478",
    ],
    lines: [
      "我喜爱阅读、运动和创造，致力在交叉领域中探索新的可能",
    ],
  },
  en: {
    name: "Chen Baizhi",
    /* 2026-09-14 同中文侧：删去电话/邮箱那行（§ 9 联系已给） */
    meta: [
      "Party member (CPC)",
      "CET-6: 478",
      "Zhuhai, Guangdong",
    ],
    lines: [
      "I love reading, sports and making — exploring what lives between the fields",
    ],
  },
};

/* 海报墙（首页）。正文/封面均为占位标注（零假数据），待白纸供料替换；
   抽到 data 层：AI Native 生成器（llms.txt/.md 副本）与 UI 共用同一份事实。

   ⚠️ 2026-09-14 白纸指令：**暂时清空**「待建设」四张占位海报（01 如切如磋 / 02 共燃窑火 /
   03 闽南奥德赛 / 04 萤野流声）。数组一空，FlipbookDemo 的「待建设」模块头
   （TO BE BUILT + 说明段）也随之不再渲染，墙面只剩两篇文章。
   四条原始数据在 git 历史里（本文件上一版），要恢复就把它们放回数组即可。 */
export const POSTER_WALL: {
  no: string; title: string; date: string; accent: string;
  /* slug=内容系统条目（web/content/projects/<slug>.yml）；有 slug 的海报展开态出「阅读全文」入口 */
  slug?: string;
  desc: Record<Lang, string>; body: Record<Lang, string[]>;
}[] = [];

/* §1 关于 */
export const ABOUT: string[] = [
  "我今年 23 岁，本科在校期间绩点排名第一，两次获得国家奖学金，推免至北京师范大学未来设计学院攻读服务设计方向。",
  "从 2022 年进入大学学习，我就积极探索设计、产品、技术的行业发展趋势，用一双好奇的眼睛看世界，是我最大的优势。",
  "我本科在机电学院就读，故培养了我的技术敏感性与对工业生产制造的敏感性：我会关注原理是否成立、结构是否可靠、材料与工艺是否匹配、成本与良率是否可控、供应链与量产是否现实。",
  "设计则给我带来了介入技术的感性和理性的产品视角：",
  "对于理性的视角：把“体验”变成可观测、可验证、可迭代的对象，用数据的工具参与设计流程也校准设计决策，也把想法用硬件和代码赋予其实体。",
  "对于感性的视角：设计又让我把技术放回人的感知与生活经验中，它被看见、触摸、操作时是什么感受？它通过形态、材质、声音、光影和交互传递怎样的情绪与意义？它是否让人愿意接近、理解并记住？",
];

/* §2 专业之外 */
export const BEYOND_INTRO =
  "专业之外的就是爱好。我觉得爱好塑造人，人也在冥冥之中选择着爱好。兴趣爱好绝对是重要的，它让我们开心，也可以产生一种滋润的作用——在我们痛苦的时候，可以很容易地带我们走出困境。";

export const BEYOND: { title: string; text: string }[] = [
  {
    title: "足球",
    text: "本科期间我是校足球队成员，长期参与训练和比赛。体育让我收获健康、快乐和更加坚强的意志品质。",
  },
  {
    title: "阅读与写作",
    text: "阅读让我保持对世界的好奇，我拥抱书本，广泛涉猎，吸收与扬弃书本，这让我有了很多想说的话；写作则帮我把这些模糊的想法整理成清晰的表达。",
  },
  {
    title: "书法",
    text: "前人写过的字我接着写，在横竖撇捺中体悟传统文化的动态美、曲线美，这是我不竭的传统审美源泉。但其实我是眼高手低的书法爱好者。",
  },
  {
    title: "技术社区",
    text: "我持续关注大模型社区，喜欢看新技术如何被快速做成可用的小工具。2023 年在 Civitai、Liblib 训练并分享模型，获得 Civitai 新人创作者排名前 100，Liblib 模型下载 1.4k+、在线运行量 14k+。技术社区让我保持对趋势的敏感。",
  },
];

/* §3 实习经历 */
export const WORK: { period: string; title: string; sub: string; lines: string[] }[] = [
  {
    period: "2024.03–2024.12",
    title: "厦门芸善科技",
    sub: "文创设计",
    lines: [
      "使用 Stable Diffusion 搭建文创产品研发工作流，完成校园文创产品的设计开发与生产对接，销售额破万。",
    ],
  },
  {
    period: "2025.11–2026.03",
    title: "厦门鹿匠科技",
    sub: "硬件产品实习生",
    lines: [
      "统筹热敏打印机产品 NPI：对齐跨部门需求与关键节点，推动研发按期输出量产资料；沉淀并维护交付物体系与输入输出标准。",
      "负责样机验证与技术测试（功能调试、固件迭代、可靠性、兼容性），建设测试用例库与报告规范，支撑风险管控与放行决策。",
      "主导量产工艺与文件体系：编制 BOM、SOP、工艺卡等，打通研发到量产的落地链路，支撑成本优化与方案复用。",
      "参与前期定义与 ID 方案输出，结合用户数据与市场需求保障设计可落地。",
    ],
  },
];

/* §4 其他项目经历（论文条目排在大创之前——白纸 2026-09-12 指令） */
export const OTHER_PROJECTS: { period: string; title: string; note: string; highlight: string; lines: string[] }[] = [
  {
    period: "2025.01–2026.05",
    title: "2025 年度福建省社会科学基金项目",
    highlight: "SCI 收录",
    note: "人因工程 · 陶瓷 · 照明",
    lines: [
      "论文：人工照明光谱构成-情绪耦合作用下的陶瓷材质感知机制实证研究（Lighting Research and Technology，SCI 收录）",
      "Correlated colour temperature effects on perceived temperature, translucency, glossiness and roughness of traditional Jun porcelain, modulated by gender",
      "以钧瓷为对象，在 2700–6000K 八档色温、恒定 150lx 条件下测量 30 名被试对光泽度、透明度、粗糙度、温度感与浮雕感五个维度的感知：色温与其中四个维度呈显著线性关系，且性别具调节作用。",
      "DOI: 10.1177/14771535261455253　（作者位次待确认）",
    ],
  },
  {
    period: "2023.09–2024.12",
    title: "臭氧催化氧化配套反应装置",
    highlight: "实用新型专利 · 互联网+ 银奖 · 青苔 TOP100",
    note: "大创国家级立项 · 产品负责人（第二负责人）",
    lines: [
      "统筹化工与设计跨学科团队，把实验室催化材料技术转化为可落地的硬件方案；负责产品结构定义与外观设计。结构获实用新型专利，项目获中国“互联网+”大学生创新创业大赛校级银奖、“创青春”省优秀奖，产品设计获青苔国际工业设计大赛 TOP100。",
    ],
  },
  {
    period: "2024.09–2025.06",
    title: "班级团支书",
    highlight: "校优秀团支部",
    note: "华侨大学",
    lines: [
      "统筹 60+ 人规模班级的团务与班级建设工作，围绕思想引领、学风建设与班级凝聚力设计活动内容，策划主题团日，对接校团委完成 10+ 项考核指标（团费收缴、评优推优等），班级获评 2024 学年校优秀团支部。",
      "负责毕业展、教学成果的策展、视觉设计与执行。",
    ],
  },
  {
    period: "2024.09–25.06",
    title: "校文学社负责人",
    highlight: "校级活动 15+ · 参与 1000+",
    note: "华侨大学",
    lines: [
      "围绕杂志出版、征文、审稿、书画比赛等内容运营社团，任期筹备策划校级活动 15+，累计参与人次 1000+，个人获得图书馆文化传播工作组织奖。",
    ],
  },
  {
    period: "2025.07–2026.07",
    title: "新生班主任助理",
    highlight: "迎新 · 班级建设 · 学业引导",
    note: "华侨大学",
    lines: [
      "协助辅导员与班主任开展新生入学适应、班级建设与学业引导工作。参与迎新接待、入学教育与日常管理，组织破冰交流、主题班会与专业认知活动，对接新生日常事务与答疑，协助评奖评优、材料整理与信息统计，关注新生心理与适应情况，搭建新生与院系之间的沟通桥梁。",
    ],
  },
];

/* §5 获奖 */
export const AWARDS_DESIGN = [
  "2025.05　米兰设计周中国高校设计学科师生优秀作品展：国赛二等奖、福建赛区一等奖",
  "2024.11　青苔国际工业设计大赛：“青苔设计菁英 TOP100”“青苔设计 TOP100”",
  "2025.05　“海丝无界·融创泉州”海峡两岸文创设计工作坊：一等奖",
  "2025.08　未来设计师·全国高校数字艺术设计大赛：福建赛区二等奖",
  "2025.08　中国好创意暨全国数字艺术设计大赛：福建赛区三等奖、优秀奖",
  "2024.11　第五届越窑杯陶瓷创意设计大赛：入围奖",
  "2025.11　第十届“两岸新锐设计竞赛·华灿奖”：福建赛区二等奖",
  "2025.11　青苔国际工业设计大赛：三等奖 ×2",
];

export const AWARDS_HONOR = [
  "2023.11　2022–2023 学年国家奖学金",
  "2024.11　2023–2024 学年华侨大学翁俊民奖学金",
  "2025.01　华侨大学 2023–2024 年度“优秀共青团员”",
  "2024.11　2023–2024 学年校优秀学生",
  "2023.11　2022–2023 学年校优秀学生",
  "2024.11　2023–2024 学年华侨大学校一等奖学金",
  "2025.11　2024–2025 学年国家奖学金",
  "2025.11　2024–2025 学年校优秀学生",
  "2025.11　2024–2025 学年校优秀干部",
];

/* §6 部分课程成绩 */
export const COURSES: { group: string; items: { name: string; score: number }[] }[] = [
  {
    group: "设计与用户研究",
    items: [
      { name: "虚拟交互技术与设计", score: 97 },
      { name: "数字媒体设计", score: 96 },
      { name: "产品实现与创新设计", score: 94 },
      { name: "智能产品设计与开发", score: 94 },
      { name: "服务设计", score: 94 },
      { name: "工业设计史", score: 94 },
      { name: "设计思维", score: 91 },
      { name: "人因工程", score: 91 },
    ],
  },
  {
    group: "技术与工程",
    items: [
      { name: "应用程序开发", score: 97 },
      { name: "开源硬件与编程", score: 95 },
    ],
  },
  {
    group: "商业与分析",
    items: [
      { name: "商业数据分析", score: 93 },
      { name: "商业系统与创新设计", score: 90 },
    ],
  },
  {
    group: "数理与设计基础",
    items: [
      { name: "高等数学 A4", score: 94 },
      { name: "大学物理（一）", score: 94 },
      { name: "设计构成基础", score: 93 },
      { name: "设计表现技法Ⅰ", score: 92 },
      { name: "设计素描Ⅰ", score: 91 },
    ],
  },
];

/* §7 自我评价（2026-09-12 白纸亲定）：收起态＝两段结论；展开态＝全文（引言 + 思想汇报引文 + 完整两段）
   准则：收起给结论、展开给论证——先让读者认识“我是什么人”，想看来龙去脉的再展开 */
export const SELF_EVAL_INTRO =
  "进行自我评价总是不容易的，确实很难有人能很正确的讲清楚自己，为了写这部分，我是绞尽脑汁，于是翻出了大学四年来的思想汇报，一季度一次，这或许是最频繁、最经常自我反思了。有一次我曾写到：";

export const SELF_EVAL_QUOTES = [
  "「模型制作方法」-76：动手能力差、耐心缺缺，且我在后续的设计实践中也没能很好地运用手板模型制作和测试的知识",
  "「计算机辅助三维设计」-84：提前了解一些建模知识就骄傲自大，缺乏对课程的尊重，且也没很好地训练出自己良好的建模能力",
];

export const SELF_EVAL_BODY: { short: string; full: string }[] = [
  {
    short: "这是一个动手能力很差的人，这是一个没有耐心的人，这是一个三分钟热度的人，这是一个怕累怕难的人，这是一个爱立 flag 的人，这是一个爱耍小聪明的人；",
    full: "其中有很多废话。那么在这里，我想我可以再进行一次综合，这是一个动手能力很差的人，这是一个没有耐心的人，这是一个三分钟热度的人，这是一个怕累怕难的人，这是一个爱立 flag 的人，这是一个爱耍小聪明的人；",
  },
  {
    short: "这是一个热爱运动的人，这是一个喜爱创造的人，这是一个阳光开朗的人，这也是一个脾气好的人，这是一个渴望变得忠厚善良、道德高尚的人，也是一个避免自己变得更加卑鄙龋龋的人。",
    full: "但是对应的总要也有一些好的方面，这是一个热爱运动的人，这是一个喜爱创造的人，这是一个阳光开朗的人，这也是一个脾气好的人，这是一个渴望变得忠厚善良、道德高尚的人，也是一个避免自己变得更加卑鄙龋龋的人。",
  },
];

/* 教育经历（2026-09-13 白纸指令：格式与各 § 节完全一致——概览行/展开明细同款；校徽按其裁决撤除；
   数据形状与 WORK 一致（period/title/sub/lines），渲染走 CompactRow/EntryRow */
export const EDUCATION: Record<Lang, { period: string; title: string; sub: string; lines: string[] }[]> = {
  zh: [
    {
      period: "2026.09–至今",
      title: "北京师范大学 未来设计学院",
      sub: "设计 – 硕士在读",
      lines: ["服务设计方向", "推免入学（2026 年 9 月报到）", "校区：珠海 · 广东"],
    },
    {
      period: "2022.09–2026.06",
      title: "华侨大学 机电及自动化学院",
      sub: "工业设计 – 本科",
      lines: ["GPA 4.58（专业排名 1/34）；两次获国家奖学金", "推免至北京师范大学未来设计学院", "校区：厦门 · 福建"],
    },
  ],
  en: [
    {
      period: "2026.09–present",
      title: "Beijing Normal University · School of Future Design",
      sub: "Design – M.A. in progress",
      lines: ["Service design track", "Recommended admission (enrolled Sep 2026)", "Campus: Zhuhai · Guangdong"],
    },
    {
      period: "2022.09–2026.06",
      title: "Huaqiao University · Mechatronics & Automation",
      sub: "Industrial Design – BEng",
      lines: ["GPA 4.58 (rank 1/34); National Scholarship ×2", "Recommended to BNU School of Future Design", "Campus: Xiamen · Fujian"],
    },
  ],
};

/* 证明材料（可点击 → PDF；文件放 web/public/docs/，未上传的显式标注） */
/* 证明材料（2026-09-14 白纸指令：不再单开一节，挂在**对应章节的下面**）。
   section = 挂到哪一节：edu 教育 / projects 其他项目经历 / awards 获奖 / courses 课程成绩 / contact 联系。
   href=null → 渲染「待上传」占位（零假数据）。 */
export const DOCS: { title: string; sub: string; href: string | null; section: "edu" | "projects" | "awards" | "courses" | "contact" }[] = [
  { title: "SCI 论文全文", sub: "PAPER · PDF", href: null, section: "projects" },
  { title: "获奖证书合集", sub: "AWARDS · PDF", href: null, section: "awards" },
  { title: "本科成绩单", sub: "TRANSCRIPT · PDF", href: null, section: "courses" },
  { title: "简历（中文 / EN）", sub: "RESUME · PDF", href: null, section: "contact" },
];
/* 联系方式单源（2026-09-13）：§ 10 与联系页共用；小红书主页链接=白纸 09-13 深夜提供
   邮箱 2026-09-14 白纸指令：改用北师大学邮（原 QQ 邮箱撤下） */
export const CONTACT = {
  email: "202622089004@mail.bnu.edu.cn",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/5d554004000000001200b5d5",
};
