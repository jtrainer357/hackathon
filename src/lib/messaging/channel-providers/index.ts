// Tebra Mental Health MVP: Channel Provider Interface
// Abstract interface for all messaging channel providers

import { MessageChannel } from '@/types/messaging';

// ============================================
// PROVIDER INTERFACE
// ============================================
export interface SendParams {
    messageId: string;
    patientId: string;
    recipientAddress: string; // phone number for SMS, email for Email
    content: string;
    contentHtml?: string;
    subject?: string;
    attachments?: Array<{
        filename: string;
        url: string;
        contentType: string;
    }>;
    channelOptions?: Record<string, unknown>;
}

export interface SendResult {
    success: boolean;
    externalId?: string;
    metadata?: Record<string, unknown>;
    error?: string;
}

export interface InboundMessageData {
    externalId: string;
    senderAddress: string; // phone number or email
    senderName?: string;
    content: string;
    contentHtml?: string;
    subject?: string;
    audioUrl?: string;
    audioDuration?: number;
    attachments?: Array<{
        filename: string;
        url: string;
        contentType: string;
        sizeBytes: number;
    }>;
    receivedAt: Date;
    rawPayload: unknown;
}

export interface StatusUpdateData {
    externalId: string;
    status: 'delivered' | 'failed' | 'read';
    statusMessage?: string;
    metadata?: Record<string, unknown>;
    updatedAt: Date;
}

export interface ChannelProvider {
    channelCode: MessageChannel;

    /**
     * Send a message through this channel
     */
    send(params: SendParams): Promise<SendResult>;

    /**
     * Parse an inbound webhook payload into message data
     */
    parseInbound(payload: unknown, headers?: Record<string, string>): Promise<InboundMessageData | null>;

    /**
     * Parse a status update webhook payload
     */
    parseStatusUpdate?(payload: unknown, headers?: Record<string, string>): Promise<StatusUpdateData | null>;

    /**
     * Verify webhook signature (security)
     */
    verifyWebhookSignature?(payload: string, signature: string): boolean;
}

// ============================================
// PROVIDER REGISTRY
// ============================================
const providerRegistry = new Map<MessageChannel, ChannelProvider>();

export function registerProvider(provider: ChannelProvider): void {
    providerRegistry.set(provider.channelCode, provider);
}

export function getProvider(channelCode: MessageChannel): ChannelProvider | undefined {
    return providerRegistry.get(channelCode);
}

export function getAllProviders(): ChannelProvider[] {
    return Array.from(providerRegistry.values());
}

// Re-export providers
export { TwilioSmsProvider } from './twilio-sms';
export { SendGridEmailProvider } from './sendgrid-email';
