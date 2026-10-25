# HISTORY.md — 中央美术学院 历史版（Wayback）与培养方案本体：已尝试的查询与失败原因

采集日期：2026-10-04。本文件只记录**已执行过的查询**与**观测到的现象**，不含推测。

---

## 1. 「培养方案」本体：中央美术学院信息公开网检索为 0 命中

| 项 | 值 |
|---|---|
| 检索端点 | http://xxgk.cafa.edu.cn/info/xxgk/search.html?keyword=培养方案 （GET，2026-10-04） |
| 现象 | HTTP 200，返回页 40,029 字节，条目列表 **0 条** |
| 同端点对照 | keyword=招生专业目录 → 7 条（2016/2017/2018 年硕士、博士招生专业目录）；keyword=课程 → 8 条（多为采购/出版类，仅 1 条为「全校研究生开设课程总门数…」）；keyword=硕士研究生招生 → 15 条 |
| 结论 | **✗ 信息公开网确认没有**「培养方案」条目 |

补充：全站条目分页接口为 POST http://xxgk.cafa.edu.cn/info/catePageContent （参数 id=<栏目ID>&currentPage=<页码>）。招生考试信息栏目（id=1591）总页数 52（页内变量 totalPage="52"）。本次检索到 2026 年与 2025 年「硕士研究生招生简章及专业目录」条目的 con 页（210020369 / 210019334）**正文只有标题、无附件、无跳转链接**。

---

## 2. 历史版：Wayback Machine 已尝试的查询与结果

### 2.1 域名级 CDX 查询

| 查询 | 结果 |
|---|---|
| http://web.archive.org/cdx/search/cdx?url=cafa.edu.cn&matchType=domain&output=json&collapse=urlkey&limit=8000 | 返回 8,000+ 行；host 直方图：www.cafa.edu.cn 7,999 行、cafa.edu.cn 1 行（**无 yz./yjs./yjsy. 等研究生院子域**） |
| 同上 + filter=mimetype:application/pdf | 多次重试后返回 0 行 / 空响应 |
| http://web.archive.org/cdx/search/cdx?url=xxgk.cafa.edu.cn&output=json&limit=40&collapse=timestamp:6 | 返回 2018-02-15 起多个时间点；2018-04 之后多为 statuscode=302 或 warc/revisit |
| http://web.archive.org/cdx/search/cdx?url=www.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/*&output=json&limit=40 | 返回空（LEN=0，重试后仍空） |
| 单点查询 url=www.cafa.edu.cn/st/2019/10119704f.htm | 返回 []（**无存档**） |

注：web.archive.org 在本机多次返回空响应（长度 0），重试 2–4 次后多数可成功；空响应记为通道抖动，不记为「无存档」。上表中标记为 [] 或明确行数的才作为结论。

### 2.2 已取到的快照与「快照不可用」判定

| 快照 | 完整 URL | 快照日期 | 落盘文件 | 判据 |
|---|---|---|---|---|
| xxgk.cafa.edu.cn 首页 | http://web.archive.org/web/20180215041008id_/http://xxgk.cafa.edu.cn/ | 2018-02-15 | 2018-0215-xxgk.cafa.edu.cn-信息公开网首页.html | HTTP 200，25,412 字节；机械检索「培养方案」0、「招生专业目录」0、「课程」0 → **快照不可用（正文为空）** |

### 2.3 已知但取不到的 2016–2018 年招生专业目录原件

2018 年硕士招生专业目录条目（发布页 http://xxgk.cafa.edu.cn/info/1582/210006662/con.html ）原挂三个 .doc 附件：

- http://xxgk.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103643542.doc （2018 年非全日制硕士研究生招生专业目录-专业学位）
- http://xxgk.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103738430.doc （2018 年全日制硕士研究生招生专业目录-学术型）
- http://xxgk.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103746499.doc （2018 年全日制硕士研究生招生专业目录-专业学位）

2026-10-04 实测（带代理 -x http://127.0.0.1:7897）：

| 尝试的 URL | 结果 |
|---|---|
| http://xxgk.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103643542.doc | HTTP 404 text/html 1,383 字节 |
| http://www.cafa.com.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103643542.doc | HTTP 404 text/html 1,163 字节 |
| http://www.cafa.edu.cn/2014xxgk/DynamicLibrary/DynamicPics/20171013103643542.doc | HTTP 000（https 跳转 + schannel 故障） |
| Wayback 对上述三个 .doc 的 URL 前缀查询 | 无存档 |

**结论：2018 年硕士招生专业目录 ✗ 原件已 404、✗ Wayback 无存档。** 历史版「招生专业目录」这一层，本校**未取到**。

---

## 3. 无法访问的域与已验证的通道边界

| 域 / URL | 尝试 | 现象 |
|---|---|---|
| https://www.cafa.edu.cn/ | web_fetch（2026-10-04，多次） | TypeError: fetch failed（全部失败） |
| http://www.cafa.edu.cn/ | curl 直连 / 带代理 | 302 → https，随后 000（本机 schannel `AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS`） |
| http://www.cafa.edu.cn/st/2026/80333631.htm （2026 研究生入学手册） | web_fetch / curl / Wayback SPN | web_fetch 失败；curl 000；SPN 返回 502 |
| http://web.archive.org/save/https://www.cafa.edu.cn/st/2026/80333631.htm | curl 带代理 | HTTP 502，0 字节（存档请求未完成） |
| http://xxgk.cafa.edu.cn/ （信息公开网） | curl 带代理（http） | **可用**（HTTP 200，30,227 字节）——本目录全部现行原件即由此取得 |

对照实验（证明 web_fetch 通道本身正常，非境外 IP 全封）：

| 目标 | 结果 |
|---|---|
| https://www.tongji.edu.cn/ | HTTP 200，100,000 字节 |
| https://www.tsinghua.edu.cn/ | HTTP 200，91,730 字节 |

---

## 4. 本次实际取得的历史时间点（用于纵向对比的「日期」）

| 报告年度 | 原件 URL | 原件落款/上线时间 | 抓取日期 |
|---|---|---|---|
| 2022 | http://xxgk.cafa.edu.cn/cafa//uploadFiles/uploadImgs//202504/03152712tcvm.pdf | 目录路径 `/202504/`（2025-04 上线），报告封面年度 2022 | 2026-10-04 |
| 2024 | http://xxgk.cafa.edu.cn/cafa//uploadFiles/uploadImgs//202504/03153028sn32.pdf | 目录路径 `/202504/`（2025-04 上线），报告封面年度 2024 | 2026-10-04 |
| 较早版课程门数条目 | http://xxgk.cafa.edu.cn/info/1582/210018240/con.html | 条目 ID 210018240（早于 210019458） | 2026-10-04 |
| 2023-2024 学年课程门数条目 | http://xxgk.cafa.edu.cn/info/1582/210019458/con.html | 条目 ID 210019458 | 2026-10-04 |

说明：本目录**没有**通过 Wayback 取得任何可用于课程层对比的历史快照。央美的「历史版」证据来自信息公开网上的**不同年度报告原件**（2022 版 vs 2024 版学位授权点建设年度报告；较早版 vs 2023-2024 课程门数条目），它们各自带有年度标识，可作纵向对比；但这**不是** Wayback 时间序列。

---

*本文件只记录事实与失败现象。任何判断由人类作出。*
