# Day 3 講師資源整合設計

## 目的

讓初學者在 Day 3 根目錄只看見學生需要操作的教材與 `starter/`，把講師授課、Demo、資源、投影片與維護檔集中到 `instructor/`。

## 使用者入口

| 使用者 | 根目錄入口 | 下一步 |
| --- | --- | --- |
| 學生 | `README.md`、`STUDENT_GUIDE.md`、`HANDOUTS.md`、`starter/` | 依學生指南處理資料，再由 Codex 建立 `rag/app.py`。 |
| 講師／TA | `instructor/README.md` | 依講師指南開場 Demo、播放投影片、進行健康檢查與備援。 |

根目錄 `README.md` 只保留角色導流與學生流程摘要，不要求學生閱讀講師或維護資料夾。

## 目標架構

```text
day-03/
├── README.md
├── STUDENT_GUIDE.md
├── HANDOUTS.md
├── starter/
│   ├── requirements.txt
│   ├── data/
│   ├── analysis/
│   ├── rag/
│   ├── feedback/
│   └── scripts/
└── instructor/
    ├── README.md
    ├── INSTRUCTOR_GUIDE.md
    ├── slides/
    ├── demo/
    ├── resources/
    └── maintainer/
```

## 搬移對照

| 目前位置 | 新位置 | 用途 |
| --- | --- | --- |
| `INSTRUCTOR_GUIDE.md` | `instructor/INSTRUCTOR_GUIDE.md` | 講師與 TA 劇本。 |
| `slides/` | `instructor/slides/` | 講師投影片與模板素材。 |
| `instructor-demo/` | `instructor/demo/` | 講師成果 Demo 與其本機問答紀錄。 |
| `instructor-resources/` | `instructor/resources/` | 安裝、即時示範資料與備援資料。 |
| `maintainer/` | `instructor/maintainer/` | PRD、SDD、測試、簡報產生腳本與維護規格。 |

學生內容 `STUDENT_GUIDE.md`、`HANDOUTS.md` 與 `starter/` 不移動、不重新命名。

## 路徑與操作規則

- 講師從 Day 3 根目錄啟動 Demo：`python -m streamlit run instructor/demo/app.py`。
- 學生不複製、不修改 Demo；個人流程失敗但環境可跑時，由講師／TA 開啟 Demo 作為備援展示。
- 需要啟用 starter 虛擬環境時，講師仍在根目錄執行 `source starter/.venv/bin/activate`。
- `instructor/README.md` 是講師唯一入口，連結 Demo、投影片、講師指南、安裝指引與維護測試。
- 所有 Markdown 相對連結、Python 的 `Path` 相對路徑、簡報產生腳本輸出路徑與學生指南中的備援指令都必須更新。

## 資料與 manifest 規則

學生流程一律使用 `starter/data/manifests/crawl_manifest.jsonl`；每行一份指定來源。講師的既有即時示範與備援資料可保留歷史 `crawl_manifest.json`，但其 README 必須標為「既有唯讀示範資料」，不得被描述為學生的新輸出格式。

## 驗收條件

1. 學生從根目錄只需辨識 `STUDENT_GUIDE.md`、`HANDOUTS.md` 與 `starter/`。
2. 講師從 `instructor/README.md` 找到開場 Demo、投影片、安裝與備援資料。
3. Demo 可由根目錄命令成功定位 `instructor/demo/app.py` 與其資料索引。
4. 學生指南、講師指南、README、Handout、維護文件與投影片不含失效的舊路徑。
5. 提示詞契約測試、Python 測試、語法檢查與 `git diff --check` 通過。
