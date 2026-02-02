/**
 * Voice Command System using Web Speech API
 * Enables voice-controlled navigation for the mental health MVP demo
 */

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
}

class VoiceCommandSystem {
  private recognition: any = null
  private isListening: boolean = false
  private commands: VoiceCommand[] = []
  private options: VoiceRecognitionOptions = {}

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
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

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
        .toLowerCase()
        .trim()

      console.log('🎤 Heard:', transcript)

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

    this.recognition.onerror = (event: any) => {
      console.error('🎤 Error:', event.error)
      if (this.options.onError) {
        this.options.onError(event.error)
      }
    }

    this.recognition.onstart = () => {
      this.isListening = true
      console.log('🎤 Listening...')
      if (this.options.onStart) {
        this.options.onStart()
      }
    }

    this.recognition.onend = () => {
      this.isListening = false
      console.log('🎤 Stopped')
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
    console.log('🎯 Checking command:', transcript)

    for (const cmd of this.commands) {
      for (const pattern of cmd.patterns) {
        const match = transcript.match(pattern)
        if (match) {
          console.log('✅ Matched command:', cmd.command)
          cmd.action()
          return
        }
      }
    }

    console.log('❌ No command matched')
  }

  start(options?: VoiceRecognitionOptions) {
    if (!this.recognition) {
      console.error('Speech recognition not supported')
      return false
    }

    if (this.isListening) {
      console.log('Already listening')
      return false
    }

    this.options = { ...options }

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
