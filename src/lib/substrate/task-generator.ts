/**
 * Substrate Intelligence: Task Generator
 * Rule-based task generation and management for auto-generated clinical tasks.
 */

export interface SubstrateTask {
  id: string
  practice_id: string
  patient_id: string | null
  task_type: 'pre_session' | 'post_session' | 'clinical_maintenance' | 'communication' | 'financial' | 'pre_session_prep' | 'post_session_followup' | 'outcome_measure_alert' | 'missed_appointment'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed' | 'expired'
  due_date: string
  // AI generation
  generated_by?: string
  generation_trigger?: string
  confidence_score?: number
  // Actionability
  action_url?: string
  action_type?: 'navigate' | 'modal' | 'external'
  estimated_duration_minutes?: number
  // Relations
  assigned_to?: string
  related_appointment_id?: string
  auto_dismiss_at?: string
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  completed_at?: string
  dismissed_at?: string
  // Joined fields
  patient_name?: string
  patient_first_name?: string
  patient_last_name?: string
}

// Demo fallback tasks (used when DB is unavailable)
export const DEMO_TASKS: SubstrateTask[] = [
  {
    id: 'demo-1',
    practice_id: 'demo',
    patient_id: 'c0000000-0000-0000-0000-000000000001',
    task_type: 'pre_session_prep',
    title: 'Review chart before Tim Anders session',
    description: 'Upcoming therapy session on Thursday. Review last session notes and outcome measures.',
    priority: 'high',
    status: 'pending',
    due_date: new Date(Date.now() + 86400000).toISOString(),
    metadata: { icon: 'clipboard' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient_name: 'Tim Anders',
    patient_first_name: 'Tim',
    patient_last_name: 'Anders',
  },
  {
    id: 'demo-2',
    practice_id: 'demo',
    patient_id: 'c0000000-0000-0000-0000-000000000001',
    task_type: 'outcome_measure_alert',
    title: 'Reassess GAD-7 for Tim Anders',
    description: 'Last GAD-7 administered 3 weeks ago. Score trending down (4). Consider reassessment.',
    priority: 'medium',
    status: 'pending',
    due_date: new Date().toISOString(),
    metadata: { icon: 'activity' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient_name: 'Tim Anders',
    patient_first_name: 'Tim',
    patient_last_name: 'Anders',
  },
  {
    id: 'demo-3',
    practice_id: 'demo',
    patient_id: 'c0000000-0000-0000-0000-000000000001',
    task_type: 'post_session_followup',
    title: 'Follow up on CBT homework',
    description: 'Tim was assigned breathing exercises and thought journaling. Check compliance at next session.',
    priority: 'medium',
    status: 'pending',
    due_date: new Date(Date.now() + 172800000).toISOString(),
    metadata: { icon: 'book-open' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient_name: 'Tim Anders',
    patient_first_name: 'Tim',
    patient_last_name: 'Anders',
  },
  {
    id: 'demo-4',
    practice_id: 'demo',
    patient_id: null,
    task_type: 'missed_appointment',
    title: 'Contact Sarah Johnson about missed session',
    description: 'Patient missed scheduled appointment on 1/30. Attempt outreach to reschedule.',
    priority: 'urgent',
    status: 'pending',
    due_date: new Date(Date.now() - 86400000).toISOString(),
    metadata: { icon: 'phone-missed' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    patient_name: 'Sarah Johnson',
    patient_first_name: 'Sarah',
    patient_last_name: 'Johnson',
  },
]

/**
 * Parse SOAP note content and generate follow-up tasks.
 */
export function generateFollowUpTasks(
  patientName: string,
  soapContent: { subjective: string; objective: string; assessment: string; plan: string }
): Omit<SubstrateTask, 'id' | 'practice_id' | 'created_at' | 'updated_at'>[] {
  const tasks: Omit<SubstrateTask, 'id' | 'practice_id' | 'created_at' | 'updated_at'>[] = []
  const plan = soapContent.plan.toLowerCase()

  if (plan.includes('homework') || plan.includes('practice') || plan.includes('exercise') || plan.includes('breathing')) {
    tasks.push({
      patient_id: null,
      task_type: 'post_session_followup',
      title: `Follow up on homework compliance - ${patientName}`,
      description: `Check if ${patientName} completed assigned exercises from last session.`,
      priority: 'medium',
      status: 'pending',
      due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
      metadata: { icon: 'book-open', source: 'soap_parser' },
      patient_name: patientName,
    })
  }

  if (plan.includes('referral') || plan.includes('refer')) {
    tasks.push({
      patient_id: null,
      task_type: 'post_session_followup',
      title: `Process referral for ${patientName}`,
      description: `Coordinate ${patientName}'s referral as discussed in session.`,
      priority: 'high',
      status: 'pending',
      due_date: new Date(Date.now() + 3 * 86400000).toISOString(),
      metadata: { icon: 'send', source: 'soap_parser' },
      patient_name: patientName,
    })
  }

  if (plan.includes('medication') || plan.includes('dosage') || plan.includes('prescri')) {
    tasks.push({
      patient_id: null,
      task_type: 'post_session_followup',
      title: `Document medication changes - ${patientName}`,
      description: `Update ${patientName}'s medication list in chart per session discussion.`,
      priority: 'high',
      status: 'pending',
      due_date: new Date(Date.now() + 86400000).toISOString(),
      metadata: { icon: 'pill', source: 'soap_parser' },
      patient_name: patientName,
    })
  }

  if (plan.includes('reassess') || plan.includes('reasses') || plan.includes('frequency')) {
    tasks.push({
      patient_id: null,
      task_type: 'post_session_followup',
      title: `Schedule treatment reassessment - ${patientName}`,
      description: `Reassess treatment plan and session frequency for ${patientName}.`,
      priority: 'medium',
      status: 'pending',
      due_date: new Date(Date.now() + 14 * 86400000).toISOString(),
      metadata: { icon: 'calendar', source: 'soap_parser' },
      patient_name: patientName,
    })
  }

  return tasks
}

/**
 * Format a relative due date string.
 */
export function formatDueDate(dueDate: string): string {
  const due = new Date(dueDate)
  const now = new Date()
  const diffMs = due.getTime() - now.getTime()
  const diffHours = Math.round(diffMs / 3600000)
  const diffDays = Math.round(diffMs / 86400000)

  if (diffHours < -24) return `${Math.abs(diffDays)}d overdue`
  if (diffHours < 0) return 'Overdue'
  if (diffHours < 1) return 'Due now'
  if (diffHours < 24) return `Due in ${diffHours}h`
  if (diffDays === 1) return 'Due tomorrow'
  return `Due in ${diffDays}d`
}

/**
 * Get the icon name for a task type.
 */
export function getTaskIcon(taskType: SubstrateTask['task_type']): string {
  switch (taskType) {
    case 'pre_session_prep':
    case 'pre_session': return 'clipboard-list'
    case 'post_session_followup':
    case 'post_session': return 'book-open'
    case 'outcome_measure_alert':
    case 'clinical_maintenance': return 'activity'
    case 'missed_appointment':
    case 'communication': return 'phone-missed'
    case 'financial': return 'dollar-sign'
    default: return 'clipboard-list'
  }
}
