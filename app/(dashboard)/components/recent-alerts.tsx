import Image from "next/image"
import {  MoreHorizontal } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert } from "@prisma/client"

interface RecentAlertsProps {
  alerts: Alert[]
}

export default function RecentAlerts({ alerts }: RecentAlertsProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Alertas Recientes</CardTitle>
        <CardDescription>
          Una lista de las alertas más recientes en el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-4 h-full">
          {alerts.length === 0 && (
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src="/icons/ampty-alerts-white.svg"
                  alt="Imagen de alguien en una caja vacia"
                  width={80}
                  height={80}
                  className="w-[360px] h-auto object-cover hidden dark:block"
                />
                <Image
                  src="/icons/ampty-alerts-black.svg"
                  alt="Imagen de alguien en una caja vacia"
                  width={80}
                  height={80}
                  className="w-[360px] h-auto object-cover block dark:hidden"
                />
                <p className="italic">"Aún no hay alertas creadas"</p>
              </div>
            </div>
          )}
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4 truncate">
                <Badge
                  variant={
                    alert.severity === "Alta"
                      ? "destructive"
                      : alert.severity === "Media"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {alert.severity}
                </Badge>
                <div className="truncate">
                  <p className="font-medium truncate">{alert.title}</p>
                  <p className="text-sm text-muted-foreground truncate w-full">
                    {alert.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Asignar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Marcar como falso positivo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
