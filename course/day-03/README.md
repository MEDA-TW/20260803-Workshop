# Day 3 — 生成式人工智慧於文本資料分析的應用

> 2026 / 08 / 05（三）· 09:00–12:00／13:30–16:30

今天不是只做聊天機器人，而是學會用生成式 AI **分析、解讀並回查校務文件**。

| 你是誰 | 從哪裡開始 |
| --- | --- |
| 學員 | [rag-demo/README.md](rag-demo/README.md) |
| 講師或 TA | [instructor/README.md](instructor/README.md) |
| 要播放上課簡報 | [instructor/slides/](instructor/slides/) |

## 學生路徑

下載三天工作坊 ZIP 並解壓縮後，以 Codex Desktop 直接開啟 `course/day-03/rag-demo/`。rag-demo 已有講師提供的四份公開校務原始文件與 `crawl_manifest.jsonl`，學生不必自行找網址、爬取或使用 Git。

```text
4 份原始文件 → MarkItDown 轉文字 → 校務文件分析表 → 搜尋索引 → 可引用問答助手
```

主要成果是能區分「文件明確寫了什麼」與「AI 摘要或分類」的分析表；Streamlit 問答助手則用引用與資料不足保護，驗證分析能否被安全使用。

## 學習目標

完成後，學員能：

1. 看懂原始文件、來源紀錄與衍生資料的差別。
2. 使用 MarkItDown 將 HTML、DOCX、PDF 轉成可搜尋文字並做品質檢查。
3. 用生成式 AI 產出可回查的校務文件分析表，標示年度、對象、行動與不確定處。
4. 以自己的索引建立本機 Streamlit 問答助手；回答必有引用，沒有證據就停止。
5. 用四類問題檢查文本分析與問答結果：學分、英文門檻、流程表單、校務日期。

## 課前環境

請準備 Python、Ollama 與 Codex Desktop；Day 3 另需在 Codex 輸入 `/mcp` 確認 `markitdown` enabled。模型為 `qwen2.5:3b`（回答）和 `nomic-embed-text-v2-moe`（搜尋索引）。詳見本日的 [安裝與健康檢查](instructor/resources/install-and-health-check.md)。

## 講師 Demo

講師在開場展示完成版的分析與問答效果。學生理想情況是自己完成五段提示詞；若環境可執行但流程卡住，講師可用 Demo 協助學生看懂成果。若 Python、Streamlit 或 Ollama 根本不能啟動，則採講師示範或共用設備。
