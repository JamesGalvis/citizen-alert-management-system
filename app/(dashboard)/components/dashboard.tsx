"use client"

import { Alert } from "@prisma/client"

import { AlertPieChart } from "./alert-pie-chart"
import { AlertBarChart } from "./alert-bar-chart"
import { BarAlertData } from "@/types"
import RecentAlerts from "./recent-alerts"

interface DashboardProps {
  alerts: Alert[]
  recentAlerts: Alert[]
  barChartData: BarAlertData[]
}

export function Dashboard({
  alerts,
  recentAlerts,
  barChartData,
}: DashboardProps) {
  const severityData = [
    { name: "Alta", value: alerts.filter((a) => a.severity === "Alta").length },
    {
      name: "Media",
      value: alerts.filter((a) => a.severity === "Media").length,
    },
    { name: "Baja", value: alerts.filter((a) => a.severity === "Baja").length },
  ]

  const barTotalAlerts = barChartData.reduce(
    (acc, curr) => acc + curr.alerts,
    0
  )

  return (
    <div className="overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 space-y-6">
        Dashboard de Alertas
      </h1>
      <AlertBarChart totalAlerts={barTotalAlerts} data={barChartData} />

      <div className="grid gap-6 my-8 md:grid-cols-2">
        <AlertPieChart severityData={severityData} />

        <RecentAlerts alerts={recentAlerts} />
      </div>
    </div>
  )
}
