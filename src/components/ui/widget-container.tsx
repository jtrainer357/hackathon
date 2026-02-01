"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface WidgetContainerProps {
    /** Title displayed in the widget header */
    title: string
    /** Optional icon element displayed before the title */
    headerIcon?: React.ReactNode
    /** Optional element displayed after the title (e.g., badge) */
    titleSuffix?: React.ReactNode
    /** Optional action element (e.g., button, badge) in the header */
    headerAction?: React.ReactNode
    /** Widget content */
    children: React.ReactNode
    /** Additional class names for the container */
    className?: string
    /** Additional class names for the content area */
    contentClassName?: string
    /** Visual variant - 'default' for white background, 'highlight' for teal/growth background */
    variant?: "default" | "highlight"
    /** Whether to hide the header entirely */
    hideHeader?: boolean
    /** Additional class names for the inner Card component */
    cardClassName?: string
}

const variantStyles = {
    default: "bg-card/65",
    highlight: "bg-growth-4/65",
}

/**
 * Universal widget/module container with consistent styling.
 * 
 * Use this component for all dashboard widgets and modules to ensure
 * consistent background treatment, shadows, and header styling.
 * 
 * Updates to this component will automatically propagate to all
 * widgets and modules using it.
 * 
 * Variants:
 * - default: White background with 65% opacity
 * - highlight: Teal/growth-4 background with 65% opacity (for featured content)
 */
export function WidgetContainer({
    title,
    headerIcon,
    titleSuffix,
    headerAction,
    children,
    className,
    contentClassName,
    variant = "default",
    hideHeader = false,
    cardClassName,
}: WidgetContainerProps) {
    return (
        <div className={cn("shadow-widget rounded-2xl overflow-visible h-full", className)}>
            <Card className={cn(
                "border-none h-full flex flex-col overflow-hidden py-0 rounded-2xl",
                variantStyles[variant],
                cardClassName
            )}>
                {!hideHeader && (
                    <CardHeader className="flex flex-row items-center justify-between pb-widget-header-pb pt-widget-header-pt px-widget-padding-x shrink-0">
                        <div className="flex items-center gap-dashboard-gap">
                            {headerIcon}
                            <h2 className="text-xl font-bold">{title}</h2>
                            {titleSuffix}
                        </div>
                        {headerAction}
                    </CardHeader>
                )}
                <CardContent className={cn("px-widget-padding-x pb-widget-padding-y flex-1 overflow-hidden min-h-0", contentClassName)}>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}
