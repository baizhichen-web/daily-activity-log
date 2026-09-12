import io

p = "src/demo/FlipbookDemo.tsx"
s = io.open(p, encoding="utf-8").read()

# 1) 概览行组件 + AwardCell
comps = '''/* 概览（收起态）专用组件：与"明细"是两种表示，不是截断——学自 maxkatz.me
   （其收起态=横向时间轴概览全部条目，展开才切明细列表） */
function CompactRow({ title, note, period }: { title: string; note?: string; period?: string }) {
  return (
    <div className="fb-crow">
      <span className="fb-crow-t">{title}</span>
      {note && <span className="fb-crow-n">— {note}</span>}
      {period && <span className="fb-crow-p">{period}</span>}
    </div>
  );
}

function AwardCell({ raw }: { raw: string }) {
  const [year, rest] = raw.split("\\u3000");
  const name = (rest || year || "").split("\\uff1a")[0];
  return (
    <div className="fb-agitem">
      <span className="fb-agname">{name}</span>
      {rest && <span className="fb-agy">{year}</span>}
    </div>
  );
}

function CourseGroup({ group, items }'''
s = s.replace("function CourseGroup({ group, items }", comps, 1)

# 2) §2 专业之外：概览=词条 chips，明细=带文字的行
old2 = '''            <div className="fb-prose"><p>{BEYOND_INTRO}</p></div>
            <div className="fb-list">
              {BEYOND.map((b) => (
                <div key={b.title} className="fb-row">
                  <div className="fb-row-head">
                    <span className="fb-row-title">{b.title}</span>
                  </div>
                  <p className="fb-row-desc">{b.text}</p>
                </div>
              ))}
            </div>'''
new2 = '''            <div className="fb-prose"><p>{BEYOND_INTRO}</p></div>
            {!isOpen("beyond") && (
              <div className="fb-chips">
                {BEYOND.map((b) => <span key={b.title} className="fb-chip">{b.title}</span>)}
              </div>
            )}
            <Reveal open={isOpen("beyond")}>
              <div className="fb-list">
                {BEYOND.map((b) => (
                  <div key={b.title} className="fb-row">
                    <div className="fb-row-head"><span className="fb-row-title">{b.title}</span></div>
                    <p className="fb-row-desc">{b.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>'''
assert old2 in s, "sec2 not found"
s = s.replace(old2, new2, 1)
s = s.replace('<h3 className="fb-sec"><span className="fb-sec-no">\u00a7 2</span>{t.labels.beyond}</h3>',
              '<h3 className="fb-sec"><span className="fb-sec-no">\u00a7 2</span>{t.labels.beyond}\n              <SectionToggle open={isOpen("beyond")} onToggle={() => toggleSec("beyond")} t={t} />\n            </h3>', 1)

# 3) §3 实习：概览=紧凑单行全列，明细=完整条目
old3 = '''            <div className="fb-list">
              {WORK.map((w) => <EntryRow key={w.title} {...w} />)}
            </div>'''
new3 = '''            {!isOpen("work") && (
              <div className="fb-compact">
                {WORK.map((w) => <CompactRow key={w.title} title={w.title} note={w.sub} period={w.period} />)}
              </div>
            )}
            <Reveal open={isOpen("work")}>
              <div className="fb-list">
                {WORK.map((w) => <EntryRow key={w.title} {...w} />)}
              </div>
            </Reveal>'''
assert old3 in s, "sec3 not found"
s = s.replace(old3, new3, 1)
s = s.replace('<h3 className="fb-sec"><span className="fb-sec-no">\u00a7 3</span>{t.labels.work}</h3>',
              '<h3 className="fb-sec"><span className="fb-sec-no">\u00a7 3</span>{t.labels.work}\n              <SectionToggle open={isOpen("work")} onToggle={() => toggleSec("work")} t={t} />\n            </h3>', 1)

# 4) §4 项目：概览=紧凑单行全列（5 条），明细=完整条目
old4 = '''            <div className="fb-list">
              {OTHER_PROJECTS.slice(0, 2).map((r) => <EntryRow key={r.title} {...r} />)}
            </div>
            <Reveal open={isOpen("projects")}>
              <div className="fb-list">
                {OTHER_PROJECTS.slice(2).map((r) => <EntryRow key={r.title} {...r} />)}
              </div>
            </Reveal>'''
new4 = '''            {!isOpen("projects") && (
              <div className="fb-compact">
                {OTHER_PROJECTS.map((r) => <CompactRow key={r.title} title={r.title} note={r.note} period={r.period} />)}
              </div>
            )}
            <Reveal open={isOpen("projects")}>
              <div className="fb-list">
                {OTHER_PROJECTS.map((r) => <EntryRow key={r.title} {...r} />)}
              </div>
            </Reveal>'''
assert old4 in s, "sec4 not found"
s = s.replace(old4, new4, 1)

# 5) §5 获奖：概览=两栏网格（名+年，全部），明细=编号行（名+详情）
old5 = '''            <p className="fb-subsec">\u8bbe\u8ba1\u83b7\u5956</p>
            <div className="fb-list">
              {AWARDS_DESIGN.slice(0, 4).map((a, i) => <NumRow key={a} no={i + 1} text={a} />)}
              <Reveal open={isOpen("awards")}>
                {AWARDS_DESIGN.slice(4).map((a, i) => <NumRow key={a} no={i + 5} text={a} />)}
              </Reveal>
            </div>
            <p className="fb-subsec">\u8363\u8a89\u83b7\u5956</p>
            <div className="fb-list">
              {AWARDS_HONOR.slice(0, 4).map((a, i) => <NumRow key={a} no={i + 1} text={a} />)}
              <Reveal open={isOpen("awards")}>
                {AWARDS_HONOR.slice(4).map((a, i) => <NumRow key={a} no={i + 5} text={a} />)}
              </Reveal>
            </div>'''
new5 = '''            <p className="fb-subsec">\u8bbe\u8ba1\u83b7\u5956</p>
            {!isOpen("awards") ? (
              <div className="fb-awardgrid">{AWARDS_DESIGN.map((a) => <AwardCell key={a} raw={a} />)}</div>
            ) : (
              <div className="fb-list">{AWARDS_DESIGN.map((a, i) => <NumRow key={a} no={i + 1} text={a} />)}</div>
            )}
            <p className="fb-subsec">\u8363\u8a89\u83b7\u5956</p>
            {!isOpen("awards") ? (
              <div className="fb-awardgrid">{AWARDS_HONOR.map((a) => <AwardCell key={a} raw={a} />)}</div>
            ) : (
              <div className="fb-list">{AWARDS_HONOR.map((a, i) => <NumRow key={a} no={i + 1} text={a} />)}</div>
            )}'''
assert old5 in s, "sec5 not found"
s = s.replace(old5, new5, 1)

# 6) §6 课程：概览=密排三栏（全部课程名+分），明细=分组
old6 = '''            <div className="fb-list">
              {COURSES.slice(0, 1).map((g) => <CourseGroup key={g.group} {...g} />)}
            </div>
            <Reveal open={isOpen("courses")}>
              <div className="fb-list">
                {COURSES.slice(1).map((g) => <CourseGroup key={g.group} {...g} />)}
              </div>
            </Reveal>'''
new6 = '''            {!isOpen("courses") ? (
              <div className="fb-coursegrid">
                {COURSES.flatMap((g) => g.items).map((c) => (
                  <div key={c.name} className="fb-cgitem">
                    <span className="fb-cgname">{c.name}</span>
                    <span className="fb-cgscore">{c.score}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fb-list">
                {COURSES.map((g) => <CourseGroup key={g.group} {...g} />)}
              </div>
            )}'''
assert old6 in s, "sec6 not found"
s = s.replace(old6, new6, 1)

# 7) §7 自评：概览=首段，明细=全文
old7 = '''            <div className="fb-prose">
              {SELF_EVAL.slice(0, 2).map((b, i) => ('''
new7 = '''            <div className="fb-prose">
              {SELF_EVAL.slice(0, 1).map((b, i) => ('''
assert old7 in s, "sec7 head not found"
s = s.replace(old7, new7, 1)
old7b = '''            <Reveal open={isOpen("self")}>
              <div className="fb-prose">
                {SELF_EVAL.slice(2).map((b, i) => ('''
new7b = '''            <Reveal open={isOpen("self")}>
              <div className="fb-prose">
                {SELF_EVAL.slice(1).map((b, i) => ('''
assert old7b in s, "sec7 reveal not found"
s = s.replace(old7b, new7b, 1)

io.open(p, "w", encoding="utf-8", newline="").write(s)
print("OK overview mode implemented")
