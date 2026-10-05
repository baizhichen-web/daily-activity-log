# M3 草案 · 数字白纸：提示词与 JSON 结构（v0.1，待白纸过目后才写码）

> 2026-10-05 白纸框定：「其实也就等于是一个数字的我在进行自荐」——本版即按此人设重写。
> 现状：中转（baizhi-analyzer.pages.dev/analyze）已上线，当前提示词是「招聘负责人视角四段报告」。
> M3 要把它升级为「数字白纸视角 + 结构化 JSON 输出」，让大模型直接驱动页面。

## 一、人设与边界（写进系统提示词）

- 你是陈柏志的**数字分身**，以第一人称「我」对外自荐；读者是正在招聘的 HR/用人经理。
- 事实边界：只准使用【简历摘要】里的事实与数字；任何简历外的话都不许说成事实（可以说愿景，但必须标明是想法）。
- 语气：白纸本人——具体、有数字、不堆砌形容词；中文为主（JD 是英文则用英文）。
- 未知就承认：简历摘要里没有的信息，回答「这个我需要补充说明」而不是编造。

## 二、请求

```
POST /analyze（中转服务，Key 在服务端）
{ "jd": "JD 全文", "digest": "简历摘要 JSON（与网站渲染同源）", "mode": "m3" }
```

## 三、输出 JSON（固定结构，模型必须只回这个 JSON）

```json
{
  "match": 87,
  "verdict": "一句话总评",
  "reasons": ["JD 原词 ↔ 简历证据 ×3"],
  "pinned": [
    { "ref": "work.lujiang", "why": "用 JD 的话说为什么这段要突出" }
  ],
  "folded": ["beyond"],
  "pitch": "≤120 字第一人称自荐语",
  "gaps": [
    { "gap": "最大缺口", "fix": "一周内可完成的行动" }
  ]
}
```

- `ref` 取值约定（条目 id）：work.lujiang / work.yunshan / proj.sci / proj.ozone / proj.community / edu.bnu / edu.hqu …（前端持有 id↔DOM 映射）
- `pinned`：前端把这些条目**置顶 + 高亮**；`folded`：折叠；这即「根据 JD 的动态简历」的页面落点。
- `pitch` 直接给复制按钮；`gaps` 出在报告尾部。
- 校验：中转服务解析 JSON，字段缺失/越界 ref → 降级返回纯文本报告（不白屏）。

## 四、系统提示词 v0.1（数字白纸版）

```
你是陈柏志的数字分身——一个替他做自荐的 AI。读者是正在招聘的 HR。
规则：
1. 只用【简历摘要】里的事实与数字；禁止编造经历、头衔、数字。摘要里没有的，说「这个我可以补充说明」。
2. 用第一人称「我」，语气具体、有数字、不堆砌形容词；JD 是英文就整体用英文。
3. 只输出一个 JSON 对象（不要 markdown 代码块包裹），结构如下：
{"match": 0-100整数, "verdict": "一句话", "reasons": ["3条，每条引用 JD 原词并对应简历证据"],
 "pinned": [{"ref":"work.lujiang|work.yunshan|proj.sci|proj.ozone|proj.community|edu.bnu|edu.hqu 之一",
             "why":"用 JD 的话说为什么突出"}],
 "folded": ["beyond" 等节 key],
 "pitch": "≤120字第一人称自荐语", "gaps": [{"gap":"...","fix":"一周内可完成的行动"}]}
pinned 最多 4 条；folded 只能从 ["education","about","beyond","self"] 里选。
```

## 五、前端行为

1. 「用大模型分析这段 JD」→ 出两块：报告（verdict/reasons/pitch/gaps）+ **简历页实况**（pinned 置顶高亮、folded 折叠，进入简历页直接看到）。
2. 「复制定制链接」链接升级为携带本次 pinned/folded（`?page=1&aim=…&m3=<短参数>`），任何人打开都是这一版动态简历。
3. 无 Key/超限/失败 → 降级为现在的本地词面报告。

## 六、待白纸拍板

- 「数字分身」口吻 OK？（自荐语会写「我」，报告里的总评也是第一人称视角）
- pinned/folded 的粒度：现在是节内条目级（work 两条、proj 五条），要不要更细到 bullet？
- pitch 用什么口吻开头（现在默认中文，直接可用）？


## 七、组件选型（2026-10-05 白纸提议：lobehub/lobe-ui 一类的开源 AIGC UI 库）

**评估结论：lobe-ui 不整库接入，当交互设计参照。**

| 选项 | 判断 |
| --- | --- |
| lobe-ui 整库 | ✗ 基于 Ant Design（peer dep antd v5 + antd-style CSS-in-JS）+ motion；引它=给站点背一个 antd 运行时（估 +150–300KB gzip），且它的组件气质与 BST 灰阶编辑部风全面打架——主题化等于高成本对抗；站内「基因封闭/审美锚点=白纸自己那套」两条纪律都过不去 |
| assistant-ui / ai-chatbot 模板 | △ 同理：Tailwind+shadcn 自成体系，仍是「别人的设计系统」 |
| **headless 逻辑 + 站点 tokens 自绘（推荐）** | ✓ 逻辑层用 @ai-sdk/react 的 useChat（流式/状态/重试，约 10KB）或手写 fetch+ReadableStream；UI 用站点 tokens 自绘（气泡复用 §11 的 chip/圆点行美学）；markdown 渲染加 react-markdown（~30KB） |
| lobe-ui 的正确用法 | ✓ MIT——把它的 ChatList/ChatInput/Markdown 组件**当交互范式抄作业**：布局、自动滚动、流式打字、引用条；抄设计不抄代码 |

**对话式自荐（M3.5 提议）**：数字白纸的最自然形态其实是对话——招聘方用自然语言问「你们做过量产吗？」，数字白纸以第一人称作答（同一套事实约束提示词，中转服务加流式输出）。M3 先交「粘贴 JD → 结构化报告 + 简历重排」；对话模式作为 M3.5，复用同一中转与人设，UI 按上面推荐方案自绘。


## 八、排期决定（2026-10-05 白纸拍板）

- **先报告版，对话后补**：M3 按本草案实施（粘 JD → 数字白纸 JSON → 简历重排 + 自荐语）；对话式自荐排 M3.5（复用同一中转、同一人设，对话 UI 按本文件 §7 推荐方案自绘）。
- 组件选型即 §7 结论：lobe-ui 不整库接入；逻辑层 @ai-sdk/react useChat 或手写流式，UI 站点 tokens 自绘。
