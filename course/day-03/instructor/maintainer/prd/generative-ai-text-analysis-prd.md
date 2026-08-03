# 校務文本智慧分析與問答助手 PRD

## 目標

以四份講師提供、可追溯的雲科大公開校務文件為資料範圍，讓每位學員在自己的電腦完成生成式 AI 文本分析表，並以有引用的問答助手驗證修課、英文門檻、流程與校務日期問題。

## 使用者與情境

- 課程學員：以 Codex 自然語言協作完成資料管線與本機原型，不要求手寫程式。
- 教師、行政人員與學生：作為未來可能使用此類資訊工具的情境角色；本課原型不對外部署，不能視為正式服務。

## 功能需求

1. 在課堂完成 MarkItDown MCP、Ollama `qwen2.5:3b`、`nomic-embed-text-v2-moe`、Streamlit 與 Ollama Python 用戶端的安裝及健康檢查。
2. rag-demo 提供四份不可修改的原始 HTML／DOCX／PDF 與 `data/manifests/crawl_manifest.jsonl`；學生不爬取、不找網址、不建立 GitHub repo。
3. 以 Codex 的 MarkItDown MCP 將本機文件轉為 Markdown，產出品質報告；只有可分析文件可被處理。
4. 將可用 Markdown 產出 `analysis/document_analysis.md`；每列明確分開文件原文與 AI 解讀，並記錄適用對象／年度、學生行動、不確定處與來源段落。
5. 將可用文字切成具完整 provenance 的 chunks，再建立向量索引。
6. 學生以 Codex 從空白建立 Streamlit `rag/app.py`，完成本機向量檢索問答與「問答紀錄」頁面：使用 `nomic-embed-text-v2-moe` 建立學生自己的本機索引、檢索最多三筆 chunks，再以 Ollama `qwen2.5:3b` 回答。問答頁必須顯示前三個 chunk、相似度、文件名稱、URL、段落位置與 `crawled_at`；問答紀錄頁只讀取該學生本機的紀錄，依對話主要主題顯示問題、回答、狀態、引用與自我測試註記。英文與日期回答必須顯示適用年度或公告日期。只有足夠證據才可呼叫回答模型；否則輸出 `insufficient_evidence` 且不生成答案。
7. 將每次自我測試追加至 `feedback/query_log.jsonl`，並以紀錄產出改善 backlog；紀錄保留回答文字與引用，不上傳、不集中收集。改善動作僅能為 `add_source`、`repair_parse`、`revise_chunking_or_metadata`、`improve_retrieval` 或 `revise_prompt`。

## 非目標與完成條件

不做登入後資料、跨主機內容、正式上線服務、公開部署或真人使用者研究。公開頁面中的聯絡資訊只有在來源 chunk 明確包含時才可回答，並須標示 `crawled_at`。

若學生個人資料流程或個人助手無法完成、但本機環境可執行，學生可從課程根目錄啟動 `python -m streamlit run instructor/demo/app.py`，完成講師成果 Demo 的問答、引用與問答紀錄操作。

學生在本機完成以下檢核，不收件、不評分：

1. scope、raw 與 manifest 可回查每筆來源。
2. Markdown、品質報告與至少三筆可用 chunks 均符合資料契約。
3. 分析表的文件證據與 AI 解讀分欄。
4. 完成四類測試：修課與畢業學分、英文門檻與年度、流程或表單、校務日期。每題必附引用；英文與日期題必須標示適用年度或公告日期。
5. 每題的自我測試評註與改善 backlog 均可回連 query_id。

所有回答畫面皆提示：「依本次課程提供的文件回答；請以原始網站最新公告為準。」
