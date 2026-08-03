# Day 3 講師與 TA 指南

## 教學主張

學生先用生成式 AI 分析講師提供的校務文件，再以可引用問答助手驗證解讀。重點不是爬蟲或 Git 操作，而是辨認原文、AI 摘要、適用條件與不確定處。

## Run of Show

| 時間 | 動作 | 完成證據 |
| --- | --- | --- |
| 09:00–09:10 | 講師 Demo：提問、來源、問答紀錄 | 看見分析後可達成的結果 |
| 09:10–09:35 | 環境健康檢查 | Python、Ollama、Streamlit、MarkItDown 可用 |
| 09:35–10:30 | 轉換四份原始文件與品質檢查 | Markdown、品質結論 |
| 10:30–12:00 | 生成式 AI 分析表 | 原文、適用條件、行動、不確定處、來源段落 |
| 13:30–14:30 | chunks 與向量索引 | 可搜尋、可回查的段落 |
| 14:30–15:40 | Codex 建立 Streamlit 問答 | 引用、資料不足、歷程 |
| 15:40–16:30 | 四題驗證與反思 | 哪些問題可答、哪些仍需補資料 |

## 開場 Demo 劇本

從工作坊根目錄 `20260803-Workshop/` 啟動。第一次先建立並安裝 Day 3 的虛擬環境：

```bash
python3 -m venv course/day-03/rag-demo/.venv
source course/day-03/rag-demo/.venv/bin/activate
python3 -m pip install -r course/day-03/rag-demo/requirements.txt
```

之後每次要播放講師 Demo，只需要執行：

```bash
source course/day-03/rag-demo/.venv/bin/activate
python3 -m streamlit run course/day-03/instructor/demo/app.py
```

若目前不在工作坊根目錄，先執行 `pwd` 確認位置；不要直接使用 `rag-demo/.venv` 或 `instructor/demo/app.py` 這種相對路徑。

依序展示：

1. 一題有明確規定與適用年度的問題。
2. 一題需要補充年度或身分的問題，說明助手不能猜測。
3. 來源展開區：答案要回到原始段落。
4. 問答紀錄頁：同一串對話彙整成主要主題，而非只計算單一熱門問題。

定錨句：**今天要做的是讓 AI 協助閱讀與整理文件，但每個結論都要能回到來源。**

## TA 判斷表

| 狀況 | 先做什麼 | 下一步 |
| --- | --- | --- |
| 模型或套件未就緒 | 保留完整錯誤，確認 `.venv`、Ollama 與模型 | 併機或講師協助，不自行換模型 |
| MarkItDown 未顯示 | 新 task 輸入 `/mcp`、重開 Codex | 講師檢查教室 MCP 設定 |
| 文件轉換品質不佳 | 保留品質結果與原始檔 | 帶學生標示需人工查看，不把它當成證據 |
| 索引或 RAG 失敗 | 先看 chunks、索引、模型與 `rag/app.py` | 環境可執行時用 Demo 對照成果；不能執行則併機／講師示範 |

## 備援界線

完成版 Demo 是開場展示與「環境正常但學生流程卡住」的參考。若 Python、Streamlit 或 Ollama 根本不能啟動，Demo 也不能在該學生電腦執行；改採共用設備或講師示範。不要要求學生自行抓網址、建立 GitHub repo 或重做下載流程。
