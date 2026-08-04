# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

今天分成兩條清楚的學習主線：上午以論文摘要做探索與主分類分析，下午以校務文件做 RAG。共同核心是用生成式 AI 整理文本，但每個結論或回答都要能回到來源證據。

| 你是誰 | 從哪裡開始 |
| --- | --- |
| 學員（上午） | [text-analysis-demo/README.md](text-analysis-demo/README.md) |
| 學員（下午） | [rag-demo/README.md](rag-demo/README.md) |
| 講師或 TA | [instructor/README.md](instructor/README.md) |
| 要播放上課簡報 | [instructor/slides/](instructor/slides/) |

## 學生路徑

下載三天工作坊 ZIP 並解壓縮後，上午以 Codex Desktop 開啟 `course/day-03/text-analysis-demo/`，下午再開啟 `course/day-03/rag-demo/`。上午與下午是兩個獨立資料包；上午不需 MarkItDown、Ollama 或 Streamlit，下午才進行校務文件的轉換、索引與問答。學生不必自行找網址、爬取或使用 Git。

```text
上午：255 篇論文摘要 → 關鍵詞／方法線索探索 → 候選主分類與研究者確認 → AI 初步編碼／人工抽查 → Word 比較報告
下午：4 份校務文件 → MarkItDown 轉文字 → 搜尋索引 → 可引用問答助手
```

上午的主要成果是保留探索紀錄、主分類變更紀錄、摘要編碼表與 `comparison_report.docx`。最後的 Word 報告只保留研究者確認後的主分類；關鍵詞與方法線索探索是建立分類的過程證據，不直接當作最後報告的主分類結果。下午的 Streamlit 問答助手則用引用與資料不足保護，練習安全使用另一類文本。

## 學習目標

完成後，學員能：

1. 先從論文摘要探索關鍵詞與方法線索，再提出可檢查的主分類候選。
2. 以研究者確認後的主分類比較兩校研究議題、研究對象、方法與取向。
3. 區分摘要原文、AI 初步編碼與人工確認，讓每個結論可回查。
4. 了解樣本結構與學位別如何影響比較，避免只以篇數下結論。
5. 使用 MarkItDown 將 HTML、DOCX、PDF 轉成可搜尋文字並做品質檢查。
6. 以自己的索引建立本機 Streamlit 問答助手；回答必有引用，沒有證據就停止。

## 課前環境

上午只需 Codex Desktop 與課程提供的論文摘要資料。下午請準備 Python、Ollama 與 Codex Desktop，並在 Codex 輸入 `/mcp` 確認 `markitdown` enabled；模型為 `qwen2.5:3b`（回答）和 `nomic-embed-text-v2-moe`（搜尋索引）。詳見本日的 [安裝與健康檢查](instructor/resources/install-and-health-check.md)。

## 講師 Demo

講師在開場分別展示上午的 Word 分析報告與下午的可引用問答效果。上午依 `PROMPTS.md` 的七個階段完成「資料檢查 → 探索 → 候選分類 → 研究者確認 → 試編碼 → 全量編碼 → 報告」；下午再依 `rag-demo/PROMPTS.md` 完成校務文件 RAG。若下午環境可執行但流程卡住，講師可用 Demo 協助學生看懂成果；若 Python、Streamlit 或 Ollama 根本不能啟動，則採講師示範或共用設備。
