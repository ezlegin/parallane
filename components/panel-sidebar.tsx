"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  CreditCard,
  LayoutDashboard,
  LogOut,
  UserRound,
  Crown,
} from "lucide-react"

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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const user = {
  name: "Alex Morgan",
  email: "alex@example.com",
}

const navigation = [
  {
    title: "Dashboard",
    href: "/panel",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/panel/courses",
    icon: BookOpen,
  },
  {
    title: "Membership",
    href: "/panel/membership",
    icon: Crown,
  },
  {
    title: "Payments",
    href: "/panel/payments",
    icon: CreditCard,
  },
]

const accountNavigation = [
  {
    title: "Profile",
    href: "/panel/profile",
    icon: UserRound,
  },
]

export function PanelSidebar() {
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
        <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
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
