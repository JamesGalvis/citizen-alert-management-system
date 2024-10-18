"use client"

import { useState } from "react"
import { Edit, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserColum } from "./columns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ChangeRoleForm from "./change-role-form"

interface CellActionProps {
  userData: UserColum
}

export function CellAction({ userData }: CellActionProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Role de Usuario</DialogTitle>
            <DialogDescription>
              Modifica el role del usuario {userData.name}.
            </DialogDescription>
          </DialogHeader>
          <ChangeRoleForm user={userData} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="size-4" />
            Cambiar role
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
