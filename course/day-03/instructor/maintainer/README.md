# Day 3 教材維護

這裡的內容供講師或教材維護者使用，不是學生上課入口。

## 目前課程定位

Day 3 分成兩個獨立模組：

- 上午「論文摘要探索與主分類分析」：使用 `text-analysis-demo/` 的 255 篇摘要，先探索關鍵詞／方法線索，再確認主分類，產出可回查的 Word 比較報告。
- 下午「校務文件 RAG」：使用 `rag-demo/` 的固定校務文件，完成解析、索引與有引用的本機問答助手。

請不要把下午的 MarkItDown、Ollama、Streamlit 前置條件套用到上午，也不要把上午的摘要主分類報告當成下午 RAG 的分析表。

- [課程需求（PRD）](prd/generative-ai-text-analysis-prd.md)
- [技術設計（SDD）](sdd/generative-ai-text-analysis-sdd.md)
- [練習驗收條件](exercises/)
- [設計決策與歷史紀錄](docs/)
- `health-check/`：不隨學生 rag-demo 發送的健康檢查範例資料。
- `tests/`：教材維護測試；在 Day 3 根目錄以 `PYTHONPATH=rag-demo python -m unittest discover instructor/maintainer/tests` 執行。

在 Day 3 根目錄執行提示詞契約檢查：

~~~bash
node instructor/maintainer/tests/verify-prompt-contracts.mjs
~~~

更新投影片後，使用下列指令重新產生檔案：

~~~bash
node instructor/maintainer/scripts/create_day_03_teaching_deck.mjs
~~~
