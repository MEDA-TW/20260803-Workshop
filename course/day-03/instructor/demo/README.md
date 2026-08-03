# 講師成果 Demo

這是 Day 3 的完成版 Streamlit 問答助手。它展示的順序是：公開文件 → 可引用段落 → 回答與適用年度 → 問答紀錄。學生可先看成果，再用自己的 starter 重做相同流程。

從 Day 3 根目錄啟動：

```bash
source starter/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
```

Demo 使用講師預建索引，問答紀錄只寫在 `instructor/demo/feedback/`。它不可與學生資料混用；若學生的 Python、Streamlit 或 Ollama 無法啟動，應併機或看講師示範，而不是假裝 Demo 可在本機執行。

展示時請指出：每個回答都有來源；問題的年度或對象會改變規定時，系統要求補充；資料沒有直接證據時，系統停止回答。
