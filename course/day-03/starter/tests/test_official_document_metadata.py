import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class StudentStarterBaselineTest(unittest.TestCase):
    def test_starter_does_not_ship_prebuilt_school_documents_or_index(self):
        prebuilt_outputs = [
            ROOT / "data" / "raw" / "tve-115-graduate-handbook.docx",
            ROOT / "data" / "markdown" / "tve-115-graduate-handbook.md",
            ROOT / "data" / "processed" / "official-documents.chunks.jsonl",
            ROOT / "data" / "processed" / "vector_index.jsonl",
        ]

        self.assertTrue(all(not output.exists() for output in prebuilt_outputs))

    def test_student_app_starts_as_a_codex_building_prompt(self):
        app = (ROOT / "rag" / "app.py").read_text(encoding="utf-8")

        self.assertIn("STUDENT_GUIDE.md", app)
        self.assertNotIn("import streamlit", app)


if __name__ == "__main__":
    unittest.main()
