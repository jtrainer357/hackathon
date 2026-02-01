"use client"

import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    UserIcon,
    CreditCardIcon,
    Settings01Icon,
    KeyboardIcon,
    LogoutSquare01Icon,
    Add01Icon,
    UserMultiple02Icon,
    Mail01Icon,
    MessageAdd01Icon,
    CloudIcon
} from "@hugeicons/core-free-icons"

export function DropdownMenuSection() {
    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showPanel, setShowPanel] = React.useState(false)
    const [position, setPosition] = React.useState("bottom")

    return (
        <section id="dropdown" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Dropdown Menu</h2>
                <p className="text-muted-foreground">Contextual menus with multiple item types.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Standard Menu</CardTitle>
                        <CardDescription>With icons, shortcuts, and groups.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">My Account</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={UserIcon} />
                                        <span>Profile</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={CreditCardIcon} />
                                        <span>Billing</span>
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={Settings01Icon} />
                                        <span>Settings</span>
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={KeyboardIcon} />
                                        <span>Keyboard shortcuts</span>
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                    <HugeiconsIcon icon={LogoutSquare01Icon} />
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Checkbox Items</CardTitle>
                        <CardDescription>Toggleable menu options.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">View Options</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                >
                                    Status Bar
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                >
                                    Activity Panel
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Radio Group</CardTitle>
                        <CardDescription>Single selection menu items.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Panel Position</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Position</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Nested Sub-menu</CardTitle>
                        <CardDescription>Complex dropdown with sub-menus.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <HugeiconsIcon icon={Add01Icon} className="mr-2" />
                                    New
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={UserIcon} />
                                        <span>New User</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <HugeiconsIcon icon={UserMultiple02Icon} />
                                            <span>Invite Users</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <HugeiconsIcon icon={Mail01Icon} />
                                                <span>Email</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <HugeiconsIcon icon={MessageAdd01Icon} />
                                                <span>Message</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <HugeiconsIcon icon={CloudIcon} />
                                                <span>More...</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
