"use client"

import { countries } from "countries-list"
import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronsUpDown, Globe2 } from "lucide-react"

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
import { cn } from "@/lib/utils"

export type Country = {
  label: string
  value: string
  flag: string
}

export const formattedCountries: Country[] = Object.keys(countries)
  .map((key) => ({
    label: countries[key as keyof typeof countries].name,
    value: key,
    flag: `/flags/${key.toLowerCase()}.svg`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export function getCountry(code?: string) {
  if (!code) return undefined
  return formattedCountries.find((c) => c.value === code)
}

// ---------- Props ----------
type CountryInputProps = {
  value?: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  placeholder?: string
  className?: string
  /** Optional id, useful for a <Label htmlFor> */
  id?: string
  /** Renders an invalid style (red ring) */
  "aria-invalid"?: boolean
}

export function CountryInput({
  value,
  onChange,
  onBlur,
  disabled,
  placeholder = "Select your country",
  className,
  id,
  "aria-invalid": ariaInvalid,
}: CountryInputProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const listRef = useRef<HTMLDivElement>(null)

  const selected = useMemo(() => getCountry(value), [value])

  // Reset scroll when search changes
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: "instant" })
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            aria-invalid={ariaInvalid}
            onBlur={onBlur}
            className={cn(
              "h-11 w-full justify-between rounded-xl px-4 font-normal",
              !selected && "text-muted-foreground",
              ariaInvalid &&
                "border-destructive focus-visible:ring-destructive",
              className
            )}
          >
            <span className="flex min-w-0 items-center gap-3">
              {selected ? (
                <img
                  src={selected.flag}
                  alt=""
                  width={20}
                  height={14}
                  className="rounded-sm object-cover"
                />
              ) : (
                <Globe2 className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span className="truncate">{selected?.label ?? placeholder}</span>
            </span>

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) min-w-70 p-0"
      >
        <Command>
          <CommandInput
            placeholder="Search countries..."
            onValueChange={setSearch}
          />

          <CommandList ref={listRef}>
            <CommandEmpty>No country found.</CommandEmpty>

            <CommandGroup heading="Countries">
              {formattedCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.label} ${country.value}`}
                  onSelect={() => {
                    onChange(country.value)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={country.flag}
                      alt=""
                      width={19}
                      height={13}
                      className="rounded-sm object-cover"
                    />
                    <span>{country.label}</span>
                  </div>

                  <Check
                    className={cn(
                      "size-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
