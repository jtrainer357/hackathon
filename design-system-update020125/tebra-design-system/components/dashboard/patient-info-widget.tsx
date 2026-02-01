// Widget: Patient Information Widget
// Patterns applied: Glassmorphism Backgrounds, No Black Backgrounds, Icon Circle Treatment, Minimum Font Size
// Reference: Design System Widget Builder Skill v2.0

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Calendar03Icon,
    Call02Icon,
    Mail01Icon,
    MedicalFileIcon,
    MoreVerticalIcon,
    UserIcon,
} from "@hugeicons/core-free-icons"

interface PatientInfoWidgetProps {
    patient?: {
        name: string
        status: "active" | "inactive"
        avatar?: string
        dob: string
        age: number
        phone: string
        email: string
        insurance: string
    }
}

export function PatientInfoWidget({ patient }: PatientInfoWidgetProps) {
    // Default demo data
    const defaultPatient = {
        name: "Sarah Johnson",
        status: "active" as const,
        avatar: undefined,
        dob: "03/15/1985",
        age: 40,
        phone: "(555) 123-4567",
        email: "sarah.j@email.com",
        insurance: "Blue Cross Blue Shield",
    }

    const patientData = patient || defaultPatient

    return (
        <div className="bg-card/65 backdrop-blur-sm rounded-2xl shadow-widget p-6 border-none overflow-hidden">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12 shrink-0">
                    {patientData.avatar ? (
                        <AvatarImage src={patientData.avatar} alt={patientData.name} />
                    ) : null}
                    <AvatarFallback className="bg-growth-4 text-growth-1">
                        <HugeiconsIcon icon={UserIcon} className="h-6 w-6" strokeWidth={2} />
                    </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Name and Status */}
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-lg text-foreground">{patientData.name}</h3>
                        <Badge
                            variant="default"
                            className="bg-synapse-1 text-synapse-6 text-xs font-bold uppercase px-2 py-0.5"
                        >
                            {patientData.status}
                        </Badge>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* DOB/Age */}
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon
                                icon={Calendar03Icon}
                                className="h-4 w-4 text-growth-1 shrink-0"
                                strokeWidth={2}
                            />
                            <span className="text-sm text-muted-foreground">
                                DOB: {patientData.dob} (Age {patientData.age})
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon
                                icon={Call02Icon}
                                className="h-4 w-4 text-growth-1 shrink-0"
                                strokeWidth={2}
                            />
                            <span className="text-sm text-muted-foreground">{patientData.phone}</span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon
                                icon={Mail01Icon}
                                className="h-4 w-4 text-growth-1 shrink-0"
                                strokeWidth={2}
                            />
                            <span className="text-sm text-muted-foreground">{patientData.email}</span>
                        </div>

                        {/* Insurance */}
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon
                                icon={MedicalFileIcon}
                                className="h-4 w-4 text-growth-1 shrink-0"
                                strokeWidth={2}
                            />
                            <span className="text-sm text-muted-foreground">{patientData.insurance}</span>
                        </div>
                    </div>
                </div>

                {/* More Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="shrink-0">
                            <HugeiconsIcon icon={MoreVerticalIcon} className="h-5 w-5" strokeWidth={2} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
