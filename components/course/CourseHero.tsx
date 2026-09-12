import { ArrowDown, ArrowUpRight, Star } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CourseHeroProps {
  category: string
  title: string
  summary: string
  rating: number
  reviews: number
}

export default function CourseHero({
  category,
  title,
  summary,
  rating,
  reviews,
}: CourseHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-full p-2.5">
              {category}
            </Badge>

            <div>
              <h1 className="text-6xl font-semibold tracking-[-0.07em] md:text-8xl lg:text-9xl">
                {title}
              </h1>

              <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="size-4 fill-foreground" />
              ))}
            </div>

            <span className="font-medium">{rating}</span>

            <span className="text-sm text-muted-foreground">
              ({reviews} reviews)
            </span>
          </div>

          <div className="flex justify-center gap-3">
            <Link href="/pricing">
              <Button size="lg" className="h-12 px-7">
                Join Parallane
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>

            <Link href="#curriculum">
              <Button size="lg" variant="outline" className="h-12 px-7">
                See Curriculum
                <ArrowDown className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
