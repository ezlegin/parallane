import Link from "next/link"
import ParallaneLogo from "./ParallaneLogo"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

const Footer = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/roadmaps", label: "Roadmaps" },
    { href: "/pricing", label: "Pricing" },
  ]

  const courseItems = [
    { href: "/courses/html", label: "HTML" },
    { href: "/courses/css", label: "CSS" },
    { href: "/courses/javascript", label: "JavaScript" },
    { href: "/courses/react", label: "React" },
    { href: "/courses/nextjs", label: "Next.js" },
  ]

  return (
    <footer className="mx-auto w-full max-w-6xl px-3">
      <Card className="0 rounded-3xl p-8 backdrop-blur-3xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/">
              <ParallaneLogo type="typo" width={130} />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Learn the skills you need to design, develop, and build for the
              modern web.
            </p>

            <Link href={"/roadmaps"}>
              <Button className="mt-6" size="lg">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Explore</h3>

            <nav className="flex flex-col items-start">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    className="p-0 text-muted-foreground hover:text-foreground"
                    variant="link"
                  >
                    <div className="h-0.5 w-2 bg-muted" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Popular Courses</h3>

            <nav className="flex flex-col items-start">
              {courseItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    className="p-0 text-muted-foreground hover:text-foreground"
                    variant="link"
                  >
                    <div className="h-0.5 w-2 bg-muted" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="my-5 h-px bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Parallane. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms & Privacy
            </Link>
          </div>
        </div>
      </Card>
    </footer>
  )
}

export default Footer
