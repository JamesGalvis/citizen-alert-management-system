import React from "react"

import { LargeLogo } from "@/components/common/large-logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center gap-4 min-h-full max-w-[1800px] max-lg:p-4 mx-auto">
      <div className="sticky top-0 bottom-0 max-lg:hidden flex items-end w-[520px] min-w-[500px] h-screen rounded-r-[38px] p-8 bg-gradient-to-b from-purple-700 via-purple-700/50 to-purple-900/20 inverted-border-radius">
        <LargeLogo className="absolute top-8 left-8" />
        <div className="space-y-2 select-none">
          <h2 className="text-[42px] font-semibold leading-[45px] mb-3">
            Protección <br /> Urbana Inteligente
          </h2>
          <p className="text-muted-foreground">
            Conectando a las entidades más importantes para hacer de nuestra
            ciudad un lugar más seguro
          </p>
        </div>
      </div>
      <div className="flex-1 lg:px-6 px-1.5 lg:py-4 max-lg:my-4">
        {children}
      </div>
    </div>
  )
}
