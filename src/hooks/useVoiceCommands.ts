"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { voiceSystem, parseRescheduleCommand } from '@/lib/voice'

export function useVoiceCommands() {
  const router = useRouter()

  useEffect(() => {
    // Clear any existing commands
    voiceSystem.clearCommands()

    // Register: "show me [patient name]"
    voiceSystem.registerCommand({
      command: 'show-patient',
      patterns: [
        /show\s+(?:me\s+)?(.+?)(?:\s+patient)?$/i,
        /open\s+(.+?)(?:\s+patient)?$/i,
        /find\s+(.+?)(?:\s+patient)?$/i,
        /go\s+to\s+(.+?)(?:\s+patient)?$/i,
      ],
      action: async () => {
        // This will be handled by extracting the patient name from the full transcript
        // In the component that calls voiceSystem.start(), we'll handle the navigation
        // Patient lookup handled by transcript extraction
      },
    })

    // Register: "go home" / "show dashboard"
    voiceSystem.registerCommand({
      command: 'go-home',
      patterns: [
        /go\s+home/i,
        /show\s+dashboard/i,
        /home/i,
      ],
      action: () => {
        // Navigate to home
        router.push('/')
      },
    })

    // Register: "show calendar"
    voiceSystem.registerCommand({
      command: 'show-calendar',
      patterns: [
        /show\s+calendar/i,
        /open\s+calendar/i,
        /go\s+to\s+calendar/i,
        /calendar/i,
      ],
      action: () => {
        // Navigate to calendar
        router.push('/calendar')
      },
    })

    // Register: "show messages" / "show communications"
    voiceSystem.registerCommand({
      command: 'show-messages',
      patterns: [
        /show\s+messages?/i,
        /show\s+communications?/i,
        /open\s+messages?/i,
        /messages?/i,
      ],
      action: () => {
        // Navigate to communications
        router.push('/communications')
      },
    })

    // Register: "show patients" / "patient list"
    voiceSystem.registerCommand({
      command: 'show-patients',
      patterns: [
        /show\s+patients?/i,
        /patient\s+list/i,
        /go\s+to\s+patients?/i,
      ],
      action: () => {
        // Navigate to patients
        router.push('/patients')
      },
    })

    // Register: "reschedule appointment"
    voiceSystem.registerCommand({
      command: 'reschedule-appointment',
      patterns: [
        /reschedule/i,
        /move\s+appointment/i,
        /change\s+appointment/i,
      ],
      action: () => {
        const transcript = '' // transcript handled by onResult callback
        const parsed = parseRescheduleCommand(transcript)
        if (parsed) {
          console.log(`Reschedule requested: ${parsed.day} at ${parsed.time}`)
        }
        router.push('/calendar')
      },
    })

    // Register: "show session note"
    voiceSystem.registerCommand({
      command: 'show-note',
      patterns: [
        /show\s+note/i,
        /session\s+note/i,
        /last\s+note/i,
        /soap\s+note/i,
      ],
      action: () => {
        // Navigate to patients page to view session notes
        router.push('/patients')
      },
    })

    return () => {
      voiceSystem.clearCommands()
    }
  }, [router])

  // Helper function to search for a patient and navigate
  const searchAndNavigateToPatient = async (patientName: string) => {
    try {
      // Search for patient by name

      // Search for patient using the API
      const response = await fetch(`/api/patients/search?q=${encodeURIComponent(patientName)}`)

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()

      if (data.patients && data.patients.length > 0) {
        const patient = data.patients[0]
        // Found patient, navigating
        router.push(`/patients/${patient.id}`)
        return true
      } else {
        // No patient found
        return false
      }
    } catch (error) {
      console.error('Error searching for patient:', error)
      return false
    }
  }

  return {
    searchAndNavigateToPatient,
  }
}
