"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WidgetContainer } from "@/components/ui/widget-container"

const refills = [
    {
        id: 1,
        patient: "Margaret Sullivan",
        doctor: "DR. PATEL",
        medication: "Metformin 500mg",
        lastFilled: "LAST FILLED: OCT 12",
        daysSupply: "5D",
        initials: "MS",
        avatar: "/avatars/elderly_patient.png"
    },
    {
        id: 2,
        patient: "Kevin Martinez",
        doctor: "DR. MORRISON",
        medication: "Sertraline 50mg",
        lastFilled: "LAST FILLED: OCT 10",
        daysSupply: "4D",
        initials: "KM",
        avatar: "/avatars/male_patient.png"
    },
    {
        id: 3,
        patient: "Jane Doe",
        doctor: "DR. PATEL",
        medication: "Lipitor 20mg",
        lastFilled: "LAST FILLED: OCT 15",
        daysSupply: "6D",
        initials: "JD",
        avatar: "/avatars/female_patient.png"
    },
    {
        id: 4,
        patient: "Robert Wilson",
        doctor: "DR. CHEN",
        medication: "Amoxicillin 500mg",
        lastFilled: "LAST FILLED: OCT 08",
        daysSupply: "2D",
        initials: "RW",
        avatar: "/avatars/male_patient.png"
    },
    {
        id: 5,
        patient: "Linda Smith",
        doctor: "DR. MORRISON",
        medication: "Albuterol Inhaler",
        lastFilled: "LAST FILLED: OCT 18",
        daysSupply: "12D",
        initials: "LS",
        avatar: "/avatars/elderly_patient.png"
    },
    {
        id: 6,
        patient: "Michael Brown",
        doctor: "DR. PATEL",
        medication: "Lisinopril 10mg",
        lastFilled: "LAST FILLED: OCT 05",
        daysSupply: "1D",
        initials: "MB",
        avatar: "/avatars/male_patient.png"
    },
]

export function RefillsWidget() {
    return (
        <WidgetContainer
            title="Refills"
            headerAction={<Button size="sm" variant="default" className="h-7 text-xs font-bold rounded-full px-4">Fill All</Button>}
            contentClassName="flex flex-col gap-3"
        >
            <div className="flex items-center gap-2 shrink-0">
                <div className="h-2 w-2 rounded-full bg-primary/60"></div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider opacity-80">6 Urgent Tasks</span>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="flex flex-col gap-3 pb-4">
                    {refills.map((refill) => (
                        <div key={refill.id} className="border rounded-xl p-4 flex flex-col gap-3 bg-card hover:bg-muted/30 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={refill.avatar} alt={refill.patient} />
                                        <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">{refill.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-sm leading-none mb-0.5">{refill.patient}</div>
                                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider opacity-70">{refill.doctor}</div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-foreground">{refill.daysSupply}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-border/50 pt-2 mt-1">
                                <div className="font-bold text-xs text-foreground/80">{refill.medication}</div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider opacity-60 scale-90 origin-right">{refill.lastFilled}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

