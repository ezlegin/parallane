import { notFound } from "next/navigation"

import { getAdminMembership } from "@/lib/admin-memberships"

import { MembershipForm } from "@/components/admin/memberships/membership-form"

const users = [
  {
    id: "user_001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
  },
  {
    id: "user_002",
    name: "Michael Chen",
    email: "michael@example.com",
  },
  {
    id: "user_003",
    name: "Emma Williams",
    email: "emma@example.com",
  },
  {
    id: "user_004",
    name: "David Miller",
    email: "david@example.com",
  },
  {
    id: "user_005",
    name: "Olivia Brown",
    email: "olivia@example.com",
  },
]

const payments = [
  {
    id: "pay_001",
    userName: "Sarah Johnson",
    totalPaid: 26.1,
    paidAt: "September 16, 2026",
  },
  {
    id: "pay_002",
    userName: "Michael Chen",
    totalPaid: 29,
    paidAt: "September 16, 2026",
  },
  {
    id: "pay_003",
    userName: "Emma Williams",
    totalPaid: 24,
    paidAt: "September 15, 2026",
  },
  {
    id: "pay_004",
    userName: "David Miller",
    totalPaid: 26.1,
    paidAt: "September 15, 2026",
  },
  {
    id: "pay_005",
    userName: "Olivia Brown",
    totalPaid: 23.2,
    paidAt: "September 14, 2026",
  },
]

export default async function MembershipEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const membership = getAdminMembership(id)

  if (!membership) {
    notFound()
  }

  const user = users.find((user) => user.email === membership.user.email)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit membership
        </h1>

        <p className="text-sm text-muted-foreground">
          Update membership details and its associated payment.
        </p>
      </div>

      <MembershipForm
        users={users}
        payments={payments}
        defaultValues={{
          userId: user?.id ?? "",
          paymentId: membership.paymentId ?? "",
          from: toInputDate(membership.from),
          expiresAt: toInputDate(membership.expiresAt),
          period: membership.period,
        }}
      />
    </div>
  )
}

function toInputDate(value: string) {
  return new Date(value).toISOString().split("T")[0]
}
