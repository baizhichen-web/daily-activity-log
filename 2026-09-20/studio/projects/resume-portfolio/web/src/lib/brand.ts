/* 页眉品牌（左上角姓名 + 一行定位）：随语言切换。
   2026-09-20 白纸指定两套文案 —— 英文 Baizhi Chen / DESIGNER & ENGINEER & READER，
   中文 陈柏志 / 阅读、制造和创造。
   三处页眉（首页 / 项目与文章页 / 联系页）共用本文件，避免各写一份再漂移。 */
export const BRAND = {
  zh: { name: "陈柏志", tag: "阅读、制造和创造" },
  en: { name: "Baizhi Chen", tag: "DESIGNER & ENGINEER & READER" },
} as const;
