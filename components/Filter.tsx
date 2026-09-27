"use client"

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

interface SelectProps {
  name?: string
  options: { label: string; value: string }[]
  defaultValue?: string
  placeholder?: string
}

const Filter: React.FC<SelectProps> = ({
  name = "filter",
  options,
  defaultValue = "All",
  placeholder = "Select...",
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentQuery = searchParams.get(name) || defaultValue
  const [value, setValue] = useState<string>(currentQuery)

  const handleChange = (newValue: string | null) => {
    if (!newValue) return

    setValue(newValue)
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (newValue === "all") {
      params.delete(name)
    } else {
      params.set(name, newValue)
    }

    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    setValue(currentQuery)
  }, [currentQuery])

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="capitalize"
          >
            {option.label.toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default Filter
