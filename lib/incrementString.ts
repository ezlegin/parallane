export function incrementString(str?: string) {
  const parts = (str ?? "par-000").split("-")

  const lastPart = parts[parts.length - 1]
  const incremented = String(Number(lastPart) + 1).padStart(
    lastPart.length,
    "0"
  )

  parts[parts.length - 1] = incremented

  return parts.join("-")
}
