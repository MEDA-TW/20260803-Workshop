# 校務文本智慧分析與問答助手 PRD

## 目標

以指定雲科大公開網站為資料範圍，建立可追溯的文本資料流程，讓教師、行政人員與學生能分析規章／公告並查詢有來源依據的資訊。

## 使用者與情境

- 教師：整理教學或研究生規範，辨識學生常見需求。
- 行政人員：降低重複說明，找出應補強的文件或 FAQ。
- 學生：查詢修業、資格考與行政流程；系統必須說明依據或限制。

## 功能需求

1. 依講師提供的 seed URL 白名單爬取公開 HTML 與附件，記錄 manifest。
2. 以 Codex 的 MarkItDown MCP 將成功下載的本機檔案轉為 Markdown。
3. 檢查轉換品質，並對每份文件設定 `ready_for_analysis`、`needs_review` 或 `excluded`。
4. 以 metadata 與 chunks 產生摘要、分類、行政資訊擷取與主題分析。
5. 以檢索到的 chunks 回答問題，輸出回答、chunk ID、來源 URL 與段落／頁面；無證據時輸出 `insufficient_evidence`。
6. 分析問答紀錄，將問題導向 `add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval` 或 `revise_prompt` 的改善 backlog。

## 非目標與驗收

不做全校爬取、登入後資料、個資處理、正式上線服務或必要向量資料庫。原始檔不可覆寫；所有衍生結果保留 `document_id`、`source_url`、`crawled_at`。最終成果須完成 README 所列五項繳交物。

| 評量面向 | 比重 |
| --- | ---: |
| 資料蒐集與來源紀錄 | 20% |
| MarkItDown 解析與品質檢查 | 20% |
| 文本整理與 AI 分析 | 20% |
| RAG 回答與引用 | 25% |
| 回饋分析與改善方案 | 15% |
