# Day 3 講師資料夾整合 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Day 3 的講師資源集中於 `instructor/`，但讓學生的根目錄入口與 `starter/` 保持不變。

**Architecture:** 根目錄保留學生使用的 README、學生指南、操作卡與 starter。講師指南、投影片、Demo、教學資源與維護檔案移入 `instructor/`，以講師入口 README 導向。所有相對連結、Demo 資料根目錄與簡報產生輸出路徑同步修正。

**Tech Stack:** Markdown、Python、Streamlit、Node.js、PptxGenJS、Git 移動追蹤。

## Global Constraints

- 學生檔案 `STUDENT_GUIDE.md`、`HANDOUTS.md`、`starter/` 保留在 Day 3 根目錄。
- 講師 Demo 從 Day 3 根目錄以 `python -m streamlit run instructor/demo/app.py` 啟動。
- 學生新資料流程固定使用 `data/manifests/crawl_manifest.jsonl`；講師既有唯讀示範資料可保留舊 JSON manifest，但 README 必須標示其歷史性。
- 不建立分支、不提交 Git，也不刪除資料或重寫學生 starter 的內容。

---

### Task 1: 建立講師資料夾與移動資源

**Files:**
- Move: `INSTRUCTOR_GUIDE.md` → `instructor/INSTRUCTOR_GUIDE.md`
- Move: `slides/` → `instructor/slides/`
- Move: `instructor-demo/` → `instructor/demo/`
- Move: `instructor-resources/` → `instructor/resources/`
- Move: `maintainer/` → `instructor/maintainer/`
- Create: `instructor/README.md`

**Interfaces:**
- Consumes: 現有講師文件、Demo 與投影片。
- Produces: `instructor/` 作為講師／TA 唯一入口。

- [x] **Step 1: 建立目標資料夾並移動資源**

```bash
mkdir instructor
git mv INSTRUCTOR_GUIDE.md instructor/INSTRUCTOR_GUIDE.md
git mv slides instructor/slides
git mv instructor-demo instructor/demo
git mv instructor-resources instructor/resources
git mv maintainer instructor/maintainer
```

- [x] **Step 2: 建立講師入口 README**

`instructor/README.md` 必須連結講師指南、投影片、Demo、安裝與健康檢查、即時示範資料及維護文件；並列出：

```bash
source starter/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
```

- [x] **Step 3: 確認移動結果**

```bash
find instructor -maxdepth 2 -type d | sort
test -f STUDENT_GUIDE.md && test -f HANDOUTS.md && test -d starter
```

### Task 2: 同步文件與 manifest 規則

**Files:**
- Modify: `README.md`, `STUDENT_GUIDE.md`, `HANDOUTS.md`
- Modify: `instructor/INSTRUCTOR_GUIDE.md`, `instructor/demo/README.md`
- Modify: `instructor/resources/**/*.md`, `instructor/maintainer/**/*.md`

**Interfaces:**
- Consumes: Task 1 的新檔案位置。
- Produces: 一致的學生／講師角色界線與路徑。

- [x] **Step 1: 更新學生路由與備援命令**

學生可見文件的 Demo 命令使用 `python -m streamlit run instructor/demo/app.py`；根目錄 README 只列出 `STUDENT_GUIDE.md`、`HANDOUTS.md`、`starter/` 與 `instructor/README.md`。

- [x] **Step 2: 更新講師文件相對連結**

`instructor/INSTRUCTOR_GUIDE.md` 使用 `demo/app.py`、`resources/live-demo/`、`resources/install-and-health-check.md`；`instructor/demo/README.md` 與 resources 文件依新深度指向 `../../starter/` 或 `../demo/`。

- [x] **Step 3: 標示既有講師 manifest 格式**

在 `instructor/resources/live-demo/README.md` 與 `instructor/resources/fallback-package/README.md` 加上：既有資料為唯讀示範，可能保留 `crawl_manifest.json`；學生新成果一律寫 `starter/data/manifests/crawl_manifest.jsonl`。

- [x] **Step 4: 靜態路徑掃描**

```bash
rg -n 'instructor-demo|instructor-resources|maintainer/|\]\(slides/' README.md STUDENT_GUIDE.md HANDOUTS.md instructor
```

### Task 3: 修正程式與簡報產生路徑

**Files:**
- Modify: `instructor/demo/app.py`
- Modify: `instructor/maintainer/scripts/create_day_03_teaching_deck.mjs`
- Modify: `instructor/maintainer/tests/verify-prompt-contracts.mjs`
- Modify: `instructor/slides/day-03-generative-ai-text-analysis.pptx`

**Interfaces:**
- Consumes: Task 1 的 `instructor/` 根目錄。
- Produces: Demo 新位置可載入資料；簡報輸出至 `instructor/slides/`。

- [x] **Step 1: 調整 Demo 根目錄計算**

在 `instructor/demo/app.py` 使用 `APP_ROOT = Path(__file__).resolve().parent` 處理 Demo data 與 feedback；需要課程根目錄時使用 `Path(__file__).resolve().parents[2]`。

- [x] **Step 2: 調整簡報產生腳本**

以 `fileURLToPath(import.meta.url)` 取得腳本位置，從該位置推得 `instructor/`，設定輸出為 `instructor/slides/day-03-generative-ai-text-analysis.pptx`，素材為 `instructor/slides/assets/meda-logo.png`；不得依賴執行時的工作目錄。

- [x] **Step 3: 重新產出與驗證投影片**

```bash
node instructor/maintainer/scripts/create_day_03_teaching_deck.mjs
unzip -l instructor/slides/day-03-generative-ai-text-analysis.pptx | rg 'ppt/slides/slide[0-9]+\.xml' | wc -l
```

### Task 4: 完整驗證

**Files:**
- Test: `instructor/maintainer/tests/verify-prompt-contracts.mjs`
- Test: `starter/tests/`

- [x] **Step 1: 執行教材與 Python 驗證**

```bash
node instructor/maintainer/tests/verify-prompt-contracts.mjs
PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests -v
starter/.venv/bin/python -m py_compile starter/rag/app.py starter/rag/chatbot_helpers.py instructor/demo/app.py
```

- [x] **Step 2: 檢查失效路徑與工作樹**

```bash
rg -n 'instructor-demo/|instructor-resources/|\]\(slides/' README.md STUDENT_GUIDE.md HANDOUTS.md instructor starter --glob '!instructor/maintainer/docs/superpowers/**' || true
git diff --check
git status --short
```

Expected: 學生與講師目前文件不含失效路徑，所有契約與 Python 測試通過。
