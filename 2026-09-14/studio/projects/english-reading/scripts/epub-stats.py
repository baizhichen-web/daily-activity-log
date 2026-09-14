#!/usr/bin/env python3
"""epub-stats.py — 读取 epub 的元数据与难度画像，供读书空间建档使用。

用法:
    python epub-stats.py "<epub 路径>"

输出: JSON（含书名/作者/出版社、是否双语、词数、句数、平均句长、长词占比）
"""
import json
import re
import sys
import zipfile


def meta(opf: str, tag: str):
    m = re.search(r'<dc:%s[^>]*>(.*?)</dc:%s>' % (tag, tag), opf, re.S)
    if not m:
        return None
    return re.sub(r'<[^>]+>', '', m.group(1)).strip() or None


def main(path: str) -> None:
    z = zipfile.ZipFile(path)
    names = z.namelist()

    opf_name = next((n for n in names if n.endswith('.opf')), None)
    opf = z.read(opf_name).decode('utf-8', 'ignore') if opf_name else ''

    htmls = [n for n in names if re.search(r'\.x?html$', n, re.I)]
    chunks = []
    for n in htmls:
        t = re.sub(r'<[^>]+>', ' ', z.read(n).decode('utf-8', 'ignore'))
        chunks.append(re.sub(r'&[a-z]+;', ' ', t))
    allt = re.sub(r'\s+', ' ', ' '.join(chunks))

    words = re.findall(r"[A-Za-z][A-Za-z'\-]*", allt)
    zh_chars = len(re.findall(r'[\u4e00-\u9fff]', allt))
    sents = [s for s in re.split(r'[.!?]+', allt) if len(s.split()) > 3]

    stats = {
        'path': path,
        'title': meta(opf, 'title'),
        'author': meta(opf, 'creator'),
        'publisher': meta(opf, 'publisher'),
        'bilingual': zh_chars > 500,
        'zh_chars': zh_chars,
        'html_files': len(htmls),
        'words': len(words),
        'sentences': len(sents),
        'avg_sentence_len': round(sum(len(s.split()) for s in sents) / max(len(sents), 1), 1),
        'long_word_pct': round(100 * sum(1 for w in words if len(w) >= 9) / max(len(words), 1), 1),
    }
    print(json.dumps(stats, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit('用法: python epub-stats.py "<epub 路径>"')
    main(sys.argv[1])
