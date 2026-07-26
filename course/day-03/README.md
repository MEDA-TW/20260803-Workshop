# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

## 今日要完成什麼

建立「校務文本智慧分析與問答助手」的最小資料管線：從雲科大技職所公開網站蒐集資料，保留來源，使用 Codex 的 MarkItDown MCP 轉為 Markdown，再進行 AI 分析、可引用的向量檢索問答與自我測試改善。

```text
起始網址 → 確認爬取範圍 → 爬取原始資料 → MarkItDown 解析 → 文本整理
         → AI 分析 → 向量檢索問答 → 自我測試 → 改善清單
```

RAG 是驗證資料是否可用的一環；本日成果不只是一個 chatbot。

## 課堂工具建置與健康檢查

09:00–09:30 在課堂中完成下列工具安裝與檢查；講師提供操作協助。學生須在自己的電腦上完成：

- 在 Terminal 執行 `codex mcp list`，確認出現 `markitdown` 且狀態為 `enabled`；再在 Codex 以講師提供的公開範例檔用本機 `file:` URI 成功解析一次。若未出現，依[安裝與健康檢查指引](instructor-resources/install-and-health-check.md)處理。
- 安裝 Ollama，執行 `ollama pull qwen2.5:3b` 與 `ollama pull nomic-embed-text-v2-moe`。
- 安裝 Python 套件 `streamlit` 與 Ollama Python 用戶端，確認 Python 可執行。
- 以 `ollama list` 確認兩個模型都存在；Day-03 不使用雲端 API。

若本機模型或服務未能啟動，仍可完成資料管線、向量索引建立與引用／不足證據的預期處理；介面必須顯示可行修復指引，不得假裝已生成答案。

## 學習目標

完成本日後，學員能：

1. 從指定公開起始網址確認可重現的爬取範圍與來源紀錄。
2. 使用 Codex + MarkItDown MCP 將本機 HTML、PDF、DOCX 轉為可檢查的 Markdown。
3. 為文本建立 metadata、段落切分與可回溯的 AI 分析結果。
4. 建立本機向量檢索問答：回答附文件與段落引用，無證據時不猜測。
5. 從自我測試紀錄判讀資料或系統缺口，提出下一輪改善行動。

## 資料與安全邊界

- 統一起始網址為 `https://tve.yuntech.edu.tw/`；只蒐集該完整主機名稱下、無需登入即可存取的公開 HTML、PDF、DOCX。不可跟隨其他子網域或外部網站。
- 爬取前先檢查並遵守 `robots.txt` 與網站使用規範；若不允許自動擷取，停止並依講師備援規則處理。
- 每人最多取得 20 個 HTML 頁面與 20 份 PDF／DOCX 附件；單一連線，每次請求至少間隔 1 秒，達上限即停止。
- 可保留公開頁面中的聯絡資訊，但不得嘗試取得受限、私密或白名單外內容，也不得將本機原型部署或公開分享。
- `data/raw/` 的原始檔不可覆寫。下載附件放在 `data/raw/<document_id>/<原始檔名>`，保留網站提供的原始檔名；衍生檔必須保留 `document_id`、`source_url`、`crawled_at`。
- MarkItDown MCP 是文件解析器，不是爬蟲；請先下載原始資料，再用本機 `file:` URI 解析。

## 講師備援規則

只有網站、下載、解析或站方規範異常，導致學生無法取得至少三筆 `ready_for_analysis` chunks 時，講師才提供一份同樣屬於公開來源的 HTML、PDF、DOCX 備援資料與來源資訊。學生仍須為備援資料建立 scope、manifest、Markdown、品質報告與 provenance；不可跳過爬取直接索取備援。

## 時程

| 時段 | 主題 | 主要產出 |
| --- | --- | --- |
| 09:00–09:30 | 工具安裝與健康檢查 | MCP 與本機模型可用 |
| 09:30–10:00 | 文本資料、來源與爬取範圍 | crawl scope |
| 10:00–12:00 | 指定網站爬取、解析與品質檢查 | 原始檔、manifest、Markdown、品質狀態 |
| 13:30–14:30 | 生成式 AI 文本分析 | processed chunks、分析表 |
| 14:30–15:40 | 本機向量檢索與可引用問答 | 測試題、答案、來源證據 |
| 15:40–16:30 | 自我測試與改善 | 改善 backlog |

## 課程路徑

| 階段 | 提示詞 | 練習 |
| --- | --- | --- |
| 建立個人專案與起始網址 | [00-create-project-and-start-url](prompts/00-create-project-and-start-url.md) | 爬取前置 |
| 爬取與 manifest | [01-crawl-specified-site](prompts/01-crawl-specified-site.md) | [01-crawl-and-manifest](exercises/01-crawl-and-manifest.md) |
| 確認 MCP、解析與檢查 | [02-parse-with-markitdown](prompts/02-parse-with-markitdown.md) | [02-markdown-quality-check](exercises/02-markdown-quality-check.md) |
| 整理與分析 | [03-process-and-analyze-text](prompts/03-process-and-analyze-text.md) | [03-ai-text-analysis](exercises/03-ai-text-analysis.md) |
| 向量檢索問答 | [04-build-cited-rag](prompts/04-build-cited-rag.md) | [04-cited-rag-qa](exercises/04-cited-rag-qa.md) |
| 自我測試與改善 | [05-analyze-query-feedback](prompts/05-analyze-query-feedback.md) | [05-feedback-to-improvement](exercises/05-feedback-to-improvement.md) |

## 教材文件

- [PRD](prd/generative-ai-text-analysis-prd.md)：課程案例、需求與完成條件。
- [SDD](sdd/generative-ai-text-analysis-sdd.md)：資料流程、檔案責任與資料契約。

## 講師資源

- [安裝與健康檢查指引](instructor-resources/install-and-health-check.md)：課前安裝、課堂前 30 分鐘檢查與常見排錯。
- [公開備援包](instructor-resources/fallback-package/README.md)：僅在網站、下載、解析或站方規範異常造成學生無法取得至少三筆可用 chunks 時，由講師啟用；不可預先發放。

## 教材提示詞檢查

在 `course/day-03/` 執行 `node tests/verify-prompt-contracts.mjs`，可檢查六份提示詞是否仍保留課程的資料範圍、provenance、RAG 與自我測試契約。此檢查不取代課堂中的 MarkItDown MCP 與 Ollama 實機健康檢查。

## 建立個人實作資料夾

clone 課程 repo 後，每位學員在 `course/day-03/` 下自行建立工作資料夾（名稱自訂）；不要改動講義、提示詞或練習檔。

```text
my-project/
├── data/raw/         不可覆寫的 HTML、PDF、DOCX；附件依 document_id 分資料夾並保留原始檔名
├── data/manifests/   crawl scope、來源、時間、路徑與狀態
├── data/markdown/    MarkItDown 輸出
├── data/processed/   metadata、chunks 與本機向量索引
├── analysis/
├── rag/
├── feedback/
└── docs/
```

每一筆衍生資料保留 `document_id`、`source_url`、`crawled_at`；可用的處理狀態為 `collected`、`parsed`、`needs_review`、`ready_for_analysis`、`excluded`。

## 自我完成檢核

每位學員在本機逐項確認：

1. `data/manifests/crawl_scope.json` 記錄統一起始網址、完整主機、格式、20／20 上限與爬取規則；`data/raw/` 與 `crawl_manifest.json` 可回查來源。
2. `data/markdown/` 與 `data/markdown/quality_report.jsonl` 均有每份文件的品質結論。
3. 至少三筆 `ready_for_analysis` chunks，存於 `data/processed/<document_id>.chunks.jsonl`，並完成 `analysis/text_analysis.md` 與來源段落；只讓 `ready_for_analysis` chunks 進入索引。
4. 可由 `streamlit run rag/app.py` 開啟的本機助手，提供「問答」與「問答歷程」頁；使用向量檢索最多三個 chunks，每一個有根據的回答附文件、URL、段落位置與 `crawled_at`，並顯示前三個 chunks 與相似度。無證據時輸出 `insufficient_evidence`，不呼叫回答模型。
5. 自行設計並完成四類測試：有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題；每題寫入 `feedback/query_log.jsonl`，包含實際回答與自我測試評註，並在本機問答歷程頁確認紀錄與引用可見。
6. 由問答紀錄產出 `feedback/improvement_backlog.md`，每項都能回連 query_id 與一項允許的改善動作。

介面固定提醒：「依本次爬取資料回答，請以原始網站最新公告為準。」評量不存在；重點是學生能在自己的電腦上完成並核對完整證據鏈。

---

**負責講師**：張育慈 Ruby
