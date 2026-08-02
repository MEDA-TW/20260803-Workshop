# AI 終端機工具安裝與設定

> 初學者友善 | 約 20 分鐘 | macOS / Windows

## 你可能遇過這些問題

聽說可以用 AI 幫忙寫程式、解 Bug、跑測試，但不知道該選哪一個工具、怎麼安裝。裝完之後也不知道該用哪個 API、怎麼設定。

這個文件會引導你安裝兩套主流的 AI 終端機工具：**Claude Code** 和 **Codex CLI**。兩者功能相似，但背後使用的模型不同，可以依照需求選擇。

## 完成後你會得到

- **Claude Code** — Anthropic 出品，可串接 Claude 模型或第三方服務商
- **Codex CLI** — OpenAI 出品，可串接 GPT 模型或本地端 Ollama
- **API 串接設定** — 官方 API 與第三方服務商的設定方式
- **快速啟動設定** — 用簡短指令一鍵啟動

---

## 前置條件

安裝之前，請確認你已經完成：

- [環境安裝指南](01-environment-setup.md) — Git 和 Node.js 已安裝完成
- 準備好一組 API Key（下方會說明如何取得）

---

## 工具比較

在開始安裝之前，先了解兩套工具的差異：

| 項目 | Claude Code | Codex CLI |
|:-----|:-----------|:----------|
| 開發者 | Anthropic | OpenAI |
| 預設模型 | Claude（Sonnet / Opus） | GPT（GPT-4o / GPT-4.1） |
| 第三方串接 | Kimi、GLM、MiniMax、通義千問、Ollama | Ollama |
| 安裝指令 | `npm install -g @anthropic-ai/claude-code` | `npm install -g @openai/codex` |
| 啟動指令 | `claude` | `codex` |
| 快速啟動 alias | `cc` | `cx` |

兩套工具可以同時安裝，不會互相衝突。可以根據專案需求切換使用。

---

## 工具一：Claude Code

### 安裝

**macOS：**

```bash
npm install -g @anthropic-ai/claude-code
```

安裝完成後確認：

```bash
claude --version
# 應顯示版本號碼，例如：1.0.x
```

**Windows PowerShell：**

```powershell
npm install -g @anthropic-ai/claude-code
```

**Windows CMD：**

```cmd
npm install -g @anthropic-ai/claude-code
```

安裝完成後，重新開啟終端機，執行 `claude --version` 確認。

> 如果顯示「無法辨識 'claude'」，請確認 Node.js 安裝正確，並重新開啟終端機。

### API 串接設定

Claude Code 支援多種 API 來源，以下依序說明。

#### 使用 Anthropic 官方 API

1. 前往 [console.anthropic.com](https://console.anthropic.com/)
2. 註冊帳號並登入
3. 點選左側選單的「API Keys」
4. 點選「Create Key」，為 Key 取一個名稱（例如 `lab-use`）
5. 複製產生的 Key（只會顯示一次）

設定環境變數：

**macOS：**

```bash
echo 'export ANTHROPIC_API_KEY="你的API Key"' >> ~/.zshrc
source ~/.zshrc
```

**Windows PowerShell：**

```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "你的API Key", "User")
```

**Windows CMD：**

```cmd
setx ANTHROPIC_API_KEY "你的API Key"
```

> 注意：`setx` 設定後需要重新開啟終端機才會生效。

驗證：

```bash
echo $ANTHROPIC_API_KEY
# 應顯示你設定的 API Key（部分遮蔽）
```

#### 使用第三方服務商 API

如果無法直接使用 Anthropic 官方 API，可以透過以下第三方服務商取得相容的 API 串接。設定方式是透過環境變數指定自訂的 API 位址和 Key。

通用設定方式：

```bash
# macOS
echo 'export ANTHROPIC_API_KEY="服務商的API Key"' >> ~/.zshrc
echo 'export ANTHROPIC_BASE_URL="服務商的API位址"' >> ~/.zshrc
source ~/.zshrc
```

```powershell
# Windows PowerShell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "服務商的API Key", "User")
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "服務商的API位址", "User")
```

各服務商的 API Key 取得方式：

**Kimi（中國版）：** 前往 [platform.moonshot.cn](https://platform.moonshot.cn/)
**Kimi（國際版）：** 前往 [platform.kimi.ai](https://platform.kimi.ai/)

**GLM（中國版）：** 前往 [open.bigmodel.cn](https://open.bigmodel.cn/)
**GLM（國際版）：** 前往 [z.ai](https://z.ai/model-api)

**MiniMax（中國版）：** 前往 [platform.minimaxi.com](https://platform.minimaxi.com/)
**MiniMax（國際版）：** 前往 [platform.minimax.io](https://platform.minimaxi.io/)

**Xiaomi MiMo：** 前往 [platform.xiaomimimo.com](https://platform.xiaomimimo.com/)

#### 使用 Ollama（本地端運行）

Ollama 可以在本地端運行開源模型，完全不需要付費，也不需要將資料傳送到外部伺服器。適合對資料隱私有要求的場景，或想要離線使用的情境。

安裝 Ollama：

**macOS：**

```bash
brew install ollama
```

或前往 [ollama.com](https://ollama.com/) 下載安裝程式。

**Windows：**

前往 [ollama.com](https://ollama.com/) 下載 Windows 版安裝程式，按照預設設定安裝。

下載模型：

```bash
ollama pull qwen2.5:7b        # 通義千問 7B
ollama pull glm4:9b            # GLM 4 9B
ollama pull codellama:7b       # Code Llama，專門用於程式碼生成
ollama pull deepseek-coder:7b  # DeepSeek Coder
```

啟動 Ollama 服務：

```bash
ollama serve
```

設定環境變數，讓 Claude Code 連接到本地的 Ollama：

```bash
# macOS
echo 'export ANTHROPIC_BASE_URL="http://localhost:11434/v1"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="ollama"' >> ~/.zshrc
source ~/.zshrc
```

> Ollama 本身不需要 API Key，但 Claude Code 要求此欄位不能為空，填入任意字串即可。

驗證 Ollama 是否正常運作：

```bash
curl http://localhost:11434/api/tags
# 應顯示你已下載的模型列表
```

### 快速啟動設定

設定 alias，以後打 `cc` 就能直接啟動 Claude Code。

**macOS：**

```bash
echo "alias cc='cd ~/你的專案路徑 && CLAUDE_CODE_NO_FLICKER=1 claude'" >> ~/.zshrc
source ~/.zshrc
```

將 `~/你的專案路徑` 替換成你實際的專案目錄（例如 `~/meda/lab-guide`）。如果不想綁定特定目錄，改用：

```bash
echo "alias cc='CLAUDE_CODE_NO_FLICKER=1 claude'" >> ~/.zshrc
source ~/.zshrc
```

驗證：

```bash
type cc
# 應顯示：cc is an alias for ...
```

**Windows PowerShell：**

PowerShell 不支援 alias 語法，改用 function。先確認 Profile 存在：

```powershell
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
```

加入 function（綁定專案目錄）：

```powershell
Add-Content $PROFILE "`nfunction cc { Set-Location 'C:\你的專案路徑'; `$env:CLAUDE_CODE_NO_FLICKER = '1'; claude @args }"
```

或不綁定目錄：

```powershell
Add-Content $PROFILE "`nfunction cc { `$env:CLAUDE_CODE_NO_FLICKER = '1'; claude @args }"
```

重新載入 Profile：

```powershell
. $PROFILE
```

**Windows CMD：**

CMD 不支援 alias 或 function。建議改用 PowerShell 來設定快速啟動，或直接輸入 `claude` 啟動。

### 為什麼要用 NO_FLICKER 模式？

`CLAUDE_CODE_NO_FLICKER=1` 會啟用 Claude Code 的改良渲染模式：

| 功能 | 預設模式 | NO_FLICKER 模式 |
|:-----|:---------|:----------------|
| 畫面閃爍 | 每次輸出都會重繪 | 差分渲染，穩定流暢 |
| 滾輪回看 | 不支援 | 可以自由滾動 |
| 滑鼠操作 | 不支援 | 支援選取、點擊 |
| 輸入框位置 | 隨輸出移動 | 固定在底部 |

建議在 alias 中加上這個環境變數，讓每次啟動都使用改良模式。

---

## 工具二：Codex CLI

### 安裝

**macOS / Windows：**

```bash
npm install -g @openai/codex
```

安裝完成後確認：

```bash
codex --version
```

### API 串接設定

Codex CLI 預設使用 OpenAI 的 API。以下說明如何設定。

#### 使用 OpenAI 官方 API

1. 前往 [platform.openai.com](https://platform.openai.com/)
2. 註冊帳號並登入
3. 在「API Keys」頁面建立新的 Key
4. 複製產生的 Key

設定環境變數：

**macOS：**

```bash
echo 'export OPENAI_API_KEY="你的OpenAI API Key"' >> ~/.zshrc
source ~/.zshrc
```

**Windows PowerShell：**

```powershell
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "你的OpenAI API Key", "User")
```

**Windows CMD：**

```cmd
setx OPENAI_API_KEY "你的OpenAI API Key"
```

#### 使用 Ollama（本地端運行）

Codex CLI 同樣可以串接本地端的 Ollama，完全免費。

安裝和下載模型的步驟同上方 Claude Code 的 Ollama 設定。

設定環境變數，讓 Codex CLI 連接到本地的 Ollama：

```bash
# macOS
echo 'export OPENAI_API_KEY="ollama"' >> ~/.zshrc
echo 'export OPENAI_BASE_URL="http://localhost:11434/v1"' >> ~/.zshrc
source ~/.zshrc
```

```powershell
# Windows PowerShell
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "ollama", "User")
[System.Environment]::SetEnvironmentVariable("OPENAI_BASE_URL", "http://localhost:11434/v1", "User")
```

> Ollama 本身不需要 API Key，但 Codex CLI 要求此欄位不能為空，填入任意字串即可。

### 快速啟動設定

**macOS：**

```bash
echo "alias cx='cd ~/你的專案路徑 && codex'" >> ~/.zshrc
source ~/.zshrc
```

**Windows PowerShell：**

```powershell
Add-Content $PROFILE "`nfunction cx { Set-Location 'C:\你的專案路徑'; codex @args }"
. $PROFILE
```

---

## 驗證安裝

1. 開啟終端機，輸入 `cc`（Claude Code）或 `cx`（Codex CLI）
2. 工具啟動後，會根據你的 API 設定進行連線
3. 輸入一句簡單的問題（例如「你好」），確認 AI 有正常回應
4. 看到回應就代表安裝成功

---

## 常見問題

**Q：安裝時顯示 `EACCES` 錯誤怎麼辦？**

這是 npm 權限問題。在 macOS 上執行：

```bash
sudo npm install -g @anthropic-ai/claude-code
```

或更根本的解法是修改 npm 的預設目錄：

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

然後重新安裝，不加 `sudo`。

**Q：Windows 上 alias 指令沒反應？**

確認 PowerShell Profile 有正確載入。執行 `. $PROFILE` 後再試一次。如果還是不行，確認你是在 PowerShell 而不是 CMD 中操作。

**Q：可以同時安裝 Claude Code 和 Codex CLI 嗎？**

可以。兩套工具使用不同的指令（`claude` 和 `codex`）和不同的環境變數（`ANTHROPIC_*` 和 `OPENAI_*`），互不衝突。

**Q：第三方服務商的 API 跟官方的有什麼差異？**

主要差異在於背後運行的模型不同。Claude Code 的官方 API 使用 Claude 模型；第三方服務商提供的是其他模型的相容端點。Codex CLI 同理，官方使用 GPT 模型，Ollama 使用本地端的開源模型。選擇時建議先試用免費額度，確認符合需求後再決定。

**Q：Ollama 跑起來很慢怎麼辦？**

本地端模型的執行速度取決於電腦的硬體規格。如果有獨立顯示卡（GPU），速度會快很多。CPU 模式下，小型模型（7B）通常還能接受，但大型模型（13B 以上）會明顯變慢。建議從小模型開始嘗試。

**Q：API Key 設定了但工具還是無法連線？**

確認環境變數有正確載入。在終端機中執行 `echo $ANTHROPIC_API_KEY` 或 `echo $OPENAI_API_KEY` 確認值是否存在。如果為空，執行 `source ~/.zshrc`（macOS）或重新開啟終端機（Windows）後再試。
