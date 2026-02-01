"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function InputsSection() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <section id="forms" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Forms & Inputs</h2>
                <p className="text-muted-foreground">User input, selection, and configuration controls.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Standard Inputs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="input-demo">Input Field</Label>
                            <Input id="input-demo" placeholder="Enter text..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="textarea-demo">Textarea</Label>
                            <Textarea id="textarea-demo" placeholder="Tell us more..." />
                        </div>
                        <div className="grid gap-2">
                            <Label>Select</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Toggles & Selectors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" />
                                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Accept terms</Label>
                            </div>
                        </div>

                        <RadioGroup defaultValue="comfortable" className="flex flex-col gap-3">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Default</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Comfortable</Label>
                            </div>
                        </RadioGroup>

                        <div className="grid gap-4">
                            <Label>Slider (80%)</Label>
                            <Slider defaultValue={[80]} max={100} step={1} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Input OTP</CardTitle>
                        <CardDescription>One-time password input component.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Calendar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center p-0 pt-2 pb-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border-none"
                        />
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
