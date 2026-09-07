const GlowingStroke = ({
  side = "top",
  className,
}: {
  side?: "top" | "bottom"
  className?: string
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-x-8 ${side === "top" ? "top-0" : "bottom-0"} h-px bg-linear-to-r from-transparent via-foreground/15 to-transparent ${className}`}
    />
  )
}

export default GlowingStroke
