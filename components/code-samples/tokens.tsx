import { cn } from "cn"

export function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>
}

export function Str({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn("text-muted-foreground", className)}>{children}</span>
  )
}

export function Punct({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>
}

export function Plain({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn("text-foreground", className)}>{children}</span>
}
