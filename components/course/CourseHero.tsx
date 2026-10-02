import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  Clock3,
  Play,
  Star,
} from "lucide-react"

import GlowingStroke from "@/components/GlowingStroke"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getSessionUser } from "@/lib/user"
import { CourseCategory } from "@/prisma/generated/prisma/enums"
import { prisma } from "@/prisma/prisma"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import CourseEnrollButton from "./CourseEnrollButton"

interface CourseHeroProps {
  category: CourseCategory
  title: string
  summary: string
  rating: number
  reviews: number
  students?: number
  duration: number
  lessonCount: number
  level: string
  trailerUrl?: string
  courseId: string
}

export default async function CourseHero({
  category,
  title,
  summary,
  rating,
  reviews,
  students,
  duration,
  lessonCount,
  level,
  courseId,
  trailerUrl,
}: CourseHeroProps) {
  const user = await getSessionUser()

  const isUserEnrolled = user
    ? await prisma.enrollment.findFirst({
        where: { courseId, userId: user.id },
        include: { classroom: true },
      })
    : undefined

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-50">
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur-[120px]"
      />

      {/* Bottom-right warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-125 w-175 translate-x-1/4 translate-y-1/4 rounded-full bg-foreground/10 blur-[100px]"
      />

      {/* Animated halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 h-70 w-70 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/10 blur-[80px]"
      />

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-365 px-6 py-28 md:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — Hero content */}
          <div className="text-center lg:text-left">
            {/* Category pill with live dot */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-40" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                <span className="text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase">
                  {mapCategoryName(category)}
                </span>
              </div>
            </div>

            {/* Title monument */}
            <div className="relative mt-6">
              {/* Ghost echo — desktop only */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 text-left text-[10rem] leading-[0.85] font-black text-white/3 select-none md:block lg:text-[12rem]"
              >
                {title}
              </span>

              <h1 className="relative text-[3rem] leading-[0.9] font-black tracking-[-0.06em] text-balance text-white md:text-[5rem] lg:text-[6rem]">
                {title}
              </h1>
            </div>

            {/* Decorative rule */}
            <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
              <div
                aria-hidden
                className="h-px w-12 bg-linear-to-r from-transparent to-white/20 md:w-16"
              />
              <span className="text-[10px] font-medium tracking-[0.3em] text-zinc-500 uppercase">
                the course
              </span>
              <div
                aria-hidden
                className="h-px w-12 bg-linear-to-r from-white/20 to-transparent md:w-16 lg:w-24 lg:from-white/20 lg:to-white/20"
              />
            </div>

            {/* Summary */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-balance text-zinc-400 md:text-lg md:leading-8 lg:mx-0">
              {summary}
            </p>

            {/* Rating capsule */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="size-3.5 fill-white text-white"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold tracking-tight text-white">
                  {rating}
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-xs text-zinc-400">{reviews} reviews</span>
                {students !== undefined && (
                  <>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="text-xs text-zinc-400">
                      {students.toLocaleString()} enrolled
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              {isUserEnrolled ? (
                <Link
                  href={`/classroom/${isUserEnrolled.classroom?.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="group h-14 w-full rounded-full border-green-500/80 bg-green-500/10 px-8 text-sm font-semibold text-green-400 shadow-2xl shadow-foreground/10 hover:bg-green-500/20 sm:w-auto"
                  >
                    Enrolled, Continue Learning...
                    <ArrowUpRight className="ml-2 size-4 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <SessionProvider>
                  <CourseEnrollButton courseId={courseId} />
                </SessionProvider>
              )}

              <a href="#curriculum" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="group h-14 w-full rounded-full px-8 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white sm:w-auto"
                >
                  See curriculum
                  <ArrowDown className="ml-2 size-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
              </a>
            </div>

            {/* Whisper */}
            <p className="mt-6 text-center text-[11px] tracking-wide text-zinc-600 lg:text-left">
              No commitment · Cancel anytime
            </p>
          </div>

          {/* RIGHT — Trailer + meta (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Video */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 shadow-2xl">
              <video
                className="aspect-video w-full object-cover"
                controls
                src={"https://dl.igraphical.ir/Courses/Illustrator/tizer.mp4"}
              />

              {/* Play badge overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-zinc-950/70 backdrop-blur-md">
                  <Play className="ml-1 size-5 fill-white text-white" />
                </div>
              </div>
            </div>

            {/* Meta grid */}
            <Card className="relative mt-5 grid grid-cols-2 divide-x divide-white/10 overflow-hidden border-white/10 bg-zinc-900/50 py-5 backdrop-blur-sm sm:grid-cols-4">
              <GlowingStroke />

              <MetaItem
                icon={<Clock3 className="size-4" />}
                value={duration.toString()}
                label="Duration"
              />

              <MetaItem
                icon={<Play className="size-4" />}
                value={`${lessonCount}`}
                label="Lessons"
              />

              <MetaItem
                icon={<BookOpen className="size-4" />}
                value={level}
                label="Level"
                className="border-t border-white/10 sm:border-t-0"
              />

              <MetaItem
                icon={<Award className="size-4" />}
                value="Included"
                label="Certificate"
                className="border-t border-white/10 sm:border-t-0"
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background"
      />
    </section>
  )
}

interface MetaItemProps {
  icon: React.ReactNode
  value: string
  label: string
  className?: string
}

function MetaItem({ icon, value, label, className }: MetaItemProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className ?? ""}`}
    >
      <div className="flex items-center gap-1">
        <div className="flex justify-center text-zinc-400">{icon}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
      <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
  )
}

function mapCategoryName(category: CourseCategory) {
  switch (category) {
    case "backEnd":
      return "Back-End"
    case "frontEnd":
      return "Front-End"
    case "webDesign":
      return "Web-Design"
  }
}
