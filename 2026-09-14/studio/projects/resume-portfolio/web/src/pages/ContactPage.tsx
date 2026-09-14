import { useEffect, useRef, useState } from "react";
import { navigateContact } from "../lib/route";
import { readLang, readTheme } from "../lib/prefs";
import { CONTACT } from "../data/resume";
import "../demo/flipbook.css"; // 复用头栏/发丝线/mono 体系（fb-*）

/* ============================================================
   联系页（2026-09-13 白纸指令：§ 10 联系段「这里」跳本页；含小红书+邮箱）
   骨架对标 ProjectPage 页头 chrome（暂复制未抽件——头栏合并重构排队中）；
   小红书链接待白纸提供 → CONTACT.xiaohongshu 为 null 时渲染待补位（零假数据）。
   ============================================================ */

const T = {
  zh: {
    title: "联系",
    eyebrow: "联系",
    lead: "接受实习与合作咨询，欢迎来信。",
    kEmail: "邮箱",
    kRed: "小红书",
    kTel: "电话",
    red: "小红书 · 链接待补",
    status: "状态 · 开放中（2026 Q4）",
    copied: "邮箱已复制",
    back: "← 返回",
  },
  en: {
    title: "Contact",
    eyebrow: "CONTACT",
    lead: "Open to internships and collaborations — write to me.",
    kEmail: "EMAIL",
    kRed: "XIAOHONGSHU",
    kTel: "PHONE",
    red: "Xiaohongshu · link pending",
    status: "STATUS · OPEN (2026 Q4)",
    copied: "Email copied",
    back: "← Back",
  },
} as const;

export function ContactPage() {
  const lang = readLang();
  const t = T[lang];
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.title = `${t.title} · 陈柏志`;
    document.documentElement.dataset.theme = readTheme();
    window.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") navigateContact(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyEmail = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(CONTACT.email).then(done, done);
    else done();
  };

  return (
    <div className="fb-cpage">
      <header className="fb-header">
        <div className="fb-header-id">
          <span className="fb-header-name">白纸上</span>
          <span className="fb-header-tag">HUMANIST DESIGN ENGINEER</span>
        </div>
        <nav className="fb-header-nav">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateContact(false); }}>{t.back}</a>
        </nav>
      </header>

      {/* 主体（2026-09-14 白纸反馈重排）：调研结论=个人站联系页主流是「无表单、纯文字 + 逐行联系」；
          版式取站内条目行语言——mono 标签列 + 值 + 发丝线分隔，间距全走 tokens（不再硬套旧翻页书类） */}
      <main className="ct-main">
        <p className="ct-eyebrow">{t.eyebrow}</p>
        <h1 className="ct-lead">{t.lead}</h1>
        <ul className="ct-list">
          <li className="ct-row">
            <span className="ct-key">{t.kEmail}</span>
            <button type="button" className="ct-val ct-copy" onClick={copyEmail} title={t.copied}>
              {CONTACT.email}
            </button>
          </li>
          <li className="ct-row">
            <span className="ct-key">{t.kRed}</span>
            {CONTACT.xiaohongshu ? (
              <a className="ct-val" href={CONTACT.xiaohongshu} target="_blank" rel="noreferrer">小红书 ↗</a>
            ) : (
              <span className="ct-val is-pending">{t.red}</span>
            )}
          </li>
          <li className="ct-row">
            <span className="ct-key">{t.kTel}</span>
            <a className="ct-val" href="tel:18250698500">+86 182 5069 8500</a>
          </li>
        </ul>
        <p className="ct-status">{t.status}</p>
      </main>

      {copied && <div className="fb-toast" role="status">{t.copied}</div>}
    </div>
  );
}
