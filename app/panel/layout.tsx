import type { ReactNode } from "react"

import { PanelSidebar } from "@/components/panel-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <PanelSidebar />

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="text-sm font-medium">Panel</div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
