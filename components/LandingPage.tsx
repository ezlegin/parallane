import { cn } from "cn"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { homePagePadding } from "@/app/(HOME)/page"
import GlowingStroke from "./GlowingStroke"
import Link from "next/link"

const LandingPage = () => {
  return (
    <section className={cn(homePagePadding, "mx-auto flex justify-between")}>
      <div className="flex flex-col items-start justify-center gap-4">
        <Badge variant={"outline"} className="p-4">
          Learn. Build. Ship.
        </Badge>

        <h1 className="text-6xl font-semibold tracking-tight md:text-8xl lg:text-[6rem]">
          Build your{" "}
          <span className="text-muted-foreground">
            <br />
            Future.
          </span>
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Learn the skills you need to design, develop, and build for the modern
          web. Follow a roadmap, master the fundamentals, and turn knowledge
          into real skills.
        </p>

        <div className="flex shrink-0 gap-3">
          <Link href={"/pricing"}>
            <Button size="lg" className="h-12 px-6">
              Start Learning
            </Button>
          </Link>

          <Link href={"/roadmaps"}>
            <Button size="lg" variant="outline" className="h-12 px-6">
              Explore Roadmaps
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Card className="relative w-lg gap-3 py-3">
          <GlowingStroke />

          <div className="flex items-center justify-between px-4">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="size-2 rounded-full bg-muted-foreground"
                />
              ))}
            </div>

            <div className="text-xs text-muted-foreground">{"</> Code"}</div>
          </div>

          <Separator />

          <CardContent>
            <JsonString />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default LandingPage

const JsonString = () => {
  const person = {
    name: "Alex Morgan",
    role: "Frontend Developer",
    learning: ["TypeScript", "React", "Next.js", "Design"],
    goal: "Build products that solve problems.",
  }

  return (
    <pre className="overflow-x-auto font-mono text-sm leading-6">
      <code>
        <span className="text-foreground">&#123;</span>
        {"\n"}

        {"  "}
        <span className="text-primary">"name"</span>
        <span className="text-foreground">: </span>
        <span className="text-muted-foreground">
          {JSON.stringify(person.name)}
        </span>
        <span className="text-foreground">,</span>
        {"\n"}

        {"  "}
        <span className="text-primary">"role"</span>
        <span className="text-foreground">: </span>
        <span className="text-muted-foreground">
          {JSON.stringify(person.role)}
        </span>
        <span className="text-foreground">,</span>
        {"\n"}

        {"  "}
        <span className="text-primary">"learning"</span>
        <span className="text-foreground">: [</span>
        {"\n"}

        {person.learning.map((item, index) => (
          <span key={item}>
            {"    "}
            <span className="text-muted-foreground">
              {JSON.stringify(item)}
            </span>

            {index < person.learning.length - 1 && (
              <span className="text-foreground">,</span>
            )}

            {"\n"}
          </span>
        ))}

        {"  "}
        <span className="text-foreground">],</span>
        {"\n"}

        {"  "}
        <span className="text-primary">"goal"</span>
        <span className="text-foreground">: </span>
        <span className="text-muted-foreground">
          {JSON.stringify(person.goal)}
        </span>

        {"\n"}
        <span className="text-foreground">&#125;</span>
      </code>
    </pre>
  )
}
