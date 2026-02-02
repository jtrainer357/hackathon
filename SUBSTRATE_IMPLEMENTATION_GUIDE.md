# SUBSTRATE IMPLEMENTATION GUIDE
## Mental Health MVP - Phase 2

**Version:** 1.0  
**Date:** February 2, 2026  
**Purpose:** Technical specification for implementing substrate intelligence layer  
**Target Completion:** February 5, 2026 (Hackathon Demo: February 6-7)  

---

## EXECUTIVE SUMMARY

The Substrate Intelligence Layer represents the **critical differentiator** for the MHMVP hackathon demo. While competitors offer AI assistants that wait for explicit user requests, our substrate runs continuously in the background—generating tasks, surfacing clinical insights, and automating workflows **before the user asks**.

**Key Principle:** AI is embedded in the substrate, not bolted on as a chatbot.

---

## SUBSTRATE ARCHITECTURE

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                    MHMVP Application                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Dashboard │  │  Patient   │  │   Care     │        │
│  │   Widgets  │  │   Page     │  │   Page     │        │
│  └──────▲─────┘  └──────▲─────┘  └──────▲─────┘        │
│         │                │                │              │
│         │   ┌────────────┴────────────┐   │              │
│         │   │  Supabase Realtime      │   │              │
│         └───┤  (Push Notifications)   ├───┘              │
│             └────────────┬────────────┘                  │
└──────────────────────────┼────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │   Substrate Intelligence    │
            │        Layer (AI)           │
            ├─────────────────────────────┤
            │ • Task Generation Engine    │
            │ • Clinical Insights Engine  │
            │ • Workflow Automation       │
            │ • Real-Time Orchestration   │
            └──────────────┬──────────────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
┌────▼────┐      ┌────────▼────────┐      ┌────▼────┐
│ Event   │      │  Cron Jobs      │      │ Gemini  │
│Triggers │      │ (Daily/Hourly)  │      │ 2.0     │
└─────────┘      └─────────────────┘      │ Flash   │
                                          └─────────┘
```

### Data Flow

1. **Event Trigger** → Substrate Worker → Database Write → Realtime Push → UI Update
2. **Cron Job** → Substrate Worker → Batch Processing → Database Write → Realtime Push → UI Update
3. **User Action** → Database Write → Event Trigger → Substrate Worker → [Loop]

---

## COMPONENT 1: TASK GENERATION ENGINE

### Purpose
Automatically generate actionable tasks based on clinical triggers, eliminating manual task creation.

### Task Types & Triggers

#### 1. Pre-Session Prep Tasks
**Trigger:** 30 minutes before appointment  
**Priority:** Medium to High  
**Auto-Dismiss:** After appointment ends  

**Generated Tasks:**
```typescript
[
  {
    title: "Review last session note",
    description: "Patient showed progress with CBT exposure hierarchy. Prepare to discuss next steps.",
    task_type: "pre_session",
    priority: "medium",
    confidence_score: 0.95,
    action_url: "/patient/{id}/notes",
    estimated_duration_minutes: 3,
    due_at: appointmentTime - 30 minutes,
    auto_dismiss_at: appointmentTime + sessionDuration
  },
  {
    title: "Check outcome measure trends",
    description: "GAD-7 was 14 last session. Review trend to assess progress.",
    task_type: "pre_session",
    priority: "high",
    confidence_score: 0.92,
    action_url: "/patient/{id}/outcome-measures",
    estimated_duration_minutes: 2
  }
]
```

**Implementation:**
```typescript
// lib/substrate/workers/pre-session-tasks.ts
export async function generatePreSessionTasks(appointmentId: string) {
  const appointment = await getAppointmentWithPatientHistory(appointmentId);
  
  // Extract relevant context
  const context = {
    patient: appointment.patient,
    lastSessionNote: await getLastSessionNote(appointment.patient_id),
    outcomeMeasures: await getRecentOutcomeMeasures(appointment.patient_id, 3),
    treatmentPlan: await getTreatmentPlan(appointment.patient_id)
  };
  
  // Call Gemini to generate tasks
  const prompt = buildTaskGenerationPrompt('pre_session', context);
  const generatedTasks = await geminiGenerateTasks(prompt);
  
  // Filter by confidence (≥85%)
  const highConfidenceTasks = generatedTasks.filter(t => t.confidence_score >= 0.85);
  
  // Insert into database
  await supabase.from('substrate_tasks').insert(
    highConfidenceTasks.map(task => ({
      ...task,
      practice_id: appointment.practice_id,
      patient_id: appointment.patient_id,
      generation_trigger: 'appointment_in_30_min',
      due_at: new Date(appointment.start_time.getTime() - 30 * 60000),
      auto_dismiss_at: new Date(appointment.end_time)
    }))
  );
  
  // Realtime will automatically push to connected clients
}
```

#### 2. Post-Session Documentation Tasks
**Trigger:** Session recording stopped  
**Priority:** High  
**Auto-Dismiss:** After note signed + invoice sent  

**Generated Tasks:**
```typescript
[
  {
    title: "Review and sign SOAP note",
    description: "AI-generated note ready for review. Confirm accuracy before signing.",
    task_type: "post_session",
    priority: "high",
    confidence_score: 1.0, // Always required
    action_url: "/care/session/{id}/review",
    estimated_duration_minutes: 5
  },
  {
    title: "Confirm CPT code and create invoice",
    description: "Substrate detected 90836 (50-59 min session). Confirm and send invoice.",
    task_type: "post_session",
    priority: "high",
    confidence_score: 0.98,
    action_url: "/care/session/{id}/billing",
    estimated_duration_minutes: 2
  },
  {
    title: "Share session summary with patient portal",
    description: "Review patient-safe content before sharing homework and next appointment.",
    task_type: "post_session",
    priority: "medium",
    confidence_score: 0.90,
    action_url: "/care/session/{id}/portal",
    estimated_duration_minutes: 2
  }
]
```

#### 3. Clinical Maintenance Tasks
**Trigger:** Daily cron job (6 AM)  
**Priority:** Medium  
**Auto-Dismiss:** 7 days after creation  

**Generated Tasks:**
```typescript
[
  {
    title: "Administer overdue outcome measures",
    description: "5 patients have GAD-7/PHQ-9 overdue (>45 days). Schedule assessments.",
    task_type: "clinical_maintenance",
    priority: "medium",
    confidence_score: 1.0, // Rule-based
    action_url: "/patients?filter=outcome_measures_overdue",
    estimated_duration_minutes: 15
  },
  {
    title: "Review treatment plans due for update",
    description: "3 treatment plans require 90-day review for Medicare compliance.",
    task_type: "clinical_maintenance",
    priority: "high",
    confidence_score: 1.0,
    action_url: "/patients?filter=treatment_plan_review_due",
    estimated_duration_minutes: 20
  }
]
```

#### 4. Communication Follow-Up Tasks
**Trigger:** Hourly cron job  
**Priority:** Medium  
**Auto-Dismiss:** After response sent  

**Generated Tasks:**
```typescript
[
  {
    title: "Respond to unread patient messages",
    description: "3 patients have sent messages in the last 24 hours without response.",
    task_type: "communication",
    priority: "medium",
    confidence_score: 1.0,
    action_url: "/communications?filter=unread",
    estimated_duration_minutes: 10
  }
]
```

#### 5. Financial Management Tasks
**Trigger:** Weekly cron job (Monday 8 AM)  
**Priority:** Medium to High  
**Auto-Dismiss:** 30 days after creation  

**Generated Tasks:**
```typescript
[
  {
    title: "Follow up on aging accounts receivable",
    description: "$8,350 outstanding (14 invoices >30 days). Review and send reminders.",
    task_type: "financial",
    priority: "high",
    confidence_score: 1.0,
    action_url: "/billing?filter=aging_ar",
    estimated_duration_minutes: 20
  }
]
```

### Task Generation Prompt Template

```
You are a clinical task generation AI for a mental health practice.

Context:
- Trigger: {trigger_type}
- Patient: {patient_name} (GAD-7: {gad7_score}, PHQ-9: {phq9_score}, Last session: {days_ago} days ago)
- Last session note: "{last_note_summary}"
- Upcoming appointment: {appointment_date_time}

Generate 2-4 actionable tasks for the therapist.

Rules:
1. Task titles: Actionable, specific, <60 characters
2. Descriptions: Provide context, <150 characters
3. Confidence: Only return tasks with ≥85% confidence
4. Priority: High for clinical safety/compliance, Medium for routine tasks
5. Estimated duration: 2-5 minutes for prep, 5-15 for documentation
6. Action URL: Deep link to relevant page

Return JSON array:
[
  {
    "title": "Review last session note",
    "description": "Patient made progress with exposure hierarchy. Prepare next steps.",
    "task_type": "{task_type}",
    "priority": "medium",
    "confidence_score": 0.95,
    "action_url": "/patient/{patient_id}/notes",
    "estimated_duration_minutes": 3
  }
]
```

### Database Schema

```sql
CREATE TABLE substrate_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  patient_id UUID REFERENCES patients(id), -- null for practice-level tasks
  
  -- Task metadata
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL, -- 'pre_session' | 'post_session' | 'clinical_maintenance' | 'communication' | 'financial'
  priority TEXT NOT NULL, -- 'high' | 'medium' | 'low'
  
  -- AI generation
  generated_by TEXT DEFAULT 'substrate',
  generation_trigger TEXT, -- e.g., 'appointment_in_30_min'
  confidence_score DECIMAL(3, 2), -- 0.00-1.00
  
  -- Actionability
  action_url TEXT,
  action_type TEXT DEFAULT 'navigate', -- 'navigate' | 'modal' | 'external'
  estimated_duration_minutes INTEGER,
  
  -- State management
  status TEXT DEFAULT 'pending', -- 'pending' | 'in_progress' | 'completed' | 'dismissed' | 'expired'
  assigned_to UUID REFERENCES users(id),
  due_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  auto_dismiss_at TIMESTAMPTZ, -- Tasks auto-clear after this time
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- Enable RLS
ALTER TABLE substrate_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON substrate_tasks
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Indexes
CREATE INDEX idx_substrate_tasks_practice ON substrate_tasks(practice_id);
CREATE INDEX idx_substrate_tasks_patient ON substrate_tasks(patient_id);
CREATE INDEX idx_substrate_tasks_status ON substrate_tasks(status);
CREATE INDEX idx_substrate_tasks_due ON substrate_tasks(due_at);
CREATE INDEX idx_substrate_tasks_created ON substrate_tasks(created_at DESC);

-- Auto-dismiss trigger
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
```

### API Routes

```typescript
// app/api/substrate/tasks/generate/route.ts
export async function POST(req: Request) {
  const { trigger_type, context } = await req.json();
  
  // Validate trigger type
  if (!VALID_TRIGGERS.includes(trigger_type)) {
    return NextResponse.json({ error: 'Invalid trigger' }, { status: 400 });
  }
  
  // Generate tasks
  const tasks = await generateTasksForTrigger(trigger_type, context);
  
  // Insert into database
  const { data, error } = await supabase
    .from('substrate_tasks')
    .insert(tasks)
    .select();
  
  if (error) throw error;
  
  return NextResponse.json({ tasks: data });
}

// app/api/substrate/tasks/[id]/complete/route.ts
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const { data, error } = await supabase
    .from('substrate_tasks')
    .update({ status: 'completed', completed_at: new Date() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  
  return NextResponse.json({ task: data });
}
```

### Real-Time Hook

```typescript
// lib/realtime/useSubstrateTasks.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SubstrateTask } from '@/types';

export function useSubstrateTasks(practiceId: string) {
  const [tasks, setTasks] = useState<SubstrateTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('substrate_tasks')
        .select('*')
        .eq('practice_id', practiceId)
        .in('status', ['pending', 'in_progress'])
        .order('priority', { ascending: false })
        .order('due_at', { ascending: true });

      if (data) setTasks(data);
      setLoading(false);
    };

    fetchTasks();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('substrate_tasks')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'substrate_tasks',
        filter: `practice_id=eq.${practiceId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks(prev => {
            const newTask = payload.new as SubstrateTask;
            // Only add if status is pending/in_progress
            if (['pending', 'in_progress'].includes(newTask.status)) {
              return [...prev, newTask].sort(sortTasks);
            }
            return prev;
          });
        } else if (payload.eventType === 'UPDATE') {
          setTasks(prev => prev.map(t => 
            t.id === payload.new.id ? payload.new as SubstrateTask : t
          ).filter(t => ['pending', 'in_progress'].includes(t.status)));
        } else if (payload.eventType === 'DELETE') {
          setTasks(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .subscribe();

    // Fallback polling every 60 seconds
    const pollInterval = setInterval(fetchTasks, 60000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [practiceId]);

  return { tasks, loading };
}

function sortTasks(a: SubstrateTask, b: SubstrateTask) {
  // Priority: high > medium > low
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  if (a.priority !== b.priority) {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }
  // Then by due date
  return (a.due_at?.getTime() || 0) - (b.due_at?.getTime() || 0);
}
```

### Widget Component

```typescript
// components/widgets/tasks-widget.tsx
import { useSubstrateTasks } from '@/lib/realtime/useSubstrateTasks';
import { WidgetContainer } from '@/components/ui/widget-container';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignSystem } from '@/lib/design-system';

export function TasksWidget() {
  const practiceId = useCurrentPracticeId();
  const { tasks, loading } = useSubstrateTasks(practiceId);
  
  // Show top 3-4 tasks
  const displayTasks = tasks.slice(0, 4);
  const totalCount = tasks.length;

  if (loading) {
    return (
      <WidgetContainer title="Today's Tasks" metadata="LOADING...">
        <TasksSkeleton />
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer 
      title="Today's Tasks" 
      metadata={`${totalCount} TOTAL`}
      variant="default"
      linkText={totalCount > 4 ? "See all tasks" : undefined}
      linkHref={totalCount > 4 ? "/tasks" : undefined}
    >
      {displayTasks.length === 0 ? (
        <EmptyState 
          icon="CheckCircle" 
          message="No tasks for today" 
          subtext="You're all caught up!"
        />
      ) : (
        <AnimatePresence mode="popLayout">
          {displayTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: DesignSystem.animation.duration,
                  delay: index * 0.1
                }
              }}
              exit={{ opacity: 0, height: 0 }}
              layout
            >
              <TaskRow task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </WidgetContainer>
  );
}

function TaskRow({ task }: { task: SubstrateTask }) {
  const handleStart = async () => {
    if (task.action_url) {
      router.push(task.action_url);
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-backbone-1 rounded-lg transition-colors">
      <div className="mt-1">
        <TaskIcon type={task.task_type} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-synapse-6 text-sm mb-1">
          {task.title}
        </h4>
        <p className="text-synapse-4 text-xs mb-2 line-clamp-2">
          {task.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-synapse-4">
          {task.estimated_duration_minutes && (
            <span>~{task.estimated_duration_minutes} min</span>
          )}
          {task.priority === 'high' && (
            <span className="px-2 py-0.5 bg-remedy/10 text-remedy rounded">
              High Priority
            </span>
          )}
          {task.confidence_score && task.confidence_score < 0.95 && (
            <span className="px-2 py-0.5 bg-amino/10 text-neuron rounded">
              Review
            </span>
          )}
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleStart}
        className="shrink-0"
      >
        Start
      </Button>
    </div>
  );
}
```

---

## COMPONENT 2: CLINICAL INSIGHTS ENGINE

### Purpose
Surface contextual clinical insights on Patient 360 view to highlight trends, risks, and compliance issues.

### Insight Types

#### 1. Trend Analysis (Outcome Measures)
**Trigger:** New outcome measure recorded OR weekly analysis  
**Confidence Threshold:** ≥85%  
**Display Location:** Outcome Measures tab, Patient header  

**Example Insights:**
```typescript
{
  title: "GAD-7 trending upward",
  description: "GAD-7 increased by 3 points over last 2 sessions (11 → 14). Consider treatment plan adjustment or medication consultation.",
  insight_type: "trend",
  severity: "warning",
  confidence_score: 0.92,
  recommended_action: "Review current treatment approach",
  action_url: "/patient/{id}/treatment-plan",
  data_sources: ["outcome_measures"]
}
```

#### 2. Risk Flags (Safety Concerns)
**Trigger:** Session note analysis (post-recording)  
**Confidence Threshold:** ≥95%  
**Display Location:** Patient header (red banner), Session Notes tab  

**Example Insights:**
```typescript
{
  title: "Safety concern detected",
  description: "Patient mentioned suicidal ideation in last session. Safety assessment recommended before next appointment.",
  insight_type: "risk",
  severity: "critical",
  confidence_score: 0.98,
  recommended_action: "Conduct safety assessment, consider crisis planning",
  action_url: "/patient/{id}/safety-assessment",
  data_sources: ["session_notes"]
}
```

#### 3. Treatment Effectiveness (Progress Tracking)
**Trigger:** Weekly analysis OR milestone reached  
**Confidence Threshold:** ≥85%  
**Display Location:** Treatment Plan tab  

**Example Insights:**
```typescript
{
  title: "Significant symptom improvement",
  description: "PHQ-9 decreased by 40% since treatment start (22 → 13). Patient responding well to CBT approach.",
  insight_type: "effectiveness",
  severity: "success",
  confidence_score: 0.94,
  recommended_action: "Continue current approach, consider discussing maintenance phase",
  action_url: "/patient/{id}/treatment-plan",
  data_sources: ["outcome_measures", "treatment_plan"]
}
```

#### 4. Compliance Alerts (Missing Documentation)
**Trigger:** Daily cron job (6 AM)  
**Confidence Threshold:** 100% (rule-based)  
**Display Location:** Treatment Plan tab, Patient header  

**Example Insights:**
```typescript
{
  title: "Treatment plan review overdue",
  description: "Treatment plan not reviewed in 120 days. Medicare compliance requires review every 90 days.",
  insight_type: "compliance",
  severity: "warning",
  confidence_score: 1.0,
  recommended_action: "Schedule treatment plan review session",
  action_url: "/patient/{id}/treatment-plan/review",
  data_sources: ["treatment_plan"]
}
```

### Insight Generation Prompt Template

```
You are a clinical insight AI for a mental health practice.

Patient Context:
- Name: {patient_name}
- Diagnoses: {diagnoses_list}
- Treatment modality: {treatment_modality}
- Outcome measures (last 3 sessions):
  - GAD-7: {gad7_scores_array}
  - PHQ-9: {phq9_scores_array}
- Last session note summary: "{last_note_summary}"
- Treatment plan start date: {treatment_start_date}
- Days since last treatment plan review: {days_since_review}

Generate 0-2 clinical insights based on the data.

Rules:
1. Only return insights with ≥85% confidence
2. Insight types: trend | risk | effectiveness | compliance
3. Severity levels:
   - critical: Immediate safety concerns (suicidality, self-harm, abuse)
   - warning: Clinical attention needed (worsening symptoms, compliance issues)
   - info: Noteworthy observations (stable trends, minor changes)
   - success: Positive progress (symptom improvement, treatment effectiveness)
4. Recommended actions: Specific, actionable guidance
5. Data sources: List which data informed this insight

Return JSON array:
[
  {
    "title": "GAD-7 trending upward",
    "description": "GAD-7 increased by 3 points over 2 sessions. Consider treatment adjustment.",
    "insight_type": "trend",
    "severity": "warning",
    "confidence_score": 0.92,
    "recommended_action": "Review treatment approach",
    "action_url": "/patient/{patient_id}/treatment-plan",
    "data_sources": ["outcome_measures"]
  }
]
```

### Database Schema

```sql
CREATE TABLE clinical_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  
  -- Insight metadata
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  insight_type TEXT NOT NULL, -- 'trend' | 'risk' | 'effectiveness' | 'compliance'
  severity TEXT NOT NULL, -- 'critical' | 'warning' | 'info' | 'success'
  
  -- AI generation
  generated_by TEXT DEFAULT 'substrate',
  data_sources TEXT[], -- e.g., ['outcome_measures', 'session_notes']
  confidence_score DECIMAL(3, 2),
  
  -- Actionability
  recommended_action TEXT,
  action_url TEXT,
  
  -- Lifecycle
  status TEXT DEFAULT 'active', -- 'active' | 'acknowledged' | 'resolved' | 'dismissed'
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Some insights expire (e.g., 30 days)
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id),
  CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Enable RLS
ALTER TABLE clinical_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON clinical_insights
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Indexes
CREATE INDEX idx_clinical_insights_practice ON clinical_insights(practice_id);
CREATE INDEX idx_clinical_insights_patient ON clinical_insights(patient_id);
CREATE INDEX idx_clinical_insights_status ON clinical_insights(status);
CREATE INDEX idx_clinical_insights_severity ON clinical_insights(severity);
CREATE INDEX idx_clinical_insights_created ON clinical_insights(created_at DESC);
```

### Real-Time Hook

```typescript
// lib/realtime/useClinicalInsights.ts
export function useClinicalInsights(patientId: string) {
  const [insights, setInsights] = useState<ClinicalInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const { data } = await supabase
        .from('clinical_insights')
        .select('*')
        .eq('patient_id', patientId)
        .eq('status', 'active')
        .order('severity', { ascending: false }) // critical first
        .order('created_at', { ascending: false });

      if (data) setInsights(data);
      setLoading(false);
    };

    fetchInsights();

    const channel = supabase
      .channel('clinical_insights')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'clinical_insights',
        filter: `patient_id=eq.${patientId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newInsight = payload.new as ClinicalInsight;
          if (newInsight.status === 'active') {
            setInsights(prev => [...prev, newInsight].sort(sortInsights));
          }
        } else if (payload.eventType === 'UPDATE') {
          setInsights(prev => prev.map(i => 
            i.id === payload.new.id ? payload.new as ClinicalInsight : i
          ).filter(i => i.status === 'active'));
        } else if (payload.eventType === 'DELETE') {
          setInsights(prev => prev.filter(i => i.id !== payload.old.id));
        }
      })
      .subscribe();

    const pollInterval = setInterval(fetchInsights, 60000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [patientId]);

  return { insights, loading };
}

function sortInsights(a: ClinicalInsight, b: ClinicalInsight) {
  const severityOrder = { critical: 4, warning: 3, info: 2, success: 1 };
  if (a.severity !== b.severity) {
    return severityOrder[b.severity] - severityOrder[a.severity];
  }
  return b.created_at.getTime() - a.created_at.getTime();
}
```

### UI Component

```typescript
// components/patient/clinical-insights-banner.tsx
import { useClinicalInsights } from '@/lib/realtime/useClinicalInsights';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, CheckCircle, Info } from 'lucide-react';

export function ClinicalInsightsBanner({ patientId }: { patientId: string }) {
  const { insights, loading } = useClinicalInsights(patientId);

  if (loading || insights.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence>
        {insights.map(insight => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg',
              getSeverityStyles(insight.severity)
            )}
          >
            <div className="shrink-0 mt-0.5">
              {getInsightIcon(insight.severity, insight.insight_type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1">
                {insight.title}
              </h4>
              <p className="text-sm opacity-90 mb-2">
                {insight.description}
              </p>
              {insight.recommended_action && (
                <p className="text-xs opacity-80">
                  <strong>Recommended:</strong> {insight.recommended_action}
                </p>
              )}
            </div>
            <div className="shrink-0 flex gap-2">
              {insight.action_url && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push(insight.action_url!)}
                >
                  Take Action
                </Button>
              )}
              {insight.severity !== 'critical' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(insight.id)}
                >
                  Dismiss
                </Button>
              )}
              {['critical', 'warning'].includes(insight.severity) && (
                <Button
                  size="sm"
                  onClick={() => handleAcknowledge(insight.id)}
                >
                  Acknowledge
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function getSeverityStyles(severity: string) {
  switch (severity) {
    case 'critical':
      return 'bg-remedy/10 border-2 border-remedy text-remedy';
    case 'warning':
      return 'bg-amino/10 border-2 border-neuron text-synapse-6';
    case 'info':
      return 'bg-growth-1 border-2 border-growth-2 text-synapse-6';
    case 'success':
      return 'bg-asana/10 border-2 border-vigor text-synapse-6';
    default:
      return 'bg-backbone-1';
  }
}

function getInsightIcon(severity: string, type: string) {
  if (severity === 'critical') return <AlertTriangle className="w-5 h-5 text-remedy" />;
  if (severity === 'warning') return <AlertTriangle className="w-5 h-5 text-neuron" />;
  if (type === 'trend') return <TrendingUp className="w-5 h-5" />;
  if (type === 'effectiveness' || severity === 'success') return <CheckCircle className="w-5 h-5 text-vigor" />;
  return <Info className="w-5 h-5" />;
}
```

---

## COMPONENT 3: REAL-TIME ORCHESTRATION

### Supabase Realtime Setup

#### Enable Realtime on Tables
```sql
-- Enable Realtime for substrate_tasks
ALTER PUBLICATION supabase_realtime ADD TABLE substrate_tasks;

-- Enable Realtime for clinical_insights
ALTER PUBLICATION supabase_realtime ADD TABLE clinical_insights;

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

#### Client Configuration
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 10 // Throttle updates
      }
    }
  }
);
```

### Toast Notifications

```typescript
// components/substrate/realtime-toast-manager.tsx
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export function RealtimeToastManager({ practiceId }: { practiceId: string }) {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('substrate_notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'substrate_tasks',
        filter: `practice_id=eq.${practiceId}`
      }, (payload) => {
        const task = payload.new as SubstrateTask;
        if (task.priority === 'high') {
          toast({
            title: 'New high-priority task',
            description: task.title,
            variant: 'default',
            action: {
              label: 'View',
              onClick: () => router.push(task.action_url)
            }
          });
        }
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'clinical_insights',
        filter: `practice_id=eq.${practiceId}`
      }, (payload) => {
        const insight = payload.new as ClinicalInsight;
        if (insight.severity === 'critical') {
          toast({
            title: '⚠️ Critical clinical insight',
            description: insight.title,
            variant: 'destructive',
            duration: 10000 // 10 seconds
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [practiceId, toast]);

  return null; // Invisible component
}
```

---

## TESTING CHECKLIST

### Unit Tests
- [ ] Task generation logic (each trigger type)
- [ ] Insight generation logic (each insight type)
- [ ] Task prioritization sorting
- [ ] Insight severity sorting
- [ ] Confidence score filtering (≥85%)
- [ ] Auto-dismiss logic

### Integration Tests
- [ ] End-to-end task generation flow
- [ ] End-to-end insight generation flow
- [ ] Realtime subscription (tasks)
- [ ] Realtime subscription (insights)
- [ ] Fallback polling (60-second interval)
- [ ] Database triggers (auto-dismiss)

### UI Tests
- [ ] TasksWidget displays correctly
- [ ] TasksWidget real-time updates
- [ ] TasksWidget empty state
- [ ] ClinicalInsightsBanner displays correctly
- [ ] ClinicalInsightsBanner real-time updates
- [ ] Acknowledge/dismiss actions
- [ ] Toast notifications

### Performance Tests
- [ ] Realtime connection stability (>1 hour)
- [ ] Task generation latency (<2 seconds)
- [ ] Insight generation latency (<3 seconds)
- [ ] UI responsiveness with 50+ tasks
- [ ] UI responsiveness with 10+ insights

### Substrate Quality Checks
- [ ] All generated tasks have confidence ≥85%
- [ ] All generated insights have confidence ≥85%
- [ ] Task titles are actionable and specific
- [ ] Insight descriptions are clear and concise
- [ ] Recommended actions are specific
- [ ] Action URLs are valid deep links
- [ ] Duplicate tasks not generated
- [ ] Expired tasks auto-dismiss correctly

---

## TROUBLESHOOTING

### Realtime Connection Issues

**Problem:** Realtime updates not appearing  
**Solutions:**
1. Check Realtime is enabled on tables: `ALTER PUBLICATION supabase_realtime ADD TABLE substrate_tasks;`
2. Verify RLS policies allow reads
3. Check browser console for connection errors
4. Verify `practiceId` filter matches current user's practice
5. Fallback polling should work (60-second interval)

**Problem:** Too many updates causing UI jank  
**Solutions:**
1. Throttle updates with `eventsPerSecond` param
2. Debounce state updates in hooks
3. Use `AnimatePresence` with `mode="popLayout"`

### Task Generation Issues

**Problem:** Tasks not generating  
**Solutions:**
1. Check cron jobs are running (Vercel Cron or external scheduler)
2. Verify Gemini API key is valid
3. Check prompt template is correct
4. Verify practice has required data (appointments, patients)
5. Check background worker logs

**Problem:** Duplicate tasks generated  
**Solutions:**
1. Add unique constraint on task generation trigger + timestamp
2. Implement deduplication logic before insert
3. Check cron job is not running multiple times

### Insight Generation Issues

**Problem:** Insights not showing on Patient 360  
**Solutions:**
1. Check `useClinicalInsights` hook is called with correct `patientId`
2. Verify insights exist in database for that patient
3. Check RLS policies allow reads
4. Verify insight status is 'active'
5. Check severity-based sorting logic

**Problem:** Low-quality insights generated  
**Solutions:**
1. Increase confidence threshold (≥90% instead of ≥85%)
2. Improve prompt template with more specific rules
3. Add post-processing validation logic
4. Review Gemini temperature settings (lower = more deterministic)

---

## DEMO PREPARATION

### Substrate Intelligence Demo Flow

**Setup (Before Demo):**
1. Seed database with 58 patients (from SimplePractice import)
2. Create 3 upcoming appointments for next 2 hours
3. Generate 6-8 substrate tasks across all types
4. Generate 2-3 clinical insights (1 warning, 1 success)

**Demo Script:**
1. **Dashboard View (30 seconds):**
   - "Notice the Tasks widget shows 6 AI-generated tasks"
   - "These appeared automatically—no manual task creation"
   - "Tasks are prioritized by urgency and clinical importance"

2. **Patient 360 View (45 seconds):**
   - Navigate to patient with clinical insights
   - "See this yellow banner? Substrate detected GAD-7 trending upward"
   - "AI analyzed last 3 sessions and surfaced this insight proactively"
   - "No chatbot interface—intelligence is embedded in the substrate"

3. **Real-Time Update (30 seconds):**
   - Trigger new task generation (via API or cron)
   - Show toast notification appear
   - Show widget update without page refresh
   - "Realtime orchestration via Supabase—zero manual refresh"

4. **Differentiation Statement (15 seconds):**
   - "Competitors build AI assistants that wait for requests"
   - "We build substrate intelligence that predicts needs"
   - "This is AI-native architecture, not AI bolted-on"

---

## SUCCESS METRICS

### Quantitative Metrics
- [ ] **Task Generation:** 6-8 tasks generated per practice per day
- [ ] **Insight Generation:** 1-3 insights per patient with recent activity
- [ ] **Confidence Scores:** ≥90% of generated items have confidence ≥85%
- [ ] **Real-Time Latency:** Updates appear within 2 seconds of database write
- [ ] **System Uptime:** 99%+ Realtime connection stability

### Qualitative Metrics
- [ ] **Task Relevance:** 80%+ of generated tasks are clinically appropriate
- [ ] **Insight Accuracy:** 90%+ of insights correctly identify clinical patterns
- [ ] **User Perception:** Demo audience recognizes substrate as differentiator
- [ ] **Code Quality:** Enterprise-grade patterns, comprehensive error handling

---

*This Substrate Implementation Guide v1.0 provides the technical blueprint for building the MHMVP's competitive differentiator. Last updated: February 2, 2026.*
