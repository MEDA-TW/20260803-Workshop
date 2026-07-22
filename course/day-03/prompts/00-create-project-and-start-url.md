# 00｜建立個人專案與起始網址

## 輸入

講師指定的一個公開起始網址，以及確認後的爬取範圍。

## 提示詞

> 我正在 `course/day-03/`。請建立我的個人實作資料夾 `team-01-project/`，但不要修改 `README.md`、`prompts/` 或 `exercises/`。在資料夾中建立：`data/raw/`、`data/manifests/`、`data/markdown/`、`data/processed/`、`analysis/`、`rag/`、`feedback/`、`docs/`。本次起始網址是「[填入]」。先根據這個網址提出爬取範圍供我確認：單位名稱、完整允許主機名稱清單、允許路徑、格式（HTML、PDF、DOCX）、最大 HTML 頁數與最大附件數。不要自動加入同根網域或其他子網域。待我確認後，在 `data/manifests/crawl_scope.json` 寫入 scope_id、unit_name、start_url、allowed_hosts、allowed_path_prefix、allowed_formats、max_pages、max_attachments、created_at、notes。不要開始爬取。

## 輸出

一個 `team-01-project/` 資料夾，以及記錄已確認範圍的 `data/manifests/crawl_scope.json`。

## 驗收

資料夾結構完整；scope 檔案是有效 JSON；主機、路徑、格式與數量限制已確認；尚未產生任何爬取資料。

## 失敗處理

未提供起始網址或未確認範圍時，只提出澄清問題；不猜測網址或開始爬取。
