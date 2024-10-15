import Image from "next/image"

import { cn } from "@/lib/utils"

interface LargeLogoProps {
  className?: string
}

export function LargeLogo({ className }: LargeLogoProps) {
  return (
    <div
      className={cn(
        "select-none flex items-center gap-2",
        className
      )}
    >
      <Image
        src="./icons/SafeAlert-logo.svg"
        alt="Logo de SafeAlert"
        width={40}
        height={40}
        className="size-[35px] shrink-0"
      />
      <span className="text-[16px] tracking-wider">SafeAlert</span>
    </div>
  )
}
