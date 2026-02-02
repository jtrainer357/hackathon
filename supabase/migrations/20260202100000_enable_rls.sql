-- Enable Row Level Security on all core tables
-- This migration enables RLS and creates practice-isolation policies

-- ============================================
-- ENABLE RLS ON ALL CORE TABLES
-- ============================================
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE outcome_measures ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: Practice Isolation
-- ============================================

-- Practices: users can only see their own practice
CREATE POLICY "Users can view own practice"
  ON practices FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

-- Users: can only see users in their own practice
CREATE POLICY "Users can view own practice members"
  ON users FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

-- Patients: practice isolation
CREATE POLICY "Practice isolation for patients"
  ON patients FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for patient inserts"
  ON patients FOR INSERT
  TO authenticated
  WITH CHECK (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for patient updates"
  ON patients FOR UPDATE
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

-- Appointments: practice isolation
CREATE POLICY "Practice isolation for appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for appointment inserts"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for appointment updates"
  ON appointments FOR UPDATE
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

-- Session Notes: practice isolation
CREATE POLICY "Practice isolation for session_notes"
  ON session_notes FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for session_notes inserts"
  ON session_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Practice isolation for session_notes updates"
  ON session_notes FOR UPDATE
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

-- Outcome Measures: patient-based isolation (no direct practice_id column)
-- Join through patients table for practice isolation
CREATE POLICY "Practice isolation for outcome_measures"
  ON outcome_measures FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE practice_id IN (
        SELECT practice_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Practice isolation for outcome_measures inserts"
  ON outcome_measures FOR INSERT
  TO authenticated
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patients WHERE practice_id IN (
        SELECT practice_id FROM users WHERE id = auth.uid()
      )
    )
  );

-- ============================================
-- SERVICE ROLE BYPASS
-- All above policies are enforced for authenticated users.
-- The service_role key bypasses RLS automatically in Supabase.
-- ============================================

-- ============================================
-- AUDIT LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices(id),
  user_id UUID,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_practice ON audit_log(practice_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_resource ON audit_log(resource_type, resource_id);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Practice isolation for audit_log"
  ON audit_log FOR SELECT
  TO authenticated
  USING (
    practice_id IN (
      SELECT practice_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert audit_log"
  ON audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);
