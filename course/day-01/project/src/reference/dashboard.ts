import {
  BookOpenCheck,
  CalendarCheck,
  CircleAlert,
  GraduationCap,
  LayoutDashboard,
  NotebookTabs,
  Users,
  type LucideIcon,
} from "lucide-react"

export type NavigationItem = {
  id: "overview" | "scores" | "attendance" | "portfolio"
  label: string
  description: string
  icon: LucideIcon
}

export type StatItem = {
  title: string
  value: string
  trend: string
  trendDirection: "up" | "down" | "neutral"
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  {
    id: "overview",
    label: "總覽",
    description: "掌握本週關鍵教育指標",
    icon: LayoutDashboard,
  },
  {
    id: "scores",
    label: "學生成績",
    description: "比較班級表現與學習成果",
    icon: GraduationCap,
  },
  {
    id: "attendance",
    label: "出缺席統計",
    description: "查看每日出席與異常狀況",
    icon: CalendarCheck,
  },
  {
    id: "portfolio",
    label: "學習歷程",
    description: "追蹤作品與歷程完成度",
    icon: NotebookTabs,
  },
]

export const statItems: StatItem[] = [
  {
    title: "總學生數",
    value: "1,248",
    trend: "較上月增加 12%",
    trendDirection: "up",
    icon: Users,
  },
  {
    title: "出席率",
    value: "94.2%",
    trend: "較上週下降 0.3%",
    trendDirection: "down",
    icon: CalendarCheck,
  },
  {
    title: "平均成績",
    value: "78.5",
    trend: "較前次增加 2.1%",
    trendDirection: "up",
    icon: BookOpenCheck,
  },
  {
    title: "待處理",
    value: "23 件",
    trend: "已減少 5 件",
    trendDirection: "up",
    icon: CircleAlert,
  },
]

export const classScoreData = [
  { className: "資管四甲", score: 82 },
  { className: "資管四乙", score: 78 },
  { className: "機械三甲", score: 75 },
  { className: "機械三乙", score: 80 },
  { className: "電子二甲", score: 85 },
  { className: "電子二乙", score: 72 },
]

export const attendanceData = [
  { day: "週一", rate: 95 },
  { day: "週二", rate: 93 },
  { day: "週三", rate: 97 },
  { day: "週四", rate: 91 },
  { day: "週五", rate: 94 },
]
