# 練習 01｜限定範圍爬取

依 [學生指南 02～03](../../STUDENT_GUIDE.md) 的單一批次提示詞，依統一 scope 處理四份課程指定資料。Codex 仍須逐份確認 `robots.txt` 與網站規範允許；只使用指定的技職所、語言中心與教務處 URL，不自行新增網址，最多 20 個 HTML、20 份 PDF／DOCX，單一連線且每次請求至少間隔 1 秒。個別來源無法處理時，記錄失敗原因後繼續其餘指定來源。

保留 `data/raw/` 與 manifest 供自我檢核。下載附件須保留網站原始檔名，並放在 `data/raw/<document_id>/<原始檔名>`；manifest 同時記錄 `original_filename`。驗收：每筆成功資料均有 URL、時間、格式與原始檔；失敗資料有狀態與錯誤，不追蹤白名單外網址。

若自己的資料流程或個人助手無法完成、但 Python／Streamlit／Ollama 仍可執行，依講師指引從課程根目錄使用 `python -m streamlit run instructor/demo/app.py` 完成問答、引用與問答紀錄操作。Demo 不與學生資料混用，也不是本機環境無法啟動時的替代方案。
