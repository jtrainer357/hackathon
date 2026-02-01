"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LabelValue Component
 * 
 * A design system component for displaying label:value pairs with consistent styling.
 * Labels are rendered with semi-bold weight before the colon.
 * 
 * Usage:
 * <LabelValue label="Plan #" value="HC-8475962" />
 * <LabelValue value="Some standalone value" highlight />
 */

interface LabelValueProps {
    /** Optional label text (displayed before colon with semi-bold weight) */
    label?: string
    /** The value to display */
    value: string
    /** If true, applies foreground color and medium font weight */
    highlight?: boolean
    /** Additional classes to apply */
    className?: string
    /** Size variant */
    size?: "sm" | "base"
}

function LabelValue({
    label,
    value,
    highlight = false,
    className,
    size = "sm"
}: LabelValueProps) {
    return (
        <p className={cn(
            size === "sm" ? "text-sm" : "text-base",
            highlight ? "text-foreground font-medium" : "text-muted-foreground",
            className
        )}>
            {label && <span className="font-semibold">{label}: </span>}
            {value}
        </p>
    )
}

export { LabelValue }
export type { LabelValueProps }
