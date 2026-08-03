# Day 2 提示詞導覽｜生源趨勢儀表板

早上課程只使用 `student/00` 至 `student/03`：

1. [建立專案與資料護照](student/00-start-dashboard-project.md)
2. [清理與標準化資料](student/01-clean-standardize.md)
3. [建立互動式儀表板](student/02-build-dashboard.md)
4. [驗證與準備發表](student/03-validate-present.md)

這四份提示詞共同完成一個成果：能從全國整體趨勢，逐步篩選到單一學校、單一科系的高中職生源儀表板。

## 使用原則

- 學號末三碼只用於區分個人專案資料夾。
- 不要求學員設定任教情境、應試群科、學歷或製作個人小卡。
- `data/raw/` 永遠保留原貌；標準化資料與對照表放在 `data/processed/`。
- 名稱改變不等於同一對象。縣市、學校及科系的合併規則都必須可追溯並經過驗證。
- 儀表板的每一個數字，都必須能以相同篩選條件從標準化 CSV 重新算出。

`student/04` 至 `student/07` 與 `reference/` 目前屬於舊版任教情境教材，不是早上儀表板實作流程的一部分；在下午課程內容確認前先保留，不引導學生使用。
