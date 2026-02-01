"use client"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { TextBoldIcon, TextItalicIcon, TextUnderlineIcon, Mail01Icon, Add01Icon } from "@hugeicons/core-free-icons"

export function ButtonsSection() {
    return (
        <section id="interaction" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Buttons & Interaction</h2>
                <p className="text-muted-foreground">Action elements and stateful toggles.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Variants</CardTitle>
                        <CardDescription>All standard button styles.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4 items-center">
                        <Button variant="default">Default</Button>
                        <Button variant="primaryVitality">Primary Vitality</Button>
                        <Button variant="marketing">Marketing</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Sizes</CardTitle>
                        <CardDescription>All available button sizes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <Button size="xs">Extra Small</Button>
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="xl">Extra Large</Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button size="icon-xs" variant="outline">
                                <HugeiconsIcon icon={Add01Icon} />
                            </Button>
                            <Button size="icon-sm" variant="outline">
                                <HugeiconsIcon icon={Add01Icon} />
                            </Button>
                            <Button size="icon" variant="outline">
                                <HugeiconsIcon icon={Add01Icon} />
                            </Button>
                            <Button size="icon-lg" variant="outline">
                                <HugeiconsIcon icon={Add01Icon} />
                            </Button>
                            <span className="text-xs text-muted-foreground ml-2">Icon sizes: xs, sm, default, lg</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">States</CardTitle>
                        <CardDescription>Disabled and loading states.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-4">
                        <Button disabled>Disabled</Button>
                        <Button variant="secondary" disabled>Disabled Secondary</Button>
                        <Button variant="outline" disabled>Disabled Outline</Button>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">With Icons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Button className="gap-2">
                            <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4" />
                            Login with Email
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <HugeiconsIcon icon={Add01Icon} className="h-4 w-4" />
                            New Project
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Toggles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <Toggle aria-label="Toggle bold">
                                <HugeiconsIcon icon={TextBoldIcon} className="h-4 w-4" />
                            </Toggle>
                            <Toggle variant="outline" aria-label="Toggle italic">
                                <HugeiconsIcon icon={TextItalicIcon} className="h-4 w-4" />
                            </Toggle>
                        </div>

                        <ToggleGroup type="multiple" variant="outline" className="justify-start">
                            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                                <HugeiconsIcon icon={TextBoldIcon} className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                                <HugeiconsIcon icon={TextItalicIcon} className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="underline" aria-label="Toggle underline">
                                <HugeiconsIcon icon={TextUnderlineIcon} className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
