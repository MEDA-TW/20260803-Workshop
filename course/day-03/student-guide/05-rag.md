# 05｜本機向量檢索與可引用問答

## 輸入

`ready_for_analysis` chunks、Ollama `qwen2.5:3b`、`nomic-embed-text-v2-moe` 與學生自訂測試題。

## 可直接貼給 Codex

> ### 建立本機介面
>
> 在 `rag/` 建立可由 `streamlit run rag/app.py` 開啟的本機問答機器人，並建立 `rag/requirements.txt`、`rag/__init__.py`。`app.py` 在匯入 `rag.*` 前把專案根目錄加入 Python module path。

> 先顯示健康檢查結果：Python、Streamlit、Ollama 服務、`qwen2.5:3b` 與 `nomic-embed-text-v2-moe`。任何一項缺失時，先顯示可直接執行的修復步驟；不要假裝網頁或模型已可用。

> ### 問答歷程頁
>
> - 以側欄或頁籤提供「問答」與「問答歷程」；兩頁都只在學生自己的電腦執行。
> - 問答歷程只讀取 `feedback/query_log.jsonl`，依 `asked_at` 由新到舊顯示 `question`、`answer`、`answer_status`、`cited_chunk_ids`、`retrieval_scores` 與 `self_test_note`。
> - 找不到紀錄時顯示「尚無問答紀錄」，不要建立假資料；JSONL 有壞行時略過該行並在頁面顯示可修復提示。
> - 不建立登入、帳號、雲端同步、教師後台或跨學生紀錄。
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
> - 將「足夠證據」寫成程式中可見、可調整的規則，並在介面顯示判定原因；不可只說由模型自行決定。
> - 每個有根據的回答都顯示 `answer`、`answer_status`、`retrieved_chunk_ids`、`retrieval_scores`、文件、URL、段落位置、`crawled_at`、`limitations`。
> - 引用必須由 chunk provenance 建立，不能由模型編造；時間、期限、數字、文件名稱、單位與聯絡資訊必須可逐字回查。
> - 證據不足、問題模糊或範圍外時，直接輸出 `insufficient_evidence`、說明缺少的資料類型，且不要呼叫回答模型。
> - 每次顯示：「依本次爬取資料回答，請以原始網站最新公告為準。」
>
> ### 自我測試與錯誤處理
>
> 每次提問追加 `feedback/query_log.jsonl`，至少有 `query_id`、`asked_at`、`question`、`answer`、`expected_result`、`answer_status`、`cited_chunk_ids`、`retrieval_scores`、`self_test_note`、`notes`。`answer` 必須是介面實際顯示的回答；不足證據時記錄不足證據說明。自行設計並完成：有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題四類測試。

> 先以一個不會呼叫回答模型的範圍外問題測試 `insufficient_evidence` 路徑，再測試有來源依據的問題；在終端機或介面清楚顯示兩種測試的結果與引用。
>
> 若 Ollama、模型或 Streamlit 未安裝或未啟動，介面顯示可行修復指引，不生成答案。

## 驗收

本機網頁可開啟，前三個檢索結果與引用可見；支持性回答的關鍵事實可回查原文；其他三類問題不硬答；每次測試都有自我測試紀錄；問答歷程頁能在本機顯示最新紀錄與其引用。

## 失敗處理

缺少證據或模型不可用時，停止生成結論並清楚回報限制。

## 自我檢查

- `streamlit run rag/app.py` 可啟動，且「問答」與「問答歷程」都可見。
- 完成四類測試：有依據、公開聯絡資訊、模糊、語料範圍外。
- 每題寫入自己的 `feedback/query_log.jsonl`；無證據時顯示 `insufficient_evidence`，不編造答案。
