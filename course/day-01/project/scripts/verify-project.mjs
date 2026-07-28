import { access, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const currentFile = fileURLToPath(import.meta.url)
const projectRoot = path.resolve(path.dirname(currentFile), "..")
const dayRoot = path.resolve(projectRoot, "..")

const requiredProjectFiles = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "TECH_STACK.md",
  "package.json",
  "public/card.html",
  "src/App.tsx",
  "src/reference/MorningSkeleton.tsx",
  "src/reference/CompletedDashboard.tsx",
  "src/components/ui/button.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/sheet.tsx",
  "src/components/ui/avatar.tsx",
]

const requiredCourseFiles = [
  "README.md",
  "STUDENT_GUIDE.md",
  "INSTRUCTOR_GUIDE.md",
  "HANDOUTS.md",
]

const textContracts = [
  [projectRoot, "AGENTS.md", "永遠先讀 `/TECH_STACK.md`"],
  [projectRoot, "AGENTS.md", "不執行 shadcn CLI"],
  [projectRoot, "TECH_STACK.md", "Tailwind CSS"],
  [projectRoot, "TECH_STACK.md", "Recharts"],
  [projectRoot, "README.md", "?demo=final"],
  [dayRoot, "STUDENT_GUIDE.md", "只修改 `src/App.tsx`"],
  [dayRoot, "STUDENT_GUIDE.md", "ResponsiveContainer"],
  [dayRoot, "STUDENT_GUIDE.md", "Push origin"],
  [dayRoot, "STUDENT_GUIDE.md", "Agent 多不等於比較厲害"],
  [dayRoot, "INSTRUCTOR_GUIDE.md", "五大 Agent 系統"],
  [dayRoot, "INSTRUCTOR_GUIDE.md", "3aa3e7cf7dce807f92fafd8a09d99fa9"],
  [dayRoot, "HANDOUTS.md", "目標 Goal"],
  [dayRoot, "HANDOUTS.md", "你可以把手放開，但不能把眼睛閉上"],
]

const errors = []

async function checkFiles(basePath, files) {
  for (const relativePath of files) {
    try {
      await access(path.join(basePath, relativePath))
    } catch {
      errors.push(`缺少必要檔案：${path.relative(dayRoot, path.join(basePath, relativePath))}`)
    }
  }
}

await checkFiles(projectRoot, requiredProjectFiles)
await checkFiles(dayRoot, requiredCourseFiles)

for (const [basePath, relativePath, expectedText] of textContracts) {
  try {
    const content = await readFile(path.join(basePath, relativePath), "utf8")
    if (!content.includes(expectedText)) {
      errors.push(`${relativePath} 缺少關鍵內容：${expectedText}`)
    }
  } catch {
    // 缺檔已由 requiredFiles 回報。
  }
}

const packageJson = JSON.parse(
  await readFile(path.join(projectRoot, "package.json"), "utf8"),
)

for (const dependency of [
  "react",
  "recharts",
  "lucide-react",
  "tailwindcss-animate",
]) {
  const exists =
    packageJson.dependencies?.[dependency] ??
    packageJson.devDependencies?.[dependency]
  if (!exists) {
    errors.push(`package.json 缺少套件：${dependency}`)
  }
}

if (errors.length > 0) {
  console.error("Day 1 教材檢查失敗：")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

const fileCount = requiredProjectFiles.length + requiredCourseFiles.length
console.log(
  `Day 1 教材檢查通過：${fileCount} 個必要檔案與 ${textContracts.length} 項內容規則。`,
)
