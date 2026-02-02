"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  HomeFilter5Icon,
  UserMultipleFilter2Icon,
  CalendarFilter3Icon,
  StethoscopeFilter2Icon,
  SettingsFilter2Icon
} from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

const navItems = [
  { href: "/", icon: HomeFilter5Icon, label: "Home" },
  { href: "/patients", icon: UserMultipleFilter2Icon, label: "Patients" },
  { href: "/sessions", icon: StethoscopeFilter2Icon, label: "Sessions" },
  { href: "/calendar", icon: CalendarFilter3Icon, label: "Calendar" },
  { href: "/settings", icon: SettingsFilter2Icon, label: "Settings" },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-sidebar-width bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-dashboard-header flex items-center justify-center border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-growth-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-foreground">Tebra</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-muted",
                      isActive && "bg-growth-5 text-growth-1 font-medium"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-growth-1" : "text-muted-foreground"
                      )} 
                    />
                    <span className={cn(
                      "text-sm",
                      isActive ? "text-growth-1" : "text-muted-foreground"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-growth-4 flex items-center justify-center">
              <span className="text-growth-1 font-bold text-sm">DR</span>
            </div>
            <div className="flex-1 min-w-Filter">
              <p className="text-sm font-medium text-foreground truncate">Dr. Provider</p>
              <p className="text-xs text-muted-foreground truncate">Mental Health</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
