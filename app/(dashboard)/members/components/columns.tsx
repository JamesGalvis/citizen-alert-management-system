"use client"

import { User } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type UserColum = {
  id: string
  image: string
  name: string
  email: string
  role: string
  createdAt: string
}

export const columns: ColumnDef<UserColum>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      const imageSrc: string = row.getValue("image")

      return (
        <Avatar className="size-11">
          <AvatarImage
            src={imageSrc}
            alt="Imagen de perfil"
            className="object-cover"
          />
          <AvatarFallback>
            <User className="size-5 shrink-0" />
          </AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const name: string = row.getValue("name")

      return (
        <p className="py-4 min-w-[120px] text-muted-foreground text-sm">
          {name}
        </p>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
    cell: ({ row }) => {
      const email: string = row.getValue("email")

      return (
        <p className="py-4 min-w-[200px] text-muted-foreground text-sm">
          {email}
        </p>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const role: string = row.getValue("role")

      return (
        <Badge variant={role === "ADMIN" ? "primary" : "default"}>{role}</Badge>
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
        <CellAction userData={row.original} />
      </div>
    ),
  },
]
