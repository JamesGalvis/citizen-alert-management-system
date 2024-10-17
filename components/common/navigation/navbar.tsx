import Link from "next/link"

import { LargeLogo } from "../large-logo"
import { ModeToggle } from "../mode-toggle"
import { UserButton } from "../user-button"
import { NavItems } from "./nav-items"

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-[80px] border-b sm:px-8 px-4">
      <div className="flex items-center gap-3">
        <Link href="/">
          <LargeLogo />
        </Link>
        <NavItems />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle className="size-12 border rounded-full" />
        <UserButton />
      </div>
    </div>
  )
}
