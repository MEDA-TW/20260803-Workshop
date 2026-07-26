# 練習 01｜限定範圍爬取

使用 [提示詞 01](../prompts/01-crawl-specified-site.md) 依統一 scope 蒐集資料。開始前確認 `robots.txt` 與網站規範允許；只使用 `tve.yuntech.edu.tw`，最多 20 個 HTML、20 份 PDF／DOCX，單一連線且每次請求至少間隔 1 秒。

保留 `data/raw/` 與 manifest 供自我檢核。下載附件須保留網站原始檔名，並放在 `data/raw/<document_id>/<原始檔名>`；manifest 同時記錄 `original_filename`。驗收：每筆成功資料均有 URL、時間、格式與原始檔；失敗資料有狀態與錯誤，不追蹤白名單外網址。

若網站、下載、解析或站方規範異常，導致無法產出至少三筆 `ready_for_analysis` chunks，才可向講師申請公開備援資料。備援不是捷徑：仍須建立 scope、manifest、Markdown、品質報告與完整 provenance；正常情況不可直接使用備援取代爬取。
