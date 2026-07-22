# 00｜MarkItDown MCP 確認

## 輸入

`crawl_manifest.json` 中一筆 `crawl_status: "success"` 的 `raw_path`。

## 提示詞

> 使用剛剛成功爬取的一份本機文件，確認目前 Codex 是否可呼叫 MarkItDown MCP。若可用，將該檔以 `file:` URI 轉為 Markdown，存入 `data/markdown/`。回報工具名稱、document_id、輸入 URI、輸出路徑、辨識到的標題，以及轉換限制；若 MCP 不可用，停止並回報錯誤，不要改用未核准工具。

## 驗收

有 Markdown、輸入與輸出路徑、限制紀錄。

## 失敗處理

保留原始檔，記錄 MCP 不可用或轉換錯誤。
