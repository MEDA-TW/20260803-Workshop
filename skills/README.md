# Skills

Skills 是一組可重複使用的指令、流程、腳本與參考資源，讓 AI agent 能在特定任務上表現更穩定、更一致，也更貼近團隊的實際工作方式。

這個專案是 MEDA Lab 用來建立與維護共用的 skills。我們希望把團隊常見的工作流程整理成可組合、可擴充、可版本化的 skill，讓不同成員、不同 agent、不同專案都能共用同一套最佳實踐。

常見用途包含：

- 數據分析與資料整理
- 研究方法與研究流程支援
- 檔案轉換與文件處理
- PPT 製作與簡報內容生成
- 產品與專案文件撰寫
- 研究流程與資料整理
- UI / UX 與前端工作流
- 專案開發、除錯與 code review 輔助

更多背景可參考：

- [What are skills?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [How to create custom skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)

# About This Repository

這個 repository 是 MEDA Lab 的共用技能庫，目標是把實驗室內常用的知識與流程模組化，降低重複溝通與重複操作成本。

每個 skill 應該是獨立、自描述、可被 agent 動態載入的單位，通常會包含：

- `SKILL.md`：skill 的主要說明與指令
- `README.md`：補充說明、範例或維護筆記
- `scripts/`：需要執行的腳本
- `references/`：參考文件、模板或規格
- `assets/`：圖片、範本、靜態資源

我們希望這個 repo 不只是存放 prompt，而是作為 MEDA Lab 的可執行工作方法庫。

## Disclaimer

這些 skills 是提供給 MEDA Lab 內部與協作場景使用的共享資源。不同 agent、平台或模型版本對同一個 skill 的實際表現可能不同，因此在正式工作流中使用前，仍建議先驗證輸出品質與適用性。

# 推薦 Skills

已驗證的外部 skill 列表，可直接引用或安裝：[推薦 Skills](recommended.md)

# Skill Sets

本 repo 預期可逐步擴充為以下幾類 skill：

- `data-analysis/`：數據清理、統計分析、資料整理、圖表與分析流程
- `research-methods/`：研究設計、研究方法建議、實驗規劃、文獻分析與研究寫作支援
- `file-conversion/`：PDF、Word、Excel、圖片、表格等格式轉換與文件處理
- `presentation/`：PPT 大綱產生、簡報內容整理、投影片文案與視覺結構建議
- `research/`：研究助理、文獻整理、資料彙整、摘要與分析流程
- `design/`：UI / UX、前端設計協作、視覺規範與內容生成
- `engineering/`：開發流程、除錯、重構、測試、code review

隨著 skill 數量增加，也可以再補上對應的索引文件或技能總表。

# Try in Claude Code, OpenAI Codex, and Other Agents

這個 repo 的 skills 可以作為團隊共用知識庫，搭配不同 agent 環境使用。

如果你的 agent 支援 skills / plugin / marketplace 類型的機制，可以把這個 repo 作為共享 skill 來源，讓成員在本機或專案中安裝、引用與維護。

常見使用方式：

1. clone 此 repository
2. 將技能目錄接入你的 agent 執行環境
3. 在任務中明確提及 skill 名稱或符合其觸發條件的需求
4. 讓 agent 載入對應的 `SKILL.md` 執行

若使用的平台支援自訂 skill、system prompt module、tool bundle 或工作流模板，也可以把本 repo 的 skill 結構作為基礎，移植到對應平台使用。

核心原則不變：

- 一個 skill 解決一類明確問題
- skill 內容需可讀、可維護、可版本控制
- skill 應包含觸發描述、操作指引與必要資源

# Repository Structure

目前此 repo 還在初始化階段，建議採用以下結構：

```text
skills/
├── README.md
├── .gitignore
├── data-analysis/
├── research-methods/
├── file-conversion/
├── presentation/
├── research/
│   └── example-skill/
│       ├── SKILL.md
│       ├── README.md
│       ├── scripts/
│       └── references/
├── teaching/
├── productivity/
├── design/
├── engineering/
└── lab-ops/
```

如果 skill 數量還不多，也可以先直接採用：

```text
skills/
├── README.md
├── skill-a/
│   └── SKILL.md
├── skill-b/
│   ├── SKILL.md
│   └── references/
└── skill-c/
    ├── SKILL.md
    └── scripts/
```

# Creating a Basic Skill

建立一個基本 skill 很簡單：建立一個資料夾，並放入 `SKILL.md`。

你可以從下面的模板開始：

```markdown
---
name: meda-example-skill
description: 協助 MEDA Lab 成員完成特定任務的 skill，描述用途、適用情境與觸發條件。
---

# MEDA Example Skill

[在這裡放入 skill 的主要指令]

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

`SKILL.md` 至少應包含：

- `name`：skill 的唯一識別名稱
- `description`：完整描述 skill 的用途、何時該使用

Markdown 內文則用來放：

- 工作流程
- 操作規則
- 範例請求
- 回應格式
- 注意事項

# Contributing

如果你要新增或維護 MEDA Lab skill，建議遵循以下原則：

1. 一個 skill 專注解決一類清楚的問題。
2. 優先整理可重複使用的流程，不要只寫一次性的 prompt。
3. 把依賴的模板、腳本與參考資料一起放進 skill 目錄。
4. 讓說明足夠清楚，使其他成員不需要口頭交接也能使用。
5. skill 更新時，盡量同步補上範例與限制條件。

# Roadmap

接下來可以逐步補上：

- 第一批 MEDA Lab 常用 skills
- 技能索引與分類頁
- skills 命名規範
- skills 測試與驗證流程
- 與 Claude Code / 其他 agent 平台的整合說明

# License

此專案的授權方式可依 MEDA Lab 的共享策略另行補充。
