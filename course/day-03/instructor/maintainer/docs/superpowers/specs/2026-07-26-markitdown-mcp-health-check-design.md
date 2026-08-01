# MarkItDown MCP 健康檢查設計

## 目的

讓第一次使用 Codex 的學員在解析資料前，先確認 MarkItDown MCP 已註冊且可用，並在失敗時提供一致、可交接給講師的處置方式。

## 決定

只在三個文字教材位置提供引導：README 的課堂健康檢查、講師安裝指引，以及 Step 02 提示詞。學生先執行 `codex mcp list`；沒有 `markitdown` 或狀態不是 `enabled` 才新增設定。新增後重啟 Codex 並建立新 task。若新 task 仍不能呼叫工具，不安裝其他 server，改把錯誤交給講師。

## 不做的事

不修改既有 18 頁投影片；不要求學生使用 MCP Inspector；不把 MCP 未顯示誤判成文件解析失敗。
