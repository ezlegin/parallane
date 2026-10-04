"use client"

import { Award } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CertificateData, CertificateModal } from "./certificate-modal"

type Props = {
  courseId: string
  courseTitle: string
  studentName: string
  existingRating?: number | null
  enrollmentId: string
  existingCertificate?: CertificateData | null
}

export function DownloadCertificateButton({
  courseId,
  courseTitle,
  studentName,
  existingCertificate,
  existingRating,
  enrollmentId,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="mt-6 w-full border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
        variant="outline"
      >
        <Award className="mr-2 size-4" />
        Download certificate
      </Button>

      <CertificateModal
        open={open}
        onOpenChange={setOpen}
        courseId={courseId}
        courseTitle={courseTitle}
        studentName={studentName}
        existingRating={existingRating ?? null}
        enrollmentId={enrollmentId}
        existingCertificate={existingCertificate}
      />
    </>
  )
}
