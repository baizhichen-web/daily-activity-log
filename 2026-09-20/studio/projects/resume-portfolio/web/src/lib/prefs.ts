/* 主题/语言偏好（localStorage 持久化，2026-09-13 随项目页 pilot 加）：
   翻页书 ↔ 项目页切页不断档（白纸要求「项目页长在原站体系里」——
   在书内切了黑夜/英文，进项目页仍是黑夜/英文）。键名 bs-theme / bs-lang。
   2026-09-20 白纸指令：**首访默认英文**——没存过偏好时 = en；
   只有主动切过「中」的用户回来才是中文。 */

export type Lang = "zh" | "en";
export type Theme = "light" | "dark";

export const readLang = (): Lang => (localStorage.getItem("bs-lang") === "zh" ? "zh" : "en");
export const readTheme = (): Theme => (localStorage.getItem("bs-theme") === "dark" ? "dark" : "light");
export const saveLang = (l: Lang) => localStorage.setItem("bs-lang", l);
export const saveTheme = (t: Theme) => localStorage.setItem("bs-theme", t);
