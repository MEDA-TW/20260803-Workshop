# Day 3 講師用｜安裝與健康檢查

本課只需要本機 Python、Ollama、Streamlit 與 Codex Desktop 的 MarkItDown MCP；不需要學生安裝 Codex CLI、建立 GitHub repo 或下載課程來源資料。

## 學生在 `course/day-03/starter/` 執行

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
ollama pull qwen2.5:3b
ollama pull nomic-embed-text-v2-moe
ollama list
python -c "import streamlit, ollama; print('python-ok')"
```

在 Codex Desktop 的新 task 輸入 `/mcp`，確認 `markitdown` 為 enabled。若未顯示，講師依教室已驗證的設定處理；學生不必在 Terminal 使用 `codex mcp list`，也不要自行安裝其他 MCP。

## 講師驗收

1. 能看見兩個 Ollama 模型：`qwen2.5:3b` 負責整理回答，`nomic-embed-text-v2-moe` 只建立搜尋向量。
2. `data/raw/` 有四份講師提供的文件，`data/manifests/crawl_manifest.jsonl` 有四筆來源紀錄。
3. MarkItDown 能讀取本機文件並輸出可閱讀文字。
4. `python -m streamlit run instructor/demo/app.py` 能展示一題有來源的回答與問答紀錄。

## 快速排錯

| 現象 | 處理 |
| --- | --- |
| `ollama: command not found` | 重開 Terminal，確認 Ollama App 已開啟；仍失敗交給講師。 |
| Python 匯入失敗 | 確認已啟用 `.venv`，重跑 `python -m pip install -r requirements.txt`。 |
| `/mcp` 沒有 MarkItDown | 重開 Codex、建立新 task；仍失敗由講師處理 MCP 設定。 |
| Streamlit 或 Ollama 無法啟動 | 保留完整錯誤，併機或看講師示範；本機 Demo 不會解決環境故障。 |
