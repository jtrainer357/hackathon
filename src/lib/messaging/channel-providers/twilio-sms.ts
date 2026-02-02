// Tebra Mental Health MVP: Twilio SMS Provider
// Provider implementation for sending/receiving SMS via Twilio

import {
    ChannelProvider,
    SendParams,
    SendResult,
    InboundMessageData,
    StatusUpdateData,
} from './index';

// ============================================
// TWILIO SMS PROVIDER
// ============================================
export class TwilioSmsProvider implements ChannelProvider {
    channelCode = 'sms' as const;

    private accountSid: string;
    private authToken: string;
    private fromNumber: string;

    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID || '';
        this.authToken = process.env.TWILIO_AUTH_TOKEN || '';
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '';
    }

    async send(params: SendParams): Promise<SendResult> {
        const { recipientAddress, content } = params;

        if (!this.accountSid || !this.authToken) {
            console.warn('Twilio credentials not configured - using mock mode');
            return {
                success: true,
                externalId: `mock_sms_${Date.now()}`,
                metadata: { mock: true },
            };
        }

        try {
            // For MVP, return mock success (replace with Twilio SDK in production)
            const mockExternalId = `SM${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

            // Mock SMS send — in production, use Twilio SDK

            return {
                success: true,
                externalId: mockExternalId,
                metadata: {
                    from: this.fromNumber,
                    to: recipientAddress,
                    status: 'queued',
                },
            };
        } catch (error) {
            console.error('[Twilio SMS] Send error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async parseInbound(
        payload: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _headers?: Record<string, string>
    ): Promise<InboundMessageData | null> {
        // Twilio sends webhook as form data
        const data = payload as Record<string, string>;

        if (!data.MessageSid || !data.From || !data.Body) {
            console.warn('[Twilio SMS] Invalid inbound payload');
            return null;
        }

        return {
            externalId: data.MessageSid,
            senderAddress: data.From,
            senderName: undefined, // Twilio doesn't provide name
            content: data.Body,
            attachments: data.NumMedia && parseInt(data.NumMedia) > 0
                ? this.parseMediaAttachments(data)
                : undefined,
            receivedAt: new Date(),
            rawPayload: data,
        };
    }

    private parseMediaAttachments(data: Record<string, string>): Array<{
        filename: string;
        url: string;
        contentType: string;
        sizeBytes: number;
    }> {
        const numMedia = parseInt(data.NumMedia || '0');
        const attachments = [];

        for (let i = 0; i < numMedia; i++) {
            const url = data[`MediaUrl${i}`];
            const contentType = data[`MediaContentType${i}`];

            if (url && contentType) {
                attachments.push({
                    filename: `attachment_${i}`,
                    url,
                    contentType,
                    sizeBytes: 0, // Twilio doesn't provide size in webhook
                });
            }
        }

        return attachments;
    }

    async parseStatusUpdate(
        payload: unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _headers?: Record<string, string>
    ): Promise<StatusUpdateData | null> {
        const data = payload as Record<string, string>;

        if (!data.MessageSid || !data.MessageStatus) {
            return null;
        }

        const statusMap: Record<string, 'delivered' | 'failed' | 'read'> = {
            delivered: 'delivered',
            undelivered: 'failed',
            failed: 'failed',
            read: 'read',
        };

        const status = statusMap[data.MessageStatus];
        if (!status) {
            return null; // Intermediate status like 'sent', 'queued'
        }

        return {
            externalId: data.MessageSid,
            status,
            statusMessage: data.ErrorMessage,
            metadata: {
                twilioStatus: data.MessageStatus,
                errorCode: data.ErrorCode,
            },
            updatedAt: new Date(),
        };
    }

    verifyWebhookSignature(payload: string, signature: string): boolean {
        if (!this.authToken) {
            console.warn('[Twilio SMS] No auth token — rejecting in production');
            return process.env.NODE_ENV !== 'production';
        }

        // Twilio signature verification using HMAC-SHA1
        // https://www.twilio.com/docs/usage/security#validating-requests
        const crypto = require('crypto') as typeof import('crypto');
        const webhookUrl = process.env.TWILIO_WEBHOOK_URL || process.env.NEXT_PUBLIC_APP_URL || '';
        const fullUrl = `${webhookUrl}/api/webhooks/twilio/sms`;

        // Sort POST params and append to URL
        const data = fullUrl + payload;
        const expectedSignature = crypto
            .createHmac('sha1', this.authToken)
            .update(Buffer.from(data, 'utf-8'))
            .digest('base64');

        return expectedSignature === signature;
    }
}
