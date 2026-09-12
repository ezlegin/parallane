import { Award, BookOpen, Clock3, Play } from "lucide-react"

import { Card } from "@/components/ui/card"
import GlowingStroke from "@/components/GlowingStroke"

interface CourseTrailerProps {
  duration: string
  lessonCount: number
  level: string
}

export default function CourseTrailer({
  duration,
  lessonCount,
  level,
}: CourseTrailerProps) {
  return (
    <section className="border-b py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border bg-muted/30 shadow-2xl">
          <video
            className="aspect-video w-full object-cover"
            controls
            poster="/course-placeholder.jpg"
          >
            <source src="/tizer.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full border bg-background/80 backdrop-blur-md">
              <Play className="ml-1 size-5 fill-current" />
            </div>
          </div>
        </div>

        <Card className="relative mx-auto mt-8 grid max-w-4xl grid-cols-2 divide-x py-5 sm:grid-cols-4">
          <GlowingStroke />

          <MetaItem
            icon={<Clock3 className="size-4" />}
            value={duration}
            label="Total duration"
          />

          <MetaItem
            icon={<Play className="size-4" />}
            value={`${lessonCount} lessons`}
            label="Course content"
          />

          <MetaItem
            icon={<BookOpen className="size-4" />}
            value={level}
            label="Difficulty"
            className="border-t sm:border-t-0"
          />

          <MetaItem
            icon={<Award className="size-4" />}
            value="Certificate"
            label="Included"
            className="border-t sm:border-t-0"
          />
        </Card>
      </div>
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
    <div className={`text-center ${className ?? ""}`}>
      <div className="flex justify-center text-muted-foreground">{icon}</div>

      <p className="mt-2 text-sm font-medium">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
