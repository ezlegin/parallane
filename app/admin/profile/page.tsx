import { AdminProfileForm } from "@/components/admin/profile/admin-profile-form"

import { admin } from "@/lib/admin"

export default function AdminProfilePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your administrator account information.
        </p>
      </div>

      <AdminProfileForm admin={admin} />
    </div>
  )
}
