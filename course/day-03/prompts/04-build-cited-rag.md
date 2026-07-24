# 04｜可引用 RAG

## 輸入

`ready_for_analysis` chunks、Ollama `qwen2.5:3b` 與測試問題。

## 可直接貼給 Codex

> ### 建立本機介面
>
> 在 `rag/` 建立可由 `streamlit run rag/app.py` 開啟的本機對話機器人，並建立：
>
> - `rag/requirements.txt`
> - `rag/__init__.py`
>
> `app.py` 必須在匯入 `rag.*` 前把專案根目錄加入 Python module path，確保不出現 `ModuleNotFoundError`。
>
> ### 檢索與回答規則
>
> - 只讀取 `data/processed/` 中 `quality_status: "ready_for_analysis"` 的 JSONL chunks。
> - 以問題關鍵字檢索最多三筆 chunks。
> - 只有足夠證據才呼叫本機 Ollama `qwen2.5:3b`。
> - 無足夠證據時，直接輸出 `insufficient_evidence`、說明應補哪類文件，且不要呼叫模型。
>
> ### 畫面與引用
>
> 顯示：`answer`、`answer_status`、`retrieved_chunk_ids`、文件名稱、`source_url`、`page_or_anchor`、`crawled_at`、`limitations`。
>
> - 引用必須由 chunks 的 provenance 建立，不能由模型自行編造。
> - 時間、期限、數字、文件名稱、單位、承辦資訊必須可逐字在 retrieved chunks 中核對。
> - 若模型改寫、推論或無法核對，顯示相關原文證據或改為 `insufficient_evidence`。
> - 承辦人、email、電話或分機只有在檢索到含該資訊的 chunk 時才能回答，並標示該來源的 `crawled_at`；不可從其他文件推測目前窗口。
>
> ### 問答紀錄與錯誤處理
>
> 每次提問追加 `feedback/query_log.jsonl`，至少寫入：
>
> - `query_id`
> - `asked_at`
> - `question`
> - `answer_status`
> - `cited_chunk_ids`
> - `user_feedback`（初始為 `null`）
> - `notes`
>
> Ollama 未安裝、服務未啟動或模型未下載時，介面必須顯示可行修復訊息，不生成答案。
>
> ### 驗收測試
>
> 固定測試四類：
>
> 1. 有依據的規章或流程
> 2. 公開聯絡資訊
> 3. 模糊問題
> 4. 語料範圍外問題
>
> 聯絡資訊找不到時，正確結果是 `insufficient_evidence`。若資料中確有衝突或過期文件，可作進階挑戰：列出來源與 `crawled_at`，不自行判定現行規定。

## 驗收

本機網頁可開啟且沒有 module import error；四類基本測試均有正確處理；支持性回答有引用，關鍵事實可逐字回查原文；模糊或範圍外問題不硬答；每次測試均產生問答紀錄。

## 失敗處理

缺少證據時停止生成結論並回報限制。
