# Local Ollama RAG Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在每組 Day-03 專案中建立可於瀏覽器執行的 Streamlit 對話機器人，以本機 Ollama 回答有來源依據的問題並記錄問答事件。

**Architecture:** `rag/retrieval.py` 將 `ready_for_analysis` chunks 載入並做無外部服務的中文字元重疊檢索；`rag/answering.py` 在有足夠證據時才呼叫本機 Ollama，並將引用由程式而非模型生成。`rag/app.py` 負責 Streamlit 介面，`rag/query_log.py` 將每個完成的問答追加至 JSONL。

**Tech Stack:** Python 3.11+、Streamlit、Ollama Python client、unittest。

## Global Constraints

- 模型固定為 `qwen3:8b`，僅透過本機 Ollama 呼叫；不使用雲端 API。
- 只讀取 `quality_status == "ready_for_analysis"` 的 JSONL chunks。
- `data/raw/` 不可修改；所有回答引用保留 `document_id`、`source_url`、`page_or_anchor` 與 `crawled_at`。
- 無足夠證據時不呼叫模型，回傳 `insufficient_evidence`。
- 不記錄模型完整 prompt、API 金鑰或白名單外資料；問答紀錄寫入 `feedback/query_log.jsonl`。

---

## File Structure

```text
team-xx-project/
├── rag/
│   ├── app.py              Streamlit 介面與結果呈現
│   ├── retrieval.py        chunk 載入與可重現檢索
│   ├── answering.py        受限模型呼叫與回答契約
│   ├── query_log.py        問答 JSONL 追加
│   ├── requirements.txt    執行相依套件
│   └── tests/
│       ├── test_retrieval.py
│       ├── test_answering.py
│       └── test_query_log.py
├── feedback/query_log.jsonl
└── data/processed/*.chunks.jsonl
```

## Task 1: Build provenance-preserving retrieval

**Files:**
- Create: `team-02-project/rag/retrieval.py`
- Create: `team-02-project/rag/tests/test_retrieval.py`

**Interfaces:**
- Produces: `load_ready_chunks(project_root: Path) -> list[dict]`
- Produces: `retrieve_chunks(question: str, chunks: list[dict], limit: int = 3) -> list[dict]`
- Produces: `build_citations(chunks: list[dict], title_by_document: dict[str, str]) -> list[dict]`

- [ ] **Step 1: Write the failing retrieval tests**

```python
from pathlib import Path
import json
import tempfile
import unittest

from retrieval import load_ready_chunks, retrieve_chunks


class RetrievalTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        processed = self.root / "data" / "processed"
        processed.mkdir(parents=True, exist_ok=True)
        rows = [
            {"chunk_id": "ready-1", "quality_status": "ready_for_analysis", "chunk_text": "本表於第一年第一學期結束前送所辦存查。"},
            {"chunk_id": "review-1", "quality_status": "needs_review", "chunk_text": "不應進入檢索。"},
        ]
        (processed / "sample.chunks.jsonl").write_text("\n".join(json.dumps(row, ensure_ascii=False) for row in rows), encoding="utf-8")

    def tearDown(self):
        self.temporary_directory.cleanup()

    def test_load_ready_chunks_excludes_review_records(self):
        chunks = load_ready_chunks(self.root)
        self.assertEqual([chunk["chunk_id"] for chunk in chunks], ["ready-1"])

    def test_retrieve_chunks_returns_evidence_for_send_to_office_question(self):
        chunks = load_ready_chunks(self.root)
        result = retrieve_chunks("最晚何時送所辦", chunks)
        self.assertEqual([chunk["chunk_id"] for chunk in result], ["ready-1"])

    def test_retrieve_chunks_returns_empty_for_out_of_scope_question(self):
        chunks = load_ready_chunks(self.root)
        self.assertEqual(retrieve_chunks("資格考何時申請", chunks), [])
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_retrieval.py -v`

Expected: FAIL with `ModuleNotFoundError: No module named 'retrieval'`.

- [ ] **Step 3: Implement the minimal retrieval module**

```python
from __future__ import annotations

import json
from pathlib import Path

IGNORED_CHARS = set("的了嗎呢啊我你他她它這那是要在和與及請問？！，。；：、 ")


def load_ready_chunks(project_root: Path) -> list[dict]:
    chunks: list[dict] = []
    for path in sorted((project_root / "data" / "processed").glob("*.chunks.jsonl")):
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                row = json.loads(line)
                if row.get("quality_status") == "ready_for_analysis":
                    chunks.append(row)
    return chunks


def _meaningful_chars(text: str) -> set[str]:
    return {char for char in text if char not in IGNORED_CHARS}


def retrieve_chunks(question: str, chunks: list[dict], limit: int = 3) -> list[dict]:
    query_chars = _meaningful_chars(question)
    if len(query_chars) < 2:
        return []
    scored: list[tuple[float, dict]] = []
    for chunk in chunks:
        overlap = query_chars & _meaningful_chars(chunk["chunk_text"])
        score = len(overlap) / len(query_chars)
        if len(overlap) >= 2 and score >= 0.3:
            scored.append((score, chunk))
    return [chunk for _, chunk in sorted(scored, key=lambda pair: pair[0], reverse=True)[:limit]]


def build_citations(chunks: list[dict], title_by_document: dict[str, str]) -> list[dict]:
    return [{
        "document_name": title_by_document.get(chunk["document_id"], chunk["document_id"]),
        "source_url": chunk["source_url"],
        "page_or_anchor": chunk["page_or_anchor"],
        "crawled_at": chunk["crawled_at"],
    } for chunk in chunks]
```

- [ ] **Step 4: Run the retrieval tests to verify they pass**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_retrieval.py -v`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit**

```bash
git add team-02-project/rag/retrieval.py team-02-project/rag/tests/test_retrieval.py
git commit -m "feat: add local chunk retrieval"
```

## Task 2: Add answer contract and Ollama boundary

**Files:**
- Create: `team-02-project/rag/answering.py`
- Create: `team-02-project/rag/tests/test_answering.py`

**Interfaces:**
- Consumes: `retrieve_chunks()` output.
- Produces: `answer_question(question: str, chunks: list[dict], title_by_document: dict[str, str], generate: callable | None = None) -> dict`
- Returns the fields `answer`, `answer_status`, `retrieved_chunk_ids`, `citations`, `limitations`.

- [ ] **Step 1: Write failing answer-contract tests**

```python
import unittest

from answering import answer_question


class AnsweringTests(unittest.TestCase):
    def setUp(self):
        self.chunk = {
            "chunk_id": "ready-1", "document_id": "doc-1",
            "chunk_text": "本表於第一年第一學期結束前送所辦存查。",
            "source_url": "https://example.edu/form",
            "page_or_anchor": "備註", "crawled_at": "2026-07-23T09:00:00+08:00",
        }

    def test_returns_insufficient_evidence_without_calling_model(self):
        def should_not_run(_prompt: str) -> str:
            raise AssertionError("model must not run")
        result = answer_question("資格考何時申請", [], {}, should_not_run)
        self.assertEqual(result["answer_status"], "insufficient_evidence")
        self.assertEqual(result["citations"], [])

    def test_returns_programmatic_citation_for_model_answer(self):
        result = answer_question("最晚何時送所辦", [self.chunk], {"doc-1": "修課計畫"}, lambda _prompt: "第一年第一學期結束前送所辦。")
        self.assertEqual(result["answer_status"], "supported")
        self.assertEqual(result["retrieved_chunk_ids"], ["ready-1"])
        self.assertEqual(result["citations"][0]["source_url"], "https://example.edu/form")
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_answering.py -v`

Expected: FAIL with `ModuleNotFoundError: No module named 'answering'`.

- [ ] **Step 3: Implement the minimal answer module**

```python
from __future__ import annotations

from typing import Callable

from retrieval import build_citations

MODEL_NAME = "qwen3:8b"


def _prompt(question: str, chunks: list[dict]) -> str:
    evidence = "\n\n".join(f"[{chunk['chunk_id']}] {chunk['chunk_text']}" for chunk in chunks)
    return f"只根據下列證據以繁體中文回答。沒有證據不可補造。\n\n證據：\n{evidence}\n\n問題：{question}"


def _ollama_generate(prompt: str) -> str:
    import ollama
    response = ollama.chat(model=MODEL_NAME, messages=[{"role": "user", "content": prompt}])
    return response["message"]["content"].strip()


def answer_question(question: str, chunks: list[dict], title_by_document: dict[str, str], generate: Callable[[str], str] | None = None) -> dict:
    if not chunks:
        return {
            "answer": "目前語料沒有足夠證據回答此問題。",
            "answer_status": "insufficient_evidence",
            "retrieved_chunk_ids": [], "citations": [],
            "limitations": "請補蒐集與問題直接相關的規章、公告或聯絡資訊頁。",
        }
    answer = (generate or _ollama_generate)(_prompt(question, chunks))
    return {
        "answer": answer, "answer_status": "supported",
        "retrieved_chunk_ids": [chunk["chunk_id"] for chunk in chunks],
        "citations": build_citations(chunks, title_by_document),
        "limitations": "回答僅根據列出的 chunks；請以引用來源與蒐集時間核對最新規定。",
    }
```

- [ ] **Step 4: Run the answer tests to verify they pass**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_answering.py -v`

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit**

```bash
git add team-02-project/rag/answering.py team-02-project/rag/tests/test_answering.py
git commit -m "feat: add evidence-bound Ollama answers"
```

## Task 3: Add append-only query logging

**Files:**
- Create: `team-02-project/rag/query_log.py`
- Create: `team-02-project/rag/tests/test_query_log.py`

**Interfaces:**
- Produces: `append_query_log(project_root: Path, question: str, result: dict, notes: str = "") -> dict`
- Appends one JSON line to `feedback/query_log.jsonl`.

- [ ] **Step 1: Write the failing query-log test**

```python
from pathlib import Path
import json
import tempfile
import unittest

from query_log import append_query_log


class QueryLogTests(unittest.TestCase):
    def test_appends_required_feedback_event(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            event = append_query_log(root, "最晚何時送所辦", {
                "answer_status": "supported", "retrieved_chunk_ids": ["ready-1"],
            })
            saved = json.loads((root / "feedback" / "query_log.jsonl").read_text(encoding="utf-8"))
        self.assertEqual(event["question"], "最晚何時送所辦")
        self.assertEqual(saved["cited_chunk_ids"], ["ready-1"])
        self.assertIsNone(saved["user_feedback"])
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_query_log.py -v`

Expected: FAIL with `ModuleNotFoundError: No module named 'query_log'`.

- [ ] **Step 3: Implement the minimal query logger**

```python
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


def append_query_log(project_root: Path, question: str, result: dict, notes: str = "") -> dict:
    event = {
        "query_id": f"query-{uuid4().hex[:12]}",
        "asked_at": datetime.now(timezone.utc).isoformat(),
        "question": question,
        "answer_status": result["answer_status"],
        "cited_chunk_ids": result["retrieved_chunk_ids"],
        "user_feedback": None,
        "notes": notes,
    }
    path = project_root / "feedback" / "query_log.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False) + "\n")
    return event
```

- [ ] **Step 4: Run the query-log test to verify it passes**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_query_log.py -v`

Expected: PASS with 1 test.

- [ ] **Step 5: Commit**

```bash
git add team-02-project/rag/query_log.py team-02-project/rag/tests/test_query_log.py
git commit -m "feat: log RAG query events"
```

## Task 4: Build the Streamlit interface and dependency contract

**Files:**
- Create: `team-02-project/rag/app.py`
- Create: `team-02-project/rag/requirements.txt`
- Create: `team-02-project/rag/tests/test_app_contract.py`
- Modify: `team-02-project/rag/README.md`

**Interfaces:**
- Consumes: `load_ready_chunks()`, `retrieve_chunks()`, `answer_question()`, `append_query_log()`.
- Produces: a browser UI with question input, answer, citations, limitations and run instructions.

- [ ] **Step 1: Write a failing import check for the app contract**

```python
from pathlib import Path
import unittest


class AppContractTests(unittest.TestCase):
    def test_app_declares_local_model_and_query_log(self):
        source = Path("app.py").read_text(encoding="utf-8")
        self.assertIn("from answering import MODEL_NAME, answer_question", source)
        self.assertIn("append_query_log(PROJECT_ROOT, question, result)", source)
        self.assertIn("st.chat_input", source)
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_app_contract.py -v`

Expected: FAIL with `FileNotFoundError` because `app.py` does not exist.

- [ ] **Step 3: Implement `app.py` and dependencies**

```python
from pathlib import Path
import streamlit as st

from answering import MODEL_NAME, answer_question
from query_log import append_query_log
from retrieval import load_ready_chunks, retrieve_chunks

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TITLE_BY_DOCUMENT = {"tve-003-course-plan-docx": "1-1 博士生修課計畫"}


def run_query(question: str) -> dict:
    chunks = load_ready_chunks(PROJECT_ROOT)
    matches = retrieve_chunks(question, chunks)
    result = answer_question(question, matches, TITLE_BY_DOCUMENT)
    append_query_log(PROJECT_ROOT, question, result)
    return result


def main() -> None:
    st.set_page_config(page_title="校務文本問答助手", page_icon="📚")
    st.title("校務文本問答助手")
    st.caption(f"本機模型：{MODEL_NAME}｜僅依已蒐集且通過品質檢查的文件回答")
    question = st.chat_input("例如：最晚何時送所辦？")
    if question:
        try:
            result = run_query(question)
        except Exception as error:
            st.error(f"無法完成模型回答：{error}。請確認 Ollama 已啟動且已下載 {MODEL_NAME}。")
            return
        st.write(result["answer"])
        st.caption(f"狀態：{result['answer_status']}")
        for citation in result["citations"]:
            st.markdown(f"- [{citation['document_name']}]({citation['source_url']})｜{citation['page_or_anchor']}｜蒐集：{citation['crawled_at']}")
        st.info(f"限制：{result['limitations']}")


if __name__ == "__main__":
    main()
```

```text
# requirements.txt
streamlit
ollama
```

Update `rag/README.md` with these exact commands:

```bash
ollama pull qwen3:8b
ollama serve
python3 -m pip install -r rag/requirements.txt
streamlit run rag/app.py
```

- [ ] **Step 4: Run app contract and syntax tests**

Run: `cd team-02-project/rag && python3 -m unittest tests/test_app_contract.py -v && python3 -m py_compile app.py retrieval.py answering.py query_log.py`

Expected: PASS with 1 test and no syntax errors.

- [ ] **Step 5: Commit**

```bash
git add team-02-project/rag/app.py team-02-project/rag/requirements.txt team-02-project/rag/README.md team-02-project/rag/tests/test_app_contract.py
git commit -m "feat: add Streamlit RAG chat interface"
```

## Task 5: Update Day-03 teaching instructions and run end-to-end tests

**Files:**
- Modify: `README.md`
- Modify: `prd/generative-ai-text-analysis-prd.md`
- Modify: `sdd/generative-ai-text-analysis-sdd.md`
- Modify: `prompts/04-build-cited-rag.md`
- Modify: `prompts/05-analyze-query-feedback.md`
- Modify: `exercises/04-cited-rag-qa.md`
- Modify: `exercises/05-feedback-to-improvement.md`

**Interfaces:**
- Documents the exact prerequisites and `streamlit run rag/app.py` command.
- Changes Day-04 output from static test answers to a browser interface plus `feedback/query_log.jsonl`.

- [ ] **Step 1: Write failing content-contract checks**

```bash
rg -q 'Ollama' README.md
rg -q 'qwen3:8b' README.md
rg -q 'streamlit run rag/app.py' prompts/04-build-cited-rag.md
rg -q 'feedback/query_log.jsonl' prompts/05-analyze-query-feedback.md
```

- [ ] **Step 2: Run checks to verify at least one fails**

Run: `rg -q 'Ollama' README.md && rg -q 'streamlit run rag/app.py' prompts/04-build-cited-rag.md`

Expected: non-zero exit because the course does not yet document the local chatbot.

- [ ] **Step 3: Update teaching documents**

Add the following learner-facing requirements:

```text
所有學員課前安裝 Ollama，並執行 `ollama pull qwen3:8b`。第 04 步完成後，以 `streamlit run rag/app.py` 開啟本機網頁；測試支持性回答、聯絡資訊不足、語料範圍外與規定是否過期四種問題。每次提問必須追加至 `feedback/query_log.jsonl`，供第 05 步使用。
```

- [ ] **Step 4: Run all tests and content checks**

Run:

```bash
cd team-02-project/rag && python3 -m unittest discover -s tests -v
cd /path/to/course/day-03 && rg -q 'Ollama' README.md && rg -q 'qwen3:8b' README.md && rg -q 'streamlit run rag/app.py' prompts/04-build-cited-rag.md && rg -q 'feedback/query_log.jsonl' prompts/05-analyze-query-feedback.md
```

Expected: all unit tests PASS and every content check exits 0. If Ollama is unavailable, additionally verify the explicit UI error message with `ollama` absent; defer the actual model-generation smoke test until Ollama is installed.

- [ ] **Step 5: Commit**

```bash
git add README.md prd sdd prompts exercises team-02-project/rag
git commit -m "docs: teach local Ollama RAG chatbot workflow"
```
