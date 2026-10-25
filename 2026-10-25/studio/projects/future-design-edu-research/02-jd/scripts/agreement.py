# -*- coding: utf-8 -*-
# 一致率计算：AI 初稿 vs 组员编码（盲编包）。
# 用法: python agreement.py <AI初稿-封存.json> <编码表-张三.csv> [更多csv] [--out 报告.md]
import sys, io, csv, json, os

CODES = ['A1','A2','A3','B1','B2','B3','C1','C2','C3','D1','D2','D3','E1','E2','E3','F1','F2','G1','G2','H1','H2','H3','H4']
LEVEL = {'要求': '硬性', '硬性': '硬性', '加分': '加分', '偏好': '加分', '?': '?'}

def present(v):
    return (v or '').strip() not in ('', '0', '否', 'n', 'N')

def load_baseline(p):
    b = json.load(io.open(p, encoding='utf-8'))
    out = {}
    for bid, rec in b.items():
        out[bid] = dict((a['code'], LEVEL.get(a.get('level', ''), a.get('level', ''))) for a in rec.get('abilities', []))
    return out

def load_sheet(p):
    rows = {}
    with io.open(p, encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            bid = (r.get('blind_id') or '').strip()
            if bid:
                rows[bid] = dict((c, LEVEL.get((r.get(c) or '').strip(), (r.get(c) or '').strip())) for c in CODES)
    return rows

def kappa(pairs):
    n = len(pairs)
    if n == 0:
        return float('nan'), float('nan'), float('nan')
    both = sum(1 for a, b in pairs if a and b)
    neither = sum(1 for a, b in pairs if not a and not b)
    po = (both + neither) / n
    pa = sum(1 for a, b in pairs if a) / n
    pb = sum(1 for a, b in pairs if b) / n
    pe = pa * pb + (1 - pa) * (1 - pb)
    k = (po - pe) / (1 - pe) if pe != 1 else float('nan')
    return po, pe, k

def main():
    argv = sys.argv[1:]
    outpath = None
    if '--out' in argv:
        i = argv.index('--out')
        outpath = argv[i + 1]
        argv = argv[:i] + argv[i + 2:]
    base = load_baseline(argv[0])
    sheets = [(os.path.basename(p), load_sheet(p)) for p in argv[1:]]
    L = []
    A = L.append
    A('# 编码一致率报告（AI 初稿 vs 组员盲编）')
    A('')
    A('> 基准：%s（AI 初稿，review=pending，未经人工校验）' % os.path.basename(argv[0]))
    A('> 口径：要求 与 硬性 视为同一档；空 = 未命中。n = %d 条 x %d 项。' % (len(base), len(CODES)))
    A('')
    for name, sheet in sheets:
        ids = sorted(set(base) & set(sheet))
        A('## 编码者：%s（有效条目 %d/%d）' % (name, len(ids), len(base)))
        A('')
        miss = sorted(set(base) - set(sheet))
        if miss:
            A('> 未填条目：%s' % '、'.join(miss))
            A('')
        pairs_all = []
        conf = []
        per_code = dict((c, [0, 0]) for c in CODES)
        lv = [0, 0]
        for bid in ids:
            for c in CODES:
                a = base[bid].get(c, '')
                b = sheet[bid].get(c, '')
                pa, pb = present(a), present(b)
                pairs_all.append((pa, pb))
                per_code[c][1] += 1
                if pa == pb:
                    per_code[c][0] += 1
                else:
                    conf.append((bid, c, a or '空', b or '空'))
                if pa and pb:
                    lv[1] += 1
                    if a == b:
                        lv[0] += 1
        po, pe, k = kappa(pairs_all)
        agree = sum(1 for a, b in pairs_all if a == b)
        A('| 指标 | 值 |')
        A('|---|---|')
        A('| 逐格一致率 | %d/%d = %.1f%% |' % (agree, len(pairs_all), 100 * po))
        A('| 偶然一致期望 | %.3f |' % pe)
        A('| Cohen kappa | %s |' % ('nan' if k != k else '%.3f' % k))
        A('| 档位一致率（双方都判命中时） | %d/%d = %s |' % (lv[0], lv[1], ('%.1f%%' % (100.0 * lv[0] / lv[1])) if lv[1] else '—'))
        A('')
        A('### 逐项一致率（用于定位定义不清的能力项）')
        A('')
        A('| 代码 | 一致 | 分母 | 一致率 |')
        A('|---|---|---|---|')
        for c in CODES:
            ok, tot = per_code[c]
            A('| %s | %d | %d | %s |' % (c, ok, tot, ('%.0f%%' % (100.0 * ok / tot)) if tot else '—'))
        A('')
        A('### 冲突清单（%d 格，交白纸裁决）' % len(conf))
        A('')
        if conf:
            A('| 条目 | 能力项 | AI 初稿 | 组员 |')
            A('|---|---|---|---|')
            for bid, c, a, b in conf:
                A('| %s | %s | %s | %s |' % (bid, c, a, b))
        else:
            A('（无冲突）')
        A('')
    md = chr(10).join(L)
    if outpath:
        io.open(outpath, 'w', encoding='utf-8').write(md)
        print('WROTE', outpath)
    else:
        print(md)

main()
