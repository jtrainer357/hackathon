"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WidgetContainer } from "@/components/ui/widget-container"
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import {
    Building03Icon,
    TestTube01Icon,
    SecurityIcon,
    MedicineBottle02Icon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const messages = [
    {
        id: 1,
        sender: "Office: Appointment Request",
        preview: "3 voicemails need follow-up",
        time: "5 MIN AGO",
        unread: true,
        type: "office",
        icon: Building03Icon,
        initials: "AP",
        avatar: "/avatars/female_doctor.png"
    },
    {
        id: 2,
        sender: "Sarah Johnson",
        preview: "Need to reschedule Tuesday appointment",
        time: "12 MIN AGO",
        unread: true,
        type: "patient",
        initials: "SJ",
        avatar: "/avatars/elderly_patient.png"
    },
    {
        id: 3,
        sender: "Insurance: BCBS",
        preview: "Coverage verification needed for Emily...",
        time: "25 MIN AGO",
        unread: true,
        type: "insurance",
        icon: SecurityIcon,
        initials: "IN",
        avatar: "/avatars/female_doctor.png"
    },
    {
        id: 4,
        sender: "Dr. Patel",
        preview: "Can you check supply order status?",
        time: "35 MIN AGO",
        unread: true,
        type: "doctor",
        initials: "DP",
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 5,
        sender: "Marcus Williams",
        preview: "Question about copay amount from last...",
        time: "48 MIN AGO",
        unread: false,
        type: "patient",
        initials: "MW",
        avatar: "/avatars/male_patient.png"
    },
    {
        id: 6,
        sender: "Lab: Quest Diagnostics",
        preview: "Lab results ready for Patricia Moore",
        time: "1 HR AGO",
        unread: false,
        type: "lab",
        icon: TestTube01Icon,
        avatar: "/avatars/female_doctor.png"
    },
    {
        id: 7,
        sender: "Michael Chen",
        preview: "Following up on my prescription",
        time: "2 HR AGO",
        unread: false,
        type: "patient",
        initials: "MC",
        avatar: "/avatars/male_patient.png"
    },
    {
        id: 8,
        sender: "Pharmacy Central",
        preview: "Stock update for Metformin",
        time: "3 HR AGO",
        unread: false,
        type: "office",
        icon: MedicineBottle02Icon,
        initials: "PC",
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 9,
        sender: "Emma Johnson",
        preview: "Thank you for the physical exam today!",
        time: "4 HR AGO",
        unread: false,
        type: "patient",
        initials: "EJ",
        avatar: "/avatars/female_patient.png"
    },
    {
        id: 10,
        sender: "Dr. Morrison",
        preview: "Patient records for 11:00 AM session",
        time: "5 HR AGO",
        unread: false,
        type: "doctor",
        initials: "DM",
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 11,
        sender: "Alice Rogers",
        preview: "New appointment request for Monday",
        time: "6 HR AGO",
        unread: false,
        type: "patient",
        initials: "AR",
        avatar: "/avatars/elderly_patient.png"
    },
    {
        id: 12,
        sender: "Quest Lab Staff",
        preview: "Correction on previous lab report",
        time: "7 HR AGO",
        unread: false,
        type: "lab",
        icon: TestTube01Icon,
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 13,
        sender: "Sarah Johnson",
        preview: "Confirmed Tuesday availability",
        time: "1 DAY AGO",
        unread: false,
        type: "patient",
        initials: "SJ",
        avatar: "/avatars/elderly_patient.png"
    },
    {
        id: 14,
        sender: "Office Admin",
        preview: "Holiday schedule update",
        time: "1 DAY AGO",
        unread: false,
        type: "office",
        icon: Building03Icon,
        initials: "OA",
        avatar: "/avatars/female_doctor.png"
    },
    {
        id: 15,
        sender: "Insurance: BCBS",
        preview: "Policy update for group plans",
        time: "1 DAY AGO",
        unread: false,
        type: "insurance",
        icon: SecurityIcon,
        initials: "IN",
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 16,
        sender: "Dr. Patel",
        preview: "Lunch meeting tomorrow?",
        time: "2 DAYS AGO",
        unread: false,
        type: "doctor",
        initials: "DP",
        avatar: "/avatars/male_doctor.png"
    },
    {
        id: 17,
        sender: "James Taylor",
        preview: "Query regarding billing",
        time: "2 DAYS AGO",
        unread: false,
        type: "patient",
        initials: "JT",
        avatar: "/avatars/male_patient.png"
    },
    {
        id: 18,
        sender: "Lab Results",
        preview: "Monthly summary available",
        time: "3 DAYS AGO",
        unread: false,
        type: "lab",
        icon: TestTube01Icon,
        avatar: "/avatars/male_doctor.png"
    },
]

export function MessagesWidget() {
    return (
        <WidgetContainer
            title="Messages"
            headerAction={<Button variant="secondary" size="sm" className="h-7 text-xs font-bold rounded-md">Inbox</Button>}
        >
            <ScrollArea className="h-full">
                <div className="flex flex-col gap-3">
                    {messages.map((msg) => {
                        const isSystemMessage = msg.type !== 'patient' && msg.type !== 'doctor';
                        return (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex items-center justify-between p-4 border rounded-xl transition-colors",
                                    msg.unread ? "bg-card hover:bg-muted/30" : "hover:bg-muted/20"
                                )}
                            >
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    {isSystemMessage ? (
                                        <div className="h-9 w-9 mt-1 rounded-full bg-growth-2 flex items-center justify-center shrink-0">
                                            <HugeiconsIcon icon={msg.icon!} className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                    ) : (
                                        <Avatar className="h-9 w-9 mt-1">
                                            <AvatarImage src={msg.avatar} alt={msg.sender} />
                                            <AvatarFallback className="bg-muted text-muted-foreground">
                                                {msg.initials || ""}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm text-foreground mb-0.5">{msg.sender}</div>
                                        <p className="text-sm text-muted-foreground truncate">{msg.preview}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-4">
                                    <span className="text-xs uppercase font-bold text-muted-foreground whitespace-nowrap opacity-60">{msg.time}</span>
                                    {msg.unread && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

