# 講師成果 Demo

這是 Day 3 的獨立、已驗證成果 Demo。講師在開場用它展示「可引用的校務問答助手」最後能達到的效果；學生只有在自己的資料流程或個人助手無法完成、但 Python／Streamlit／Ollama 仍可執行時，才改用它快速完成 Demo 備援完成路徑。

它使用雲科大技職所碩士班 115 學年度公開資料，包含修課與畢業學分、英文畢業門檻的年度差異、研究生流程表單，以及 115 學年度第 1 學期行事曆。問答紀錄只寫在此資料夾的 `feedback/query_log.jsonl`，不與學生個人助手混用。

## 啟動

若你目前在 `day-03/starter/`，代表學生 starter 的 `.venv` 已啟用；直接回到課程根目錄再執行：

```bash
cd ..
python -m streamlit run instructor/demo/app.py
```

若尚未建立 starter 的 `.venv`，才從課程根目錄執行 `source starter/.venv/bin/activate`，再執行 `python -m streamlit run instructor/demo/app.py`。

## Demo 備援完成路徑

1. 問一題有明確證據的問題，例如「115 學年度碩士班畢業至少需要幾學分？」。
2. 查看來源與適用年度。
3. 問另一類問題，例如「112 學年度後入學的英文門檻適用什麼規定？」或「115-1 加退選何時截止？」。
4. 在「問答紀錄」查看這串對話的主要主題與來源。

Demo 是公開參考資料的完整操作範例；理想情況仍是學生依 `STUDENT_GUIDE.md` 建立自己的資料與問答助手。
