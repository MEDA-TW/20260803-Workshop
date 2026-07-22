# 00｜建立個人專案與 seed URL

## 輸入

講師指定的一個公開網站範圍：單位名稱、起始網址、允許網域與路徑、允許格式、最大頁數與最大附件數。

## 提示詞

> 我正在 `course/day-03/`。請建立我的個人實作資料夾 `team-01-project/`，但不要修改 `README.md`、`prompts/` 或 `exercises/`。在資料夾中建立：`data/seeds/`、`data/raw/`、`data/manifests/`、`data/markdown/`、`data/processed/`、`analysis/`、`rag/`、`feedback/`、`docs/`。接著建立 `data/seeds/seed_urls.csv`，欄位必須是 `seed_id,unit_name,start_url,allowed_host,allowed_path_prefix,allowed_formats,max_pages,max_attachments,notes`。本次資料範圍為：單位名稱「[填入]」、起始網址「[填入]」、允許網域「[填入]」、允許路徑「[填入]」、允許格式「[填入]」、最大頁數「[填入]」、最大附件數「[填入]」。若任一方括號尚未填入，先問我，不要猜測網址或範圍；不要開始爬取。

## 輸出

一個 `team-01-project/` 資料夾，以及可供下一步爬取使用的 `data/seeds/seed_urls.csv`。

## 驗收

資料夾結構完整；CSV 欄位正確；seed URL 的網域與路徑限制明確；尚未產生任何爬取資料。

## 失敗處理

缺少範圍資訊時只提出澄清問題；不建立猜測的 seed URL。
