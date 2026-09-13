import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "../ui/separator"

type ClassroomHeaderProps = {
  course: {
    title: string
  }
  progress: number
}

export function ClassroomHeader({ course, progress }: ClassroomHeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 md:px-6">
        <Link href="/panel/courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to courses</span>
          </Button>
        </Link>

        <Separator orientation="vertical" className={"my-auto h-6"} />

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden size-9 items-center justify-center rounded-lg border bg-muted sm:flex">
            <BookOpen className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{course.title}</p>

            <p className="text-xs text-muted-foreground">Your course</p>
          </div>
        </div>

        <div className="hidden w-60 items-center gap-3 sm:flex">
          <Progress value={progress} className="flex-1" />

          <span className="text-xs font-medium">{progress}%</span>
        </div>
      </div>
    </header>
  )
}
