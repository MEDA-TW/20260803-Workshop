# 專案技術棧規範

> 這份文件決定本專案所有技術選擇。任何套件、語言、元件與部署決策都以本檔為準；修改前請與講師討論。

## 環境

- Node.js：20.19+ LTS 或 22.12+ LTS
- Package manager：npm
- 開發伺服器：Vite
- 部署平台：Vercel

## 核心技術

| 類別 | 指定工具 | 版本 | 不使用 |
| --- | --- | --- | --- |
| 框架 | React | 18.3+ | Vue、Svelte |
| 建置工具 | Vite | 8.1+ | Next.js |
| 語言 | TypeScript | 5.6+ | JavaScript |
| 樣式 | Tailwind CSS | 3.4+ | styled-components、Emotion |
| UI 元件 | shadcn/ui 原始碼元件 | 專案內版本 | MUI、Ant Design、Chakra、Mantine |
| 圖表 | Recharts | 2.12+ | Chart.js、D3.js、Plotly、ECharts |
| 圖示 | lucide-react | 0.453+ | react-icons、Heroicons |

## 例外檔案

- `public/card.html` 是講師 1.1 開場 Demo 的純 HTML 與 CSS 檔，不受 React、TypeScript 與 inline style 規範約束。
- 除此之外，`src/` 下所有檔案都遵守本文件。

## 預裝元件

`src/components/ui/` 已有：

- `button.tsx`
- `card.tsx`
- `sheet.tsx`
- `avatar.tsx`

禁止執行 shadcn CLI 或任何安裝指令。CLI 新版可能改寫 Tailwind 設定，與本課鎖定的 Tailwind 3.4 衝突。需要新元件時，比照現有元件手寫在同一目錄。

## 命名與結構

- React 元件檔名使用 PascalCase，例如 `DashboardSidebar.tsx`。
- 工具函式、hooks 與資料變數使用 camelCase。
- `@/*` 對應 `src/*`；`tsconfig.json` 與 `vite.config.ts` 必須同步。
- 課堂新增的共用元件放 `src/components/`。
- 假資料放 `src/data/`。
- 本工作坊不使用路由套件；多頁面效果用 React `useState` 切換。
- `src/reference/` 集中放講師參考版本，學員不需要修改。

## 樣式規則

優先順序：

1. Tailwind utility class
2. shadcn/ui 元件組合
3. 既有 `src/index.css` 的設計 token

禁止新增 inline style。版面預設先支援手機，再用 `md:`、`lg:` 擴充；統計卡預設使用 `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`。

## 元件設計

- 一個元件負責一個清楚任務。
- Props 型別明確。
- 資料陣列與顯示元件分開。
- Recharts 圖表必須放在 `ResponsiveContainer`。
- shadcn/ui 的 Sheet 必須提供 `SheetTitle`，Avatar 必須提供 `AvatarFallback`。
- lucide-react 使用命名 import，確保 tree-shaking。

## 資料策略

| 階段 | 做法 |
| --- | --- |
| 本工作坊 | 使用 TypeScript `const` 假資料，不含個資 |
| 回家挑戰 | 抽到 `src/data/` |
| 未來正式版 | API 放 `src/api/`，再評估 React Query 或 SWR |

今天的所有姓名、成績、出席率與件數都是教學假資料，不可貼入真實學生姓名、學號或原始成績。

## 部署

- Vercel 網頁版，不使用 Vercel CLI。
- Build command：`npm run build`
- Output directory：`dist`
- 不需要環境變數。

## 維護規則

- 本檔由講師維護，學員未經許可不要修改。
- 套件版本調整後，必須重新跑 `npm install`、`npm run check`，並以乾淨 clone 驗證。
