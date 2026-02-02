import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createFollowupTaskSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
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

    return NextResponse.json({ created: insertTasks.length })
  } catch (error) {
    console.error('Error creating follow-up tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
