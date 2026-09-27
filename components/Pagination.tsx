"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  pageSize: number
  totalItems: number
}

const Pagination = ({ pageSize, totalItems }: Props) => {
  const pageCount = Math.ceil(totalItems / pageSize)

  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1")

  const changePage = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("page", page.toString())

    router.push(`?${params.toString()}`)
  }

  if (pageCount < 2) return null

  return (
    <div className="flex items-center text-sm">
      <Button
        className={"size-8"}
        variant={currentPage === 1 ? "ghost" : "outline"}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      <span className="mx-2 text-gray-500">
        Page {currentPage} / {pageCount}
      </span>

      <Button
        className={"size-8"}
        variant={currentPage === pageCount ? "ghost" : "outline"}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Pagination
