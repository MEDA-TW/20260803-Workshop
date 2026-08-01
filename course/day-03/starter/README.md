# Day 3 個人 starter

這個 starter 不是完成品。你會先依 [學生指南](../STUDENT_GUIDE.md) 取得與處理四份指定校務資料、建立索引，再用 Codex 從空白建立 `rag/app.py`，完成自己的 Streamlit RAG 問答助手。

在 Day 1 已建立的 private 練習 repo 內進入 Day 3 starter 後，確認目前資料夾有 `requirements.txt` 與 `rag/`。若你在 `day-03/` 根目錄，先執行：

```bash
cd starter
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

完成學生指南第 02～04 節後，建立自己的索引：

```bash
python scripts/build_index.py
```

它會讀取你放入 `data/processed/` 的 chunks，輸出 `data/processed/vector_index.jsonl`。完成學生指南第 05 節的 Codex 提示詞後，才執行：

```bash
python -m streamlit run rag/app.py
```

`sample-data/` 只保留作為索引腳本與資料格式的健康檢查，不是最後成果。講師成果 Demo 位於課程根目錄的 `instructor/demo/app.py`；若需要展示已完成範例，從 `starter/` 執行 `cd ..` 後再執行 `python -m streamlit run instructor/demo/app.py`。它與你的資料及問答紀錄完全分開。
