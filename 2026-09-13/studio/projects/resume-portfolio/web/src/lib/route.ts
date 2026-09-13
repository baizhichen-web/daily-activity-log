/* 站内轻路由（2026-09-13 pilot）：项目页 = 查询参数 ?project=<slug>。
   选查询参数而非路径路由：静态托管零配置（无需 redirect 规则），Astro 迁移时整体替换。
   pushState + app:route 自定义事件驱动 React 换页；浏览器前进/后退由 popstate 同步。 */

export const ROUTE_EVENT = "app:route";

export function readProjectSlug(): string | null {
  return new URLSearchParams(window.location.search).get("project");
}

/* 离散状态切换的全页过渡：View Transition cross-fade；旧内核降级直接切换
   （与 FlipbookDemo 内同款手法，暂不抽公共件——简历页正处白纸验收期，不动它） */
export const withViewTransition = (fn: () => void) => {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (typeof doc.startViewTransition === "function") doc.startViewTransition(fn);
  else fn();
};

export function navigateProject(slug: string | null) {
  withViewTransition(() => {
    history.pushState(null, "", slug ? `?project=${encodeURIComponent(slug)}` : window.location.pathname);
    window.dispatchEvent(new Event(ROUTE_EVENT));
  });
}
