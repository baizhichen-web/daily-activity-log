import "../styles/calligraphy.css";

/* ============================================================
   书画封面 · 2026-09-13 立；09-14 按白纸 Figma 稿（节点 182:2 / 184:36）收敛
   两种呈现：
   ① 有 zoomImage（白纸已按目标画框排好两处蒙版）→ 交叉淡入：
      收起=整幅宽裁（如《祭姪文稿》正文横带）→ 展开=局部竖裁（约 2 列）
   ② 只有 image → 单图 + scale/transform-origin 变焦（focus 落点）
   无图 → 占位块整幅铺满（形制同真图，内容待补）。
   ⚠️ 图片一律 object-fit: cover——裁切窗口已由白纸在 Figma 定好，不再二次取景。
   ============================================================ */

type Props = {
  image?: string;
  /** 取景窗（源图百分比：左,上,右,下）——白纸 Figma 排的收起/展开两处蒙版 */
  cropFrom?: string;
  cropTo?: string;
  zoomImage?: string;
  focus?: string;
  chars?: string; // 文眼字（占位标注用）
  pr: number; // 0..1 展开进度（文章页取 1）
};

function parseCrop(s?: string): [number, number, number, number] | null {
  if (!s) return null;
  const parts = s.split(",").map((v) => Number(v.trim()));
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  return [parts[0], parts[1], parts[2], parts[3]];
}

function Placeholder({ chars }: { chars?: string }) {
  return (
    <div className="cl-ph">
      <span className="cl-ph-label">书法图 · 待补{chars ? `（${chars}）` : ""}</span>
    </div>
  );
}

export function CalligraphyArt({ image, cropFrom, cropTo, zoomImage, focus = "50% 50%", chars, pr }: Props) {
  /* ① 取景窗插值（白纸 Figma 190:8/190:9 稿）：收起=整幅 → 展开=局部，逐帧连续放大，
        无交叉淡化（此前两张图硬切被白纸判为割裂）；窗口比例/位置全由 fill 变换换算而来 */
  const from = parseCrop(cropFrom);
  const to = parseCrop(cropTo);
  if (image && from && to) {
    const k = Math.max(0, Math.min(1, pr));
    const L = (from[0] + (to[0] - from[0]) * k) / 100;
    const T = (from[1] + (to[1] - from[1]) * k) / 100;
    const R = (from[2] + (to[2] - from[2]) * k) / 100;
    const B = (from[3] + (to[3] - from[3]) * k) / 100;
    const w = Math.max(R - L, 0.001);
    const h = Math.max(B - T, 0.001);
    return (
      <div className="cl" aria-hidden>
        <img
          className="cl-img cl-img--win"
          src={image}
          alt=""
          style={{
            width: `${(100 / w).toFixed(3)}%`,
            height: `${(100 / h).toFixed(3)}%`,
            left: `${((-L / w) * 100).toFixed(3)}%`,
            top: `${((-T / h) * 100).toFixed(3)}%`,
          }}
        />
      </div>
    );
  }
  /* ② 双裁切换（旧法，保留兼容）：宽裁淡出、局部淡入 */
  if (zoomImage) {
    return (
      <div className="cl" aria-hidden>
        <div className="cl-frame" style={{ opacity: 1 - pr }}>
          {image ? <img className="cl-img" src={image} alt="" /> : <Placeholder chars={chars} />}
        </div>
        <div className="cl-frame" style={{ opacity: pr }}>
          <img className="cl-img" src={zoomImage} alt="" loading="lazy" />
        </div>
      </div>
    );
  }
  /* ② 单图变焦 */
  const s = image ? 2.2 : 1.12;
  const scale = 1 + pr * (s - 1);
  return (
    <div className="cl" aria-hidden>
      <div
        className={"cl-frame" + (image ? " has-image" : " is-ph")}
        style={{ transform: `scale(${scale.toFixed(3)})`, transformOrigin: focus }}
      >
        {image ? <img className="cl-img" src={image} alt="" loading="lazy" /> : <Placeholder chars={chars} />}
      </div>
    </div>
  );
}
