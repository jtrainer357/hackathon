"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    // Navigation & UI
    Home01Icon,
    DashboardSquare01Icon,
    Calendar01Icon,
    UserIcon,
    Settings01Icon,
    Search01Icon,
    Notification01Icon,
    Menu01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Add01Icon,
    Delete01Icon,
    Edit02Icon,
    // Communication
    Mail01Icon,
    MessageAdd01Icon,
    Call02Icon,
    // Data & Files
    File01Icon,
    Folder01Icon,
    Download01Icon,
    Upload01Icon,
    Share01Icon,
    Copy01Icon,
    // Status
    Tick02Icon,
    Cancel01Icon,
    AlertCircleIcon,
    InformationCircleIcon,
    // Financial
    CreditCardIcon,
    Invoice01Icon,
    ChartLineData01Icon,
    // Medical
    Stethoscope02Icon,
    FirstAidKitIcon,
    PulseRectangle01Icon,
    // AI & Tech
    SparklesIcon,
    AiBrain01Icon,
} from "@hugeicons/core-free-icons"

const iconCategories = {
    navigation: [
        { name: "Home", icon: Home01Icon },
        { name: "Dashboard", icon: DashboardSquare01Icon },
        { name: "Calendar", icon: Calendar01Icon },
        { name: "User", icon: UserIcon },
        { name: "Settings", icon: Settings01Icon },
        { name: "Search", icon: Search01Icon },
        { name: "Notifications", icon: Notification01Icon },
        { name: "Menu", icon: Menu01Icon },
    ],
    actions: [
        { name: "Arrow Left", icon: ArrowLeft01Icon },
        { name: "Arrow Right", icon: ArrowRight01Icon },
        { name: "Add", icon: Add01Icon },
        { name: "Delete", icon: Delete01Icon },
        { name: "Edit", icon: Edit02Icon },
        { name: "Download", icon: Download01Icon },
        { name: "Upload", icon: Upload01Icon },
        { name: "Share", icon: Share01Icon },
        { name: "Copy", icon: Copy01Icon },
    ],
    communication: [
        { name: "Mail", icon: Mail01Icon },
        { name: "Message", icon: MessageAdd01Icon },
        { name: "Call", icon: Call02Icon },
    ],
    status: [
        { name: "Check", icon: Tick02Icon },
        { name: "Cancel", icon: Cancel01Icon },
        { name: "Alert", icon: AlertCircleIcon },
        { name: "Info", icon: InformationCircleIcon },
    ],
    data: [
        { name: "File", icon: File01Icon },
        { name: "Folder", icon: Folder01Icon },
        { name: "Credit Card", icon: CreditCardIcon },
        { name: "Invoice", icon: Invoice01Icon },
        { name: "Chart", icon: ChartLineData01Icon },
    ],
    medical: [
        { name: "Stethoscope", icon: Stethoscope02Icon },
        { name: "First Aid", icon: FirstAidKitIcon },
        { name: "Pulse", icon: PulseRectangle01Icon },
    ],
    ai: [
        { name: "Sparkles", icon: SparklesIcon },
        { name: "AI Brain", icon: AiBrain01Icon },
    ],
}

const iconSizes = [
    { name: "XS", size: "size-icon-xs", px: "16px" },
    { name: "SM", size: "size-icon-sm", px: "20px" },
    { name: "MD", size: "size-icon-md", px: "24px" },
    { name: "LG", size: "size-icon-lg", px: "36px" },
]

export function IconsSection() {
    return (
        <section id="icons" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Icons</h2>
                <p className="text-muted-foreground">Hugeicons library with consistent sizing.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Icon Sizes</CardTitle>
                        <CardDescription>Design token-based sizing scale.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-8">
                            {iconSizes.map((size) => (
                                <div key={size.name} className="flex flex-col items-center gap-2">
                                    <HugeiconsIcon
                                        icon={Settings01Icon}
                                        className={`text-primary`}
                                        style={{ width: size.px, height: size.px }}
                                    />
                                    <div className="text-center">
                                        <div className="text-xs font-semibold">{size.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{size.px}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Navigation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <IconGrid icons={iconCategories.navigation} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <IconGrid icons={iconCategories.actions} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Communication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <IconGrid icons={iconCategories.communication} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <IconGrid icons={iconCategories.status} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Data & Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <IconGrid icons={iconCategories.data} />
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Medical & AI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                            {[...iconCategories.medical, ...iconCategories.ai].map((item) => (
                                <div key={item.name} className="flex flex-col items-center gap-2">
                                    <HugeiconsIcon icon={item.icon} className="h-5 w-5 text-foreground" />
                                    <span className="text-[10px] text-muted-foreground text-center truncate w-full">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

function IconGrid({ icons }: { icons: { name: string; icon: any }[] }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {icons.map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2">
                    <HugeiconsIcon icon={item.icon} className="h-5 w-5 text-foreground" />
                    <span className="text-[10px] text-muted-foreground text-center truncate w-full">{item.name}</span>
                </div>
            ))}
        </div>
    )
}
