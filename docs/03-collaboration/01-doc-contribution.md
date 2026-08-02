# 文件貢獻流程

> 初學者友善 | 約 10 分鐘

## 你可能遇過這些問題

你在使用手冊的過程中，發現某個步驟寫得不清楚、某个指令已經過時了，或是覺得某個部分可以寫得更好。想更新卻不知道該怎麼開始。

這份手冊使用 Git 管理，所有的更新都走 PR 流程。因為你是實驗室組織的成員，可以直接在組織的 Repo 中建立分支進行修改，不需要 Fork。以下是參與貢獻的完整步驟。

## 完成後你會理解

- 如何在組織 Repo 中建立分支並修改
- 如何編輯 Markdown 檔案
- 如何提交 PR 進行變更

---

## 貢獻流程

### Step 1：Clone Repo 到本地

你已經是組織成員，可以直接 Clone 組織的 Repo：

```bash
git clone https://github.com/<組織帳號>/lab-guide.git
cd lab-guide
```

如果你是使用 HTTPS Clone，可能需要先設定 GitHub 的認證方式。建議使用 SSH 或 GitHub CLI（`gh auth login`）來簡化認證流程。

### Step 2：建立分支

遵循[分支命名規範](../02-github-workflow/02-naming-convention.md)，根據你的變更類型建立分支：

- 修改錯字或語句：`docs/fix-typo-in-chapter-1`
- 新增內容：`docs/add-troubleshooting-guide`
- 重寫段落：`docs/rewrite-github-workflow-section`

```bash
git checkout -b docs/你的分支名稱
```

### Step 3：編輯 Markdown 檔案

用你習慣的編輯器打開並修改 `.md` 檔案。以下是 Markdown 的基本語法速查：

| 語法 | 效果 |
|:-----|:-----|
| `# 標題` | 一級標題 |
| `## 標題` | 二級標題 |
| `**粗體**` | **粗體** |
| `*斜體*` | *斜體* |
| `- 項目` | 項目清單 |
| `1. 項目` | 編號清單 |
| `[文字](網址)` | 超連結 |
| `` `程式碼` `` | 行內程式碼 |
| ` ``` ` | 程式碼區塊 |

### Step 4：提交變更

```bash
git add .
git commit -m "docs: 更新說明文件的特定段落"
```

Commit 訊息建議格式：`<類型>: <簡述>`

### Step 5：推送並建立 PR

```bash
git push origin docs/你的分支名稱
```

推送完成後，GitHub 會自動顯示「Create Pull Request」的連結。點選後填寫清楚的變更說明，指派 Repo 負責人作為審查者。

### Step 6：等待審查

PR 建立後，會由 Repo 負責人或其他成員進行審查。通過後就會合併到 main branch。

---

## 使用 GitHub Desktop 操作

如果不熟悉 Git 指令，也可以用 GitHub Desktop 完成整個流程：

1. 點選 `File > Clone Repository`，選擇組織的 `lab-guide` Repo
2. 點選左上角 `Branch` > `New Branch`，輸入分支名稱
3. 開發完成後，填寫 Commit 說明，點選 `Commit to <你的分支>`
4. 點選 `Push origin` 推送
5. 點選 `Create Pull Request` 建立 PR

---

## Markdown 編輯建議

如果沒有安裝專門的 Markdown 編輯器，以下是幾個免費的選擇：

| 編輯器 | 平台 | 特色 |
|:-------|:-----|:-----|
| Visual Studio Code | macOS / Windows / Linux | 功能完整，支援即時預覽 |
| Typora | macOS / Windows | 所見即所得的編輯體驗 |
| Obsidian | macOS / Windows / Linux | 適合管理大量 Markdown 檔案 |

在 VS Code 中，按下 `Cmd + Shift + V`（macOS）或 `Ctrl + Shift + V`（Windows）可以預覽 Markdown 的渲染效果。

---

## 常見問題

**Q：我不確定我的修改是否正確，可以先問一下嗎？**

可以。先在實驗室的溝通群組中提出你的想法，確認方向後再動手修改。避免花了很多時間寫完，才發現方向不對。

**Q：可以同時修改多個檔案嗎？**

可以，只要這些修改都屬於同一個主題。如果修改涉及不相關的多個檔案，建議拆成不同的 PR。

**Q：main branch 有更新，我的分支落後了怎麼辦？**

在你的分支上合併最新的 main：

```bash
git checkout main
git pull origin main
git checkout docs/你的分支名稱
git merge main
```

如果有衝突，解決後重新推送。GitHub Desktop 上可以透過 `Branch > Update from main` 達成同樣效果。

**Q：我可以直接在 GitHub 網頁上編輯嗎？**

可以。在 Repo 頁面找到想修改的檔案，點選鉛筆圖示進行編輯，GitHub 會自動幫你建立分支並提交 PR。但這種方式只適合修改少量內容，複雜的變更建議在本地操作。
