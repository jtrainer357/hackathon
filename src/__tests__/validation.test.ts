import { describe, it, expect } from 'vitest'
import {
  patientSearchSchema,
  patientIdSchema,
  taskQuerySchema,
  taskUpdateSchema,
  createFollowupTaskSchema,
  composeMessageSchema,
  importAnalyzeSchema,
} from '@/lib/validation'

describe('patientSearchSchema', () => {
  it('accepts valid search params', () => {
    const result = patientSearchSchema.safeParse({ q: 'John', limit: 10 })
    expect(result.success).toBe(true)
  })

  it('rejects search query over 200 chars', () => {
    const result = patientSearchSchema.safeParse({ q: 'a'.repeat(201) })
    expect(result.success).toBe(false)
  })

  it('defaults limit to 50', () => {
    const result = patientSearchSchema.safeParse({ q: '' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.limit).toBe(50)
    }
  })

  it('coerces string limit to number', () => {
    const result = patientSearchSchema.safeParse({ q: '', limit: '25' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.limit).toBe(25)
    }
  })
})

describe('patientIdSchema', () => {
  it('accepts valid UUID', () => {
    const result = patientIdSchema.safeParse({ id: '123e4567-e89b-12d3-a456-426614174000' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid UUID', () => {
    const result = patientIdSchema.safeParse({ id: 'not-a-uuid' })
    expect(result.success).toBe(false)
  })
})

describe('taskQuerySchema', () => {
  it('accepts valid task query', () => {
    const result = taskQuerySchema.safeParse({ status: 'pending', limit: 4 })
    expect(result.success).toBe(true)
  })

  it('rejects invalid status', () => {
    const result = taskQuerySchema.safeParse({ status: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('defaults status to pending', () => {
    const result = taskQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe('pending')
    }
  })
})

describe('taskUpdateSchema', () => {
  it('accepts valid task update', () => {
    const result = taskUpdateSchema.safeParse({
      id: '123e4567-e89b-12d3-a456-426614174000',
      status: 'completed',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing id', () => {
    const result = taskUpdateSchema.safeParse({ status: 'completed' })
    expect(result.success).toBe(false)
  })
})

describe('createFollowupTaskSchema', () => {
  it('accepts valid follow-up tasks', () => {
    const result = createFollowupTaskSchema.safeParse({
      tasks: [{
        title: 'Follow up with patient',
        description: 'Check on medication compliance',
        priority: 'high',
      }],
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty tasks array', () => {
    const result = createFollowupTaskSchema.safeParse({ tasks: [] })
    expect(result.success).toBe(false)
  })

  it('rejects missing title', () => {
    const result = createFollowupTaskSchema.safeParse({
      tasks: [{ description: 'no title' }],
    })
    expect(result.success).toBe(false)
  })
})

describe('composeMessageSchema', () => {
  it('accepts valid message', () => {
    const result = composeMessageSchema.safeParse({
      patientId: '123e4567-e89b-12d3-a456-426614174000',
      channelCode: 'sms',
      content: 'Hello!',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty content', () => {
    const result = composeMessageSchema.safeParse({
      patientId: '123e4567-e89b-12d3-a456-426614174000',
      channelCode: 'sms',
      content: '',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid channel', () => {
    const result = composeMessageSchema.safeParse({
      patientId: '123e4567-e89b-12d3-a456-426614174000',
      channelCode: 'telegram',
      content: 'Hello!',
    })
    expect(result.success).toBe(false)
  })
})

describe('importAnalyzeSchema', () => {
  it('accepts valid file key', () => {
    const result = importAnalyzeSchema.safeParse({ fileKey: 'batch-uuid/roster/patients.csv' })
    expect(result.success).toBe(true)
  })

  it('rejects path traversal', () => {
    const result = importAnalyzeSchema.safeParse({ fileKey: '../../etc/passwd' })
    expect(result.success).toBe(false)
  })

  it('rejects empty file key', () => {
    const result = importAnalyzeSchema.safeParse({ fileKey: '' })
    expect(result.success).toBe(false)
  })
})
