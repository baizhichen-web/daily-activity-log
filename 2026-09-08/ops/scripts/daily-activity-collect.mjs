#!/usr/bin/env node
/**
 * daily-activity-collect.mjs — 当日产出归档提交（daily-activity-log）
 *
 * 用途：把"当日主仓库提交触碰的文件 + 工作区当日变更的未提交文件"复制到
 *       ops/daily-activity/YYYY-MM-DD/，生成清单与摘要后 commit + push 到
 *       GitHub 公开仓库 baizhichen-web/daily-activity-log（热区图每日一格）。
 *
 * 触发：每日 18:00 看板巡检任务的最后一个步骤（无人值守）。
 * 幂等：当日内重复运行若无可提交变化则跳过 commit/push。
 *
 * 安全红线：公开仓库内容全网可见。以下路径一律跳过（双保险，git status
 *          本身就不含 ignored 文件）：
 *   - 文件名匹配 token / credential / secret / passw / .env / .pem / .key / id_ed25519
 *   - 目录：node_modules / .zcode / .claude / .dsh-vision / ai-homes / temp / .obsidian / ops/daily-activity
 *
 * 退出码：0 成功（含无变化跳过）；1 失败（stderr 含详细原因，不重试不静默）。
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DAILY_DIR = path.join(ROOT, 'ops', 'daily-activity');
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const dayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
const TARGET_DIR = path.join(DAILY_DIR, today);

const SENSITIVE_NAME = /(^|[.\/\\])(env|\.env)([.\/\\]|$)|token|credential|secret|passw|\.pem$|\.key$|id_ed25519|spyglass/i;
const SENSITIVE_DIR = /(^|[\/\\])(node_modules|\.zcode|\.claude|\.dsh-vision|ai-homes|temp|\.obsidian|ops\/daily-activity)([\/\\]|$)/i;

function git(args, cwd = ROOT) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' });
}

// 主仓库根在工作区上层（E:\Desktop\AI_itself），git 输出路径带工作区名前缀
const PREFIX = git(['rev-parse', '--show-prefix']).trim();
const stripPrefix = (p) => (PREFIX && p.startsWith(PREFIX) ? p.slice(PREFIX.length) : null);

function isTodayByMtime(relPath) {
  try {
    return fs.statSync(path.join(ROOT, relPath)).mtimeMs >= dayZero;
  } catch {
    return false; // 文件已不在（当日删除）→ 不复制
  }
}

function isSensitive(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (SENSITIVE_DIR.test(norm)) return true;
  return SENSITIVE_NAME.test(path.basename(norm));
}

const skipped = [];
const collected = [];
const removed = [];

/** 1. 当日已提交的变更（提交时间视角） */
const logOut = git(['-c', 'core.quotepath=false', 'log', `--since=${today} 00:00`, '--pretty=format:%H', '--name-only', '--', '.']);
const committedFiles = new Set();
for (const line of logOut.split('\n')) {
  const t = line.trim();
  if (!t || /^[0-9a-f]{40}$/.test(t)) continue;
  const rel = stripPrefix(t);
  if (rel !== null) committedFiles.add(rel);
}
for (const rel of committedFiles) {
  if (isSensitive(rel)) { skipped.push(rel); continue; }
  const src = path.join(ROOT, rel);
  if (fs.existsSync(src)) collected.push(rel);
  else removed.push(rel);
}

/** 2. 工作区未提交变更（mtime 视角，过滤当日） */
const porcelain = git(['-c', 'core.quotepath=false', 'status', '--porcelain']);
for (const line of porcelain.split('\n')) {
  if (!line.trim()) continue;
  let rel = line.slice(3).trim();
  rel = stripPrefix(rel);
  if (rel === null) continue; // 工作区之外（仓库根层）的文件不收
  const arrow = rel.indexOf(' -> ');
  if (arrow !== -1) rel = rel.slice(arrow + 4); // R/C 重命名取新路径
  if (isSensitive(rel)) { skipped.push(rel); continue; }
  if (line.startsWith('D ')) { removed.push(rel); continue; } // 删除仅记账
  if (!isTodayByMtime(rel)) continue; // 非当日变更不收
  collected.push(rel);
}

/** 3. 复制到当日目录 */
const copied = [];
for (const rel of collected) {
  const src = path.join(ROOT, rel);
  let st = null;
  try { st = fs.statSync(src); } catch { /* 当日已删 */ }
  if (!st) { removed.push(rel); continue; }
  if (st.isDirectory()) { skipped.push(`${rel}/`); continue; } // submodule/gitlink 只记路径
  const dest = path.join(TARGET_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied.push(rel);
}

/** 4. 生成清单与摘要 */
const manifest = [
  `# ${today} 工作空间活动归档`,
  '',
  `- 生成时间：${now.toISOString()}`,
  `- 收集文件：${copied.length} 个（当日新增/修改的产出与报告）`,
  `- 当日删除记账：${removed.length} 个（原文见主仓库 git 历史）`,
  `- 安全过滤跳过：${skipped.length} 个（敏感名/敏感目录，不公开）`,
  '',
  '## 收集文件',
  ...copied.map((f) => `- \`${f}\``),
  '',
  ...(skipped.length
    ? ['## 安全过滤跳过清单', ...skipped.map((f) => `- \`${f}\``), '']
    : []),
  '',
  '> 来源：工作区主仓库（E:\\Desktop\\AI_itself\\workspace_with_ai）。',
  '> 本仓库为个人工作空间的每日活动公开归档，内容自动生成。',
].join('\n');
fs.mkdirSync(TARGET_DIR, { recursive: true });
fs.writeFileSync(path.join(TARGET_DIR, 'MANIFEST.md'), manifest);

const commitLog = git(['log', `--since=${today} 00:00`, '--pretty=format:%h %ad %s', '--date=format:%Y-%m-%d %H:%M', '--']);
fs.writeFileSync(
  path.join(TARGET_DIR, '今日提交摘要.md'),
  `# ${today} 主仓库提交摘要\n\n\`\`\`\n${commitLog}\n\`\`\`\n`,
);

/** 5. commit + push（无变化则跳过） */
git(['add', '-A'], DAILY_DIR);
const stat = git(['status', '--porcelain'], DAILY_DIR);
if (!stat.trim()) {
  console.log(`no-changes: ${today} 无可归档变化，跳过提交。`);
  process.exit(0);
}
git(['commit', '-m', `daily: ${today} 工作空间活动归档（${copied.length} 文件）`], DAILY_DIR);
git(['push', 'origin', 'HEAD'], DAILY_DIR);
console.log(`ok: ${today} 收集 ${copied.length} 文件，跳过 ${skipped.length}，推送完成。`);