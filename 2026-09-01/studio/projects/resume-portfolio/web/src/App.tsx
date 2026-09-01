import { useEffect, useState } from "react";
import { FlipbookDemo } from "./demo/FlipbookDemo";
import { FlipbookDemo2 } from "./demo/FlipbookDemo2";
import { Loader } from "./components/Loader";
import { Hero } from "./components/Hero";
import { GhostCarousel } from "./components/GhostCarousel";
import { EvidenceBoard } from "./components/EvidenceBoard";
import { ProofSection } from "./components/ProofSection";
import { StatsBand } from "./components/StatsBand";
import { VoiceSlots } from "./components/VoiceSlots";
import { ListSection } from "./components/ListSection";
import { Footer } from "./components/Footer";
import { MenuOverlay } from "./components/MenuOverlay";
import { initLenis } from "./lib/lenis";
import { SITE } from "./data/site";

/**
 * 落地页 + 详情同页（2026-08-25 白纸拍板）：
 * Baseline 骨架（Loader/Hero/幽灵词轮播/编号行/数据带/评语位）
 * × 我们的内容与基因库；简历细节（写作/经历/教育）保留在同页下方。
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  /* MVP 主形态=翻页书：无 hash 或 #demo 都进；#demo2=对比稿；其他=落地页（已淘汰，仅调试留） */
  if (hash === "#demo2") return <FlipbookDemo2 />;
  return <FlipbookDemo />;


  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Loader onReady={() => { initLenis(); setReady(true); }} />
      <Hero ready={ready} onOpenMenu={() => setMenuOpen(true)} />
      <GhostCarousel />
      <EvidenceBoard />
      <ProofSection />
      <StatsBand />
      <VoiceSlots />
      <ListSection data={SITE.writing} />
      <ListSection data={SITE.work} />
      <ListSection data={SITE.education} />
      <Footer />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
