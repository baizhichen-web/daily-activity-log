# 2026-11-10 生物工坊 — M1 执行记录（creature-forge）

> 对应 design.md v0.1 里程碑 M1（灰盒：编辑器灰盒 + 四足自动步态 POC + 平地）。人类已拍板引擎 Unity 2022.3 LTS + URP。

## 本日完成
1. **拍板与立项**：design.md 状态改「已拍板」+ §9 决策记录；项目 AGENTS.md 引擎落定、Top3 更新
2. **看板登记**：reczz28XduviKYZO（分类 设计与创作 / P1 / 进行中 / 卡点方=用户）。经验：lark-cli 启动慢（20-40s），复杂 JSON 必须走 `--json @file.json`（PowerShell 单引号会吃引号）
3. **Unity 工程骨架**：`studio/projects/creature-forge/unity/`（manifest: URP 14.0.11 + Input System 1.7.0；ProjectVersion pins 2022.3.45f1；标准 Unity .gitignore）
4. **M1 代码 12 个脚本**：
   - 数据层：Morphology（JSON 形态）/ PartCatalog（质量模型）
   - 构建层：CreatureBuilder（躯干=根 ArticulationBody+复合碰撞体；腿=髋/膝 ArticulationBody 链，足为复合碰撞体）
   - 步态层：QuadrupedGait（开环正弦 Trot：髋=A·sin、膝=base+B·cos；身体高度弹簧+姿态 PD；形态自适应频率/摆幅）
   - 行为层：CreatureBrain（最近食物→偏航 PD 转向→吃；无食物随机游荡）
   - 表现层：FPController / CameraDirector（1/2/3 相机）/ Food / BuildUI（OnGUI 灰盒）/ GameBootstrap（自补地面光照食物）
   - 工具：Editor/M1SceneBuilder（Tools 菜单一键建场景）
5. **自审修复 3 处**：CameraDirector 缺 `using UnityEngine.InputSystem`（Key 枚举）；Food 材质改拷贝模式（URP 下 Shader.Find("Standard") 可能 null）；CreatureBuilder 删未定义 tag 赋值（运行期抛异常）

## POC 假设清单（首轮 Unity 验证，可能要调）
| # | 假设 | 验证方式 |
| --- | --- | --- |
| 1 | xDrive 绕关节局部 X 轴（度）；twistLimit 放开/swing 锁 0 = 单轴铰链 | 关节是否只绕期望轴转 |
| 2 | 膝关节符号 KneeSign=-1（后折） | 膝屈曲方向是否向后（后肢似马） |
| 3 | 髋正角 = 腿向后摆（推进相） | 生物是否朝 +Z（自身朝向）前进 |
| 4 | 开环 Trot 在平地能产生净位移 | 是否原地踏步 vs 真正前进 |
| 5 | 高度弹簧+姿态 PD 能维持 0.7m 左右身高不倒 | 直立度 HUD |
| 6 | muscleForce 900 / stiffness 250 量级合适 | 抽搐/塌陷/无力 三选一就调 UI 滑杆 |

## 风险与边界（诚实记录）
- 无法在本环境编译/运行 Unity（未安装编辑器）——所有代码未经编译器验证，首轮以用户 Console 报错为准迭代
- 平地开环步态：不平地形/陡坡会失真；支撑相足部落点 IK 列入 M1.5（design.md §8 风险 1 后续）
- ArticulationBody 求解器参数（迭代数）若抖动，考虑降频/加阻尼

## 安装执行记录（2026-11-10 深夜）
- 报批批准：装 E 盘。changeset 溯源：unityreleases.com 查得 2022.3.45f1 = a13dfa44d684（LTS，2024-09-03）
- 官方 CDN 下载：Hub 137MB（7s）+ Editor 3.27GB（约 15 分钟，16MB/s）；curl.exe 后台任务
- Hub 静默装好：`E:\UnityHub\Unity Hub.exe`；Editor 静默装好：`E:\Unity\Editor\2022.3.45f1\Editor\Unity.exe`（已验证存在）
- ⚠️ Editor 是**中国版构建**（log: `Built from '2022.3/china_unity/release' ... 2022.3.45f1c1`）——CDN 按地理位置路由到中国源。功能等价；若全局 Hub 激活许可证报 entitlement 不匹配，后备方案 = 装 unity.cn 中国版 Hub
- ⚠️ 批处理编译验证被**许可证激活**挡住：`No valid Unity Editor license found`。激活必须用户本人在 Hub GUI 登录 Unity 账号完成（红线：不碰凭证）
- 已手动补建 `%LOCALAPPDATA%\Unity\Caches`（Unity 批处理首次创建失败，手动建成功）
- 顺带修一个真 bug：M1SceneBuilder 的 DisplayDialog 字符串被写成真实换行（C 编译错误）→ 整文件重写 + 批处理守卫（Application.isBatchMode 跳过弹窗）
- 工程无 Library/ 残留（批处理死于许可证检查，早于导入）

## 编译验证与修复（2026-11-10 下午，批处理 6 轮）
用户激活许可证后，批处理（`-batchmode -executeMethod`）逐轮暴露并修复：
1. `ArticulationLimit/twistLimit/swing1Limit/swing2Limit` 不存在（2022.3 无此公开 API）→ 改 `jointType = ArticulationJointType.RevoluteJoint`（枚举值带 Joint 后缀：FixedJoint/PrismaticJoint/RevoluteJoint/SphericalJoint；RevoluteJoint=绕父锚点 X 轴旋转，docs.unity.cn 2022.3 确认）
2. M1SceneBuilder 重写时漏 namespace 收尾括号（CS1513）→ 补齐
3. HeadlessTest 两处笔误（OpenMode→OpenSceneMode；EnterPlaymode 无返回值）→ 修
4. **终态：零 error CS，场景 Assets/Scenes/M1.unity 生成成功，Exiting batchmode successfully**

### 无头步态测试：尝试后放弃（记录备查）
- 目标：批处理里自主跑 20 秒仿真验证头号风险。实现：[InitializeOnLoad] + `-runHeadlessTest` flag + EnterPlaymode + 遥测 Tick
- 卡点：EnterPlaymode 触发「强制同步重编译→域重载」，重载后 delayCall 二次触发但 Tick 注册丢失/场景恢复 backup，遥测始终未输出；且每次批处理遗留进程占文件锁（曾误杀 DeepSeek Harness 子进程——按 CommandLine 正则杀进程会匹配到自己的工具链，教训：只按精确进程名杀）
- 结论：批处理 Play 模式在 2022.3 不稳。**步态验证改由用户在 GUI 里 Play 完成**（无批处理怪事）。HeadlessTest.cs 保留（flag 默认不触发）

### C 盘占用事件（用户报告「占满了」）
- 元凶：Unity Hub + 团结引擎 Hub 的下载暂存（%TEMP%\unityhub-*、tuanjiehub-*）：2022.3.62f3c1 3.6GB + 团结引擎全套约 3.7GB ≈ 8GB+；另 Unity 缓存 1.23GB
- 已做安全清理：删工作区安装包（E: 3.4GB）；%LOCALAPPDATA%\Unity 清空并**目录联接**到 E:\UnityCaches（后续缓存写 E 盘）；杀净挂起 Unity 进程；清工程 Temp/__Backupscenes
- **暂存已清（Hub 会话结束后）**：删除 %TEMP% 下 unityhub-* ×4 + tuanjiehub-* ×5 共约 11.6GB → C 盘从 10.47GB 可用回到 **21.94GB**，Temp 从 12.41GB 降到 0.82GB（剩余为非 Unity 内容：npm/expo 临时目录、oopz、OneNote 日志）
- 建议（已告知用户）：以后 Hub 安装编辑器/模块时路径选 E 盘；若要 2022.3.62 需重新下载（暂存已删）

## 待办
- 用户 GUI Play 首轮：按 POC 假设清单回收反馈（关节轴/膝符号/前进方向/直立度/肌肉滑杆量级/Console）
- Hub 下载暂存清理（等用户 Hub 操作结束）
- M2 垂直切片（等 M1 反馈）
