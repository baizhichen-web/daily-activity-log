#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JD 样本索引构建器

职责：把 data/jd-raw/ 下散落的单条 JD 汇成一张 jd-index.csv，后续所有抽样、
编码、统计都从这张表出发。**不在这里做任何能力判断**——那是 codebook 的事。

最关键的一件事是去重：同一个岗位常在多个城市重复发布（实测 340 条里 95 条
属于这种情况，占 28%）。不去重的话，"影视传媒 FDE"会因为挂了 14 个城市而
挤进最热门岗位榜，结论直接作废。

用法：
    python scripts/analyze-jd.py --build          # 构建/重建 jd-index.csv
    python scripts/analyze-jd.py --build --stats  # 顺带打印去重前后的构成
"""

import argparse
import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "jd-raw"
INDEX = ROOT / "meta" / "jd-index.csv"

# ---------------------------------------------------------------- 岗位族分类
# 顺序敏感：靠前的规则先命中。设计工程（Design Engineer）与硬件设计要排在
# 单纯的"design" 之前，否则会被 Product Designer 误吞。
FAMILY_RULES = [
    ("前线部署",      r"forward[\s-]?deploy|\bFDE\b|前线部署|前沿部署|前置部署"),
    ("设计工程",      r"design engineer|designer? engineer|设计工程"),
    ("用户研究",      r"user research|ux research|design research|用户研究|调研"),
    ("产品设计/交互", r"product designer|product design|ux designer|interaction designer|"
                     r"视觉设计|visual designer|brand designer|内容设计|"
                     r"产品设计|交互设计|体验设计"),
    ("产品经理",      r"product manager|product management|产品经理|产品负责人|"
                     r"产品实习|产品助理|产品专员|AI ?产品|产品定义|产品创新|产品研究|产品运营"),
    ("硬件/机构设计", r"hardware|mechanical|actuator|motor|prototype|prototype|"
                     r"physical design|cad|结构|机构|机电"),
    ("AI治理/政策/安全", r"policy design|policy|safeguard|alignment|trust|responsible ai|"
                        r"安全|治理|合规"),
    ("研究工程",      r"research engineer|research scientist|researcher"),
]

# 行业垂直：FDE 类岗位普遍按行业分垂类，这是需求结构的直接证据
VERTICAL_RULES = [
    ("制造/工业",   r"manufactur|industrial|robot|hardware supply|factory"),
    ("医疗/生命科学", r"health|life science|clinical|biotech|pharma"),
    ("金融",       r"financ|bank|trading|risk|保险|支付|payments"),
    ("零售/电商",   r"retail|e-?commerce|consumer goods"),
    ("公共部门/政务", r"public sector|government|federal|defense|national security|政务"),
    ("通信/媒体/娱乐", r"communications|media|entertainment|games|cme|创意"),
    ("教育",       r"education|learning|学校|教育"),
]

# 经验层级：供分层抽样用。
# 两个坑：
#   1) 裸 intern 会命中 internal / international / internal mobility，而福利条款里
#      到处是 internal——实测把大量正式岗误判成实习岗，必须加词边界。
#   2) 只看标题不够（很多 JD 标题不带 seniority），退回正文前 4000 字粗判，
#      但正文里的福利条款噪声大，所以先判标题再判正文。
SENIORITY_RULES = [
    ("实习/校招", r"\b(intern|interns|internship|graduate|new[\s-]?grad)\b|校园|应届|实习"),
    ("0-2年",    r"\b(junior|entry[\s-]?level|associate)\b|初级"),
    ("3-5年",    r"\b(senior|sr\.?|mid[\s-]?level)\b"),
    ("5年+",     r"\b(staff|principal|lead|head[\s-]of|director|vp|chief|architect|资深|负责人)\b"),
]


def classify(rules, text):
    """无命中返回"其他"。"""
    for label, pat in rules:
        if re.search(pat, text, re.I):
            return label
    return "其他"


def classify_opt(rules, text):
    """无命中返回 None——用于"标题优先、正文兜底"这种两级回退。"""
    for label, pat in rules:
        if re.search(pat, text, re.I):
            return label
    return None


# 正文里明确写出的年限要求。比关键词可靠得多——"Leadership" 这类词在福利条款里
# 到处都是，但 "5+ years of experience" 是硬信息。
YEARS_RE = re.compile(
    r"(\d+)\s*\+?\s*(?:-\s*\d+\s*)?(?:to\s*\d+\s*)?years?\s+(?:of\s+)?"
    r"(?:professional\s+|industry\s+|relevant\s+|hands[- ]on\s+|working\s+)?experience",
    re.I,
)


def guess_seniority(title: str, body: str) -> str:
    """经验层级三级判定：标题关键词 → 正文明确年限 → 未标注。

    刻意不拿正文做关键词兜底。实测那样会把大量正式岗误判成 senior/staff
    （福利条款里 leadership / lead the team 之类到处都是）。宁可标"未标注"，
    也不能在分层抽样时用一个错的分层变量——这违反 AGENTS.md 里
    "区分'确认没有'与'没查到'"的纪律。
    """
    hit = classify_opt(SENIORITY_RULES, title)
    if hit:
        return hit

    years = [int(n) for n in YEARS_RE.findall(body)]
    if years:
        lo = min(years)
        if lo <= 2:
            return "0-2年"
        if lo <= 5:
            return "3-5年"
        return "5年+"

    return "未标注"


def norm_title(t: str) -> str:
    """去重键：抹掉地点、编号、尾部空格差异。"""
    t = re.sub(r"\s*[-–—]\s*(sf|seattle|nyc|new york|remot\w*|us|usa|emea|apac).*$", "", t, flags=re.I)
    t = re.sub(r"\s*\(\s*(remote|hybrid|onsite)[^)]*\)", "", t, flags=re.I)
    t = re.sub(r"\s+", " ", t).strip().lower()
    return t


def load():
    rows = []
    for meta in sorted(RAW_DIR.glob("*/*.json")):
        try:
            d = json.loads(meta.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"  ! 跳过无法解析的 {meta.name}: {e}")
            continue

        body_md = meta.with_suffix(".md")
        body = body_md.read_text(encoding="utf-8") if body_md.exists() else ""
        # 只用标题做粗判，正文留给后面的结构化拆解步骤
        haystack = d.get("title", "")

        rows.append({
            "source_key": d.get("source_key", ""),
            "source_name": d.get("source_name", ""),
            "tier": d.get("tier", ""),
            "job_id": d.get("id", ""),
            "title": d.get("title", ""),
            "department": d.get("department", ""),
            "location": d.get("location", ""),
            "url": d.get("url", ""),
            "updated_at": (d.get("updated_at", "") or "")[:10],
            "fetched_at": (d.get("fetched_at", "") or "")[:10],
            "raw_file": str(body_md.relative_to(ROOT)).replace("\\", "/"),
            "family": classify(FAMILY_RULES, haystack),
            "vertical": classify(VERTICAL_RULES, haystack),
            "seniority": guess_seniority(d.get("title", ""), body),
            "body_chars": len(body),
            "_dupkey": norm_title(d.get("title", "")),
            "_locations": "",
        })

    # 去重分组：同一公司 + 归一化标题 = 同一个招聘需求
    groups = defaultdict(list)
    for r in rows:
        # 去重键必须用「公司」而非「层级」：source_key 在 manual-* 层是层级名（manual-ai），
        # 用它会把同层级下不同公司的同名岗位误并成一条（2026-10-04 白纸拍板修复）。
        groups[(r["source_name"] or r["source_key"], r["_dupkey"])].append(r)

    for key, grp in groups.items():
        if len(grp) == 1:
            g = grp[0]
            g["_locations"] = g["location"]
            g["dup_group"] = ""
            g["dup_count"] = "1"
            g["is_primary"] = "1"
            continue

        locs = sorted({g["location"] for g in grp if g["location"]})
        gid = f"{key[0]}::{key[1][:50]}"
        newest = max(grp, key=lambda x: x["updated_at"])
        for g in grp:
            g["_locations"] = "; ".join(locs)
            g["dup_group"] = gid
            g["dup_count"] = str(len(grp))
            # 同组内取 updated_at 最新的一条为代表
            g["is_primary"] = "1" if g is newest else "0"

    for r in rows:
        r.pop("_dupkey", None)
    return rows


FIELDS = ["source_key", "source_name", "tier", "job_id", "title", "department", "location",
          "family", "vertical", "seniority", "updated_at", "fetched_at", "dup_group",
          "dup_count", "is_primary", "body_chars", "url", "raw_file"]


def build():
    rows = load()
    if not rows:
        print("没有找到任何 JD，先跑 fetch-jd.py")
        return

    INDEX.parent.mkdir(parents=True, exist_ok=True)
    with INDEX.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)

    primary = [r for r in rows if r["is_primary"] == "1"]
    overseas = [r for r in primary if r["tier"] == "overseas-ats"]
    domestic = [r for r in primary if r["tier"].startswith("manual")]
    print(f"写入 {len(rows)} 行 -> {INDEX.relative_to(ROOT)}")
    print(f"  A 原始文件数（含同岗多地重复）        : {len(rows)}")
    print(f"  B 独立招聘需求 · 全量（= is_primary） : {len(primary)}")
    print(f"  C 独立招聘需求 · 海外层 overseas-ats  : {len(overseas)}")
    print(f"  D 独立招聘需求 · 国内层 manual-*      : {len(domestic)}")
    print(f"  （B = C + D；被并入重复组的非代表件 = {len(rows) - len(primary)}）")
    return rows


def stats(rows):
    primary = [r for r in rows if r["is_primary"] == "1"]
    overseas = [r for r in primary if r["tier"] == "overseas-ats"]
    domestic = [r for r in primary if r["tier"].startswith("manual")]
    print("\n=== 三个分母（引用任何频次前必须先声明用哪个）===")
    print(f"    A 原始文件数（含同岗多地重复）        : {len(rows)}")
    print(f"    B 独立招聘需求 · 全量（= is_primary） : {len(primary)}")
    print(f"    C 独立招聘需求 · 海外层 overseas-ats  : {len(overseas)}")
    print(f"    D 独立招聘需求 · 国内层 manual-*      : {len(domestic)}")
    print("    说明：B = C + D。项目文档里长期被引用的「268」= C（海外层），不是 B；")
    print("         引用时须写明层级，否则会把海外数据当全量。参见 拍板记录.md。")

    print("\n=== 构成 · 按 B（全量独立需求，推荐频次口径）===")
    for label, key in [("岗位族", "family"), ("行业垂直", "vertical")]:
        print(f"\n  {label}：")
        for k, v in Counter(r[key] for r in primary).most_common():
            print(f"    {k:<22}{v}")

    print("\n=== 对照 · 按 A（原始文件数，会被多地发布放大，仅作对照）===")
    for label, key in [("岗位族", "family")]:
        print(f"\n  {label}：")
        for k, v in Counter(r[key] for r in rows).most_common():
            print(f"    {k:<22}{v}")

    print("\n  按来源：")
    for k, v in Counter(r["source_key"] for r in primary).most_common():
        print(f"    {k:<22}{v}")
    print("\n  按经验层级：")
    for k, v in Counter(r["seniority"] for r in primary).most_common():
        print(f"    {k:<22}{v}")


def main():
    ap = argparse.ArgumentParser(description="JD 样本索引构建")
    ap.add_argument("--build", action="store_true", help="构建 jd-index.csv")
    ap.add_argument("--stats", action="store_true", help="打印去重前后构成对比")
    args = ap.parse_args()
    if not args.build:
        ap.print_help()
        return
    rows = build()
    if rows and args.stats:
        stats(rows)


if __name__ == "__main__":
    main()
