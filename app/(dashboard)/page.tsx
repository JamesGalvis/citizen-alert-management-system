import { redirect } from "next/navigation"

import {
  getAlerts,
  getAlertsLastThreeMonthsByEntity,
  getRecentAlerts,
} from "@/actions/alerts"
import { Dashboard } from "./components/dashboard"
import { currentUser } from "@/lib/auth-user"
import { formatAlertsData } from "@/utils/date"

export default async function Home() {
  const loggedUser = await currentUser()

  if (!loggedUser) {
    return redirect("/auth")
  }

  const alerts = await getAlerts(loggedUser.entityId!)
  const recentAlerts = await getRecentAlerts(loggedUser.entityId!)

  const rawAlerts = await getAlertsLastThreeMonthsByEntity(loggedUser.entityId!)
  const formattedData = formatAlertsData(rawAlerts)

  return (
    <div className="min-h-full sm:px-8 px-4 py-8">
      <Dashboard
        alerts={alerts}
        recentAlerts={recentAlerts}
        barChartData={formattedData}
      />
    </div>
  )
}
