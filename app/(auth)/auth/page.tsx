"use client"

import { useState } from "react"

import { LargeLogo } from "@/components/common/large-logo"
import { LoginForm } from "./components/login-form"
import { RegisterForm } from "./components/register-form"

export default function AuthPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  const changeFormLabel = isLoggingIn
    ? "No tienes una cuenta?"
    : "Ya tienes una cuenta?"
  const changeFormTrigger = isLoggingIn ? "Regístrate" : "Inicia sesión"

  return (
    <div className="flex flex-col items-center justify-between gap-3 min-h-full overflow-hidden">
      <LargeLogo className="lg:hidden" />

      {isLoggingIn && <LoginForm />}
      {!isLoggingIn && <RegisterForm />}

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground select-none">
          {changeFormLabel}
        </span>
        <button
          className="font-medium select-none"
          onClick={() => setIsLoggingIn(!isLoggingIn)}
        >
          {changeFormTrigger}
        </button>
      </div>
    </div>
  )
}
