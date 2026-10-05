/* baizhi-analyzer — 「我要找工」AI 深度分析中转（job-search M2.3，2026-10-05 白纸拍板一步到位上 Worker）
   职责：持有 API Key（secret AI_KEY），接收 {jd, digest}，注入系统提示词后转发大模型服务商。
   限额：全局每日 60 次 + 单 IP 每小时 6 次（内存计数，Worker 重启归零——近似限额，够挡滥用）。
   隐私：不落盘、不记日志，转发完即弃。 */

const SYSTEM_PROMPT = `你是资深的科技行业招聘负责人兼求职教练。用户会给你【候选人简历摘要】和一段【目标岗位 JD】。
请严格基于简历事实输出——禁止编造任何经历、数字或头衔。用与 JD 相同的语言回答，按以下四段 markdown 输出：

## 匹配度
0-100 分 + 一句话总评 + 三条对齐理由（每条都引用 JD 原词，并对应简历里的具体证据）

## 最该突出的三件事
三条要点；每条 = 简历事实 + 为什么对这段 JD 重要（用 JD 的关键词说话，可微调措辞但不得改变事实）

## 定制自我推荐语
一段 120 字以内、可直接用于招聘平台打勾聊天或求职信开头的话——具体、有数字、不堆砌形容词

## 缺口与一周补法
这份 JD 与简历的两个最大缺口 + 每个给一个一周内可完成的、具体的行动`;

// 内存限额（isolate 生命周期内有效）
const dayCount = { day: "", n: 0 };
const ipHits = new Map(); // ip -> { hour, n }

function limited(ip) {
  const day = new Date().toISOString().slice(0, 10);
  if (dayCount.day !== day) { dayCount.day = day; dayCount.n = 0; }
  if (dayCount.n >= 60) return "今日分析次数已达上限（60 次/天），明天再来。";
  const hour = new Date().toISOString().slice(0, 13);
  const h = ipHits.get(ip);
  if (!h || h.hour !== hour) ipHits.set(ip, { hour, n: 1 });
  else if (h.n >= 6) return "这个小时的分析次数用完了（6 次/小时），稍后再试。";
  else h.n += 1;
  // ipHits 防泄漏膨胀：只保留最近 500 个 IP
  if (ipHits.size > 500) ipHits.clear();
  dayCount.n += 1;
  return null;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "POST {jd, digest} 到 /analyze" }), {
        status: 405, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const limitMsg = limited(ip);
    if (limitMsg) return new Response(JSON.stringify({ ok: false, error: limitMsg }), {
      status: 429, headers: { ...cors, "Content-Type": "application/json" },
    });

    let body;
    try { body = await request.json(); } catch { body = null; }
    const jd = typeof body?.jd === "string" ? body.jd.trim() : "";
    const digest = typeof body?.digest === "string" ? body.digest : "";
    if (!jd || !digest) {
      return new Response(JSON.stringify({ ok: false, error: "缺少 jd 或 digest" }), {
        status: 400, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const key = env.AI_KEY;
    const base = (env.AI_BASE || "https://openrouter.ai/api/v1").replace(/\/$/, "");
    const model = env.AI_MODEL || "deepseek/deepseek-chat-v3.1:free";
    if (!key) {
      return new Response(JSON.stringify({ ok: false, error: "服务端尚未配置 AI_KEY（站长在 Cloudflare 后台设置）" }), {
        status: 503, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    try {
      const upstream = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `【候选人简历摘要】\n${digest}\n\n【目标岗位 JD】\n${jd}` },
          ],
        }),
      });
      const j = await upstream.json();
      if (!upstream.ok) {
        return new Response(JSON.stringify({ ok: false, error: j?.error?.message || `上游 HTTP ${upstream.status}` }), {
          status: 502, headers: { ...cors, "Content-Type": "application/json" },
        });
      }
      const text = j.choices?.[0]?.message?.content ?? "";
      return new Response(JSON.stringify({ ok: true, text }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: `转发失败：${e.message}` }), {
        status: 502, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  },
};
