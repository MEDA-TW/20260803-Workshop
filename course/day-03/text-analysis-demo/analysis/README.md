# 分析輸出

本次探索性文本分析只讀取 `thesis_abstracts_110_114.csv`，並以同批講師資料的
JSONL 做欄位一致性核對；沒有下載全文、沒有新增網路來源，也沒有修改 `../data/`。

## 本次新增產物

- `build_exploratory_text_analysis.py`：可重跑的分析與 Word 報告產生器。
- `build_prompt_exploration_outputs.py`：依 `PROMPTS.md v2` 產出關鍵詞與方法線索探索檔。
- `build_codebook_change_log.py`：保留探索結果到主分類決策的變更紀錄與原文證據。
- `thesis_abstract_codebook_v2.json`：探索後的測試用主分類版本與分類選項。
- `thesis_abstract_codebook_change_log.csv`：主分類變更狀態、理由、corpus_id、source_url 與摘要證據。
- `thesis_abstract_keyword_exploration.csv`：逐一關鍵詞的探索記錄與候選語意角色。
- `thesis_abstract_method_cues.csv`：摘要方法詞彙的非互斥命中記錄。
- `exploration_summary.json`：探索筆數、詞頻、方法線索與資料品質檢查摘要。
- `exploratory_text_analysis_records.csv`：255 篇逐篇衍生記錄，保留摘要、source_url、字數、關鍵詞數與方法詞彙命中。
- `exploratory_text_analysis_summary.json`：篇數、比例、關鍵詞、方法詞彙與資料品質檢查摘要。
- `exploratory_text_analysis_evidence.csv`：主要觀察對應的 `corpus_id`、`source_url` 與摘要原文證據。
- `exploratory_text_analysis_report.docx`：12 頁 Word 分析報告。
- `figures/exploratory_*.png`：報告使用的圖表。

本版分析定位為「自列關鍵詞＋摘要方法詞彙命中」的初步探索；方法命中是非互斥的透明搜尋規則，不等同人工研究方法編碼。報告已列出缺漏檢查、學位分層、限制與仍需人工確認處。

## 既有產物

- `thesis_abstract_coding.csv`：依最後主分類版本產出的逐篇 AI 初步編碼表，含 `codebook_version`。
- `comparison_report.md`：既有兩校比較、證據、反例與限制；本次測試未以新版本重建此 Markdown 檔。
- `comparison_report.docx`：依最後主分類版本產出的 Word 比較報告；不納入探索性詞頻或方法線索統計。
