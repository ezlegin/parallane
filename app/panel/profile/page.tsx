import { redirect } from "next/navigation"

import { UserProfileForm } from "@/components/forms/UserProfileForm"
import { getSessionUser } from "@/lib/user"

export default async function ProfilePage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Account</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your personal information and password.
        </p>
      </section>

      <UserProfileForm
        user={{
          fullName: user.name,
          email: user.email,
        }}
      />
    </div>
  )
}
