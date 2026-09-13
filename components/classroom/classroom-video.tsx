"use client"

import { useRef } from "react"

type ClassroomVideoProps = {
  lesson: {
    title: string
    video?: string
  }
}

export function ClassroomVideo({ lesson }: ClassroomVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="bg-black">
      <div className="mx-auto aspect-video max-h-[75vh] w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          controls
          controlsList="nodownload"
          preload="metadata"
          src={lesson.video}
        >
          Your browser does not support video playback.
        </video>
      </div>
    </section>
  )
}
