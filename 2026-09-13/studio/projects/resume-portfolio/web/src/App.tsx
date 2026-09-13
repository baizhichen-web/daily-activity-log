import { useEffect, useState } from "react";
import { FlipbookDemo } from "./demo/FlipbookDemo";
import { FlipbookDemo2 } from "./demo/FlipbookDemo2";
import { ProjectPage } from "./pages/ProjectPage";
import { readProjectSlug, ROUTE_EVENT } from "./lib/route";

/**
 * MVP 主形态=翻页书（2026-08-25 白纸拍板，09-01 Templates v2 定稿）：
 * 无 hash 或 #demo 进 FlipbookDemo（首页 v1 定版）；#demo2=散文双栏对比稿（可复活）。
 * 项目页（2026-09-13 pilot）：?project=<slug> 进博文式详情页
 * （内容源 content/projects/*.yml，与 Decap 后台、llms.txt 生成器三方同源）。
 * 旧落地页骨架（Loader/Hero/幽灵词轮播等）已随翻页书定版退役，原文见 git log。
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [project, setProject] = useState<string | null>(() => readProjectSlug());
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    const onRoute = () => setProject(readProjectSlug());
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onRoute);
    window.addEventListener(ROUTE_EVENT, onRoute);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onRoute);
      window.removeEventListener(ROUTE_EVENT, onRoute);
    };
  }, []);
  if (project) return <ProjectPage slug={project} />;
  if (hash === "#demo2") return <FlipbookDemo2 />;
  return <FlipbookDemo />;
}
