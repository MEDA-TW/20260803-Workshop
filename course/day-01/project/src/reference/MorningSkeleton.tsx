import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function MorningSkeleton() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
              MEDA Lab · 2026
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              教育資料儀表板
            </h1>
            <p className="mt-3 text-slate-400">這是我的課堂練習專案。</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-400">歡迎回來</p>
              <p className="font-semibold">王老師</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-indigo-500 text-white">
                王
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <section className="mt-8 min-h-80 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          <p className="text-sm text-slate-500">下午的元件會從這裡開始長出來。</p>
        </section>
      </div>
    </main>
  )
}
