# 環境安裝指南

> 初學者友善 | 約 15 分鐘 | macOS / Windows

## 你可能遇過這些問題

拿到專案 Repo 後，想在自己的電腦上跑起來，卻發現需要先裝一堆東西：Git、Node.js、終端機工具......每一個都不知道從哪裡開始安裝，裝完也不知道有沒有成功。

這個文件會引導你完成所有必要的基礎工具安裝。按照步驟走，裝完就能正常開始開發。

## 完成後你會得到

- **Git** — 版本控制工具，用來管理程式碼的變更紀錄
- **Node.js** — JavaScript 執行環境，許多專案都需要它
- **npm** — Node.js 的套件管理工具，用來安裝專案依賴
- **終端機基本操作** — 知道怎麼打開終端機、切換目錄、執行指令

---

## macOS 安裝步驟

### Step 1：安裝 Homebrew

Homebrew 是 macOS 上最常用的套件管理工具，可以一行指令安裝各種軟體。

打開「終端機」（Spotlight 搜尋 `Terminal`），貼上以下指令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安裝過程中會要求輸入電腦密碼（輸入時不會顯示字元，這是正常的），按下 Enter 繼續。

安裝完成後，將 Homebrew 加入 PATH：

```bash
echo >> ~/.zshrc
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

驗證安裝：

```bash
brew --version
# 應顯示：Homebrew 4.x.x
```

### Step 2：安裝 Git

```bash
brew install git
```

驗證安裝：

```bash
git --version
# 應顯示：git version 2.x.x
```

### Step 3：安裝 Node.js

```bash
brew install node
```

驗證安裝：

```bash
node --version
# 應顯示：v20.x.x 或更新版本

npm --version
# 應顯示：10.x.x 或更新版本
```

### Step 4：設定 Git 使用者資訊

將 `<你的名字>` 和 `<你的信箱>` 替換成你自己的資訊（需要與 GitHub 帳號一致）：

```bash
git config --global user.name "<你的名字>"
git config --global user.email "<你的信箱>"
```

驗證設定：

```bash
git config --global --list
# 應顯示你剛剛設定的 name 和 email
```

### macOS 安裝完成

以上步驟完成後，你的 macOS 開發環境就準備好了。接下來前往 [GitHub Desktop 安裝](02-github-desktop.md)。

---

## Windows 安裝步驟

> 注意：Windows 安裝方式因終端機不同而有差異。以下分別說明在 **PowerShell** 和 **CMD** 環境下的操作方式。

### 判斷你使用的終端機

打開終端機的方式：

- **PowerShell**：在開始功能表搜尋 `PowerShell`，或按 `Win + X` 選擇「Windows PowerShell」
- **CMD**：在開始功能表搜尋 `cmd`，或按 `Win + R` 輸入 `cmd`

視窗標題會顯示目前使用的是哪一個。以下步驟以 PowerShell 為主，CMD 的差異會另外標註。

### Step 1：安裝 Git

**PowerShell 環境：**

前往 [Git 官方網站](https://git-scm.com/download/win) 下載安裝程式，執行後按照預設設定一直按「Next」即可。

安裝完成後，重新開啟 PowerShell，驗證安裝：

```powershell
git --version
# 應顯示：git version 2.x.x
```

**CMD 環境：**

步驟相同，但驗證指令為：

```cmd
git --version
```

### Step 2：安裝 Node.js

前往 [Node.js 官方網站](https://nodejs.org/)，下載 LTS 版本的安裝程式（Windows Installer），按照預設設定安裝。

安裝完成後，重新開啟終端機，驗證安裝：

```powershell
node --version
# 應顯示：v20.x.x 或更新版本

npm --version
# 應顯示：10.x.x 或更新版本
```

### Step 3：設定 Git 使用者資訊

PowerShell：

```powershell
git config --global user.name "<你的名字>"
git config --global user.email "<你的信箱>"
```

CMD：

```cmd
git config --global user.name "<你的名字>"
git config --global user.email "<你的信箱>"
```

將 `<你的名字>` 和 `<你的信箱>` 替換成你自己的資訊（需要與 GitHub 帳號一致）。

驗證設定：

```powershell
git config --global --list
```

### Windows 安裝完成

以上步驟完成後，你的 Windows 開發環境就準備好了。接下來前往 [GitHub Desktop 安裝](02-github-desktop.md)。

---

## 常見問題

**Q：Homebrew 安裝失敗怎麼辦？**

可能是因為 macOS 安裝了 Xcode Command Line Tools 但版本太舊。執行以下指令後重試：

```bash
xcode-select --install
```

**Q：Git 或 Node.js 安裝後，終端機顯示「找不到指令」？**

通常是因為 PATH 沒有更新。關閉終端機重新打開，或執行 `source ~/.zshrc`（macOS）後再試一次。

**Q：Windows 上 PowerShell 和 CMD 有什麼差異？**

兩者都能完成安裝，差異在於：

| 項目 | PowerShell | CMD |
|:-----|:-----------|:----|
| 指令語法 | 支援 Linux 風格指令 | 僅支援 Windows 原生指令 |
| Script 執行 | 預設禁止執行腳本，需先設定執行原則 | 無此限制 |
| 建議 | 多數開發教學都以 PowerShell 為主 | 簡單操作可用，複雜場景建議改用 PowerShell |

**Q：macOS 版本太舊怎麼辦？**

建議至少使用 macOS 12 (Monterey) 或更新版本。過舊的系統可能導致套件版本不相容。
