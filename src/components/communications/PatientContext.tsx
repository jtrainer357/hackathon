"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    Activity,
    ChevronRight,
    FileText,
    ClipboardList
} from "lucide-react";
import { format } from "date-fns";

interface PatientContextProps {
    patientId: string;
    className?: string;
}

export function PatientContext({ patientId, className }: PatientContextProps) {
    // Mock data - in real app, fetch based on patientId
    const nextAppointment = new Date("2026-02-06T14:00:00");
    const lastSession = new Date("2026-01-30T10:00:00");

    return (
        <div className={cn("flex flex-col h-full bg-backbone-1 border-l border-border overflow-y-auto w-[320px]", className)}>
            <div className="px-5 py-4 bg-white border-b border-border sticky top-0 z-10">
                <h3 className="text-xs font-bold text-synapse-3 uppercase tracking-wider">Patient Context</h3>
            </div>

            {/* Next Appointment Section */}
            <div className="p-5 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-synapse-3" />
                    <h4 className="text-xs font-bold text-synapse-3 uppercase tracking-wide">Next Appointment</h4>
                </div>

                <div className="mb-3">
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Scheduled</div>
                    <div className="text-sm font-bold text-foreground">
                        {format(nextAppointment, "EEEE, MMM d")}
                    </div>
                    <div className="text-sm text-foreground">
                        {format(nextAppointment, "h:mm a")}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Type</div>
                    <div className="text-sm text-foreground">Individual Therapy (50 min)</div>
                </div>

                <Button variant="default" size="sm" className="w-full">
                    Reschedule Appointment
                </Button>
            </div>

            {/* Recent Activity Section */}
            <div className="p-5 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-3.5 h-3.5 text-synapse-3" />
                    <h4 className="text-xs font-bold text-synapse-3 uppercase tracking-wide">Recent Activity</h4>
                </div>

                <div className="mb-3">
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Last Session</div>
                    <div className="text-sm text-foreground flex items-center justify-between">
                        {format(lastSession, "MMM d, yyyy")}
                        <span className="text-synapse-3 text-xs">(3 days ago)</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Last Outcome Measure</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">PHQ-9: 8</span>
                        <Badge variant="success">Improving ↓</Badge>
                    </div>
                    <div className="text-xs text-synapse-3 mt-0.5">Jan 30 - Mild Depression</div>
                </div>

                <Button variant="link" size="sm" className="p-0 h-auto">
                    View Full Chart <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
            </div>

            {/* Diagnoses Section */}
            <div className="p-5 border-b border-border">
                <h4 className="text-xs font-bold text-synapse-3 uppercase tracking-wide mb-3">Active Diagnoses</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">F41.1 GAD</Badge>
                    <Badge variant="secondary">F32.9 MDD</Badge>
                </div>
            </div>

            {/* Treatment Plan Section */}
            <div className="p-5 border-b border-border">
                <h4 className="text-xs font-bold text-synapse-3 uppercase tracking-wide mb-3">Current Treatment</h4>
                <div className="mb-3">
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Approach</div>
                    <div className="text-sm text-foreground">CBT + Mindfulness</div>
                </div>
                <div>
                    <div className="text-[11px] text-synapse-3 uppercase mb-1">Started</div>
                    <div className="text-sm text-foreground">Nov 2025 (3 months)</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5">
                <h4 className="text-xs font-bold text-synapse-3 uppercase tracking-wide mb-3">Quick Actions</h4>
                <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                        <FileText data-icon="inline-start" className="w-3.5 h-3.5" />
                        Add Session Note
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                        <ClipboardList data-icon="inline-start" className="w-3.5 h-3.5" />
                        Record Outcome Measure
                    </Button>
                </div>
            </div>
        </div>
    );
}
