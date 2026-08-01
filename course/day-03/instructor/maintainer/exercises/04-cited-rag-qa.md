# 練習 04｜可引用問答

依 [學生指南 05](../../STUDENT_GUIDE.md) 的短提示詞，學生用 Codex 從空白建立 `rag/app.py`，再以 `python -m streamlit run rag/app.py` 開啟自己建立的問答機器人。先確認網頁成功載入、沒有 `ModuleNotFoundError`。使用向量檢索時，畫面必須顯示前三個 chunks、相似度與 provenance；另提供只讀取自己本機 `feedback/query_log.jsonl` 的「問答紀錄」頁。

完成四類測試：修課與畢業學分、英文門檻與年度、流程或表單、校務日期。每題都要附文件、URL、段落與 `crawled_at`；英文與日期題必須寫出適用年度或公告日期。期限、數字或單位名稱須能逐字回查原文。每一題均須寫入 `feedback/query_log.jsonl`，包括實際顯示的回答、預期結果與自我測試評註；再到問答紀錄頁確認最新紀錄、狀態與引用皆可見。若資料中確有衝突或過期文件，可加做進階挑戰：列出所有相關來源與 crawled_at，不自行判定現行規定。若自己的資料或助手無法完成、但環境可跑，依講師指引從課程根目錄使用 `python -m streamlit run instructor/demo/app.py`。
