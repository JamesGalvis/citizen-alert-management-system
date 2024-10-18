"use client"

import { navItems } from "@/constants"
import { useCurrentRole } from "@/hooks/use-current-role"
import { cn } from "@/lib/utils"
import { UserRole } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"

export function NavItems() {
  const router = useRouter()
  const pathname = usePathname()
  const currentRole = useCurrentRole()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <nav className="ml-6 max-sm:hidden">
      <ul className="flex items-center gap-3">
        {navItems.map(({ label, href, onlyAdmin }) => {
          const isActive =
            (pathname === "/" && href === "/") || pathname === href

          return (
            <li
              key={href}
              onClick={() => handleClick(href)}
              className={cn(
                "cursor-pointer select-none font-medium text-[15px] text-muted-foreground hover:text-primary transition-colors",
                isActive && "text-primary",
                onlyAdmin && currentRole !== UserRole.ADMIN && "hidden"
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
