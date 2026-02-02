import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { taskQuerySchema, taskUpdateSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Validate input
    const parsed = taskQuerySchema.safeParse({
      status: searchParams.get('status') || 'pending',
      limit: searchParams.get('limit') || '4',
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { status, limit } = parsed.data

    // RLS enforces practice isolation at DB level
    const { data, error } = await supabase
      .from('substrate_tasks')
      .select(`
        *,
        patients!substrate_tasks_patient_id_fkey (
          first_name,
          last_name
        )
      `)
      .eq('status', status)
      .order('due_date', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Supabase error fetching tasks:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tasks', details: error.message },
        { status: 500 }
      )
    }

    const tasks = (data || []).map((task: Record<string, unknown>) => {
      const patients = task.patients as { first_name: string; last_name: string } | null
      return {
        ...task,
        patient_name: patients
          ? `${patients.first_name} ${patients.last_name}`
          : null,
        patient_first_name: patients?.first_name || null,
        patient_last_name: patients?.last_name || null,
        patients: undefined,
      }
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate input
    const parsed = taskUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { id, status } = parsed.data

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    }

    const { error } = await supabase
      .from('substrate_tasks')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Supabase error updating task:', error)
      return NextResponse.json(
        { error: 'Failed to update task', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
