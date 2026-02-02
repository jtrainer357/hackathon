import { z } from 'zod'

// ============================================
// SHARED VALIDATION SCHEMAS
// ============================================

/** UUID format validation */
export const uuidSchema = z.string().uuid('Invalid UUID format')

/** Pagination parameters */
export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
  cursor: z.string().optional(),
})

// ============================================
// PATIENT SCHEMAS
// ============================================

export const patientSearchSchema = z.object({
  q: z.string().max(200, 'Search query too long').default(''),
  limit: z.coerce.number().int().min(1).max(200).default(50),
})

export const patientIdSchema = z.object({
  id: uuidSchema,
})

// ============================================
// SUBSTRATE TASK SCHEMAS
// ============================================

export const taskStatusEnum = z.enum(['pending', 'in_progress', 'completed', 'dismissed'])

export const taskQuerySchema = z.object({
  status: taskStatusEnum.default('pending'),
  limit: z.coerce.number().int().min(1).max(50).default(4),
})

export const taskUpdateSchema = z.object({
  id: uuidSchema,
  status: taskStatusEnum,
})

export const createFollowupTaskSchema = z.object({
  tasks: z.array(z.object({
    patient_id: uuidSchema.optional(),
    task_type: z.string().min(1).max(100).default('post_session_followup'),
    title: z.string().min(1).max(500),
    description: z.string().max(2000).default(''),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    due_date: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).default({}),
  })).min(1).max(50),
})

// ============================================
// MESSAGE SCHEMAS
// ============================================

export const messageQuerySchema = z.object({
  type: z.enum(['conversations', 'messages']).default('conversations'),
  filter: z.enum(['all', 'unread', 'flagged', 'archived']).default('all'),
  channel: z.enum(['sms', 'email', 'voice']).optional(),
  q: z.string().max(200).default(''),
  patientId: uuidSchema.optional(),
  conversationId: uuidSchema.optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  cursor: z.string().optional(),
})

export const composeMessageSchema = z.object({
  patientId: uuidSchema,
  channelCode: z.enum(['sms', 'email', 'voice']),
  subject: z.string().max(500).optional(),
  content: z.string().min(1).max(10000),
})

// ============================================
// IMPORT SCHEMAS
// ============================================

export const importAnalyzeSchema = z.object({
  fileKey: z.string()
    .min(1)
    .max(500)
    .refine(
      (val) => !val.includes('..'),
      'Path traversal not allowed'
    ),
})
