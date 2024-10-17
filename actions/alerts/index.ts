"use server"

import { db } from "@/lib/db"
import { subMonths } from "date-fns"

export async function getAlerts(entityId: string) {
  try {
    const alerts = await db.alert.findMany({
      where: { entityId },
    })

    return alerts
  } catch {
    return []
  }
}

export async function getRecentAlerts(entityId: string) {
  try {
    const recentAlerts = await db.alert.findMany({
      where: {
        entityId,
      },
      orderBy: {
        createdAt: "desc", // Ordenar de más reciente a más antigua
      },
      take: 4,
    })

    return recentAlerts
  } catch (error) {
    return []
  }
}

export async function getAlertsLastThreeMonthsByEntity(entityId: string) {
  const threeMonthsAgo = subMonths(new Date(), 3) // Fecha de hace 3 meses

  // Consultar el total de alertas, agrupadas por mes
  const alertsByMonth = await db.alert.groupBy({
    by: ["createdAt"],
    where: {
      entityId,
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return alertsByMonth
}
