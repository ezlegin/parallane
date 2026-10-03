export function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>
}

export function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>
}

export function Punct({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>
}

export function Plain({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>
}
