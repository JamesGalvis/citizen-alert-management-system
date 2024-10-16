"use server"

import { z } from "zod"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/actions/user"
import { DEFAULT_AUTH_REDIRECT } from "@/routes"
import {
  CompleteRegisterFormSchema,
  LoginFormSchema,
  RegisterFormSchema,
} from "@/schemas/auth"
import { currentUser } from "@/lib/auth-user"

export async function login(credentials: z.infer<typeof LoginFormSchema>) {
  const result = LoginFormSchema.safeParse(credentials)

  if (result.error) {
    return { error: "Credenciales invalidas!" }
  }

  const { email, password } = result.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" }
        default:
          return { error: "Algo salió mal en el proceso!" }
      }
    }

    throw error
  }
}

export async function register(
  credentials: z.infer<typeof RegisterFormSchema>
) {
  const result = RegisterFormSchema.safeParse(credentials)

  if (result.error) {
    return { error: "Datos invalidos!" }
  }

  const { firstName, lastName, email, password, entity } = result.data

  try {
    const existingEntity = await db.entity.findUnique({
      where: { name: entity },
    })

    if (!existingEntity) {
      return { error: "Lo sentimos, la entidad seleccionada no existe aún." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: "El correo ingresado ya esta en uso!" }
    }

    await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        entity: {
          connect: {
            id: existingEntity.id,
          },
        },
      },
    })

    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" }
        default:
          return { error: "Algo salió mal en el proceso!" }
      }
    }

    throw error
  }
}

export async function completeRegistration(
  credentials: z.infer<typeof CompleteRegisterFormSchema>
) {
  const loggedUser = await currentUser()
  const result = CompleteRegisterFormSchema.safeParse(credentials)

  if (result.error) {
    return { error: "Datos invalidos!" }
  }

  const { name, email, entity } = result.data

  try {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return { error: "El usuario no existe!" }
    }

    const existingEntity = await db.entity.findUnique({
      where: { name: entity },
    })

    if (!existingEntity) {
      return { error: "Lo sentimos, la entidad seleccionada no existe aún." }
    }

    await db.user.update({
      where: { id: loggedUser?.id },
      data: {
        name,
        entity: {
          connect: {
            id: existingEntity.id,
          },
        },
      },
    })
  } catch (error) {
    return { error: "Algo salio mal en el proceso." }
  }
}

export async function logout() {
  await signOut({ redirectTo: DEFAULT_AUTH_REDIRECT })
}
