# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

## 今日要完成什麼

建立「校務文本智慧分析與問答助手」的最小資料管線：從講師指定的雲科大公開網站蒐集資料，保留來源，使用 Codex 的 MarkItDown MCP 轉為 Markdown，再進行 AI 分析、可引用的問答與回饋改善。

```text
起始網址 → 確認爬取範圍 → 爬取原始資料 → MarkItDown 解析 → 文本整理
         → AI 分析 → RAG 問答 → 問答回饋 → 改善清單
```

RAG 是驗證資料是否可用的一環；本日成果不只是一個 chatbot。

## 課前必要工具

- Codex 與 MarkItDown MCP：用於將已下載的公開文件轉成 Markdown。
- Ollama：所有學員在課前安裝，並執行 `ollama pull qwen2.5:3b` 下載指定本機模型。Day-03 的對話機器人不使用雲端 API。

## 學習目標

完成本日後，學員能：

1. 從指定公開起始網址確認可重現的爬取範圍與來源紀錄。
2. 使用 Codex + MarkItDown MCP 將本機 HTML、PDF、DOCX 轉為可檢查的 Markdown。
3. 為文本建立 metadata、段落切分與可回溯的 AI 分析結果。
4. 建立會引用文件與段落、且無證據時不猜測的 RAG 問答。
5. 從問答紀錄判讀資料或系統缺口，提出下一輪改善行動。

## 資料與安全邊界

- 只蒐集講師指定起始網址所確認之範圍內的公開網頁與附件。
- 只處理無需登入即可存取的公開網頁與公開附件；可保留其中已公開的聯絡資訊，但不得嘗試取得受限、私密或白名單外內容。
- `data/raw/` 的原始檔不可覆寫。下載附件放在 `data/raw/<document_id>/<原始檔名>`，保留網站提供的原始檔名；衍生檔必須保留 `document_id`、`source_url`、`crawled_at`。
- MarkItDown MCP 是文件解析器，不是爬蟲；請先下載原始資料，再用本機 `file:` URI 解析。

## 時程

| 時段 | 主題 | 主要產出 |
| --- | --- | --- |
| 09:00–09:30 | 文本資料、來源、爬取範圍與可追溯性 | 起始網址與爬取規則 |
| 09:30–10:30 | 指定網站爬取 | 原始檔、crawl manifest |
| 10:30–12:00 | 用剛爬取的文件確認 MCP、解析與品質檢查 | Markdown、品質狀態 |
| 13:30–14:30 | 生成式 AI 文本分析 | processed chunks、分析表 |
| 14:30–15:40 | 可引用的 RAG 問答 | 測試題、答案、來源證據 |
| 15:40–16:30 | 回饋分析與展示 | 改善 backlog |

## 課程路徑

| 階段 | 提示詞 | 練習 |
| --- | --- | --- |
| 建立個人專案與起始網址 | [00-create-project-and-start-url](prompts/00-create-project-and-start-url.md) | 爬取前置 |
| 爬取與 manifest | [01-crawl-specified-site](prompts/01-crawl-specified-site.md) | [01-crawl-and-manifest](exercises/01-crawl-and-manifest.md) |
| 確認 MCP、解析與檢查 | [02-parse-with-markitdown](prompts/02-parse-with-markitdown.md) | [02-markdown-quality-check](exercises/02-markdown-quality-check.md) |
| 整理與分析 | [03-process-and-analyze-text](prompts/03-process-and-analyze-text.md) | [03-ai-text-analysis](exercises/03-ai-text-analysis.md) |
| RAG 問答 | [04-build-cited-rag](prompts/04-build-cited-rag.md) | [04-cited-rag-qa](exercises/04-cited-rag-qa.md) |
| 回饋改善 | [05-analyze-query-feedback](prompts/05-analyze-query-feedback.md) | [05-feedback-to-improvement](exercises/05-feedback-to-improvement.md) |

## 教材文件

- [PRD](prd/generative-ai-text-analysis-prd.md)：課程案例、需求與驗收標準。
- [SDD](sdd/generative-ai-text-analysis-sdd.md)：資料流程、檔案責任與資料契約。

## 建立小組實作資料夾

clone 課程 repo 後，每組在 `course/day-03/` 下自行建立工作資料夾，例如 `team-01-project/`；不要改動講義、提示詞或練習檔。

```text
team-01-project/
├── data/raw/         不可覆寫的 HTML、PDF、DOCX；附件依 document_id 分資料夾並保留原始檔名
├── data/manifests/   crawl scope、來源、時間、路徑與狀態
├── data/markdown/    MarkItDown 輸出
├── data/processed/   metadata 與 chunks
├── analysis/
├── rag/
├── feedback/
└── docs/
```

每一筆衍生資料保留 `document_id`、`source_url`、`crawled_at`；可用的處理狀態為 `collected`、`parsed`、`needs_review`、`ready_for_analysis`、`excluded`。

## 最終繳交

每組繳交自己的 `team-xx-project/`，並確認包含：

1. `data/manifests/crawl_scope.json` 的確認範圍、`data/raw/` 原始檔與 `data/manifests/crawl_manifest.json`。
2. MarkItDown 產生的 `data/markdown/`，以及每份文件的品質檢查結論。
3. 至少三筆 `data/processed/` chunks、AI 分析結果與來源段落。
4. 可由 `streamlit run rag/app.py` 開啟的本機對話機器人；四類測試問題的 RAG 回答有根據者附引用，無根據者標示 `insufficient_evidence`，並寫入 `feedback/query_log.jsonl`。
5. 以問答紀錄產出的改善 backlog。

評量重點為資料可追溯性與改善判斷，不以聊天介面美觀或模型文字流暢度評分。

---

**負責講師**：張育慈 Ruby
