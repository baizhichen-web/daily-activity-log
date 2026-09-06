import { useEffect, useRef, useState } from "react";
import { ClipText } from "../components/ClipText";
import { prefersReducedMotion } from "../hooks/useReveal";
import "./flipbook.css";
import "./flipbook2.css";

/* ============================================================
   翻页书 Demo v2 候选 —— 散文双栏版（白纸 2026-09-01 追加要求）
   左＝一段话（G-31）：关键词可点 → 弹层详情（不跳走）
   右＝项目轮播（卡片列，自动+可打断，reduced-motion 停自动）
   同 tokens 体系；占位零假数据
   ============================================================ */

type Item = { key: string; title: string; date: string; body: string[] };

const ITEMS: Item[] = [
  { key: "ruqie", title: "如切如磋，如琢如磨", date: "2026", body: ["陶瓷 CMF + AI 工具的实验型作品集中心页。", "整串图文项目介绍 · 待白纸内容与 Figma 图导入（占位，零假数据）"] },
  { key: "gongran", title: "共燃窑火", date: "2024", body: ["漆艺 × 工艺史线上展。", "素材在作品集 PDF 中待拆分（占位）。"] },
  { key: "minnan", title: "闽南奥德赛", date: "2024", body: ["游戏化服务设计项目。（占位）"] },
  { key: "yingye", title: "萤野流声", date: "2025", body: ["ESP32 光纤装置。（占位）"] },
  { key: "taoyun", title: "陶韵自然", date: "2023", body: ["仿生 3D 打印花盆。（占位）"] },
  { key: "zhuguang", title: "竹光沁蓝", date: "2023", body: ["激光切割挎包。（占位）"] },
];

const byKey = (k: string) => ITEMS.find((i) => i.key === k);

export function FlipbookDemo2() {
  const [ready, setReady] = useState(false);
  const reduced = prefersReducedMotion();
  const [modal, setModal] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) { setReady(true); return; }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, [reduced]);

  /* 轮播：4s 自动，悬停/展开暂停，可打断 */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 4000);
    return () => clearInterval(t);
  }, [reduced, paused]);

  /* 弹层 Esc 关闭 */
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const order = idx; // 展示序：轮播首位=当前 idx

  return (
    <div className={"f2-root" + (ready ? " is-ready" : "")}>
      {!ready && (
        <div className="fb-loader" onClick={() => setReady(true)}>
          <div className="fb-loader-title">
            <ClipText text="如切如磋，如琢如磨" by="char" ready={!ready} baseDelay={120} stagger={110} />
          </div>
          <div className="fb-loader-hint">点按进入 · 可跳过</div>
        </div>
      )}

      <div className="f2-grid">
        {/* ---- 左：一段话 ---- */}
        <section className="f2-prose">
          <p className="f2-para">
            你好，我是<span className="f2-strong">白纸上</span>。工业设计出身，专业第一走过本科四年，
            实习时在硬件产品的 NPI、测试验证与量产工艺里滚过一遍；
            现在把设计、工程与 <span className="f2-em">AI 工具链</span>揉在一起做事——
            <button className="f2-link" onClick={() => setModal("ruqie")}>如切如磋，如琢如磨</button>
            是我的座右铭，也是这个站的语法。
          </p>
          <p className="f2-para">
            我的作品集中在
            <button className="f2-link" onClick={() => setModal("gongran")}>器与工艺</button>、
            <button className="f2-link" onClick={() => setModal("minnan")}>服务与游戏化</button>和
            <button className="f2-link" onClick={() => setModal("yingye")}>硬件装置</button>三条线；
            想法写在 <button className="f2-link" onClick={() => setModal("taoyun")}>写作</button>，
            过程记在 <button className="f2-link" onClick={() => setModal("zhuguang")}>工作日志</button>。
          </p>
          <p className="f2-status">状态 · 接受实习与合作咨询（2026 Q4 开放中）</p>
        </section>

        {/* ---- 右：项目轮播列 ---- */}
        <section className="f2-deck" ref={deckRef}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {ITEMS.map((it, i) => {
            const pos = (i - order + ITEMS.length) % ITEMS.length; // 0 首位
            const cls = pos === 0 ? "is-top" : pos === 1 ? "is-second" : pos === 2 ? "is-third" : "is-hidden";
            return (
              <button key={it.key} className={"f2-card " + cls}
                onClick={() => (pos === 0 ? setModal(it.key) : setIdx(i))}
                aria-label={it.title}>
                <span className="f2-card-art" aria-hidden>
                  {pos === 0 && <span className="f2-card-hint">点开看细节 +</span>}
                </span>
                <span className="f2-card-meta">
                  <span className="f2-card-title">{it.title}</span>
                  <span className="f2-card-date">{it.date}</span>
                </span>
              </button>
            );
          })}
        </section>
      </div>

      {/* ---- 弹层详情 ---- */}
      {modal && byKey(modal) && (
        <div className="f2-modal-scrim" onClick={() => setModal(null)}>
          <div className="f2-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={byKey(modal)!.title}>
            <button className="f2-modal-close" onClick={() => setModal(null)} aria-label="关闭">×</button>
            <h3 className="f2-modal-title">{byKey(modal)!.title}</h3>
            <p className="f2-modal-date">{byKey(modal)!.date}</p>
            {byKey(modal)!.body.map((b) => <p key={b} className="f2-modal-body">{b}</p>)}
            <p className="f2-modal-slot">项目详情图位 · 待 Figma 导出填入</p>
          </div>
        </div>
      )}
    </div>
  );
}