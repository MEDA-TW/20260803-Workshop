# Skills 使用指南

> 初學者友善 | 約 10 分鐘

## 你可能遇過這些問題

你用 AI 工具寫了一個很好的 prompt，解决了某個重複性的工作。但下次遇到同樣的問題，prompt 已經不見了，又要重新寫一遍。或者，你寫了一個很棒的工作流程，但其他同事不知道怎麼用。

Skills 就是為了解決這個問題而設計的。它把常見的工作流程、指令和最佳實踐打包成一個可重複使用的單位，讓團隊成員都能直接套用。

## 完成後你會理解

- Skills 是什麼、怎麼用
- 本專案的 Skills 目錄結構
- 如何在自己的工作中使用 Skills

---

## 什麼是 Skill？

一個 Skill 就是一份「可執行的工作說明書」。它描述了在特定情境下，AI 應該怎麼做、遵循什麼規則、產出什麼格式的結果。

舉個例子：

- **情境**：你有一份 CSV 資料，想要做統計分析
- **Skill**：`data-analysis/csv-analysis`，裡面定義了分析流程、輸出格式、常見錯誤處理
- **使用方式**：在 AI 工具中引用這個 Skill，它就會按照裡面的步驟執行

---

## 本專案的 Skills 目錄

Skills 放在專案根目錄的 `skills/` 資料夾中，按照用途分類：

```
skills/
├── data-analysis/       數據清理、統計分析、圖表生成
├── research-methods/    研究設計、文獻分析、實驗規劃
├── file-conversion/     PDF、Word、Excel、圖片格式轉換
├── presentation/        PPT 大綱、簡報內容、投影片文案
├── research/            研究助理、文獻整理、摘要分析
├── design/              UI/UX、前端設計協作
└── engineering/         開發流程、除錯、code review
```

每個分類底下會有多個 Skill，每個 Skill 是一個獨立的資料夾：

```
data-analysis/
└── csv-analysis/
    ├── SKILL.md         Skill 的主要說明與指令
    ├── README.md        補充說明或維護筆記
    ├── scripts/         需要執行的腳本
    └── references/      參考文件或範本
```

---

## 如何使用 Skill

### 在 Claude Code 中使用

1. 確認你已經 Clone 了本專案的 Repo
2. 在 Claude Code 中，提到你想要做的任務
3. Claude Code 會自動偵測並載入相關的 Skill

例如，你可以說：

> 幫我用 data-analysis/csv-analysis 這個 Skill 來分析這份 CSV 檔案

或者更口語一點：

> 我有一份銷售資料想做統計分析，幫我整理一下

AI 會根據 Skill 中的指引來執行任務。

### 在其他 AI 工具中使用

如果你使用的是其他 AI 工具（例如 ChatGPT、Cursor 等），可以：

1. 開啟對應 Skill 的 `SKILL.md` 檔案
2. 將內容複製貼上到 AI 工具的對話中
3. AI 會按照 Skill 中的指引來執行

---

## Skill 的基本結構

每個 Skill 的 `SKILL.md` 至少包含以下內容：

```markdown
---
name: skill 名稱
description: 這個 Skill 做什麼、什麼時候該用
---

# Skill 標題

[主要的指令和流程]

## When To Use
- 情境 1
- 情境 2

## Examples
- 範例請求 1
- 範例請求 2

## Guidelines
- 規則 1
- 規則 2
```

---

## 常見問題

**Q：Skills 和 Prompt 有什麼差異？**

Prompt 是一次性的指令；Skill 是經過整理、測試、可以重複使用的完整工作流程。一个好的 Skill 包含了觸發條件、操作步驟、輸出格式和注意事項，比單一個 Prompt 更完整、更穩定。

**Q：我可以自己建立新的 Skill 嗎？**

可以。只要在 `skills/` 目錄下建立一個新的資料夾，放入 `SKILL.md` 即可。建議遵循本文件中說明的結構，讓其他成員也能理解你的 Skill。

**Q：怎麼知道有哪些 Skill 可以用？**

查看 `skills/` 目錄下的分類，或參考 `skills/README.md` 中的完整列表。隨著 Skill 數量增加，我們會建立更完整的索引頁面。

**Q：Skill 的內容可以修改嗎？**

可以。Skill 是活的文件，會隨著團隊的需求不斷改善。如果你在使用過程中發現可以改進的地方，歡迎提交 PR 來更新。
