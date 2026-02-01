"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WidgetContainer } from "@/components/ui/widget-container"
import { Pricing } from "@/components/ui/pricing-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Building03Icon,
    SecurityIcon,
    Alert02Icon,
    Clock01Icon,
    Money03Icon,
    Tick02Icon,
    SparklesIcon,
    ChartMediumIcon,
    Settings01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { DesignSystem } from "@/lib/design-system"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"
import { PriorityActionsModule, PriorityActionsHeaderAction, PriorityActionsTitleBadge } from "@/components/voice-canvas/modules/PriorityActionsModule"
import { DeniedClaimsModule, DeniedClaimsHeaderAction } from "@/components/voice-canvas/modules/DeniedClaimsModule"
import { PatientCheckInModule } from "@/components/voice-canvas/modules/PatientCheckInModule"
import { ActionsDetailModule } from "@/components/dashboard/actions-detail-module"

// Sample data for demos
const sampleMessages = [
    {
        id: 1,
        sender: "Office: Appointment Request",
        preview: "3 voicemails need follow-up",
        time: "5 MIN AGO",
        unread: true,
        type: "office",
        icon: Building03Icon,
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
        unread: false,
        type: "insurance",
        icon: SecurityIcon,
    },
]

export function ModulesSection() {
    return (
        <section id="modules" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Modules</h2>
                <p className="text-muted-foreground">Reusable dashboard widget patterns for consistent UX across screens.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Widget Container - Universal Background Component */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Widget Container</h3>
                                <p className="text-sm text-muted-foreground">Universal background component for all widgets and modules. Update once, propagate everywhere.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Core Component</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <div className="h-[200px]">
                                <WidgetContainer
                                    title="Example Widget"
                                    headerAction={<Button variant="secondary" size="sm" className="h-7 text-xs font-bold rounded-md">Action</Button>}
                                >
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        <p className="text-sm">Widget content goes here. This container provides consistent background, shadows, and header styling.</p>
                                    </div>
                                </WidgetContainer>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Usage:</strong> Import <code className="bg-muted px-1 rounded">WidgetContainer</code> from <code className="bg-muted px-1 rounded">@/components/ui/widget-container</code>.<br />
                                <strong>Props:</strong> <code className="bg-muted px-1 rounded">title</code> (required), <code className="bg-muted px-1 rounded">headerAction</code> (optional), <code className="bg-muted px-1 rounded">children</code>, <code className="bg-muted px-1 rounded">className</code>, <code className="bg-muted px-1 rounded">contentClassName</code>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Dropdown Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Dropdown / Select</h3>
                                <p className="text-sm text-muted-foreground">Standardized selection component with interaction states.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Core Component</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden p-8 flex items-center justify-center bg-card">
                            <DropdownModuleDemo />
                        </div>
                        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Usage:</strong> Import <code className="bg-muted px-1 rounded">Select</code> components from <code className="bg-muted px-1 rounded">@/components/ui/select</code>.<br />
                                <strong>Note:</strong> Selected functionality uses <code className="bg-muted px-1 rounded">growth-3</code> for focus state to ensure visibility.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Messages Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Messages Module</h3>
                                <p className="text-sm text-muted-foreground">Unified inbox pattern for all message types.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Home, Billing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <MessagesModuleDemo />
                        </div>
                        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Usage:</strong> Import <code className="bg-muted px-1 rounded">MessagesWidget</code> from <code className="bg-muted px-1 rounded">@/components/dashboard/messages-widget</code>.
                                Customize the <code className="bg-muted px-1 rounded">messages</code> array with context-specific data.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Schedule Module</h3>
                                <p className="text-sm text-muted-foreground">Timeline view of appointments with status and priority actions.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Home</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <ScheduleModuleDemo />
                        </div>
                        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Usage:</strong> Import <code className="bg-muted px-1 rounded">ScheduleWidget</code> from <code className="bg-muted px-1 rounded">@/components/dashboard/schedule-widget</code>.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Pricing Module</h3>
                                <p className="text-sm text-muted-foreground">Strategic pricing view with highlighted tiers.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Pricing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl bg-background">
                            <Pricing
                                title="Pricing"
                                subtitle="Flexible plans for your practice"
                                className="py-8"
                                tiers={[
                                    {
                                        name: "Starter",
                                        description: "Perfect for solo practitioners and new practices. Complete scheduling, EHR, patient portal, and billing in one platform.",
                                        price: 249,
                                        billingPeriod: "per provider/month",
                                        buttonText: "Get Started",
                                        buttonVariant: "secondary",
                                        hasAnnualToggle: true,
                                        creditOptions: ["1,000 messages / month", "2,500 messages / month", "5,000 messages / month"],
                                        defaultCredits: "1,000 messages / month",
                                        priceByOption: {
                                            "1,000 messages / month": 249,
                                            "2,500 messages / month": 299,
                                            "5,000 messages / month": 349,
                                        },
                                        featuresTitle: "Small Practice (1-2 providers):",
                                        features: [
                                            { text: "Full practice management platform included" },
                                            { text: "48-hour email support from PM experts" },
                                            { text: "AI automation for notes & scheduling" },
                                            { text: "Branded patient portal with self-booking" },
                                            { text: "Public-facing practice pages" },
                                        ]
                                    },
                                    {
                                        name: "Professional",
                                        description: "Designed for growing practices building together. Priority support, faster implementation, and workflows that adapt to your team.",
                                        price: 349,
                                        billingPeriod: "per provider/month",
                                        buttonText: "Get Started",
                                        buttonVariant: "default",
                                        isPrimary: true,
                                        popularTag: "Most Popular",
                                        hasAnnualToggle: true,
                                        creditOptions: ["5,000 messages / month", "10,000 messages / month", "15,000 messages / month"],
                                        defaultCredits: "5,000 messages / month",
                                        priceByOption: {
                                            "5,000 messages / month": 349,
                                            "10,000 messages / month": 449,
                                            "15,000 messages / month": 549,
                                        },
                                        featuresTitle: "Medium Practice (3-8 providers), plus:",
                                        features: [
                                            { text: "Priority phone + email support, 24hr response" },
                                            { text: "Priority implementation—get live faster" },
                                            { text: "Advanced patient portal capabilities" },
                                            { text: "Custom workflows that match your operations" },
                                            { text: "Role-based permissions for team security" },
                                            { text: "Secure private project workspace" },
                                        ]
                                    },
                                    {
                                        name: "Billing Services",
                                        description: "Full-service revenue cycle management for billing-intensive practices. Expert billing teams handle claims and collections.",
                                        priceLabel: "2.5%",
                                        billingPeriod: "of claims processed",
                                        buttonText: "Get Started",
                                        buttonVariant: "secondary",
                                        hasAnnualToggle: true,
                                        featuresTitle: "All features in Professional, plus:",
                                        creditOptions: ["$150K - $500K claims/month", "$500K - $1M claims/month", "$1M+ claims/month"],
                                        defaultCredits: "$150K - $500K claims/month",
                                        priceByOption: {
                                            "$150K - $500K claims/month": "2.5%",
                                            "$500K - $1M claims/month": "2.25%",
                                            "$1M+ claims/month": "2.0%",
                                        },
                                        features: [
                                            { text: "Full platform + professional billing services" },
                                            { text: "Your dedicated billing specialists team" },
                                            { text: "Expert claim scrubbing maximizes reimbursement" },
                                            { text: "Professional revenue cycle management" },
                                            { text: "Specialty-specific billing expertise & support" },
                                            { text: "Flexible billing workflows for unique contracts" },
                                        ]
                                    },
                                    {
                                        name: "Enterprise",
                                        description: "Built for large organizations needing flexibility and scale. Dedicated support, custom integrations, and enterprise security.",
                                        priceLabel: "Custom",
                                        billingPeriod: "contact for pricing",
                                        buttonText: "Book a Demo",
                                        buttonVariant: "secondary",
                                        featuresTitle: "Everything in Professional, plus:",
                                        features: [
                                            { text: "Dedicated account manager + concierge support" },
                                            { text: "Custom integrations connect your systems" },
                                            { text: "Multi-location management with unified oversight" },
                                            { text: "Advanced security meets regulatory requirements" },
                                            { text: "Streamlined group-based access controls" },
                                            { text: "Built for 10+ providers and expanding organizations" },
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Tasks Module */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Tasks Module</h3>
                                <p className="text-sm text-muted-foreground">Checklist of pending actions.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Home</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <TasksModuleDemo />
                        </div>
                    </CardContent>
                </Card>

                {/* Refills Module */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Refills Module</h3>
                                <p className="text-sm text-muted-foreground">Medication refill requests queue.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Home</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <RefillsModuleDemo />
                        </div>
                    </CardContent>
                </Card>


                {/* Metric Card Module */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Metric Card Module</h3>
                                <p className="text-sm text-muted-foreground">KPI display with optional chart and action.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Billing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <MetricCardDemo
                                title="Monthly AI Impact"
                                value="$18,694"
                                subtitle="+23% vs last month"
                                showChart
                            />
                            <MetricCardDemo
                                title="Revenue Optimization"
                                value="$3,247"
                                description="Potential revenue recovery"
                                actionLabel="Review Claims"
                                icon={Money03Icon}
                            />
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Props:</strong> <code className="bg-muted px-1 rounded">title</code>, <code className="bg-muted px-1 rounded">value</code>, <code className="bg-muted px-1 rounded">description</code>, <code className="bg-muted px-1 rounded">actionLabel</code>, <code className="bg-muted px-1 rounded">icon</code>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Alert Item Module */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Alert Item Module</h3>
                                <p className="text-sm text-muted-foreground">Status indicators with actions.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Billing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <AlertItemDemo
                                title="Denial Spikes"
                                description="Unusual rate for CPT 99213"
                                icon={Alert02Icon}
                                color="text-remedy"
                                bg="bg-remedy/10"
                            />
                            <AlertItemDemo
                                title="Aging A/R"
                                description="$12k outstanding > 90 days"
                                icon={Clock01Icon}
                                color="text-neuron"
                                bg="bg-neuron/10"
                            />
                            <AlertItemDemo
                                title="Collection Forecast"
                                description="15% predicted increase"
                                icon={ChartMediumIcon}
                                color="text-growth-2"
                                bg="bg-growth-2/10"
                            />
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                                <strong>Props:</strong> <code className="bg-muted px-1 rounded">title</code>, <code className="bg-muted px-1 rounded">description</code>, <code className="bg-muted px-1 rounded">icon</code>, <code className="bg-muted px-1 rounded">color</code>, <code className="bg-muted px-1 rounded">bg</code>, <code className="bg-muted px-1 rounded">action</code>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Process Stats Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Process Stats Bar</h3>
                                <p className="text-sm text-muted-foreground">High-contrast status bar for real-time AI agents.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Billing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden p-6 bg-card/50">
                            <ProcessStatsDemo />
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Metric Module */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Financial Metric Radial</h3>
                                <p className="text-sm text-muted-foreground">Radial progress indicator for financial KPIs.</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Used on: Billing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FinancialMetricDemo
                                label="Collections Rate"
                                value="92.4%"
                                percentage={92.4}
                                colorClass="bg-growth-2"
                            />
                            <FinancialMetricDemo
                                label="Denial Rate"
                                value="2.8%"
                                percentage={2.8}
                                colorClass="bg-remedy"
                            />
                            <FinancialMetricDemo
                                label="Clean Claim Rate"
                                value="91.7%"
                                percentage={91.7}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Compliant Widget Examples - 100% Design System */}
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Priority Actions Widget</h3>
                                <p className="text-sm text-muted-foreground">100% Design System Compliant. Displays urgent tasks requiring immediate attention.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Final</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden h-[400px]">
                            <WidgetContainer
                                title="Priority Actions"
                                titleSuffix={<PriorityActionsTitleBadge />}
                                headerAction={<PriorityActionsHeaderAction />}
                            >
                                <PriorityActionsModule />
                            </WidgetContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Denied Claims Widget</h3>
                                <p className="text-sm text-muted-foreground">100% Design System Compliant. Displays claims that have been denied.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Final</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden h-[400px]">
                            <WidgetContainer
                                title="Denied Claims"
                                headerAction={<DeniedClaimsHeaderAction />}
                            >
                                <DeniedClaimsModule />
                            </WidgetContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Patient Check-In Widget</h3>
                                <p className="text-sm text-muted-foreground">100% Design System Compliant. Displays the patient check-in queue.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Final</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <PatientCheckInModule />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold">Actions Detail Module</h3>
                                <p className="text-sm text-muted-foreground">100% Design System Compliant. Displays detailed patient actions.</p>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-growth-4 text-growth-1">Final</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl overflow-hidden">
                            <ActionsDetailModule />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

// Demo Components

function MessagesModuleDemo() {
    return (
        <Card className="border-none shadow-none h-[280px] flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 shrink-0">
                <h2 className="text-lg font-bold">Messages</h2>
                <Button variant="secondary" size="sm" className="h-7 text-xs font-bold rounded-md">Inbox</Button>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex-1 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-2">
                        {sampleMessages.map((msg) => {
                            const isSystemMessage = msg.type !== 'patient';
                            return (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex items-center justify-between p-3 border rounded-lg transition-colors",
                                        msg.unread ? "bg-card hover:bg-muted/30" : "hover:bg-muted/20"
                                    )}
                                >
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        {isSystemMessage ? (
                                            <div className="h-8 w-8 rounded-full bg-growth-2 flex items-center justify-center shrink-0">
                                                <HugeiconsIcon icon={msg.icon!} className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                        ) : (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={msg.avatar} alt={msg.sender} />
                                                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                                    {msg.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm text-foreground">{msg.sender}</div>
                                            <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-60">{msg.time}</span>
                                        {msg.unread && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function MetricCardDemo({ title, value, subtitle, description, actionLabel, icon: Icon, showChart }: {
    title: string
    value?: string
    subtitle?: string
    description?: string
    actionLabel?: string
    icon?: any
    showChart?: boolean
}) {
    return (
        <div className="rounded-xl flex flex-col justify-between bg-card shadow-sm border p-4 h-full min-h-[160px]">
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <span className="font-medium text-muted-foreground text-xs">{title}</span>
                    {Icon && <HugeiconsIcon icon={Icon} className="h-4 w-4 text-muted-foreground opacity-70" />}
                </div>
                {value && (
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xl font-normal tracking-tight">{value}</span>
                        {subtitle && <span className="text-[10px] text-muted-foreground">{subtitle}</span>}
                    </div>
                )}
                {showChart && (
                    <div className="h-8 w-full">
                        <ChartContainer config={{}} className="h-full w-full">
                            <AreaChart data={[{ v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }]}>
                                <Area
                                    dataKey="v"
                                    type="natural"
                                    fill="var(--growth-1)"
                                    fillOpacity={0.2}
                                    stroke="var(--growth-1)"
                                    strokeWidth={1.5}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                )}
                {description && <p className="text-[10px] text-muted-foreground leading-snug">{description}</p>}
            </div>
            {actionLabel && (
                <Button variant="secondary" size="sm" className="rounded-full font-bold text-xs mt-3 w-full h-7">
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

function AlertItemDemo({ title, description, icon: Icon, color = "text-foreground", bg = "bg-muted" }: {
    title: string
    description: string
    icon?: any
    color?: string
    bg?: string
}) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-card shadow-sm border p-3 gap-3">
            <div className="flex items-center gap-3 min-w-0">
                {Icon && (
                    <div className={cn("rounded-full flex items-center justify-center shrink-0 h-7 w-7", bg, color)}>
                        <HugeiconsIcon icon={Icon} className="h-3.5 w-3.5" />
                    </div>
                )}
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-foreground">{title}</span>
                    <span className="text-xs text-muted-foreground truncate">{description}</span>
                </div>
            </div>
            <Button variant="secondary" size="sm" className="font-bold rounded-md h-6 text-[10px] shrink-0">
                View
            </Button>
        </div>
    )
}

function ScheduleModuleDemo() {
    const appointments = [
        {
            id: 1,
            time: "9:00 AM",
            patient: "Sarah Johnson",
            type: "ANNUAL PHYSICAL",
            doctor: "Dr. Patel",
            status: "ENDED",
            room: "Room 101",
            initials: "SJ"
        },
        {
            id: 4,
            time: "9:30 AM",
            patient: "Michael Chen",
            type: "DIABETES FOLLOW-UP",
            doctor: "Dr. Patel",
            status: "IN PROGRESS",
            room: "Room 101",
            initials: "MC"
        },
        {
            id: 6,
            time: "10:00 AM",
            patient: "Emily Rodriguez",
            type: "BLOOD WORK",
            doctor: "Dr. Patel",
            status: "SCHEDULED",
            room: "Room 101",
            initials: "ER"
        },
    ]

    return (
        <WidgetContainer
            title="Today's Schedule"
            headerAction={
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jan 3</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted text-[10px] h-5">3 Total</Badge>
                </div>
            }
            contentClassName="flex flex-col gap-4"
            className="h-[320px]"
        >
            <div className="bg-vitality-4/50 rounded-xl px-4 py-3 flex items-center justify-between border border-border/50 shrink-0 gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">MC</div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-70">Priority</span>
                            <HugeiconsIcon icon={Settings01Icon} className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="font-bold text-sm leading-none truncate">Michael Chen arriving</div>
                    </div>
                </div>
                <Button variant="default" size="sm" className="rounded-full px-4 font-bold h-7 text-xs shrink-0">Check-in</Button>
            </div>

            <ScrollArea className="flex-1 -mx-6 px-6 min-h-0">
                <div className="flex flex-col gap-1 pb-4">
                    {appointments.map((apt) => (
                        <div
                            key={apt.id}
                            className={cn(
                                "flex items-center py-2 px-3 rounded-lg border-b border-border/40 last:border-0",
                                apt.status === 'ENDED' ? 'bg-muted/20' :
                                    (apt.status === 'IN PROGRESS' ? 'bg-card shadow-sm border' : '')
                            )}
                        >
                            <div className="w-16 shrink-0 flex items-center gap-1 text-muted-foreground font-medium text-xs">
                                <HugeiconsIcon icon={Clock01Icon} className="h-3 w-3 opacity-50" />
                                {apt.time.split(' ')[0]}
                            </div>

                            <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                                <div className="h-7 w-7 rounded-full bg-growth-4 text-growth-1 flex items-center justify-center text-[10px] font-bold shrink-0">{apt.initials}</div>
                                <div className="min-w-0">
                                    <div className="font-bold text-xs leading-none mb-0.5 truncate">{apt.patient}</div>
                                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider opacity-80 truncate">{apt.type}</div>
                                </div>
                            </div>

                            <div className="shrink-0 flex justify-center">
                                <Badge
                                    variant={apt.status === 'ENDED' ? 'secondary' : (apt.status === 'IN PROGRESS' ? 'success' : 'outline')}
                                    className="rounded-md px-1.5 py-0 text-[10px] uppercase tracking-wider font-bold border-0 h-5"
                                >
                                    {apt.status === 'SCHEDULED' ? 'Next' : apt.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

function TasksModuleDemo() {
    const tasks = [
        {
            id: 1,
            title: "Verify insurance eligibility",
            subtitle: "14 PATIENTS SCHEDULED",
            action: "Start",
            icon: Tick02Icon,
        },
        {
            id: 3,
            title: "Answer calls & messages",
            subtitle: "8 NEW • 3 VOICEMAILS",
            action: "View",
            icon: Tick02Icon,
        },
    ]

    return (
        <WidgetContainer
            title="Tasks"
            headerAction={<Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted text-[10px] h-5">2 Pending</Badge>}
            className="h-[200px]"
        >
            <ScrollArea className="h-full">
                <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-xl bg-card">
                            <div className="flex items-start gap-3 min-w-0">
                                <div className="h-7 w-7 mt-0.5 rounded-[12px] bg-neuron flex items-center justify-center shrink-0">
                                    <HugeiconsIcon icon={task.icon} className="h-3.5 w-3.5 text-amino" strokeWidth={3} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-xs text-foreground truncate">{task.title}</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-70 truncate">{task.subtitle}</div>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" className="h-6 rounded-full px-3 font-semibold text-[10px] border-border/60 ml-2 shrink-0">{task.action}</Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

function RefillsModuleDemo() {
    const refills = [
        {
            id: 1,
            patient: "Margaret Sullivan",
            medication: "Metformin 500mg",
            daysSupply: "5D",
            initials: "MS"
        },
        {
            id: 2,
            patient: "Kevin Martinez",
            medication: "Sertraline 50mg",
            daysSupply: "4D",
            initials: "KM"
        },
    ]

    return (
        <WidgetContainer
            title="Refills"
            headerAction={<Button size="sm" variant="default" className="h-6 text-[10px] font-bold rounded-full px-3">Fill All</Button>}
            contentClassName="flex flex-col gap-3"
            className="h-[200px]"
        >
            <div className="flex items-center gap-2 shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/60"></div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-80">2 Urgent</span>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="flex flex-col gap-2">
                    {refills.map((refill) => (
                        <div key={refill.id} className="border rounded-xl p-3 flex flex-col gap-1.5 bg-card">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">{refill.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-bold text-xs leading-none">{refill.patient}</div>
                                </div>
                                <span className="text-[10px] font-bold text-foreground">{refill.daysSupply}</span>
                            </div>
                            <div className="font-bold text-[10px] text-foreground/80 pl-8">{refill.medication}</div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </WidgetContainer>
    )
}

function ProcessStatsDemo() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <div className="flex flex-col gap-1 shrink-0">
                <span className="font-bold text-foreground text-lg">AI Agents Processes</span>
                <Badge variant="secondary" className="font-normal w-fit px-2 py-0.5">In Progress</Badge>
            </div>

            <div className="flex-1 w-full rounded-xl bg-card border border-border/50 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="flex items-center justify-between divide-x divide-border relative z-10">
                    <div className="first:pl-0 flex-1 text-center px-4">
                        <ProcessStatDemo value="47" label="Claim Processing" />
                    </div>
                    <div className="flex-1 text-center px-4">
                        <ProcessStatDemo value="12" label="Denial Prevention" />
                    </div>
                    <div className="flex-1 text-center px-4">
                        <ProcessStatDemo value="8" label="Revenue Forecasting" />
                    </div>
                    <div className="last:pr-0 flex-1 text-center px-4">
                        <ProcessStatDemo value="23" label="Analysis" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProcessStatDemo({ value, label }: { value: string, label: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="font-normal tracking-tight text-2xl">{value}</span>
            <span className="font-medium text-muted-foreground text-xs">{label}</span>
        </div>
    )
}

function FinancialMetricDemo({ label, value, percentage, colorClass = "bg-primary" }: { label: string, value: string, percentage: number, colorClass?: string }) {
    const chartColor = React.useMemo(() => {
        if (colorClass === "bg-growth-2") return "var(--growth-2)"
        if (colorClass === "bg-remedy") return "var(--remedy)"
        return "var(--primary)"
    }, [colorClass])

    const chartData = [{ value: percentage, fill: chartColor }]

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-card">
            <div className="relative h-32 w-32">
                <ChartContainer config={{}} className="h-full w-full mx-auto aspect-square">
                    <RadialBarChart
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        innerRadius={DesignSystem.chart.innerRadius}
                        outerRadius={DesignSystem.chart.outerRadius}
                        barSize={DesignSystem.chart.barSize}
                        data={chartData}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background
                            dataKey="value"
                            cornerRadius={DesignSystem.chart.radius}
                        />
                    </RadialBarChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="font-bold text-foreground text-xl">{value}</span>
                </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
                <span className="font-medium text-muted-foreground text-sm">{label}</span>
            </div>
        </div>
    )
}

function DropdownModuleDemo() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Select Plan
                </label>
                <Select defaultValue="professional">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="starter">Starter Plan</SelectItem>
                        <SelectItem value="professional">Professional Plan</SelectItem>
                        <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Billing Frequency
                </label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
