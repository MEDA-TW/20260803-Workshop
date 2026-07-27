import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"

import App from "@/App"
import "@/index.css"

const demo = new URLSearchParams(window.location.search).get("demo")
const CompletedDashboard = lazy(() =>
  import("@/reference/CompletedDashboard").then((module) => ({
    default: module.CompletedDashboard,
  })),
)
const MorningSkeleton = lazy(() =>
  import("@/reference/MorningSkeleton").then((module) => ({
    default: module.MorningSkeleton,
  })),
)

function CurrentScreen() {
  if (demo === "final") {
    return (
      <Suspense fallback={<DemoLoading />}>
        <CompletedDashboard />
      </Suspense>
    )
  }

  if (demo === "morning") {
    return (
      <Suspense fallback={<DemoLoading />}>
        <MorningSkeleton />
      </Suspense>
    )
  }

  return <App />
}

function DemoLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-300">
      正在載入講師參考畫面……
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrentScreen />
  </React.StrictMode>,
)
