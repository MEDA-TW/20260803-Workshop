# Day 3 學生指南｜用生成式 AI 分析與解讀校務文件

今天的成果有兩個：先完成一張可追溯的**校務文件分析表**，再把同一批資料接到有引用的問答助手。聊天介面是驗證與應用，不取代閱讀來源。

## 從這裡開始

1. 下載三天工作坊的 ZIP，解壓縮後用 Codex Desktop 開啟 `course/day-03/starter/`。
2. 在 Terminal 確認目前位置正確：`pwd` 的結尾應為 `course/day-03/starter`，並可看到 `requirements.txt`、`data/` 與 `rag/`。
3. 講師提供的四份原始校務文件已在 `data/raw/`；來源與取得時間在 `data/manifests/crawl_manifest.jsonl`。它們是原始證據，請不要修改。

| 文件 | 格式 | 分析時可留意 |
| --- | --- | --- |
| 碩士班修業流程 | HTML | 修業流程、表單與時間點 |
| 115 學年度研究生手冊 | DOCX | 修課與畢業規定 |
| 英文畢業門檻 | HTML | 入學年度與規定差異 |
| 115 學年度第 1 學期行事曆 | PDF | 日期、對象與校務事項 |

## 先完成環境

在 `starter/` 執行：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
ollama pull qwen2.5:3b
ollama pull nomic-embed-text-v2-moe
```

在 Codex Desktop 輸入 `/mcp`，確認 `markitdown` 是 enabled。卡住時保留完整錯誤文字交給講師；不要自行換模型、MCP 或資料來源。

## 依序貼上五段提示詞

每一段完成並看過結果後，再貼下一段。你不必找網址、下載文件、建立 GitHub repo，也不需要手寫完整 Python 程式。

**提示詞 1｜環境檢查**

> 我正在 `starter/` 工作空間。請檢查 Python、Streamlit、Ollama，以及目前 Codex task 的 MarkItDown MCP 是否可用；確認 `qwen2.5:3b` 和 `nomic-embed-text-v2-moe` 是否已下載。不要下載資料、不要建立新專題資料夾。用簡短清單告訴我可用項目與需要請講師協助的項目。

**提示詞 2｜轉換與品質檢查**

> 請只處理 `data/manifests/crawl_manifest.jsonl` 列出的四份講師提供原始校務文件。使用已啟用的 MarkItDown MCP 將每份本機原始檔轉成可閱讀、可搜尋的 Markdown，輸出到 `data/markdown/`；原始檔和 manifest 不可修改。為每份文件寫入簡短品質結果，標示可分析或需要人工查看。完成後用表格列出文件、格式、轉換結果、品質結果與下一步；不要新增網址或下載資料。

**提示詞 3｜建立校務文件分析表**

> 請只使用品質檢查通過的 Markdown，在 `analysis/document_analysis.md` 建立校務文件分析表。每一列都必須清楚分開「文件明確寫了什麼」與「AI 摘要或分類」，並有以下欄位：文件、文件明確寫了什麼、適用對象與年度、學生需要採取的行動、AI 摘要或分類、不確定處、來源段落。不得改動原始檔；對不明確或條件不足的內容標示不確定，不要猜測。完成後說明各文件各整理出幾項。

**提示詞 4｜建立搜尋索引**

> 請根據品質檢查通過的 Markdown，切成可引用、可搜尋的小段落，並保留 document_id、文件名稱、來源網址、取得時間、段落標題與文字。把 chunks 寫到 `data/processed/`，然後執行 `python scripts/build_index.py`，建立 `data/processed/vector_index.jsonl`。不要使用 sample-data，也不要改動原始檔。完成後告訴我使用了哪些文件、切成多少段、索引有多少段。

**提示詞 5｜建立可引用問答助手**

> 請從空白建立 `rag/app.py`，用 Streamlit 完成「雲科大技職所｜碩士班文件問答助手」。讀取我建立的 `data/processed/vector_index.jsonl`，不要讀取 sample-data。介面要有右側使用者訊息、左側助理訊息、底部問題輸入框、側欄「＋ 開新對話」、以及「問答／問答紀錄」切換；問答紀錄用表格呈現每次對話的主要主題、題數、狀態與平均秒數。回答只可根據最多三個檢索段落，且每個有根據的回答都顯示文件、來源段落、原始網址（連結只放網址本身）與取得時間。若來源沒有直接支持答案，顯示「資料不足，無法根據目前來源回答」，不要猜測或呼叫回答模型。問題缺少影響規定的年度、身分或版本時，說明要補充什麼。把問答與引用寫入 `feedback/query_log.jsonl`。完成後執行 `python -m streamlit run rag/app.py`，並測試：畢業學分、英文門檻、流程或表單、校務日期四題；每題都檢查引用與適用年度。

## 完成時你應該擁有

- `analysis/document_analysis.md`：能區分原文、AI 解讀與不確定處的分析表。
- `data/processed/vector_index.jsonl`：只由你的四份校務文件建立的搜尋索引。
- `rag/app.py`：可開啟的 Streamlit 問答助手，附來源引用與資料不足保護。
- `feedback/query_log.jsonl`：你的問答紀錄，可在介面中看見主要主題。

若電腦連 Python、Streamlit 或 Ollama 都無法啟動，請由講師示範或與同學共用設備；這種情況下本機 Demo 也無法替代安裝問題。若環境可執行但個人流程卡住，講師可開啟完成版 Demo 讓你觀察成果與引用方式。
