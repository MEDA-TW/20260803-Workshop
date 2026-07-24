# 練習 04｜可引用問答

使用 [提示詞 04](../prompts/04-build-cited-rag.md)，先以 `ollama pull qwen2.5:3b` 準備本機模型，再以 `streamlit run rag/app.py` 開啟問答機器人。先確認網頁成功載入、沒有 `ModuleNotFoundError`。完成四類基本測試：有依據的規章或流程、公開聯絡資訊、模糊問題、語料範圍外問題。前兩者只有在確有證據時才回答，並附文件、URL、段落與 `crawled_at`；找不到聯絡資訊、問題模糊或範圍外時，應要求釐清或標記 `insufficient_evidence`，不可編造答案。期限、數字或單位名稱須能逐字回查原文。每一題均須寫入 `feedback/query_log.jsonl`。若資料中確有衝突或過期文件，可加做進階挑戰：列出所有相關來源與 crawled_at，不自行判定現行規定。
