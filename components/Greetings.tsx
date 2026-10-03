"use client"

import { useEffect, useState } from "react"

export function Greetings({ name }: { name: string }) {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    )
  }, [])

  return (
    <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
      {greeting}, {name}
    </h1>
  )
}
