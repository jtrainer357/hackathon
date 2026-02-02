"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { voiceSystem } from "@/lib/voice"
import { DesignSystem } from "@/lib/design-system"

interface VoiceControlProps {
  onTranscript?: (transcript: string) => void
  className?: string
}

export function VoiceControl({ onTranscript, className }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    setIsSupported(voiceSystem.isSupported())
  }, [])

  const toggleListening = () => {
    if (isListening) {
      voiceSystem.stop()
      setIsListening(false)
    } else {
      const started = voiceSystem.start({
        onResult: (text) => {
          setTranscript(text)
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

      {/* Transcript display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            className="mt-4 p-4 bg-growth-5 rounded-lg border border-growth-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm font-medium text-growth-1">
              Heard: <span className="font-normal text-foreground">{transcript}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
