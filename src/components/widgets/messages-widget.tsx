"use client"

// Tebra Mental Health MVP: Messages Widget
// Home page widget showing recent conversations

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DesignSystem } from '@/lib/design-system'
import { WidgetContainer } from '@/components/ui/widget-container'
import { Conversation } from '@/types/messaging'
import { ChannelBadge } from '@/components/messaging/ChannelIcon'
import { Badge } from '@/components/ui/badge'
import { getMessagingService } from '@/lib/messaging/messaging-service'
import { ArrowRightIcon } from 'lucide-react'

interface MessagesWidgetProps {
    limit?: number
}

export function MessagesWidget({ limit = 5 }: MessagesWidgetProps) {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalUnread, setTotalUnread] = useState(0)

    useEffect(() => {
        async function loadConversations() {
            try {
                const service = getMessagingService()
                const result = await service.getConversations({ limit })
                setConversations(result.conversations)
                setTotalUnread(result.conversations.reduce((sum, c) => sum + c.unreadCount, 0))
            } catch (error) {
                console.error('Failed to load conversations:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadConversations()
    }, [limit])

    // Format relative time
    const formatTime = (date?: Date) => {
        if (!date) return ''
        const now = new Date()
        const diff = now.getTime() - new Date(date).getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'now'
        if (minutes < 60) return `${minutes}m`
        if (hours < 24) return `${hours}h`
        return `${days}d`
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: DesignSystem.animation.staggerChildren,
            },
        },
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: DesignSystem.animation.duration,
                ease: DesignSystem.animation.ease,
            },
        },
    }

    return (
        <WidgetContainer
            title="Messages"
            headerAction={
                totalUnread > 0 ? (
                    <Badge variant="default" className="bg-vitality-1 hover:bg-vitality-2">
                        {totalUnread} new
                    </Badge>
                ) : undefined
            }
        >
            {isLoading ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                    Loading messages...
                </div>
            ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                    No messages yet
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="divide-y divide-border"
                >
                    {conversations.map((conversation) => (
                        <motion.div key={conversation.id} variants={fadeInUp}>
                            <Link
                                href={`/communications?id=${conversation.id}`}
                                className={cn(
                                    'flex items-start gap-3 p-3 transition-colors hover:bg-muted/50',
                                    conversation.unreadCount > 0 && 'bg-backbone-1'
                                )}
                            >
                                {/* Avatar */}
                                <div className={cn(
                                    'flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold',
                                    conversation.unreadCount > 0
                                        ? 'bg-growth-4 text-growth-1'
                                        : 'bg-muted text-muted-foreground'
                                )}>
                                    {conversation.patient?.initials || '?'}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={cn(
                                            'text-sm truncate',
                                            conversation.unreadCount > 0 ? 'font-bold' : 'font-medium'
                                        )}>
                                            {conversation.patient?.fullName}
                                        </span>
                                        <span className="flex-shrink-0 text-[10px] uppercase font-bold text-muted-foreground opacity-60">
                                            {formatTime(conversation.lastMessageAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-0.5">
                                        {conversation.lastMessageChannel && (
                                            <ChannelBadge
                                                channel={conversation.lastMessageChannel}
                                                className="h-5 w-5"
                                            />
                                        )}
                                        <p className="text-xs text-muted-foreground truncate">
                                            {conversation.lastMessagePreview}
                                        </p>
                                    </div>
                                </div>

                                {/* Unread badge */}
                                {conversation.unreadCount > 0 && (
                                    <Badge
                                        variant="default"
                                        className="h-5 px-1.5 text-[10px] bg-vitality-1 hover:bg-vitality-2 flex-shrink-0"
                                    >
                                        {conversation.unreadCount}
                                    </Badge>
                                )}
                            </Link>
                        </motion.div>
                    ))}

                    {/* See all link */}
                    <Link
                        href="/communications"
                        className="flex items-center justify-center gap-1 p-3 text-sm font-medium text-growth-2 hover:text-growth-1 transition-colors"
                    >
                        View all messages
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </motion.div>
            )}
        </WidgetContainer>
    )
}
