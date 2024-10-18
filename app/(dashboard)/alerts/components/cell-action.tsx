"use client"

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertColum } from "./columns"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/common/alert-modal"
import { deleteAlert } from "@/actions/alerts"

interface CellActionProps {
  alertData: AlertColum
}

export function CellAction({ alertData }: CellActionProps) {
  const { toast } = useToast()
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const { success, error } = await deleteAlert(alertData.id)

        if (error) {
          toast({
            variant: "destructive",
            title: error,
          })
        }

        if (success) {
          toast({
            variant: "success",
            title: success,
          })
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Algo salió mal al eliminar el cartel publicitario.",
        })
      } finally {
        setOpen(false)
      }
    })
  }

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/alerts/${alertData.id}`)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className=" dark:hover:focus:bg-rose-400/20 hover:focus:bg-rose-400/20 text-rose-400 hover:focus:text-rose-400 dark:hover:focus:text-rose-400"
          >
            <Trash2 className="size-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
