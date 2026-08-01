import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MASTER_CHUNKS = ROOT / "instructor" / "resources" / "live-demo" / "data" / "processed" / "tve-yuntech-master-demo.chunks.jsonl"


class MasterDemoDataTest(unittest.TestCase):
    def test_master_demo_has_year_scoped_credit_and_english_rules(self):
        rows = [json.loads(line) for line in MASTER_CHUNKS.read_text(encoding="utf-8").splitlines() if line.strip()]

        credit_rules = [row for row in rows if row.get("academic_year") == "115 學年度"]
        self.assertTrue(any("39學分" in row["text"] for row in credit_rules))
        self.assertTrue(any("必修9學分" in row["text"] and "選修30學分" in row["text"] for row in credit_rules))

        pre_111 = next(row for row in rows if row.get("academic_year") == "111 學年度前入學")
        self.assertIn("TOEIC", pre_111["text"])
        self.assertIn("550", pre_111["text"])

        post_112 = next(row for row in rows if row.get("academic_year") == "112 學年度後入學")
        self.assertIn("洽各系(所)辦公室確認", post_112["text"])
        self.assertNotIn("TOEIC", post_112["text"])


if __name__ == "__main__":
    unittest.main()
