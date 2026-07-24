# 01｜限定範圍爬取

## 輸入

`data/manifests/crawl_scope.json`。

## 可直接貼給 Codex

> ### 任務
>
> 依 `data/manifests/crawl_scope.json` 的 `allowed_hosts`、路徑、頁數、附件數與格式限制，爬取公開內容。
>
> ### 範圍限制
>
> - `allowed_hosts` 是完整主機名稱清單；只能跟隨其中列出的主機。
> - 不可自動放寬為同一根網域或其他子網域。
> - 不可跟隨範圍外網址、不可登入、不可覆寫原始檔。
>
> ### 格式判定
>
> 不可只看 URL 副檔名。請交叉判定：
>
> - HTTP `Content-Type`
> - `Content-Disposition` 的檔名
> - HTML 連結的 `title` 或可見文字
>
> 只處理 HTML、PDF、DOCX；若仍無法確認格式，記錄為 `excluded`，不要下載。
>
> ### 檔案與 manifest
>
> - 附件從 `Content-Disposition` 取得原始檔名，存於 `data/raw/<document_id>/<原始檔名>`；不可自行改名。
> - 在 `data/manifests/crawl_manifest.json` 記錄 `original_filename` 與 `raw_path`。
> - 每筆另記錄：`document_id`、`scope_id`、`source_url`、`source_type`、`crawled_at`、HTTP 結果與狀態。

## 輸出

原始檔與可供後續解析的 `crawl_manifest.json`。

## 驗收

manifest 可對照每份原始檔與來源 URL。

## 失敗處理

將 HTTP 或下載錯誤寫入 `error_message`，不猜測替代網址。
