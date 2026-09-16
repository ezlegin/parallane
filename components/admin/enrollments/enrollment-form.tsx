"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

const enrollmentSchema = z.object({
  userId: z.string().min(1, "User is required"),
  courseId: z.string().min(1, "Course is required"),
  enrolledAt: z.string().min(1, "Enrollment date is required"),
})

export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>

type UserOption = {
  id: string
  name: string
  email: string
}

type CourseOption = {
  id: string
  title: string
  slug: string
}

type EnrollmentFormProps = {
  defaultValues: EnrollmentFormValues
  users: UserOption[]
  courses: CourseOption[]
  onSubmit?: (values: EnrollmentFormValues) => void
}

export function EnrollmentForm({
  defaultValues,
  users,
  courses,
  onSubmit,
}: EnrollmentFormProps) {
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        onSubmit?.(values)
      })}
    >
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel>User</FieldLabel>

              <UserCombobox
                value={form.watch("userId")}
                users={users}
                onChange={(value) => {
                  form.setValue("userId", value, {
                    shouldValidate: true,
                  })
                }}
              />

              {form.formState.errors.userId && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.userId.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Course</FieldLabel>

              <CourseCombobox
                value={form.watch("courseId")}
                courses={courses}
                onChange={(value) => {
                  form.setValue("courseId", value, {
                    shouldValidate: true,
                  })
                }}
              />

              {form.formState.errors.courseId && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.courseId.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="enrolledAt">Enrollment date</FieldLabel>

              <Input
                id="enrolledAt"
                type="date"
                {...form.register("enrolledAt")}
              />

              {form.formState.errors.enrolledAt && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.enrolledAt.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save enrollment</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function UserCombobox({
  value,
  users,
  onChange,
}: {
  value: string
  users: UserOption[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const selectedUser = users.find((user) => user.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedUser ? (
            <span className="truncate">{selectedUser.email}</span>
          ) : (
            <span className="text-muted-foreground">
              Search user by email...
            </span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search email..." />

          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>

            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={`${user.email} ${user.name}`}
                  onSelect={() => {
                    onChange(user.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm">{user.email}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.name}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CourseCombobox({
  value,
  courses,
  onChange,
}: {
  value: string
  courses: CourseOption[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const selectedCourse = courses.find((course) => course.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedCourse ? (
            <span className="truncate">{selectedCourse.title}</span>
          ) : (
            <span className="text-muted-foreground">Search course...</span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search course..." />

          <CommandList>
            <CommandEmpty>No courses found.</CommandEmpty>

            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.id}
                  value={`${course.title} ${course.slug}`}
                  onSelect={() => {
                    onChange(course.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === course.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm">{course.title}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      /{course.slug}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
