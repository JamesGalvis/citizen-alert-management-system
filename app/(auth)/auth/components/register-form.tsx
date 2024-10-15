"use client"

import { z } from "zod"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { RegisterFormSchema } from "@/schemas/auth"
import { FormWrapper } from "@/components/common/auth/form-wrapper"
import { PasswordInput } from "@/components/common/auth/password-input"
import { FormStateMessage } from "@/components/common/auth/form-state-message"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { entities } from "@/constants"

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      entity: undefined,
    },
  })

  const { isSubmitting } = form.formState

  function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    console.log(values)
  }

  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <FormWrapper
        headerTitle="Regístrate"
        headerSubtitle="Introduce tus datos para crear tu cuenta"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
              <div className="flex gap-3 w-full">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          variant="largeRounded"
                          placeholder="Jhon Doe"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input
                          variant="largeRounded"
                          placeholder="Jhon Doe"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        variant="largeRounded"
                        type="email"
                        placeholder="ej. jhon@gmail.com"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        variant="largeRounded"
                        field={field}
                        isSubmitting={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription className="text-[13.5px]">
                      La contraseña debe tener un mínimo de 8 caracteres,
                      incluyendo al menos 1 letra, 1 número y 1 carácter
                      especial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entidad</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 rounded-xl pl-4">
                          <SelectValue placeholder="Selecciona la entidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {entities.map((entity) => (
                          <SelectItem value={entity}>{entity}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecciona la entidad a la que estas vinculado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormStateMessage type="Success" message={success} />
              <FormStateMessage type="Error" message={error} />

              <div className="pt-3 pb-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full font-semibold rounded-lg"
                >
                  {isSubmitting && (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  )}
                  Registrarse
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </div>
  )
}