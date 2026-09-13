import io

p = "src/data/resume.ts"
s = io.open(p, encoding="utf-8").read()

# ---------- §3 实习：角色名更正 + 完整起止年份 ----------
s = s.replace('''    period: "2024.03\u201312",
    title: "\u53a6\u95e8\u82b8\u5584\u79d1\u6280",
    sub: "\u5de5\u4e1a\u8bbe\u8ba1",
    highlight: "\u6587\u521b\u8bbe\u8ba1\u5f00\u53d1 \u00b7 \u9500\u552e\u989d\u7834\u4e07",''',
'''    period: "2024.03\u20132024.12",
    title: "\u53a6\u95e8\u82b8\u5584\u79d1\u6280",
    sub: "\u6587\u521b\u8bbe\u8ba1",''', 1)
s = s.replace('''    period: "2025.11\u201326.03",
    title: "\u53a6\u95e8\u9e7f\u5320\u79d1\u6280",
    sub: "\u786c\u4ef6\u4ea7\u54c1\u7814\u53d1\u5b9e\u4e60\u751f",
    highlight: "NPI \u91cf\u4ea7\u7ba1\u63a7 \u00b7 \u5468\u671f \u221218%",''',
'''    period: "2025.11\u20132026.03",
    title: "\u53a6\u95e8\u9e7f\u5320\u79d1\u6280",
    sub: "\u786c\u4ef6\u4ea7\u54c1\u5b9e\u4e60\u751f",''', 1)
# WORK 类型去掉 highlight（改回显示角色）
s = s.replace('export const WORK: { period: string; title: string; sub: string; highlight: string; lines: string[] }[] = [',
              'export const WORK: { period: string; title: string; sub: string; lines: string[] }[] = [', 1)

# ---------- §4 论文条目改为"基金项目"口径 ----------
old_paper = '''    period: "2026.05",
    title: "\u4eba\u5de5\u7167\u660e\u5149\u8c31\u6784\u6210-\u60c5\u7eea\u8026\u5408\u4f5c\u7528\u4e0b\u7684\u9676\u74f7\u6750\u8d28\u611f\u77e5\u673a\u5236\u5b9e\u8bc1\u7814\u7a76",
    note: "\u8bba\u6587\uff08SCI \u6536\u5f55 \u00b7 Lighting Research and Technology\uff09\u00b7 2025 \u5e74\u5ea6\u798f\u5efa\u7701\u793e\u4f1a\u79d1\u5b66\u57fa\u91d1\u9879\u76ee",
    highlight: "SCI \u6536\u5f55",
    lines: [
      "Correlated colour temperature effects on perceived temperature, translucency, glossiness and roughness of traditional Jun porcelain, modulated by gender",'''
new_paper = '''    period: "2025.01\u20132026.05",
    title: "2025 \u5e74\u5ea6\u798f\u5efa\u7701\u793e\u4f1a\u79d1\u5b66\u57fa\u91d1\u9879\u76ee",
    note: "\u4eba\u56e0\u5de5\u7a0b \u00b7 \u9676\u74f7 \u00b7 \u7167\u660e",
    highlight: "SCI \u6536\u5f55",
    lines: [
      "\u8bba\u6587\uff1a\u4eba\u5de5\u7167\u660e\u5149\u8c31\u6784\u6210-\u60c5\u7eea\u8026\u5408\u4f5c\u7528\u4e0b\u7684\u9676\u74f7\u6750\u8d28\u611f\u77e5\u673a\u5236\u5b9e\u8bc1\u7814\u7a76\uff08Lighting Research and Technology\uff0cSCI \u6536\u5f55\uff09",
      "Correlated colour temperature effects on perceived temperature, translucency, glossiness and roughness of traditional Jun porcelain, modulated by gender",'''
assert old_paper in s, "paper entry not found"
s = s.replace(old_paper, new_paper, 1)

# ---------- §4 其余条目：起止年份写全 ----------
s = s.replace('period: "2023.09\u201324.12"', 'period: "2023.09\u20132024.12"', 1)
s = s.replace('period: "2024.09\u201325.06"', 'period: "2024.09\u20132025.06"', 1)
s = s.replace('period: "2025.07\u201326.07"', 'period: "2025.07\u20132026.07"', 1)

io.open(p, "w", encoding="utf-8", newline="").write(s)
print("OK data corrections")
