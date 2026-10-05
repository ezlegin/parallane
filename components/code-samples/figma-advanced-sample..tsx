import { Kw, Plain, Punct, Str } from "./tokens"

export function FigmaAdvancedSample() {
  return (
    <div className="space-y-5">
      {/* File header */}
      <div className="flex items-baseline gap-2">
        <Plain>bitsup</Plain>
        <Punct>.</Punct>
        <Kw>design-system</Kw>
      </div>

      {/* Variables */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          variables
        </Plain>
        <div className="flex flex-wrap gap-1.5">
          {[
            "surface/base",
            "surface/raised",
            "text/primary",
            "text/muted",
            "border/subtle",
            "accent/default",
          ].map((v) => (
            <span
              key={v}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/60"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Auto Layout */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          auto layout
        </Plain>
        <div className="flex items-center gap-2 rounded border border-dashed border-primary/40 p-2">
          <div className="rounded bg-white/15 px-2 py-1 text-[9px] text-white/70">
            ↓ col
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="h-1.5 w-3/4 rounded-sm bg-white/15" />
            <div className="h-1.5 w-1/2 rounded-sm bg-white/10" />
          </div>
          <div className="rounded bg-white/15 px-2 py-1 text-[9px] text-white/70">
            gap 12
          </div>
        </div>
      </div>

      {/* Component variants */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          variants
        </Plain>
        <div className="grid grid-cols-3 gap-1.5">
          {["default", "hover", "disabled"].map((v) => (
            <div
              key={v}
              className="flex flex-col items-center gap-1 rounded border border-white/10 p-2"
            >
              <div
                className={`h-4 w-full rounded ${
                  v === "default"
                    ? "bg-white/20"
                    : v === "hover"
                      ? "bg-white/30"
                      : "bg-white/5"
                }`}
              />
              <span className="font-mono text-[9px] text-white/40">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spec sheet */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          spec
        </Plain>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px]">
          <div className="flex justify-between border-b border-white/5 py-0.5">
            <Str>padding</Str>
            <Plain className="text-white/70">12 20</Plain>
          </div>
          <div className="flex justify-between border-b border-white/5 py-0.5">
            <Str>radius</Str>
            <Plain className="text-white/70">9999</Plain>
          </div>
          <div className="flex justify-between border-b border-white/5 py-0.5">
            <Str>gap</Str>
            <Plain className="text-white/70">8</Plain>
          </div>
          <div className="flex justify-between border-b border-white/5 py-0.5">
            <Str>font</Str>
            <Plain className="text-white/70">Inter</Plain>
          </div>
        </div>
      </div>
    </div>
  )
}
