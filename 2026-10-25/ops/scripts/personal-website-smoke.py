# -*- coding: utf-8 -*-
"""personal-website 冒烟回归（工程票 #12，工作区侧配套）。

用法: python ops/scripts/personal-website-smoke.py [--dist <目录>] [--allowlist <json>] [--base http://127.0.0.1:4199]

对构建产物 dist 起本地静态服务，用 Playwright(Python+msedge, headless) 逐页检查：
  1) 页面可开且关键标记在场（home zh/en、contact en、article en）；
  2) console 无 error、无未捕获 pageerror；
  3) EN 模式 TreeWalker 全文 CJK 扫描（票 #1 方法的固化）——字符白名单 =
     scripts/en-cjk-allowlist.json 全部条目字符并集 + UI 层有意保留的 中/陈。
跳过加载屏：sessionStorage bs-entered=1（2026-09-20 点按进入门的旁路）。
失败退出码 1（部署脚本据此拦截推送）。"""

import argparse
import functools
import http.server
import json
import pathlib
import socketserver
import sys
import threading

ROOT = pathlib.Path(__file__).resolve().parents[2]
DIST_DEFAULT = ROOT / "studio/projects/resume-portfolio/web/dist"
ALLOWLIST_DEFAULT = ROOT / "studio/projects/resume-portfolio/web/scripts/en-cjk-allowlist.json"

CJK = __import__("re").compile(r"[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]")

# (路径, 语言, 必须出现的正文标记, 是否跑 CJK 扫描)
PAGES = [
    ("/", "en", "Chen Baizhi", True),
    ("/", "zh", "陈柏志", False),
    ("/?contact=1", "en", "XIAOHONGSHU", True),
    ("/?article=kaishi-xiezuo", "en", None, True),  # 正文懒加载分块，标记放宽为「有正文」
]

UI_ALLOW = set("中陈")  # 语言切换钮「中」/ 姓名印章「陈」（票 #1 有意保留）


def serve(dist: pathlib.Path, port: int):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(dist))
    with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
        httpd.serve_forever()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dist", type=pathlib.Path, default=DIST_DEFAULT)
    ap.add_argument("--allowlist", type=pathlib.Path, default=ALLOWLIST_DEFAULT)
    ap.add_argument("--base", default="http://127.0.0.1:4199")
    ap.add_argument("--port", type=int, default=4199)
    args = ap.parse_args()

    if not (args.dist / "index.html").exists():
        print(f"[smoke] ✗ {args.dist} 下没有 index.html")
        return 1

    allow_chars = set(UI_ALLOW)
    for e in json.loads(args.allowlist.read_text(encoding="utf-8")).get("entries", []):
        allow_chars |= {c for c in e["s"] if CJK.search(c)}

    t = threading.Thread(target=serve, args=(args.dist, args.port), daemon=True)
    t.start()

    from playwright.sync_api import sync_playwright

    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        for path, lang, marker, cjk_scan in PAGES:
            ctx = browser.new_context()
            ctx.add_init_script(
                f"sessionStorage.setItem('bs-entered','1');"
                f"localStorage.setItem('bs-lang','{lang}');"
            )
            page = ctx.new_page()
            errors = []
            page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: errors.append(str(e)))
            tag = f"{lang} {path}"
            try:
                page.goto(args.base + path, wait_until="load", timeout=30000)
                page.wait_for_timeout(3000)  # 加载屏最短时序 + 文章正文懒加载分块
                body = page.inner_text("body")
                if marker and marker not in body:
                    failures.append(f"{tag}: 标记缺失「{marker}」")
                if len(body.strip()) < 200:
                    failures.append(f"{tag}: 正文过短（{len(body.strip())} 字符），疑似没渲染")
                if errors:
                    failures.append(f"{tag}: console error ×{len(errors)} → {' | '.join(errors[:3])}")
                if cjk_scan:
                    found = page.evaluate(
                        """() => { const s = new Set(); const w = document.createTreeWalker(
                             document.body, NodeFilter.SHOW_TEXT);
                             let n; while ((n = w.nextNode())) for (const ch of n.textContent) s.add(ch);
                             return [...s]; }"""
                    )
                    bad = [c for c in found if CJK.search(c) and c not in allow_chars]
                    if bad:
                        failures.append(f"{tag}: EN 残留 CJK「{''.join(bad)}」")
                print(f"[smoke] {'✗' if any(tag in f for f in failures) else '✓'} {tag}"
                      + (f"（正文 {len(body.strip())} 字符）" if not any(tag in f for f in failures) else ""))
            except Exception as e:
                failures.append(f"{tag}: 打不开 → {e}")
                print(f"[smoke] ✗ {tag}: {e}")
            finally:
                ctx.close()
        browser.close()

    if failures:
        print(f"\n[smoke] ✗ {len(failures)} 处失败：")
        for f in failures:
            print(f"  - {f}")
        return 1
    print(f"[smoke] ✓ {len(PAGES)} 页全部通过（可开/无 console error/EN 扫描干净）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
