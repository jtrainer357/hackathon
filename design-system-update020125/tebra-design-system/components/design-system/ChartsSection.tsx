"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, RadialBar, RadialBarChart, PolarGrid, PolarRadiusAxis, Label } from "recharts"

const barData = [
    { month: "Jan", claims: 186, denials: 80 },
    { month: "Feb", claims: 305, denials: 200 },
    { month: "Mar", claims: 237, denials: 120 },
    { month: "Apr", claims: 273, denials: 190 },
    { month: "May", claims: 209, denials: 130 },
    { month: "Jun", claims: 314, denials: 140 },
]

const lineData = [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 5000, expenses: 3800 },
    { month: "Apr", revenue: 4780, expenses: 3008 },
    { month: "May", revenue: 5890, expenses: 4800 },
    { month: "Jun", revenue: 6390, expenses: 3800 },
]

const areaData = [
    { month: "Jan", patients: 400 },
    { month: "Feb", patients: 300 },
    { month: "Mar", patients: 500 },
    { month: "Apr", patients: 478 },
    { month: "May", patients: 589 },
    { month: "Jun", patients: 639 },
]

const pieData = [
    { name: "Approved", value: 540, fill: "var(--success)" },
    { name: "Pending", value: 180, fill: "var(--warning)" },
    { name: "Denied", value: 80, fill: "var(--destructive)" },
]

const radialData = [
    { name: "Completion", value: 78, fill: "var(--primary)" },
]

const chartConfig = {
    claims: { label: "Claims", color: "var(--primary)" },
    denials: { label: "Denials", color: "var(--destructive)" },
    revenue: { label: "Revenue", color: "var(--success)" },
    expenses: { label: "Expenses", color: "var(--warning)" },
    patients: { label: "Patients", color: "var(--growth-2)" },
    approved: { label: "Approved", color: "var(--success)" },
    pending: { label: "Pending", color: "var(--warning)" },
    denied: { label: "Denied", color: "var(--destructive)" },
}

export function ChartsSection() {
    return (
        <section id="charts" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Charts</h2>
                <p className="text-muted-foreground">Data visualization using Recharts with design system colors.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Bar Chart</CardTitle>
                        <CardDescription>Side-by-side comparison data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-52 w-full">
                            <BarChart accessibilityLayer data={barData}>
                                <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.3} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="claims" fill="var(--primary)" radius={4} />
                                <Bar dataKey="denials" fill="var(--destructive)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Line Chart</CardTitle>
                        <CardDescription>Trend data over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-52 w-full">
                            <LineChart accessibilityLayer data={lineData}>
                                <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.3} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--success)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="var(--warning)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Area Chart</CardTitle>
                        <CardDescription>Filled area for volume data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-52 w-full">
                            <AreaChart accessibilityLayer data={areaData}>
                                <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.3} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <defs>
                                    <linearGradient id="fillPatients" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--growth-2)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--growth-2)" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="patients"
                                    stroke="var(--growth-2)"
                                    fill="url(#fillPatients)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Pie Chart</CardTitle>
                        <CardDescription>Distribution breakdown.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-52">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={80}
                                    strokeWidth={2}
                                    stroke="var(--background)"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Radial Chart</CardTitle>
                        <CardDescription>Progress indicator with percentage.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-w-[200px]">
                            <RadialBarChart
                                data={radialData}
                                startAngle={180}
                                endAngle={180 - (radialData[0].value / 100) * 360}
                                innerRadius={70}
                                outerRadius={100}
                            >
                                <PolarGrid
                                    gridType="circle"
                                    radialLines={false}
                                    stroke="none"
                                    className="first:fill-muted last:fill-background"
                                    polarRadius={[76, 64]}
                                />
                                <RadialBar
                                    dataKey="value"
                                    background
                                    cornerRadius={10}
                                />
                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {radialData[0].value}%
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground text-sm"
                                                        >
                                                            Complete
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </PolarRadiusAxis>
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
