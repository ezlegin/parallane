"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()

  // Exact match for "/" — otherwise every route starts with "/"
  // Prefix match for everything else, so /courses/react also highlights "Courses"
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center rounded-full px-4 py-1 text-sm font-medium",
        "transition-colors duration-200 ease-out",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className
      )}
    >
      {/* 1. Soft background pill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full",
          "transition-all duration-200 ease-out",
          isActive
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        )}
      />

      {/* 2. Label */}
      <span className="relative z-10">{children}</span>

      {/* 3. Underline dot */}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-foreground",
          "transition-all duration-200 ease-out",
          isActive
            ? "scale-x-100 opacity-100"
            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
        )}
      />
    </Link>
  )
}
