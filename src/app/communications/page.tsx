"use client";

import React, { useState } from "react";
import { ThreadList } from "@/components/communications/ThreadList";
import { MessageDetail } from "@/components/communications/MessageDetail";
import { PatientContext } from "@/components/communications/PatientContext";
import { Message } from "@/components/communications/MessageBubble";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    RotateCw,
    Plus,
    ArrowLeft,
} from "lucide-react";

// Mock Data
const MOCK_THREADS = [
    {
        id: "1",
        patientId: "101",
        patientName: "Sarah Johnson",
        avatarInitials: "SJ",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
        lastMessagePreview: "Hi Dr. Chen, I wanted to follow up on our session...",
        channel: "email" as const,
        unread: true,
        starred: true,
        archived: false,
        isUrgent: true,
    },
    {
        id: "2",
        patientId: "102",
        patientName: "Michael Chen",
        avatarInitials: "MC",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        lastMessagePreview: "Thanks for the session today. I'll work on those...",
        channel: "sms" as const,
        unread: true,
        starred: false,
        archived: false,
    },
    {
        id: "3",
        patientId: "103",
        patientName: "Tim Anders",
        avatarInitials: "TA",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        lastMessagePreview: "Voice message (1:23)",
        channel: "voice" as const,
        unread: false,
        starred: true,
        archived: false,
    },
    {
        id: "4",
        patientId: "104",
        patientName: "Alex Brown",
        avatarInitials: "AB",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        lastMessagePreview: "Looking forward to Thursday's appointment!",
        channel: "sms" as const,
        unread: true,
        starred: false,
        archived: false,
    },
    {
        id: "5",
        patientId: "105",
        patientName: "Emily Martinez",
        avatarInitials: "EM",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
        lastMessagePreview: "Re: Insurance coverage question",
        channel: "email" as const,
        unread: false,
        starred: false,
        archived: false,
    },
];

const MOCK_MESSAGES: Message[] = [
    {
        id: "1",
        senderId: "101",
        senderName: "Sarah Johnson",
        senderType: "patient",
        content: "Hi Dr. Chen,\n\nI've been practicing the mindfulness exercises you recommended. They're really helping with my morning anxiety.\n\nCould we discuss medication options at our next session?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
        channel: "email",
        status: "read",
    },
    {
        id: "2",
        senderId: "provider",
        senderName: "Dr. Chen",
        senderType: "therapist",
        content: "Hi Sarah,\n\nThat's wonderful to hear! I'm glad the mindfulness is helping.\n\nAbsolutely, we can explore medication as an option during Thursday's session. I'll prepare some information for you to review.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // Yesterday later
        channel: "email",
        status: "delivered",
    },
    {
        id: "3",
        senderId: "101",
        senderName: "Sarah Johnson",
        senderType: "patient",
        content: "Hi Dr. Chen, I wanted to follow up on our session from last week. The breathing exercises have been really effective, especially during stressful meetings at work. Thank you!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
        channel: "email",
        status: "read",
    },
];

export default function CommunicationsPage() {
    const [activeThreadId, setActiveThreadId] = useState<string | null>("1");
    const [activeFilter, setActiveFilter] = useState("unread");
    const [activeChannel, setActiveChannel] = useState("all");
    const [mobileView, setMobileView] = useState<"list" | "detail">("list");

    const activeThread = MOCK_THREADS.find((t) => t.id === activeThreadId);

    const handleSelectThread = (threadId: string) => {
        setActiveThreadId(threadId);
        setMobileView("detail");
    };

    const handleBackToList = () => {
        setMobileView("list");
    };

    const handleSendMessage = (content: string, channel: string) => {
        // TODO: Call API to send message, optimistically update UI
    };

    const filters = [
        { id: "unread", label: "Unread", count: 7 },
        { id: "flagged", label: "Flagged", count: 3 },
        { id: "archived", label: "Archived" },
        { id: "all", label: "All Conversations" },
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-backbone-2">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-border flex-shrink-0">
                {/* Mobile: Back button when viewing detail */}
                <div className="flex items-center gap-3">
                    {mobileView === "detail" && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBackToList}
                            className="md:hidden -ml-2"
                            aria-label="Back to inbox"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    )}
                    <h1 className="text-lg md:text-xl font-bold text-foreground">Messages</h1>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <Badge variant="outline" className="hidden md:flex gap-2">
                        <RotateCw className="w-3 h-3" />
                        Last updated: 2 min ago
                    </Badge>
                    <Button>
                        <Plus data-icon="inline-start" className="w-4 h-4" />
                        <span className="hidden sm:inline">New Message</span>
                    </Button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className={cn(
                "px-4 md:px-6 py-3 bg-white border-b border-border flex-shrink-0",
                mobileView === "detail" && "hidden md:block"
            )}>
                <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                    <TabsList variant="line" className="gap-2">
                        {filters.map((filter) => (
                            <TabsTrigger key={filter.id} value={filter.id} className="gap-2">
                                {filter.label}
                                {filter.count !== undefined && (
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                        {filter.count}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Controls - hidden on mobile when viewing detail */}
            <div className={cn(
                "px-4 md:px-6 py-3 bg-white border-b border-border flex flex-wrap items-center gap-3 md:gap-4 flex-shrink-0",
                mobileView === "detail" && "hidden md:flex"
            )}>
                <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Channel filter">
                    {["All Channels", "SMS", "Email", "Voice"].map((label) => {
                        const id = label.toLowerCase().split(" ")[0];
                        return (
                            <Button
                                key={id}
                                role="tab"
                                aria-selected={activeChannel === id}
                                onClick={() => setActiveChannel(id)}
                                variant={activeChannel === id ? "default" : "outline"}
                                size="sm"
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>

                <div className="flex-1 min-w-[200px] max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Input
                        type="text"
                        placeholder="Search patients, messages..."
                        aria-label="Search messages"
                        className="pl-9"
                    />
                </div>

                <Badge variant="outline" className="hidden lg:inline-flex border-dashed">
                    Select: Mark Read | Archive | Assign
                </Badge>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Column: Thread List */}
                <ThreadList
                    threads={MOCK_THREADS}
                    activeThreadId={activeThreadId}
                    onSelectThread={handleSelectThread}
                    className={cn(
                        "w-full md:w-[320px] lg:w-[360px] flex-shrink-0",
                        mobileView === "detail" && "hidden md:flex"
                    )}
                />

                {/* Center Column: Message Detail */}
                {activeThread ? (
                    <MessageDetail
                        patientId={activeThread.patientId}
                        patientName={activeThread.patientName}
                        messages={MOCK_MESSAGES}
                        onSendMessage={handleSendMessage}
                        className={cn(
                            "flex-1 min-w-0",
                            mobileView === "list" && "hidden md:flex"
                        )}
                    />
                ) : (
                    <div className={cn(
                        "flex-1 flex items-center justify-center bg-backbone-1 text-synapse-3",
                        mobileView === "list" && "hidden md:flex"
                    )}>
                        Select a conversation to view details
                    </div>
                )}

                {/* Right Column: Patient Context - xl only */}
                {activeThread && (
                    <PatientContext
                        patientId={activeThread.patientId}
                        className="flex-shrink-0 hidden xl:flex"
                    />
                )}
            </div>
        </div>
    );
}
