"use client"

import * as React from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar01Icon, Mail01Icon, Settings01Icon, UserIcon, CreditCardIcon, Calculator01Icon } from "@hugeicons/core-free-icons"

export function CommandSection() {
    return (
        <section id="command" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Command</h2>
                <p className="text-muted-foreground">Command palette for quick actions and search.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Command Palette</CardTitle>
                        <CardDescription>Searchable command menu with groups and shortcuts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Command className="rounded-lg border shadow-md">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <CommandItem>
                                        <HugeiconsIcon icon={Calendar01Icon} className="mr-2 h-4 w-4" />
                                        <span>Calendar</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <HugeiconsIcon icon={Mail01Icon} className="mr-2 h-4 w-4" />
                                        <span>Messages</span>
                                        <CommandShortcut>⌘M</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <HugeiconsIcon icon={Calculator01Icon} className="mr-2 h-4 w-4" />
                                        <span>Calculator</span>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>
                                        <HugeiconsIcon icon={UserIcon} className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                        <CommandShortcut>⌘P</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <HugeiconsIcon icon={CreditCardIcon} className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                        <CommandShortcut>⌘B</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <HugeiconsIcon icon={Settings01Icon} className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <CommandShortcut>⌘S</CommandShortcut>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
