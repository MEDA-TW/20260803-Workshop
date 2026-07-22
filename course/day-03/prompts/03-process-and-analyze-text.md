# 03｜整理與分析

## 輸入

品質為 `ready_for_analysis` 的 Markdown。

## 提示詞

> 將文件依章節切成可檢索 chunks，輸出至 `data/processed/`，每段保留資料字典的 provenance 欄位。另在 `analysis/` 產出來源連結的摘要、分類、行政資訊擷取與主題；清楚分開文件證據與 AI 解讀。

## 驗收

至少三筆 chunk 與每筆對應的來源段落。

## 失敗處理

結構不清或內容缺漏時改標 `needs_review`，不要捏造段落。
