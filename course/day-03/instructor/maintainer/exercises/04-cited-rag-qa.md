# 練習 04｜可引用的 Streamlit 問答助手

依 `rag-demo/PROMPTS.md` 的提示詞 4 建 chunks 與索引，再依提示詞 5 用 Codex 從空白建立 `rag/app.py`。助手只能讀取學生自己的 `data/processed/vector_index.jsonl`，每題顯示來源段落、原始網址與取得時間；無直接證據時固定顯示「資料不足，無法根據目前來源回答」。

測試學分、英文門檻、流程表單、校務日期四類問題，並確認問答紀錄會彙整每串對話的主要主題。
