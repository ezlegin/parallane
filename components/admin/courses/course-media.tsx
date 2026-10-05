"use client"

import { Controller, type UseFormReturn } from "react-hook-form"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CourseFormType } from "@/lib/formSchema"

type Props = {
  form: UseFormReturn<CourseFormType>
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
        <Controller
          name="tizerUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tizer URL</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="https://..."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="duration"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Duration</FieldLabel>

              <Input
                {...field}
                id="duration"
                type="number"
                step={1}
                min={0}
                placeholder="120"
                readOnly
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  )
}
