import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowUpRight } from "lucide-react"
import { cn } from "cn"
import { homePagePadding } from "@/app/(HOME)/page"
import { Card } from "./ui/card"

const CoursesList = () => {
  const courses = [
    {
      number: "01",
      title: "HTML",
      description: "Structure the web.",
      category: "Frontend",
    },
    {
      number: "02",
      title: "CSS",
      description: "Shape the experience.",
      category: "Frontend",
    },
    {
      number: "03",
      title: "JavaScript",
      description: "Bring ideas to life.",
      category: "Frontend",
    },
    {
      number: "04",
      title: "TypeScript",
      description: "Build with confidence.",
      category: "Development",
    },
    {
      number: "05",
      title: "React",
      description: "Create dynamic interfaces.",
      category: "Frontend",
    },
    {
      number: "06",
      title: "Next.js",
      description: "Build complete applications.",
      category: "Full Stack",
    },
    {
      number: "07",
      title: "Redux",
      description: "Master application state.",
      category: "Development",
    },
    {
      number: "08",
      title: "Node.js",
      description: "Power the backend.",
      category: "Backend",
    },
    {
      number: "09",
      title: "MySQL",
      description: "Work with real data.",
      category: "Backend",
    },
    {
      number: "10",
      title: "Git",
      description: "Track, collaborate, ship.",
      category: "Tools",
    },
    {
      number: "11",
      title: "Docker",
      description: "Run anywhere.",
      category: "DevOps",
    },
    {
      number: "12",
      title: "AI Coding",
      description: "Build with intelligence.",
      category: "AI",
    },
    {
      number: "13",
      title: "Figma",
      description: "Design before you build.",
      category: "Design",
    },
    {
      number: "14",
      title: "Web Design",
      description: "Make it feel right.",
      category: "Design",
    },
  ]

  return (
    <section>
      <div className={cn("space-y-16", homePagePadding)}>
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground" />
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                The Library
              </p>
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Learn the tools.
              <br />
              <span className="text-muted-foreground">Build the ideas.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {courses.length} courses
            </span>

            <Button variant="outline" className="rounded-full">
              Explore library
              <span className="ml-2">↗</span>
            </Button>
          </div>
        </div>

        {/* Courses */}
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-3">
            {courses.map((course) => (
              <Card key={course.title} className="rounded-sm p-0">
                <Link
                  href={`/courses/${course.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="group relative flex flex-col items-center justify-between gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-muted/30"
                >
                  {/* Number */}
                  <span className="w-full font-mono text-xs text-muted-foreground transition-colors">
                    {course.number}
                  </span>

                  {/* Main */}
                  <div className="flex w-full flex-1 items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                        {course.title}
                      </h3>

                      <p className="text-sm text-muted-foreground transition-colors">
                        {course.description}
                      </p>
                    </div>

                    <div className="hidden flex-col items-end gap-2 sm:flex">
                      <Button variant={"outline"} size={"icon"}>
                        <ArrowUpRight />
                      </Button>
                      <Badge
                        variant={"outline"}
                        className="bg-transparent text-muted-foreground"
                      >
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>From fundamentals to production.</span>

            <span className="hidden sm:block">Learn → Build → Ship</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesList
// import Link from "next/link"
// import { Button } from "./ui/button"
// import { Badge } from "./ui/badge"
// import { ArrowUpRight } from "lucide-react"
// import { cn } from "cn"
// import { homePagePadding } from "@/app/(HOME)/page"

// const CoursesList = () => {
//   const courses = [
//     {
//       number: "01",
//       title: "HTML",
//       description: "Structure the web.",
//       category: "Frontend",
//     },
//     {
//       number: "02",
//       title: "CSS",
//       description: "Shape the experience.",
//       category: "Frontend",
//     },
//     {
//       number: "03",
//       title: "JavaScript",
//       description: "Bring ideas to life.",
//       category: "Frontend",
//     },
//     {
//       number: "04",
//       title: "TypeScript",
//       description: "Build with confidence.",
//       category: "Development",
//     },
//     {
//       number: "05",
//       title: "React",
//       description: "Create dynamic interfaces.",
//       category: "Frontend",
//     },
//     {
//       number: "06",
//       title: "Next.js",
//       description: "Build complete applications.",
//       category: "Full Stack",
//     },
//     {
//       number: "07",
//       title: "Redux",
//       description: "Master application state.",
//       category: "Development",
//     },
//     {
//       number: "08",
//       title: "Node.js",
//       description: "Power the backend.",
//       category: "Backend",
//     },
//     {
//       number: "09",
//       title: "MySQL",
//       description: "Work with real data.",
//       category: "Backend",
//     },
//     {
//       number: "10",
//       title: "Git",
//       description: "Track, collaborate, ship.",
//       category: "Tools",
//     },
//     {
//       number: "11",
//       title: "Docker",
//       description: "Run anywhere.",
//       category: "DevOps",
//     },
//     {
//       number: "12",
//       title: "AI Coding",
//       description: "Build with intelligence.",
//       category: "AI",
//     },
//     {
//       number: "13",
//       title: "Figma",
//       description: "Design before you build.",
//       category: "Design",
//     },
//     {
//       number: "14",
//       title: "Web Design",
//       description: "Make it feel right.",
//       category: "Design",
//     },
//   ]

//   return (
//     <section>
//       <div className={cn(homePagePadding)}>
//         {/* Header */}
//         <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
//           <div className="max-w-2xl">
//             <div className="mb-5 flex items-center gap-3">
//               <span className="h-px w-8 bg-foreground" />
//               <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
//                 The Library
//               </p>
//             </div>

//             <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
//               Learn the tools.
//               <br />
//               <span className="text-muted-foreground">Build the ideas.</span>
//             </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <span className="text-sm text-muted-foreground">
//               {courses.length} courses
//             </span>

//             <Button variant="outline" className="rounded-full">
//               Explore library
//               <span className="ml-2">↗</span>
//             </Button>
//           </div>
//         </div>

//         {/* Courses */}
//         <div className="mt-16 overflow-hidden rounded-3xl border">
//           {courses.map((course) => (
//             <Link
//               key={course.title}
//               href={`/courses/${course.title
//                 .toLowerCase()
//                 .replaceAll(" ", "-")}`}
//               className="group relative flex min-h-36 items-center justify-between border-b p-6 transition-colors last:border-b-0 hover:bg-foreground hover:text-background md:px-8"
//             >
//               {/* Number */}
//               <div className="flex h-full items-start self-stretch">
//                 <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-background/50">
//                   {course.number}
//                 </span>
//               </div>

//               {/* Main */}
//               <div className="ml-8 flex flex-1 items-center justify-between gap-6">
//                 <div>
//                   <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
//                     {course.title}
//                   </h3>

//                   <p className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-background/60">
//                     {course.description}
//                   </p>
//                 </div>

//                 <div className="hidden flex-col items-end gap-2 sm:flex">
//                   <Button variant={"outline"} size={"icon"}>
//                     <ArrowUpRight />
//                   </Button>
//                   <Badge
//                     variant={"outline"}
//                     className="bg-transparent text-muted-foreground"
//                   >
//                     {course.category}
//                   </Badge>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Bottom */}
//         <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
//           <span>From fundamentals to production.</span>

//           <span className="hidden sm:block">Learn → Build → Ship</span>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CoursesList
