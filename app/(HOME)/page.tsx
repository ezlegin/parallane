import CoursesList from "@/components/CoursesList"
import { Directions } from "@/components/Directions"
import FAQ from "@/components/FAQ"
import LandingPage from "@/components/LandingPage"
import MembershipCard from "@/components/MembershipCard"
import SocialProofs from "@/components/SocialProofs"
import StopWondering from "@/components/StopWondering"
import { prisma } from "@/prisma/prisma"

export const homePagePadding = "px-50"

const page = async () => {
  const courses = await prisma.course.findMany({
    where: { status: { not: "draft" } },
    select: { title: true, slug: true, category: true, summary: true },
  })

  return (
    <div className="space-y-52">
      <LandingPage />

      <SocialProofs />

      <Directions />

      <CoursesList courses={courses} />

      <MembershipCard />

      <FAQ />

      <StopWondering />
    </div>
  )
}

export default page
