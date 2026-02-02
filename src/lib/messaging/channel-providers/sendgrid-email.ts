// Tebra Mental Health MVP: SendGrid Email Provider
// Provider implementation for sending/receiving email via SendGrid

import {
    ChannelProvider,
    SendParams,
    SendResult,
    InboundMessageData,
} from './index';

// ============================================
// SENDGRID EMAIL PROVIDER
// ============================================
export class SendGridEmailProvider implements ChannelProvider {
    channelCode = 'email' as const;

    private apiKey: string;
    private fromEmail: string;

    constructor() {
        this.apiKey = process.env.SENDGRID_API_KEY || '';
        this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@tebra.com';
    }

    async send(params: SendParams): Promise<SendResult> {
        const { recipientAddress, content, contentHtml, subject, attachments } = params;

        if (!this.apiKey) {
            console.warn('SendGrid API key not configured - using mock mode');
            return {
                success: true,
                externalId: `mock_email_${Date.now()}`,
                metadata: { mock: true },
            };
        }

        try {
            // For MVP, return mock success (replace with SendGrid SDK in production)
            const mockExternalId = `SG${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

            // Mock email send — in production, use SendGrid SDK

            return {
                success: true,
                externalId: mockExternalId,
                metadata: {
                    from: this.fromEmail,
                    to: recipientAddress,
                    subject,
                    hasAttachments: (attachments?.length || 0) > 0,
                },
            };
        } catch (error) {
            console.error('[SendGrid Email] Send error:', error);
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
        // SendGrid Inbound Parse sends multipart form data
        const data = payload as Record<string, unknown>;

        const from = data.from as string;
        const subject = data.subject as string;
        const text = data.text as string;
        const html = data.html as string;

        if (!from) {
            console.warn('[SendGrid Email] Invalid inbound payload - missing from');
            return null;
        }

        // Extract email address from "Name <email@example.com>" format
        const emailMatch = from.match(/<(.+)>/) || [null, from];
        const senderAddress = emailMatch[1] || from;

        // Extract sender name
        const nameMatch = from.match(/^([^<]+)\s*</);
        const senderName = nameMatch ? nameMatch[1].trim() : undefined;

        // Parse attachments if present
        const attachments = this.parseAttachments(data);

        return {
            externalId: `inbound_${Date.now()}`,
            senderAddress,
            senderName,
            content: text || this.stripHtml(html) || '',
            contentHtml: html,
            subject,
            attachments,
            receivedAt: new Date(),
            rawPayload: data,
        };
    }

    private parseAttachments(data: Record<string, unknown>): Array<{
        filename: string;
        url: string;
        contentType: string;
        sizeBytes: number;
    }> | undefined {
        const attachmentInfo = data['attachment-info'];
        if (!attachmentInfo) return undefined;

        try {
            const info = typeof attachmentInfo === 'string'
                ? JSON.parse(attachmentInfo)
                : attachmentInfo;

            return Object.entries(info as Record<string, Record<string, string>>).map(([key, att]) => ({
                filename: att.filename || key,
                url: '', // Would be populated from file upload
                contentType: att.type || 'application/octet-stream',
                sizeBytes: 0,
            }));
        } catch {
            return undefined;
        }
    }

    private stripHtml(html: string | undefined): string {
        if (!html) return '';
        return html
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
    }

    verifyWebhookSignature(payload: string, signature: string): boolean {
        // SendGrid Inbound Parse uses basic auth verification.
        // Validate the provided credentials against expected values.
        const expectedUser = process.env.SENDGRID_WEBHOOK_USER || '';
        const expectedPass = process.env.SENDGRID_WEBHOOK_PASS || '';

        if (!expectedUser || !expectedPass) {
            console.warn('[SendGrid Email] Webhook credentials not configured — rejecting in production');
            return process.env.NODE_ENV !== 'production';
        }

        // Basic auth signature format: "Basic base64(user:pass)"
        const expected = Buffer.from(`${expectedUser}:${expectedPass}`).toString('base64');
        return signature === `Basic ${expected}`;
    }
}
