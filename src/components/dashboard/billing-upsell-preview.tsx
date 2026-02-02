"use client"

import React from 'react'
import {
    SparklesIcon,
    ChartIncreaseIcon,
    Wallet01Icon,
    Alert02Icon,
    ChartColumnIcon,
    Clock01Icon,
    EyeIcon,
    LockIcon,
    ArrowRight01Icon,
} from 'hugeicons-react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
} from 'recharts'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WidgetContainer } from "@/components/ui/widget-container"

// Mock Data for Charts
const SPARKLINE_DATA = [
    { value: 40 }, { value: 35 }, { value: 55 }, { value: 20 },
    { value: 45 }, { value: 10 }, { value: 30 }, { value: 5 },
]

const PERFORMANCE_BAR_DATA = [
    40, 65, 55, 30, 45, 45, 40, 65, 55, 30, 45, 45,
]

// --- Helper Components ---

function DonutChartItem({ value, label, color }: { value: number; label: string; color: string }) {
    const data = [{ value }, { value: 100 - value }]

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center" role="img" aria-label={`${label}: ${value}%`}>
                <ResponsiveContainer width={96} height={96}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={36}
                            outerRadius={48}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="hsl(var(--muted))" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <span className="absolute font-bold text-sm text-muted-foreground">{value}%</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground mt-3">{label}</span>
        </div>
    )
}

function AlertItem({ icon: Icon }: { icon: React.ComponentType<{ size?: number; className?: string }> }) {
    return (
        <div className="flex items-center justify-between p-3 bg-muted/20 border border-border rounded-lg">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                    <Icon size={16} className="text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3 w-32 bg-muted/50 rounded" />
                </div>
            </div>
            <div className="h-6 w-16 bg-muted rounded" />
        </div>
    )
}

function MessageItem() {
    return (
        <div className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <div className="mt-1 min-w-[32px]">
                <div className="w-8 h-8 rounded-full bg-muted" />
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-10 bg-muted/50 rounded" />
                </div>
                <div className="h-3 w-full bg-muted/50 rounded" />
                <div className="h-3 w-3/4 bg-muted/50 rounded" />
            </div>
        </div>
    )
}

// --- Main Component ---

export function BillingUpsellPreview() {
    return (
        <main className="min-h-screen bg-muted/30 px-widget-padding-x py-widget-padding-y space-y-dashboard-gap">

            {/* Preview Mode Banner */}
            <section
                aria-label="Preview mode notice"
                className="bg-primary text-primary-foreground px-widget-padding-x py-4 rounded-2xl shadow-widget flex flex-col md:flex-row items-center justify-between gap-dashboard-gap border-l-4 border-accent"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-foreground/10 rounded-full">
                        <EyeIcon className="text-accent" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                            Preview Mode: Sample Data
                        </h3>
                        <p className="text-sm text-primary-foreground/80">
                            You are viewing a demonstration with <strong>simulated data</strong>. Connect your billing feed to see your real insights.
                        </p>
                    </div>
                </div>
                <Button variant="secondary" className="whitespace-nowrap font-bold shadow-sm min-h-[44px]">
                    Activate Your Data
                </Button>
            </section>

            {/* Dashboard Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-card border border-border rounded-lg shadow-sm">
                        <SparklesIcon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground leading-tight">AI Real-Time Insights</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feature Locked</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="text-xs text-muted-foreground">Upgrade to unlock</span>
                        </div>
                    </div>
                </div>
                <Badge variant="outline">DEMO VIEW</Badge>
            </header>

            {/* Top KPI Grid */}
            <section aria-label="Key performance indicators" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-gap">

                {/* Card 1: Monthly Impact */}
                <WidgetContainer title="Potential Monthly Impact" headerAction={<Badge variant="outline" className="bg-background">Sample</Badge>} cardClassName="border-dashed border-border bg-muted/10">
                    <div className="text-3xl font-bold mb-1 text-foreground">$18,694*</div>
                    <div className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                        <ChartIncreaseIcon size={14} className="text-success" />
                        <span className="text-success font-medium">+23%</span> (Industry Avg.)
                    </div>
                    <div className="h-12 w-full -mx-2 opacity-50" role="img" aria-label="Sparkline showing monthly impact trend">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SPARKLINE_DATA}>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--growth-3))"
                                    fill="hsl(var(--growth-4))"
                                    fillOpacity={0.4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </WidgetContainer>

                {/* Card 2: Revenue Optimization */}
                <WidgetContainer
                    title="Revenue Optimization"
                    headerAction={<Wallet01Icon size={16} className="text-muted-foreground" />}
                    cardClassName="border-dashed border-border bg-muted/10"
                    contentClassName="flex flex-col"
                >
                    <div className="text-3xl font-bold mb-2 text-foreground">$3,247*</div>
                    <p className="text-xs text-muted-foreground mb-4">Potential revenue recovery found in sample set</p>
                    <Button variant="default" size="sm" className="mt-auto opacity-90 w-full min-h-[44px]" disabled aria-label="Review Claims — locked feature">
                        <LockIcon size={14} className="mr-2" /> Review Claims
                    </Button>
                </WidgetContainer>

                {/* Card 3: Denial Prevention */}
                <WidgetContainer
                    title="Denial Prevention"
                    headerAction={<Alert02Icon size={16} className="text-muted-foreground" />}
                    cardClassName="border-dashed border-border bg-muted/10"
                    contentClassName="flex flex-col"
                >
                    <div className="text-3xl font-bold mb-2 text-foreground">3</div>
                    <p className="text-xs text-muted-foreground mb-4">High-risk claims flagged in demo mode</p>
                    <Button variant="outline" size="sm" className="mt-auto opacity-75 w-full min-h-[44px]" disabled aria-label="Review Flags — locked feature">
                        <LockIcon size={14} className="mr-2" /> Review Flags
                    </Button>
                </WidgetContainer>

                {/* Card 4: Collection Forecast */}
                <WidgetContainer
                    title="Collection Forecast"
                    headerAction={<ChartColumnIcon size={16} className="text-muted-foreground" />}
                    cardClassName="border-dashed border-border bg-muted/10"
                    contentClassName="flex flex-col"
                >
                    <div className="text-3xl font-bold mb-2 text-foreground">15%</div>
                    <p className="text-xs text-muted-foreground mb-4">Predicted increase based on similar practices</p>
                    <Button variant="outline" size="sm" className="mt-auto opacity-75 w-full min-h-[44px]" disabled aria-label="View Forecast — locked feature">
                        <LockIcon size={14} className="mr-2" /> View Forecast
                    </Button>
                </WidgetContainer>
            </section>

            {/* Process Status */}
            <section aria-label="AI agent process status" className="opacity-60 pointer-events-none select-none">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    Today&apos;s AI Agents Processes <Badge variant="secondary" className="text-[10px] h-5">Simulated</Badge>
                </h2>
                <WidgetContainer title="" hideHeader cardClassName="bg-muted/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-dashboard-gap items-center">
                        {[
                            { value: 47, label: "Claim Processing" },
                            { value: 12, label: "Denial Prevention" },
                            { value: 8, label: "Revenue Forecasting" },
                            { value: 23, label: "Analysis" },
                        ].map((item, i) => (
                            <div key={i} className="text-center md:border-r border-border last:border-0 px-2">
                                <div className="text-2xl font-bold text-foreground/80">{item.value}</div>
                                <div className="text-xs text-muted-foreground font-medium mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </WidgetContainer>
            </section>

            {/* Bottom Grid Split */}
            <section aria-label="Financial details" className="grid grid-cols-1 lg:grid-cols-3 gap-dashboard-gap">

                {/* Financial Performance (spans 2 cols) */}
                <WidgetContainer
                    title="Financial Performance"
                    headerAction={<Badge variant="outline" className="bg-background">Sample Data</Badge>}
                    className="lg:col-span-2"
                >
                    <div className="mb-8">
                        <div className="text-4xl font-bold mb-1 text-muted-foreground opacity-60">$824,500</div>
                        <div className="text-xs text-muted-foreground opacity-60 flex items-center gap-1">
                            <ChartIncreaseIcon size={12} /> +12.5% from last month
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex items-end gap-2 h-24 mb-10 px-2 opacity-40" role="img" aria-label="Monthly financial performance bar chart">
                        {PERFORMANCE_BAR_DATA.map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-muted-foreground/30 rounded-t-sm transition-all hover:bg-muted-foreground/50"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>

                    {/* Donut Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-dashboard-gap mb-8 opacity-40">
                        <DonutChartItem value={92.4} label="Collections Rate" color="hsl(var(--growth-1))" />
                        <DonutChartItem value={2.8} label="Denial Rate" color="hsl(var(--destructive))" />
                        <DonutChartItem value={91.7} label="Clean Claim Rate" color="hsl(var(--growth-2))" />
                    </div>

                    {/* Alert List - Blurred */}
                    <div className="space-y-3 blur-[2px] select-none pointer-events-none">
                        <AlertItem icon={Alert02Icon} />
                        <AlertItem icon={Clock01Icon} />
                    </div>
                </WidgetContainer>

                {/* Billing Messages - Locked Overlay */}
                <div className="relative h-full overflow-hidden rounded-2xl shadow-widget">
                    {/* Locked Overlay */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 z-10 rounded-2xl">
                        <div className="bg-background p-3 rounded-full shadow-lg mb-4">
                            <LockIcon className="w-8 h-8 text-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Unlock Real-Time Data</h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
                            Upgrade to see your practice&apos;s actual performance metrics.
                        </p>
                        <Button variant="default" className="font-bold min-h-[44px]">
                            Upgrade Now
                        </Button>
                    </div>

                    <WidgetContainer
                        title="Billing Messages"
                        headerAction={<Button variant="outline" size="sm" className="h-11 text-xs">View All</Button>}
                        cardClassName="blur-[1px]"
                        contentClassName="space-y-6 blur-sm select-none pointer-events-none opacity-50"
                    >
                        <MessageItem />
                        <MessageItem />
                        <MessageItem />
                        <MessageItem />
                    </WidgetContainer>
                </div>
            </section>
        </main>
    )
}
