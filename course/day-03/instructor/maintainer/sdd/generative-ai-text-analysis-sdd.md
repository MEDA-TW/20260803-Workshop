# Day 3 雙軌文本分析課程 SDD

## 系統流程

```text
上午：摘要 JSONL + source manifest
  → 關鍵詞／方法線索探索
  → 候選主分類與研究者確認
  → 8 篇試編碼 → 全量 AI 初步編碼 → 驗證
  → comparison_report.docx（只保留確認後主分類）

下午：校務 raw + manifest
  → MarkItDown MCP → Markdown → quality check
  → ready_for_analysis chunks → vector index
  → Codex 建立 Streamlit → cited answer
  → self-test log → improvement backlog
```

兩段使用不同資料夾與不同前置環境；上午不依賴下午的 RAG 工具鏈。

## 上午資料層與責任

| 位置 | 責任 |
| --- | --- |
| `text-analysis-demo/data/thesis_abstracts_110_114.jsonl` | 講師提供的摘要原始資料；唯讀 |
| `text-analysis-demo/data/source_manifest.json` | 資料邊界與來源紀錄；唯讀 |
| `text-analysis-demo/analysis/thesis_abstract_keyword_exploration.csv` | 關鍵詞探索衍生結果 |
| `text-analysis-demo/analysis/thesis_abstract_method_cues.csv` | 方法線索探索衍生結果；可複選 |
| `text-analysis-demo/analysis/thesis_abstract_codebook_v2.json` | 研究者確認後的主分類與版本 |
| `text-analysis-demo/analysis/thesis_abstract_codebook_change_log.csv` | 探索到主分類的保留／變更決策與證據 |
| `text-analysis-demo/analysis/thesis_abstract_coding.csv` | 一篇摘要一列的 AI 初步編碼與證據 |
| `text-analysis-demo/analysis/comparison_report.docx` | 最終 Word 報告；只呈現確認後主分類 |

每筆上午分析結論至少保留 `corpus_id`、`source_url`、摘要原文證據、`codebook_version` 與分析狀態。`evidence_quote`、AI 初步編碼與人工確認狀態不可混在同一欄。沒有足夠證據時使用 `無法判定`。

## 上午控制閘門

1. **資料閘門**：確認 JSONL 與 manifest 可讀、筆數與唯一 ID 合理；列出缺漏後才開始探索。
2. **探索閘門**：產出關鍵詞與方法線索，並保留來源證據；探索結果不直接當作最終分類統計。
3. **研究者確認閘門**：產出候選 codebook 與 change log，等待研究者確認；未確認不得試編碼或全量編碼。
4. **試編碼閘門**：以確認後 codebook 編碼 8 篇，檢查 evidence、分類適配與 `無法判定`。
5. **全量閘門**：完成 255 篇或實際可用筆數的唯一性、缺漏、學校與學位別分層檢查。
6. **報告閘門**：Word 報告只引用最後確認主分類；探索統計與變更紀錄留在分析檔，不進入最後報告。

## 下午資料層與責任

| 位置 | 責任 |
| --- | --- |
| `rag-demo/data/raw/` | 不可變更的講師提供原始檔 |
| `rag-demo/data/manifests/crawl_manifest.jsonl` | 每份固定來源的 provenance |
| `rag-demo/data/markdown/` | MarkItDown 輸出與 `quality_report.jsonl` |
| `rag-demo/data/processed/` | chunks 與本機向量索引 |
| `rag-demo/analysis/`、`rag-demo/rag/`、`rag-demo/feedback/` | RAG 分析、問答、測試與改善證據 |

每筆 chunk 至少有 `chunk_id`、`document_id`、`source_url`、`crawled_at`、`markdown_path`、`section_heading`、`page_or_anchor`、`chunk_text` 與 `quality_status`；只有 `ready_for_analysis` 可進入索引與檢索。

## 下午 RAG 與自我測試契約

學生以 Codex 從空白建立 `rag/app.py` 的本機 Streamlit 問答助手。`nomic-embed-text-v2-moe` 建立向量，最多檢索三筆 chunks；只有足夠證據才呼叫 `qwen2.5:3b`。回答固定含 `answer`、`answer_status`、`retrieved_chunk_ids`、`retrieval_scores`、`citations`、`crawled_at` 與 `limitations`。英文門檻與校務日期必須顯示適用年度或公告日期。

若沒有足夠 chunk 證據，`answer_status` 必為 `insufficient_evidence`，不得呼叫模型或補造答案。每次自我測試追加至 `feedback/query_log.jsonl`，改善 backlog 的每一項回連 `query_id`。

## 錯誤與安全

上午資料缺漏、證據不足或分類未確認時，保留缺漏並停止下游統計，不猜測、不下載、不修改 raw。下午 HTTP 失敗、解析異常、受限內容與低品質文件分別留在 manifest 或 quality report，標示 `needs_review`／`excluded`；若本機環境本身無法啟動，改用講師 Demo 或共用設備。
