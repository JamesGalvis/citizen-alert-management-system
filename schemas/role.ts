import { z } from "zod"

export const ChangeRoleSchema = z.object({
  role: z.enum(["ADMIN", "USER"], {
    required_error: "Debes seleccionar uno de los roles mostrados",
  }),
})
