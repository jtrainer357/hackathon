// Tebra Mental Health MVP: Messages API Route
// GET: List conversations or messages
// POST: Send new message

import { NextRequest, NextResponse } from 'next/server'
import { getMessagingService } from '@/lib/messaging/messaging-service'
import { messageQuerySchema, composeMessageSchema } from '@/lib/validation'
import { ConversationFilter, MessageChannel } from '@/types/messaging'
import { logAudit } from '@/lib/audit'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // Validate input
        const parsed = messageQuerySchema.safeParse({
            type: searchParams.get('type') || 'conversations',
            filter: searchParams.get('filter') || 'all',
            channel: searchParams.get('channel') || undefined,
            q: searchParams.get('q') || '',
            patientId: searchParams.get('patientId') || undefined,
            conversationId: searchParams.get('conversationId') || undefined,
            limit: searchParams.get('limit') || '50',
            cursor: searchParams.get('cursor') || undefined,
        })

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid parameters', details: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const service = getMessagingService()

        if (parsed.data.type === 'conversations') {
            const result = await service.getConversations({
                filter: parsed.data.filter as ConversationFilter,
                channelCode: parsed.data.channel as MessageChannel | undefined,
                searchQuery: parsed.data.q,
                patientId: parsed.data.patientId,
                limit: parsed.data.limit,
            })
            return NextResponse.json(result)
        }

        if (parsed.data.type === 'messages') {
            if (!parsed.data.conversationId) {
                return NextResponse.json(
                    { error: 'conversationId is required for type=messages' },
                    { status: 400 }
                )
            }

            const result = await service.getMessages({
                conversationId: parsed.data.conversationId,
                limit: parsed.data.limit,
                cursor: parsed.data.cursor,
            })
            return NextResponse.json(result)
        }

        return NextResponse.json(
            { error: 'Invalid type parameter' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Messages API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input with Zod
        const parsed = composeMessageSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid parameters', details: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const service = getMessagingService()
        const result = await service.sendMessage(parsed.data)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            )
        }

        // Audit log message send
        await logAudit({
            action: 'create',
            resourceType: 'message',
            details: { channel: parsed.data.channelCode, patientId: parsed.data.patientId },
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error('Messages API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
