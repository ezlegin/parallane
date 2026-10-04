import CourseDescription from "@/components/course/course-description"
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
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

const getCourse = cache(async (slug: string) => {
  return await prisma.course.findFirst({
    where: { slug },
    include: {
      seasons: { include: { lessons: true } },
      reviews: { select: { rating: true } },
    },
  })
})

export default async function page({ params }: CoursePageProps) {
  const { slug } = await params

  const course = await getCourse(slug)

  if (!course) {
    notFound()
  }

  const lessonCount = course.seasons.reduce(
    (total, season) => total + season.lessons.length,
    0
  )

  const review = course.reviews.length
  const rating =
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) / review

  return (
    <main>
      <CourseHero
        coruseSlug={course.slug}
        courseId={course.id}
        category={course.category}
        title={course.title}
        summary={course.summary}
        rating={rating || 0}
        reviews={review + 57}
      />

      <CourseTrailer
        src={course.teaserUrl ?? ""}
        duration={course.duration.toString()}
        lessonCount={lessonCount}
        level="beginner"
      />

      <CourseDescription description={course.description} />

      <CourseOverview learn={course.learn} />

      <CourseAudience items={course.audience} />

      <CourseCurriculum
        seasons={course.seasons}
        duration={course.duration.toString()}
      />

      <CourseCertificate courseTitle={course.title} />

      <CourseMembership />

      <CourseFAQ />

      <FloatingPricingCard hideWhenSelector="#membership-section" />
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const course = await getCourse(slug)
  if (!course) return {}

  return {
    title: `${course.title}`,
    openGraph: {
      title: course.title,
      description: course.summary,
    },
  }
}
