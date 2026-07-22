# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

## 今日要完成什麼

建立「校務文本智慧分析與問答助手」的最小資料管線：從講師指定的雲科大公開網站蒐集資料，保留來源，使用 Codex 的 MarkItDown MCP 轉為 Markdown，再進行 AI 分析、可引用的問答與回饋改善。

```text
seed URL → 爬取原始資料 → MarkItDown 解析 → 文本整理
         → AI 分析 → RAG 問答 → 問答回饋 → 改善清單
```

RAG 是驗證資料是否可用的一環；本日成果不只是一個 chatbot。

## 學習目標

完成本日後，學員能：

1. 在指定公開網站範圍內建立可重現的爬取清單與來源紀錄。
2. 使用 Codex + MarkItDown MCP 將本機 HTML、PDF、DOCX 轉為可檢查的 Markdown。
3. 為文本建立 metadata、段落切分與可回溯的 AI 分析結果。
4. 建立會引用文件與段落、且無證據時不猜測的 RAG 問答。
5. 從問答紀錄判讀資料或系統缺口，提出下一輪改善行動。

## 資料與安全邊界

- 只蒐集講師提供的 seed URL 白名單及其允許範圍內的公開附件。
- 不登入網站、不蒐集個人資料、不處理私人文件，也不進行全校網站爬取。
- `data/raw/` 的原始檔不可覆寫；衍生檔必須保留 `document_id`、`source_url`、`crawled_at`。
- MarkItDown MCP 是文件解析器，不是爬蟲；請先下載原始資料，再用本機 `file:` URI 解析。

## 時程

| 時段 | 主題 | 主要產出 |
| --- | --- | --- |
| 09:00–09:30 | 文本資料、來源與 MCP 預檢 | MarkItDown 測試紀錄 |
| 09:30–10:30 | 指定網站爬取 | 原始檔、crawl manifest |
| 10:30–12:00 | Markdown 解析與品質檢查 | Markdown、品質狀態 |
| 13:30–14:30 | 生成式 AI 文本分析 | processed chunks、分析表 |
| 14:30–15:40 | 可引用的 RAG 問答 | 測試題、答案、來源證據 |
| 15:40–16:30 | 回饋分析與展示 | 改善 backlog |

## 課程路徑

| 階段 | 提示詞 | 練習 |
| --- | --- | --- |
| MCP 預檢 | [00-codex-mcp-setup](prompts/00-codex-mcp-setup.md) | 納入練習 02 前置 |
| 爬取與 manifest | [01-crawl-specified-site](prompts/01-crawl-specified-site.md) | [01-crawl-and-manifest](exercises/01-crawl-and-manifest.md) |
| 解析與檢查 | [02-parse-with-markitdown](prompts/02-parse-with-markitdown.md) | [02-markdown-quality-check](exercises/02-markdown-quality-check.md) |
| 整理與分析 | [03-process-and-analyze-text](prompts/03-process-and-analyze-text.md) | [03-ai-text-analysis](exercises/03-ai-text-analysis.md) |
| RAG 問答 | [04-build-cited-rag](prompts/04-build-cited-rag.md) | [04-cited-rag-qa](exercises/04-cited-rag-qa.md) |
| 回饋改善 | [05-analyze-query-feedback](prompts/05-analyze-query-feedback.md) | [05-feedback-to-improvement](exercises/05-feedback-to-improvement.md) |

## 教材與專案模板

- [PRD](prd/generative-ai-text-analysis-prd.md)：課程案例、需求與驗收標準。
- [SDD](sdd/generative-ai-text-analysis-sdd.md)：資料流程、檔案責任與資料契約。
- [專案模板](project-template/README.md)：學員共同使用的資料夾與範例資料。
- [資料字典](project-template/docs/data-dictionary.md)：欄位與狀態定義。

## 最終繳交

每組繳交一份 `project-template/` 的複本，並確認包含：

1. `data/seeds/` 的核准來源範圍、`data/raw/` 原始檔與 `data/manifests/crawl_manifest.json`。
2. MarkItDown 產生的 `data/markdown/`，以及每份文件的品質檢查結論。
3. 至少三筆 `data/processed/` chunks、AI 分析結果與來源段落。
4. 四類測試問題的 RAG 回答；有根據者附引用，無根據者標示 `insufficient_evidence`。
5. 以問答紀錄產出的改善 backlog。

評量重點為資料可追溯性與改善判斷，不以聊天介面美觀或模型文字流暢度評分。

---

**負責講師**：張育慈 Ruby
