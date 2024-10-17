"use client"

import { navItems } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

export function NavItems() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <nav className="ml-6">
      <ul className="flex items-center gap-3">
        {navItems.map(({ label, href }) => {
          const isActive =
            (pathname === "/" && href === "/") || pathname === href

          return (
            <li
              key={href}
              onClick={() => handleClick(href)}
              className={cn(
                "cursor-pointer select-none font-medium text-[15px] text-muted-foreground hover:text-primary transition-colors",
                isActive && "text-primary"
              )}
            >
              {label}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
