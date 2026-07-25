# Day-03 當天授課簡報 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一份 22 張、可於當天投影授課的 Day-03 PPT，帶領學生完成從公開文本到可引用問答的流程。

**Architecture:** 用單一 PptxGenJS 腳本建立投影片、講者備註與共用視覺元件。投影片依「概念頁 → 操作頁 → 檢查點」排列，採深墨綠、暖米色、湖水綠與珊瑚橘資料管線母題。

**Tech Stack:** PptxGenJS、Node.js、LibreOffice、MarkItDown、Poppler。

## Global Constraints

- 產物為 `slides/day-03-generative-ai-text-analysis.pptx`。
- 共 22 張；每張至少一個視覺元素，標題至少 36pt、正文至少 18pt。
- 說明 MCP、MarkItDown、manifest、metadata、chunk、provenance、RAG、Ollama、JSONL。
- 每段操作只摘要提示詞與檢查點，不取代 repo 的完整提示詞。
- 每張附講者備註，包含講師關鍵句與學生動作。

---

### Task 1: 建立簡報產生器與 22 張教學內容

**Files:**
- Create: `scripts/create_day_03_teaching_deck.mjs`
- Create: `slides/day-03-generative-ai-text-analysis.pptx`

**Interfaces:**
- Consumes: `README.md`、`prompts/00-create-project-and-start-url.md` 至 `prompts/05-analyze-query-feedback.md`、`docs/superpowers/specs/2026-07-25-day-03-teaching-deck-design.md`。
- Produces: 一份 16:9 PowerPoint，包含 22 張有講者備註的投影片。

- [ ] **Step 1: 建立共用設計元件**

在腳本中定義深墨綠 `163A35`、暖米色 `F4EFE6`、湖水綠 `65B8A6`、珊瑚橘 `E37B62`，以及標題、頁尾、資料管線、卡片、檢查點與講者備註的 helper functions。

- [ ] **Step 2: 實作開場與名詞橋接（1–6）**

建立今日成果、時程與管線圖；以專屬圖解解釋 MCP／MarkItDown、manifest／metadata／chunk／provenance、RAG／Ollama／JSONL。

- [ ] **Step 3: 實作六段操作與檢查點（7–19）**

以各提示詞檔名、三至五個行動與資料產物，呈現 scope、爬取、解析、分析、RAG、回饋；RAG 使用支持性回答與 insufficient_evidence 的對比畫面。

- [ ] **Step 4: 實作收尾（20–22）**

建立五項繳交物、展示方式與「資料可追溯性重於介面美觀」的收束頁。

- [ ] **Step 5: 產生 PPT**

Run: `node scripts/create_day_03_teaching_deck.mjs`

Expected: `slides/day-03-generative-ai-text-analysis.pptx` 存在且大於 0 bytes。

### Task 2: 文字與視覺 QA

**Files:**
- Modify: `scripts/create_day_03_teaching_deck.mjs`
- Modify: `slides/day-03-generative-ai-text-analysis.pptx`

**Interfaces:**
- Consumes: Task 1 產生的 PPT。
- Produces: 經過一次修正與驗證的最終簡報。

- [ ] **Step 1: 抽取簡報文字**

Run: `python -m markitdown slides/day-03-generative-ai-text-analysis.pptx`

Expected: 輸出有 22 張的主要標題，且不含 placeholder 文字。

- [ ] **Step 2: 轉換與視覺檢查**

Run: `python /Users/tzu/.codex/skills/pptx/scripts/office/soffice.py --headless --convert-to pdf slides/day-03-generative-ai-text-analysis.pptx`，再以 `pdftoppm` 產生縮圖並檢查文字溢出、元素重疊、低對比與邊界。

- [ ] **Step 3: 修正至少一個可改善處並重產**

調整發現的文字密度、間距、字級或對比，重新執行產生器與兩項 QA 指令。

- [ ] **Step 4: Commit**

```bash
git add scripts/create_day_03_teaching_deck.mjs slides/day-03-generative-ai-text-analysis.pptx docs/superpowers/plans/2026-07-25-day-03-teaching-deck.md
git commit -m "feat: add day 3 teaching deck"
```
