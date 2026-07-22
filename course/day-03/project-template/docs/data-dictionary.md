# 資料字典

## Manifest

| 欄位 | 意義 |
| --- | --- |
| `document_id` | 文件的穩定唯一識別碼；所有衍生資料都要保留。 |
| `seed_id` | 對應核准 seed URL 的識別碼。 |
| `source_url` | 實際取得文件的公開網址。 |
| `source_type` | `html`、`pdf` 或 `docx`。 |
| `crawled_at` | 取得資料的 ISO 8601 時間與時區。 |
| `raw_path` | 不可修改的原始檔相對路徑。 |
| `crawl_status` | `success`、`failed` 或 `excluded`。 |

## Processed chunk

每一段都必須保留 `chunk_id`、`document_id`、`source_url`、`crawled_at`、`markdown_path`、`section_heading`、`page_or_anchor` 與 `chunk_text`。chunk 不可脫離文件來源單獨儲存。

`quality_status` 僅可使用：

- `collected`：已取得，尚未解析。
- `parsed`：已轉 Markdown，尚未人工檢查。
- `needs_review`：轉換有遺漏、掃描、表格或結構疑慮。
- `ready_for_analysis`：已檢查，可供分析與檢索。
- `excluded`：不在資料邊界或無法安全使用。
