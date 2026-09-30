export function getInitials(name?: string) {
  if (!name) return "- -"
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
