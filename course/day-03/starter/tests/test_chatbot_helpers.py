import unittest


class ChatbotHelpersTest(unittest.TestCase):
    def test_answer_evidence_prefers_directly_named_form(self):
        from rag.chatbot_helpers import answer_evidence

        ranked = [
            (0.65, {"section": "1-1 博士生修課計畫（DOCX）｜備註與送件期限"}),
            (0.62, {"section": "1-2 博士生論文指導同意書（DOCX）｜備註與送件期限"}),
        ]

        self.assertEqual(answer_evidence("博士生修課計畫最晚何時送交所辦？", ranked), [ranked[0]])

    def test_history_summary_counts_statuses_and_average_latency(self):
        from rag.chatbot_helpers import history_summary

        result = history_summary(
            [
                {"answer_status": "answered", "latency_seconds": 2.0},
                {"answer_status": "insufficient_evidence", "latency_seconds": 4.0},
            ]
        )

        self.assertEqual(result, {"total": 2, "answered": 1, "insufficient": 1, "average_latency": 3.0})

    def test_group_conversations_groups_turns_and_wraps_legacy_row(self):
        from rag.chatbot_helpers import group_conversations

        rows = [
            {
                "conversation_id": "c-1",
                "conversation_started_at": "2026-07-29T01:00:00+00:00",
                "conversation_title": "修課計畫期限",
                "turn_index": 1,
                "asked_at": "2026-07-29T01:00:01+00:00",
                "question": "第一題",
                "answer_status": "answered",
                "latency_seconds": 1.0,
            },
            {
                "conversation_id": "c-1",
                "conversation_started_at": "2026-07-29T01:00:00+00:00",
                "conversation_title": "修課計畫期限",
                "turn_index": 2,
                "asked_at": "2026-07-29T01:00:02+00:00",
                "question": "第二題",
                "answer_status": "answered",
                "latency_seconds": 3.0,
            },
            {
                "query_id": "q-legacy",
                "asked_at": "2026-07-28T01:00:00+00:00",
                "question": "舊問題",
                "answer_status": "insufficient_evidence",
                "latency_seconds": 2.0,
            },
        ]

        conversations = group_conversations(rows)

        self.assertEqual(len(conversations), 2)
        self.assertEqual(conversations[0]["turn_count"], 2)
        self.assertEqual(conversations[0]["average_latency"], 2.0)
        self.assertEqual(conversations[1]["turn_count"], 1)
        self.assertTrue(conversations[1]["conversation_id"].startswith("legacy-q-legacy"))

    def test_group_conversations_derives_main_topic_from_all_turns(self):
        from rag.chatbot_helpers import group_conversations

        conversations = group_conversations(
            [
                {"conversation_id": "c-master", "conversation_started_at": "2026-07-29T01:00:00+00:00", "conversation_title": "第一題", "turn_index": 1, "question": "115 學年度碩士班畢業至少需要幾學分？", "answer_status": "answered"},
                {"conversation_id": "c-master", "conversation_started_at": "2026-07-29T01:00:00+00:00", "conversation_title": "第一題", "turn_index": 2, "question": "111 學年度前入學的碩士班英文畢業門檻是什麼？", "answer_status": "answered"},
            ]
        )

        self.assertEqual(conversations[0]["main_topic"], "碩士班｜畢業學分、英文門檻")

    def test_direct_evidence_answer_uses_unique_named_document(self):
        from rag.chatbot_helpers import direct_evidence_answer

        ranked = [
            (
                0.70,
                {
                    "section": "1-1 博士生修課計畫（DOCX）｜備註與送件期限",
                    "text": "博士生修課計畫應於第一年第一學期結束前送交所辦。請確認文件完整。",
                    "source_type": "DOCX",
                },
            ),
            (0.68, {"section": "1-2 博士生論文指導同意書（DOCX）", "text": "不同期限。", "source_type": "DOCX"}),
        ]

        result = direct_evidence_answer("博士生修課計畫最晚何時送交所辦？", ranked)

        self.assertIsNotNone(result)
        self.assertEqual(result[0], "博士生修課計畫應於第一年第一學期結束前送交所辦。")
        self.assertEqual(result[1], ranked[0])

    def test_direct_evidence_answer_rejects_ambiguous_document_matches(self):
        from rag.chatbot_helpers import direct_evidence_answer

        ranked = [
            (0.70, {"section": "博士生修業流程", "text": "表單清單。", "source_type": "HTML"}),
            (0.68, {"section": "其他頁面", "text": "其他內容。"}),
        ]

        self.assertIsNone(direct_evidence_answer("博士生修業流程列出哪些表單？", ranked))

    def test_direct_evidence_answer_uses_master_credit_rule_without_model(self):
        from rag.chatbot_helpers import direct_evidence_answer

        ranked = [
            (
                0.62,
                {
                    "document_id": "tve-master-manual-115",
                    "section": "115 學年度碩士班研究生手冊｜課程流程圖與最低畢業學分",
                    "academic_year": "115 學年度",
                    "text": "最低畢學分:39學分【必修9學分；選修30學分】。",
                    "source_type": "DOCX",
                },
            )
        ]

        result = direct_evidence_answer("115 學年度碩士班畢業至少需要幾學分？", ranked)

        self.assertEqual(result[0], "依115 學年度：畢業前至少需修畢39學分；必修9學分，選修30學分。")
        self.assertEqual(result[1], ranked[0])

    def test_direct_evidence_answer_uses_year_scoped_english_rules_without_model(self):
        from rag.chatbot_helpers import direct_evidence_answer

        pre_111 = [
            (0.79, {"document_id": "yuntech-english-requirement", "academic_year": "111 學年度前入學", "text": "新多益(NEW TOEIC)測驗成績550分以上。", "source_type": "HTML"})
        ]
        post_112 = [
            (0.83, {"document_id": "yuntech-english-requirement", "academic_year": "112 學年度後入學", "text": "112學年度以後入學的學生請洽各系(所)辦公室確認貴系所是否有畢業門檻。", "source_type": "HTML"})
        ]

        self.assertIn("TOEIC 550", direct_evidence_answer("111 學年度前入學的碩士班英文畢業門檻是什麼？", pre_111)[0])
        answer, _ = direct_evidence_answer("112 學年度後入學的英文門檻適用什麼規定？", post_112)
        self.assertIn("洽各系(所)辦公室確認", answer)
        self.assertNotIn("TOEIC", answer)

    def test_direct_evidence_answer_uses_calendar_year_and_date_without_model(self):
        from rag.chatbot_helpers import direct_evidence_answer

        ranked = [
            (
                0.81,
                {
                    "document_id": "yuntech-calendar-115-1",
                    "academic_year": "115 學年度第 1 學期",
                    "text": "9月18日 全校加退選截止。",
                    "source_type": "PDF",
                },
            )
        ]

        answer, _ = direct_evidence_answer("115-1 加退選何時截止？", ranked)
        self.assertIn("115 學年度第 1 學期", answer)
        self.assertIn("9月18日", answer)

    def test_suggested_questions_match_the_loaded_data_source(self):
        from rag.chatbot_helpers import suggested_questions

        sample_questions = suggested_questions("健康檢查 sample-data")
        demo_questions = suggested_questions("雲科大技職所碩士班 115 學年度公開文件示範資料")

        self.assertIn("sample-data 的用途是什麼？", sample_questions)
        self.assertNotIn("115 學年度碩士班畢業至少需要幾學分？", sample_questions)
        self.assertIn("115 學年度碩士班畢業至少需要幾學分？", demo_questions)
