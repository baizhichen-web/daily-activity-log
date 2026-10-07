/* /analyze — Pages Function：数字白纸中转（Key 在 env.AI_KEY，绝不入前端代码）
   供应商：DeepSeek（api.deepseek.com/v1，OpenAI 兼容）——国内厂商里实测唯一不拦 Cloudflare 机房出口的。
   主路径 M3（2026-10-06 白纸拍板；v3.2 三轮反馈后）：输出结构化 JSON（match/verdict/reasons/pinned/folded），
   前端据此重排简历页；JSON 任何一环失败自动降级为 markdown 报告（绝不白屏）。
   语气纪律＝偏向候选人（白纸 10-06：我需要 AI 偏向我说话）——从优势出发、不暴露短板、不虚报。
   限额：全局每日 60 次 + 单 IP 每小时 6 次（内存计数，实例重启归零，近似够挡滥用）。
   ⚠️ 端点写死在本文件：项目里残留过 AI_BASE/AI_MODEL 变量（早期 toml 部署失败遗留）会覆盖 env 默认值——勿再用 env 传端点。 */

const M3_PROMPT = `你是陈柏志的数字分身——在招聘场合替他自荐的 AI，更是他最有力的推荐人：一切表达都偏向他、替他把话说到位。
规则：
1. 只用【简历摘要】里的事实与数字；禁止编造任何经历、头衔、数字。
2. 第一人称「我」；具体、不堆砌形容词。
3. 语言跟读者走，不跟 JD 走：用户消息末尾有【输出语言要求】，所有输出字段（含对 JD 要求的转述）一律使用该语言，全篇不得混入另一种语言的句子；JD 是另一种语言时，转述其要求即可（如需保留个别关键术语原词，括注即可）。
4. 只输出一个 JSON 对象，不要 markdown 代码块、不要任何解释文字。结构：
{
  "match": 88,
  "verdict": "一句话总评（第一人称，60 字内）",
  "reasons": ["对齐理由 1", "对齐理由 2", "对齐理由 3"],
  "pinned": [{ "ref": "条目id", "why": "为什么这段该被看见" }],
  "folded": []
}
5. match 按简历与 JD 的真实重合度就高评估；verdict 往有利于候选人的方向说。
6. reasons 恰好 3 条，每条引用 JD 原词并对应简历摘要里的具体证据。
7. pinned 最多 4 条，按与 JD 的相关度从高到低排；ref 只能取【简历摘要】里各条目的 id 值；why 用 JD 的关键词说话（50 字内）。
8. folded 从 education / beyond / self 里选与这份 JD 无关、建议收起的小节，没有就给空数组；work 和 projects 永不收起。
9. 语气纪律（偏向候选人）：全程从优势出发组织表达；整体口吻真诚、谦虚、有底气。简历摘要里没有直接对应的点，可以用真诚谦虚的口吻如实阐明自己这方面还没有经验，但紧接着要从最相关的相邻经验说明可迁移性，把话落回「我能带来什么」；不回避、不掩饰，也绝不虚报事实。`;

/* 降级路径：M2 的四段 markdown 报告（JSON 解析/校验失败或上游异常时兜底） */
const REPORT_PROMPT = `你是陈柏志的数字分身——替他自荐的 AI，更是他最有力的推荐人：一切表达偏向他、替他把话说到位。
规则：
1. 只用【简历摘要】里的事实与数字；禁止编造任何经历、头衔、数字。
2. 用第一人称「我」，语气具体、不堆砌形容词；语言跟读者走（以【输出语言要求】为准，无则与 JD 同语言）。
3. 口吻真诚、谦虚、有底气，全程从优势出发：简历摘要里没有直接对应的点，可以如实说明这方面还没有经验，但紧接着要从最相关的相邻经验说明可迁移性；绝不虚报。
4. 按以下两段 markdown 输出：
## 匹配度
0-100 分（就高评估）+ 一句话总评 + 三条对齐理由（每条都引用 JD 原词，并对应简历里的具体证据）
## 最该突出的三件事
三条要点；每条 = 简历事实 + 为什么对这段 JD 重要（用 JD 的关键词说话）`;

const FOLDABLE = ["education", "beyond", "self"];

const dayCount = { day: "", n: 0 };
const ipHits = new Map();

function limited(ip) {
  const day = new Date().toISOString().slice(0, 10);
  if (dayCount.day !== day) { dayCount.day = day; dayCount.n = 0; }
  if (dayCount.n >= 60) return "今日分析次数已达上限（60 次/天），明天再来。";
  const hour = new Date().toISOString().slice(0, 13);
  const h = ipHits.get(ip);
  if (!h || h.hour !== hour) ipHits.set(ip, { hour, n: 1 });
  else if (h.n >= 6) return "这个小时的分析次数用完了（6 次/小时），稍后再试。";
  else h.n += 1;
  if (ipHits.size > 500) ipHits.clear();
  dayCount.n += 1;
  return null;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function callUpstream(base, model, authHeader, digest, jd, systemPrompt, jsonMode, lang) {
  const payload = {
    model,
    temperature: 0.4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `【候选人简历摘要】\n${digest}\n\n【目标岗位 JD】\n${jd}${lang ? `\n\n【输出语言要求】${lang === "zh" ? "中文（简体）" : "English"}——下面所有输出字段一律使用这门语言，全篇不得混入另一种语言的句子。` : ""}` },
    ],
  };
  if (jsonMode) payload.response_format = { type: "json_object" };
  const upstream = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: authHeader },
    body: JSON.stringify(payload),
  });
  return { upstream, j: await upstream.json().catch(() => ({})) };
}

/* 解析并校验 M3 JSON；任何一环不合格返回 null（调用方走降级） */
function parseM3(raw, allowedRefs) {
  let t = String(raw || "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s < 0 || e <= s) return null;
  let v;
  try { v = JSON.parse(t.slice(s, e + 1)); } catch { return null; }
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const match = Math.round(Number(v.match));
  if (!Number.isFinite(match) || match < 0 || match > 100) return null;
  const strArr = (x, n) => Array.isArray(x)
    ? x.filter((y) => typeof y === "string" && y.trim()).map((y) => y.trim()).slice(0, n)
    : [];
  const verdict = typeof v.verdict === "string" ? v.verdict.trim().slice(0, 200) : "";
  const reasons = strArr(v.reasons, 4);
  const pinned = (Array.isArray(v.pinned) ? v.pinned : [])
    .filter((p) => p && typeof p === "object" && typeof p.ref === "string" && p.ref.trim())
    .filter((p) => !allowedRefs.length || allowedRefs.includes(p.ref.trim()))
    .map((p) => ({ ref: p.ref.trim(), why: typeof p.why === "string" ? p.why.trim().slice(0, 160) : "" }))
    .slice(0, 4);
  const folded = strArr(v.folded, 3).filter((y) => FOLDABLE.includes(y));
  /* 全空 = 模型没按结构出牌，降级 */
  if (!verdict && !reasons.length && !pinned.length) return null;
  return { match, verdict, reasons, pinned, folded };
}

const jsonRes = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

export async function onRequestOptions() {
  return new Response(null, { headers: cors });
}

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const limitMsg = limited(ip);
  if (limitMsg) return jsonRes({ ok: false, error: limitMsg }, 429);

  let body;
  try { body = await request.json(); } catch { body = null; }
  const jd = typeof body?.jd === "string" ? body.jd.trim() : "";
  const digest = typeof body?.digest === "string" ? body.digest : "";
  const lang = body?.lang === "en" ? "en" : body?.lang === "zh" ? "zh" : "";
  const allowedRefs = Array.isArray(body?.refs) ? body.refs.filter((s) => typeof s === "string") : [];
  if (!jd || !digest) return jsonRes({ ok: false, error: "缺少 jd 或 digest" }, 400);

  const key = env.AI_KEY;
  const base = "https://api.deepseek.com/v1";
  const model = (typeof body?.model === "string" && body.model.trim()) || "deepseek-chat";
  if (!key) return jsonRes({ ok: false, error: "服务端尚未配置 AI_KEY（站长在 Cloudflare 后台设置）" }, 503);

  try {
    /* 主路径：M3 结构化 JSON */
    let { upstream, j } = await callUpstream(base, model, `Bearer ${key}`, digest, jd, M3_PROMPT, true, lang);
    if (upstream.ok) {
      const data = parseM3(j.choices?.[0]?.message?.content, allowedRefs);
      if (data) return jsonRes({ ok: true, mode: "m3", data });
    }
    /* 降级：四段 markdown 报告（JSON 失败或上游异常都走这里；限额已在入口计过，不重复计） */
    ({ upstream, j } = await callUpstream(base, model, `Bearer ${key}`, digest, jd, REPORT_PROMPT, false, lang));
    if (!upstream.ok) {
      return jsonRes({ ok: false, error: j?.error?.message || `上游 HTTP ${upstream.status}` }, 502);
    }
    return jsonRes({ ok: true, mode: "report", text: j.choices?.[0]?.message?.content ?? "" });
  } catch (e) {
    return jsonRes({ ok: false, error: `转发失败：${e.message}` }, 502);
  }
}
