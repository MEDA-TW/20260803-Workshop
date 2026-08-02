# TAIR 雲科大 Vibe Coding 工作坊

本專案是 **TAIR × 雲科大** 三日 Vibe Coding工作坊的教材與補充資源總覽。

工作坊目標是在三天內熟悉 Vibe Coding 的基本概念與協作流程，並實際用 AI 完成資料視覺化、政府開放資料處理與文本分析等任務。

- **時間**：2026 / 08 / 03 – 08 / 05，每日上午 9:00 – 12:00、下午 13:30 – 16:30，共 18 小時
- **GitHub**：<https://github.com/MEDA-TW/20260803-workshop>

## 從哪裡開始

| 你是誰 | 建議入口 |
|:-------|:---------|
| 第一次準備上課的學員 | 先閱讀 [`docs/`](./docs/) 的環境與 GitHub 操作指南，再進入 [`course/`](./course/) 的當日教材 |
| 要查找當日教材 | 從 [`course/README.md`](./course/README.md) 選擇 Day 1、Day 2 或 Day 3 |
| 想了解共用 AI Skills | 閱讀 [`skills/README.md`](./skills/README.md)；這是課堂補充資料，不是上課前的必要步驟 |

學員不需要一次閱讀整個 repository；依照「課前準備 → 當日課程 → 當日練習」的順序即可。

---

## 課前準備

> 開課前請先安裝下列工具；請從 [`環境安裝指南`](./docs/01-getting-started/01-environment-setup.md) 開始，GitHub Desktop 的操作則參考 [`GitHub Desktop 安裝`](./docs/01-getting-started/02-github-desktop.md)。

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
├── docs/                       ← 課前與協作操作手冊
├── skills/                     ← AI agent 與工作流程的補充資料
└── course/                     ← 上課教材
    ├── README.md               ← 課程總覽
    ├── day-01/                 ← Day 1：Vibe Coding 基礎 + 資料視覺化
    ├── day-02/                 ← Day 2：公開數據介紹與應用
    └── day-03/                 ← Day 3：文本資料分析與 RAG 問答
```

---

## 三日議程速覽

| 日期 | 主題 | 實戰應用 |
|:-----|:-----|:---------|
| [Day 1 · 8/3](./course/day-01/README.md) | Vibe Coding 概念與基礎操作 | 資料視覺化與儀表板的製作 |
| [Day 2 · 8/4](./course/day-02/README.md) | 公開數據介紹與應用 | 政府開放數據抓取與清理 |
| [Day 3 · 8/5](./course/day-03/README.md) | 生成式人工智慧於文本資料分析 | 來源可追溯的 RAG 問答助手 |

---

## 如何使用本專案

1. **課前**：依照 [`docs/`](./docs/) 的指南完成工具安裝與 GitHub 基本操作。
2. **上課**：先閱讀 [`course/README.md`](./course/README.md)，再進入當天的 `course/day-XX/README.md`；各日教材結構可能不同，請以當日 README 的指引為準。
3. **課後**：依當日 README 的說明整理成果、建立練習分支並繳交；不要直接修改本教材的共用內容。

## 資料夾說明

- [`docs/`](./docs/)：給學員的課前與協作操作手冊，包含環境建置、GitHub Desktop、分支、PR 與 Skills 使用說明。
- [`skills/`](./skills/)：AI agent 可重複使用的流程、指令與參考資源，作為課堂延伸閱讀與共用資源。
- [`course/`](./course/)：三日正式上課教材；每一天的進入方式、練習目標與繳交規則，以該日 README 為準。
