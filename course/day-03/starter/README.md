# Day 3 starter

這個 starter 是你的 Day 3 工作空間，不是完成品。它已附上講師提供的四份公開校務原始文件與來源紀錄；你用 Codex 依 [學生指南](../STUDENT_GUIDE.md) 先完成文本分析，再從空白建立 `rag/app.py`。

從下載並解壓縮的工作坊資料夾進入 `course/day-03/starter/`：

```bash
cd starter
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

你會使用的資料夾：

```text
data/raw/        講師提供的原始文件，不修改
data/manifests/  來源紀錄，不修改
data/markdown/   MarkItDown 轉出的文字與品質結果
analysis/        校務文件分析表
data/processed/  可搜尋段落與向量索引
rag/             你用 Codex 建立的 Streamlit 介面
feedback/        問答紀錄
```

完成提示詞 4 後，建立自己的索引：

```bash
python scripts/build_index.py
```

它會讀取你放入 `data/processed/` 的 chunks，輸出 `data/processed/vector_index.jsonl`。完成提示詞 5 的 Codex 提示詞後，才執行：

```bash
python -m streamlit run rag/app.py
```

`sample-data/` 僅保留給維護者的程式測試，不是你的課程資料。
