# Day 3 Starter Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Day 3 改為單一學生指南、講師劇本、可列印操作卡與可執行的 private-template starter。

**Architecture:** README 依角色導向學生、講師與維護者；學生只讀 `STUDENT_GUIDE.md`。`starter/` 預載 Streamlit RAG、公開健康檢查 sample chunks 與空資料目錄，正式資料自動覆蓋 sample。維護者測試檢查這些課程契約。

**Tech Stack:** Markdown、Python、Streamlit、Ollama、Node.js。

## Global Constraints

- 不公開部署、不蒐集學生資料、不計分。
- 課前完成 Codex、Python、Ollama、指定模型與 MarkItDown MCP。
- 10:30 未取得三筆可用文件即切換公開備援；不得跳過 provenance。
- starter 的 sample chunks 只能供健康檢查，不可作為最終展示。

---

### Task 1: 建立角色入口與學生單一流程

**Files:**
- Create: `STUDENT_GUIDE.md`, `INSTRUCTOR_GUIDE.md`, `HANDOUTS.md`
- Modify: `README.md`, `maintainer/tests/verify-prompt-contracts.mjs`
- Remove: `student-guide/`

- [x] **Step 1: 將六步提示詞、完成證據與排錯合併為學生單一流程。**
- [x] **Step 2: 為講師加入 Aha Demo、時間門檻、TA 排錯與棄守順序。**
- [x] **Step 3: 更新測試為單一指南契約，執行 Node 檢查。**

### Task 2: 建立 private-template starter

**Files:**
- Create: `starter/README.md`, `starter/requirements.txt`, `starter/rag/app.py`, `starter/sample-data/chunks.jsonl`, `starter/data/processed/.gitkeep`

- [x] **Step 1: 以 sample chunks 提供無學生資料時的可啟動健康檢查。**
- [x] **Step 2: 讓 app 自動優先讀取學生的 processed chunks，並保留引用、問答歷程與不足證據規則。**
- [x] **Step 3: 執行 Python 語法檢查與教材契約檢查。**
