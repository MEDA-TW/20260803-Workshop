# 本機向量檢索問答設計

## 目的

每位學員在自己命名的專案資料夾中建立可由瀏覽器開啟的最小 Streamlit 問答原型。它只讀取 `ready_for_analysis` chunks、以本機向量檢索找回證據，再由本機 Ollama 回答並顯示可追溯引用與限制。原型只在本機執行，不公開部署。

## 課堂建置

課堂前 30 分鐘安裝並健康檢查 MarkItDown MCP、Ollama、`qwen2.5:3b`、`nomic-embed-text-v2-moe`、Streamlit 與 Ollama Python 用戶端。未能啟動模型時，介面顯示修復指引，不產生答案。

## 檢索與回答

```text
ready_for_analysis chunks
→ nomic-embed-text-v2-moe 向量化與本機索引
→ 相似度前 3 個 chunks（顯示分數）
→ 證據足夠才呼叫 qwen2.5:3b
→ 回答 + 引用 + crawled_at
```

- 向量與索引只存於學生專案資料夾。
- 支持性回答必須顯示文件名稱、URL、段落位置、`crawled_at`、chunk ID 與相似度。
- 期限、數字、單位與公開聯絡資訊必須可逐字回查來源。
- 證據不足、問題模糊或範圍外時，`answer_status` 為 `insufficient_evidence`，不得呼叫回答模型。
- 固定顯示：「依本次爬取資料回答，請以原始網站最新公告為準。」

## 自我測試紀錄

學生自行設計有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題四類測試。`feedback/query_log.jsonl` 每筆至少有：

- `query_id`、`asked_at`、`question`、`expected_result`
- `answer_status`、`cited_chunk_ids`、`retrieval_scores`
- `self_test_note`、`notes`

紀錄是自我測試，不得表述成真實使用者回饋。改善 backlog 每項須回連 query ID，且改善動作僅能是 `add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval`、`revise_prompt`。
