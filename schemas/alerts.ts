import { z } from "zod"

// Definir el esquema de validación con Zod
export const AlertSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  severity: z.string().min(1, "La severidad es requerida"),
})

// export const AlertSchema = z.object({
//   title: z.string().min(1, "El título es requerido"),
//   description: z.string().min(1, "La descripción es requerida"),
//   severity: z.string().min(1, "La severidad es requerida"),
//   coordinates: z
//     .object({
//       center: z.array(z.number()).length(2), // El centro debe ser una tupla de dos números [lat, lng]
//       radius: z.number().min(1, "El radio debe ser mayor que 0"), // El radio debe ser un número mayor que 0
//     })
//     .refine(
//       (coords) => coords.radius > 0,
//       "El radio debe ser un valor positivo"
//     ), // Asegurarse de que el radio sea positivo
// })
