import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_WIDE';
pptx.author = '張育慈 Ruby';
pptx.company = 'YunTech Workshop';
pptx.subject = 'Day 3 — 生成式人工智慧於文本資料分析的應用';
pptx.title = 'Day 3｜生成式人工智慧於文本資料分析的應用';
pptx.lang = 'zh-TW';
pptx.theme = {
  headFontFace: 'Noto Sans TC',
  bodyFontFace: 'Noto Sans TC',
  lang: 'zh-TW',
};

const C = {
  ink: '163A35', cream: 'F4EFE6', teal: '65B8A6', coral: 'E37B62',
  slate: '47645F', mist: 'DCE9E3', white: 'FFFFFF', dark: '102A27',
  pale: 'EDF4F1', gray: '667A76', line: 'BCD3CC', yellow: 'F4C95D',
};
const W = 13.333;
const H = 7.5;
const S = pptx.ShapeType;
const outPath = path.resolve('slides/day-03-generative-ai-text-analysis.pptx');

function shadow() {
  return { type: 'outer', color: '000000', opacity: 0.12, blur: 2, angle: 135, offset: 1 };
}

function addRect(slide, x, y, w, h, color, radius = false, line = color) {
  slide.addShape(radius ? S.roundRect : S.rect, {
    x, y, w, h, rectRadius: radius ? 0.08 : undefined,
    fill: { color }, line: { color: line, transparency: line === color ? 100 : 0 },
  });
}

function text(slide, value, x, y, w, h, opts = {}) {
  slide.addText(value, {
    x, y, w, h, fontFace: 'Noto Sans TC', fontSize: 18, color: C.ink,
    margin: 0, breakLine: false, fit: 'shrink', valign: 'mid',
    ...opts,
  });
}

function addFooter(slide, n, section, dark = false) {
  slide.addShape(S.line, { x: 0.55, y: 7.05, w: 12.2, h: 0, line: { color: dark ? '4F8178' : C.line, width: 0.65 } });
  text(slide, section.toUpperCase(), 0.58, 7.12, 3.5, 0.2, { fontSize: 8.5, color: dark ? C.teal : C.gray, charSpacing: 1.2, bold: true });
  text(slide, String(n).padStart(2, '0'), 12.1, 7.08, 0.6, 0.22, { fontSize: 10, color: dark ? C.teal : C.gray, align: 'right', bold: true });
}

function addPipeline(slide, active, dark = false) {
  const labels = ['S', 'C', 'P', 'A', 'R', 'I'];
  const x0 = 7.02; const y = 7.11; const gap = 0.62;
  labels.forEach((label, i) => {
    const fill = i === active ? C.teal : (dark ? '2A534D' : C.mist);
    slide.addShape(S.ellipse, { x: x0 + i * gap, y: y - 0.01, w: 0.18, h: 0.18, fill: { color: fill }, line: { color: fill } });
    text(slide, label, x0 + 0.23 + i * gap, y - 0.005, 0.18, 0.16, { fontSize: 7.5, bold: true, color: dark ? C.mist : C.gray, align: 'center' });
  });
}

function base(title, section, n, { dark = false, active = null, kicker = '' } = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: dark ? C.dark : C.cream };
  if (dark) {
    slide.addShape(S.arc, { x: 9.8, y: -1.05, w: 4.5, h: 4.5, adjustPoint: 0.25, line: { color: C.teal, transparency: 50, width: 2 }, fill: { color: C.dark, transparency: 100 } });
    slide.addShape(S.arc, { x: 10.6, y: -0.25, w: 3.1, h: 3.1, adjustPoint: 0.25, line: { color: C.coral, transparency: 40, width: 1.3 }, fill: { color: C.dark, transparency: 100 } });
  }
  if (kicker) text(slide, kicker.toUpperCase(), 0.62, 0.44, 5.0, 0.24, { fontSize: 10, charSpacing: 1.6, bold: true, color: dark ? C.teal : C.slate });
  text(slide, title, 0.62, kicker ? 0.73 : 0.52, 11.7, 0.65, { fontSize: 32, bold: true, color: dark ? C.white : C.ink, fit: 'shrink' });
  addFooter(slide, n, section, dark);
  if (active !== null) addPipeline(slide, active, dark);
  return slide;
}

function card(slide, x, y, w, h, heading, body, color = C.white, accent = C.teal, options = {}) {
  addRect(slide, x, y, w, h, color, true, options.line ?? color);
  slide.addShape(S.rect, { x, y, w: 0.1, h, fill: { color: accent }, line: { color: accent } });
  text(slide, heading, x + 0.28, y + 0.25, w - 0.5, 0.35, { fontSize: options.headingSize ?? 18, bold: true, color: options.headingColor ?? C.ink });
  text(slide, body, x + 0.28, y + 0.76, w - 0.52, h - 0.95, { fontSize: options.bodySize ?? 13.5, color: options.bodyColor ?? C.slate, valign: 'top', breakLine: false });
}

function note(slide, say, action) {
  slide.addNotes(`講師關鍵句：${say}\n\n學生動作：${action}`);
}

function processNode(slide, x, y, label, sub, color, index) {
  slide.addShape(S.ellipse, { x, y, w: 0.72, h: 0.72, fill: { color }, line: { color } });
  text(slide, String(index), x, y + 0.18, 0.72, 0.22, { fontSize: 16, bold: true, align: 'center', color: C.white });
  text(slide, label, x - 0.2, y + 0.88, 1.12, 0.25, { fontSize: 12, bold: true, align: 'center', color: C.ink });
  text(slide, sub, x - 0.32, y + 1.16, 1.38, 0.36, { fontSize: 8.8, align: 'center', color: C.gray, valign: 'top' });
}

// 01 — Title
{
  const slide = base('Day 3｜生成式人工智慧於文本資料分析的應用', 'DAY 03', 1, { dark: true, kicker: 'YunTech Workshop · 2026 / 08 / 05' });
  text(slide, '從公開文本，到可引用的校務知識應用', 0.66, 1.62, 8.2, 0.48, { fontSize: 22, color: C.mist });
  const labels = ['公開網站', '原始文件', '可讀文字', '可引用答案'];
  labels.forEach((label, i) => {
    const x = 0.7 + i * 2.9;
    addRect(slide, x, 3.0, 2.35, 1.25, i === 3 ? C.teal : '244842', true);
    text(slide, label, x + 0.2, 3.34, 1.95, 0.28, { fontSize: 18, bold: true, align: 'center', color: C.white });
    if (i < 3) text(slide, '→', x + 2.42, 3.38, 0.35, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, '講師｜張育慈 Ruby', 0.68, 5.82, 3.4, 0.25, { fontSize: 13, color: C.teal });
  note(slide, '今天的重點不是做一個聊天機器人，而是讓每個答案都能回到資料來源。', '打開課程 repo，確認已 clone Day-03 資料夾。');
}

// 02 — outcome
{
  const slide = base('今天結束前，你會完成什麼？', 'OPENING', 2, { active: 0, kicker: '今日成果' });
  const items = [
    ['資料範圍', '確認起始網址與白名單，不任意擴大。'],
    ['文本資產', '保留原始檔、Markdown、品質狀態與來源。'],
    ['AI 應用', '建立可引用問答，無證據時不猜測。'],
    ['改善閉環', '由問答紀錄找出下一輪要補的資料或規則。'],
  ];
  items.forEach((it, i) => card(slide, 0.75 + (i % 2) * 6.08, 1.55 + Math.floor(i / 2) * 2.02, 5.56, 1.52, it[0], it[1], C.white, [C.teal, C.coral, C.yellow, C.slate][i], { bodySize: 16 }));
  text(slide, 'RAG 是驗證資料是否可用的一環，不是今天唯一的成果。', 0.78, 5.92, 11.8, 0.34, { fontSize: 19, bold: true, color: C.ink, align: 'center' });
  note(slide, '先讓大家看見最後成果，接下來每一步才知道為何需要。', '確認今天由自己完成一條本機資料管線。');
}

// 03 — timetable
{
  const slide = base('今日時程與檢查點', 'OPENING', 3, { active: 0, kicker: '09:00 — 16:30' });
  const times = [
    ['09:00', '工具建置', 'MCP + Ollama'], ['09:30', '範圍與來源', 'scope'], ['10:00', '爬取、解析、檢查', 'raw → markdown'],
    ['13:30', 'AI 分析', 'chunks'], ['14:30', '向量檢索問答', 'RAG'], ['15:40', '自我測試改善', 'backlog'],
  ];
  times.forEach((it, i) => {
    const x = 0.75 + i * 2.05;
    slide.addShape(S.line, { x: x + 0.25, y: 3.2, w: 1.55, h: 0, line: { color: i === 5 ? C.mist : C.teal, width: 2 } });
    slide.addShape(S.ellipse, { x, y: 2.92, w: 0.55, h: 0.55, fill: { color: i < 3 ? C.teal : C.coral }, line: { color: C.white, width: 1 } });
    text(slide, it[0], x - 0.12, 2.25, 1.2, 0.24, { fontSize: 14, bold: true, color: C.ink });
    text(slide, it[1], x - 0.12, 3.72, 1.75, 0.28, { fontSize: 14, bold: true, color: C.ink });
    text(slide, it[2], x - 0.12, 4.12, 1.75, 0.22, { fontSize: 10, color: C.gray });
  });
  card(slide, 3.72, 5.15, 5.9, 0.85, '每完成一段，就先檢查再往下走', '避免把錯誤資料一路帶到 RAG。', C.pale, C.teal, { bodySize: 14 });
  note(slide, '前 30 分鐘一起把工具裝好；之後每個階段都要留下可回查的產物。', '完成健康檢查後，依時程安排工作，午休前完成解析與品質檢查。');
}

// 04 — role separation
{
  const slide = base('先理解分工：誰負責取得？誰負責理解？', 'VOCABULARY', 4, { active: 1, kicker: '概念橋接 01' });
  const roles = [
    ['Crawler', '取得白名單內的公開網頁與附件', C.coral],
    ['MarkItDown', '把已下載的文件轉成 Markdown', C.teal],
    ['RAG', '找 chunks，再用模型回答與引用', C.ink],
  ];
  roles.forEach((r, i) => {
    const x = 0.9 + i * 4.15;
    addRect(slide, x, 2.0, 3.25, 2.28, C.white, true);
    slide.addShape(S.ellipse, { x: x + 1.18, y: 1.52, w: 0.9, h: 0.9, fill: { color: r[2] }, line: { color: C.white, width: 1 } });
    text(slide, String(i + 1), x + 1.18, 1.77, 0.9, 0.25, { fontSize: 20, bold: true, color: C.white, align: 'center' });
    text(slide, r[0], x + 0.3, 2.65, 2.65, 0.3, { fontSize: 21, bold: true, align: 'center' });
    text(slide, r[1], x + 0.35, 3.24, 2.55, 0.46, { fontSize: 13.5, color: C.slate, align: 'center', valign: 'top' });
    if (i < 2) text(slide, '→', x + 3.34, 2.85, 0.55, 0.3, { fontSize: 28, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, '關鍵順序：先爬取，再解析；先檢索，再生成。', 1.3, 5.45, 10.7, 0.34, { fontSize: 22, bold: true, align: 'center', color: C.ink });
  note(slide, '許多混亂都來自把工具角色混在一起。今天要把每個工具放在正確位置。', '說出：MarkItDown 是解析器，不是爬蟲。');
}

// 05 — MCP
{
  const slide = base('MCP 與 MarkItDown：讓 Codex 取得一個「文件解析能力」', 'VOCABULARY', 5, { active: 2, kicker: '概念橋接 02' });
  addRect(slide, 0.86, 1.72, 3.1, 3.4, C.white, true);
  text(slide, 'Codex', 1.22, 2.15, 2.35, 0.42, { fontSize: 27, bold: true, align: 'center' });
  text(slide, '理解你的指令\n協助整理與分析', 1.22, 2.88, 2.35, 0.65, { fontSize: 16, color: C.slate, align: 'center' });
  addRect(slide, 5.18, 2.52, 2.75, 1.65, C.teal, true);
  text(slide, 'MCP', 5.55, 2.78, 2.0, 0.35, { fontSize: 28, bold: true, color: C.white, align: 'center' });
  text(slide, '標準接頭', 5.55, 3.32, 2.0, 0.24, { fontSize: 15, color: C.white, align: 'center' });
  addRect(slide, 9.15, 1.72, 3.15, 3.4, C.white, true);
  text(slide, 'MarkItDown', 9.43, 2.15, 2.6, 0.42, { fontSize: 24, bold: true, align: 'center' });
  text(slide, 'HTML / PDF / DOCX\n→ Markdown', 9.43, 2.88, 2.6, 0.65, { fontSize: 16, color: C.slate, align: 'center' });
  text(slide, '↔', 4.12, 2.95, 0.75, 0.3, { fontSize: 32, bold: true, color: C.coral, align: 'center' });
  text(slide, '↔', 8.2, 2.95, 0.75, 0.3, { fontSize: 32, bold: true, color: C.coral, align: 'center' });
  card(slide, 2.05, 5.65, 9.25, 0.73, '不要搞錯', 'MCP 是 Codex 呼叫工具的接頭；MarkItDown 是把「已下載」文件轉為 Markdown 的工具。', C.pale, C.coral, { bodySize: 15 });
  note(slide, 'MCP 不是模型，也不是爬蟲；它是讓 Codex 能使用外部工具的標準接頭。', '完成一筆成功下載後，才以 file: URI 測試 MarkItDown MCP。');
}

// 06 — vocabulary
{
  const slide = base('七個關鍵名詞，全部都回到「可追溯」', 'VOCABULARY', 6, { active: 3, kicker: '概念橋接 03' });
  const terms = [
    ['manifest', '資料護照：來源、時間、路徑'], ['metadata', '描述文件或段落的欄位'], ['chunk', '可檢索、可引用的小段文本'],
    ['provenance', '答案回查來源的證據鏈'], ['RAG', '先找證據，再生成回答'], ['Ollama', '筆電上的本機模型服務'], ['JSONL', '每行一筆、方便追加的紀錄'],
  ];
  terms.forEach((t, i) => {
    const col = i % 4; const row = Math.floor(i / 4);
    card(slide, 0.63 + col * 3.15, 1.55 + row * 2.15, 2.8, 1.55, t[0], t[1], C.white, [C.teal, C.coral, C.yellow, C.slate][col], { headingSize: 17, bodySize: 12.5 });
  });
  text(slide, '問答不是終點：答案必須帶著來源回來。', 0.82, 5.98, 11.75, 0.3, { fontSize: 20, bold: true, align: 'center', color: C.ink });
  note(slide, '這些名詞不是考試名詞，而是今天每一步都會出現的資料責任。', '在 repo README 找到資料夾結構與 provenance 欄位。');
}

// 07 — scope
{
  const slide = base('Step 00｜建立個人專案，再寫入統一資料範圍', 'SCOPE', 7, { active: 0, kicker: '操作 01 · 00-create-project-and-start-url' });
  card(slide, 0.72, 1.55, 5.85, 3.95, '現在要做什麼？', '1. 建立自己的專案資料夾\n2. 起始網址：tve.yuntech.edu.tw\n3. 固定 20 HTML／20 附件、1 秒間隔\n4. 寫入 crawl_scope.json 後才爬取', C.white, C.teal, { bodySize: 16 });
  addRect(slide, 7.15, 1.55, 5.38, 3.95, C.dark, true);
  text(slide, '預期產物', 7.52, 1.95, 4.5, 0.3, { fontSize: 20, bold: true, color: C.teal });
  text(slide, 'my-project/\n├── data/raw/\n├── data/manifests/\n├── data/markdown/\n├── data/processed/\n├── analysis/  rag/  feedback/', 7.58, 2.55, 4.45, 2.2, { fontSize: 15, color: C.white, fontFace: 'Consolas', valign: 'top' });
  card(slide, 2.85, 5.88, 7.6, 0.55, '開始條件', '確認 robots 與網站規範允許，且 scope 已寫入完整主機、格式、上限與間隔。', 'FDE7E1', C.coral, { headingSize: 14, bodySize: 14 });
  note(slide, '資料邊界先於工具操作。今天範圍統一，但每人獨立完成。', '貼上 Prompt 00，建立個人資料夾與固定 crawl scope。');
}
// 08 — crawl
{
  const slide = base('Step 01｜限定範圍爬取，保留原始資料', 'CRAWL', 8, { active: 1, kicker: '操作 02 · 01-crawl-specified-site' });
  const stages = [
    ['讀 scope', 'allowed_hosts\nallowed_path_prefix'], ['判格式', 'Content-Type\nContent-Disposition\n連結文字'], ['保存原始檔', 'data/raw/<document_id>/\n<原始檔名>'], ['寫 manifest', 'URL · 時間 · 狀態\nraw_path'],
  ];
  stages.forEach((s, i) => processNode(slide, 0.9 + i * 3.05, 2.05, s[0], s[1], [C.teal, C.yellow, C.coral, C.ink][i], i + 1));
  card(slide, 2.0, 5.25, 9.45, 0.73, '關鍵規則', '只用同一主機；20／20 上限、1 秒間隔；不可改檔名；失敗也記錄 error_message。', C.pale, C.coral, { bodySize: 15 });
  note(slide, '爬取不是把網頁抓下來而已；它要遵守站方規範並產生可追溯的 manifest。', '貼上 Prompt 01，依固定 scope 與速率限制爬取。');
}
// 09 — parse
{
  const slide = base('Step 02｜解析已下載文件', 'PARSE', 9, { active: 2, kicker: '操作 03 · 02-parse-with-markitdown' });
  card(slide, 0.8, 1.55, 3.55, 3.75, '輸入', '從 crawl_manifest.json 選 crawl_status: success 的 raw_path。\n\n使用本機 file: URI。', C.white, C.coral, { bodySize: 16 });
  card(slide, 4.88, 1.55, 3.55, 3.75, '轉換', '透過 Codex 的 MarkItDown MCP，轉為 data/markdown/<document_id>.md。\n\n不修改 data/raw。', C.white, C.teal, { bodySize: 16 });
  card(slide, 8.96, 1.55, 3.55, 3.75, '保留 metadata', 'Markdown 檔頭：\ndocument_id\nsource_url\ncrawled_at\nraw_path', C.white, C.ink, { bodySize: 16 });
  text(slide, '先爬取 → 再解析：MarkItDown 不是網站爬蟲。', 1.2, 5.85, 10.9, 0.28, { fontSize: 20, bold: true, align: 'center' });
  note(slide, '此時才實際確認 MarkItDown MCP，因為我們已經有一份可解析的檔案。', '貼上 Prompt 02，選擇一筆成功下載的 raw_path。');
}

// 10 — quality
{
  const slide = base('品質檢查：不是所有轉出的文字都可以直接交給 AI', 'PARSE', 10, { active: 2, kicker: '檢查點' });
  const cols = [
    ['ready_for_analysis', '標題、段落與表格可讀\n可以進入 chunks', C.teal],
    ['needs_review', '掃描、表格或結構有缺失\n先人工檢視', C.coral],
    ['excluded', '受限、白名單外或無法確認\n不進後續流程', C.slate],
  ];
  cols.forEach((c, i) => {
    const x = 0.83 + i * 4.16;
    addRect(slide, x, 1.72, 3.55, 3.5, c[2], true);
    text(slide, c[0], x + 0.25, 2.28, 3.05, 0.32, { fontSize: 19, bold: true, align: 'center', color: C.white, fit: 'shrink' });
    text(slide, c[1], x + 0.4, 3.12, 2.75, 0.68, { fontSize: 16, color: C.white, align: 'center', valign: 'mid' });
    text(slide, i === 0 ? '✓ 可進 RAG' : '✕ 暫停', x + 0.4, 4.28, 2.75, 0.28, { fontSize: 16, bold: true, color: C.white, align: 'center' });
  });
  card(slide, 2.0, 5.8, 9.4, 0.62, '品質報告', '每份結果寫入 data/markdown/quality_report.jsonl，保留檢查特徵、原因與時間。', C.pale, C.teal, { bodySize: 14.5 });
  note(slide, '不要把 PDF 轉出一堆破碎表格，卻假裝它已經適合問答。', '為文件設定品質狀態，非 ready 必須寫下原因。');
}

// 11 — chunks
{
  const slide = base('Step 03｜把文件切成可檢索、可引用的 chunks', 'ANALYZE', 11, { active: 3, kicker: '操作 04 · 03-process-and-analyze-text' });
  addRect(slide, 0.85, 1.58, 3.0, 3.7, C.white, true);
  text(slide, '一份長文件', 1.2, 1.95, 2.3, 0.3, { fontSize: 20, bold: true, align: 'center' });
  ['第一章：修業規定', '第二章：資格考', '第三章：畢業流程'].forEach((t, i) => addRect(slide, 1.22, 2.58 + i * 0.72, 2.24, 0.46, i === 1 ? C.mist : C.pale, true));
  ['第一章：修業規定', '第二章：資格考', '第三章：畢業流程'].forEach((t, i) => text(slide, t, 1.36, 2.7 + i * 0.72, 1.95, 0.18, { fontSize: 11.5, align: 'center' }));
  text(slide, '→', 4.05, 3.1, 0.55, 0.3, { fontSize: 28, bold: true, color: C.coral, align: 'center' });
  ['chunk-001', 'chunk-002', 'chunk-003'].forEach((t, i) => {
    card(slide, 4.92 + (i % 2) * 3.72, 1.65 + Math.floor(i / 2) * 2.02, 3.25, 1.42, t, i === 2 ? '畢業流程\n來源章節、網址、時間' : '段落文字\n來源章節、網址、時間', C.white, i === 2 ? C.coral : C.teal, { headingSize: 16, bodySize: 12.5 });
  });
  text(slide, '每段都不能失去 document_id、source_url、crawled_at。', 1.38, 5.85, 10.6, 0.28, { fontSize: 18, bold: true, align: 'center' });
  note(slide, 'chunk 不是隨意切字數；它要保留足夠語意，也保留回查來源。', '只處理 ready_for_analysis 的 Markdown，建立 chunks JSONL。');
}

// 12 — analysis table
{
  const slide = base('生成式 AI 文本分析：結論要與證據分開', 'ANALYZE', 12, { active: 3, kicker: '分析表' });
  const headers = ['chunk_id', 'summary', 'category', 'document_evidence', 'ai_interpretation'];
  const widths = [1.25, 2.25, 1.55, 3.35, 3.35];
  let x = 0.66;
  headers.forEach((h, i) => { addRect(slide, x, 1.75, widths[i], 0.6, C.ink); text(slide, h, x + 0.08, 1.94, widths[i] - 0.16, 0.16, { fontSize: 10.5, bold: true, color: C.white, align: 'center' }); x += widths[i]; });
  const data = [
    ['course-004', '修課計畫提交期限', '修業規範', '「第一年第一學期結束前…送所辦」', '此規定關注修課計畫的早期確認。'],
    ['course-009', '資格考申請資料', '行政流程', '「應檢附…」', '可能是學生常詢問的準備事項。'],
  ];
  data.forEach((row, ri) => {
    let cx = 0.66;
    row.forEach((v, i) => { addRect(slide, cx, 2.36 + ri * 1.14, widths[i], 1.12, ri % 2 ? C.pale : C.white, false, C.line); text(slide, v, cx + 0.09, 2.52 + ri * 1.14, widths[i] - 0.18, 0.72, { fontSize: i > 2 ? 10.5 : 11.5, color: i === 4 ? C.slate : C.ink, valign: 'top' }); cx += widths[i]; });
  });
  card(slide, 2.06, 5.52, 9.15, 0.72, '原則', '文件證據是原文；AI 解讀必須明確標示為解讀，不能偽裝成規定。', 'FDE7E1', C.coral, { bodySize: 15 });
  note(slide, 'AI 可以幫忙摘要與分類，但不能把自己的推論寫成文件原文。', '建立 text_analysis.md，檢查 evidence 與 interpretation 是否分欄。');
}

// 13 — RAG
{
  const slide = base('Step 04｜RAG：先找證據，再讓模型回答', 'RAG', 13, { active: 4, kicker: '操作 05 · 04-build-cited-rag' });
  const stages = [
    ['學生問題', '最晚何時送所辦？', C.coral], ['向量檢索', 'nomic-embed-text-v2-moe\n最多三筆', C.teal], ['本機模型', 'Ollama\nqwen2.5:3b', C.ink], ['回答＋引用', '答案、URL、段落、時間', C.teal],
  ];
  stages.forEach((s, i) => {
    const x = 0.75 + i * 3.1;
    card(slide, x, 2.0, 2.55, 2.2, s[0], s[1], C.white, s[2], { headingSize: 17, bodySize: 13.5 });
    if (i < 3) text(slide, '→', x + 2.62, 2.87, 0.35, 0.25, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  card(slide, 1.45, 5.3, 10.35, 0.73, '安全規則', '顯示前三個 chunks 與相似度；找不到足夠證據時，不呼叫模型，直接輸出 insufficient_evidence。', C.pale, C.coral, { bodySize: 15 });
  note(slide, '向量檢索是工具步驟；學生要核對的是找回的 evidence 是否支撐回答。', '開啟 Prompt 04，建立本機 Streamlit 向量檢索問答介面。');
}

// 14 — supported chat
{
  const slide = base('RAG 實測｜有證據時，回答要能回到原文', 'RAG', 14, { active: 4, kicker: '支持性回答' });
  addRect(slide, 1.05, 1.52, 11.15, 4.85, C.white, true);
  addRect(slide, 1.55, 2.02, 5.4, 0.76, C.mist, true);
  text(slide, '博士生修課計畫最晚何時送所辦？', 1.85, 2.25, 4.8, 0.22, { fontSize: 16, color: C.ink });
  addRect(slide, 5.55, 3.13, 5.95, 1.08, 'E0F1EC', true);
  text(slide, '第一年第一學期結束前', 5.88, 3.43, 5.25, 0.27, { fontSize: 19, bold: true, color: C.ink });
  text(slide, '狀態：supported', 5.88, 3.82, 2.0, 0.18, { fontSize: 11.5, bold: true, color: C.teal });
  card(slide, 2.05, 4.8, 9.15, 0.8, '引用與檢索', '1-1 博士生修課計畫｜四、預定在本校修課學分數／備註｜蒐集：2026-07-22｜相似度：0.87', C.pale, C.teal, { headingSize: 13, bodySize: 13 });
  text(slide, '期限、數字、單位名稱都必須可逐字回查。', 2.0, 6.0, 9.4, 0.25, { fontSize: 16, bold: true, align: 'center', color: C.ink });
  note(slide, '支持性答案不是模型講得像真的，而是每個關鍵事實都有來源。', '在 Streamlit 介面輸入有證據的問題，確認引用完整顯示。');
}

// 15 — insufficient + test types
{
  const slide = base('RAG 實測｜不足證據時，不生成答案', 'RAG', 15, { active: 4, kicker: '不足證據與四類自訂測試' });
  addRect(slide, 0.8, 1.5, 5.65, 3.45, C.white, true);
  text(slide, '資格考什麼時候申請？', 1.18, 1.95, 4.9, 0.3, { fontSize: 18, bold: true });
  addRect(slide, 1.18, 2.62, 4.9, 1.1, 'FDE7E1', true);
  text(slide, '目前語料沒有足夠證據回答此問題。', 1.5, 2.95, 4.3, 0.24, { fontSize: 16.5, bold: true, color: C.ink, align: 'center' });
  text(slide, '狀態：insufficient_evidence', 1.43, 3.48, 4.42, 0.18, { fontSize: 11.5, bold: true, color: C.coral, align: 'center' });
  const tests = ['有依據的規章或流程', '公開聯絡資訊', '模糊問題', '語料範圍外問題'];
  tests.forEach((t, i) => card(slide, 7.15 + (i % 2) * 2.72, 1.5 + Math.floor(i / 2) * 1.72, 2.38, 1.25, `${i + 1}`, t, C.white, [C.teal, C.yellow, C.coral, C.slate][i], { headingSize: 18, bodySize: 12.5 }));
  card(slide, 7.12, 5.05, 5.35, 0.75, '進階挑戰', '有衝突或過期文件時，列出每個來源與 crawled_at；不自行判定現行規定。', C.pale, C.slate, { bodySize: 13 });
  note(slide, '不知道不是失敗。缺少證據時不生成，才是可以被信任的系統行為。', '自行設計四類測試，確認每題都留下自我測試紀錄。');
}

// 16 — query log
{
  const slide = base('Step 05｜每一次自我測試，都是系統可以變好的訊號', 'IMPROVE', 16, { active: 5, kicker: '操作 06 · 05-analyze-query-feedback' });
  addRect(slide, 0.85, 1.52, 11.65, 3.95, C.white, true);
  const headers = ['query_id', 'question', 'answer_status', 'cited_chunk_ids', 'self_test_note'];
  const widths = [1.55, 3.35, 2.1, 2.3, 2.35]; let x = 1.0;
  headers.forEach((h, i) => { addRect(slide, x, 1.94, widths[i], 0.52, C.ink); text(slide, h, x + 0.08, 2.1, widths[i] - 0.16, 0.15, { fontSize: 10, bold: true, color: C.white, align: 'center' }); x += widths[i]; });
  const values = ['q-103', '資格考何時申請？', 'insufficient_evidence', '無', '缺少可用規章']; x = 1.0;
  values.forEach((v, i) => { addRect(slide, x, 2.46, widths[i], 0.94, C.pale, false, C.line); text(slide, v, x + 0.1, 2.75, widths[i] - 0.2, 0.18, { fontSize: i === 2 ? 10.5 : 12, color: C.ink, align: 'center' }); x += widths[i]; });
  text(slide, 'JSONL：每行一筆紀錄，方便追加、分類與分析。', 1.3, 4.05, 10.7, 0.3, { fontSize: 18, bold: true, align: 'center' });
  card(slide, 2.18, 5.85, 8.9, 0.55, '不要只看熱門問題', '更要看：哪些問題沒答到？是缺文件、解析壞了，還是檢索不準？', 'FDE7E1', C.coral, { headingSize: 13, bodySize: 13.5 });
  note(slide, '自我測試紀錄把一次問答，轉成下一次改善的資料；它不是真實使用者回饋。', '確認 feedback/query_log.jsonl 每題都有一筆自我測試紀錄。');
}

// 17 — backlog
{
  const slide = base('從自我測試到改善 backlog', 'IMPROVE', 17, { active: 5, kicker: '讓資料管線形成閉環' });
  const flow = [
    ['現象', '資格考問題\n反覆無法回答'], ['證據', 'query_id · 狀態\n沒有引用'], ['原因', '缺少規章\n或解析失敗'], ['動作', 'add_source\nrepair_parse'],
  ];
  flow.forEach((f, i) => {
    const x = 0.8 + i * 3.1;
    card(slide, x, 2.0, 2.58, 2.45, f[0], f[1], C.white, [C.coral, C.yellow, C.slate, C.teal][i], { headingSize: 19, bodySize: 15, });
    if (i < 3) text(slide, '→', x + 2.65, 2.95, 0.3, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, '允許的改善動作：add_source · repair_parse · revise_chunking_or_metadata · improve_retrieval · revise_prompt', 0.92, 5.47, 11.55, 0.36, { fontSize: 14, color: C.slate, align: 'center' });
  note(slide, '改善不是憑感覺調 prompt；每一項 backlog 都要回連 query_id 和證據。', '貼上 Prompt 05，將自我測試紀錄分類為可執行的改善動作。');
}

// 18 — self-check and close
{
  const slide = base('把文件變成可用的知識，前提是它仍然可追溯。', 'WRAP UP', 18, { dark: true, active: 5, kicker: '個人自我完成檢核' });
  const principles = ['範圍與 raw', '品質與 chunks', '向量檢索與引用', '自我測試', '改善 backlog'];
  principles.forEach((p, i) => {
    const x = 0.76 + i * 2.5;
    slide.addShape(S.ellipse, { x, y: 2.45, w: 1.02, h: 1.02, fill: { color: i === 4 ? C.coral : '28534C' }, line: { color: C.teal, width: 1 } });
    text(slide, String(i + 1), x, 2.75, 1.02, 0.22, { fontSize: 17, bold: true, color: C.white, align: 'center' });
    text(slide, p, x - 0.38, 3.86, 1.78, 0.38, { fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'mid' });
  });
  text(slide, '只在本機執行｜回答附來源｜以原始網站最新公告為準', 1.2, 5.6, 10.9, 0.3, { fontSize: 20, color: C.teal, bold: true, align: 'center' });
  text(slide, '完成後，用一題有引用回答與一題不足證據回答自行核對。', 2.1, 6.25, 9.1, 0.3, { fontSize: 16, color: C.mist, align: 'center' });
  note(slide, '今天不是交作業；請每個人用自己的電腦核對完整證據鏈。', '完成個人自我檢核；不公開部署或分享連結。');
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
await pptx.writeFile({ fileName: outPath });
console.log(`created: ${outPath}`);
