import {
  Lesson,
  LessonProgress,
  Season,
} from "@/prisma/generated/prisma/client"

export type SeasonWithLessons = Season & {
  lessons: (Lesson & { progress: LessonProgress[] })[]
}

export function isCompleted(lesson: Lesson & { progress: LessonProgress[] }) {
  return lesson.progress.some((p) => p.completedAt !== null)
}

export function findResumeLesson(seasons: SeasonWithLessons[]) {
  for (const season of seasons) {
    for (const lesson of season.lessons) {
      if (!isCompleted(lesson)) {
        return { season, lesson }
      }
    }
  }

  const lastSeason = seasons.at(-1)
  const lastLesson = lastSeason?.lessons.at(-1)
  return lastSeason && lastLesson
    ? { season: lastSeason, lesson: lastLesson }
    : null
}

export function findLesson(seasons: SeasonWithLessons[], lessonId: string) {
  for (const season of seasons) {
    const lesson = season.lessons.find((l) => l.id === lessonId)
    if (lesson) return { season, lesson }
  }
  return null
}

export function flattenLessons(seasons: SeasonWithLessons[]) {
  return seasons.flatMap((s) => s.lessons)
}
