from __future__ import annotations

import json
import math
import time
import uuid
from datetime import datetime, timezone
from html import escape
from pathlib import Path

import ollama
import streamlit as st

from chatbot_helpers import answer_evidence, conversation_summary, direct_evidence_answer, group_conversations

DEMO_ROOT = Path(__file__).resolve().parent
DEMO_DATA = DEMO_ROOT / "data" / "processed"
LOG_PATH = DEMO_ROOT / "feedback" / "query_log.jsonl"
EMBED_MODEL = "nomic-embed-text-v2-moe"
CHAT_MODEL = "qwen2.5:3b"


def load_index() -> tuple[list[dict], str]:
    index_file = DEMO_DATA / "vector_index.jsonl"
    rows = [json.loads(line) for line in index_file.read_text(encoding="utf-8").splitlines() if line.strip()]
    if any(row.get("document_id") == "tve-master-manual-115" for row in rows):
        return rows, "雲科大技職所碩士班 115 學年度公開文件示範資料"
    if any(row.get("document_id") == "tve-services-20260729" for row in rows):
        return rows, "雲科大技職所公開文件示範資料"
    return rows, "講師 Demo 資料"


def cosine(left: list[float], right: list[float]) -> float:
    numerator = sum(a * b for a, b in zip(left, right))
    denominator = math.sqrt(sum(a * a for a in left)) * math.sqrt(sum(b * b for b in right))
    return numerator / denominator if denominator else 0.0


def model_available(requested: str, installed: set[str]) -> bool:
    return any(model == requested or model.split(":", 1)[0] == requested for model in installed)


def append_log(record: dict) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def read_history() -> list[dict]:
    if not LOG_PATH.exists():
        return []
    return [json.loads(line) for line in LOG_PATH.read_text(encoding="utf-8").splitlines() if line.strip()]


def render_source_card(ranked: list[tuple[float, dict]]) -> None:
    if not ranked:
        return
    top_score, top_chunk = ranked[0]
    academic_year = top_chunk.get("academic_year")
    year_label = f" · 適用：{academic_year}" if academic_year else ""
    st.caption(
        f"來源｜{top_chunk.get('section', '未標示段落')} · "
        f"{top_chunk.get('source_type', '文件')}{year_label} · 相似度 {top_score:.3f}"
    )
    with st.expander("查看完整引用"):
        for score, chunk in ranked:
            st.markdown(
                f"- [{chunk.get('section', '未標示段落')}]({chunk.get('source_url', '')}) "
                f"· `{chunk.get('chunk_id', 'unknown')}` · {chunk.get('source_type', '文件')} "
                f"· 適用：{chunk.get('academic_year', '未標示適用年度')} · 相似度 {score:.3f} · {chunk.get('crawled_at', '未標示時間')}"
            )


def answer_mode_label(answer_mode: str) -> str:
    return {
        "fast_evidence": "快速回答",
        "model_summary": "模型整理",
        "insufficient_evidence": "資料不足",
    }.get(answer_mode, "系統訊息")


def render_chat_message(message: dict) -> None:
    """Render one message immediately so a submitted question is visible during retrieval."""
    role_class = "chat-user" if message["role"] == "user" else "chat-assistant"
    content = escape(message["content"]).replace("\n", "<br>")
    st.markdown(f'<div class="chat-row {role_class}"><div class="chat-bubble">{content}</div></div>', unsafe_allow_html=True)
    if message["role"] == "assistant":
        st.caption(f"{answer_mode_label(message.get('answer_mode', ''))} · {message.get('latency_seconds', 0):.1f} 秒")
        render_source_card(message.get("citations", []))


def start_new_conversation() -> None:
    st.session_state.conversation_id = str(uuid.uuid4())
    st.session_state.conversation_started_at = datetime.now(timezone.utc).isoformat()
    st.session_state.conversation_title = "新對話"
    st.session_state.chat_messages = []


def ask(question: str, chunks: list[dict]) -> dict:
    started_at = time.perf_counter()
    with st.status("正在檢索資料…", expanded=False) as progress:
        query_vector = ollama.embed(model=EMBED_MODEL, input=question, keep_alive=0)["embeddings"][0]
        ranked = sorted(
            ((cosine(query_vector, chunk["embedding"]), chunk) for chunk in chunks),
            reverse=True,
            key=lambda item: item[0],
        )[:3]
        fast_result = direct_evidence_answer(question, ranked)
        if fast_result:
            answer, primary = fast_result
            ranked = [primary] + [item for item in ranked if item != primary]
            status = "answered"
            answer_mode = "fast_evidence"
            progress.update(label="已依明確來源快速回答", state="complete")
        elif ranked and ranked[0][0] >= 0.35:
            progress.update(label="正在依來源組織回答…")
            evidence = answer_evidence(question, ranked)
            context = "\n\n".join(
                f"[{chunk['chunk_id']}] 適用年度：{chunk.get('academic_year', '未標示適用年度')}\n{chunk['text']}"
                for _, chunk in evidence
            )
            prompt = f"""你是嚴謹的校務文件問答助手。只可根據下方來源，以繁體中文直接回答。

規則：
1. 清單問題以最多六個條列回答；其他問題用一段短答。
2. 不寒暄、不重述問題、不猜測，也不編造日期、規定或表單。
3. 不要自行加入引用格式；介面會顯示來源。
4. 若來源標示適用年度，第一句必須先說「依＿＿＿」並使用該年度規則；不得混用不同年度的規定。
5. 若來源標示「112 學年度後入學」或內容要求洽各系所確認，只能說明須向系所確認，不得附帶 111 學年度前的數值門檻。
6. 回答限 140 個中文字；資料不足時只回答 insufficient_evidence。

來源：
{context}

問題：{question}"""
            answer = ollama.chat(
                model=CHAT_MODEL,
                messages=[{"role": "user", "content": prompt}],
                options={"temperature": 0, "num_predict": 160, "num_ctx": 2048},
                keep_alive=0,
            )["message"]["content"]
            status = "answered"
            answer_mode = "model_summary"
            progress.update(label="回答完成", state="complete")
        else:
            answer = "insufficient_evidence：目前資料沒有足夠證據回答這個問題。"
            status = "insufficient_evidence"
            answer_mode = "insufficient_evidence"
            progress.update(label="資料不足，未呼叫回答模型", state="complete")
        citations = [chunk.get("chunk_id", "unknown") for _, chunk in ranked]
        scores = [round(score, 3) for score, _ in ranked]
    return {
        "answer": answer,
        "answer_status": status,
        "answer_mode": answer_mode,
        "ranked": ranked,
        "cited_chunk_ids": citations,
        "retrieval_scores": scores,
        "latency_seconds": round(time.perf_counter() - started_at, 1),
    }


def render_chat_page(chunks: list[dict], data_source: str, ollama_error: str | None) -> None:
    st.title("雲科大技職所｜碩士班文件問答助手")
    st.caption(f"依本次已蒐集的公開文件回答。資料來源：{data_source}。")
    st.caption(f"目前對話：{st.session_state.conversation_title}")
    if ollama_error:
        st.warning("無法連線本機 Ollama。請確認 Ollama 已啟動，並已安裝回答與向量模型。")

    for message in st.session_state.chat_messages:
        render_chat_message(message)

    if not st.session_state.chat_messages:
        st.markdown("#### 可以先試著問")
        button_1, button_2, button_3 = st.columns(3)
        if button_1.button("115 學分規定", use_container_width=True):
            st.session_state.pending_question = "115 學年度碩士班畢業至少需要幾學分？"
        if button_2.button("英文門檻", use_container_width=True):
            st.session_state.pending_question = "111 學年度前入學的碩士班英文畢業門檻是什麼？"
        if button_3.button("112 後規定", use_container_width=True):
            st.session_state.pending_question = "112 學年度後入學的英文門檻適用什麼規定？"

    question = st.session_state.pop("pending_question", None) or st.chat_input("輸入問題")
    if question:
        turn_index = sum(message["role"] == "user" for message in st.session_state.chat_messages) + 1
        if turn_index == 1:
            st.session_state.conversation_title = question[:24]
        user_message = {"role": "user", "content": question}
        st.session_state.chat_messages.append(user_message)
        render_chat_message(user_message)
        try:
            result = ask(question, chunks)
            st.session_state.chat_messages.append(
                {
                    "role": "assistant",
                    "content": result["answer"],
                    "citations": result["ranked"],
                    "latency_seconds": result["latency_seconds"],
                    "answer_mode": result["answer_mode"],
                }
            )
            append_log(
                {
                    "conversation_id": st.session_state.conversation_id,
                    "conversation_started_at": st.session_state.conversation_started_at,
                    "conversation_title": st.session_state.conversation_title,
                    "turn_index": turn_index,
                    "query_id": datetime.now(timezone.utc).strftime("q-%Y%m%d%H%M%S"),
                    "asked_at": datetime.now(timezone.utc).isoformat(),
                    "question": question,
                    "answer": result["answer"],
                    "answer_status": result["answer_status"],
                    "answer_mode": result["answer_mode"],
                    "cited_chunk_ids": result["cited_chunk_ids"],
                    "retrieval_scores": result["retrieval_scores"],
                    "latency_seconds": result["latency_seconds"],
                    "self_test_note": "",
                }
            )
        except Exception:
            st.session_state.chat_messages.append(
                {"role": "assistant", "content": "查詢失敗：請確認本機 Ollama 與模型狀態後再試一次。", "citations": [], "latency_seconds": 0.0, "answer_mode": ""}
            )
        st.rerun()


def render_history_page(chunk_by_id: dict[str, dict]) -> None:
    rows = read_history()
    st.title("問答紀錄")
    st.caption("只保存在這台電腦的 feedback/query_log.jsonl。")
    if not rows:
        st.info("尚無問答紀錄。回到「問答」頁完成第一題測試。")
        return
    conversations = group_conversations(rows)
    summary = conversation_summary(conversations)
    metric_1, metric_2, metric_3, metric_4 = st.columns(4)
    metric_1.metric("對話數", summary["conversations"])
    metric_2.metric("總問題", summary["turns"])
    metric_3.metric("已回答", summary["answered"])
    metric_4.metric("平均秒數", f"{summary['average_latency']:.1f}")
    st.dataframe(
        [
            {
                "開始時間": conversation["started_at"],
                "主要主題": conversation["main_topic"],
                "問答數": conversation["turn_count"],
                "已回答": conversation["answered_count"],
                "平均秒數": conversation["average_latency"],
            }
            for conversation in conversations
        ],
        use_container_width=True,
        hide_index=True,
    )
    for conversation in conversations:
        label = f'{conversation["started_at"]}｜{conversation["main_topic"]}（{conversation["turn_count"]} 題）'
        with st.expander(label):
            for turn in conversation["turns"]:
                st.write(f'第 {turn["turn_index"]} 題：', turn.get("question"))
                st.write("回答：", turn.get("answer"))
                st.caption(f'{answer_mode_label(turn.get("answer_mode", ""))} · {turn.get("latency_seconds", 0):.1f} 秒')
                cited = turn.get("cited_chunk_ids", [])
                if cited:
                    primary = chunk_by_id.get(cited[0], {})
                    st.write("主要來源：", primary.get("section", cited[0]))
                    st.write("完整引用：", "、".join(cited))


st.set_page_config(page_title="文件問答助手", page_icon="💬", layout="wide")
st.markdown("""<style>
    .stApp { background: #fbfcfe; }
    [data-testid="stSidebar"] { background: #ffffff; border-right: 1px solid #e8edf3; }
    .chat-row { display: flex; width: 100%; margin: 0.55rem 0; }
    .chat-row.chat-user { justify-content: flex-end; }
    .chat-row.chat-assistant { justify-content: flex-start; }
    .chat-bubble { max-width: 78%; padding: 0.7rem 0.9rem; border-radius: 16px; line-height: 1.55; }
    .chat-user .chat-bubble { background: #dceeff; color: #153a5b; border-bottom-right-radius: 4px; }
    .chat-assistant .chat-bubble { background: #ffffff; border: 1px solid #e3eaf2; color: #1d2939; border-bottom-left-radius: 4px; }
</style>""", unsafe_allow_html=True)
chunks, data_source = load_index()
chunk_by_id = {chunk.get("chunk_id", ""): chunk for chunk in chunks}
if "conversation_id" not in st.session_state:
    start_new_conversation()

ollama_error = None
try:
    installed_models = {item.get("model", item.get("name", "")) for item in ollama.list()["models"]}
except Exception as error:
    installed_models = set()
    ollama_error = str(error)

with st.sidebar:
    st.title("碩士班文件問答助手")
    st.button("＋ 開新對話", use_container_width=True, key="new_conversation_button", on_click=start_new_conversation)
    active_page = st.radio("頁面", ["問答", "問答紀錄"], label_visibility="collapsed")
    st.caption("Day 03｜本機 RAG 課程成果")
    with st.expander("系統狀態"):
        st.write("Ollama 服務：", "✅ 可用" if not ollama_error else "❌ 無法連線")
        st.write("回答模型：", "✅" if model_available(CHAT_MODEL, installed_models) else "❌", CHAT_MODEL)
        st.write("向量模型：", "✅" if model_available(EMBED_MODEL, installed_models) else "❌", EMBED_MODEL)
        st.write("可檢索 chunks：", len(chunks))

if active_page == "問答":
    render_chat_page(chunks, data_source, ollama_error)
else:
    render_history_page(chunk_by_id)
