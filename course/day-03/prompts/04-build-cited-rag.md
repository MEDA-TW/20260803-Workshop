# 04｜可引用 RAG

## 輸入

`ready_for_analysis` chunks 與測試問題。

## 提示詞

> 僅根據檢索到的 chunks 回答。輸出 answer、answer_status、retrieved_chunk_ids、文件名稱、source_url、page_or_anchor、crawled_at 與 limitations。若問題涉及承辦人、email、電話或分機，必須引用含該資訊的原始頁面或文件，並說明此資訊依該來源於 `crawled_at` 時取得；不可從其他文件推測目前窗口。若沒有足夠證據，answer_status 必為 `insufficient_evidence`，說明應補哪類文件。

## 驗收

支持性回答有引用；模糊、範圍外或衝突問題不硬答。

## 失敗處理

缺少證據時停止生成結論並回報限制。
