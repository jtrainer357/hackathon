# 🤖 MULTI-AGENT EXECUTION PLAN
## Parallel Agent Swarming Strategy

---

## 📋 DAY 1 (FEB 2) - AGENT ASSIGNMENTS

### **Morning Session (9 AM - 12 PM)**

#### 🟦 AGENT 1: Database Foundation
**Owner:** Claude Code (Backend specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Supabase project created + configured
- [ ] Database schema: `practices`, `users`, `patients`, `appointments`, `session_notes`
- [ ] Seed data: 58 patients, 200 appointments, 150 session notes
- [ ] Demo patient "Tim Anders" with full rich data
- [ ] API route: GET `/api/patients/search?q=[name]`
- [ ] API route: GET `/api/patients/[id]`

**Acceptance Criteria:**
✅ Can query "Tim Anders" and get full patient object
✅ Tim has 10+ session notes with realistic SOAP content
✅ Tim has 3+ upcoming appointments
✅ Tim has PHQ-9 scores for outcome chart

**Dependencies:** None (can start immediately)

---

#### 🟩 AGENT 2: Next.js Setup
**Owner:** Antigravity (UI specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Next.js 14 project initialized
- [ ] Tailwind CSS + shadcn/ui configured
- [ ] Design system CSS variables (NO PURPLE enforcement)
- [ ] Akkurat LL font loaded
- [ ] Base layout.tsx with nav structure
- [ ] WidgetContainer component
- [ ] Responsive breakpoints configured (lg: 1024px)

**Acceptance Criteria:**
✅ `npm run dev` starts successfully
✅ Design system colors render correctly
✅ Base layout shows nav sidebar
✅ NO PURPLE anywhere

**Dependencies:** None (can start immediately)

---

#### 🟨 AGENT 3: Voice Integration
**Owner:** Claude Code (Integration specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Web Speech API wrapper (`/lib/voice.ts`)
- [ ] Voice command parser for: "show me [name]"
- [ ] Voice command parser for: "reschedule [X] to [time]"
- [ ] Visual listening indicator component
- [ ] Display recognized text on screen
- [ ] Wake word: "Tebra, [command]"

**Acceptance Criteria:**
✅ Browser prompts for mic permission
✅ Can recognize "Tebra, show me Tim Anders"
✅ Recognized text displays on screen
✅ Handles noise/errors gracefully

**Dependencies:** Agent 2 (Next.js setup) must complete first

---

#### 🟧 AGENT 4: Home Dashboard
**Owner:** Antigravity (UI specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Home page layout (2x2 grid, responsive to 1x4 mobile)
- [ ] Widget 1: Today's Schedule (5 appointments with mock data)
- [ ] Widget 2: Messages (6 threads with channel icons)
- [ ] Widget 3: Tasks (4 substrate tasks)
- [ ] Widget 4: Financial Health (simple Recharts line chart)
- [ ] All widgets use WidgetContainer
- [ ] Responsive at 375px, 768px, 1280px

**Acceptance Criteria:**
✅ Dashboard renders with 4 widgets
✅ Widgets show realistic mock data
✅ Responsive grid works on mobile
✅ All touch targets 44px minimum

**Dependencies:** Agent 2 (Next.js + WidgetContainer) must complete first

---

### **Afternoon Session (1 PM - 5 PM)**

#### 🔵 INTEGRATION AGENT: Voice → Navigation
**Owner:** Claude Code + Antigravity (Pair)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Wire voice commands to Next.js router
- [ ] "show me [name]" → search patients → navigate to patient/[id]
- [ ] Voice feedback: "Searching for Tim Anders..."
- [ ] Visual indicator when voice is listening
- [ ] Fallback: Click button if voice fails

**Acceptance Criteria:**
✅ Voice command navigates to patient page
✅ Loading state shows while searching
✅ Error handling if patient not found

**Dependencies:** Agent 1 (DB), Agent 3 (Voice API) must complete

---

#### 🟣 QA AGENT: End of Day Testing
**Owner:** Jay (Human orchestrator)
**Duration:** 1 hour
**Deliverables:**
- [ ] Test voice recognition 10x times
- [ ] Verify home dashboard responsive
- [ ] Check database has Tim Anders data
- [ ] Test voice → patient navigation
- [ ] Document any blockers for Day 2

**Acceptance Criteria:**
✅ Voice works 7/10 times (acceptable for Day 1)
✅ No critical blockers
✅ All agents delivered on time

---

## 📋 DAY 2 (FEB 3) - AGENT ASSIGNMENTS

### **Morning Session (9 AM - 12 PM)**

#### 🟦 AGENT 1: Patient 360 Header
**Owner:** Antigravity (UI specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Patient header component
  - Avatar (60px, realistic photo or initials)
  - Name, session type, pronouns
  - Contact info (email, phone)
  - Next appointment CTA button
- [ ] Chart summary section
  - Chief complaint (2-3 sentences, realistic clinical text)
  - Active diagnoses with ICD-10 codes
  - Last visit summary
  - Treatment plan (1 sentence)
- [ ] "Show More" toggle for full history

**Acceptance Criteria:**
✅ Header looks professional (reference Tebra design)
✅ Clinical content reads realistically
✅ Responsive on mobile (vertical stack)

**Dependencies:** Day 1 complete (Next.js setup, DB with Tim Anders data)

---

#### 🟩 AGENT 2: Patient 360 Tabs
**Owner:** Antigravity (UI specialist)
**Duration:** 3-4 hours
**Deliverables:**
- [ ] Tabbed interface component (4 tabs)
- [ ] Tab 1: Session Notes
  - List view of 10 session notes from DB
  - Date, type, therapist, preview text
  - Click to expand full SOAP note
- [ ] Tab 2: Treatment Plan
  - Static mock content (well-written clinical plan)
  - Goals, interventions, progress
- [ ] Tab 3: Outcome Measures
  - Recharts line chart (PHQ-9 scores over 6 months)
  - Data from DB (Tim's scores)
  - Trend indicator (improving/stable/worsening)
- [ ] Tab 4: Communications
  - Static message thread UI (3-4 messages)
  - Channel icons, timestamps

**Acceptance Criteria:**
✅ Tabs switch smoothly
✅ Outcome measures chart impresses visually
✅ Session notes load from DB
✅ Mobile: tabs scroll horizontally

**Dependencies:** Agent 1 (patient header) for layout context

---

### **Afternoon Session (1 PM - 5 PM)**

#### 🟨 AGENT 3: Calendar View
**Owner:** Antigravity (UI specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Calendar page (week view OR simple day list)
- [ ] Appointment cards:
  - Patient avatar, name, time, type, status
  - Color-coded types (Intake=blue, Therapy=teal)
  - Hover shows details
- [ ] Highlight Tim Anders' next appointment (for demo)
- [ ] Visual placeholder for where appointment will move

**Acceptance Criteria:**
✅ Calendar shows realistic weekly appointments
✅ Tim's appointment is visually distinct
✅ Looks professional (reference Google Calendar)

**Dependencies:** Day 1 (DB with appointments)

---

#### 🟧 AGENT 4: Voice → Calendar Interaction
**Owner:** Claude Code (Integration specialist)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Voice parser: "reschedule [patient] [appointment] to [day] at [time]"
- [ ] Find appointment logic (match by patient name + date)
- [ ] Update appointment card position (Framer Motion)
- [ ] Visual confirmation: "Rescheduled Tim's appointment to Thursday 2pm"
- [ ] Animation: card moves to new timeslot

**Acceptance Criteria:**
✅ Voice command triggers reschedule
✅ Animation is smooth (no jank)
✅ Confirmation message displays

**Dependencies:** Agent 3 (calendar UI) must complete

---

## 📋 DAY 3 (FEB 4) - AGENT ASSIGNMENTS

### **Morning Session (9 AM - 12 PM)**

#### 🟦 AGENT 1: Simple Data Import
**Owner:** Claude Code (Backend specialist)
**Duration:** 3 hours
**Deliverables:**
- [ ] Single upload page (no wizard)
- [ ] File upload component (CSV only)
- [ ] Parse SimplePractice CSV format (hardcoded column mapping)
- [ ] Insert patients → DB
- [ ] Import success screen: "58 patients imported in 15:23"
- [ ] Show import stats (patients, appointments, notes)

**Acceptance Criteria:**
✅ Can upload real SimplePractice export CSV
✅ Data appears in DB
✅ Success screen shows realistic metrics

**Dependencies:** Day 1 (DB schema)

---

#### 🟩 AGENT 2: Navigation + Transitions
**Owner:** Antigravity (UI specialist)
**Duration:** 2 hours
**Deliverables:**
- [ ] Left sidebar navigation (8 items)
- [ ] Active state highlighting (Growth Teal)
- [ ] Voice-triggered nav visual feedback
- [ ] Page transitions (Framer Motion fade)
- [ ] Smooth scrolling

**Acceptance Criteria:**
✅ Nav items highlight on click
✅ Voice commands trigger nav highlight
✅ Transitions don't jank

**Dependencies:** Day 2 complete

---

### **Afternoon Session (1 PM - 5 PM)**

#### 🟨 AGENT 3: SOAP Note Mock + Animation
**Owner:** Antigravity (UI specialist)
**Duration:** 2 hours
**Deliverables:**
- [ ] Pre-write 3 excellent SOAP notes for Tim Anders
- [ ] Voice command: "Generate SOAP note" → trigger animation
- [ ] Typewriter effect OR fade-in animation (Framer Motion)
- [ ] Realistic clinical content:
  - Subjective: Patient's words
  - Objective: Therapist observations
  - Assessment: Clinical impression
  - Plan: Next steps
- [ ] "Sign & Lock" button (static, no backend)

**Acceptance Criteria:**
✅ SOAP generation looks magical
✅ Clinical content reads professionally
✅ Animation is smooth and impressive

**Dependencies:** Day 2 (Patient 360 tabs)

---

#### 🟧 AGENT 4: Full Demo Flow Testing
**Owner:** Jay + All Agents (Integration test)
**Duration:** 2-3 hours
**Deliverables:**
- [ ] Test full demo sequence:
  1. Start on home dashboard
  2. Voice: "show me Tim Anders"
  3. Patient 360 loads
  4. Voice: "reschedule his next appointment to Thursday 2pm"
  5. Calendar opens, appointment moves
  6. Voice: "show his last session note"
  7. SOAP note appears
- [ ] Fix any navigation issues
- [ ] Ensure data consistency (Tim has all required data)
- [ ] Time the demo (target: <2:30)

**Acceptance Criteria:**
✅ Full demo completes without errors
✅ All voice commands work
✅ Timing is under 3 minutes
✅ No visual glitches

**Dependencies:** All Day 3 agents complete

---

## 📋 DAY 4 (FEB 5) - POLISH + REHEARSAL

### **Morning Session (9 AM - 12 PM)**

#### 🟦 AGENT 1: Visual Polish
**Owner:** Antigravity (UI specialist)
**Duration:** 3 hours
**Deliverables:**
- [ ] Responsive audit:
  - Test at 375px (mobile)
  - Test at 768px (tablet)
  - Test at 1280px (demo resolution)
- [ ] Fix any horizontal scroll issues
- [ ] Verify all touch targets 44px
- [ ] Design system compliance:
  - NO PURPLE anywhere
  - All colors use CSS variables
  - Consistent spacing
- [ ] Animation polish:
  - Remove any jank
  - Ensure 60fps
  - Test on demo hardware

**Acceptance Criteria:**
✅ No responsive issues at any breakpoint
✅ Animations smooth on demo laptop
✅ Design system 100% compliant

**Dependencies:** Day 3 complete

---

#### 🟩 AGENT 2: Voice Reliability
**Owner:** Claude Code (Integration specialist)
**Duration:** 2 hours
**Deliverables:**
- [ ] Test voice recognition 20x times
- [ ] Document success rate
- [ ] Add fallback: "Click to activate voice" button
- [ ] Visual feedback improvements:
  - Show recognized text in real-time
  - Indicate when listening
  - Show processing state
- [ ] Noise handling (test in noisy room)
- [ ] Browser compatibility (Chrome, Edge)

**Acceptance Criteria:**
✅ Voice works 15/20 times (75% success rate acceptable)
✅ Fallback button always works
✅ Recognized text visible to judges

**Dependencies:** Day 3 (voice integration complete)

---

### **Afternoon Session (1 PM - 5 PM)**

#### 🟨 AGENT 3: Demo Assets + Backup Plans
**Owner:** Jay (Human orchestrator)
**Duration:** 2 hours
**Deliverables:**
- [ ] Record backup video:
  - Voice commands working perfectly
  - Full demo flow
  - High quality screen recording
- [ ] Screenshots:
  - Each step of demo
  - Code walkthrough slides (CLAUDE.md, schema.sql)
- [ ] Prepare code examples:
  - Voice integration code snippet
  - RLS policy example (even if not enforced)
  - Channel-agnostic messaging schema
- [ ] Print demo script (large font)
- [ ] Test demo on presentation laptop

**Acceptance Criteria:**
✅ Backup video ready if voice fails
✅ Code walkthrough prepared
✅ Demo runs on presentation hardware

**Dependencies:** Day 4 polish complete

---

#### 🟧 AGENT 4: Rehearsal Coordination
**Owner:** Jay (Human orchestrator)
**Duration:** 3 hours
**Deliverables:**
- [ ] Full demo run #1:
  - Time it (stopwatch)
  - Note any stumbles
  - Check pacing
- [ ] Refinement:
  - Adjust timing
  - Smooth transitions
  - Practice talking points
- [ ] Full demo run #2:
  - Record for review
  - Get feedback (show to teammate?)
  - Identify weak spots
- [ ] Full demo run #3:
  - Perfect execution
  - Confident delivery
  - Under 3 minutes

**Acceptance Criteria:**
✅ Demo rehearsed 3x minimum
✅ Timing consistently under 2:50
✅ Confident with talking points
✅ Ready to win

**Dependencies:** All agents complete

---

## 🚀 EXECUTION CHECKLIST

### Pre-Day 1 (Tonight, Feb 1)
- [ ] Read full 4-day sprint plan
- [ ] Prepare SimplePractice sample CSV (or create realistic test data)
- [ ] Set up workspace (dual monitors, quiet room)
- [ ] Confirm Supabase account ready
- [ ] Confirm demo laptop ready

### Day 1 Evening Checkpoint
- [ ] Database operational with Tim Anders data
- [ ] Voice recognition working (even if rough)
- [ ] Home dashboard rendering
- [ ] NO PURPLE visible anywhere

### Day 2 Evening Checkpoint
- [ ] Patient 360 page impresses
- [ ] Voice → patient navigation works
- [ ] Calendar shows appointments
- [ ] Voice → reschedule works (even if buggy)

### Day 3 Evening Checkpoint
- [ ] Full demo flow completes end-to-end
- [ ] Import success screen shows metrics
- [ ] SOAP note animation works
- [ ] Timing under 3 minutes

### Day 4 Evening Checkpoint
- [ ] Visual polish complete
- [ ] Voice reliable OR backup video ready
- [ ] Demo rehearsed 3x
- [ ] Confident and ready to present

---

## 🎯 AGENT SUCCESS METRICS

Each agent is successful if:
1. ✅ Deliverables completed on time
2. ✅ Acceptance criteria met
3. ✅ No blockers for dependent agents
4. ✅ Code/UI quality matches hackathon standards (good enough, not perfect)

---

## 📞 COORDINATION PROTOCOL

### Morning Standup (9 AM)
1. Launch parallel agents for the day
2. Review dependencies
3. Identify any blockers from previous day

### Midday Check-in (12 PM)
1. Verify morning agents completed
2. Test integration points
3. Launch afternoon agents

### Evening Standup (5 PM)
1. Demo progress
2. Test integrated features
3. Plan tomorrow's agents
4. Update todo list

### Communication
- **Blockers:** Flag immediately in conversation
- **Questions:** Ask in project context
- **Progress:** Update todos after each agent completes

---

## 🏆 THE MANTRA

**"Parallel agents, ruthless prioritization, mic drop moment."**

- If it's not in the 3-minute demo script, it doesn't get built.
- If an agent can work in parallel, launch them simultaneously.
- If a feature doesn't make judges say "wow," cut it.
- Voice commands + impressive UI + real data = Victory.

---

**Ready to swarm. Let's ship this. 🚀**

Last Updated: Feb 1, 2026
Next Update: Feb 2, 9 AM (Agent Launch)
