#!/usr/bin/env node
/**
 * 每日项目事件扫描脚本
 * 扫描前一天的 Claude/Codex 记录和知识库变化，提取业务信息写入飞书看板
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const CLAUDE_DIR = process.env.HOME + '/.claude/projects';
const CODEX_DIR = process.env.HOME + '/.codex/sessions';
const WORKSPACE = process.env.LARK_CHANNEL_HOME || 'E:/Desktop/AI_itself/workspace_with_ai';
const BITABLE_TOKEN = 'URbrbJeWRa9ME4szDt8chJFlnJh';
const TABLE_ID = 'tbllaFaaPXDICn1U';

// 获取昨天的日期（北京时间 UTC+8）
function getYesterday() {
  const now = new Date();
  // 获取北京时间的昨天
  const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
  beijingTime.setDate(beijingTime.getDate() - 1);
  const year = beijingTime.getUTCFullYear();
  const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(beijingTime.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 获取昨天的时间范围
function getYesterdayRange() {
  const yesterday = getYesterday();
  const start = new Date(yesterday + 'T00:00:00+08:00');
  const end = new Date(yesterday + 'T23:59:59+08:00');
  return { start, end, dateStr: yesterday };
}

// 扫描 Claude 记录
function scanClaudeRecords(yesterday) {
  const records = [];
  try {
    const projects = readdirSync(CLAUDE_DIR);
    for (const project of projects) {
      const projectDir = join(CLAUDE_DIR, project);
      if (!statSync(projectDir).isDirectory()) continue;

      // 查找 memory 目录下的文件
      const memoryDir = join(projectDir, 'memory');
      try {
        const files = readdirSync(memoryDir);
        for (const file of files) {
          const filePath = join(memoryDir, file);
          const stat = statSync(filePath);
          const modified = stat.mtime.toISOString().slice(0, 10);
          if (modified === yesterday) {
            records.push({
              source: 'Claude',
              project: project.replace(/--/g, '/').replace(/C--Users----/g, '用户目录').replace(/E--Desktop-AI-itself-workspace-with-ai/g, 'workspace'),
              file: file,
              content: readFileSync(filePath, 'utf-8').slice(0, 2000),
              date: yesterday
            });
          }
        }
      } catch (e) { /* no memory dir */ }

      // 查找 JSONL 会话文件
      try {
        const files = readdirSync(projectDir);
        for (const file of files) {
          if (!file.endsWith('.jsonl')) continue;
          const filePath = join(projectDir, file);
          const stat = statSync(filePath);
          const modified = stat.mtime.toISOString().slice(0, 10);
          if (modified === yesterday) {
            const content = readFileSync(filePath, 'utf-8');
            // 提取最后几条消息
            const lines = content.trim().split('\n').slice(-10);
            const messages = lines.map(l => {
              try { return JSON.parse(l); } catch { return null; }
            }).filter(Boolean).filter(m => m.type === 'human' || m.type === 'assistant');

            if (messages.length > 0) {
              const text = messages.map(m => {
                if (m.type === 'human') return `[用户]: ${typeof m.message === 'string' ? m.message : JSON.stringify(m.message).slice(0, 200)}`;
                if (m.type === 'assistant') return `[AI]: ${m.message?.content ? (Array.isArray(m.message.content) ? m.message.content.map(c => c.text || '').join('') : m.message.content) : ''}`.slice(0, 500);
                return '';
              }).filter(Boolean).join('\n');

              records.push({
                source: 'Claude',
                project: project.replace(/--/g, '/'),
                file: file,
                content: text.slice(0, 2000),
                date: yesterday
              });
            }
          }
        }
      } catch (e) { /* skip */ }
    }
  } catch (e) {
    console.error('Claude scan error:', e.message);
  }
  return records;
}

// 扫描 Codex 记录
function scanCodexRecords(yesterday) {
  const records = [];
  try {
    const dateDir = join(CODEX_DIR, yesterday.slice(0, 4), yesterday.slice(5, 7));
    const dayDir = join(dateDir, yesterday.slice(8));
    if (!statSync(dayDir).isDirectory()) return records;

    const files = readdirSync(dayDir);
    for (const file of files) {
      const filePath = join(dayDir, file);
      const stat = statSync(filePath);

      // 直接读取 .jsonl 会话文件
      if (file.endsWith('.jsonl') && stat.isFile()) {
        try {
          const content = readFileSync(filePath, 'utf-8');
          const lines = content.trim().split('\n').slice(-5);
          const messages = lines.map(l => {
            try { return JSON.parse(l); } catch { return null; }
          }).filter(Boolean);

          if (messages.length > 0) {
            const text = messages.map(m => {
              if (m.type === 'user' || m.role === 'user') return `[用户]: ${(m.content || m.text || '').slice(0, 200)}`;
              if (m.type === 'assistant' || m.role === 'assistant') return `[AI]: ${(m.content || m.text || '').slice(0, 500)}`;
              return '';
            }).filter(Boolean).join('\n');

            records.push({
              source: 'Codex',
              project: 'Codex',
              file: file,
              content: text.slice(0, 2000) || content.slice(0, 2000),
              date: yesterday
            });
          }
        } catch (e) { /* skip unreadable files */ }
      }
    }
  } catch (e) {
    console.error('Codex scan error:', e.message);
  }
  return records;
}

// 扫描知识库变化
function scanKnowledgeChanges(yesterday) {
  const records = [];
  try {
    const output = execSync(`cd "${WORKSPACE}" && git log --since="${yesterday}T00:00:00" --until="${yesterday}T23:59:59" --name-only --pretty=format:"%h %s"`, { encoding: 'utf-8' });

    if (!output.trim()) return records;

    const lines = output.split('\n');
    let currentCommit = '';
    for (const line of lines) {
      if (line.match(/^[a-f0-9]+ /)) {
        currentCommit = line;
      } else if (line.startsWith('bAI/bAI/')) {
        const type = line.includes('/wiki/') ? 'Wiki' :
                    line.includes('/raw/') ? 'Raw' :
                    line.includes('/notes/') ? 'Notes' : '其他';
        records.push({
          source: type,
          project: '知识库',
          file: line,
          content: currentCommit,
          date: yesterday
        });
      }
    }
  } catch (e) {
    console.error('Git scan error:', e.message);
  }
  return records;
}

// 写入飞书看板
async function writeToBitable(records) {
  if (records.length === 0) {
    console.log('No records to write');
    return;
  }

  // 准备批量创建的数据（lark-cli 1.0.91 起 +record-batch-create 改用 create_records 字段映射结构）
  const create_records = records.map(r => ({
    '事件摘要': `[${r.source}] ${r.file}`,
    '日期': new Date(r.date + 'T12:00:00+08:00').getTime(),
    '事件类型': '进展',
    '信息来源': r.source,
    '相关项目': r.project,
    '原始内容': r.content
  }));

  const json = JSON.stringify({ create_records });

  try {
    // 写入临时文件避免命令行转义问题
    const tmpDir = join(WORKSPACE, 'temp');
    const { writeFileSync, mkdirSync } = await import('fs');
    mkdirSync(tmpDir, { recursive: true });
    const tmpFile = join(tmpDir, 'bitable-import.json');
    writeFileSync(tmpFile, json, 'utf-8');

    const cmd = `lark-cli base +record-batch-create --as user --base-token ${BITABLE_TOKEN} --table-id ${TABLE_ID} --json @./temp/bitable-import.json`;
    execSync(cmd, { encoding: 'utf-8', cwd: WORKSPACE });
    console.log(`Written ${records.length} records`);
  } catch (e) {
    console.error(`Write failed:`, e.message);
  }
}

// 主函数
async function main() {
  const { dateStr } = getYesterdayRange();
  console.log(`Scanning records for: ${dateStr}`);

  const claudeRecords = scanClaudeRecords(dateStr);
  console.log(`Claude records: ${claudeRecords.length}`);

  const codexRecords = scanCodexRecords(dateStr);
  console.log(`Codex records: ${codexRecords.length}`);

  const kbRecords = scanKnowledgeChanges(dateStr);
  console.log(`Knowledge base changes: ${kbRecords.length}`);

  const allRecords = [...claudeRecords, ...codexRecords, ...kbRecords];
  console.log(`Total records: ${allRecords.length}`);

  await writeToBitable(allRecords);
  console.log('Done');
}

main().catch(console.error);
