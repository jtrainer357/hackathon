"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavigationItem } from './navigation-item';
import {
    Home05Icon,
    UserMultiple02Icon,
    Calendar03Icon,
    Chat01Icon,
    Medicine02Icon,
    Wallet02Icon,
    MarketingIcon,
    Notification03Icon
} from 'hugeicons-react';

export function NavigationRail() {
    const pathname = usePathname();

    const topItems = [
        { icon: Home05Icon, label: 'Home', href: '/' },
        { icon: UserMultiple02Icon, label: 'Patients', href: '/patients' },
        { icon: Calendar03Icon, label: 'Calendar', href: '/calendar' },
        { icon: Chat01Icon, label: 'Communications', href: '/communications' },
        { icon: Medicine02Icon, label: 'Care', href: '/care' },
        { icon: Wallet02Icon, label: 'Billing', href: '/billing' },
        { icon: MarketingIcon, label: 'Marketing', href: '/marketing' },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-50 hidden w-[80px] flex-col items-center border-r border-border bg-card py-8 md:flex">
            <div className="mb-10">
                <div className="h-10 w-10 rounded-xl bg-growth-1 p-2">
                    <img src="/Logo.svg" alt="Tebra" className="h-full w-full" />
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-6">
                {topItems.map((item) => (
                    <NavigationItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>

            <div className="mt-auto flex flex-col gap-6">
                <NavigationItem
                    icon={Notification03Icon}
                    label="Notifications"
                    href="/notifications"
                    isActive={pathname === '/notifications'}
                />
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                    <img src="https://avatar.vercel.sh/provider" alt="Avatar" className="h-full w-full object-cover" />
                </div>
            </div>
        </aside>
    );
}
