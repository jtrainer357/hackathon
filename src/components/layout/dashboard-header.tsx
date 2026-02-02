"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { PracticeSwitcher } from "@/components/layout/practice-switcher"
import { VoiceControl } from "@/components/voice/VoiceControl"

declare global {
    interface Window {
        __voiceResultHandler?: (transcript: string) => void
    }
}

export function DashboardHeader() {
    const handleVoiceTranscript = (transcript: string) => {
        // Call global voice handler if available
        if (typeof window !== 'undefined' && window.__voiceResultHandler) {
            window.__voiceResultHandler(transcript)
        }
    }

    return (
        <header className="sticky top-0 z-10 flex min-h-16 shrink-0 items-center gap-2 bg-transparent px-4 py-4">
            <PracticeSwitcher />
            <div className="ml-auto flex items-center gap-3 w-full max-w-xl">
                <div className="relative flex-1">
                    <Input
                        type="search"
                        placeholder="Search patients..."
                        aria-label="Search patients"
                        className="w-full pl-9 rounded-full bg-card/65 backdrop-blur-sm border-none shadow-sm h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary/30"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 z-10 pointer-events-none flex items-center">
                        <Search className="h-4 w-4" />
                    </div>
                </div>
                <VoiceControl onTranscript={handleVoiceTranscript} />
            </div>
        </header>
    )
}
