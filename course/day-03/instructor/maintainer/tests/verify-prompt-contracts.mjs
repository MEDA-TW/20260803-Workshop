import { readFileSync } from 'node:fs';

const checks = [
  {
    name: '00｜個人專案與 scope',
    path: 'STUDENT_GUIDE.md',
    required: [
      '建立資料夾',
      '建立資料範圍',
      '雲科大技職所、語言中心與教務處',
      '20 個網頁和 20 份附件',
      '兩次請求至少相隔 1 秒',
      '現在不要抓資料',
      '資料範圍用簡短清單讀回',
    ],
  },
  {
    name: '01｜限定範圍爬取',
    path: 'STUDENT_GUIDE.md',
    required: [
      '批次取得、解析與品質檢查',
      '一次依序處理全部資料',
      '逐份確認公開規範',
      '可以繼續才取得並保留原始檔',
      '保留原始檔',
      'MarkItDown 已啟用',
      'document_id',
      'source_url',
      'crawled_at',
      'data/manifests/crawl_manifest.jsonl',
      'crawl_status',
      'error_message',
      '失敗原因',
      '繼續處理下一份指定資料',
      '網址、格式、取得、解析與品質結果',
    ],
  },
  {
    name: '02｜MarkItDown 解析',
    path: 'STUDENT_GUIDE.md',
    required: [
      'MarkItDown',
      'MarkItDown 已啟用',
      '原始檔必須保留不動',
      '可閱讀、可搜尋的文字',
      '品質結果',
      '可分析',
      '需要人工查看',
    ],
  },
  {
    name: '03｜整理與分析',
    path: 'STUDENT_GUIDE.md',
    required: [
      '品質檢查通過',
      '適合進一步整理',
      '適合被問答系統搜尋的小段落',
      '原始來源與取得時間',
      '文件明確寫了什麼',
      '你的摘要或分類',
      '至少有三段可回到來源的內容',
      '不要改動原始資料',
    ],
  },
  {
    name: '04｜Codex 建立引用 RAG',
    path: 'STUDENT_GUIDE.md',
    required: [
      '建立搜尋索引',
      '從空白建立 `rag/app.py`',
      '頁面底部加入可輸入問題的輸入框',
      '＋ 開新對話',
      'vector_index.jsonl',
      '最多三個 chunks',
      '問答紀錄',
      '我的資料，不是範例資料',
      'insufficient_evidence',
      '英文與日期題',
      '適用年度或公告日期',
      'instructor/demo/app.py',
    ],
  },
  {
    name: '05｜自我測試改善',
    path: 'STUDENT_GUIDE.md',
    required: [
      '改善清單',
      '依據哪一題',
      '補資料、修解析、調整段落、改善檢索或修改提示詞',
      '真實使用者趨勢',
      '資料太少時要說明限制',
      '修課或畢業學分',
      '英文門檻',
      '流程或表單',
      '校務日期',
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
