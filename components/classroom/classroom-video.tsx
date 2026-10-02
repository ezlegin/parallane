"use client"

import { Lesson } from "@/prisma/generated/prisma/client"
import { useRef } from "react"

export function ClassroomVideo({ lesson }: { lesson: Lesson }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="bg-background">
      <div className="mx-auto aspect-video max-h-[75vh] w-full">
        <video
          ref={videoRef}
          className="h-full w-full rounded-sm object-contain"
          controls
          controlsList="nodownload"
          preload="metadata"
          src={lesson.url}
        >
          Your browser does not support video playback.
        </video>
      </div>
    </section>
  )
}
