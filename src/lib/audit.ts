import { createClient } from '@/lib/supabase/server'

export type AuditAction = 'view' | 'create' | 'update' | 'delete' | 'export' | 'search'
export type AuditResourceType = 'patient' | 'session_note' | 'appointment' | 'outcome_measure' | 'message' | 'import_batch'

interface AuditLogEntry {
  action: AuditAction
  resourceType: AuditResourceType
  resourceId?: string
  details?: Record<string, unknown>
  practiceId?: string
}

/**
 * Log an auditable action for HIPAA compliance.
 * Captures who accessed what PHI and when.
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('audit_log').insert({
      practice_id: entry.practiceId || null,
      user_id: user?.id || null,
      action: entry.action,
      resource_type: entry.resourceType,
      resource_id: entry.resourceId || null,
      details: entry.details || {},
    })
  } catch (error) {
    // Audit logging should never break the main request
    console.error('[Audit] Failed to log:', error)
  }
}
