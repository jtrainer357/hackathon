"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Calendar, MessageCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface VoiceFallbackProps {
  isVisible: boolean
  onDismiss: () => void
  onFindPatient?: () => void
}

export function VoiceFallback({ isVisible, onDismiss, onFindPatient }: VoiceFallbackProps) {
  const router = useRouter()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-card border border-border shadow-xl rounded-2xl p-4 w-[90vw] max-w-sm"
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              I didn&apos;t catch that. Try again or use the buttons below.
            </p>
            <button onClick={onDismiss} className="p-1 hover:bg-muted rounded-full shrink-0 ml-2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full h-12 min-h-[44px] justify-start gap-3 text-base"
              onClick={() => { onFindPatient?.(); onDismiss(); }}
            >
              <Search className="h-5 w-5" />
              Find Patient
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 min-h-[44px] justify-start gap-3 text-base"
              onClick={() => { router.push("/calendar"); onDismiss(); }}
            >
              <Calendar className="h-5 w-5" />
              View Calendar
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 min-h-[44px] justify-start gap-3 text-base"
              onClick={() => { router.push("/communications"); onDismiss(); }}
            >
              <MessageCircle className="h-5 w-5" />
              Check Messages
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
