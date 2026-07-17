# TAIR 雲科大 Vibe Coding 工作坊

本專案是 **TAIR × 雲科大** 三日「Vibe Coding」工作坊的教材與資源總匯。

工作坊目標是讓**沒有任何開發經驗的學員**，在三天內熟悉基礎的 Vibe Coding 概念，並實際用 AI 完成資料視覺化、政府開放資料抓取、地理空間繪圖與文本分析等任務。

- **對象**：師培生 + 通識中心老師，約 40 人
- **時間**：2026 / 08 / 03 – 08 / 05，每日上午 9:00 – 12:00、下午 13:30 – 16:30，共 18 小時
- **GitHub**：<https://github.com/MEDA-TW/20260803-workshop>

---

## 課前準備

> 開課前請先安裝下列工具；安裝過程可參考 [`docs/`](./docs/) 內的文件。

| 工具 | 用途 | 平台 |
|:-----|:-----|:-----|
| [Visual Studio Code](https://code.visualstudio.com/) | 主要 IDE / 程式碼編輯器 | Windows / macOS |
| [GitHub Desktop](https://desktop.github.com/) | 圖形化 Git 工具，下載與繳交作業 | Windows / macOS |
| [Node.js LTS](https://nodejs.org/) | 執行前端 / JavaScript 工具鏈 | Windows / macOS |
| [Python 3.11+](https://www.python.org/) | 資料處理、爬蟲、儀表板後端 | Windows / macOS |
| AI 編碼助手（**Codex** 主要，可選 Claude Code / Cursor） | Vibe Coding 的核心搭擋 | 依工具而定 |

---

## 專案結構

```
20260803-workshop/
├── README.md                   ← 你正在看這份
├── LICENSE                     ← MIT 授權
├── docs/                       ← 課前準備資料
└── course/                     ← 上課教材
    ├── README.md               ← 課程總覽
    ├── day-01/                 ← Day 1：Vibe Coding 基礎 + 資料視覺化
    ├── day-02/                 ← Day 2：政府開放資料抓取
    └── day-03/                 ← Day 3：地理空間 + 文本分析
```

---

## 三日議程速覽

| 日期 | 主題 | 重點產出 |
|:-----|:-----|:---------|
| [Day 1 · 8/3](./course/day-01/README.md) | Vibe Coding 概念 + 資料視覺化儀表板 | 第一個 AI 生成的儀表板 |
| [Day 2 · 8/4](./course/day-02/README.md) | 政府開放資料抓取與品質檢查 | 一份可重現的資料抓取流程 |
| [Day 3 · 8/5](./course/day-03/README.md) | 地理空間繪圖 + 文本分析 | 空間分布圖 + 文本分析成果 |

---

## 如何使用本專案

1. **課前**：依照 [`docs/01-Setup.md`](./docs/01-Setup.md) 內的工具安裝說明，把環境準備好。
2. **上課**：每天的入口是 `course/day-XX/README.md`，會列出該天的教材檔案（prompts、PRD、SDD 等）與練習目標。
3. **課後**：當天的練習成品請推到自己的練習分支，繳交方式見各日說明。

---
