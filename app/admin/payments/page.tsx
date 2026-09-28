import Link from "next/link"

import { Button } from "@/components/ui/button"
import PaymnetsList from "./PaymnetsList"
import { prisma } from "@/prisma/prisma"

export default async function page() {
  const payments = await prisma.payment.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            View and manage payment records.
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Payments
          </h1>
        </div>

        <Link href={"/admin/payments/new"}>
          <Button>Add Payment</Button>
        </Link>
      </div>

      <PaymnetsList payments={payments} />
    </div>
  )
}
