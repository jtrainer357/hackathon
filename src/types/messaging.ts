// Tebra Mental Health MVP: Messaging Types
// Channel-agnostic messaging architecture

// ============================================
// CHANNEL TYPES (extensible)
// ============================================
export type MessageChannel = 'sms' | 'email' | 'voice' | 'fax' | 'in_app' | 'chat';

export interface MessageChannelConfig {
    code: MessageChannel;
    name: string;
    iconName: string;
    iconColor: string;
    supportsAttachments: boolean;
    supportsRichText: boolean;
    maxContentLength: number | null;
}

// Channel configurations with Design System colors
export const CHANNEL_CONFIG: Record<MessageChannel, MessageChannelConfig> = {
    sms: {
        code: 'sms',
        name: 'SMS',
        iconName: 'MessageSquare01Icon',
        iconColor: 'text-growth-3',
        supportsAttachments: false,
        supportsRichText: false,
        maxContentLength: 1600,
    },
    email: {
        code: 'email',
        name: 'Email',
        iconName: 'Mail01Icon',
        iconColor: 'text-vitality-2',
        supportsAttachments: true,
        supportsRichText: true,
        maxContentLength: null,
    },
    voice: {
        code: 'voice',
        name: 'Voice',
        iconName: 'VoiceIcon',
        iconColor: 'text-synapse-5',
        supportsAttachments: true,
        supportsRichText: false,
        maxContentLength: null,
    },
    fax: {
        code: 'fax',
        name: 'Fax',
        iconName: 'PrinterIcon',
        iconColor: 'text-synapse-4',
        supportsAttachments: true,
        supportsRichText: false,
        maxContentLength: null,
    },
    in_app: {
        code: 'in_app',
        name: 'In-App',
        iconName: 'Notification03Icon',
        iconColor: 'text-growth-2',
        supportsAttachments: false,
        supportsRichText: true,
        maxContentLength: 5000,
    },
    chat: {
        code: 'chat',
        name: 'Chat',
        iconName: 'MessageSquare02Icon',
        iconColor: 'text-growth-1',
        supportsAttachments: true,
        supportsRichText: true,
        maxContentLength: null,
    },
};

// ============================================
// MESSAGE TYPES
// ============================================
export type MessageDirection = 'inbound' | 'outbound';
export type MessageSenderType = 'patient' | 'provider' | 'staff' | 'system';
export type MessageStatus = 'draft' | 'queued' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
    id: string;
    conversationId: string;
    practiceId: string;
    patientId: string;
    channelCode: MessageChannel;
    direction: MessageDirection;
    senderType: MessageSenderType;
    senderId?: string;
    senderName?: string;
    recipientType?: string;
    recipientId?: string;
    subject?: string;
    contentText: string;
    contentHtml?: string;
    contentMetadata?: Record<string, unknown>;
    audioUrl?: string;
    audioDurationSeconds?: number;
    transcription?: string;
    status: MessageStatus;
    statusUpdatedAt?: Date;
    errorMessage?: string;
    externalId?: string;
    deliveryMetadata?: Record<string, unknown>;
    isRead: boolean;
    readAt?: Date;
    isFlaggedByAi: boolean;
    aiFlagReason?: string;
    aiSuggestedResponse?: string;
    sentAt?: Date;
    deliveredAt?: Date;
    createdAt: Date;
    attachments?: MessageAttachment[];
}

// ============================================
// CONVERSATION TYPES
// ============================================
export interface Conversation {
    id: string;
    practiceId: string;
    patientId: string;
    patient?: PatientSummary;
    lastMessageAt?: Date;
    lastMessagePreview?: string;
    lastMessageChannel?: MessageChannel;
    unreadCount: number;
    isArchived: boolean;
    isFlagged: boolean;
    createdAt: Date;
    updatedAt: Date;
    messages?: Message[];
}

export interface PatientSummary {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl?: string;
    phone?: string;
    email?: string;
    initials: string;
}

// ============================================
// ATTACHMENT TYPES
// ============================================
export interface MessageAttachment {
    id: string;
    messageId: string;
    filename: string;
    contentType: string;
    sizeBytes: number;
    storageUrl: string;
    durationSeconds?: number;
    width?: number;
    height?: number;
    thumbnailUrl?: string;
    createdAt: Date;
}

// ============================================
// TEMPLATE TYPES
// ============================================
export type TemplateCategory = 'appointment' | 'billing' | 'clinical' | 'general';

export interface MessageTemplate {
    id: string;
    practiceId: string;
    name: string;
    channelCodes: MessageChannel[];
    subjectTemplate?: string;
    contentTemplate: string;
    category?: TemplateCategory;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// INPUT TYPES
// ============================================
export interface ComposeMessageInput {
    patientId: string;
    channelCode: MessageChannel;
    subject?: string;
    content: string;
    templateId?: string;
    attachmentIds?: string[];
}

export interface SendMessageOptions {
    sms?: {
        fromNumber?: string;
        mediaUrls?: string[];
    };
    email?: {
        fromAddress?: string;
        replyTo?: string;
        trackOpens?: boolean;
        trackClicks?: boolean;
    };
    voice?: {
        transcribe?: boolean;
    };
}

// ============================================
// FILTER TYPES
// ============================================
export type ConversationFilter = 'all' | 'unread' | 'flagged' | 'archived';

export interface ConversationListFilters {
    filter: ConversationFilter;
    channelCode?: MessageChannel;
    searchQuery?: string;
    patientId?: string;
}

export interface MessageListFilters {
    conversationId: string;
    limit?: number;
    cursor?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ConversationListResponse {
    conversations: Conversation[];
    totalCount: number;
    hasMore: boolean;
    nextCursor?: string;
}

export interface MessageListResponse {
    messages: Message[];
    hasMore: boolean;
    nextCursor?: string;
}

export interface SendMessageResponse {
    success: boolean;
    messageId?: string;
    externalId?: string;
    error?: string;
}
