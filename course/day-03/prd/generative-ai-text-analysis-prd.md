# 校務文本智慧分析與問答助手 PRD

## 目標

以指定雲科大公開網站為資料範圍，建立可追溯的文本資料流程，讓教師、行政人員與學生能分析規章／公告並查詢有來源依據的資訊。

## 使用者與情境

- 教師：整理教學或研究生規範，辨識學生常見需求。
- 行政人員：降低重複說明，找出應補強的文件或 FAQ。
- 學生：查詢修業、資格考與行政流程；系統必須說明依據或限制。

## 功能需求

1. 從講師提供的公開起始網址確認爬取範圍，建立 `crawl_scope.json` 後爬取公開 HTML 與附件，記錄 manifest。
2. 以 Codex 的 MarkItDown MCP 將成功下載的本機檔案轉為 Markdown。
3. 將每份 Markdown 存為 `data/markdown/<document_id>.md`，並以 `data/markdown/quality_report.jsonl` 檢查與記錄 `ready_for_analysis`、`needs_review` 或 `excluded`。
4. 以 `data/processed/<document_id>.chunks.jsonl` 的 metadata 與 chunks 產生 `analysis/text_analysis.md` 摘要、分類、行政資訊擷取與主題分析。
5. 以 Streamlit 建立可在瀏覽器開啟的本機問答機器人，透過 Ollama `qwen2.5:3b` 以檢索到的 chunks 回答問題，輸出回答、chunk ID、來源 URL 與段落／頁面；無證據時輸出 `insufficient_evidence` 且不呼叫模型。基本驗收為有依據問答、公開聯絡資訊、模糊問題與語料範圍外問題四類；衝突或過期文件僅為進階挑戰。
6. 將每次問答追加至 `feedback/query_log.jsonl`，再分析問答紀錄，將問題導向 `add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval` 或 `revise_prompt` 的改善 backlog。

## 非目標與驗收

不做全校爬取、登入後資料、確認範圍外內容、正式上線服務或必要向量資料庫。無需登入即可存取的公開網頁、公開附件及其公開聯絡資訊可依 `crawl_scope.json` 蒐集。原始檔不可覆寫；下載附件須以網站提供的原始檔名存於 `data/raw/<document_id>/`，並在 manifest 記錄 `original_filename`；所有衍生結果保留 `document_id`、`source_url`、`crawled_at`。正常情況由學生自行爬取；只有網站、下載或解析異常導致無法完成流程時，講師才可提供公開備援資料，且仍須完成相同的來源與處理紀錄。最終成果須完成 README 所列五項繳交物。

| 評量面向 | 比重 |
| --- | ---: |
| 資料蒐集與來源紀錄 | 20% |
| MarkItDown 解析與品質檢查 | 20% |
| 文本整理與 AI 分析 | 20% |
| RAG 回答與引用 | 25% |
| 回饋分析與改善方案 | 15% |
