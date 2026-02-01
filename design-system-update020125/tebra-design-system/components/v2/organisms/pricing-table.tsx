"use client"

import type React from "react"

import { Check, Info } from "lucide-react"
import { Button } from "@/components/v2/atoms/button"
import { Card } from "@/components/v2/molecules/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/v2/molecules/select"
import { cn } from "@/lib/utils"
import { useState } from "react"

export interface PricingFeature {
    text: string
    hasInfo?: boolean
}

export interface PricingTier {
    name: string
    description: string
    price?: number
    priceLabel?: string
    priceByOption?: Record<string, number | string>
    billingPeriod?: string
    buttonText: string
    buttonVariant?: "default" | "secondary" | "outline" | "primaryVitality"
    isPrimary?: boolean
    features: PricingFeature[]
    hasAnnualToggle?: boolean
    creditOptions?: string[]
    defaultCredits?: string
    featuresTitle?: string
    popularTag?: string
}

export interface PricingProps {
    icon?: React.ReactNode
    title: string
    subtitle: string
    tiers: PricingTier[]
    footerTitle?: string
    footerDescription?: string
    footerButtonText?: string
    className?: string
    onTierAction?: (tier: PricingTier) => void
}

export function Pricing({
    icon,
    title,
    subtitle,
    tiers,
    footerTitle,
    footerDescription,
    footerButtonText,
    className,
    onTierAction,
}: PricingProps) {
    // Initialize annual billing to true for all tiers
    const [annualBilling, setAnnualBilling] = useState<Record<string, boolean>>(() => {
        const initialStates: Record<string, boolean> = {};
        tiers.forEach(tier => {
            initialStates[tier.name] = true;
        });
        return initialStates;
    })
    const [selectedCredits, setSelectedCredits] = useState<Record<string, string>>({})

    return (
        <div className={cn("w-full bg-white text-foreground py-16 px-4", className)}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    {icon && <div className="flex justify-center mb-4">{icon}</div>}
                    <h1 className="text-5xl font-normal mb-4 text-balance text-growth-1">{title}</h1>
                    <p className="text-growth-1 text-lg text-balance">{subtitle}</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative pt-8">
                    {tiers.map((tier, index) => (
                        <div key={index} className={cn("flex flex-col", tier.isPrimary && "z-10")}>
                            <Card
                                className={cn(
                                    "p-6 flex flex-col transition-all duration-300 relative !overflow-visible",
                                    tier.isPrimary
                                        ? "bg-white shadow-xl border-2 border-growth-2 -mt-8 -mb-8 pt-14 pb-14"
                                        : "bg-white/65 backdrop-blur-sm border border-border shadow-sm h-full",
                                )}
                            >
                                {tier.popularTag && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-growth-1 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md whitespace-nowrap z-20">
                                        {tier.popularTag}
                                    </div>
                                )}

                                {/* Tier Header */}
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    {(() => {
                                        // Calculate the displayed price based on selected option
                                        const selectedOption = selectedCredits[tier.name] || tier.defaultCredits || tier.creditOptions?.[0]
                                        const dynamicPrice = tier.priceByOption && selectedOption ? tier.priceByOption[selectedOption] : undefined
                                        const displayPrice = dynamicPrice !== undefined ? dynamicPrice : tier.price
                                        const displayLabel = typeof displayPrice === 'string' ? displayPrice : (tier.priceLabel || (displayPrice !== undefined ? `$${displayPrice}` : undefined))

                                        if (typeof displayPrice === 'number') {
                                            return (
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="text-5xl font-bold">${displayPrice}</span>
                                                    <span className="text-muted-foreground text-sm">{tier.billingPeriod || "per provider/month"}</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="text-5xl font-bold">{displayLabel}</span>
                                                    {tier.billingPeriod && <span className="text-muted-foreground text-sm">{tier.billingPeriod}</span>}
                                                </div>
                                            )
                                        }
                                    })()}
                                </div>

                                {/* Spacer to align content if Annual Toggle is missing */}
                                <div className="mb-6 h-6 flex items-center gap-3">
                                    {tier.hasAnnualToggle && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setAnnualBilling((prev) => ({
                                                        ...prev,
                                                        [tier.name]: !prev[tier.name],
                                                    }))
                                                }
                                                className={cn(
                                                    "w-11 h-6 rounded-full relative transition-colors",
                                                    annualBilling[tier.name] ? "bg-primary" : "bg-muted",
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform",
                                                        annualBilling[tier.name] && "translate-x-5",
                                                    )}
                                                />
                                            </button>
                                            <span className="text-sm text-foreground">{tier.name === "Pro" ? "Annual" : "Annual"}</span>
                                        </>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className="w-full mb-6"
                                    size="xl"
                                    variant={tier.buttonVariant || (tier.isPrimary ? "default" : "secondary")}
                                    onClick={() => onTierAction?.(tier)}
                                >
                                    {tier.buttonText}
                                </Button>

                                {/* Credit Options */}
                                {tier.creditOptions && tier.creditOptions.length > 0 && (
                                    <div className="mb-6">
                                        <Select
                                            value={selectedCredits[tier.name] || tier.defaultCredits || tier.creditOptions[0]}
                                            onValueChange={(value) =>
                                                setSelectedCredits((prev) => ({
                                                    ...prev,
                                                    [tier.name]: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tier.creditOptions.map((option) => (
                                                    <SelectItem
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Features Title */}
                                {tier.featuresTitle && (
                                    <div className="mb-4 text-sm font-medium text-foreground">{tier.featuresTitle}</div>
                                )}

                                {/* Features List */}
                                <div className="space-y-3 flex-1">
                                    {tier.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground leading-relaxed flex-1">{feature.text}</span>
                                            {feature.hasInfo && <Info className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Footer Banner */}
                {footerTitle && (
                    <Card className="bg-card border-none shadow-[0_6px_10px_-2px_rgb(0,0,0,0.1)] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">{footerTitle}</h3>
                            {footerDescription && <p className="text-muted-foreground text-sm">{footerDescription}</p>}
                        </div>
                        {footerButtonText && (
                            <Button
                                variant="outline"
                                className="bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground whitespace-nowrap"
                            >
                                {footerButtonText}
                            </Button>
                        )}
                    </Card>
                )}
            </div>
        </div>
    )
}
