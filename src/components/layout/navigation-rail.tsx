"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Home,
    Users,
    Calendar,
    MessageCircle,
    FileText,
    CreditCard,
    BarChart,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavigationRail() {
    const pathname = usePathname();

    const topItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Users, label: 'Patients', href: '/patients' },
        { icon: Calendar, label: 'Calendar', href: '/calendar' },
        { icon: MessageCircle, label: 'Messages', href: '/communications' },
        { icon: FileText, label: 'Clinical', href: '/clinical' },
        { icon: CreditCard, label: 'Billing', href: '/billing' },
        { icon: BarChart, label: 'Reports', href: '/reports' },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-50 hidden w-22 flex-col items-center py-8 pl-4 pr-2 md:flex">
            {/* Logo */}
            <div className="mb-32">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center relative">
                    <Image src="/Logo.svg" alt="Tebra" width={28} height={28} className="object-contain" />
                </div>
            </div>

            {/* Main Navigation Items */}
            <nav className="flex flex-1 flex-col gap-12" aria-label="Main navigation">
                {topItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <motion.div key={item.href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-in-out group",
                                    isActive
                                        ? "bg-growth-1-5 text-white shadow-lg scale-110"
                                        : "border border-border text-muted-foreground hover:bg-white hover:text-growth-1-5"
                                )}
                                aria-label={item.label}
                                title={item.label}
                            >
                                <item.icon className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Bottom Items */}
            <div className="mt-auto flex flex-col gap-12">
                <Link
                    href="/notifications"
                    className={cn(
                        "relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-in-out",
                        pathname === '/notifications'
                            ? "bg-growth-1-5 text-white shadow-lg scale-110"
                            : "border border-border text-muted-foreground hover:bg-white hover:text-growth-1-5"
                    )}
                    aria-label="Notifications"
                    title="Notifications"
                >
                    <Bell className="h-5 w-5" />
                </Link>
                <div className="h-10 w-10 rounded-full bg-growth-1-5 flex items-center justify-center text-white text-sm font-medium">
                    EW
                </div>
            </div>
        </aside>
    );
}
