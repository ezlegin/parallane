import CoursesList from "@/components/CoursesList"
import { prisma } from "@/prisma/prisma"

const page = async () => {
  const courses = await prisma.course.findMany({
    where: { status: { not: "draft" } },
    select: { title: true, slug: true, category: true, summary: true },
  })

  return (
    <div>
      <CoursesList courses={courses} />
    </div>
  )
}

export default page
