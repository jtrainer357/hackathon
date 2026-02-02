"use client"

import { motion } from 'framer-motion'

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

const STATUS_CONFIG: Record<ConnectionStatus, { color: string; label: string }> = {
  connected: { color: 'bg-green-500', label: 'Live' },
  connecting: { color: 'bg-amber-400', label: 'Connecting' },
  disconnected: { color: 'bg-red-400', label: 'Offline' },
}

interface ConnectionIndicatorProps {
  status: ConnectionStatus
}

export function ConnectionIndicator({ status }: ConnectionIndicatorProps) {
  const config = STATUS_CONFIG[status]

  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        className={`h-2 w-2 rounded-full ${config.color}`}
        animate={status === 'connecting' ? { opacity: [1, 0.4, 1] } : {}}
        transition={status === 'connecting' ? { duration: 1.5, repeat: Infinity } : {}}
      />
      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground opacity-60">
        {config.label}
      </span>
    </div>
  )
}
