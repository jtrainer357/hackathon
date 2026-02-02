// Tebra Mental Health MVP: Messaging Service
// Core service for managing conversations and messages

import {
    Message,
    Conversation,
    MessageChannel,
    ConversationFilter,
    ComposeMessageInput,
    ConversationListResponse,
    MessageListResponse,
    SendMessageResponse,
    CHANNEL_CONFIG,
} from '@/types/messaging';
import { getProvider, InboundMessageData } from './channel-providers';

// ============================================
// MOCK DATA (Replace with Supabase queries)
// ============================================
const mockPatients = [
    { id: 'p1', firstName: 'Sarah', lastName: 'Johnson', phone: '+15551234567', email: 'sarah.j@email.com' },
    { id: 'p2', firstName: 'Michael', lastName: 'Chen', phone: '+15559876543', email: 'mchen@email.com' },
    { id: 'p3', firstName: 'Emily', lastName: 'Davis', phone: '+15555551234', email: 'emily.davis@email.com' },
];

const mockConversations: Conversation[] = [
    {
        id: 'conv1',
        practiceId: 'practice1',
        patientId: 'p1',
        patient: { id: 'p1', firstName: 'Sarah', lastName: 'Johnson', fullName: 'Sarah Johnson', initials: 'SJ', phone: '+15551234567', email: 'sarah.j@email.com' },
        lastMessageAt: new Date('2026-01-31T14:30:00'),
        lastMessagePreview: 'Thank you for the session notes. I have a question about...',
        lastMessageChannel: 'email',
        unreadCount: 1,
        isArchived: false,
        isFlagged: false,
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-31T14:30:00'),
    },
    {
        id: 'conv2',
        practiceId: 'practice1',
        patientId: 'p2',
        patient: { id: 'p2', firstName: 'Michael', lastName: 'Chen', fullName: 'Michael Chen', initials: 'MC', phone: '+15559876543', email: 'mchen@email.com' },
        lastMessageAt: new Date('2026-01-31T10:15:00'),
        lastMessagePreview: 'Hi, can I reschedule my Thursday appointment?',
        lastMessageChannel: 'sms',
        unreadCount: 2,
        isArchived: false,
        isFlagged: false,
        createdAt: new Date('2026-01-10'),
        updatedAt: new Date('2026-01-31T10:15:00'),
    },
    {
        id: 'conv3',
        practiceId: 'practice1',
        patientId: 'p3',
        patient: { id: 'p3', firstName: 'Emily', lastName: 'Davis', fullName: 'Emily Davis', initials: 'ED', phone: '+15555551234', email: 'emily.davis@email.com' },
        lastMessageAt: new Date('2026-01-30T16:45:00'),
        lastMessagePreview: 'See you next week!',
        lastMessageChannel: 'sms',
        unreadCount: 0,
        isArchived: false,
        isFlagged: true,
        createdAt: new Date('2026-01-05'),
        updatedAt: new Date('2026-01-30T16:45:00'),
    },
];

const mockMessages: Message[] = [
    {
        id: 'msg1',
        conversationId: 'conv1',
        practiceId: 'practice1',
        patientId: 'p1',
        channelCode: 'email',
        direction: 'inbound',
        senderType: 'patient',
        senderName: 'Sarah Johnson',
        subject: 'Re: Session Notes from Jan 28',
        contentText: 'Thank you for the session notes. I have a question about the homework assignment you mentioned. Could you clarify the breathing exercise?',
        status: 'delivered',
        isRead: false,
        isFlaggedByAi: false,
        createdAt: new Date('2026-01-31T14:30:00'),
    },
    {
        id: 'msg2',
        conversationId: 'conv1',
        practiceId: 'practice1',
        patientId: 'p1',
        channelCode: 'email',
        direction: 'outbound',
        senderType: 'provider',
        senderName: 'Dr. Provider',
        subject: 'Session Notes from Jan 28',
        contentText: 'Hi Sarah, Attached are your session notes from our appointment on January 28th. Please let me know if you have any questions.',
        status: 'delivered',
        isRead: true,
        isFlaggedByAi: false,
        createdAt: new Date('2026-01-28T18:00:00'),
    },
    {
        id: 'msg3',
        conversationId: 'conv2',
        practiceId: 'practice1',
        patientId: 'p2',
        channelCode: 'sms',
        direction: 'inbound',
        senderType: 'patient',
        senderName: 'Michael Chen',
        contentText: 'Hi, can I reschedule my Thursday appointment? Something came up at work.',
        status: 'delivered',
        isRead: false,
        isFlaggedByAi: false,
        createdAt: new Date('2026-01-31T10:15:00'),
    },
    {
        id: 'msg4',
        conversationId: 'conv2',
        practiceId: 'practice1',
        patientId: 'p2',
        channelCode: 'sms',
        direction: 'inbound',
        senderType: 'patient',
        senderName: 'Michael Chen',
        contentText: 'Would Friday at 2pm work instead?',
        status: 'delivered',
        isRead: false,
        isFlaggedByAi: false,
        createdAt: new Date('2026-01-31T10:16:00'),
    },
];

// ============================================
// MESSAGING SERVICE
// ============================================
export class MessagingService {
    private practiceId: string;

    constructor(practiceId: string) {
        this.practiceId = practiceId;
    }

    /**
     * Get list of conversations with filters
     */
    async getConversations(options: {
        filter?: ConversationFilter;
        channelCode?: MessageChannel;
        searchQuery?: string;
        patientId?: string;
        limit?: number;
        cursor?: string;
    } = {}): Promise<ConversationListResponse> {
        const { filter = 'all', channelCode, searchQuery, patientId, limit = 50 } = options;

        let conversations = [...mockConversations];

        // Apply filters
        if (filter === 'unread') {
            conversations = conversations.filter(c => c.unreadCount > 0);
        } else if (filter === 'flagged') {
            conversations = conversations.filter(c => c.isFlagged);
        } else if (filter === 'archived') {
            conversations = conversations.filter(c => c.isArchived);
        } else {
            conversations = conversations.filter(c => !c.isArchived);
        }

        // Filter by channel
        if (channelCode) {
            conversations = conversations.filter(c => c.lastMessageChannel === channelCode);
        }

        // Filter by patient
        if (patientId) {
            conversations = conversations.filter(c => c.patientId === patientId);
        }

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            conversations = conversations.filter(c =>
                c.patient?.fullName.toLowerCase().includes(query) ||
                c.lastMessagePreview?.toLowerCase().includes(query)
            );
        }

        // Sort by last message
        conversations.sort((a, b) =>
            (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0)
        );

        return {
            conversations: conversations.slice(0, limit),
            totalCount: conversations.length,
            hasMore: conversations.length > limit,
        };
    }

    /**
     * Get messages for a conversation
     */
    async getMessages(options: {
        conversationId: string;
        limit?: number;
        cursor?: string;
    }): Promise<MessageListResponse> {
        const { conversationId, limit = 50 } = options;

        const messages = mockMessages
            .filter(m => m.conversationId === conversationId)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        return {
            messages: messages.slice(0, limit),
            hasMore: messages.length > limit,
        };
    }

    /**
     * Send a new message
     */
    async sendMessage(input: ComposeMessageInput): Promise<SendMessageResponse> {
        const { patientId, channelCode, subject, content } = input;

        // Find patient
        const patient = mockPatients.find(p => p.id === patientId);
        if (!patient) {
            return { success: false, error: 'Patient not found' };
        }

        // Get channel config
        const channelConfig = CHANNEL_CONFIG[channelCode];
        if (!channelConfig) {
            return { success: false, error: 'Invalid channel' };
        }

        // Validate content length
        if (channelConfig.maxContentLength && content.length > channelConfig.maxContentLength) {
            return {
                success: false,
                error: `Content exceeds ${channelConfig.maxContentLength} character limit for ${channelConfig.name}`
            };
        }

        // Get recipient address
        let recipientAddress: string;
        if (channelCode === 'sms') {
            recipientAddress = patient.phone || '';
        } else if (channelCode === 'email') {
            recipientAddress = patient.email || '';
        } else {
            recipientAddress = '';
        }

        if (!recipientAddress) {
            return { success: false, error: `Patient does not have ${channelConfig.name} contact info` };
        }

        // Get provider and send
        const provider = getProvider(channelCode);
        if (!provider) {
            console.warn(`No provider configured for ${channelCode} - using mock`);
        }

        const messageId = `msg_${Date.now()}`;

        if (provider) {
            const result = await provider.send({
                messageId,
                patientId,
                recipientAddress,
                content,
                subject,
            });

            if (!result.success) {
                return { success: false, error: result.error };
            }

            return {
                success: true,
                messageId,
                externalId: result.externalId,
            };
        }

        // Mock success
        // Mock send — in production, this path won't be reached

        return {
            success: true,
            messageId,
            externalId: `mock_${Date.now()}`,
        };
    }

    /**
     * Handle inbound message from webhook
     */
    async handleInbound(
        channelCode: MessageChannel,
        data: InboundMessageData
    ): Promise<{ success: boolean; messageId?: string; error?: string }> {
        // Process inbound message

        // In production:
        // 1. Look up patient by sender address (phone/email)
        // 2. Find or create conversation
        // 3. Insert message into database
        // 4. Update conversation summary (trigger handles this)
        // 5. Send realtime notification

        const messageId = `msg_${Date.now()}`;

        return {
            success: true,
            messageId,
        };
    }

    /**
     * Mark messages as read
     */
    async markAsRead(conversationId: string): Promise<void> {
        // Mark conversation as read in database

        // In production:
        // UPDATE messages SET is_read = true, read_at = NOW()
        // WHERE conversation_id = ? AND is_read = false AND direction = 'inbound';
        // UPDATE conversations SET unread_count = 0 WHERE id = ?;
    }

    /**
     * Archive a conversation
     */
    async archiveConversation(conversationId: string): Promise<void> {
        // Archive conversation in database
    }

    /**
     * Flag/unflag a conversation
     */
    async flagConversation(conversationId: string, isFlagged: boolean): Promise<void> {
        // Update flag status in database
    }
}

// ============================================
// SINGLETON INSTANCE
// ============================================
let messagingService: MessagingService | null = null;

export function getMessagingService(practiceId?: string): MessagingService {
    if (!messagingService) {
        messagingService = new MessagingService(practiceId || 'practice1');
    }
    return messagingService;
}
