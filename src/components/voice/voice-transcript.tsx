"use client"

import { motion, AnimatePresence } from "framer-motion"

interface VoiceTranscriptProps {
  transcript: string
  isVisible: boolean
}

export function VoiceTranscript({ transcript, isVisible }: VoiceTranscriptProps) {
  return (
    <AnimatePresence>
      {isVisible && transcript && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-card border border-border shadow-lg rounded-full px-6 py-3 max-w-[90vw]"
        >
          <p className="text-sm text-foreground truncate">
            You said: &ldquo;<span className="font-medium text-growth-2">{transcript}</span>&rdquo;
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
