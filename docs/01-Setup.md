# Docker 環境建置說明（課前自學）

> 建議在上課前完成本文件的操作，讓你第一天上課就能直接進入 Vibe Coding 實作。

---

## 為什麼工作坊要用 Docker？

Docker 讓我們能把整個工作環境（Python 套件、Node.js 工具鏈、Jupyter Notebook、資料庫等）打包成一個「容器」，好處是：

- **環境一致**：老師、你和同學執行的是同一份環境，不再出現「在我電腦上可以跑」這種問題。
- **裝一次就好**：裝好 Docker 之後，所有工具都用容器啟動，不必逐一套件安裝。
- **清掉不留垃圾**：練習結束後可以一個指令刪乾淨，不會弄髒本機環境。

---

## 1. 安裝 Docker Desktop

Docker Desktop 同時提供 Docker Engine 與圖形介面，是最方便的入門選擇。

### macOS

1. 前往 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) 下載 `.dmg`。
2. 雙擊下載檔，把 **Docker.app** 拖入 `應用程式` 資料夾。
3. 開啟 Docker.app，第一次啟動會要求輸入管理者密碼以安裝輔助元件。
4. 看到工具列出現 Docker 鯨魚圖示後，打開終端機執行：

   ```bash
   docker --version
   docker compose version
   ```

   兩個指令都能印出版本號就代表安裝成功。

> **Apple Silicon (M1/M2/M3) 使用者**：請下載 **Apple Silicon** 版本（檔名含 `arm64`），執行效率最好。

### Windows

1. 確認 Windows 為 **64-bit** 且版本 ≥ Windows 10 (建議 Windows 11)。
2. 前往 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) 下載安裝檔。
3. 安裝過程會提示啟用 **WSL 2** 與 **Hyper-V**，照指示完成並重新開機。
4. 重新開機後啟動 Docker Desktop，等待右下角鯨魚圖示變成穩定狀態。
5. 打開 PowerShell 執行：

   ```powershell
   docker --version
   docker compose version
   ```

   兩個指令都能印出版本號就代表安裝成功。

> 如果跳出「需要 Hyper-V / WSL 2」的錯誤訊息，請依 Docker Desktop 視窗內的指引完成設定後再繼續。

---

## 2. 第一個測試：跑 hello-world

打開終端機（macOS）或 PowerShell（Windows），執行：

```bash
docker run --rm hello-world
```

成功的話會看到一段歡迎訊息，裡面提到「This message shows that your installation appears to be working correctly.」

> 如果出現權限錯誤，請確認 Docker Desktop 已經啟動（鯨魚圖示穩定），再重試一次。

---

## 3. 工作坊常用指令速查

| 指令 | 用途 |
|:-----|:-----|
| `docker ps` | 列出目前正在跑的容器 |
| `docker ps -a` | 列出全部容器（包含已停止） |
| `docker images` | 列出本機下載過的映像檔 |
| `docker compose up -d` | 啟動 `docker-compose.yml` 定義的服務（背景執行） |
| `docker compose down` | 停止並移除由 compose 啟動的容器 |
| `docker exec -it <容器> bash` | 進入容器互動 shell（常見於除錯） |

> 上課時老師會在終端機帶大家一起操作，建議先在課前把 hello-world 跑過一次，熟悉指令手感。

---

## 4. 常見問題

**Q：Docker Desktop 啟動後佔用很多資源怎麼辦？**
A：開啟 Docker Desktop → Settings → Resources，可以調整 CPU、記憶體與磁碟上限。建議最少保留 4 GB 記憶體給 Docker。

**Q：跑容器時出現「port is already allocated」？**
A：代表本機的某個連接埠已被佔用。可以換一個埠（`-p 8889:8888`），或先關掉佔用該埠的程式。

**Q：忘記指令怎麼辦？**
A：每個指令加上 `--help` 就能看到說明，例如 `docker run --help`。

---

## 5. 上課前確認清單

- [ ] Docker Desktop 已安裝並啟動
- [ ] `docker --version` 與 `docker compose version` 都能印出版本
- [ ] `docker run --rm hello-world` 看到歡迎訊息
- [ ] VS Code、Node.js、Python 已安裝（見根目錄 [README](../README.md) 的「課前準備」）
- [ ] GitHub Desktop 已安裝並登入 GitHub 帳號

完成以上步驟後，你就準備好進入 Vibe Coding 工作坊了！