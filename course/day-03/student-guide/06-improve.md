# 06｜從自我測試到改善

## 輸入

`feedback/query_log.jsonl`。

## 可直接貼給 Codex

> ### 任務
>
> 讀取自己產生的 `feedback/query_log.jsonl`，依問題主題、預期結果、`answer_status`、引用、相似度與 `self_test_note` 分類事件，產出 `feedback/improvement_backlog.md`。
>
> ### 每一項 backlog 必須包含
>
> - 現象
> - `query_id` 與可回查證據
> - 可能原因
> - 優先度
> - 一項改善動作
>
> 改善動作只能是：`add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval`、`revise_prompt`。
>
> 不得把自我測試寫成真實使用者趨勢；資料不足時標示樣本限制。

> 初學者可先用以下 Markdown 欄位建立每一項：`現象｜query_id 與證據｜可能原因｜優先度｜改善動作`。改善動作必須從允許清單擇一；資料不足時寫「樣本限制」，不要推論使用者行為。

## 輸出

`feedback/improvement_backlog.md` 與可回溯的分類結果。

## 驗收

每項改善可回連 query_id、測試評註與證據。

## 失敗處理

資料不足時說明限制，不推論一般使用者行為。

## 自我檢查

- `improvement_backlog.md` 每項都有 query_id、證據、可能原因、優先度與允許的改善動作。
- 自我測試紀錄只代表自己的測試，不宣稱為真實使用者趨勢。
