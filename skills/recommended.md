# 推薦 Skills

以下列出經過確認的外部 skill repo，可直接引用或安裝使用。每個 skill 都已驗證確實包含 SKILL.md 或符合 skill 規範的結構。

---

## 官方資源

### [Anthropic Skills](https://github.com/anthropics/skills)
Anthropic 官方維護的 skill 集合，涵蓋創意設計、開發測試、企業溝通、文件處理（docx / pdf / pptx / xlsx）等類別。提供 skill 規範文件與範本，是建立自定義 skill 的最佳起點。可透過 `/plugin marketplace add anthropics/skills` 安裝。

---

## UI / UX 與前端設計

### [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
為 AI 編程助手注入專業 UI/UX 設計知識。內建 Design System Generator，支援 161 條產業推理規則、67 種 UI 風格、161 種配色方案，適用於 React / Next.js / Flutter / SwiftUI 等 15 種技術棧。透過 npm CLI 或 plugin marketplace 安裝。

### [Impeccable](https://github.com/pbakaus/impeccable)
前端設計技能系統，專門對抗 AI 生成的制式化 UI（千篇一律的 Inter 字體、紫藍漸層）。提供 7 個設計領域參考文件、23 條設計指令（`/impeccable audit`、`/critique`、`/polish` 等），以及 27 條反模式偵測規則。支援 Cursor / Claude Code / Gemini CLI 等多平台。

---

## 學術研究與論文

### [Nature Skills](https://github.com/Yuan1z0825/nature-skills)
針對 Nature 與高影響力期刊標準設計的學術寫作 skill 集合。已確認 repo 內含 `skills/nature-*/SKILL.md` 與 `skills/_shared/`，可安裝使用；安裝時需保留完整 skill 目錄與共享資料，不要只複製單一 `SKILL.md`。適合用於論文精讀、Nature-style 寫作與潤飾、文獻檢索與引用核對、Data Availability、科研圖表、審稿回覆、投稿前 reviewer 模擬，以及把 paper 轉成中文 PPTX。對學術研究的主要價值在於把「讀文獻、寫段落、補引用、做圖、回覆審稿」拆成可重複執行的流程，特別適合中文研究者把材料轉成英文期刊稿。

### [Academic Research Skills](https://github.com/Imbad0202/academic-research-skills)
完整的學術論文生命週期支援，包含 Deep Research、Academic Paper、Reviewer、Academic Pipeline 與 experiment planning / validation 等流程，特別處理引用偽造、來源驗證、統計解讀與 AI disclosure 等研究誠信問題。若用於 Codex，建議優先安裝其 Codex-native 發行版 [Academic Research Skills for Codex](https://github.com/Imbad0202/academic-research-skills-codex)，已確認內含 `skills/academic-research-suite/SKILL.md`，以單一 router skill 包裝上游 ARS workflow。對研究與論文撰寫很有幫助，適合從研究問題收斂、文獻回顧、系統性回顧、論文大綱、引用檢查、審稿模擬到完整 research-to-paper pipeline 的長流程任務；但正式投稿前仍應由研究者人工核對引用、統計與期刊規範。

### [PaperSpine](https://github.com/WUBING2023/PaperSpine)
以 motivation 為主線的論文與報告寫作 skill suite。已確認 repo 內含 `dist/codex/skills/*/SKILL.md`、`dist/claude/skills/*/SKILL.md`、`dist/openclaw/skills/*/SKILL.md`，並提供 `install.sh` / `install.ps1`；Codex 安裝時應使用 `dist/codex/skills/*` 的扁平 skill suite。它不是單純潤稿工具，而是先學習目標場景與優秀樣例，再建立 source map、research dossier、citation support bank、motivation、section blueprints、writing rationale matrix、LaTeX 與 audit 產物。適合已有素材、初稿、實驗結果或目標 venue 時，把論文從「材料堆」整理成完整、有主軸、可編譯的 LaTeX/PDF/Word 交付物。

### [Paper RAG](https://github.com/GeederX/paper-rag-skill)
本地 academic PDF RAG 知識庫 skill。已確認 repo 內含 `skills/paperrag/SKILL.md`，提供 PDF 轉文字、建立 ChromaDB 向量索引、以及 `query_for_agent()` 檢索介面；需要 Python venv、ChromaDB 與 OpenAI-compatible embedding API key。對學術研究有中高價值，適合把實驗室常讀的 PDF、seminar paper 或特定主題文獻建成本地查詢庫，支援後續文獻整理與 grounded QA。限制是它偏向基礎 RAG template，不等同於完整 citation verification 或 systematic review workflow；輸出的引用與論點仍需人工或搭配 ARS / Nature Skills 核對。

### [IEEE LaTeX Writer](https://github.com/Listen-Sun/ieee-latex-writer)
面向 Codex 的 IEEE LaTeX 論文寫作與投稿前檢查 skill。已確認 repo 根目錄含 `SKILL.md`、`references/`、`scripts/`、`assets/ieee-official-templates/` 與 `.codex-plugin/plugin.json`，可直接 clone 到 `~/.codex/skills/ieee-latex-writer`。適合 IEEEtran 期刊、會議、Letters、Magazine 與常見工程／資訊領域稿件，用於建立論文策略、維持貢獻主軸、匿名化檢查、BibTeX 清理、LaTeX 靜態 audit、reviewer response 與投稿前格式風險檢查。對 MEDA Lab 若有 robotics、control、signal processing、power/energy 或 intelligent systems 類 IEEE 投稿會很實用。

---

## AI 開發流程與工程實踐

### [Superpowers](https://github.com/obra/superpowers)
結構化的 agentic skills 框架，強制 AI 編程助手遵循紀律性工程流程：Brainstorming（設計探索）→ Planning（任務拆解）→ TDD（紅綠重構）→ Subagent Development（子 agent 任務分配）→ Code Review。支援 Claude Code / Codex CLI / Gemini CLI / Cursor 等多平台。核心理念是「mandatory workflows, not suggestions」。
