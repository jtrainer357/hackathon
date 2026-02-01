"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home05Icon,
    UserMultiple02Icon,
    Calendar03Icon,
    Chat01Icon
} from 'hugeicons-react';

export function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home05Icon, label: 'Home', href: '/' },
        { icon: UserMultiple02Icon, label: 'Patients', href: '/patients' },
        { icon: Calendar03Icon, label: 'Calendar', href: '/calendar' },
        { icon: Chat01Icon, label: 'Chat', href: '/communications' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-center justify-around border-t border-border bg-card/80 backdrop-blur-lg px-6 md:hidden">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1.5 transition-colors",
                            isActive ? "text-growth-1" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
