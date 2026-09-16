"use client"

import { Plus, Trash2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { useFieldArray } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import type { CourseFormValues } from "./course-form"

type Props = {
  form: UseFormReturn<CourseFormValues>
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
            <Field className="flex-1">
              <FieldLabel>Audience {index + 1}</FieldLabel>

              <Input
                placeholder="e.g. Frontend developers"
                {...form.register(`audience.${index}.value`)}
              />
            </Field>

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
