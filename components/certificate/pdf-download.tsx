"use client"

import { usePDF } from "@react-pdf/renderer"
import { Download, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CertificatePDF } from "./certificate-pdf"

type Props = {
  studentName: string
  courseTitle: string
  serial: string
  issuedAt: Date
}

export default function PdfDownload({
  studentName,
  courseTitle,
  serial,
  issuedAt,
}: Props) {
  const [pdfInstance] = usePDF({
    document: (
      <CertificatePDF
        studentName={studentName}
        courseTitle={courseTitle}
        serial={serial}
        issuedAt={issuedAt}
      />
    ),
  })

  const onDownload = () => {
    if (!pdfInstance.url) return

    const link = document.createElement("a")
    link.href = pdfInstance.url
    link.download = `Parallane Certificate - ${courseTitle}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Button
      onClick={onDownload}
      disabled={pdfInstance.loading || !pdfInstance.url}
      className="h-11 w-full rounded-xl"
    >
      {pdfInstance.loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Preparing PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 size-4" />
          Download certificate
        </>
      )}
    </Button>
  )
}
