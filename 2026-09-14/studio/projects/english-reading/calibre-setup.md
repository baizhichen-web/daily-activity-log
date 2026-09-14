# Calibre 集成方案（配置，不是插件）

> 2026-09-10 调研结论：**不需要写插件。** Calibre 9.13 阅读器内置的 AI 面板已经具备这套流程需要的全部能力，配置即可。
> 证据来自本机安装的 Calibre 9.13 源码（`kovidgoyal/calibre`）+ 官方 changelog。
> 产品横向对比见 `product-survey.md`。

## 一、为什么不用写插件

| 判断 | 依据 |
| --- | --- |
| 阅读器内置 AI 已够用 | `src/calibre/gui2/viewer/llm.py`：词典面板有 "Ask AI" tab，对**选中文本**提问，带对话记忆 |
| 提示词可自定义 | `src/calibre/gui2/llm.py`：Quick actions 支持 Add / Edit / Remove，每条 = 名称 + 多行提示词模板；存 viewer prefs 键 `llm_quick_actions` |
| 选中文本可注入 | 模板里用 `{selected}` 占位符（9.11 起自由提问也支持） |
| 面板可记住停在 AI tab | `src/calibre/gui2/viewer/lookup.py`：`llm_lookup_tab_index` 持久化最后停留的 tab，下次自动恢复 |
| 结果可归档 | `Save this specific response as the note` 把回答存成该书笔记 |
| 自带书籍上下文 | 自动注入系统消息 `I am currently reading the book: <书名> by <作者>`（**只有书名，没有正文**） |
| 第三方 provider 可接 | `AIProviderPlugin`；9.8 起支持任意 OpenAI 兼容接口 |

**反过来说，写插件是错位的**：官方插件 API 里**没有给阅读器加 UI 的口子**（只有主界面的 Interface Action），而阅读发生在阅读器里。写出来的插件只能加在主界面，帮不上阅读时的忙。

## 二、配置步骤

### 步骤 1：接一个 AI provider

Calibre 的 AI 功能默认关闭，需要先接服务。在阅读器里点任意 AI 入口会弹出配置向导。

| 选项 | 端点 | 注意 |
| --- | --- | --- |
| 百炼 DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` | 国内直连、便宜（qwen3.8-flash）；**端点待实测确认** |
| B.AI | `https://api.b.ai/v1` | OpenAI 兼容；直连有 DNS 污染须走代理 7897——Calibre 无代理设置，不推荐 |
| kuaipao | `https://kuaipao.pro/v1` | OpenAI 兼容 |
| Ollama | 本地 | 免费离线；需先装模型 |

### 步骤 2：把 Ask AI 用一次（"无感"的关键）

面板会记住最后停留的 tab。**用一次 Ask AI 之后，选中文本时面板就直接开在 AI 上**，动作按钮就在眼前——不用再点第二次。

配合面板底部的 `Update on selection change`，选中什么就处理什么。

### 步骤 3：加四个 Quick action

阅读器 → AI 设置 → Quick actions → Add，逐条粘贴。**末尾的 `{selected}` 不能删**，它负责把选中文本塞进去。

**① 句子拆解**
```text
拆这一句：① 主句主干（主/谓/宾）② 每个从句、插入语挂在哪、修饰谁 ③ 省略成分补全。拆完先停，让我自己找一遍主干再给答案。{selected}
```

**② 词义解释**
```text
这个（些）词在句中是什么意思？给：① 中文释义 ② 若是熟词僻义，标出「常见义 ≠ 这里的义」 ③ 一个更常见的用法。不要展开词源。{selected}
```

**③ 语法解析**
```text
解析这句的语法结构，重点说：① 句子骨架 ② 容易读错的地方（插入语 / 省略 / 从句套嵌）③ 为什么这里用这个时态或语态。用中文说。{selected}
```

**④ 理解检验**
```text
用英文就这段内容问我 3 个问题，先只给问题。我答完你再用英文批改，指出我漏掉和误读的地方。{selected}
```

> 内置的 Explain / Summarize / Translate 可以**取消勾选**，避免误触——尤其 Translate，一点就出中文，正是我们要防的偷懒路径。

### 步骤 4：让结果沉淀下来

回答下方的 **Save this specific response as the note** 会把内容存成该书笔记。
笔记落在 Calibre 的 annotations 表里——`studio/projects/ai-collab-flow/` 已有读这张表的通道（7 本 1787 条），词卡和复盘**天然可导出**，不需要另建系统。

## 三、配置解决不了的三件事

1. **AI 不知道这本书的正文**——只注入书名 + 作者。要"固定语境下的语法解析"拿到前后文，得**按章喂**：读某章前把该章正文（约 1 万词）一次性贴进对话，之后选中段落时 AI 就有上下文了。不需要写插件。
2. **每日进度与断点**——Calibre 不管，先用 `notes/` 下的 markdown 记。
3. **词卡进 Anki**——需要在 annotations 之上加一层导出（复用 `frag-knowledge` 或 `ai-collab-flow` 的通道）。

## 四、方案对比

| 方案 | 内容 | 成本 | 判断 |
| --- | --- | --- | --- |
| **A 纯配置** | provider + 4 个 Quick action | 约 30 分钟 | **推荐先做** |
| B 配置 + 按章喂上下文 | A + 每章开头贴正文 | 每天多 1 分钟 | 需要时加 |
| C 配置 + 归档桥 | B + 从 annotations 导出词卡/复盘 | 1–2 天 | 用一周后再定 |
| D 自写插件 | 主界面 Interface Action | 数天 | 不推荐，形态错位 |

推荐路径：**A → 用一周 → 再决定要不要 C。**
