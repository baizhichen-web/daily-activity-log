import { useMemo, useState } from "react";
import type { Lang } from "../lib/prefs";
import { RESUME } from "../lib/content";
import { INTENT_GROUPS, INTENT_TEXT, JD_DIRS, OPTION_BY_ID, type SecKey } from "../data/intent";
import "../styles/intent.css";

/* 「我要找工」面板（03 联系页主体，2026-10-05 白纸拍板）。
   隐私边界：
   - 词面匹配在本组件内完成（string.includes），零网络请求、零存储；
   - AI 深度分析走本站部署的 Cloudflare Pages 中转（/analyze）：JD 与简历摘要会经它发送给大模型服务商；
     Key 由站长配置在服务端，前端代码零密钥。服务端每日限额 60 次。 */

type Props = { lang: Lang; onJump: (sec: SecKey) => void; initialSel?: Record<string, string[]> };

const ANALYZER_URL = "https://baizhi-analyzer.pages.dev/analyze";

export function IntentPanel({ lang, onJump, initialSel }: Props) {
  const tx = INTENT_TEXT[lang];
  const [sel, setSel] = useState<Record<string, string[]>>(initialSel ?? {});
  const [jd, setJd] = useState("");
  const [copied, setCopied] = useState(false);
  const [aiOut, setAiOut] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState("");

  const toggle = (g: string, id: string) =>
    setSel((s) => {
      const cur = s[g] ?? [];
      return { ...s, [g]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });

  const selSecs = useMemo(() => {
    const set = new Set<SecKey>();
    Object.values(sel).flat().forEach((id) => OPTION_BY_ID[id]?.secs.forEach((s) => set.add(s)));
    return [...set];
  }, [sel]);

  const report = useMemo(() => {
    const jdL = jd.toLowerCase();
    if (!jdL.trim()) return null;
    return JD_DIRS.map((d) => {
      const hitCore = d.core.filter((k) => jdL.includes(k.toLowerCase()));
      const hitRel = d.related.filter((k) => jdL.includes(k.toLowerCase()));
      return { d, hitCore, hitRel, score: hitCore.length * 2 + hitRel.length };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [jd]);

  const maxScore = JD_DIRS.reduce((m, d) => m + d.core.length * 2 + d.related.length, 0);

  const copyLink = async () => {
    const ids = Object.values(sel).flat();
    const url = `${location.origin}${location.pathname}?page=1${ids.length ? `&aim=${ids.join(",")}` : ""}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 剪贴板不可用（旧内核/权限）——静默；链接在地址栏手动拼亦可 */
    }
  };

  /* 简历摘要：与网站渲染同源，杜绝编造空间 */
  const resumeDigest = useMemo(() => {
    const R = RESUME[lang];
    return JSON.stringify({
      identity: { role: R.identity.role, meta: R.identity.meta, lines: R.identity.lines },
      education: R.education.map((e) => ({ period: e.period, title: e.title, sub: e.sub, lines: e.lines })),
      work: R.work.map((w) => ({ period: w.period, title: w.title, sub: w.sub, lines: w.lines })),
      projects: R.otherProjects.map((p) => ({ period: p.period, title: p.title, highlight: p.highlight, lines: p.lines.slice(0, 3) })),
      awards: { design: R.awardsDesign, honor: R.awardsHonor },
      courses: R.courses.map((g) => `${g.group}: ${g.items.map((c) => `${c.name} ${c.score}`).join(", ")}`),
      beyond: R.beyond.items.map((b) => b.title),
      contact: { email: R.contact.email, site: "baizhichen-web.github.io" },
    }, null, 0);
  }, [lang]);

  const runAi = async () => {
    if (!jd.trim()) return;
    setAiBusy(true); setAiErr(""); setAiOut("");
    try {
      const res = await fetch(ANALYZER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd, digest: resumeDigest }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j?.error || `HTTP ${res.status}`);
      setAiOut(j.text ?? "");
    } catch (e) {
      setAiErr(e instanceof Error ? e.message : String(e));
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <div className="fb-intent">
      <p className="fb-intent-intro">{tx.intro}</p>

      {INTENT_GROUPS.map((g) => {
        const picked = g.options.filter((o) => (sel[g.key] ?? []).includes(o.id));
        return (
          <div key={g.key} className="fb-intent-group">
            <span className="fb-intent-glabel">{lang === "zh" ? g.zh : g.en}</span>
            <span className="fb-intent-pills">
              {g.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={"fb-chip fb-pill" + (picked.includes(o) ? " is-on" : "")}
                  onClick={() => toggle(g.key, o.id)}
                >
                  {lang === "zh" ? o.zh : o.en}
                </button>
              ))}
            </span>
            {picked.some((o) => o.ev) && (
              <span className="fb-ev-list">
                {picked.filter((o) => o.ev).map((o) => (
                  <span key={o.id} className="fb-ev">{lang === "zh" ? o.ev!.zh : o.ev!.en}</span>
                ))}
              </span>
            )}
          </div>
        );
      })}

      <div className="fb-intent-actions">
        <button type="button" className="fb-tab fb-tab--solid" onClick={copyLink}>{tx.copyLink}</button>
        {copied && <span className="fb-intent-copied">{tx.copied}</span>}
        <span className="fb-intent-hint">{tx.hint}</span>
      </div>

      {selSecs.length > 0 && (
        <div className="fb-intent-secs">
          {(lang === "zh" ? "对应经历：" : "Evidence: ")}
          {selSecs.map((s) => (
            <button key={s} type="button" className="fb-tab" onClick={() => onJump(s)}>
              {(lang === "zh" ? SEC_ZH : SEC_EN)[s]}
            </button>
          ))}
        </div>
      )}

      <div className="fb-jd-wrap">
        <textarea className="fb-jd" value={jd} onChange={(e) => setJd(e.target.value)} placeholder={tx.jdPlaceholder} rows={4} />
        <p className="fb-intent-note">{tx.jdNote}</p>

        {report && (
          <div className="fb-jd-report">
            {report.length === 0 && <p className="fb-jd-nohit">{tx.noHit}</p>}
            {report.length > 0 && (
              <p className="fb-jd-best">{tx.best}<strong>{lang === "zh" ? report[0].d.zh : report[0].d.en}</strong></p>
            )}
            {report.map(({ d, hitCore, hitRel, score }) => (
              <div key={d.id} className="fb-jd-row">
                <div className="fb-jd-rowhead">
                  <span className="fb-jd-dir">{lang === "zh" ? d.zh : d.en}</span>
                  <button type="button" className="fb-tab" onClick={() => d.secs.forEach((s, i) => i === 0 && onJump(s))}>
                    {tx.seeSecs}
                  </button>
                  <span className="fb-jd-score">{score} · {tx.match}</span>
                </div>
                <div className="fb-jd-bar"><i style={{ width: `${Math.min(100, (score / maxScore) * 100 * 4).toFixed(1)}%` }} /></div>
                <p className="fb-jd-hits">{[...hitCore, ...hitRel].join(" · ")}</p>
                <p className="fb-jd-ev">{lang === "zh" ? d.ev.zh : d.ev.en}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fb-ai">
        <div className="fb-ai-head">
          <span className="fb-ai-title">{tx.aiTitle}</span>
          <span className="fb-ai-tag">{tx.aiTag}</span>
          <button type="button" className="fb-tab fb-tab--solid" disabled={aiBusy || !jd.trim()} onClick={runAi}>{tx.aiRun}</button>
        </div>
        <p className="fb-intent-note">{tx.aiPrivacy}</p>
        {aiBusy && <p className="fb-intent-note">{tx.aiLoading}</p>}
        {aiErr && <p className="fb-ai-err">{tx.aiFail}：{aiErr}</p>}
        {aiOut && <div className="fb-ai-out">{aiOut}</div>}
      </div>
    </div>
  );
}

const SEC_ZH: Record<SecKey, string> = {
  education: "教育", about: "关于", beyond: "专业之外", work: "实习经历", projects: "科研与项目",
  awards: "获奖", courses: "课程成绩", self: "自我评价", contact: "联系",
};
const SEC_EN: Record<SecKey, string> = {
  education: "Education", about: "About", beyond: "Beyond", work: "Internships", projects: "Research & Projects",
  awards: "Awards", courses: "Coursework", self: "Self", contact: "Contact",
};
