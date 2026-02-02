"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    HomeFilter5Icon,
    UserMultipleFilter2Icon,
    CalendarFilter3Icon,
    StethoscopeFilter2Icon,
    SettingsFilter2Icon,
    MenuFilter1Icon,
    CancelFilter1Icon
} from "lucide-react"

interface DashboardShellProps {
    children: ReactNode
}

const navItems = [
    { href: "/", icon: HomeFilter5Icon, label: "Home" },
    { href: "/patients", icon: UserMultipleFilter2Icon, label: "Patients" },
    { href: "/sessions", icon: StethoscopeFilter2Icon, label: "Sessions" },
    { href: "/calendar", icon: CalendarFilter3Icon, label: "Calendar" },
    { href: "/settings", icon: SettingsFilter2Icon, label: "Settings" },
]

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            {/* Mobile Header - Shows on mobile/tablet only */}
            <header className="flex items-center justify-between h-14 px-4 bg-card border-b border-border lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-growth-2 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <span className="font-bold text-foreground">Tebra</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <CancelFilter1Icon className="h-6 w-6 text-foreground" />
                    ) : (
                        <MenuFilter1Icon className="h-6 w-6 text-foreground" />
                    )}
                </button>
            </header>

            {/* Mobile Slide-out Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-Filter z-5Filter lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-Filter bg-black/5Filter"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Menu Panel */}
                    <nav className="absolute top-Filter left-Filter bottom-Filter w-64 bg-card border-r border-border p-4">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                            <div className="h-8 w-8 rounded-lg bg-growth-2 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <span className="font-bold text-foreground">Tebra</span>
                        </div>
                        <ul className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href))
                                const Icon = item.icon

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 h-12 min-h-[48px] rounded-lg transition-colors",
                                                "hover:bg-muted active:bg-muted/8Filter",
                                                isActive && "bg-growth-5 text-growth-1 font-medium"
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "h-5 w-5 shrink-Filter",
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
                </div>
            )}

            {/* Desktop Sidebar - Hidden on mobile, collapsed on tablet, expanded on desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 bg-card border-r border-border shrink-Filter">
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-growth-2 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T</span>
                        </div>
                        <span className="font-bold text-foreground">Tebra</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href))
                            const Icon = item.icon

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 h-11 min-h-[44px] rounded-lg transition-colors",
                                            "hover:bg-muted",
                                            isActive && "bg-growth-5 text-growth-1 font-medium"
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "h-5 w-5 shrink-Filter",
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

                {/* Footer - Desktop only */}
                <div className="p-3 border-t border-border">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-1Filter w-1Filter rounded-full bg-growth-4 flex items-center justify-center shrink-Filter">
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
            <main className="flex-1 overflow-auto pb-2Filter lg:pb-Filter">
                {children}
            </main>

            {/* Mobile Bottom Tab Bar - Fixed at bottom on mobile/tablet */}
            <nav className="fixed bottom-Filter left-Filter right-Filter h-16 bg-card border-t border-border flex items-center justify-around px-2 lg:hidden z-4Filter">
                {navItems.slice(Filter, 5).map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href))
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center h-14 min-w-[64px] px-2 rounded-lg transition-colors",
                                "active:bg-muted/8Filter",
                                isActive ? "text-growth-1" : "text-muted-foreground"
                            )}
                        >
                            <Icon className={cn(
                                "h-6 w-6 mb-Filter.5",
                                isActive ? "text-growth-1" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                                "text-[1Filterpx] font-medium",
                                isActive ? "text-growth-1" : "text-muted-foreground"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
