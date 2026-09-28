"use client"

import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { searchCourse } from "@/lib/course"
import { cn } from "@/lib/utils"

type CourseOption = {
  id: string
  title: string
}

function CourseCombobox({
  value,
  onChange,
  initialCourse,
}: {
  value: string
  initialCourse?: CourseOption
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | null>(
    initialCourse ?? null
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setCourses([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)

      const result = await searchCourse(query)

      if (result.courses) {
        setCourses(result.courses)
      }

      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    if (!value) {
      setSelectedCourse(null)
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selectedCourse ? (
              <span className="truncate">{selectedCourse.title} </span>
            ) : (
              <span className="text-muted-foreground">
                Search course by title...
              </span>
            )}

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by title..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {query ? "No course found." : "Start typing to search."}
                </CommandEmpty>

                <CommandGroup>
                  {courses.map((course) => (
                    <CommandItem
                      key={course.id}
                      value={course.id}
                      onSelect={() => {
                        setSelectedCourse(course)
                        onChange(course.id)
                        setOpen(false)
                        setQuery("")
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          value === course.id ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <p className="truncate text-sm">{course.title}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CourseCombobox
