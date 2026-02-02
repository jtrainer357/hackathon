"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Home,
    Users,
    Calendar,
    MessageCircle
} from 'lucide-react';

export function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Users, label: 'Patients', href: '/patients' },
        { icon: Calendar, label: 'Calendar', href: '/calendar' },
        { icon: MessageCircle, label: 'Chat', href: '/communications' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-center justify-around border-t border-border bg-card/80 backdrop-blur-lg px-6 md:hidden">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <motion.div key={item.href} whileTap={{ scale: 0.9 }} className="relative">
                        <Link
                            href={item.href}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                "relative flex flex-col items-center gap-1.5 transition-colors",
                                isActive ? "text-growth-1" : "text-muted-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="h-1 w-1 rounded-full bg-growth-1 absolute -top-1"
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                />
                            )}
                            <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
}
