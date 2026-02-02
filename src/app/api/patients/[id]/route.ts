import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/patients/[id]
 * Get full patient details including:
 * - Basic patient info
 * - Session notes (SOAP format)
 * - Appointments (past and upcoming)
 * - Outcome measures (PHQ-9, GAD-7, etc.)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Patient ID is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Fetch patient basic info
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select(`
        id,
        practice_id,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        pronouns,
        address,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_relationship,
        chief_complaint,
        treatment_plan,
        active_diagnoses,
        insurance_provider,
        insurance_id,
        is_active,
        created_at,
        updated_at
      `)
      .eq('id', id)
      .single();

    if (patientError || !patient) {
      return NextResponse.json(
        { error: 'Patient not found', details: patientError?.message },
        { status: 404 }
      );
    }

    // Fetch session notes
    const { data: sessionNotes, error: notesError } = await supabase
      .from('session_notes')
      .select(`
        id,
        note_date,
        session_type,
        subjective,
        objective,
        assessment,
        plan,
        therapist_name,
        session_duration_minutes,
        cpt_code,
        diagnosis_codes,
        status,
        is_ai_generated,
        created_at
      `)
      .eq('patient_id', id)
      .order('note_date', { ascending: false });

    if (notesError) {
      console.error('Error fetching session notes:', notesError);
    }

    // Fetch appointments
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_date,
        appointment_time,
        type,
        status,
        duration_minutes,
        location,
        notes,
        created_at
      `)
      .eq('patient_id', id)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });

    if (appointmentsError) {
      console.error('Error fetching appointments:', appointmentsError);
    }

    // Fetch outcome measures
    const { data: outcomeMeasures, error: outcomesError } = await supabase
      .from('outcome_measures')
      .select(`
        id,
        measure_type,
        score,
        measurement_date,
        notes,
        created_at
      `)
      .eq('patient_id', id)
      .order('measurement_date', { ascending: false });

    if (outcomesError) {
      console.error('Error fetching outcome measures:', outcomesError);
    }

    // Calculate age
    const age = patient.date_of_birth
      ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
      : null;

    // Separate upcoming and past appointments
    const now = new Date();
    const upcomingAppointments = appointments?.filter(apt => {
      const aptDateTime = new Date(`${apt.appointment_date}T${apt.appointment_time}`);
      return aptDateTime > now && apt.status === 'scheduled';
    }) || [];

    const pastAppointments = appointments?.filter(apt => {
      const aptDateTime = new Date(`${apt.appointment_date}T${apt.appointment_time}`);
      return aptDateTime <= now || apt.status !== 'scheduled';
    }) || [];

    // Group outcome measures by type
    const outcomeMeasuresByType = outcomeMeasures?.reduce((acc, measure) => {
      if (!acc[measure.measure_type]) {
        acc[measure.measure_type] = [];
      }
      acc[measure.measure_type].push(measure);
      return acc;
    }, {} as Record<string, typeof outcomeMeasures>) || {};

    // Get next appointment
    const nextAppointment = upcomingAppointments[0] || null;

    // Get most recent note
    const recentNote = sessionNotes?.[0] || null;

    // Construct full patient object
    const fullPatient = {
      ...patient,
      age,
      stats: {
        totalNotes: sessionNotes?.length || 0,
        totalAppointments: appointments?.length || 0,
        upcomingAppointments: upcomingAppointments.length,
        totalOutcomeMeasures: outcomeMeasures?.length || 0
      },
      nextAppointment,
      recentNote,
      sessionNotes: sessionNotes || [],
      appointments: {
        upcoming: upcomingAppointments,
        past: pastAppointments
      },
      outcomeMeasures: outcomeMeasuresByType
    };

    return NextResponse.json(fullPatient);

  } catch (error) {
    console.error('Error in patient details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
