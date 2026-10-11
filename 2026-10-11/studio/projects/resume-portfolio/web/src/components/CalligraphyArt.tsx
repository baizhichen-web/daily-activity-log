import { useEffect, useState } from "react";
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
  /** 画框当前比例（宽/高，随动画插值传入）。给了它，取景窗就始终精确贴合画框——
      动画=一次干净的推轨（不裁不挤）；不给则按窗口自身比例贴合 */
  frameAspect?: number;
  zoomImage?: string;
  focus?: string;
  chars?: string; // 文眼字（占位标注用）
  /** 联合图宽高比（源图 宽/高）——窗口贴合画框时用来推宽度 */
  imgAspect?: number;
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

export function CalligraphyArt({ image, cropFrom, cropTo, frameAspect, imgAspect, zoomImage, focus = "50% 50%", chars, pr, posterImage }: Props & { posterImage?: string }) {
  /* 移动端加载优化（job-search 票2）：收起态先显示海报版小图（-poster.webp，1280px），
     用户一开始展开（pr>0.02）才按需加载全分辨率原图，加载完无缝切换——书法放大细节不丢。 */
  const [hiReady, setHiReady] = useState(false);
  const needHi = pr > 0.02 && !!image;
  useEffect(() => {
    if (!needHi || hiReady) return;
    const im = new Image();
    im.onload = () => setHiReady(true);
    im.src = image as string;
  }, [needHi, hiReady, image]);
  const showImage = hiReady ? image : (posterImage || image);
  /* ① 取景窗插值（白纸 Figma 190:8/190:9 稿）：收起=整幅 → 展开=局部，逐帧连续推轨，
        无交叉淡化（两张图硬切被白纸判为割裂）；画框比例给定时窗口恒贴合画框=单镜头推轨 */
  const from = parseCrop(cropFrom);
  const to = parseCrop(cropTo);
  if (image && from && to) {
    /* 缓动只保留一处：pr 本身已随站内统一缓动（easeOutCubic）推进，
       再叠 smoothstep 会让推轨前半冲太快、尾巴发粘（2026-09-14 实测判断） */
    const k = Math.max(0, Math.min(1, pr));
    const cfx = (from[0] + from[2]) / 200, cfy = (from[1] + from[3]) / 200;
    const ctx = (to[0] + to[2]) / 200, cty = (to[1] + to[3]) / 200;
    let L = (from[0] + (to[0] - from[0]) * k) / 100;
    let T = (from[1] + (to[1] - from[1]) * k) / 100;
    let R = (from[2] + (to[2] - from[2]) * k) / 100;
    let B = (from[3] + (to[3] - from[3]) * k) / 100;
    /* 画框比例已知：窗口高度按两个取景窗插值，宽度随之推导 = 画框比例
       （窗口宽高比恒等于画框宽高比 → cover 全程不裁不缩，只剩一次推轨+平移） */
    if (frameAspect && frameAspect > 0.05) {
      const imgA = imgAspect || 0;
      if (imgA) {
        const H = ((from[3] - from[1]) + ((to[3] - to[1]) - (from[3] - from[1])) * k) / 100;
        const Wf = Math.min(1, (H * frameAspect) / imgA);
        const cx = cfx + (ctx - cfx) * k, cy = cfy + (cty - cfy) * k;
        L = Math.max(0, Math.min(1 - Wf, cx - Wf / 2));
        T = Math.max(0, Math.min(1 - H, cy - H / 2));
        R = L + Wf;
        B = T + H;
      }
    }
    const w = Math.max(R - L, 0.001);
    const h = Math.max(B - T, 0.001);
    return (
      <div className="cl" aria-hidden>
        <img
          className="cl-img cl-img--win"
          src={showImage}
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
          {image ? <img className="cl-img" src={showImage} alt="" /> : <Placeholder chars={chars} />}
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
        {image ? <img className="cl-img" src={showImage} alt="" loading="lazy" /> : <Placeholder chars={chars} />}
      </div>
    </div>
  );
}
