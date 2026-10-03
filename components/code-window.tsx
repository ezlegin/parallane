import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import GlowingStroke from "@/components/GlowingStroke"
import { cn } from "@/lib/utils"

type CodeWindowProps = {
  language: string
  children: React.ReactNode
  className?: string
}

export function CodeWindow({ language, children, className }: CodeWindowProps) {
  return (
    <Card className={cn("relative w-full gap-3 py-3", className)}>
      <GlowingStroke />

      {/* Title bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="size-2 rounded-full bg-muted-foreground" />
          ))}
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          {language}
        </div>
      </div>

      <Separator />

      <CardContent>
        <pre className="overflow-x-auto font-mono text-sm leading-6">
          <code>{children}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
