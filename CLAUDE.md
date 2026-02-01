# CLAUDE.md - Tebra Mental Health MVP

> **CONTEXT ISOLATION RULE**: This project is COMPLETELY SELF-CONTAINED. Never reference other Claude projects or conversations. All context is provided here.

---

## PROJECT IDENTITY

**Project:** Tebra Mental Health MVP (MHMVP)  
**Purpose:** Hackathon POC demonstrating UX transformation + AI engineering excellence  
**Quality Bar:** Production-ready, enterprise-grade code  
**Repository:** github.com/jtrainer357/hackathon  
**Owner:** Jay Trainer (UX Strategy & Prototype Lead)  

---

## WHAT WE'RE BUILDING

**The Problem:**
- Solo mental health practitioners spend 15-20 min/patient on documentation
- 30-40% of day consumed by admin tasks
- Fragmented EHRs with constant context switching

**Our Solution:**
- **Patient-as-Central-Object:** Data organizes around patient records, not modules
- **AI Substrate Intelligence:** Background AI generates SOAP notes from ambient recording
- **Voice-First Interface:** "Hey Tebra" commands
- **80%+ Documentation Reduction:** From 15-20 min to 2-3 min per patient

---

## MANDATORY TECH STACK

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (App Router), TypeScript strict |
| Styling | Tailwind CSS + shadcn/ui (Tebra Design System) |
| Backend | Supabase (Auth, PostgreSQL, RLS, Realtime) |
| AI Speech | Deepgram (speech-to-text) |
| AI Generation | Gemini 2.0 Flash (SOAP notes, voice assistant) |
| AI TTS | OpenAI TTS-1 |
| Voice Detection | Web Speech API ("Hey Tebra") |
| Icons | hugeicons-react |
| Animation | Framer Motion |
| Fonts | Akkurat LL (Tebra proprietary) |

---

## DESIGN SYSTEM RULES (NON-NEGOTIABLE)

### Color Palettes (CSS Variables ONLY)

| Palette | Usage | Example |
|---------|-------|---------|
| **Growth** (Teal) | Primary brand, AI features, nav active | `bg-growth-2` |
| **Vitality** (Coral) | Primary action buttons, CTAs | `bg-vitality-1` |
| **Backbone** | Warm neutral backgrounds | `bg-backbone-1` |
| **Synapse** | Grayscale, text hierarchy | `text-synapse-6` |

### 🚫 ABSOLUTE PROHIBITIONS

1. **NO PURPLE ANYWHERE** - Growth Teal is the ONLY AI color
2. **NO HARDCODED HEX** - Always use CSS variables
3. **NO WIDGETS WITHOUT WidgetContainer** - Every widget uses the shell

### Required Patterns

```tsx
// ✅ CORRECT - WidgetContainer for all widgets
<WidgetContainer title="Today's Schedule">
  {/* content */}
</WidgetContainer>

// ✅ CORRECT - CSS variables
className="bg-growth-2 text-synapse-6"

// ❌ WRONG - hardcoded hex
style={{ color: '#DC7B5D' }}
```

---

## RESPONSIVE DESIGN (MANDATORY)

### Mobile-First Breakpoints

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (none) | 0px (default) |
| sm | `sm:` | 640px |
| md | `md:` | 768px |
| lg | `lg:` | 1024px |
| xl | `xl:` | 1280px |

### Touch Targets
- ALL buttons: `h-11` (44px) minimum
- ALL nav items: `min-h-[48px]`
- ALL list items: 48px minimum height

### Navigation by Viewport
- **Mobile (0-1023px):** Bottom tab bar + hamburger menu
- **Desktop (1024px+):** Left sidebar (lg:w-64 xl:w-72)

### Grid Strategy
```tsx
// ✅ Mobile-first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="flex flex-col sm:flex-row"
className="w-full sm:w-auto"
```

---

## MVP FEATURE SCOPE

### IN-SCOPE (Build These)

**Core Navigation (8 items):**
- Home, Patient, Calendar, Communications, Care, Billing (read-only), Marketing (read-only), Notifications

**Home Page (4 Widgets):**
- Today's Schedule
- Messages/Inbox
- Today's Tasks (substrate-generated)
- Practice Financial Health

**Patient Page:**
- Left: Patient roster with search
- Top: Patient header (name, contact, next appointment)
- Middle: Chart summary with "show more"
- Bottom tabs: Session Notes, Treatment Plan, Outcome Measures, Communications

**Care Page (Session Workflow):**
- Active Recording State: Pulsing indicator, timer, wave animation
- Note Review State: Editable SOAP sections, metadata panel
- Visit Summary: Invoice, shared vs. private content

### OUT-OF-SCOPE (Do NOT Build)
- ❌ Active billing workflow (read-only only)
- ❌ Marketing active management
- ❌ Multi-user collaboration
- ❌ Video telehealth
- ❌ Patient self-service portal

---

## ARCHITECTURE PRINCIPLES

1. **Patient-as-Central-Object** - ALL data organizes around patient
2. **Intelligence in Substrate** - AI runs in background, not chatbot
3. **HITL (Human-in-the-Loop)** - AI never submits without approval
4. **Multi-Tenant Security** - PostgreSQL RLS enforces practice isolation

---

## PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| Context Switch | <100ms |
| Page Load (TTI) | <2 seconds |
| AI Response | <500ms |
| Note Generation | <60 seconds post-session |
| System Uptime | 99.9%+ |

---

## CLINICAL DOMAIN

### Outcome Measures (MVP)
- PHQ-9: Depression (0-27)
- GAD-7: Anxiety (0-21)
- PCL-5: Trauma (0-80)
- AUDIT-C: Substance use (0-12)

### CPT Codes (MVP)
- 90834: Individual Psychotherapy (30 min)
- 90837: Individual Psychotherapy (45 min)
- 90836: Individual Psychotherapy (50-59 min) ← PRIMARY

---

## VOICE COMMANDS

| Command | Action |
|---------|--------|
| "Tebra, show me [Patient]" | Opens Patient 360 view |
| "Tebra, start session with [Patient]" | Begins recording |
| "That ends our session" | Stops recording, triggers note generation |

---

## PROJECT FILES

- `MHMVP_Project_Instructions_v2.md` - Full project instructions
- `mhmvp-prd-013126.md` - Complete PRD with detailed specs

---

## CHECKLIST (Before ANY Feature)

- [ ] Uses Patient-as-Central-Object architecture?
- [ ] Uses correct color tokens (NO PURPLE)?
- [ ] Is it in-scope for MVP?
- [ ] Does AI action have HITL confirmation?
- [ ] Uses WidgetContainer for widgets?
- [ ] Mobile-first responsive (base = mobile)?
- [ ] Touch targets 44px+ minimum?
- [ ] Uses CSS variables (no hardcoded hex)?
