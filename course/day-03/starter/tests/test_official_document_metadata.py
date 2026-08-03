import hashlib
import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXPECTED_SOURCES = {
    'tve-masters-process': 'data/raw/tve-masters-process/tve-masters-process.html',
    'tve-115-graduate-handbook': 'data/raw/tve-115-graduate-handbook/115研究生手冊.docx',
    'lc-english-graduation-threshold': 'data/raw/lc-english-graduation-threshold/lc-english-graduation-threshold.html',
    'aax-115-1-calendar': 'data/raw/aax-115-1-calendar/115學年第1學期行事曆.pdf',
}


class StudentSourcePackageTest(unittest.TestCase):
    def test_starter_ships_four_traceable_raw_documents(self):
        manifest = ROOT / 'data' / 'manifests' / 'crawl_manifest.jsonl'
        rows = [json.loads(line) for line in manifest.read_text(encoding='utf-8').splitlines() if line.strip()]
        self.assertEqual({row['document_id'] for row in rows}, set(EXPECTED_SOURCES))
        self.assertEqual(len(rows), 4)
        for row in rows:
            raw_path = ROOT / row['raw_path']
            self.assertEqual(row['raw_path'], EXPECTED_SOURCES[row['document_id']])
            self.assertTrue(raw_path.is_file())
            self.assertGreater(raw_path.stat().st_size, 0)
            self.assertEqual(hashlib.sha256(raw_path.read_bytes()).hexdigest(), row['sha256'])

    def test_starter_does_not_ship_derived_index_or_answer_history(self):
        self.assertFalse((ROOT / 'data' / 'processed' / 'vector_index.jsonl').exists())
        self.assertFalse((ROOT / 'feedback' / 'query_log.jsonl').exists())

    def test_student_app_starts_as_a_codex_building_prompt(self):
        app = (ROOT / 'rag' / 'app.py').read_text(encoding='utf-8')
        self.assertIn('STUDENT_GUIDE.md', app)
        self.assertNotIn('import streamlit', app)


if __name__ == '__main__':
    unittest.main()
