"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DesignSystem } from "@/lib/design-system"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { FileText, Lock, Check } from "lucide-react"

const DEMO_SOAP_NOTES: Record<string, { subjective: string; objective: string; assessment: string; plan: string }> = {
  "Tim Anders": {
    subjective: "Client reports continued improvement in anxiety symptoms. States he has been practicing diaphragmatic breathing daily and finds it helpful during moments of stress at work. Denies any panic attacks in the past two weeks. Sleep has normalized to 7-8 hours per night. Reports feeling 'more like myself' and able to engage in social activities without excessive worry.",
    objective: "Client presented as well-groomed and appropriately dressed. Mood appeared euthymic with full range of affect. Speech was clear and goal-directed. Thought process was logical and organized. Denied suicidal/homicidal ideation. Insight and judgment appear good.",
    assessment: "Client demonstrates significant progress in managing GAD symptoms. PHQ-9 score of 3 indicates minimal depression. GAD-7 score of 4 indicates minimal anxiety. Treatment interventions (CBT, breathing techniques) are effective. Client is in maintenance phase of treatment.",
    plan: "Continue weekly sessions focused on relapse prevention and coping skill reinforcement. Client will continue daily breathing practice. Discussed identifying early warning signs of anxiety escalation. Will reassess treatment frequency in 4 weeks. Next session scheduled for Thursday 2/6 at 2:00 PM."
  }
}

// Fallback for unknown patients
const DEFAULT_SOAP = DEMO_SOAP_NOTES["Tim Anders"]

interface SOAPNoteGeneratorProps {
  isGenerating: boolean
  patientName: string
  sessionDate: string
  onSignAndLock?: () => void
}

export function SOAPNoteGenerator({ isGenerating, patientName, sessionDate, onSignAndLock }: SOAPNoteGeneratorProps) {
  const [phase, setPhase] = useState<"idle" | "skeleton" | "revealing" | "complete">("idle")
  const [isLocked, setIsLocked] = useState(false)

  const soapData = DEMO_SOAP_NOTES[patientName] || DEFAULT_SOAP

  const sections = [
    { key: "subjective", label: "Subjective", content: soapData.subjective },
    { key: "objective", label: "Objective", content: soapData.objective },
    { key: "assessment", label: "Assessment", content: soapData.assessment },
    { key: "plan", label: "Plan", content: soapData.plan },
  ]

  useEffect(() => {
    if (isGenerating) {
      setPhase("skeleton")
      setIsLocked(false)
      const timer = setTimeout(() => setPhase("revealing"), 2000)
      return () => clearTimeout(timer)
    } else if (phase === "revealing") {
      const timer = setTimeout(() => setPhase("complete"), sections.length * 300 + 500)
      return () => clearTimeout(timer)
    }
  }, [isGenerating, phase])

  // When revealing finishes, move to complete
  useEffect(() => {
    if (phase === "revealing") {
      const timer = setTimeout(() => setPhase("complete"), sections.length * 300 + 500)
      return () => clearTimeout(timer)
    }
  }, [phase, sections.length])

  const handleSignAndLock = () => {
    setIsLocked(true)
    onSignAndLock?.()
  }

  if (phase === "idle") return null

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-growth-2" />
          <h3 className="text-lg font-bold text-foreground">SOAP Note</h3>
          {isLocked && (
            <Badge variant="secondary" className="gap-1">
              <Lock className="h-3 w-3" />
              Signed & Locked
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {patientName} &bull; {sessionDate}
        </div>
      </div>

      {/* Skeleton Phase */}
      <AnimatePresence mode="wait">
        {phase === "skeleton" && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {sections.map((s) => (
              <div key={s.key} className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealing + Complete Phase */}
      {(phase === "revealing" || phase === "complete") && (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.3,
                ease: DesignSystem.animation.ease,
              }}
              className="rounded-xl border border-border p-4"
            >
              <h4 className="text-sm font-bold uppercase tracking-wide text-growth-2 mb-2">
                {section.label}
              </h4>
              <div
                contentEditable={!isLocked}
                suppressContentEditableWarning
                className={`text-base leading-relaxed text-foreground outline-none min-h-[44px] ${
                  isLocked ? "opacity-80 cursor-not-allowed" : "focus:ring-2 focus:ring-growth-3 focus:ring-offset-2 rounded-lg p-1 -m-1"
                }`}
              >
                {section.content}
              </div>
            </motion.div>
          ))}

          {/* Sign & Lock Button */}
          {phase === "complete" && !isLocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex justify-end pt-2"
            >
              <Button
                onClick={handleSignAndLock}
                className="h-12 min-h-[48px] rounded-full px-8 font-bold gap-2"
              >
                <Check className="h-5 w-5" />
                Sign & Lock
              </Button>
            </motion.div>
          )}

          {/* Locked confirmation */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-3 text-sm text-muted-foreground"
            >
              Note signed and locked at {new Date().toLocaleTimeString()}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
