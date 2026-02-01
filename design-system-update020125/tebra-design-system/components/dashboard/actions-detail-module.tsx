"use client"

import React from "react"
import { WidgetContainer } from "@/components/ui/widget-container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    File01Icon,
    UserIcon,
    Stethoscope02Icon,
    Tick02Icon,
    SparklesIcon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface ActionsDetailModuleProps {
    className?: string
    onCancel?: () => void
    onComplete?: () => void
}

// Mock Data for Demo
const mockPatient = {
    name: "Michael Chen",
    mrn: "45821",
    dob: "03/15/1967",
    age: 58,
    primaryDx: "Type 2 Diabetes"
}

const mockLabResults = [
    { name: "Hemoglobin A1C", trend: "0.9% improvement", value: "7.2%" },
    { name: "Fasting Glucose", subtitle: "Within target range", value: "124" }
]

const mockMedications = [
    "Metformin 1000mg twice daily",
    "Lisinopril 10mg daily",
    "Atorvastatin 20mg daily"
]

const mockTaskProgress = [
    { id: 1, label: "Opened patient record", completed: true },
    { id: 2, label: "Send message", completed: false },
    { id: 3, label: "Order follow-up", completed: false }
]

const mockAISuggestions = [
    { id: 1, label: "Send congratulatory message to patient", checked: false },
    { id: 2, label: "Order 3-month A1C follow-up", checked: false },
    { id: 3, label: "Continue current medications", checked: false }
]

export function ActionsDetailModule({ className, onCancel, onComplete }: ActionsDetailModuleProps) {
    const [suggestions, setSuggestions] = React.useState(mockAISuggestions)

    const toggleSuggestion = (id: number) => {
        setSuggestions(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s))
    }

    return (
        <WidgetContainer
            title=""
            hideHeader
            className={cn("", className)}
        >
            <div className="flex flex-col h-full pt-6">


                {/* Patient Header Card */}
                <div className="mb-6">
                    <div className="bg-growth-2 text-white rounded-xl px-6 py-5 shadow-sm">
                        <h2 className="text-2xl font-bold mb-2 text-white">{mockPatient.name}</h2>
                        <div className="flex items-center gap-6 text-sm opacity-90 text-white/90">
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={File01Icon} style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} />
                                MRN: {mockPatient.mrn}
                            </div>
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={UserIcon} style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} />
                                DOB: {mockPatient.dob} ({mockPatient.age} years)
                            </div>
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={Stethoscope02Icon} style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} />
                                {mockPatient.primaryDx}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 pb-6 grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        {/* Recent Lab Results */}
                        <div>
                            <h3 className="text-lg font-bold mb-3">Recent Lab Results</h3>
                            <div className="flex flex-col gap-3">
                                {mockLabResults.map((lab, idx) => (
                                    <div key={idx} className="bg-card border rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-sm">{lab.name}</div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                {lab.trend && <span className="text-vigor">↗</span>}
                                                {lab.trend || lab.subtitle}
                                            </div>
                                        </div>
                                        <span className="font-normal tracking-tight" style={{ fontSize: 'var(--font-size-metric-value)' }}>
                                            {lab.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Suggested Actions */}
                        <div className="border-2 border-dashed border-muted rounded-xl p-4 mt-auto">
                            <div className="flex items-center gap-2 mb-3">
                                <HugeiconsIcon icon={SparklesIcon} className="text-foreground" style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} />
                                <span className="font-bold text-sm">AI Suggested Actions</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {suggestions.map((suggestion) => (
                                    <label key={suggestion.id} className="flex items-center gap-3 cursor-pointer">
                                        <Checkbox
                                            checked={suggestion.checked}
                                            onCheckedChange={() => toggleSuggestion(suggestion.id)}
                                        />
                                        <span className="text-sm text-muted-foreground">{suggestion.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        {/* Current Medications */}
                        <div className="bg-card border rounded-xl p-4">
                            <h3 className="font-bold text-sm mb-3">Current Medications</h3>
                            <ul className="flex flex-col gap-2">
                                {mockMedications.map((med, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground">• {med}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Task Progress */}
                        <div>
                            <h3 className="font-bold text-sm mb-3">Task Progress</h3>
                            <div className="flex flex-col gap-2">
                                {mockTaskProgress.map((task) => (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-3 border",
                                            task.completed ? "bg-card" : "bg-muted/30"
                                        )}
                                    >
                                        {task.completed ? (
                                            <div className="h-6 w-6 rounded-full bg-vigor flex items-center justify-center">
                                                <HugeiconsIcon icon={Tick02Icon} className="text-white" style={{ width: 'var(--size-icon-xs)', height: 'var(--size-icon-xs)' }} strokeWidth={3} />
                                            </div>
                                        ) : (
                                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                {task.id}
                                            </div>
                                        )}
                                        <span className={cn("text-sm", task.completed ? "text-foreground" : "text-muted-foreground")}>{task.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t pt-4 flex items-center justify-end gap-3 mt-auto">
                    <Button variant="secondary" className="rounded-full px-6" onClick={onCancel}>Cancel</Button>
                    <Button variant="default" className="rounded-full px-6 font-bold" onClick={onComplete}>Complete All Suggested Actions</Button>
                </div>
            </div>
        </WidgetContainer>
    )
}
