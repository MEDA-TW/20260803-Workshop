import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  // MEDA Keynote template: white grid, navy typography, and restrained blue accents.
  ink: '153E6E', cream: 'FFFFFF', teal: '3679B9', coral: 'E58A4A',
  slate: '49657A', mist: 'E8F1F8', white: 'FFFFFF', dark: '153E6E',
  pale: 'F4F8FB', gray: '6F8291', line: 'D7E3EC', yellow: 'E8B849',
};
const W = 13.333;
const H = 7.5;
const S = pptx.ShapeType;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const instructorDir = path.resolve(scriptDir, '..', '..');
const outPath = path.join(instructorDir, 'slides', 'day-03-generative-ai-text-analysis.pptx');
const medaLogoPath = path.join(instructorDir, 'slides', 'assets', 'meda-logo.png');

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
  slide.background = { color: C.cream };
  // Matches the template's subtle paper grid without competing with teaching content.
  for (let x = 0; x <= W; x += 0.5) slide.addShape(S.line, { x, y: 0, w: 0, h: H, line: { color: 'EAF0F5', width: 0.35 } });
  for (let y = 0; y <= H; y += 0.5) slide.addShape(S.line, { x: 0, y, w: W, h: 0, line: { color: 'EAF0F5', width: 0.35 } });
  slide.addImage({ path: medaLogoPath, x: 11.66, y: 0.18, w: 1.12, h: 0.29 });
  if (kicker) text(slide, kicker.toUpperCase(), 0.62, 0.44, 7.4, 0.24, { fontSize: 10, charSpacing: 1.6, bold: true, color: C.slate });
  text(slide, title, 0.62, kicker ? 0.73 : 0.52, 10.6, 0.65, { fontSize: 32, bold: true, color: C.ink, fit: 'shrink' });
  addFooter(slide, n, section, false);
  if (active !== null) addPipeline(slide, active, false);
  return slide;
}

function card(slide, x, y, w, h, heading, body, color = C.white, accent = C.teal, options = {}) {
  addRect(slide, x, y, w, h, color, true, options.line ?? color);
  slide.addShape(S.rect, { x, y, w: 0.1, h, fill: { color: accent }, line: { color: accent } });
  // Bottom callouts are intentionally compact: render the label and message on
  // one line, rather than applying the normal stacked-card geometry to a 0.5–0.9" box.
  if (h < 1) {
    const headingWidth = Math.min(Math.max(w * 0.22, 1.25), 2.15);
    text(slide, heading, x + 0.28, y + 0.12, headingWidth, h - 0.22, {
      fontSize: options.headingSize ?? 13, bold: true, color: options.headingColor ?? C.ink,
    });
    text(slide, body, x + 0.28 + headingWidth, y + 0.12, w - headingWidth - 0.52, h - 0.22, {
      fontSize: options.bodySize ?? 12.5, color: options.bodyColor ?? C.slate, valign: 'mid', breakLine: false,
    });
    return;
  }
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
  text(slide, '先用生成式 AI 分析校務文件，再用問答助手驗證解讀', 0.66, 1.62, 9.5, 0.48, { fontSize: 20, color: C.slate });
  const labels = ['四份原始文件', '文件分析表', '搜尋索引', '可引用問答'];
  labels.forEach((label, i) => {
    const x = 0.7 + i * 2.9;
    addRect(slide, x, 3.0, 2.35, 1.25, i === 3 ? C.teal : C.ink, true);
    text(slide, label, x + 0.2, 3.34, 1.95, 0.28, { fontSize: 18, bold: true, align: 'center', color: C.white });
    if (i < 3) text(slide, '→', x + 2.42, 3.38, 0.35, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, '講師｜張育慈 Ruby', 0.68, 5.82, 3.4, 0.25, { fontSize: 13, color: C.teal });
  note(slide, '今天的重點不是做一個聊天機器人，而是讓 AI 的解讀與每個答案都能回到資料來源。', '下載工作坊 ZIP，開啟 course/day-03/rag-demo。');
}

// 02 — outcome
{
  const slide = base('今天結束前，你會完成什麼？', 'OPENING', 2, { active: 0, kicker: '今日成果' });
  const items = [
    ['四份原始文件', '講師已提供 raw 與來源紀錄，學生不必找網址。'],
    ['校務文件分析表', '分開原文、AI 解讀、適用條件與不確定處。'],
    ['自己的資料索引', 'Markdown、品質結果、chunks 與向量索引。'],
    ['可引用 RAG', '回答只用自己的來源；證據不足時明確停止。'],
  ];
  items.forEach((it, i) => card(slide, 0.75 + (i % 2) * 6.08, 1.55 + Math.floor(i / 2) * 2.02, 5.56, 1.52, it[0], it[1], C.white, [C.teal, C.coral, C.yellow, C.slate][i], { bodySize: 16 }));
  text(slide, '完成順序不能倒過來：原始文件 → 分析表 → 索引 → Streamlit 問答與歷程。', 0.78, 5.92, 11.8, 0.34, { fontSize: 19, bold: true, color: C.ink, align: 'center' });
  note(slide, '今天不是先做聊天畫面；先讓 AI 協助讀懂並整理文件。', '確認今天有兩個成果：分析表和可引用問答助手。');
}

// 03 — timetable
{
  const slide = base('今日時程與檢查點', 'OPENING', 3, { active: 0, kicker: '09:00 — 16:30' });
  const times = [
    ['09:00', '工具建置', 'Codex + Ollama'], ['09:30', '讀懂來源資料', 'raw + manifest'], ['10:00', '解析與品質檢查', 'raw → Markdown'],
    ['13:30', '建立分析表', '原文 → AI 解讀'], ['14:30', '索引與 Streamlit', 'Codex + RAG'], ['15:40', '測試與歷程', '問答紀錄'],
  ];
  times.forEach((it, i) => {
    const x = 0.75 + i * 2.05;
    slide.addShape(S.line, { x: x + 0.25, y: 3.2, w: 1.55, h: 0, line: { color: i === 5 ? C.mist : C.teal, width: 2 } });
    slide.addShape(S.ellipse, { x, y: 2.92, w: 0.55, h: 0.55, fill: { color: i < 3 ? C.teal : C.coral }, line: { color: C.white, width: 1 } });
    text(slide, it[0], x - 0.12, 2.25, 1.2, 0.24, { fontSize: 14, bold: true, color: C.ink });
    text(slide, it[1], x - 0.12, 3.72, 1.75, 0.28, { fontSize: 14, bold: true, color: C.ink });
    text(slide, it[2], x - 0.12, 4.12, 1.75, 0.22, { fontSize: 10, color: C.gray });
  });
  note(slide, '前 30 分鐘一起把工具裝好；之後每個階段都要留下可回查的產物。', '完成健康檢查後，依時程安排工作，午休前完成解析與品質檢查。');
}

// 04 — why RAG
{
  const slide = base('為什麼需要 RAG？先找到證據，再讓模型回答', 'VOCABULARY', 4, { active: 2, kicker: '概念橋接 02' });
  card(slide, 0.75, 1.75, 3.55, 3.25, '只用語言模型', '可能混淆年度、沒有課程文件依據，也無法指出答案來自哪一段。', C.white, C.coral, { headingSize: 23, bodySize: 15 });
  card(slide, 4.65, 1.75, 3.55, 3.25, 'RAG 先檢索', '從文件 chunks 找出最相關的段落與來源，再把證據交給語言模型。', C.white, C.teal, { headingSize: 23, bodySize: 15 });
  card(slide, 8.55, 1.75, 3.55, 3.25, '有證據才回答', '答案附文件、段落、網址與時間；沒有直接證據就說「資料不足」。', C.white, C.ink, { headingSize: 23, bodySize: 15 });
  text(slide, '→', 4.22, 3.08, 0.3, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  text(slide, '→', 8.12, 3.08, 0.3, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  note(slide, 'RAG 不讓模型取代文件；它讓模型先取得可回查的證據，再協助整理答案。', '回答時先問：這句話能回到哪份文件、哪個段落？');
}

// 05 — vocabulary
{
  const slide = base('資料完成前，必須看見的七個產物', 'VOCABULARY', 5, { active: 3, kicker: '不是先做聊天畫面' });
  const terms = [
    ['scope', '四份指定來源與規則'], ['raw', '保留不改的原始檔'], ['Markdown', '可閱讀、可搜尋的文字'],
    ['quality', '可否進入分析與索引'], ['chunk', '可檢索、可引用的段落'], ['vector index', '向量索引給 RAG 使用'], ['JSONL', '來源與問答的本機紀錄'],
  ];
  terms.forEach((t, i) => {
    const col = i % 4; const row = Math.floor(i / 4);
    card(slide, 0.63 + col * 3.15, 1.55 + row * 2.15, 2.8, 1.55, t[0], t[1], C.white, [C.teal, C.coral, C.yellow, C.slate][col], { headingSize: 17, bodySize: 12.5 });
  });
  text(slide, '以上產物完成後，才開始用 Codex 建立 Streamlit 問答助手。', 0.82, 5.98, 11.75, 0.3, { fontSize: 20, bold: true, align: 'center', color: C.ink });
  note(slide, '這些不是考試名詞，而是介面建立前必須完成的資料成果。', '在 repo README 找到資料夾結構與輸出檔。');
}

// 06 — scope
{
  const slide = base('Step 01｜讀取講師提供的四份原始文件', 'SCOPE', 6, { active: 0, kicker: '操作 1 · 環境與來源確認' });
  card(slide, 0.72, 1.55, 5.85, 3.95, '四份固定資料', '1. 技職所碩士班修業流程\n2. 115 研究生手冊（DOCX）\n3. 語言中心英文畢業門檻\n4. 115-1 校務行事曆（PDF）', C.white, C.teal, { bodySize: 16 });
  addRect(slide, 7.15, 1.55, 5.38, 3.95, C.dark, true);
  text(slide, 'rag-demo 已備妥', 7.52, 1.95, 4.5, 0.3, { fontSize: 20, bold: true, color: C.teal });
  text(slide, 'data/raw/      原始文件\ndata/manifests/ 來源紀錄\ndata/markdown/  轉換結果\nanalysis/       分析表\ndata/processed/ 索引\nrag/  feedback/  介面與歷程', 7.58, 2.4, 4.45, 2.55, { fontSize: 15, color: C.white, fontFace: 'Consolas', valign: 'top' });
  note(slide, '學生不選網址，也不下載資料；先讀來源紀錄，知道每份文件從哪裡來。', '貼上提示詞 1，確認環境與四份來源檔。');
}
// 07 — crawl
{
  const slide = base('Step 02｜轉換四份原始文件並做品質檢查', 'PARSE', 7, { active: 1, kicker: '操作 2 · MarkItDown 轉換' });
  const stages = [
    ['讀取 manifest', '確認四份來源\n與原始檔'], ['保留原始檔', 'HTML／DOCX／PDF\n不覆寫'], ['解析文字', 'MarkItDown\n轉為 Markdown'], ['品質結果', '可分析或\n人工查看'],
  ];
  stages.forEach((s, i) => processNode(slide, 0.9 + i * 3.05, 2.05, s[0], s[1], [C.teal, C.yellow, C.coral, C.ink][i], i + 1));
  note(slide, '原始檔已準備好；學生只做本機轉換與品質判讀，不重做網頁蒐集。', '貼上提示詞 2，完成四份文件的轉換與品質結果。');
}
// 08 — parse
{
  const slide = base('Step 03｜先做校務文件分析表，再建立搜尋索引', 'ANALYZE', 8, { active: 2, kicker: '操作 3 · 原文與 AI 解讀分開' });
  card(slide, 0.8, 1.55, 3.55, 3.75, '文件明確寫了什麼', '保留可回查的原文、年度、對象與來源段落。\n\n不把推論寫成規定。', C.white, C.coral, { bodySize: 16 });
  card(slide, 4.88, 1.55, 3.55, 3.75, 'AI 摘要或分類', 'AI 協助整理學生行動、主題與重點。\n\n明確標示這是 AI 解讀。', C.white, C.teal, { bodySize: 16 });
  card(slide, 8.96, 1.55, 3.55, 3.75, '不確定處與索引', '條件不足就標示不確定；只有可用文字才切成 chunks。', C.white, C.ink, { bodySize: 16 });
  text(slide, '分析表是主要成果；索引與問答助手用來驗證它。', 1.2, 5.85, 10.9, 0.28, { fontSize: 20, bold: true, align: 'center' });
  note(slide, '生成式 AI 的價值是協助閱讀與分類，不是取代來源或補造規定。', '貼上提示詞 3，建立含來源段落的校務文件分析表。');
}

// 09 — quality
{
  const slide = base('品質檢查：只有可用文字才能進入索引', 'PARSE', 9, { active: 2, kicker: '建立索引前的門檻' });
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
  note(slide, '不要把 PDF 轉出一堆破碎表格，卻假裝它已經適合問答。', '為文件設定品質狀態，非 ready 必須寫下原因。');
}

// 10 — chunks
{
  const slide = base('Step 04｜切成 chunks，建立自己的向量索引', 'ANALYZE', 10, { active: 3, kicker: '操作 4 · 資料處理與索引' });
  addRect(slide, 0.85, 1.58, 3.0, 3.7, C.white, true);
  text(slide, '一份長文件', 1.2, 1.95, 2.3, 0.3, { fontSize: 20, bold: true, align: 'center' });
  ['第一章：修業規定', '第二章：英文門檻', '第三章：行事曆'].forEach((t, i) => addRect(slide, 1.22, 2.58 + i * 0.72, 2.24, 0.46, i === 1 ? C.mist : C.pale, true));
  ['第一章：修業規定', '第二章：英文門檻', '第三章：行事曆'].forEach((t, i) => text(slide, t, 1.36, 2.7 + i * 0.72, 1.95, 0.18, { fontSize: 11.5, align: 'center' }));
  text(slide, '→', 4.05, 3.1, 0.55, 0.3, { fontSize: 28, bold: true, color: C.coral, align: 'center' });
  ['chunk-001', 'chunk-002', 'chunk-003'].forEach((t, i) => {
    card(slide, 4.92 + (i % 2) * 3.72, 1.65 + Math.floor(i / 2) * 2.02, 3.25, 1.42, t, i === 2 ? '段落＋來源\n可建立向量索引' : '段落＋來源\n可建立向量索引', C.white, i === 2 ? C.coral : C.teal, { headingSize: 16, bodySize: 12.5 });
  });
  text(slide, '只讓 ready_for_analysis 的 chunks 進入 vector_index.jsonl。', 1.38, 5.85, 10.6, 0.28, { fontSize: 18, bold: true, align: 'center' });
  text(slide, 'chunk 沒有固定最佳長度：依文件結構、問題型態與檢索測試調整。', 1.08, 6.22, 11.1, 0.2, { fontSize: 13.5, color: C.slate, align: 'center' });
  note(slide, 'chunk 不只是一段文字；它同時帶著來源，才能被檢索和引用。', '處理 Markdown 後執行 python scripts/build_index.py。');
}

// 11 — analysis table
{
  const slide = base('索引完成檢查：RAG 只能讀自己的資料', 'ANALYZE', 11, { active: 3, kicker: '建立 Streamlit 前的最後確認' });
  const headers = ['chunk_id', 'document', 'source_url', 'section', 'crawled_at'];
  const widths = [1.25, 2.25, 1.55, 3.35, 3.35];
  let x = 0.66;
  headers.forEach((h, i) => { addRect(slide, x, 1.75, widths[i], 0.6, C.ink); text(slide, h, x + 0.08, 1.94, widths[i] - 0.16, 0.16, { fontSize: 10.5, bold: true, color: C.white, align: 'center' }); x += widths[i]; });
  const data = [
    ['master-115-001', '115 研究生手冊', 'tve.yuntech.edu.tw', '修業規定', '2026-08-01'],
    ['calendar-115-1', '115-1 行事曆', 'aax.yuntech.edu.tw', '加退選', '2026-08-01'],
  ];
  data.forEach((row, ri) => {
    let cx = 0.66;
    row.forEach((v, i) => { addRect(slide, cx, 2.36 + ri * 1.14, widths[i], 1.12, ri % 2 ? C.pale : C.white, false, C.line); text(slide, v, cx + 0.09, 2.52 + ri * 1.14, widths[i] - 0.18, 0.72, { fontSize: i > 2 ? 10.5 : 11.5, color: i === 4 ? C.slate : C.ink, valign: 'top' }); cx += widths[i]; });
  });
  note(slide, '這一頁確認的不是答案，而是 Streamlit 稍後會使用的資料來源與索引欄位。', '確認 vector_index.jsonl 已建立，並知道有哪些文件與 chunks。');
}

// 12 — RAG
{
  const slide = base('Step 05｜Ollama 的兩個模型，如何完成 RAG 問答？', 'RAG', 12, { active: 4, kicker: '操作 5 · 本機模型分工' });
  const stages = [
    ['文件 chunks', '每段保留文字\n與來源資訊', C.coral], ['nomic embedding', 'chunks 與問題\n→ 向量', C.teal], ['找相關 chunks', '向量索引\n取最多三筆', C.ink], ['qwen 語言模型', '問題＋證據\n→ 有引用的回答', C.teal],
  ];
  stages.forEach((s, i) => {
    const x = 0.75 + i * 3.1;
    card(slide, x, 2.0, 2.55, 2.2, s[0], s[1], C.white, s[2], { headingSize: 17, bodySize: 13.5 });
    if (i < 3) text(slide, '→', x + 2.62, 2.87, 0.35, 0.25, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, 'Ollama 在本機執行：不需 API key、沒有按次費用，文件與索引留在電腦。\n但須下載模型，效能取決於硬體。', 0.92, 5.25, 11.7, 0.52, { fontSize: 13.5, color: C.slate, align: 'center' });
  note(slide, 'nomic-embed-text-v2-moe 只建立與比較向量，不負責回答；qwen2.5:3b 只根據找回的證據整理自然語言答案。', '依提示詞 5 建立 Streamlit 介面，再接上自己的向量索引。');
}

// 13 — supported chat
{
  const slide = base('完成 RAG：從底部輸入問題，顯示答案與引用', 'RAG', 13, { active: 4, kicker: '學生建立的 Streamlit 問答頁' });
  addRect(slide, 1.05, 1.52, 11.15, 4.85, C.white, true);
  addRect(slide, 1.55, 2.02, 5.4, 0.76, C.mist, true);
  text(slide, '115 學年度碩士班畢業至少需要幾學分？', 1.85, 2.25, 4.8, 0.22, { fontSize: 16, color: C.ink });
  addRect(slide, 5.55, 3.13, 5.95, 1.08, 'E0F1EC', true);
  text(slide, '至少 39 學分', 5.88, 3.43, 5.25, 0.27, { fontSize: 19, bold: true, color: C.ink });
  text(slide, '狀態：supported', 5.88, 3.82, 2.0, 0.18, { fontSize: 11.5, bold: true, color: C.teal });
  card(slide, 2.05, 4.8, 9.15, 0.8, '引用與檢索｜講師 Demo 範例', '115 研究生手冊｜五、修課規定｜115 學年度｜蒐集：2026-07-29｜相似度：0.87', C.pale, C.teal, { headingSize: 13, bodySize: 13 });
  text(slide, '期限、數字、單位名稱都必須可逐字回查。', 2.0, 6.0, 9.4, 0.25, { fontSize: 16, bold: true, align: 'center', color: C.ink });
  note(slide, '這是學生以 Codex 從空白建立的 Streamlit 介面；問題先出現在右側，答案與引用在左側。', '以自己的索引提問，確認答案、年度與來源完整顯示。');
}

// 14 — insufficient + test types
{
  const slide = base('RAG 測試：有證據回答，資料不足就停止', 'RAG', 14, { active: 4, kicker: '四類自我測試' });
  addRect(slide, 0.8, 1.5, 5.65, 3.45, C.white, true);
  text(slide, '115 學年度第 2 學期何時開學？', 1.18, 1.95, 4.9, 0.3, { fontSize: 18, bold: true });
  addRect(slide, 1.18, 2.62, 4.9, 1.1, 'FDE7E1', true);
  text(slide, '目前語料沒有足夠證據回答此問題。', 1.5, 2.95, 4.3, 0.24, { fontSize: 16.5, bold: true, color: C.ink, align: 'center' });
  text(slide, '狀態：insufficient_evidence', 1.43, 3.48, 4.42, 0.18, { fontSize: 11.5, bold: true, color: C.coral, align: 'center' });
  const tests = ['修課與畢業學分', '英文門檻與年度', '流程或表單', '校務日期'];
  tests.forEach((t, i) => card(slide, 7.15 + (i % 2) * 2.72, 1.5 + Math.floor(i / 2) * 1.72, 2.38, 1.25, `${i + 1}`, t, C.white, [C.teal, C.yellow, C.coral, C.slate][i], { headingSize: 18, bodySize: 12.5 }));
  note(slide, '資料不足不是失敗；它告訴學生下一輪應補哪一類公開文件，而不是讓模型猜。', '測試四類問題，確認英文與日期題會顯示適用年度或公告日期。');
}

// 15 — query log
{
  const slide = base('問答紀錄：把同一串對話整理成主要主題', 'IMPROVE', 15, { active: 5, kicker: '學生自己本機的後台頁' });
  addRect(slide, 0.85, 1.52, 11.65, 3.95, C.white, true);
  const headers = ['query_id', 'question', 'answer_status', 'cited_chunk_ids', 'self_test_note'];
  const widths = [1.55, 3.35, 2.1, 2.3, 2.35]; let x = 1.0;
  headers.forEach((h, i) => { addRect(slide, x, 1.94, widths[i], 0.52, C.ink); text(slide, h, x + 0.08, 2.1, widths[i] - 0.16, 0.15, { fontSize: 10, bold: true, color: C.white, align: 'center' }); x += widths[i]; });
  const values = ['q-103', '115-1 加退選何時截止？', 'supported', 'calendar-115-1', '確認年度與公告日期']; x = 1.0;
  values.forEach((v, i) => { addRect(slide, x, 2.46, widths[i], 0.94, C.pale, false, C.line); text(slide, v, x + 0.1, 2.75, widths[i] - 0.2, 0.18, { fontSize: i === 2 ? 10.5 : 12, color: C.ink, align: 'center' }); x += widths[i]; });
  text(slide, 'JSONL：每行一筆紀錄，方便追加、分類與分析。', 1.3, 4.05, 10.7, 0.3, { fontSize: 18, bold: true, align: 'center' });
  note(slide, '問答紀錄把一次問答轉成下一次改善的資料；它不是真實使用者回饋。', '確認本機問答紀錄表格會彙整每次對話的主要主題，並保留每題自我測試紀錄。');
}

// 16 — backlog
{
  const slide = base('從問答紀錄，找到下一步要改善什麼', 'IMPROVE', 16, { active: 5, kicker: '不計分的自我檢查' });
  const flow = [
    ['現象', '英文門檻問題\n反覆無法回答'], ['證據', 'query_id · 狀態\n沒有引用'], ['原因', '缺少適用年度\n或解析失敗'], ['動作', 'add_source\nrepair_parse'],
  ];
  flow.forEach((f, i) => {
    const x = 0.8 + i * 3.1;
    card(slide, x, 2.0, 2.58, 2.45, f[0], f[1], C.white, [C.coral, C.yellow, C.slate, C.teal][i], { headingSize: 19, bodySize: 15, });
    if (i < 3) text(slide, '→', x + 2.65, 2.95, 0.3, 0.3, { fontSize: 25, bold: true, color: C.coral, align: 'center' });
  });
  text(slide, '允許的改善動作：add_source · repair_parse · revise_chunking_or_metadata · improve_retrieval · revise_prompt', 0.92, 5.47, 11.55, 0.36, { fontSize: 14, color: C.slate, align: 'center' });
  note(slide, '改善不是憑感覺調 prompt；每一項 backlog 都要回連 query_id 和證據。', '從問答紀錄回顧哪些題目需要補資料、修解析、調整切分或改善檢索。');
}

// 17 — self-check and close
{
  const slide = base('把文件變成可用的知識，前提是它仍然可追溯。', 'WRAP UP', 17, { active: 5, kicker: '個人自我完成檢核' });
  const principles = ['四份指定資料', '品質與 chunks', '向量索引', 'Streamlit 問答', '歷程與改善'];
  principles.forEach((p, i) => {
    const x = 0.76 + i * 2.5;
    slide.addShape(S.ellipse, { x, y: 2.45, w: 1.02, h: 1.02, fill: { color: i === 4 ? C.coral : C.ink }, line: { color: C.teal, width: 1 } });
    text(slide, String(i + 1), x, 2.75, 1.02, 0.22, { fontSize: 17, bold: true, color: C.white, align: 'center' });
    text(slide, p, x - 0.38, 3.86, 1.78, 0.38, { fontSize: 15, bold: true, color: C.ink, align: 'center', valign: 'mid' });
  });
  text(slide, '完成順序：原始文件 → 分析表 → 索引 → Streamlit 問答與歷程。', 1.2, 5.6, 10.9, 0.3, { fontSize: 20, color: C.teal, bold: true, align: 'center' });
  text(slide, '只在本機執行｜回答附來源｜證據不足時不猜｜以原始網站最新公告為準', 1.55, 6.25, 10.2, 0.3, { fontSize: 16, color: C.slate, align: 'center' });
  note(slide, '今天不是交作業；請每個人用自己的電腦核對完整證據鏈。', '完成個人自我檢核；不公開部署或分享連結。');
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
await pptx.writeFile({ fileName: outPath });
console.log(`created: ${outPath}`);
