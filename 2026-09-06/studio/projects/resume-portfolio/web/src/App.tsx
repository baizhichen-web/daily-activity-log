import { useEffect, useState } from "react";
import { FlipbookDemo } from "./demo/FlipbookDemo";
import { FlipbookDemo2 } from "./demo/FlipbookDemo2";

/**
 * MVP 主形态=翻页书（2026-08-25 白纸拍板，09-01 Templates v2 定稿）：
 * 无 hash 或 #demo 进 FlipbookDemo（首页 v1 定版）；#demo2=散文双栏对比稿（可复活）。
 * 旧落地页骨架（Loader/Hero/幽灵词轮播等）已随翻页书定版退役，原文见 git log。
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (hash === "#demo2") return <FlipbookDemo2 />;
  return <FlipbookDemo />;
}
