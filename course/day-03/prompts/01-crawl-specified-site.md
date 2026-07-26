# 01｜限定範圍爬取

## 輸入

`data/manifests/crawl_scope.json`。

## 可直接貼給 Codex

> ### 任務
>
> 依 `data/manifests/crawl_scope.json` 擷取公開內容。開始前讀取並遵守 `robots.txt` 與網站使用規範；若禁止自動擷取，停止、寫入原因並向講師報告。
>
> ### 範圍與速率
>
> - 只能使用 `tve.yuntech.edu.tw`，路徑 `/`；不可跟隨其他主機、子網域、登入頁或受限內容。
> - 只處理 HTML、PDF、DOCX；最多 20 個 HTML 頁面與 20 份附件，達上限即停止。
> - 單一連線；每次請求至少間隔 1 秒；不無限重試。

> ### 初學者執行順序
>
> 1. 先回報 `robots.txt` 與網站規範的檢查結果；不確定是否允許時先停止，不要猜測。
> 2. 讀取 scope，列出目前 HTML／附件計數均為 0，確認尚未超過上限。
> 3. 一次只處理一個 URL；每筆完成後更新 manifest 與兩種計數，再處理下一筆。
> 4. 到達任一上限、遇到禁止規範或連續失敗時停止，保留已完成紀錄。
>
> ### 格式判定
>
> 不可只看 URL 副檔名。交叉判定 HTTP `Content-Type`、`Content-Disposition` 檔名、HTML 連結標題或可見文字；無法確認格式則記錄 `excluded`，不要下載。
>
> ### 檔案與 manifest
>
> - 原始資料不可覆寫。附件從 `Content-Disposition` 取得原始檔名，存於 `data/raw/<document_id>/<原始檔名>`。
> - 在 `data/manifests/crawl_manifest.json` 記錄：`document_id`、`scope_id`、`source_url`、`source_type`、`original_filename`、`crawled_at`、`raw_path`、HTTP 結果、`crawl_status` 與失敗時的 `error_message`。
>
> ### 限制
>
> 不猜測替代網址、不爬範圍外內容、不覆寫 `data/raw/`。

## 輸出

原始檔與可供後續解析的 `crawl_manifest.json`。

## 驗收

每筆成功資料可由 manifest 回查原始檔、URL、時間與格式；失敗或排除資料有明確原因。

## 失敗處理

若站方規範、下載或網站異常使你無法得到至少三筆可用 chunks，保留已完成紀錄後向講師申請公開備援資料；不可直接跳到備援。
