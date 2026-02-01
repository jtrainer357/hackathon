"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TypographySection() {
    return (
        <section id="typography" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
                <p className="text-muted-foreground">Using Akkurat LL font across the design system.</p>
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-mono mb-2">Display / 4xl</p>
                        <h1 className="text-4xl font-black tracking-tight">The quick brown fox jumps over the lazy dog</h1>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-mono mb-2">Heading / 2xl</p>
                        <h2 className="text-2xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-mono mb-2">Subheading / lg</p>
                        <h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-mono mb-2">Body / base</p>
                        <p className="text-base text-foreground">
                            Design is a formal response to a strategic question. It is about how something works, not just how it looks.
                            Typography is the craft of endowing human language with a durable visual form.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-mono mb-2">Muted / sm</p>
                        <p className="text-sm text-muted-foreground">
                            Akkurat LL is a sans-serif typeface designed by Laurenz Brunner and released through the Lineto foundry in 2004.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Weights</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-12">
                    <div className="space-y-1">
                        <p className="text-4xl font-light">Aa</p>
                        <p className="text-xs text-muted-foreground font-mono">Light (300)</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-4xl font-normal">Aa</p>
                        <p className="text-xs text-muted-foreground font-mono">Regular (400)</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-4xl font-bold">Aa</p>
                        <p className="text-xs text-muted-foreground font-mono">Bold (700)</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-4xl font-black">Aa</p>
                        <p className="text-xs text-muted-foreground font-mono">Black (900)</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
