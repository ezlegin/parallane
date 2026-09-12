import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  Clock3,
  FileText,
  Play,
  Star,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const courses = {
  html: {
    slug: "html",
    title: "HTML",
    seasons: [
      {
        title: "The Foundations",
        description: "Understand how the web works and how HTML fits into it.",
        duration: "1h 04m",
        lessons: [
          { title: "How the Web Works", duration: "12m", type: "video" },
          { title: "HTML Fundamentals", duration: "18m", type: "video" },
          { title: "Document Structure", duration: "14m", type: "video" },
          { title: "Semantic HTML", duration: "20m", type: "video" },
        ],
      },
      {
        title: "Building with HTML",
        description:
          "Learn the elements and patterns used to build real pages.",
        duration: "1h 18m",
        lessons: [
          { title: "Working with Text", duration: "13m", type: "video" },
          { title: "Links & Navigation", duration: "17m", type: "video" },
          { title: "Images & Media", duration: "19m", type: "video" },
          { title: "HTML Forms", duration: "24m", type: "video" },
          { title: "Accessibility Fundamentals", duration: "05m", type: "doc" },
        ],
      },
      {
        title: "Putting It Together",
        description: "Bring everything together in a practical page.",
        duration: "26m",
        lessons: [
          { title: "Building a Real Page", duration: "26m", type: "video" },
        ],
      },
    ],
    category: "Frontend Development",

    summary:
      "Build the foundation of every website and learn how the web actually works.",

    description:
      "Learn HTML from the ground up and understand how modern websites are structured. You'll learn how to create semantic, accessible, and well-organized pages that form the foundation of every web application.",

    rating: 4.9,
    reviews: 128,

    duration: "3h 20m",
    lessons: 18,
    level: "Beginner",

    tutor: {
      name: "Alex Morgan",
      summary:
        "Frontend developer and educator focused on helping developers understand the fundamentals behind modern web applications.",
    },

    targetAudience: [
      "Complete beginners who want to learn web development",
      "Designers who want to understand how their designs become websites",
      "Developers looking to strengthen their fundamentals",
      "Anyone curious about how websites are structured",
    ],

    learn: [
      "Understand how the web and HTML work",
      "Build semantic and accessible page structures",
      "Work with headings, paragraphs, links, images, and media",
      "Create forms and interactive elements",
      "Structure real-world web pages",
      "Write clean and maintainable HTML",
    ],

    curriculum: [
      {
        title: "How the Web Works",
        duration: "12m",
        type: "video",
      },
      {
        title: "HTML Fundamentals",
        duration: "18m",
        type: "video",
      },
      {
        title: "Document Structure",
        duration: "14m",
        type: "video",
      },
      {
        title: "Semantic HTML",
        duration: "21m",
        type: "video",
      },
      {
        title: "Working with Text",
        duration: "13m",
        type: "video",
      },
      {
        title: "Links & Navigation",
        duration: "17m",
        type: "video",
      },
      {
        title: "Images & Media",
        duration: "19m",
        type: "video",
      },
      {
        title: "HTML Forms",
        duration: "24m",
        type: "video",
      },
      {
        title: "Accessibility Fundamentals",
        duration: "16m",
        type: "doc",
      },
      {
        title: "Building a Real Page",
        duration: "26m",
        type: "video",
      },
    ],
  },

  css: {
    slug: "css",
    title: "CSS",
    seasons: [
      {
        title: "The Foundations",
        description: "Understand how the web works and how HTML fits into it.",
        duration: "1h 04m",
        lessons: [
          { title: "How the Web Works", duration: "12m", type: "video" },
          { title: "HTML Fundamentals", duration: "18m", type: "video" },
          { title: "Document Structure", duration: "14m", type: "video" },
          { title: "Semantic HTML", duration: "20m", type: "video" },
        ],
      },
      {
        title: "Building with HTML",
        description:
          "Learn the elements and patterns used to build real pages.",
        duration: "1h 18m",
        lessons: [
          { title: "Working with Text", duration: "13m", type: "video" },
          { title: "Links & Navigation", duration: "17m", type: "video" },
          { title: "Images & Media", duration: "19m", type: "video" },
          { title: "HTML Forms", duration: "24m", type: "video" },
          { title: "Accessibility Fundamentals", duration: "05m", type: "doc" },
        ],
      },
      {
        title: "Putting It Together",
        description: "Bring everything together in a practical page.",
        duration: "26m",
        lessons: [
          { title: "Building a Real Page", duration: "26m", type: "video" },
        ],
      },
    ],
    category: "Frontend Development",

    summary:
      "Turn structure into experience with modern CSS, responsive layouts, and thoughtful visual design.",

    description:
      "Go beyond basic styling and learn how to build responsive, polished interfaces with modern CSS. From layout systems to animations, you'll develop the skills needed to turn HTML into real experiences.",

    rating: 4.9,
    reviews: 96,

    duration: "5h 40m",
    lessons: 27,
    level: "Beginner → Intermediate",

    tutor: {
      name: "Alex Morgan",
      summary:
        "Frontend developer and educator focused on helping developers understand the fundamentals behind modern web applications.",
    },

    targetAudience: [
      "Developers who already understand basic HTML",
      "Designers who want more control over their interfaces",
      "Beginners building their first responsive websites",
      "Developers looking to improve their CSS fundamentals",
    ],

    learn: [
      "Understand how CSS works and how styles are applied",
      "Build layouts with Flexbox and Grid",
      "Create responsive websites for every screen size",
      "Master spacing, typography, and visual hierarchy",
      "Work with positioning, transitions, and animations",
      "Build polished interfaces from real designs",
    ],

    curriculum: [
      {
        title: "How CSS Works",
        duration: "15m",
        type: "video",
      },
      {
        title: "Selectors & Specificity",
        duration: "19m",
        type: "video",
      },
      {
        title: "Colors & Typography",
        duration: "22m",
        type: "video",
      },
      {
        title: "The Box Model",
        duration: "18m",
        type: "video",
      },
      {
        title: "Flexbox",
        duration: "31m",
        type: "video",
      },
      {
        title: "CSS Grid",
        duration: "34m",
        type: "video",
      },
      {
        title: "Responsive Design",
        duration: "27m",
        type: "video",
      },
      {
        title: "Positioning",
        duration: "21m",
        type: "video",
      },
      {
        title: "Transitions & Animations",
        duration: "25m",
        type: "video",
      },
      {
        title: "Modern CSS Patterns",
        duration: "20m",
        type: "doc",
      },
      {
        title: "Build a Complete Interface",
        duration: "48m",
        type: "video",
      },
    ],
  },
} as const

type CourseSlug = keyof typeof courses

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params

  if (!(slug in courses)) {
    notFound()
  }

  const course = courses[slug as CourseSlug]

  return (
    <main>
      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative overflow-hidden">
        {/* subtle background grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent)] bg-size-[72px_72px] opacity-30" />

        <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pt-16 md:pb-28">
          {/* Back */}
          <Link
            href="/courses"
            className="group mb-16 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All courses
          </Link>

          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="rounded-full px-3 py-1.5">
              {course.category}
            </Badge>

            <h1 className="mt-7 text-6xl font-semibold tracking-[-0.07em] md:text-8xl lg:text-9xl">
              {course.title}
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {course.summary}
            </p>

            {/* Rating */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-4 fill-foreground" />
                ))}
              </div>

              <span className="font-medium">{course.rating}</span>

              <span className="text-sm text-muted-foreground">
                ({course.reviews} reviews)
              </span>
            </div>
            <div className="flex justify-center gap-3">
              <Link href="/pricing">
                <Button size="lg" className="mt-10 h-12 px-7">
                  Join Parallane
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="#curriculums">
                <Button
                  size="lg"
                  className="mt-10 h-12 px-7"
                  variant={"outline"}
                >
                  See Curriculums
                  <ArrowDown className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-muted/30 shadow-2xl">
            <video
              className="aspect-video w-full object-cover"
              controls
              poster="/course-placeholder.jpg"
            >
              <source src="/tizer.mp4" type="video/mp4" />
            </video>

            {/* play overlay if video isn't playing */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full border bg-background/80 backdrop-blur-md">
                <Play className="ml-1 size-5 fill-current" />
              </div>
            </div>
          </div>

          {/* Course meta */}
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 divide-x rounded-2xl border sm:grid-cols-4">
            <div className="p-5 text-center">
              <Clock3 className="mx-auto size-4 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">{course.duration}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Total duration
              </p>
            </div>

            <div className="p-5 text-center">
              <Play className="mx-auto size-4 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                {course.lessons} lessons
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Course content
              </p>
            </div>

            <div className="border-t p-5 text-center sm:border-t-0">
              <BookOpen className="mx-auto size-4 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">{course.level}</p>
              <p className="mt-1 text-xs text-muted-foreground">Difficulty</p>
            </div>

            <div className="border-t p-5 text-center sm:border-t-0">
              <Award className="mx-auto size-4 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Certificate</p>
              <p className="mt-1 text-xs text-muted-foreground">Included</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          OVERVIEW + LEARN
      ================================================================= */}

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                About this course
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                Start with the
                <br />
                <span className="text-muted-foreground">fundamentals.</span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {course.learn.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border p-4">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="size-3" />
                    </span>

                    <span className="text-sm leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CURRICULUM
      ================================================================= */}

      <section className="border-b">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Curriculum
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                What's inside.
              </h2>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{course.seasons.length} seasons</span>
              <span className="text-border">/</span>
              <span>{course.lessons} lessons</span>
              <span className="text-border">/</span>
              <span>{course.duration}</span>
            </div>
          </div>

          <Accordion
            defaultValue={["season-0"]}
            className="overflow-hidden rounded-3xl border"
          >
            {course.seasons.map((season, seasonIndex) => (
              <AccordionItem
                key={season.title}
                value={`season-${seasonIndex}`}
                className="border-b px-6 last:border-b-0 md:px-8"
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex w-full items-center gap-5 pr-4 text-left">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(seasonIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold md:text-lg">
                        {season.title}
                      </h3>

                      <p className="mt-1 max-w-xl text-sm leading-6 font-normal text-muted-foreground">
                        {season.description}
                      </p>
                    </div>

                    <div className="hidden shrink-0 items-center gap-2 text-xs text-muted-foreground sm:flex">
                      <Clock3 className="size-3.5" />
                      {season.duration}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-6">
                  <div className="ml-0 overflow-hidden rounded-2xl">
                    {season.lessons.map((lesson, lessonIndex) => {
                      const isVideo = lesson.type === "video"

                      return (
                        <div
                          key={lesson.title}
                          className="flex items-center gap-4 border-b py-1 last:border-b-0"
                        >
                          <span className="w-7 shrink-0 text-center font-mono text-[11px] text-muted-foreground">
                            {String(lessonIndex + 1).padStart(2, "0")}
                          </span>

                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                            {isVideo ? (
                              <Play className="size-3.5" />
                            ) : (
                              <FileText className="size-3.5" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {lesson.title}
                            </p>
                          </div>

                          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock3 className="size-3" />
                            {lesson.duration}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================================================================
          TARGET AUDIENCE
      ================================================================= */}

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-24">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Who is this for?
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Built for people
                <br />
                <span className="text-muted-foreground">
                  who want to build.
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {course.targetAudience.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-5 border-b py-3 last:border-b-0"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CERTIFICATE
      ================================================================= */}

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Certificate of completion
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Finish the course.
              <br />
              <span className="text-muted-foreground">
                Earn something to show for it.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Complete the course and earn a verified Parallane certificate
              recognizing the skills you've developed along the way.
            </p>
          </div>

          <Card className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] p-2 shadow-2xl">
            <div className="relative aspect-[1.55/1] overflow-hidden rounded-[1.5rem] border bg-background">
              {/* decorative frame */}
              <div className="absolute inset-4 border md:inset-8" />
              <div className="absolute inset-6 border border-dashed md:inset-10" />

              <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border">
                  <Award className="size-6" />
                </div>

                <p className="mt-6 text-[10px] font-medium tracking-[0.35em] text-muted-foreground uppercase">
                  Parallane
                </p>

                <h3 className="mt-5 font-serif text-3xl tracking-tight md:text-5xl">
                  Certificate of Completion
                </h3>

                <p className="mt-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  This certificate is proudly presented to
                </p>

                <p className="mt-4 font-serif text-2xl italic md:text-4xl">
                  Your Name
                </p>

                <div className="my-6 h-px w-32 bg-border" />

                <p className="text-sm text-muted-foreground">
                  for successfully completing
                </p>

                <p className="mt-2 text-lg font-medium md:text-xl">
                  {course.title}
                </p>

                <div className="mt-8 flex items-center gap-8 text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  <div>
                    <p className="text-foreground">Parallane</p>
                    <p className="mt-1">Online Education</p>
                  </div>

                  <div className="h-8 w-px bg-border" />

                  <div>
                    <p className="text-foreground">Certificate ID</p>
                    <p className="mt-1">PL-000000</p>
                  </div>

                  <div className="h-8 w-px bg-border" />

                  <div>
                    <p className="text-foreground">Completed</p>
                    <p className="mt-1">January 2026</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 left-8">
                <div className="size-3 border-t border-l" />
              </div>

              <div className="absolute top-8 right-8">
                <div className="size-3 border-t border-r" />
              </div>

              <div className="absolute bottom-8 left-8">
                <div className="size-3 border-b border-l" />
              </div>

              <div className="absolute right-8 bottom-8">
                <div className="size-3 border-r border-b" />
              </div>
            </div>
          </Card>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 text-center sm:grid-cols-3">
            <div>
              <Award className="mx-auto size-5" />
              <p className="mt-3 text-sm font-medium">Recognized achievement</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                A certificate for completing your learning journey.
              </p>
            </div>

            <div>
              <Check className="mx-auto size-5" />
              <p className="mt-3 text-sm font-medium">Earn by completing</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Complete the required lessons to receive your certificate.
              </p>
            </div>

            <div>
              <BookOpen className="mx-auto size-5" />
              <p className="mt-3 text-sm font-medium">Show what you learned</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Add your achievement to your professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MEMBERSHIP
      ================================================================= */}

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[64px_64px] opacity-10" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <Badge
            variant="outline"
            className="rounded-full border-background/20 text-background"
          >
            Full access
          </Badge>

          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl">
            One membership.
            <br />
            Every course.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-background/60">
            Get this course and the entire Parallane library with one
            membership. Learn at your own pace and follow the roadmap that fits
            your goals.
          </p>

          <div className="mt-10 flex items-end justify-center gap-3">
            <span className="text-6xl font-semibold tracking-tight">$29</span>

            <span className="mb-2 text-background/50">/ month</span>
          </div>

          <p className="mt-2 text-sm text-background/50">
            Or save with the annual plan at an effective{" "}
            <strong className="text-background">$19/month</strong>.
          </p>

          <Link href="/pricing">
            <Button size="lg" variant="secondary" className="mt-10 h-12 px-7">
              Join Parallane
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
            <div className="md:sticky md:top-24 md:self-start">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                FAQ
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Questions?
                <br />
                <span className="text-muted-foreground">
                  We've got answers.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
                Everything you need to know about this course, your membership,
                and what happens after you complete it.
              </p>
            </div>

            <Accordion defaultValue={["faq-0"]} className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="py-6 text-left text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 leading-7 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}

const faqItems = [
  {
    question: "Do I need any previous experience?",
    answer:
      "No. This course starts from the fundamentals and gradually introduces the concepts you need to understand the subject. You don't need professional experience to get started.",
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "Your course access is included with your active Parallane membership. As long as your membership is active, you can return to this course and continue learning at your own pace.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely. There are no fixed class times. Watch the lessons, review the material, and practice whenever it works best for you.",
  },
  {
    question: "Is the certificate included?",
    answer:
      "Yes. Once you successfully complete the required lessons for the course, you'll receive a Parallane certificate of completion with your name on it.",
  },
  {
    question: "What does my membership include?",
    answer:
      "Your membership gives you access to the complete Parallane course library, allowing you to learn across multiple technologies and follow different learning roadmaps without purchasing individual courses.",
  },
  {
    question: "Can I follow a roadmap while taking this course?",
    answer:
      "Yes. Each course is designed to fit into a broader learning path. If you're learning toward a specific goal, you can use Parallane roadmaps to understand what to learn next and in which order.",
  },
  {
    question: "Is this course suitable for beginners?",
    answer:
      "Yes. The course is structured to build your understanding step by step rather than assuming that you already know everything.",
  },
  {
    question: "What should I learn after finishing this course?",
    answer:
      "That depends on your goal. Your roadmap can guide you toward the next course and help you continue building the skills required for your chosen path.",
  },
] as const
