"use client"

import { motion } from "framer-motion"
import { DesignSystem } from "@/lib/design-system"
import { WidgetContainer } from "@/components/ui/widget-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope02Icon,
  UserMultiple02Icon,
  SparklesIcon,
  Calendar03Icon
} from "hugeicons-react"

export default function DashboardPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DesignSystem.animation.duration,
        ease: DesignSystem.animation.ease
      }
    }
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: DesignSystem.animation.staggerChildren
      }
    }
  }

  return (
    <motion.div
      className="p-4 md:p-dashboard-padding grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-dashboard-gap max-w-dashboard-max-width mx-auto w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Header - Stacks on mobile */}
      <motion.div className="col-span-1 md:col-span-12" variants={fadeInUp}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Welcome back, Dr. Provider</h1>
            <p className="text-sm text-muted-foreground">Mental Health Dashboard</p>
          </div>
          <Button className="w-full sm:w-auto h-12 min-h-[48px] rounded-full px-6 font-bold">
            <Stethoscope02Icon className="h-5 w-5 mr-2" />
            Start Session
          </Button>
        </div>
      </motion.div>

      {/* Today's Schedule Widget */}
      <motion.div className="col-span-1 md:col-span-8" variants={fadeInUp}>
        <WidgetContainer
          title="Today's Schedule"
          headerAction={<Badge variant="secondary" className="text-xs">8 Appointments</Badge>}
        >
          <div className="space-y-3">
            {/* Appointment items */}
            {[
              { time: "9:00 AM", patient: "Sarah Johnson", type: "Follow-up", status: "upcoming" },
              { time: "10:00 AM", patient: "Michael Chen", type: "Initial Evaluation", status: "upcoming" },
              { time: "11:30 AM", patient: "Emily Davis", type: "Therapy Session", status: "upcoming" },
            ].map((apt, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors sm:flex-row sm:items-center sm:justify-between min-h-[72px]"
              >
                {/* Patient info */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="h-11 w-11 min-w-[44px] rounded-full bg-growth-4 flex items-center justify-center shrink-0">
                    <span className="text-growth-1 font-bold text-sm">
                      {apt.patient.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{apt.patient}</p>
                    <p className="text-xs text-muted-foreground truncate">{apt.type}</p>
                  </div>
                </div>
                {/* Time and action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                  <span className="text-xs uppercase font-bold text-muted-foreground opacity-60">
                    {apt.time}
                  </span>
                  <Button variant="secondary" className="h-11 min-h-[44px] min-w-[80px] rounded-full px-4">
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </WidgetContainer>
      </motion.div>

      {/* AI Insights Widget */}
      <motion.div className="col-span-1 md:col-span-4" variants={fadeInUp}>
        <WidgetContainer
          title="AI Insights"
          headerIcon={<SparklesIcon className="h-5 w-5 text-growth-2" />}
          variant="highlight"
        >
          <div className="space-y-4">
            <div className="text-center py-4 sm:py-6">
              <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-growth-2/20 mb-4">
                <SparklesIcon className="h-7 w-7 sm:h-8 sm:w-8 text-growth-1" />
              </div>
              <p className="text-sm text-muted-foreground px-2">
                AI documentation assistance is ready. Start a session to auto-generate SOAP notes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 sm:p-4 rounded-lg bg-card/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-growth-1">0</p>
                <p className="text-xs text-muted-foreground">Notes Today</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-card/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-growth-1">~3m</p>
                <p className="text-xs text-muted-foreground">Avg. Time Saved</p>
              </div>
            </div>
          </div>
        </WidgetContainer>
      </motion.div>

      {/* Quick Stats Row - 2 cols on mobile, 4 on tablet+ */}
      <motion.div className="col-span-1 md:col-span-12" variants={fadeInUp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-dashboard-gap">
          {[
            { label: "Patients Today", value: "8", icon: UserMultiple02Icon },
            { label: "Sessions Complete", value: "0", icon: Stethoscope02Icon },
            { label: "Notes Pending", value: "0", icon: SparklesIcon },
            { label: "This Week", value: "24", icon: Calendar03Icon },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl bg-card border border-border shadow-widget min-h-[80px]"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] rounded-lg bg-growth-5 flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-growth-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
