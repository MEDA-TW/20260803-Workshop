# Day-03 本機 Ollama RAG 對話機器人設計

## 目標與範圍

在每組的 `team-xx-project/` 建立一個可由瀏覽器開啟的最小 Streamlit 對話機器人。它只讀取品質為 `ready_for_analysis` 的 chunks，以本機 Ollama 模型生成中文回答，並顯示可追溯引用與限制。每次提問都寫入問答紀錄，供第 05 步分析。

本功能不使用雲端 API、不要求向量資料庫、不存取白名單外來源，也不修改 `data/raw/`。

## 前置條件

- 所有學員課前安裝 Ollama。
- 課堂指定模型為 `qwen2.5:3b`，並在課前下載至本機。
- 專案使用 Python 與 Streamlit；模型只透過本機 Ollama 服務呼叫。

## 介面與資料流程

```text
瀏覽器（Streamlit）
  問題輸入、回答、引用、限制
          ↓
讀取 data/processed/*.chunks.jsonl
  僅保留 ready_for_analysis
          ↓
關鍵字檢索前 3 個 chunks
          ↓
證據不足 → insufficient_evidence
有證據 → Ollama qwen2.5:3b
          ↓
回答、引用、crawled_at、限制
          ↓
feedback/query_log.jsonl
```

## 元件責任

| 元件 | 責任 |
| --- | --- |
| `rag/app.py` | Streamlit 介面；接收問題、呈現回答與引用。 |
| `rag/retrieval.py` | 載入 chunks、只保留可用資料、以問題關鍵字選出最多三筆 chunks。 |
| `rag/answering.py` | 組合受限提示詞、呼叫本機 Ollama；不得讓模型補造 chunks 外資訊。 |
| `rag/query_log.py` | 將問答事件以 JSONL 追加至 `feedback/query_log.jsonl`。 |
| `rag/requirements.txt` | 列出 Streamlit 與 Ollama Python 用戶端。 |

## 回答契約

每次回答必有：

- `answer`
- `answer_status`：`supported` 或 `insufficient_evidence`
- `retrieved_chunk_ids`
- `citations`：文件名稱、`source_url`、`page_or_anchor`、`crawled_at`
- `limitations`

檢索不到與問題有足夠關聯的 chunks 時，程式不呼叫模型，直接輸出 `insufficient_evidence`，並說明應補哪類文件。承辦人、email、電話或分機問題只有在檢索到含該資訊的 chunk 時才能回答。

## 問答紀錄

`feedback/query_log.jsonl` 每筆事件包含：

- `query_id`
- `asked_at`
- `question`
- `answer_status`
- `cited_chunk_ids`
- `user_feedback`（初始為 `null`）
- `notes`

此檔案是第 05 步的唯一輸入之一；不記錄 API 金鑰，也不另行寫入模型完整 prompt。

## 錯誤處理

| 情況 | 介面行為 |
| --- | --- |
| Ollama 未安裝、服務未啟動或模型未下載 | 顯示可讀錯誤與對應修復指令，不生成答案。 |
| chunks 檔不存在或沒有 `ready_for_analysis` 資料 | 顯示資料尚未完成第 03 步，不生成答案。 |
| 問題與 chunks 不相關 | 顯示 `insufficient_evidence`，並記錄事件。 |
| 模型呼叫失敗 | 顯示錯誤；保留檢索結果，但不將失敗視為支持性回答。 |

## 驗收與測試

1. 在沒有 Ollama 時，介面顯示可行的修復訊息。
2. 用已有證據的「最晚何時送所辦」問題，顯示回答、chunk、URL、段落與 `crawled_at`。
3. 用「承辦人是誰」及「資格考何時申請」問題，顯示 `insufficient_evidence`，不編造資訊。
4. 每次提問都在 `feedback/query_log.jsonl` 產生一筆可供第 05 步分析的紀錄。
