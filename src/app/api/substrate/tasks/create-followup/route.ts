import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createFollowupTaskSchema } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'
import { logAudit } from '@/lib/audit'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateCheck = checkRateLimit(`substrate-create:${ip}`, { maxRequests: 20, windowSeconds: 60 })
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)) } }
      )
    }

    const supabase = await createClient()
    const body = await request.json()

    // Validate input
    const parsed = createFollowupTaskSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { tasks } = parsed.data

    // Get default practice ID from authenticated context
    const { data: practices } = await supabase
      .from('practices')
      .select('id')
      .limit(1)

    const practiceId = practices?.[0]?.id

    if (!practiceId) {
      return NextResponse.json(
        { error: 'No practice found' },
        { status: 404 }
      )
    }

    const insertTasks = tasks.map(task => ({
      practice_id: practiceId,
      patient_id: task.patient_id || null,
      task_type: task.task_type,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: 'pending',
      due_date: task.due_date || new Date().toISOString(),
      metadata: task.metadata,
    }))

    const { error } = await supabase
      .from('substrate_tasks')
      .insert(insertTasks)

    if (error) {
      console.error('Supabase error creating tasks:', error)
      return NextResponse.json(
        { error: 'Failed to create tasks', details: error.message },
        { status: 500 }
      )
    }

    await logAudit({
      action: 'create',
      resourceType: 'patient',
      details: { endpoint: 'substrate-tasks-followup', taskCount: insertTasks.length },
    })

    return NextResponse.json({ created: insertTasks.length })
  } catch (error) {
    console.error('Error creating follow-up tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
