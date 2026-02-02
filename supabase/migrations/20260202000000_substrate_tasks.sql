-- Substrate Intelligence: Auto-Generated Tasks
-- Part of the Substrate Intelligence Layer

CREATE TABLE IF NOT EXISTS substrate_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,

  -- Task metadata
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type VARCHAR(50) NOT NULL CHECK (task_type IN (
    'pre_session', 'post_session', 'clinical_maintenance', 'communication', 'financial',
    -- Legacy compat aliases
    'pre_session_prep', 'post_session_followup', 'outcome_measure_alert', 'missed_appointment'
  )),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- AI generation
  generated_by TEXT DEFAULT 'substrate',
  generation_trigger TEXT,
  confidence_score DECIMAL(3, 2),

  -- Actionability
  action_url TEXT,
  action_type VARCHAR(20) CHECK (action_type IN ('navigate', 'modal', 'external')),
  estimated_duration_minutes INTEGER,

  -- State management
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'dismissed', 'expired')),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  auto_dismiss_at TIMESTAMPTZ,

  -- Related entities
  related_appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_substrate_tasks_practice ON substrate_tasks(practice_id);
CREATE INDEX IF NOT EXISTS idx_substrate_tasks_patient ON substrate_tasks(patient_id);
CREATE INDEX IF NOT EXISTS idx_substrate_tasks_status ON substrate_tasks(practice_id, status, due_date);
CREATE INDEX IF NOT EXISTS idx_substrate_tasks_due ON substrate_tasks(due_date) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_substrate_tasks_created ON substrate_tasks(created_at DESC);

-- Auto-dismiss expired tasks trigger
CREATE OR REPLACE FUNCTION auto_dismiss_expired_tasks()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.auto_dismiss_at IS NOT NULL AND NEW.auto_dismiss_at <= NOW() THEN
    NEW.status := 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_dismiss_tasks
  BEFORE UPDATE ON substrate_tasks
  FOR EACH ROW
  EXECUTE FUNCTION auto_dismiss_expired_tasks();

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE substrate_tasks;

-- Seed demo tasks for Tim Anders
INSERT INTO substrate_tasks (practice_id, patient_id, task_type, title, description, priority, status, due_date, generated_by, generation_trigger, confidence_score, action_url, action_type, estimated_duration_minutes, metadata)
SELECT
  p.id,
  pat.id,
  task.task_type,
  task.title,
  task.description,
  task.priority,
  'pending',
  task.due_date,
  'substrate',
  task.trigger,
  task.confidence,
  task.action_url,
  'navigate',
  task.duration,
  task.metadata::jsonb
FROM practices p
CROSS JOIN patients pat
CROSS JOIN (VALUES
  (
    'pre_session',
    'Review chart before Tim Anders session',
    'Upcoming therapy session on Thursday. Review last session notes and outcome measures before appointment.',
    'high',
    (NOW() + INTERVAL '1 day')::timestamptz,
    'appointment_in_24h',
    0.97,
    '/patients/c0000000-0000-0000-0000-000000000001',
    3,
    '{"icon": "clipboard-list"}'
  ),
  (
    'clinical_maintenance',
    'Reassess GAD-7 for Tim Anders',
    'Last GAD-7 administered 3 weeks ago. Score trending down to 4 (minimal). Consider reassessment to confirm progress.',
    'medium',
    NOW()::timestamptz,
    'outcome_measure_interval',
    0.92,
    '/patients/c0000000-0000-0000-0000-000000000001',
    2,
    '{"icon": "activity"}'
  ),
  (
    'post_session',
    'Follow up on CBT homework',
    'Tim was assigned breathing exercises and thought journaling. Check compliance at next session.',
    'medium',
    (NOW() + INTERVAL '2 days')::timestamptz,
    'session_completed',
    0.89,
    '/patients/c0000000-0000-0000-0000-000000000001',
    2,
    '{"icon": "book-open"}'
  ),
  (
    'communication',
    'Contact Sarah Johnson about missed session',
    'Patient missed scheduled appointment on 1/30. Attempt outreach to reschedule. 2 previous no-shows this quarter.',
    'urgent',
    (NOW() - INTERVAL '1 day')::timestamptz,
    'appointment_no_show',
    0.98,
    '/communications',
    5,
    '{"icon": "phone-missed"}'
  )
) AS task(task_type, title, description, priority, due_date, trigger, confidence, action_url, duration, metadata)
WHERE pat.first_name = 'Tim' AND pat.last_name = 'Anders'
LIMIT 4;
