"use client"

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DesignSystem } from '@/lib/design-system'
import { WidgetContainer } from '@/components/ui/widget-container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SubstrateTask, DEMO_TASKS, formatDueDate } from '@/lib/substrate/task-generator'
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription'
import {
  ClipboardList,
  BookOpen,
  Activity,
  PhoneMissed,
  Check,
  X,
  Sparkles,
  ArrowRight,
  MessageSquare,
  DollarSign,
} from 'lucide-react'
import Link from 'next/link'

const TASK_ICONS: Record<string, typeof ClipboardList> = {
  pre_session_prep: ClipboardList,
  pre_session: ClipboardList,
  post_session_followup: BookOpen,
  post_session: BookOpen,
  outcome_measure_alert: Activity,
  clinical_maintenance: Activity,
  missed_appointment: PhoneMissed,
  communication: MessageSquare,
  financial: DollarSign,
}

const PRIORITY_STYLES: Record<SubstrateTask['priority'], string> = {
  urgent: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-amber-100 text-amber-700 border-amber-200',
  medium: 'bg-growth-5 text-growth-1 border-growth-4',
  low: 'bg-muted text-muted-foreground border-border',
}

export function TasksWidget() {
  const [tasks, setTasks] = useState<SubstrateTask[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/substrate/tasks?status=pending&limit=4')
      if (res.ok) {
        const data = await res.json()
        if (data.tasks && data.tasks.length > 0) {
          setTasks(data.tasks)
        } else {
          setTasks(DEMO_TASKS)
        }
      } else {
        setTasks(DEMO_TASKS)
      }
    } catch {
      setTasks(DEMO_TASKS)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Real-time subscription for live updates
  const handleRealtimeInsert = useCallback((record: Record<string, unknown>) => {
    const newTask = record as unknown as SubstrateTask
    if (newTask.status === 'pending') {
      setTasks(prev => {
        const exists = prev.some(t => t.id === newTask.id)
        if (exists) return prev
        return [...prev, newTask].slice(0, 4)
      })
    }
  }, [])

  const handleRealtimeUpdate = useCallback((record: Record<string, unknown>) => {
    const updated = record as unknown as SubstrateTask
    if (updated.status !== 'pending') {
      setTasks(prev => prev.filter(t => t.id !== updated.id))
    } else {
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
    }
  }, [])

  useRealtimeSubscription({
    table: 'substrate_tasks',
    onInsert: handleRealtimeInsert,
    onUpdate: handleRealtimeUpdate,
    onDelete: useCallback((record: Record<string, unknown>) => {
      const id = (record as { id: string }).id
      setTasks(prev => prev.filter(t => t.id !== id))
    }, []),
  })

  const handleComplete = useCallback(async (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
    try {
      await fetch('/api/substrate/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: 'completed' }),
      })
    } catch {
      // Silently fail - task already removed from UI
    }
  }, [])

  const handleDismiss = useCallback(async (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
    try {
      await fetch('/api/substrate/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: 'dismissed' }),
      })
    } catch {
      // Silently fail
    }
  }, [])

  const pendingCount = tasks.length

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: DesignSystem.animation.staggerChildren,
      },
    },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DesignSystem.animation.duration,
        ease: DesignSystem.animation.ease,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      height: 0,
      marginBottom: 0,
      padding: 0,
      transition: {
        duration: DesignSystem.animation.durationFast,
        ease: DesignSystem.animation.ease,
      },
    },
  }

  return (
    <WidgetContainer
      title="Today's Tasks"
      headerIcon={<Sparkles className="h-5 w-5 text-growth-2" />}
      headerAction={
        pendingCount > 0 ? (
          <Badge variant="secondary" className="text-xs bg-growth-5 text-growth-1">
            {pendingCount} pending
          </Badge>
        ) : undefined
      }
    >
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground text-sm">
          All caught up! No pending tasks.
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => {
              const Icon = TASK_ICONS[task.task_type] || ClipboardList
              const dueDateStr = formatDueDate(task.due_date)
              const isOverdue = dueDateStr.includes('overdue') || dueDateStr === 'Overdue'
              const confidence = task.confidence_score
              const actionUrl = task.action_url

              return (
                <motion.div
                  key={task.id}
                  variants={fadeInUp}
                  layout
                  className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors min-h-[64px]"
                >
                  {/* Icon */}
                  <div className="h-10 w-10 min-w-[40px] rounded-lg bg-growth-5 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-growth-2" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {task.patient_name && (
                        <Link
                          href={task.patient_id ? `/patients/${task.patient_id}` : '#'}
                          className="text-xs text-growth-2 hover:text-growth-1 font-medium"
                        >
                          {task.patient_name}
                        </Link>
                      )}
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isOverdue ? 'text-red-500' : 'text-muted-foreground opacity-60'}`}>
                        {dueDateStr}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-4 ${PRIORITY_STYLES[task.priority]}`}
                      >
                        {task.priority}
                      </Badge>
                      {confidence !== undefined && confidence < 0.95 && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-amber-50 text-amber-600 border-amber-200">
                          Review
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {actionUrl && (
                      <Link href={actionUrl}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-growth-2 hover:text-growth-1 hover:bg-growth-5"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-green-600 hover:bg-green-50"
                      onClick={() => handleComplete(task.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDismiss(task.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* See all tasks link */}
          <div className="pt-1">
            <button
              className="flex items-center justify-center gap-1 w-full p-2 text-sm font-medium text-growth-2 hover:text-growth-1 transition-colors rounded-lg hover:bg-growth-5/30"
            >
              See all tasks
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </WidgetContainer>
  )
}
