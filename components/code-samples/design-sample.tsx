import { Kw, Plain, Punct, Str } from "./tokens"

export function DesignSample() {
  return (
    <div className="space-y-5">
      {/* Tokens header */}
      <div className="flex items-baseline gap-2">
        <Plain>design</Plain>
        <Punct>{"."}</Punct>
        <Kw>system</Kw>
        <Punct>()</Punct>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          colors
        </Plain>
        <div className="flex gap-1.5">
          {[
            "bg-zinc-950",
            "bg-zinc-700",
            "bg-zinc-400",
            "bg-zinc-200",
            "bg-white",
          ].map((c, i) => (
            <div
              key={i}
              className={`size-7 rounded-md border border-white/10 ${c}`}
            />
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          spacing
        </Plain>
        <div className="flex items-end gap-2">
          {[4, 8, 12, 20, 32].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="rounded-sm bg-primary/60"
                style={{ width: 3, height: s }}
              />
              <Str className="text-[9px] opacity-50">{s}</Str>
            </div>
          ))}
        </div>
      </div>

      {/* Type ramp */}
      <div className="space-y-1.5">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          type
        </Plain>
        <div className="space-y-1">
          <div className="text-xl leading-tight font-semibold tracking-tight">
            Display
          </div>
          <div className="text-sm leading-tight font-medium">Heading</div>
          <div className="text-xs leading-tight opacity-70">
            Body text goes here
          </div>
          <div className="text-[10px] tracking-widest uppercase opacity-50">
            Label
          </div>
        </div>
      </div>

      {/* Layout preview */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          layout
        </Plain>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="col-span-3 h-6 rounded border border-dashed border-white/20" />
          <div className="h-10 rounded bg-white/5" />
          <div className="h-10 rounded bg-white/5" />
          <div className="h-10 rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}
