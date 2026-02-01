"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

interface ActionsCompletionModalProps {
    isOpen: boolean
}

export function ActionsCompletionModal({ isOpen }: ActionsCompletionModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        className="relative z-10 bg-white rounded-[16px] p-[32px] shadow-2xl flex flex-col items-center gap-4 min-w-[320px]"
                    >
                        {/* Spinner */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="text-primary mb-2"
                        >
                            <HugeiconsIcon icon={Loading03Icon} className="h-10 w-10 text-growth-2" />
                        </motion.div>

                        <div className="w-full max-w-[280px] space-y-3">
                            <h3 className="text-sm font-medium text-foreground text-center mb-1">
                                Processing Actions...
                            </h3>
                            <div className="space-y-2">
                                <AnimatedTaskItem text="Analyzing A1C trends..." delay={0.2} />
                                <AnimatedTaskItem text="Drafting patient message..." delay={0.8} />
                                <AnimatedTaskItem text="Updating care gaps in chart..." delay={1.4} />
                                <AnimatedTaskItem text="Finalizing completion..." delay={2.0} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function AnimatedTaskItem({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="flex items-center gap-3 text-xs text-muted-foreground"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.2, type: "spring" }}
            >
                <div className="h-1.5 w-1.5 rounded-full bg-growth-2" />
            </motion.div>
            {text}
        </motion.div>
    )
}
