/**
 * Voice Command System using Web Speech API
 * Enables voice-controlled navigation for the mental health MVP demo
 */

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent {
  error: string
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onstart: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

export interface VoiceCommand {
  command: string
  action: () => void
  patterns: RegExp[]
}

export interface VoiceRecognitionOptions {
  continuous?: boolean
  interimResults?: boolean
  language?: string
  onResult?: (transcript: string) => void
  onError?: (error: string) => void
  onStart?: () => void
  onEnd?: () => void
  onLowConfidence?: (transcript: string) => void
  onFailureThreshold?: () => void
}

class VoiceCommandSystem {
  private recognition: SpeechRecognitionInstance | null = null
  private isListening: boolean = false
  private commands: VoiceCommand[] = []
  private options: VoiceRecognitionOptions = {}
  private failureCount: number = 0
  private onLowConfidence: ((transcript: string) => void) | null = null
  private onFailureThreshold: (() => void) | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      const w = window as unknown as Record<string, unknown>
      const SpeechRecognition = (w.SpeechRecognition || w.webkitSpeechRecognition) as (new () => SpeechRecognitionInstance) | undefined
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.setupRecognition()
      }
    }
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = false
    this.recognition.interimResults = true
    this.recognition.lang = 'en-US'

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result: SpeechRecognitionResult) => result[0].transcript)
        .join('')
        .toLowerCase()
        .trim()

      const confidence = event.results[0][0].confidence

      // Check confidence threshold
      if (confidence < 0.7) {
        this.failureCount++
        console.warn(`Low confidence (${confidence.toFixed(2)}): "${transcript}" — failure count: ${this.failureCount}`)
        if (this.onLowConfidence) {
          this.onLowConfidence(transcript)
        }
        if (this.options.onLowConfidence) {
          this.options.onLowConfidence(transcript)
        }
        if (this.failureCount >= 3) {
          if (this.onFailureThreshold) {
            this.onFailureThreshold()
          }
          if (this.options.onFailureThreshold) {
            this.options.onFailureThreshold()
          }
        }
        return
      }

      // High confidence — reset failure count
      this.failureCount = 0

      // Call the result callback
      if (this.options.onResult) {
        this.options.onResult(transcript)
      }

      // Check for wake word "tebra"
      if (transcript.includes('tebra')) {
        const commandText = transcript.replace(/^.*tebra,?\s*/i, '')
        this.executeCommand(commandText)
      } else {
        // Also try executing without wake word
        this.executeCommand(transcript)
      }
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorType = event.error
      switch (errorType) {
        case 'no-speech':
          console.warn('Voice recognition: No speech detected')
          break
        case 'audio-capture':
          console.error('Voice recognition: No microphone available')
          break
        case 'not-allowed':
          console.error('Voice recognition: Microphone permission denied')
          break
        default:
          console.error('Voice recognition error:', errorType)
      }
      if (this.options.onError) {
        this.options.onError(errorType)
      }
    }

    this.recognition.onstart = () => {
      this.isListening = true
      // Recognition started
      if (this.options.onStart) {
        this.options.onStart()
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      // Recognition stopped
      if (this.options.onEnd) {
        this.options.onEnd()
      }
    }
  }

  registerCommand(command: VoiceCommand) {
    this.commands.push(command)
  }

  clearCommands() {
    this.commands = []
  }

  private executeCommand(transcript: string) {
    // Check registered commands against transcript

    for (const cmd of this.commands) {
      for (const pattern of cmd.patterns) {
        const match = transcript.match(pattern)
        if (match) {
          // Matched command, executing action
          cmd.action()
          return
        }
      }
    }

    // No command matched
  }

  start(options?: VoiceRecognitionOptions) {
    if (!this.recognition) {
      console.error('Speech recognition not supported')
      return false
    }

    if (this.isListening) {
      // Already listening
      return false
    }

    this.options = { ...options }
    this.onLowConfidence = options?.onLowConfidence ?? null
    this.onFailureThreshold = options?.onFailureThreshold ?? null

    try {
      this.recognition.start()
      return true
    } catch (error) {
      console.error('Failed to start recognition:', error)
      return false
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  isSupported(): boolean {
    return this.recognition !== null
  }

  getIsListening(): boolean {
    return this.isListening
  }
}

// Export singleton instance
export const voiceSystem = new VoiceCommandSystem()

// Helper function to extract patient name from voice command
export function extractPatientName(transcript: string): string | null {
  // Patterns like "show me [name]", "open [name]", "find [name]"
  const patterns = [
    /show\s+(?:me\s+)?(.+?)(?:\s+patient)?$/i,
    /open\s+(.+?)(?:\s+patient)?$/i,
    /find\s+(.+?)(?:\s+patient)?$/i,
    /go\s+to\s+(.+?)(?:\s+patient)?$/i,
    /display\s+(.+?)(?:\s+patient)?$/i,
  ]

  for (const pattern of patterns) {
    const match = transcript.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return null
}

// Helper function to parse appointment rescheduling commands
export function parseRescheduleCommand(transcript: string): {
  day?: string
  time?: string
} | null {
  // Patterns like "reschedule to thursday at 2pm", "move appointment to friday 3pm"
  const patterns = [
    /reschedule.*?(?:to\s+)?(\w+)\s+(?:at\s+)?(\d+(?::\d+)?\s*(?:am|pm)?)/i,
    /move.*?appointment.*?(?:to\s+)?(\w+)\s+(?:at\s+)?(\d+(?::\d+)?\s*(?:am|pm)?)/i,
  ]

  for (const pattern of patterns) {
    const match = transcript.match(pattern)
    if (match) {
      return {
        day: match[1],
        time: match[2],
      }
    }
  }

  return null
}
