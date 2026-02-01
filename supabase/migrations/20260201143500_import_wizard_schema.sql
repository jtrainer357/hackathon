-- Create Import Batches Table
CREATE TABLE IF NOT EXISTS import_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  created_by UUID NOT NULL REFERENCES users(id),
  
  -- Source info
  source_system TEXT NOT NULL, -- 'simplepractice' | 'therapynotes' | 'google' | 'excel' | 'other'
  source_files JSONB, -- [{ name, size, type, storage_path }]
  
  -- Status
  status TEXT NOT NULL DEFAULT 'processing', 
  -- 'processing' | 'ready_for_review' | 'committed' | 'failed' | 'cancelled'
  
  -- Results
  patients_imported INTEGER DEFAULT 0,
  documents_imported INTEGER DEFAULT 0,
  appointments_imported INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  warnings JSONB DEFAULT '[]',
  
  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  committed_at TIMESTAMPTZ,
  
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- RLS for import_batches
ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation_import_batches ON import_batches
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Create Import Patients Staging Table
CREATE TABLE IF NOT EXISTS import_patients_staging (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES import_batches(id) ON DELETE CASCADE,
    practice_id UUID NOT NULL REFERENCES practices(id),
    
    -- Data
    source_row_number INTEGER,
    source_data JSONB, -- Original CSV row
    mapped_data JSONB, -- Normalized data matching patients schema
    
    -- Validation
    validation_status TEXT DEFAULT 'pending', -- 'valid' | 'error' | 'warning'
    validation_errors JSONB DEFAULT '[]',
    validation_warnings JSONB DEFAULT '[]',
    
    -- User Review
    user_decision TEXT DEFAULT 'import', -- 'import' | 'skip' | 'fix'
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- RLS for import_patients_staging
ALTER TABLE import_patients_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation_import_patients_staging ON import_patients_staging
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Create Import Documents Staging Table
CREATE TABLE IF NOT EXISTS import_documents_staging (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES import_batches(id) ON DELETE CASCADE,
    practice_id UUID NOT NULL REFERENCES practices(id),
    
    -- File Info
    original_filename TEXT NOT NULL,
    storage_path TEXT NOT NULL, -- distinct from temp bucket path if needed, or same
    file_size_bytes INTEGER,
    mime_type TEXT,
    
    -- AI Extraction & Matching
    detected_document_type TEXT,
    detected_patient_name TEXT,
    detected_date DATE,
    
    -- Matching Result
    matched_patient_staging_id UUID REFERENCES import_patients_staging(id), -- Link to a patient in this batch
    match_confidence NUMERIC, -- 0.0 to 1.0
    
    -- User Review
    user_decision TEXT DEFAULT 'import', -- 'import' | 'skip'
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- RLS for import_documents_staging
ALTER TABLE import_documents_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation_import_documents_staging ON import_documents_staging
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Create Import Audit Log Table
CREATE TABLE IF NOT EXISTS import_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES import_batches(id),
    practice_id UUID NOT NULL REFERENCES practices(id),
    user_id UUID NOT NULL REFERENCES users(id),
    
    action TEXT NOT NULL, -- 'upload', 'analyze', 'update_mapping', 'commit'
    action_details JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- RLS for import_audit_log
ALTER TABLE import_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation_import_audit_log ON import_audit_log
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
-- Audit logs should be read-only for users (insert only) generally, 
-- but we might allow viewing logs. INSERT is done by server (service role) usually or authenticated user performing action.
-- For now, simple isolation.
