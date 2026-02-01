"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const animationTokens = [
    { name: "Fast", variable: "--animation-duration-fast", value: "0.3s" },
    { name: "Normal", variable: "--animation-duration-normal", value: "0.5s" },
    { name: "Slow", variable: "--animation-duration-slow", value: "0.7s" },
]

const easingToken = {
    name: "Ease",
    variable: "--animation-ease",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
}

export function AnimationSection() {
    const [key, setKey] = React.useState(0)

    const resetAnimations = () => setKey((k) => k + 1)

    return (
        <section id="animation" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Animation & Motion</h2>
                <p className="text-muted-foreground">Timing and transition tokens with live demos.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Duration Tokens</CardTitle>
                        <CardDescription>Animation timing scale.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {animationTokens.map((token) => (
                                <div key={token.variable} className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{token.name}</span>
                                    <div className="flex items-center gap-3">
                                        <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            {token.variable}
                                        </code>
                                        <span className="text-xs text-muted-foreground w-12 text-right">{token.value}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between text-sm pt-2 border-t">
                                <span className="font-medium">{easingToken.name}</span>
                                <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                    {easingToken.variable}
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-base font-semibold">Fade In Up</CardTitle>
                            <CardDescription>Standard screen entrance animation.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={resetAnimations}>
                            Replay
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4" key={key}>
                            {["Fast", "Normal", "Slow"].map((speed, i) => (
                                <motion.div
                                    key={speed}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: [0.3, 0.5, 0.7][i],
                                        delay: i * 0.1,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="flex-1 bg-muted/50 rounded-lg p-4 text-center"
                                >
                                    <div className="text-sm font-medium">{speed}</div>
                                    <div className="text-xs text-muted-foreground">{[0.3, 0.5, 0.7][i]}s</div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-base font-semibold">Staggered Animation</CardTitle>
                            <CardDescription>Sequential entrance with 0.1s delay between items.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={resetAnimations}>
                            Replay
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={key + 1}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20"
                                >
                                    <div className="text-lg font-bold text-primary">{item}</div>
                                    <div className="text-xs text-muted-foreground">Delay: {(i * 0.1).toFixed(1)}s</div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-base font-semibold">Micro-interactions</CardTitle>
                            <CardDescription>Hover and tap feedback animations.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg cursor-pointer font-medium"
                            >
                                Scale on Hover
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer font-medium"
                            >
                                Lift on Hover
                            </motion.div>
                            <motion.div
                                whileHover={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                                className="bg-card border px-4 py-2 rounded-lg cursor-pointer font-medium"
                            >
                                Shadow on Hover
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0.7 }}
                                className="bg-muted px-4 py-2 rounded-lg cursor-pointer font-medium"
                            >
                                Fade on Hover
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
