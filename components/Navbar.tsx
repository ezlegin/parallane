import { getActiveMembership, getSessionUser } from "@/lib/user"
import Link from "next/link"

import ParallaneLogo from "./ParallaneLogo"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { NavLink } from "./nav-links"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
]

const Navbar = async () => {
  const sessionUser = await getSessionUser()
  const activeMembership = await getActiveMembership(sessionUser?.id)

  return (
    <div className="px-3">
      <Card className="mx-auto w-full max-w-6xl flex-row items-center justify-between rounded-full border p-1.5 pl-5 backdrop-blur-3xl">
        <Link href="/">
          <ParallaneLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link href="/login">
            <Button size="lg" variant={sessionUser ? "outline" : "ghost"}>
              {sessionUser ? sessionUser.name : "Sign In"}
            </Button>
          </Link>
          {!activeMembership && (
            <Link href="/pricing">
              <Button size="lg">Get Started</Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Navbar
