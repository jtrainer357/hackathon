"use client"

// Tebra Mental Health MVP: Compose Message Component
// Form for composing and sending messages

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
    MessageChannel,
    Conversation,
    ComposeMessageInput,
    CHANNEL_CONFIG,
} from '@/types/messaging'
import { ChannelIcon } from './ChannelIcon'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
    SendIcon,
    File,
    SparklesIcon,
} from 'lucide-react'

interface ComposeMessageProps {
    conversation: Conversation
    onSend: (input: ComposeMessageInput) => Promise<void>
    isLoading?: boolean
}

export function ComposeMessage({
    conversation,
    onSend,
    isLoading,
}: ComposeMessageProps) {
    const [channel, setChannel] = useState<MessageChannel>('sms')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [isSending, setIsSending] = useState(false)

    const patient = conversation.patient

    // Determine available channels based on patient contact info
    const availableChannels: MessageChannel[] = []
    if (patient?.phone) availableChannels.push('sms')
    if (patient?.email) availableChannels.push('email')

    // Get current channel config
    const channelConfig = CHANNEL_CONFIG[channel]
    const maxLength = channelConfig?.maxContentLength
    const isOverLimit = maxLength ? content.length > maxLength : false

    // Handle channel switch
    const handleChannelChange = useCallback((newChannel: MessageChannel) => {
        setChannel(newChannel)
        // Clear subject if switching away from email
        if (newChannel !== 'email') {
            setSubject('')
        }
    }, [])

    // Handle send
    const handleSend = async () => {
        if (!content.trim() || isSending || isLoading) return

        setIsSending(true)
        try {
            await onSend({
                patientId: conversation.patientId,
                channelCode: channel,
                subject: channel === 'email' ? subject : undefined,
                content: content.trim(),
            })
            setContent('')
            setSubject('')
        } catch (error) {
            console.error('Failed to send message:', error)
        } finally {
            setIsSending(false)
        }
    }

    // Handle enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && channel === 'sms') {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="border-t border-border bg-background p-3 md:p-4 space-y-3">
            {/* Channel selector */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Send via:</span>
                <div className="flex gap-1">
                    {availableChannels.map((ch) => (
                        <button
                            key={ch}
                            onClick={() => handleChannelChange(ch)}
                            aria-label={`Send via ${CHANNEL_CONFIG[ch].name}`}
                            aria-pressed={channel === ch}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[32px]',
                                channel === ch
                                    ? 'bg-growth-2 text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                        >
                            <ChannelIcon channel={ch} size="sm" />
                            {CHANNEL_CONFIG[ch].name}
                        </button>
                    ))}
                </div>

                {availableChannels.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">
                        No contact info available
                    </span>
                )}
            </div>

            {/* Subject line (email only) */}
            {channel === 'email' && (
                <Input
                    placeholder="Subject"
                    aria-label="Email subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-10"
                />
            )}

            {/* Message input */}
            <div className="relative">
                <Textarea
                    aria-label="Message content"
                    placeholder={`Message ${patient?.firstName || 'patient'}...`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className={cn(
                        'resize-none pr-24 min-h-[80px]',
                        isOverLimit && 'border-vitality-1 focus-visible:ring-vitality-1'
                    )}
                    disabled={availableChannels.length === 0}
                />

                {/* Character count */}
                {maxLength && (
                    <div className={cn(
                        'absolute bottom-2 left-3 text-[10px] font-medium',
                        isOverLimit ? 'text-vitality-1' : 'text-muted-foreground'
                    )}>
                        {content.length}/{maxLength}
                    </div>
                )}

                {/* Actions */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    {/* Templates button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled
                        title="Templates (coming soon)"
                    >
                        <File className="h-4 w-4" />
                    </Button>

                    {/* AI assist button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled
                        title="AI Assist (coming soon)"
                    >
                        <SparklesIcon className="h-4 w-4 text-growth-2" />
                    </Button>

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        disabled={!content.trim() || isSending || isLoading || isOverLimit || availableChannels.length === 0}
                        className="h-8 px-3 bg-vitality-1 hover:bg-vitality-2"
                    >
                        <SendIcon className="h-4 w-4 mr-1" />
                        Send
                    </Button>
                </div>
            </div>

            {/* Channel-specific hints */}
            <div className="text-[10px] text-muted-foreground">
                {channel === 'sms' && (
                    <span>Press Enter to send • SMS charges may apply</span>
                )}
                {channel === 'email' && (
                    <span>Press Shift+Enter for new line • Email will be sent from practice address</span>
                )}
            </div>
        </div>
    )
}
