/* ============================================================
   GitHub 贡献热区图（2026-09-13）
   数据源：gh api graphql → contributionsCollection（账号 baizhichen-web），
   产物 src/data/githubHeatmap.json，重抓后重建即刷新。
   视觉复用此前做过的热区图语言（EvidenceBoard 同款格子网格）：
   tokens 灰阶五档（--heatmap-1…5）= 黑白体系内的热值阶梯。
   ============================================================ */
import type { CSSProperties } from "react";
import { useReveal } from "../hooks/useReveal";
import heat from "../data/githubHeatmap.json";

type Day = { d: string; c: number };
const WEEKS = heat.weeks as Day[][];

/** 热值分档：0 → l0；其余按峰值四分（GitHub 同款四档 + 空格） */
function levelOf(c: number): 0 | 1 | 2 | 3 | 4 {
  if (c <= 0) return 0;
  const max = heat.max || 1;
  const r = c / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export function GithubHeatmap() {
  /* 入场动画（2026-09-13 白纸指定对标 fardeenmansoori.com / R-09）：
     进入视口才播——53 列 × 7 行逐格 fade+scale，列间 14ms 行间 5ms 波次扫过；
     reduced-motion 时 useReveal 直接置真 + CSS 兜底关动画 */
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  return (
    <a
      className="gh-heat"
      href="https://github.com/baizhichen-web"
      target="_blank"
      rel="noreferrer"
      title="在 GitHub 查看贡献明细"
      aria-label={`在 GitHub 查看贡献明细（过去一年 ${heat.total} 次贡献）`}
    >
      <figure className="gh-heat-fig">
      <figcaption className="gh-heat-cap">
        <span className="gh-heat-label">GITHUB · 过去一年 ↗</span>
        <span className="gh-heat-meta">
          {heat.total} contributions · {heat.activeDays} 个活跃日 · {heat.from.slice(0, 7)} → {heat.to.slice(0, 7)}
        </span>
      </figcaption>
      <div className="gh-heat-scroll">
        <div className="gh-heat-inner">
          {/* 月份刻度：按每周首日所在月变化标注 */}
          <div className="gh-heat-months" aria-hidden>
            {WEEKS.map((w, wi) => {
              const m = Number(w[0]?.d.slice(5, 7) ?? 1);
              const prev = wi > 0 ? Number(WEEKS[wi - 1][0]?.d.slice(5, 7) ?? 1) : -1;
              return <span key={wi} className="gh-heat-m">{m !== prev ? MONTHS[m - 1] : ""}</span>;
            })}
          </div>
          <div className={"gh-heat-grid" + (inView ? " is-in" : "")} ref={ref} role="img"
            aria-label={`GitHub 贡献热区图：过去一年共 ${heat.total} 次贡献，${heat.activeDays} 个活跃日`}>
            {WEEKS.map((w, wi) => (
              <div className="gh-heat-col" key={wi}>
                {w.map((d, di) => (
                  <i key={d.d} className={`gh-cell l${levelOf(d.c)}`} title={`${d.d} · ${d.c} 次贡献`}
                    style={{ "--wi": wi, "--ri": di } as CSSProperties} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gh-heat-legend" aria-hidden>
        少
        <i className="gh-cell l0" /><i className="gh-cell l1" /><i className="gh-cell l2" /><i className="gh-cell l3" /><i className="gh-cell l4" />
        多
      </div>
      </figure>
    </a>
  );
}
