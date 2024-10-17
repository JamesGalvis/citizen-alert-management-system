import Link from "next/link"

import { LargeLogo } from "../large-logo"
import { ModeToggle } from "../mode-toggle"
import { UserButton } from "../user-button"

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-[80px] border-b sm:px-8 px-4">
      <Link href="/">
        <LargeLogo />
      </Link>
      <div className="flex items-center gap-3">
        <ModeToggle className="size-12 border rounded-full" />
        <UserButton />
      </div>
    </div>
  )
}
