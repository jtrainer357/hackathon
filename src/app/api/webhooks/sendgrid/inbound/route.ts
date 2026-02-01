// Tebra Mental Health MVP: SendGrid Inbound Webhook
// Handles inbound emails via SendGrid Inbound Parse

import { NextRequest, NextResponse } from 'next/server'
import { getMessagingService } from '@/lib/messaging/messaging-service'
import { SendGridEmailProvider } from '@/lib/messaging/channel-providers/sendgrid-email'

const sendgridProvider = new SendGridEmailProvider()

export async function POST(request: NextRequest) {
    try {
        // SendGrid sends multipart form data
        const formData = await request.formData()
        const payload: Record<string, unknown> = {}

        formData.forEach((value, key) => {
            payload[key] = value.toString()
        })

        console.log('[SendGrid Webhook] Received inbound email:', {
            from: payload.from,
            subject: payload.subject,
        })

        // Parse the inbound message
        const messageData = await sendgridProvider.parseInbound(payload)
        if (!messageData) {
            console.error('[SendGrid Webhook] Failed to parse inbound email')
            return new NextResponse('Invalid payload', { status: 400 })
        }

        // Process the message
        const service = getMessagingService()
        const result = await service.handleInbound('email', messageData)

        if (!result.success) {
            console.error('[SendGrid Webhook] Failed to process email:', result.error)
        }

        return new NextResponse('OK', { status: 200 })
    } catch (error) {
        console.error('[SendGrid Webhook] Error:', error)
        return new NextResponse('OK', { status: 200 })
    }
}
