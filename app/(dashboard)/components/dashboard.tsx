"use client"

import { Alert } from "@prisma/client"

import { AlertPieChart } from "./alert-pie-chart"
import {
  calculateAlertsDifference,
  getTodayRange,
  getYesterdayRange,
} from "@/utils/date"
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
  // Obtener rango de fechas de ayer y hoy
  const yesterdayRange = getYesterdayRange()
  const todayRange = getTodayRange()

  // Contar alertas de ayer y hoy
  const alertsYesterday = calculateAlertsDifference(
    alerts,
    yesterdayRange.start,
    yesterdayRange.end
  )

  const alertsToday = calculateAlertsDifference(
    alerts,
    todayRange.start,
    todayRange.end
  )

  // Calcular la diferencia de alertas
  const alertsDifference = alertsToday - alertsYesterday
  const overviewText =
    alertsDifference >= 0
      ? `+${alertsDifference} desde ayer`
      : `${alertsDifference} desde ayer`

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
      {/* <div className="grid gap-6 mb-8 md:grid-cols-3">
        <DashboardCard
          title="Total de Alertas"
          overview={overviewText}
          value={alerts.length.toString()}
          Icon={Activity}
        />
        <DashboardCard
          title="Alertas Activas"
          overview="+2 desde ayer"
          value="4"
          Icon={Bell}
        />
        <DashboardCard
          title="Alertas Resueltas"
          overview="+2 desde ayer"
          value="4"
          Icon={CheckCircle}
        />
      </div> */}

      <div className="grid gap-6 my-8 md:grid-cols-2">
        <AlertPieChart severityData={severityData} />

        <RecentAlerts alerts={recentAlerts} />
      </div>
    </div>
  )
}
