import { notFound } from "next/navigation"

import { MembershipForm } from "@/components/admin/memberships/membership-form"
import { prisma } from "@/prisma/prisma"

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const membership = await prisma.membership.findFirst({
    where: { id },
    include: { payment: true, user: true },
  })

  if (!membership) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit membership
        </h1>

        <p className="text-sm text-muted-foreground">
          Update membership details and its associated payment.
        </p>
      </div>

      <MembershipForm membership={membership} />
    </div>
  )
}
