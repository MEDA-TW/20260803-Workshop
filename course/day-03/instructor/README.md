# Day 3 講師入口

這個資料夾集中講師、助教與教材維護者會使用的內容；學生上課時只需要從 Day 3 根目錄的 [README](../README.md) 與 [STUDENT_GUIDE](../STUDENT_GUIDE.md) 開始。

## 課前準備

- [講師指南](INSTRUCTOR_GUIDE.md)：授課流程、Demo 使用時機與常見排錯。
- [安裝與健康檢查](resources/install-and-health-check.md)：在乾淨學生環境走一次安裝與啟動。

## 課堂使用

- [投影片](slides/day-03-generative-ai-text-analysis.pptx)
- [講師成果 Demo](demo/README.md)：完整的校務文件問答助手，供講師開場展示或學生環境無法完成時參考。

從 Day 3 根目錄啟動 Demo：

~~~bash
source starter/.venv/bin/activate
python -m streamlit run instructor/demo/app.py
~~~

## 教材維護

- [維護者文件與提示詞契約測試](maintainer/README.md)
- [公開資料與備援素材](resources/README.md)
