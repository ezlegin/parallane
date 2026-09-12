import { Award, BookOpen, Check } from "lucide-react"

import { Card } from "@/components/ui/card"

interface CourseCertificateProps {
  courseTitle: string
}

export default function CourseCertificate({
  courseTitle,
}: CourseCertificateProps) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Certificate of completion
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Finish the course.
            <br />
            <span className="text-muted-foreground">
              Earn something to show for it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Complete the course and earn a verified Parallane certificate
            recognizing the skills you've developed along the way.
          </p>
        </div>

        <Card className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] p-2 shadow-2xl">
          <div className="relative aspect-[1.55/1] overflow-hidden rounded-[1.5rem] border bg-background">
            <div className="absolute inset-4 border md:inset-8" />
            <div className="absolute inset-6 border border-dashed md:inset-10" />

            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full border">
                <Award className="size-6" />
              </div>

              <p className="mt-6 text-[10px] font-medium tracking-[0.35em] text-muted-foreground uppercase">
                Parallane
              </p>

              <h3 className="mt-5 font-serif text-3xl tracking-tight md:text-5xl">
                Certificate of Completion
              </h3>

              <p className="mt-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                This certificate is proudly presented to
              </p>

              <p className="mt-4 font-serif text-2xl italic md:text-4xl">
                Your Name
              </p>

              <div className="my-6 h-px w-32 bg-border" />

              <p className="text-sm text-muted-foreground">
                for successfully completing
              </p>

              <p className="mt-2 text-lg font-medium md:text-xl">
                {courseTitle}
              </p>

              <div className="mt-8 flex items-center gap-8 text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                <div>
                  <p className="text-foreground">Parallane</p>
                  <p className="mt-1">Online Education</p>
                </div>

                <div className="h-8 w-px bg-border" />

                <div>
                  <p className="text-foreground">Certificate ID</p>
                  <p className="mt-1">PL-000000</p>
                </div>

                <div className="h-8 w-px bg-border" />

                <div>
                  <p className="text-foreground">Completed</p>
                  <p className="mt-1">January 2026</p>
                </div>
              </div>
            </div>

            <CertificateCorner className="top-8 left-8" />
            <CertificateCorner className="top-8 right-8 rotate-90" />
            <CertificateCorner className="bottom-8 left-8 -rotate-90" />
            <CertificateCorner className="right-8 bottom-8 rotate-180" />
          </div>
        </Card>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 text-center sm:grid-cols-3">
          <CertificateFeature
            icon={<Award className="mx-auto size-5" />}
            title="Recognized achievement"
            description="A certificate for completing your learning journey."
          />

          <CertificateFeature
            icon={<Check className="mx-auto size-5" />}
            title="Earn by completing"
            description="Complete the required lessons to receive your certificate."
          />

          <CertificateFeature
            icon={<BookOpen className="mx-auto size-5" />}
            title="Show what you learned"
            description="Add your achievement to your professional journey."
          />
        </div>
      </div>
    </section>
  )
}

function CertificateCorner({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="size-3 border-t border-l" />
    </div>
  )
}

function CertificateFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div>
      {icon}

      <p className="mt-3 text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
