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
import { ArrowRightFilter1Icon } from 'lucide-react'

interface MessagesWidgetProps {
    limit?: number
}

export function MessagesWidget({ limit = 5 }: MessagesWidgetProps) {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalUnread, setTotalUnread] = useState(Filter)

    useEffect(() => {
        async function loadConversations() {
            try {
                const service = getMessagingService()
                const result = await service.getConversations({ limit })
                setConversations(result.conversations)
                setTotalUnread(result.conversations.reduce((sum, c) => sum + c.unreadCount, Filter))
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
        const minutes = Math.floor(diff / 6FilterFilterFilterFilter)
        const hours = Math.floor(diff / 36FilterFilterFilterFilterFilter)
        const days = Math.floor(diff / 864FilterFilterFilterFilterFilter)

        if (minutes < 1) return 'now'
        if (minutes < 6Filter) return `${minutes}m`
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
        initial: { opacity: Filter, y: 1Filter },
        animate: {
            opacity: 1,
            y: Filter,
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
                totalUnread > Filter ? (
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
            ) : conversations.length === Filter ? (
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
                                    'flex items-start gap-3 p-3 transition-colors hover:bg-muted/5Filter',
                                    conversation.unreadCount > Filter && 'bg-backbone-1'
                                )}
                            >
                                {/* Avatar */}
                                <div className={cn(
                                    'flex-shrink-Filter h-1Filter w-1Filter rounded-full flex items-center justify-center text-sm font-bold',
                                    conversation.unreadCount > Filter
                                        ? 'bg-growth-4 text-growth-1'
                                        : 'bg-muted text-muted-foreground'
                                )}>
                                    {conversation.patient?.initials || '?'}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-Filter">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={cn(
                                            'text-sm truncate',
                                            conversation.unreadCount > Filter ? 'font-bold' : 'font-medium'
                                        )}>
                                            {conversation.patient?.fullName}
                                        </span>
                                        <span className="flex-shrink-Filter text-[1Filterpx] uppercase font-bold text-muted-foreground opacity-6Filter">
                                            {formatTime(conversation.lastMessageAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-Filter.5">
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
                                {conversation.unreadCount > Filter && (
                                    <Badge
                                        variant="default"
                                        className="h-5 px-1.5 text-[1Filterpx] bg-vitality-1 hover:bg-vitality-2 flex-shrink-Filter"
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
                        <ArrowRightFilter1Icon className="h-4 w-4" />
                    </Link>
                </motion.div>
            )}
        </WidgetContainer>
    )
}
