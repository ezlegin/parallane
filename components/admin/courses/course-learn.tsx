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

export function Courselearn({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "learn",
  })

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Course Learn</h2>

        <p className="text-sm text-muted-foreground">
          Describe what a student learns at this course.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <Controller
              name={`learn.${index}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    label={`learn ${index + 1}`}
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
              <span className="sr-only">Remove learn</span>
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
          Add learn
        </Button>
      </div>
    </section>
  )
}
