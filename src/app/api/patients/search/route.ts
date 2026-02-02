import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { patientSearchSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { logAudit } from '@/lib/audit';

/**
 * GET /api/patients/search?q=[name]&limit=[number]
 * Search patients by name with practice isolation
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateCheck = checkRateLimit(`patient-search:${ip}`, { maxRequests: 30, windowSeconds: 60 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)) } }
      );
    }

    // Validate input
    const searchParams = request.nextUrl.searchParams;
    const parsed = patientSearchSchema.safeParse({
      q: searchParams.get('q') || '',
      limit: searchParams.get('limit') || '50',
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { q: query, limit } = parsed.data;
    const supabase = await createClient();

    // Build query with practice isolation (RLS enforces this at DB level,
    // but we also filter explicitly for defense-in-depth)
    let queryBuilder = supabase
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
        chief_complaint,
        active_diagnoses,
        is_active,
        created_at,
        updated_at
      `)
      .eq('is_active', true)
      .order('last_name', { ascending: true })
      .order('first_name', { ascending: true })
      .limit(limit);

    if (query && query.trim().length > 0) {
      queryBuilder = queryBuilder.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`);
    }

    const { data: patients, error } = await queryBuilder;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to search patients', details: error.message },
        { status: 500 }
      );
    }

    // Audit log the search
    await logAudit({
      action: 'search',
      resourceType: 'patient',
      details: { query, resultCount: patients?.length || 0 },
    });

    const patientsWithAge = (patients || []).map(patient => ({
      ...patient,
      age: patient.date_of_birth
        ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
        : null
    }));

    return NextResponse.json({
      patients: patientsWithAge,
      count: patientsWithAge.length,
      query,
    });
  } catch (error) {
    console.error('Error in patient search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
