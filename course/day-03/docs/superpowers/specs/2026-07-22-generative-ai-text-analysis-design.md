# Day 3：生成式人工智慧於文本資料分析的應用

## 設計目的

本課程採「資料管線型」設計，而非以聊天介面為中心。學員將從指定雲科大公開網站取得文本資料，經由 Codex 的 MarkItDown MCP 轉換與檢查，再完成生成式 AI 文本分析、具引用的 RAG 問答，以及以互動資料改善系統的閉環。

核心問題是：如何將公開校務文本轉為可追溯、可驗證、可供生成式 AI 使用的資料資產？

## 課程定位與邊界

### 課程主軸

```text
資料取得 → 文件解析 → 文本整理 → 生成式 AI 分析 → RAG 應用 → 回饋改善
```

RAG 是資料品質與可用性的驗證應用，不是唯一或最終成果。

### 範圍

- 資料來源為講師指定的雲科大公開網站範圍。
- 從講師提供的公開起始網址確認範圍後，取得 HTML 與其公開附件（PDF、DOCX）。
- 爬取後保留原始檔與爬取紀錄，再以 MarkItDown MCP 轉為 Markdown。
- 使用處理後文本完成摘要、分類、關鍵資訊擷取、主題分析與引用式問答。
- 以學生實際問答產生的紀錄分析系統缺口並提出改善。

### 非範圍

- 不進行全校網站爬取、即時同步或正式上線部署。
- 不蒐集登入後資料、非公開資料或白名單外內容；公開網頁與附件中的公開聯絡資訊可隨資料保留。
- 不將聊天介面美觀、帳號系統或大型向量資料庫作為必要成果。
- 不以模型回答流暢度視為正確性證據。

## 共同工具

所有學員共同使用 Codex 的 MarkItDown MCP。MCP 的用途是將已取得的本機 HTML、PDF 或 DOCX 轉換成 Markdown；其不是網站爬蟲。

完成第一輪爬取後、進入解析階段前，學員須用一筆成功取得的本機文件確認 MCP 可用並成功轉出 Markdown。因 MCP 以使用者權限讀取本機檔案與可連線的網路資源，教材只允許指定資料夾與公開來源。

## 資料流程與產物

```text
起始網址與 crawl scope
→ 原始 HTML／附件 + crawl manifest
→ MarkItDown 產生 Markdown + 品質檢查
→ 清理、切分、metadata 的 processed JSON
→ AI 分析結果
→ RAG 回答與來源證據
→ 問答紀錄分析與改善 backlog
```

每一層皆保留，不覆蓋前一層。任何分析結論與問答答案都能回溯至原始網址、擷取時間、原始檔與 Markdown 段落。

每組自行建立專案骨架，例如 `team-01-project/`：

```text
team-01-project/
├── data/
│   ├── raw/
│   ├── manifests/
│   ├── markdown/
│   └── processed/
├── analysis/
├── rag/
├── feedback/
└── docs/
    └── data-dictionary.md
```

`crawl_manifest.json` 至少記錄來源 URL、標題、檔案類型、擷取時間、原始檔路徑與處理狀態。每份處理後文件至少有 `document_id`、`title`、`source_url`、`source_type`、`crawled_at`、`published_at`、`category`、`markdown_path` 與 `status`。

## 課程時程

| 時段 | 主題 | 主要產出 |
| --- | --- | --- |
| 09:00–09:30 | 文本資料、來源與可追溯性 | 資料邊界與爬取規則 |
| 09:30–10:30 | 指定網站爬取 | 原始檔與 crawl manifest |
| 10:30–12:00 | 以剛爬取的文件確認 MCP、解析與品質檢查 | Markdown 與檢查紀錄 |
| 13:30–14:30 | 生成式 AI 文本分析 | 結構化資料與分析結果 |
| 14:30–15:40 | 可引用的 RAG 問答 | 測試題、答案與來源證據 |
| 15:40–16:30 | 問答紀錄、改善與展示 | 改善 backlog |

## 五個連續練習

1. **資料來源探索與爬取**：依白名單下載頁面與附件，產出原始檔與 `crawl_manifest.json`。
2. **MarkItDown 解析與品質檢查**：轉換 HTML、PDF、DOCX，並檢查標題、段落、表格與條列是否可讀；異常必須標記。
3. **文本整理與 AI 分析**：建立 metadata 與段落切分，完成摘要、分類、關鍵資訊擷取與主題整理；結果須可回連來源段落。
4. **可引用的 RAG 問答**：回答指定校務問題，提供文件名稱、URL 與段落或頁面依據；找不到證據時說明限制。
5. **問答紀錄分析與改善**：從學生實際問答紀錄找出高頻、未解與低證據問題，將每項問題歸因為補文件、改解析、改切分或 metadata、改檢索或改提示詞。

## 教材結構

```text
day-03/
├── README.md
├── prd/generative-ai-text-analysis-prd.md
├── sdd/generative-ai-text-analysis-sdd.md
├── prompts/
│   ├── 00-create-project-and-start-url.md
│   ├── 01-crawl-specified-site.md
│   ├── 02-parse-with-markitdown.md
│   ├── 03-process-and-analyze-text.md
│   ├── 04-build-cited-rag.md
│   └── 05-analyze-query-feedback.md
├── exercises/
│   ├── 01-crawl-and-manifest.md
│   ├── 02-markdown-quality-check.md
│   ├── 03-ai-text-analysis.md
│   ├── 04-cited-rag-qa.md
│   └── 05-feedback-to-improvement.md
└── team-xx-project/
```

每份提示詞固定交代任務目的、輸入、資料邊界、預期輸出、驗收條件與失敗回報要求。

## 驗收與評量

| 面向 | 比重 | 證據 |
| --- | ---: | --- |
| 資料蒐集與來源紀錄 | 20% | manifest 完整，原始檔可對照 URL |
| MarkItDown 解析與品質檢查 | 20% | Markdown 可讀，異常有處理紀錄 |
| 文本整理與 AI 分析 | 20% | metadata、切分與分析可回溯來源 |
| RAG 回答與引用 | 25% | 有來源依據；無證據時不捏造 |
| 回饋分析與改善方案 | 15% | 有證據且可執行的改善 backlog |

最終成果包含三層：資料資產（原始資料至處理後文本）、AI 應用（分析與引用式問答）、改善證據（問題分析與改善清單）。
