# 我的教育資料儀表板

這是 Day 1 的完整實作專案。學員只需要用 Codex Desktop 的 **Open Folder** 開啟這個資料夾，不必逐一閱讀設定檔。

課堂操作步驟依講師提供的 Day 1 學員指南進行。

## 第一次開啟

在 Codex Desktop 貼上：

> 請先讀 `README.md`、`TECH_STACK.md`、`AGENTS.md`，然後用五句話告訴我：這個專案要做什麼、技術棧是什麼、最重要的三條規則是什麼。

## 今天只會修改哪裡

- 上午：`src/App.tsx`
- 下午：`src/App.tsx` 與必要的 `src/components/`
- `src/reference/` 是講師參考畫面，學員不需要修改
- `public/card.html` 是講師開場 Demo

## 預覽網址

- 學員起始畫面：<http://localhost:5173>
- 上午骨架參考：<http://localhost:5173/?demo=morning>
- 完整儀表板參考：<http://localhost:5173/?demo=final>
- 名片 Demo：<http://localhost:5173/card.html>

## 三個關鍵檔案

- [TECH_STACK.md](TECH_STACK.md)：使用哪些技術。
- [AGENTS.md](AGENTS.md)：Codex 在這個專案怎麼工作。
- [CLAUDE.md](CLAUDE.md)：改用 Claude Code 時的補充規則。

## 不要做

- 不要自行安裝套件。
- 不要執行 shadcn CLI。
- 不要修改 `TECH_STACK.md`、`AGENTS.md`、`package.json`。
- 上午不要 push；下午部署前才執行一次 Push origin。

## 改壞了怎麼救

> 剛剛的修改讓畫面變差了，請只還原本輪變更。

出現錯誤時，把完整錯誤訊息貼回 Codex。兩招都無效就找 TA。

## 專案結構

```text
project/
├── README.md
├── AGENTS.md
├── TECH_STACK.md
├── package.json
├── public/
├── scripts/
└── src/
    ├── App.tsx             學員主要修改檔
    ├── components/ui/      預裝元件
    ├── reference/          講師參考畫面
    └── lib/utils.ts
```

## 維護者驗證

```bash
npm install
npm run check
```

`npm run check` 會檢查必要教材、TypeScript 與 production build。

## 我的部署網址

（部署完成後填寫）
