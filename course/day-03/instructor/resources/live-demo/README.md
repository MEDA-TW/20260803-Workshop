# 雲科大技職所：講師即時示範資料

這是一次受控、可追溯的公開網頁示範資料，不是學生作業的預先完成答案。

## 本次範圍

- 網站：`https://tve.yuntech.edu.tw/`、`https://lc.yuntech.edu.tw/`、`https://aax.yuntech.edu.tw/`
- 主 Demo 為碩士班：本所公開的 **115 學年度研究生手冊**、碩士班修課計畫／指導同意書、語言中心公開的英文畢業門檻頁，以及教務處公開的 **115 學年度第 1 學期行事曆**。原先的博士班服務資料仍保留作為資料管線對照，不是首頁問答的主索引。
- 抓取日期：2026-07-29；每個請求均為單一連線，不登入、不搜尋、不追蹤外部連結。
- `robots.txt` 於本次檢查回傳 404；這不是擷取許可。日後重跑前，講師仍須先檢查當日規範與網站狀態。

`data/manifests/` 保存來源、時間、HTTP 狀態與 SHA-256；`data/raw/` 是不可改寫的原始檔。PDF／DOCX 以 MarkItDown CLI 轉換；`scripts/build_live_demo.py` 從已驗證的 Markdown 產生可檢查的 RAG chunks。

本資料夾是講師唯讀示範資料，保留當時的 manifest 格式；學生自己的新成果一律使用 `data/manifests/crawl_manifest.jsonl`，不可直接沿用這裡的檔案。

完整結業成果也已放入本包：`data/markdown/quality_report.jsonl`、`analysis/text_analysis.md`、`feedback/query_log.jsonl` 與 `feedback/improvement_backlog.md`。它們分別對應品質檢查、來源與 AI 解讀分離的分析、四類測試、以及可回連 `query_id` 的改善行動。

## 在課堂中使用

講師要以真實資料展示時，先產生 chunks，然後直接啟動獨立 Demo；不要把講師資料複製進學生 rag-demo：

```bash
python3 scripts/build_live_demo.py
cd ../..
source rag-demo/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
```

可問：`115 學年度碩士班畢業至少需要幾學分？`，預期引用 `tve-master-manual-115` 並回答 39 學分；`112 學年度後入學的英文門檻適用什麼規定？`，預期回答須向各系所確認，而非套用 111 學年度前的數值門檻。

不要把本資料當作學生最終證據；學生仍須自行完成範圍定義、抓取、解析、品質檢查與測試。
