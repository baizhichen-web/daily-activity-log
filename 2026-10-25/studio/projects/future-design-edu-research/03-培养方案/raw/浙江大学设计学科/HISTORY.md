# HISTORY.md — 浙江大学设计学科 历史版获取记录

采集会话：DSH 线 C 子会话。查询执行日期：**2026-10-04**。
本文只记「查了什么、返回了什么、缺什么」，不含推测性补充。

---

## 1. 结论一句话

| 目标 | 状态 |
|---|---|
| 浙大设计学科**当前版**培养方案（课程层） | **到手**：软件学院《学生手册 2026.9》内 2026 级 085507 机械（工业设计工程）全日制硕士培养方案（含 21 行课程表）。见 SOURCES.txt A1/A6。 |
| 浙大设计学科**历史版**培养方案 | **部分到手**：2013 级、2014 级 130500 设计学硕士培养方案，但**来源为第三方考研站转载，非官网原件、非 Wayback 快照**。见 SOURCES.txt B1/B2/B3。 |
| **设计学（1305）学术学位硕士 当前版**培养方案 | **未到手（?）** |
| **2015–2025 年间**任一版培养方案 | **未到手（?）** |
| 浙大官网 / Wayback 上的**官方原件**（任何年份） | **未到手（?）** |

> 记号约定：**到手** = 有本地原件可点回；**未到手（?）** = 查过但没查到；**✗** = 确认没有。

---

## 2. 已尝试的查询与结果（逐条）

### 2.1 Wayback CDX 查询

通道：curl.exe + 代理 http://127.0.0.1:7897，matchType=domain 必加。

| # | 查询 | 返回 | 关键词命中 |
|---|---|---|---|
| 1 | url=cst.zju.edu.cn，matchType=domain，collapse=urlkey，limit=8000 | 8,000 行（**limit 打满**，非全量） | grep 培养方案/工业设计/设计学 → 仅 4 条，全部指向 http://www.cst.zju.edu.cn/工业设计工程（专业学位） 及其 main.psp，快照日期 **2025-12-28** |
| 2 | url=grs.zju.edu.cn，matchType=domain，collapse=urlkey，limit=8000 | 多次返回空（archive.org 间歇性）；一次成功但 8,000 行打满 | grep 培养方案/pyfa → **0 命中** |
| 3 | url=design.zju.edu.cn，matchType=domain，collapse=urlkey，limit=10000 | 562 行 | grep 培养方案/课程/方案 → **0 命中** |
| 4 | url=design.zju.edu.cn，同上 + from=2017&to=2023 | 201 行 | 2017–2020 **无任何快照**；最早为 2021-08/09（/bridge/、/ictd、/main-en/、robots.txt） |
| 5 | url=cst.zju.edu.cn，同上 + from=2017&to=2023 | 3,695 行 | 命中项绝大多数为 2006–2012 年旧新闻页（/YYYY/MMDD/cNNNNNaNNNNNNN/page.htm 形式），**未见培养方案页** |

> design.zju.edu.cn 的 562 行里存在的较早快照：2005-03-11（http://www.design.zju.edu.cn/ 及 /chinese/、/english/、/heka.htm）、2009-04-30（/chinese/content.asp?id=… 等 ASP 页）、2011-04-28（/index.php）、2012-03-09～2012-04-17（/redir.php?catalog_id=… 系列）。

### 2.2 Wayback 快照抓取（web/ 端点）

指令格式：curl.exe -s -x http://127.0.0.1:7897 -L http://web.archive.org/web/快照日期/原URL -o 本地文件

| # | 目标快照 | 结果 |
|---|---|---|
| 1 | 20050311180520 / http://www.design.zju.edu.cn/ | **HTTP 502 ×3 次重试**，0 字节 → 未取到 |
| 2 | 20050311203332 / http://www.design.zju.edu.cn:80/chinese/ | **HTTP 502 ×3 次重试**，0 字节 → 未取到 |
| 3 | 20120309183610 / http://www.design.zju.edu.cn:80/redir.php?catalog_id=10 | 第 3 次重试得 **HTTP 200 / 25,249 字节**；但按 GBK 解码后 title = **浙江大学能源工程学系**，正文为该系科研通知——该 URL 下 Wayback 所存内容**不是设计学科页面**（域名复用 / CMS 站点串号）。文件已删除。 |
| 4 | 20170212191649 / http://www.cst.zju.edu.cn/ | **HTTP 502 ×3 次重试**，0 字节 → 未取到 |
| 5 | 20251228161903 / http://www.cst.zju.edu.cn/工业设计工程（专业学位） | **HTTP 200 / 4,468 字节**，但正文 = 「提示：访问地址无效，工业设计工程（专业学位）找不到对应的栏目！」——快照本身即一个已删除栏目页。文件已删除。 |

> 事实层说明：archive.org 的 web/ 快照端点在本次采集时段内高频返回 HTTP 502，与 CDX 端点（正常）表现不同；已按规范重试 3 次。

### 2.3 官网直查（非 Wayback）

| # | 查询 | 结果 |
|---|---|---|
| 1 | https://design.zju.edu.cn/（web_fetch） | HTTP 200。站内仅 13 个外链，**无培养方案栏目**；为聚合落地页。 |
| 2 | http://www.grs.zju.edu.cn/（web_fetch） | **失败**（TypeError: fetch failed，重试仍失败）。改用 Node fetch → HTTP 200 / 50,992 字节。 |
| 3 | grs.zju.edu.cn 首页导航逐项 | 一级栏目为：简介 / 导师及学科建设 / 奖学金及资助 / 招生信息 / **培养过程及管理** / 学位申请及规范 / 专业学位 / 研究生教育研究中心。「培养过程及管理」子项为：日常教学管理、学籍管理、过程管理、网上课程、对外交流、各类证明管理、交叉人才培养——**无「培养方案」栏目名**。 |
| 4 | https://grs.zju.edu.cn/、https://www.grs.zju.edu.cn/、https://grs.zju.edu.cn/redir.php?catalog_id=100（web_fetch） | 均**失败**（fetch failed）；http://grs.zju.edu.cn/ 返回 cross-origin redirect 提示 → https://www.grs.zju.edu.cn |
| 5 | https://yjsy.zju.edu.cn/（web_fetch） | HTTP 200，但页面为「研究生教育管理信息系统」前端（#app 空壳，需登录）。**未尝试登录**。 |
| 6 | https://yz.zju.edu.cn/ | DNS 解析失败（getaddrinfo ENOTFOUND） |
| 7 | https://design.zju.edu.cn/wp-sitemap.xml、/sitemap.xml、/main-en/ | 均 HTTP 404 |
| 8 | https://design.zju.edu.cn/wp-json/wp/v2/pages?per_page=100 | HTTP 404（REST API 未开放） |

### 2.4 检索定位（web_search）后回原站核对

| # | 线索 | 回站核对结果 |
|---|---|---|
| 1 | 搜索结果给出 school.freekaoyan.com 两页「浙江大学2013/2014级130500设计学硕士培养方案」 | 两页均 **HTTP 200**，内容为完整方案表（含课程表）。**已落盘**（SOURCES.txt B1/B2）。 |
| 2 | 搜索结果给出多份 *.zju.edu.cn/_upload/article/files/.../*.pdf 培养方案 | 逐条验证：pi.zju.edu.cn 3 份（NGICS / 汽车工程及其智能化 / 先进材料与高端制造 卓越培养项目）、www.cec.zju.edu.cn 1 份、www.som.zju.edu.cn 1 份——**均为非设计学科项目**，未采用。 |
| 3 | 搜索结果给出 http://www.cst.zju.edu.cn/_upload/article/files/ee/ee/…/67d99852-….pdf | **HTTP 200 / 10,934,010 字节**，即《浙江大学软件学院 学生手册 2026.9》，**已落盘为本次核心原件**。 |
| 4 | 搜索结果给出 http://www.grs.zju.edu.cn/_upload/article/files/58/fc/…/1a1a0bbd-….pdf | **HTTP 200 / 258,021 字节**，为 2022 年浙大研究生培养工作规定汇编，**已落盘**。 |

---

## 3. 明确的缺口（? = 查过没查到；✗ = 确认没有）

| 缺口 | 记号 | 依据 |
|---|---|---|
| 浙江大学**设计学（1305）学术学位硕士**当前版培养方案（含课程表） | **?** | 官网栏目无培养方案入口；Wayback CDX 对 cst / grs / design 三域均 0 命中「培养方案」；相关系统需登录，未绕登录态 |
| 浙江大学官方发布的**任意年份**设计类培养方案原件 | **?** | 同上；本次唯一官方向原件为 2026 年（软件学院，工业设计工程领域） |
| 2015–2025 年间设计类培养方案 | **?** | CDX 窗口内无命中 |
| 2026 级**设计学学术学位**方案（若存在） | **?** | 未在已得 PDF 内出现 |
| Wayback 上设计学科的**任何**官方快照 | **?** | 见 2.2；唯一成功抓取的快照内容为其它院系 |
| 设计类培养方案**确认不存在于官网公开层** | 不足以判定 | 只能说明「本次未在公开栏目与 Wayback 找到」，不足以判定「确认没有」 |

---

## 4. 本记录未做的事

- 未尝试登录 yjsy.zju.edu.cn 研究生教育管理信息系统（属需登录内容，按项目红线不做）。
- 未爬取整站（仅单页/单份 PDF）。
- 未使用推测填补任何年份的方案内容。

---

*本文件为查询过程记录，只写「查了什么 / 返回什么」，判断留给人类。*
