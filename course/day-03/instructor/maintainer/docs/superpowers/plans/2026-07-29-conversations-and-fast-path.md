# Day 03 對話歷程與快速回答 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓本機 Streamlit 文件問答助手支援左右多輪聊天、明確證據的快速回答，以及以每串對話為單位的本機問答歷程。

**Architecture:** `chatbot_helpers.py` 負責純資料轉換：產生對話 ID／標題、相容分組舊 JSONL、判定可安全快速回答的直接證據。`app.py` 保持單一 Streamlit 入口，僅負責 session state、Ollama 呼叫、頁面呈現與寫入 JSONL；後台由 helpers 的分組結果呈現一列一串對話。

**Tech Stack:** Python 3、Streamlit、Ollama（`nomic-embed-text-v2-moe`、`qwen2.5:3b`）、unittest、JSONL。

## Global Constraints

- 維持單一 `starter/rag/app.py`，不建立 Streamlit `pages/` 資料夾。
- JSONL 是本機唯一紀錄來源；不新增帳號、資料庫、雲端同步或外部服務。
- 回答仍只依公開 HTML／PDF／DOCX index 證據；資料不足時回傳 `insufficient_evidence`。
- `keep_alive=0` 維持不變，避免 embedding 與回答模型同時常駐。
- 不新增或下載任何 Ollama 模型。
- 既有未帶 `conversation_id` 的 JSONL 列須可閱讀，且各自成為一筆一輪舊對話。
- 只有使用者明確要求時才執行 Git commit 或 push。

---

### Task 1: 對話紀錄與快速證據的純函式契約

**Files:**
- Modify: `starter/rag/chatbot_helpers.py`
- Modify: `starter/tests/test_chatbot_helpers.py`

**Interfaces:**
- Consumes: JSONL row `dict`、檢索結果 `list[tuple[float, dict]]`。
- Produces: `conversation_from_row(row: dict) -> dict`、`group_conversations(rows: list[dict]) -> list[dict]`、`direct_evidence_answer(question: str, ranked: list[tuple[float, dict]]) -> tuple[str, tuple[float, dict]] | None`、`conversation_summary(conversations: list[dict]) -> dict[str, float | int]`。

- [ ] **Step 1: 寫入會失敗的分組與舊資料相容測試**

```python
def test_group_conversations_groups_new_rows_and_wraps_legacy_row(self):
    rows = [
        {"conversation_id": "c-1", "conversation_started_at": "2026-07-29T01:00:00+00:00", "conversation_title": "修課計畫期限", "turn_index": 1, "asked_at": "2026-07-29T01:00:01+00:00", "question": "第一題", "answer_status": "answered", "latency_seconds": 1.0},
        {"conversation_id": "c-1", "conversation_started_at": "2026-07-29T01:00:00+00:00", "conversation_title": "修課計畫期限", "turn_index": 2, "asked_at": "2026-07-29T01:00:02+00:00", "question": "第二題", "answer_status": "answered", "latency_seconds": 3.0},
        {"query_id": "q-legacy", "asked_at": "2026-07-28T01:00:00+00:00", "question": "舊問題", "answer_status": "insufficient_evidence", "latency_seconds": 2.0},
    ]
    conversations = group_conversations(rows)
    self.assertEqual(len(conversations), 2)
    self.assertEqual(conversations[0]["turn_count"], 2)
    self.assertEqual(conversations[1]["turn_count"], 1)
    self.assertTrue(conversations[1]["conversation_id"].startswith("legacy-q-legacy"))
```

- [ ] **Step 2: 執行測試，確認因缺少 helper 而失敗**

Run: `PYTHONPATH=starter starter/.venv/bin/python -m unittest starter.tests.test_chatbot_helpers.ChatbotHelpersTest.test_group_conversations_groups_new_rows_and_wraps_legacy_row -v`

Expected: FAIL，指出 `group_conversations` 尚未定義或無法匯入。

- [ ] **Step 3: 實作對話分組與彙總**

```python
def group_conversations(rows: list[dict]) -> list[dict]:
    grouped: dict[str, dict] = {}
    for row in rows:
        normalized = conversation_from_row(row)
        conversation = grouped.setdefault(normalized["conversation_id"], {
            "conversation_id": normalized["conversation_id"],
            "started_at": normalized["conversation_started_at"],
            "title": normalized["conversation_title"],
            "turns": [],
        })
        conversation["turns"].append(normalized)
    for conversation in grouped.values():
        conversation["turns"].sort(key=lambda item: (item["turn_index"], item.get("asked_at", "")))
        conversation["turn_count"] = len(conversation["turns"])
        conversation["answered_count"] = sum(turn.get("answer_status") == "answered" for turn in conversation["turns"])
        latencies = [float(turn.get("latency_seconds", 0)) for turn in conversation["turns"]]
        conversation["average_latency"] = round(sum(latencies) / len(latencies), 1) if latencies else 0.0
    return sorted(grouped.values(), key=lambda item: item["started_at"], reverse=True)
```

`conversation_from_row` 對新列保留既有欄位，為舊列補上 `conversation_id=f"legacy-{query_id}"`、`conversation_started_at=asked_at`、`conversation_title=question[:24]` 與 `turn_index=1`。`conversation_summary` 回傳 `conversations`、`turns`、`answered` 和 `average_latency`。

- [ ] **Step 4: 寫入會失敗的直接證據測試**

```python
def test_direct_evidence_answer_uses_only_named_document(self):
    ranked = [
        (0.70, {"section": "1-1 博士生修課計畫（DOCX）｜備註與送件期限", "text": "博士生修課計畫應於第一年第一學期結束前送交所辦。"}),
        (0.68, {"section": "1-2 博士生論文指導同意書（DOCX）", "text": "不同期限。"}),
    ]
    result = direct_evidence_answer("博士生修課計畫最晚何時送交所辦？", ranked)
    self.assertEqual(result[0], "博士生修課計畫應於第一年第一學期結束前送交所辦。")
```

- [ ] **Step 5: 實作最小快速回答判定**

```python
def direct_evidence_answer(question: str, ranked: list[tuple[float, dict]]) -> tuple[str, tuple[float, dict]] | None:
    evidence = answer_evidence(question, ranked)
    if len(evidence) != 1:
        return None
    score, chunk = evidence[0]
    if score < 0.35 or evidence[0] != ranked[0]:
        return None
    sentences = [part.strip() for part in re.split(r"(?<=[。！？])", chunk.get("text", "")) if part.strip()]
    return (sentences[0], evidence[0]) if sentences else None
```

這個最小規則只接受「問題明確命中且第一名為唯一同名文件」的來源，否則回傳 `None` 讓呼叫端走模型整理；不得從 chunk 內容推導新日期或規定。

- [ ] **Step 6: 執行完整 helper 測試**

Run: `PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests -v`

Expected: PASS，包含原有引用／摘要測試及新的對話、舊紀錄、快速證據測試。

### Task 2: 接入 Streamlit 對話 session 與混合回答流程

**Files:**
- Modify: `starter/rag/app.py`
- Test: `starter/tests/test_chatbot_helpers.py`

**Interfaces:**
- Consumes: Task 1 的 `direct_evidence_answer()`，以及 session keys `conversation_id`、`conversation_started_at`、`conversation_title`、`chat_messages`。
- Produces: 新 JSONL 列含 `conversation_id`、`conversation_started_at`、`conversation_title`、`turn_index`、`answer_mode`；`ask()` 回傳 `answer_mode`。

- [ ] **Step 1: 寫入回覆模式的 failing test**

```python
def test_history_summary_supports_fast_and_model_answer_rows(self):
    rows = [
        {"answer_status": "answered", "answer_mode": "fast_evidence", "latency_seconds": 1.0},
        {"answer_status": "answered", "answer_mode": "model_summary", "latency_seconds": 5.0},
    ]
    self.assertEqual(history_summary(rows)["answered"], 2)
```

- [ ] **Step 2: 在 `ask()` 中插入快速分支**

```python
fast_result = direct_evidence_answer(question, ranked)
if fast_result:
    answer, primary = fast_result
    ranked = [primary] + [item for item in ranked if item != primary]
    status, answer_mode = "answered", "fast_evidence"
elif ranked and ranked[0][0] >= 0.35:
    # 保留既有 answer_evidence + ollama.chat 流程
    status, answer_mode = "answered", "model_summary"
else:
    answer, status, answer_mode = "insufficient_evidence：目前資料沒有足夠證據回答這個問題。", "insufficient_evidence", "insufficient_evidence"
```

回傳資料加入 `answer_mode`。快速分支仍執行 embedding，因此只有答案模型時間被省下；`ollama.chat(..., keep_alive=0)` 保持現有參數不變。

- [ ] **Step 3: 初始化與重置目前對話**

```python
def start_new_conversation() -> None:
    st.session_state.conversation_id = str(uuid.uuid4())
    st.session_state.conversation_started_at = datetime.now(timezone.utc).isoformat()
    st.session_state.conversation_title = "新對話"
    st.session_state.chat_messages = []
```

啟動時若沒有 `conversation_id` 就呼叫此函式。側欄「＋開新對話」按鈕呼叫後 `st.rerun()`。每次提問前以 `len(user messages)+1` 計算 `turn_index`；第一題送出時才把 `conversation_title` 更新為問題前 24 個字。

- [ ] **Step 4: 將新欄位寫入 JSONL 並保留失敗行為**

```python
append_log({
    "conversation_id": st.session_state.conversation_id,
    "conversation_started_at": st.session_state.conversation_started_at,
    "conversation_title": st.session_state.conversation_title,
    "turn_index": turn_index,
    "answer_mode": result["answer_mode"],
    # 既有 query_id、asked_at、question、answer、status、citation、score、latency 欄位
})
```

僅當 `ask()` 正常回傳才寫入。Ollama 例外仍顯示修復提示，但不寫入成功形式的問答列。

- [ ] **Step 5: 執行編譯與 helper 測試**

Run: `starter/.venv/bin/python -m py_compile starter/rag/app.py starter/rag/chatbot_helpers.py && PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests -v`

Expected: PASS。

### Task 3: 左右對話介面與一列一對話後台

**Files:**
- Modify: `starter/rag/app.py`

**Interfaces:**
- Consumes: Task 1 的 `group_conversations()`、`conversation_summary()`；Task 2 的 `answer_mode` 與對話 session state。
- Produces: 首頁左右訊息泡泡、側欄新對話按鈕、後台的對話摘要表與展開明細。

- [ ] **Step 1: 將聊天訊息改為具角色 class 的容器**

```python
for message in st.session_state.chat_messages:
    role_class = "chat-user" if message["role"] == "user" else "chat-assistant"
    with st.container():
        st.markdown(f'<div class="chat-bubble {role_class}">', unsafe_allow_html=True)
        st.markdown(message["content"])
        st.markdown("</div>", unsafe_allow_html=True)
```

以 CSS 讓 `.chat-user` 為右對齊、淡藍底色，`.chat-assistant` 為左對齊、白底細框，寬度不超過 78%。助手訊息在泡泡後顯示「快速回答／模型整理」與耗時，並呼叫既有 `render_source_card()`。`st.chat_input()` 維持在頁面最底部。

- [ ] **Step 2: 呈現對話層級表格與展開詳細資料**

```python
conversations = group_conversations(read_history())
table_rows = [{
    "開始時間": item["started_at"],
    "對話標題": item["title"],
    "問答數": item["turn_count"],
    "已回答": item["answered_count"],
    "平均秒數": item["average_latency"],
} for item in conversations]
st.dataframe(table_rows, use_container_width=True, hide_index=True)
for item in conversations:
    with st.expander(f'{item["started_at"]}｜{item["title"]}（{item["turn_count"]} 題）'):
        for turn in item["turns"]:
            st.write("問題：", turn.get("question", ""))
            st.write("回答：", turn.get("answer", ""))
```

細節需顯示狀態、回答模式、耗時、主要來源與完整 chunk ID；表格排序使用開始時間由新到舊。頂端 metrics 改為「對話數／總問題／已回答／平均秒數」。

- [ ] **Step 3: 更新講師 Demo 文案**

將展示順序改成「開新對話 → 同一串問兩至三題 → 比較快速回答與模型整理 → 在問答紀錄展開該串來源」，並保留原本資料鏈與五類測試的收合資訊。

- [ ] **Step 4: 執行靜態與契約檢查**

Run: `starter/.venv/bin/python -m py_compile starter/rag/app.py starter/rag/chatbot_helpers.py && PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests -v && node maintainer/tests/verify-prompt-contracts.mjs && git diff --check`

Expected: 所有 Python 測試、編譯、提示詞契約與 diff whitespace check 通過。

### Task 4: 本機端到端驗收

**Files:**
- Modify only if a defect is found: `starter/rag/app.py` 或 `starter/rag/chatbot_helpers.py`
- Verify: `starter/feedback/query_log.jsonl`（僅本機測試所追加的紀錄）

**Interfaces:**
- Consumes: 完整本機 index、Ollama、Task 1–3 的 UI 與 JSONL 契約。
- Produces: 可重現的瀏覽器驗收證據；若產生測試紀錄，能在一列對話中看到多輪紀錄。

- [ ] **Step 1: 啟動或重啟本機 App**

Run: `starter/.venv/bin/streamlit run starter/rag/app.py --server.port 8501`

Expected: 首頁顯示「雲科大技職所｜文件問答助手」、側欄「＋開新對話」和三個頁面。

- [ ] **Step 2: 驗證快速回答與模型整理**

在新對話依序提問「博士生修課計畫最晚何時送交所辦？」與「博士生修業流程列出哪些表單？」。

Expected: 第一題標為「快速回答」並引用修課計畫文件；第二題若無唯一同名文件，標為「模型整理」並引用最多三筆來源。兩題 JSONL 的 `conversation_id` 相同、`turn_index` 分別為 1 和 2。

- [ ] **Step 3: 驗證新對話與後台分組**

按下「＋開新對話」，提問「請問 2027 年的活動日期是什麼？」後開啟「問答紀錄」。

Expected: 第二串有不同 `conversation_id`，資料不足且不呼叫回答模型；表格有兩列，目前串各自可展開，舊 JSONL 行也各自顯示一列。

- [ ] **Step 4: 最終檢查**

Run: `git diff --check && PYTHONPATH=starter starter/.venv/bin/python -m unittest discover -s starter/tests -v`

Expected: PASS。若準備提交，僅在使用者明確要求後才依實際變更檔案精確 `git add` 與 `git commit`。
