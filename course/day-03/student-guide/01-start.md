# 01｜建立個人專案與統一爬取範圍

## 輸入

課程統一起始網址：`https://tve.yuntech.edu.tw/`。

## 可直接貼給 Codex

> ### 任務
>
> 我正在 `course/day-03/`。請建立我的個人實作資料夾，名稱由我決定（例如 `my-project/`）。

> 在建立前，先回報你將使用的資料夾名稱與完整路徑；若目前不在 `course/day-03/`，停止並請我切換到正確位置。
>
> ### 資料夾
>
> 建立 `data/raw/`、`data/manifests/`、`data/markdown/`、`data/processed/`、`analysis/`、`rag/`、`feedback/`、`docs/`。
>
> ### 寫入固定 crawl scope
>
> 在 `data/manifests/crawl_scope.json` 寫入有效 JSON：
>
> - `start_url`: `https://tve.yuntech.edu.tw/`
> - `allowed_hosts`: 只能是 `tve.yuntech.edu.tw`
> - `allowed_path_prefix`: `/`
> - `allowed_formats`: `HTML`、`PDF`、`DOCX`
> - `max_pages`: `20`
> - `max_attachments`: `20`
> - `request_delay_seconds`: `1`
> - `scope_id`、`unit_name`、`created_at`、`notes`
>
> 在 `notes` 註明：爬取前須遵守 `robots.txt` 與網站規範；不可跟隨其他主機、不可登入、不可公開部署成果。
>
> ### 限制
>
> - 不要修改 `README.md`、`student-guide/` 或講師／維護者資料夾。
> - 不要開始爬取。
> - 寫完後讀回 `crawl_scope.json`，逐項列出 host、路徑、格式、20／20 上限與 1 秒間隔，讓我核對。

## 輸出

一個個人專案資料夾及有效的 `data/manifests/crawl_scope.json`。

## 驗收

資料夾完整；scope 的主機、路徑、格式、20／20 上限與 1 秒間隔正確；尚未產生爬取資料。

## 失敗處理

若無法建立資料夾或 JSON 無效，停止並說明修復方式；不要開始爬取。

## 自我檢查

- 已建立自己的 `my-project/`，不是修改課程講義資料夾。
- `crawl_scope.json` 已讀回確認；此時尚未開始爬取。
