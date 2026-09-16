"use client"

import {
  BookOpen,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Ticket,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarSeparator } from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Parallane
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {navigation.map((nav, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {nav.items.map((item) => {
                  const Icon = item.icon

                  const isActive =
                    item.href === "/panel"
                      ? pathname === "/panel"
                      : pathname.startsWith(item.href)

                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {accountNavigation.map((item) => {
                const Icon = item.icon

                const isActive = pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />

        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-9 w-9 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

async function handleLogout() {
  // Replace this with your authentication logout function.
  // Example:
  //
  // await signOut({
  //   redirectTo: "/login",
  // })
}

export default AdminSidebar

const user = {
  name: "Alireza Ezlegini",
  email: "ezlegini.ir@gmail.com",
}

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        title: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        title: "Memberships",
        href: "/admin/memberships",
        icon: CreditCard,
      },
      {
        title: "Enrollments",
        href: "/admin/enrollments",
        icon: UserPlus,
      },
      {
        title: "Coupons",
        href: "/admin/coupons",
        icon: Ticket,
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Q&A",
        href: "/admin/qa",
        icon: HelpCircle,
      },
      {
        title: "Students",
        href: "/admin/students",
        icon: Users,
      },
    ],
  },
]

const accountNavigation = [
  {
    title: "Profile",
    href: "/panel/profile",
    icon: UserRound,
  },
]
