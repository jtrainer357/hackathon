"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const chartData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
]

const chartConfig = {
    desktop: { label: "Desktop", color: "var(--primary)" },
    mobile: { label: "Mobile", color: "var(--accent)" },
}

export function DataSection() {
    return (
        <section id="data" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Data Display</h2>
                <p className="text-muted-foreground">Information visualization and status representation.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Analytics Chart</CardTitle>
                        <CardDescription>Using the new Shadcn Chart components.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-52 w-full" id="data-analytics-chart">
                            <BarChart accessibilityLayer data={chartData}>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Status Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge className="bg-success/10 text-success border-success/20">Success</Badge>
                            <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                                <span>Migration Progress</span>
                                <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Avatars</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold">JT</AvatarFallback>
                        </Avatar>
                        <div className="flex -space-x-3 overflow-hidden">
                            {[1, 2, 3].map(i => (
                                <Avatar key={i} className="inline-block h-8 w-8 rounded-full border-2 border-background ring-0">
                                    <AvatarFallback className="bg-muted text-[10px] font-bold">U{i}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Complex Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-24">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell><Badge variant="secondary">Paid</Badge></TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">INV002</TableCell>
                                    <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                                    <TableCell>PayPal</TableCell>
                                    <TableCell className="text-right">$150.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
