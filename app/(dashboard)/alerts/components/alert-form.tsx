"use client"

import { z } from "zod"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Info, Loader2, MapPinned, Slash } from "lucide-react"
import { Alert, AlertSeverity } from "@prisma/client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { AlertSchema } from "@/schemas/alerts"
import useCoordinateStore from "@/store/coordinateStore"
import { useToast } from "@/hooks/use-toast"
import { createAlert, updateAlert } from "@/actions/alerts"

interface AlertFormProps {
  initialData: Alert | null
}

export function AlertForm({ initialData }: AlertFormProps) {
  const router = useRouter()

  const { toast } = useToast()
  const { coordinates, setCoordinates, resetCoordinates } = useCoordinateStore()

  useEffect(() => {
    if (initialData) {
      setCoordinates({
        center: [initialData.affectedArea[0], initialData.affectedArea[1]],
        radius: initialData.affectedAreaRadius,
      })
    }
  }, [initialData])

  const title = initialData ? "Editar alerta" : "Crear alerta"
  const description = initialData
    ? "Realiza los cambios que necesites para la alerta"
    : "Llena el formulario y genera la alerta ciudadana"
  const toastMessage = initialData ? "Alerta actualizado" : "Alerta creada"
  const action = initialData ? "Guardar cambios" : "Crear alerta"
  const breadcrumbPageLabel = initialData ? "Actualizar alerta" : "Crear alerta"

  const form = useForm({
    resolver: zodResolver(AlertSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      severity: initialData?.severity || AlertSeverity.Baja,
    },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(values: z.infer<typeof AlertSchema>) {
    try {
      if (!initialData) {
        createNewAlert(values)
      }

      if (initialData) {
        updateExistingAlert(initialData.id, values)
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Algo salió mal.",
        description: "Hubo un error al momento de realizar la solicitud.",
      })
    }
  }

  async function createNewAlert(values: z.infer<typeof AlertSchema>) {
    try {
      const { error, success } = await createAlert(values, coordinates!)

      if (error) {
        toast({
          variant: "destructive",
          title: "Algo salió mal.",
          description: error,
        })
      }

      if (success) {
        resetCoordinates()
        toast({
          variant: "success",
          title: toastMessage,
        })
        router.push("/alerts")
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Algo salió mal.",
        description: "Hubo un error al momento de realizar la solicitud.",
      })
    }
  }

  async function updateExistingAlert(
    alertId: string,
    values: z.infer<typeof AlertSchema>
  ) {
    try {
      const { error, success } = await updateAlert(
        alertId,
        values,
        coordinates!
      )

      if (error) {
        toast({
          variant: "destructive",
          title: "Algo salió mal.",
          description: error,
        })
      }

      if (success) {
        resetCoordinates()
        toast({
          variant: "success",
          title: toastMessage,
        })
        router.push("/alerts")
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Algo salió mal.",
        description: "Hubo un error al momento de realizar la solicitud.",
      })
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-full">
      <Breadcrumb className="px-5 py-6 pt-8 md:hidden">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/alerts">Alertas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumbPageLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-start p-5">
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="px-5 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Título</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Ingresa un título"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe la alerta"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Severidad</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la severidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baja">Baja</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg">
              <h3 className="flex items-center justify-between gap-2 font-medium mb-2">
                Detalles del área de afectación
                <MapPinned className="size-5 text-muted-foreground" />
              </h3>
              <div className="text-sm">
                <p className="space-x-1.5">
                  <span className="font-medium">Centro de coordenadas:</span>
                  <span>
                    {coordinates
                      ? `${coordinates.center[0]}, ${coordinates.center[1]}`
                      : "No disponible"}
                  </span>
                </p>
                <p className="space-x-1.5">
                  <span className="font-medium">Radio de afectación:</span>
                  <span>
                    {coordinates
                      ? `${coordinates.radius.toFixed(0)} metros`
                      : "No disponible"}
                  </span>
                </p>
              </div>
            </section>

            <p className="text-sm italic mt-2">
              <Info className="size-4 mr-2 inline" />
              Para crear la alerta debes crear el área de afectación en el mapa.
            </p>

            <Button
              size="lg"
              className="w-full rounded-lg"
              disabled={isSubmitting || !isValid || !coordinates}
              type="submit"
            >
              {isSubmitting && (
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
              )}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
