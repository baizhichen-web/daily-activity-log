# MIT 设计 / 媒体艺术类研究生培养方案 · 结构化提取（纯数据层）

> 本轮采集对象：Massachusetts Institute of Technology，Media Arts and Sciences（MAS，课程号前置 `MAS.`）与 School of Architecture + Planning 下的设计/媒体类研究生层。
> 抓取日期：2026-10-04（原件与登记见同目录 SOURCES.txt）。
> 本文只列原文事实与机械计数，不含「这说明/因此/缺口/建议」类句子。

---

## 1. 来源块

| # | 原件文件 | 原始 URL | 类型 | 快照日期（Wayback） | 抓取日期 |
|---|---|---|---|---|---|
| S1 | mit-catalog-media-arts-sciences.html | https://catalog.mit.edu/schools/architecture-planning/media-arts-sciences/ | HTML（catalog 院系页，含学位要求原文） | —（当前版） | 2026-10-04 |
| S2 | mit-catalog-subjects-mas.html | https://catalog.mit.edu/subjects/mas/ | HTML（MAS 全量课程条目） | —（当前版） | 2026-10-04 |
| S3 | mit-catalog-master-art-culture-technology.html | https://catalog.mit.edu/degree-charts/master-art-culture-technology/ | HTML（SMACT 学位图） | —（当前版） | 2026-10-04 |
| S4 | mit-catalog-system-design-management.html | https://catalog.mit.edu/interdisciplinary/graduate-programs/system-design-management/ | HTML（SDM 跨学科项目页） | —（当前版） | 2026-10-04 |
| S5 | mit-medialab-graduate-program.html | https://www.media.mit.edu/graduate-program/ | HTML（Media Lab 研究生项目页，挂学期课程表） | —（当前版） | 2026-10-04 |
| S6 | mit-medialab-about-mas.html | https://www.media.mit.edu/graduate-program/about-media-arts-sciences/ | HTML（方向/项目介绍） | —（当前版） | 2026-10-04 |
| S7 | mit-medialab-fall2026-course-list.html | https://www.media.mit.edu/posts/fall-2026-media-arts-and-sciences-course-list/ | HTML（2026 秋学期 MAS 课表） | —（当前版） | 2026-10-04 |
| S8 | mit-medialab-spring2026-course-list.html | https://www.media.mit.edu/posts/spring-2026-media-arts-and-sciences-course-list/ | HTML（2026 春学期 MAS 课表） | —（当前版） | 2026-10-04 |
| S9 | mit-medialab-fall2025-course-list.html | https://www.media.mit.edu/posts/fall-2025-media-arts-and-sciences-course-list/ | HTML（2025 秋学期 MAS 课表） | —（当前版） | 2026-10-04 |
| S10 | mit-medialab-fall2024-course-list.html | https://www.media.mit.edu/posts/fall-2024-media-arts-and-sciences-course-list/ | HTML（2024 秋学期 MAS 课表） | —（当前版） | 2026-10-04 |
| S11 | mit-medialab-fall2023-course-list.html | https://www.media.mit.edu/posts/fall-2023-media-arts-and-sciences-course-list/ | HTML（2023 秋学期 MAS 课表） | —（当前版） | 2026-10-04 |
| S12 | mit-medialab-fall2018-course-list.html | https://www.media.mit.edu/posts/fall-2018-mas-course-list/ | HTML（2018 秋课表；正文为空壳，MAS. 命中 0） | —（当前版） | 2026-10-04 |
| H1 | wayback-2019-2020-mit-mas-school-page.html | http://catalog.mit.edu/archive/2019-2020/schools/architecture-planning/media-arts-sciences/ | HTML（2019-2020 学年归档院系页 + 全量课程条目） | 2021-12-16 | 2026-10-04 |
| H2 | wayback-2019-2020-mit-mas-school-page.txt | 同上（H1 的纯文本副产品） | TXT | 2021-12-16 | 2026-10-04 |

> 注：`catalog.mit.edu` 的学年归档路径为 `/archive/<学年>/...`；CDX 可检索到 2015-2016 起多个学年，本次只取 2019-2020 一个时间点（已尝试查询见 HISTORY.md）。

---

## 2. 结构表

### 2.1 学位与在学要求（S1 当前版 vs H1 归档版）

| 字段 | 当前版（2026-10-04） | 2019-2020 归档版（H1，快照 2021-12-16） |
|---|---|---|
| 学位 | SM in Media Arts and Sciences；PhD in Media Arts and Sciences | 同 |
| 在学学期 | "at least four terms in residence (one of which may be a summer term)" | "at least four terms in residence (one of which may be a summer term)" |
| 学分/单元 | "a 66-unit program of study and a satisfactory research thesis" | 归档版原文**未出现**「66-unit」字样；只有 "complete a satisfactory research thesis" |
| 课程清单 | 无「课程表」式清单；学位要求只指向 Institute General Degree Requirements | 同 |
| PhD 要求 | "successful completion of MAS general exams, and successful completion and defense of a dissertation" | 同 |

### 2.2 学位图（Degree Charts）可选项

| 学位图 | URL | 本次是否逐行提取 |
|---|---|---|
| Master of Science in Art, Culture and Technology (SMACT) | https://catalog.mit.edu/degree-charts/master-art-culture-technology/ | 原件已存，未逐行提取 |
| Master of Architecture / SMArchS / Master of City Planning | https://catalog.mit.edu/degree-charts/ | 未取 |
| System Design and Management (SDM, SM) | https://catalog.mit.edu/interdisciplinary/graduate-programs/system-design-management/ | 原件已存，未逐行提取 |
| Master of Design | **✗ 不存在**：`https://catalog.mit.edu/degree-charts/master-design/` 2026-10-04 实测返回 404 | — |

### 2.3 课程供给规模（S5 原文）

> "MAS offers approximately 30 graduate courses and several undergraduate subjects."

---

## 3. 课程逐项清单

### 3.1 当前版 MAS 研究生层条目（S2，共 55 条）

> 课名照抄原文；units 为原文 "a-b-c units"（a=课堂、b=实验/设计、c=自学）。等级 U=本科、G=研究生、U/G=两者皆可。

| 课程号 | 课名（原文） | units | 开课学期 | 等级 |
|---|---|---|---|---|
| MAS.552 | City Science | 3-0-9 units | Fall, Spring | G |
| MAS.600 | Human 2.0 | 0-9-0 units | Spring | G |
| MAS.630 | Advanced Seminar: Affective Computing and Ethics | 2-0-10 units | Fall | G |
| MAS.660 | Cybersecurity | — | — | — |
| MAS.664 | AI for Impact: Solving Societal-Scale Problems | 3-0-6 units | Spring | G |
| MAS.665 | Foundations of AI Ventures | 3-0-9 units | Fall | G |
| MAS.690 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.712 | Learning Creative Learning | 3-0-9 units | Spring | G |
| MAS.745 | Next-Generation Nanoelectronics and Biotechnology | 2-0-10 units | Fall | G |
| MAS.750 | Human-Robot Interaction | 2-0-7 units | Fall | G |
| MAS.771 | Autism Theory and Technology | 2-0-10 units | Spring | G |
| MAS.772 | AI for Mental Health | Units arranged | Spring | G |
| MAS.790 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.808 | Decoders 2.0: Microfabricated Devices | 3-0-6 units | Fall | G |
| MAS.809 | Decoders 1.9: Introduction to Microfabrication | 3-6-3 units | Fall | G |
| MAS.810 | Decoders 1.8: Project Realization in Cleanroom | — | — | — |
| MAS.825 | Musical Aesthetics and Media Technology | 3-3-6 units | Fall | G |
| MAS.826 | Projects in Media and Music | — | — | — |
| MAS.834 | Tangible Interfaces | 3-3-6 units | Fall | G |
| MAS.836 | Sensor Technologies for Interactive Environments | 3-3-6 units | Spring | G |
| MAS.837 | Principles of Electronic Music Interfaces | 3-0-9 units | Spring | G |
| MAS.838 | Prototyping our Sci-Fi Space Future: Designing & Deploying Projects for Zero Gravity Flights (New) | 2-2-8 units | Fall | G |
| MAS.839 | Operating in the Lunar Environment | 2-2-8 units | Spring | G |
| MAS.841 | Evolution: Natural and Directed | 3-0-9 units | Spring | G |
| MAS.842 | Safeguarding the Future | — | — | — |
| MAS.858 | Asking How Space Enabled Designs Advance Justice and Development | 3-0-9 units | Fall | G |
| MAS.859 | Space Technology for the Development Leader | 3-0-3 units | Spring | G |
| MAS.862 | The Physics of Information Technology | 3-0-9 units | Spring | G |
| MAS.863 | How to Make (Almost) Anything | 3-9-6 units | Fall | G |
| MAS.864 | The Nature of Mathematical Modeling | 3-0-9 units | Spring | G |
| MAS.865 | Rapid-Prototyping of Rapid-Prototyping Machines: How to Make Something that Makes (Almost) Anything | — | — | — |
| MAS.881 | Principles of Neuroengineering | 3-0-9 units | Fall | G |
| MAS.883 | Revolutionary Ventures: How to Invent and Deploy Transformative Technologies | 2-0-7 units | Fall | G |
| MAS.885 | How To Grow (Almost) Anything | 3-0-9 units | Spring | G |
| MAS.890 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.910 | Research in Media Technology | Units arranged | Fall, Spring, Summer | G |
| MAS.912 | Teaching in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.914 | Practical Experience in Media Arts and Sciences | 0-1-0 units | Fall, Spring, Summer | G |
| MAS.915 | Practical Experience in Media Arts and Sciences | 0-1-0 units | Fall, IAP, Spring, Summer | G |
| MAS.921 | Proseminar in Media Arts and Sciences | 3-0-9 units | Fall | G |
| MAS.940 | Preparation for SM Thesis I | 1-0-2 units | Spring | G |
| MAS.941 | Preparation for SM Thesis II | — | — | — |
| MAS.945 | Media Arts and Sciences General Exam | 0-12-0 units | Fall, IAP, Spring, Summer | G |
| MAS.950 | Preparation for Ph.D. Thesis | Units arranged | Fall, IAP, Spring, Summer | G |
| MAS.S60 | -MAS.S64 Special Subject in Media Technology | Units arranged | Fall, Spring | G |
| MAS.S65 | -MAS.S69 Special Subject in Media Technology | Units arranged | Fall, Spring | G |
| MAS.S70 | Special Subject in Media Technology | Units arranged | Fall, Spring | G |
| MAS.S71 | Special Subject in Media Technology | Units arranged | Fall, IAP, Spring | G |
| MAS.S72 | Special Subject in Media Technology | Units arranged | Fall, Spring; second half of term | G |
| MAS.S73 | Special Subject in Media Technology | Units arranged | IAP | G |
| MAS.S74 | Special Subject in Media Technology | Units arranged | Fall, Spring; first half of term | G |
| MAS.S75 | Special Subject in Media Technology | Units arranged | Fall, Spring; second half of term | G |
| MAS.S76 | Special Subject in Media Arts and Sciences | Units arranged | IAP | G |
| MAS.S90 | Special Subject in Media Arts and Sciences | Units arranged | Fall; partial term | G |
| MAS.THG | Graduate Thesis | Units arranged | Fall, IAP, Spring, Summer | G |

### 3.2 当前版 MAS 本科层条目（S2，共 8 条，仅登记不展开判断）

| 课程号 | 课名（原文） | units | 开课学期 | 等级 |
|---|---|---|---|---|
| MAS.342 | Safeguarding the Future | — | — | — |
| MAS.453 | Mobile and Sensor Computing | 3-0-9 units | Spring | U |
| MAS.460 | Cybersecurity | — | — | — |
| MAS.490 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | U |
| MAS.491 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | U |
| MAS.UR | Undergraduate Research in Media Arts and Sciences | Units arranged | Fall, IAP, Spring, Summer | U |
| MAS.URG | Undergraduate Research in Media Arts and Sciences | Units arranged | Fall, IAP, Spring, Summer | U |
| MAS.S10 | Special Subject in Media Technology | Units arranged | Fall, Spring | U |

### 3.3 2019-2020 归档版 MAS 研究生层条目（H1，共 58 条）

| 课程号 | 课名（原文） | units | 开课学期 | 等级 |
|---|---|---|---|---|
| MAS.531 | Computational Camera and Photography | — | — | — |
| MAS.532 | Mathematical Methods in Imaging | — | — | — |
| MAS.533 | Imaging Ventures: Cameras, Displays, and Visual Computing | 2-0-7 units | Spring | G |
| MAS.534 | Engineering Health: Understanding and Designing Affordable Health Diagnostics | 3-1-8 units | Fall | G |
| MAS.535 | Engineering Health: Designing and Deploying Affordable Health Diagnostics and Therapeutics | 6-0-0 units | Spring | G |
| MAS.552 | City Science | 3-0-9 units | Fall, Spring | G |
| MAS.600 | Human 2.0 | 0-9-0 units | Spring | G |
| MAS.622 | Pattern Recognition and Analysis | 3-0-9 units | Fall | G |
| MAS.630 | Advanced Seminar: Affective Computing | 2-0-10 units | Fall | G |
| MAS.664 | Media Ventures | 3-0-6 units | Spring | G |
| MAS.665 | Development Ventures | 3-0-9 units | Fall | G |
| MAS.677 | Objectification: How to Write (and Talk, and Think) about Objects | — | — | — |
| MAS.690 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.700 | News and Participatory Media | 3-0-9 units | Spring | G |
| MAS.712 | Learning Creative Learning | 1-0-5 units | Spring; first half of term | G |
| MAS.713 | Projects in Creative Learning (New) | — | — | — |
| MAS.720 | Scalable Civic Action (New) | 2-1-3 units | Fall | G |
| MAS.750 | Human-Robot Interaction | 2-0-7 units | Fall | G |
| MAS.756 | Principles of Awareness | 0-9-0 units | Spring | G |
| MAS.771 | Autism Theory and Technology | 2-0-10 units | Spring | G |
| MAS.784 | Data Storytelling Studio | 3-0-9 units | Spring | G |
| MAS.790 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.808 | Decoders 1.0: Microfabricated Devices | 3-0-6 units | Spring | G |
| MAS.809 | Decoders 1.3: Introduction to Microfabrication | 3-6-3 units | Fall | G |
| MAS.810 | Decoders 1.2: Project Realization in Cleanroom | — | — | — |
| MAS.825 | Musical Aesthetics and Media Technology | 3-3-6 units | Fall | G |
| MAS.826 | Projects in Media and Music | — | — | — |
| MAS.834 | Tangible Interfaces | 3-3-6 units | Fall | G |
| MAS.836 | Sensor Technologies for Interactive Environments | 3-3-6 units | Spring | G |
| MAS.837 | Principles of Electronic Music Interfaces | 3-0-9 units | Fall | G |
| MAS.841 | Evolution: Natural and Directed | 3-0-9 units | Spring | G |
| MAS.858 | Asking How Space Enabled Designs Advance Justice and Development (New) | 3-0-9 units | Fall | G |
| MAS.859 | Space Technology for the Development Leader (New) | 3-0-3 units | Spring | G |
| MAS.862 | The Physics of Information Technology | 3-0-9 units | Spring | G |
| MAS.863 | How to Make (Almost) Anything | 3-9-6 units | Fall | G |
| MAS.864 | The Nature of Mathematical Modeling | 3-0-9 units | Spring | G |
| MAS.865 | Rapid-Prototyping of Rapid-Prototyping Machines: How to Make Something that Makes (Almost) Anything | — | — | — |
| MAS.881 | Principles of Neuroengineering | 3-0-9 units | Fall | G |
| MAS.883 | Revolutionary Ventures: How to Invent and Deploy Transformative Technologies | 2-0-7 units | Fall | G |
| MAS.890 | Independent Study in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.910 | Research in Media Technology | Units arranged | Fall, Spring, Summer | G |
| MAS.912 | Teaching in Media Arts and Sciences | Units arranged | Fall, Spring | G |
| MAS.914 | Practical Experience in Media Arts and Sciences | 0-1-0 units | Fall, Spring, Summer | G |
| MAS.915 | Practical Experience in Media Arts and Sciences | 0-1-0 units | Fall, Spring, Summer | G |
| MAS.921 | Proseminar in Media Arts and Sciences | 3-0-9 units | Fall | G |
| MAS.940 | Preparation for SM Thesis | 2-0-10 units | Fall, Spring | G |
| MAS.945 | Media Arts and Sciences General Exam | 0-12-0 units | Fall, IAP, Spring, Summer | G |
| MAS.950 | Preparation for Ph.D. Thesis | Units arranged | Fall, Spring, Summer | G |
| MAS.S60 | -MAS.S64 Special Subject in Media Technology | Units arranged | Fall, Spring | G |
| MAS.S65 | -MAS.S69 Special Subject in Media Technology | Units arranged | Fall, IAP, Spring | G |
| MAS.S70 | Special Subject in Media Technology | Units arranged | Fall, Spring | G |
| MAS.S71 | Special Subject in Media Technology | Units arranged | Fall, Spring; first half of term | G |
| MAS.S72 | Special Subject in Media Technology | Units arranged | Fall, Spring; second half of term | G |
| MAS.S73 | Special Subject in Media Technology | Units arranged | Fall, IAP, Spring | G |
| MAS.S74 | Special Subject in Media Technology | Units arranged | Fall, Spring; first half of term | G |
| MAS.S75 | Special Subject in Media Technology | Units arranged | Fall, Spring; second half of term | G |
| MAS.S76 | Special Subject in Media Arts and Sciences (New) | Units arranged | Fall, Spring | G |
| MAS.THG | Graduate Thesis | Units arranged | Fall, IAP, Spring, Summer | G |

### 3.4 学期课表（Media Lab 学期清单 S7，课名照抄原文）—— 2026 秋季

| 课程号 | 课名（原文） | units（原文括号内） | 教师（原文） |
|---|---|---|---|
| MAS.863J | How to Make (Almost) Anything | 3 9 6 | Gershenfeld |
| MAS.881J | Principles of Neuroengineering | 3 0 9 | Boyden |
| MAS.883J | Revolutionary Ventures: How to Invent and Deploy Transformative Technologies | 2 0 7 | Boyden/Jacobson/Bonsen |
| MAS.921* | Proseminar in Media Arts and Sciences | 3 0 9 | Karahalios |
| MAS.941* | Preparation for SM Thesis II | 3 0 6 | Breazeal/Pataranutaporn |
| MAS.S60 | AI Agents for Cognitive Augmentation | 2 0 10 | Maes/Danry |
| MAS.S61 | Drawing ++ | 2 0 7 | Lieberman |
| MAS.S62 | How to AI an AI for (Almost) Anything | 2 0 10 | Liang |
| MAS.S63 | Critical Matter: Body, Emotion, and Material Intelligence | 3 0 9 | Farahi |
| MAS.S64 | Wireless & Physical AI: Mobile, Multimodal, and Spatial Perception | 2 0 10 | Adib |
| MAS.S65 | How to BioManufacture (Almost) Anything | 2 0 7 | Kong/Jacobson/Church |
| MAS.S70 | ultra low-power systems design | 2 2 2 | Feldmeier |
| MAS.S90* | Intro to MAS | 0 3 0 | Paradiso |

> 原文脚注（照抄）：`* indicates subject limited to students enrolled in the MAS program`

2026 春（S8）、2025 秋（S9）、2024 秋（S10）、2023 秋（S11）原件已存，未逐行提取；2018 秋（S12）页面正文为空壳，**未取到内容**（≠ 确认没有该课表）。

---

## 4. 机械计数（分母 = 研究生层条目数）

### 4.1 当前版（S2，分母 55 条研究生层课名）

| 关键词（正则） | 命中课名数 | 命中课程号与课名 |
|---|---|---|
| AI / Artificial Intelligence / Machine Learning | 3 | MAS.664 AI for Impact: Solving Societal-Scale Problems；MAS.665 Foundations of AI Ventures；MAS.772 AI for Mental Health |
| Data / Analytics | 0 | — |
| Health / Bio / Neuro | 4 | MAS.745 Next-Generation Nanoelectronics and Biotechnology；MAS.771 Autism Theory and Technology；MAS.772 AI for Mental Health；MAS.881 Principles of Neuroengineering |
| Robot / Robot Interaction | 1 | MAS.750 Human-Robot Interaction |
| Design / Making / Prototyp / Fabricat / Manufactur | 6 | MAS.808 Decoders 2.0: Microfabricated Devices；MAS.809 Decoders 1.9: Introduction to Microfabrication；MAS.838 Prototyping our Sci-Fi Space Future: Designing & Deploying Projects for Zero Gravity Flights (New)；MAS.858 Asking How Space Enabled Designs Advance Justice and Development；MAS.863 How to Make (Almost) Anything；MAS.865 Rapid-Prototyping of Rapid-Prototyping Machines: How to Make Something that Makes (Almost) Anything |
| Music / Audio / Sound | 3 | MAS.825 Musical Aesthetics and Media Technology；MAS.826 Projects in Media and Music；MAS.837 Principles of Electronic Music Interfaces |
| Learning / Education | 2 | MAS.712 Learning Creative Learning；MAS.912 Teaching in Media Arts and Sciences |
| Media / Communication / Storytelling | 21 | MAS.690 Independent Study in Media Arts and Sciences；MAS.790 Independent Study in Media Arts and Sciences；MAS.825 Musical Aesthetics and Media Technology；MAS.826 Projects in Media and Music；MAS.890 Independent Study in Media Arts and Sciences；MAS.910 Research in Media Technology；MAS.912 Teaching in Media Arts and Sciences；MAS.914 Practical Experience in Media Arts and Sciences；MAS.915 Practical Experience in Media Arts and Sciences；MAS.921 Proseminar in Media Arts and Sciences；MAS.945 Media Arts and Sciences General Exam；MAS.S60 -MAS.S64 Special Subject in Media Technology；MAS.S65 -MAS.S69 Special Subject in Media Technology；MAS.S70 Special Subject in Media Technology；MAS.S71 Special Subject in Media Technology；MAS.S72 Special Subject in Media Technology；MAS.S73 Special Subject in Media Technology；MAS.S74 Special Subject in Media Technology；MAS.S75 Special Subject in Media Technology；MAS.S76 Special Subject in Media Arts and Sciences；MAS.S90 Special Subject in Media Arts and Sciences |
| Space | 4 | MAS.838 Prototyping our Sci-Fi Space Future: Designing & Deploying Projects for Zero Gravity Flights (New)；MAS.839 Operating in the Lunar Environment；MAS.858 Asking How Space Enabled Designs Advance Justice and Development；MAS.859 Space Technology for the Development Leader |
| Ethics / Society / Justice / Policy | 3 | MAS.630 Advanced Seminar: Affective Computing and Ethics；MAS.664 AI for Impact: Solving Societal-Scale Problems；MAS.858 Asking How Space Enabled Designs Advance Justice and Development |
| Venture / Entrepreneurship | 2 | MAS.665 Foundations of AI Ventures；MAS.883 Revolutionary Ventures: How to Invent and Deploy Transformative Technologies |
| Interface / Interaction / HCI | 3 | MAS.750 Human-Robot Interaction；MAS.834 Tangible Interfaces；MAS.837 Principles of Electronic Music Interfaces |
| Imaging / Camera / Vision | 0 | — |
| Thesis / Research / Seminar / Exam (administrative) | 13 | MAS.630 Advanced Seminar: Affective Computing and Ethics；MAS.690 Independent Study in Media Arts and Sciences；MAS.790 Independent Study in Media Arts and Sciences；MAS.890 Independent Study in Media Arts and Sciences；MAS.910 Research in Media Technology；MAS.914 Practical Experience in Media Arts and Sciences；MAS.915 Practical Experience in Media Arts and Sciences；MAS.921 Proseminar in Media Arts and Sciences；MAS.940 Preparation for SM Thesis I；MAS.941 Preparation for SM Thesis II；MAS.945 Media Arts and Sciences General Exam；MAS.950 Preparation for Ph.D. Thesis；MAS.THG Graduate Thesis |

### 4.2 2019-2020 归档版（H1，分母 58 条研究生层课名）

| 关键词（正则） | 命中课名数 | 命中课程号与课名 |
|---|---|---|
| AI / Artificial Intelligence / Machine Learning | 0 | — |
| Data / Analytics | 1 | MAS.784 Data Storytelling Studio |
| Health / Bio / Neuro | 4 | MAS.534 Engineering Health: Understanding and Designing Affordable Health Diagnostics；MAS.535 Engineering Health: Designing and Deploying Affordable Health Diagnostics and Therapeutics；MAS.771 Autism Theory and Technology；MAS.881 Principles of Neuroengineering |
| Robot / Robot Interaction | 1 | MAS.750 Human-Robot Interaction |
| Design / Making / Prototyp / Fabricat / Manufactur | 7 | MAS.534 Engineering Health: Understanding and Designing Affordable Health Diagnostics；MAS.535 Engineering Health: Designing and Deploying Affordable Health Diagnostics and Therapeutics；MAS.808 Decoders 1.0: Microfabricated Devices；MAS.809 Decoders 1.3: Introduction to Microfabrication；MAS.858 Asking How Space Enabled Designs Advance Justice and Development (New)；MAS.863 How to Make (Almost) Anything；MAS.865 Rapid-Prototyping of Rapid-Prototyping Machines: How to Make Something that Makes (Almost) Anything |
| Music / Audio / Sound | 3 | MAS.825 Musical Aesthetics and Media Technology；MAS.826 Projects in Media and Music；MAS.837 Principles of Electronic Music Interfaces |
| Learning / Education | 3 | MAS.712 Learning Creative Learning；MAS.713 Projects in Creative Learning (New)；MAS.912 Teaching in Media Arts and Sciences |
| Media / Communication / Storytelling | 23 | MAS.664 Media Ventures；MAS.690 Independent Study in Media Arts and Sciences；MAS.700 News and Participatory Media；MAS.784 Data Storytelling Studio；MAS.790 Independent Study in Media Arts and Sciences；MAS.825 Musical Aesthetics and Media Technology；MAS.826 Projects in Media and Music；MAS.890 Independent Study in Media Arts and Sciences；MAS.910 Research in Media Technology；MAS.912 Teaching in Media Arts and Sciences；MAS.914 Practical Experience in Media Arts and Sciences；MAS.915 Practical Experience in Media Arts and Sciences；MAS.921 Proseminar in Media Arts and Sciences；MAS.945 Media Arts and Sciences General Exam；MAS.S60 -MAS.S64 Special Subject in Media Technology；MAS.S65 -MAS.S69 Special Subject in Media Technology；MAS.S70 Special Subject in Media Technology；MAS.S71 Special Subject in Media Technology；MAS.S72 Special Subject in Media Technology；MAS.S73 Special Subject in Media Technology；MAS.S74 Special Subject in Media Technology；MAS.S75 Special Subject in Media Technology；MAS.S76 Special Subject in Media Arts and Sciences (New) |
| Space | 2 | MAS.858 Asking How Space Enabled Designs Advance Justice and Development (New)；MAS.859 Space Technology for the Development Leader (New) |
| Ethics / Society / Justice / Policy | 2 | MAS.720 Scalable Civic Action (New)；MAS.858 Asking How Space Enabled Designs Advance Justice and Development (New) |
| Venture / Entrepreneurship | 4 | MAS.533 Imaging Ventures: Cameras, Displays, and Visual Computing；MAS.664 Media Ventures；MAS.665 Development Ventures；MAS.883 Revolutionary Ventures: How to Invent and Deploy Transformative Technologies |
| Interface / Interaction / HCI | 3 | MAS.750 Human-Robot Interaction；MAS.834 Tangible Interfaces；MAS.837 Principles of Electronic Music Interfaces |
| Imaging / Camera / Vision | 3 | MAS.531 Computational Camera and Photography；MAS.532 Mathematical Methods in Imaging；MAS.533 Imaging Ventures: Cameras, Displays, and Visual Computing |
| Thesis / Research / Seminar / Exam (administrative) | 12 | MAS.630 Advanced Seminar: Affective Computing；MAS.690 Independent Study in Media Arts and Sciences；MAS.790 Independent Study in Media Arts and Sciences；MAS.890 Independent Study in Media Arts and Sciences；MAS.910 Research in Media Technology；MAS.914 Practical Experience in Media Arts and Sciences；MAS.915 Practical Experience in Media Arts and Sciences；MAS.921 Proseminar in Media Arts and Sciences；MAS.940 Preparation for SM Thesis；MAS.945 Media Arts and Sciences General Exam；MAS.950 Preparation for Ph.D. Thesis；MAS.THG Graduate Thesis |

### 4.3 两时间点课程号差集（机械）

- 仅见于当前版（S2）：**9** 门 —— MAS.660 Cybersecurity；MAS.745 Next-Generation Nanoelectronics and Biotechnology；MAS.772 AI for Mental Health；MAS.838 Prototyping our Sci-Fi Space Future: Designing & Deploying Projects for Zero Gravity Flights (New)；MAS.839 Operating in the Lunar Environment；MAS.842 Safeguarding the Future；MAS.885 How To Grow (Almost) Anything；MAS.941 Preparation for SM Thesis II；MAS.S90 Special Subject in Media Arts and Sciences
- 仅见于 2019-2020 归档版（H1）：**12** 门 —— MAS.531 Computational Camera and Photography；MAS.532 Mathematical Methods in Imaging；MAS.533 Imaging Ventures: Cameras, Displays, and Visual Computing；MAS.534 Engineering Health: Understanding and Designing Affordable Health Diagnostics；MAS.535 Engineering Health: Designing and Deploying Affordable Health Diagnostics and Therapeutics；MAS.622 Pattern Recognition and Analysis；MAS.677 Objectification: How to Write (and Talk, and Think) about Objects；MAS.700 News and Participatory Media；MAS.713 Projects in Creative Learning (New)；MAS.720 Scalable Civic Action (New)；MAS.756 Principles of Awareness；MAS.784 Data Storytelling Studio
- 两版共有的课程号：**46** 门

> 口径说明：MIT 同一课程号跨年可换课名（例：2019-20 的 MAS.630 "Advanced Seminar: Affective Computing"，当前为 "Advanced Seminar: Affective Computing and Ethics"）。上表按**课程号**做差集，不判断内容是否同一门。

---

## 5. 学期课表命中数（机械计数）

| 学期清单 | 原件 | 页面 `MAS.` 字符串命中次数 |
|---|---|---|
| Fall 2026 | S7 | 13（人工核对后的课表行数；页面字符串命中另计） |
| Spring 2026 | S8 | 35 |
| Fall 2025 | S9 | 26 |
| Fall 2024 | S10 | 23 |
| Fall 2023 | S11 | 28 |
| Fall 2018 | S12 | 0（JS 空壳） |

> 分母口径：字符串命中含正文重复提及与页面「Related Content」区，**不等于**课表行数。

---

## 6. 本提取未覆盖的（口径边界）

- MIT **没有**统一的「培养方案/课程表」文件：学位要求只给在学学期数与 66 units 总量，**不列必修课名单**。本文件不含任何「必修/选修」分类——原文没有这个字段。
- 课程**大纲内容**（description）：S2/H1 原件内含每门 description，本文只取课程号/课名/units/学期/等级。
- SMACT（Art, Culture and Technology）、SMArchS、MCP、SDM 的学位图原件已存，**未逐行提取课程清单**。
- Media Lab 学期课表中 2026 春 / 2025 秋 / 2024 秋 / 2023 秋 四份**未逐行提取**。
- 本科培养方案（Course 4-B 等）未取。
- 「credits」与「units」未做换算（原文未在此页给出换算）。

---

*本文件为纯数据层。任何「MIT 是否偏 AI / 是否缺某类课」的判断均由白纸作出，不在本文件内。*
