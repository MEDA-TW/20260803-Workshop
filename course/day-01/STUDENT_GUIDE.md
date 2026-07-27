# Day 1 學員指南

你不需要先會寫程式。今天只重複一個工作循環：

```text
描述想要的成果 → Codex 產出 → 在瀏覽器驗收 → GitHub Desktop commit
```

卡住時只記得兩句：

1. 「剛剛的修改讓畫面變差了，請只還原這一輪變更。」
2. 把完整錯誤訊息貼回 Codex，不要只說「壞了」。

同一個問題卡超過五分鐘就找 TA。

---

## 01｜課前準備

請確認：

- [ ] Node.js 20.19 以上或 22.12 以上的 LTS 已安裝
- [ ] GitHub Desktop 已安裝並登入
- [ ] Codex Desktop 已安裝並登入
- [ ] GitHub 帳號可正常使用
- [ ] Vercel 可用 GitHub 登入
- [ ] 自備筆電、電源與瀏覽器

### 取得專案

1. 掃描講師提供的 GitHub QR code。
2. 點 **Use this template** → **Create a new repository**。
3. Repository name 填 `my-dashboard`，Visibility 選 **Public**。
4. 用 GitHub Desktop clone `my-dashboard`。
5. 在 Codex Desktop 點 **Open Folder**，選專案資料夾。

不要使用 Fork。若網路異常，TA 會提供 ZIP 備援版。

### 讓 Codex 認識專案

貼上：

> 請先讀這個專案的 `README.md`、`TECH_STACK.md`、`AGENTS.md`，然後用五句話告訴我：這個專案要做什麼、技術棧是什麼、最重要的三條規則是什麼。

回答應提到：

- 教育資料儀表板
- React、Vite、TypeScript、Tailwind、shadcn/ui、Recharts
- 不安裝套件、不執行 shadcn CLI、不修改規格檔

---

## 02｜上午：第一次 Vibe Coding

目標是只修改 `src/App.tsx`，完成儀表板首頁骨架。

### 第一個提示詞

> 目標：把首頁改成教育資料儀表板的頁面骨架。<br>
> 背景：遵守 `TECH_STACK.md` 與 `AGENTS.md`，沿用現有 React、TypeScript 與 Tailwind 設定。<br>
> 輸出：只修改 `src/App.tsx`。使用深色背景，顯示「教育資料儀表板」、課堂練習副標，以及「歡迎回來，王老師」。標題下方留一塊主內容區，手機寬度不能破版。<br>
> 邊界：不要安裝套件、不要執行 shadcn CLI、不要新增 UI 元件、不要修改規格檔。<br>
> 完成後請自行檢查桌機與手機寬度。

可以把「王老師」換成自己的名字。

### 預覽驗收

打開 <http://localhost:5173>，確認：

- [ ] 標題與副標正確
- [ ] 深色背景與留白清楚
- [ ] 右上有歡迎文字
- [ ] 拉窄瀏覽器後沒有文字或畫面溢出

### 迭代練習

任選兩項，一次只說一個修改：

- 背景換成深藍到深紫的漸層。
- 頁面標題再大一級，手機版不要超出畫面。
- 副標改成淡藍色。
- 標題下方加上今天日期。
- 名字旁邊加一個圓形姓名縮寫圖示。

### 第一次存檔

在 GitHub Desktop：

1. 確認只有預期的 `src/App.tsx` 變更。
2. Summary 輸入 `feat: 儀表板首頁骨架第一版`。
3. 點 **Commit to main**。
4. 上午不要按 Push origin。

---

## 03｜下午：沿用現有 UI 元件

先讓 Codex 重新讀規則：

> 請重新讀 `TECH_STACK.md` 和 `AGENTS.md`，用五點告訴我：下午要做什麼、最關鍵的三條規則，以及專案內有哪些可直接使用的 UI 元件。

回答應提到 `button.tsx`、`card.tsx`、`sheet.tsx`、`avatar.tsx`。

### 加入 Button

> 請在 `src/App.tsx` 加入一個文字為「開始使用」的 Button。直接沿用 `src/components/ui/button.tsx`，不要執行 shadcn CLI、不要安裝套件。按鈕放在標題區下方，並用 Tailwind 加上適當間距。

### 加入 Card

> 請在 Button 下方沿用既有 Card 元件。標題寫「今日數據摘要」，說明寫「這是一個示範卡片」。使用 `gap-4` 與 Button 隔開，不要安裝套件。

Commit：

```text
feat: 加入 Button 與 Card 第一版
```

若 Codex 想安裝元件，回覆：

> 元件已存在，請直接沿用 `src/components/ui/`，不要執行 shadcn CLI 或 npm install。

---

## 04｜下午：完成教育資料儀表板

固定順序是：佈局 → 統計卡片 → 圖表。每一步先驗收，再 commit。

### A｜響應式側邊欄

> 目標：把首頁改造成教育資料儀表板的響應式佈局。<br>
> 背景：沿用現有 React 專案與元件；手機導覽使用既有 Sheet。<br>
> 輸出：左側深色導覽包含「總覽、學生成績、出缺席統計、學習歷程」與 lucide icon。主內容顯示「歡迎回來，王老師」與 Avatar。桌機使用固定側邊欄，手機使用 Sheet。<br>
> 邊界：不要安裝套件、不要刪除既有功能、不要修改規格檔。完成後確認 build 通過。

驗收：

- [ ] 桌機有固定側邊欄
- [ ] 手機有選單按鈕
- [ ] Sheet 裡有四個導覽項目
- [ ] Avatar 有姓名縮寫

Commit：`feat: 儀表板 layout + sidebar`

### B｜四張統計卡片

> 在主內容加入四張響應式統計卡片。桌機四欄、平板兩欄、手機一欄。資料是：總學生數 1,248，上升 12%；出席率 94.2%，下降 0.3%；平均成績 78.5，上升 2.1%；待處理 23 件，減少 5 件。沿用 Card 與 lucide icon，資料先使用 TypeScript const，不安裝套件。

Commit：`feat: 統計卡片 4 張`

### C｜長條圖與折線圖

長條圖提示詞：

> 使用已預裝的 Recharts 加入「各班平均成績」長條圖。資料為：資管四甲 82、資管四乙 78、機械三甲 75、機械三乙 80、電子二甲 85、電子二乙 72。圖表放在 Card 內，有座標軸、tooltip 與 ResponsiveContainer。不要安裝套件。

折線圖提示詞：

> 加入「本週出席趨勢」折線圖。週一到週五資料為 95、93、97、91、94。與長條圖使用一致的 Card；桌機並排、手機垂直排列，要有資料點、tooltip 與 ResponsiveContainer。完成後確認 build 通過。

Commit：`feat: Recharts 長條圖 + 折線圖`

### 最後驗收

- [ ] 四個導覽項目
- [ ] 四張統計卡片
- [ ] 長條圖六個班級
- [ ] 折線圖週一到週五
- [ ] 手機沒有橫向溢出
- [ ] Console 沒有紅字

講師參考畫面：<http://localhost:5173/?demo=final>

---

## 05｜推送與部署

這是全天第一次也是唯一一次 Push origin。

1. 確認所有變更已 commit。
2. 在 GitHub Desktop 點 **Push origin**。
3. 打開 GitHub repo，確認 `src/App.tsx` 是自己的版本。
4. 打開 <https://vercel.com>，使用 GitHub 登入。
5. 點 **Add New** → **Project**，選 `my-dashboard`。
6. Framework Preset 使用 Vite。
7. Build Command 使用 `npm run build`。
8. Output Directory 使用 `dist`。
9. 不設定環境變數，按 **Deploy**。

成果驗收：

- [ ] 拿到 `*.vercel.app` 網址
- [ ] 用自己的手機開啟成功
- [ ] 導覽、卡片與圖表正常
- [ ] 把 Vercel 網址與 GitHub repo 填入講師表單

若 build 失敗，複製完整 Vercel build log 貼回 Codex。

---

## 06｜回家挑戰

一次只選一題：

1. 把統計卡片與圖表假資料移到 `src/data/dashboard.ts`。
2. 使用 React `useState` 讓四個導覽項目切換內容，不安裝路由套件。
3. 使用既有 Tailwind 3 與 CSS variables 加入深淺色切換。
4. 換成自己的教育問題，但不要把真實姓名、學號或成績貼入雲端 AI。
