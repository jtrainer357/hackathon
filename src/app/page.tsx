"use client"

import { motion } from "framer-motion"
import { DesignSystem } from "@/lib/design-system"
import { WidgetContainer } from "@/components/ui/widget-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Users,
  Sparkles,
  Calendar
} from "lucide-react"
import { TasksWidget } from "@/components/widgets/tasks-widget"

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
        <h1 className="sr-only">Dashboard</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end mb-4 md:mb-6">
          <Button className="w-full sm:w-auto h-12 min-h-[48px] rounded-full px-6 font-bold">
            <Stethoscope className="h-5 w-5 mr-2" />
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

      {/* Tasks Widget - Substrate Intelligence */}
      <motion.div className="col-span-1 md:col-span-4" variants={fadeInUp}>
        <TasksWidget />
      </motion.div>

      {/* Quick Stats Row - 2 cols on mobile, 4 on tablet+ */}
      <motion.div className="col-span-1 md:col-span-12" variants={fadeInUp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-dashboard-gap">
          {[
            { label: "Patients Today", value: "8", icon: Users },
            { label: "Sessions Complete", value: "0", icon: Stethoscope },
            { label: "Notes Pending", value: "0", icon: Sparkles },
            { label: "This Week", value: "24", icon: Calendar },
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
