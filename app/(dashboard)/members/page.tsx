import { DataTable } from "@/components/common/data-table"
import { Heading } from "@/components/heading"
import { currentRole, currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { columns, UserColum } from "./components/columns"
import { redirect } from "next/navigation"
import { UserRole } from "@prisma/client"

export default async function MembersPage() {
  const userRole = await currentRole()

  if (userRole !== UserRole.ADMIN) {
    redirect("/")
  }

  const loggedUser = await currentUser()

  const users = await db.user.findMany({
    where: {
      entityId: loggedUser?.entityId!,
      id: {
        not: loggedUser?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedUsers: UserColum[] = users.map((user) => ({
    id: user.id,
    image: user.image!,
    name: user.name!,
    email: user.email!,
    role: user.role!,
    createdAt: format(user.createdAt, "MMM do, yyyy")!,
  }))

  return (
    <div className="sm:px-8 px-4 py-8 space-y-12">
      <Heading
        title={`Miembros (${users.length})`}
        description="Asigna roles a los miembros del sistema"
      />
      <DataTable searchKey="name" columns={columns} data={formattedUsers} />
    </div>
  )
}
