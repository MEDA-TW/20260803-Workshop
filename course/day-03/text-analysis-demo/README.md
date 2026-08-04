# Day 3 上午｜論文摘要探索與主分類分析

這是 Day 3 上午的工作空間。請以 Codex Desktop 直接開啟本資料夾，依 `PROMPTS.md` 的七個階段逐步完成；下午再切換到同一層的 `../rag-demo/` 進行校務文件 RAG。本上午不需要 MarkItDown、Ollama 或 Streamlit。

## 研究問題

> 北科大與雲科大技術及職業教育研究所的博碩士論文摘要，在研究議題、研究對象、研究方法與研究取向上，呈現哪些可由摘要支持的差異？

這是描述性比較，不是兩所學校或個人的品質排名。

## 你會使用的資料

```text
data/thesis_abstracts_110_114.jsonl  255 篇講師提供的公開書目與摘要
data/source_manifest.json            資料邊界與來源查詢式
analysis/                            你建立的編碼表與比較結果
PROMPTS.md                           探索、主分類確認、編碼與報告的七階段提示詞
```

資料涵蓋 110–114 學年度；北科大 157 篇、雲科大 98 篇。兩校學位別結構不同，因此比較時除了全體結果，也要分別比較碩士與博士。

## 分析流程

1. 先探索摘要中的關鍵詞與方法線索，形成可追溯的探索結果。
2. 根據探索結果提出主分類候選與變更建議；研究者確認後，才進入試編碼與全量編碼。
3. 保留摘要原文證據、AI 初步編碼與人工確認狀態；資訊不足時填 `無法判定`。
4. 比較兩校時同時呈現篇數與比例，並分別檢查碩士與博士；不可把差異解讀為品質高低或因果關係。

## 完成成果

1. `analysis/thesis_abstract_keyword_exploration.csv`：摘要關鍵詞探索結果。
2. `analysis/thesis_abstract_method_cues.csv`：摘要方法線索探索結果。
3. `analysis/thesis_abstract_codebook_v2.json` 與 `analysis/thesis_abstract_codebook_change_log.csv`：研究者確認後的主分類與變更紀錄。
4. `analysis/thesis_abstract_coding.csv`：一篇摘要一列，保留 AI 編碼、主分類版本與摘要原文證據。
5. `analysis/comparison_report.docx`：最後的 Word 分析報告，只保留確認後的主分類與可回查證據。

探索結果用來幫助建立主分類，但不直接等同於最後的主分類統計。若探索後沒有實質調整，必須明確記錄「探索後主分類未變更」，不能把原分類說成重新建立。不要下載全文、不要新增網路資料來源，也不要修改 `data/` 內講師提供的檔案。資料不足時填 `無法判定`，而不是讓 AI 猜測。
