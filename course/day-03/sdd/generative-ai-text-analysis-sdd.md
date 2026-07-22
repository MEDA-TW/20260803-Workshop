# 校務文本智慧分析與問答助手 SDD

## 系統流程

```text
seed allowlist → crawler → raw + manifest → MarkItDown MCP → markdown
→ quality check → processed chunks → AI analysis / retrieval → cited answer
→ query log → improvement backlog
```

爬蟲只負責在白名單中下載並記錄原始資料；MarkItDown MCP 只負責將 manifest 中成功取得的本機 `file:` URI 轉為 Markdown。兩者不可混用。

## 資料層責任

| 位置 | 責任 |
| --- | --- |
| `data/seeds/` | 網域、路徑、格式與數量上限。 |
| `data/raw/` | 不可變更的原始檔。 |
| `data/manifests/` | 來源、時間、路徑、HTTP 結果與爬取狀態。 |
| `data/markdown/` | MarkItDown 輸出與品質檢查紀錄。 |
| `data/processed/` | 可檢索 chunks；保留完整 provenance。 |
| `analysis/`、`rag/`、`feedback/` | 分析證據、問答證據與改善決策。 |

每筆 manifest 至少有 `document_id`、`seed_id`、`source_url`、`source_type`、`crawled_at`、`raw_path`、`crawl_status`；每筆 chunk 至少有 `chunk_id`、`document_id`、`source_url`、`crawled_at`、`markdown_path`、`section_heading`、`page_or_anchor`、`chunk_text`、`quality_status`。處理狀態依序為 `collected`、`parsed`、`needs_review`、`ready_for_analysis`、`excluded`；只有 `ready_for_analysis` 可進入檢索。

## RAG 與回饋契約

RAG 回應格式：`answer`、`answer_status`、`retrieved_chunk_ids`、`citations`（文件名、URL、頁碼或 anchor）、`limitations`。沒有足夠 chunk 證據時，`answer_status` 必為 `insufficient_evidence`，不得補造答案。

回饋事件包含 `query_id`、`asked_at`、`question`、`answer_status`、`cited_chunk_ids`、`user_feedback`、`notes`。改善動作只能為 PRD 定義的五種之一。

## 錯誤與安全

HTTP 失敗要留在 manifest，不得猜測替代網址；解析異常標示 `needs_review`；非公開、疑似個資或白名單外文件標示 `excluded`。MCP 僅可讀取指定課程資料夾與公開來源。
