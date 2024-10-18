"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserColum } from "./columns"
import { MouseEvent, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { changeRole } from "@/actions/user"
import { UserRole } from "@prisma/client"

interface ChangeRoleFormProps {
  user: UserColum
  onClose: () => void
}

export default function ChangeRoleForm({ user, onClose }: ChangeRoleFormProps) {
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState(user.role)
  const [isSubmitting, startTransition] = useTransition()

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    if (selectedRole === user.role) {
      toast({
        title: "No se realizaron cambios",
        description: "El rol seleccionado es el mismo que el actual.",
        variant: "default",
      })
      return
    }

    startTransition(async () => {
      console.log(selectedRole)
      try {
        const { error, success } = await changeRole(
          user.id,
          selectedRole as UserRole
        )

        if (error) {
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          })
        }

        if (success) {
          toast({
            title: "Rol actualizado",
            description: `El rol de ${user.name} ha sido actualizado a ${
              selectedRole === "ADMIN" ? "Administrador" : "Usuario"
            }.`,
            variant: "success",
          })
        }

        onClose()
      } catch {
        toast({
          title: "Error",
          description:
            "No se pudo actualizar el rol. Por favor, intenta de nuevo.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="space-y-4">
      <Select defaultValue={user.role} onValueChange={setSelectedRole}>
        <SelectTrigger className="h-14 rounded-xl pl-4">
          <SelectValue placeholder="Selecciona el tipo de usuario" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">Usuario</SelectItem>
          <SelectItem value="ADMIN">Administrador</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button
          onClick={handleSubmit}
          className="w-full rounded-lg"
          disabled={isSubmitting || selectedRole === user.role}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin mr-2" />}
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}
