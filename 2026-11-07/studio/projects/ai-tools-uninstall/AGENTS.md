# AGENTS.md — AI Tools 卸载项目

## 项目状态

> 项目状态以飞书看板为准（本文件不维护状态值）。执行结果见 README.md。

## 上下文恢复

如果 Agent 被要求恢复此项目：
1. 读 `README.md` 了解执行结果
2. 备份位置：`E:\Desktop\AI_itself\backup\`

## 核心结论

1. **已成功卸载**：Codex, Qwen, QwenCode npm 包
2. **已释放约 220 MB C 盘空间**
3. **Claude 配置待手动删除**
4. **OpenCode/Trae skill 未受影响**

## 备份信息

备份位置：`E:\Desktop\AI_itself\backup\`

恢复命令：
```powershell
# 恢复 Codex
Expand-Archive -Path "E:\Desktop\AI_itself\backup\codex\archive\codex-backup-20260504.zip" -DestinationPath "$env:USERPROFILE\.codex" -Force

# 恢复 Claude
Expand-Archive -Path "E:\Desktop\AI_itself\backup\claude\archive\claude-backup-20260504.zip" -DestinationPath "$env:USERPROFILE\.claude" -Force
```

## 关键发现（给所有 Agent）

1. **npm 包和配置文件是两回事**
   - `npm uninstall -g xxx` 只删除可执行程序
   - `~/.xxx` 文件夹需要单独删除

2. **各 Agent Skill 完全隔离**
   - Trae: `~/.trae/skills/`
   - OpenCode: `~/.opencode/skills/`
   - Codex: `~/.codex/vendor_imports/skills/`（Codex 已于 2026-05-04 卸载，路径随之移除——历史记录）

3. **系统维护操作不属于典型项目**
   - 应记录到知识库 `bAI/bAI/notes/`
   - 不需要复杂的状态管理

---

*最后更新：2026-05-04*
