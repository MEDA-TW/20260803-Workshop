# 05｜問答回饋與改善

## 輸入

`feedback/query_log.jsonl`。

## 提示詞

> 依問題主題、answer_status、引用與使用者回饋分類事件，產出改善 backlog。每項列出現象、證據、原因、優先度與一項動作；動作只能是 add_source、repair_parse、revise_chunking_or_metadata、improve_retrieval 或 revise_prompt。

## 輸出

`feedback/improvement_backlog.md` 與可回溯的問題分類結果。

## 驗收

每項改善可回連 query_id 與證據。

## 失敗處理

資料不足時標示樣本限制，不推論使用者趨勢。
