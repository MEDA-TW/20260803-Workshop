# GitHub Desktop 安裝與設定

> 初學者友善 | 約 5 分鐘 | macOS / Windows

## 你可能遇過這些問題

Git 指令對新手來說不太友善，光是 `git add`、`git commit`、`git push` 這幾個指令就容易搞混。如果只是想參與專案開發，不一定要從指令學起。

GitHub Desktop 是 GitHub 官方推出的圖形化工具，用滑鼠就能完成大部分的 Git 操作。不用背指令，也不用擔心打錯字。

## 完成後你會得到

- **視覺化操作介面** — 用按鈕和選單代替指令，一目瞭然
- **一鍵 Clone Repo** — 從 GitHub 上直接下載專案到本地
- **分支管理** — 建立、切換、合併分支都能用介面完成
- **PR 管理** — 直接在桌面端建立 Pull Request

---

## 安裝步驟

### macOS

前往 [GitHub Desktop 官方網站](https://desktop.github.com/)，點選「Download for macOS」。

下載完成後，將 `GitHub Desktop.app` 拖入「應用程式」資料夾。首次開啟時，macOS 可能會跳出安全性警告，前往「系統設定 > 隱私與安全性」允許開啟即可。

### Windows

前往 [GitHub Desktop 官方網站](https://desktop.github.com/)，點選「Download for Windows」。

下載完成後執行安裝程式，按照預設設定安裝即可。

---

## 初次設定

開啟 GitHub Desktop 後，按照畫面指示完成以下設定：

### Step 1：登入 GitHub 帳號

點選「Sign in to GitHub.com」，瀏覽器會跳轉到 GitHub 登入頁面。輸入你的帳號密碼完成授權。

確認顯示的帳號是你的 GitHub 帳號，然後點選「Continue to GitHub Desktop」。

### Step 2：設定 Git 使用者名稱和 Email

在「Configure Git」頁面，確認以下資訊：

- **Name**：你的顯示名稱（建議與 GitHub 上的一致）
- **Email**：你的 GitHub 登入 Email

選擇「Use the Git credential that GitHub Desktop manages」。完成後點「Finish」。

### Step 3：設定預設編輯器

在選單列選擇 `GitHub Desktop > Settings`（macOS）或 `File > Options`（Windows）。

在「Integrations」分頁中，可以設定你習慣的編輯器。如果不確定，保持預設即可，之後可以再改。

---

## 驗證設定

### 新增你的第一個 Repo

1. 點選左上角 `File > Clone Repository`（或 `Ctrl + O`）
2. 在「GitHub.com」分頁中，搜尋你被授權的實驗室 Repo
3. 選擇 Repo 後，確認本地儲存路徑，點選「Clone」

成功 Clone 下來後，代表 GitHub Desktop 設定完成。

### 常見操作對照

以下是 GitHub Desktop 與 Git 指令的對應關係，方便你了解介面上的按鈕做了什麼：

| 操作 | GitHub Desktop | Git 指令 |
|:-----|:--------------|:---------|
| 下載專案 | Clone Repository | `git clone` |
| 切換分支 | Branch 選單 > 選擇分支 | `git checkout <branch>` |
| 建立分支 | Branch > New Branch | `git branch <branch>` |
| 暫存變更 | 勾選檔案 > 填寫說明 > Commit | `git add` + `git commit` |
| 上傳變更 | Push origin | `git push` |
| 拉取更新 | Pull origin | `git pull` |
| 建立 PR | Branch > Create Pull Request | `gh pr create` |

---

## 常見問題

**Q：為什麼需要登入 GitHub 帳號？**

GitHub Desktop 需要透過你的帳號來存取 Repo。登入後，它會自動幫你管理 Git 的認證憑證，不用每次推送都輸入密碼。

**Q：我已經會用 Git 指令了，還需要裝 GitHub Desktop 嗎？**

不一定。如果你習慣用終端機操作，可以跳過這個步驟。GitHub Desktop 主要是降低門檻，讓不熟指令的人也能順利操作。

**Q：macOS 開不了 GitHub Desktop 怎麼辦？**

右鍵點選 `GitHub Desktop.app` > 「打開」。macOS 預設會阻止未在 App Store 下載的應用程式，這樣操作一次後就不會再擋了。
