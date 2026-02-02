"use client"

import { useVoiceCommands } from "@/hooks/useVoiceCommands"
import { extractPatientName } from "@/lib/voice"
import { useEffect } from "react"

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const { searchAndNavigateToPatient } = useVoiceCommands()

  useEffect(() => {
    // Set up global voice command handler for patient search
    const handleVoiceResult = (transcript: string) => {
      const patientName = extractPatientName(transcript)
      if (patientName) {
        searchAndNavigateToPatient(patientName)
      }
    }

    // Store handler globally for VoiceControl to access
    ;(window as any).__voiceResultHandler = handleVoiceResult

    return () => {
      delete (window as any).__voiceResultHandler
    }
  }, [searchAndNavigateToPatient])

  return <>{children}</>
}
