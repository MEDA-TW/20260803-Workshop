# Day 1 講師與 TA 指南

## 教學定位

對象是沒有程式背景的師培生、研究生與通識中心教師。成效不是「學會寫程式」，而是：

1. 經歷至少一次「原來可以這樣」的頓悟。
2. 能說出 Agent 三大要素與提示詞四要素。
3. 帶走一個可分享的 Vercel 網址與一套可重複的方法。

## 全日原則

- 學員只使用 Codex Desktop、GitHub Desktop 與瀏覽器。
- 每段重複「描述、產出、驗收、存檔」。
- 上午只 commit；下午部署前才 push。
- 個人名片只由講師 Demo。
- 卡住超過五分鐘，TA 主動介入。

## 五個 Aha 節點

1. 09:05：30 秒名片 Demo。
2. 上午 2.4：學員看到自己描述的儀表板骨架。
3. 上午 2.5：用一句話還原上一版。
4. 下午 3.3：Codex 沿用專案規則與預裝元件。
5. 下午 5.2：用手機打開自己的公開網址。

---

## 全天 Run of Show

### 課前緩衝（08:40–09:00）

- TA 就位，檢查 Wi-Fi、GitHub、Vercel、OpenAI。
- 處理登入與 clone；無訂閱者安排鄰座併機。
- 投影開好 `/card.html`、`?demo=final` 與 QR code。

### 上午 Phase 1｜基礎知識（09:00–11:00）

| 時間 | 段落 | 教學重點 |
| --- | --- | --- |
| 09:00–09:12 | 開場 Demo | 30 秒名片 Demo，切到完整儀表板 |
| 09:12–09:24 | Vibe Coding | 描述、產出、迭代 |
| 09:24–09:50 | 八個名詞 | LLM、Prompt、Context、Agent、Tool Calling、Sandbox、Token、MCP |
| 09:50–10:06 | Agent | LLM、Tools／Skills、Memory＋六步循環 |
| 10:06–10:08 | 語音 | 有功能才示範 |
| 10:08–10:13 | 休息 | 5 分鐘 |
| 10:13–10:21 | 工具生態 | Codex、Copilot、Claude Code、Cursor、Hermes |
| 10:21–10:33 | 提示詞 | 目標、背景、輸出、邊界 |
| 10:33–10:45 | 紙上演練 | 個人寫、兩人互評、講師講評 |
| 10:45–10:53 | 責任邊界 | 幻覺、個資、授權、人工覆核 |
| 10:53–11:00 | Q&A | 吸收超時 |

講述定錨：

> 你可以把手放開，但不能把眼睛閉上。

> 模型決定能力上限；上下文和 Harness 決定上限能否穩定落地。

### 上午 Phase 2｜第一次實作（11:00–12:00）

| 時間 | 段落 | 主要動作 |
| --- | --- | --- |
| 11:00–11:06 | 環境確認 | 三項舉手檢查 |
| 11:06–11:12 | 取得 repo | Use this template＋GitHub Desktop clone |
| 11:12–11:22 | 認識 Codex | Open Folder、檔案樹、變更、預覽、停止鍵 |
| 11:22–11:50 | 首次實作 | 提示詞 5、預覽 5、迭代 15、緩衝 3 |
| 11:50–11:55 | 存檔救援 | 本機 commit＋兩句救援 |
| 11:55–12:00 | 小結 | 回收學習單，不 push |

### 下午 Phase 3｜第一個元件（13:30–14:15）

| 時間 | 段落 | 主要動作 |
| --- | --- | --- |
| 13:30–13:35 | 統一技術棧 | 展示三個關鍵檔案 |
| 13:35–13:45 | 重讀規則 | 新對話重建上下文 |
| 13:45–14:05 | Button＋Card | 沿用預裝元件 |
| 14:05–14:10 | 休息 | 5 分鐘 |
| 14:10–14:15 | 彈性 | Q&A 或個別協助 |

### 下午 Phase 4｜儀表板實戰（14:15–15:45）

| 時間 | 段落 | 完成證據 |
| --- | --- | --- |
| 14:15–14:18 | 完整版預覽 | 開 `?demo=final` |
| 14:18–14:43 | 側邊欄 | 桌機固定、手機 Sheet |
| 14:43–15:08 | 統計卡片 | 4／2／1 欄響應式 |
| 15:08–15:33 | 圖表 | 長條圖＋折線圖 |
| 15:33–15:45 | 緩衝 | 補進度或資料抽檔 |

預期情緒低谷在側邊欄實作。講師先說「第一版歪了才正常」，TA 主動逐排查看。

### 下午 Phase 5｜部署與收尾（15:45–16:30）

| 時間 | 段落 | 主要動作 |
| --- | --- | --- |
| 15:45–15:49 | 最後預覽 | 響應式、Console、資料 |
| 15:49–16:00 | GitHub＋Vercel | 唯一一次 push，手機開網址 |
| 16:00–16:10 | Hermes Demo | 講師示範，可棄守 |
| 16:10–16:15 | 本地端說明 | 只講選擇邏輯，可棄守 |
| 16:15–16:22 | 回顧反思 | 三句金句 |
| 16:22–16:27 | 成果回收 | Vercel、GitHub、心得、下一步 |
| 16:27–16:30 | 合照 | 成果牆與合照 |

最後請每位學員填：

> 我回去要用它做的下一件事是什麼？

---

## 課前檢核

### 軟體與人力

- [ ] Node.js 20.19+ 或 22.12+ LTS、GitHub Desktop、Codex Desktop 已安裝
- [ ] Codex 可開新對話、建檔、預覽
- [ ] 課前確認 Codex UI 與語音功能
- [ ] 30 人內至少 2 位 TA；50 人至少 3 位
- [ ] 無可用訂閱的學員已安排併機

### Starter repo

- [ ] 在 `project/` 執行 `npm install` 與 `npm run check`
- [ ] 只把 `project/` 的內容發布成獨立 GitHub Template repo
- [ ] `package-lock.json` 已 commit
- [ ] 四個 UI 元件可直接使用
- [ ] GitHub repo 已設為 Template repository
- [ ] 乾淨帳號可完成 Use this template
- [ ] `README.md`、`AGENTS.md`、`TECH_STACK.md`、`CLAUDE.md` 檔名正確

### 實機流程

- [ ] `/card.html` 可正常開啟
- [ ] 上午提示詞只改 `src/App.tsx`
- [ ] Button／Card 沿用既有元件
- [ ] 完整儀表板 build 通過
- [ ] GitHub Desktop clone、commit、push 正常
- [ ] Vercel 從乾淨 repo 成功部署
- [ ] 測試「只還原本輪變更」

### 教室與印刷

- [ ] GitHub、Vercel、OpenAI、Telegram 未被校園網路阻擋
- [ ] 3–5 份 ZIP 備援包
- [ ] Starter repo 與成果表單 QR code
- [ ] 投影最後一排可讀
- [ ] [HANDOUTS.md](HANDOUTS.md) 已列印
- [ ] 成果表單包含 Vercel、GitHub、心得與下一步

---

## TA 排錯手冊

### 介入原則

- 不等學員舉手，Phase 4 主動逐排查看。
- 同一錯誤不讓學員停超過五分鐘。
- 先讓畫面恢復可動，再解釋原因。
- 課堂不展開 Git 概念；必要時 TA 代做還原。

| 症狀 | TA 動作 |
| --- | --- |
| 沒有可用訂閱 | 安排鄰座併機，登記課後追蹤 |
| Codex 登入失敗 | 確認資格，再重新登入或重啟 |
| 沒有語音按鈕 | 繼續打字，不阻塞課程 |
| Open Folder 沒檔案 | 確認 clone 與資料夾 |
| Use this template 失敗 | 使用 ZIP＋Add local repository |
| 預覽空白 | 把完整錯誤貼回 Codex |
| Codex 改錯檔 | 指定正確路徑，要求還原錯誤檔 |
| Codex 想安裝套件 | 回覆「元件已存在，請直接沿用」 |
| 圖表超出卡片 | 檢查固定高度與 ResponsiveContainer |
| Vercel 是舊畫面 | 確認已 Push origin |
| Vercel build 失敗 | 完整 log 貼回 Codex |

標準救援：

> 剛剛的修改讓畫面變差了。請只還原本輪變更，保留前面已完成並 commit 的功能。

> 以下是完整錯誤訊息。請用一句話說明根因，再做最小修正；不要安裝套件或改技術棧。

---

## 時間超支棄守順序

1. Hermes 本地端安裝。
2. Hermes 雲端與 Telegram 示範。
3. 進階挑戰題。
4. 紙上提示詞演練壓到 6 分鐘。
5. 工具生態壓到 4 分鐘。
6. 上午迭代練習壓到 8 分鐘。

---

## Notion 來源

- [工作坊總頁](https://app.notion.com/p/3a83e7cf7dce80f881f6c0f639685477)
- [上午場](https://app.notion.com/p/1584a7cb389941cda2379e55e7e80a2c)
- [下午場](https://app.notion.com/p/b9107463f4ea4f8e930b88955325ea86)
- [AGENTS.md 原始頁](https://app.notion.com/p/3a93e7cf7dce80379305d049bd922496)
- [TECH_STACK.md 原始頁](https://app.notion.com/p/3a93e7cf7dce804cbd5bd301080c67ed)
- [講師 Checklist](https://app.notion.com/p/3a83e7cf7dce80c4bf59d5f6e7e2f5e2)

外部案例數字、Codex UI、語音功能、Hermes 安裝方式與 Vercel 流程都屬高變動資訊，課前必須重新核實。
