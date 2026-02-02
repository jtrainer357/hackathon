"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// TODO: Migrate to canonical Message type from @/types/messaging once mock data is replaced with API calls.
// This simplified interface is used by the communications/ page with inline mock data.
export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderType: "patient" | "therapist" | "system";
    content: string;
    timestamp: Date;
    channel: "sms" | "email" | "voice";
    status?: "sent" | "delivered" | "read" | "failed";
}

interface MessageBubbleProps {
    message: Message;
    isOutbound: boolean;
}

export function MessageBubble({ message, isOutbound }: MessageBubbleProps) {
    return (
        <div className={cn(
            "flex flex-col mb-4 max-w-[85%]",
            isOutbound ? "self-end items-end" : "self-start items-start"
        )}>
            {/* Meta Header */}
            <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-semibold text-synapse-2">
                    {isOutbound ? "You" : message.senderName}
                </span>
                <span className="text-[10px] text-synapse-3">•</span>
                <span className="text-[10px] text-synapse-3">
                    {format(message.timestamp, "MMM d, h:mm a")}
                </span>
                <span className="text-[10px] text-synapse-3">•</span>
                <Badge variant="secondary" className="h-4 text-[10px] px-1 py-0 uppercase">
                    {message.channel}
                </Badge>
            </div>

            {/* Bubble */}
            <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm border",
                isOutbound
                    ? "bg-backbone-2 border-synapse-4 text-foreground rounded-br-sm"
                    : "bg-white border-synapse-4 text-foreground rounded-bl-sm"
            )}>
                {message.content}
            </div>

            {/* Status (Outbound only) */}
            {isOutbound && message.status && (
                <div className="mt-1 px-1 text-[10px] text-synapse-3 capitalize">
                    {message.status}
                </div>
            )}
        </div>
    );
}
