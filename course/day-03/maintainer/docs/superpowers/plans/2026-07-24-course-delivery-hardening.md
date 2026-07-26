# Day-03 授課可執行性補強 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓 Day-03 的學生教材、講師備案與資料契約一致，並可在六小時內依序完成資料管線與本機問答。

**Architecture:** 保持學生在 `team-xx-project/` 自行實作的設計；README 定義交付與備案，提示詞定義每步操作，SDD 定義機器可讀產物，練習檔定義驗收。僅新增講師備援的使用規則，不在 repo 新增學生 template 或資料檔。

**Tech Stack:** Markdown、JSON、JSONL、Codex MarkItDown MCP、Ollama `qwen2.5:3b`、Python、Streamlit。

## Global Constraints

- 基本 RAG 驗收固定四類：有依據問答、公開聯絡資訊、模糊問題、語料範圍外問題。
- 衝突或過期文件為進階挑戰，非基本繳交。
- 備援語料僅能是公開來源，且只在正常爬取、下載或解析無法完成流程時啟用。
- 不新增學生 project template、爬蟲程式、完整 RAG 程式或向量資料庫。
- 原始資料不可覆寫；所有衍生資料保留 `document_id`、`source_url`、`crawled_at`。

---

### Task 1: 補足課前檢查與講師備援規則

**Files:**
- Modify: `README.md`
- Modify: `exercises/01-crawl-and-manifest.md`

**Interfaces:**
- Consumes: `team-xx-project/` 的資料夾結構與 crawl scope 規則。
- Produces: 課前工具清單與可追溯的備援啟用條件。

- [ ] **Step 1: 寫入課前檢查清單**

在 README 的「課前必要工具」後新增「課前檢查」：講師確認每台電腦可使用 Codex 的 MarkItDown MCP、`ollama list` 可看見 `qwen2.5:3b`、Python 可執行且可安裝 `streamlit`；學生完成第一筆成功下載後才用該檔案驗證 MCP。

- [ ] **Step 2: 寫入備援啟用門檻**

在 README 與練習 01 加入相同規則：僅當網站、下載或解析失敗導致無法取得至少三筆 `ready_for_analysis` chunks 時，講師提供公開備援資料；學生須為備援建立 scope、manifest、Markdown、品質報告與 provenance，正常情況不可跳過爬取。

- [ ] **Step 3: 驗證交付說明**

Run: `rg -n '課前檢查|備援|ready_for_analysis' README.md exercises/01-crawl-and-manifest.md`

Expected: 工具責任、啟用條件與追溯要求各出現一次以上。

- [ ] **Step 4: Commit**

```bash
git add README.md exercises/01-crawl-and-manifest.md
git commit -m "docs: add day 3 preflight and fallback rules"
```

### Task 2: 固定 Markdown、品質與 chunks 的資料契約

**Files:**
- Modify: `sdd/generative-ai-text-analysis-sdd.md`
- Modify: `prompts/02-parse-with-markitdown.md`
- Modify: `prompts/03-process-and-analyze-text.md`
- Modify: `exercises/02-markdown-quality-check.md`
- Modify: `exercises/03-ai-text-analysis.md`

**Interfaces:**
- Consumes: `crawl_manifest.json` 的成功 `raw_path` 與 SDD 定義的 provenance。
- Produces: `data/markdown/<document_id>.md`、`data/markdown/quality_report.jsonl`、`data/processed/<document_id>.chunks.jsonl` 與 `analysis/text_analysis.md`。

- [ ] **Step 1: 在 SDD 定義檔案與欄位**

新增三個明確契約：Markdown 檔頭為 `document_id`、`source_url`、`crawled_at`、`raw_path`；品質報告每行為 `document_id`、`markdown_path`、`quality_status`、`checked_features`、`reason`、`checked_at`；chunks JSONL 每行使用既有 provenance 欄位並且只有 `ready_for_analysis` 可供 RAG 讀取。

- [ ] **Step 2: 讓提示詞 02 寫出品質報告**

要求將每份轉換結果寫入 `data/markdown/<document_id>.md`，並以 JSONL 追加品質報告。`checked_features` 固定檢查標題階層、段落或清單、表格或掃描內容。

- [ ] **Step 3: 讓提示詞 03 寫出 chunks 與分析表**

要求每份可用文件輸出 `data/processed/<document_id>.chunks.jsonl`；`analysis/text_analysis.md` 的每列固定包含 `document_id`、`chunk_id`、`summary`、`category`、`administrative_information`、`topic`、`document_evidence`、`ai_interpretation`。

- [ ] **Step 4: 同步兩份練習驗收**

練習 02 明定交品質報告；練習 03 明定 chunks JSONL 與上述八欄分析表。

- [ ] **Step 5: 驗證欄位一致**

Run: `rg -n 'quality_report|checked_features|text_analysis|administrative_information|chunks.jsonl' sdd prompts exercises`

Expected: 所有產物名稱與欄位在 SDD、提示詞及練習中一致。

- [ ] **Step 6: Commit**

```bash
git add sdd/generative-ai-text-analysis-sdd.md prompts/02-parse-with-markitdown.md prompts/03-process-and-analyze-text.md exercises/02-markdown-quality-check.md exercises/03-ai-text-analysis.md
git commit -m "docs: define text processing data contracts"
```

### Task 3: 統一四類 RAG 驗收與進階挑戰

**Files:**
- Modify: `README.md`
- Modify: `prompts/04-build-cited-rag.md`
- Modify: `exercises/04-cited-rag-qa.md`
- Modify: `docs/superpowers/specs/2026-07-23-local-ollama-rag-chatbot-design.md`

**Interfaces:**
- Consumes: `ready_for_analysis` chunks、Ollama `qwen2.5:3b`、`feedback/query_log.jsonl`。
- Produces: 四類測試結果、引用與可回連 query_id 的紀錄。

- [ ] **Step 1: 以同一組題型取代模糊數量敘述**

四類題型的文字固定為：有依據的規章或流程、公開聯絡資訊、模糊問題、語料範圍外問題。聯絡資訊找不到時仍屬成功測試，結果必為 `insufficient_evidence`。

- [ ] **Step 2: 定義衝突或過期的進階行為**

若資料中確有衝突或過期文件，列出每個來源與 `crawled_at`，不自行判定現行規定；沒有此類資料時不要求製造測試資料。

- [ ] **Step 3: 同步 RAG 設計的回答契約**

明定期限、數字、單位與聯絡資訊必須可逐字回查 evidence；不可核對時顯示原文證據或回覆 `insufficient_evidence`。

- [ ] **Step 4: 驗證題型與安全條件**

Run: `rg -n '四類|五類|衝突|過期|公開聯絡|模糊問題|範圍外' README.md prompts/04-build-cited-rag.md exercises/04-cited-rag-qa.md docs/superpowers/specs/2026-07-23-local-ollama-rag-chatbot-design.md`

Expected: 基本要求只出現四類；衝突／過期只以進階挑戰出現。

- [ ] **Step 5: Commit**

```bash
git add README.md prompts/04-build-cited-rag.md exercises/04-cited-rag-qa.md docs/superpowers/specs/2026-07-23-local-ollama-rag-chatbot-design.md
git commit -m "docs: standardize four RAG test cases"
```

### Task 4: 清理設計敘述並進行全教材檢查

**Files:**
- Modify: `docs/superpowers/specs/2026-07-22-generative-ai-text-analysis-design.md`
- Modify: `prd/generative-ai-text-analysis-prd.md`

**Interfaces:**
- Consumes: 任務 1 至 3 的固定用語與資料契約。
- Produces: 與學生教材一致的課程設計、PRD 與驗收標準。

- [ ] **Step 1: 移除舊資料夾與模擬紀錄說法**

將設計文件中的 `data/seeds/` 移除；「課程提供的模擬問答紀錄」改為「學生實際問答產生的紀錄」。

- [ ] **Step 2: 同步 PRD 的可執行性條件**

補入品質報告、chunks JSONL、四類基本 RAG 驗收與講師備援的原則，但不把備援語料列成學生必要資料來源。

- [ ] **Step 3: 做全文與連結檢查**

Run: `git diff --check && rg -n 'data/seeds|課程提供的模擬問答紀錄|五類測試' README.md prd sdd prompts exercises || true`

Expected: `git diff --check` 無輸出；舊用語無命中。

- [ ] **Step 4: 確認 Markdown 連結目標**

Run: `python3 - <<'PY'
from pathlib import Path
import re
bad=[]
teaching_paths = [Path('README.md'), *Path('prd').glob('*.md'), *Path('sdd').glob('*.md'), *Path('prompts').glob('*.md'), *Path('exercises').glob('*.md')]
for path in teaching_paths:
    for target in re.findall(r'\]\(([^)#]+)', path.read_text(encoding='utf-8')):
        if not target.startswith(('http://','https://','mailto:')) and not (path.parent/target).exists():
            bad.append((path,target))
assert not bad, bad
print('markdown links: ok')
PY`

Expected: `markdown links: ok`.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-07-22-generative-ai-text-analysis-design.md prd/generative-ai-text-analysis-prd.md
git commit -m "docs: align day 3 course design and PRD"
```
