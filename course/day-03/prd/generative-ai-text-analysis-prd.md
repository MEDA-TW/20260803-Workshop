# 校務文本智慧分析與問答助手 PRD

## 目標

以 `https://tve.yuntech.edu.tw/` 的公開內容為資料範圍，讓每位學員在自己的電腦建立可追溯的文本資料流程，分析規章／公告並建立附來源的本機問答原型。

## 使用者與情境

- 課程學員：以 Codex 自然語言協作完成資料管線與本機原型，不要求手寫程式。
- 教師、行政人員與學生：作為未來可能使用此類資訊工具的情境角色；本課原型不對外部署，不能視為正式服務。

## 功能需求

1. 在課堂完成 MarkItDown MCP、Ollama `qwen2.5:3b`、`nomic-embed-text-v2-moe`、Streamlit 與 Ollama Python 用戶端的安裝及健康檢查。
2. 以統一起始網址建立 `crawl_scope.json`：完整主機固定為 `tve.yuntech.edu.tw`、路徑為 `/`、格式僅 HTML／PDF／DOCX、上限為 20 個 HTML 與 20 份附件；先遵守 `robots.txt` 與網站規範，再以單一連線、至少 1 秒間隔擷取。
3. 爬取公開 HTML 與附件並記錄 manifest；不得追蹤其他子網域或外部主機、登入內容或受限內容。原始檔不可覆寫，附件保留原始檔名。
4. 以 Codex 的 MarkItDown MCP 將成功下載的本機檔案轉為 Markdown，產出品質報告；只有 `ready_for_analysis` 文件可被處理。
5. 將可用 Markdown 切成具完整 provenance 的 chunks，產出 `analysis/text_analysis.md`，明確分開文件證據與 AI 解讀。
6. 以 Streamlit 建立本機向量檢索問答與「問答歷程」頁面：使用 `nomic-embed-text-v2-moe` 建立學生自己的本機索引、檢索最多三筆 chunks，再以 Ollama `qwen2.5:3b` 回答。問答頁必須顯示前三個 chunk、相似度、文件名稱、URL、段落位置與 `crawled_at`；問答歷程頁只讀取該學生本機的紀錄，依時間由新到舊顯示問題、回答、狀態、引用與自我測試註記。只有足夠證據才可呼叫回答模型；否則輸出 `insufficient_evidence` 且不生成答案。
7. 將每次自我測試追加至 `feedback/query_log.jsonl`，並以紀錄產出改善 backlog；紀錄保留回答文字與引用，不上傳、不集中收集。改善動作僅能為 `add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval` 或 `revise_prompt`。

## 非目標與完成條件

不做登入後資料、跨主機內容、正式上線服務、公開部署或真人使用者研究。公開頁面中的聯絡資訊只有在來源 chunk 明確包含時才可回答，並須標示 `crawled_at`。

若網站、下載、解析或站方規範使學生無法取得至少三筆 `ready_for_analysis` chunks，講師可提供同樣具公開來源與 provenance 的備援資料；學生仍須執行相同資料流程。

學生在本機完成以下檢核，不收件、不評分：

1. scope、raw 與 manifest 可回查每筆來源。
2. Markdown、品質報告與至少三筆可用 chunks 均符合資料契約。
3. 分析表的文件證據與 AI 解讀分欄。
4. 學生自行設計四類測試：有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題。支持性回答必附引用；其他情況正確結果可為 `insufficient_evidence`。
5. 每題的自我測試評註與改善 backlog 均可回連 query_id。

所有回答畫面皆提示：「依本次爬取資料回答，請以原始網站最新公告為準。」
