"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-10 flex min-h-[4rem] shrink-0 items-center gap-2 bg-transparent px-widget-padding-x py-4">
            <h1 className="text-2xl font-normal tracking-tight">
                Tebra Medical Center
            </h1>
            <div className="ml-auto flex items-center gap-3 w-full max-w-xl">
                <div className="relative flex-1">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-9 rounded-full bg-card/65 backdrop-blur-sm border-none shadow-sm h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary/30"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 z-10 pointer-events-none flex items-center">
                        <HugeiconsIcon icon={Search01Icon} className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    )
}
