#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
能力项编码的分层抽样器

从 268 条去重后的编码池里，按岗位族分层抽出目标条数（默认 40），
把每条的「职责 + 要求 + 加分」段压成摘要，写到 meta/code-digest.txt 供语义编码读。

不做任何判断——判断发生在读摘要的人（或模型）那里。

用法：python scripts/sample-jd.py
"""

import csv
import random
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "meta" / "jd-index.csv"
DIGEST = ROOT / "meta" / "code-digest.txt"

N_PER_FAMILY = {
    "其他": 8, "产品经理": 8, "研究工程": 6, "前线部署": 8,
    "硬件/机构设计": 4, "产品设计/交互": 4, "AI治理/政策/安全": 2, "设计工程": 2,
}
CHARS_PER_JD = 1800

SECTION_RE = re.compile(
    r"^(responsibilit|what you.ll do|about the role|impact you will have|"
    r"minimum qualif|qualifications|requirements|you may be a good fit|"
    r"you might thrive|basic qualifications|preferred qualif|nice to have|bonus|"
    r"strong candidates may|it.s a plus)",
    re.I | re.M,
)


def digest_body(body: str) -> str:
    """去掉 frontmatter 和薪资/福利尾巴，只留职责+要求段。"""
    body = re.sub(r"\A---.*?---\s*", "", body, flags=re.S)
    m = SECTION_RE.search(body)
    if m:
        body = body[m.start():]
    # 薪资/福利之后的内容对编码无用，截掉
    cut = re.search(r"^(logistics|compensation|salary|about .{0,30}company|benefits)",
                    body, re.I | re.M)
    if cut:
        body = body[:cut.start()]
    return re.sub(r"\n{3,}", "\n\n", body).strip()[:CHARS_PER_JD]


def main():
    rows = [r for r in csv.DictReader(INDEX.open(encoding="utf-8-sig"))
            if r["is_primary"] == "1"]

    by_fam = defaultdict(list)
    for r in rows:
        by_fam[r["family"]].append(r)

    random.seed(42)
    picked = []
    for fam, n in N_PER_FAMILY.items():
        pool = sorted(by_fam.get(fam, []), key=lambda r: r["source_key"])
        # 轮转取，保证每条内来源尽量分散
        take = pool[:: max(1, len(pool) // n)][:n] if len(pool) > n else pool
        picked.extend(take)

    lines = []
    for r in picked:
        p = ROOT / r["raw_file"]
        body = p.read_text(encoding="utf-8") if p.exists() else ""
        lines.append(
            f"\n{'='*90}\n"
            f"JOB {r['source_key']}/{r['job_id']}  [{r['family']}|{r['seniority']}]  "
            f"{r['title']}\n{'-'*90}\n"
            f"{digest_body(body)}\n"
        )

    DIGEST.write_text("".join(lines), encoding="utf-8")
    print(f"抽样 {len(picked)} 条 -> {DIGEST.relative_to(ROOT)}  "
          f"({DIGEST.stat().st_size//1024} KB)")
    for fam in N_PER_FAMILY:
        got = sum(1 for r in picked if r["family"] == fam)
        print(f"  {fam:<18}{got}/{N_PER_FAMILY[fam]}")


if __name__ == "__main__":
    main()
