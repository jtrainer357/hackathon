# 🚀 HACKATHON 4-DAY SPRINT PLAN
## "Voice-First Magic + Real Engineering"

**Timeline:** Feb 2-5, 2026 (Demo: Friday Feb 6/7 AM)
**Demo Length:** 3 minutes
**Strategy:** Multi-Agent Swarming + Ruthless Prioritization

---

## 🎯 THE MIC DROP MOMENT (3-Min Demo Script)

### Opening (20 sec)
*"Today's Tebra: 48 clicks, 9 minutes to check in a patient. Watch this."*

### The Magic (90 sec)
1. **Voice:** "Tebra, show me Tim Anders"
   → Patient 360 loads instantly (rich data, charts, history)

2. **Voice:** "Reschedule his next appointment to Thursday at 2pm"
   → Calendar opens, appointment moves smoothly

3. **Voice:** "Show his last session note"
   → SOAP note appears (pre-written, beautifully formatted)

4. *(Optional)* **Voice:** "What's his treatment progress?"
   → Outcome measures chart highlights

### Technical Credibility (60 sec)
5. **Show:** "This isn't smoke and mirrors. We imported 58 real patients in 15 minutes."
   → Show import wizard success screen

6. **Show:** "The code is enterprise-grade."
   → Quick screen of CLAUDE.md + RLS policies + TypeScript

### Closing (10 sec)
*"Zero clicks. Natural language. AI-native. This is the future of healthcare software."*

---

## 🏗️ BUILD PRIORITIES (What Actually Needs to Work)

### TIER 1: MUST BUILD (No Mocking)
1. ✅ Voice command integration (Web Speech API)
2. ✅ Voice → Patient navigation (speech recognition + routing)
3. ✅ Patient 360 page (avatar, chart summary, tabs, outcome measures chart)
4. ✅ Home dashboard (4 widgets with rich data)
5. ✅ Simple calendar view (appointment cards)
6. ✅ Voice → Calendar interaction (highlight + move appointment)
7. ✅ Basic data import (CSV → Database, prove data is real)
8. ✅ Database with 58 realistic patients + appointments + notes

### TIER 2: SMART MOCKS (Looks Real, Minimal Backend)
1. 🎭 SOAP note generation (pre-written content, animate appearance)
2. 🎭 Outcome measures (static Recharts chart, realistic data)
3. 🎭 Message inbox (static list, no real messaging)
4. 🎭 Calendar appointment rescheduling (just update one div, no DB write)

### TIER 3: CUT (Not in Demo)
1. ❌ Multi-step import wizard (8 steps → 1 upload page)
2. ❌ Gemini AI column mapping (pre-map the CSV manually)
3. ❌ Document extraction/matching
4. ❌ Real-time messaging backend
5. ❌ Complex calendar logic (week view, recurring appts)
6. ❌ Care/recording page
7. ❌ Visit summary/billing
8. ❌ Auth (demo user pre-logged in)

---

## 📅 4-DAY SPRINT BREAKDOWN

### **DAY 1 (Feb 2) - FOUNDATION + VOICE**
**Goal:** Database operational, Voice commands working, Basic nav
**Status:** ✅ COMPLETE

#### Morning - Agent 1: Database (Claude Code)
- [x] Supabase project setup
- [x] Core schema: `practices`, `users`, `patients`, `appointments`, `session_notes`
- [x] Seed database: 58 realistic patients, 200+ appointments, 150 session notes
- [x] No RLS (we're pre-logged in for demo)
- **Deliverable:** Can query patients via API ✅

#### Morning - Agent 2: Next.js Setup (Antigravity)
- [x] Next.js 14 + Tailwind + shadcn
- [x] Design system CSS variables (NO PURPLE)
- [x] Akkurat LL font integration
- [x] Base layout with nav
- **Deliverable:** Clean boilerplate running ✅

#### Afternoon - Agent 3: Voice Integration (Claude Code)
- [x] Web Speech API setup
- [x] Voice command parser: "show me [name]" → patient search
- [x] Voice command: "reschedule [appointment] to [time]" → calendar update
- [x] Voice feedback system (visual indicator when listening)
- **Deliverable:** Voice → navigation works ✅

#### Afternoon - Agent 4: Home Dashboard (Antigravity)
- [x] 2x2 widget grid (responsive)
- [x] Widget 1: Today's Schedule (5 appointments, realistic data)
- [x] Widget 2: Messages (6 threads, channel icons)
- [x] Widget 3: Tasks (4 substrate tasks)
- [x] Widget 4: Financial Health (simple chart)
- **Deliverable:** Home page looks polished ✅

**End of Day 1:** ✅ Voice commands recognize patient names ✅ Home dashboard renders

---

### **DAY 2 (Feb 3) - PATIENT 360 + CALENDAR**
**Goal:** Impressive Patient 360 page, Calendar view for rescheduling demo
**Status:** ✅ COMPLETE

#### Morning - Agent 1: Patient 360 Header + Chart (Antigravity)
- [x] Patient header: avatar (60px), name, session type, pronouns, contact
- [x] Chart summary: chief complaint, treatment plan, active diagnoses
- [x] Chief complaint: 2-3 sentences of realistic clinical text
- [x] Last visit summary with date
- **Deliverable:** Patient header looks professional ✅

#### Morning - Agent 2: Patient 360 Tabs (Antigravity)
- [x] Tabbed interface: Session Notes | Treatment Plan | Outcome Measures | Communications
- [x] Tab 1: Session notes list (10 realistic SOAP notes from DB)
- [x] Tab 2: Treatment plan (static mock, well-written)
- [x] Tab 3: Outcome measures chart (Recharts line chart, PHQ-9 scores over time)
- [x] Tab 4: Message thread (static UI, 3-4 messages)
- **Deliverable:** Patient 360 is the star of the show ✅

#### Afternoon - Agent 3: Calendar View (Antigravity)
- [x] Week view grid OR simple list view
- [x] Appointment cards: patient avatar, name, time, type, status
- [x] Color-coded types (Intake=blue, Therapy=teal)
- [x] Highlight target appointment for voice demo
- **Deliverable:** Calendar looks realistic ✅

#### Afternoon - Agent 4: Voice → Calendar Logic (Claude Code)
- [x] Parse: "reschedule [X] to [day] at [time]"
- [x] Find appointment by patient name + date
- [x] Update appointment card position (Framer Motion)
- [x] Visual confirmation animation
- **Deliverable:** Voice reschedule works smoothly ✅

**End of Day 2:** ✅ Patient 360 impresses ✅ Voice reschedule works

---

### **DAY 3 (Feb 4) - IMPORT + DEMO FLOW**
**Goal:** Prove data is real, polish demo transitions
**Status:** 🚀 AHEAD OF SCHEDULE (Import Done)

#### Morning - Agent 1: Simple Import (Claude Code + Antigravity)
- [x] Single upload page (Wizard implemented!)
- [x] Upload SimplePractice CSV
- [x] AI column mapping (Gemini 1.5 Flash integrated!)
- [x] Parse CSV → insert into DB
- [x] Success screen: "58 patients imported"
- **Deliverable:** Can import real CSV ✅

#### Morning - Agent 2: Navigation + Transitions (Antigravity)
- [x] Left sidebar nav (8 items)
- [ ] Active state highlighting
- [x] Voice-triggered navigation (visual feedback)
- [ ] Page transitions (Framer Motion, smooth)
- **Deliverable:** Navigation feels polished 🔄

#### Afternoon - Agent 3: SOAP Note Mock (Antigravity)
- [ ] Pre-write 3-5 excellent SOAP notes for demo patients
- [ ] "Generate SOAP note" voice command → animate note appearing
- [ ] Use Framer Motion for typewriter effect OR fade-in
- [ ] Realistic clinical content (chief complaint, assessment, plan)
- **Deliverable:** SOAP generation looks magical

#### Afternoon - Agent 4: Demo Flow Testing (Jay + All Agents)
- [ ] Test full demo sequence: Home → Voice → Patient 360 → Calendar → SOAP
- [ ] Fix any navigation issues
- [ ] Ensure data consistency (demo patient has appointments, notes, etc.)
- **Deliverable:** Full demo flow works end-to-end

**End of Day 3:** ✅ Import proves data is real ✅ Full demo flow smooth

---

### **DAY 4 (Feb 5) - POLISH + REHEARSAL**
**Goal:** Demo-ready, backup plans in place, rehearsed 3x

#### Morning - Agent 1: Visual Polish (Antigravity)
- Responsive audit (375px, 768px, 1280px)
- Animation polish (60fps, no jank)
- Design system compliance (NO PURPLE check)
- Loading states, hover states
- **Deliverable:** UI looks professional

#### Morning - Agent 2: Voice Reliability (Claude Code)
- Test voice recognition 20x times
- Add fallback: Click button if voice fails
- Visual feedback (listening indicator, recognized text display)
- Noise handling (show recognized text so judges see it working)
- **Deliverable:** Voice is reliable OR has smooth backup

#### Afternoon - Agent 3: Demo Assets (Jay)
- Record backup video of voice commands (if live fails)
- Screenshot each demo step
- Prepare code walkthrough (CLAUDE.md, schema.sql, key files)
- Print demo script
- **Deliverable:** Backup plan ready

#### Afternoon - Agent 4: Rehearsal (All)
- Full demo run #1: Time it (target: 2:45 to leave buffer)
- Full demo run #2: Fix stumbles
- Full demo run #3: Perfect run
- Test on demo laptop/setup
- **Deliverable:** Confident, polished delivery

**End of Day 4:** ✅ Demo rehearsed 3x ✅ Backup plans ready ✅ Ready to win

---

## 🤖 MULTI-AGENT SWARMING STRATEGY

### Agent Assignments
Each agent works **in parallel** on independent tasks:

**Agent 1: Backend/Database (Claude Code Focus)**
- Supabase setup, schema, seed data
- Voice command parsing logic
- API routes (minimal: patient search, appointment update)
- Import CSV processing

**Agent 2: UI/Frontend (Antigravity Focus)**
- Next.js setup, design system
- Home dashboard, Patient 360, Calendar pages
- Responsive design, animations
- Component library

**Agent 3: Integration (Claude Code + Antigravity)**
- Voice API integration
- Voice → navigation wiring
- Voice → calendar interaction
- Demo flow coordination

**Agent 4: Assets/QA (Jay + Agents)**
- Demo data preparation (realistic CSV)
- Code documentation (CLAUDE.md)
- Rehearsal coordination
- Backup videos/screenshots

### Parallel Execution Schedule
**Day 1 Morning:** Launch 2 agents (Database + Next.js setup)
**Day 1 Afternoon:** Launch 2 agents (Voice integration + Home dashboard)
**Day 2 Morning:** Launch 2 agents (Patient header + tabs)
**Day 2 Afternoon:** Launch 2 agents (Calendar + voice logic)
**Day 3 Morning:** Launch 2 agents (Import + nav)
**Day 3 Afternoon:** Launch 2 agents (SOAP mock + demo testing)
**Day 4:** Sequential polish + rehearsal

---

## ✅ DEMO READINESS CHECKLIST

### Technical Must-Haves
- [ ] Voice recognizes: "show me [patient name]"
- [ ] Voice recognizes: "reschedule [appointment] to [time]"
- [ ] Patient 360 loads with rich data (<1 sec)
- [ ] Calendar shows realistic appointments
- [ ] Outcome measures chart displays
- [ ] Import success screen shows "58 patients"
- [ ] No console errors during demo
- [ ] Responsive at 1280px (demo resolution)

### Demo Flow Must-Haves
- [ ] Demo patient "Tim Anders" exists with full data
- [ ] Tim has next appointment to reschedule
- [ ] Tim has recent SOAP note to display
- [ ] Tim has outcome measures chart data
- [ ] Voice feedback shows recognized text
- [ ] Transitions are smooth (no loading spinners)

### Backup Plans
- [ ] Pre-recorded voice command video
- [ ] Screenshots of each demo step
- [ ] Local demo environment (no internet needed)
- [ ] Backup laptop with demo loaded
- [ ] Printed demo script

### Code Quality (30 sec walkthrough)
- [ ] CLAUDE.md exists (architecture doc)
- [ ] Database schema visible (show multi-tenancy design)
- [ ] One RLS policy example (even if not enforced)
- [ ] TypeScript strict mode enabled
- [ ] Clean folder structure

---

## 🚨 RISK MITIGATION (4-Day Sprint)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Voice API fails during demo | High | Critical | Pre-recorded video backup, show recognized text on screen |
| Import takes too long | Medium | Medium | Use smaller dataset (20 patients), or pre-populate DB and show success screen |
| Patient 360 not impressive | Low | High | Focus Day 2 entirely on this, use realistic clinical data |
| Animation jank | Medium | Medium | Test on demo hardware, simplify animations if needed |
| Scope creep | High | High | **RUTHLESSLY cut anything not in 3-min script** |

---

## 🎯 SUCCESS METRICS

### Minimum Viable Demo (Must Achieve)
- ✅ Voice command works (live or video backup)
- ✅ Patient 360 looks professional
- ✅ Data import proven (success screen)
- ✅ Demo completes in <3 min
- ✅ Zero technical hiccups

### Stretch Goals (Bonus Points)
- 🎯 Voice works live (not backup video)
- 🎯 Two voice interactions (navigate + reschedule)
- 🎯 Outcome measures chart impresses
- 🎯 Code walkthrough highlights real innovation

### Hackathon Win Criteria
1. **Wow Factor:** Voice interaction feels magical
2. **Technical Credibility:** Import + code quality prove it's real engineering
3. **Execution:** Polished, confident, no stumbles
4. **Impact:** Judges remember "the voice-controlled EHR"

---

## 📞 DAILY STANDUP (9 AM & 5 PM)

### Morning (9 AM)
- Review yesterday's completed tasks
- Launch parallel agents for today
- Identify blockers
- Update todo list

### Evening (5 PM)
- Demo progress (show working features)
- Test integration points
- Plan tomorrow's agents
- Red flag any risks

---

## 🏆 THE MANTRA

**"Ship the mic drop moment. Mock everything else."**

If it's not in the 3-minute script, it doesn't exist.
If it doesn't make judges say "wow," cut it.
Voice commands + impressive UI + real data = Victory.

---

**Let's win this thing. 🚀**

Last Updated: Feb 2, 2026 (Day 2 Complete)
Next Update: Feb 4, 9 AM (Day 3 Kickoff)
