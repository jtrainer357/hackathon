"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WidgetContainer } from "@/components/ui/widget-container"
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import {
    Clock01Icon,
    Location01Icon,
    Settings01Icon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const appointments = [
    {
        id: 1,
        time: "9:00 AM",
        patient: "Sarah Johnson",
        type: "ANNUAL PHYSICAL",
        doctor: "Dr. Patel",
        status: "ENDED",
        room: "Room 101",
        avatar: "/avatars/patients/patient_sarah_johnson_1767820106080.png",
        initials: "SJ"
    },
    {
        id: 2,
        time: "9:00 AM",
        patient: "David Martin",
        type: "THERAPY SESSION",
        doctor: "Dr. Morrison",
        status: "ENDED",
        room: "Room 201",
        initials: "DM"
    },
    {
        id: 3,
        time: "9:15 AM",
        patient: "Tyler Rodriguez",
        type: "WELL CHILD VISIT",
        doctor: "Dr. Chen",
        status: "ENDED",
        room: "Room 103",
        avatar: "/avatars/patients/patient_tyler_rodriguez_1767820133299.png",
        initials: "TR"
    },
    {
        id: 4,
        time: "9:30 AM",
        patient: "Michael Chen",
        type: "DIABETES FOLLOW-UP",
        doctor: "Dr. Patel",
        status: "IN PROGRESS",
        room: "Room 101",
        avatar: "/avatars/male_patient.png",
        initials: "MC"
    },
    {
        id: 5,
        time: "9:45 AM",
        patient: "Emma Johnson",
        type: "SPORTS PHYSICAL",
        doctor: "Dr. Chen",
        status: "CHECKED IN",
        room: "Room 103",
        initials: "EJ"
    },
    {
        id: 6,
        time: "10:00 AM",
        patient: "Emily Rodriguez",
        type: "BLOOD WORK",
        doctor: "Dr. Patel",
        status: "SCHEDULED",
        room: "Room 101",
        avatar: "/avatars/patients/patient_emily_rodriguez_1767820176184.png",
        initials: "ER"
    },
    {
        id: 7,
        time: "10:15 AM",
        patient: "John Doe",
        type: "FOLLOW-UP",
        doctor: "Dr. Morrison",
        status: "SCHEDULED",
        room: "Room 202",
        avatar: "/avatars/patients/patient_john_doe_1767820190442.png",
        initials: "JD"
    },
    {
        id: 8,
        time: "10:30 AM",
        patient: "Jane Smith",
        type: "CONSULTATION",
        doctor: "Dr. Chen",
        status: "SCHEDULED",
        room: "Room 105",
        avatar: "/avatars/patients/patient_jane_smith_1767820204020.png",
        initials: "JS"
    },
    {
        id: 9,
        time: "10:45 AM",
        patient: "Robert White",
        type: "X-RAY",
        doctor: "Dr. Patel",
        status: "SCHEDULED",
        room: "Room 101",
        avatar: "/avatars/patients/patient_robert_white_1767820217251.png",
        initials: "RW"
    },
    {
        id: 10,
        time: "11:00 AM",
        patient: "Lisa Brown",
        type: "WELLNESS EXAM",
        doctor: "Dr. Morrison",
        status: "SCHEDULED",
        room: "Room 201",
        avatar: "/avatars/patients/patient_lisa_brown_1767820234893.png",
        initials: "LB"
    },
    {
        id: 11,
        time: "11:15 AM",
        patient: "Kevin Garcia",
        type: "EYE EXAM",
        doctor: "Dr. Chen",
        status: "SCHEDULED",
        room: "Room 103",
        avatar: "/avatars/patients/patient_kevin_garcia_1767820248580.png",
        initials: "KG"
    },
    {
        id: 12,
        time: "11:30 AM",
        patient: "Mary Martinez",
        type: "VACCINATION",
        doctor: "Dr. Patel",
        status: "SCHEDULED",
        room: "Room 101",
        avatar: "/avatars/patients/patient_mary_martinez_1767820262853.png",
        initials: "MM"
    },
    {
        id: 13,
        time: "11:45 AM",
        patient: "James Wilson",
        type: "PHYSICAL",
        doctor: "Dr. Morrison",
        status: "SCHEDULED",
        room: "Room 205",
        avatar: "/avatars/male_patient.png",
        initials: "JW"
    },
    {
        id: 14,
        time: "12:00 PM",
        patient: "Patricia Lee",
        type: "DENTAL CHECKUP",
        doctor: "Dr. Chen",
        status: "SCHEDULED",
        room: "Room 103",
        avatar: "/avatars/elderly_patient.png",
        initials: "PL"
    },
    {
        id: 15,
        time: "12:15 PM",
        patient: "William Taylor",
        type: "SKIN EXAM",
        doctor: "Dr. Patel",
        status: "SCHEDULED",
        room: "Room 101",
        avatar: "/avatars/male_patient.png",
        initials: "WT"
    },
    {
        id: 16,
        time: "12:30 PM",
        patient: "Barbara Thomas",
        type: "CONSULTATION",
        doctor: "Dr. Morrison",
        status: "SCHEDULED",
        room: "Room 202",
        avatar: "/avatars/female_patient.png",
        initials: "BT"
    },
    {
        id: 17,
        time: "12:45 PM",
        patient: "Richard Moore",
        type: "FLU SHOT",
        doctor: "Dr. Chen",
        status: "SCHEDULED",
        room: "Room 103",
        avatar: "/avatars/male_patient.png",
        initials: "RM"
    },
    {
        id: 18,
        time: "1:00 PM",
        patient: "Linda Jackson",
        type: "ALLERGY TEST",
        doctor: "Dr. Patel",
        status: "SCHEDULED",
        room: "Room 101",
        avatar: "/avatars/elderly_patient.png",
        initials: "LJ"
    },
]

export function ScheduleWidget() {
    return (
        <WidgetContainer
            title="Today's Schedule"
            headerAction={
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Saturday, Jan 3</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">39 Appointments</Badge>
                </div>
            }
            contentClassName="flex flex-col gap-4"
        >
            {/* Priority Action Card */}
            <div className="bg-vitality-4 rounded-xl px-6 py-4 flex items-center justify-between border border-border/50 shrink-0">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background">
                        <AvatarImage src="/avatars/male_patient.png" alt="Michael Chen" />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">MC</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-70">Priority Action</span>
                            <HugeiconsIcon icon={Settings01Icon} className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="font-bold text-lg leading-none mb-1">Michael Chen is arriving</div>
                        <div className="text-sm text-muted-foreground">9:30 AM appointment • Room 101</div>
                    </div>
                </div>
                <Button variant="default" className="rounded-full px-6 font-bold">Begin Check-in</Button>
            </div>

            {/* Appointment List with ScrollArea */}
            <ScrollArea className="flex-1 -mx-widget-padding-x px-widget-padding-x min-h-0">
                <div className="flex flex-col gap-1 pb-4">
                    {appointments.map((apt) => (
                        <div
                            key={apt.id}
                            className={cn(
                                "group flex items-center py-3 px-6 rounded-lg transition-all border-b border-border/40 last:border-0 cursor-pointer",
                                apt.status === 'ENDED' ? 'bg-core-4 hover:bg-core-3' :
                                    (apt.status === 'IN PROGRESS' || apt.status === 'CHECKED IN' ? 'bg-card shadow-sm hover:shadow-md' : 'hover:bg-muted/40')
                            )}
                        >
                            <div className="w-28 shrink-0 flex items-center gap-2 text-muted-foreground font-medium text-sm">
                                <HugeiconsIcon icon={Clock01Icon} className="h-5 w-5 opacity-50" />
                                {apt.time}
                            </div>

                            <div className="flex items-center gap-3 w-64 shrink-0 mr-8">
                                <Avatar className="h-9 w-9">
                                    {apt.avatar && <AvatarImage src={apt.avatar} alt={apt.patient} />}
                                    <AvatarFallback className="bg-growth-4 text-growth-1 text-xs font-bold">{apt.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-sm leading-none mb-0.5">{apt.patient}</div>
                                    {apt.type && <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider opacity-80">{apt.type}</div>}
                                </div>
                            </div>

                            <div className="w-48 font-medium text-sm px-4 shrink-0">
                                {apt.doctor}
                            </div>

                            <div className="flex-1 flex justify-center">
                                <Badge
                                    variant={
                                        apt.status === 'ENDED' ? 'secondary' :
                                            (apt.status === 'IN PROGRESS' || apt.status === 'CHECKED IN' ? 'success' : 'outline')
                                    }
                                    className={cn(
                                        "rounded-md px-2 py-0.5 text-xs uppercase tracking-wider font-bold border-0",
                                        apt.status === 'SCHEDULED' && "bg-muted/50 text-muted-foreground"
                                    )}
                                >
                                    {apt.status}
                                </Badge>
                            </div>

                            <div className="w-28 flex items-center justify-end gap-1 text-muted-foreground text-xs font-medium shrink-0">
                                <HugeiconsIcon icon={Location01Icon} className="h-4 w-4" />
                                {apt.room}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

