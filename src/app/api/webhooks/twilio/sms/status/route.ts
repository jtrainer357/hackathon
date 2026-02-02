// Tebra Mental Health MVP: Twilio Status Webhook
// Handles delivery status updates for sent SMS

import { NextRequest, NextResponse } from 'next/server'
import { TwilioSmsProvider } from '@/lib/messaging/channel-providers/twilio-sms'

const twilioProvider = new TwilioSmsProvider()

export async function POST(request: NextRequest) {
    try {
        // Parse body (Twilio sends form data)
        const formData = await request.formData()
        const payload: Record<string, string> = {}
        formData.forEach((value, key) => {
            payload[key] = value.toString()
        })

        // Status update received from Twilio

        // Parse the status update
        const statusData = await twilioProvider.parseStatusUpdate(payload)
        if (!statusData) {
            // Intermediate status (sent, queued) - just acknowledge
            return new NextResponse('OK', { status: 200 })
        }

        // TODO: Update message status in database in production

        return new NextResponse('OK', { status: 200 })
    } catch (error) {
        console.error('[Twilio Status Webhook] Error:', error)
        return new NextResponse('OK', { status: 200 })
    }
}
