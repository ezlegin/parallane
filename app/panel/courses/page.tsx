import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    title: "HTML",
    description: "Build a solid foundation for the web.",
    progress: 100,
    status: "Completed",
  },
  {
    title: "CSS",
    description: "Learn modern CSS and responsive layouts.",
    progress: 86,
    status: "In progress",
  },
  {
    title: "JavaScript",
    description: "Learn the language that powers the web.",
    progress: 64,
    status: "In progress",
  },
  {
    title: "React",
    description: "Build modern interactive applications.",
    progress: 42,
    status: "In progress",
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Learning</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          My Courses
        </h1>

        <p className="mt-2 text-muted-foreground">
          Courses included in your membership.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-lg border bg-muted">
                  <BookOpen className="size-5" />
                </div>

                <Badge variant="outline">{course.status}</Badge>
              </div>

              <h2 className="mt-5 font-semibold">{course.title}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>

                  <span>{course.progress}%</span>
                </div>

                <Progress value={course.progress} />
              </div>

              <Link href={`/classroom/${course.title.toLowerCase()}`}>
                <Button className="mt-6 w-full">
                  {course.progress === 100
                    ? "Review course"
                    : "Continue course"}

                  <ArrowRight />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
