import { Award, BookOpen, Check, Shield } from "lucide-react"

import { Card } from "@/components/ui/card"

interface CourseCertificateProps {
  courseTitle: string
}

export default function CourseCertificate({
  courseTitle,
}: CourseCertificateProps) {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Ambient glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-200 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/4 blur-[140px]"
      />

      {/* Grid mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-border" />
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Certificate of completion
            </p>
            <span aria-hidden className="h-px w-8 bg-border" />
          </div>

          <h2 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-5xl">
            Finish the course.
            <br />
            <span className="text-muted-foreground">
              Earn something to show for it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Complete the course and earn a verified Parallane certificate
            recognizing the skills you've developed along the way.
          </p>
        </div>

        {/* Certificate */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          {/* Emerald glow under the card */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-b from-emerald-500/20 via-transparent to-transparent opacity-60 blur-2xl"
          />

          <Card className="relative overflow-hidden rounded-[2rem] border-border/60 p-2 shadow-2xl shadow-black/5">
            <div className="relative aspect-[1.55/1] overflow-hidden rounded-[1.5rem] border border-border bg-background">
              {/* Holographic sheen — a diagonal light streak */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-linear-to-br from-transparent via-white/6 to-transparent"
              />

              {/* Fine noise for texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Double border frame */}
              <div className="absolute inset-4 border border-border md:inset-8" />
              <div className="absolute inset-6 border border-dashed border-border/60 md:inset-10" />

              {/* Corner ornaments */}
              <CornerOrnament className="top-6 left-6 md:top-9 md:left-9" />
              <CornerOrnament className="top-6 right-6 rotate-90 md:top-9 md:right-9" />
              <CornerOrnament className="bottom-6 left-6 -rotate-90 md:bottom-9 md:left-9" />
              <CornerOrnament className="right-6 bottom-6 rotate-180 md:right-9 md:bottom-9" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                {/* Foil seal */}
                <FoilSeal />

                <p className="mt-6 text-[10px] font-medium tracking-[0.4em] text-muted-foreground uppercase">
                  Parallane
                </p>

                <h3 className="mt-5 font-serif text-3xl tracking-[-0.02em] md:text-5xl">
                  Certificate of Completion
                </h3>

                <p className="mt-6 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  Proudly presented to
                </p>

                {/* Name — with a growing underline */}
                <div className="group relative mt-4">
                  <p className="font-serif text-3xl italic md:text-4xl">
                    Your Name
                  </p>
                  <div
                    aria-hidden
                    className="mt-2 h-px w-full origin-center scale-x-75 bg-linear-to-r from-transparent via-border to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  for successfully completing
                </p>

                <p className="mt-2 text-lg font-medium tracking-tight md:text-xl">
                  {courseTitle}
                </p>

                {/* Verified stamp */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1">
                  <Shield className="size-3 text-emerald-500" strokeWidth={2} />
                  <span className="text-[10px] font-medium tracking-[0.15em] text-emerald-500 uppercase">
                    Verified
                  </span>
                </div>

                {/* Footer meta */}
                <div className="mt-8 flex items-center gap-8 text-[10px] tracking-[0.15em] text-muted-foreground uppercase md:gap-10">
                  <MetaColumn label="Issued By" value="Parallane" />
                  <span aria-hidden className="h-8 w-px bg-border" />
                  <MetaColumn label="Certificate ID" value="PL-000000" mono />
                  <span aria-hidden className="h-8 w-px bg-border" />
                  <MetaColumn label="Completed" value="January 2026" />
                </div>
              </div>
            </div>
          </Card>

          {/* Floating signature line — decorative */}
          <div className="pointer-events-none absolute right-8 bottom-8 hidden md:block">
            <div className="text-right">
              <p className="font-serif text-lg text-muted-foreground/60 italic">
                Parallane
              </p>
              <div className="mt-1 h-px w-24 bg-border" />
              <p className="mt-1 text-[9px] tracking-[0.15em] text-muted-foreground uppercase">
                Authorized
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3">
          <CertificateFeature
            icon={<Award className="size-5" strokeWidth={1.75} />}
            title="Recognized achievement"
            description="A certificate for completing your learning journey."
          />

          <CertificateFeature
            icon={<Check className="size-5" strokeWidth={1.75} />}
            title="Earn by completing"
            description="Complete the required lessons to receive your certificate."
          />

          <CertificateFeature
            icon={<BookOpen className="size-5" strokeWidth={1.75} />}
            title="Show what you learned"
            description="Add your achievement to your professional journey."
          />
        </div>
      </div>
    </section>
  )
}

// ---------- Sub-components ----------

function CornerOrnament({ className }: { className: string }) {
  return (
    <div aria-hidden className={`absolute ${className} size-4 md:size-5`}>
      <div className="absolute inset-0 border-t border-l border-foreground/40" />
      <div className="absolute top-1.5 left-1.5 size-1 rounded-full bg-foreground/40" />
    </div>
  )
}

function FoilSeal() {
  return (
    <div className="relative">
      {/* Outer ring */}
      <div className="flex size-16 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/6 shadow-[0_0_30px_-8px] shadow-emerald-500/40 md:size-20">
        {/* Inner ring */}
        <div className="flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-background md:size-16">
          <Award
            className="size-5 text-emerald-500 md:size-6"
            strokeWidth={1.75}
          />
        </div>
      </div>

      {/* Radiating dashes — sunburst effect */}
      <div
        aria-hidden
        className="absolute inset-0 -m-2 animate-[spin_30s_linear_infinite] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(160 84% 39% / 0.15) 5deg, transparent 10deg, transparent 45deg, hsl(160 84% 39% / 0.15) 50deg, transparent 55deg, transparent 90deg, hsl(160 84% 39% / 0.15) 95deg, transparent 100deg, transparent 135deg, hsl(160 84% 39% / 0.15) 140deg, transparent 145deg, transparent 180deg, hsl(160 84% 39% / 0.15) 185deg, transparent 190deg, transparent 225deg, hsl(160 84% 39% / 0.15) 230deg, transparent 235deg, transparent 270deg, hsl(160 84% 39% / 0.15) 275deg, transparent 280deg, transparent 315deg, hsl(160 84% 39% / 0.15) 320deg, transparent 325deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 60%, black 65%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 60%, black 65%, transparent 85%)",
        }}
      />
    </div>
  )
}

function MetaColumn({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <p className="text-foreground">{label}</p>
      <p className={`mt-1 ${mono ? "font-mono tabular-nums" : ""}`}>{value}</p>
    </div>
  )
}

function CertificateFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex size-11 items-center justify-center rounded-xl border bg-muted/40">
        {icon}
      </div>

      <p className="mt-4 text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
