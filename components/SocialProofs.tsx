"use client"

import { GraduationCap, Send, Star, Users, Video } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import GlowingStroke from "./GlowingStroke"

const stats = [
  {
    title: "Active Users",
    subtitle: "Per Month",
    value: "6K",
    suffix: "+",
    label: "Users",
    icon: Users,
  },
  {
    title: "Rating",
    subtitle: "Student",
    value: "4.9",
    suffix: "/5",
    label: "",
    icon: Star,
    stars: true,
  },
  {
    title: "Courses Watched",
    subtitle: "Per Month",
    value: "200K",
    suffix: "+",
    label: "Hours",
    icon: Video,
    stars: false,
  },
  {
    title: "Social Media",
    subtitle: "Users",
    value: "+10K",
    suffix: "",
    label: "Users",
    icon: Send,
    stars: false,
  },
  {
    title: "Graduated",
    subtitle: "Since 2022",
    value: "+3K",
    suffix: "",
    label: "Students",
    icon: GraduationCap,
    stars: false,
  },
]

export default function SocialProofs() {
  return (
    <section className="relative">
      <div className="absolute top-0 right-1/2 -z-10 size-45 translate-x-1/2 -translate-y-20 scale-x-400 bg-foreground opacity-25 blur-3xl" />

      <div className="relative z-20 flex flex-col items-center justify-center gap-12 bg-[#101010] py-20">
        <GlowingStroke className="via-foreground/25" />
        <GlowingStroke side="bottom" />

        <div className="flex flex-col items-center gap-3 text-center">
          <Badge variant="outline" className="p-3">
            Trusted by designers & developers
          </Badge>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Built for people who want to build.
          </h2>

          <p className="max-w-2xl text-muted-foreground">
            Learn practical skills, follow clear roadmaps, and build real-world
            applications with confidence.
          </p>
        </div>

        <div className="w-full px-6">
          <div className="mx-auto grid max-w-287 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon

              return (
                <Card
                  key={idx}
                  className={`group relative flex min-h-75 flex-col items-center gap-0 overflow-hidden transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {/* Subtle top highlight */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-foreground/15 to-transparent" />

                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border`}
                  >
                    <Icon
                      size={21}
                      strokeWidth={2}
                      fill={stat.title === "YouTube" ? "currentColor" : "none"}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                    {stat.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 text-[12px] font-medium text-foreground/40">
                    {stat.subtitle}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-foreground/15 to-transparent" />

                  {/* Main number */}
                  <div className="en-digits flex items-baseline justify-center">
                    <span className="text-4xl leading-none font-semibold tracking-[-0.055em] text-foreground">
                      {stat.value}
                    </span>

                    <span
                      className={`ml-1 text-[17px] font-semibold opacity-70`}
                    >
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Bottom content */}
                  {stat.stars ? (
                    <div className="mt-4 flex items-center gap-0.75">
                      {[1, 2, 3, 4, 5].map((_, idx) => (
                        <Star
                          key={idx}
                          size={17}
                          strokeWidth={1.5}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-[11px] font-bold tracking-[0.08em] text-foreground/35">
                      {stat.label}
                    </p>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
