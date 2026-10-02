"use client"

import { ArrowUpRight, Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useTransition } from "react"
import { createEnrollment } from "@/actions/enrollment"
import { Button } from "@/components/ui/button"
import { handleRes } from "@/lib/handleRes"
import { getActiveMembership } from "@/lib/user"
import { toast } from "../ui/toast"
import { useRouter } from "next/navigation"

const CourseEnrollButton = ({ courseId }: { courseId: string }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isPending, startTransition] = useTransition()

  if (status === "loading") {
    return (
      <Button
        size="lg"
        disabled
        className="h-14 w-full rounded-full px-8 text-sm font-semibold sm:w-auto"
      >
        Loading...
      </Button>
    )
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="w-full sm:w-auto">
        <Button
          size="lg"
          className="group h-14 w-full rounded-full bg-foreground px-8 text-sm font-semibold text-background shadow-2xl shadow-foreground/10 transition-all hover:scale-[1.03] sm:w-auto"
        >
          Start learning today
          <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </Link>
    )
  }

  const onEnroll = async () => {
    const userId = session.user?.id
    if (!userId) {
      toast.add({ title: "Not logged in. Please sign in again." })
      return
    }

    const activeMembership = await getActiveMembership(userId)
    if (!activeMembership) {
      document
        .getElementById("membership-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })

      return
    }

    startTransition(async () => {
      const res = await createEnrollment({
        courseId,
        enrolledAt: new Date(),
        userId,
      })

      handleRes(res, {
        onSuccess: () => router.push(`/classroom/${res.classroomId}`),
      })
    })
  }

  return (
    <Button
      size="lg"
      disabled={isPending}
      onClick={onEnroll}
      className="group h-14 w-full rounded-full px-8 text-sm font-semibold sm:w-auto"
    >
      <Plus className="mr-2 size-5" />
      {isPending ? "Enrolling..." : "Enroll to course"}
    </Button>
  )
}

export default CourseEnrollButton
