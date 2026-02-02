/**
 * Database Types for Tebra Mental Health MVP
 * Patient-as-Central-Object Architecture
 */

export interface Practice {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  practice_id: string;
  email: string;
  name: string;
  role: 'admin' | 'therapist' | 'staff';
  credentials?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  practice_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  pronouns?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  chief_complaint?: string;
  treatment_plan?: string;
  active_diagnoses?: string;
  insurance_provider?: string;
  insurance_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  practice_id: string;
  patient_id: string;
  provider_id?: string;
  appointment_date: string; // ISO date string
  appointment_time: string; // Time string (HH:MM:SS)
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  duration_minutes: number;
  location?: string;
  notes?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface SessionNote {
  id: string;
  practice_id: string;
  patient_id: string;
  appointment_id?: string;
  provider_id?: string;
  note_date: string; // ISO date string
  session_type?: string;

  // SOAP Format
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;

  // Session Details
  therapist_name?: string;
  session_duration_minutes?: number;
  cpt_code?: string;
  diagnosis_codes?: string;

  // AI Metadata
  is_ai_generated: boolean;
  ai_confidence_score?: number;
  audio_recording_url?: string;
  transcription_url?: string;

  // Status
  status: 'draft' | 'final' | 'signed' | 'amended';
  signed_at?: string;

  created_at: string;
  updated_at: string;
}

export interface OutcomeMeasure {
  id: string;
  patient_id: string;
  measure_type: 'PHQ-9' | 'GAD-7' | 'PCL-5' | 'AUDIT-C';
  score: number;
  measurement_date: string; // ISO date string
  administered_by?: string;
  notes?: string;
  created_at: string;
}

/**
 * Extended Patient object with related data
 * Used by the GET /api/patients/[id] endpoint
 */
export interface PatientDetails extends Patient {
  age?: number;
  stats: {
    totalNotes: number;
    totalAppointments: number;
    upcomingAppointments: number;
    totalOutcomeMeasures: number;
  };
  nextAppointment: Appointment | null;
  recentNote: SessionNote | null;
  sessionNotes: SessionNote[];
  appointments: {
    upcoming: Appointment[];
    past: Appointment[];
  };
  outcomeMeasures: Record<string, OutcomeMeasure[]>;
}

/**
 * Patient search result
 * Used by the GET /api/patients/search endpoint
 */
export interface PatientSearchResult {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  pronouns?: string;
  chief_complaint?: string;
  active_diagnoses?: string;
  is_active: boolean;
  created_at: string;
  age?: number;
}

/**
 * API Response Types
 */
export interface PatientSearchResponse {
  patients: PatientSearchResult[];
  count: number;
  query: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

/**
 * Outcome Measure Score Ranges
 */
export const OUTCOME_MEASURE_RANGES = {
  'PHQ-9': {
    min: 0,
    max: 27,
    severity: [
      { max: 4, label: 'Minimal' },
      { max: 9, label: 'Mild' },
      { max: 14, label: 'Moderate' },
      { max: 19, label: 'Moderately Severe' },
      { max: 27, label: 'Severe' }
    ]
  },
  'GAD-7': {
    min: 0,
    max: 21,
    severity: [
      { max: 4, label: 'Minimal' },
      { max: 9, label: 'Mild' },
      { max: 14, label: 'Moderate' },
      { max: 21, label: 'Severe' }
    ]
  },
  'PCL-5': {
    min: 0,
    max: 80,
    severity: [
      { max: 30, label: 'Low' },
      { max: 80, label: 'High' }
    ]
  },
  'AUDIT-C': {
    min: 0,
    max: 12,
    severity: [
      { max: 2, label: 'Low Risk' },
      { max: 12, label: 'High Risk' }
    ]
  }
} as const;

/**
 * CPT Codes for mental health services
 */
export const CPT_CODES = {
  '90791': 'Psychiatric Diagnostic Evaluation',
  '90834': 'Individual Psychotherapy (30 min)',
  '90837': 'Individual Psychotherapy (45 min)',
  '90836': 'Individual Psychotherapy (50-59 min)'
} as const;
