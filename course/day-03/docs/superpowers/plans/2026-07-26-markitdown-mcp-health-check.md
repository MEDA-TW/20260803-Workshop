# MarkItDown MCP Health Check Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Day 03 的新手引導中提供可重現的 MarkItDown MCP 註冊與檢查流程。

**Architecture:** README 放置最短入口；講師指引放置完整命令與排錯；Step 02 只要求已通過健康檢查才解析本機檔案。既有提示詞契約測試驗證這三處保留必要訊息。

**Tech Stack:** Markdown、Codex CLI、Node.js 契約測試。

## Global Constraints

- 不修改既有 18 頁投影片。
- `markitdown` 不存在或未啟用時才執行新增命令。
- 新增後必須重啟 Codex 並建立新 task。
- 無法呼叫工具時不得安裝未知 MCP server，須交給講師。

---

### Task 1: 同步新手健康檢查文字

**Files:**
- Modify: `README.md`
- Modify: `instructor-resources/install-and-health-check.md`
- Modify: `prompts/02-parse-with-markitdown.md`
- Modify: `tests/verify-prompt-contracts.mjs`

**Interfaces:**
- Consumes: `codex mcp list` 的 `markitdown ... enabled` 輸出。
- Produces: 可在 Step 02 前完成的 MCP 可用性確認。

- [x] **Step 1: 擴充文字教材與提示詞測試**

加入 `codex mcp list`、條件式 `codex mcp add markitdown -- uvx --from markitdown-mcp markitdown-mcp`、重啟新 task 與講師交接規則。

- [x] **Step 2: 驗證契約與差異格式**

Run: `node tests/verify-prompt-contracts.mjs`
Expected: six prompt contracts pass.

Run: `git diff --check`
Expected: no output.
