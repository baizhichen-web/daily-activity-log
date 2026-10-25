#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JD 结构化拆解器

把 JD 正文切成区块（职责 / 最低资历 / 加分 / 门槛），并抽出四个"机械字段"：
    edu_major   专业门槛三档  ← 直接回答"设计专业学生能不能进"
    edu_level   学历要求
    years       经验年限
    tools       技术栈

**这四栏用正则抽，不需要语义判断**，所以能对全量 268 条无脑跑。
能力项编码是另一回事（要读懂全文），见 meta/codebook.md，那个只做抽样。

用法：
    python scripts/parse-jd.py                # 全量拆解，写 data/parsed.jsonl
    python scripts/parse-jd.py --stats        # 顺带打印门槛三档分布
    python scripts/parse-jd.py --only C:\path # 调试单条
"""

import argparse
import csv
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "jd-raw"
INDEX = ROOT / "meta" / "jd-index.csv"
OUT = ROOT / "meta" / "parsed.jsonl"

# ---------------------------------------------------------------- 区块切分

# Greenhouse / Ashby 的标准区块标题。各家措辞不完全一样，所以每个概念给一组别名。
SECTIONS = {
    "responsibilities": r"responsibilit|what you.ll do|about the role|impact you will have|"
                        r"the role|岗位职责|工作内容|职位描述|你将",
    "required": r"minimum qualif|qualifications|requirements|you may be a good fit|"
                r"you might thrive|basic qualifications|任职要求|岗位要求|我们希望|我们期待",
    "preferred": r"preferred qualif|nice to have|bonus|plus|strong candidates may|"
                 r"it.s a plus|加分项|优先考虑",
    "logistics": r"\blogistics\b|compensation|salary|annual salary|about the company|"
                 r"benefits|薪资|待遇",
}

SECTION_RE = re.compile(
    "^(?:" + "|".join(f"(?P<{k}>{v})" for k, v in SECTIONS.items()) + r")\s*$",
    re.I | re.M,
)


def split_sections(body: str) -> dict:
    """按标题行把正文切成区块。切不出来就整篇塞进 responsibilities。"""
    marks = [(m.start(), m.lastgroup) for m in SECTION_RE.finditer(body)]
    out = {}
    for i, (pos, name) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(body)
        out.setdefault(name, "")
        out[name] += body[pos:end]
    if not out:
        out["responsibilities"] = body
    return out


# ---------------------------------------------------------------- 门槛字段

# Anthropic/OpenAI 的 Logistics 区块是机器可读的，优先从那里取值
RE_EDU_LEVEL = re.compile(
    r"minimum education\s*:\s*([^\n]+)|"
    r"required field of study\s*:\s*([^\n]+)|"
    r"minimum years of experience\s*:\s*([^\n]+)",
    re.I,
)

RE_YEARS = re.compile(
    r"(\d+)\s*(?:-|–|to)\s*(\d+)\s*\+?\s*(?:years?|yrs?)"
    r"|(\d+)\s*\+\s*(?:years?|yrs?)"
    r"|至少\s*(\d+)\s*年"
    r"|(\d+)\s*年以上",
    re.I,
)

# 专业门槛三档的判据（codebook §4）。中英文都要认——国内 JD 全是中文，
# 第一版只写英文模式，结果腾讯那条"计算机/AI/数学/物理等工程相关专业"
# 被判成"提及但不定向"而不是 hard，等于国内 JD 全部漏判。
#   open  不写专业，或写"与岗位相关，以课程/培训/经历自证"
#   soft  列举了专业但用"等/相关/优先"兜底
#   hard  逐一列举且无兜底
# open 分强弱两档。强 open = 明说"不写专业/以经历自证"，可以直接判。
# 弱 open = 中文里常见的"XX等相关专业优先考虑"——它跟"完全不写"不是一回事，
# 得先看有没有列举具体专业，所以放在列举判断之后。
RE_MAJOR_OPEN_STRONG = re.compile(
    r"field of study\s*:\s*a field relevant|"
    r"or an equivalent combination of education,? training,? and|"
    r"or equivalent combination|"
    r"as demonstrated through coursework,? training,? or professional experience|"
    r"(?:any|no)[^.\n]{0,30}(?:major|discipline|field of study)|"
    r"不限专业|专业不限|不强限|强限专业|专业不强限|"
    r"any (?:field|discipline|major)|regardless of (?:major|background)",
    re.I,
)
RE_MAJOR_OPEN_WEAK = re.compile(
    r"相关专业(?:背景)?(?:优先|均可|皆可)|(?:优先考虑)?相关专业|"
    r"major(?:s)?[^.\n]{0,40}(?:preferred|are a plus)",
    re.I,
)

# 抓"列举专业"的那一段。**中英文语序相反**，必须写两条：
#   中文是「计算机/AI/数学等工程相关专业」→ 专业名在前、专业二字在后
#   英文是「a degree in computer science」→ degree 在前、专业名在后
# 只写中文那条时，英文的 "PhD in Computer Science required" 会整个漏判。
RE_MAJOR_SEG_CN = re.compile(
    r"[^\n。；;]{0,80}?"
    r"(?:本科|硕士|博士|学位|学历)?\s*(?:及以上|以上)?\s*"
    r"(?:计算机|软件|电子信息|机械|自动化|通信|数学|物理|AI|人工智能|"
    r"工业设计|视觉传达|艺术设计|设计学|产品设计|数字媒体|环境设计|建筑|"
    r"marketing|management|engineering|computer|science|math|design|art|business)"
    r"[^。；;\n]{0,120}"
    r"(?:专业| majors?|disciplines?|field of study|degree)[^。；;\n]{0,60}",
    re.I,
)
RE_MAJOR_SEG_EN = re.compile(
    r"\b(?:bachelor|master|phd|degree|major|undergraduate|graduate|b\.s|m\.s|b\.a|m\.a)"
    r"[^.\n]{0,70}?\b(?:in|of)\s+(?:computer|software|electrical|mechanical|"
    r"industrial|engineering|science|math|statistics|information technology|"
    r"design|art|business|marketing|economics|physics|chemistry)\b",
    re.I,
)


def _major_seg(text: str):
    m1 = RE_MAJOR_SEG_CN.search(text)
    m2 = RE_MAJOR_SEG_EN.search(text)
    if m1 and m2:
        return m1 if m1.start() <= m2.start() else m2
    return m1 or m2

# 兜底词：有这些就降级为 soft。
# 注意不含裸 "or"/"或"——并列两个具体专业时 "or" 是枚举号，不是软化词。
# 判成软化会让 "PhD in CS or a related discipline required" 这类硬门槛被低估。
RE_HEDGE = re.compile(r"等|相关|etc|related|preferably|preferred|considered|"
                      r"desired|优先|之一|方向", re.I)

# 哪些专业被点名了（用于判断"有没有任何一个岗位点名要设计类"）
RE_MAJOR_TOKENS = re.compile(
    r"工业设计|视觉传达|艺术设计|设计学|设计艺术|产品设计|交互设计|环境设计|数字媒体|"
    r"美术|动画|服装|工业产品设计|architecture|architectural|"
    r"\bdesign\b|graphic|fashion|industrial design|communication design|"
    r"user experience|\bux\b|interaction design|service design",
    re.I,
)
RE_MAJOR_TOKENS_ENG = re.compile(
    r"computer|software|electrical|mechanical|engineering|science|math|statistics|"
    r"information technology|\bcs\b|business|marketing|economics|finance|physics|chemistry",
    re.I,
)

RE_DEGREE_BACHELOR = re.compile(r"bachelor'?s?\b|\bB\.?S\.?\b|学士|本科", re.I)
RE_DEGREE_MASTER = re.compile(r"master'?s?\b|\bM\.?S\.?\b|硕士|研究生", re.I)
RE_DEGREE_PHD = re.compile(r"\bPh\.?D\.?\b|doctorate|博士", re.I)


def degree_level(text: str) -> str:
    """取**最低**要求的学历，不是最高。

    "a bachelor's or master's degree" 的门槛是学士。取最高会把大量
    "本科即可/本科优先"的岗位误报成硕士要求，直接歪曲门槛结论。
    """
    found = []
    if RE_DEGREE_BACHELOR.search(text):
        found.append(1)
    if RE_DEGREE_MASTER.search(text):
        found.append(2)
    if RE_DEGREE_PHD.search(text):
        found.append(3)
    return {1: "学士", 2: "硕士", 3: "博士"}.get(min(found), "") if found else ""

# 技术栈：只收明确的技术名词，不收泛词。
# 短词一律加词边界——不加就会出 "aws" 命中 "Law**s**"、"go" 命中 "go-to-market"
# 这类子串事故（实测踩过）。Go 一词歧义太大，只认 golang 和 (Go, /in Go/ 这类上下文。
TOOLS = {
    "Python": r"\bpython\b",
    "TypeScript/JavaScript": r"\btypescript\b|\bjavascript\b",
    "Java/Go/Rust/C++": r"\bjava\b|\bgolang\b|\brust\b|\bc\+\+\b|\bjava\b|"
                        r"(?:in|with|,)\s*Go\b|\bGo,|\bGo\)|\bGo\s",
    "RAG/检索增强": r"\bRAG\b|retrieval[- ]augmented|\bvector (?:db|database)\b|向量数据库",
    "Agent/智能体": r"\bagent(?:s|ic)?\b|智能体|\bmcp\b|multi[- ]agent",
    "Prompt 工程": r"prompt engineering|prompt 优化|prompting",
    "模型微调/训练": r"fine[- ]?tun|微调|\blora\b|\bqlora\b|model training|"
                    r"预训练|pre[- ]?training|post[- ]training",
    "LLM/大模型": r"\bLLM\b|large language model|大模型|\bgpt-|\bclaude\b|transformer",
    "云/K8s/容器": r"\bkubernetes\b|\bk8s\b|\bdocker\b|公有云|\baws\b|\bazure\b|"
                  r"\bgcp\b|腾讯云",
    "Figma": r"\bfigma\b",
    "前端/代码原型": r"html/css|front[- ]?end|前端|\breact\b|prototype.{0,40}code|代码原型",
    "AI 编程助手": r"claude ?code|\bcursor\b|copilot|codebuddy|\bcodex\b|ai coding",
    "SQL/数据": r"\bsql\b|\bspark\b|数据仓库|data warehouse|\bmlflow\b",
    "ML框架": r"pytorch|tensorflow|scikit|huggingface|langchain|llamaindex|\bdify\b",
    "研究方法": r"\bab test|a/b test|user research|qualitative|quantitative|用户研究",
}

# 套话词表（codebook §3）——单独记，不计入能力项
BOILERPLATE = (r"self[- ]starter|fast[- ]paced|team player|work ethic|detail[- ]oriented|"
               r"think outside the box|wear many hats|hard[- ]working|motivated|proactive|"
               r"we.re excited to|we.re looking for|passion")


def names_design_major(sec_text: str, whole: str) -> str:
    """学历门槛里**点名要设计类专业**吗？

    只能在"专业要求"那一段里判，不能扫全文——"design" 在 AI 岗 JD 正文里
    满地都是（system design、design docs、experience designing…），
    扫全文会得到 58% 这种明显荒谬的数字（实测踩过）。
    """
    seg = _major_seg(sec_text + "\n" + whole)
    if not seg:
        return "否"
    return "是" if RE_MAJOR_TOKENS.search(seg.group(0)) else "否"


def classify_major(sec_text: str, whole: str) -> str:
    """专业门槛三档。

    顺序：强 open → 列举判断 → 弱 open → 仅提及。弱 open 放在列举之后，
    否则"XX等相关专业优先考虑"会被当成"完全不写专业"。

    ⚠️ 这是机械判定，边界样本必须人工过——codebook §4 写了这一栏要单独记录，
    就是因为正则判不了"PhD in CS or a related discipline"到底算不算对设计类开放。
    """
    blob = sec_text + "\n" + whole
    if RE_MAJOR_OPEN_STRONG.search(blob):
        return "open"

    seg = _major_seg(blob)
    if seg:
        # 兜底词常落在专业列举**之后**（"a degree in industrial design or
        # design-related field"——related 在列举段之外）。所以段后再看一小段窗口，
        # 否则这类会被误判成硬门槛。
        window = blob[seg.start(): seg.end() + 40]
        return "soft" if RE_HEDGE.search(window) else "hard"

    if RE_MAJOR_OPEN_WEAK.search(blob):
        return "open"

    if RE_MAJOR_TOKENS.search(blob) or RE_MAJOR_TOKENS_ENG.search(blob):
        return "提及但不定向"
    return "未提及"


def main():
    ap = argparse.ArgumentParser(description="JD 结构化拆解")
    ap.add_argument("--stats", action="store_true", help="打印门槛三档分布")
    ap.add_argument("--only", help="只处理一个 md 文件")
    args = ap.parse_args()

    if args.only:
        body = Path(args.only).read_text(encoding="utf-8")
        secs = split_sections(body)
        for k, v in secs.items():
            print(f"\n===== {k} ({len(v)} 字符) =====")
            print(v[:400])
        return

    rows = list(csv.DictReader(INDEX.open(encoding="utf-8-sig")))
    rows = [r for r in rows if r["is_primary"] == "1"]

    with OUT.open("w", encoding="utf-8") as f:
        for r in rows:
            p = ROOT / r["raw_file"]
            if not p.exists():
                continue
            body = p.read_text(encoding="utf-8")
            # 去掉 YAML frontmatter
            body = re.sub(r"\A---.*?---\s*", "", body, flags=re.S)
            secs = split_sections(body)
            req = secs.get("required", "") + "\n" + secs.get("responsibilities", "")
            log_txt = secs.get("logistics", "")

            years_hits = RE_YEARS.findall(req + "\n" + log_txt)
            years_vals = []
            for tup in years_hits:
                for g in tup:
                    if g:
                        years_vals.append(int(g))
            years_val = min(years_vals) if years_vals else ""

            tools = sorted(k for k, pat in TOOLS.items() if re.search(pat, body, re.I))
            boiler = sorted(set(m.lower() for m in re.findall(BOILERPLATE, body, re.I)))

            # Logistics 里的 "Minimum education" 是明确的最低要求，优先用它；
            # 没有才退回全文扫描（取最低学历，不是最高）
            m_min = re.search(r"minimum education\s*:\s*([^\n]+)", log_txt + req, re.I)
            edu_level = degree_level(m_min.group(1)) if m_min else degree_level(req)

            rec = {
                "source_key": r["source_key"],
                "job_id": r["job_id"],
                "title": r["title"],
                "family": r["family"],
                "vertical": r["vertical"],
                "seniority": r["seniority"],
                "edu_major": classify_major(req, log_txt),
                # 有没有任何一个岗位在学历门槛里点名要设计类专业？
                # 这是本项目最直接回答"设计专业学生能不能进"的一栏，必须单列。
                "design_major_named": names_design_major(req, log_txt),
                "edu_level": edu_level,
                "years": years_val,
                "tools": tools,
                "boilerplate": boiler,
                "sect_responsibilities": len(secs.get("responsibilities", "")),
                "sect_required": len(secs.get("required", "")),
                "sect_preferred": len(secs.get("preferred", "")),
            }
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    print(f"拆解 {len(rows)} 条 -> {OUT.relative_to(ROOT)}")

    if args.stats:
        recs = [json.loads(l) for l in OUT.open(encoding="utf-8")]
        print(f"\n=== 专业门槛三档（全量 {len(recs)}）===")
        for k, v in Counter(r["edu_major"] for r in recs).most_common():
            print(f"  {k:<16}{v:>4}   {v/len(recs)*100:.0f}%")

        named = [r for r in recs if r["design_major_named"] == "是"]
        print(f"\n=== 门槛里点名设计类专业的岗位：{len(named)} / {len(recs)} "
              f"({len(named)/len(recs)*100:.0f}%) ===")
        for r in named[:10]:
            print(f"  [{r['family']}] {r['title'][:60]}")

        print("\n=== 分岗位族看「hard 门槛」占比 ===")
        by_fam = Counter()
        tot_fam = Counter()
        for r in recs:
            tot_fam[r["family"]] += 1
            if r["edu_major"] == "hard":
                by_fam[r["family"]] += 1
        for fam, n in tot_fam.most_common():
            h = by_fam[fam]
            print(f"  {fam:<18}{h:>3}/{n:<4} ({h/n*100:3.0f}%)")

        print("\n=== 学历要求 ===")
        for k, v in Counter(r["edu_level"] or "未提及" for r in recs).most_common():
            print(f"  {k:<16}{v:>4}")

        print("\n=== 技术栈出现频次（仅技术类，不含软技能）===")
        tc = Counter(t for r in recs for t in r["tools"])
        for k, v in tc.most_common():
            print(f"  {k:<20}{v:>4}  ({v/len(recs)*100:.0f}%)")


if __name__ == "__main__":
    main()