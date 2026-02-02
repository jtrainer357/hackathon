"use client"

// Tebra Mental Health MVP: Conversation List Component
// Displays list of patient conversations with filters

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DesignSystem } from '@/lib/design-system'
import {
    Conversation,
    MessageChannel,
    ConversationFilter,
    CHANNEL_CONFIG,
} from '@/types/messaging'
import { ChannelBadge } from './ChannelIcon'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Search as SearchList,
    Mail,
    MessageSquare as Message,
    Mic,
    Filter as FilterIcon,
    Flag,
    Archive as ArchiveIcon,
} from 'lucide-react'

interface ConversationListProps {
    conversations: Conversation[]
    selectedId?: string
    onSelect: (conversation: Conversation) => void
    filter: ConversationFilter
    onFilterChange: (filter: ConversationFilter) => void
    channelFilter?: MessageChannel
    onChannelFilterChange: (channel?: MessageChannel) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    isLoading?: boolean
}

const filterTabs: { value: ConversationFilter; label: string; icon?: React.ReactNode }[] = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'flagged', label: 'Flagged', icon: <Flag className="h-3.5 w-3.5" /> },
    { value: 'archived', label: 'Archived', icon: <ArchiveIcon className="h-3.5 w-3.5" /> },
]

const channelTabs: { value: MessageChannel | undefined; label: string; icon: React.ReactNode }[] = [
    { value: undefined, label: 'All', icon: <FilterIcon className="h-4 w-4" /> },
    { value: 'sms', label: 'SMS', icon: <Message className="h-4 w-4 text-growth-3" /> },
    { value: 'email', label: 'Email', icon: <Mail className="h-4 w-4 text-vitality-2" /> },
    { value: 'voice', label: 'Voice', icon: <Mic className="h-4 w-4 text-synapse-5" /> },
]

export function ConversationList({
    conversations,
    selectedId,
    onSelect,
    filter,
    onFilterChange,
    channelFilter,
    onChannelFilterChange,
    searchQuery,
    onSearchChange,
    isLoading,
}: ConversationListProps) {
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
        <div className="flex flex-col h-full bg-background">
            {/* Search */}
            <div className="p-3 md:p-4 border-b border-border">
                <div className="relative">
                    <SearchList className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search messages..."
                        aria-label="Search messages"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 h-11 min-h-[44px]"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-3 md:px-4 py-2 border-b border-border space-y-2">
                {/* Primary filter */}
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => onFilterChange(tab.value)}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap min-h-[32px]',
                                filter === tab.value
                                    ? 'bg-growth-2 text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Channel filter */}
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {channelTabs.map((tab) => (
                        <button
                            key={tab.value || 'all'}
                            onClick={() => onChannelFilterChange(tab.value)}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap min-h-[32px]',
                                channelFilter === tab.value
                                    ? 'bg-backbone-2 ring-1 ring-growth-3'
                                    : 'bg-transparent text-muted-foreground hover:bg-muted/50'
                            )}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Conversation List */}
            <motion.div
                className="flex-1 overflow-y-auto"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {isLoading ? (
                    <div className="p-4 text-center text-muted-foreground">
                        Loading conversations...
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                        No conversations found
                    </div>
                ) : (
                    conversations.map((conversation) => (
                        <motion.div key={conversation.id} variants={fadeInUp}>
                            <ConversationRow
                                conversation={conversation}
                                isSelected={conversation.id === selectedId}
                                onClick={() => onSelect(conversation)}
                            />
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    )
}

// Individual conversation row
function ConversationRow({
    conversation,
    isSelected,
    onClick,
}: {
    conversation: Conversation
    isSelected: boolean
    onClick: () => void
}) {
    const patient = conversation.patient
    const hasUnread = conversation.unreadCount > 0

    // Format relative time
    const formatTime = (date?: Date) => {
        if (!date) return ''
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'now'
        if (minutes < 60) return `${minutes}m`
        if (hours < 24) return `${hours}h`
        if (days < 7) return `${days}d`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                'w-full flex items-start gap-3 p-3 md:p-4 border-b border-border transition-colors text-left min-h-[72px]',
                isSelected
                    ? 'bg-growth-5 border-l-2 border-l-growth-2'
                    : 'hover:bg-muted/50',
                hasUnread && 'bg-backbone-1'
            )}
        >
            {/* Avatar */}
            <div className={cn(
                'flex-shrink-0 h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold',
                hasUnread ? 'bg-growth-4 text-growth-1' : 'bg-muted text-muted-foreground'
            )}>
                {patient?.initials || '?'}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                        'text-sm truncate',
                        hasUnread ? 'font-bold text-foreground' : 'font-medium text-foreground'
                    )}>
                        {patient?.fullName || 'Unknown Patient'}
                    </span>
                    <span className="flex-shrink-0 text-[10px] uppercase font-bold text-muted-foreground opacity-60">
                        {formatTime(conversation.lastMessageAt)}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                    {conversation.lastMessageChannel && (
                        <ChannelBadge channel={conversation.lastMessageChannel} className="flex-shrink-0" />
                    )}
                    <p className={cn(
                        'text-xs truncate',
                        hasUnread ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                        {conversation.lastMessagePreview || 'No messages yet'}
                    </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 mt-1.5">
                    {hasUnread && (
                        <Badge variant="default" className="h-5 px-1.5 text-[10px] bg-vitality-1 hover:bg-vitality-2">
                            {conversation.unreadCount}
                        </Badge>
                    )}
                    {conversation.isFlagged && (
                        <Flag className="h-3.5 w-3.5 text-vitality-1" />
                    )}
                </div>
            </div>
        </button>
    )
}
