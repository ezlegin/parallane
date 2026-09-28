"use client"

import { BookOpen, Clock3, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { deleteCourse } from "@/actions/course"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handleRes } from "@/lib/handleRes"
import { Course, Lesson, Season } from "@/prisma/generated/prisma/client"

interface CourseType extends Course {
  seasons: (Season & { lessons: Lesson[] })[]
  enrollments: { id: string }[]
}

const CoursesList = ({ courses }: { courses: CourseType[] }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => {
        const lessonCount = course.seasons.reduce(
          (total, season) => total + season.lessons.length,
          0
        )

        return (
          <Card key={course.id} className="group relative flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Badge
                    variant={
                      course.status === "published" ? "success" : "outline"
                    }
                  >
                    {course.status}
                  </Badge>

                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant={"ghost"}>
                        <MoreHorizontal />
                        <span className="sr-only">Course actions</span>
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <Link href={`/admin/courses/${course.slug}`}>
                      <DropdownMenuItem>Edit course</DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={async () =>
                        handleRes(await deleteCourse(course.id))
                      }
                    >
                      Delete course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="line-clamp-2 truncate text-sm leading-6 text-muted-foreground">
                {course.summary}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4" />
                <span>{course.enrollments.length}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                <span>{course.duration}m</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="size-4" />
                <span>{lessonCount}</span>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default CoursesList
