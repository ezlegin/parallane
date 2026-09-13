import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const payments = [
  {
    date: "Sep 12, 2026",
    amount: "$19.00",
    status: "Paid",
    invoice: "INV-2026-009",
  },
  {
    date: "Aug 12, 2026",
    amount: "$19.00",
    status: "Paid",
    invoice: "INV-2026-008",
  },
  {
    date: "Jul 12, 2026",
    amount: "$19.00",
    status: "Paid",
    invoice: "INV-2026-007",
  },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Account</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Payments
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your Parallane payment history.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="divide-y">
            {payments.map((payment) => (
              <div
                key={payment.invoice}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full border">
                    <CheckCircle2 className="size-4" />
                  </div>

                  <div>
                    <p className="font-medium">Membership</p>

                    <p className="text-sm text-muted-foreground">
                      {payment.date} · {payment.invoice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="success">{payment.status}</Badge>

                  <span className="font-medium">{payment.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
