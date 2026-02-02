"use client"

import { useVoiceCommands } from "@/hooks/useVoiceCommands"
import { extractPatientName } from "@/lib/voice"
import { useEffect } from "react"

/**
 * VoiceProvider - Global voice command context for the application.
 *
 * Wraps the app tree and installs a global voice result handler on `window`.
 * When a voice transcript arrives (via VoiceControl), this provider extracts
 * patient names and triggers navigation -- enabling "Hey Tebra, show me
 * Tim Anders" to open the patient 360 view from any screen.
 *
 * Must be placed near the root of the component tree (inside layout.tsx).
 */
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
    window.__voiceResultHandler = handleVoiceResult

    return () => {
      delete window.__voiceResultHandler
    }
  }, [searchAndNavigateToPatient])

  return <>{children}</>
}
