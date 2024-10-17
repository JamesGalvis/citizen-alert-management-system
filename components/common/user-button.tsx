import Link from "next/link"
import { LogOut, UserRound } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/common/user-avatar"
import { currentUser } from "@/lib/auth-user"
import { LogoutButton } from "./auth/logout-button"

interface UserButtonProps {
  className?: string
}

export async function UserButton({ className }: UserButtonProps) {
  const loggedUser = await currentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button className="select-none">
          <UserAvatar own />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={16}
        className="w-[264px] lg:w-[300px] lg:mr-3 ml-3 bg-slate-50 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent-foreground/5 dark:bg-accent-foreground/10">
          <div className="flex items-center space-x-2 truncate">
            <div className="overflow-x-hidden">
              <p className="truncate w-full text-[15.5px] font-semibold">
                {loggedUser?.name}
              </p>
              <p className="truncate w-full text-sm text-gray-500 dark:text-gray-400">
                {loggedUser?.email}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />
        <Link href={`/dashboard/profile/${loggedUser?.id}`}>
          <DropdownMenuItem className="cursor-pointer py-2">
            <UserRound className="size-4 mr-2" />
            Perfil
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer p-0">
          <LogoutButton variant="ghost" className="justify-start w-full py-2">
            <LogOut className="size-4 mr-3" />
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
