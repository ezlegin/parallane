"use client"

import { Plus, Trash2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { Controller, useFieldArray } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CourseFormType } from "@/lib/formSchema"

type Props = {
  form: UseFormReturn<CourseFormType>
}

export function CourseAudience({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "audience",
  })

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Course audience</h2>

        <p className="text-sm text-muted-foreground">
          Describe who this course is intended for.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <Controller
              name={`audience.${index}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    label={`Audience ${index + 1}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash2 />
              <span className="sr-only">Remove audience</span>
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
        >
          <Plus />
          Add audience
        </Button>
      </div>
    </section>
  )
}
