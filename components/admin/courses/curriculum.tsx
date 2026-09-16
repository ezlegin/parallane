"use client"

import { GripVertical, Plus, Trash2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { useFieldArray } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import type { CourseFormValues } from "./course-form"

type Props = {
  form: UseFormReturn<CourseFormValues>
}

export function Curriculum({ form }: Props) {
  const {
    fields: seasons,
    append: appendSeason,
    remove: removeSeason,
  } = useFieldArray({
    control: form.control,
    name: "seasons",
  })

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Curriculum</h2>

          <p className="text-sm text-muted-foreground">
            Organize the course into seasons and lessons.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendSeason({
              title: "",
              lessons: [],
            })
          }
        >
          <Plus />
          Add season
        </Button>
      </div>

      <div className="space-y-5">
        {seasons.map((season, seasonIndex) => (
          <SeasonField
            key={season.id}
            form={form}
            seasonIndex={seasonIndex}
            onRemove={() => removeSeason(seasonIndex)}
          />
        ))}

        {seasons.length === 0 && (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="text-sm font-medium">No seasons yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first season to start building the curriculum.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() =>
                appendSeason({
                  title: "",
                  lessons: [],
                })
              }
            >
              <Plus />
              Add season
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

type SeasonFieldProps = {
  form: UseFormReturn<CourseFormValues>
  seasonIndex: number
  onRemove: () => void
}

function SeasonField({ form, seasonIndex, onRemove }: SeasonFieldProps) {
  const {
    fields: lessons,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: form.control,
    name: `seasons.${seasonIndex}.lessons`,
  })

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Season header */}
      <div className="flex items-center gap-3 bg-muted/30 p-4">
        <GripVertical className="size-4 shrink-0 text-muted-foreground" />

        <div className="flex-1">
          <Input
            placeholder="Season title"
            className="border-0 bg-transparent px-0 font-semibold shadow-none focus-visible:ring-0"
            {...form.register(`seasons.${seasonIndex}.title`)}
          />
        </div>

        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 />
          <span className="sr-only">Remove season</span>
        </Button>
      </div>

      <Separator />

      {/* Lessons */}
      <div className="space-y-4 p-4">
        {lessons.map((lesson, lessonIndex) => (
          <LessonField
            key={lesson.id}
            form={form}
            seasonIndex={seasonIndex}
            lessonIndex={lessonIndex}
            onRemove={() => removeLesson(lessonIndex)}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendLesson({
              title: "",
              url: "",
              type: "video",
              isFree: false,
              duration: 0,
            })
          }
        >
          <Plus />
          Add lesson
        </Button>
      </div>
    </div>
  )
}

type LessonFieldProps = {
  form: UseFormReturn<CourseFormValues>
  seasonIndex: number
  lessonIndex: number
  onRemove: () => void
}

function LessonField({
  form,
  seasonIndex,
  lessonIndex,
  onRemove,
}: LessonFieldProps) {
  const baseName = `seasons.${seasonIndex}.lessons.${lessonIndex}` as const

  return (
    <div className="rounded-lg border p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="size-4 text-muted-foreground" />

          <span className="text-sm font-medium">Lesson {lessonIndex + 1}</span>
        </div>

        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 />
          <span className="sr-only">Remove lesson</span>
        </Button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] items-center gap-2">
          <Field className="w-full">
            <Input
              label="e.g. Introduction to React"
              {...form.register(`${baseName}.title`)}
            />
          </Field>

          <Field className="w-full">
            <Input label="url" {...form.register(`${baseName}.url`)} />
          </Field>

          <Field className="w-22">
            <Select
              value={form.watch(`${baseName}.type`)}
              onValueChange={(value) =>
                form.setValue(`${baseName}.type`, value as "video" | "doc", {
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="video">Video</SelectItem>

                <SelectItem value="doc">Document</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field className="w-22">
            <Input
              type="number"
              min={0}
              label="duration"
              {...form.register(`${baseName}.duration`, {
                valueAsNumber: true,
              })}
            />
          </Field>

          <Field orientation="horizontal">
            <Switch
              checked={form.watch(`${baseName}.isFree`)}
              onCheckedChange={(checked) =>
                form.setValue(`${baseName}.isFree`, checked, {
                  shouldDirty: true,
                })
              }
            />

            <FieldContent>
              <FieldLabel>Is Free?</FieldLabel>
            </FieldContent>
          </Field>
        </div>
      </div>
    </div>
  )
}
