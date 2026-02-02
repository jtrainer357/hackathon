"use client"

import { useEffect, useState, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

interface UseRealtimeOptions {
  table: string
  filter?: string
  onInsert?: (record: Record<string, unknown>) => void
  onUpdate?: (record: Record<string, unknown>) => void
  onDelete?: (record: Record<string, unknown>) => void
  enabled?: boolean
}

export function useRealtimeSubscription({
  table,
  filter,
  onInsert,
  onUpdate,
  onDelete,
  enabled = true,
}: UseRealtimeOptions) {
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const channelRef = useRef<RealtimeChannel | null>(null)

  const cleanup = useCallback(() => {
    if (channelRef.current) {
      const supabase = createClient()
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setStatus('disconnected')
      return
    }

    const supabase = createClient()

    const pgFilter: {
      event: '*'
      schema: 'public'
      table: string
      filter?: string
    } = {
      event: '*',
      schema: 'public',
      table,
    }
    if (filter) {
      pgFilter.filter = filter
    }

    const channel = supabase
      .channel(`realtime-${table}-${filter || 'all'}`)
      .on('postgres_changes', pgFilter, (payload) => {
        if (payload.eventType === 'INSERT' && onInsert) {
          onInsert(payload.new as Record<string, unknown>)
        } else if (payload.eventType === 'UPDATE' && onUpdate) {
          onUpdate(payload.new as Record<string, unknown>)
        } else if (payload.eventType === 'DELETE' && onDelete) {
          onDelete(payload.old as Record<string, unknown>)
        }
      })
      .subscribe((subscriptionStatus) => {
        if (subscriptionStatus === 'SUBSCRIBED') {
          setStatus('connected')
        } else if (subscriptionStatus === 'CHANNEL_ERROR') {
          setStatus('disconnected')
        } else {
          setStatus('connecting')
        }
      })

    channelRef.current = channel

    return cleanup
  }, [table, filter, enabled, onInsert, onUpdate, onDelete, cleanup])

  return { status }
}
