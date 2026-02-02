-- Tebra Mental Health MVP: Core Schema Migration
-- Patient-as-Central-Object Architecture

-- ============================================
-- PRACTICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USERS TABLE (Providers & Staff)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'therapist', 'staff')),
  credentials VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PATIENTS TABLE (Central Object)
-- ============================================
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  pronouns VARCHAR(50),
  address TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),
  chief_complaint TEXT,
  treatment_plan TEXT,
  active_diagnoses TEXT,
  insurance_provider VARCHAR(255),
  insurance_id VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES users(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  location VARCHAR(255),
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SESSION NOTES TABLE (SOAP Format)
-- ============================================
CREATE TABLE IF NOT EXISTS session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  provider_id UUID REFERENCES users(id) ON DELETE SET NULL,
  note_date DATE NOT NULL,
  session_type VARCHAR(100),

  -- SOAP Format
  subjective TEXT,
  objective TEXT,
  assessment TEXT,
  plan TEXT,

  -- Session Details
  therapist_name VARCHAR(255),
  session_duration_minutes INTEGER,
  cpt_code VARCHAR(20),
  diagnosis_codes TEXT,

  -- AI Metadata
  is_ai_generated BOOLEAN DEFAULT false,
  ai_confidence_score DECIMAL(3,2),
  audio_recording_url TEXT,
  transcription_url TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'signed', 'amended')),
  signed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- OUTCOME MEASURES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS outcome_measures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  measure_type VARCHAR(50) NOT NULL CHECK (measure_type IN ('PHQ-9', 'GAD-7', 'PCL-5', 'AUDIT-C')),
  score INTEGER NOT NULL,
  measurement_date DATE NOT NULL,
  administered_by UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Practices
CREATE INDEX IF NOT EXISTS idx_practices_name ON practices(name);

-- Users
CREATE INDEX IF NOT EXISTS idx_users_practice ON users(practice_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(practice_id, role);

-- Patients
CREATE INDEX IF NOT EXISTS idx_patients_practice ON patients(practice_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(practice_id, last_name, first_name);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_active ON patients(practice_id, is_active);

-- Appointments
CREATE INDEX IF NOT EXISTS idx_appointments_practice ON appointments(practice_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id, appointment_date DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_provider ON appointments(provider_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(practice_id, appointment_date, appointment_time);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(practice_id, status, appointment_date);

-- Session Notes
CREATE INDEX IF NOT EXISTS idx_session_notes_practice ON session_notes(practice_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_patient ON session_notes(patient_id, note_date DESC);
CREATE INDEX IF NOT EXISTS idx_session_notes_provider ON session_notes(provider_id, note_date DESC);
CREATE INDEX IF NOT EXISTS idx_session_notes_appointment ON session_notes(appointment_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_date ON session_notes(practice_id, note_date DESC);

-- Outcome Measures
CREATE INDEX IF NOT EXISTS idx_outcome_measures_patient ON outcome_measures(patient_id, measurement_date DESC);
CREATE INDEX IF NOT EXISTS idx_outcome_measures_type ON outcome_measures(patient_id, measure_type, measurement_date DESC);

-- ============================================
-- ROW LEVEL SECURITY (Disabled for MVP Demo)
-- ============================================
-- Note: RLS policies commented out per requirements
-- ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE outcome_measures ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to calculate age from date of birth
CREATE OR REPLACE FUNCTION calculate_age(dob DATE)
RETURNS INTEGER AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(dob));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get patient's next appointment
CREATE OR REPLACE FUNCTION get_next_appointment(patient_uuid UUID)
RETURNS TABLE (
  id UUID,
  appointment_date DATE,
  appointment_time TIME,
  type VARCHAR,
  provider_name VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.appointment_date,
    a.appointment_time,
    a.type,
    u.name as provider_name
  FROM appointments a
  LEFT JOIN users u ON a.provider_id = u.id
  WHERE a.patient_id = patient_uuid
    AND a.status = 'scheduled'
    AND (a.appointment_date > CURRENT_DATE
         OR (a.appointment_date = CURRENT_DATE AND a.appointment_time > CURRENT_TIME))
  ORDER BY a.appointment_date, a.appointment_time
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get patient's recent notes count
CREATE OR REPLACE FUNCTION get_recent_notes_count(patient_uuid UUID, days INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM session_notes
    WHERE patient_id = patient_uuid
      AND note_date >= CURRENT_DATE - days
  );
END;
$$ LANGUAGE plpgsql;
