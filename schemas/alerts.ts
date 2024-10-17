import { z } from "zod"

// Definir el esquema de validación con Zod
export const AlertSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  severity: z.enum(["Baja", "Media", "Alta"], {
    required_error: "Debes seleccionar la severidad de la alerta",
    invalid_type_error: "Tipo de severidad inválida",
  }),
})
