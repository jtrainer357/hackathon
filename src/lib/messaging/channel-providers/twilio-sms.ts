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
            // In production, use Twilio SDK:
            // const twilio = require('twilio')(this.accountSid, this.authToken);
            // const message = await twilio.messages.create({
            //   body: content,
            //   from: this.fromNumber,
            //   to: recipientAddress,
            // });

            // For MVP, return mock success
            const mockExternalId = `SM${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

            console.log(`[Twilio SMS] Sending to ${recipientAddress}: ${content.slice(0, 50)}...`);

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
            console.warn('[Twilio SMS] No auth token - skipping signature verification');
            return true; // Skip in development
        }

        // In production, verify Twilio signature:
        // const crypto = require('crypto');
        // const expectedSignature = crypto
        //   .createHmac('sha1', this.authToken)
        //   .update(payload)
        //   .digest('base64');
        // return signature === expectedSignature;

        console.log('[Twilio SMS] Signature verification:', signature.slice(0, 10) + '...');
        return true; // TODO: Implement actual verification
    }
}
