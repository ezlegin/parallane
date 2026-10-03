import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowUpRight } from "lucide-react"
import { cn } from "cn"
import { homePagePadding } from "@/app/(HOME)/page"
import { Card } from "./ui/card"
import { mapCourseCategoryName } from "@/lib/map"
import { CourseCategory } from "@/prisma/generated/prisma/enums"

interface Course {
  title: string
  slug: string
  category: CourseCategory
  summary: string
}

const CoursesList = ({ courses }: { courses: Course[] }) => {
  return (
    <section>
      <div className={cn("space-y-16", homePagePadding)}>
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground" />
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                The Library
              </p>
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Learn the tools.
              <br />
              <span className="text-muted-foreground">Build the ideas.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {courses.length} courses
            </span>

            <Button variant="outline" className="rounded-full">
              Explore library
              <span className="ml-2">↗</span>
            </Button>
          </div>
        </div>

        {/* Courses */}
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-3">
            {courses.map((course, idx) => (
              <Card key={course.title} className="rounded-sm p-0">
                <Link
                  href={`/courses/${course.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="group relative flex flex-col items-center justify-between gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-muted/30"
                >
                  {/* Number */}
                  <span className="w-full font-mono text-xs text-muted-foreground transition-colors">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>

                  {/* Main */}
                  <div className="flex w-full flex-1 items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                        {course.title}
                      </h3>

                      <p className="text-sm text-muted-foreground transition-colors">
                        {course.summary}
                      </p>
                    </div>

                    <div className="hidden flex-col items-end gap-2 sm:flex">
                      <Button variant={"outline"} size={"icon"}>
                        <ArrowUpRight />
                      </Button>
                      <Badge
                        variant={"outline"}
                        className="bg-transparent text-muted-foreground"
                      >
                        {mapCourseCategoryName(course.category)}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>From fundamentals to production.</span>

            <span className="hidden sm:block">Learn → Build → Ship</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesList
