# 01｜限定範圍爬取

## 輸入

`data/manifests/crawl_scope.json`。

## 提示詞

> 依 `crawl_scope.json` 的 `allowed_hosts`、路徑、頁數、附件數與格式限制爬取公開內容。`allowed_hosts` 是完整主機名稱清單；只能跟隨其中列出的主機，不能自動放寬成同一根網域或其他子網域。格式判定不可只看 URL 副檔名：要以 HTTP `Content-Type`、`Content-Disposition` 的檔名，以及 HTML 連結的 `title`／可見文字交叉判定 HTML、PDF 或 DOCX；若三者無法確認格式，記錄為 `excluded`，不要下載。下載附件時，從 `Content-Disposition` 取得原始檔名，存於 `data/raw/<document_id>/<原始檔名>`；不可自行把附件改成內部檔名。將 `original_filename` 與此 `raw_path` 寫入 `data/manifests/crawl_manifest.json`。每筆另記錄 document_id、scope_id、source_url、source_type、crawled_at、HTTP 結果與狀態；不可跟隨範圍外網址、不可登入、不可覆寫原始檔。

## 輸出

原始檔與可供後續解析的 `crawl_manifest.json`。

## 驗收

manifest 可對照每份原始檔與來源 URL。

## 失敗處理

將 HTTP 或下載錯誤寫入 `error_message`，不猜測替代網址。
