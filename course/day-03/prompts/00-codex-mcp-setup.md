# 00｜MarkItDown MCP 預檢

## 輸入

`data/raw/` 中講師指定的一份測試文件。

## 提示詞

> 確認目前 Codex 是否可呼叫 MarkItDown MCP。若可用，將指定本機檔案以 `file:` URI 轉為 Markdown，存入 `data/markdown/`。回報工具名稱、輸入 URI、輸出路徑、辨識到的標題，以及轉換限制；若 MCP 不可用，停止並回報錯誤，不要改用未核准工具。

## 驗收

有 Markdown、輸入與輸出路徑、限制紀錄。

## 失敗處理

保留原始檔，記錄 MCP 不可用或轉換錯誤。
