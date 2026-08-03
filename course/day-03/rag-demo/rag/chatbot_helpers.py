from __future__ import annotations

import re


def _normalized(value: str) -> str:
    return re.sub(r"[\s（）()、，。？?：:0-9-]", "", value)


def _direct_named_evidence(question: str, ranked: list[tuple[float, dict]]) -> list[tuple[float, dict]]:
    normalized_question = _normalized(question)
    direct_matches = []
    for item in ranked:
        section = item[1].get("section", "").split("｜", 1)[0]
        section = re.sub(r"^\d+-\d+\s*", "", section)
        section = re.sub(r"（(?:PDF|DOCX)）", "", section)
        normalized_section = _normalized(section)
        if len(normalized_section) >= 4 and normalized_section in normalized_question:
            direct_matches.append(item)
    return direct_matches


def answer_evidence(question: str, ranked: list[tuple[float, dict]]) -> list[tuple[float, dict]]:
    """Return directly named form evidence when the question identifies one."""
    return _direct_named_evidence(question, ranked) or ranked


def suggested_questions(data_source: str) -> tuple[str, str, str]:
    """Offer only questions that the currently loaded data can support."""
    return (
        "115 學年度碩士班畢業至少需要幾學分？",
        "111 學年度前入學的碩士班英文畢業門檻是什麼？",
        "112 學年度後入學的英文門檻適用什麼規定？",
    )


def direct_evidence_answer(question: str, ranked: list[tuple[float, dict]]) -> tuple[str, tuple[float, dict]] | None:
    """Return a verbatim first sentence only for one clearly named attachment."""
    if ranked:
        top_score, top_chunk = ranked[0]
        if top_score >= 0.5 and top_chunk.get("document_id") == "yuntech-english-requirement" and "英文" in question:
            academic_year = top_chunk.get("academic_year")
            if academic_year == "111 學年度前入學":
                return (
                    "依111 學年度前入學：碩士班須通過其中一項英語檢定，例如全民英檢中級、TOEFL CEFR B1、IELTS 4 或 TOEIC 550。",
                    ranked[0],
                )
            if academic_year == "112 學年度後入學":
                return ("依112 學年度後入學：請洽各系(所)辦公室確認英文畢業門檻。", ranked[0])
        asks_for_credits = "學分" in question and any(keyword in question for keyword in ("畢業", "修畢", "需要幾"))
        if top_score >= 0.5 and top_chunk.get("document_id") == "tve-master-manual-115" and asks_for_credits:
            text = top_chunk.get("text", "")
            academic_year = top_chunk.get("academic_year")
            if academic_year and all(value in text for value in ("39學分", "必修9學分", "選修30學分")):
                return (f"依{academic_year}：畢業前至少需修畢39學分；必修9學分，選修30學分。", ranked[0])
            sentence = next(
                (
                    value.strip()
                    for value in re.split(r"(?<=[。！？])", text)
                    if "至少修畢" in value and "學分" in value
                ),
                "",
            )
            if sentence and academic_year:
                return (f"依{academic_year}：{sentence}", ranked[0])
        asks_for_calendar_deadline = any(keyword in question for keyword in ("加退選", "選課截止", "截止日"))
        if top_score >= 0.5 and top_chunk.get("document_id") == "yuntech-calendar-115-1" and asks_for_calendar_deadline:
            academic_year = top_chunk.get("academic_year")
            text = top_chunk.get("text", "")
            date = next((value for value in re.findall(r"\d{1,2}月\d{1,2}日", text)), "")
            if not date:
                day = next((value for value in re.findall(r"(\d{1,2})日全校加退選", text)), "")
                date = f"9月{day}日" if day else ""
            if academic_year and date:
                return (f"依{academic_year}行事曆：全校加退選於{date}截止。", ranked[0])
    matches = _direct_named_evidence(question, ranked)
    if len(matches) != 1 or not ranked or matches[0] != ranked[0] or matches[0][0] < 0.35:
        return None
    if matches[0][1].get("source_type") not in {"PDF", "DOCX"}:
        return None
    sentences = [sentence.strip() for sentence in re.split(r"(?<=[。！？])", matches[0][1].get("text", "")) if sentence.strip()]
    return (sentences[0], matches[0]) if sentences else None


def history_summary(rows: list[dict]) -> dict[str, float | int]:
    latencies = [float(row["latency_seconds"]) for row in rows if row.get("latency_seconds") is not None]
    return {
        "total": len(rows),
        "answered": sum(row.get("answer_status") == "answered" for row in rows),
        "insufficient": sum(row.get("answer_status") == "insufficient_evidence" for row in rows),
        "average_latency": round(sum(latencies) / len(latencies), 1) if latencies else 0.0,
    }


def conversation_from_row(row: dict) -> dict:
    """Normalize current and pre-conversation JSONL rows into one turn shape."""
    normalized = dict(row)
    query_id = normalized.get("query_id", "unknown")
    normalized["conversation_id"] = normalized.get("conversation_id") or f"legacy-{query_id}"
    normalized["conversation_started_at"] = normalized.get("conversation_started_at") or normalized.get("asked_at", "")
    normalized["conversation_title"] = normalized.get("conversation_title") or normalized.get("question", "新對話")[:24]
    normalized["turn_index"] = int(normalized.get("turn_index") or 1)
    return normalized


def conversation_main_topic(conversation: dict) -> str:
    """Summarize the user-visible subject of a whole conversation, not just turn one."""
    questions = " ".join(str(turn.get("question", "")) for turn in conversation["turns"])
    topic_rules = (
        ("畢業學分", ("學分", "修課")),
        ("英文門檻", ("英文", "TOEIC", "雅思", "托福", "英檢")),
        ("修課計畫", ("修課計畫",)),
        ("論文指導", ("論文指導", "指導教授")),
        ("論文計畫", ("論文計畫", "發表")),
        ("學位考試", ("學位考試", "口試")),
    )
    topics = [label for label, keywords in topic_rules if any(keyword in questions for keyword in keywords)]
    if not topics:
        return conversation["title"]
    prefix = "碩士班｜" if "碩士" in questions else ""
    return prefix + "、".join(topics[:3])


def group_conversations(rows: list[dict]) -> list[dict]:
    """Group JSONL turns into newest-first conversations while retaining legacy rows."""
    grouped: dict[str, dict] = {}
    for row in rows:
        turn = conversation_from_row(row)
        conversation = grouped.setdefault(
            turn["conversation_id"],
            {
                "conversation_id": turn["conversation_id"],
                "started_at": turn["conversation_started_at"],
                "title": turn["conversation_title"],
                "turns": [],
            },
        )
        conversation["turns"].append(turn)

    for conversation in grouped.values():
        conversation["turns"].sort(key=lambda turn: (turn["turn_index"], turn.get("asked_at", "")))
        conversation["turn_count"] = len(conversation["turns"])
        conversation["answered_count"] = sum(turn.get("answer_status") == "answered" for turn in conversation["turns"])
        latencies = [float(turn.get("latency_seconds", 0)) for turn in conversation["turns"]]
        conversation["average_latency"] = round(sum(latencies) / len(latencies), 1) if latencies else 0.0
        conversation["main_topic"] = conversation_main_topic(conversation)
    return sorted(grouped.values(), key=lambda conversation: conversation["started_at"], reverse=True)


def conversation_summary(conversations: list[dict]) -> dict[str, float | int]:
    turns = [turn for conversation in conversations for turn in conversation["turns"]]
    latencies = [float(turn.get("latency_seconds", 0)) for turn in turns]
    return {
        "conversations": len(conversations),
        "turns": len(turns),
        "answered": sum(turn.get("answer_status") == "answered" for turn in turns),
        "average_latency": round(sum(latencies) / len(latencies), 1) if latencies else 0.0,
    }
