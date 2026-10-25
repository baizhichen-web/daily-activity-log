# P1d 时代/人口面 · WEF 三期词频与原文摘句（纯数据层·机械扫描）

> 生成日期：2026-10-04。来源：本目录 raw/ 下 WEF《Future of Jobs》2018 / 2020 / 2025 三期官方 PDF。
> 方法：PyMuPDF 提取全文 → **词边界正则**（`\b`，大小写不敏感）计数；分母=该期总页数与全文词数（词数由空白切分，为近似值）。
> 词边界是本项目两线共同红线（踩过 aws/Laws、legib/eligible 的子串误报），故不使用无边界 `find`。
> 本文只列计数、命中页与原文摘句，**不含「这说明/结论是」类句子**；是否构成 P1d 证据由白纸判定。

## 1. 分母

| 期 | 文件 | 页数 | 全文词数（近似） |
|---|---|---|---|
| 2018 | 2018-WEF-Future-of-Jobs-Report.pdf | 147 | 47789 |
| 2020 | 2020-WEF-Future-of-Jobs-Report.pdf | 163 | 63194 |
| 2025 | 2025-WEF-Future-of-Jobs-Report.pdf | 290 | 126804 |

## 2. 词频（三期并列，格式：命中次数 / 出现该词的页数）

| 词（词边界正则） | 2018 | 2020 | 2025 |
|---|---|---|---|
| sustainab* | 0 / 0 | 5 / 3 | 22 / 20 |
| 可持续发展 sustainable development | 0 / 0 | 0 / 0 | 0 / 0 |
| climate | 3 / 2 | 0 / 0 | 150 / 115 |
| green | 0 / 0 | 6 / 6 | 46 / 23 |
| environmental* | 2 / 2 | 4 / 4 | 53 / 42 |
| ESG | 0 / 0 | 1 / 1 | 1 / 1 |
| circular* | 0 / 0 | 0 / 0 | 0 / 0 |
| biodiversity | 0 / 0 | 0 / 0 | 0 / 0 |
| demograph* | 15 / 5 | 0 / 0 | 34 / 19 |
| aging / ageing | 4 / 3 | 0 / 0 | 126 / 108 |
| population | 1 / 1 | 68 / 33 | 151 / 136 |
| migrat* | 6 / 5 | 2 / 2 | 0 / 0 |
| talent shortage | 1 / 1 | 0 / 0 | 8 / 7 |
| labour/labor shortage | 0 / 0 | 0 / 0 | 2 / 2 |
| reskill* | 150 / 60 | 321 / 105 | 392 / 146 |
| upskill* | 33 / 14 | 207 / 102 | 700 / 145 |
| care economy | 0 / 0 | 4 / 4 | 1 / 1 |
| longevity | 0 / 0 | 0 / 0 | 0 / 0 |
| inequalit* | 19 / 8 | 14 / 9 | 6 / 5 |
| well-being | 0 / 0 | 11 / 7 | 42 / 37 |
| health* | 112 / 46 | 58 / 33 | 75 / 58 |
| productivit* | 24 / 15 | 19 / 13 | 19 / 10 |
| energy transition | 0 / 0 | 0 / 0 | 0 / 0 |
| decarboni* | 0 / 0 | 0 / 0 | 2 / 1 |
| net zero | 0 / 0 | 0 / 0 | 1 / 1 |

> ⚠️ 方法学警示（事实层）：WEF 这三期报告图版密度高，大量内容以图表/图片形式排版，**PDF 文本层抓不到图内文字**。
> 佐证：2025 期 290 页仅得 126,804 词（≈437 词/页），2020 期 163 页仅 63,194 词（≈388 词/页），低于同体量纯文字报告。
> 因此下表计数应视为**下限（floor）**，不可读作「该期没讲这件事」。
>
> 说明：`2018` 期命中 0 的词，不等于该期没有该主题，只表示**该词面**未出现（词面可能不同）；
> 「确认没有 ✗」与「没查到 ?」的区分见项目 AGENTS.md 统计纪律。

## 3. 命中页号清单

### 2018

- climate：18、62
- environmental*：35、67
- demograph*：10、27、35、36、37
- aging / ageing：18、27、66
- population：40
- migrat*：18、36、37、38、139
- talent shortage：7
- reskill*：7、11、16、17、21、24、25、26、29、30、31、34、35、38、39、40、48、49、50、55、57、59、61、63、65、67、69、71、73、75、77、81、83、85、87、89、91、93、95、97…（超 40 页，截断）
- upskill*：7、11、16、19、24、25、26、30、31、34、35、48、49、50
- inequalit*：7、9、15、35、36、37、38、139
- health*：7、17、20、23、27、28、29、30、31、32、33、40、43、49、51、66、67、80、82、84、86、88、90、92、94、96、98、100、102、104、106、108、110、112、114、116、118、120、122、124…（超 40 页，截断）
- productivit*：7、10、15、18、20、22、23、24、26、27、35、36、37、38、48

### 2020

- sustainab*：3、52、54
- green：8、15、30、31、32、39
- environmental*：6、89、124、148
- ESG：6
- population：6、36、44、53、56、58、59、67、69、71、73、75、77、79、81、83、85、87、89、91、93、95、97、99、101、103、105、107、109、111、113、115、117
- migrat*：51、59
- reskill*：3、5、6、8、14、16、23、31、35、36、38、40、45、46、47、48、49、51、54、56、57、60、61、63、64、65、67、68、69、70、71、72、73、74、75、76、77、78、79、80…（超 40 页，截断）
- upskill*：3、6、8、14、16、23、31、35、36、38、40、45、46、47、48、49、51、56、57、60、61、63、65、67、68、69、70、71、72、73、74、75、76、77、78、79、80、81、82、83…（超 40 页，截断）
- care economy：8、31、32、155
- inequalit*：3、5、9、20、24、50、53、54、156
- well-being：5、8、16、18、40、46、49
- health*：3、8、9、10、13、15、16、17、18、19、21、22、23、24、25、27、28、30、34、36、38、39、40、41、42、45、46、48、89、138、151、152、158
- productivit*：5、8、18、35、38、40、44、45、46、48、51、53、155

### 2025

- sustainab*：16、21、30、37、45、67、106、114、128、152、176、196、208、214、220、228、242、250、254、262
- climate：5、8、10、13、14、15、16、20、22、25、30、45、65、67、68、69、70、71、72、74、75、76、84、85、86、87、89、90、96、112、114、116、118、120、122、124、126、128、130、132…（超 40 页，截断）
- green：5、6、9、10、15、16、18、20、22、25、30、37、43、45、66、69、70、71、73、85、86、87、96
- environmental*：4、5、6、19、20、21、30、35、36、37、38、40、41、44、45、70、72、76、79、80、84、85、86、87、92、93、101、102、104、106、120、138、144、156、160、220、244、248、258、268…（超 40 页，截断）
- ESG：285
- demograph*：5、9、10、16、18、22、25、26、31、43、45、50、54、57、58、66、70、73、74
- aging / ageing：5、10、16、17、20、22、25、26、31、45、55、65、68、70、71、72、73、74、85、87、90、96、112、114、116、118、120、122、124、126、128、130、132、134、136、138、140、142、144、146…（超 40 页，截断）
- population：8、16、70、72、87、96、108、109、112、113、114、115、116、117、118、119、120、121、122、123、124、125、126、127、128、129、130、131、132、133、134、135、136、137、138、139、140、141、142、143…（超 40 页，截断）
- talent shortage：62、65、70、72、73、88、89
- labour/labor shortage：84、96
- reskill*：3、6、15、16、27、32、43、45、47、52、53、54、55、62、63、65、66、67、68、70、71、72、73、74、75、84、85、86、87、88、89、94、96、97、98、109、110、113、115、117…（超 40 页，截断）
- upskill*：3、6、15、16、27、32、43、44、45、47、52、53、54、55、62、63、65、66、67、68、69、70、71、72、73、74、75、83、84、85、86、87、88、89、94、109、110、113、115、117…（超 40 页，截断）
- care economy：6
- inequalit*：11、59、72、85、95
- well-being：6、47、52、53、54、70、71、72、73、76、84、85、87、88、98、241、243、245、247、249、251、253、255、257、259、261、263、265、267、269、271、273、275、277、279、281、283
- health*：5、6、8、15、21、27、28、39、40、46、52、53、54、58、64、70、72、73、76、81、82、83、84、85、87、88、90、91、92、93、98、99、104、105、241、243、245、247、249、251…（超 40 页，截断）
- productivit*：6、11、12、48、58、59、85、87、95、96
- decarboni*：15
- net zero：16

## 4. 原文摘句（含 可持续/气候/人口/老龄化/移民/再培训/不平等 任一词的句子）

> 摘句为机械切分（按句末标点），保留原文；每期有上限，达到上限即截断并注明。

### 2018（命中 73 句，列出前 20 句）

- p.7：Our analysis indicates that, to date, many employers’ retraining and upskilling efforts remain focused on a narrow set of current highly-skilled, highly-valued employees.
- p.7：This is particularly imperative because there is a virtuous cycle between new technologies and upskilling.
- p.7：New technology adoption drives business growth, new job creation and augmentation of existing jobs, provided it can fully leverage the talents of a motivated and agile workforce who are equipped with futureproof skills to take advantage of new opportunities through continuous retraining and upskilling.
- p.9：These transformations, if managed wisely, could lead to a new age of good work, good jobs and improved quality of life for all, but if managed poorly, pose the risk of widening skills gaps, greater inequality and broader polarization.
- p.11：• A reskilling imperative: By 2022, no less than 54% of all employees will require significant re- and upskilling.
- p.11：Of these, about 35% are expected to require additional training of up to six months, 9% will require reskilling lasting six to 12 months, while 10% will require additional skills training of more than a year.
- p.11：In addition, 41% of employers are set to focus their reskilling provision on high-performing employees while a much smaller proportion of 33% stated that they would prioritize at-risk employees in roles expected to be most affected by technological disruption.
- p.11：In other words, those most in need of reskilling and upskilling are least likely to receive such training.
- p.15：These transformations, if managed wisely, could lead to a new age of good work, good jobs and improved quality of life for all, but if managed poorly, pose the risk of widening skills gaps, greater inequality and broader polarization.
- p.17：It then explores a range of priority issues with regard to the development of comprehensive workforce strategies for the Fourth Industrial Revolution, including employee reskilling and workforce augmentation.
- p.18：By contrast, technological and social trends expected to negatively impact business growth include increasing protectionism; cyber threats; shifts in government policies; the effects of climate change; and increasingly ageing societies.
- p.19：Key factors to consider include mapping the scale of occupational change underway and documenting emerging and declining job types; highlighting opportunities to use new technologies to augment human work and upgrade job quality; tracking the evolution of job-relevant skills; and, finally, documenting the business case for investment in retraining, upskilling and workforce transformation.
- p.21：Two investment decisions, in particular, will be crucial to shaping the future of jobs: the question of whether to prioritize automation or augmentation and the question of whether or not to invest in workforce reskilling.
- p.24：The reskilling imperative Current shifts underway in the workforce will displace some workers while at the same time create new opportunities for others.
- p.25：Employers surveyed for this report estimate that, by 2022, no less than 54% of all employees will require significant reskilling and upskilling (Figure 7).
- p.25：Of these, about 35% are expected to require additional training of up to six months, 9% will require reskilling lasting six to 12 months, while 10% will require additional skills training of more than a year.
- p.25：In addition, 41% of employers are set to focus their reskilling provision on high-performing employees while a much smaller proportion of 33% stated that they would prioritize at-risk employees in roles expected to be most affected by technological disruption.
- p.25：In other words, those most in need of reskilling and upskilling are least likely to receive such training.
- p.25：Figure 7: Expected average reskilling needs across companies, by share of employees, 2018–2022 No reskilling needed, 46% Reskilling needs of over 1 year, 10% Reskilling needs of 6–12 months, 9% Reskilling needs of 3–6 months, 10% Reskilling needs of 1–3 months, 12% Reskilling needs of less than 1 month, 13% Reskilling needs 13 The Future of Jobs Report 2018
- p.26：In particular, they highlight that the bottom-line impact and business case for reskilling and upskilling investments remain somewhat unclear and require much greater attention.

> 已截断：另有 53 句未列出。

### 2020（命中 242 句，列出前 20 句）

- p.3：We have the means to reskill and upskill individuals in unprecedented numbers, to deploy precision safety nets which protect displaced workers from destitution, and to create bespoke maps which orient displaced workers towards the jobs of tomorrow where they will be able to thrive.
- p.3：It is now urgent to enact a Global Reset towards a socio-economic system that is more fair, sustainable and equitable, one where social mobility is reinvigorated, social cohesion restored, and economic prosperity is compatible with a healthy planet.
- p.3：If this opportunity is missed, we will face lost generations of adults and youth who will be raised into growing inequality, discord and lost potential.
- p.3：There is a renewed urgency to take proactive measures to ease the transition of workers into more sustainable job opportunities.
- p.3：By leveraging this publication and other insights, the Platform supports a range of consortia and action coalitions, including the Reskilling Revolution Initiative to provide better jobs, skills and education to one billion people by 2030.
- p.5：On average, companies estimate that around 40% of workers will require reskilling of six months or less and 94% of business leaders report that they expect employees to pick up new skills on the job, a sharp uptake from 65% in 2018.
- p.5：To address concerns about productivity and well-being, about one-third of all employers expect to also take steps to create a sense of community, connection and belonging among employees through digital tools, and to tackle the well-being challenges posed by the shift to remote work.
- p.5：– In the absence of proactive efforts, inequality is likely to be exacerbated by the dual impact of technology and the pandemic recession.
- p.5：Comparing the impact of the Global Financial Crisis of 2008 on individuals with lower education levels to the impact of the COVID-19 crisis, the impact today is far more significant and more likely to deepen existing inequalities.
- p.6：Those in employment are placing larger emphasis on personal development courses, which have seen 88% growth among that population.
- p.6：– The window of opportunity to reskill and upskill workers has become shorter in the newly constrained labour market.
- p.6：For those workers set to remain in their roles, the share of core skills that will change in the next five years is 40%, and 50% of all employees will need reskilling (up 4%).
- p.6：An average of 66% of employers surveyed expect to get a return on investment in upskilling and reskilling within one year.
- p.6：On average, employers expect to offer reskilling and upskilling to just over 70% of their employees by 2025.
- p.6：However, employee engagement into those courses is lagging, with only 42% of employees taking up employer-supported reskilling and upskilling opportunities.
- p.6：A significant number of business leaders understand that reskilling employees, particularly in industry coalitions and in public- private collaborations, is both cost-effective and has significant mid- to long-term dividends—not only for their enterprise but also for the benefit of society more broadly.
- p.6：– The public sector needs to provide stronger support for reskilling and upskilling for at-risk or displaced workers.
- p.6：Currently, only 21% of businesses report being able to make use of public funds to support their employees through reskilling and upskilling.
- p.8：The Future of Jobs October 2020 The Future of Jobs 8 Introduction The Labour Market Outlook in the Pandemic Economy 1 Developing and enhancing human skills and capabilities through education, learning and meaningful work are key drivers of economic success, of individual well-being and societal cohesion.
- p.8：As a new global recession brought on by the COVID-19 health pandemic impacts economies and labour markets, millions of workers have experienced changes which have profoundly transformed their lives within and beyond work, their well-being and their productivity.

> 已截断：另有 222 句未列出。

### 2025（命中 239 句，列出前 50 句）

- p.5：Technological change, geoeconomic fragmentation, economic uncertainty, demographic shifts and the green transition – individually and in combination – are among the major drivers expected to shape and transform the global labour market by 2030.
- p.5：– Climate-change mitigation is the third-most transformative trend overall – and the top trend related to the green transition – while climate- change adaptation ranks sixth with 47% and 41% of employers, respectively, expecting these trends to transform their business in the next five years.
- p.5：Climate trends are also expected to drive an increased focus on environmental stewardship, which has entered the Future of Jobs Report’s list of top 10 fastest growing skills for the first time.
- p.5：– Two demographic shifts are increasingly seen to be transforming global economies and labour markets: aging and declining working age populations, predominantly in higher- income economies, and expanding working age populations, predominantly in lower-income economies.
- p.5：Aging populations drive growth in healthcare jobs such as nursing professionals, while growing working-age populations fuel growth in education-related professions, such as higher education teachers.
- p.6：This finding could potentially be due to an increasing share of workers (50%) having completed training, reskilling or upskilling measures, compared to 41% in the report’s 2023 edition.
- p.6：Given these evolving skill demands, the scale of workforce upskilling and reskilling expected to be needed remains significant: if the world’s workforce was made up of 100 people, 59 would need training by 2030.
- p.6：Of these, employers foresee that 29 could be upskilled in their current roles and 19 could be upskilled and redeployed elsewhere within their organization.
- p.6：However, 11 would be unlikely to receive the reskilling or upkskilling needed, leaving their employment prospects increasingly at risk.
- p.6：Accordingly, 85% of employers surveyed plan to prioritize upskilling their workforce, with 70% of employers expecting to hire staff with new skills, 40% planning to reduce staff as their skills become less relevant, and 50% planning to transition staff from declining to growing roles.
- p.6：Supporting employee health and well-being is expected to be a top focus for talent attraction, with 64% of employers surveyed identifying it as a key strategy to increase talent availability.
- p.6：Effective reskilling and upskilling initiatives, along with improving talent progression and promotion, are also seen as holding high potential for talent attraction.
- p.6：Funding for - and provision of - reskilling and upskilling are seen as the two most welcomed public policies to boost talent availability.
- p.8：Since the COVID-19 pandemic, rising cost of living, geopolitical conflicts, the climate emergency and economic downturns have added further turbulence to technology-driven global employment changes.
- p.8：This is noteworthy considering lower- middle income economies – who make up around 40% of the global population – will drive the bulk of working-age population growth in the coming years and decades.
- p.8：The combination of growing working- age populations and labour-force participation rates emphasizes the importance of job creation in these economies.
- p.9：The report begins by outlining five macrotrends impacting the labour market – technological change, the green transition, geoeconomic fragmentation, economic uncertainty and demographic shifts.
- p.10：Drivers of labour-market transformation Technological developments, the green transition, macroeconomic and geoeconomic shifts, and demographic changes are driving transformation in the global labour market, reshaping both jobs and required skills.
- p.13：Low-income countries are disproportionately affected by rising inflationary pressures because of elevated food prices due to supply disruptions influenced by climate shocks, regional conflicts and geopolitical tensions.18 Against this backdrop, companies expect economic pressures to be among the most transformative drivers.
- p.15：Green transition Despite an increasingly complex outlook for global climate negotiations, the green transition remains a priority for many organizations globally.
- p.15：Similarly, 41% expect that increased efforts and investments to adapt to climate change will drive significant organizational changes.
- p.15：Given the carbon-intensive nature of these industries,26 decarbonization will significantly transform these industries and their workforces, with workers requiring upskilling and reskilling to transition to alternative jobs.
- p.16：organizations by 2030, while over half expect climate adaptation to do so.
- p.16：By contrast, in Central Asia, only 19% of respondents see climate trends as relevant to their business activities.
- p.16：As countries seek to meet climate goals, questions arise regarding whether their workforces are equipped with the necessary skills to meet the demands of a net-zero future.
- p.16：Demographic shifts The world is currently experiencing two fundamental demographic shifts: an aging and declining working-age population predominantly in higher- income economies, due to declining birth rates and longer life expectancy, and a growing working-age population in many lower-income economies, where younger populations are progressively entering the labour market.
- p.16：In higher-income nations, aging populations are increasing dependency ratios, potentially putting greater pressure on a smaller pool of working-age individuals and raising concerns about long-term labour availability.
- p.16：In contrast, lower-income economies may benefit from a demographic dividend.
- p.16：Certain countries, including Australia, Germany and Japan, experience more significant effects from declining working-age populations.
- p.16：While few companies operating in Sub-Saharan African countries expect to see transformation due to aging and declining working age populations, their expectations regarding the impact of growing working-age populations are also relatively tempered, illustrating relatively greater concern with other macrotrends (Figure 1.5).
- p.16：Compared to global averages, employers facing the effects of aging population are more pessimistic about talent availability and expect facing bigger challenges in attracting industry talent.
- p.16：Conversely, many economies’ actual ability to leverage demographic dividends will depend on their accompanying success, or otherwise, in inclusive job creation.
- p.17：Impacted by ageing and declining working-age popula- tions (%) Impacted by growing working-age populations (%) Share of surveyed employers impacted by growing working-age populations and share of surveyed employers impacted by ageing and declining working-age populations.
- p.18：Jobs outlook Technological change, the green transition, economic uncertainty, geoeconomic fragmentation and demographic shifts are reshaping the labour market.
- p.20：The growth of these roles is driven by increased efforts and investments to reduce carbon emissions and adapt to climate change.
- p.20：Aging and declining working-age populations and slower economic growth also contribute to the decline in clerical roles.
- p.22：Green transition trends, including increased efforts and investments to reduce carbon emissions and adapt to climate change, are the driving forces behind this job growth.
- p.22：While technology is impacting growth in almost all occupations, demographic trends and economic trends also contribute to the projected net increase in these job roles.
- p.22：Care jobs, including Nursing Professionals, Social Work and Counselling Professionals, and Personal Care Aides are expected to see significant growth over the next five years, driven by demographic trends, especially aging populations.
- p.22：Broadening digital access and growing working-age populations are the top two contributing drivers of this job growth, while increased focus on labour and social issues is seen as an additional factor.
- p.25：Expected impact of macrotrends on employment The remainder of this chapter discusses how Future of Jobs Survey respondents expect each of the five macrotrends driving labour market transformation – technological change, geoeconomic fragmentation, green transition, demographic shifts and economic uncertainty – to influence job growth and decline by 2030 (see Figure 2.6).
- p.26：This projected growth in demand for nursing professionals is also driven by aging and declining working-age populations, further explored in the demographic shifts section of this chapter.
- p.30：Green transition Climate change adaptation is expected to be the third-largest contributor to net growth in global jobs by 2030, projected to contribute an additional 5 million net jobs, while climate-change mitigation comes in 6th with an additional 3 million net jobs.
- p.30：Expectations around climate-change adaptation and mitigation trends are pushing Environmental Engineers and Renewable Energy Engineers into the top 15 fastest-growing jobs, as well as driving growth in roles such as Sustainability Specialists and Renewable Energy Technicians.
- p.31：Demographic shifts Growing working-age populations are the macrotrend expected to be the second-biggest driver of global net job creation – with 9 million net additional jobs by 2030 – surpassed only by broadening digital access.
- p.31：Aging and declining working-age populations, meanwhile, are simultaneously expected to be, overall, the third- largest driver of job creation (11 million additional jobs) as well the primary factor in a global reduction in 7 million jobs, making this trend the 5th largest driver of net job creation, on balance, resulting in 4 million net additional jobs by 2030.
- p.31：These two demographic trends are notably among the top three drivers of growth in roles for Assembly and Factory Workers and Vocational Education Teachers.
- p.31：Aging and declining working-age populations also appear to drive growth in roles for Nurses, Sales and Hospitality professionals as well as being among the largest drivers of growth for shop salespersons, wholesale and manufacturing sales representatives, food and beverage serving workers and food processing and related trades workers.
- p.31：Growing working age populations, meanwhile, are expected to be a key driver of growth for Education roles, including University and Higher Education Teachers and Secondary Education Teachers.
- p.32：One element contributing to this finding may be a growing focus on continuous learning, upskilling and reskilling programmes, enabling companies to better anticipate and manage future skill requirements.

> 已截断：另有 189 句未列出。