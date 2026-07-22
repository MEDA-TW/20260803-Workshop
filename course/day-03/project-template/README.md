# 專案模板

本模板保存資料從蒐集到改善的每一層。請以複製後的資料夾完成練習，勿修改範例檔作為正式成果。

```text
data/seeds/      講師核准的起始網址與範圍
data/raw/        爬蟲下載的原始 HTML、PDF、DOCX；不可覆寫
data/manifests/  每筆蒐集結果與處理狀態
data/markdown/   MarkItDown MCP 產生的 Markdown
data/processed/  清理、切分與 metadata 後的 JSON
analysis/        摘要、分類、擷取與主題結果
rag/             測試問題、檢索證據與回答
feedback/        問答紀錄與改善 backlog
docs/            資料字典與作業說明
```

在 Codex 中先確認 MarkItDown MCP 可用，再依 manifest 成功紀錄的 `raw_path` 取得本機 `file:` URI，轉換至 `data/markdown/`。任何衍生紀錄都必須保留 `document_id`、`source_url`、`crawled_at`。
