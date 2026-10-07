import { useMemo, useState } from "react";
import type { Lang } from "../lib/prefs";
import { RESUME } from "../lib/content";
import {
  INTENT_TEXT, JD_DIRS, M3_REF_IDS,
  entryIdFor, entryName, type M3Data, type SecKey,
} from "../data/intent";
import "../styles/intent.css";

/* 「我要找工」面板 v3.1（03 联系页主体；M3 数字白纸，2026-10-06 白纸拍板开工）。
   主流程＝贴 JD → 中转（baizhi-analyzer.pages.dev/analyze）→ 结构化 JSON → 简历页重排；
   降级链＝JSON 失败→markdown 报告；AI 不可用→本地词面快查（string.includes，零网络）。
   v3.2（白纸 10-06）：报告只留 match/verdict/reasons/pinned——自荐语/缺口/复制链接整体去掉，
   语气「偏向候选人」（提示词侧）。
   2026-10-06 白纸指令：底部「没有现成 JD？」词条浏览区整体删除（含 chips/证据行/词条定制链接）——
   定制链接只剩 M3 报告里那条（?m3=）；旧 ?aim= 链接的节高亮能力仍在 FlipbookDemo 保留。 */

type Props = {
  lang: Lang;
  onJump: (sec: SecKey) => void;
  onM3?: (m3: M3Data) => void;
  onOpenRef?: (ref: string) => void;
};

const ANALYZER_URL = "https://baizhi-analyzer.pages.dev/analyze";

export function IntentPanel({ lang, onJump, onM3, onOpenRef }: Props) {
  const tx = INTENT_TEXT[lang];
  const [jd, setJd] = useState("");
  const [m3, setM3] = useState<M3Data | null>(null);
  const [aiOut, setAiOut] = useState("");           // 降级：markdown 报告
  const [aiFailed, setAiFailed] = useState(false);  // AI 不可用 → 显示本地词面快查
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState("");

  /* 本地词面快查（AI 不可用时的托底，平时不渲染——白纸 10-06：两条分析路并列太乱） */
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

  /* 简历摘要：与网站渲染同源 + 条目 id（大模型据 id 指认 pinned），杜绝编造空间 */
  const resumeDigest = useMemo(() => {
    const R = RESUME[lang];
    return JSON.stringify({
      identity: { role: R.identity.role, meta: R.identity.meta, lines: R.identity.lines },
      education: R.education.map((e) => ({ id: entryIdFor("education", e.title), period: e.period, title: e.title, sub: e.sub, lines: e.lines })),
      work: R.work.map((w) => ({ id: entryIdFor("work", w.title), period: w.period, title: w.title, sub: w.sub, lines: w.lines })),
      projects: R.otherProjects.map((p) => ({ id: entryIdFor("projects", p.title), period: p.period, title: p.title, highlight: p.highlight, lines: p.lines.slice(0, 3) })),
      awards: { design: R.awardsDesign, honor: R.awardsHonor },
      courses: R.courses.map((g) => `${g.group}: ${g.items.map((c) => `${c.name} ${c.score}`).join(", ")}`),
      beyond: R.beyond.items.map((b) => b.title),
      contact: { email: R.contact.email, site: "baizhichen-web.github.io" },
    }, null, 0);
  }, [lang]);

  const runAi = async () => {
    if (!jd.trim() || aiBusy) return;
    setAiBusy(true); setAiErr(""); setAiOut(""); setM3(null); setAiFailed(false);
    try {
      const res = await fetch(ANALYZER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd, digest: resumeDigest, refs: M3_REF_IDS, lang }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j?.error || `HTTP ${res.status}`);
      if (j.mode === "m3" && j.data) {
        setM3(j.data);
        onM3?.(j.data);
      } else {
        setAiOut(j.text ?? "");
      }
    } catch (e) {
      setAiErr(e instanceof Error ? e.message : String(e));
      setAiFailed(true);
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <div className="fb-intent">
      {/* ---- 主流程：JD → 数字白纸（intro 已删——白纸 10-06：与占位符重复，无框文本框里两句话会互相误会）---- */}
      <div className="fb-jd-wrap">
        <textarea className="fb-jd" value={jd} onChange={(e) => setJd(e.target.value)} placeholder={tx.jdPlaceholder} rows={4} />
        <div className="fb-jd-actions">
          <button type="button" className="fb-jd-run" disabled={aiBusy || !jd.trim()} onClick={runAi}>
            {aiBusy ? tx.aiLoading : tx.aiRun}
          </button>
          <span className="fb-ai-tag">{tx.aiTag}</span>
        </div>
        <p className="fb-intent-note">{tx.aiPrivacy}</p>
        {aiErr && <p className="fb-ai-err">{tx.aiFail}：{aiErr}</p>}
      </div>

      {/* ---- 结果：数字白纸结构化报告 ---- */}
      {m3 && (
        <div className="fb-m3">
          <div className="fb-m3-top">
            <span className="fb-m3-num">{m3.match}</span>
            <span className="fb-m3-den">/ 100</span>
            {m3.verdict && <p className="fb-m3-verdict">{m3.verdict}</p>}
          </div>

          {m3.reasons.length > 0 && (
            <ol className="fb-m3-reasons">
              {m3.reasons.map((r, i) => <li key={i}>{r}</li>)}
            </ol>
          )}

          {m3.pinned.length > 0 && (
            <div className="fb-m3-block">
              <p className="fb-m3-label">{tx.pinnedLabel}</p>
              {m3.pinned.map((p, i) => (
                <div key={p.ref} className="fb-m3-pin">
                  <button type="button" className="fb-m3-pin-go" onClick={() => onOpenRef?.(p.ref)}>
                    <span className="fb-m3-pin-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="fb-m3-pin-title">{entryName(p.ref, lang)}</span>
                    <span className="fb-m3-pin-arrow" aria-hidden>→</span>
                  </button>
                  {p.why && <p className="fb-m3-pin-why">{p.why}</p>}
                </div>
              ))}
              <button type="button" className="fb-tab" onClick={() => onOpenRef?.(m3.pinned[0].ref)}>{tx.seeResume}</button>
            </div>
          )}

        </div>
      )}

      {/* ---- 降级：markdown 报告 ---- */}
      {!m3 && aiOut && <div className="fb-ai-out">{aiOut}</div>}

      {/* ---- 降级：AI 不可用 → 本地词面快查 ---- */}
      {aiFailed && report && (
        <div className="fb-jd-report">
          <p className="fb-intent-note">{tx.localFallback}</p>
          {report.length === 0 && <p className="fb-jd-nohit">{tx.noHit}</p>}
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
  );
}
