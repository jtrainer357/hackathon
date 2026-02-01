// Tebra Mental Health MVP: Twilio SMS Webhook
// Handles inbound SMS messages from Twilio

import { NextRequest, NextResponse } from 'next/server'
import { getMessagingService } from '@/lib/messaging/messaging-service'
import { TwilioSmsProvider } from '@/lib/messaging/channel-providers/twilio-sms'

const twilioProvider = new TwilioSmsProvider()

export async function POST(request: NextRequest) {
    try {
        // Get signature for verification
        const signature = request.headers.get('x-twilio-signature') || ''

        // Parse body (Twilio sends form data)
        const formData = await request.formData()
        const payload: Record<string, string> = {}
        formData.forEach((value, key) => {
            payload[key] = value.toString()
        })

        console.log('[Twilio Webhook] Received inbound SMS:', {
            from: payload.From,
            body: payload.Body?.slice(0, 50),
        })

        // Verify signature (in production)
        // Note: For development, we skip this
        if (process.env.NODE_ENV === 'production') {
            const rawBody = new URLSearchParams(payload).toString()
            const isValid = twilioProvider.verifyWebhookSignature(rawBody, signature)
            if (!isValid) {
                console.error('[Twilio Webhook] Invalid signature')
                return new NextResponse('Invalid signature', { status: 403 })
            }
        }

        // Parse the inbound message
        const messageData = await twilioProvider.parseInbound(payload)
        if (!messageData) {
            console.error('[Twilio Webhook] Failed to parse inbound message')
            return new NextResponse('Invalid payload', { status: 400 })
        }

        // Process the message
        const service = getMessagingService()
        const result = await service.handleInbound('sms', messageData)

        if (!result.success) {
            console.error('[Twilio Webhook] Failed to process message:', result.error)
            // Still return 200 to Twilio to prevent retries
        }

        // Return TwiML response (empty for no reply)
        return new NextResponse(
            '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
            {
                status: 200,
                headers: { 'Content-Type': 'text/xml' },
            }
        )
    } catch (error) {
        console.error('[Twilio Webhook] Error:', error)
        // Return 200 to prevent Twilio from retrying
        return new NextResponse('OK', { status: 200 })
    }
}
