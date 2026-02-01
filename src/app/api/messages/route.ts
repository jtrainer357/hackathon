// Tebra Mental Health MVP: Messages API Route
// GET: List conversations or messages
// POST: Send new message

import { NextRequest, NextResponse } from 'next/server'
import { getMessagingService } from '@/lib/messaging/messaging-service'
import { ComposeMessageInput, ConversationFilter, MessageChannel } from '@/types/messaging'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') || 'conversations'

        const service = getMessagingService()

        if (type === 'conversations') {
            const filter = (searchParams.get('filter') || 'all') as ConversationFilter
            const channelCode = searchParams.get('channel') as MessageChannel | undefined
            const searchQuery = searchParams.get('q') || ''
            const patientId = searchParams.get('patientId') || undefined
            const limit = parseInt(searchParams.get('limit') || '50')

            const result = await service.getConversations({
                filter,
                channelCode,
                searchQuery,
                patientId,
                limit,
            })

            return NextResponse.json(result)
        }

        if (type === 'messages') {
            const conversationId = searchParams.get('conversationId')
            if (!conversationId) {
                return NextResponse.json(
                    { error: 'conversationId is required' },
                    { status: 400 }
                )
            }

            const limit = parseInt(searchParams.get('limit') || '50')
            const cursor = searchParams.get('cursor') || undefined

            const result = await service.getMessages({
                conversationId,
                limit,
                cursor,
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
        const body = await request.json() as ComposeMessageInput

        // Validate required fields
        if (!body.patientId || !body.channelCode || !body.content) {
            return NextResponse.json(
                { error: 'patientId, channelCode, and content are required' },
                { status: 400 }
            )
        }

        const service = getMessagingService()
        const result = await service.sendMessage(body)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            )
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('Messages API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
