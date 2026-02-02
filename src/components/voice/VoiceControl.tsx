"use client"

import { useState, useRef } from "react"
import { Mic, MicOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { voiceSystem } from "@/lib/voice"
import { DesignSystem } from "@/lib/design-system"
import { VoiceTranscript } from "./voice-transcript"
import { VoiceFallback } from "./voice-fallback"

interface VoiceControlProps {
  onTranscript?: (transcript: string) => void
  className?: string
}

export function VoiceControl({ onTranscript, className }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported] = useState(() => typeof window !== 'undefined' && voiceSystem.isSupported())
  const [showFallback, setShowFallback] = useState(false)
  const [failureCount, setFailureCount] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const transcriptTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleListening = () => {
    if (isListening) {
      voiceSystem.stop()
      setIsListening(false)
    } else {
      const started = voiceSystem.start({
        onResult: (text) => {
          setTranscript(text)
          setShowTranscript(true)
          setFailureCount(0)
          setShowFallback(false)
          if (transcriptTimeoutRef.current) clearTimeout(transcriptTimeoutRef.current)
          transcriptTimeoutRef.current = setTimeout(() => setShowTranscript(false), 3000)
          if (onTranscript) {
            onTranscript(text)
          }
        },
        onStart: () => setIsListening(true),
        onEnd: () => {
          setIsListening(false)
          // Clear transcript after 3 seconds
          setTimeout(() => setTranscript(""), 3000)
        },
        onError: (error) => {
          console.error('Voice error:', error)
          setIsListening(false)
          setFailureCount(prev => {
            const next = prev + 1
            if (next >= 3) setShowFallback(true)
            return next
          })
        },
      })

      if (!started) {
        setIsListening(false)
      }
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className={className}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={toggleListening}
          size="sm"
          className={`
            relative h-10 w-10 rounded-full p-0 transition-all duration-300 border-none shadow-sm
            ${isListening
              ? 'bg-red-500/90 hover:bg-red-600/90 backdrop-blur-sm'
              : 'bg-card/65 hover:bg-card/80 backdrop-blur-sm'
            }
          `}
        >
          {isListening ? (
            <MicOff className="h-[18px] w-[18px] text-white" />
          ) : (
            <Mic className="h-[18px] w-[18px] text-muted-foreground/70" />
          )}
        </Button>

        {/* Pulsing ring when listening */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500/50"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: DesignSystem.animation.durationSlow,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <VoiceTranscript transcript={transcript} isVisible={showTranscript} />
      <VoiceFallback
        isVisible={showFallback}
        onDismiss={() => { setShowFallback(false); setFailureCount(0); }}
      />
    </div>
  )
}
