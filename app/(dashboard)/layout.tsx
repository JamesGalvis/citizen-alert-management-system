import { getUserById } from "@/actions/user"
import { Navbar } from "@/components/common/navigation/navbar"
import { currentUser } from "@/lib/auth-user"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const loggedUser = await currentUser()
  const existingUser = await getUserById(loggedUser?.id)

  const missingEntityRelation = !existingUser?.entityId

  if (missingEntityRelation) {
    redirect("/auth/complete")
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="sm:px-8 px-4 h-full overflow-y-auto">{children}</main>
    </div>
  )
}
