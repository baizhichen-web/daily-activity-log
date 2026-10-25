#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JD 原始资料采集脚本（小组 5 人 · 第 3 题）

用途：把企业官方招聘站公开发布的岗位描述批量落盘，作为调研附录的原始资料。
数据源：Greenhouse / Ashby 两类 ATS 的公开只读接口——各公司为聚合平台供数而开放的
      端点，非绕过反爬，无需登录。仅供课程研究引用，不二次发布。

用法：
    python scripts/fetch-jd.py --list                  # 列出当前配置的数据源
    python scripts/fetch-jd.py --source anthropic     # 采单个源
    python scripts/fetch-jd.py --all                   # 采全部源
    python scripts/fetch-jd.py --all --dry-run         # 只统计命中数不写盘
"""

import argparse
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "jd-raw"
LOG_PATH = ROOT / "meta" / "fetch-log.jsonl"

# ---------------------------------------------------------------- 数据源配置
# tier 决定它代表哪一层市场，抽样时分层统计必须按这个字段分组、报分母。
#   overseas-ats  海外 AI/科技公司的 ATS 板（量大，语料规范）
#   overseas-ats-非设计相关岗位会在相关性过滤中剔除
SOURCES = [
    {"key": "anthropic",  "name": "Anthropic",         "ats": "greenhouse", "board": "anthropic",  "tier": "overseas-ats"},
    {"key": "scaleai",    "name": "Scale AI",          "ats": "greenhouse", "board": "scaleai",    "tier": "overseas-ats"},
    {"key": "databricks", "name": "Databricks",        "ats": "greenhouse", "board": "databricks", "tier": "overseas-ats"},
    {"key": "openai",     "name": "OpenAI",            "ats": "ashby",      "board": "OpenAI",     "tier": "overseas-ats"},
    {"key": "linear",     "name": "Linear",            "ats": "ashby",      "board": "linear",     "tier": "overseas-ats"},
]

# 相关性过滤：命中任一即视为"与设计/产品/研究方向可能相关"，进入待编码池。
# 目的是把 1700 条原始数据压到几百条可读的量，不做更细的判断——那是编码环节的事。
RELEVANCE = re.compile(
    r"\b(design|designer|product|user research|ux|ui/|interaction|hardware|"
    r"forward deploy|\bfde\b|research engineer|design engineer|"
    r"human[- ]factors|service design|brand|creative)\b",
    re.I,
)

# 明显与本调研无关的部门，直接丢弃（法务/财务/HR/销售/客服等非设计教育相关职能）
# 注意用前缀匹配：Recruiter/recruiting 不会被 \brecruit\b 命中，必须写成 recruit\w*
IRRELEVANT = re.compile(
    r"\b(legal|counsel|attorney|financ\w*|accounting|accountant|recruit\w*|"
    r"people ops|hr |sales development|pharmacovigilance|warehous\w*|"
    r"clinical|supply chain)\b",
    re.I,
)

UA = "Mozilla/5.0 (research-collection; course-assignment; contact: student)"

# ---------------------------------------------------------------- HTML 转纯文本


class TextExtractor(HTMLParser):
    """把 Greenhouse/Ashby 的 HTML 正文压成保留段落结构的纯文本。"""

    BLOCK = {"p", "div", "br", "li", "ul", "ol", "tr", "h1", "h2", "h3", "h4", "section"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self._skip += 1
        elif tag in self.BLOCK:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self._skip:
            self._skip -= 1
        elif tag in self.BLOCK:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)

    def text(self):
        raw = "".join(self.parts)
        raw = re.sub(r"[ \t ]+", " ", raw)
        raw = re.sub(r"\n\s*\n\s*\n+", "\n\n", raw)
        return raw.strip()


TAG_RE = re.compile(r"</?(?:li|ul|ol|div|p|strong|em|h[1-6]|br|span|a|table|tr|td|section)\b", re.I)


def html_to_text(source: str) -> str:
    """HTML -> 纯文本。

    注意：Greenhouse 返回的 content 字段是**被 HTML 转义过的**（&lt;div&gt; 而非 <div>），
    解析器会把它整段当纯文本放过去，标签原样留在语料里污染全文。所以必须
    先反转义、再解析，必要时多轮直到标签清干净。
    """
    if not source:
        return ""
    text = source
    for _ in range(3):
        p = TextExtractor()
        try:
            p.feed(text)
            out = p.text()
        except Exception:
            out = re.sub(r"<[^>]+>", " ", text)
        out = html.unescape(out)
        if not TAG_RE.search(out):
            return out.strip()
        text = out
    return re.sub(r"\n{3,}", "\n\n", text).strip()


# ---------------------------------------------------------------- 网络请求


def get_json(url: str, timeout: int = 60, retries: int = 3):
    """拉 JSON。9MB 量级的响应偶尔会超时，重试三次并退避。"""
    last = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8", errors="replace"))
        except urllib.error.HTTPError:
            raise                                   # 4xx/5xx 重试无意义，直接抛出
        except Exception as e:
            last = e
            wait = 2 * (attempt + 1)
            print(f"    … 第 {attempt + 1} 次失败（{type(e).__name__}），{wait}s 后重试")
            time.sleep(wait)
    raise last


def build_url(src: dict) -> str:
    if src["ats"] == "greenhouse":
        return f"https://boards-api.greenhouse.io/v1/boards/{src['board']}/jobs?content=true"
    if src["ats"] == "ashby":
        return f"https://api.ashbyhq.com/posting-api/job-board/{src['board']}?includeCompensation=true"
    raise ValueError(f"未知 ATS 类型：{src['ats']}")


def normalize(src: dict, raw_jobs: list, fetched_at: str) -> list:
    """把两种 ATS 的不同字段结构拉平成统一记录。"""
    out = []
    for j in raw_jobs:
        if src["ats"] == "greenhouse":
            loc = (j.get("location") or {}).get("name", "")
            out.append({
                "id": str(j.get("id", "")),
                "title": j.get("title", ""),
                "location": loc,
                "department": (j.get("departments") or [{}])[0].get("name", ""),
                "url": j.get("absolute_url", ""),
                "updated_at": j.get("updated_at", ""),
                "published_at": j.get("first_published", ""),
                "body_html": j.get("content", "") or "",
            })
        else:  # ashby
            loc = j.get("location") or ""
            out.append({
                "id": str(j.get("id", "")),
                "title": j.get("title", ""),
                "location": loc,
                "department": j.get("team", "") or j.get("department", "") or "",
                "url": j.get("jobUrl", "") or j.get("applyUrl", ""),
                "updated_at": j.get("publishedAt", "") or "",
                "published_at": j.get("publishedAt", "") or "",
                "body_html": j.get("descriptionHtml", "") or j.get("descriptionPlain", "") or "",
            })
    for rec in out:
        rec.update({
            "source_key": src["key"],
            "source_name": src["name"],
            "ats": src["ats"],
            "tier": src["tier"],
            "fetched_at": fetched_at,
        })
    return out


# ---------------------------------------------------------------- 落盘


def slug(s: str) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s[:70] or "untitled"


def save(rec: dict, body_text: str):
    base = RAW_DIR / rec["source_key"] / f"{rec['id']}-{slug(rec['title'])}"
    base.parent.mkdir(parents=True, exist_ok=True)

    md = [
        "---",
        f"source: {rec['source_name']} ({rec['source_key']})",
        f"ats: {rec['ats']}",
        f"tier: {rec['tier']}",
        f"job_id: {rec['id']}",
        f"title: {json.dumps(rec['title'], ensure_ascii=False)}",
        f"department: {json.dumps(rec['department'], ensure_ascii=False)}",
        f"location: {json.dumps(rec['location'], ensure_ascii=False)}",
        f"url: {rec['url']}",
        f"updated_at: {rec['updated_at']}",
        f"published_at: {rec['published_at']}",
        f"fetched_at: {rec['fetched_at']}",
        "---",
        "",
        f"# {rec['title']}",
        "",
        body_text,
        "",
    ]
    base.with_suffix(".md").write_text("\n".join(md), encoding="utf-8")

    meta = {k: v for k, v in rec.items() if k != "body_html"}
    meta["raw_file"] = base.with_suffix(".md").name
    base.with_suffix(".json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def log(entry: dict):
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


# ---------------------------------------------------------------- 主流程


def collect(src: dict, dry_run: bool = False):
    fetched_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    url = build_url(src)
    print(f"\n[{src['key']}] {src['name']}  <- {url}")

    try:
        data = get_json(url)
    except urllib.error.HTTPError as e:
        print(f"  ✗ HTTP {e.code}")
        log({"ts": fetched_at, "source": src["key"], "ok": False, "error": f"HTTP {e.code}"})
        return
    except Exception as e:
        print(f"  ✗ {type(e).__name__}: {e}")
        log({"ts": fetched_at, "source": src["key"], "ok": False, "error": f"{type(e).__name__}: {e}"})
        return

    jobs = data.get("jobs", []) if isinstance(data, dict) else []
    print(f"  原始职位：{len(jobs)}")
    if not jobs:
        log({"ts": fetched_at, "source": src["key"], "ok": True, "raw": 0, "kept": 0})
        return

    recs = normalize(src, jobs, fetched_at)
    kept, dropped = [], 0
    for r in recs:
        if IRRELEVANT.search(r["title"]) or not RELEVANCE.search(r["title"]):
            dropped += 1
            continue
        kept.append(r)

    print(f"  相关命中：{len(kept)}   （按标题过滤掉 {dropped}）")

    if dry_run:
        log({"ts": fetched_at, "source": src["key"], "dry_run": True, "raw": len(jobs), "kept": len(kept)})
        return

    n = 0
    for r in kept:
        text = html_to_text(r["body_html"])
        if len(text) < 200:      # 正文过短，多半是接口没给 content，不入库以免污染样本
            continue
        r["body_text"] = text
        save(r, text)
        n += 1
        time.sleep(0.05)        # 轻限速，别把人家接口打疼

    print(f"  已落盘：{n} 条 -> {RAW_DIR / src['key']}")
    log({"ts": fetched_at, "source": src["key"], "ok": True, "raw": len(jobs),
         "kept": len(kept), "saved": n, "url": url})


def main():
    ap = argparse.ArgumentParser(description="JD 原始资料批量采集")
    ap.add_argument("--source", help="单个源 key，用 --list 查看")
    ap.add_argument("--all", action="store_true", help="采集全部源")
    ap.add_argument("--list", action="store_true", help="列出数据源")
    ap.add_argument("--dry-run", action="store_true", help="只统计不写盘")
    args = ap.parse_args()

    if args.list:
        print(f"{'key':<12}{'公司':<14}{'ATS':<12}{'层次'}")
        for s in SOURCES:
            print(f"{s['key']:<12}{s['name']:<14}{s['ats']:<12}{s['tier']}")
        return

    targets = SOURCES if args.all else [s for s in SOURCES if s["key"] == args.source]
    if not targets:
        print("没有匹配的源，用 --list 查看可选项", file=sys.stderr)
        sys.exit(1)

    for s in targets:
        collect(s, dry_run=args.dry_run)
    print("\n完成。采集日志：", LOG_PATH)


if __name__ == "__main__":
    main()
