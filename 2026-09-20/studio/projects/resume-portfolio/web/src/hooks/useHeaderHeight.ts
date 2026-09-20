import { useLayoutEffect } from "react";

/* 头栏是 fixed 的：海报墙顶距、页码指示器、正文顶距、桌面目录全都按它避让，
   此前各处写死 56px（一行页眉的高度）。窄屏页眉会折行（姓名 + 定位语两行），
   高度随视口/语言变化 → 实测后写进 --header-h，消费端一律 calc(var(--header-h) + …)。
   三个页面（首页 / 项目文章页 / 联系页）共用一份观测，模块级去重。 */
let installed = false;

export function useHeaderHeight() {
  useLayoutEffect(() => {
    if (installed) return;
    const header = document.querySelector(".fb-header");
    if (!header) return;
    const root = document.documentElement;
    const apply = () => root.style.setProperty("--header-h", `${Math.round(header.getBoundingClientRect().height)}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    installed = true;
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      installed = false;
    };
  }, []);
}
