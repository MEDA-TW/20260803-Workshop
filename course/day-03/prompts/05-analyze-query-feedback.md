# 05｜問答回饋與改善

## 輸入

`feedback/query_log.jsonl`。

## 可直接貼給 Codex

> ### 任務
>
> 讀取由本機問答機器人追加的 `feedback/query_log.jsonl`，依問題主題、`answer_status`、引用與使用者回饋分類事件，產出改善 backlog。
>
> ### 每一項 backlog 必須包含
>
> - 現象
> - 證據
> - 原因
> - 優先度
> - 一項改善動作
>
> 改善動作只能是：
>
> - `add_source`
> - `repair_parse`
> - `revise_chunking_or_metadata`
> - `improve_retrieval`
> - `revise_prompt`

## 輸出

`feedback/improvement_backlog.md` 與可回溯的問題分類結果。

## 驗收

每項改善可回連 query_id 與證據。

## 失敗處理

資料不足時標示樣本限制，不推論使用者趨勢。
