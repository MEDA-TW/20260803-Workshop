# Course — 三日上課教材總覽

> 對應雲科大工作坊：2026 / 08 / 03 – 08 / 05

本資料夾放置三日工作坊的**上課教材**，每個子資料夾對應一天的內容：

| 資料夾 | 日期 | 主題 | 負責講師 |
|:-------|:-----|:-----|:---------|
| [day-01](./day-01/README.md) | 8/3（一） | Vibe Coding 基礎 + 資料視覺化儀表板 |  |
| [day-02](./day-02/README.md) | 8/4（二） | 政府開放資料抓取與品質檢查 | 由 day-02 講師以分支補上 |
| [day-03](./day-03/README.md) | 8/5（三） | 地理空間繪圖 + 文本分析 | 由 day-03 講師以分支補上 |

## 教材檔案慣例

每天的資料夾會用下列慣例組織內容（**佔位，待講師補上**）：

```
day-XX/
├── README.md           ← 當天總覽（時程、主題、產出、繳交方式）
├── prompts/            ← 給 AI 的提示詞範本
├── prd/                ← 產品的 PRD（Product Requirements Document）
├── sdd/                ← 技術設計文件（System / Software Design Doc）
└── exercises/          ← 隨堂練習與作業
```

## 給負責 day-02、day-03 的講師

- 請建立分支，例如 `feature/day-02-content`、`feature/day-03-content`，在自己的子資料夾內新增教材。
- 完成後發 PR 合併回 `main`；若需要協助或 Code Review，可聯絡專案負責人。
- 建議在分支內**先建立子資料夾結構**（`prompts/`、`prd/`、`sdd/`、`exercises/`），再逐一補上內容。
- README 內的「負責講師」欄位請一併補上姓名 / GitHub handle。