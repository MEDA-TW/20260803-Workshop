# Day 3 講師與 TA 指南

## 教學主張

學生先用自己的公開文本完成可回查的證據鏈，再透過 Codex 從空白建立 Streamlit RAG 問答助手。

## Run of Show

| 時間 | 動作 | 完成證據 |
| --- | --- | --- |
| 09:00–09:05 | 講師成果 Demo：學分、英文年度、來源與問答紀錄 | 學生看見最終效果 |
| 09:05–09:30 | private starter 健康檢查 | Python、Ollama、Streamlit 與 MarkItDown 可用 |
| 09:30–10:30 | scope、公開爬取、解析 | manifest、Markdown、品質結論 |
| 10:30 | 固定切換門檻 | 個人資料流程卡住者保留證據；環境可跑者由講師指引使用獨立 Demo |
| 10:30–12:00 | 品質檢查與 chunks | 三筆 ready_for_analysis chunks |
| 13:30–14:30 | AI 分析 | 證據與 AI 解讀分欄 |
| 14:30–15:40 | 用 Codex 建立 Streamlit、接上 RAG、四類測試 | 問答、引用、歷程 |
| 15:40–16:30 | backlog 與現場證據展示 | 四步展示，不蒐集、不計分 |

## 09:00–09:05 開場 Demo 劇本

先啟動獨立 Demo。若終端機目前在 `day-03/starter/` 且已顯示 `(.venv)`，不要再輸入 `source starter/.venv/bin/activate`；直接執行：

```bash
cd ..
python -m streamlit run instructor/demo/app.py
```

若終端機在 `day-03/` 根目錄且尚未啟用環境，才執行：

```bash
source starter/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
```

Demo 固定讀取 `instructor/demo/data/processed/vector_index.jsonl`，不讀取學生的 `starter/sample-data/`。在「問答」頁依序完成：

1. 貼上「115 學年度碩士班畢業至少需要幾學分？」；展示 39 學分、來源與 115 學年度。
2. 貼上「112 學年度後入學的英文門檻適用什麼規定？」；展示只向系所確認，不套用 111 學年度前的分數。
3. 開啟「問答紀錄」；指出同一串對話會彙整為主要主題，且問題、回答、狀態與來源都會留下。
4. 說明學生理想情況是依指南建立自己的資料；個人資料或助手失敗但環境可跑時，才使用獨立 Demo。

講述定錨：**今天不是做一個會聊天的畫面，而是讓每句回答都能回到資料，沒有資料就停止。**

## 課程結束成果展示（講師使用）

使用真實碩士班資料時，依序在「問答」頁提問：115 學年度畢業學分、111 學年度前英文門檻、112 學年度後英文規定與校務日期；再到「問答紀錄」展開這串對話，展示主要主題、回答與來源。資料範圍、原始檔與改善 backlog 請從 `resources/live-demo/` 查閱，不顯示在學生機器人的側欄。

## 真實資料示範（09:30 後，選用）

若要在進入學生實作前展示真實來源資料，使用 [雲科大技職所即時示範資料](resources/live-demo/README.md)。它實際保留技職所、語言中心與教務處的公開資料、抓取 manifest、SHA-256、Markdown 與 12 筆碩士班示範 chunks。

獨立 Demo 已預載講師資料，不需複製到學生 starter。依前節的 `python -m streamlit run instructor/demo/app.py` 啟動後，可提問「115 學年度碩士班畢業至少需要幾學分？」；回答必須引用 `tve-master-manual-115`、說明 39 學分，並顯示適用年度。英文題需區分：111 學年度前可說明校訂標準，112 學年度後只回答須向系所確認。這是講師展示與學生備援資料；學生理想情況仍應完成自己的資料與助手。

## TA 判斷表

| 狀況 | 先做什麼 | 下一步 |
| --- | --- | --- |
| 模型未下載 | 確認課前檢查 | 併機或講師示範，不讓全班等待下載 |
| MCP 未顯示 | 在 Codex Desktop 新 task 輸入 `/mcp`、重開新 task | 仍失敗則由講師檢查 MCP 設定 |
| 網站／下載卡住 | 保留 scope 與 manifest | 環境可跑時改用獨立 Demo；環境也不能跑則併機或講師示範 |
| RAG 無法啟動 | 先確認 `vector_index.jsonl`、Python、Ollama、模型與學生剛建立的 `rag/app.py` | 仍失敗則併機／講師示範；學生仍可做證據鏈與 backlog |

## 棄守順序

1. 自訂分析分類。
2. 進階檢索調參。
3. 個別網站下載排錯（10:30 後一律備援）。
4. 非核心 UI 美化。
