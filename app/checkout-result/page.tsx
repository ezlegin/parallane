import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, CheckCircle2, Clock, Receipt, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; ref?: string; reason?: string }>
}) {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const { status, ref, reason } = await searchParams
  const isSuccess = status === "success"

  // Only load the payment if we have a reference
  const payment = ref
    ? await prisma.payment.findUnique({
        where: { reference: ref },
        select: {
          reference: true,
          paidAmount: true,
          totalAmount: true,
          discountAmount: true,
          discountCode: true,
          paidAt: true,
          status: true,
        },
      })
    : null

  // Guard against someone forging ?ref=someone-elses-payment
  if (payment && payment.reference) {
    const owned = await prisma.payment.findFirst({
      where: { reference: ref, userId: user.id },
      select: { id: true },
    })
    if (!owned)
      redirect("/panel/checkout/result?status=failed&reason=not_found")
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Soft glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          isSuccess
            ? "bg-emerald-500/10 dark:bg-emerald-500/20"
            : "bg-destructive/10 dark:bg-destructive/20"
        }`}
      />

      <div className="relative z-10 w-full max-w-md">
        <Card className="overflow-hidden rounded-2xl border-border/80 bg-card/95 shadow-xl backdrop-blur-xl">
          <CardHeader className="items-center pb-2 text-center">
            <div
              className={`flex size-16 w-full items-center justify-center rounded-2xl border ${
                isSuccess
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2
                  className="size-8 text-emerald-500"
                  strokeWidth={1.5}
                />
              ) : (
                <XCircle
                  className="size-8 text-destructive"
                  strokeWidth={1.5}
                />
              )}
            </div>

            <CardTitle className="mt-4 text-2xl font-semibold tracking-tight">
              {isSuccess ? "Payment successful" : "Payment failed"}
            </CardTitle>

            <CardDescription className="max-w-sm text-sm">
              {isSuccess
                ? "Your membership is now active. Enjoy unlimited access to every course."
                : reason === "missing_authority"
                  ? "The gateway did not send a valid authority token."
                  : reason === "unkown_error"
                    ? "Something Happended. Please try again later. If money was not deducted within 48 hours, Please contact us."
                    : reason === "not_found"
                      ? "We couldn't locate this payment. Contact support if money was deducted."
                      : "Your payment could not be verified. If money was deducted, it will be refunded within 48 hours."}
            </CardDescription>
          </CardHeader>

          {isSuccess && payment && (
            <CardContent className="space-y-4">
              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Receipt className="size-3.5" />
                    Reference
                  </span>
                  <span className="font-mono text-xs">{payment.reference}</span>
                </div>

                {payment.discountAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Discount{" "}
                      {payment.discountCode && `(${payment.discountCode})`}
                    </span>
                    <span>-{formatPrice(payment.discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-base font-semibold">
                    {formatPrice(payment.paidAmount)}
                  </span>
                </div>

                {payment.paidAt && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-3.5" />
                      Paid at
                    </span>
                    <span className="text-xs">
                      {new Intl.DateTimeFormat("en-IE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(payment.paidAt)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          )}

          <CardContent className="pt-2">
            <div className="flex flex-col gap-3">
              {isSuccess ? (
                <Link href="/panel/enrollments" className="w-full">
                  <Button size="lg" className="w-full rounded-xl">
                    Start learning
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/panel/checkout" className="w-full">
                    <Button size="lg" className="w-full rounded-xl">
                      Try again
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      Contact us
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Parallane. Learn. Build. Grow.
        </p>
      </div>
    </main>
  )
}
