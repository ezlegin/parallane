import { PaymentForm } from "@/components/admin/payments/payment-form"

const page = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Payment management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          New payment
        </h1>
      </div>

      <PaymentForm />
    </div>
  )
}

export default page
