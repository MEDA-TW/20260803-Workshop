# 00｜建立生源儀表板專案

## 直接貼給 Codex

```text
我要開始製作「高中職生源趨勢儀表板」。

請先問我學號末三碼，只用來命名個人專案資料夾；不要詢問或記錄完整學號、姓名、學歷、任教學校或應試群科。

請在 student-work/<學號末三碼>/ 建立：
- data/raw
- data/processed
- dashboard
- docs

將課堂資料下載到 data/raw/moe_high_school_departments_103_114.csv：
https://raw.githubusercontent.com/MEDA-TW/20260803-Workshop/main/course/day-02/data/raw/moe_high_school_departments_103_114.csv

如果同名檔案已存在，不要重新下載或覆寫。接著檢查檔案能否讀取，回報資料列數、欄位數、學年度範圍及前 10 個欄位名稱，但先不要清理資料。

請建立：
1. docs/data-passport.md：記錄資料集名稱、發布機關、官方資料集頁、課堂 GitHub 固定版本、格式、學年度範圍、授權、下載日期、可回答的問題及不能直接回答的問題。
2. docs/progress.md：建立 00–03 四階段清單，將 00 標記完成，下一步寫成 01「清理與標準化」。

官方資料集頁：https://data.gov.tw/dataset/9617

完成後列出建立的檔案，並提醒我使用 01 提示詞。所有原始資料只能保存在 data/raw/，後續不得直接修改。
```

完成後應有：個人專案資料夾、原始 CSV、資料護照與進度紀錄。
