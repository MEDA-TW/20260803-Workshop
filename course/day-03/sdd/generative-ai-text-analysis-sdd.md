# 校務文本智慧分析與問答助手 SDD

## 系統流程

```text
start URL → crawl scope → crawler → raw + manifest → MarkItDown MCP → markdown
→ quality check → processed chunks → AI analysis / retrieval → cited answer
→ query log → improvement backlog
```

爬蟲只負責在白名單中下載並記錄原始資料；格式以 HTTP `Content-Type`、`Content-Disposition` 檔名與 HTML 連結標題／文字交叉判定，不可只依 URL 副檔名。MarkItDown MCP 只負責將 manifest 中成功取得的本機 `file:` URI 轉為 Markdown。兩者不可混用。

## 資料層責任

| 位置 | 責任 |
| --- | --- |
| `data/manifests/crawl_scope.json` | 起始網址、網域、路徑、格式與數量上限。 |
| `data/raw/` | 不可變更的原始檔。下載附件存於 `data/raw/<document_id>/<original_filename>`，保留網站提供的原始檔名；HTML 頁面存於其 `document_id` 資料夾。 |
| `data/manifests/` | 來源、時間、路徑、HTTP 結果與爬取狀態。 |
| `data/markdown/` | MarkItDown 輸出與品質檢查紀錄。 |
| `data/processed/` | 可檢索 chunks；保留完整 provenance。 |
| `analysis/`、`rag/`、`feedback/` | 分析證據、問答證據與改善決策。 |

`crawl_scope.json` 至少有 `scope_id`、`start_url`、`allowed_hosts`、`allowed_path_prefix`、`allowed_formats`、`max_pages`、`max_attachments`、`created_at`；`allowed_hosts` 為完整主機名稱陣列，不可自動擴大為其他子網域。每筆附件 manifest 至少有 `document_id`、`scope_id`、`source_url`、`source_type`、`original_filename`、`crawled_at`、`raw_path`、`crawl_status`；其中 `raw_path` 為 `data/raw/<document_id>/<original_filename>`。每筆 chunk 至少有 `chunk_id`、`document_id`、`source_url`、`crawled_at`、`markdown_path`、`section_heading`、`page_or_anchor`、`chunk_text`、`quality_status`。處理狀態依序為 `collected`、`parsed`、`needs_review`、`ready_for_analysis`、`excluded`；只有 `ready_for_analysis` 可進入檢索。

## RAG 與回饋契約

RAG 介面為 `rag/app.py` 的 Streamlit 本機網頁，模型固定使用本機 Ollama `qwen3:8b`。RAG 回應格式：`answer`、`answer_status`、`retrieved_chunk_ids`、`citations`（文件名、URL、頁碼或 anchor）、`crawled_at`、`limitations`。回覆承辦人或聯絡方式時，必須引用含該資訊的來源並標明 `crawled_at`；沒有足夠 chunk 證據時，`answer_status` 必為 `insufficient_evidence`，不得呼叫模型或補造答案。

回饋事件追加至 `feedback/query_log.jsonl`，每筆包含 `query_id`、`asked_at`、`question`、`answer_status`、`cited_chunk_ids`、`user_feedback`、`notes`。改善動作只能為 PRD 定義的五種之一。

## 錯誤與安全

HTTP 失敗要留在 manifest，不得猜測替代網址；解析異常標示 `needs_review`；需要登入、受限或白名單外文件標示 `excluded`。公開網頁與附件中的公開聯絡資訊可隨原始資料保留。MCP 僅可讀取指定課程資料夾與公開來源。
