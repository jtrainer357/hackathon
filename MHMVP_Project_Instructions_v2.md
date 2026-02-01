# TEBRA MENTAL HEALTH MVP: CLAUDE PROJECT INSTRUCTIONS v2.0

> **🚨 CRITICAL CONTEXT ISOLATION RULE**
> This project is COMPLETELY SELF-CONTAINED. NEVER reference, recall, or pull information from any other Claude projects, conversations, or memory systems. All context needed is provided in these instructions and the documents within this project. If information seems relevant but isn't explicitly provided here, ASK—do not assume.

---

## PROJECT IDENTITY

**Project Name:** Tebra Mental Health MVP (MHMVP)  
**Version:** 2.0  
**Date:** February 1, 2026  
**Purpose:** Hackathon POC demonstrating UX transformation + AI engineering excellence  
**Code Quality Bar:** Production-ready, enterprise-grade code for review by experienced engineering leadership  
**Repository:** github.com/jtrainer357/hackathon  

**Owner:** Jay Trainer (UX Strategy & Prototype Lead)  
**Stakeholders:** Kyle Ryan (CTO/CPO), Catarina Tsang (UX Lead/AI Framework), Rich U (Data Infrastructure)  
**Hackathon Demo:** February 2026

---

## WHAT WE'RE BUILDING

### The Problem We're Solving

Solo mental health practitioners (1-3 providers) face **three critical pain points**:

1. **Documentation Burden:** 15-20 minutes per patient spent on clinical notes (30-40% of their day)
2. **EHR Fragmentation:** Current systems fragment workflows across separate modules requiring constant context switching
3. **Migration Tax:** 20-40 hours of administrative labor to switch EHRs, creating vendor lock-in

### Our Solution

A lean, clinical-first platform delivering:

- **Patient-as-Central-Object:** All data organizes around patient records, not feature modules
- **AI Substrate Intelligence:** Background AI generates clinical notes from ambient session recording
- **🆕 AI-Native Data Import:** 15-minute self-service migration vs. 20-hour manual re-entry
- **🆕 Channel-Agnostic Messaging:** Unified inbox (SMS, Email, Voice-ready) where delivery method is just metadata
- **Contextual Task Surfacing:** Tasks predicted and surfaced automatically
- **🆕 Mobile-First Responsive:** Full functionality on any device, anywhere

### Target Outcome Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Documentation time | 15-20 min | 2-3 min | **85% reduction** |
| Clicks for check-in | 48 clicks | 6 clicks | **87% reduction** |
| Workflow time | 9 min | 90 sec | **90% reduction** |
| **🆕 Data migration time** | **20-40 hours** | **15-30 min** | **95% reduction** |

### Two Hackathon POCs

This project demonstrates **two distinct proof-of-concept pillars**:

#### POC 1: UX Transformation (Dynamic Canvas)
- **Metric:** 88% click reduction (48 → 6), 90% time reduction (9 min → 90 sec)
- **Innovation:** Patient-as-central-object eliminates module navigation entirely
- **Demo Impact:** Side-by-side comparison of legacy workflow vs. Dynamic Canvas

#### POC 2: AI Engineering Excellence
- **Metric:** Enterprise-grade code quality + 95% migration time reduction
- **Innovation:** Dual-tool AI orchestration (Antigravity + Claude Code) + AI-native data import
- **Demo Impact:** Show real SimplePractice export → 15-minute import → Populated dashboard

---

## TECHNOLOGY STACK (MANDATORY - DO NOT DEVIATE)

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend** | Next.js 14+ (App Router) | TypeScript strict mode REQUIRED |
| **Styling** | Tailwind CSS + shadcn/ui | Customized Tebra Design System |
| **Backend** | Supabase | Auth, PostgreSQL, RLS, Realtime |
| **AI - Speech** | Deepgram | Speech-to-text for session recording |
| **AI - Generation** | Gemini 2.0 Flash | SOAP note generation, voice assistant, **column mapping, document metadata extraction** |
| **AI - TTS** | OpenAI TTS-1 | Voice response synthesis |
| **Voice Detection** | Web Speech API | Wake word detection ("Hey Tebra") |
| **Icons** | hugeicons-react | Full icon library |
| **Animation** | Framer Motion | Use DesignSystem.animation constants |
| **Fonts** | Akkurat LL | Proprietary Tebra font family |
| **State** | Zustand + React Query | Client state + server state |
| **Charts** | Recharts | Data visualization |

---

## DESIGN SYSTEM GOLD STANDARD

### Color Palettes (USE CSS VARIABLES ONLY)

| Palette | Usage | Tokens | Example |
|---------|-------|--------|---------|
| **Growth** (Teal) | Primary brand, AI features, navigation active states | `--growth-1` to `--growth-5` | `bg-growth-2` |
| **Vitality** (Coral) | Primary action buttons, CTAs | `--vitality-1` to `--vitality-5` | `bg-vitality-1` |
| **Backbone** | Warm neutral backgrounds | `--backbone-1` to `--backbone-4` | `bg-backbone-1` |
| **Synapse** | Grayscale, text hierarchy | `--synapse-1` to `--synapse-6` | `text-synapse-6` |
| **Success** | Positive states | `--vigor`, `--asana` | `text-vigor` |
| **Warning** | Alert states | `--neuron`, `--amino` | `bg-amino` |
| **Error** | Error states | `--remedy`, `--plasma` | `text-remedy` |

### 🚫 ABSOLUTE PROHIBITIONS

1. **NO PURPLE ANYWHERE** - Growth Teal is the ONLY color for AI features
2. **NO HARDCODED HEX** - Always use CSS variables or Tailwind tokens
3. **NO WIDGETS WITHOUT WidgetContainer** - Every widget MUST use the shell component

### Component Patterns

**WidgetContainer (ALWAYS USE):**
```tsx
import { WidgetContainer } from '@/components/ui/widget-container'

// Default (white) variant
<WidgetContainer title="Today's Schedule">
  {/* content */}
</WidgetContainer>

// Highlight (teal) variant for AI/featured content
<WidgetContainer title="AI Insights" variant="highlight">
  {/* content */}
</WidgetContainer>
```

**Animation Pattern:**
```tsx
import { motion } from 'framer-motion'
import { DesignSystem } from '@/lib/design-system'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DesignSystem.animation.duration,  // 0.5s
      ease: DesignSystem.animation.ease           // [0.4, 0, 0.2, 1]
    }
  }
}
```

**Color Usage:**
```tsx
// ✅ CORRECT
className="bg-growth-2 text-synapse-6"
style={{ color: 'var(--vitality-1)' }}

// ❌ WRONG - NEVER DO THIS
style={{ color: '#DC7B5D' }}
className="bg-[#1A3D2E]"
```

### Typography Scale
- Metadata: `uppercase font-bold tracking-wider opacity-70 text-[10px]`
- Body: Default Akkurat LL
- Headings: Akkurat LL Bold

### Spacing Tokens
- Dashboard padding: `p-dashboard-padding` (16px)
- Dashboard gap: `gap-dashboard-gap` (8px)
- Widget padding: `p-widget-padding`
- Micro spacing: `gap-micro`

---

## 🆕 RESPONSIVE DESIGN (MANDATORY)

### Industry Standard Breakpoints

| Breakpoint | Tailwind Prefix | Min Width | Target Devices |
|-----------|----------------|-----------|----------------|
| Mobile (default) | (none) | 0px | Phones (portrait) |
| sm | `sm:` | 640px | Phones (landscape), small tablets |
| md | `md:` | 768px | Tablets (portrait) |
| lg | `lg:` | 1024px | Tablets (landscape), small laptops |
| xl | `xl:` | 1280px | Laptops, desktops |
| 2xl | `2xl:` | 1536px | Large desktops, monitors |

### Mobile-First Approach (REQUIRED)

Always write mobile styles first, then add breakpoint modifiers for larger screens:
```tsx
// ✅ CORRECT - Mobile first
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
  {/* Stacks vertically on mobile, row on tablet, 3-col grid on desktop */}
</div>

// ❌ WRONG - Desktop first (don't do this)
<div className="grid grid-cols-3 md:grid-cols-2 sm:flex sm:flex-col">
```

### Responsive Layout Patterns

**Home Dashboard:**
```tsx
// 4 widgets: stack on mobile, 2x2 on tablet/desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-dashboard-gap p-dashboard-padding">
  <ScheduleWidget />
  <MessagesWidget />
  <TasksWidget />
  <FinancialHealthWidget />
</div>
```

**Patient Page:**
```tsx
// Sidebar collapses on mobile
<div className="flex flex-col lg:flex-row">
  {/* Patient list: drawer on mobile, fixed sidebar on desktop */}
  <aside className="w-full lg:w-64 xl:w-80">
    <PatientList />
  </aside>
  
  <main className="flex-1 lg:ml-64 xl:ml-80">
    <PatientDetail />
  </main>
</div>
```

**Navigation:**
```tsx
// Bottom nav on mobile, left sidebar on desktop
<nav className="fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-0 lg:w-64 lg:right-auto">
  {/* Mobile: horizontal icon bar */}
  {/* Desktop: vertical full navigation */}
</nav>
```

### Touch-Friendly Requirements (Mobile)

| Element | Minimum Size | Spacing |
|---------|-------------|---------|
| Tap targets | 44x44px | 8px between |
| Buttons | 44px height | Full width on mobile |
| List items | 48px height | - |
| Form inputs | 44px height | 16px margin-bottom |
```tsx
// ✅ CORRECT - Touch-friendly
<button className="h-11 px-4 min-w-[44px]">Tap Me</button>

// ❌ WRONG - Too small for touch
<button className="h-6 px-2">Tiny</button>
```

### Testing Requirements

Every page/component MUST be tested at these widths:

- ✅ 375px - iPhone SE / small phones
- ✅ 768px - iPad Mini / tablets (portrait)
- ✅ 1280px - Laptops

### Responsive Checklist (Before PR)

- [ ] Tested at 375px (mobile)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 1280px (desktop)
- [ ] No horizontal scroll on any breakpoint
- [ ] Touch targets are 44px minimum on mobile
- [ ] Text is readable without zooming (16px min body)
- [ ] Navigation is accessible on all breakpoints
- [ ] Forms are usable on mobile
- [ ] Tables convert to cards OR scroll horizontally on mobile
- [ ] Images scale appropriately
- [ ] Modals/dialogs are full-screen on mobile

---

## TARGET USERS

### Primary: Dr. Sarah Chen (Solo Clinical Psychologist)
**Profile:** 8 years practice, 40+ active patients, suburban private practice

**Pain Points:**
- Documentation consumed 4-5 hours/week (30% of practice time)
- Manual transcription error-prone; compliance concerns
- Struggles with outcome measure tracking (GAD-7, PHQ-9) across 40+ active patients
- Never reviewed patient health trends
- Invoicing manual; cash flow visibility poor
- **🆕 Migration barrier:** Trapped on SimplePractice due to fear of losing 3 years of clinical history

**Success Metrics:**
- Completes documentation in 2-3 minutes/patient (down from 15-20)
- **🆕 Migrates 60 patients + 300 clinical notes in 30 minutes**
- Tracks outcome measures consistently
- Knows practice financial health at a glance
- No compliance violations in first year

### Secondary: Maria Rodriguez (Office Manager, 3-Provider Group)
**Pain Points:** No workflow visibility, billing handoff friction, **🆕 can't coordinate 3 providers' data exports simultaneously**

**Success Metrics:** **🆕 Successful group practice migration in <2 hours**

### Tertiary: James Park (Part-Time Billing Specialist)
**Pain Points:** Incomplete clinical data, high denial rate (20%)

---

## MVP FEATURE SCOPE

### In-Scope for Mental Health MVP

#### Core Navigation (8 Items)
- [ ] **Left navigation:** Home, Patient, Calendar, Communications, Care, Billing (read-only), Marketing/Reputation (read-only), Notifications, Avatar
- [ ] **🆕 Responsive design:** Desktop (sidebar), Tablet (collapsible sidebar), Mobile (bottom nav bar)
- [ ] **Persistent navigation** across all pages
- [ ] **🆕 Mobile-first implementation** with 44px minimum touch targets

#### Home Page (Exactly 4 Widgets)
- [ ] **Today's Schedule** (patient appointments, priority actions, room assignment)
  - 🆕 Mobile: Stacked vertically, full width
  - 🆕 Tablet/Desktop: 2x2 grid
  - First 3-4 upcoming appointments shown
  - "Begin Check-In" button on first incomplete appointment
  
- [ ] **Messages/Inbox** (unified SMS, email, voice thread view)
  - 🆕 Channel-agnostic display (SMS icon, email icon, phone icon)
  - 🆕 Patient-threaded conversations
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
  - 🆕 Desktop: Fixed 260px sidebar
  - 🆕 Tablet: 200px collapsible sidebar
  - 🆕 Mobile: Full-width drawer (swipe from left)
  - Real-time search/filter by name, DOB, or ID
  
- [ ] **Top section:** Patient name, contact info, next appointment
  - 🆕 Avatar (60px desktop, 48px mobile)
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
  - **Communications:** 🆕 Patient-threaded messages, reply interface

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

#### 🆕 Communications Page (Unified Messaging)
- [ ] **Unified inbox** (SMS, email, voice messages)
  - Tab filter: All | SMS | Email | Voice
  - Search by patient name or message content
  - Refresh indicator (last updated: X min ago)
  
- [ ] **Message thread list**
  - Patient avatar (40px desktop, 32px mobile)
  - Patient name, message type indicator
  - Preview text (first 60 chars)
  - Timestamp (relative or date)
  - Unread badge (red dot)
  
- [ ] **Thread expanded view**
  - Messages chronological (oldest first)
  - Per message: timestamp, type badge, content, sender indicator
  - Reply interface at bottom (text input + send button)
  
- [ ] **🆕 Mobile responsive**
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
  
- [ ] **🆕 Mobile responsive**
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
  
- [ ] **🆕 Mobile responsive:**
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

#### 🆕 DATA IMPORT WIZARD (Critical for Demo)

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
- ❌ 🆕 Voice/Fax messaging channels (architecture ready, implementation Phase 2)

---

## ARCHITECTURE PRINCIPLES (NON-NEGOTIABLE)

### 1. Patient-as-Central-Object
ALL data organizes around the patient record. Never create feature-centric modules.

### 2. Intelligence in the Substrate
AI runs continuously in background, surfacing predictions contextually. AI is never a chatbot.

### 3. HITL Mandate (Human-in-the-Loop)
AI can draft and orchestrate but NEVER submit, sign, or finalize without human approval.

### 4. A2UI Standard
AI generates declarative JSON instructions, never executable code.

### 5. Multi-Tenant Security
PostgreSQL RLS enforces practice isolation. Every query must be tenant-scoped.

### 🆕 6. Channel-Agnostic Messaging
Messages organized around patients, not channels. Delivery method is metadata, not separate tables.

**Architecture Pattern:**
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

// Pluggable provider interface
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

## CLINICAL DOMAIN KNOWLEDGE

### Outcome Measures (MVP)

| Measure | Purpose | Score Range |
|---------|---------|-------------|
| PHQ-9 | Depression screening | 0-27 |
| GAD-7 | Anxiety screening | 0-21 |
| PCL-5 | Trauma assessment | 0-80 |
| AUDIT-C | Substance use | 0-12 |

### Diagnosis Codes (MVP)

- F41.1 - Generalized Anxiety Disorder
- F41.0 - Panic Disorder
- F32.9 - Major Depressive Disorder, single episode
- F33.9 - Major Depressive Disorder, recurrent
- F43.10 - PTSD

### CPT Codes (MVP)

- 90834 - Individual Psychotherapy (30 min)
- 90837 - Individual Psychotherapy (45 min)
- 90836 - Individual Psychotherapy (50-59 min) ← PRIMARY
- 90838 - Individual Psychotherapy (60-75 min)

---

## VOICE COMMANDS

| Command | Action |
|---------|--------|
| "Tebra, show me [Patient]" | Opens Patient 360 view |
| "Tebra, show [Patient]'s appointments" | Navigates to Appointments tab |
| "Tebra, take me to Billing" | Navigates to Billing page |
| "Tebra, start session with [Patient]" | Begins recording |
| "That ends our session" | Stops recording, triggers note generation |

---

## PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| Context Switch | <100ms |
| Orchestration Latency | <150ms |
| AI Suggestion Response | <500ms |
| Page Load (TTI) | <2 seconds |
| Note Generation | <60 seconds post-session |
| 🆕 Data Import Processing | <2 minutes for 60 patients |
| System Uptime | 99.9%+ |

---

## 🆕 DATA IMPORT: AI PROMPTS

### Gemini Column Mapping Prompt Template
```
You are a data migration assistant for a mental health practice management system.

Analyze these CSV headers and sample data, then map them to our patient schema.

HEADERS: ${JSON.stringify(headers)}

SAMPLE DATA (first 3 rows):
${sampleRows.map(row => JSON.stringify(row)).join('\n')}

TARGET SCHEMA:
{
  "first_name": "Patient's first/given name (required)",
  "last_name": "Patient's last/family name (required)",
  "date_of_birth": "DOB in YYYY-MM-DD format (required)",
  "email": "Email address",
  "phone_mobile": "Mobile/cell phone",
  "phone_home": "Home phone",
  "address_street": "Street address",
  "address_city": "City",
  "address_state": "State (2-letter code)",
  "address_zip": "ZIP code (5 or 9 digit)",
  "insurance_name": "Insurance company name",
  "insurance_member_id": "Insurance member/policy ID",
  "primary_diagnosis_code": "ICD-10 code (e.g., F41.1)",
  "notes": "General notes about patient"
}

Return a JSON array of mappings:
[
  {
    "sourceColumn": "original header name",
    "targetField": "schema field name or null if no match",
    "confidence": 0.0-1.0,
    "transformRequired": true/false,
    "transformType": "none" | "date_format" | "phone_format" | "name_split" | "code_lookup"
  }
]

Rules:
- Map each source column to at most one target field
- Use confidence < 0.5 for uncertain mappings
- Set targetField to null for columns that don't match (e.g., "Referral Source")
- Detect common variations (DOB, Birth Date, Birthday → date_of_birth)
- Identify columns that need transformation
```

### Gemini Document Metadata Extraction Prompt
```
Analyze this clinical document PDF and extract metadata.

KNOWN PATIENTS: ${patientNames.join(', ')}

Extract:
1. document_type: One of [progress_note, intake_assessment, treatment_plan, 
   discharge_summary, outcome_measure, message_transcript, consent_form, other]
2. patient_name: The patient this document belongs to (match to known patients if possible)
3. date_of_service: The date this document was created/signed (YYYY-MM-DD)
4. provider_name: The clinician who created this document
5. diagnosis_codes: Any ICD-10 codes mentioned
6. cpt_codes: Any CPT codes mentioned

Return JSON:
{
  "document_type": "string",
  "patient_name": "string or null",
  "patient_match_confidence": 0.0-1.0,
  "date_of_service": "YYYY-MM-DD or null",
  "provider_name": "string or null",
  "diagnosis_codes": ["F41.1"],
  "cpt_codes": ["90837"],
  "extraction_confidence": 0.0-1.0
}

Rules:
- Only extract information clearly visible in the document
- Do not hallucinate patient names - match against known list or return null
- If date is ambiguous, prefer the most recent date mentioned
```

---

## SUBSTRATE PROMPT TEMPLATE (SOAP Note Generation)
```
You are a clinical documentation AI supporting mental health practitioners.

Input: 
- Ambient audio transcript (45-minute therapy session)
- Patient history (previous diagnoses, treatment plan, outcome measures)
- Current session metadata (date, duration, therapist name)

Output:
- Structured clinical note with sections:
  1. Chief Complaint & Presenting Issues (2-3 sentences)
  2. Progress & Treatment Response
  3. Session Focus
  4. Plan & Recommendations
  5. Diagnosis & CPT Code (auto-infer; confirm with therapist)

Rules:
- Use professional clinical language
- Flag safety concerns (suicidality, abuse, substance use)
- Ensure HIPAA compliance
- Separate patient-portal-safe content from private notes
```

---

## AVAILABLE DESIGN SYSTEM COMPONENTS

### Pre-Built UI Components (51 files)
`button`, `card`, `badge`, `avatar`, `input`, `dialog`, `sheet`, `drawer`, `popover`, `tabs`, `table`, `chart`, `calendar`, `sidebar`, `widget-container`

### Pre-Built Dashboard Widgets (9 modules)
`schedule-widget`, `messages-widget`, `tasks-widget`, `refills-widget`, `priority-actions-widget`

### Usage Pattern
```tsx
// Import from the design system
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WidgetContainer } from '@/components/ui/widget-container'
import { ScheduleWidget } from '@/components/widgets/schedule-widget'
```

---

## FILE STRUCTURE
```
/mhmvp
├── /src
│   ├── /app                    # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home dashboard
│   │   ├── /patient
│   │   ├── /calendar
│   │   ├── /communications     # 🆕 Unified messaging
│   │   ├── /care
│   │   ├── /billing
│   │   └── /import             # 🆕 Data import wizard
│   ├── /components
│   │   ├── /ui                 # Design System primitives
│   │   ├── /widgets            # Dashboard widgets
│   │   └── /import             # 🆕 Import wizard components
│   ├── /lib
│   │   ├── design-system.ts    # Animation/chart constants
│   │   ├── /supabase           # Database client
│   │   ├── /ai                 # Deepgram, Gemini integrations
│   │   ├── /messaging          # 🆕 Channel providers
│   │   └── /import             # 🆕 Import pipeline
│   └── /styles
│       └── globals.css         # Design tokens
├── CLAUDE.md                   # Claude Code instructions
├── README.md
└── package.json
```

---

## DATABASE SCHEMA (Key Tables)

### 🆕 Messages Table (Channel-Agnostic)
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
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY practice_isolation ON messages
  USING (practice_id = current_setting('app.current_practice_id')::UUID);
```

### 🆕 Import Batches Table
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
  errors JSONB DEFAULT '[]',
  warnings JSONB DEFAULT '[]',
  
  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  committed_at TIMESTAMPTZ,
  
  -- RLS
  CONSTRAINT fk_practice FOREIGN KEY (practice_id) REFERENCES practices(id)
);
```

---

## QUICK REFERENCE CHECKLIST

Before implementing ANY feature, verify:

### Architecture & Scope:
- [ ] Uses Patient-as-Central-Object architecture?
- [ ] Is it in-scope for MVP?
- [ ] Does AI action have human confirmation (HITL)?
- [ ] Are database queries tenant-scoped via RLS?
- [ ] Meets performance targets?

### Design System Compliance:
- [ ] Uses correct color tokens from Design System?
- [ ] **NO PURPLE ANYWHERE?**
- [ ] Uses WidgetContainer for widgets?
- [ ] Uses CSS variables (no hardcoded hex)?
- [ ] Uses Framer Motion with DesignSystem constants?

### 🆕 Responsive Design:
- [ ] Mobile-first CSS approach?
- [ ] Tested at 375px (mobile)?
- [ ] Tested at 768px (tablet)?
- [ ] Tested at 1280px (desktop)?
- [ ] Touch targets 44px minimum on mobile?
- [ ] No horizontal scroll on any breakpoint?
- [ ] Navigation accessible on all breakpoints?
- [ ] Tables convert to cards OR scroll on mobile?

### 🆕 Messaging Architecture:
- [ ] Uses unified conversations/messages tables?
- [ ] Channel stored as metadata, not separate table?
- [ ] Follows pluggable provider interface?
- [ ] Patient-threaded view implemented?

### 🆕 Data Import:
- [ ] Gemini integration for column mapping?
- [ ] Staging tables used (no direct production writes)?
- [ ] HITL confirmation before commit?
- [ ] Comprehensive audit logging?
- [ ] Transaction-based commit with rollback?

---

## CONTEXT ISOLATION ENFORCEMENT

**This project is COMPLETELY SELF-CONTAINED.**

When answering or implementing:

1. ONLY use information from these instructions
2. ONLY use documents explicitly added to this project
3. NEVER reference other Claude projects
4. NEVER assume context not provided
5. If context is missing, ASK

---

## HACKATHON DEMO SUCCESS CRITERIA

### POC 1: UX Transformation (7 min demo)
- ✅ Side-by-side comparison: Legacy (48 clicks, 9 min) vs. Dynamic Canvas (6 clicks, 90 sec)
- ✅ Voice command: "Tebra, show me Tim Anders" → Patient 360 loads
- ✅ AI documentation: Record → Generate SOAP → Sign & Lock (<60 sec)

### POC 2: AI Engineering Excellence (7 min demo)
- ✅ Empty dashboard → Upload SimplePractice ZIP → 15-min import → Populated dashboard
- ✅ Show Gemini column mapping with confidence scores
- ✅ Show document auto-matching to patients
- ✅ Show enterprise-grade code (CLAUDE.md, RLS policies, TypeScript strict)

### Success Metrics Demonstrated:
| Metric | Target | Demo Validation |
|--------|--------|----------------|
| Click reduction | 87% | Side-by-side video |
| Time reduction | 90% | Side-by-side video |
| Import time reduction | 95% | Live import demo |
| Code quality | Enterprise-grade | Code walkthrough |

---

*These instructions are the single source of truth for MHMVP v2.0. All development decisions align with specifications above.*

*Last Updated: February 1, 2026*