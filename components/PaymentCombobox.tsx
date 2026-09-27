"use client"

import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { searchPayments } from "@/lib/payment"
import { cn } from "@/lib/utils"

type PaymentOption = {
  id: string
  reference: string
}

function PaymentCombobox({
  value,
  onChange,
  initiaPayment,
}: {
  initiaPayment?: PaymentOption | null
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [payments, setPayments] = useState<PaymentOption[]>([])
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(
    initiaPayment ?? null
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setPayments([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)

      const result = await searchPayments(query)

      if (result.payments) {
        setPayments(result.payments)
      }

      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    if (!value) {
      setSelectedPayment(null)
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selectedPayment ? (
              <span className="truncate">{selectedPayment.reference} </span>
            ) : (
              <span className="text-muted-foreground">
                Search payments by reference...
              </span>
            )}

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by email or name..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {query ? "No payments found." : "Start typing to search."}
                </CommandEmpty>

                <CommandGroup>
                  {payments.map((payment) => (
                    <CommandItem
                      key={payment.id}
                      value={payment.id}
                      onSelect={() => {
                        setSelectedPayment(payment)
                        onChange(payment.id)
                        setOpen(false)
                        setQuery("")
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          value === payment.id ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <p className="truncate text-sm">{payment.reference}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default PaymentCombobox
