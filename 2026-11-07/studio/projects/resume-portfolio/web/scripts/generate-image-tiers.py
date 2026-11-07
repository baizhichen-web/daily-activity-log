# -*- coding: utf-8 -*-
"""封面图多档位生成（issue #21）—— 收起态渐进加载的图片档位由本脚本产出。

背景：四篇博文封面原图 4000–5000px（1.1–1.8MB）。手机端加载优化（job-search 票 2）
引入 1280px「海报版」（-poster.webp）做收起态；issue #21 发现桌面全幅画框拉伸小图发糊，
增设 2560px「桌面档」（-hd.webp），前端按 innerWidth×DPR 选档。

用法: python scripts/generate-image-tiers.py [--force]
  扫描 public/media/ 递归下所有 .webp 原图（长边 ≥2000px 才处理，文章插图 1400px 级自动跳过），
  为每张生成同目录 -poster.webp（长边 1280）与 -hd.webp（长边 2560），quality=75。
  幂等：目标已存在且不比源旧则跳过；--force 强制重生成。
  生成是手动步骤（图片是入库的静态资产），不挂 prebuild——重导原图后跑一次即可。"""

import argparse
import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media"
TIERS = {"-poster.webp": 1280, "-hd.webp": 2560}
MIN_LONG_EDGE = 2000  # 原图宽低于此值不生成档位（插图画幅级，直接用原图）


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="目标已存在也重新生成")
    args = ap.parse_args()

    if not MEDIA.exists():
        print(f"[tiers] ✗ 找不到 {MEDIA}")
        return 1

    made = skipped = 0
    for src in sorted(MEDIA.rglob("*.webp")):
        if "-poster" in src.stem or "-hd" in src.stem:
            continue  # 压缩档本身不是源
        with Image.open(src) as im:
            # 只处理横版大图（宽 ≥2000）＝博文书法封面——渐进加载机制只挂在封面收起态；
            # 竖长插图（长边 2844 级）不在机制内，生成了无消费方，不产死资产
            if im.width < MIN_LONG_EDGE or im.width <= im.height:
                continue
            for suffix, edge in TIERS.items():
                dst = src.with_name(src.stem + suffix)
                if not args.force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
                    skipped += 1
                    continue
                with Image.open(src) as im2:
                    scale = edge / long_edge(im2)
                    size = (round(im2.width * scale), round(im2.height * scale))
                    out = im2.resize(size, Image.LANCZOS)
                    out.save(dst, "WEBP", quality=75, method=6)
                print(f"[tiers] ✓ {dst.relative_to(ROOT)}  {size[0]}x{size[1]}  {dst.stat().st_size // 1024}KB")
                made += 1

    print(f"[tiers] 完成：生成 {made} 个，跳过（已最新）{skipped} 个")
    return 0


if __name__ == "__main__":
    sys.exit(main())
