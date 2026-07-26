# Day-03 授課可執行性補強設計

## 目的

在不增加學生主作業的前提下，排除課堂實作最常見的卡點：驗收題型不一致、網站或解析失敗時沒有備案、資料檔案契約不完整，以及本機工具未就緒。

## 已確認決策

1. 基本驗收固定為四類：有依據問答、公開聯絡資訊、模糊問題、語料範圍外問題。
2. 文件衝突或過期是進階挑戰，不列入基本自我檢核。
3. 講師準備最小公開備援語料，只在網站、下載或解析失敗而無法完成流程時使用；備援不放入學生 project template，亦不取代正常爬取。
4. 問答紀錄由學生實際操作產生；不再描述為課程提供的模擬紀錄。

## 教材變更

### 課前與失敗備案

README 改為課堂前 30 分鐘的建置清單：Codex 的 MarkItDown MCP、Ollama 與 `qwen2.5:3b`、`nomic-embed-text-v2-moe`、Python 與 Streamlit。學生先用講師提供的公開範例檔驗證 MarkItDown MCP。

README 與練習 01 增加講師備援規則：由講師提供同樣屬公開來源的最小 HTML、PDF、DOCX 語料與來源資訊；學生將其視為已蒐集資料，仍須建立 manifest、解析、品質檢查與 provenance。正常情況不可跳過爬取直接索取備援。

### 四類基本問答驗收

README、練習 04 與本機 RAG 設計統一為：

| 類型 | 預期行為 |
| --- | --- |
| 有依據的規章或流程 | 回答、引用來源與段落，並可回查關鍵事實。 |
| 公開聯絡資訊 | 僅在 chunk 含該資訊時回答並標示 crawled_at；否則 insufficient_evidence。 |
| 模糊問題 | 要求釐清，或在明確無充分證據時輸出 insufficient_evidence。 |
| 語料範圍外問題 | 輸出 insufficient_evidence，不呼叫模型。 |

文件衝突或過期改為選做：若資料中確有衝突或較舊資料，列出衝突來源與蒐集時間，不自行裁定現行規定。

### 最小資料契約

步驟 02 至 03 明定三份機器可讀產物：

| 檔案 | 最小內容 |
| --- | --- |
| `data/markdown/<document_id>.md` | MarkItDown 輸出；檔頭保留 document_id、source_url、crawled_at、raw_path。 |
| `data/markdown/quality_report.jsonl` | document_id、markdown_path、quality_status、checked_features、reason、checked_at。 |
| `data/processed/<document_id>.chunks.jsonl` | SDD 已定義的 provenance 欄位；只能將 quality_status 為 ready_for_analysis 的 chunk 寫入供 RAG 使用。 |

AI 分析表固定包含 `document_id`、`chunk_id`、`summary`、`category`、`administrative_information`、`topic`、`document_evidence` 與 `ai_interpretation`。

## 驗證

更新後執行：

1. 文件交叉檢索，確認四類基本題型、備援規則與問答紀錄描述一致。
2. 檢查全部 Markdown 連結與檔案路徑存在。
3. 檢查沒有殘留 `data/seeds/` 或「課程提供模擬問答紀錄」的正式敘述。

## 非範圍

不在課程 repo 提供學生 project template、爬蟲程式或完整 RAG 程式碼；學員仍以各步提示詞在自己命名的專案資料夾實作。
