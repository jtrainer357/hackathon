"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WidgetContainer } from "@/components/ui/widget-container"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import {
    Tick02Icon,
} from "@hugeicons/core-free-icons"

const tasks = [
    {
        id: 1,
        title: "Verify insurance eligibility for today's patients",
        subtitle: "TEBRA CLEARINGHOUSE • 14 PATIENTS SCHEDULED",
        action: "Start",
        icon: Tick02Icon,
    },
    {
        id: 2,
        title: "Manage check-in/check-out and collect co-pays",
        subtitle: "ONGOING • MONITOR FRONT DESK FLOW",
        action: "Open",
        icon: Tick02Icon,
    },
    {
        id: 3,
        title: "Answer calls & portal messages",
        subtitle: "8 NEW MESSAGES • 3 VOICEMAILS",
        action: "View",
        icon: Tick02Icon,
    },
    {
        id: 4,
        title: "Confirm tomorrow's appointments",
        subtitle: "REMINDER CALLS • 12 PATIENTS TO CONTACT",
        action: "Start",
        icon: Tick02Icon,
    },
    {
        id: 5,
        title: "Submit prior authorizations",
        subtitle: "3 PENDING REQUESTS • DUE TODAY",
        action: "Review",
        icon: Tick02Icon,
    },
    {
        id: 6,
        title: "Update patient demographic information",
        subtitle: "5 PATIENTS • MISSING INFO FLAGGED",
        action: "Update",
        icon: Tick02Icon,
    },
]

export function TasksWidget() {
    return (
        <WidgetContainer
            title="Today's Tasks"
            headerAction={<Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">6 TOTAL</Badge>}
        >
            <ScrollArea className="h-full">
                <div className="flex flex-col gap-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="h-9 w-9 mt-1 rounded-[12px] bg-neuron flex items-center justify-center shrink-0">
                                    <HugeiconsIcon icon={task.icon} className="h-5 w-5 text-amino" strokeWidth={3} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground">{task.title}</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5 opacity-70">{task.subtitle}</div>
                                </div>
                            </div>
                            <Button variant="secondary" className="h-8 rounded-full px-4 font-semibold text-xs border-border/60">{task.action}</Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}
