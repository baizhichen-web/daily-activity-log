#!/usr/bin/env python3
"""把《加德纳艺术通史》PDF（纯扫描图版，无文字层）的指定页渲染成 PNG 供阅读/查证。

用法：
    python render-gardner.py 130            # 印刷页 130 → PNG
    python render-gardner.py 125-135        # 印刷页范围
    python render-gardner.py --pdf 55       # 直接用 PDF 页号（绕开偏移量）
    python render-gardner.py 130 --dpi 200 -o out/

偏移量：PDF 页 = 印刷页 + 20（第 12 版中文译本，湖南美术出版社，实测锚定：
PDF 第 52 页页脚印「32」，即印刷页 32）。换版本/换文件时先渲染一页核对页脚。
"""
import argparse
import os
import sys

import fitz  # PyMuPDF

DEFAULT_PDF = (
    r"E:\加德纳艺术通史 (弗雷德·S. 克莱纳 克里斯廷·J. 马米亚) "
    r"(z-library.sk, 1lib.sk, z-lib.sk)\加德纳艺术通史.pdf"
)
OFFSET = 20  # PDF 页 = 印刷页 + OFFSET


def parse_pages(spec: str):
    pages = []
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            pages.extend(range(int(a), int(b) + 1))
        else:
            pages.append(int(part))
    return pages


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pages", help="印刷页，如 130 或 125-135,140（--pdf 时为 PDF 页）")
    ap.add_argument("--pdf", action="store_true", help="pages 按 PDF 页号解释")
    ap.add_argument("--dpi", type=int, default=150)
    ap.add_argument("-o", "--out", default="temp/gardner-render", help="输出目录")
    ap.add_argument("--pdf-path", default=os.environ.get("GARDNER_PDF", DEFAULT_PDF))
    args = ap.parse_args()

    doc = fitz.open(args.pdf_path)
    total = doc.page_count
    pages = parse_pages(args.pages)
    os.makedirs(args.out, exist_ok=True)

    for p in pages:
        pno = p if args.pdf else p + OFFSET
        if not (1 <= pno <= total):
            print(f"跳过：第 {p} 页超出范围（PDF 共 {total} 页）", file=sys.stderr)
            continue
        pix = doc[pno - 1].get_pixmap(dpi=args.dpi)
        out = os.path.join(args.out, f"gardner-p{p:03d}.png")
        pix.save(out)
        print(f"{out}  （印刷页 {p} = PDF 页 {pno}，{pix.width}x{pix.height}）")


if __name__ == "__main__":
    main()
