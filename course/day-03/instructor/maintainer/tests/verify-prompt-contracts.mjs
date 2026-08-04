import { existsSync, readFileSync } from 'node:fs';

const promptFile = 'rag-demo/PROMPTS.md';
if (!existsSync(promptFile)) {
  console.error(`FAIL analysis-first contract: missing ${promptFile}`);
  process.exit(1);
}

const guide = readFileSync(promptFile, 'utf8');
const checks = [
  'data/manifests/crawl_manifest.jsonl',
  '提示詞 1｜先確認工具',
  '提示詞 2｜把文件轉成 Markdown 並檢查品質',
  '提示詞 3｜建立校務文件分析表',
  '提示詞 4｜切成可搜尋的小段落並建立索引',
  '提示詞 5｜建立可引用的問答助手',
  '文件明確寫了什麼',
  '適用對象與年度',
  '學生需要採取的行動',
  'AI 摘要或分類',
  '不確定處',
  '來源段落',
  '資料不足，無法根據目前來源回答',
  'python -m streamlit run rag/app.py',
  '問答紀錄',
];

const missing = checks.filter((text) => !guide.includes(text));
if (missing.length) {
  console.error(`FAIL analysis-first contract: missing ${missing.join(' | ')}`);
  process.exit(1);
}

const forbidden = [
  'git switch -c practice/day-03',
  'git push -u origin',
  '20 個網頁和 20 份附件',
  '兩次請求至少相隔 1 秒',
  '逐份確認公開規範',
];
const leaked = forbidden.filter((text) => guide.includes(text));
if (leaked.length) {
  console.error(`FAIL analysis-first contract: old required workflow remains ${leaked.join(' | ')}`);
  process.exit(1);
}

const promptCount = (guide.match(/^## 提示詞 [1-5]｜/gm) || []).length;
if (promptCount !== 5) {
  console.error(`FAIL analysis-first contract: expected 5 prompts, found ${promptCount}`);
  process.exit(1);
}

console.log('PASS afternoon RAG student contract: 5 prompts, fixed source package, analysis table, cited Q&A');
