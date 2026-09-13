import Link from "next/link"
import { ArrowLeft, BookOpen, Terminal } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background 404 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[clamp(14rem,35vw,32rem)] leading-none font-black tracking-[-0.08em] text-muted/20">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-sm backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
          PAGE_NOT_FOUND
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl">
          Looks like this page wandered off the learning path.
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, has been moved,
          or is no longer available.
        </p>

        {/* Terminal */}
        <div className="mt-10 w-full overflow-hidden rounded-2xl border bg-card text-left shadow-2xl shadow-black/5">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Terminal className="size-3.5" />
              parallane
            </div>

            <div className="w-12" />
          </div>

          {/* Terminal content */}
          <div className="space-y-3 p-5 font-mono text-sm sm:p-6">
            <div className="flex gap-2">
              <span className="text-muted-foreground">$</span>
              <span>find /requested-page</span>
            </div>

            <div className="pl-4 text-muted-foreground">Searching...</div>

            <div className="pl-4 text-muted-foreground">Searching...</div>

            <div className="flex gap-2 pt-1">
              <span className="text-muted-foreground">✕</span>
              <span>No results found</span>
            </div>

            <div className="flex gap-2 pt-1">
              <span className="text-muted-foreground">$</span>
              <span>
                <span className="animate-pulse">_</span>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <Link
            href="/courses"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            <BookOpen className="size-4" />
            Explore courses
          </Link>
        </div>
      </div>
    </main>
  )
}
