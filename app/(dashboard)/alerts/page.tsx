import { DataTable } from "@/components/common/data-table"
import { Heading } from "@/components/heading"
import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { AlertColum, columns } from "./components/columns"
import { format } from "date-fns"
import { ApiList } from "@/components/common/api-list"

export default async function AlertsPage() {
  const loggedUser = await currentUser()

  const alerts = await db.alert.findMany({
    where: {
      entityId: loggedUser?.entityId!,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedAlerts: AlertColum[] = alerts.map((alert) => ({
    id: alert.id,
    title: alert.title!,
    description: alert.description!,
    severity: alert.severity!,
    createdAt: format(alert.createdAt, "MMM do, yyyy")!,
  }))

  return (
    <div className="sm:px-8 px-4 py-8 space-y-12">
      <Heading
        title={`Alertas (${alerts.length})`}
        description="Crea o modifica las alertas y manten informados a los ciudadanos"
        buttonHref="/alerts/new"
      />
      <DataTable searchKey="title" columns={columns} data={formattedAlerts} />
      <Heading title="API" description="Llamadas a la API para las alertas" />
      <ApiList entityName="alerts" entityIdName="alertId" />
    </div>
  )
}
