# 下午成果 Demo｜校務文件 RAG

這是 Day 3 下午的完成版 Streamlit 問答助手。它展示的順序是：公開文件 → 可引用段落 → 回答與適用年度 → 問答紀錄。學生可先看下午成果，再用自己的 `rag-demo/` 重做相同流程；上午的 Word 分析報告已放在本資料夾：[comparison_report.docx](comparison_report.docx)。這份報告是依 `text-analysis-demo/PROMPTS.md` 第 1–7 段流程產出的最後成果，講師 Demo 保留獨立副本。

從 Day 3 根目錄啟動：

```bash
source rag-demo/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
```

Demo 使用講師預建索引，問答紀錄只寫在 `instructor/demo/feedback/`。它不可與學生資料混用；若學生的 Python、Streamlit 或 Ollama 無法啟動，應併機或看講師示範，而不是假裝 Demo 可在本機執行。

展示時請指出：每個回答都有來源；問題的年度或對象會改變規定時，系統要求補充；資料沒有直接證據時，系統停止回答。
