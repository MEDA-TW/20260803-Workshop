import { Menu, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navigationItems, type NavigationItem } from "@/reference/dashboard"
import { cn } from "@/lib/utils"

type DashboardSidebarProps = {
  activeId: NavigationItem["id"]
  onNavigate: (id: NavigationItem["id"]) => void
}

type NavigationProps = DashboardSidebarProps & {
  mobile?: boolean
}

function Navigation({ activeId, onNavigate, mobile = false }: NavigationProps) {
  return (
    <nav aria-label="儀表板主要導覽" className="flex flex-col gap-2">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const content = (
          <>
            <Icon aria-hidden="true" className="size-5" />
            <span>{item.label}</span>
          </>
        )
        const className = cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
          activeId === item.id
            ? "bg-white text-slate-950 shadow-sm"
            : "text-slate-300 hover:bg-white/10 hover:text-white",
          mobile &&
            activeId !== item.id &&
            "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        )

        if (mobile) {
          return (
            <SheetClose asChild key={item.id}>
              <button className={className} onClick={() => onNavigate(item.id)}>
                {content}
              </button>
            </SheetClose>
          )
        }

        return (
          <button
            className={className}
            key={item.id}
            onClick={() => onNavigate(item.id)}
          >
            {content}
          </button>
        )
      })}
    </nav>
  )
}

export function DashboardSidebar({
  activeId,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-slate-950 px-4 py-6 text-white lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid size-10 place-items-center rounded-xl bg-indigo-500 text-white">
          <Sparkles aria-hidden="true" className="size-5" />
        </div>
        <div>
          <p className="font-bold">教育儀表板</p>
          <p className="text-xs text-slate-400">MEDA Lab 2026</p>
        </div>
      </div>
      <Navigation activeId={activeId} onNavigate={onNavigate} />
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold">今日提醒</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          所有畫面資料都是教學假資料，不含真實學生個資。
        </p>
      </div>
    </aside>
  )
}

export function MobileDashboardNavigation({
  activeId,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="開啟導覽選單"
          className="lg:hidden"
          size="icon"
          variant="outline"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[86vw]" side="left">
        <SheetHeader className="mb-6">
          <SheetTitle>教育儀表板</SheetTitle>
          <SheetDescription>選擇要查看的教育數據主題。</SheetDescription>
        </SheetHeader>
        <Navigation activeId={activeId} mobile onNavigate={onNavigate} />
      </SheetContent>
    </Sheet>
  )
}
