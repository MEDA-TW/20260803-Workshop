# Codex 從零建立 Streamlit RAG 問答助手設計

## 目的

Day 3 的學生不再使用預先完成的 Streamlit 問答介面。學生先以 Codex 處理課程指定的四份校務公開資料並建立索引，再從空白建立 `rag/app.py`，完成有引用與問答紀錄的本機 RAG 問答機器人。

## 保留與移除

- 保留：`requirements.txt`、資料夾規則、`scripts/build_index.py`、sample-data 健康檢查、測試、講師成果 Demo。
- 改為學生建立：Streamlit `rag/app.py`、首頁聊天介面、來源顯示、開新對話、問答紀錄頁。
- 不要求學生從零建立爬蟲、向量索引演算法或 Ollama 模型；Codex 依既有資料結構串接即可。

## 學生主線

1. 以單一批次提示詞處理四份指定校務資料，逐份確認公開規範、取得、記錄、MarkItDown 解析與品質檢查。
2. 整理品質通過的文字為可引用 chunks，執行既有 `scripts/build_index.py` 建立學生索引。
3. 在 Codex 中從空白建立最小 `rag/app.py`：能以 `python -m streamlit run rag/app.py` 顯示頁面、標題和底部輸入框。
4. 以 Codex 加入左右對話訊息和新對話按鈕；先用暫時回應驗證介面互動。
5. 以 Codex 將已建立的學生索引與 Ollama 接回自己的 `rag/app.py`：檢索最多三段、只根據來源回答、資料不足時輸出 `insufficient_evidence`。
6. 以 Codex 加入文件、URL、段落、適用年度／公告日期與相似度引用，以及本機 JSONL 問答紀錄表格。
7. 測試學分、英文年度、流程／表單、校務日期四類問題，並產出改善清單。

## 介面完成條件

- 問題送出後立即顯示在右側，檢索期間顯示進度，回答顯示在左側。
- 底部有輸入框，側欄可開新對話並切換「問答」與「問答紀錄」。
- 每個有證據的回答顯示來源與引用；英文、日期答案顯示適用年度或公告日期。
- 問答紀錄以整次對話的主要主題、題數、狀態與平均秒數呈現。

## 失敗與備援

- 每個步驟都先以可執行輸出驗證；若 Codex 產生的 UI 無法執行，學生修正該步，不跳到 RAG 串接。
- 學生個人介面或資料流程失敗、但 Python／Streamlit／Ollama 可執行時，使用獨立 `instructor/demo/app.py` 展示完成成果。
- Python／Streamlit／Ollama 本身無法執行時，講師示範或併機；本機 Demo 不可取代環境排錯。

## 驗收

- 學生指南有明確、分段的 Codex 提示詞，不要求自行寫 Python。
- starter 不再把完整問答 UI 當作學生主線的既成成果。
- 講師 Demo 保留完整可運行的成果與資料，不與學生資料混用。
- 提示詞契約、Python 測試、`git diff --check` 和 Streamlit 啟動檢查通過。
