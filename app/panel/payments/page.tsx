import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"
import { format } from "date-fns"
import { redirect } from "next/navigation"

export default async function PaymentsPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const payments = await prisma.payment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

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

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Dued</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Issued At</TableHead>
              <TableHead>Paid At</TableHead>
              <TableHead>Discount Code</TableHead>
              <TableHead>Discount Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-15" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <span className="font-mono text-sm font-medium">
                    {payment.reference}
                  </span>
                </TableCell>

                <TableCell>€{payment.totalAmount.toFixed(2)}</TableCell>

                <TableCell className="font-medium">
                  <Badge variant="secondary" className="px-3 py-3 capitalize">
                    €{payment.paidAmount.toFixed(2)}
                  </Badge>
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {format(payment.createdAt, "Pp")}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {payment.paidAt ? format(payment.paidAt, "Pp") : "Not Paid"}
                </TableCell>

                <TableCell>
                  <span>{payment.discountCode ?? "-"}</span>
                </TableCell>

                <TableCell>
                  <p>€{payment.discountAmount.toFixed(2)}</p>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      payment.status === "success"
                        ? "success"
                        : payment.status === "pending"
                          ? "warning"
                          : "destructive"
                    }
                    className="capitalize"
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
