import Link from "next/link"
import ParallaneLogo from "./ParallaneLogo"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

const Navbar = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/roadmaps", label: "Roadmaps" },
  ]

  return (
    <div className="px-3">
      <Card className="border-px mx-auto w-full max-w-6xl flex-row items-center justify-between rounded-full p-1.5 pl-5 backdrop-blur-3xl">
        <Link href="/">
          <ParallaneLogo />
        </Link>

        <nav className="hidden space-x-10 md:block">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                className={"p-0 text-muted-foreground hover:text-foreground"}
                variant={"link"}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link href={"/login"}>
            <Button size={"lg"} variant={"ghost"}>
              Sign In
            </Button>
          </Link>
          <Link href={"/login?signup=true"}>
            <Button size={"lg"}>Get Started</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Navbar
