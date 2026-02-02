"use client"

import { motion } from 'framer-motion'
import { DesignSystem } from '@/lib/design-system'
import { ClinicalInsight } from '@/lib/substrate/clinical-insights'
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
} from 'lucide-react'

const INSIGHT_ICONS: Record<ClinicalInsight['icon'], typeof TrendingDown> = {
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle,
  'activity': Activity,
}

const SEVERITY_STYLES: Record<ClinicalInsight['severity'], { bg: string; text: string; border: string }> = {
  success: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  info: { bg: 'bg-growth-5', text: 'text-growth-1', border: 'border-growth-4' },
}

interface InsightsCardProps {
  insights: ClinicalInsight[]
}

export function InsightsCard({ insights }: InsightsCardProps) {
  if (insights.length === 0) return null

  const timeSinceGenerated = () => {
    const generated = new Date(insights[0].generated_at)
    const diffMin = Math.round((Date.now() - generated.getTime()) / 60000)
    if (diffMin < 1) return 'Just now'
    if (diffMin < 60) return `${diffMin} min ago`
    return `${Math.round(diffMin / 60)}h ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DesignSystem.animation.duration,
        ease: DesignSystem.animation.ease,
      }}
      className="rounded-2xl border-2 border-growth-3 bg-growth-5/30 p-4 md:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-growth-4/50 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-growth-2" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Substrate Insights</h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground opacity-60">
          {timeSinceGenerated()}
        </span>
      </div>

      {/* Insight Pills */}
      <div className="space-y-2">
        {insights.map((insight, index) => {
          const Icon = INSIGHT_ICONS[insight.icon]
          const style = SEVERITY_STYLES[insight.severity]

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: DesignSystem.animation.ease,
              }}
              className={`flex items-start gap-3 p-3 rounded-xl border ${style.border} ${style.bg}`}
            >
              <div className={`mt-0.5 shrink-0 ${style.text}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${style.text}`}>
                  {insight.title}
                </p>
                <p className="text-sm text-foreground leading-snug">
                  {insight.text}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
