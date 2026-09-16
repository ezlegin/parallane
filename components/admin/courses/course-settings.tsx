"use client"

import type { UseFormReturn } from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import type { CourseFormValues } from "./course-form"

type Props = {
  form: UseFormReturn<CourseFormValues>
}

export function CourseSettings({ form }: Props) {
  return (
    <section className="space-y-5">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Category</FieldLegend>

          <FieldDescription>
            Choose the category this course belongs to.
          </FieldDescription>

          <RadioGroup
            value={form.watch("category")}
            onValueChange={(value) =>
              form.setValue("category", value as CourseFormValues["category"], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            <Field orientation="horizontal" className="rounded-lg border p-4">
              <RadioGroupItem value="development" />

              <FieldContent>
                <FieldLabel>Development</FieldLabel>
              </FieldContent>
            </Field>

            <Field orientation="horizontal" className="rounded-lg border p-4">
              <RadioGroupItem value="design" />

              <FieldContent>
                <FieldLabel>Design</FieldLabel>
              </FieldContent>
            </Field>

            <Field orientation="horizontal" className="rounded-lg border p-4">
              <RadioGroupItem value="ai" />

              <FieldContent>
                <FieldLabel>AI</FieldLabel>
              </FieldContent>
            </Field>
          </RadioGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Status</FieldLegend>

          <FieldDescription>
            Draft courses aren't visible to students.
          </FieldDescription>

          <RadioGroup
            value={form.watch("status")}
            onValueChange={(value) =>
              form.setValue("status", value as CourseFormValues["status"], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            className="grid gap-3 sm:grid-cols-2"
          >
            <Field orientation="horizontal" className="rounded-lg border p-4">
              <RadioGroupItem value="published" />

              <FieldContent>
                <FieldLabel>Published</FieldLabel>
                <FieldDescription>
                  Students can access this course.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal" className="rounded-lg border p-4">
              <RadioGroupItem value="draft" />

              <FieldContent>
                <FieldLabel>Draft</FieldLabel>
                <FieldDescription>
                  Only administrators can access it.
                </FieldDescription>
              </FieldContent>
            </Field>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </section>
  )
}
