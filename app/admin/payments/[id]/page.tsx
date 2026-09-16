import { notFound } from "next/navigation"

import { getAdminPayment } from "@/lib/admin-payments"
import { PaymentForm } from "@/components/admin/payments/payment-form"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function AdminPaymentPage({ params }: Props) {
  const { id } = await params

  const payment = getAdminPayment(id)

  if (!payment) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Payment management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Edit payment
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {payment.user.name} · {payment.user.email}
        </p>
      </div>

      <PaymentForm
        defaultValues={{
          discountCode: payment.discountCode ?? "",
          discountAmount: payment.discountAmount,
          discountType: payment.discountType,
          total: payment.total,
          totalPaid: payment.totalPaid,
        }}
      />
    </div>
  )
}
