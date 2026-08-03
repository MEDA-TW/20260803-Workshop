# Day 3 rag-demo

這個 rag-demo 是你的 Day 3「文件分析 + RAG 問答」工作空間，不是完成品。它已附上講師提供的四份公開校務原始文件與來源紀錄；請依序開啟並貼上本資料夾的五份提示詞，先完成文本分析，再從空白建立 `rag/app.py`。

以 Codex Desktop 直接開啟這個 `rag-demo/` 資料夾；Terminal 預設就在這裡：

```bash
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
scripts/         建立索引的既有腳本，不必修改
```

## 依序使用提示詞

開啟 [PROMPTS.md](PROMPTS.md)，每完成一段、看過結果後，再貼下一段；不要跳步。

完成提示詞 4 後，建立自己的索引：

```bash
python scripts/build_index.py
```

它會讀取你放入 `data/processed/` 的 chunks，輸出 `data/processed/vector_index.jsonl`。完成 `PROMPTS.md` 的提示詞 5 後，才執行：

```bash
python -m streamlit run rag/app.py
```
