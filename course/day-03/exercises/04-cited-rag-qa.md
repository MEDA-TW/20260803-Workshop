# 練習 04｜可引用問答

使用 [提示詞 04](../prompts/04-build-cited-rag.md)，先以 `ollama pull qwen3:8b` 準備本機模型，再以 `streamlit run rag/app.py` 開啟問答機器人。各測一次：直接有依據、承辦人或聯絡方式、問題模糊、語料範圍外、文件衝突或過期。前兩者要附文件、URL、段落與 `crawled_at`；其他三類要標記 `insufficient_evidence` 或說明衝突，不可編造答案。確認每一題均寫入 `feedback/query_log.jsonl`。
