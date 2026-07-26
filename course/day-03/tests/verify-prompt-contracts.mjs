import { readFileSync } from 'node:fs';

const checks = [
  {
    name: '00｜個人專案與 scope',
    path: 'prompts/00-create-project-and-start-url.md',
    required: [
      'data/raw/',
      'data/manifests/',
      'allowed_hosts',
      'max_pages',
      'max_attachments',
      'request_delay_seconds',
      '不要開始爬取',
      '讀回 `crawl_scope.json`',
    ],
  },
  {
    name: '01｜限定範圍爬取',
    path: 'prompts/01-crawl-specified-site.md',
    required: [
      'robots.txt',
      'tve.yuntech.edu.tw',
      '20 個 HTML',
      '20 份附件',
      '單一連線',
      '至少間隔 1 秒',
      'Content-Type',
      'Content-Disposition',
      'crawl_manifest.json',
      '一次只處理一個 URL',
    ],
  },
  {
    name: '02｜MarkItDown 解析',
    path: 'prompts/02-parse-with-markitdown.md',
    required: [
      'crawl_status: "success"',
      'file:',
      'data/markdown/<document_id>.md',
      'quality_report.jsonl',
      'checked_features',
      'needs_review',
      '不修改 `data/raw/`',
      'codex mcp list',
      '`enabled`',
      '新的 task',
    ],
  },
  {
    name: '03｜整理與分析',
    path: 'prompts/03-process-and-analyze-text.md',
    required: [
      'ready_for_analysis',
      'chunks.jsonl',
      'document_evidence',
      'ai_interpretation',
      '至少三筆',
      '不要用 `needs_review` 文件湊數',
      '不要覆寫原始 Markdown 或 raw 檔',
    ],
  },
  {
    name: '04｜引用 RAG',
    path: 'prompts/04-build-cited-rag.md',
    required: [
      'streamlit run rag/app.py',
      '問答歷程',
      'nomic-embed-text-v2-moe',
      '最多三筆',
      'qwen2.5:3b',
      'insufficient_evidence',
      '不要呼叫回答模型',
      'query_log.jsonl',
      '`answer`',
      'self_test_note',
      '修復步驟',
    ],
  },
  {
    name: '05｜自我測試改善',
    path: 'prompts/05-analyze-query-feedback.md',
    required: [
      'improvement_backlog.md',
      'query_id',
      'add_source',
      'repair_parse',
      'revise_chunking_or_metadata',
      'improve_retrieval',
      'revise_prompt',
      '真實使用者趨勢',
      '樣本限制',
    ],
  },
];

let failed = false;

for (const { name, path, required } of checks) {
  const prompt = readFileSync(path, 'utf8');
  const missing = required.filter((text) => !prompt.includes(text));

  if (missing.length === 0) {
    console.log(`PASS ${name}: ${required.length} contract checks`);
    continue;
  }

  failed = true;
  console.error(`FAIL ${name}: missing ${missing.join(' | ')}`);
}

if (failed) process.exit(1);
