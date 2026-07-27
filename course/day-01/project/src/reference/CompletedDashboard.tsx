import { useState } from "react"
import { Bell, CalendarDays } from "lucide-react"

import { DashboardCharts } from "@/reference/DashboardCharts"
import {
  DashboardSidebar,
  MobileDashboardNavigation,
} from "@/reference/DashboardSidebar"
import { StatCard } from "@/reference/StatCard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  navigationItems,
  statItems,
  type NavigationItem,
} from "@/reference/dashboard"

export function CompletedDashboard() {
  const [activeId, setActiveId] =
    useState<NavigationItem["id"]>("overview")
  const activeItem =
    navigationItems.find((item) => item.id === activeId) ?? navigationItems[0]

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar activeId={activeId} onNavigate={setActiveId} />

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <MobileDashboardNavigation
                activeId={activeId}
                onNavigate={setActiveId}
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                  教育資料儀表板
                </p>
                <h1 className="truncate text-lg font-bold text-slate-950 sm:text-xl">
                  {activeItem.label}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button aria-label="通知" size="icon" variant="ghost">
                <Bell aria-hidden="true" />
              </Button>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-950">王老師</p>
                <p className="text-xs text-muted-foreground">通識教育中心</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  王
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="flex flex-col gap-4 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-soft sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-200">
                <CalendarDays aria-hidden="true" className="size-4" />
                2026 年 8 月 3 日
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                歡迎回來，王老師
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                {activeItem.description}。先看關鍵變化，再決定今天最需要處理的行動。
              </p>
            </div>
            <Button className="bg-white text-slate-950 hover:bg-slate-100">
              匯出本週摘要
            </Button>
          </section>

          <section
            aria-label="教育數據統計卡片"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {statItems.map((item) => (
              <StatCard item={item} key={item.title} />
            ))}
          </section>

          <DashboardCharts />
        </div>
      </main>
    </div>
  )
}
