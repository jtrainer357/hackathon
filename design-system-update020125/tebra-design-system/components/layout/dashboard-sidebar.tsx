"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import {
    Home01Icon,
    UserIcon,
    Calendar01Icon,
    Comment01Icon,
    File01Icon,
    CreditCardIcon,
    ChartAverageIcon,
    Notification01Icon,
} from "@hugeicons/core-free-icons"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items matching the golden standard
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home01Icon,
    },
    {
        title: "Patients",
        url: "/dashboard/patients",
        icon: UserIcon,
    },
    {
        title: "Schedule",
        url: "/dashboard/calendar",
        icon: Calendar01Icon,
    },
    {
        title: "Messages",
        url: "/dashboard/messages",
        icon: Comment01Icon,
    },
    {
        title: "Clinical",
        url: "/dashboard/clinical",
        icon: File01Icon,
    },
    {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCardIcon,
    },
    {
        title: "Reports",
        url: "/dashboard/reports",
        icon: ChartAverageIcon,
    },
]

function TebraLogo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 42 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M26.1275 19.2563H41.3866C41.5004 19.2558 41.6115 19.2219 41.7059 19.1589C41.8004 19.0958 41.874 19.0064 41.9176 18.9018C41.9613 18.7974 41.9728 18.6823 41.951 18.5712C41.9292 18.4601 41.8749 18.3579 41.7949 18.2775L38.3917 14.8937C38.3329 14.8352 38.2621 14.7899 38.1842 14.7613C38.1061 14.7326 38.0228 14.7209 37.94 14.7273L37.6641 14.7489L28.4752 15.6241L33.8787 11.3177C33.9435 11.267 33.9967 11.2032 34.0346 11.1304C34.0725 11.0577 34.0944 10.9777 34.0988 10.8958C34.1031 10.814 34.0896 10.7321 34.0597 10.6558C34.0296 10.5795 33.9834 10.5105 33.9243 10.4534L31.4441 7.99659C31.3865 7.94005 31.3176 7.89611 31.2419 7.86763C31.1662 7.83915 31.0854 7.82675 31.0045 7.83123C30.9238 7.83571 30.8448 7.85697 30.7727 7.89363C30.7007 7.9303 30.6371 7.98157 30.5861 8.04413L26.2643 13.4223L27.1331 4.28225L27.1547 4.01C27.1616 3.92747 27.1502 3.84446 27.1213 3.7668C27.0924 3.68914 27.0467 3.61874 26.9876 3.56056L23.5951 0.166007C23.5143 0.0864405 23.4115 0.0324079 23.2998 0.0106857C23.1882 -0.0110365 23.0726 0.000518067 22.9676 0.043901C22.8625 0.087284 22.7726 0.160563 22.7093 0.254552C22.6459 0.348539 22.6119 0.459051 22.6113 0.57223V15.7537L26.1275 19.2563Z" fill="currentColor" />
            <path d="M0.575156 19.2563H15.8343L19.3504 15.7581V0.57223C19.35 0.459051 19.3159 0.348539 19.2526 0.254552C19.1891 0.160563 19.0993 0.087284 18.9943 0.043901C18.8891 0.000518067 18.7735 -0.0110365 18.6619 0.0106857C18.5502 0.0324079 18.4476 0.0864405 18.3666 0.166007L14.9655 3.55192C14.9047 3.60931 14.8575 3.67937 14.8271 3.75706C14.7967 3.83475 14.7839 3.91817 14.7897 4.00135L14.8114 4.27361L15.6801 13.4136L11.3582 8.04413C11.3073 7.97983 11.2431 7.92704 11.1701 7.88929C11.0971 7.85154 11.0168 7.8297 10.9346 7.8252C10.8525 7.82071 10.7703 7.83367 10.6935 7.86321C10.6167 7.89277 10.5472 7.93823 10.4895 7.99659L8.03967 10.4642C7.98057 10.5213 7.93442 10.5903 7.90434 10.6666C7.87425 10.7429 7.86092 10.8248 7.86525 10.9066C7.86956 10.9885 7.89143 11.0685 7.92938 11.1412C7.96733 11.214 8.02048 11.2778 8.08528 11.3285L13.4865 15.6241L4.29547 14.7489L4.01964 14.7273C3.93674 14.7209 3.85343 14.7326 3.77545 14.7613C3.69746 14.7899 3.62666 14.8352 3.56791 14.8937L0.166856 18.2775C0.0868819 18.3579 0.0325737 18.4601 0.0107403 18.5712C-0.011093 18.6823 0.000520715 18.7974 0.0441255 18.9018C0.0877304 19.0064 0.161385 19.0958 0.255853 19.1589C0.350322 19.2219 0.461399 19.2558 0.575156 19.2563Z" fill="currentColor" />
            <path d="M41.4225 22.4978H0.718425C0.604391 22.4977 0.492896 22.5313 0.398091 22.5944C0.303285 22.6575 0.229441 22.7471 0.185929 22.852C0.142417 22.9568 0.131198 23.0722 0.153696 23.1834C0.176195 23.2946 0.231396 23.3967 0.312296 23.4767L3.70033 26.8474C3.75907 26.9061 3.82988 26.9512 3.90786 26.9799C3.98584 27.0087 4.06915 27.0202 4.15206 27.0138L4.4257 26.9922L19.5263 25.5553L18.5056 39.3841C18.4996 39.4627 18.51 39.5417 18.5361 39.6161C18.5621 39.6905 18.6034 39.7587 18.6572 39.8165C18.711 39.8743 18.7763 39.9205 18.8488 39.952C18.9214 39.9835 18.9998 39.9999 19.079 40H22.619C22.6982 39.9999 22.7765 39.9835 22.8491 39.952C22.9216 39.9205 22.9868 39.8743 23.0406 39.8165C23.0945 39.7587 23.1357 39.6905 23.1618 39.6161C23.188 39.5417 23.1984 39.4627 23.1923 39.3841L22.1716 25.5553L37.7152 26.9944L37.9889 27.016C38.0718 27.0224 38.1551 27.0109 38.2331 26.9821C38.3111 26.9534 38.3819 26.9081 38.4406 26.8496L41.8286 23.4789C41.9103 23.399 41.9662 23.2967 41.9891 23.1851C42.012 23.0736 42.001 22.9577 41.9574 22.8523C41.9138 22.7471 41.8396 22.657 41.7444 22.5939C41.6491 22.5307 41.5369 22.4973 41.4225 22.4978Z" fill="currentColor" />
        </svg>
    )
}

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" className="relative !border-r-0 [&_[data-sidebar=sidebar]]:bg-transparent bg-transparent" {...props}>
            <SidebarHeader className="pt-dashboard-padding">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="justify-center hover:bg-transparent">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-card text-growth-1 shadow-sm hover:shadow-md transition-shadow">
                                <TebraLogo className="!size-7 !shrink-0" />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="pt-[calc(var(--spacing-sidebar-gap)*2.5)]">
                <SidebarMenu className="gap-sidebar-gap">
                    {items.map((item) => {
                        const isActive = item.url === "/dashboard"
                            ? pathname === "/dashboard"
                            : item.title === "Patients"
                                ? pathname.startsWith(item.url) || pathname.includes("/voice-canvas")
                                : pathname.startsWith(item.url)
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.title}
                                    className="justify-center h-10 w-10 mx-auto rounded-xl border border-sidebar-border/80 data-[active=true]:border-transparent data-[active=true]:bg-growth-1-5 data-[active=true]:text-primary-foreground hover:bg-muted hover:text-growth-1-5 data-[active=true]:hover:text-primary-foreground data-[active=true]:shadow-lg transition-all duration-300 ease-in-out data-[active=true]:scale-110"
                                >
                                    <Link href={item.url}>
                                        <HugeiconsIcon icon={item.icon} className="!size-5" />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* Bottom-aligned Icons - Sticky to bottom */}
            <div className="fixed bottom-[5.5rem] left-0 w-[var(--sidebar-width)] hidden md:flex flex-col items-center z-20 pointer-events-none pb-0">
                <SidebarMenu className="pointer-events-auto flex flex-col items-center gap-sidebar-gap w-full">
                    <SidebarMenuItem className="w-full flex justify-center">
                        <SidebarMenuButton size="lg" className="justify-center w-10 h-10 mx-auto p-0 rounded-xl border border-sidebar-border/80 hover:bg-muted hover:text-growth-1-5">
                            <HugeiconsIcon icon={Notification01Icon} className="!size-5 transition-all" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="w-full flex justify-center">
                        <div className="flex justify-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/male_doctor.png" alt="User" />
                                <AvatarFallback className="bg-muted text-xs">U</AvatarFallback>
                            </Avatar>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </Sidebar>
    )
}
