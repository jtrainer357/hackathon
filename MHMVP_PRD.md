# Mental Health MVP: Product Requirements Document
## Tebra Dynamic Canvas Initiative

**Version:** 2.0 (Updated for Substrate Intelligence Phase)  
**Date:** February 2, 2026  
**Owner:** Jay Trainer (UX Strategy & Prototype Lead)  
**Stakeholders:** Kyle Ryan (CTO/CPO), Catarina Tsang (UX Lead/AI Framework), Rich U (Data Infrastructure)  
**Target Launch:** Q2 2026  
**Hackathon Demo:** February 6-7, 2026  

---

## EXECUTIVE SUMMARY

The Mental Health MVP represents the initial vertical deployment of Tebra's Dynamic Canvas initiative—a revolutionary shift from module-based navigation to **patient-as-central-object** architecture powered by AI substrate intelligence.

### The Problem We're Solving

Solo mental health practitioners (1-3 providers) face three critical pain points:

1. **Documentation Burden:** 15-20 minutes per patient spent on clinical notes (30-40% of their day)
2. **EHR Fragmentation:** Current systems fragment workflows across separate modules requiring constant context switching
3. **Migration Tax:** 20-40 hours of administrative labor to switch EHRs, creating vendor lock-in

### Our Solution

A lean, clinical-first platform delivering:

- **Patient-as-Central-Object:** All data organizes around patient records, not feature modules
- **AI Substrate Intelligence:** Continuous background AI that generates tasks, surfaces insights, and automates clinical workflows
- **AI-Native Data Import:** 15-minute self-service migration vs. 20-hour manual re-entry
- **Channel-Agnostic Messaging:** Unified inbox (SMS, Email, Voice-ready) where delivery method is just metadata
- **Contextual Task Surfacing:** AI-generated tasks predicted and surfaced automatically, not manually created
- **Mobile-First Responsive:** Full functionality on any device, anywhere

### Outcome

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Documentation time | 15-20 min | 2-3 min | **85% reduction** |
| Clicks for check-in | 48 clicks | 6 clicks | **87% reduction** |
| Workflow time | 9 min | 90 sec | **90% reduction** |
| Data migration time | 20-40 hours | 15-30 min | **95% reduction** |

### Business Impact

- **TAM:** 45,000+ solo/small group mental health practices in the US
- **Differentiation:** Only Tebra offers AI-native clinical documentation + frictionless onboarding + substrate intelligence
- **Revenue:** $150-200/month per solo practitioner; $400-600/month for 3-person group
- **Unit Economics:** 80%+ gross margin with substrate AI costs amortized across users
- **Competitive Moat:** Data import removes #1 barrier to switching EHRs; substrate intelligence creates unprecedented workflow efficiency

---

## STRATEGIC POSITION

### Why This Wins the Hackathon

This project demonstrates **two distinct proof-of-concept pillars**:

#### POC 1: UX Transformation (Dynamic Canvas)
- **Metric:** 88% click reduction (48 → 6), 90% time reduction (9 min → 90 sec)
- **Innovation:** Patient-as-central-object eliminates module navigation entirely
- **Demo Impact:** Side-by-side comparison of legacy workflow vs. Dynamic Canvas

#### POC 2: AI Engineering Excellence
- **Metric:** Enterprise-grade code quality + 95% migration time reduction + substrate intelligence layer
- **Innovation:** Dual-tool AI orchestration (Antigravity + Claude Code) + AI-native data import + background task generation
- **Demo Impact:** Show real SimplePractice export → 15-minute import → Populated dashboard with AI-generated tasks

### Competitive Advantages

| Capability | Tebra MHMVP | SimplePractice | TherapyNotes | Sessions Health |
|-----------|-------------|----------------|--------------|-----------------|
| AI Clinical Documentation | ✅ Ambient recording | ❌ Manual only | ❌ Manual only | ⚠️ Templates only |
| Self-Service Data Import | ✅ 15-min wizard | ⚠️ Export only | ❌ None | ⚠️ CSV only |
| Unified Messaging | ✅ SMS+Email+Voice | ⚠️ Separate tabs | ⚠️ Email only | ⚠️ In-app only |
| Mobile-First Design | ✅ Full parity | ⚠️ Limited | ❌ Desktop-only | ⚠️ View-only |
| Patient-Centric Nav | ✅ Zero modules | ❌ 8+ modules | ❌ 10+ modules | ⚠️ 6 modules |
| **Substrate Intelligence** | **✅ Continuous AI** | **❌ None** | **❌ None** | **❌ None** |

### Beachhead Strategy

Success here enables rapid rollout to:
- Primary care (80% of codebase reusable)
- Dental (75% reusable)
- Multi-specialty groups (same substrate architecture scales)

---

## TARGET USER PROFILES

### Primary User: Dr. Sarah Chen
**Profile:** Solo clinical psychologist, 8 years practice, private practice in suburban area  
**Pain Points:**
- Documentation consumed 4-5 hours/week (30% of practice time)
- Manual transcription error-prone; compliance concerns
- Struggles with outcome measure tracking (GAD-7, PHQ-9) across 40+ active patients
- Never reviewed patient health trends or acted on clinical data
- Invoicing manual; cash flow visibility poor
- **Migration barrier:** Trapped on SimplePractice due to fear of losing 3 years of clinical history

**Success Metrics:**
- Completes documentation in 2-3 minutes/patient (down from 15-20)
- Migrates 60 patients + 300 clinical notes in 30 minutes
- Tracks outcome measures consistently
- Knows practice financial health at a glance
- No compliance violations in first year
- **Substrate AI surfaces 6-8 actionable tasks daily without manual input**

### Secondary User: Maria Rodriguez
**Profile:** Office manager at 3-provider therapy group  
**Pain Points:**
- Manages scheduling, patient communications, insurance verification for all providers
- No visibility into workflow progress (which notes are done? which insurance pending?)
- Billing specialist works part-time; handoff friction with clinical team
- **Migration barrier:** Can't coordinate 3 providers' data exports simultaneously

**Success Metrics:**
- Insurance verification completed pre-appointment 95%+ of time
- Task delegation clear and trackable
- Billing specialist gets clean data ready for processing
- Communication response time <4 hours
- Successful group practice migration in <2 hours
- **Real-time task updates from substrate eliminate manual status checks**

### Tertiary User: James Park
**Profile:** Part-time billing specialist for 3-person group  
**Pain Points:**
- Receives incomplete clinical data; must hunt for diagnoses, CPT codes
- Manual claim creation; high denial rate (20%)
- No real-time visibility into collections/aging AR

**Success Metrics:**
- Receives auto-populated clinical data from notes
- Diagnoses and CPT codes embedded; zero manual lookup needed
- Claim denial rate drops to <5%
- Collections accelerate; DSO improves
- **Substrate surfaces billing discrepancies before claim submission**

---

## ARCHITECTURE PRINCIPLES (NON-NEGOTIABLE)

### 1. Patient-as-Central-Object
ALL data organizes around the patient record. Never create feature-centric modules. Every view, every widget, every task references the patient context. This eliminates module navigation entirely and reduces cognitive load by 60%+.

**Implementation:**
- URL structure: `/patient/[id]` for all patient-specific views
- Database foreign keys: All tables reference `patient_id`
- UI components: Accept `patient` prop, never fetch independently
- Navigation: Patient search/selector always accessible

### 2. Substrate Intelligence Layer (CRITICAL DIFFERENTIATOR)

**Definition:** AI runs continuously in background, analyzing patient data, clinical workflows, and practice patterns to generate predictions, surface insights, and automate tasks contextually. The substrate is NOT a chatbot—it never waits for explicit user requests.

**Core Principles:**
- **Continuous Operation:** Substrate processes run 24/7, triggered by data changes (new appointment, completed session, incoming message)
- **Contextual Surfacing:** Predictions appear inline within existing workflows (dashboard widgets, patient tabs, pre-session prep)
- **Generative, Not Reactive:** Creates tasks, insights, and recommendations proactively
- **Confidence-Based Display:** Only surfaces high-confidence predictions (≥85%); low-confidence flagged for review
- **Human-in-the-Loop (HITL):** All generated content requires human confirmation before finalizing

**Substrate Capabilities (MVP):**

#### A. Task Generation Engine
Automatically generates clinical and administrative tasks based on:
- **Calendar triggers:** Pre-session prep tasks 30 min before appointment
- **Session completion triggers:** Post-session documentation tasks (billing, portal sharing)
- **Clinical triggers:** Outcome measure due dates, treatment plan review deadlines
- **Communication triggers:** Unanswered patient messages >24 hours old
- **Financial triggers:** Unpaid invoices >30 days old

**Task Types:**
1. **Pre-Session Prep** (triggered 30 min before appointment)
   - Review last session note
   - Check outcome measure due dates
   - Flag insurance eligibility issues
   
2. **Post-Session Documentation** (triggered when recording stops)
   - Generate SOAP note (Gemini 2.0 Flash)
   - Extract CPT code from session duration
   - Flag diagnoses for confirmation
   - Create invoice
   
3. **Clinical Maintenance** (triggered daily at 6 AM)
   - Outcome measures overdue (>45 days)
   - Treatment plans needing review (>90 days)
   - Missing clinical documentation
   
4. **Communication Follow-ups** (triggered hourly)
   - Unresponded patient messages
   - Appointment confirmation reminders
   - Post-session follow-up suggestions
   
5. **Financial Management** (triggered weekly)
   - Aging AR review (>30 days)
   - Incomplete billing submissions
   - Insurance authorization renewals

**Task Schema:**
```typescript
interface SubstrateTask {
  id: string;
  practice_id: string;
  patient_id?: string; // null for practice-level tasks
  
  // Task metadata
  title: string;
  description: string;
  task_type: 'pre_session' | 'post_session' | 'clinical_maintenance' | 'communication' | 'financial';
  priority: 'high' | 'medium' | 'low';
  
  // AI generation
  generated_by: 'substrate'; // always 'substrate' for AI-generated
  generation_trigger: string; // e.g., 'appointment_in_30_min', 'message_unanswered_24h'
  confidence_score: number; // 0-1
  
  // Actionability
  action_url?: string; // Deep link to complete task
  action_type?: 'navigate' | 'modal' | 'external';
  estimated_duration_minutes?: number;
  
  // State management
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed' | 'expired';
  assigned_to?: string; // user_id for delegation
  due_at?: Date;
  completed_at?: Date;
  dismissed_at?: Date;
  auto_dismiss_at?: Date; // Tasks auto-clear after completion or expiry
  
  created_at: Date;
  updated_at: Date;
}
```

**Task Lifecycle:**
1. **Generation:** Substrate creates task based on trigger
2. **Surfacing:** Task appears in dashboard widget, inline on patient page, or notification badge
3. **User Action:** User clicks "Start" or "Open" to complete task
4. **Completion:** Task auto-marks complete when action finalized (e.g., note signed, message sent)
5. **Auto-Dismiss:** Expired tasks (past due date) automatically clear from view

#### B. Clinical Insights Engine
Surfaces contextual clinical insights on Patient 360 view:

**Insight Types:**
1. **Trend Analysis** (outcome measures)
   - "GAD-7 trending upward (+3 points over 2 sessions) — consider treatment plan adjustment"
   - Confidence: ≥90%
   - Display: Inline alert on Outcome Measures tab
   
2. **Risk Flags** (safety concerns)
   - "Patient mentioned suicidal ideation in last session — safety assessment recommended"
   - Confidence: ≥95%
   - Display: Red banner on patient header (dismissible after review)
   
3. **Treatment Effectiveness** (progress tracking)
   - "PHQ-9 decreased by 40% since treatment start — patient responding well to CBT"
   - Confidence: ≥85%
   - Display: Green success badge on Treatment Plan tab
   
4. **Compliance Alerts** (missing documentation)
   - "Treatment plan not reviewed in 120 days — Medicare compliance requires review every 90 days"
   - Confidence: 100% (rule-based)
   - Display: Yellow warning on Treatment Plan tab

**Insight Schema:**
```typescript
interface ClinicalInsight {
  id: string;
  patient_id: string;
  
  // Insight metadata
  title: string; // Short version for badges
  description: string; // Full explanation
  insight_type: 'trend' | 'risk' | 'effectiveness' | 'compliance';
  severity: 'critical' | 'warning' | 'info' | 'success';
  
  // AI generation
  generated_by: 'substrate';
  data_sources: string[]; // e.g., ['outcome_measures', 'session_notes']
  confidence_score: number;
  
  // Actionability
  recommended_action?: string;
  action_url?: string;
  
  // Lifecycle
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  acknowledged_at?: Date;
  resolved_at?: Date;
  
  created_at: Date;
  expires_at?: Date; // Some insights expire after N days
}
```

#### C. Predictive Workflow Automation
Anticipates next steps in clinical workflows:

**Examples:**
1. **Session → Documentation:** After recording ends, substrate auto-generates SOAP note draft
2. **Documentation → Billing:** After note signed, substrate auto-creates invoice with correct CPT code
3. **Billing → Portal:** After invoice created, substrate suggests patient-safe content for portal sharing
4. **Portal → Messaging:** After portal update, substrate drafts follow-up message template

**Automation Rules:**
- All automations generate drafts, never finalize
- HITL approval required for all patient-facing actions
- Confidence thresholds: ≥95% for critical actions (billing), ≥85% for routine actions (task generation)

#### D. Real-Time Widget Updates (Supabase Realtime)

**Implementation:**
- Subscribe to Supabase Realtime channels for `substrate_tasks`, `clinical_insights`, `messages`
- Widget components refresh automatically when new data arrives
- No manual page refresh required

**Subscriptions:**
```typescript
// Dashboard widgets subscribe to task updates
const taskChannel = supabase
  .channel('substrate_tasks')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'substrate_tasks', filter: `practice_id=eq.${practiceId}` },
    (payload) => {
      // Update TasksWidget state
      handleTaskUpdate(payload.new);
    }
  )
  .subscribe();

// Patient page subscribes to insight updates
const insightChannel = supabase
  .channel('clinical_insights')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'clinical_insights', filter: `patient_id=eq.${patientId}` },
    (payload) => {
      // Update Patient 360 view
      handleInsightUpdate(payload.new);
    }
  )
  .subscribe();
```

**Real-Time Update Patterns:**
- **Optimistic UI:** Show task/insight immediately on client, confirm with server
- **Toast notifications:** Subtle toast for low-priority updates
- **Badge updates:** Real-time unread count on navigation items
- **Auto-refresh:** Widgets poll every 60 seconds as fallback if Realtime connection drops

### 3. HITL Mandate (Human-in-the-Loop)
AI can draft and orchestrate but NEVER submit, sign, or finalize without human approval. Every substrate-generated action surfaces as a "draft" or "suggestion" requiring explicit user confirmation.

**HITL Touchpoints:**
- Task completion: User must click "Start" then "Complete"
- SOAP note: User must review, edit, and click "Sign & Lock"
- Invoice: User must review and click "Send to Patient"
- Clinical insight: User must acknowledge (checkbox) high-severity alerts
- Billing code: User must confirm CPT code before invoice creation

### 4. A2UI Standard (Action-to-UI)
AI generates declarative JSON instructions, never executable code. This prevents security vulnerabilities and ensures human review of AI actions.

**Example:**
```json
{
  "action": "create_task",
  "payload": {
    "title": "Verify insurance eligibility",
    "patient_id": "uuid-123",
    "priority": "high",
    "action_url": "/patient/uuid-123/insurance"
  }
}
```

### 5. Multi-Tenant Security
PostgreSQL RLS enforces practice isolation. Every query must be tenant-scoped. No user can access data from another practice, even with direct database access.

**RLS Policy Pattern:**
```sql
CREATE POLICY practice_isolation ON table_name
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

### 6. Channel-Agnostic Messaging
Messages organized around patients, not channels. Delivery method is metadata, not separate tables. This enables adding new channels (Voice, Fax) without refactoring business logic.

**Architecture Pattern:**
```typescript
// Unified message type (delivery method is metadata)
interface Message {
  id: string;
  conversation_id: string;
  patient_id: string;
  
  // Channel-agnostic core
  content: string;
  direction: 'inbound' | 'outbound';
  
  // Channel metadata
  channel: 'sms' | 'email' | 'voice' | 'fax' | 'in_app';
  channel_metadata: { from_phone?: string; to_email?: string; /* etc */ };
}
```

### 7. Mobile-First Responsive Design
Full functionality on any device is non-negotiable. Desktop features that cannot adapt to mobile are out-of-scope. Touch targets ≥44px, forms single-column, tables convert to cards.

---

## MVP SCOPE & FEATURE SET

### ✅ Completed (Phase 1 - Day 1-2)
- [x] Core navigation (8-item structure, responsive)
- [x] Home dashboard (4 widgets: Schedule, Messages, Tasks, Financial Health)
- [x] Patient 360 view (roster, header, chart summary, tabbed interface)
- [x] Calendar page (week view, appointment detail)
- [x] Communications page (unified inbox, channel-agnostic)
- [x] Care page (session recording, SOAP note generation, visit summary)
- [x] Data import wizard (8-step flow, AI column mapping, document matching)
- [x] Outcome measures tracking (table view, trend charts)
- [x] Voice commands (Web Speech API, wake word detection)
- [x] Mobile responsive design (375px, 768px, 1280px breakpoints)
- [x] Design system compliance (Growth Teal, Vitality Coral, WidgetContainer)

### 🚧 In Progress (Phase 2 - Day 3-5: Substrate Intelligence)

#### Substrate Task Generation (PRIORITY 1)
- [ ] **Database schema:** `substrate_tasks` table with RLS policies
- [ ] **Task generation engine:** Background workers for each trigger type
  - [ ] Pre-session prep tasks (30 min before appointment)
  - [ ] Post-session documentation tasks (after recording stops)
  - [ ] Clinical maintenance tasks (daily 6 AM cron)
  - [ ] Communication follow-up tasks (hourly check)
  - [ ] Financial management tasks (weekly aging AR)
- [ ] **TasksWidget refactor:** Real-time subscription to `substrate_tasks` table
- [ ] **Task detail view:** Modal with full description, action button, dismiss option
- [ ] **Task lifecycle management:** Auto-dismiss expired tasks, mark complete on action
- [ ] **Notification badges:** Unread task count on nav items

#### Clinical Insights Engine (PRIORITY 2)
- [ ] **Database schema:** `clinical_insights` table
- [ ] **Insight generation:** Substrate workers analyzing outcome measures, session notes
  - [ ] Trend analysis (outcome measure changes)
  - [ ] Risk flags (safety keywords detected in notes)
  - [ ] Treatment effectiveness (PHQ-9/GAD-7 improvement calculation)
  - [ ] Compliance alerts (treatment plan review overdue)
- [ ] **Patient 360 UI:** Inline insight banners on relevant tabs
  - [ ] Outcome Measures tab: Trend analysis insights
  - [ ] Treatment Plan tab: Compliance alerts
  - [ ] Session Notes tab: Risk flags (dismissible)
- [ ] **Insight acknowledgment:** Checkbox to mark reviewed

#### Real-Time Updates (PRIORITY 3)
- [ ] **Supabase Realtime setup:** Channel subscriptions per page
- [ ] **Dashboard widgets:** Real-time task/message updates
- [ ] **Patient 360:** Real-time insight updates
- [ ] **Toast notifications:** Subtle alerts for new tasks/insights
- [ ] **Fallback polling:** 60-second refresh if Realtime connection drops

#### Visual Polish (ONGOING)
- [ ] **Copy refinement:** Improve microcopy across all pages
- [ ] **Layout spacing:** Consistent padding/gap using design tokens
- [ ] **Component replacements:** Replace placeholder components with real Design System components
- [ ] **Data visualization:** Enhanced charts (Recharts), better table formatting
- [ ] **Animation polish:** Smooth transitions (Framer Motion)
- [ ] **Loading states:** Skeletons for async content

#### New Pages (WIREFRAME TBD - PRIORITY 4)
- [ ] **Notifications page:** Unified notification center
  - Structure: TBD (awaiting wireframe)
  - Features: Task notifications, message alerts, system updates
  - Responsive: Mobile-first drawer, desktop sidebar
  
- [ ] **Billing page (read-only):** Invoice list, metrics, upsell
  - Invoice list: Table view (desktop), card view (mobile)
  - Metrics: Total invoices sent, payments received, aging AR summary
  - Upsell CTA: "Unlock Active Billing" (premium feature)
  
- [ ] **Marketing & Reputation page (read-only):** Review metrics, SEO, AIO tracking
  - Dashboard cards: Average rating, keywords ranked, local search impressions, AI platforms
  - Detail list: Links to Google Reviews, Healthgrades, Psychology Today, Yelp
  - Upsell CTA: "Unlock Active Reputation Management"

#### Care Page Refinements (PRIORITY 5)
- [ ] **Recording state polish:** Wave animation improvements, timer formatting
- [ ] **Note review polish:** Smoother inline editing, auto-save indicators
- [ ] **Metadata panel:** Better card layouts, spacing, typography

### ⏭️ Out-of-Scope (Phase 3+)
- ❌ Active billing/invoicing workflow (read-only only; upsell later)
- ❌ Marketing & Reputation active management (view metrics only; premium upsell)
- ❌ Multi-user collaboration workflows (assume single therapist or async)
- ❌ Video/telehealth integration (Phase 2)
- ❌ Patient self-service portal (Phase 2)
- ❌ Advanced analytics/reporting (Phase 2)
- ❌ Ambient clinical documentation during session (structured note generation post-session only for now)
- ❌ Predictive clinical alerts ("patient trending worse" AI analysis beyond trend insights)
- ❌ Integration with external registries or EHRs (Phase 2)
- ❌ Voice/Fax messaging channels (architecture ready, implementation Phase 2)

---

## DETAILED FEATURE SPECIFICATIONS

### HOME PAGE

**Layout (Responsive):**
- **Desktop (≥1280px):** 2x2 grid (Schedule + Messages top; Tasks + Financial Health bottom)
- **Tablet (768-1024px):** 2x2 grid with reduced padding
- **Mobile (<768px):** 1x4 stacked, full width

**Today's Schedule Card**
```
Component: Schedule Grid
- Header: "Today's Schedule" | "SATURDAY, FEB 1" | "39 Appointments"
- Show: First 3-4 upcoming appointments
- Per appointment:
  - Patient avatar + name
  - Appointment type (label, icon)
  - Time + room
  - Status badge (SCHEDULED, IN PROGRESS, COMPLETED, ENDED)
  - Provider name (if multi-provider)
- Action button on first incomplete appointment: "Begin Check-In"
- Link: "See all appointments" → Calendar page

Responsive:
- Desktop: 3-4 appointments visible
- Tablet: 3 appointments visible
- Mobile: 2 appointments visible, vertical stack
```

**Messages Card**
```
Component: Unified Inbox
- Header: "Messages" | "Inbox" (badge with unread count)
- Show: Most recent 5-6 messages (threaded by patient)
- Per message thread:
  - Patient avatar + name
  - Message type indicator (SMS icon, email icon, phone icon)
  - Preview text (first 50 chars)
  - Timestamp (relative: "5 min ago")
  - Unread badge (if unread)
- Action: Click to navigate to Communications page

Responsive:
- Desktop: 5-6 messages, avatar 40px
- Tablet: 4-5 messages, avatar 36px
- Mobile: 3-4 messages, avatar 32px, full-width rows
```

**Today's Tasks Card (SUBSTRATE-POWERED)**
```
Component: Task List (AI-Generated)
- Header: "Today's Tasks" | "6 TOTAL" (real-time count)
- Show: 3-4 highest priority tasks (sorted by due_at, priority)
- Per task:
  - Task icon (based on task_type)
  - Task title (e.g., "Verify insurance eligibility for today's patients")
  - Metadata subtitle (e.g., "TEBRA CLEARINGHOUSE • 14 PATIENTS SCHEDULED")
  - Confidence badge (≥95%: no badge; 85-94%: "Review" badge)
  - Action button: "Start" or "Open" (deep link to action_url)
- Real-time updates: Supabase Realtime subscription to substrate_tasks
- Auto-refresh: Tasks appear/disappear as generated/completed
- Link: "See all tasks" → Task detail view (modal)

Task Prioritization Logic:
1. High priority + due today
2. Medium priority + overdue
3. High priority + due this week
4. Medium priority + due today

Responsive:
- Desktop: 3-4 tasks with full metadata
- Tablet: 3 tasks with abbreviated metadata
- Mobile: 2-3 tasks, stacked, tap to expand
```

**Practice Financial Health Card**
```
Component: Financial Snapshot
- Header: "Practice Financial Health"
- Display:
  - Total invoices sent (this period): "$3,420"
  - Total payments received (this period): "$2,150"
  - Simple trend line (last 30 days, Recharts LineChart)
  - High-level indicator: "Healthy" | "Attention Needed" (based on collection %, DSO)
- Metadata: "Last updated today at 2:30 PM"

Responsive:
- Desktop: Full chart (300px width)
- Tablet: Compact chart (250px width)
- Mobile: Simplified chart (full width, 200px height)
```

---

### PATIENT PAGE (with Clinical Insights)

**Overall Layout:**
- **Desktop (≥1024px):** Left sidebar (260px fixed) + Main content (flex, 1)
- **Tablet (768-1024px):** Left sidebar (200px collapsible) + Main content
- **Mobile (<768px):** Drawer sidebar (swipe from left, full-screen) + Main content

**Patient List (Left Sidebar)**
```
Component: Searchable Patient Roster
- Header: "Patients" with search input
- Search: Real-time filter by name, date of birth, or ID
- List view:
  - Per patient: Avatar + Name + Last visit date
  - Highlight current patient
  - Scroll: Full height of remaining space
  
Responsive:
- Desktop: Fixed sidebar, always visible
- Tablet: Collapsible sidebar (icon toggle)
- Mobile: Drawer (swipe from left edge, overlay)
  - Bottom nav includes "Patients" icon to open drawer
  - Drawer covers full screen with semi-transparent backdrop
```

**Patient Header Section**
```
Component: Patient Context
- Layout: Flex, space-between
- Left side:
  - Avatar (60px desktop, 48px mobile)
  - Patient name (h2, 24px desktop, 20px mobile)
  - Session type label (14px, gray): "Individual Therapy"
  - Pronouns, DOB, insurance (optional, 12px gray, hide on mobile if space tight)
- Right side:
  - "Next Appointment: Thursday, Jan 23 at 2:00 PM"
  - Or "No upcoming appointments" (with CTA to schedule)
- Bottom (optional): Mini timeline showing visit cadence

Responsive:
- Desktop: Horizontal layout
- Tablet: Horizontal with reduced avatar size
- Mobile: Vertical stack, avatar centered, text centered
```

**Clinical Insights Section (NEW - SUBSTRATE-POWERED)**
```
Component: Inline Insight Banners
- Display location: Between patient header and tabbed interface
- Per insight:
  - Severity-based color:
    - Critical: var(--remedy) red background
    - Warning: var(--amino) yellow background
    - Info: var(--growth-2) teal background
    - Success: var(--asana) green background
  - Icon (left): Based on insight_type
  - Content (center):
    - Title (bold, 16px)
    - Description (14px, wrapped)
    - Recommended action (if present, 12px, link)
  - Actions (right):
    - "Acknowledge" button (for critical/warning)
    - "Dismiss" icon (for info/success)
- Animation: Fade in (Framer Motion) when new insight arrives
- Real-time updates: Supabase Realtime subscription to clinical_insights

Example Insights:
1. TREND (warning):
   "GAD-7 trending upward (+3 points over 2 sessions)"
   "Consider treatment plan adjustment or medication consultation"
   
2. RISK (critical):
   "Patient mentioned suicidal ideation in last session"
   "Safety assessment recommended before next appointment"
   
3. EFFECTIVENESS (success):
   "PHQ-9 decreased by 40% since treatment start"
   "Patient responding well to CBT approach"
   
4. COMPLIANCE (warning):
   "Treatment plan not reviewed in 120 days"
   "Medicare requires review every 90 days for compliance"

Responsive:
- Desktop: Full width, horizontal layout
- Tablet: Full width, reduced padding
- Mobile: Stacked vertically, icon above text
```

**Chart Summary Section**
```
Component: Clinical Overview
- Title: "Chart Summary"
- Content block:
  - Chief Complaint / Current Status (2-3 sentences from last note)
  - Current Treatment Plan (1 sentence)
  - Active Diagnoses (with codes): "GAD F41.1, Panic F41.0"
  - Last visit: "Jan 10, 2025" with brief summary
- Button: "Show Full Chart History" (toggles expanded view)
  - Expanded: Full treatment timeline, all notes, all diagnoses
  - Collapsed: Dismissed to background

Responsive:
- Desktop: Full width with padding
- Tablet: Slightly reduced padding
- Mobile: Full width, compact padding, font-size reduced
```

**Tabbed Interface**
```
Component: Tab Navigation + Content
- Tabs (left-aligned, scrollable on mobile):
  1. Session Notes (default active)
  2. Treatment Plan
  3. Outcome Measures
  4. Communications

Responsive:
- Desktop: Horizontal tabs, full labels
- Tablet: Horizontal tabs, abbreviated labels
- Mobile: Horizontal scrollable tabs with icons + short labels

TAB 1: SESSION NOTES
- Show: List of all session notes, reverse chronological
- Per note: Date, duration, provider, brief summary
- Click row to expand full note
- Action: "Add Note" button (launches Care page for new session)
- Substrate intelligence: Flags incomplete notes (yellow badge)

Responsive:
- Desktop: Table view with all columns
- Tablet: Table with fewer columns
- Mobile: Card view (vertical stack)

TAB 2: TREATMENT PLAN
- Current treatment plan (text block)
- Goals (bulleted list)
- Modalities used (CBT, ACT, psychodynamic, etc.)
- Start date, last review date
- Alert banner if review is due: "Treatment plan review due Jan 24"
- Action: "Edit Plan" (modal or dedicated page)
- **NEW: Substrate insight appears here if compliance alert triggered**

Responsive:
- Desktop: Two-column layout (plan left, goals/modalities right)
- Tablet: Single column
- Mobile: Single column, compact spacing

TAB 3: OUTCOME MEASURES
- Trend chart (line graph, last 6 months, Recharts)
- GAD-7 scores (plot points with dates)
- PHQ-9 scores (second series on chart)
- Table below chart:
  | Measure | Score | Date | Trend |
  | GAD-7 | 14 | Jan 10 | ↑ Slight increase |
  | PHQ-9 | 8 | Jan 10 | ↓ Slight decrease |
- Alert if reassessment due: "GAD-7 due for readministration (last: 30 days ago)"
- **NEW: Substrate trend insights appear above chart**

Responsive:
- Desktop: Chart 400px height
- Tablet: Chart 300px height
- Mobile: Chart 200px height, table converts to cards

TAB 4: COMMUNICATIONS
- Threaded message view per patient
- Most recent messages first
- Message type badges (SMS, Email, Voice)
- Timestamps, read status
- Reply interface (inline or modal)

Responsive:
- Desktop: Split view (thread list left, detail right)
- Tablet: Single view, click to expand thread
- Mobile: Full-screen thread view, swipe back to list
```

---

### CARE PAGE (Session Workflow)

**Active Recording State**

```
Component: Session in Progress
- Minimal UI; maximum focus on therapist-patient interaction
- Center of screen:
  - Red pulsing "RECORDING" indicator with dot
  - Session duration timer in large monospace font (00:00)
  - Wave animation showing audio capture (Framer Motion)
  - One instruction box: "Say 'that ends our session' to stop recording"
  - Subtitle: "Focus on the conversation. We're capturing everything."
- Background: Soft blue-gray (var(--backbone-1)), no distractions
- Patient context: Minimal header (patient name, avatar, start time)

Responsive:
- Desktop: Centered content, max-width 600px
- Tablet: Centered, full-width with padding
- Mobile: Full-screen, centered vertically
  - Timer extra large (48px font-size)
  - Wave animation full-width
```

**Note Review State (Post-Recording)**

Layout: Two-column (desktop/tablet); single column (mobile)

**Left Column (Editable Note)**
```
Component: Substrate-Generated Clinical Note
- Header card:
  - Title: "Session Note - [Patient Name]"
  - Meta: "Session date: [Date] • Duration: [Minutes]"
  - Status badge: "✓ Substrate-generated from ambient recording • Click to edit any section"

- Content card (white, padded):
  - Sections (in order):
    1. Chief Complaint & Presenting Issues
    2. Progress & Treatment Response
    3. Session Focus
    4. Plan & Recommendations
    5. Clinical Codes
  
  - Per section:
    - Title (uppercase, small, blue - var(--growth-3))
    - Content (contenteditable div)
    - On hover: Subtle background highlight (var(--backbone-1))
    - On focus: Blue border, glow effect
    - Cursor: Text cursor (system default)
    - Save: Auto-save on blur (no explicit save button)

- Inline code badges:
  - Diagnosis codes: <span class="code-badge">F41.1</span>
  - CPT codes: <span class="code-badge">90836</span>
  - Non-editable; substrate-inserted

Responsive:
- Desktop: Full width (flex-1 in two-column layout)
- Tablet: Full width (stacked above metadata panel)
- Mobile: Full width, reduced padding
```

**Right Column (Metadata Panel)**
```
Component: Session Metadata & Actions
- Stack of 5 cards (gap: 20px, var(--micro))

CARD 1: Outcome Measures
- Title: "Outcome Measures"
- List:
  | GAD-7 | 14 |
  | PHQ-9 | 8 |
- Substrate captured these during session (auto)

CARD 2: Diagnoses
- Title: "Diagnoses"
- List: 
  - GAD F41.1
  - Perfectionism Z73.5
- Each with code badge (var(--synapse-5) background)

CARD 3: CPT Code
- Title: "CPT Code"
- Display: 90836 (Individual Psychotherapy, 50-59 min)
- Amount: $150.00
- Substrate auto-inferred from session duration

CARD 4: Patient Portal Preview
- Title: "What Goes to Patient Portal?"
- Two boxes:
  - SHARED (green - var(--asana)): Homework, next appointment
  - PRIVATE (red - var(--plasma)): Clinical details, diagnosis
- Checkbox: "Share with patient" (HITL)

CARD 5: Invoice Generated
- Title: "Invoice Ready"
- Display: CPT 90836 | $150.00
- Buttons: "View Invoice" | "Print Invoice"

Responsive:
- Desktop: Fixed width (320px) right column
- Tablet: Full width below note (stacked)
- Mobile: Full width, cards stacked vertically
```

**Visit Summary Page**
```
Component: Session Recap
- Header: "Session Complete - [Patient Name]"
- Section 1: Overview
  - Date, duration, CPT code, amount
- Section 2: Key Actions for Patient
  - Homework assignments
  - Referrals
  - Follow-up instructions
- Section 3: Billing Breakdown
  - CPT 90836 | $150.00
  - Invoice view/print buttons
- Section 4: Portal Sharing
  - Clear "SHARED" vs. "PRIVATE" distinction
  - Confirmation: "Content shared with patient portal"
- CTA: "Return to Dashboard" | "View Patient 360"

Responsive:
- Desktop: Centered, max-width 900px
- Tablet: Full-width with padding
- Mobile: Full-width, sections stacked
```

---

### COMMUNICATIONS PAGE

**Layout:** Single column, full-width

```
Component: Unified Inbox
- Header:
  - Title: "Messages"
  - Tab filter: "All" | "SMS" | "Email" | "Voice"
  - Search input (by patient name, message content)
  - Refresh indicator (last updated: 2 min ago)

- Message thread list:
  - Per thread:
    - Patient avatar (40px desktop, 32px mobile)
    - Patient name (16px, bold)
    - Message type indicator (SMS icon, email icon, phone icon - hugeicons-react)
    - Preview text (first 60 chars, gray - var(--synapse-4))
    - Timestamp (relative: "5 min ago" or date)
    - Unread badge (red dot if unread - var(--remedy))
    - On click: Expands thread view

- Thread expanded view:
  - Messages in chronological order (oldest first)
  - Per message:
    - Timestamp (small, gray)
    - Message type badge
    - Content (text)
    - Sender indicator (patient vs. therapist)
      - Patient messages: Left-aligned, light gray background
      - Therapist messages: Right-aligned, teal background (var(--growth-2))
  - Reply interface at bottom:
    - Text input with placeholder ("Reply to [Patient Name]...")
    - Send button (disabled until text entered - var(--vitality-1))
    - **NEW: Substrate-suggested response templates (Phase 3)**

Responsive:
- Desktop: Split view (thread list left 320px, detail right flex-1)
- Tablet: Single view, click thread to expand detail
- Mobile: Full-screen list, tap to full-screen thread
  - Thread view has "Back" button (top-left)
  - Reply input bottom-anchored (fixed position)
```

---

### CALENDAR PAGE

**Layout:** Week view (default); day/month view toggle

```
Component: Weekly Calendar
- Header:
  - Title: "Calendar"
  - Date range display: "Feb 1-7, 2026"
  - Navigation: < | > (prev/next week)
  - Today button
  - View toggle: Week | Day | Month

- Grid:
  - Rows: Time slots (8:00 AM - 6:00 PM, 15-min intervals)
  - Columns: Mon | Tue | Wed | Thu | Fri | Sat | Sun
  - Per appointment block:
    - Patient name (bold)
    - Appointment type label (color-coded):
      - Intake: var(--growth-3) background
      - Follow-up: var(--vigor) background
      - Therapy: var(--growth-2) background
    - Time + duration
    - Room/location (small)
    - Status badge: SCHEDULED | IN PROGRESS | COMPLETED | NO-SHOW
    - On click: Expands appointment detail card

- Appointment detail card (hover or click - popover):
  - Patient name
  - Appointment type
  - Time + duration
  - Room/location
  - Provider (if applicable)
  - Last visit: [Date]
  - Quick actions: "Begin Check-In" | "Mark as Complete" | "Reschedule"
  - **NEW: Pre-session prep task indicator (from substrate)**

- Filter sidebar (left, collapsible on mobile):
  - Filter by appointment type (checkboxes)
  - Filter by provider (if multi-provider)
  - Filter by room/location

Responsive:
- Desktop (≥1280px): Week view, 7-day grid
- Tablet (768-1024px): Week view, scrollable grid
- Mobile (<768px): Day view default
  - Horizontal swipe between days
  - No grid, vertical list of appointments
  - Tap appointment for detail sheet (bottom drawer)
```

---

### OUTCOME MEASURES TRACKING

**Layout:** Table + trend visualization

```
Component: Outcome Measures Dashboard
- Header:
  - Title: "Outcome Measures"
  - Filter dropdown: "All Measures" | "GAD-7" | "PHQ-9" | [custom measures]
  - View toggle: Table | Trend Chart

- Table view:
  - Columns: Patient Name | GAD-7 | PHQ-9 | Last Admin Date | Trend | Status
  - Rows: Per patient (sortable by column)
  - Status badges:
    - ✓ Current (var(--vigor)): Administered <30 days ago
    - ⚠ Due (var(--amino)): 30+ days since administration
    - ✗ Overdue (var(--remedy)): 45+ days since administration
  - Per row action: Click to view patient's full measure history

- Trend view (chart - Recharts):
  - X-axis: Date (last 6 months)
  - Y-axis: Score (0-21 for GAD-7, 0-27 for PHQ-9)
  - Per patient: Line connecting score points
  - On hover over point: Show date, score, session context
  - **NEW: Substrate trend insights overlay on chart**

- Export button:
  - CSV download of all visible data
  - Format: Patient | Measure | Score | Date

Responsive:
- Desktop: Full table with all columns
- Tablet: Table with fewer columns (hide "Trend" column)
- Mobile: Card view instead of table
  - Per patient card:
    - Name (bold)
    - GAD-7: 14 (⚠ Due)
    - PHQ-9: 8 (✓ Current)
    - Tap to expand full history
```

---

### NOTIFICATIONS PAGE (WIREFRAME TBD)

**Placeholder Specification:**
```
Component: Unified Notification Center
- Purpose: Single location for all substrate-generated notifications, task alerts, and system updates
- Status: Wireframe pending (ETA: 2 hours)

Anticipated Features:
- Notification list (reverse chronological)
- Filter by type: Tasks | Insights | Messages | System
- Mark as read/unread
- Clear all option
- Real-time updates via Supabase Realtime

Responsive:
- Desktop: Right sidebar (320px) or full page
- Tablet: Full page
- Mobile: Full-screen drawer from right
```

---

### BILLING PAGE (READ-ONLY MVP)

**Layout:** Dashboard + list view

```
Component: Billing Overview
- Header: "Billing"
- Subheader: "View your invoices and collections. Premium features unlock active billing workflows."
  - CTA: "Unlock Active Billing" (var(--vitality-1) button)

- Metrics cards (2x2 grid desktop; 1x4 mobile):

CARD 1: Invoices Sent
- Metric: Total invoices sent (this month): "$12,450"
- Secondary: Count (47 invoices)
- Trend: "↑ 12% vs. last month"

CARD 2: Payments Received
- Metric: Total payments (this month): "$9,200"
- Secondary: Collection rate (74%)
- Trend: "↓ 5% vs. last month"

CARD 3: Outstanding Balance
- Metric: Total aging AR: "$8,350"
- Secondary: Invoices >30 days (14)
- Indicator: "Attention Needed" (var(--amino))

CARD 4: Average DSO
- Metric: Days Sales Outstanding: 28 days
- Secondary: Target: <30 days
- Indicator: "Good" (var(--asana))

- Invoice list table:
  - Columns: Patient | Date | CPT Code | Amount | Status | Actions
  - Rows: Per invoice (paginated, 20 per page)
  - Status badges: PAID | PENDING | OVERDUE
  - Actions: "View Invoice" (opens PDF preview)

- Upsell CTA: "Unlock Active Billing"
  - Button: Premium badge
  - Description: "Auto-submit claims, track denials, optimize reimbursements"
  - Pricing: [TBD]

Responsive:
- Desktop: 2x2 metrics grid, full table
- Tablet: 2x2 metrics grid, scrollable table
- Mobile: 1x4 stacked metrics, card view for invoices
```

---

### MARKETING & REPUTATION (READ-ONLY MVP)

**Layout:** Dashboard cards

```
Component: Reputation Overview
- Header: "Marketing & Reputation"
- Subheader: "View your current reputation metrics. Premium features unlock active management." 
  - CTA to upsell (var(--vitality-1) button)

- Card grid (2x2 on desktop; 1x4 on mobile):

CARD 1: Review Metrics
- Metric: Average rating (stars, number - 4.8)
- Secondary: Total reviews count (47)
- Trend: "↑ 3 new reviews this month"

CARD 2: SEO Visibility
- Metric: Keywords ranked (count - 23)
- Secondary: Average search position (4.2)
- Indicator: "Good" | "Fair" | "Poor"

CARD 3: Geographic Performance
- Metric: Local search impressions (1,247)
- Secondary: Map appearance rate (82%)
- Indicator: Appears in local search (yes/no)

CARD 4: AI Optimization (AIOs)
- Metric: Number of AI platforms tracking practice (4)
- Secondary: Perplexity, ChatGPT, Google, Claude (icons)
- Indicator: "Visible to AI" (yes/no)

- Detail list below cards:
  - Where to find your practice:
    - Google Reviews (link)
    - Healthgrades (link)
    - Psychology Today (link)
    - Yelp (link)
  - Links open in new tab

- Upsell CTA: "Unlock Active Reputation Management"
  - Button: Premium badge (var(--vitality-1))
  - Description: "Monitor reviews in real-time, get response suggestions, track SEO improvements"
  - Pricing: [TBD]

Responsive:
- Desktop: 2x2 grid
- Tablet: 2x2 grid, reduced card size
- Mobile: Stacked vertically (1x4)
```

---

## TECHNICAL ARCHITECTURE

### Technology Stack

**Frontend:**
- React 18+ with Next.js 14+ (App Router)
- TypeScript strict mode (mandatory)
- Tailwind CSS for styling (responsive utilities)
- shadcn/ui component library (customized with Tebra Design System)
- Framer Motion for animations (use DesignSystem.animation constants)
- Recharts for data visualization
- hugeicons-react for icon library
- Responsive design: Mobile-first approach, industry standard breakpoints

**State Management:**
- React Server Components where possible
- Zustand for client state (lightweight, minimal boilerplate)
- Server state: React Query (TanStack Query) for data fetching/caching
- **NEW: Supabase Realtime for real-time widget/insight updates**

**APIs:**
- RESTful API endpoints (v1) for MVP
- Future: GraphQL layer for Phase 2 (efficient data fetching at scale)

**Data Persistence:**
- PostgreSQL via Supabase (patient records, session notes, outcome measures, messages, import batches, **substrate_tasks, clinical_insights**)
- Redis (session cache, real-time updates - Supabase Realtime)
- Supabase Storage (audio files, PDF documents, temp uploads)

**AI Substrate Layer:**
- **Deepgram:** Speech-to-text for session recording
- **Gemini 2.0 Flash:** SOAP note generation, column mapping, document metadata extraction, patient matching, **task generation, clinical insight analysis**
- **OpenAI TTS-1:** Voice response synthesis
- **Web Speech API:** Wake word detection ("Hey Tebra")
- **NEW: Background workers:** Substrate task generation, insight analysis (cron jobs + event triggers)
- Async job queue for heavy lifting (note processing, report generation, import batches, task generation)
- Substrate runs continuously, surfaces predictions via webhooks + Realtime

**Authentication & Security:**
- Supabase Auth (email/password, OAuth)
- HIPAA-compliant authorization
- Role-based access control (therapist ≠ office manager)
- End-to-end encryption for audio files
- PHI audit logging
- PostgreSQL RLS (Row-Level Security) for multi-tenant isolation

**Deployment:**
- Vercel (Next.js frontend)
- Supabase (hosted PostgreSQL + Auth + Storage + Realtime)
- Docker containers for custom background workers
- CI/CD pipeline (GitHub Actions)
- Staging and production environments

### Database Schema (Key Tables)

**Patients Table:**
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  
  -- Demographics
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  pronouns TEXT,
  
  -- Contact
  email TEXT,
  phone_mobile TEXT,
  phone_home TEXT,
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  
  -- Insurance
  insurance_name TEXT,
  insurance_member_id TEXT,
  
  -- Clinical
  primary_diagnosis_code TEXT,
  notes TEXT,
  
  -- Metadata
  import_batch_id UUID REFERENCES import_batches(id),
  source_system TEXT, -- 'simplepractice', 'therapynotes', 'manual'
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Practice isolation policy
CREATE POLICY practice_isolation ON patients
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

**Substrate Tasks Table (NEW):**
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
  generation_trigger TEXT, -- e.g., 'appointment_in_30_min', 'message_unanswered_24h'
  confidence_score DECIMAL(3, 2), -- 0.00-1.00
  
  -- Actionability
  action_url TEXT, -- Deep link to complete task
  action_type TEXT, -- 'navigate' | 'modal' | 'external'
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

-- Practice isolation policy
CREATE POLICY practice_isolation ON substrate_tasks
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Indexes for performance
CREATE INDEX idx_substrate_tasks_practice ON substrate_tasks(practice_id);
CREATE INDEX idx_substrate_tasks_patient ON substrate_tasks(patient_id);
CREATE INDEX idx_substrate_tasks_status ON substrate_tasks(status);
CREATE INDEX idx_substrate_tasks_due ON substrate_tasks(due_at);
CREATE INDEX idx_substrate_tasks_created ON substrate_tasks(created_at DESC);

-- Auto-dismiss expired tasks (Postgres function)
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

**Clinical Insights Table (NEW):**
```sql
CREATE TABLE clinical_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  
  -- Insight metadata
  title TEXT NOT NULL, -- Short version for badges
  description TEXT NOT NULL, -- Full explanation
  insight_type TEXT NOT NULL, -- 'trend' | 'risk' | 'effectiveness' | 'compliance'
  severity TEXT NOT NULL, -- 'critical' | 'warning' | 'info' | 'success'
  
  -- AI generation
  generated_by TEXT DEFAULT 'substrate',
  data_sources TEXT[], -- e.g., ['outcome_measures', 'session_notes']
  confidence_score DECIMAL(3, 2), -- 0.00-1.00
  
  -- Actionability
  recommended_action TEXT,
  action_url TEXT,
  
  -- Lifecycle
  status TEXT DEFAULT 'active', -- 'active' | 'acknowledged' | 'resolved' | 'dismissed'
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Some insights expire after N days
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id),
  CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Enable RLS
ALTER TABLE clinical_insights ENABLE ROW LEVEL SECURITY;

-- Practice isolation policy
CREATE POLICY practice_isolation ON clinical_insights
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Indexes for performance
CREATE INDEX idx_clinical_insights_practice ON clinical_insights(practice_id);
CREATE INDEX idx_clinical_insights_patient ON clinical_insights(patient_id);
CREATE INDEX idx_clinical_insights_status ON clinical_insights(status);
CREATE INDEX idx_clinical_insights_severity ON clinical_insights(severity);
CREATE INDEX idx_clinical_insights_created ON clinical_insights(created_at DESC);
```

**Conversations Table (Unified Messaging):**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  
  -- Conversation metadata
  subject TEXT, -- For email threads
  status TEXT DEFAULT 'active', -- 'active' | 'archived'
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON conversations
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

**Messages Table (Channel-Agnostic):**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  
  -- Core content
  content TEXT NOT NULL,
  direction TEXT NOT NULL, -- 'inbound' | 'outbound'
  sender_type TEXT NOT NULL, -- 'patient' | 'therapist' | 'system'
  
  -- Channel (metadata, not separate tables)
  channel TEXT NOT NULL, -- 'sms' | 'email' | 'voice' | 'fax' | 'in_app'
  channel_metadata JSONB, -- { from_phone, to_phone, subject, recording_url, etc. }
  
  -- State
  status TEXT DEFAULT 'pending', -- 'pending' | 'sent' | 'delivered' | 'read' | 'failed'
  read_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  failed_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON messages
  USING (practice_id = current_setting('app.current_practice_id')::UUID);

-- Index for performance
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_patient ON messages(patient_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

**Import Batches Table (Data Import Tracking):**
```sql
CREATE TABLE import_batches (
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
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON import_batches
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

**Patient Documents Table:**
```sql
CREATE TABLE patient_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  
  -- Document metadata
  document_type TEXT NOT NULL, -- 'progress_note' | 'treatment_plan' | 'intake' | etc.
  title TEXT NOT NULL,
  date_of_service DATE,
  
  -- Storage
  storage_path TEXT NOT NULL, -- Supabase Storage path
  file_size_bytes INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  
  -- Import tracking
  import_batch_id UUID REFERENCES import_batches(id),
  source_system TEXT,
  source_filename TEXT,
  
  -- AI extraction (optional metadata)
  ai_extracted_data JSONB, -- { provider, codes, summary }
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON patient_documents
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

### Real-Time Subscription Patterns (NEW)

**Client-Side Implementation:**
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
          setTasks(prev => [...prev, payload.new as SubstrateTask]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks(prev => prev.map(t => 
            t.id === payload.new.id ? payload.new as SubstrateTask : t
          ));
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

// lib/realtime/useClinicalInsights.ts
export function useClinicalInsights(patientId: string) {
  const [insights, setInsights] = useState<ClinicalInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Similar pattern to useSubstrateTasks
    // Subscribe to clinical_insights table
    // Filter by patient_id
    // Handle INSERT/UPDATE/DELETE events
  }, [patientId]);

  return { insights, loading };
}
```

**Widget Component Implementation:**
```typescript
// components/widgets/tasks-widget.tsx
import { useSubstrateTasks } from '@/lib/realtime/useSubstrateTasks';
import { WidgetContainer } from '@/components/ui/widget-container';
import { motion } from 'framer-motion';
import { DesignSystem } from '@/lib/design-system';

export function TasksWidget() {
  const { tasks, loading } = useSubstrateTasks(practiceId);
  
  // Show top 3-4 tasks
  const displayTasks = tasks.slice(0, 4);

  return (
    <WidgetContainer 
      title="Today's Tasks" 
      metadata={`${tasks.length} TOTAL`}
      variant="default"
    >
      {loading ? (
        <TasksSkeleton />
      ) : displayTasks.length === 0 ? (
        <EmptyState message="No tasks for today" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DesignSystem.animation.duration }}
        >
          {displayTasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </motion.div>
      )}
    </WidgetContainer>
  );
}
```

### Substrate Worker Architecture (NEW)

**Background Job Queue:**
```typescript
// lib/substrate/workers/task-generator.ts
import { generateTasks } from './generators';
import { supabase } from '@/lib/supabase';

// Cron job: Daily at 6 AM
export async function generateDailyMaintenanceTasks() {
  const practices = await getAllActivePractices();
  
  for (const practice of practices) {
    const tasks = await generateTasks({
      practice_id: practice.id,
      trigger: 'daily_maintenance',
      task_types: ['clinical_maintenance', 'financial']
    });
    
    // Insert into substrate_tasks table
    await supabase.from('substrate_tasks').insert(tasks);
  }
}

// Event trigger: 30 min before appointment
export async function generatePreSessionTasks(appointmentId: string) {
  const appointment = await getAppointment(appointmentId);
  
  const tasks = await generateTasks({
    practice_id: appointment.practice_id,
    patient_id: appointment.patient_id,
    trigger: 'appointment_in_30_min',
    task_types: ['pre_session']
  });
  
  await supabase.from('substrate_tasks').insert(tasks);
}

// Event trigger: Session recording stopped
export async function generatePostSessionTasks(sessionId: string) {
  const session = await getSession(sessionId);
  
  const tasks = await generateTasks({
    practice_id: session.practice_id,
    patient_id: session.patient_id,
    trigger: 'session_completed',
    task_types: ['post_session']
  });
  
  await supabase.from('substrate_tasks').insert(tasks);
}

// lib/substrate/workers/insight-analyzer.ts
export async function analyzeClinicalInsights(patientId: string) {
  const patient = await getPatientWithHistory(patientId);
  
  // Trend analysis
  const trendInsights = await analyzeTrends(patient.outcome_measures);
  
  // Risk detection
  const riskInsights = await detectRisks(patient.session_notes);
  
  // Compliance checks
  const complianceInsights = await checkCompliance(patient.treatment_plan);
  
  const allInsights = [...trendInsights, ...riskInsights, ...complianceInsights];
  
  // Insert high-confidence insights (≥85%)
  const highConfidence = allInsights.filter(i => i.confidence_score >= 0.85);
  await supabase.from('clinical_insights').insert(highConfidence);
}
```

---

## HACKATHON DEMO STRATEGY

### Demo Flow (14 minutes total)

**Part 1: UX Transformation (7 minutes)**
1. **Legacy Workflow Video** (2 min):
   - Show SimplePractice: 48 clicks, 9 minutes for check-in workflow
   - Highlight module navigation, context switching

2. **Dynamic Canvas Workflow** (3 min):
   - Open MHMVP: Empty state
   - Voice command: "Tebra, show me Tim Anders"
   - Patient 360 loads: 6 clicks, 90 seconds total
   - **NEW: Substrate tasks appear automatically in dashboard**

3. **AI Documentation** (2 min):
   - Start session recording
   - "That ends our session" → SOAP note generated
   - Review, sign, lock (<60 seconds total)

**Part 2: AI Engineering Excellence (7 minutes)**
1. **Data Import Demo** (4 min):
   - Show SimplePractice export ZIP (58 patients, 150 notes)
   - Upload to MHMVP import wizard
   - Gemini column mapping with confidence scores
   - Document auto-matching to patients
   - HITL confirmation
   - Commit import (15 minutes total)

2. **Populated Dashboard** (2 min):
   - Show dashboard with real data
   - **NEW: Substrate tasks auto-generated (6-8 tasks visible)**
   - **NEW: Clinical insights on Patient 360 view**
   - Real-time widget updates (demonstrate)

3. **Code Quality Walkthrough** (1 min):
   - Show CLAUDE.md, enterprise-grade patterns
   - RLS policies, TypeScript strict mode
   - Multi-agent orchestration architecture

### Success Metrics Demonstrated:
| Metric | Target | Demo Validation |
|--------|--------|----------------|
| Click reduction | 87% | Side-by-side video |
| Time reduction | 90% | Side-by-side video |
| Import time reduction | 95% | Live import demo |
| Code quality | Enterprise-grade | Code walkthrough |
| **Substrate intelligence** | **6-8 tasks auto-generated** | **Live dashboard** |

### Judging Criteria Alignment:
1. **Innovation:** Substrate intelligence layer (continuous AI, not chatbot)
2. **Business Impact:** 95% migration time reduction removes #1 EHR switching barrier
3. **Technical Excellence:** Enterprise-grade code, multi-agent orchestration, HIPAA compliance
4. **UX Transformation:** Patient-as-central-object eliminates module navigation
5. **Scalability:** Architecture ready for primary care, dental, multi-specialty

---

## APPENDIX

### A. Outcome Measures Supported (MVP)

**Mental Health Practice:**
- PHQ-9 (Patient Health Questionnaire) → Depression screening
- GAD-7 (Generalized Anxiety Disorder) → Anxiety screening
- PCL-5 (PTSD Checklist) → Trauma assessment
- AUDIT-C (Alcohol Use Disorders) → Substance use screening

**Future (Phase 2+):**
- PANSS (Positive and Negative Syndrome Scale) → Psychosis
- Y-BOCS (Yale-Brown Obsessive Compulsive Scale) → OCD
- Social Function Measure (SFM) → Disability assessment

### B. Diagnosis Codes Supported (MVP)

**ICD-10 Codes (Anxiety/Mood Disorders):**
- F41.1 (Generalized Anxiety Disorder)
- F41.0 (Panic Disorder)
- F32.9 (Major Depressive Disorder, single episode)
- F33.9 (Major Depressive Disorder, recurrent)
- F43.10 (Post-Traumatic Stress Disorder)

**Future:** Full ICD-10 library for Phase 2+

### C. CPT Codes Supported (MVP)

**Psychotherapy:**
- 90834 (30 min)
- 90837 (45 min)
- 90836 (50-59 min) ← Primary for MVP
- 90838 (60-75 min)

**Add-ons:**
- 90833 (additional 30 min, same day)

**Future:** Evaluation, medication management, group therapy codes in Phase 2+

### D. Sample Substrate Prompt (Task Generation)

```
You are a clinical task generation AI for a mental health practice.

Input:
- Trigger: appointment_in_30_min
- Patient: Sarah Johnson (GAD-7: 14, PHQ-9: 8, last session 21 days ago)
- Appointment: Today at 2:00 PM, Individual Therapy (45 min)
- Last session note: "Patient showed progress with CBT techniques. Continue exposure hierarchy."

Output:
Generate 2-3 high-priority pre-session prep tasks.

Rules:
- Task titles: Actionable, specific (e.g., "Review exposure hierarchy progress")
- Confidence: Only return tasks with ≥85% confidence
- Priority: High for clinical safety, Medium for routine prep
- Estimated duration: 2-5 minutes per task
- Action URL: Deep link to relevant page (e.g., /patient/[id]/notes)

Return JSON array:
[
  {
    "title": "Review last session note",
    "description": "Sarah made progress with CBT exposure hierarchy. Prepare to discuss next steps.",
    "task_type": "pre_session",
    "priority": "medium",
    "confidence_score": 0.95,
    "action_url": "/patient/uuid-123/notes",
    "estimated_duration_minutes": 3
  },
  {
    "title": "Check GAD-7 trend",
    "description": "GAD-7 score was 14 last session. Review trend to assess progress.",
    "task_type": "pre_session",
    "priority": "high",
    "confidence_score": 0.92,
    "action_url": "/patient/uuid-123/outcome-measures",
    "estimated_duration_minutes": 2
  }
]
```

### E. Sample Substrate Prompt (Clinical Insight)

```
You are a clinical insight AI for a mental health practice.

Input:
- Patient: Michael Chen
- Outcome measures (last 3 sessions):
  - GAD-7: 18 → 15 → 12
  - PHQ-9: 22 → 19 → 16
- Treatment plan: CBT for anxiety/depression, started 90 days ago
- Session frequency: Weekly

Output:
Generate 1-2 clinical insights based on trend analysis.

Rules:
- Insight types: trend | risk | effectiveness | compliance
- Severity: critical | warning | info | success
- Confidence: Only return insights with ≥85% confidence
- Recommended action: Specific, actionable guidance

Return JSON array:
[
  {
    "title": "Significant symptom improvement",
    "description": "GAD-7 decreased by 33% and PHQ-9 decreased by 27% over 3 sessions. Patient is responding well to CBT approach.",
    "insight_type": "effectiveness",
    "severity": "success",
    "confidence_score": 0.96,
    "recommended_action": "Continue current treatment approach. Consider discussing maintenance phase.",
    "data_sources": ["outcome_measures", "treatment_plan"]
  }
]
```

### F. Responsive Design Reference

**Breakpoints:**
| Breakpoint | Tailwind | Min Width | Target |
|-----------|----------|-----------|--------|
| Mobile (default) | (none) | 0px | Phones portrait |
| sm | sm: | 640px | Phones landscape |
| md | md: | 768px | Tablets portrait |
| lg | lg: | 1024px | Tablets landscape |
| xl | xl: | 1280px | Laptops |
| 2xl | 2xl: | 1536px | Desktops |

**Testing Requirements:**
- ✅ 375px (iPhone SE)
- ✅ 768px (iPad Mini)
- ✅ 1280px (Laptops)

**Component Guidelines:**
- Widgets: Stack vertically on mobile, grid on tablet/desktop
- Navigation: Bottom bar on mobile, left sidebar on desktop
- Tables: Convert to cards on mobile OR horizontal scroll
- Modals: Full-screen on mobile, centered overlay on desktop
- Forms: Single column on mobile, multi-column on desktop
- Touch targets: 44px minimum on mobile

---

## COMPETITIVE ANALYSIS

| Feature | Tebra MHMVP | SimplePractice | TherapyNotes | Sessions Health |
|---------|-------------|----------------|--------------|-----------------|
| **AI Clinical Documentation** | ✅ Ambient recording → SOAP | ❌ Manual only | ❌ Manual only | ⚠️ Templates only |
| **Self-Service Data Import** | ✅ 15-min AI wizard | ⚠️ Export only (no import) | ❌ No export | ⚠️ CSV only (manual mapping) |
| **Unified Messaging** | ✅ SMS+Email+Voice in one inbox | ⚠️ Separate tabs | ⚠️ Email only | ⚠️ In-app only |
| **Mobile-First Design** | ✅ Full parity (iOS/Android) | ⚠️ Limited mobile app | ❌ Desktop-only | ⚠️ View-only mobile |
| **Patient-Centric Nav** | ✅ Zero module navigation | ❌ 8+ modules | ❌ 10+ modules | ⚠️ 6 modules |
| **Outcome Measure Tracking** | ✅ Auto-trending + alerts | ⚠️ Manual entry | ⚠️ Manual entry | ✅ Auto-trending |
| **Voice Commands** | ✅ "Tebra, show me [Patient]" | ❌ Not supported | ❌ Not supported | ❌ Not supported |
| **Documentation Time** | ✅ 2-3 min (AI-powered) | ❌ 15-20 min (manual) | ❌ 15-20 min (manual) | ⚠️ 10 min (templates) |
| **Substrate Intelligence** | ✅ Auto-generated tasks/insights | ❌ Manual task creation | ❌ Manual workflows | ❌ None |
| **Real-Time Updates** | ✅ Supabase Realtime | ❌ Manual refresh | ❌ Manual refresh | ⚠️ Polling |
| **Pricing (Solo)** | $150-200/mo | $99/mo | $99/mo | $150/mo |
| **Target Market** | Solo + small groups | Solo + small groups | Solo + groups | Solo practitioners |

**Tebra's Competitive Advantages:**
1. **AI-Native:** Only platform with ambient clinical documentation + substrate intelligence
2. **Frictionless Onboarding:** 15-minute data import removes #1 switching barrier
3. **True Patient-Centric:** Zero module navigation, all context around patient
4. **Substrate Intelligence:** Continuous background AI generates tasks/insights automatically
5. **Enterprise-Grade:** Production-ready code, HIPAA-compliant from day one, multi-agent orchestration
6. **Future-Proof Architecture:** Channel-agnostic messaging, pluggable providers, scalable to any specialty

---

*This PRD v2.0 (Substrate Intelligence Phase) is the authoritative specification for the Mental Health MVP. All development decisions align with these requirements. Last updated: February 2, 2026.*
