# 01｜限定範圍爬取

## 輸入

`data/seeds/seed_urls.csv`。

## 提示詞

> 依 seed URL 的網域、路徑、頁數、附件數與格式限制爬取公開內容。將原始檔存於 `data/raw/`，並建立 `data/manifests/crawl_manifest.json`。每筆均記錄 document_id、source_url、crawled_at、raw_path、HTTP 結果與狀態；不可跟隨白名單外網址、不可登入、不可覆寫原始檔。

## 輸出

原始檔與可供後續解析的 `crawl_manifest.json`。

## 驗收

manifest 可對照每份原始檔與來源 URL。

## 失敗處理

將 HTTP 或下載錯誤寫入 `error_message`，不猜測替代網址。
