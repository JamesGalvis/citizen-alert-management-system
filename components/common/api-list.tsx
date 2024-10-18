"use client"

import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "./api-alert"

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export function ApiList({ entityIdName, entityName }: ApiListProps) {
  const origin = useOrigin()

  const baseUrl = `${origin}/api`

  return (
    <div className="space-y-3">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/entity/{entityId}`}
      />
    </div>
  )
}
