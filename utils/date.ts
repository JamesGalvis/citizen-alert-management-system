import { AlertByDate } from "@/types"
import { Alert } from "@prisma/client"

import {
  format,
  isSameMonth,
  startOfMonth,
} from "date-fns"

// Función para generar un rango de meses del año actual
function generateMonthsRange() {
  const currentYear = new Date().getFullYear()
  const months = Array.from({ length: 12 }, (_, i) => {
    return startOfMonth(new Date(currentYear, i, 1)) // Cada primer día de cada mes
  })
  return months
}

// Función para formatear los datos de alertas por mes
export function formatAlertsData(alertsByDate: AlertByDate[]) {
  const allMonths = generateMonthsRange() // Obtener todos los meses del año

  const formattedAlerts = allMonths.map((month) => {
    // Filtrar las alertas para el mes actual
    const alertsForMonth = alertsByDate.filter((alert) =>
      isSameMonth(new Date(alert.createdAt), month)
    )

    // Sumar las alertas del mes
    const totalAlerts = alertsForMonth.reduce(
      (sum, alert) => sum + alert._count.id,
      0
    )

    return {
      month: format(month, "MMMM yyyy"), // Formato del mes y año
      alerts: totalAlerts, // Total de alertas para el mes
    }
  })

  return formattedAlerts
}

export function calculateAlertsDifference(
  alerts: Alert[],
  startDate: Date,
  endDate: Date
): number {
  const alertsInRange = alerts.filter(
    (alert) => alert.createdAt >= startDate && alert.createdAt <= endDate
  )
  return alertsInRange.length
}

export function getYesterdayRange(): { start: Date; end: Date } {
  const today = new Date()

  const start = new Date(today)
  start.setDate(today.getDate() - 1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(today)
  end.setDate(today.getDate() - 1)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

export function getTodayRange(): { start: Date; end: Date } {
  const today = new Date()

  const start = new Date(today)
  start.setHours(0, 0, 0, 0)

  const end = new Date(today)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}
