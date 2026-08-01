from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "tve-yuntech-20260729"
MARKDOWN = ROOT / "data" / "markdown"
PROCESSED = ROOT / "data" / "processed"
SOURCE_URL = "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21"
DOCUMENT_ID = "tve-services-20260729"
CRAWLED_AT = "2026-07-29T12:37:26+08:00"
ATTACHMENTS = [
    {"document_id": "tve-plan-pdf-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/790_cef47f3a4a438b5787b514d312f92bf6", "source_type": "PDF", "section": "1-1 博士生修課計畫（PDF）", "markdown_file": "1-1博士生修課計畫.pdf.md"},
    {"document_id": "tve-plan-docx-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/791_f57f1dd711c4348ba59b38e30edc2fe6", "source_type": "DOCX", "section": "1-1 博士生修課計畫（DOCX）", "markdown_file": "1-1博士生修課計畫.docx.md"},
    {"document_id": "tve-advisor-agreement-pdf-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/793_c508738d6c6af02c7147585ff29ef96e", "source_type": "PDF", "section": "1-2 博士生論文指導同意書（PDF）", "markdown_file": "1-2博士生論文指導同意書.pdf.md"},
    {"document_id": "tve-advisor-agreement-docx-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/792_58b588201e0d22653c4b2e25daefce8c", "source_type": "DOCX", "section": "1-2 博士生論文指導同意書（DOCX）", "markdown_file": "1-2博士生論文指導同意書.docx.md"},
]
MASTER_ATTACHMENTS = [
    {"document_id": "tve-master-plan-pdf-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/801_ca60f39ac000d19052cf8da351198971", "source_type": "PDF", "section": "2-1 研究生修課計畫表（PDF）", "markdown_file": "2-1研究生修課計畫表.pdf.md"},
    {"document_id": "tve-master-plan-docx-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/800_e1c74cf54d44de161b0560154d815c9a", "source_type": "DOCX", "section": "2-1 研究生修課計畫表（DOCX）", "markdown_file": "2-1研究生修課計畫表.docx.md"},
    {"document_id": "tve-master-advisor-docx-20260729", "source_url": "https://tve.yuntech.edu.tw/index.php/2020-02-26-09-23-21/item/download/812_f5b2fe77fbf5ced4417774477d6f8195", "source_type": "DOCX", "section": "2-2 研究生論文指導同意書（DOCX）", "markdown_file": "2-2研究生論文指導同意書.docx.md"},
]
MASTER_MANUAL_URL = "https://tve.yuntech.edu.tw/images/%E6%9C%AC%E6%89%80%E6%B3%95%E8%A6%8F/115%E7%A0%94%E7%A9%B6%E7%94%9F%E6%89%8B%E5%86%8A.docx"
ENGLISH_REQUIREMENT_URL = "https://lc.yuntech.edu.tw/index.php/2021-07-23-07-12-23"
CALENDAR_URL = "https://aax.yuntech.edu.tw/images/content/%E8%A1%8C%E4%BA%8B%E6%9B%86/115%E5%AD%B8%E5%B9%B4%E7%AC%AC1%E5%AD%B8%E6%9C%9F%E8%A1%8C%E4%BA%8B%E6%9B%86.pdf"


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def service_text() -> str:
    """Extract only the service-content area, excluding Joomla navigation and footer."""
    source = (RAW / "services.html").read_text(encoding="utf-8", errors="replace")
    start = source.find("/ 服務連結 /")
    end = source.find("© 2025", start)
    if start < 0 or end < 0:
        raise SystemExit("找不到預期的服務內容區塊；請先人工檢查原始 HTML。")
    fragment = source[start:end]
    text = clean(re.sub(r"<[^>]+>", "\n", fragment))
    return text


def chunks(text: str) -> list[dict]:
    all_headings = list(
        re.finditer(
            r"服務名稱：\s*(0[1-9].+?)(?=\s+(?:博士生|碩士生|碩博士生|研究生)\s+服務說明：)",
            text,
        )
    )
    headings = all_headings[:4]
    rows = []
    for index, heading in enumerate(headings, start=1):
        section_start = heading.start()
        candidates = [
            position
            for position in (
                text.find("你可能會用到的服務", heading.end()),
                text.find("jQuery(", heading.end()),
                all_headings[index].start() if index < len(all_headings) else -1,
            )
            if position >= 0
        ]
        section_end = min(candidates) if candidates else len(text)
        section = text[section_start:section_end].strip()
        section = re.sub(r"\s*(業務單位：|承辦人：|分機：|E-mail：|服務名稱：)\s*", r"\n\1 ", section)
        rows.append(
            {
                "chunk_id": f"{DOCUMENT_ID}-chunk-{index:02d}",
                "document_id": DOCUMENT_ID,
                "source_url": SOURCE_URL,
                "section": clean(heading.group(1)),
                "text": section,
                "crawled_at": CRAWLED_AT,
                "source_type": "HTML",
            }
        )
    if len(rows) < 3:
        raise SystemExit(f"只取得 {len(rows)} 個服務段落，停止產生不可信 chunks。")
    return rows


def attachment_chunks(attachments: list[dict]) -> list[dict]:
    rows = []
    for attachment in attachments:
        markdown = (MARKDOWN / attachment["markdown_file"]).read_text(encoding="utf-8")
        text = clean(markdown)
        if len(text) < 80:
            raise SystemExit(f"附件 Markdown 太短，停止建立 chunk：{attachment['markdown_file']}")
        rows.append(
            {
                "chunk_id": f"{attachment['document_id']}-chunk-01",
                "document_id": attachment["document_id"],
                "source_url": attachment["source_url"],
                "section": attachment["section"],
                "text": text,
                "crawled_at": CRAWLED_AT,
                "source_type": attachment["source_type"],
            }
        )
        note_match = re.search(r"備註：.*?(?=\n\s*\n|$)", markdown, flags=re.S)
        if note_match:
            rows.append(
                {
                    "chunk_id": f"{attachment['document_id']}-chunk-02",
                    "document_id": attachment["document_id"],
                    "source_url": attachment["source_url"],
                    "section": f"{attachment['section']}｜備註與送件期限",
                    "text": clean(note_match.group(0)),
                    "retrieval_text": f"{clean(note_match.group(0))} 問題提示：何時送交所辦、最晚送件期限、何時截止。",
                    "crawled_at": CRAWLED_AT,
                    "source_type": attachment["source_type"],
                }
            )
    return rows


def master_service_chunk() -> dict:
    master = next(row for row in chunks(service_text()) if row["section"].startswith("02 "))
    return {**master, "chunk_id": "tve-master-services-20260729-chunk-01", "document_id": "tve-master-services-20260729", "academic_year": "依目前公開服務頁；未標示適用年度"}


def master_requirement_chunks() -> list[dict]:
    manual = (MARKDOWN / "115研究生手冊.docx.md").read_text(encoding="utf-8")
    course_rules = re.search(r"\*\*五、修課規定\*\*(.*?)(?=\*\*六、論文計畫發表\*\*)", manual, flags=re.S)
    course_map = re.search(r"\*\*115學年度技術及職業教育研究所碩士班程課程流程圖\*\*(.*?)(?=\(四\)課程流程圖-碩專班)", manual, flags=re.S)
    if not course_rules or not course_map:
        raise SystemExit("115 研究生手冊未找到碩士班修課規定或課程流程圖，停止產生不可信 chunks。")

    english_html = (RAW / "requirements" / "英文畢業門檻.html").read_text(encoding="utf-8")
    paragraphs = [clean(re.sub(r"<[^>]+>", " ", value)) for value in re.findall(r"<p[^>]*>.*?</p>", english_html, flags=re.S)]
    year_boundary = next((value for value in paragraphs if "111學年度前入學" in value and "112學年度以後入學" in value), None)
    master_label_index = next(
        (index for index, value in enumerate(paragraphs) if value.startswith("碩士班") and "學生之基本英語能力標準" in value),
        None,
    )
    master_standard = (
        f"{paragraphs[master_label_index]} {paragraphs[master_label_index + 1]}"
        if master_label_index is not None and master_label_index + 1 < len(paragraphs)
        else None
    )
    master_fallback = next((value for value in paragraphs if "碩士班學生未通過" in value), None)
    if not year_boundary or not master_standard or not master_fallback:
        raise SystemExit("英文畢業門檻頁未找到年度與碩士班標準，停止產生不可信 chunks。")

    return [
        {
            "chunk_id": "tve-master-manual-115-chunk-01",
            "document_id": "tve-master-manual-115",
            "source_url": MASTER_MANUAL_URL,
            "section": "115 學年度碩士班研究生手冊｜修課與畢業學分",
            "text": clean(course_rules.group(0)),
            "retrieval_text": clean(course_rules.group(0)) + " 問題提示：碩士班畢業需要幾學分、必修選修各幾學分、外所課程上限。",
            "academic_year": "115 學年度",
            "crawled_at": CRAWLED_AT,
            "source_type": "DOCX",
        },
        {
            "chunk_id": "tve-master-manual-115-chunk-02",
            "document_id": "tve-master-manual-115",
            "source_url": MASTER_MANUAL_URL,
            "section": "115 學年度碩士班研究生手冊｜課程流程圖與最低畢業學分",
            "text": clean(course_map.group(0)),
            "retrieval_text": clean(course_map.group(0)) + " 問題提示：115學年度、最低畢業學分、39學分、必修9學分、選修30學分。",
            "academic_year": "115 學年度",
            "crawled_at": CRAWLED_AT,
            "source_type": "DOCX",
        },
        {
            "chunk_id": "yuntech-english-requirement-chunk-01",
            "document_id": "yuntech-english-requirement",
            "source_url": ENGLISH_REQUIREMENT_URL,
            "section": "英文畢業門檻｜111 學年度前入學碩士班標準",
            "text": "\n\n".join((year_boundary, master_standard, master_fallback)),
            "retrieval_text": "\n\n".join((year_boundary, master_standard, master_fallback)) + " 問題提示：111學年度前入學、碩士班英文畢業門檻、TOEIC 550、雅思 4、CEFR B1。",
            "academic_year": "111 學年度前入學",
            "crawled_at": CRAWLED_AT,
            "source_type": "HTML",
        },
        {
            "chunk_id": "yuntech-english-requirement-chunk-02",
            "document_id": "yuntech-english-requirement",
            "source_url": ENGLISH_REQUIREMENT_URL,
            "section": "英文畢業門檻｜112 學年度後入學須向系所確認",
            "text": year_boundary,
            "retrieval_text": year_boundary + " 問題提示：112學年度後入學、碩士班英文畢業門檻、系所自訂、洽各系所確認。",
            "academic_year": "112 學年度後入學",
            "crawled_at": CRAWLED_AT,
            "source_type": "HTML",
        },
    ]


def calendar_chunk() -> dict:
    markdown = (MARKDOWN / "115學年度第1學期行事曆.pdf.md").read_text(encoding="utf-8")
    key_events = [line.strip() for line in markdown.splitlines() if "上課開始" in line or "加退選" in line]
    if len(key_events) < 2:
        raise SystemExit("115 學年度行事曆未找到上課或加退選日期，停止產生不可信 chunk。")
    text = "\n".join(key_events)
    return {
        "chunk_id": "yuntech-calendar-115-1-chunk-01",
        "document_id": "yuntech-calendar-115-1",
        "source_url": CALENDAR_URL,
        "section": "115 學年度第 1 學期行事曆｜上課與加退選",
        "text": text,
        "retrieval_text": text + " 問題提示：115學年度第1學期、何時上課開始、何時加退選截止、校務日期。",
        "academic_year": "115 學年度第 1 學期",
        "crawled_at": CRAWLED_AT,
        "source_type": "PDF",
    }


def main() -> None:
    text = service_text()
    rows = chunks(text) + attachment_chunks(ATTACHMENTS)
    MARKDOWN.mkdir(parents=True, exist_ok=True)
    PROCESSED.mkdir(parents=True, exist_ok=True)
    (MARKDOWN / "tve-services-20260729.md").write_text(
        f"# 雲科大技職所服務項目\n\n來源：{SOURCE_URL}\n抓取時間：{CRAWLED_AT}\n\n{text}\n",
        encoding="utf-8",
    )
    with (PROCESSED / "tve-yuntech-live.chunks.jsonl").open("w", encoding="utf-8") as file:
        for row in rows:
            file.write(json.dumps(row, ensure_ascii=False) + "\n")
    master_rows = [master_service_chunk(), *master_requirement_chunks(), calendar_chunk(), *attachment_chunks(MASTER_ATTACHMENTS)]
    with (PROCESSED / "tve-yuntech-master-demo.chunks.jsonl").open("w", encoding="utf-8") as file:
        for row in master_rows:
            file.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(f"已產生 {len(rows)} 個博士班示範 chunks，以及 {len(master_rows)} 個碩士班年度化示範 chunks。")


if __name__ == "__main__":
    main()
