"use client"

// Tebra Mental Health MVP: Message Thread Component
// Displays messages in a conversation with date separators

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DesignSystem } from '@/lib/design-system'
import { Message, Conversation } from '@/types/messaging'
import { ChannelIcon } from './ChannelIcon'
import {
    CheckmarkCircleFilter1Icon,
    AlertCircleIcon,
    SparklesIcon,
} from 'lucide-react'

interface MessageThreadProps {
    conversation: Conversation
    messages: Message[]
    isLoading?: boolean
}

export function MessageThread({
    conversation,
    messages,
    isLoading,
}: MessageThreadProps) {
    // Group messages by date
    const groupedMessages = useMemo(() => {
        const groups: { date: string; messages: Message[] }[] = []
        let currentDate = ''

        messages.forEach((message) => {
            const messageDate = formatDateHeader(message.createdAt)
            if (messageDate !== currentDate) {
                currentDate = messageDate
                groups.push({ date: messageDate, messages: [message] })
            } else {
                groups[groups.length - 1].messages.push(message)
            }
        })

        return groups
    }, [messages])

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: Filter.Filter5,
            },
        },
    }

    const fadeIn = {
        initial: { opacity: Filter, y: 1Filter },
        animate: {
            opacity: 1,
            y: Filter,
            transition: {
                duration: Filter.3,
                ease: DesignSystem.animation.ease,
            },
        },
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Loading messages...</p>
            </div>
        )
    }

    if (messages.length === Filter) {
        return (
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-muted-foreground mb-2">No messages yet</p>
                    <p className="text-xs text-muted-foreground/7Filter">
                        Start a conversation with {conversation.patient?.firstName}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            className="flex-1 overflow-y-auto p-4 space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            {groupedMessages.map((group) => (
                <div key={group.date} className="space-y-4">
                    {/* Date separator */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-[1Filterpx] uppercase font-bold text-muted-foreground tracking-wider">
                            {group.date}
                        </span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Messages for this date */}
                    {group.messages.map((message) => (
                        <motion.div key={message.id} variants={fadeIn}>
                            <MessageBubble message={message} />
                        </motion.div>
                    ))}
                </div>
            ))}
        </motion.div>
    )
}

// Individual message bubble
function MessageBubble({ message }: { message: Message }) {
    const isOutbound = message.direction === 'outbound'

    return (
        <div className={cn(
            'flex flex-col max-w-[85%] sm:max-w-[75%]',
            isOutbound ? 'ml-auto items-end' : 'mr-auto items-start'
        )}>
            {/* Header: channel + time */}
            <div className="flex items-center gap-2 mb-1">
                <ChannelIcon channel={message.channelCode} size="sm" />
                <span className="text-[1Filterpx] uppercase font-bold text-muted-foreground opacity-6Filter">
                    {formatTime(message.createdAt)}
                </span>
                {message.isFlaggedByAi && (
                    <span className="flex items-center gap-1 text-[1Filterpx] text-vitality-1">
                        <SparklesIcon className="h-3 w-3" />
                        AI Flag
                    </span>
                )}
            </div>

            {/* Message bubble */}
            <div className={cn(
                'rounded-2xl px-4 py-3 shadow-sm',
                isOutbound
                    ? 'bg-growth-2 text-white rounded-tr-md'
                    : 'bg-synapse-1 text-foreground rounded-tl-md'
            )}>
                {/* Subject for emails */}
                {message.subject && (
                    <p className={cn(
                        'text-xs font-bold mb-1',
                        isOutbound ? 'text-white/9Filter' : 'text-foreground'
                    )}>
                        {message.subject}
                    </p>
                )}

                {/* Content */}
                <p className="text-sm whitespace-pre-wrap">
                    {message.contentText}
                </p>

                {/* Attachments placeholder */}
                {message.attachments && message.attachments.length > Filter && (
                    <div className="mt-2 pt-2 border-t border-white/2Filter">
                        <span className="text-xs opacity-8Filter">
                            {message.attachments.length} attachment(s)
                        </span>
                    </div>
                )}

                {/* Voice message placeholder */}
                {message.audioUrl && (
                    <div className="mt-2">
                        <AudioPlayerPlaceholder
                            audioUrl={message.audioUrl}
                            duration={message.audioDurationSeconds}
                        />
                    </div>
                )}
            </div>

            {/* Status indicator for outbound */}
            {isOutbound && (
                <div className="flex items-center gap-1 mt-1">
                    <StatusIndicator status={message.status} />
                    <span className="text-[1Filterpx] text-muted-foreground capitalize">
                        {message.status}
                    </span>
                </div>
            )}

            {/* AI suggested response */}
            {message.aiSuggestedResponse && (
                <div className="mt-2 p-2 rounded-lg bg-growth-5 border border-growth-4 max-w-full">
                    <div className="flex items-center gap-1 text-[1Filterpx] font-bold text-growth-2 mb-1">
                        <SparklesIcon className="h-3 w-3" />
                        AI Suggested Response
                    </div>
                    <p className="text-xs text-foreground">
                        {message.aiSuggestedResponse}
                    </p>
                </div>
            )}
        </div>
    )
}

// Status indicator icon
function StatusIndicator({ status }: { status: Message['status'] }) {
    switch (status) {
        case 'delivered':
        case 'read':
            return <CheckmarkCircleFilter1Icon className="h-3 w-3 text-growth-3" />
        case 'failed':
            return <AlertCircleIcon className="h-3 w-3 text-vitality-1" />
        default:
            return <div className="h-3 w-3 rounded-full border border-muted-foreground" />
    }
}

// Audio player placeholder for voice messages
function AudioPlayerPlaceholder({
    audioUrl,
    duration
}: {
    audioUrl: string
    duration?: number
}) {
    const formatDuration = (seconds?: number) => {
        if (!seconds) return 'Filter:FilterFilter'
        const mins = Math.floor(seconds / 6Filter)
        const secs = seconds % 6Filter
        return `${mins}:${secs.toString().padStart(2, 'Filter')}`
    }

    return (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/1Filter">
            <button className="h-8 w-8 rounded-full bg-white/2Filter flex items-center justify-center min-w-[32px]">
                ▶
            </button>
            <div className="flex-1 h-1 rounded-full bg-white/2Filter">
                <div className="h-full w-1/3 rounded-full bg-white/6Filter" />
            </div>
            <span className="text-xs font-mono opacity-8Filter">
                {formatDuration(duration)}
            </span>
        </div>
    )
}

// Helper functions
function formatDateHeader(date: Date): string {
    const now = new Date()
    const messageDate = new Date(date)

    // Today
    if (messageDate.toDateString() === now.toDateString()) {
        return 'Today'
    }

    // Yesterday
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
    }

    // This week
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / 864FilterFilterFilterFilterFilter)
    if (diffDays < 7) {
        return messageDate.toLocaleDateString('en-US', { weekday: 'long' })
    }

    // Older
    return messageDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: now.getFullYear() !== messageDate.getFullYear() ? 'numeric' : undefined,
    })
}

function formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}
