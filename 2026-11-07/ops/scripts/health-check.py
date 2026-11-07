#!/usr/bin/env python3
"""workspace health-check v1.2 — 工作空间体检（v1.1 知识库面 + v1.2 可导航性面）

用法: python ops/scripts/health-check.py [--check-only]
  --check-only  只输出发现摘要（不含明细数组），供巡检判分支
输出: JSON 到 stdout（无文件写入副作用）
退出码: 0 = 可导航性面无发现；1 = 有发现（ghost_paths / stale_rename / heavy_untracked / generated_stale）
  注意：dead_links 不计入退出码——它已在台账 O-032 在册，计入会让每次运行恒为 1。

v1.2 新增（可导航性面；规格见 studio/projects/agent-navigability/design.md §二·传感器A）：
  ghost_paths      文档引用了但不存在的路径（[]() 与反引号，两段式解析，带 文件:行）
  stale_rename     目录改名后子文档仍引用旧名（与现存项目目录名做前缀相似匹配）
  path_style       md 内绝对路径斜杠写法分布与混用文件
  generated_stale  生成型入口文档过期 / dotmd 索引落后 vault（兑现 components.md 的「索引新鲜度」承诺）
  heavy_untracked  已 gitignore 但体量超阈的顶层目录——递归搜索的污染源

「宁可漏报，不可误报」两条硬规则（违反过一次，代价是 27717 条误报）：
  1. 反引号里多是命令行、ID、代码，不是路径。只有满足「锚点规则」才当路径候选：
     绝对路径 / 首段是工作空间现存顶层目录 / 以 ./ 或 ../ 开头。
  2. 扫描范围必须排除 ops/daily-activity/ ——它是整棵工作空间的按日重复副本
     （2026-10-03 实测内含 bAI/ 与 ops/），不排除等于把同一份文档数遍。

⚠️ 校准纪律（两套独立证据指向同一条，勿删）：
  health-check v1 误报 258（裸名链接未全库解析）→ v2 误报 789（vault 根路径从源目录拼）→ v3 零已知误报；
  本项目 ghost_paths 原型未滤命令行与重复副本 → 4009 份 md 报出 27717 条。
  任何 sensor 采信前，先跑 design.md §四 最小回归集再进报告。
链接解析规则（Obsidian）: ../ 开头=相对源文件；含 /=vault 根；裸名=全库 basename 最短匹配。
"""
import os, re, glob, io, json, datetime, argparse, sys

VAULT = r"E:/Desktop/AI_itself/workspace_with_ai/bAI/bAI"
WS = r"E:/Desktop/AI_itself/workspace_with_ai"
DOTMD_INDEX = r"E:/Desktop/AI_itself/dotmd-index"
AGENTS_BASELINE_LINES = 60  # HumanLayer 实践基准；ETH 2601.20404 警示堆砌降效

# ── v1.2 口径常量 ────────────────────────────────────────────────────
EXCLUDE_DIRS = {
    "deepseek-harness", "deepseek-harness.pending-delete",  # 第三方 clone，含 20 份会误导读链的 AGENTS.md
    "node_modules", ".git", "temp", "ai-homes",            # ai-homes 含 token/credentials，禁读禁扫
    ".dsh-vision", ".claude", ".zcode", ".obsidian", "_archive",
    "daily-activity",                                      # 整棵树的按日重复副本（见 docstring 硬规则 2）
    "dist", "build", ".venv", "__pycache__", "vendor", ".cache",
}
SNAPSHOT_MAX_AGE_DAYS = 3   # 与 R-002 同口径
HEAVY_FILE_MIN = 5000
HEAVY_BYTES_MIN = 500 * 1024 * 1024
MIN_PREFIX_SIMILAR = 12     # 改名残留判据：与现存项目名共享的前缀长度

PLACEHOLDER = re.compile(
    r"(YYYY|MM-DD|<|>|\{|\}|\[|\]|\.\.\.|…|\*|\$|\bx\b|xxx|待定|示例|模板|主题|标题|源|名|"
    r"\bN\b|\bn\b|一-鿿)"
)
# ghost_paths 只判「规范性/指令性」文档——代理会照着行动的那些。
# 分两档，因为同名文件在不同目录语义完全不同：
#   HARD：整目录都是「当时为真」的记录或第三方原文，文件名不算数。
#         raw/ 按根 AGENTS.md 的定义就是「收到可引用原文先存这里」，里面的 README
#         是被引用方的 README，不是本空间的指令（v1.2 校准中一处漏判报出 20 条）。
#   SOFT：目录里既有过程记录又有指令文档 → 靠文件名区分（README/AGENTS/design/STATUS）。
HARD_HISTORICAL = (
    "bAI/bAI/raw/", "bAI/bAI/notes/", "bAI/bAI/wiki/log.md",
    "ops/reports/board-reviews/", "ops/reports/audit/history/",
    "studio/projects/agent-navigability/FINDINGS",
    "ops/reports/board-snapshot.md",          # 生成物：内部路径来自看板数据而非文档主张
)
SOFT_HISTORICAL = ("studio/projects/", "bAI/bWrite/")
HARD_HISTORICAL += ("ops/reports/board-snapshot.md",)   # 生成物：路径来自看板数据，非文档主张
# ⚠️ 关键词是「词根」而非完整文件名：本空间惯例是 README-jd.md / design-jd.md 这类带后缀变体，
#    写成 README\.md$ 会把指令文档误降级成历史记录——回归断言 1 抓到过这个 bug。
NORMATIVE_OVERRIDE = re.compile(r"(README|AGENTS|design|STATUS|SKILL|HANDOFF)[-\w]*\.md$")
# 定向豁免：(文件相对路径, 引用) —— 规范性文档里「当时为真」的历史性引用。
# 文本保留（历史记录不篡改），传感器不再逐日报警。新增条目必须带理由与核实日期，
# 且改动后必跑 studio/projects/agent-navigability/scripts/regression-hc.py。
GHOST_EXEMPT = {
    # O-015 历史问题行：路径为 2026-08-15 当时的问题记录，行内已有 2026-10-25 注释（2026-11-07 核实）
    ("ops/reports/audit/open-items.md",
     "bAI/bWrite/projects/认知外包/sources/235_Position_LLMs_can_t_jump.pdf"),
    # 卸载项目 2026-05-04 完成（README 实载 Codex ~/.codex 已删除），行内已注明历史记录（2026-11-07 核实）
    ("studio/projects/ai-tools-uninstall/AGENTS.md",
     "~/.codex/vendor_imports/skills/"),
    # MemoraX 2026-09-08 停用，该行已注明「历史接入记录」（2026-11-07 核实）
    ("studio/projects/workspace-evolution/AGENTS.md",
     "~/.agents/skills/memorax/"),
}
MD_LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)")
BACKTICK = re.compile(r"`([^`\n]{3,120})`")
ABS_WIN = re.compile(r"^[A-Za-z]:[\\/]")
SLASH_ABS = re.compile(r"[A-Za-z]:/")
BACKSLASH_ABS = re.compile(r"[A-Za-z]:\\")


def top_level_dirs():
    out = set()
    for d in os.listdir(WS):
        if os.path.isdir(os.path.join(WS, d)) and d not in EXCLUDE_DIRS:
            out.add(d)
    return out


def project_dirs():
    proj = os.path.join(WS, "studio", "projects")
    if not os.path.isdir(proj):
        return set()
    return {d for d in os.listdir(proj) if os.path.isdir(os.path.join(proj, d))}


def ws_md_files():
    out = []
    for root, dirs, files in os.walk(WS):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        out += [os.path.join(root, fn) for fn in files if fn.endswith(".md")]
    return out


def clean_token(t):
    t = t.strip().strip("\"'").split("#")[0].split("?")[0]
    return t.rstrip(".,;:、）)")


def resolve_variants(t, doc_dir):
    """返回 (是否命中, 用于展示的 ref)。

    Windows 路径可以合法含空格（实测本空间有 `F:\\Calibre 书库\\...`），
    所以先按完整 token 试；仍不中再按空格截断试（命令行常是「路径 参数」混写）。
    反过来先截断会把真路径判成幽灵——v1.2 校准中就是这么误报了 7 条 Calibre。
    """
    full = clean_token(t)
    if resolve(full, doc_dir):
        return True, full
    head = full.split(" ")[0]
    if head != full and resolve(head, doc_dir):
        return True, head
    return False, full


def is_path_candidate(t, tops):
    """锚点规则：不满足就不当路径看。宁可漏报不可误报。"""
    if not t or len(t) < 4 or PLACEHOLDER.search(t):
        return False
    if re.match(r"^(https?|mailto|ftp):", t):
        return False
    # 以单个 / 开头的多是斜杠命令（/compact）或 API 路径（/v1/models），不是文件系统路径
    if t.startswith("/") and not ABS_WIN.match(t):
        return False
    if ABS_WIN.match(t) or t.startswith("~") or t.startswith("./") or t.startswith("../"):
        return True
    first = t.replace("\\", "/").split("/")[0]
    return first in tops


def is_historical(rel):
    """过程记录/生成物不参与 ghost/stale 判定。"""
    r = rel.replace("\\", "/")
    if r.startswith(HARD_HISTORICAL):
        return True
    if r.startswith(SOFT_HISTORICAL):
        return not NORMATIVE_OVERRIDE.search(r)
    return False


def resolve(t, doc_dir):
    """两段式解析：先文档所在目录，再工作空间根；带 .md 回退。"""
    if ABS_WIN.match(t) or t.startswith("~") or t.startswith("/"):
        cands = [os.path.expanduser(t)]
    else:
        t2 = t[2:] if t.startswith("./") else t
        t2 = t2.lstrip("/")
        cands = [os.path.join(doc_dir, t2), os.path.join(WS, t2)]
    for c in cands:
        if os.path.exists(c):
            return True
        if not c.endswith(".md") and os.path.exists(c + ".md"):
            return True
    return False


def common_prefix_len(a, b):
    n = 0
    for x, y in zip(a, b):
        if x != y:
            break
        n += 1
    return n


def nav_checks():
    tops = top_level_dirs()
    projs = project_dirs()
    md_files = ws_md_files()

    ghost, stale, mixed = [], [], []
    seen_ghost = set()
    seen_stale = set()
    style_back = style_fwd = 0

    for f in md_files:
        try:
            text = io.open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        rel = os.path.relpath(f, WS).replace("\\", "/")
        doc_dir = os.path.dirname(f)
        lines = text.splitlines()
        hist = is_historical(rel)          # 过程记录只统计写法，不参与 ghost/stale 判定
        has_back = has_fwd = False

        for ln, line in enumerate(lines, 1):
            for m in list(MD_LINK.finditer(line)) + list(BACKTICK.finditer(line)):
                raw = m.group(1)
                if not is_path_candidate(clean_token(raw), tops):
                    continue
                if SLASH_ABS.search(raw):
                    has_fwd = True
                if BACKSLASH_ABS.search(raw):
                    has_back = True
                ok, shown = resolve_variants(raw, doc_dir)
                if ok or hist:
                    continue
                if (rel, shown) in GHOST_EXEMPT:
                    continue
                key = (rel, ln, shown)
                if key in seen_ghost:
                    continue
                seen_ghost.add(key)
                ghost.append({"file": rel, "line": ln, "ref": shown[:80]})

            if hist:
                continue
            # 改名残留：必须是「路径语境」里的目录段，且与某现存项目名在前缀处分叉。
            # 两条例外各挡一类误报：
            #   前缀包含关系 → dsh-vision-fallback-bridge 是 GitHub 仓库名，不是 dsh-vision-fallback 改名
            #   非路径语境   → 散文里提到 dsh-workspace-auditor 这种真实存在的别处名字
            segs = [m.group(1) for m in re.finditer(r"projects/([a-z][a-z0-9][a-z0-9\-]{6,})", line)]
            segs += [m.group(1) for m in re.finditer(r"(?:^|[\s`|])([a-z][a-z0-9][a-z0-9\-]{6,})/", line)]
            for tok in segs:
                tok = tok.rstrip("/-.")
                if tok in projs or PLACEHOLDER.search(tok):
                    continue
                if os.path.exists(os.path.join(WS, "studio", "projects", tok)):
                    continue
                for k in projs:
                    if len(k) < MIN_PREFIX_SIMILAR or tok == k:
                        continue
                    if tok.startswith(k) or k.startswith(tok):
                        continue
                    if common_prefix_len(tok, k) >= MIN_PREFIX_SIMILAR:
                        skey = (rel, tok)
                        if skey not in seen_stale:
                            seen_stale.add(skey)
                            stale.append({"file": rel, "line": ln, "stale": tok, "likely": k})
                        break

        style_back += len(BACKSLASH_ABS.findall(text))
        style_fwd += len(SLASH_ABS.findall(text))
        if has_back and has_fwd:
            mixed.append(rel)

    return {
        "ghost_paths": {"count": len(ghost), "items": ghost[:60], "truncated": len(ghost) > 60},
        "stale_rename": {"count": len(stale), "items": stale[:40], "truncated": len(stale) > 40},
        "path_style": {
            "md_backslash_abs": style_back,
            "md_forwardslash_abs": style_fwd,
            "files_mixing_both": len(mixed),
            "mixing_list": mixed[:20],
        },
    }


def generated_stale():
    """生成型入口文档的新鲜度。规范类 AGENTS.md 不在此列——它稳定不是问题。"""
    out = []
    snap = os.path.join(WS, "ops/reports/board-snapshot.md")
    if os.path.exists(snap):
        age = (datetime.date.today() - datetime.date.fromtimestamp(os.path.getmtime(snap))).days
        if age > SNAPSHOT_MAX_AGE_DAYS:
            out.append({"item": "ops/reports/board-snapshot.md", "age_days": age,
                        "threshold": SNAPSHOT_MAX_AGE_DAYS, "note": "stale"})
    else:
        out.append({"item": "ops/reports/board-snapshot.md", "age_days": None, "note": "missing"})

    # dotmd 索引 vs vault：components.md 承诺的「索引新鲜度」
    vault_md = [f for f in glob.glob(VAULT + "/**/*.md", recursive=True)
                if "_archive" not in f.replace("\\", "/")]
    if vault_md and os.path.isdir(DOTMD_INDEX):
        v_new = max(os.path.getmtime(f) for f in vault_md)
        i_new = max((os.path.getmtime(os.path.join(r, fn)) for r, _, fs in os.walk(DOTMD_INDEX)
                     for fn in fs), default=0)
        if i_new < v_new:
            lag_days = round((v_new - i_new) / 86400, 1)
            out.append({"item": "dotmd-index", "note": "index_behind_vault", "lag_days": lag_days,
                        "vault_newest": str(datetime.datetime.fromtimestamp(v_new))[:19],
                        "index_newest": str(datetime.datetime.fromtimestamp(i_new))[:19]})
    elif vault_md:
        out.append({"item": "dotmd-index", "note": "index_dir_missing"})
    return out


def heavy_untracked():
    """只报「已 gitignore 且体量超阈」的顶层目录——跟踪中的目录不是污染源，是内容。"""
    ig = set()
    p = os.path.join(WS, ".gitignore")
    if os.path.exists(p):
        for line in io.open(p, encoding="utf-8", errors="ignore"):
            line = line.strip().rstrip("/")
            if line and not line.startswith("#"):
                ig.add(line)

    out = []
    for d in sorted(os.listdir(WS)):
        full = os.path.join(WS, d)
        if not os.path.isdir(full) or d == ".git":
            continue
        if not (d in ig or (d + "/") in ig):
            continue
        n = nbytes = nagents = 0
        heavy = False
        for root, dirs, files in os.walk(full):
            dirs[:] = [x for x in dirs if x not in ("node_modules", ".git")]
            for fn in files:
                n += 1
                if fn == "AGENTS.md":
                    nagents += 1
                try:
                    nbytes += os.path.getsize(os.path.join(root, fn))
                except OSError:
                    pass
            if n > HEAVY_FILE_MIN or nbytes > HEAVY_BYTES_MIN:
                heavy = True
                break            # 短路：只为判超标，不为精确计数
        if heavy:
            out.append({"dir": d, "files_at_least": n, "size_mb_at_least": round(nbytes / 1048576),
                        "agents_md_inside": nagents})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check-only", action="store_true",
                    help="只输出发现摘要，不含明细数组")
    args = ap.parse_args()

    # ── v1.1 知识库面（逻辑原样保留，改动须与原版输出逐字比对）──────
    all_md = glob.glob(VAULT + "/**/*.md", recursive=True)
    base_idx = {}
    for f in all_md:
        base_idx.setdefault(os.path.basename(f)[:-3], []).append(f)
    wiki_files = [f for f in all_md if "/wiki/" in f.replace("\\", "/")]

    dead, per_file = [], {}
    for f in wiki_files:
        txt = io.open(f, encoding="utf-8", errors="ignore").read()
        bad = []
        for l in set(re.findall(r"\[\[([^\]|#]+)", txt)):
            l = l.strip()
            if not l: continue
            if l.startswith(".."):
                p = os.path.normpath(os.path.join(os.path.dirname(f), l))
                ok = os.path.exists(p) or os.path.exists(p + ".md")
            elif "/" in l:
                ok = os.path.exists(os.path.join(VAULT, l)) or os.path.exists(os.path.join(VAULT, l + ".md"))
            else:
                ok = l in base_idx
            if not ok: bad.append(l)
        if bad: per_file[os.path.relpath(f, VAULT).replace("\\", "/")] = sorted(bad)
        dead.extend(bad)

    idx = io.open(VAULT + "/wiki/index.md", encoding="utf-8").read()
    refs = "".join(io.open(f, encoding="utf-8", errors="ignore").read()
                   for f in all_md if os.path.basename(f) not in ("index.md", "log.md"))
    orphans = []
    for f in wiki_files:
        if os.path.basename(f) in ("index.md", "log.md") or "/_archive/" in f: continue
        name = os.path.basename(f)[:-3]
        if name not in idx and ("[[" + name) not in refs:
            orphans.append(os.path.relpath(f, VAULT).replace("\\", "/"))

    agents = {}
    for sub in ["AGENTS.md", "bAI/bAI/AGENTS.md", "studio/AGENTS.md", "ops/AGENTS.md", "bAI/bWrite/AGENTS.md"]:
        p = os.path.join(WS, sub)
        if os.path.exists(p):
            agents[sub] = len(io.open(p, encoding="utf-8", errors="ignore").read().splitlines())

    snap = io.open(os.path.join(WS, "ops/reports/board-snapshot.md"), encoding="utf-8").read().splitlines()[2]

    # ── v1.2 可导航性面（只做加法）────────────────────────────────
    scanned = ws_md_files()
    nav = nav_checks()
    stale_gen = generated_stale()
    heavy = heavy_untracked()

    if args.check_only:
        for k in ("ghost_paths", "stale_rename"):
            nav[k] = {"count": nav[k]["count"]}
        nav["path_style"].pop("mixing_list", None)

    findings = (nav["ghost_paths"]["count"] > 0 or nav["stale_rename"]["count"] > 0
                or len(heavy) > 0 or len(stale_gen) > 0)

    print(json.dumps({
        "version": "1.2",
        "date": str(datetime.date.today()),
        # v1.1 知识库面
        "wiki_files": len(wiki_files), "total_md": len(all_md),
        "dead_links": {"count": len(dead), "per_file": per_file},
        "orphans": orphans,
        "agents_md_lines": agents,
        "agents_baseline": AGENTS_BASELINE_LINES,
        "snapshot_line": snap.strip(),
        # v1.2 可导航性面
        "scanned_md": len(scanned),
        "excluded_dirs": sorted(EXCLUDE_DIRS),
        "ghost_paths": nav["ghost_paths"],
        "stale_rename": nav["stale_rename"],
        "path_style": nav["path_style"],
        "generated_stale": stale_gen,
        "heavy_untracked": heavy,
    }, ensure_ascii=False, indent=1))

    sys.exit(1 if findings else 0)

if __name__ == "__main__":
    main()