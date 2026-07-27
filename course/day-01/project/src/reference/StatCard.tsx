import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { StatItem } from "@/reference/dashboard"

type StatCardProps = {
  item: StatItem
}

const trendStyles = {
  up: "bg-emerald-50 text-emerald-700",
  down: "bg-rose-50 text-rose-700",
  neutral: "bg-slate-100 text-slate-600",
}

export function StatCard({ item }: StatCardProps) {
  const TrendIcon =
    item.trendDirection === "up"
      ? ArrowUpRight
      : item.trendDirection === "down"
        ? ArrowDownRight
        : Minus
  const Icon = item.icon

  return (
    <Card className="border-slate-200/80 shadow-soft">
      <CardHeader className="flex-row items-center justify-between gap-4 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {item.title}
        </CardTitle>
        <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
          <Icon aria-hidden="true" className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-3xl font-bold tracking-tight text-slate-950">
          {item.value}
        </p>
        <div
          className={cn(
            "inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            trendStyles[item.trendDirection],
          )}
        >
          <TrendIcon aria-hidden="true" className="size-3.5" />
          {item.trend}
        </div>
      </CardContent>
    </Card>
  )
}
