# Mental Health MVP: Product Requirements Document
## Tebra Dynamic Canvas Initiative

**Version:** 2.0  
**Date:** February 1, 2026  
**Owner:** Jay Trainer (UX Strategy & Prototype Lead)  
**Stakeholders:** Kyle Ryan (CTO/CPO), Catarina Tsang (UX Lead/AI Framework), Rich U (Data Infrastructure)  
**Target Launch:** Q2 2026  
**Hackathon Demo:** February 2026  

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
- **AI Substrate Intelligence:** Background AI generates clinical notes from ambient session recording
- **AI-Native Data Import:** 15-minute self-service migration vs. 20-hour manual re-entry
- **Channel-Agnostic Messaging:** Unified inbox (SMS, Email, Voice-ready) where delivery method is just metadata
- **Contextual Task Surfacing:** Tasks predicted and surfaced automatically, not manually created
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
- **Differentiation:** Only Tebra offers AI-native clinical documentation + frictionless onboarding
- **Revenue:** $150-200/month per solo practitioner; $400-600/month for 3-person group
- **Unit Economics:** 80%+ gross margin with substrate AI costs amortized across users
- **Competitive Moat:** Data import removes #1 barrier to switching EHRs

---

## STRATEGIC POSITION

### Why This Wins the Hackathon

This project demonstrates **two distinct proof-of-concept pillars**:

#### POC 1: UX Transformation (Dynamic Canvas)
- **Metric:** 88% click reduction (48 → 6), 90% time reduction (9 min → 90 sec)
- **Innovation:** Patient-as-central-object eliminates module navigation entirely
- **Demo Impact:** Side-by-side comparison of legacy workflow vs. Dynamic Canvas

#### POC 2: AI Engineering Excellence
- **Metric:** Enterprise-grade code quality + 95% migration time reduction
- **Innovation:** Dual-tool AI orchestration (Antigravity + Claude Code) + AI-native data import
- **Demo Impact:** Show real SimplePractice export → 15-minute import → Populated dashboard

### Competitive Advantages

| Capability | Tebra MHMVP | SimplePractice | TherapyNotes | Sessions Health |
|-----------|-------------|----------------|--------------|-----------------|
| AI Clinical Documentation | ✅ Ambient recording | ❌ Manual only | ❌ Manual only | ⚠️ Templates only |
| Self-Service Data Import | ✅ 15-min wizard | ⚠️ Export only | ❌ None | ⚠️ CSV only |
| Unified Messaging | ✅ SMS+Email+Voice | ⚠️ Separate tabs | ⚠️ Email only | ⚠️ In-app only |
| Mobile-First Design | ✅ Full parity | ⚠️ Limited | ❌ Desktop-only | ⚠️ View-only |
| Patient-Centric Nav | ✅ Zero modules | ❌ 8+ modules | ❌ 10+ modules | ⚠️ 6 modules |

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

---

## MVP SCOPE & FEATURE SET

### In-Scope for Mental Health MVP

#### Core Navigation
- [ ] **Left navigation (8-item structure):** Home, Patient, Calendar, Communications, Care, Billing (read-only), Marketing/Reputation (read-only), Notifications, Avatar
- [ ] **Responsive design:** Desktop (sidebar), Tablet (collapsible sidebar), Mobile (bottom nav bar)
- [ ] **Persistent navigation** across all pages
- [ ] **Mobile-first implementation** with 44px minimum touch targets

#### Home Page (Exactly 4 Widgets)
- [ ] **Today's Schedule** (patient appointments, priority actions, room assignment)
  - Mobile: Stacked vertically, full width
  - Tablet/Desktop: 2x2 grid
  - First 3-4 upcoming appointments shown
  - "Begin Check-In" button on first incomplete appointment
  
- [ ] **Messages/Inbox** (unified SMS, email, voice thread view)
  - Channel-agnostic display (SMS icon, email icon, phone icon)
  - Patient-threaded conversations
  - Most recent 5-6 messages shown
  - Unread badge
  
- [ ] **Today's Tasks** (substrate-generated clinical tasks, NOT manual)
  - 3-4 highest priority tasks shown
  - Task icons and metadata
  - "Start" or "Open" action buttons
  
- [ ] **Practice Financial Health** (invoices sent, payments received, trend line)
  - Total invoices sent this period
  - Total payments received
  - Simple 30-day trend line
  - "Healthy" / "Attention Needed" indicator

#### Patient Page
- [ ] **Left sidebar:** Patient roster/list with search
  - Desktop: Fixed 260px sidebar
  - Tablet: 200px collapsible sidebar
  - Mobile: Full-width drawer (swipe from left)
  - Real-time search/filter by name, DOB, or ID
  
- [ ] **Top section:** Patient name, contact info, next appointment
  - Avatar (60px desktop, 48px mobile)
  - Patient name, session type, pronouns, DOB, insurance
  - "Next Appointment" or "No upcoming appointments" with CTA
  
- [ ] **Middle section:** Chart summary with "show more" for full history
  - Chief Complaint / Current Status (2-3 sentences)
  - Current Treatment Plan (1 sentence)
  - Active Diagnoses with codes
  - Last visit date + brief summary
  - Expand/collapse toggle
  
- [ ] **Bottom section:** Tabbed interface
  - **Session Notes:** List of all notes, reverse chronological
  - **Treatment Plan:** Current plan, goals, modalities, review alerts
  - **Outcome Measures:** Trend chart (GAD-7, PHQ-9), reassessment alerts
  - **Communications:** Patient-threaded messages, reply interface

#### Care Page (Session Workflow)

**Active Recording State:**
- [ ] Pulsing red "RECORDING" indicator with dot
- [ ] Large monospace session timer (00:00)
- [ ] Wave animation showing audio capture
- [ ] Voice trigger instruction: "Say 'that ends our session'"
- [ ] Minimal UI - maximum focus on patient interaction
- [ ] Patient context: minimal header (name, avatar, start time)

**Note Review State:**
- [ ] **Left Column:** Substrate-generated clinical note (inline editable)
  - Sections: Chief Complaint, Progress & Treatment Response, Session Focus, Plan & Recommendations, Clinical Codes
  - Click any section to edit (contenteditable divs)
  - Auto-save on blur
  - Inline code badges (F41.1, 90836)
  
- [ ] **Right Column:** Session metadata & actions
  - **Card 1:** Outcome Measures (GAD-7, PHQ-9 scores auto-captured)
  - **Card 2:** Diagnoses (with code badges)
  - **Card 3:** CPT Code (90836 with billing amount)
  - **Card 4:** Patient Portal Preview (shared vs. private flags)
  - **Card 5:** Invoice Generated ($150, view/print buttons)
  - "Continue to Visit Summary" button

**Visit Summary Page:**
- [ ] Session overview recap
- [ ] Key actions for patient (homework, referrals, follow-up)
- [ ] Billing breakdown (CPT 90836, $150.00)
- [ ] Invoice view/print options
- [ ] Clear "What Goes to Patient Portal?" section (SHARED vs. PRIVATE badges)

#### Communications Page
- [ ] **Unified inbox** (SMS, email, voice messages)
  - Tab filter: All | SMS | Email | Voice
  - Search by patient name or message content
  - Refresh indicator (last updated: X min ago)
  
- [ ] **Message thread list**
  - Patient avatar (40px)
  - Patient name, message type indicator
  - Preview text (first 60 chars)
  - Timestamp (relative or date)
  - Unread badge (red dot)
  
- [ ] **Thread expanded view**
  - Messages chronological (oldest first)
  - Per message: timestamp, type badge, content, sender indicator
  - Reply interface at bottom (text input + send button)
  
- [ ] **Mobile responsive**
  - Full-screen thread view on mobile
  - Swipe back to inbox
  - Bottom-anchored reply input

#### Calendar Page
- [ ] **Week view (default)** with day/month view toggle
  - Header: Date range, navigation (< | >), "Today" button, view toggle
  - Grid: Time slots (8 AM - 6 PM, 15-min intervals) × Days (Mon-Sun)
  
- [ ] **Per appointment block:**
  - Patient name (bold)
  - Appointment type label (color-coded: Intake=blue, Follow-up=green, Therapy=teal)
  - Time + duration
  - Room/location (small)
  - Status badge: SCHEDULED | IN PROGRESS | COMPLETED | NO-SHOW
  
- [ ] **Appointment detail card** (hover or click)
  - Patient name, type, time + duration, room, provider
  - Last visit date
  - Quick actions: "Begin Check-In" | "Mark as Complete" | "Reschedule"
  
- [ ] **Filter sidebar** (left, collapsible on mobile)
  - Filter by appointment type (checkboxes)
  - Filter by provider (if multi-provider)
  - Filter by room/location
  
- [ ] **Mobile responsive**
  - Day view default on mobile
  - Horizontal swipe between days
  - Tap appointment for detail sheet

#### Outcome Measures Tracking
- [ ] **Dashboard view** (Table + Trend Chart toggle)
  
- [ ] **Table view:**
  - Columns: Patient Name | GAD-7 | PHQ-9 | Last Admin Date | Trend | Status
  - Rows: Per patient (sortable by column)
  - Status badges: ✓ Current (green), ⚠ Due (yellow), ✗ Overdue (red)
  - Click row to view full measure history
  
- [ ] **Trend chart view:**
  - X-axis: Date (last 6 months)
  - Y-axis: Score (0-21 for GAD-7, 0-27 for PHQ-9)
  - Per patient: Line connecting score points
  - Hover: Show date, score, session context
  
- [ ] **Export button:** CSV download of all visible data
  
- [ ] **Mobile responsive:**
  - Cards instead of table on mobile
  - Simplified chart (focus on single patient)

#### Marketing & Reputation (Read-Only Base Level)
- [ ] **Dashboard cards** (2x2 on desktop, stacked on mobile)
  - **Review Metrics:** Average rating, total reviews, trend
  - **SEO Visibility:** Keywords ranked, average position, indicator
  - **Geographic Performance:** Local impressions, map appearance rate
  - **AI Optimization (AIOs):** Platforms tracking practice (Perplexity, ChatGPT, Google, Claude)
  
- [ ] **Detail list:** Where to find your practice (Google Reviews, Healthgrades, Psychology Today, Yelp)
  
- [ ] **Upsell CTA:** "Unlock Active Reputation Management" (Premium badge, description, pricing TBD)

#### Billing Tab (Read-Only for MVP)
- [ ] Display of generated invoices
- [ ] Collections summary
- [ ] Aging AR at practice level (high-level summary only)

#### Task Intelligence
- [ ] Substrate-generated task list on home page
- [ ] In-context tasks on patient page (inline with tabs)
- [ ] Calendar-triggered prep tasks (before session)
- [ ] Session-triggered closure tasks (after session)
- [ ] Self-clearing tasks (disappear when completed)
- [ ] Role-aware visibility (therapist ≠ office manager view)

#### **🆕 DATA IMPORT WIZARD (Critical for Demo)**

**Step 1: Welcome & Source Selection**
- [ ] Source system selection cards (SimplePractice, TherapyNotes, Google Workspace, Excel, Other)
- [ ] "Skip - I'll start fresh" option
- [ ] Mobile-responsive card grid

**Step 2: Source-Specific Guidance**
- [ ] Per-source export instructions (SimplePractice, TherapyNotes, Google)
- [ ] "Watch Video Guide" links
- [ ] "I have my files" continuation button

**Step 3: File Upload**
- [ ] **Three data pillars:**
  - Patient Roster (CSV, XLSX, vCard) - **REQUIRED**
  - Clinical Documents (PDF, ZIP) - Optional
  - Appointments (ICS, CSV) - Optional
  
- [ ] Drag & drop file uploader component
- [ ] File type detection and validation
- [ ] Max 500MB total upload limit
- [ ] Upload progress indicators
- [ ] Mobile: Full-screen upload interface

**Step 4: AI Processing (Column Mapping)**
- [ ] **Gemini 2.0 Flash analyzes CSV headers + sample data**
- [ ] Auto-map columns to Tebra schema (first_name, last_name, date_of_birth, etc.)
- [ ] Confidence scores per mapping (High ≥90%, Medium ≥70%, Low ≥50%)
- [ ] User review interface:
  - Source column → Target field dropdown
  - Confidence badge (visual indicator)
  - Low-confidence mappings highlighted for review
  
- [ ] **Data validation:**
  - Required fields check (first_name, last_name, DOB)
  - Format validation (dates, phones, zip codes)
  - Duplicate detection (fuzzy match on name + DOB)
  
- [ ] **Data cleaning:**
  - Date format normalization (YYYY-MM-DD)
  - Phone format normalization (E.164)
  - ZIP code leading zero restoration
  - Gender normalization (M/F/U)

**Step 5: Document Matching**
- [ ] **Gemini extracts metadata from PDFs:**
  - Document type (progress_note, intake_assessment, treatment_plan, etc.)
  - Patient name (matched against imported roster)
  - Date of service
  - Provider name
  - Diagnosis/CPT codes
  
- [ ] **Folder structure recognition** (SimplePractice pattern):
  ```
  Export/Medical Records/
    Johnson, Sarah/
      Progress_Note_2025-06-15.pdf
      Treatment_Plan_2025-01-10.pdf
  ```
  
- [ ] **Matching UI:**
  - Per document: Source filename → Matched patient → Confidence
  - High-confidence (>90%): Auto-matched
  - Low-confidence: User selects from dropdown
  - Unmatched: Saved to "Unmatched Documents" folder

**Step 6: Preview & Confirm**
- [ ] **Import summary:**
  - Patients ready to import (count)
  - Patients needing review (count, issues listed)
  - Potential duplicates (count)
  - Documents matched (count)
  - Documents unmatched (count)
  
- [ ] **Sample preview table:**
  - First 10-20 records shown
  - Validation status per row (✓ Ready, ⚠ Fix, ✗ Error)
  
- [ ] **Action buttons:**
  - "Review Issues" (navigate to fix UI)
  - "Import Everything" (requires checkbox confirmation)
  
- [ ] **HITL Confirmation:**
  - Checkbox: "I understand this import cannot be undone"
  - Disabled "Import" button until checked

**Step 7: Import Execution**
- [ ] **Transaction-based commit:**
  - All-or-nothing import (rollback on error)
  - Move data from staging tables to production
  - Move documents from temp storage to permanent
  
- [ ] **Audit logging:**
  - User ID, timestamp, IP address
  - Files uploaded, records affected
  - Errors encountered
  
- [ ] **Progress indicator:**
  - Live status updates
  - "Processing 47/58 patients..."
  
- [ ] **Cleanup:**
  - Delete staging data after 24 hours
  - Delete temp files after 24 hours

**Step 8: Import Complete**
- [ ] **Success screen:**
  - Checkmark animation
  - "X patients imported"
  - "Y documents attached"
  
- [ ] **Import summary report:**
  - Downloadable PDF/CSV
  - Patients created, documents attached
  - Warnings (missing data, duplicates flagged)
  - Unmatched documents saved location
  
- [ ] **Next steps:**
  - "Review flagged patients in your roster"
  - "Set up your first appointment"
  - "Try a session recording"
  
- [ ] **"Go to Dashboard" button** → Navigate to populated home page

**Import Architecture (Backend):**
- [ ] **Database schema:**
  - `import_batches` table (status tracking)
  - `import_patients_staging` table (pre-commit validation)
  - `import_documents_staging` table (document matching)
  - `import_audit_log` table (HIPAA compliance)
  
- [ ] **API routes:**
  - `POST /api/import/upload` - File upload handler
  - `POST /api/import/[batchId]/analyze` - Trigger AI pipeline
  - `GET /api/import/[batchId]/mapping` - Get/update column mapping
  - `GET /api/import/[batchId]/preview` - Paginated preview
  - `POST /api/import/[batchId]/validate` - Full validation
  - `PUT /api/import/[batchId]/review/[recordId]` - User corrections
  - `POST /api/import/[batchId]/commit` - Execute import
  - `POST /api/import/[batchId]/cancel` - Cancel and cleanup
  
- [ ] **Gemini integration:**
  - Column mapping prompt (analyze headers + sample data)
  - Document metadata extraction (PDF → structured data)
  - Patient name matching (fuzzy matching with confidence scores)
  
- [ ] **Supabase Storage:**
  - Temp bucket for uploaded files (24-hour retention)
  - Permanent bucket for committed documents
  - Signed URLs for download
  
- [ ] **RLS policies:**
  - All staging data isolated by practice_id
  - Only practice users can access import batches
  - Audit logs immutable (insert-only)

---

### Out-of-Scope for MVP

- ❌ Active billing/invoicing workflow (read-only only; upsell later)
- ❌ Marketing & Reputation active management (view metrics only; premium upsell)
- ❌ Multi-user collaboration workflows (assume single therapist or async)
- ❌ Video/telehealth integration (Phase 2)
- ❌ Patient self-service portal (Phase 2)
- ❌ Advanced analytics/reporting (Phase 2)
- ❌ Ambient clinical documentation during session (structured note generation post-session only for now)
- ❌ Predictive clinical alerts ("patient trending worse" AI analysis)
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

**Today's Tasks Card**
```
Component: Task List (Substrate-Generated)
- Header: "Today's Tasks" | "6 TOTAL"
- Show: 3-4 highest priority tasks
- Per task:
  - Task icon (insurance, message, etc.)
  - Task title ("Verify insurance eligibility for today's patients")
  - Metadata subtitle ("TEBRA CLEARINGHOUSE • 14 PATIENTS SCHEDULED")
  - Action button: "Start" or "Open" (context-dependent)
- Link: "See all tasks" → Task detail view (TBD for Phase 1.1)

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

### PATIENT PAGE

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
- Substrate intelligence: Flags incomplete notes

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
  | GAD-7 | 14 | Jan 10 | → Slight increase |
  | PHQ-9 | 8 | Jan 10 | ↓ Slight decrease |
- Alert if reassessment due: "GAD-7 due for readministration (last: 30 days ago)"

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
- Billing amount: $150

CARD 4: Patient Portal Preview
- Title: "Patient Portal"
- Checkbox list (read-only display):
  - ✓ Homework assignments → SHARED badge (var(--vigor))
  - ✗ Diagnosis details → PRIVATE badge (var(--remedy))
  - ✗ Internal clinical notes → PRIVATE badge
  - ✓ Next appointment info → SHARED badge
- Substrate intelligence: Automatically flags what's safe to share

CARD 5: Invoice
- Title: "Invoice Generated"
- Amount: $150
- Type: "50-minute session"
- Actions: 
  - Button: "View Invoice"
  - Button: "Print Invoice"
- Background color: Light green (success state - var(--asana))
- Bottom: "Continue to Visit Summary" button (var(--vitality-1), primary)

Responsive:
- Desktop: Right column (320px fixed width)
- Tablet: Below note content (stacked)
- Mobile: Below note, full width, cards condensed
```

**Visit Summary Page**

```
Component: Session Completion & Billing
- Header card:
  - Title: "Visit Summary"
  - Subtitle: "[Patient Name] • [Date]"
  - Metadata grid (3 columns on desktop; stacked on mobile):
    | Duration | Time | Session Type |
    | 50 min | 2:00-2:50 PM | Individual Therapy |

- Section: Session Overview
  - Brief summary of session content (2-3 sentences from substrate)

- Section: Key Actions for Patient
  - Bulleted list of homework, referrals, follow-up items
  - Formatted for patient-facing communication

- Section: Billing & Invoice
  - Large amount display: "$150.00" (32px font)
  - Breakdown:
    | CPT 90836 (50-59 min) | $150.00 |
  - Buttons:
    - "View Invoice" (opens PDF preview)
    - "Print Invoice" (triggers print dialog)

- Section: What Goes to Patient Portal?
  - Two boxes:
    - SHARED (green background - var(--asana)): "Homework assignments, next appointment time..."
    - PRIVATE (red background - var(--plasma)): "Detailed diagnosis info, clinical assessment notes..."
  - Substrate intelligence: Clear labeling so therapist can confirm before submitting

Responsive:
- Desktop: Centered, max-width 900px
- Tablet: Full-width with padding
- Mobile: Full-width, sections stacked, font-sizes reduced
  - Invoice amount still prominent (28px)
  - Buttons full-width
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
    - Suggested responses (future enhancement)

Responsive:
- Desktop: Split view (thread list left 320px, detail right flex-1)
- Tablet: Single view, click thread to expand detail
- Mobile: Full-screen list, tap to full-screen thread
  - Thread view has "Back" button (top-left)
  - Reply input bottom-anchored (fixed position)
```

**Channel-Agnostic Architecture (Backend):**
```typescript
// Unified message type (delivery method is metadata)
interface Message {
  id: string;
  conversation_id: string;
  patient_id: string;
  practice_id: string;
  
  // Channel-agnostic core
  content: string;
  direction: 'inbound' | 'outbound';
  sender_type: 'patient' | 'therapist' | 'system';
  
  // Channel metadata
  channel: 'sms' | 'email' | 'voice' | 'fax' | 'in_app';
  channel_metadata: {
    // SMS
    from_phone?: string;
    to_phone?: string;
    // Email
    from_email?: string;
    to_email?: string;
    subject?: string;
    // Voice
    call_duration_seconds?: number;
    recording_url?: string;
  };
  
  // State
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  read_at?: Date;
  delivered_at?: Date;
  
  created_at: Date;
}

// Pluggable provider interface (enables adding new channels without refactoring)
interface MessageProvider {
  send(message: MessageInput): Promise<MessageResult>;
  receive(webhook: any): Promise<Message>;
  validateRecipient(recipient: string): boolean;
  getSupportedFeatures(): MessageFeature[];
}

// MVP: SMS via Twilio, Email via SendGrid
// Future: Voice via Twilio, Fax via Phaxio, In-app native
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
  - Scatter analysis (future): Highlight patients trending upward (risk) or downward (improvement)

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

### MARKETING & REPUTATION (MVP: Read-Only)

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
- Trend: "→ 3 new reviews this month"

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

**APIs:**
- RESTful API endpoints (v1) for MVP
- Future: GraphQL layer for Phase 2 (efficient data fetching at scale)

**Data Persistence:**
- PostgreSQL via Supabase (patient records, session notes, outcome measures, messages, import batches)
- Redis (session cache, real-time updates - Supabase Realtime)
- Supabase Storage (audio files, PDF documents, temp uploads)

**AI Substrate Layer:**
- **Deepgram:** Speech-to-text for session recording
- **Gemini 2.0 Flash:** SOAP note generation, column mapping, document metadata extraction, patient matching
- **OpenAI TTS-1:** Voice response synthesis
- **Web Speech API:** Wake word detection ("Hey Tebra")
- Async job queue for heavy lifting (note processing, report generation, import batches)
- Substrate runs continuously, surfaces predictions via webhooks

**Authentication & Security:**
- Supabase Auth (email/password, OAuth)
- HIPAA-compliant authorization
- Role-based access control (therapist ≠ office manager)
- End-to-end encryption for audio files
- PHI audit logging
- PostgreSQL RLS (Row-Level Security) for multi-tenant isolation

**Deployment:**
- Vercel (Next.js frontend)
- Supabase (hosted PostgreSQL + Auth + Storage)
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

### Messaging Provider Architecture

```typescript
// lib/messaging/providers/base.ts
export interface MessageProvider {
  send(message: MessageInput): Promise<MessageResult>;
  receive(webhook: any): Promise<Message>;
  validateRecipient(recipient: string): boolean;
  getSupportedFeatures(): MessageFeature[];
}

// lib/messaging/providers/sms-twilio.ts
export class TwilioSMSProvider implements MessageProvider {
  async send(message: MessageInput): Promise<MessageResult> {
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      body: message.content,
      from: twilioPhoneNumber,
      to: message.recipient
    });
    
    return {
      id: result.sid,
      status: 'sent',
      channel: 'sms',
      channel_metadata: {
        from_phone: twilioPhoneNumber,
        to_phone: message.recipient
      }
    };
  }
  
  async receive(webhook: TwilioWebhook): Promise<Message> {
    // Parse Twilio webhook, create Message record
  }
  
  validateRecipient(phone: string): boolean {
    return /^\+1\d{10}$/.test(phone); // E.164 format
  }
  
  getSupportedFeatures(): MessageFeature[] {
    return ['text', 'delivery_status'];
  }
}

// lib/messaging/providers/email-sendgrid.ts
export class SendGridEmailProvider implements MessageProvider {
  async send(message: MessageInput): Promise<MessageResult> {
    const msg = {
      to: message.recipient,
      from: practiceEmail,
      subject: message.subject || 'Message from your therapist',
      text: message.content,
      html: message.html || message.content
    };
    
    await sgMail.send(msg);
    
    return {
      id: generateId(),
      status: 'sent',
      channel: 'email',
      channel_metadata: {
        from_email: practiceEmail,
        to_email: message.recipient,
        subject: msg.subject
      }
    };
  }
  
  async receive(webhook: SendGridWebhook): Promise<Message> {
    // Parse SendGrid inbound webhook, create Message record
  }
  
  validateRecipient(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  getSupportedFeatures(): MessageFeature[] {
    return ['text', 'html', 'attachments', 'delivery_status', 'read_receipts'];
  }
}

// Future: VoiceProvider, FaxProvider, InAppProvider...
```

### Data Import Pipeline

```typescript
// lib/import/pipeline.ts
export class ImportPipeline {
  async processUpload(files: File[], practiceId: string, userId: string) {
    // 1. Create batch record
    const batch = await createImportBatch({
      practice_id: practiceId,
      created_by: userId,
      source_system: detectSourceSystem(files)
    });
    
    // 2. Upload files to Supabase Storage (temp bucket)
    const uploadedFiles = await Promise.all(
      files.map(file => uploadToStorage(file, batch.id))
    );
    
    // 3. Trigger AI analysis
    await analyzeFiles(batch.id, uploadedFiles);
    
    return batch;
  }
  
  async analyzeFiles(batchId: string, files: UploadedFile[]) {
    for (const file of files) {
      if (file.type === 'csv' || file.type === 'xlsx') {
        await analyzePatientRoster(batchId, file);
      } else if (file.type === 'pdf') {
        await analyzeDocument(batchId, file);
      } else if (file.type === 'zip') {
        const extracted = await extractZip(file);
        await analyzeFiles(batchId, extracted);
      }
    }
    
    await updateBatchStatus(batchId, 'ready_for_review');
  }
  
  async analyzePatientRoster(batchId: string, file: UploadedFile) {
    // 1. Parse CSV/XLSX
    const rows = await parseFile(file);
    const headers = rows[0];
    const sampleRows = rows.slice(1, 4);
    
    // 2. AI column mapping (Gemini)
    const mappings = await mapColumns(headers, sampleRows);
    
    // 3. Validate and stage data
    for (const row of rows.slice(1)) {
      const mappedData = applyMappings(row, mappings);
      const validation = validatePatientData(mappedData);
      
      await createStagingRecord({
        batch_id: batchId,
        source_row_number: row.index,
        ...mappedData,
        validation_status: validation.status,
        validation_errors: validation.errors,
        validation_warnings: validation.warnings
      });
    }
  }
  
  async analyzeDocument(batchId: string, file: UploadedFile) {
    // 1. Extract metadata (Gemini)
    const pdfBase64 = await convertToBase64(file);
    const metadata = await extractDocumentMetadata(pdfBase64);
    
    // 2. Match to patient
    const patients = await getStagedPatients(batchId);
    const match = await matchPatientByName(
      metadata.patient_name,
      patients
    );
    
    // 3. Stage document
    await createDocumentStagingRecord({
      batch_id: batchId,
      original_filename: file.name,
      storage_path: file.storage_path,
      detected_document_type: metadata.document_type,
      detected_patient_name: metadata.patient_name,
      detected_date: metadata.date_of_service,
      matched_patient_staging_id: match?.id,
      match_confidence: match?.confidence
    });
  }
  
  async commitImport(batchId: string, userId: string) {
    // HITL confirmation required
    
    // Transaction: Move from staging to production
    await db.transaction(async (tx) => {
      // 1. Create patients
      const stagedPatients = await getStagedPatients(batchId);
      for (const staged of stagedPatients) {
        if (staged.user_decision === 'import') {
          await tx.insert(patients).values({
            practice_id: staged.practice_id,
            first_name: staged.first_name,
            last_name: staged.last_name,
            date_of_birth: staged.date_of_birth,
            // ... other fields
            import_batch_id: batchId
          });
        }
      }
      
      // 2. Move documents from temp to permanent storage
      const stagedDocs = await getStagedDocuments(batchId);
      for (const doc of stagedDocs) {
        const newPath = await moveToPermStorage(doc.storage_path);
        await tx.insert(patient_documents).values({
          practice_id: doc.practice_id,
          patient_id: doc.matched_patient_id,
          document_type: doc.detected_document_type,
          title: doc.original_filename,
          storage_path: newPath,
          import_batch_id: batchId
        });
      }
      
      // 3. Update batch status
      await tx.update(import_batches)
        .set({ 
          status: 'committed',
          committed_at: new Date()
        })
        .where(eq(import_batches.id, batchId));
      
      // 4. Audit log
      await tx.insert(import_audit_log).values({
        batch_id: batchId,
        user_id: userId,
        action: 'commit',
        action_details: { patients: stagedPatients.length, documents: stagedDocs.length }
      });
    });
    
    // 5. Cleanup staging data (scheduled job after 24 hours)
    await scheduleCleanup(batchId);
  }
}
```

---

## USER FLOWS

### PRIMARY FLOW: Solo Therapist Session Documentation

1. **Pre-Session Prep (5 min)**
   - Therapist opens Care page
   - Substrate loads: Last session summary, outcome measures due, treatment plan status
   - Therapist reviews and is ready

2. **Session Recording (45-50 min)**
   - Therapist says "start listening" (Web Speech API wake word detection)
   - Wave animation confirms recording active (Deepgram streaming)
   - Therapist and patient have conversation (no note-taking needed)
   - At session end, therapist says "that ends our session"

3. **Note Review (2-3 min)**
   - Substrate auto-generates note with sections: Chief Complaint, Progress, Session Focus, Plan (Gemini 2.0 Flash)
   - Therapist clicks any section to edit inline (no button needed)
   - Therapist reviews outcome measures (auto-captured from conversation)
   - Therapist confirms what goes to patient portal (substrate pre-flagged safe items)
   - Therapist clicks "Continue to Visit Summary"

4. **Visit Summary & Billing (1 min)**
   - Invoice pre-generated ($150)
   - Session overview recap
   - Key actions for patient (homework, follow-up)
   - Therapist clicks "Print Invoice" or "View Invoice"
   - Done. Note saved, invoice ready, patient portal updated.

**Total Time:** 3-4 minutes of active work (down from 15-20 minutes)

---

### SECONDARY FLOW: Data Import (New Practice Onboarding)

1. **Onboarding Wizard - Step 3: Import Data (30 min total)**
   
   **Step 3a: Welcome & Source Selection**
   - User selects source system (SimplePractice, TherapyNotes, Google, Excel, Other)
   - Or "Skip - I'll start fresh"

   **Step 3b: Source-Specific Guidance**
   - System shows export instructions for selected source
   - Example: SimplePractice → "Go to Settings → Practice → Data Export → Complete → Request Export → Copy password → Download ZIP"
   - "I have my files" button

   **Step 3c: File Upload**
   - Drag & drop interface (mobile: tap to browse)
   - Patient Roster (CSV/XLSX) - REQUIRED
   - Clinical Documents (PDF/ZIP) - Optional
   - Appointments (ICS/CSV) - Optional
   - Files detected and validated (MIME type, size)

   **Step 3d: AI Processing - Column Mapping**
   - Gemini analyzes CSV headers + sample data
   - Auto-map columns to Tebra schema
   - Confidence scores displayed (High ≥90%, Medium ≥70%, Low ≥50%)
   - User reviews low-confidence mappings
   - Data validation (required fields, formats, duplicates)
   - Data cleaning (dates, phones, zip codes normalized)

   **Step 3e: Document Matching**
   - Gemini extracts metadata from PDFs (document type, patient name, date)
   - Folder structure recognized (SimplePractice pattern)
   - Auto-match documents to patients (high confidence ≥90%)
   - User reviews low-confidence matches
   - Unmatched documents saved to "Unmatched" folder

   **Step 3f: Preview & Confirm**
   - Import summary: X patients ready, Y need review, Z duplicates, W documents matched
   - Sample preview table (first 10-20 records)
   - "Review Issues" or "Import Everything"
   - HITL confirmation checkbox: "I understand this import cannot be undone"

   **Step 3g: Import Execution**
   - Transaction-based commit (all-or-nothing)
   - Move staging data → production tables
   - Move temp files → permanent storage
   - Audit logging (user, timestamp, IP)
   - Progress indicator: "Processing 47/58 patients..."

   **Step 3h: Import Complete**
   - Success animation (checkmark)
   - "52 patients imported, 142 documents attached"
   - Downloadable import summary report
   - Next steps: Review flagged patients, set up first appointment, try session recording
   - "Go to Dashboard" → Navigate to populated home page

**Total Time:** 15-30 minutes (vs. 20-40 hours manual)

---

## SUCCESS METRICS

### Clinical Outcomes
- **Documentation Time:** Reduce from 15-20 min/patient to 2-3 min (80%+ reduction)
- **Note Compliance:** 100% of notes include proper diagnoses and CPT codes
- **Outcome Measure Consistency:** 90%+ of patients have GAD-7/PHQ-9 administered every 30 days
- **Treatment Plan Reviews:** 100% of treatment plans reviewed within 90-day cadence

### Business Outcomes
- **Adoption:** 80%+ of users active 4+ days/week after 30 days
- **Retention:** <10% churn at 3, 6, 12 months
- **Revenue:** $150-200/month per user for solo; $400-600/month for 3-person group
- **NPS:** >50 (indicating product-market fit)
- **Time Savings:** Therapists report 5+ additional hours/week available (work-life balance)

### Operational Metrics
- **System Uptime:** 99.9%+
- **Page Load Time:** <2 seconds (p95)
- **API Response Time:** <500ms (p95)
- **Audio Processing:** Note generation within 60 seconds of session end
- **Mobile Performance:** Full functionality on iOS Safari, Android Chrome

### Data Import Metrics (NEW)
| Metric | Target | Rationale |
|--------|--------|-----------|
| Import completion rate | >60% | Self-service onboarding |
| Time to import 60 patients | <30 min | 95% faster than manual |
| AI mapping accuracy | >85% | Minimize manual corrections |
| Document-to-patient match | >90% | Auto-attachment success |
| Import errors requiring support | <5% | True self-service |
| Data loss (fields not imported) | <5% | Near-complete migration |

### Messaging Metrics (NEW)
- **Unified Inbox Adoption:** 90%+ of messages viewed in unified inbox (vs. separate tabs)
- **Response Time:** Average <4 hours for patient messages
- **Channel Usage:** Track SMS vs. Email distribution
- **Delivery Success Rate:** >95% (SMS + Email combined)

### Hackathon Demo Metrics (POC Validation)
- **POC 1 - UX Transformation:**
  - Click reduction: 48 → 6 (87%)
  - Time reduction: 9 min → 90 sec (90%)
  
- **POC 2 - AI Engineering Excellence:**
  - Data import time: 20 hours → 15 min (95% reduction)
  - Code quality: Enterprise-grade (TypeScript strict, RLS enforced, audit logging)
  - Architecture scalability: Channel-agnostic messaging, patient-as-central-object

### Market Metrics
- **Go-to-Market:** Phase 1 (Jan-Mar 2026): 100 beta users
- **Phase 1.5 (Apr-May 2026):** 500 paying users
- **Phase 2 Launch (Jun 2026):** Full rollout to primary care; 5,000 users target by EOY
- **CAC Payback:** <12 months

---

## ROADMAP (Post-MVP)

### Phase 1.5 (Apr-May 2026): Mental Health Extensions
- [ ] Patient self-service portal (reschedule appointments, view session summaries, homework tracking)
- [ ] AI-suggested session responses for communications
- [ ] Advanced task delegation workflows (assign insurance verification to office manager)
- [ ] Reporting dashboard (therapist productivity, outcome measure trends)
- [ ] Voice messaging channel implementation (Twilio Voice)
- [ ] Fax messaging channel implementation (Phaxio)

### Phase 2 (Jun-Aug 2026): Primary Care + Billing
- [ ] Full billing module with active invoice workflow
- [ ] Multi-provider coordination and delegation
- [ ] Dental-specific adaptations (hygiene notes, restorative work codes)
- [ ] Patient acquisition analytics (integration with marketing & reputation management)
- [ ] Ambient clinical documentation (real-time transcription during session, not post-hoc)

### Phase 3 (Sep-Dec 2026): AI-Native Features
- [ ] Predictive clinical alerts ("Patient trending worse—consider intervention adjustment")
- [ ] Voice-first interface (dictation, voice commands, voice messages from patients)
- [ ] Integration with patient monitoring wearables (Fitbit, Apple Watch for mood/sleep tracking)
- [ ] Advanced data import (API-based, automated scheduling)

### Phase 4+ (2027): Ecosystem Expansion
- [ ] Third-party integrations (psychology.com, Psychology Today, Zendesk)
- [ ] Video telehealth with ambient documentation
- [ ] Multi-discipline support (add psychiatry, family therapy, counseling)
- [ ] Advanced analytics (predict patient outcomes, recommend treatment modalities)

---

## DEPENDENCIES & RISKS

### Technical Dependencies
- **Rich U's Data Platform:** Must be stable and ready to handle substrate queries
- **Gemini API Availability:** Session note generation + data import column mapping depends on Gemini API uptime
- **Deepgram API Availability:** Audio processing for session recording
- **Supabase Infrastructure:** Auth, database, storage, realtime all critical

### Timeline Dependencies
- **UX Design System:** Needs finalization before engineering sprint (already complete)
- **Security Audit:** HIPAA compliance review (2-3 weeks)
- **Clinical Validation:** Beta users for feedback before Phase 1.5 launch (100 users, 4 weeks)
- **Data Import Testing:** Real SimplePractice/TherapyNotes exports for validation (1 week)

### Risks & Mitigation
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Substrate notes are mediocre quality (missing context, hallucinating) | Medium | High | Beta test with 20 therapists pre-launch; invest in prompt engineering; HITL review always required |
| Audio privacy concerns (therapists uncomfortable with recording) | Medium | Medium | Clear data policy, encryption, and audit logging; feature can be toggled off; patient consent workflow |
| Integration complexity with existing Tebra workflows | Medium | High | Use existing data model from current practice management; minimal breaking changes; phased rollout |
| Adoption slower than expected (therapists prefer manual notes) | Low | High | Emphasize time savings in marketing; highlight work-life balance benefit; offer white-glove onboarding; data import removes switching friction |
| Competitors launch similar features | High | High | Lock in fast with superior UX; build network effects (patient portal); expand to primary care before competitors; data import creates switching cost moat |
| Data import quality issues (mappings incorrect, data loss) | Medium | High | AI confidence thresholds; user review for low-confidence mappings; preview before commit; comprehensive audit logging |
| Mobile responsiveness issues | Low | Medium | Mandatory responsive design from day one; testing at 375px, 768px, 1280px in quality gates |
| Messaging channel provider outages (Twilio, SendGrid) | Low | Medium | Graceful degradation; retry logic; user notification; fallback to email if SMS fails |

---

## ROLLOUT STRATEGY

### Phase 1: Private Beta (Feb-Mar 2026)
- **Scope:** 50-100 solo mental health practitioners
- **Recruitment:** Outreach to existing Tebra users, mental health forums, professional networks
- **Duration:** 4 weeks
- **Goals:**
  - Validate core value prop (documentation time reduction, note quality, compliance)
  - Collect NPS, feature requests, and pain points
  - Refine substrate note generation based on real clinical usage
  - Test data import with real SimplePractice/TherapyNotes exports
  - Build case studies and testimonials for launch

### Phase 1.5: Early Access (Apr-May 2026)
- **Scope:** 500 users (mix of solo and small groups)
- **Pricing:** Special early access rate ($99/month for solo, $299/month for 3-person group)
- **Goals:**
  - Verify unit economics and LTV assumptions
  - Test marketing messages and acquisition channels
  - Build community and word-of-mouth referrals
  - Validate data import with diverse source systems
  - Prepare full product for Phase 2 launch

### Phase 2: General Availability (Jun 2026)
- **Launch:** Mental Health MVP fully available; announce Primary Care MVP (beta)
- **Marketing:** Trade shows, professional associations, content marketing
- **Pricing:** Standard rates ($150/month solo, $400/month 3-person group)
- **Goals:**
  - 5,000+ users by EOY
  - Expand to primary care (leverage success with mental health as proof point)
  - Establish Tebra as AI-native healthcare platform leader

---

## HACKATHON DEMO SCRIPT

### Demo Flow (15 minutes total)

**Opening (1 min):**
"Today's Tebra requires 48 clicks and 9 minutes to check in a patient. We're demonstrating a paradigm shift: the Dynamic Canvas where data finds the user, and AI-native onboarding removes the #1 barrier to switching EHRs."

**POC 1: UX Transformation (7 min)**

1. **Legacy vs. Dynamic Canvas Comparison** (2 min)
   - Show side-by-side video: Legacy (48 clicks, 9 min) vs. Dynamic Canvas (6 clicks, 90 sec)
   - Highlight: Patient-as-central-object eliminates module navigation

2. **Voice Command Navigation** (2 min)
   - Say: "Tebra, show me Tim Anders"
   - Patient 360 loads instantly
   - Say: "Show Tim's appointments"
   - Appointments tab switches with context
   - Demonstrate: Unified inbox, outcome measures trending

3. **AI Clinical Documentation** (3 min)
   - Start session recording (pulsing indicator, wave animation)
   - Skip ahead (simulated 45-min session)
   - Say: "That ends our session"
   - AI generates SOAP note in <60 seconds
   - Show inline editing, outcome measures auto-captured
   - Click "Sign & Lock"

**POC 2: Engineering Excellence (7 min)**

4. **AI-Native Data Import** (5 min)
   - Show empty dashboard: "New practice, zero data"
   - Upload real SimplePractice export (ZIP file)
   - Gemini analyzes CSV headers, auto-maps columns (show confidence scores)
   - Documents auto-matched to patients (show folder structure recognition)
   - Preview: 58 patients, 142 documents, 4 warnings
   - Click "Import Everything" (HITL confirmation checkbox)
   - Progress indicator: "Processing 47/58..."
   - Success: Dashboard now populated with 58 patients

5. **Architecture Deep Dive** (2 min)
   - Show CLAUDE.md: "This file encodes our entire architectural philosophy"
   - Show channel-agnostic messaging schema: "Single table, channel is metadata"
   - Show RLS policies: "Multi-tenant isolation enforced at database level"
   - Highlight: TypeScript strict, production-grade code, audit logging

**Closing (1 min):**
"Two POCs validated:
1. **UX Transformation:** 88% click reduction, 90% time reduction
2. **AI Engineering:** 95% import time reduction, enterprise-grade code

This is the future of healthcare software: AI-native, patient-centric, frictionless."

### Demo Data Requirements

**Seed Data (For Development):**
- 500 synthetic patient records (realistic names, DOB, demographics)
- 1,500 clinical notes (varied diagnoses, CPT codes)
- 2,000 appointments (past and future)
- 300 messages (SMS + Email)

**Real Data (For Demo):**
- Actual SimplePractice export ZIP (anonymized/test account)
- ~60 patients, ~150 notes
- Demonstrates real-world import flow

**Demo Environment:**
- Vercel production deployment
- Supabase production instance
- Pre-seeded with 1 empty practice (for data import demo)
- Pre-seeded with 1 populated practice (for voice assistant demo)

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

### D. Sample Substrate Prompt (Note Generation)

```
You are a clinical documentation AI supporting mental health practitioners.

Input: 
- Ambient audio transcript (45-minute therapy session)
- Patient history (previous diagnoses, treatment plan, outcome measures)
- Current session metadata (date, duration, therapist name)

Output:
- Structured clinical note with sections:
  1. Chief Complaint & Presenting Issues (2-3 sentences)
  2. Progress & Treatment Response (clinical progress since last session)
  3. Session Focus (what we worked on today)
  4. Plan & Recommendations (next steps, homework, follow-up)
  5. Diagnosis & CPT Code (auto-infer from content; confirm with therapist)

Rules:
- Use professional clinical language
- Do NOT include therapist personal opinions
- Flag any safety concerns (suicidality, abuse, substance use)
- Ensure HIPAA compliance (remove identifying info not essential for clinical record)
- Suggest patient-portal-safe content (homework, general encouragement) separately from private notes (detailed assessment)
```

### E. Sample Gemini Prompt (Column Mapping)

```
You are a data migration assistant for a mental health practice management system.

Analyze these CSV headers and sample data, then map them to our patient schema.

HEADERS: ["Client First Name", "Client Last Name", "DOB", "Mobile Phone", "Email", "Insurance Name"]

SAMPLE DATA (first 3 rows):
{"Client First Name": "Sarah", "Client Last Name": "Johnson", "DOB": "3/12/1985", "Mobile Phone": "(555) 123-4567", ...}
{"Client First Name": "Michael", "Client Last Name": "Chen", "DOB": "7/22/1990", "Mobile Phone": "5552345678", ...}
{"Client First Name": "Jane", "Client Last Name": "Doe", "DOB": "1990-11-15", "Mobile Phone": "+15553456789", ...}

TARGET SCHEMA:
{
  "first_name": "Patient's first/given name (required)",
  "last_name": "Patient's last/family name (required)",
  "date_of_birth": "DOB in YYYY-MM-DD format (required)",
  "email": "Email address",
  "phone_mobile": "Mobile/cell phone (E.164 format preferred)",
  "phone_home": "Home phone",
  "insurance_name": "Insurance company name"
}

Return a JSON array of mappings:
[
  {
    "sourceColumn": "Client First Name",
    "targetField": "first_name",
    "confidence": 0.99,
    "transformRequired": false,
    "transformType": "none"
  },
  {
    "sourceColumn": "DOB",
    "targetField": "date_of_birth",
    "confidence": 0.95,
    "transformRequired": true,
    "transformType": "date_format"
  }
]

Rules:
- Map each source column to at most one target field
- Use confidence < 0.5 for uncertain mappings
- Set targetField to null for columns that don't match
- Detect common variations (DOB, Birth Date, Birthday → date_of_birth)
- Identify columns that need transformation (date formats, phone formats)
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
| **Pricing (Solo)** | $150-200/mo | $99/mo | $99/mo | $150/mo |
| **Target Market** | Solo + small groups | Solo + small groups | Solo + groups | Solo practitioners |

**Tebra's Competitive Advantages:**
1. **AI-Native:** Only platform with ambient clinical documentation
2. **Frictionless Onboarding:** 15-minute data import removes #1 switching barrier
3. **True Patient-Centric:** Zero module navigation, all context around patient
4. **Enterprise-Grade:** Production-ready code, HIPAA-compliant from day one
5. **Future-Proof Architecture:** Channel-agnostic messaging, pluggable providers

---

*This PRD v2.0 is the authoritative specification for the Mental Health MVP. All development decisions align with these requirements. Last updated: February 1, 2026.*
