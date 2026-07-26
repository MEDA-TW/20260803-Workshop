# 04｜整理與分析

## 輸入

品質為 `ready_for_analysis` 的 Markdown。

## 可直接貼給 Codex

> ### 讀取範圍
>
> 只讀取 `data/markdown/quality_report.jsonl` 中 `quality_status` 為 `ready_for_analysis` 的 Markdown。

> 開始前先列出將處理的 `document_id`；若不足三筆可用 chunks，停止並依備援規則處理，不要用 `needs_review` 文件湊數。
>
> ### 建立 chunks
>
> 依章節將每份文件切成可檢索 chunks，輸出至 `data/processed/<document_id>.chunks.jsonl`。
>
> 每行至少有：
>
> - `chunk_id`
> - `document_id`
> - `source_url`
> - `crawled_at`
> - `markdown_path`
> - `section_heading`
> - `page_or_anchor`
> - `chunk_text`
> - `quality_status`
>
> provenance 必須可回連原 Markdown。
>
> ### 產出 AI 分析表
>
> 在 `analysis/text_analysis.md` 產出表格。每列固定有：
>
> - `document_id`
> - `chunk_id`
> - `summary`
> - `category`
> - `administrative_information`
> - `topic`
> - `document_evidence`
> - `ai_interpretation`
>
> 清楚分開文件證據與 AI 解讀。
>
> ### 例外處理
>
> 結構不清或內容缺漏時，更新品質報告為 `needs_review`；不要產生可供 RAG 使用的 chunk。

> 更新品質狀態時，保留原有品質報告紀錄，另追加一筆含原因與檢查時間的新紀錄；不要覆寫原始 Markdown 或 raw 檔。

## 驗收

至少三筆 `ready_for_analysis` chunk，並交出 `analysis/text_analysis.md` 的八欄分析表。

## 失敗處理

結構不清或內容缺漏時改標 `needs_review`，不要捏造段落。

## 自我檢查

- 只使用 `ready_for_analysis` 文件，並至少有三筆可回查 chunks。
- 分析表將「文件證據」與「AI 解讀」分開，不把 AI 推論當作原文事實。
