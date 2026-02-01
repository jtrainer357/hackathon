"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export function WelcomeTebraModal() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const isSetupComplete = searchParams?.get("setup_complete") === "true"
        let processingTimer: NodeJS.Timeout
        let closeTimer: NodeJS.Timeout

        if (isSetupComplete) {
            setOpen(true)

            // 1. Simulate processing time
            processingTimer = setTimeout(() => {
                setIsLoading(false)

                // 2. Auto close after success message
                closeTimer = setTimeout(() => {
                    setOpen(false)
                    router.replace("/dashboard")
                }, 5000)

            }, 2500)
        }

        return () => {
            clearTimeout(processingTimer)
            clearTimeout(closeTimer)
        }
    }, [searchParams, router])

    const handleClose = () => {
        setOpen(false)
        // Clean up URL without refresh
        router.replace("/dashboard")
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center p-10 text-center gap-6">
                <DialogHeader className="sr-only">
                    <DialogTitle>Welcome to Tebra</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="relative">
                            <div className="size-16 rounded-full border-4 border-muted/30" />
                            <div className="absolute inset-0 size-16 rounded-full border-4 border-t-vitality-1 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                            <HugeiconsIcon
                                icon={Loading03Icon}
                                className="absolute inset-0 m-auto size-8 text-vitality-1 animate-pulse"
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Finalizing Setup...</h3>
                            <p className="text-muted-foreground text-sm">
                                Importing your practice data and configuring your dashboard.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="size-20 bg-vitality-1/10 rounded-full flex items-center justify-center text-vitality-1 mb-2">
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-10" strokeWidth={2} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Welcome to Tebra!</h2>
                            <p className="text-muted-foreground">
                                Your data has been successfully imported. We're excited to help your practice grow.
                            </p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
