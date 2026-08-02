# 技術棧說明

## 專案定位

純前端數據儀表板，讀取靜態 CSV 檔案，不需要後端伺服器、不需要資料庫、不需要 Docker。

## 技術選型

| 層級 | 技術 | 用途 |
|------|------|------|
| 前端框架 | React 18+ | 建立 UI 元件與頁面結構 |
| 型別系統 | TypeScript | 型別檢查，提升程式碼品質 |
| 建置工具 | Vite | 開發伺服器與打包 |
| UI 元件庫 | shadcn/ui | 按鈕、卡片、下拉選單、表格等可複用的 UI 元件 |
| CSS 框架 | Tailwind CSS | 樣式設定，不需手寫 CSS |
| 圖表庫 | Recharts | 長條圖、散佈圖、圓餅圖等數據圖表 |
| 數據讀取 | PapaParse | 解析 CSV 檔案為 JavaScript 物件 |
| 套件管理 | npm | 安裝和管理依賴套件 |

## 為什麼不用 Docker？

本專案是純前端，沒有後端服務、沒有資料庫、沒有環境依賴（只需要 Node.js，這是學員本機已經有的）。用 Docker 反而增加學習成本和建置時間。Codex Desktop 會直接在專案目錄下執行 `npm install && npm run dev`，全程在本機完成。

## 數據來源

兩個 CSV 檔案在專案根目錄：

- `rawdata_1.csv`：長表格式，1,150 筆，欄位為「學生ID、班級、科目、期中成績、期末成績、平時成績、出席率(%)、作業完成率(%)」。適合做科目維度的篩選和比較。
- `rawdata_2.csv`：寬表格式，230 筆，每位學生一列，各科成績展開為獨立欄位。適合做學生維度的排名和總分比較。

檔案透過 PapaParse 在前端讀取，不需任何後端 API。

## 專案目錄結構

```
codex/
├── AGENTS.md           # Codex 的行為設定（自動讀取）
├── TECH_STACK.md       # 本文件
├── rawdata_1.csv       # 數據源（長表）
├── rawdata_2.csv       # 數據源（寬表）
├── package.json        # npm 依賴與腳本
├── tsconfig.json       # TypeScript 設定
├── tailwind.config.js  # Tailwind CSS 設定
├── vite.config.ts      # Vite 建置設定
├── index.html          # 入口 HTML
└── src/
    ├── main.tsx        # React 入口
    ├── App.tsx         # 主要頁面元件
    ├── components/     # UI 元件（圖表、卡片等）
    ├── lib/
    │   └── utils.ts    # shadcn/ui 工具函式
    └── data/
        └── loader.ts   # CSV 讀取與資料處理邏輯
```

## 啟動方式

```bash
npm install    # 安裝依賴（第一次需要）
npm run dev    # 啟動開發伺服器
```

瀏覽器打開 `http://localhost:5173` 即可看到儀表板。

## 注意事項

- 所有文字使用繁體中文
- 數據中的數值範圍：成績 0-100、出席率 60-100%、作業率 50-100%
- 不要引入 Redux、React Router 等重型狀態管理或路由庫，用 React 內建的 useState 和 useEffect 即可
