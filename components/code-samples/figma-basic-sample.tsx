import { Kw, Plain, Punct, Str } from "./tokens"

export function FigmaBasicSample() {
  return (
    <div className="space-y-5">
      {/* File header */}
      <div className="flex items-baseline gap-2">
        <Plain>bitsup</Plain>
        <Punct>{"."}</Punct>
        <Kw>fig</Kw>
      </div>

      {/* Frame */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          frame
        </Plain>
        <div className="rounded-lg border border-dashed border-white/20 p-2">
          <div className="flex items-center gap-1.5 text-[10px] text-white/50">
            <span className="size-1.5 rounded-full bg-white/30" />
            Hero / Desktop
          </div>

          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-2/3 rounded-sm bg-white/15" />
            <div className="h-1.5 w-1/2 rounded-sm bg-white/10" />
            <div className="mt-2 flex gap-1.5">
              <div className="h-4 w-14 rounded bg-white/20" />
              <div className="h-4 w-14 rounded border border-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Layers */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          layers
        </Plain>
        <div className="space-y-0.5 font-mono text-[10px]">
          {[
            { name: "Hero", depth: 0 },
            { name: "Nav", depth: 1 },
            { name: "Headline", depth: 1 },
            { name: "Button / Primary", depth: 1 },
            { name: "Button / Ghost", depth: 1 },
          ].map((layer) => (
            <div
              key={layer.name}
              className="flex items-center gap-1.5 py-0.5 text-white/50"
              style={{ paddingLeft: layer.depth * 10 }}
            >
              <span className="size-1 rounded-sm bg-white/30" />
              {layer.name}
            </div>
          ))}
        </div>
      </div>

      {/* Component */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          component
        </Plain>
        <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 p-2">
          <span className="text-primary">◆</span>
          <div className="flex-1">
            <div className="text-[11px] font-medium text-white">Button</div>
            <div className="text-[9px] text-white/40">
              Variants: primary · ghost · ghost
            </div>
          </div>
        </div>
      </div>

      {/* Handoff */}
      <div className="space-y-2">
        <Plain className="text-[10px] tracking-widest uppercase opacity-60">
          handoff
        </Plain>
        <div className="flex gap-2 text-[10px]">
          <div className="flex-1 rounded border border-white/10 p-1.5">
            <Str>W</Str> 1440
          </div>
          <div className="flex-1 rounded border border-white/10 p-1.5">
            <Str>H</Str> 900
          </div>
          <div className="flex-1 rounded border border-white/10 p-1.5">
            <Str>R</Str> 12
          </div>
        </div>
      </div>
    </div>
  )
}
