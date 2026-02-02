"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Search01Icon,
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  ChartIncreaseIcon,
  Globe02Icon,
  Message01Icon,
  Share01Icon,
  Layout01Icon,
  LockIcon,
  EyeIcon,
  CheckmarkCircle02Icon,
} from "hugeicons-react"

import { cn } from "@/lib/utils"
import { DesignSystem } from "@/lib/design-system"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WidgetContainer } from "@/components/ui/widget-container"

// ── Types ─────────────────────────────────────────────────────────────────────

interface KpiMetric {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  score: string
  total: string | undefined
  subtext: string
}

interface CompetitorRow {
  rank: number
  name: string
  seo: number
  aio: number
  overall: number
}

interface SentimentTopic {
  label: string
  count: number
  percentage: number
}

interface LockedTool {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

// ── Animation Variants ────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DesignSystem.animation.duration,
      ease: DesignSystem.animation.ease,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DesignSystem.animation.staggerChildren,
    },
  },
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const KPI_DATA: KpiMetric[] = [
  {
    icon: Search01Icon,
    title: "SEO Score",
    score: "64",
    total: "100",
    subtext: "Google organic search ranking needs improvement.",
  },
  {
    icon: SparklesIcon,
    title: "AIO Score",
    score: "42",
    total: "100",
    subtext: "AI search visibility (ChatGPT, Perplexity) is critical.",
  },
  {
    icon: StarIcon,
    title: "Reputation",
    score: "4.8",
    total: undefined,
    subtext: "Based on 134 total reviews across all platforms.",
  },
  {
    icon: MapPinIcon,
    title: "GEO Score",
    score: "45",
    total: "100",
    subtext: "Generative Engine Optimization is below market average.",
  },
]

const COMPETITOR_DATA: CompetitorRow[] = [
  { rank: 1, name: "Advanced Care Medical Group", seo: 85, aio: 78, overall: 85 },
  { rank: 2, name: "HealthFirst Family Practice", seo: 76, aio: 71, overall: 78 },
  { rank: 3, name: "Wellness Primary Care", seo: 72, aio: 68, overall: 74 },
]

const USER_PRACTICE: CompetitorRow = {
  rank: 6,
  name: "Smith Family Medicine",
  seo: 64,
  aio: 42,
  overall: 50,
}

const SENTIMENT_TOPICS: SentimentTopic[] = [
  { label: "Scheduling", count: 14, percentage: 12 },
  { label: "Wait Times", count: 9, percentage: 62 },
]

const LOCKED_TOOLS: LockedTool[] = [
  { icon: Layout01Icon, label: "AI Blog Writing" },
  { icon: Share01Icon, label: "Social Posting" },
  { icon: CheckmarkCircle02Icon, label: "Review Automation" },
]

// ── Sub-components ────────────────────────────────────────────────────────────

/** Renders a single KPI metric card within a WidgetContainer. */
function KpiCard({ kpi }: { kpi: KpiMetric }): React.JSX.Element {
  return (
    <motion.div variants={fadeInUp}>
      <WidgetContainer
        title={kpi.title}
        headerIcon={<kpi.icon size={16} className="text-muted-foreground" />}
        cardClassName="border-dashed border-border bg-muted/10"
      >
        <div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-bold text-foreground">{kpi.score}</span>
            {kpi.total && <span className="text-xs text-muted-foreground font-medium">/ {kpi.total}</span>}
          </div>
          <p className="text-xs text-muted-foreground leading-tight">{kpi.subtext}</p>
        </div>
      </WidgetContainer>
    </motion.div>
  )
}

/** Renders a competitor row in the desktop table view. */
function CompetitorTableRow({ row, isUser }: { row: CompetitorRow; isUser?: boolean }): React.JSX.Element {
  if (isUser) {
    return (
      <tr className="bg-card border-2 border-primary rounded-lg shadow-sm">
        <td className="p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center rounded">
              {row.rank}
            </span>
            <div>
              <div className="font-bold text-foreground">{row.name}</div>
              <div className="text-2xs text-muted-foreground uppercase tracking-wide">Your Practice</div>
            </div>
          </div>
        </td>
        <td className="p-3 text-right text-accent font-bold">{row.seo} —</td>
        <td className="p-3 text-right text-foreground font-bold">{row.aio} ↘</td>
        <td className="p-3 text-right font-bold text-foreground">{row.overall}</td>
      </tr>
    )
  }

  return (
    <tr className="opacity-60">
      <td className="py-3 font-medium text-muted-foreground">#{row.rank} {row.name}</td>
      <td className="py-3 text-right text-foreground font-bold">{row.seo} ↗</td>
      <td className="py-3 text-right text-foreground font-bold">{row.aio} ↗</td>
      <td className="py-3 text-right font-bold text-foreground">{row.overall}</td>
    </tr>
  )
}

/** Renders a competitor as a card for mobile viewports. */
function CompetitorMobileCard({ row, isUser }: { row: CompetitorRow; isUser?: boolean }): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-lg p-3 border",
        isUser
          ? "bg-card border-2 border-primary shadow-sm"
          : "bg-muted/10 border-border opacity-60"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {isUser && (
          <span className="text-xs font-bold bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center rounded">
            {row.rank}
          </span>
        )}
        <div>
          <div className={cn("font-bold", isUser ? "text-foreground" : "text-muted-foreground")}>
            {!isUser && `#${row.rank} `}{row.name}
          </div>
          {isUser && <div className="text-2xs text-muted-foreground uppercase tracking-wide">Your Practice</div>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-2xs text-muted-foreground font-medium">SEO</div>
          <div className={cn("font-bold", isUser ? "text-accent" : "text-foreground")}>{row.seo}</div>
        </div>
        <div>
          <div className="text-2xs text-muted-foreground font-medium">AIO</div>
          <div className="font-bold text-foreground">{row.aio}</div>
        </div>
        <div>
          <div className="text-2xs text-muted-foreground font-medium">OVERALL</div>
          <div className="font-bold text-foreground">{row.overall}</div>
        </div>
      </div>
    </div>
  )
}

/** Action card with lock state for premium features. */
function ActionCard({
  title,
  headerIcon,
  badge,
  badgeVariant = "outline",
  description,
  buttonLabel,
  buttonVariant = "secondary",
  cardClassName,
}: {
  title: string
  headerIcon?: React.ReactNode
  badge?: string
  badgeVariant?: "outline" | "destructive"
  description: string
  buttonLabel: string
  buttonVariant?: "default" | "secondary"
  cardClassName?: string
}): React.JSX.Element {
  return (
    <motion.div variants={fadeInUp}>
      <WidgetContainer
        title={title}
        headerIcon={headerIcon}
        contentClassName="flex flex-col"
        cardClassName={cardClassName}
      >
        {badge && (
          <Badge variant={badgeVariant} className="w-fit mb-3">{badge}</Badge>
        )}
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <Button variant={buttonVariant} className="mt-auto w-full min-h-[44px]">
          <LockIcon size={14} /> {buttonLabel}
        </Button>
      </WidgetContainer>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * Marketing & Reputation "Growth Command Center" dashboard page.
 *
 * Displays KPI metrics, competitive landscape rankings, action cards
 * for premium features, and locked tool previews. Currently renders
 * sample/demo data with clear preview-mode messaging.
 */
export function MarketingCommandCenter(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-muted/30 px-widget-padding-x py-widget-padding-y space-y-dashboard-gap">

      {/* Preview Mode Banner */}
      <motion.section
        aria-label="Preview mode notice"
        className="bg-primary text-primary-foreground px-widget-padding-x py-4 rounded-2xl shadow-widget flex flex-col md:flex-row items-center justify-between gap-dashboard-gap border-l-4 border-accent"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-foreground/10 rounded-full">
            <EyeIcon className="text-accent" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
              Preview Mode: Marketing &amp; Reputation
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Viewing <strong>sample data</strong>. Connect your Google Business Profile to see your real rankings and reviews.
            </p>
          </div>
        </div>
        <Button variant="secondary" className="whitespace-nowrap font-bold shadow-sm min-h-[44px]">
          Start Free Trial
        </Button>
      </motion.section>

      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Growth Command Center</h1>
          <p className="text-muted-foreground text-sm">
            Monitor your local visibility and patient sentiment in one place.
          </p>
        </div>
        <Badge variant="outline">DEMO VIEW</Badge>
      </header>

      {/* Top KPI Grid */}
      <motion.section
        aria-label="Key performance indicators"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-gap"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {KPI_DATA.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </motion.section>

      {/* Competitive Landscape */}
      <motion.section
        aria-label="Competitive landscape"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <WidgetContainer
          title="Competitive Landscape"
          titleSuffix={<Badge variant="outline" className="bg-background">Sample Data</Badge>}
          cardClassName="border-dashed border-border bg-muted/10"
        >
          <p className="text-xs text-muted-foreground mb-4">
            How your practice visibility compares to neighbors.
          </p>

          {/* Insight Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6 flex gap-3">
            <ChartIncreaseIcon className="text-accent shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-foreground">Your practice ranks #6 out of 12 in your market</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Top-ranking practices are capturing 3-5x more patient inquiries. You&apos;re missing opportunities to 60% of patients.
              </p>
            </div>
          </div>

          {/* Desktop: Ranking Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th scope="col" className="pb-3 font-medium">PRACTICE</th>
                  <th scope="col" className="pb-3 font-medium text-right">SEO</th>
                  <th scope="col" className="pb-3 font-medium text-right">AIO</th>
                  <th scope="col" className="pb-3 font-medium text-right">OVERALL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {COMPETITOR_DATA.map((row) => (
                  <CompetitorTableRow key={row.rank} row={row} />
                ))}
                <CompetitorTableRow row={USER_PRACTICE} isUser />
              </tbody>
            </table>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {COMPETITOR_DATA.map((row) => (
              <CompetitorMobileCard key={row.rank} row={row} />
            ))}
            <CompetitorMobileCard row={USER_PRACTICE} isUser />
          </div>
        </WidgetContainer>
      </motion.section>

      {/* Bottom: Action Cards & Analytics Grid */}
      <motion.section
        aria-label="Action cards"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-gap"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Card 1: Connect Google Profile */}
        <ActionCard
          title="Connect Google Profile"
          headerIcon={<MapPinIcon size={16} className="text-muted-foreground" />}
          badge="Urgent Priority"
          badgeVariant="destructive"
          description="Unlock all AI features including review replies, sentiment analysis."
          buttonLabel="Connect Locations"
          buttonVariant="default"
        />

        {/* Card 2: Auto-Generated Website */}
        <ActionCard
          title="Auto-Generated Website"
          headerIcon={<Globe02Icon size={16} className="text-muted-foreground" />}
          badge="Recommended"
          description="Launch a fast, mobile-optimized site built for AI search engines."
          buttonLabel="Preview Site"
        />

        {/* Card 3: Patient Sentiment (Locked) */}
        <motion.div variants={fadeInUp}>
          <WidgetContainer
            title="Patient Sentiment"
            cardClassName="border-dashed border-border bg-muted/10"
            contentClassName="flex flex-col"
          >
            <p className="text-xs text-muted-foreground mb-4">
              AI feedback analysis. <span className="font-bold text-foreground">Upgrade to view.</span>
            </p>

            <div
              className="flex flex-col gap-3 opacity-60 blur-sm select-none pointer-events-none mb-4"
              aria-hidden="true"
            >
              {SENTIMENT_TOPICS.map((topic) => (
                <div key={topic.label} className="bg-card p-2 rounded border border-border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold">{topic.label}</span>
                    <span className="text-2xs text-muted-foreground">{topic.count} Reviews</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full">
                    <div
                      className="h-1.5 bg-primary rounded-full"
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="secondary" className="mt-auto w-full min-h-[44px]">
              <LockIcon size={14} /> See Details
            </Button>
          </WidgetContainer>
        </motion.div>

        {/* Card 4: Review Response Queue */}
        <motion.div variants={fadeInUp}>
          <WidgetContainer
            title="Reviews"
            headerIcon={
              <div className="p-2 bg-muted rounded-lg">
                <Message01Icon size={16} className="text-foreground" />
              </div>
            }
            cardClassName="border-2 border-primary"
            contentClassName="flex flex-col"
          >
            <p className="text-xs text-muted-foreground mb-4">4 reviews waiting</p>

            {/* Skeleton Reviews */}
            <div className="space-y-3 mb-4 flex-1">
              {([
                { nameW: "w-16", stars: 5 },
                { nameW: "w-12", stars: 4 },
              ] as const).map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center p-2 bg-muted/50 rounded border border-border">
                  <div className="w-6 h-6 rounded-full bg-muted-foreground/20 shrink-0" />
                  <div className={cn("h-2 bg-muted-foreground/20 rounded", item.nameW)} />
                  <div className="flex gap-1 ml-auto">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-muted-foreground/20 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="default" className="mt-auto w-full min-h-[44px]">
              <LockIcon size={14} /> Reply All
            </Button>
          </WidgetContainer>
        </motion.div>
      </motion.section>

      {/* Bottom: Locked Tool Previews */}
      <motion.section
        aria-label="Additional tools"
        className="grid grid-cols-1 md:grid-cols-3 gap-dashboard-gap opacity-60"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {LOCKED_TOOLS.map((tool) => (
          <motion.div key={tool.label} variants={fadeInUp}>
            <WidgetContainer
              title={tool.label}
              headerIcon={<tool.icon size={18} className="text-muted-foreground" />}
              cardClassName="border-2 border-dashed border-border bg-card/65"
              hideHeader
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <tool.icon size={18} className="text-muted-foreground" />
                  <h3 className="font-bold text-muted-foreground text-sm">{tool.label}</h3>
                </div>
                <LockIcon size={14} className="text-muted-foreground/50" />
              </div>
            </WidgetContainer>
          </motion.div>
        ))}
      </motion.section>

    </main>
  )
}
