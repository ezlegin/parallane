"use client"

import { Controller, type UseFormReturn } from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { CourseCategory } from "@/prisma/generated/prisma/enums"
import { CourseFormType } from "@/lib/formSchema"

type Props = {
  form: UseFormReturn<CourseFormType>
}

export function CourseSettings({ form }: Props) {
  const categories: { value: CourseCategory; label: string }[] = [
    { value: "backEnd", label: "Back-End" },
    { value: "frontEnd", label: "Front-End" },
    { value: "webDesign", label: "Web-Design" },
  ]

  return (
    <section className="space-y-5">
      <FieldGroup>
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Category</FieldLabel>
              <FieldDescription>
                Choose the category this course belongs to.
              </FieldDescription>

              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5"
              >
                {categories.map((c) => (
                  <Field
                    key={c.value}
                    orientation="horizontal"
                    className="rounded-lg border p-4"
                  >
                    <RadioGroupItem value={c.value} />
                    <FieldContent>
                      <FieldLabel>{c.label}</FieldLabel>
                    </FieldContent>
                  </Field>
                ))}
              </RadioGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Status</FieldLabel>
              <FieldDescription>
                Draft courses aren't visible to students.
              </FieldDescription>

              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid gap-3 sm:grid-cols-2"
              >
                <Field
                  orientation="horizontal"
                  className="rounded-lg border p-4"
                >
                  <RadioGroupItem value="published" />

                  <FieldContent>
                    <FieldLabel>Published</FieldLabel>
                    <FieldDescription>
                      Students can access this course.
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field
                  orientation="horizontal"
                  className="rounded-lg border p-4"
                >
                  <RadioGroupItem value="draft" />

                  <FieldContent>
                    <FieldLabel>Draft</FieldLabel>
                    <FieldDescription>
                      Only administrators can access it.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </RadioGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  )
}
