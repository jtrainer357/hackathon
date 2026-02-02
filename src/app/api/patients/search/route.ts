import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/patients/search?q=[name]
 * Search patients by name (first name or last name)
 * Query params:
 *   - q: search query (required)
 *   - limit: max results (optional, default 50)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const supabase = await createClient();

    // Search in both first_name and last_name fields
    // Using ilike for case-insensitive partial matching
    // If query is empty, return all patients
    let queryBuilder = supabase
      .from('patients')
      .select(`
        id,
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

    // Only add the search filter if query is not empty
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

    // Calculate age for each patient
    const patientsWithAge = patients.map(patient => ({
      ...patient,
      age: patient.date_of_birth
        ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
        : null
    }));

    return NextResponse.json({
      patients: patientsWithAge,
      count: patientsWithAge.length,
      query: query
    });

  } catch (error) {
    console.error('Error in patient search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
