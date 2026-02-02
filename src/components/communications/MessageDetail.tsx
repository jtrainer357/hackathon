"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    Archive,
    MoreHorizontal,
    Mail,
} from "lucide-react";
import { Message, MessageBubble } from "./MessageBubble";
import { ReplyArea } from "./ReplyArea";

interface MessageDetailProps {
    patientId: string;
    patientName: string;
    messages: Message[];
    className?: string;
    onSendMessage: (content: string, channel: string) => void;
}

export function MessageDetail({
    patientId,
    patientName,
    messages,
    className,
    onSendMessage
}: MessageDetailProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const lastMessage = messages[messages.length - 1];

    return (
        <div className={cn("flex flex-col h-full bg-backbone-1", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border shadow-sm z-10">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-lg font-bold text-foreground">{patientName}</h2>
                        <Badge variant="secondary">Thread</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-synapse-3">
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                        <span>•</span>
                        <span>Last message: {lastMessage ? "Just now" : "None"}</span>
                        <span>•</span>
                        <span>{messages.length} messages</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Star data-icon="inline-start" className="w-3.5 h-3.5" />
                        Starred
                    </Button>
                    <Button variant="outline" size="sm">
                        <Archive data-icon="inline-start" className="w-3.5 h-3.5" />
                        Archive
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Messages Stream */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 flex flex-col"
            >
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOutbound={msg.senderType === "therapist"}
                    />
                ))}
                <div className="h-4" /> {/* Bottom spacer */}
            </div>

            {/* Reply Area */}
            <ReplyArea
                onSend={onSendMessage}
                defaultChannel="email"
            />
        </div>
    );
}
