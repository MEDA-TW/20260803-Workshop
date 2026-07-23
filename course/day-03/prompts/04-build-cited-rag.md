# 04｜可引用 RAG

## 輸入

`ready_for_analysis` chunks、Ollama `qwen3:8b` 與測試問題。

## 提示詞

> 在 `rag/` 建立可由 `streamlit run rag/app.py` 開啟的本機對話機器人，並建立 `rag/requirements.txt`。只讀取 `data/processed/` 中 `quality_status: "ready_for_analysis"` 的 JSONL chunks，以問題關鍵字檢索最多三筆；有足夠證據才呼叫本機 Ollama `qwen3:8b`，並顯示 answer、answer_status、retrieved_chunk_ids、文件名稱、source_url、page_or_anchor、crawled_at 與 limitations。引用必須由 chunks 的 provenance 建立，不能由模型自行編造。若問題涉及承辦人、email、電話或分機，必須檢索到含該資訊的 chunk 才能回答，並說明資訊依該來源於 `crawled_at` 時取得；不可從其他文件推測目前窗口。若沒有足夠證據，直接輸出 `insufficient_evidence`、說明應補哪類文件，且不要呼叫模型。每次提問追加 `feedback/query_log.jsonl`，至少寫入 query_id、asked_at、question、answer_status、cited_chunk_ids、user_feedback（初始為 null）與 notes。Ollama 未安裝、服務未啟動或模型未下載時，介面必須顯示可行修復訊息，不生成答案。

## 驗收

本機網頁可開啟；支持性回答有引用；模糊、範圍外或衝突問題不硬答；每次測試均產生問答紀錄。

## 失敗處理

缺少證據時停止生成結論並回報限制。
