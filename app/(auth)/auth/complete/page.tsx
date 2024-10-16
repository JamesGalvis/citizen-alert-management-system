import { redirect } from "next/navigation"

import { currentUser } from "@/lib/auth-user"
import { CompletionForm } from "./components/completion-form"
import { LargeLogo } from "@/components/common/large-logo"

export default async function AuthCompletePage() {
  const user = await currentUser()

  if (!user) return redirect("/auth")

  const initialData: { name: string; email: string; image: string } = {
    name: user.name!,
    email: user.email!,
    image: user.image!,
  }

  console.log(user.image)
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-full overflow-hidden px-6">
      <LargeLogo className="lg:hidden" />

      <CompletionForm user={initialData} />
    </div>
  )
}
