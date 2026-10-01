import { notFound } from "next/navigation"

import { PaymentForm } from "@/components/admin/payments/payment-form"
import { prisma } from "@/prisma/prisma"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function AdminPaymentPage({ params }: Props) {
  const { id } = await params

  const payment = await prisma.payment.findFirst({
    where: { id },
    include: { user: { omit: { password: true } }, membership: true },
  })

  if (!payment) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Payment management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Edit payment
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {payment.user.name} · {payment.user.email}
        </p>
      </div>

      <PaymentForm payment={payment} />
    </div>
  )
}
