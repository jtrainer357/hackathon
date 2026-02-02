-- Substrate Intelligence: Clinical Insights Table
-- Stores AI-generated clinical insights for Patient 360 view

CREATE TABLE IF NOT EXISTS clinical_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  -- Insight metadata
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('trend', 'risk', 'effectiveness', 'compliance')),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'info', 'success')),

  -- AI generation
  generated_by TEXT DEFAULT 'substrate',
  data_sources TEXT[],
  confidence_score DECIMAL(3, 2),

  -- Actionability
  recommended_action TEXT,
  action_url TEXT,

  -- Lifecycle
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_clinical_insights_practice ON clinical_insights(practice_id);
CREATE INDEX IF NOT EXISTS idx_clinical_insights_patient ON clinical_insights(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_insights_status ON clinical_insights(status);
CREATE INDEX IF NOT EXISTS idx_clinical_insights_severity ON clinical_insights(severity);
CREATE INDEX IF NOT EXISTS idx_clinical_insights_created ON clinical_insights(created_at DESC);

-- Seed demo insights for Tim Anders
INSERT INTO clinical_insights (practice_id, patient_id, title, description, insight_type, severity, generated_by, data_sources, confidence_score, recommended_action)
SELECT
  p.id,
  pat.id,
  ins.title,
  ins.description,
  ins.insight_type,
  ins.severity,
  'substrate',
  ins.data_sources,
  ins.confidence_score,
  ins.recommended_action
FROM practices p
CROSS JOIN patients pat
CROSS JOIN (VALUES
  (
    'Treatment Response',
    'PHQ-9 improved 83% since treatment start (18 → 3). Patient responding exceptionally well to CBT approach.',
    'effectiveness',
    'success',
    ARRAY['outcome_measures', 'treatment_plan'],
    0.96,
    'Continue current treatment approach. Consider discussing maintenance phase and reduced session frequency.'
  ),
  (
    'Anxiety Improvement',
    'GAD-7 decreased significantly: 15 → 4 over 7 assessments. Symptoms now in minimal range.',
    'trend',
    'success',
    ARRAY['outcome_measures'],
    0.94,
    'Patient may be ready for transition to biweekly sessions.'
  ),
  (
    'Strong Engagement',
    'Consistent session attendance with no missed appointments. High treatment compliance noted.',
    'effectiveness',
    'info',
    ARRAY['appointments', 'session_notes'],
    0.91,
    'Acknowledge patient effort and discuss long-term wellness strategies.'
  )
) AS ins(title, description, insight_type, severity, data_sources, confidence_score, recommended_action)
WHERE pat.first_name = 'Tim' AND pat.last_name = 'Anders'
LIMIT 3;
