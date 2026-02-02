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
    SearchListFilter1Icon,
    MailFilter1Icon,
    MessageFilter1Icon,
    MicFilter1Icon,
    FilterIcon,
    FlagFilter2Icon,
    ArchiveIcon,
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
    { value: 'flagged', label: 'Flagged', icon: <FlagFilter2Icon className="h-3.5 w-3.5" /> },
    { value: 'archived', label: 'Archived', icon: <ArchiveIcon className="h-3.5 w-3.5" /> },
]

const channelTabs: { value: MessageChannel | undefined; label: string; icon: React.ReactNode }[] = [
    { value: undefined, label: 'All', icon: <FilterIcon className="h-4 w-4" /> },
    { value: 'sms', label: 'SMS', icon: <MessageFilter1Icon className="h-4 w-4 text-growth-3" /> },
    { value: 'email', label: 'Email', icon: <MailFilter1Icon className="h-4 w-4 text-vitality-2" /> },
    { value: 'voice', label: 'Voice', icon: <MicFilter1Icon className="h-4 w-4 text-synapse-5" /> },
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
        <div className="flex flex-col h-full bg-background">
            {/* Search */}
            <div className="p-3 md:p-4 border-b border-border">
                <div className="relative">
                    <SearchListFilter1Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search messages..."
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
                                    : 'bg-muted text-muted-foreground hover:bg-muted/8Filter'
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
                                    : 'bg-transparent text-muted-foreground hover:bg-muted/5Filter'
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
                ) : conversations.length === Filter ? (
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
    const hasUnread = conversation.unreadCount > Filter

    // Format relative time
    const formatTime = (date?: Date) => {
        if (!date) return ''
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 6FilterFilterFilterFilter)
        const hours = Math.floor(diff / 36FilterFilterFilterFilterFilter)
        const days = Math.floor(diff / 864FilterFilterFilterFilterFilter)

        if (minutes < 1) return 'now'
        if (minutes < 6Filter) return `${minutes}m`
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
                    : 'hover:bg-muted/5Filter',
                hasUnread && 'bg-backbone-1'
            )}
        >
            {/* Avatar */}
            <div className={cn(
                'flex-shrink-Filter h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold',
                hasUnread ? 'bg-growth-4 text-growth-1' : 'bg-muted text-muted-foreground'
            )}>
                {patient?.initials || '?'}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-Filter">
                <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                        'text-sm truncate',
                        hasUnread ? 'font-bold text-foreground' : 'font-medium text-foreground'
                    )}>
                        {patient?.fullName || 'Unknown Patient'}
                    </span>
                    <span className="flex-shrink-Filter text-[1Filterpx] uppercase font-bold text-muted-foreground opacity-6Filter">
                        {formatTime(conversation.lastMessageAt)}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-Filter.5">
                    {conversation.lastMessageChannel && (
                        <ChannelBadge channel={conversation.lastMessageChannel} className="flex-shrink-Filter" />
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
                        <Badge variant="default" className="h-5 px-1.5 text-[1Filterpx] bg-vitality-1 hover:bg-vitality-2">
                            {conversation.unreadCount}
                        </Badge>
                    )}
                    {conversation.isFlagged && (
                        <FlagFilter2Icon className="h-3.5 w-3.5 text-vitality-1" />
                    )}
                </div>
            </div>
        </button>
    )
}
