import dynamic from "next/dynamic"

import { AlertForm } from "../components/alert-form"
import { db } from "@/lib/db"

const Map = dynamic(() => import("@/components/common/interactive-map"), {
  ssr: false,
})

export default async function AlertPage({
  params,
}: {
  params: { alertId: string }
}) {
  const alert = await db.alert.findUnique({
    where: { id: params.alertId },
  })

  const circleCoordinates = alert
    ? { center: alert?.affectedArea, radius: alert?.affectedAreaRadius }
    : null

  return (
    <div className="flex max-md:flex-col-reverse md:h-full min-h-full">
      <div className="xl:w-[40%] md:w-1/2 shrink-0 h-full sm:py-4 sm:px-2 md:overflow-y-auto">
        <AlertForm initialData={alert} />
      </div>

      <Map circleCoordinates={circleCoordinates} />
    </div>
  )
}
