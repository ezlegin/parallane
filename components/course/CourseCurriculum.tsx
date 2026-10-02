"use client"

import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { Controller, useFieldArray } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
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
import { cn } from "@/lib/utils"

import { CourseFormType } from "@/lib/formSchema"

type Props = {
  form: UseFormReturn<CourseFormType>
}

export function Curriculum({ form }: Props) {
  const {
    fields: seasons,
    append,
    remove,
    move,
  } = useFieldArray({
    control: form.control,
    name: "seasons",
  })

  const moveSeason = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= seasons.length) return
    move(index, target)
  }

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Curriculum</h2>
          <p className="text-sm text-muted-foreground">
            Organize the course into seasons and lessons. Reorder with the
            arrows — the top item comes first.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ title: "", lessons: [] })}
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
            isFirst={seasonIndex === 0}
            isLast={seasonIndex === seasons.length - 1}
            onMoveUp={() => moveSeason(seasonIndex, -1)}
            onMoveDown={() => moveSeason(seasonIndex, 1)}
            onRemove={() => remove(seasonIndex)}
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
              onClick={() => append({ title: "", lessons: [] })}
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

// ---------- Season field ----------

type SeasonFieldProps = {
  form: UseFormReturn<CourseFormType>
  seasonIndex: number
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

function SeasonField({
  form,
  seasonIndex,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: SeasonFieldProps) {
  const {
    fields: lessons,
    append,
    remove,
    move,
  } = useFieldArray({
    control: form.control,
    name: `seasons.${seasonIndex}.lessons`,
  })

  const moveLesson = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= lessons.length) return
    move(index, target)
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="flex items-center gap-3 bg-muted/30 p-4">
        <GripVertical className="size-4 shrink-0 text-muted-foreground/50" />

        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-xs font-semibold tabular-nums">
          {seasonIndex + 1}
        </div>

        <Controller
          name={`seasons.${seasonIndex}.title`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                label={`Season ${seasonIndex + 1}`}
                className="w-full min-w-0 flex-1 rounded-none border-x-0 border-t-0 bg-transparent focus-visible:ring-0"
              />
            </Field>
          )}
        />

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={isFirst}
            onClick={onMoveUp}
          >
            <ChevronUp />
            <span className="sr-only">Move season up</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={isLast}
            onClick={onMoveDown}
          >
            <ChevronDown />
            <span className="sr-only">Move season down</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onRemove}
          >
            <Trash2 />
            <span className="sr-only">Remove season</span>
          </Button>
        </div>
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
            isFirst={lessonIndex === 0}
            isLast={lessonIndex === lessons.length - 1}
            onMoveUp={() => moveLesson(lessonIndex, -1)}
            onMoveDown={() => moveLesson(lessonIndex, 1)}
            onRemove={() => remove(lessonIndex)}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              url: "",
              type: "video",
              isFree: false,
              duration: "0",
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

// ---------- Lesson field ----------

type LessonFieldProps = {
  form: UseFormReturn<CourseFormType>
  seasonIndex: number
  lessonIndex: number
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

function LessonField({
  form,
  seasonIndex,
  lessonIndex,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: LessonFieldProps) {
  const baseName = `seasons.${seasonIndex}.lessons.${lessonIndex}` as const

  return (
    <div className="rounded-lg border p-2">
      <div className="grid grid-cols-[auto_auto_1fr_1fr_auto_auto_auto_auto] items-center gap-2">
        {/* Reorder controls */}
        <div className="flex flex-col">
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className={cn(
              "flex size-4 items-center justify-center rounded text-muted-foreground transition-colors",
              isFirst
                ? "cursor-not-allowed opacity-30"
                : "hover:text-foreground"
            )}
            aria-label="Move lesson up"
          >
            <ChevronUp className="size-3" />
          </button>

          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className={cn(
              "flex size-4 items-center justify-center rounded text-muted-foreground transition-colors",
              isLast ? "cursor-not-allowed opacity-30" : "hover:text-foreground"
            )}
            aria-label="Move lesson down"
          >
            <ChevronDown className="size-3" />
          </button>
        </div>

        {/* Index badge */}
        <div className="flex size-6 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground tabular-nums">
          {lessonIndex + 1}
        </div>

        <Controller
          name={`${baseName}.title`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                label="e.g. Introduction to React"
              />
            </Field>
          )}
        />

        <Controller
          name={`${baseName}.url`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                label="https://..."
              />
            </Field>
          )}
        />

        <Controller
          name={`${baseName}.type`}
          control={form.control}
          render={({ field }) => (
            <Field className="w-22">
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="doc">Document</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name={`${baseName}.duration`}
          control={form.control}
          render={({ field }) => (
            <Field className="w-22">
              <Input
                {...field}
                type="number"
                step={1}
                min={0}
                label="duration"
              />
            </Field>
          )}
        />

        <Controller
          name={`${baseName}.isFree`}
          control={form.control}
          render={({ field }) => (
            <Field className="gap-0">
              <FieldLabel className="text-xs text-muted-foreground">
                Free?
              </FieldLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </Field>
          )}
        />

        <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove}>
          <Trash2 />
          <span className="sr-only">Remove lesson</span>
        </Button>
      </div>
    </div>
  )
}
