"use client"

import type { UseFormReturn } from "react-hook-form"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import type { CourseFormValues } from "./course-form"

type Props = {
  form: UseFormReturn<CourseFormValues>
}

export function CourseMedia({ form }: Props) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Course media</h2>

        <p className="text-sm text-muted-foreground">
          Configure the course teaser and total duration.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="tizerUrl">Tizer URL</FieldLabel>

          <Input
            id="tizerUrl"
            placeholder="/tizer.mp4"
            {...form.register("tizerUrl")}
          />

          <FieldDescription>
            Video shown before a student enrolls in the course.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="duration">Duration</FieldLabel>

          <Input
            id="duration"
            type="number"
            min={0}
            placeholder="120"
            {...form.register("duration", {
              valueAsNumber: true,
            })}
          />

          <FieldDescription>Total course duration in minutes.</FieldDescription>
        </Field>
      </FieldGroup>
    </section>
  )
}
