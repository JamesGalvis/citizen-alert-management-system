"use client"

import { MenuIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { navItems } from "@/constants"
import { LargeLogo } from "../large-logo"

export function MobileNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden rounded-full size-10">
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[999]">
        <SheetHeader className="text-start">
          <SheetTitle className="text-start flex items-center gap-3 w-full"><LargeLogo /> SafeAlert</SheetTitle>
        </SheetHeader>

        <div className="mt-12 my-4 space-y-4">
          {navItems.map(({ href, label, Icon }) => {
            const isActive =
              (pathname === "/" && href === "/") || pathname === href

            return (
              <SheetClose asChild key={href}>
                <p
                  onClick={() => handleClick(href)}
                  className={cn(
                    "flex items-center gap-4 font-medium text-muted-foreground cursor-pointer hover:text-primary transition",
                    isActive && "text-primary"
                  )}
                >
                  <Icon className="size-6 shrink-0" />
                  {label}
                </p>
              </SheetClose>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
