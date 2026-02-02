"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import {
    MessageCircle,
    Mail,
    Phone,
    Star,
    Archive
} from "lucide-react";

// Types based on wireframe/PRD
interface Thread {
    id: string;
    patientId: string;
    patientName: string;
    avatarInitials: string;
    lastMessageTime: Date;
    lastMessagePreview: string;
    channel: "sms" | "email" | "voice";
    unread: boolean;
    starred: boolean;
    archived: boolean;
    isUrgent?: boolean;
}

interface ThreadListProps {
    threads: Thread[];
    activeThreadId: string | null;
    onSelectThread: (threadId: string) => void;
    className?: string;
}

export function ThreadList({
    threads,
    activeThreadId,
    onSelectThread,
    className
}: ThreadListProps) {

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case "sms": return <MessageCircle className="w-3 h-3" />;
            case "email": return <Mail className="w-3 h-3" />;
            case "voice": return <Phone className="w-3 h-3" />;
            default: return <MessageCircle className="w-3 h-3" />;
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-card border-r border-border", className)}>
            <div className="flex-1 overflow-y-auto">
                {threads.map((thread) => (
                    <button
                        key={thread.id}
                        onClick={() => onSelectThread(thread.id)}
                        aria-label={`Conversation with ${thread.patientName}${thread.unread ? " (unread)" : ""}`}
                        className={cn(
                            "group relative flex gap-3 p-4 border-b border-border cursor-pointer transition-colors hover:bg-backbone-1 w-full text-left",
                            activeThreadId === thread.id && "bg-backbone-2 border-l-4 border-l-growth-2 pl-[13px]"
                        )}
                    >
                        {/* Avatar */}
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-white text-sm font-bold text-synapse-2 flex-shrink-0",
                            thread.unread && "border-growth-2 text-growth-1"
                        )}>
                            {thread.avatarInitials}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className={cn(
                                    "font-semibold text-sm text-foreground truncate",
                                    thread.unread && "font-bold"
                                )}>
                                    {thread.patientName}
                                </span>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                    {formatDistanceToNow(thread.lastMessageTime, { addSuffix: true })}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="h-4 gap-1 px-1 text-[10px]">
                                    {getChannelIcon(thread.channel)}
                                    {thread.channel}
                                </Badge>
                                {thread.isUrgent && (
                                    <Badge variant="destructive" className="text-[10px] px-1.5">
                                        URGENT
                                    </Badge>
                                )}
                            </div>

                            <p className={cn(
                                "text-sm text-muted-foreground truncate",
                                thread.unread && "text-foreground font-medium"
                            )}>
                                {thread.lastMessagePreview}
                            </p>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute top-3 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                className={cn(
                                    thread.starred && "text-vitality-1 opacity-100"
                                )}
                                aria-label={thread.starred ? "Unstar" : "Star"}
                            >
                                <Star className={cn("w-4 h-4", thread.starred && "fill-current")} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label="Archive"
                            >
                                <Archive className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Unread Dot (if not hovering) */}
                        {thread.unread && (
                            <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-growth-2 group-hover:opacity-0 transition-opacity" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
