"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationItemProps {
    icon: React.ComponentType<{ className?: string }>
    label: string
    isActive?: boolean
    onClick?: () => void
    href?: string
}

export function NavigationItem({
    icon: Icon,
    label,
    isActive,
    onClick,
}: NavigationItemProps) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                "relative flex items-center justify-center size-10 rounded-xl transition-all duration-300 ease-in-out group cursor-pointer",
                isActive
                    ? "bg-growth-1-5 text-white shadow-lg shadow-growth-1-5/20 scale-110"
                    : "text-muted-foreground hover:bg-muted hover:text-growth-1-5"
            )}
            whileTap={{ scale: 0.95 }}
            aria-label={label}
        >
            <Icon className="size-5" />

            {/* Tooltip-like label appearing on hover for accessibility/UX could be added here,
          but keeping strict to the requested structure first. */}
        </motion.button>
    )
}
