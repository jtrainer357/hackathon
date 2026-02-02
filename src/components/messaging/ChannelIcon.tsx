"use client"

// Tebra Mental Health MVP: Channel Icon Component
// Displays the appropriate icon for each message channel

import { MessageChannel, CHANNEL_CONFIG } from '@/types/messaging'
import {
    MessageFilter1Icon,
    MailFilter1Icon,
    MicFilter1Icon,
    PrinterIcon,
    NotificationFilter1Icon,
    CommentFilter1Icon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChannelIconProps {
    channel: MessageChannel
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
    className?: string
}

const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
}

const iconComponents: Record<MessageChannel, React.ComponentType<{ className?: string }>> = {
    sms: MessageFilter1Icon,
    email: MailFilter1Icon,
    voice: MicFilter1Icon,
    fax: PrinterIcon,
    in_app: NotificationFilter1Icon,
    chat: CommentFilter1Icon,
}

export function ChannelIcon({
    channel,
    size = 'md',
    showLabel = false,
    className,
}: ChannelIconProps) {
    const config = CHANNEL_CONFIG[channel]
    const Icon = iconComponents[channel]

    if (!config || !Icon) {
        return null
    }

    return (
        <span className={cn('inline-flex items-center gap-1.5', className)}>
            <Icon className={cn(iconSizes[size], config.iconColor)} />
            {showLabel && (
                <span className="text-xs font-medium text-synapse-4">{config.name}</span>
            )}
        </span>
    )
}

// Badge variant for use in conversation lists
export function ChannelBadge({
    channel,
    className,
}: {
    channel: MessageChannel
    className?: string
}) {
    const config = CHANNEL_CONFIG[channel]
    const Icon = iconComponents[channel]

    if (!config || !Icon) {
        return null
    }

    return (
        <span
            className={cn(
                'inline-flex items-center justify-center h-6 w-6 rounded-full bg-backbone-1',
                className
            )}
        >
            <Icon className={cn('h-3.5 w-3.5', config.iconColor)} />
        </span>
    )
}
