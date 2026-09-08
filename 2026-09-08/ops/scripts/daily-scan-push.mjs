#!/usr/bin/env node
/**
 * 每日事件扫描 + 推送脚本
 * 独立运行，不依赖 Claude Code REPL
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const WORKSPACE = 'E:/Desktop/AI_itself/workspace_with_ai';
const CLAUDE_DIR = process.env.HOME + '/.claude/projects';
const CODEX_DIR = process.env.HOME + '/.codex/sessions';
const BITABLE_TOKEN = 'URbrbJeWRa9ME4szDt8chJFlnJh';
const TABLE_ID = 'tbllaFaaPXDICn1U';
const USER_ID = 'ou_48f8eb6a50258accc2fc889cb76134a9';

// 获取昨天的日期（北京时间）
function getYesterday() {
  const now = new Date();
  const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
  beijingTime.setDate(beijingTime.getDate() - 1);
  const year = beijingTime.getUTCFullYear();
  const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(beijingTime.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 扫描 Claude 会话
function scanClaudeSessions(yesterday) {
  const events = [];
  try {
    const projects = readdirSync(CLAUDE_DIR);
    for (const project of projects) {
      const projectDir = join(CLAUDE_DIR, project);
      if (!statSync(projectDir).isDirectory()) continue;

      try {
        const files = readdirSync(projectDir);
        for (const file of files) {
          if (!file.endsWith('.jsonl')) continue;
          const filePath = join(projectDir, file);
          const stat = statSync(filePath);
          const modified = stat.mtime.toISOString().slice(0, 10);
          if (modified === yesterday) {
            const content = readFileSync(filePath, 'utf-8');
            const lines = content.trim().split('\n');
            const userMessages = lines
              .map(l => { try { return JSON.parse(l); } catch { return null; } })
              .filter(m => m && m.type === 'user' && typeof m.message?.content === 'string' && m.message.content.length > 20)
              .map(m => m.message.content)
              .filter(c => !c.includes('local-command') && !c.includes('command-name'));

            if (userMessages.length > 0) {
              events.push({
                source: 'Claude',
                project: project.replace(/--/g, '/'),
                file: file,
                messages: userMessages.slice(0, 5),
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
  return events;
}

// 扫描 Codex 会话
function scanCodexSessions(yesterday) {
  const events = [];
  try {
    const dateDir = join(CODEX_DIR, yesterday.slice(0, 4), yesterday.slice(5, 7), yesterday.slice(8));
    if (!statSync(dateDir).isDirectory()) return events;

    const files = readdirSync(dateDir).filter(f => f.endsWith('.jsonl'));
    for (const file of files) {
      const filePath = join(dateDir, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const lines = content.trim().split('\n');
        const userMsg = lines
          .map(l => { try { return JSON.parse(l); } catch { return null; } })
          .filter(m => m && m.type === 'event_msg' && m.payload?.type === 'user_message')
          .map(m => m.payload.message)
          .filter(m => typeof m === 'string' && m.length > 20 && !m.includes('/clear'))[0];

        if (userMsg) {
          events.push({
            source: 'Codex',
            project: 'Codex',
            file: file,
            messages: [userMsg],
            date: yesterday
          });
        }
      } catch (e) { /* skip */ }
    }
  } catch (e) {
    console.error('Codex scan error:', e.message);
  }
  return events;
}

// 分析事件并写入看板（避免重复）
function writeEvents(events, existingRecords) {
  if (events.length === 0) return 0;

  // 过滤掉已存在的事件
  const newEvents = events.filter(e => {
    const summary = `[${e.source}] ${e.messages[0].slice(0, 50)}`;
    return !existingRecords.some(existing => existing.includes(e.messages[0].slice(0, 30)));
  });

  if (newEvents.length === 0) return 0;

  // lark-cli 1.0.91 起 +record-batch-create 改用 create_records（字段映射数组），旧 fields/rows 结构已废弃
  const create_records = newEvents.map(e => ({
    '事件摘要': `[${e.source}] ${e.messages[0].slice(0, 50)}`,
    '日期': new Date(e.date + 'T12:00:00+08:00').getTime(),
    '事件类型': '进展',
    '信息来源': e.source,
    '相关项目': e.project,
    '原始内容': e.messages.join('\n---\n').slice(0, 1000),
    '更新日期': Date.now(),
    '分析过程': `来源：${e.file}`,
    '状态': ['待确认']
  }));

  const json = JSON.stringify({ create_records });

  const tmpDir = join(WORKSPACE, 'temp');
  mkdirSync(tmpDir, { recursive: true });
  const tmpFile = join(tmpDir, 'bitable-import.json');
  writeFileSync(tmpFile, json, 'utf-8');

  try {
    execSync(`cd "${WORKSPACE}" && lark-cli base +record-batch-create --as user --base-token ${BITABLE_TOKEN} --table-id ${TABLE_ID} --json @./temp/bitable-import.json`, { encoding: 'utf-8' });
    return create_records.length;
  } catch (e) {
    console.error('Write error:', e.message);
    return 0;
  }
}

// 获取现有记录，避免重复
function getExistingRecords() {
  try {
    const result = execSync(`lark-cli base +record-list --as user --base-token ${BITABLE_TOKEN} --table-id ${TABLE_ID} --format json`, { encoding: 'utf-8' });
    const data = JSON.parse(result);
    const records = data?.data?.data || [];
    // 返回所有记录的摘要（用于去重）
    return records.map(r => r[0]); // 事件摘要字段
  } catch (e) {
    return [];
  }
}

// 删除已忽略的记录
function deleteIgnored() {
  try {
    const result = execSync(`lark-cli base +record-list --as user --base-token ${BITABLE_TOKEN} --table-id ${TABLE_ID} --format json`, { encoding: 'utf-8' });
    const data = JSON.parse(result);
    const records = data?.data?.data || [];
    const recordIds = data?.data?.record_id_list || [];
    let deleted = 0;
    for (let i = 0; i < records.length; i++) {
      const status = records[i][2]; // 状态字段
      if (Array.isArray(status) && status[0] === '已忽略') {
        try {
          execSync(`lark-cli base +record-delete --as user --base-token ${BITABLE_TOKEN} --table-id ${TABLE_ID} --record-id ${recordIds[i]} --yes`, { encoding: 'utf-8' });
          deleted++;
        } catch (e) { /* skip */ }
      }
    }
    return deleted;
  } catch (e) {
    console.error('Delete ignored error:', e.message);
    return 0;
  }
}

// 发送推送消息
function sendPush(summary) {
  try {
    // 不指定 profile，使用当前环境中的默认配置
    execSync(`lark-cli im +messages-send --as bot --chat-id ${CHAT_ID} --text "${summary}"`, { encoding: 'utf-8' });
  } catch (e) {
    console.error('Push error:', e.message);
  }
}

// 主函数
function main() {
  const yesterday = getYesterday();
  console.log(`Scanning for: ${yesterday}`);

  // 1. 扫描
  const claudeEvents = scanClaudeSessions(yesterday);
  const codexEvents = scanCodexSessions(yesterday);
  const allEvents = [...claudeEvents, ...codexEvents];

  console.log(`Claude events: ${claudeEvents.length}`);
  console.log(`Codex events: ${codexEvents.length}`);

  // 2. 删除已忽略
  const deleted = deleteIgnored();
  console.log(`Deleted ignored: ${deleted}`);

  // 3. 获取现有记录并写入新事件
  const existingRecords = getExistingRecords();
  const written = writeEvents(allEvents, existingRecords);
  console.log(`Written events: ${written}`);

  // 4. 推送
  const summary = `📊 每日事件扫描完成（${yesterday}）

扫描结果：
- Claude 会话：${claudeEvents.length}个有效事件
- Codex 会话：${codexEvents.length}个有效事件

看板更新：
- 删除已忽略：${deleted}条
- 新增待确认：${written}条

下次扫描时间：明天 1:03 AM`;

  sendPush(summary);
  console.log('Done');
}

main();
