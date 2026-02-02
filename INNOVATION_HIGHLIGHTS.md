# Innovation Highlights

## 1. Patient-as-Central-Object Architecture

**The problem:** Traditional EHRs organize around modules (scheduling, billing, notes). Therapists constantly context-switch between disconnected screens to answer one question: "What's going on with this patient?"

**Our approach:** Every table in the database references a patient UUID. The UI renders a 360-degree patient view where appointments, SOAP notes, outcome measures, and treatment plans coexist on a single screen. Navigate to a patient and everything is there.

**Impact:** Context switches drop from 5-7 clicks to zero. The data model matches the mental model of a solo practitioner.

## 2. Voice-First Interface

**The problem:** Therapists type during sessions, breaking eye contact and clinical rapport. Documentation competes with care.

**Our approach:**
- **Wake word detection** -- "Hey Tebra" activates command parsing via the Web Speech API, entirely client-side with no cloud round-trip for activation
- **Natural language routing** -- "Show me Tim Anders" extracts the patient name and navigates instantly
- **Session lifecycle** -- "Start session" begins ambient recording; "That ends our session" triggers AI note generation
- **Confidence gating** -- Transcripts below 0.7 confidence are discarded; 3 consecutive failures trigger graceful fallback

**Impact:** Hands-free workflow means the therapist stays present with the patient. Documentation happens in the background.

## 3. AI-Native Data Import

**The problem:** Migrating from another EHR takes weeks of manual CSV wrangling. Column names differ between systems ("PatientFirstName" vs "first_name" vs "First Name").

**Our approach:**
- Upload any CSV from any source system (SimplePractice, TherapyNotes, etc.)
- Gemini 2.0 Flash analyzes column headers and sample rows, then produces a mapping to our schema
- The therapist reviews the AI-suggested mapping in a visual confirmation step (HITL)
- One click to commit -- patients appear in the roster immediately

**Impact:** What traditionally takes days of IT support becomes a 15-minute self-service workflow.

## 4. Multi-Agent Development: Built BY AI to Showcase AI

**The meta-innovation:** This product was built using coordinated AI agents (Claude Code) operating in parallel -- the same class of AI technology the product itself deploys for healthcare.

**How it worked:**
- A shared `CLAUDE.md` contract defined the tech stack, design system, architecture principles, and scope boundaries
- 7+ specialized agents worked concurrently: database schema, API routes, voice system, UI components, care workflows, import wizard, and documentation
- Each agent operated autonomously within its domain while respecting shared contracts
- The result: a production-quality MVP delivered in a 4-day hackathon sprint

**Why this matters:** We did not just build an AI-powered healthcare tool. We demonstrated that AI-coordinated development is a viable engineering methodology -- shipping faster, with consistent quality, and with an architecture that a single human designer could not have executed alone in the same timeframe.

---

*Built for the Tebra Mental Health MVP Hackathon -- reducing therapist documentation from 15-20 minutes to 2-3 minutes per patient.*
