import CoursesList from "@/components/CoursesList"
import { Directions } from "@/components/Directions"
import FAQ from "@/components/FAQ"
import LandingPage from "@/components/LandingPage"
import MembershipCard from "@/components/MembershipCard"
import SocialProofs from "@/components/SocialProofs"
import StopWondering from "@/components/StopWondering"

export const homePagePadding = "px-50"

const page = () => {
  return (
    <div className="space-y-52">
      <LandingPage />

      <SocialProofs />

      <Directions />

      <CoursesList />

      <MembershipCard />

      <FAQ />

      <StopWondering />
    </div>
  )
}

export default page
