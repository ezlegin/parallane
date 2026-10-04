"use client"

import dynamic from "next/dynamic"
import { useState, useTransition } from "react"
import { Award, Loader2, Star } from "lucide-react"

import { submitReview } from "@/actions/review"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { handleRes } from "@/lib/handleRes"
import { cn } from "@/lib/utils"

const PdfDownload = dynamic(() => import("./pdf-download"), {
  ssr: false,
  loading: () => (
    <Button disabled className="h-11 w-full rounded-xl">
      <Loader2 className="mr-2 size-4 animate-spin" />
      Preparing PDF...
    </Button>
  ),
})

export type CertificateData = {
  serial: string
  issuedAt: Date
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseId: string
  enrollmentId: string
  courseTitle: string
  studentName: string
  existingCertificate?: CertificateData | null
  existingRating?: number | null
}

export function CertificateModal({
  open,
  onOpenChange,
  courseId,
  enrollmentId,
  courseTitle,
  studentName,
  existingCertificate = null,
  existingRating = null,
}: Props) {
  const [rating, setRating] = useState(existingRating ?? 0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isPending, startTransition] = useTransition()
  const [certificate, setCertificate] = useState<CertificateData | null>(
    existingCertificate
  )

  const onSubmitReview = () => {
    if (rating === 0) return

    startTransition(async () => {
      const res = await submitReview({
        courseId,
        enrollmentId,
        rating,
        comment: comment.trim() || undefined,
      })

      handleRes(res)

      if ("certificate" in res && res.certificate) {
        setCertificate(res.certificate)
      }
    })
  }

  const displayRating = hoverRating || rating
  const reviewed = !!certificate

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/8">
            <Award className="size-6 text-emerald-500" strokeWidth={1.75} />
          </div>

          <DialogTitle className="text-center">
            {reviewed
              ? "Your certificate is ready"
              : "Congratulations on finishing!"}
          </DialogTitle>

          <DialogDescription className="text-center">
            {reviewed
              ? "Download your certificate below."
              : "Before you download your certificate, please rate this course."}
          </DialogDescription>
        </DialogHeader>

        {!reviewed && (
          <div className="space-y-5 pt-2">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= displayRating
                  return (
                    <button
                      key={star}
                      type="button"
                      disabled={isPending}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="rounded-md p-1 transition-transform hover:scale-110"
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={cn(
                          "size-8 transition-colors",
                          isFilled
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-muted-foreground/30"
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                  )
                })}
              </div>

              <p className="h-4 text-xs text-muted-foreground">
                {displayRating > 0 &&
                  ["", "Poor", "Fair", "Good", "Great", "Excellent"][
                    displayRating
                  ]}
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="review-comment"
                className="text-xs font-medium text-muted-foreground"
              >
                Add a comment (optional)
              </label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you think of the course?"
                rows={3}
                maxLength={1000}
                disabled={isPending}
                className="resize-none"
              />
            </div>

            <p className="rounded-md border border-dashed bg-muted/30 px-3 py-2 text-center text-[11px] leading-5 text-muted-foreground">
              You can only submit one review for this course.
            </p>

            <Button
              onClick={onSubmitReview}
              disabled={rating === 0 || isPending}
              className="h-11 w-full rounded-xl"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit review"
              )}
            </Button>
          </div>
        )}

        {reviewed && certificate && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "size-5",
                    star <= (existingRating ?? rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Thanks for your feedback.
            </p>

            <PdfDownload
              studentName={studentName}
              courseTitle={courseTitle}
              serial={certificate.serial}
              issuedAt={new Date(certificate.issuedAt)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
