"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon, InformationCircleIcon, Tick02Icon } from "@hugeicons/core-free-icons"

export function OverlaysSection() {
    return (
        <section id="feedback" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Overlays & Feedback</h2>
                <p className="text-muted-foreground">Dialogs, alerts, and floating information elements.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <HugeiconsIcon icon={InformationCircleIcon} className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                You can add components to your app using the cli.
                            </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                            <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Your session has expired. Please log in again.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Modals & Dialogs</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Open Dialog</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground">Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Floating UI</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-6 items-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm">Hover Me</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">@nextjs</Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">@nextjs</h4>
                                        <p className="text-sm">
                                            The React Framework – created and maintained by @vercel.
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Settings</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Dimensions</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Set the dimensions for the layer.
                                        </p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Sheet & Toast</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">Open Sheet (Right)</Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Edit Profile</SheetTitle>
                                    <SheetDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="py-12 flex items-center justify-center border-2 border-dashed rounded-lg mt-4">
                                    Sheet Content
                                </div>
                                <SheetFooter className="mt-8">
                                    <SheetClose asChild>
                                        <Button type="submit">Save changes</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        <Button
                            variant="outline"
                            onClick={() =>
                                toast("Event has been created", {
                                    description: "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })
                            }
                        >
                            Show Toast
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Drawer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline" className="w-full">Open Drawer</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle>Mobile Drawer</DrawerTitle>
                                        <DrawerDescription>Slide up from bottom on mobile.</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-4 pb-0 flex items-center justify-center h-40 bg-muted/20 rounded-md m-4 border-dashed border">
                                        Drawer Content
                                    </div>
                                    <DrawerFooter>
                                        <Button>Submit</Button>
                                        <DrawerClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
