"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import CourseCombobox from "@/components/CourseCombobox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import UserCombobox from "@/components/UserCombobox"
import { EnrollmentFormType, enrollmentFormSchema } from "@/lib/formSchema"
import { Course, Enrollment, User } from "@/prisma/generated/prisma/client"
import { cn } from "cn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { createEnrollment, updateEnrollment } from "@/actions/enrollment"
import { handleRes } from "@/lib/handleRes"
import { useRouter } from "next/navigation"

type EnrollmentFormProps = {
  enrollment?: Enrollment & { course: Course; user: User }
}

export function EnrollmentForm({ enrollment }: EnrollmentFormProps) {
  const router = useRouter()
  const form = useForm<EnrollmentFormType>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      courseId: enrollment?.course.id ?? "",
      enrolledAt: enrollment?.enrolledAt ?? new Date(),
      userId: enrollment?.userId ?? "",
    },
  })

  const onSubmit = async (data: EnrollmentFormType) => {
    const res = await (enrollment
      ? updateEnrollment(enrollment.id, data)
      : createEnrollment(data))

    handleRes(res, {
      onSuccess: () => !enrollment && router.push("/admin/enrollments"),
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>User</FieldLabel>
                <UserCombobox
                  initialUser={enrollment?.user}
                  value={form.watch("userId")}
                  onChange={(value) => {
                    form.setValue("userId", value)
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
                  initialCourse={enrollment?.course}
                  value={form.watch("courseId")}
                  onChange={(value) => {
                    form.setValue("courseId", value)
                  }}
                />

                {form.formState.errors.courseId && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.courseId.message}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Controller
              name="enrolledAt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enrolled At</FieldLabel>

                  <Popover modal={true}>
                    <PopoverTrigger
                      className={"h-12"}
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      }
                    />

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save enrollment</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
