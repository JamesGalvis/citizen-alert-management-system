import { getUserById } from "@/actions/user"
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

  return <div>{children}</div>
}
