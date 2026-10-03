import CourseAudience from "@/components/course/CourseAudience"
import CourseCertificate from "@/components/course/CourseCertificate"
import CourseFAQ from "@/components/course/CourseFAQ"
import CourseHero from "@/components/course/CourseHero"
import CourseMembership from "@/components/course/CourseMembership"
import CourseOverview from "@/components/course/CourseOverview"
import CourseTrailer from "@/components/course/CourseTrailer"
import CourseCurriculum from "@/components/course/Curriculum"
import { FloatingPricingCard } from "@/components/FloatingPriceCard"
import { prisma } from "@/prisma/prisma"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params

  const course = await prisma.course.findFirst({
    where: { slug },
    include: { seasons: { include: { lessons: true } } },
  })

  if (!course) {
    notFound()
  }

  const lessonCount = course.seasons.reduce(
    (total, season) => total + season.lessons.length,
    0
  )

  return (
    <main>
      <CourseHero
        coruseSlug={course.slug}
        courseId={course.id}
        category={course.category}
        title={course.title}
        summary={course.summary}
        rating={5}
        reviews={128}
      />

      <CourseTrailer
        duration={course.duration.toString()}
        lessonCount={lessonCount}
        level="beginner"
      />

      <CourseOverview description={course.description} learn={["test"]} />

      <CourseCurriculum
        seasons={course.seasons}
        duration={course.duration.toString()}
      />

      <CourseAudience items={course.audience} />

      <CourseCertificate courseTitle={course.title} />

      <CourseMembership />

      <CourseFAQ />

      <FloatingPricingCard hideWhenSelector="#membership-section" />
    </main>
  )
}
