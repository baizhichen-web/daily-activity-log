#!/usr/bin/env node
// board-snapshot.mjs — 把飞书项目看板快照成本地 markdown，供任何 Agent 免 CLI 读取
// 用法: node ops/scripts/board-snapshot.mjs
// 输出: ops/reports/board-snapshot.md
// 说明: 看板仍是 single source of truth；本文件只是 AI 只读快照，人工编辑会被覆盖。
// 背景: Codex 等 Agent 环境无法调用 lark-cli（npm 执行策略），本地快照是普适通路。

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_TOKEN = 'URbrbJeWRa9ME4szDt8chJFlnJh';
const TABLE_ID = 'tblHQm7JwFc7bxGT';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'reports', 'board-snapshot.md');

const cmdline = `lark-cli base +record-list --base-token ${BASE_TOKEN} --table-id ${TABLE_ID} --as user`;
let body;
try {
  body = execSync(cmdline, { encoding: 'utf8', timeout: 60000 });
} catch (e) {
  // 信任红线：工具调用失败必须上报，不静默降级
  console.error('[board-snapshot] 失败（信任红线：上报）:', (e.stderr || e.message || '').toString().trim());
  process.exit(1);
}

const now = new Date();
const header = `# 飞书项目看板快照

> 生成时间：${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString('zh-CN')}
> 来源：lark-cli base +record-list（看板 = single source of truth）
> 更新方式：\`node ops/scripts/board-snapshot.mjs\`
>
> **AI 读表说明（管线三列）**
> - \`管线\`：项目归属哪条流水线（内容线/资产线/方法线/呈现面）；**空 = 独立项目**，不强行归类
> - \`依赖\`：跨项目依赖边，格式 \`等 <项目名>：<解锁动作>（卡点：<用户GUI/Agent/外部>）\`；单项目内部待办在「描述」列，不在这里
> - \`卡点方\`：当前阻塞在谁手里；行动含义——卡点方=用户→等人类动作，不要代劳；=Agent→可自主推进解锁；=外部→等待第三方
> - 依赖边或卡点换手后，用 lark-cli \`record-upsert\` 回写对应记录（规则见根 \`PROGRESS.md\`·跨项目协作）

`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, header + body.trim() + '\n');
console.log('[board-snapshot] 已写入', OUT);
