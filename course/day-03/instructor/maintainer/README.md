# Day 3 教材維護

這裡的內容供講師或教材維護者使用，不是學生上課入口。

- [課程需求（PRD）](prd/generative-ai-text-analysis-prd.md)
- [技術設計（SDD）](sdd/generative-ai-text-analysis-sdd.md)
- [練習驗收條件](exercises/)
- [設計決策與歷史紀錄](docs/)

在 Day 3 根目錄執行提示詞契約檢查：

~~~bash
node instructor/maintainer/tests/verify-prompt-contracts.mjs
~~~

更新投影片後，使用下列指令重新產生檔案：

~~~bash
node instructor/maintainer/scripts/create_day_03_teaching_deck.mjs
~~~

