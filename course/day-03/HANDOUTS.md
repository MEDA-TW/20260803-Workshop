# Day 3 一頁操作卡

1. 開啟 Day 1 已建立的 private 練習 repo，進入 Day 3 資料夾後先執行 `cd starter`；確認看到 `requirements.txt` 與 `rag/`，再用 Codex Desktop 開啟。
2. 先依 [學生指南的安裝步驟](STUDENT_GUIDE.md) 安裝 Ollama、兩個模型、Python／Streamlit；在 Codex Desktop 新 task 輸入 `/mcp` 確認 `markitdown`。不要把 `codex mcp list` 當成必需指令；健康檢查只需跑 `ollama list` 與 Python 套件匯入。
3. 先完成四份指定校務資料與索引，再用 Codex 從空白建立 `rag/app.py`；完成後才執行 `python -m streamlit run rag/app.py`。
4. 只貼一次學生指南的批次提示詞；Codex 會依序處理四份指定公開資料，不自行新增網址，逐份確認公開規範後再取得，維持 20／20 上限、單一連線與 1 秒間隔。
5. 原始檔不覆寫；批次結果要保留每份資料的 URL、時間、document_id、取得、解析與品質狀態。
6. 個人資料流程卡住、但 Python／Streamlit／Ollama 可執行時，依講師指引啟動講師成果 Demo；不要把 Demo 資料混入自己的專案。
7. 最後展示四類問題：學分 → 英文年度 → 流程表單 → 校務日期；每題有來源，英文與日期說明年度。
8. 個人助手失敗但環境可跑時：在 `starter/` 執行 `cd ..`，再執行 `python -m streamlit run instructor/demo/app.py`。
9. 課後在自己的 private repo 建立 `practice/day-03` 分支並推送成果；不需公開部署，是否提供分支連結依講師說明。

卡住時：貼完整錯誤文字；不要私自換模型、MCP server、資料來源或公開部署。
