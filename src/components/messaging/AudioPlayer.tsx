"use client"

// Tebra Mental Health MVP: Audio Player Component (Placeholder)
// Future-ready component for voice message playback

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    PlayIcon,
    PauseIcon,
    FastForwardIcon,
    RewindIcon,
} from 'lucide-react'

interface AudioPlayerProps {
    src: string
    duration?: number
    className?: string
    onTranscriptionRequest?: () => void
}

export function AudioPlayer({
    src,
    duration,
    className,
    onTranscriptionRequest,
}: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(duration || 0)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Format seconds to mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Calculate progress percentage
    const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

    // Handle play/pause
    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    // Handle seek
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current) return

        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newTime = percentage * totalDuration

        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    // Skip forward/backward
    const skip = (seconds: number) => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.max(0, Math.min(totalDuration, currentTime + seconds))
    }

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
        const handleLoadedMetadata = () => setTotalDuration(audio.duration)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [])

    return (
        <div className={cn(
            'flex flex-col gap-2 p-3 rounded-xl bg-synapse-1',
            className
        )}>
            {/* Hidden audio element */}
            <audio ref={audioRef} src={src} preload="metadata" />

            {/* Controls */}
            <div className="flex items-center gap-2">
                {/* Skip back */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(-10)}
                    className="h-8 w-8"
                    title="Back 10s"
                >
                    <RewindIcon className="h-4 w-4" />
                </Button>

                {/* Play/Pause */}
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={togglePlay}
                    className="h-10 w-10 rounded-full bg-growth-2 hover:bg-growth-1 text-white"
                >
                    {isPlaying ? (
                        <PauseIcon className="h-5 w-5" />
                    ) : (
                        <PlayIcon className="h-5 w-5 ml-0.5" />
                    )}
                </Button>

                {/* Skip forward */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(10)}
                    className="h-8 w-8"
                    title="Forward 10s"
                >
                    <FastForwardIcon className="h-4 w-4" />
                </Button>

                {/* Progress bar */}
                <div
                    className="flex-1 h-2 rounded-full bg-synapse-2 cursor-pointer"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full rounded-full bg-growth-3 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Time */}
                <span className="text-xs font-mono text-muted-foreground min-w-[70px] text-right">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
            </div>

            {/* Transcription request button */}
            {onTranscriptionRequest && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onTranscriptionRequest}
                    className="self-start text-xs h-7"
                >
                    Request Transcription
                </Button>
            )}
        </div>
    )
}

// Simpler inline player for message bubbles
export function InlineAudioPlayer({
    src,
    duration,
    isOutbound,
}: {
    src: string
    duration?: number
    isOutbound?: boolean
}) {
    const [isPlaying, setIsPlaying] = useState(false)

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className={cn(
            'flex items-center gap-2 p-2 rounded-lg',
            isOutbound ? 'bg-white/10' : 'bg-muted'
        )}>
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center min-w-[32px]',
                    isOutbound ? 'bg-white/20 text-white' : 'bg-growth-4 text-growth-1'
                )}
            >
                {isPlaying ? (
                    <PauseIcon className="h-4 w-4" />
                ) : (
                    <PlayIcon className="h-4 w-4 ml-0.5" />
                )}
            </button>

            <div className={cn(
                'flex-1 h-1 rounded-full',
                isOutbound ? 'bg-white/20' : 'bg-synapse-2'
            )}>
                <div className={cn(
                    'h-full w-0 rounded-full transition-all',
                    isOutbound ? 'bg-white/60' : 'bg-growth-3'
                )} />
            </div>

            <span className={cn(
                'text-xs font-mono',
                isOutbound ? 'text-white/80' : 'text-muted-foreground'
            )}>
                {formatDuration(duration)}
            </span>
        </div>
    )
}
