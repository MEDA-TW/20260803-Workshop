import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { attendanceData, classScoreData } from "@/reference/dashboard"

const tooltipStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  boxShadow: "0 14px 35px -20px rgba(15, 23, 42, 0.5)",
}

export function DashboardCharts() {
  return (
    <section
      aria-label="教育數據圖表"
      className="grid gap-5 xl:grid-cols-2"
    >
      <Card className="border-slate-200/80 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">各班平均成績</CardTitle>
          <CardDescription>本學期六個示範班級的平均分數</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full" aria-label="各班平均成績長條圖">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={classScoreData}
                margin={{ top: 8, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="className"
                  fontSize={12}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, 100]}
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "#eef2ff" }}
                  formatter={(value: number) => [`${value} 分`, "平均成績"]}
                />
                <Bar
                  dataKey="score"
                  fill="#4f46e5"
                  radius={[8, 8, 2, 2]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">本週出席趨勢</CardTitle>
          <CardDescription>週一至週五的每日出席率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full" aria-label="本週出席趨勢折線圖">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendanceData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="day"
                  fontSize={12}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  domain={[85, 100]}
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [`${value}%`, "出席率"]}
                />
                <Line
                  activeDot={{ r: 6 }}
                  dataKey="rate"
                  dot={{ fill: "#0f766e", r: 4, strokeWidth: 0 }}
                  stroke="#0f766e"
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
