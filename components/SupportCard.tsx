import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SupportCard() {
  return (
    <div className="rounded-2xl border p-5">
      <p className="text-sm font-semibold">Need help with your purchase?</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        If you have questions about membership or payment, our team is here to
        help.
      </p>

      <Link href="/contact">
        <Button variant="link" className="mt-2 h-auto p-0 text-sm">
          Contact support
          <ArrowRight className="ml-1 size-3.5" />
        </Button>
      </Link>
    </div>
  )
}
