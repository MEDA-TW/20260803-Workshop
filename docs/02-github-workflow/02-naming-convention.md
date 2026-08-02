# 分支命名規範

> 初學者友善 | 約 5 分鐘

## 為什麼需要命名規範？

當團隊有十幾個人同時在開發，如果每個人的分支都取名叫 `test`、`fix`、`update`，很快就會搞不清楚誰在做什麼。統一的命名格式，讓任何人看到分支名稱就能快速判斷這是在做什麼。

## 格式規範

所有分支名稱請遵循以下格式：

```
<類型>/<功能名稱>
```

### 類型標籤

| 類型 | 用途 | 範例 |
|:-----|:-----|:-----|
| `feat` | 新增功能 | `feat/user-login` |
| `fix` | 修復 Bug | `fix/resolve-null-pointer` |
| `docs` | 文件更新 | `docs/update-api-guide` |
| `refactor` | 重構程式碼（不改變功能） | `refactor/extract-auth-module` |
| `test` | 新增或修改測試 | `test/add-unit-test-for-utils` |
| `chore` | 維護性工作（CI、依賴更新等） | `chore/update-dependencies` |

### 命名原則

- 使用 **英文小寫**
- 單詞之間用 **連字號 `-`** 連接
- 簡潔明瞭，一看就知道在做什麼
- **不要**用 `test1`、`fix2`、`temp` 這類沒有意義的名稱

### 好的範例

```
feat/google-oauth-login
fix/handle-empty-form-submission
docs/clarify-pr-workflow
refactor/split-large-component
test/validate-email-format
chore/upgrade-node-version
```

### 不好的範例

```
test
fix
update
new-feature
my-branch
wip
```

---

## 常見問題

**Q：分支名稱有長度限制嗎？**

Git 沒有嚴格的長度限制，但建議控制在 50 個字元以內。太長的名稱在終端機上會很難閱讀。

**Q：可以用中文取名嗎？**

技術上可以，但強烈不建議。中文在某些工具上可能顯示為亂碼，而且團隊中不一定每個人都看得懂。一律使用英文。

**Q：一個功能做完了，分支要刪掉嗎？**

是的。分支合併到 main 之後，建議及時刪除，避免分支列表越來越長。GitHub Desktop 上可以直接在 Branch 選單中右鍵刪除；Git 指令則是 `git branch -d <分支名稱>`。
