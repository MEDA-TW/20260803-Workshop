# 校務文本智慧分析與問答助手 SDD

## 系統流程

```text
工具健康檢查 → 講師提供 raw + manifest → MarkItDown MCP → markdown → quality check
→ 校務文件分析表 → processed chunks + vector index → Codex 建立 Streamlit → cited answer
→ self-test log → improvement backlog
```

四份原始文件與成功來源紀錄由講師預先放入 starter；學生不得改寫 raw 或 manifest。MarkItDown MCP 只負責將 manifest 中的本機 `file:` URI 轉為 Markdown。來源蒐集、robots 與重新下載屬於講師／進階挑戰，不是學生必經流程。

## 資料層責任

| 位置 | 責任 |
| --- | --- |
| `data/raw/` | 不可變更的原始檔。附件存於 `data/raw/<document_id>/<original_filename>`。 |
| `data/manifests/crawl_manifest.jsonl` | 每行一份指定來源的來源、時間、路徑、HTTP 結果與爬取狀態。 |
| `data/markdown/` | `data/markdown/<document_id>.md` 的 MarkItDown 輸出與 `quality_report.jsonl`。 |
| `data/processed/` | `data/processed/<document_id>.chunks.jsonl` 與只由可用 chunks 建立的本機向量索引。 |
| `analysis/`、`rag/`、`feedback/` | 分析證據、問答證據、自我測試與改善決策。 |

`crawl_manifest.jsonl` 每行一筆 manifest，至少有 `document_id`、`source_url`、`source_type`、`original_filename`、`crawled_at`、`raw_path`、`crawl_status` 與 `sha256`。學生只讀取此 manifest，不得猜測或替換網址。

每份 Markdown 固定存為 `data/markdown/<document_id>.md`，檔頭保留 `document_id`、`source_url`、`crawled_at`、`raw_path`。`quality_report.jsonl` 每行至少有 `document_id`、`markdown_path`、`quality_status`、`checked_features`、`reason`、`checked_at`；`checked_features` 固定檢查標題階層、段落或清單、表格或掃描內容。每筆 chunk 至少有 `chunk_id`、`document_id`、`source_url`、`crawled_at`、`markdown_path`、`section_heading`、`page_or_anchor`、`chunk_text`、`quality_status`。處理狀態依序為 `collected`、`parsed`、`needs_review`、`ready_for_analysis`、`excluded`；只有 `ready_for_analysis` 可進入向量索引與檢索。

## RAG 與自我測試契約

RAG 介面由學生在資料與索引完成後，以 Codex 從空白建立為 `rag/app.py` 的 Streamlit 本機網頁，含「問答」與「問答紀錄」兩個頁面。`nomic-embed-text-v2-moe` 將 chunks 與問題向量化，索引與向量僅存於學生專案資料夾；檢索最多三筆，問答頁顯示每筆的 `chunk_id`、相似度與 provenance。問答紀錄頁只讀取同一專案的 `feedback/query_log.jsonl`，以整串對話的主要主題彙整；不建立帳號、伺服器或跨學生彙整。只有足夠證據才呼叫 `qwen2.5:3b`。

回應格式固定含 `answer`、`answer_status`、`retrieved_chunk_ids`、`retrieval_scores`、`citations`（文件名、URL、頁碼或 anchor）、`crawled_at`、`limitations`。期限、數字、單位、承辦人或公開聯絡資訊必須可逐字在 retrieved chunks 中核對；英文門檻與校務日期必須顯示適用年度或公告日期。若沒有足夠 chunk 證據，`answer_status` 必為 `insufficient_evidence`，不得呼叫模型或補造答案。

每次學生自我測試追加至 `feedback/query_log.jsonl`，每筆包含 `query_id`、`asked_at`、`question`、`answer`、`expected_result`、`answer_status`、`cited_chunk_ids`、`retrieval_scores`、`self_test_note`、`notes`。`answer` 為實際顯示的回答；若為 `insufficient_evidence`，記錄固定的不足證據說明。改善 backlog 的每一項回連 query_id，並且改善動作只能使用 PRD 定義的五種之一。

## 錯誤與安全

HTTP 失敗要留在 manifest；解析異常標示 `needs_review`；需要登入、受限、白名單外或 robots／網站規範不允許的內容標示 `excluded`。若學生個人資料或助手無法完成、但本機環境可執行，可改用獨立 `instructor/demo/app.py`；若 MarkItDown、Ollama、模型或 Streamlit 本身未安裝，Demo 也不能執行。所有原型只在本機執行，不公開部署。
