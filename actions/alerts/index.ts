"use server"

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { AlertSchema } from "@/schemas/alerts"
import { Coordinates } from "@/types"
import { subMonths } from "date-fns"
import { revalidatePath } from "next/cache"
import { z } from "zod"

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

export async function getAlertById(alertId: string) {
  try {
    const alert = await db.alert.findUnique({
      where: { id: alertId },
    })

    return alert
  } catch {
    return null
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

export async function createAlert(
  data: z.infer<typeof AlertSchema>,
  coordinates: Coordinates
) {
  const result = AlertSchema.safeParse(data)

  if (result.error) {
    return { error: "Datos inválidos." }
  }

  try {
    const loggedUser = await currentUser()

    if (!loggedUser || !loggedUser.entityId) {
      return { error: "Acción no permitida." }
    }

    const { title, description, severity } = data

    await db.alert.create({
      data: {
        title,
        description,
        severity,
        affectedArea: [coordinates.center[0], coordinates.center[1]],
        affectedAreaRadius: coordinates.radius,
        user: {
          connect: {
            id: loggedUser.id,
          },
        },
        entity: {
          connect: {
            id: loggedUser.entityId,
          },
        },
      },
    })

    revalidatePath("/")

    return { success: "Alerta creada exitosamente." }
  } catch {
    return { error: "Algo salió mal." }
  }
}

export async function updateAlert(
  alertId: string,
  data: z.infer<typeof AlertSchema>,
  coordinates: Coordinates
) {
  const result = AlertSchema.safeParse(data)

  if (result.error) {
    return { error: "Datos inválidos." }
  }

  if (!alertId) {
    return { error: "ID de la alerta requerido." }
  }

  try {
    const loggedUser = await currentUser()

    if (!loggedUser || !loggedUser.entityId) {
      return { error: "Acción no permitida." }
    }

    const { title, description, severity } = data

    await db.alert.update({
      where: { id: alertId },
      data: {
        title,
        description,
        severity,
        affectedArea: [coordinates.center[0], coordinates.center[1]],
        affectedAreaRadius: coordinates.radius,
      },
    })

    revalidatePath("/")

    return { success: "Alerta actualizada exitosamente." }
  } catch {
    return { error: "Algo salió mal." }
  }
}

export async function deleteAlert(alertId: string) {
  if (!alertId) {
    return { error: "ID de la alerta requerido." }
  }

  try {
    const loggedUser = await currentUser()

    if (!loggedUser || !loggedUser.entityId) {
      return { error: "Acción no permitida." }
    }

    await db.alert.delete({
      where: { id: alertId },
    })

    revalidatePath("/")

    return { success: "Alerta eliminada exitosamente." }
  } catch {
    return { error: "Algo salió mal." }
  }
}
