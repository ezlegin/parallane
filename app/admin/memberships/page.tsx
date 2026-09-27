import { Button } from "@/components/ui/button"
import { prisma } from "@/prisma/prisma"
import Link from "next/link"
import MembershipCard from "./MembershipList"

export default async function MembershipsPage() {
  const memberships = await prisma.membership.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      enrollments: { include: { course: true } },
      user: true,
      payment: true,
    },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Memberships</h1>
          <p className="text-sm text-muted-foreground">
            Monitor active memberships and their enrolled courses.
          </p>
        </div>
        <Link href="/admin/memberships/new">
          <Button>Add membership</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {memberships.map((membership) => (
          <MembershipCard key={membership.id} membership={membership} />
        ))}
      </div>
    </div>
  )
}
