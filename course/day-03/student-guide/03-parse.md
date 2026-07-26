# 03｜解析與品質檢查

## 輸入

manifest 中 `crawl_status: success` 的本機原始檔。

## 可直接貼給 Codex

> ### 選擇輸入與確認工具
>
> 從 `crawl_manifest.json` 列出所有 `crawl_status: "success"` 的 `raw_path`；附件應位於 `data/raw/<document_id>/<原始檔名>`。先選一筆做工具測試，成功後再逐筆處理其餘成功文件。
>
> 先確認課堂健康檢查是否通過：在 Terminal 執行 `codex mcp list`，必須看到 `markitdown` 且狀態為 `enabled`。若沒有或不是 `enabled`，停止解析，依講師提供的安裝指引新增一次設定，完全重開 Codex、建立新的 task 後再檢查；不要自行安裝其他 MCP server。
>
> 接著確認目前 Codex 是否可呼叫 MarkItDown MCP：
>
> - 工具不可用：停止並回報錯誤。
> - 工具可用：以本機 `file:` URI 逐筆解析。

> 每處理一筆，先回報 `document_id`、輸入 `file:` URI 與預定輸出路徑；確認寫入品質報告後才處理下一筆。
>
> ### 轉換產物
>
> - 將每份結果存為 `data/markdown/<document_id>.md`。
> - 不修改 `data/raw/`。
> - 每份 Markdown 檔頭寫入：`document_id`、`source_url`、`crawled_at`、`raw_path`。
>
> ### 品質檢查
>
> 檢查：
>
> - 標題階層
> - 段落或清單
> - 表格或掃描內容
>
> 將結果以一行 JSON 追加到 `data/markdown/quality_report.jsonl`，至少包含：
>
> - `document_id`
> - `markdown_path`
> - `quality_status`
> - `checked_features`
> - `reason`
> - `checked_at`
>
> `quality_status` 只能是 `ready_for_analysis`、`needs_review` 或 `excluded`；非 `ready_for_analysis` 必須說明原因。
>
> ### 回報
>
> 回報工具名稱、`document_id`、輸入 URI、輸出路徑與轉換限制。

## 驗收

每份 Markdown 有檔頭 metadata；`quality_report.jsonl` 有對應的一筆品質結論。

## 失敗處理

解析失敗保留 manifest 與原始檔，標記 `needs_review`。

## 自我檢查

- 先通過 `codex mcp list` 的 `markitdown / enabled` 健康檢查，才開始解析。
- 每份 Markdown 檔頭保留來源 metadata，並在 `quality_report.jsonl` 有一筆品質結論。
- `needs_review` 或 `excluded` 都有原因，且不會進入後續分析。
