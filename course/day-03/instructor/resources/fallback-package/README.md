# Day 03 歷史參考資料（不在課程使用）

本資料夾保留早期博士班公開資料管線的原始檔與 provenance，僅供維護者回溯；不是課前教材、學生 starter 或講師備援包。正式課程的展示與備援一律使用 [講師成果 Demo](../../demo/README.md)，其資料範圍為碩士班、英文門檻與校務行事曆。

## 歷史內容說明

本包建立時曾檢查 `https://tve.yuntech.edu.tw/robots.txt`，該 URL 回傳 404；這不是自動擷取的許可。日後若維護者重用其中任何公開來源，仍須重新檢查當日網站規範。這是講師唯讀歷史資料，保留當時的 `crawl_manifest.json`；學生自己的新成果一律使用 `data/manifests/crawl_manifest.jsonl`。

## 內容

- 一個公開 HTML 服務頁。
- 同一公開服務頁直接連結的一份 PDF 與 DOCX。
- scope、manifest、擷取時間與 SHA-256，供學生驗證 provenance。

原始來源：雲科大技術及職業教育研究所「01 博士生修業流程」公開頁面及其公開附件。原始資料不可覆寫。

## 完整性驗證

在本包根目錄執行：

```bash
shasum -a 256 data/raw/tve-service-01/*
```

輸出必須與 `data/manifests/crawl_manifest.json` 中相同 `document_id` 的 `sha256` 相符。不同即停止使用並通知講師。
