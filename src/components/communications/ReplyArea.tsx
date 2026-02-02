"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Send,
    MessageSquare,
    Mail,
    Phone,
    FileText
} from "lucide-react";

interface ReplyAreaProps {
    onSend: (content: string, channel: string) => void;
    defaultChannel?: "sms" | "email" | "voice";
    className?: string;
}

export function ReplyArea({
    onSend,
    defaultChannel = "email",
    className
}: ReplyAreaProps) {
    const [content, setContent] = useState("");
    const [channel, setChannel] = useState<"sms" | "email" | "voice">(defaultChannel);

    const handleSend = () => {
        if (!content.trim()) return;
        onSend(content, channel);
        setContent("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const maxChars = channel === "sms" ? 160 : null;
    const charCount = content.length;
    const isOverLimit = maxChars ? charCount > maxChars : false;

    const channelIcons: Record<string, React.ReactNode> = {
        email: <Mail className="w-3.5 h-3.5" />,
        sms: <MessageSquare className="w-3.5 h-3.5" />,
        voice: <Phone className="w-3.5 h-3.5" />,
    };

    return (
        <div className={cn("border-t border-border bg-white p-5", className)}>
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                    <Select value={channel} onValueChange={(v) => setChannel(v as "sms" | "email" | "voice")}>
                        <SelectTrigger size="sm" className="w-auto">
                            {channelIcons[channel]}
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="email">Reply via Email</SelectItem>
                            <SelectItem value="sms">Switch to SMS</SelectItem>
                            <SelectItem value="voice">Schedule Call</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm">
                        <FileText data-icon="inline-start" className="w-3.5 h-3.5" />
                        Use Template
                    </Button>
                </div>

                {/* Character Counter (SMS only) */}
                {channel === "sms" && (
                    <div className={cn(
                        "text-[10px] font-medium transition-colors",
                        isOverLimit ? "text-destructive" : "text-muted-foreground"
                    )}>
                        [SMS mode: <span className={cn(isOverLimit && "font-bold")}>{charCount}</span>/{maxChars} chars]
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex gap-3 items-end">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your reply..."
                    className="flex-1 min-h-[44px] max-h-[200px]"
                    rows={1}
                />
                <Button
                    onClick={handleSend}
                    disabled={!content.trim() || isOverLimit}
                    variant={isOverLimit ? "destructive" : "default"}
                    size="lg"
                >
                    Send
                    <Send data-icon="inline-end" className="w-3.5 h-3.5" />
                </Button>
            </div>
        </div>
    );
}
