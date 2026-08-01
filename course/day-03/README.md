# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

## 從哪裡開始

| 你是誰 | 從哪裡開始 |
| --- | --- |
| 學員 | [STUDENT_GUIDE.md](STUDENT_GUIDE.md) |
| 講師或 TA | [instructor/README.md](instructor/README.md) |
| 要列印操作卡 | [HANDOUTS.md](HANDOUTS.md) |
| 要播放上課簡報 | [instructor/slides/](instructor/slides/) |
| 要使用 Day 3 starter | [starter/](starter/README.md) |

## 工作坊共同流程

- **課前**：依照 [工具安裝說明](https://github.com/MEDA-TW/20260803-Workshop/blob/main/docs/01-Setup.md) 準備共用環境；Day 3 另外依本頁的「課前環境與健康檢查」確認 MarkItDown、Ollama 與兩個模型。
- **上課**：從本頁開始，依下表取得當日教材與練習目標。
- **課後**：在自己的 private repo 建立 Day 3 練習分支，推送當日成果；Day 3 不要求公開部署，是否需提供分支連結依講師當日說明。

## 當日教材與練習目標

| 類型 | 檔案 | 用途 |
| --- | --- | --- |
| 學生短提示詞與操作 | [STUDENT_GUIDE.md](STUDENT_GUIDE.md) | 依 01～07 建立自己的資料與問答助手 |
| 學生 starter | [starter/](starter/README.md) | Day 3 的資料與程式建置起點；學生用 Codex 建立問答介面 |

## 今日要完成什麼

建立「校務文本智慧分析與問答助手」的最小資料管線：依學生指南提供的四份雲科大技職所、語言中心與教務處公開資料，完成修課、英文門檻、流程表單與校務日期的來源保留、MarkItDown 解析、AI 分析、可引用的向量檢索問答與自我測試改善。

```text
固定四份來源 → 一次批次處理（逐份確認、取得、解析、品質檢查）→ 文本整理與索引
           → 用 Codex 從空白建立 Streamlit → 向量檢索問答 → 自我測試 → 改善清單
```

RAG 是驗證資料是否可用的一環；本日成果不只是一個 chatbot。

## 課前環境與健康檢查

模型與工具請在課前完成安裝；09:00–09:30 只做 starter 的健康檢查與個別排錯。學生須在自己的電腦上完成：

- 在 Codex Desktop 建立新的 task、輸入 `/mcp`，確認 `markitdown` 為可用／`enabled`；再以講師提供的公開範例檔用本機 `file:` URI 成功解析一次。若未出現，依[安裝與健康檢查指引](instructor/resources/install-and-health-check.md)處理。
- 安裝 Ollama，執行 `ollama pull qwen2.5:3b` 與 `ollama pull nomic-embed-text-v2-moe`。
- 安裝 Python 套件 `streamlit` 與 Ollama Python 用戶端，確認 Python 可執行。
- 以 `ollama list` 確認兩個模型都存在；Day-03 不使用雲端 API。

若本機模型或服務未能啟動，仍可完成資料管線、向量索引建立與引用／不足證據的預期處理；介面必須顯示可行修復指引，不得假裝已生成答案。

## 學習目標

完成本日後，學員能：

1. 從四份指定公開來源確認可重現的取得範圍與來源紀錄。
2. 使用 Codex + MarkItDown MCP 將本機 HTML、PDF、DOCX 轉為可檢查的 Markdown。
3. 為文本建立 metadata、段落切分與可回溯的 AI 分析結果。
4. 建立本機向量檢索問答：回答附文件與段落引用，無證據時不猜測。
5. 從自我測試紀錄判讀資料或系統缺口，提出下一輪改善行動。

## 資料與安全邊界

- 只處理學生指南列出的四份指定來源：技職所修業流程與研究生手冊、語言中心英文門檻、教務處行事曆；不得自行新增網址、跟隨子網域或外部網站。資料限無需登入即可存取的公開 HTML、PDF、DOCX。
- 一次批次提示詞仍須逐份檢查並遵守 `robots.txt` 與網站使用規範；個別來源不允許或失敗時，記錄原因並繼續下一份指定資料。
- 每人最多取得 20 個 HTML 頁面與 20 份 PDF／DOCX 附件；單一連線，每次請求至少間隔 1 秒，達上限即停止。
- 可保留公開頁面中的聯絡資訊，但不得嘗試取得受限、私密或白名單外內容，也不得將本機原型部署或公開分享。
- `data/raw/` 的原始檔不可覆寫。下載附件放在 `data/raw/<document_id>/<原始檔名>`，保留網站提供的原始檔名；衍生檔必須保留 `document_id`、`source_url`、`crawled_at`。
- MarkItDown MCP 是文件解析器，不是爬蟲；請先下載原始資料，再用本機 `file:` URI 解析。

## 講師備援規則

學生先完成自己的資料流程。若個人資料或助手無法完成、但 Python、Streamlit 與 Ollama 仍可執行，講師才指引學生從課程根目錄啟動獨立的講師成果 Demo：`python -m streamlit run instructor/demo/app.py`。若目前在 `starter/`，先執行 `cd ..`。Demo 只用於完成問答、引用與問答紀錄操作；不與學生資料混用，也不能在本機環境本身無法啟動時取代安裝排錯。

## 時程

| 時段 | 主題 | 主要產出 |
| --- | --- | --- |
| 09:00–09:30 | 工具安裝與健康檢查 | MCP 與本機模型可用 |
| 09:30–10:00 | 文本資料、來源與爬取範圍 | crawl scope |
| 10:00–12:00 | 指定網站爬取、解析與品質檢查 | 原始檔、manifest、Markdown、品質狀態 |
| 13:30–14:30 | 生成式 AI 文本分析 | processed chunks、分析表 |
| 14:30–15:40 | 本機向量檢索與可引用問答 | 測試題、答案、來源證據 |
| 15:40–16:30 | 自我測試與改善 | 改善 backlog |

## 學生從這裡開始

請只開啟 [STUDENT_GUIDE.md](STUDENT_GUIDE.md)，依 01～07 順序完成；不需要閱讀其他資料夾。

## 講師與維護者資源

講師、助教與維護者請從 [instructor/README.md](instructor/README.md) 進入；這些資源不需要學生自行開啟或操作。

## 教材提示詞檢查

維護教材時，在 `course/day-03/` 執行 `node instructor/maintainer/tests/verify-prompt-contracts.mjs`，可檢查學生指南、starter 與資料邊界契約。此檢查不取代課堂中的 MarkItDown MCP 與 Ollama 實機健康檢查。

## 學生個人專案

每位學員沿用 Day 1 已建立的 private 練習 repo，並在其中的 Day 3 starter 完成以下資料結構。不要在教材 repo 內另建 `my-project/`，也不要改動講義、提示詞或維護文件。

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

## 課後：推送個人練習分支

完成當天操作後，在自己的 private repo 根目錄執行：

```bash
git switch -c practice/day-03
git add .
git commit -m "feat: complete day 03 RAG practice"
git push -u origin practice/day-03
```

Day 3 不要求公開部署；是否需提供分支連結，依講師當日說明。

## 自我完成檢核

每位學員在本機逐項確認：

1. `data/manifests/crawl_scope.json` 記錄四份指定網址、格式、20／20 上限與爬取規則；`data/raw/` 與 `data/manifests/crawl_manifest.jsonl` 可回查來源。`crawl_manifest.jsonl` 每行一份指定來源，記錄文件識別、URL、格式、取得時間、原始檔路徑與成功／失敗狀態。
2. `data/markdown/` 與 `data/markdown/quality_report.jsonl` 均有每份文件的品質結論。
3. 至少三筆 `ready_for_analysis` chunks，存於 `data/processed/<document_id>.chunks.jsonl`，並完成 `analysis/text_analysis.md` 與來源段落；只讓 `ready_for_analysis` chunks 進入索引。
4. 可由 `python -m streamlit run rag/app.py` 開啟的本機助手，提供「問答」與「問答紀錄」頁；使用向量檢索最多三個 chunks，每一個有根據的回答附文件、URL、段落位置與 `crawled_at`，並顯示前三個 chunks 與相似度。無證據時輸出 `insufficient_evidence`，不呼叫回答模型。
5. 完成四類測試：修課與畢業學分、英文門檻與年度、流程或表單、校務日期；每題寫入 `feedback/query_log.jsonl`，包含實際回答與自我測試評註，並在本機問答紀錄頁確認紀錄與引用可見。英文與日期題必須顯示適用年度或公告日期。
6. 由問答紀錄產出 `feedback/improvement_backlog.md`，每項都能回連 query_id 與一項允許的改善動作。

若個人資料或助手無法完成、但本機環境仍可執行，可從課程根目錄啟動 `python -m streamlit run instructor/demo/app.py` 完成講師成果 Demo 的問答、引用與歷程操作。評量不存在；重點是學生能在自己的電腦上完成並核對完整證據鏈。

---

**負責講師**：張育慈 Ruby
