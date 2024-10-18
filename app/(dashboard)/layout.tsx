import { getUserById } from "@/actions/user"
import { CompletionForm } from "@/components/common/auth/completion-form"
import InitialAuthLayout from "@/components/common/auth/initial-auth-layout"
import { Navbar } from "@/components/common/navigation/navbar"
import { currentUser } from "@/lib/auth-user"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const loggedUser = await currentUser()
  const existingUser = await getUserById(loggedUser?.id)

  const missingEntityRelation = !existingUser?.entityId

  const initialData: { name: string; email: string; image: string } = {
    name: existingUser?.name!,
    email: existingUser?.email!,
    image: existingUser?.image!,
  }

  return (
    <>
      {missingEntityRelation && (
        <InitialAuthLayout>
          <CompletionForm user={initialData} />
        </InitialAuthLayout>
      )}
      {!missingEntityRelation && (
        <div className="flex flex-col h-full overflow-hidden">
          <Navbar />
          <main className="h-full overflow-y-auto">{children}</main>
        </div>
      )}
    </>
  )
}
