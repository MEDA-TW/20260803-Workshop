# 課程成果聊天助手 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Day 03 的本機 RAG 原型改成首頁簡潔、具有本機問答紀錄後台的課程成果聊天助手。

**Architecture:** 維持單一 `starter/rag/app.py` 與既有 Ollama RAG 流程，新增以 `st.session_state["active_page"]` 管理的側欄導航。首頁只渲染對話與主要引用；後台從既有 JSONL 紀錄計算摘要並顯示完整證據；講師 Demo 延續現有結業成果資料。

**Tech Stack:** Python 3、Streamlit、Ollama Python client、JSONL、既有 `nomic-embed-text-v2-moe` 與 `qwen2.5:3b`。

## Global Constraints

- 保持單一 `starter/rag/app.py`，不建立 Streamlit `pages/` 資料夾。
- 不新增模型或雲端 API；RAG 一律使用既有本機 Ollama 模型。
- 回答只使用檢索證據；不足證據時不呼叫 Qwen。
- 首頁不顯示 chunk 數、manifest 路徑、測試列表或 backlog。
- 每個有根據的回答須顯示主要來源，完整候選來源最多三筆。
- 問答紀錄只寫入本機 `feedback/query_log.jsonl`。

---

## File Structure

- Modify: `starter/rag/app.py` — 導航、首頁聊天、後台紀錄、講師 Demo 與既有 RAG 流程。
- Create: `starter/tests/test_chatbot_helpers.py` — 純函式的證據選擇與紀錄摘要測試。
- Modify: `starter/README.md` — 說明首頁／後台與啟動方式。

### Task 1: 抽出可測試的聊天資料輔助函式

**Files:**
- Create: `starter/rag/chatbot_helpers.py`
- Create: `starter/tests/test_chatbot_helpers.py`

**Interfaces:**
- Produces: `answer_evidence(question: str, ranked: list[tuple[float, dict]]) -> list[tuple[float, dict]]`
- Produces: `history_summary(rows: list[dict]) -> dict[str, float | int]`

- [ ] **Step 1: 寫失敗測試**

```python
from rag.chatbot_helpers import answer_evidence, history_summary


def test_answer_evidence_prefers_directly_named_form():
    ranked = [
        (0.65, {"section": "1-1 博士生修課計畫（DOCX）｜備註與送件期限"}),
        (0.62, {"section": "1-2 博士生論文指導同意書（DOCX）｜備註與送件期限"}),
    ]
    assert answer_evidence("博士生修課計畫最晚何時送交所辦？", ranked) == [ranked[0]]


def test_history_summary_counts_statuses_and_average_latency():
    result = history_summary([
        {"answer_status": "answered", "latency_seconds": 2.0},
        {"answer_status": "insufficient_evidence", "latency_seconds": 4.0},
    ])
    assert result == {"total": 2, "answered": 1, "insufficient": 1, "average_latency": 3.0}
```

- [ ] **Step 2: 執行測試並確認失敗**

Run: `PYTHONPATH=starter starter/.venv/bin/python -m unittest starter/tests/test_chatbot_helpers.py -v`

Expected: FAIL，因 `rag.chatbot_helpers` 尚不存在。

- [ ] **Step 3: 實作純函式**

```python
def history_summary(rows: list[dict]) -> dict[str, float | int]:
    latencies = [float(row["latency_seconds"]) for row in rows if row.get("latency_seconds") is not None]
    return {
        "total": len(rows),
        "answered": sum(row.get("answer_status") == "answered" for row in rows),
        "insufficient": sum(row.get("answer_status") == "insufficient_evidence" for row in rows),
        "average_latency": round(sum(latencies) / len(latencies), 1) if latencies else 0.0,
    }
```

`answer_evidence` 移入同檔，保留既有表單名稱直接命中規則；未直接命中時回傳原本的 `ranked`。

- [ ] **Step 4: 執行測試並確認通過**

Run: `PYTHONPATH=starter starter/.venv/bin/python -m unittest starter/tests/test_chatbot_helpers.py -v`

Expected: PASS，2 tests。

### Task 2: 建立首頁與側欄導航

**Files:**
- Modify: `starter/rag/app.py`

**Interfaces:**
- Consumes: `answer_evidence`、`history_summary`。
- Produces: `render_chat_page()`、`render_history_page()`、`render_demo_page()`。

- [ ] **Step 1: 寫入頁面選擇狀態**

在 `st.set_page_config` 後初始化 `st.session_state["active_page"] = "問答"`，並在側欄用 `st.radio("頁面", ["問答", "問答紀錄", "講師 Demo"])` 更新它。

- [ ] **Step 2: 將三個既有 tab 區塊改成三個 render 函式**

```python
if active_page == "問答":
    render_chat_page()
elif active_page == "問答紀錄":
    render_history_page()
else:
    render_demo_page()
```

首頁標題改為 `雲科大技職所｜文件問答助手`，副標固定為「依本次已蒐集的公開文件回答；每則回答均可回查來源。」

- [ ] **Step 3: 將技術健康檢查移入側欄細節區**

保留模型可用性判斷，但將模型名稱、chunk 數放進 `st.sidebar.expander("系統狀態")`。首頁只在 Ollama 無法使用時顯示一行修復提示。

- [ ] **Step 4: 檢查首頁 DOM 與視覺內容**

Run: `streamlit run rag/app.py --server.port 8501`

Expected: 首頁只有品牌列、對話、建議問題與底部輸入框；沒有 manifest、chunk 數或結業測試表。

### Task 3: 強化聊天回答與來源卡

**Files:**
- Modify: `starter/rag/app.py`

**Interfaces:**
- Consumes: `answer_evidence(question, ranked)`。
- Produces: 每則 assistant message 的主要來源列與折疊完整來源列。

- [ ] **Step 1: 以三個建議問題作為空白狀態內容**

保留既有三個問題，改成簡短按鈕文案：`修課計畫期限`、`資格考試表單`、`資料外問題`。點選後寫入 `pending_question`，交由既有 `st.chat_input` 流程處理。

- [ ] **Step 2: 主要來源改為可辨識來源卡**

回答後顯示：`來源｜<section> · <source_type> · 相似度 <score>`；完整 URL、chunk id、抓取時間放在「查看完整引用」expander。

- [ ] **Step 3: 保持速度與錯誤狀態**

保留 `st.status` 的檢索／組織回答進度及完成秒數。Ollama 錯誤時顯示「請確認 Ollama 已啟動且兩個模型存在」，不輸出例外堆疊。

- [ ] **Step 4: 實機驗收三題**

在真實資料模式測試：

```text
博士生修課計畫最晚何時送交所辦？
博士生資格考試申請可提供哪些表單？
請問 2027 年的活動日期是什麼？
```

Expected: 前兩題顯示正確主要來源；第一題回答第一年第一學期；第三題為 `insufficient_evidence`。

### Task 4: 實作問答紀錄後台與精簡講師 Demo

**Files:**
- Modify: `starter/rag/app.py`
- Modify: `starter/README.md`

**Interfaces:**
- Consumes: `history_summary(rows)`、`feedback/query_log.jsonl`。
- Produces: 本機後台統計與可展開紀錄卡。

- [ ] **Step 1: 建立後台摘要**

`render_history_page()` 讀取 JSONL 後，以四個 `st.metric` 顯示「總問題、已回答、資料不足、平均秒數」。沒有紀錄時顯示空白狀態，不產生假資料。

- [ ] **Step 2: 建立紀錄卡**

每筆以時間與狀態為標題，展開後顯示問題、回答、耗時、主要引用與完整候選引用。顯示文字限定為使用者可理解的中文標籤。

- [ ] **Step 3: 收合講師 Demo**

保留結業成果的四個指標與五類測試表；將 scope、品質、分析、backlog 放入預設收合的區塊。不要在首頁渲染這些內容。

- [ ] **Step 4: 更新 starter README**

新增「使用介面」段落，說明：問答是首頁；問答紀錄僅存在本機；講師 Demo 僅供上課展示。

- [ ] **Step 5: 執行完整驗收**

Run:

```bash
PYTHONPATH=starter starter/.venv/bin/python -m unittest starter/tests/test_chatbot_helpers.py -v
starter/.venv/bin/python -m py_compile starter/rag/app.py starter/rag/chatbot_helpers.py
node maintainer/tests/verify-prompt-contracts.mjs
git diff --check
```

Expected: 全部通過；以瀏覽器確認首頁、問答紀錄、講師 Demo 三頁均可切換。
