import { notFound } from "next/navigation"

import { courses } from "@/lib/courses"

import CourseAudience from "@/components/course/CourseAudience"
import CourseCertificate from "@/components/course/CourseCertificate"
import CourseCurriculum from "@/components/course/CourseCurriculum"
import CourseFAQ from "@/components/course/CourseFAQ"
import CourseHero from "@/components/course/CourseHero"
import CourseMembership from "@/components/course/CourseMembership"
import CourseOverview from "@/components/course/CourseOverview"
import CourseTrailer from "@/components/course/CourseTrailer"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params

  const course = courses[slug]

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
        category={course.category}
        title={course.title}
        summary={course.summary}
        rating={course.rating}
        reviews={course.reviews}
      />

      <CourseTrailer
        duration={course.duration}
        lessonCount={lessonCount}
        level={course.level}
      />

      <CourseOverview description={course.description} learn={course.learn} />

      <CourseCurriculum seasons={course.seasons} duration={course.duration} />

      <CourseAudience items={course.targetAudience} />

      <CourseCertificate courseTitle={course.title} />

      <CourseMembership />

      <CourseFAQ />
    </main>
  )
}
