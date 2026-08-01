# Codex-Built Streamlit RAG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the student path process four public school documents first, then use Codex to build a Streamlit RAG chat interface from an empty `rag/app.py`.

**Architecture:** The starter keeps dependency setup, the vector-index builder, empty output directories, and sample data only for health checks. Student-facing prompts create the data pipeline first and progressively create the Streamlit interface after `data/processed/vector_index.jsonl` exists. `instructor/demo/` remains the separate, complete fallback.

**Tech Stack:** Markdown course material, Python 3.10+, Streamlit, Ollama, MarkItDown MCP, Node.js prompt-contract checks, Python unittest.

## Global Constraints

- The course uses exactly four specified public sources and processes them with one sequential batch prompt.
- The student interface is created by Codex in `starter/rag/app.py`; it is not prebuilt in starter.
- Preserve `instructor/demo/` as the independently runnable full result.
- Keep `requirements.txt`, `scripts/build_index.py`, sample-data health check, and tests.
- Do not commit, push, or delete a file without explicit user authorization.

---

### Task 1: Make the starter a true build-from-data baseline

**Files:**
- Modify: `starter/README.md`
- Modify: `starter/rag/app.py`
- Modify: `starter/tests/test_chatbot_helpers.py`
- Modify: `starter/tests/test_master_demo_data.py`
- Remove after authorization: preprocessed course-result files under `starter/data/raw/`, `starter/data/markdown/`, `starter/data/processed/`, `starter/analysis/`, and `starter/feedback/`

**Interfaces:**
- Consumes: `starter/requirements.txt`, `starter/scripts/build_index.py`, and `starter/sample-data/`.
- Produces: an empty `starter/rag/app.py` placeholder whose only content tells students to follow the interface-building prompt after indexing; no imported RAG helpers or prebuilt UI.

- [ ] Verify that `starter/rag/app.py` currently contains the prebuilt chat interface and that official source files exist under `starter/data/`.
- [ ] Replace the prebuilt app with this placeholder:

```python
"""由學生依 STUDENT_GUIDE.md 的 Codex 提示詞建立。"""
```

- [ ] Remove only the listed precomputed course-result outputs after the user authorizes their removal; retain `.gitkeep` files and `sample-data/`.
- [ ] Update the starter README so its first runnable student interface step occurs after the data/index steps, and points to `STUDENT_GUIDE.md`.
- [ ] Run `find starter/data -maxdepth 3 -type f | sort` and confirm only directory keep-files and sample-data remain before students generate their own data.

### Task 2: Rewrite the student sequence and prompts

**Files:**
- Modify: `STUDENT_GUIDE.md:60-170`
- Modify: `HANDOUTS.md`
- Modify: `README.md:31-145`
- Modify: `INSTRUCTOR_GUIDE.md:9-54`
- Modify: `maintainer/exercises/04-cited-rag-qa.md`
- Modify: `maintainer/prd/generative-ai-text-analysis-prd.md`

**Interfaces:**
- Consumes: four-source batch results and `data/processed/vector_index.jsonl`.
- Produces: three Codex interface prompts: minimal app, chat layout, and cited RAG/history integration.

- [ ] Move all data acquisition, parsing, quality, chunking, and `python scripts/build_index.py` instructions before any student Streamlit interface prompt.
- [ ] Add a minimal-app prompt that requires Codex to create `rag/app.py`, use `st.set_page_config`, show a title, and expose `st.chat_input` at the bottom.
- [ ] Add a chat-layout prompt that requires immediate right-side user messages, left-side temporary assistant replies, and a new-conversation sidebar button.
- [ ] Add a RAG-and-history prompt that requires reading `data/processed/vector_index.jsonl`, Ollama embedding/retrieval of at most three chunks, cited answers, `insufficient_evidence`, and a local JSONL-backed records table.
- [ ] Rewrite the handout, overview, instructor run-of-show, exercise, and PRD to describe data first, UI second, RAG last.

### Task 3: Update contracts and validate the learning path

**Files:**
- Modify: `maintainer/tests/verify-prompt-contracts.mjs`
- Test: `starter/tests/`

**Interfaces:**
- Consumes: revised guide and starter baseline.
- Produces: checks that require data-first ordering and Codex-built interface wording.

- [ ] Add contract strings requiring `從空白建立 rag/app.py`, `底部輸入框`, `開新對話`, `vector_index.jsonl`, `最多三個 chunks`, and `問答紀錄`.
- [ ] Run `node maintainer/tests/verify-prompt-contracts.mjs` and update the guide until every contract passes.
- [ ] Run `PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests` and remove or replace tests that assert preloaded student-result content.
- [ ] Run `python -m streamlit run rag/app.py` after students generate the app; use the instructor Demo for the prebuilt runtime check before that step.
- [ ] Run `git diff --check` and inspect `git status --short` before handoff.
