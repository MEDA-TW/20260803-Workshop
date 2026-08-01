# 練習 02｜Markdown 品質檢查

先從練習 01 的 manifest 選一筆成功爬取的文件，再依 [學生指南 03](../../STUDENT_GUIDE.md) 的短提示詞處理。先確認 MarkItDown MCP 可用，再開始解析。

至少檢查三種特徵：標題階層、段落／清單、表格或掃描內容。每份 Markdown 存為 `data/markdown/<document_id>.md`，檔頭保留來源 metadata；並在 `data/markdown/quality_report.jsonl` 寫入一筆 `document_id`、輸出路徑、檢查特徵、品質狀態、原因與檢查時間。品質狀態只能是 `ready_for_analysis`、`needs_review` 或 `excluded`；後兩者必須說明原因。
