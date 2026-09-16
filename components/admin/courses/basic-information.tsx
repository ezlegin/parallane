"use client"

import type { UseFormReturn } from "react-hook-form"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import type { CourseFormValues } from "./course-form"

type Props = {
  form: UseFormReturn<CourseFormValues>
}

export function BasicInformation({ form }: Props) {
  return (
    <section className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>

          <Input
            id="title"
            placeholder="e.g. React"
            {...form.register("title")}
          />

          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>

          <Input id="slug" placeholder="react" {...form.register("slug")} />

          {form.formState.errors.slug && (
            <p className="text-sm text-destructive">
              {form.formState.errors.slug.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="summary">Summary</FieldLabel>

          <Input
            id="summary"
            placeholder="Learn how to build modern applications..."
            {...form.register("summary")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>

          <Textarea
            id="description"
            placeholder="Describe the course..."
            className="min-h-36 resize-y"
            {...form.register("description")}
          />
        </Field>
      </FieldGroup>
    </section>
  )
}
