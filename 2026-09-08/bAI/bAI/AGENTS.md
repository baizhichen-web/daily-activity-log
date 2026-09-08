# LLM Wiki Schema

这是你的个人 LLM Wiki 知识库，基于 [Karpathy 的 LLM Wiki 理念](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)。

## 核心理念

知识在 ingest 时编译一次，然后持久维护——不是查询时临时推导。每次添加新来源，AI 更新相关页面、标注矛盾、加强链接，知识库越积累越丰富。

## 目录结构

```
bAI/                          ← Vault 根目录
├── raw/                     ← 素材收件箱（唯一入口，文件平铺，素材性质写在前置元数据）
│   └── _archive/           ← 已处理归档（ingest 成功后移入）
├── Clippings/              ← 网页剪藏收件箱（Obsidian Web Clipper 落点，规范化后进 raw/）
├── wiki/                    ← AI 编译的知识层
│   ├── concepts/           ← 抽象层：方法论、架构、第一性原理
│   ├── entities/           ← 实体层：人名、公司、工具、项目
│   ├── sources/            ← 摘要层：针对 raw 文件的核心观点提炼
│   ├── syntheses/          ← 综合层：深度研究报告
│   ├── index.md            ← 全局目录
│   └── log.md              ← 操作日志（倒序，最新在前）
├── AGENTS.md               ← 本文件
├── CLAUDE.md               ← Claude Code 自动加载钩子
└── workspace-docs.md       ← Obsidian 内规范导航索引（只放跳转链接，不复制规范内容）
```

> `.obsidian/`、`.claude/` 为 Obsidian / Claude Code 在本 vault 内的运行时目录，不入 git，不要删除。

## 页面格式

### wiki/sources/ 页面模板

```markdown
---
title: 来源标题
type: source
source_type: article | paper | transcript | note
date: YYYY-MM-DD
最近修改时间: YYYY-MM-DD
tags: [标签1, 标签2]
source_url: 原始链接（如有）
---

# 标题

## 一句话总结
（AI 对这条来源的核心理解）

## 关键摘录
> 原文摘录 1
> 原文摘录 2

## 我的反射
- 想法 1
- 想法 2

## 关联
- [[wiki/concepts/概念]] — 关联原因
- [[wiki/entities/实体]] — 关联原因

## 待深挖
- 还没理解的部分
```

### wiki/concepts/ 页面模板

```markdown
---
title: 概念名称
type: concept
tags: [标签]
date_created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---

# 概念名称

## 定义
（当前最佳理解，会随新来源更新）

## 关键来源
- [[wiki/sources/来源标题]] — 核心观点来源

## 相关概念
- [[wiki/concepts/相关概念]]

## 认知演变
- YYYY-MM-DD：初始理解（来源）
- YYYY-MM-DD：更新（因为新来源）
```

### wiki/entities/ 页面模板

```markdown
---
title: 实体名称
type: entity
entity_type: person | company | tool | project
tags: [标签]
---

# 实体名称

## 基本信息
（实体描述）

## 相关来源
- [[wiki/sources/来源标题]]

## 时间线
- YYYY-MM-DD：事件描述
```

## 核心规则

### 1. raw/ 是唯一入口

所有知识来源必须先进 raw/，再从 raw/ ingest 到 wiki/。不允许跳过 raw/ 直接写 wiki/。

来源包括：网页链接、论文、书籍、手机发来的可引用内容、风格参考。AI 收到后第一步是存到 raw/（平铺，不分子目录），第二步才是 ingest。

```
手机发消息/链接 → AI 存到 raw/ → ingest → wiki/ + index + log
```

```
网页剪藏（Obsidian Web Clipper）→ Clippings/ → AI 规范化（补 frontmatter / 按命名规范改名）→ raw/ → ingest → 原剪藏备份到 temp/archive/clippings/
```

灵感、想法、过程文档 → `notes/`（不是 raw/）

### 2. 写 wiki 必须同步 index

新增或删除 wiki 页面时，必须同时更新 index.md。不允许"页面存在但 index 不知道"。

**index.md 只用 Edit 锚点增量改，禁止 Write 全量重写**（2026-08-28 事故溯源：全量重写中途截断，303 行目录只剩 24 行，靠 git HEAD 恢复重建）。加一条 = 锚定相邻条目插入；大调整拆成多次小 Edit。改完 grep 抽查条目数与分类标题数，异常回退靠 `git checkout -- <file>`。

### 3. 收到可引用的原文内容时，反问不要总结

用户发来链接或文章时，禁止直接总结。先存到 raw/，读取内容，再用反问引导用户思考。总结给的是"知识幻觉"，反问才能引导真正的理解。

## 三种操作

### Ingest（消化）
1. 读取 raw/ 中的新来源
2. 分析核心观点
3. 在 wiki/ 中创建或更新页面
4. **更新 index.md**（必须）
5. 记录到 log.md
6. 将源文件移动到 _archive/

> 网页剪藏优先从 `Clippings/` 收件箱处理：用 `ops/scripts/clippings-ingest.ps1` 规范化为 raw/（命名 `YYYY-MM-DD-标题.md`、frontmatter 含 source_url/clipped_at），原剪藏备份到 `temp/archive/clippings/` 后走本流程。

### Query（查询）
1. **优先用 vault-search skill 语义检索**（dotMD，2026-08-24 上线；自然语言查询、秒级返回；用法见 `~/.agents/skills/vault-search/SKILL.md`）
2. index.md 浏览为辅（找分类/补全视角时用）
3. 综合生成回答，附带双链引用
4. 有价值的回答可以存为 wiki/syntheses/ 中的新页面
5. 大改动后记得增量更新索引：`dotmd index <vault>`（见 skill）

### Lint（健康检查）
- **扫描 wiki/ 目录，找出 index.md 里没有的页面，补上**（优先级最高）
- 检查断链、孤儿页面
- 检查新旧矛盾
- 发现值得深挖的方向

## 写作约定

- 使用 `[[双链]]` 连接 wiki 内部页面
- 使用 `![[嵌入]]` 嵌入图片或笔记片段
- 使用 `> [!note]` 等 callout 标注重要信息
- 每个来源至少关联 1 个已有概念或实体
- log.md 使用 `## [YYYY-MM-DD] 操作 | 标题` 格式，便于 grep
- **新增 wiki 页面时，必须在 index.md 对应分类下加一行双链条目**

## log.md 与 notes/ 的区分

| 文件 | 粒度 | 内容 | 格式 |
|------|------|------|------|
| `wiki/log.md` | 摘要（一行一条） | 操作记录（做了什么） | 按时间倒序（最新在前） |
| `notes/` | 详细（完整展开） | 过程文档（怎么做的、为什么） | 完整笔记结构 |

**规则**：
- log.md 只写摘要，不超过 5 行
- 详细过程写入 `notes/[日期]-[项目名]-notes.md`
- log 中用 `详细 → notes/xxx.md` 指向对应的详细笔记

## 关键约束

- raw/ 是只读的，ingest 后源文件移到 _archive/
- raw/ 的二进制原件（pdf/epub/图片）不入 git，走 Obsidian Sync；git 只跟踪文本与索引
- wiki/ 归 AI 写，人类主要负责阅读和指导方向
- 不确定时先问用户，不要擅自做重大决策
