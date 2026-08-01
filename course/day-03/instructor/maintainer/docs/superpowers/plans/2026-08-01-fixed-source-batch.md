# Fixed Source Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let beginners process the four course-specified public sources with one batch prompt instead of repeating five prompts for every source.

**Architecture:** `STUDENT_GUIDE.md` owns the student workflow and will replace the per-document prompt loop with one deterministic batch prompt and one result check. The handout, course overview, exercise, and PRD will use the same fixed-source batch boundary. No application code, Demo data, or RAG behavior changes.

**Tech Stack:** Markdown course materials, Node.js prompt-contract verifier, Python unittest.

## Global Constraints

- Sources are exactly the four URLs already listed in `STUDENT_GUIDE.md`.
- The batch processes sources sequentially, with one-second request spacing and 20 HTML/20 attachment ceilings.
- Each source checks public rules before download; failure is recorded and does not stop later specified sources.
- Only successfully downloaded, quality-approved text enters analysis and indexing.
- Do not commit or push without explicit user authorization.

---

### Task 1: Replace the repeated student prompt loop

**Files:**
- Modify: `STUDENT_GUIDE.md:98-130`
- Modify: `maintainer/tests/verify-prompt-contracts.mjs`

**Interfaces:**
- Consumes: the four fixed URLs recorded by prompt 02-2.
- Produces: one prompt reporting each source's URL, format, public-rule result, download result, parsing result, quality result, and next step.

- [ ] Add these required strings to the `01｜限定範圍爬取` contract:

```js
'一次依序處理全部資料',
'逐份確認公開規範',
'失敗原因',
'繼續處理下一份指定資料',
'網址、格式、取得、解析與品質結果',
```

- [ ] Run `node maintainer/tests/verify-prompt-contracts.mjs`; it must fail until the guide has the new batch wording.

- [ ] Replace prompts 03-1 through 03-5 with one prompt containing this behavior:

```text
依剛才記錄的四份課程指定資料，一次依序處理全部資料。每份都先確認公開規範；可繼續才取得原始檔、寫入來源紀錄、用 MarkItDown 解析並寫入品質結果。不能繼續或失敗時，記錄失敗原因後繼續處理下一份指定資料。不要新增網址、不覆寫原始檔；兩次請求至少相隔 1 秒。最後用表格列出每份資料的網址、格式、取得、解析與品質結果，以及下一步。
```

- [ ] Run `node maintainer/tests/verify-prompt-contracts.mjs`; all six groups must pass.

### Task 2: Synchronize supporting course copy

**Files:**
- Modify: `README.md:31-70,135-145`
- Modify: `HANDOUTS.md:3-9`
- Modify: `maintainer/exercises/01-crawl-and-manifest.md:1-7`
- Modify: `maintainer/prd/generative-ai-text-analysis-prd.md:12-18`

**Interfaces:**
- Consumes: the batch workflow and fixed-source boundary from `STUDENT_GUIDE.md`.
- Produces: consistent wording that students submit one batch prompt while each source remains traceable.

- [ ] Replace wording that asks students to repeat prompts for each document with wording that says one batch prompt processes four fixed sources sequentially.
- [ ] Run `git diff --check` and confirm no Markdown whitespace errors.

### Task 3: Validate the unchanged application contract

**Files:**
- Test: `starter/tests/`
- Test: `maintainer/tests/verify-prompt-contracts.mjs`

**Interfaces:**
- Consumes: unchanged Demo and starter applications.
- Produces: confirmation that the documentation update does not change application behavior.

- [ ] Run `node maintainer/tests/verify-prompt-contracts.mjs`; all six groups pass.
- [ ] Run `PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests`; all 12 tests pass.
- [ ] Run `git diff --check`; no whitespace errors.
