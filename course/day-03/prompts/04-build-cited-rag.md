# 04｜本機向量檢索與可引用問答

## 輸入

`ready_for_analysis` chunks、Ollama `qwen2.5:3b`、`nomic-embed-text-v2-moe` 與學生自訂測試題。

## 可直接貼給 Codex

> ### 建立本機介面
>
> 在 `rag/` 建立可由 `streamlit run rag/app.py` 開啟的本機問答機器人，並建立 `rag/requirements.txt`、`rag/__init__.py`。`app.py` 在匯入 `rag.*` 前把專案根目錄加入 Python module path。
>
> ### 向量檢索
>
> - 只讀取 `data/processed/` 中 `quality_status: "ready_for_analysis"` 的 JSONL chunks。
> - 使用本機 Ollama `nomic-embed-text-v2-moe` 為 chunks 與問題建立向量；索引與向量只存於此專案資料夾。
> - 依相似度取最多三筆 chunks，畫面顯示 `chunk_id`、相似度、文件名稱、`source_url`、`page_or_anchor`、`crawled_at`。
>
> ### 回答與引用規則
>
> - 只有檢索到足夠證據時才呼叫本機 Ollama `qwen2.5:3b`。
> - 每個有根據的回答都顯示 `answer`、`answer_status`、`retrieved_chunk_ids`、`retrieval_scores`、文件、URL、段落位置、`crawled_at`、`limitations`。
> - 引用必須由 chunk provenance 建立，不能由模型編造；時間、期限、數字、文件名稱、單位與聯絡資訊必須可逐字回查。
> - 證據不足、問題模糊或範圍外時，直接輸出 `insufficient_evidence`、說明缺少的資料類型，且不要呼叫回答模型。
> - 每次顯示：「依本次爬取資料回答，請以原始網站最新公告為準。」
>
> ### 自我測試與錯誤處理
>
> 每次提問追加 `feedback/query_log.jsonl`，至少有 `query_id`、`asked_at`、`question`、`expected_result`、`answer_status`、`cited_chunk_ids`、`retrieval_scores`、`self_test_note`、`notes`。自行設計並完成：有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題四類測試。
>
> 若 Ollama、模型或 Streamlit 未安裝或未啟動，介面顯示可行修復指引，不生成答案。

## 驗收

本機網頁可開啟，前三個檢索結果與引用可見；支持性回答的關鍵事實可回查原文；其他三類問題不硬答；每次測試都有自我測試紀錄。

## 失敗處理

缺少證據或模型不可用時，停止生成結論並清楚回報限制。
