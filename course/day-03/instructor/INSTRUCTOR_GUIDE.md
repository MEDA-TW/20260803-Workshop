# Day 3 講師與 TA 指南

## 教學主張

上午與下午各有明確成果。上午是「論文摘要探索與主分類分析」：先從講師提供的摘要探索關鍵詞與方法線索，再建立、確認主分類，最後產出只保留確認後主分類的 Word 比較報告。下午是「校務文件 RAG」：把固定文件轉成可搜尋文字，建立索引，再完成有引用且能拒答的問答助手。兩段都要辨認原文證據、AI 初步結果與仍需人工確認處。

## Run of Show

| 時間 | 動作 | 完成證據 |
| --- | --- | --- |
| 09:00–09:10 | 上午成果 Demo：Word 報告、主分類與證據 | 看見探索後主分類、比較表與限制 |
| 09:10–09:25 | 檢查論文摘要資料包 | 255 篇、source manifest、資料邊界可回查 |
| 09:25–10:00 | 關鍵詞／方法線索探索 | 探索 CSV、方法線索 CSV、摘要證據 |
| 10:00–10:25 | 提出候選主分類與變更建議 | codebook change log；等待研究者確認 |
| 10:25–11:10 | 8 篇試編碼與人工抽查 | 確認後 codebook、AI 編碼、人工確認欄位 |
| 11:10–11:45 | 全量編碼與品質檢查 | 255 列、缺漏、重複與分層檢查 |
| 11:45–12:00 | 產出 Word 報告與上午反思 | `instructor/demo/comparison_report.docx` |
| 13:30–14:30 | chunks 與向量索引 | 可搜尋、可回查的段落 |
| 14:30–15:40 | Codex 建立 Streamlit 問答 | 引用、資料不足、歷程 |
| 15:40–16:30 | 四題驗證與反思 | 哪些問題可答、哪些仍需補資料 |

## 上午成果 Demo 劇本

上午 Word 成果從 `course/day-03/instructor/demo/` 開啟；若要查看仍保留的分析過程檔，才開啟 `course/day-03/text-analysis-demo/analysis/`：

1. `instructor/demo/comparison_report.docx`：依 `text-analysis-demo/PROMPTS.md` 第 1–7 段流程產出的最後 Word 報告之獨立副本；最後報告只呈現確認後主分類，不把探索詞頻或方法線索當成最後分類。即使清空 `text-analysis-demo/`，這份報告仍可直接開啟。
2. `text-analysis-demo/analysis/thesis_abstract_codebook_change_log.csv`：指出主分類是如何由摘要探索提出、確認；若無實質變更，展示「探索後主分類未變更」。
3. `text-analysis-demo/analysis/thesis_abstract_coding.csv`：一篇摘要一列，分開 `evidence_quote`、AI 初步編碼與 `review_status`。
4. 說明兩校比較同時看篇數與比例，並檢查碩士／博士；差異不解讀為品質高低或因果關係。

定錨句：**先讓摘要告訴我們有哪些線索，再由研究者確認要用哪些主分類；最後報告只使用確認後的主分類。**

## 下午成果 Demo 劇本

從工作坊根目錄 `20260803-Workshop/` 啟動。第一次先建立並安裝 Day 3 的虛擬環境：

```bash
python3 -m venv course/day-03/rag-demo/.venv
source course/day-03/rag-demo/.venv/bin/activate
python3 -m pip install -r course/day-03/rag-demo/requirements.txt
```

之後每次要播放講師 Demo，只需要執行：

```bash
source course/day-03/rag-demo/.venv/bin/activate
python3 -m streamlit run course/day-03/instructor/demo/app.py
```

若目前不在工作坊根目錄，先執行 `pwd` 確認位置；不要直接使用 `rag-demo/.venv` 或 `instructor/demo/app.py` 這種相對路徑。

依序展示：

1. 一題有明確規定與適用年度的問題。
2. 一題需要補充年度或身分的問題，說明助手不能猜測。
3. 來源展開區：答案要回到原始段落。
4. 問答紀錄頁：同一串對話彙整成主要主題，而非只計算單一熱門問題。

定錨句：**下午要做的是讓 AI 協助閱讀與整理校務文件，但每個回答都要能回到來源。**

## TA 判斷表

| 狀況 | 先做什麼 | 下一步 |
| --- | --- | --- |
| 上午摘要或 manifest 找不到 | 只檢查 `text-analysis-demo/data/` 與檔案筆數 | 不下載全文、不新增網路來源；保留缺漏並請講師處理 |
| 上午分類名稱不一致 | 回到研究者確認的 codebook 與 change log | 未確認前不進入全量編碼；資訊不足填 `無法判定` |
| 上午證據不足或報告混入探索統計 | 以 `corpus_id`、`source_url`、摘要原文逐筆回查 | 修正衍生檔或標示人工確認，不修改 raw data |
| 模型或套件未就緒 | 保留完整錯誤，確認 `.venv`、Ollama 與模型 | 併機或講師協助，不自行換模型 |
| MarkItDown 未顯示 | 新 task 輸入 `/mcp`、重開 Codex | 講師檢查教室 MCP 設定 |
| 文件轉換品質不佳 | 保留品質結果與原始檔 | 帶學生標示需人工查看，不把它當成證據 |
| 索引或 RAG 失敗 | 先看 chunks、索引、模型與 `rag/app.py` | 環境可執行時用 Demo 對照成果；不能執行則併機／講師示範 |

## 備援界線

上午完成版報告是開場展示與「資料包正常但學生分析流程卡住」的參考；下午完成版 Demo 是「環境正常但學生 RAG 流程卡住」的參考。若下午 Python、Streamlit 或 Ollama 根本不能啟動，Demo 也不能在該學生電腦執行；改採共用設備或講師示範。不要要求學生自行抓網址、建立 GitHub repo 或重做下載流程。
