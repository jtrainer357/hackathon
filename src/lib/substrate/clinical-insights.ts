/**
 * Substrate Intelligence: Clinical Insights Generator
 * Rule-based clinical insight generation from patient data.
 */

export interface ClinicalInsight {
  id: string
  type: 'trend' | 'treatment_response' | 'risk_flag' | 'positive'
  severity: 'info' | 'warning' | 'success'
  title: string
  text: string
  icon: 'trending-down' | 'trending-up' | 'alert-triangle' | 'check-circle' | 'activity'
  generated_at: string
}

interface OutcomeMeasureData {
  measurement_date: string
  score: number
}

interface PatientInsightInput {
  first_name: string
  last_name: string
  outcomeMeasures: Record<string, OutcomeMeasureData[]>
  appointments?: Array<{ status?: string; appointment_date: string }>
  treatment_plan?: string | null
}

/**
 * Generate clinical insights from patient data using rule-based analysis.
 */
export function generateInsights(patient: PatientInsightInput): ClinicalInsight[] {
  const insights: ClinicalInsight[] = []
  const now = new Date()

  // Analyze PHQ-9 trends
  const phq9 = patient.outcomeMeasures['PHQ-9'] || []
  if (phq9.length >= 3) {
    const recent = phq9.slice(-3)
    const firstScore = recent[0].score
    const lastScore = recent[recent.length - 1].score
    const change = lastScore - firstScore

    if (change < -3) {
      const pctChange = Math.round(Math.abs(change / phq9[0].score) * 100)
      insights.push({
        id: 'phq9-improving',
        type: 'treatment_response',
        severity: 'success',
        title: 'Treatment Response',
        text: `PHQ-9 improved ${pctChange}% since treatment start (${phq9[0].score} → ${lastScore})`,
        icon: 'trending-down',
        generated_at: now.toISOString(),
      })
    } else if (change > 3) {
      insights.push({
        id: 'phq9-worsening',
        type: 'trend',
        severity: 'warning',
        title: 'Score Trend',
        text: `PHQ-9 trending up: ${recent.map(r => r.score).join(' → ')} over recent assessments`,
        icon: 'trending-up',
        generated_at: now.toISOString(),
      })
    }

    // Check if below clinical threshold
    if (lastScore <= 4) {
      insights.push({
        id: 'phq9-minimal',
        type: 'positive',
        severity: 'success',
        title: 'Minimal Symptoms',
        text: `PHQ-9 score of ${lastScore} is below clinical threshold - treatment is effective`,
        icon: 'check-circle',
        generated_at: now.toISOString(),
      })
    }
  }

  // Analyze GAD-7 trends
  const gad7 = patient.outcomeMeasures['GAD-7'] || []
  if (gad7.length >= 3) {
    const firstScore = gad7[0].score
    const lastScore = gad7[gad7.length - 1].score
    const change = lastScore - firstScore

    if (change < -5) {
      insights.push({
        id: 'gad7-significant-improvement',
        type: 'trend',
        severity: 'success',
        title: 'Anxiety Improvement',
        text: `GAD-7 decreased significantly: ${firstScore} → ${lastScore} over ${gad7.length} assessments`,
        icon: 'trending-down',
        generated_at: now.toISOString(),
      })
    }
  }

  // Check appointment engagement
  if (patient.appointments && patient.appointments.length > 0) {
    const recentAppts = patient.appointments.filter(a => {
      const apptDate = new Date(a.appointment_date)
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000)
      return apptDate >= thirtyDaysAgo
    })

    const missedCount = recentAppts.filter(a => a.status === 'no-show').length
    if (missedCount >= 2) {
      insights.push({
        id: 'missed-appointments',
        type: 'risk_flag',
        severity: 'warning',
        title: 'Engagement Concern',
        text: `${missedCount} missed appointments in the past 30 days`,
        icon: 'alert-triangle',
        generated_at: now.toISOString(),
      })
    } else if (missedCount === 0 && recentAppts.length >= 3) {
      insights.push({
        id: 'good-engagement',
        type: 'positive',
        severity: 'info',
        title: 'Strong Engagement',
        text: 'Consistent session attendance over past month',
        icon: 'check-circle',
        generated_at: now.toISOString(),
      })
    }
  }

  // Limit to 3 most relevant insights, prioritizing warnings
  return insights
    .sort((a, b) => {
      const severityOrder = { warning: 0, success: 1, info: 2 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
    .slice(0, 3)
}
