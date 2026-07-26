# Day 03 講師用｜安裝與健康檢查指引

本指引服務「第一次接觸本機 AI 與文本資料管線」的學員。課前先把第 1、2 節完成；課堂 09:00–09:30 只做第 3 節的健康檢查與排錯。Day 03 不使用雲端 API。

## 講師課前準備

1. 在自己的電腦完整跑過本頁的健康檢查，確認教室網路可下載兩個模型。
2. 將 [fallback-package](fallback-package/README.md) 保留為講師專用；只有課程 README 定義的啟用條件成立才發放。
3. 確認學生使用的 Codex 已可啟用講師提供的 MarkItDown MCP。不同 Codex 客戶端的 MCP 設定介面可能不同，請以教室已驗證的連線設定為準；不要讓學生自行搜尋或安裝不明 MCP server。
4. 準備一個無敏感資料的公開 HTML、PDF 或 DOCX 範例，供學生做 `file:` URI 解析測試。

## 1. 課前安裝（學生）

### 1.1 Python 與虛擬環境

在 Terminal（macOS）或 PowerShell（Windows）執行：

```bash
python3 --version
```

需要 Python 3.10 以上。進入自己的 `my-project/` 後建立虛擬環境：

```bash
python3 -m venv .venv
```

macOS：

```bash
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install streamlit ollama
```

Windows PowerShell：

```powershell
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install streamlit ollama
```

若 `python3` 找不到，先安裝 Python 後再回到這一步；不要混用不同 Python 的 `pip`。

### 1.2 安裝 Ollama 與模型

從 [Ollama 下載頁](https://ollama.com/download) 安裝 Ollama。macOS 請將 App 放在 `Applications`，開啟一次並允許建立命令列連結。接著執行：

```bash
ollama pull qwen2.5:3b
ollama pull nomic-embed-text-v2-moe
ollama list
```

`qwen2.5:3b` 是回答模型；`nomic-embed-text-v2-moe` 只用來建立檢索向量，不拿來生成回答。下載失敗時先確認網路與磁碟空間，再向講師回報錯誤文字；不要自行改用其他模型。

### 1.3 啟用 MarkItDown MCP

先在 Terminal 執行：

```bash
codex mcp list
```

看到 `markitdown` 且狀態為 `enabled`，才可進行下一步。若沒有 `markitdown` 或狀態不是 `enabled`，才執行講師已驗證的設定：

```bash
codex mcp add markitdown -- uvx --from markitdown-mcp markitdown-mcp
```

新增後完全結束並重新開啟 Codex，建立新的 task，再重跑 `codex mcp list`。不要重複新增同名 server；若新 task 仍無法呼叫 MarkItDown 工具，保留錯誤文字交給講師，不要自行搜尋或安裝其他 MCP server。

只允許轉換學生自己已下載的本機檔案；MarkItDown 不是爬蟲，也不應取得登入後或白名單外網址。

## 2. 開課前請學生帶來的資訊

學生只需帶自己的電腦、可用網路與足夠磁碟空間。不要預先蒐集網站資料，也不要建立爬蟲；資料範圍會在課堂共同確認。

## 3. 課堂 09:00–09:30 健康檢查

依序完成；任一項失敗就停在該項並截取錯誤文字給講師。

1. `python3 --version` 與 `python -c "import streamlit, ollama; print('python-ok')"` 都成功。
2. `ollama list` 同時出現 `qwen2.5:3b` 與 `nomic-embed-text-v2-moe`。
3. `codex mcp list` 顯示 `markitdown` 為 `enabled`；在新的 Codex task 對講師提供的公開範例檔使用本機 `file:` URI 呼叫 MarkItDown MCP，回報工具名稱、輸入 URI 與成功輸出的前十行。
4. 建立 `my-project/` 與 `data/manifests/crawl_scope.json`，但此時尚未開始爬取。

## 4. 快速排錯

| 現象 | 先做什麼 | 何時停止並找講師 |
| --- | --- | --- |
| `ollama: command not found` | 重新開啟 Terminal；確認 Ollama App 已啟動 | 仍找不到命令列工具 |
| `ollama pull` 失敗 | 記下完整錯誤，檢查網路與磁碟空間 | 重試一次仍失敗 |
| Python 匯入失敗 | 確認已啟用 `.venv`，再執行 `python -m pip install streamlit ollama` | 仍出現相同錯誤 |
| `codex mcp list` 沒有 `markitdown` 或不是 `enabled` | 依第 1.3 節新增一次，重開 Codex 並建立新 task | 仍未顯示或無法呼叫工具 |
| Codex 找不到 MarkItDown 工具 | 不改裝其他 server；保留錯誤文字 | 請講師檢查教室提供的 MCP 設定與 task 工具注入狀態 |
| 本機模型服務無法啟動 | 保留錯誤；可繼續完成 scope、raw、manifest、Markdown 與品質檢查 | RAG 介面必須顯示修復指引，不得假裝生成答案 |

## 5. 講師完成判準

學生的健康檢查只有「可用」「需協助」兩種狀態，不計分。未能在 30 分鐘內啟動模型者，仍依正常流程完成資料管線；備援資料的啟用條件與模型安裝失敗不同，請見 [fallback-package](fallback-package/README.md)。

## 參考來源

- [Ollama macOS 文件](https://docs.ollama.com/macos)：安裝位置、CLI 與模型儲存位置。
- [Ollama：nomic-embed-text-v2-moe](https://ollama.com/library/nomic-embed-text-v2-moe)：課程採用的多語 embedding 模型與 `ollama pull` 指令。
- [Microsoft MarkItDown](https://github.com/microsoft/markitdown)：Python 版本需求、文件格式與本機檔案轉換原則。
