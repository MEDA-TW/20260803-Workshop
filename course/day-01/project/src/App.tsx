import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const preparationItems = [
  {
    title: "先讀三個檔案",
    description: "README.md、TECH_STACK.md、AGENTS.md",
    icon: BookOpen,
  },
  {
    title: "用一句話描述成果",
    description: "把目標、背景、輸出與邊界說清楚",
    icon: Sparkles,
  },
  {
    title: "預覽、驗收、再迭代",
    description: "畫面不對就繼續對話，錯誤訊息完整貼回",
    icon: ShieldCheck,
  },
]

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            雲科大 · Vibe Coding 工作坊
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            你的教育資料儀表板，
            <span className="block text-indigo-300">從一句話開始。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            這是學員的起始畫面。打開 Codex Desktop，讓它先讀專案規則，再依講師提示完成上午的第一版骨架。
          </p>
        </header>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {preparationItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                className="border-white/10 bg-white/[0.06] text-slate-100"
                key={item.title}
              >
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="grid size-10 place-items-center rounded-xl bg-indigo-400/15 text-indigo-200">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      0{index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="leading-6 text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            )
          })}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            className="bg-indigo-400 text-slate-950 hover:bg-indigo-300"
            size="lg"
          >
            準備好，開始描述
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Button>
          <p className="text-sm text-slate-500">
            講師參考畫面：網址加上{" "}
            <code className="text-slate-400">?demo=morning</code> 或{" "}
            <code className="text-slate-400">?demo=final</code>
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
