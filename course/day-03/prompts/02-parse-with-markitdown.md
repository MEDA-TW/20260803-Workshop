# 02｜解析與品質檢查

## 輸入

manifest 中 `crawl_status: success` 的本機原始檔。

## 提示詞

> 先從 `crawl_manifest.json` 選一筆 `crawl_status: "success"` 的 `raw_path`（附件應位於 `data/raw/<document_id>/<原始檔名>`），確認目前 Codex 是否可呼叫 MarkItDown MCP。若工具不可用，停止並回報錯誤。若可用，使用該本機 `file:` URI 逐筆轉為 `data/markdown/<document_id>.md`；不修改 `data/raw/`。每份 Markdown 檔頭寫入 `document_id`、`source_url`、`crawled_at`、`raw_path`。檢查標題階層、段落或清單、表格或掃描內容，將結果以一行 JSON 追加到 `data/markdown/quality_report.jsonl`，至少含 document_id、markdown_path、quality_status、checked_features、reason、checked_at。quality_status 只能是 `ready_for_analysis`、`needs_review` 或 `excluded`，且非 ready 必須說明原因。回報工具名稱、document_id、輸入 URI、輸出路徑與轉換限制。

## 驗收

每份 Markdown 有檔頭 metadata；`quality_report.jsonl` 有對應的一筆品質結論。

## 失敗處理

解析失敗保留 manifest 與原始檔，標記 `needs_review`。
