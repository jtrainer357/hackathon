"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const spacingTokens = {
    dashboard: [
        { name: "Row 1 Height", variable: "--spacing-dashboard-row-1", value: "650px" },
        { name: "Row 2 Height", variable: "--spacing-dashboard-row-2", value: "380px" },
        { name: "Max Width", variable: "--spacing-dashboard-max-width", value: "1600px" },
        { name: "Header Height", variable: "--spacing-dashboard-header-h", value: "64px" },
        { name: "Padding", variable: "--spacing-dashboard-padding", value: "16px" },
        { name: "Gap", variable: "--spacing-dashboard-gap", value: "8px" },
    ],
    widget: [
        { name: "Widget Gap", variable: "--spacing-widget-gap", value: "16px" },
        { name: "Padding X", variable: "--spacing-widget-padding-x", value: "24px" },
        { name: "Padding Y", variable: "--spacing-widget-padding-y", value: "24px" },
        { name: "Header Top", variable: "--spacing-widget-header-pt", value: "24px" },
        { name: "Header Bottom", variable: "--spacing-widget-header-pb", value: "8px" },
        { name: "Gap XS", variable: "--spacing-widget-gap-xs", value: "0.125rem" },
        { name: "Gap SM", variable: "--spacing-widget-gap-sm", value: "0.25rem" },
        { name: "Gap MD", variable: "--spacing-widget-gap-md", value: "0.75rem" },
        { name: "Gap LG", variable: "--spacing-widget-gap-lg", value: "1rem" },
        { name: "Gap XL", variable: "--spacing-widget-gap-xl", value: "1.5rem" },
    ],
    sidebar: [
        { name: "Sidebar Width", variable: "--spacing-sidebar-width", value: "8rem" },
        { name: "Icon Width", variable: "--spacing-sidebar-icon-width", value: "2.5rem" },
        { name: "Gap", variable: "--spacing-sidebar-gap", value: "32px" },
    ],
    sections: [
        { name: "Section Top", variable: "--spacing-section-top", value: "2rem" },
        { name: "Section Padding Top", variable: "--spacing-section-padding-top", value: "1.5rem" },
        { name: "Message Padding", variable: "--spacing-message-padding", value: "1rem" },
        { name: "Divider X", variable: "--spacing-divider-x", value: "1rem" },
    ],
}

const radiusTokens = [
    { name: "SM", variable: "--radius-sm", formula: "calc(var(--radius) - 4px)" },
    { name: "MD", variable: "--radius-md", formula: "calc(var(--radius) - 2px)" },
    { name: "LG", variable: "--radius-lg", formula: "var(--radius)" },
    { name: "XL", variable: "--radius-xl", formula: "calc(var(--radius) + 4px)" },
    { name: "2XL", variable: "--radius-2xl", formula: "calc(var(--radius) + 8px)" },
    { name: "3XL", variable: "--radius-3xl", formula: "calc(var(--radius) + 12px)" },
    { name: "4XL", variable: "--radius-4xl", formula: "calc(var(--radius) + 16px)" },
]

const sizeTokens = [
    { name: "Icon XS", variable: "--size-icon-xs", value: "1rem" },
    { name: "Icon SM", variable: "--size-icon-sm", value: "1.25rem" },
    { name: "Icon MD", variable: "--size-icon-md", value: "1.5rem" },
    { name: "Icon LG", variable: "--size-icon-lg", value: "2.25rem" },
    { name: "Avatar", variable: "--size-avatar", value: "2.25rem" },
    { name: "Button SM", variable: "--size-button-sm", value: "1.75rem" },
]

export function SpacingSection() {
    return (
        <section id="spacing" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Spacing & Sizing</h2>
                <p className="text-muted-foreground">Design tokens for consistent layout and sizing.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Dashboard Layout</CardTitle>
                        <CardDescription>Page structure and dimensions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {spacingTokens.dashboard.map((token) => (
                                <TokenRow key={token.variable} {...token} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Widget Spacing</CardTitle>
                        <CardDescription>Internal widget padding and gaps.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {spacingTokens.widget.map((token) => (
                                <TokenRow key={token.variable} {...token} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Sidebar</CardTitle>
                        <CardDescription>Navigation sidebar dimensions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {spacingTokens.sidebar.map((token) => (
                                <TokenRow key={token.variable} {...token} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Sections & Misc</CardTitle>
                        <CardDescription>Section spacing and dividers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {spacingTokens.sections.map((token) => (
                                <TokenRow key={token.variable} {...token} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Border Radius</CardTitle>
                        <CardDescription>Corner rounding scale (base: 0.875rem).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            {radiusTokens.map((token) => (
                                <div key={token.variable} className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-12 h-12 bg-primary/20 border-2 border-primary"
                                        style={{ borderRadius: `var(${token.variable})` }}
                                    />
                                    <span className="text-xs font-medium">{token.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Component Sizes</CardTitle>
                        <CardDescription>Icons, avatars, and buttons.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {sizeTokens.map((token) => (
                                <TokenRow key={token.variable} {...token} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

function TokenRow({ name, variable, value, formula }: { name: string; variable: string; value?: string; formula?: string }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <span className="font-medium">{name}</span>
            </div>
            <div className="flex items-center gap-3">
                <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{variable}</code>
                <span className="text-xs text-muted-foreground w-20 text-right">{value || formula}</span>
            </div>
        </div>
    )
}
