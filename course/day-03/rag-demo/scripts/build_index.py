from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STUDENT_DATA = ROOT / "data" / "processed"
EMBED_MODEL = "nomic-embed-text-v2-moe"
INSTRUCTOR_DEMO_FILES = {
    "tve-yuntech-live.chunks.jsonl",
    "tve-yuntech-master-demo.chunks.jsonl",
}


def read_jsonl(files: list[Path]) -> list[dict]:
    rows = []
    for file in files:
        rows.extend(json.loads(line) for line in file.read_text(encoding="utf-8").splitlines() if line.strip())
    return rows


def select_chunk_files(data_directory: Path) -> list[Path]:
    """Return only student-owned chunks; instructor Demo files live elsewhere."""
    if not data_directory.exists():
        return []
    return sorted(
        file
        for file in data_directory.rglob("*.chunks.jsonl")
        if file.name not in INSTRUCTOR_DEMO_FILES
    )


def main() -> None:
    import ollama

    student_files = select_chunk_files(STUDENT_DATA)
    files = student_files
    output = STUDENT_DATA / "vector_index.jsonl"
    chunks = read_jsonl(files)
    if not chunks:
        raise SystemExit("找不到可建立索引的 chunks；請先完成 PROMPTS.md 的提示詞 3，並確認檔案位於 data/processed/。")
    vectors = ollama.embed(
        model=EMBED_MODEL,
        input=[str(chunk.get("retrieval_text", chunk["text"])) for chunk in chunks],
        keep_alive=0,
    )["embeddings"]
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as file:
        for chunk, vector in zip(chunks, vectors):
            file.write(json.dumps({**chunk, "embedding": vector}, ensure_ascii=False) + "\n")
    print(f"已建立 {len(chunks)} 筆向量：{output}")


if __name__ == "__main__":
    main()
