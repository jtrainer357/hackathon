"use client"

// Tebra Mental Health MVP: Communications Page
// Unified messaging inbox with patient conversations

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DesignSystem } from '@/lib/design-system'
import {
    Conversation,
    Message,
    MessageChannel,
    ConversationFilter,
    ComposeMessageInput,
} from '@/types/messaging'
import {
    ConversationList,
    MessageThread,
    ComposeMessage,
} from '@/components/messaging'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ArrowLeft01Icon } from 'hugeicons-react'
import { getMessagingService } from '@/lib/messaging/messaging-service'

export default function CommunicationsPage() {
    // State
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [filter, setFilter] = useState<ConversationFilter>('all')
    const [channelFilter, setChannelFilter] = useState<MessageChannel | undefined>()
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const [isMobileThreadOpen, setIsMobileThreadOpen] = useState(false)

    const messagingService = getMessagingService()

    // Load conversations
    useEffect(() => {
        async function loadConversations() {
            setIsLoading(true)
            try {
                const result = await messagingService.getConversations({
                    filter,
                    channelCode: channelFilter,
                    searchQuery,
                })
                setConversations(result.conversations)
            } catch (error) {
                console.error('Failed to load conversations:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadConversations()
    }, [filter, channelFilter, searchQuery])

    // Load messages when conversation selected
    useEffect(() => {
        async function loadMessages() {
            if (!selectedConversation) {
                setMessages([])
                return
            }

            setIsLoadingMessages(true)
            try {
                const result = await messagingService.getMessages({
                    conversationId: selectedConversation.id,
                })
                setMessages(result.messages)

                // Mark as read
                await messagingService.markAsRead(selectedConversation.id)
            } catch (error) {
                console.error('Failed to load messages:', error)
            } finally {
                setIsLoadingMessages(false)
            }
        }

        loadMessages()
    }, [selectedConversation?.id])

    // Handle conversation selection
    const handleSelectConversation = useCallback((conversation: Conversation) => {
        setSelectedConversation(conversation)
        setIsMobileThreadOpen(true)
    }, [])

    // Handle send message
    const handleSendMessage = async (input: ComposeMessageInput) => {
        const result = await messagingService.sendMessage(input)

        if (result.success) {
            // Reload messages
            if (selectedConversation) {
                const messagesResult = await messagingService.getMessages({
                    conversationId: selectedConversation.id,
                })
                setMessages(messagesResult.messages)
            }

            // Reload conversations to update preview
            const conversationsResult = await messagingService.getConversations({
                filter,
                channelCode: channelFilter,
                searchQuery,
            })
            setConversations(conversationsResult.conversations)
        }
    }

    // Close mobile thread
    const handleCloseMobileThread = () => {
        setIsMobileThreadOpen(false)
    }

    return (
        <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col lg:flex-row">
            {/* Conversation List - Full width on mobile, sidebar on desktop */}
            <aside className={cn(
                'w-full lg:w-80 xl:w-96 border-r border-border flex-shrink-0',
                'lg:block',
                selectedConversation && 'hidden lg:flex lg:flex-col'
            )}>
                <ConversationList
                    conversations={conversations}
                    selectedId={selectedConversation?.id}
                    onSelect={handleSelectConversation}
                    filter={filter}
                    onFilterChange={setFilter}
                    channelFilter={channelFilter}
                    onChannelFilterChange={setChannelFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isLoading={isLoading}
                />
            </aside>

            {/* Message Thread - Desktop: Always visible | Mobile: Sheet overlay */}

            {/* Desktop view */}
            <main className="hidden lg:flex flex-col flex-1 min-w-0">
                {selectedConversation ? (
                    <>
                        {/* Thread header */}
                        <ThreadHeader conversation={selectedConversation} />

                        {/* Messages */}
                        <MessageThread
                            conversation={selectedConversation}
                            messages={messages}
                            isLoading={isLoadingMessages}
                        />

                        {/* Compose */}
                        <ComposeMessage
                            conversation={selectedConversation}
                            onSend={handleSendMessage}
                        />
                    </>
                ) : (
                    <EmptyState />
                )}
            </main>

            {/* Mobile view - Sheet overlay */}
            <Sheet open={isMobileThreadOpen} onOpenChange={setIsMobileThreadOpen}>
                <SheetContent
                    side="right"
                    className="w-full sm:max-w-lg p-0 flex flex-col"
                >
                    {selectedConversation && (
                        <>
                            {/* Mobile header with back button */}
                            <SheetHeader className="p-4 border-b border-border flex-row items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCloseMobileThread}
                                    className="h-10 w-10 -ml-2"
                                >
                                    <ArrowLeft01Icon className="h-5 w-5" />
                                </Button>
                                <div className="flex-1 min-w-0">
                                    <SheetTitle className="text-left truncate">
                                        {selectedConversation.patient?.fullName}
                                    </SheetTitle>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedConversation.patient?.phone || selectedConversation.patient?.email}
                                    </p>
                                </div>
                            </SheetHeader>

                            {/* Messages */}
                            <MessageThread
                                conversation={selectedConversation}
                                messages={messages}
                                isLoading={isLoadingMessages}
                            />

                            {/* Compose */}
                            <ComposeMessage
                                conversation={selectedConversation}
                                onSend={handleSendMessage}
                            />
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

// Thread header for desktop
function ThreadHeader({ conversation }: { conversation: Conversation }) {
    const patient = conversation.patient

    return (
        <div className="flex items-center gap-4 p-4 border-b border-border bg-background">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-growth-4 flex items-center justify-center flex-shrink-0">
                <span className="text-growth-1 font-bold">
                    {patient?.initials || '?'}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground truncate">
                    {patient?.fullName || 'Unknown Patient'}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {patient?.phone && <span>{patient.phone}</span>}
                    {patient?.phone && patient?.email && <span>•</span>}
                    {patient?.email && <span className="truncate">{patient.email}</span>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Future: Archive, Flag, etc. */}
            </div>
        </div>
    )
}

// Empty state when no conversation selected
function EmptyState() {
    return (
        <motion.div
            className="flex-1 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DesignSystem.animation.duration }}
        >
            <div className="text-center max-w-sm">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="h-8 w-8 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    Select a conversation
                </h3>
                <p className="text-sm text-muted-foreground">
                    Choose a conversation from the list to view messages
                </p>
            </div>
        </motion.div>
    )
}
