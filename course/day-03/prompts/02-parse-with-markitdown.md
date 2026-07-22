# 02｜解析與品質檢查

## 輸入

manifest 中 `crawl_status: success` 的本機原始檔。

## 提示詞

> 先從 `crawl_manifest.json` 選一筆 `crawl_status: "success"` 的 `raw_path`，確認目前 Codex 是否可呼叫 MarkItDown MCP。若工具不可用，停止並回報錯誤。若可用，使用該本機 `file:` URI 逐筆轉為 `data/markdown/`；不修改 `data/raw/`。檢查標題階層、段落或清單、表格或掃描內容，將結果標記為 `ready_for_analysis`、`needs_review` 或 `excluded`，並說明非 ready 原因。回報工具名稱、document_id、輸入 URI、輸出路徑與轉換限制。

## 驗收

每份 Markdown 有 document_id、輸出路徑與品質結論。

## 失敗處理

解析失敗保留 manifest 與原始檔，標記 `needs_review`。
