# Day 3 Course Materials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, reusable Day-03 course package for a source-traceable generative-AI text-analysis pipeline using Codex and the MarkItDown MCP.

**Architecture:** The package separates teaching guidance (`README.md`, PRD, SDD, prompts, exercises) from the student deliverable (`project-template/`). The template preserves raw crawl outputs, MarkItDown conversions, processed document records, AI analysis, cited RAG evidence, and feedback-driven improvement decisions as separate layers.

**Tech Stack:** Markdown curriculum documents, JSON data contracts, Codex, MarkItDown MCP, learner-authored crawler and RAG prototype.

## Global Constraints

- The required common parser is Codex with the MarkItDown MCP; it converts already-collected local HTML, PDF, and DOCX rather than crawling sites.
- Only a lecturer-provided allowlist of public YunTech URLs and public attachments may be collected.
- Raw source files are immutable; all derived files must retain source URL, crawl time, and document identifier.
- RAG answers must cite a retrieved document and chunk; when evidence is absent, the system must state that limitation rather than infer an answer.
- No personal data, authenticated sources, full-site crawling, production deployment, user accounts, or mandatory vector-database service is in scope.
- Every learner prompt must state inputs, output paths, acceptance criteria, and the required failure report.

---

### Task 1: Establish the course overview and student data contracts

**Files:**
- Modify: `README.md`
- Create: `project-template/README.md`
- Create: `project-template/data/seeds/seed_urls.example.csv`
- Create: `project-template/data/manifests/crawl_manifest.example.json`
- Create: `project-template/data/processed/document_chunks.example.json`
- Create: `project-template/docs/data-dictionary.md`

**Interfaces:**
- Consumes: the approved design specification at `docs/superpowers/specs/2026-07-22-generative-ai-text-analysis-design.md`.
- Produces: a learner-facing course map and the canonical `seed URL → manifest → Markdown → processed chunks` data contract used by all later prompts and exercises.

- [ ] **Step 1: Replace `README.md` with the final course overview**

Include the approved six-stage flow, six time blocks, Codex + MarkItDown MCP confirmation after the first successful crawl, five learning outcomes, a link table to every prompt and exercise, three-layer final deliverable, submission checklist, and the explicit public-source/privacy boundary.

- [ ] **Step 2: Create the project-template README**

Document the folder layers, commands or actions learners are expected to perform in Codex, immutable raw-data rule, and the condition that each derived record preserves `document_id`, `source_url`, and `crawled_at`.

- [ ] **Step 3: Create the seed allowlist example**

Use these exact columns: `seed_id,unit_name,start_url,allowed_host,allowed_path_prefix,allowed_formats,max_pages,max_attachments,notes`. Populate two clearly fictional `example.edu.tw` rows so the template never implies a live URL is course-approved.

- [ ] **Step 4: Create the crawl-manifest contract**

Provide one valid JSON example with `document_id`, `seed_id`, `title`, `source_url`, `source_type`, `crawled_at`, `published_at`, `raw_path`, `http_status`, `crawl_status`, and `error_message`. Include one success record and one controlled failure record.

- [ ] **Step 5: Create the processed-chunk contract and data dictionary**

Provide JSON records with `chunk_id`, `document_id`, `title`, `category`, `source_url`, `crawled_at`, `markdown_path`, `section_heading`, `page_or_anchor`, `chunk_text`, and `quality_status`. Define every field, valid status value, and the rule that a chunk never loses its document provenance.

- [ ] **Step 6: Verify Task 1 artifacts**

Run:

```bash
rg -n 'MarkItDown|來源|crawl_manifest|document_id|個人資料' README.md project-template
python3 -m json.tool project-template/data/manifests/crawl_manifest.example.json >/dev/null
python3 -m json.tool project-template/data/processed/document_chunks.example.json >/dev/null
```

Expected: the search finds all data-lineage concepts; both JSON commands exit `0`.

- [ ] **Step 7: Commit Task 1**

```bash
git add README.md project-template
git commit -m "docs: add day 03 course overview and data contracts"
```

### Task 2: Complete the product and system design documents

**Files:**
- Modify: `prd/generative-ai-text-analysis-prd.md`
- Modify: `sdd/generative-ai-text-analysis-sdd.md`

**Interfaces:**
- Consumes: the field contracts in `project-template/docs/data-dictionary.md`.
- Produces: requirements and technical teaching design that use the same vocabulary and accepted output states as the template.

- [ ] **Step 1: Complete the PRD**

Write the product goal, named case study, primary users, source boundary, six functional requirements, explicit non-goals, acceptance criteria, and the five-part assessment rubric. Require that answers cite source evidence and that feedback analysis produces a prioritised improvement backlog.

- [ ] **Step 2: Write the SDD from scratch**

Define the six-stage pipeline, the responsibility boundary between crawler and MarkItDown MCP, directory ownership, JSON schemas in readable tables, processing statuses (`collected`, `parsed`, `needs_review`, `ready_for_analysis`, `excluded`), quality checks, RAG answer contract, feedback-event contract, error handling, safety constraints, and end-to-end verification scenario.

- [ ] **Step 3: Check cross-document consistency**

Run:

```bash
rg -n 'document_id|source_url|crawled_at|ready_for_analysis|needs_review' prd sdd project-template/docs/data-dictionary.md
rg -n '全校|登入|個人資料|正式上線' prd sdd README.md
```

Expected: all provenance fields and scope limits appear consistently; no document promises full-site crawling or production deployment.

- [ ] **Step 4: Commit Task 2**

```bash
git add prd/generative-ai-text-analysis-prd.md sdd/generative-ai-text-analysis-sdd.md
git commit -m "docs: complete day 03 requirements and system design"
```

### Task 3: Create the Codex prompt pack

**Files:**
- Create: `prompts/00-codex-mcp-setup.md`
- Create: `prompts/01-crawl-specified-site.md`
- Create: `prompts/02-parse-with-markitdown.md`
- Create: `prompts/03-process-and-analyze-text.md`
- Create: `prompts/04-build-cited-rag.md`
- Create: `prompts/05-analyze-query-feedback.md`

**Interfaces:**
- Consumes: the directory layout and JSON field names created in Task 1.
- Produces: six copyable Codex prompts that generate only outputs accepted by the exercises.

- [ ] **Step 1: Write the MCP preflight prompt**

Require learners to use a successful crawl record to verify that the MarkItDown MCP is available, convert that local file, save Markdown under `data/markdown/`, and report the tool name, input URI, output path, headings found, and any conversion limitation. It must stop and report when the MCP is unavailable.

- [ ] **Step 2: Write the crawling and parsing prompts**

The crawler prompt must enforce the seed allowlist, page and attachment limits, raw-file storage, and manifest creation. The parser prompt must process only manifest records with `crawl_status: "success"`, use local file URIs, create Markdown, and set quality status without altering raw files.

- [ ] **Step 3: Write the analysis, RAG, and feedback prompts**

The analysis prompt must build chunks using the documented field names and produce source-linked summaries, categories, extracted fields, and themes. The RAG prompt must output an answer, retrieved chunk identifiers, source URL, and `insufficient_evidence` when appropriate. The feedback prompt must classify questions and create an improvement action limited to `add_source`, `repair_parse`, `revise_chunking_or_metadata`, `improve_retrieval`, or `revise_prompt`.

- [ ] **Step 4: Verify prompt completeness**

Run:

```bash
for file in prompts/*.md; do
  rg -q '輸入' "$file" && rg -q '輸出' "$file" && rg -q '驗收' "$file" && rg -q '失敗' "$file" || exit 1
done
```

Expected: exit `0`.

- [ ] **Step 5: Commit Task 3**

```bash
git add prompts
git commit -m "docs: add day 03 Codex prompt pack"
```

### Task 4: Create five learner exercises and controlled feedback data

**Files:**
- Create: `exercises/01-crawl-and-manifest.md`
- Create: `exercises/02-markdown-quality-check.md`
- Create: `exercises/03-ai-text-analysis.md`
- Create: `exercises/04-cited-rag-qa.md`
- Create: `exercises/05-feedback-to-improvement.md`
- Create: `project-template/feedback/query_log.example.jsonl`
- Create: `project-template/feedback/improvement_backlog.example.md`

**Interfaces:**
- Consumes: prompts and data-contract fields from Tasks 1 and 3.
- Produces: independently gradable exercise evidence, including a data-driven improvement backlog.

- [ ] **Step 1: Write Exercises 01 and 02**

Exercise 01 must require a bounded crawl and a valid manifest. Exercise 02 must require learners to inspect at least three content features (heading hierarchy, lists or paragraphs, and table or scan handling), classify each document as `ready_for_analysis`, `needs_review`, or `excluded`, and explain every non-ready decision.

- [ ] **Step 2: Write Exercise 03**

Require at least three processed document records and an analysis table containing document identifier, summary, category, extracted administrative item, theme, and source chunk. The answer must distinguish source evidence from AI interpretation.

- [ ] **Step 3: Write Exercise 04**

Provide four test-question categories: directly supported, ambiguous, outside corpus, and conflicting or outdated source. Require citation evidence for supported answers and `insufficient_evidence` for other categories.

- [ ] **Step 4: Write Exercise 05 and feedback examples**

Provide at least ten fictional JSONL events with `query_id`, `asked_at`, `question`, `answer_status`, `cited_chunk_ids`, `user_feedback`, and `notes`. Require a grouped diagnosis and an improvement backlog with issue, evidence, cause, allowed action, owner, and priority.

- [ ] **Step 5: Verify exercise links and example JSONL**

Run:

```bash
rg -n 'prompts/0[0-5]' exercises
python3 -c 'import json; [json.loads(line) for line in open("project-template/feedback/query_log.example.jsonl") if line.strip()]'
```

Expected: every exercise links to its matching prompt; JSONL parsing exits `0`.

- [ ] **Step 6: Commit Task 4**

```bash
git add exercises project-template/feedback
git commit -m "docs: add day 03 exercises and feedback examples"
```

### Task 5: Run package-level curriculum QA and prepare handoff

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-07-22-generative-ai-text-analysis-design.md` only if QA identifies a contradiction.

**Interfaces:**
- Consumes: every learner-facing file in Tasks 1–4.
- Produces: a package with no dangling links, no mismatched file names, and a README that accurately states the material available.

- [ ] **Step 1: Validate the documented file inventory**

Run:

```bash
rg -o '`[^`]+\.md`' README.md | tr -d '`' | while read -r file; do test -e "$file" || { echo "missing: $file"; exit 1; }; done
find prompts exercises project-template -type f | sort
```

Expected: no `missing:` output and the file list matches the README inventory.

- [ ] **Step 2: Scan for incomplete teaching copy and unsafe claims**

Run:

```bash
rg -n -i 'TODO|TBD|待補|之後再|全校爬取|登入後資料|保證正確' README.md prd sdd prompts exercises project-template || true
```

Expected: no incomplete teaching copy; scope-limiting language may appear only to state that it is prohibited.

- [ ] **Step 3: Review the complete learner journey**

Confirm in order: bounded crawl → raw/manifest → MCP confirmation with a successful crawl record → Markdown/quality status → processed chunks → source-linked analysis → cited RAG answer → feedback diagnosis → allowed improvement action. Correct any broken path, field-name mismatch, or missing acceptance condition in the responsible file.

- [ ] **Step 4: Commit Task 5**

```bash
git add README.md docs/superpowers/specs/2026-07-22-generative-ai-text-analysis-design.md
git commit -m "docs: verify day 03 curriculum package"
```
