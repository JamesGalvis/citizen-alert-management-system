"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Badge } from "@/components/ui/badge"

export type AlertColum = {
  id: string
  title: string
  description: string
  severity: string
  createdAt: string
}

export const columns: ColumnDef<AlertColum>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      const title: string = row.getValue("title")

      return <p className="py-4 min-w-[200px] text-sm">{title}</p>
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description: string = row.getValue("description")

      return (
        <p className="py-4 min-w-[430px] text-muted-foreground text-sm">
          {description}
        </p>
      )
    },
  },
  {
    accessorKey: "severity",
    header: "Severidad",
    cell: ({ row }) => {
      const severity: string = row.getValue("severity")

      return (
        <Badge
          variant={
            severity === "Alta"
              ? "destructive"
              : severity === "Media"
              ? "warning"
              : "secondary"
          }
        >
          {severity}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt")

      return (
        <p className="py-4 min-w-[100px] text-muted-foreground text-sm">
          {createdAt}
        </p>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center min-w-[80px]">
        <CellAction alertData={row.original} />
      </div>
    ),
  },
]
