# Day 03 講師專用公開備援包

本包不是課前教材，也不是讓學生跳過爬取的捷徑。只有網站、下載、解析或站方規範異常，使學生無法取得至少三筆 `ready_for_analysis` chunks 時，講師才可提供本包。

## 啟用前檢查

1. 重查 `https://tve.yuntech.edu.tw/robots.txt` 與當日網站規範；本包建立時該 URL 回傳 404，這不是自動擷取的許可。
2. 確認學生已保留自己的 `crawl_scope.json`、嘗試紀錄與失敗原因。
3. 只把本包的 `data/raw/` 與 `data/manifests/` 複製進學生的個人專案；不要提供 markdown、chunks、向量索引或預先寫好的答案。
4. 學生仍須完成 MarkItDown 解析、品質檢查、chunk、分析表、引用問答與自我測試。

## 內容

- 一個公開 HTML 服務頁。
- 同一公開服務頁直接連結的一份 PDF 與 DOCX。
- scope、manifest、擷取時間與 SHA-256，供學生驗證 provenance。

原始來源：雲科大技術及職業教育研究所「01 博士生修業流程」公開頁面及其公開附件。原始資料不可覆寫。

## 複製方式

在講師確認可啟用後，將本包的 `data/raw/` 與整個 `data/manifests/` 複製到學生的 `my-project/`。不要更改 `scope_id`，否則 manifest 的 `scope_id` 會失去可回查性；學生應在後續的自我測試紀錄或改善 backlog 註明「講師備援」與啟用原因，再依提示詞 02 開始解析。

## 完整性驗證

在本包根目錄執行：

```bash
shasum -a 256 data/raw/tve-service-01/*
```

輸出必須與 `data/manifests/crawl_manifest.json` 中的 `sha256` 相符。不同即停止使用並通知講師。
