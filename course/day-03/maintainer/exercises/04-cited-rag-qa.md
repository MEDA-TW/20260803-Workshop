# 練習 04｜可引用問答

使用 [提示詞 04](../prompts/04-build-cited-rag.md)。課堂工具建置後，以 `ollama pull qwen2.5:3b` 與 `ollama pull nomic-embed-text-v2-moe` 準備本機模型，再以 `streamlit run rag/app.py` 開啟問答機器人。先確認網頁成功載入、沒有 `ModuleNotFoundError`。使用向量檢索時，畫面必須顯示前三個 chunks、相似度與 provenance；另提供只讀取自己本機 `feedback/query_log.jsonl` 的「問答歷程」頁。

自行設計四類測試：有依據問題、公開聯絡資訊、模糊問題、語料範圍外問題。前兩者只有在確有證據時才回答，並附文件、URL、段落與 `crawled_at`；找不到聯絡資訊、問題模糊或範圍外時，應要求釐清或標記 `insufficient_evidence`，不可編造答案。期限、數字或單位名稱須能逐字回查原文。每一題均須寫入 `feedback/query_log.jsonl`，包括實際顯示的回答、預期結果與自我測試評註；再到問答歷程頁確認最新紀錄、狀態與引用皆可見。每個畫面都顯示「依本次爬取資料回答，請以原始網站最新公告為準。」若資料中確有衝突或過期文件，可加做進階挑戰：列出所有相關來源與 crawled_at，不自行判定現行規定。
