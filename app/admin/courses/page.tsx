"use client"

import Link from "next/link"
import { BookOpen, Clock3, MoreHorizontal, Users } from "lucide-react"

import { adminCourses } from "@/lib/admin-courses"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminCoursesPage() {
  const handleDelete = (courseId: string) => {
    // TODO: Delete course through API/database.
    console.log("Delete course:", courseId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Manage your course catalog.
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Courses
          </h1>
        </div>

        <Link href="/admin/courses/new">
          <Button>Add course</Button>
        </Link>
      </div>

      {/* Courses */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {adminCourses.map((course) => {
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
                    <DropdownMenuTrigger>
                      <div className="-mt-2 -mr-2">
                        <MoreHorizontal />
                        <span className="sr-only">Course actions</span>
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/admin/courses/${course.slug}`}>
                          Edit course
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {course.summary}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  <span>{course.students}</span>
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
    </div>
  )
}
