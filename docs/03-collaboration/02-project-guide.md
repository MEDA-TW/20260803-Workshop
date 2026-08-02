# CLAUDE.md 與 AGENTS.md 使用指南

> 初學者友善 | 約 10 分鐘

## 你可能遇過這些問題

你 Clone 了專案的 Repo，用 AI 工具開始工作，但發現 AI 不太瞭解這個專案的背景、coding style、或是常用的工具和框架。每次都要重新說明一遍，很浪費時間。

這是因為 AI 工具需要一個「專案說明文件」來瞭解專案的規則和慣例。在協作專案中，我們使用以下文件來管理這些資訊：

## 完成後你會理解

- `CLAUDE.md` 和 `AGENTS.md` 的用途與差異
- 共用文件 vs 個人級設定的管理方式
- 如何正確使用 `.local.md` 檔案

---

## 文件對應關係

`CLAUDE.md` 和 `AGENTS.md` 本質上是同一個東西：專案共用的規則文件。差異只在於它們服務的 AI 工具不同。

| 文件 | 對應工具 | 是否上傳到 Repo |
|:-----|:---------|:----------------|
| `CLAUDE.md` | Claude Code | 是 |
| `AGENTS.md` | Codex 及其他 AI 工具 | 是 |
| `CLAUDE.local.md` | Claude Code（個人偏好） | 否（加入 .gitignore） |
| `AGENTS.local.md` | Codex 及其他 AI 工具（個人偏好） | 否（加入 .gitignore） |

兩個文件的內容結構完全相同，都是描述專案的技術規範和工作慣例。建議兩個文件維持一致的內容，這樣不論使用哪個 AI 工具，都能讀到相同的專案規則。

本資料夾中提供了範本：[CLAUDE.md](CLAUDE.md) 和 [AGENTS.md](AGENTS.md)，你可以直接複製到你的專案根目錄中使用。

---

## 文件內容

不論是 `CLAUDE.md` 還是 `AGENTS.md`，裡面放的都是同一類型的內容：

- 專案的技術架構（使用什麼語言、框架、工具）
- Coding style 和命名規範
- 測試規範（怎麼跑測試、測試覆蓋率要求）
- 常用指令（build、lint、dev server 的指令）
- 架構決策（為什麼選用某個方案）
- AI 的行為準則（什麼可以自動執行、什麼需要先確認）
- 專案特有的工作流程

範例：

```markdown
# Project Rules

## Tech Stack
- Language: TypeScript
- Framework: Next.js 14
- Package Manager: pnpm
- Testing: Vitest

## Coding Style
- 使用 2 空格縮排
- 檔案命名使用 kebab-case
- 元件命名使用 PascalCase

## Commands
- `pnpm dev` — 啟動開發伺服器
- `pnpm build` — 建構生產版本
- `pnpm test` — 執行測試
- `pnpm lint` — 執行 lint 檢查

## Git Rules
- Branch 命名遵循 feat/fix/docs 格式
- Commit message 使用 Conventional Commits
- PR 至少需要一位審查者批准

## AI Guidelines
- 修改 `main` 分支前必須先建立分支
- 不要直接修改 `package.json` 的版本號
- 涉及資料庫 schema 變更時，先與負責人確認
```

---

## 個人級設定：.local.md 檔案

每個開發者可能有自己的偏好和習慣。這些內容不應該放在專案的共用文件中，而是寫在自己的 `.local.md` 檔案裡。

`.local.md` 的內容結構和共用文件完全相同，只是用來存放你個人的偏好。AI 在讀取時，會先讀取共用文件，再讀取 `.local.md`，後者的設定會覆蓋前者。

適合放的內容：

- 你個人的 AI 回應偏好（例如「回答簡短一點」、「多給我一些解釋」）
- 你常用的開發工具和快捷鍵
- 你負責的模組或功能
- 你可以自動執行的操作、需要先確認的操作、絕對不能做的事情

範例：

```markdown
# Personal Preferences

## Response Style
- 回答盡量簡潔，除非我要求詳細解釋
- 給指令時直接給可執行的指令碼，不需要額外說明

## My Modules
- 我主要負責 `src/components/` 下的 UI 元件
- 我常用的指令是 `pnpm dev` 和 `pnpm test`

## Auto Actions
- Lint 錯誤可以自動修正
- 簡單的 typo 可以直接改，不用問我

## Ask First
- 任何涉及 database migration 的操作
- 修改 `package.json` 的 dependencies
- 刪除任何檔案
```

---

## .gitignore 設定

`.local.md` 檔案是個人化的設定，不應該上傳到 Repo。本專案的 `.gitignore` 已經包含了以下規則：

```
AGENTS.local.md
CLAUDE.local.md
```

如果你的 `.gitignore` 中沒有這些規則，請手動加入：

```bash
echo "AGENTS.local.md" >> .gitignore
echo "CLAUDE.local.md" >> .gitignore
```

---

## 常見問題

**Q：我第一次 Clone 專案，沒有 `.local.md` 檔案怎麼辦？**

不需要擔心。`.local.md` 是選用的，沒有這個檔案不影響任何功能。你可以等到有個人偏好的時候再建立。

**Q：`CLAUDE.md` 和 `AGENTS.md` 要維持一樣的內容嗎？**

建議維持一致。兩者本質上是同一個文件，只是服務的工具不同。如果內容不一樣，使用不同 AI 工具的成員可能會看到不同的專案規則，造成混淆。

**Q：`.local.md` 的設定會覆蓋共用文件嗎？**

是的。AI 會先讀取共用文件（`CLAUDE.md` 或 `AGENTS.md`），再讀取 `.local.md`。如果兩者有衝突，`.local.md` 的設定會生效。所以你可以用 `.local.md` 來覆蓋專案的預設行為。

**Q：我只用 Claude Code，需要建立 `AGENTS.md` 嗎？**

建議建立。即使你现在只用 Claude Code，未來可能會有成員使用 Cursor 或其他工具。維持兩個文件的一致性，可以確保所有人的開發環境都有相同的專案規則。

**Q：我可以把 `.local.md` 的內容分享給其他人嗎？**

可以，但不建議直接共享檔案。因為 `.local.md` 是個人偏好的集合，每個人的需求不同。你可以把其中有用的片段複製到自己的 `.local.md` 中。
