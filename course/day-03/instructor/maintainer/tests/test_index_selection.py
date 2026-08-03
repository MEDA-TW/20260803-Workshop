import tempfile
import unittest
from pathlib import Path


class IndexSelectionTest(unittest.TestCase):
    def test_student_chunks_exclude_instructor_demo_files(self):
        from scripts.build_index import select_chunk_files

        with tempfile.TemporaryDirectory() as temporary_directory:
            data_directory = Path(temporary_directory)
            (data_directory / "tve-yuntech-master-demo.chunks.jsonl").write_text("{}\n", encoding="utf-8")
            (data_directory / "tve-yuntech-live.chunks.jsonl").write_text("{}\n", encoding="utf-8")
            student_file = data_directory / "my-course-rules.chunks.jsonl"
            student_file.write_text("{}\n", encoding="utf-8")

            self.assertEqual(select_chunk_files(data_directory), [student_file])


if __name__ == "__main__":
    unittest.main()
