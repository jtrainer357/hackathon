# Architecture Overview

## System Flow

```
                         Tebra Mental Health MVP
  ============================================================

  +------------------+     +------------------+     +---------+
  |  Voice Input     |---->|  Command Parser  |---->| Router  |
  |  (Web Speech API)|     |  (voice.ts)      |     | (Next.js|
  |  "Hey Tebra,     |     |  Wake word +     |     |  App    |
  |   show me Tim"   |     |  NLP extraction  |     |  Router)|
  +------------------+     +------------------+     +----+----+
                                                         |
                                                         v
  +------------------+     +------------------+     +---------+
  |  Supabase        |<----|  UI Components   |<----|  Patient |
  |  (PostgreSQL +   |     |  (React + shadcn |     |  Substrate
  |   RLS + Storage) |     |   + Framer Motion|     |  (Central|
  |                  |     |   + Tailwind)    |     |  Object) |
  +------------------+     +------------------+     +---------+
         ^                        ^
         |                        |
  +------+-------+     +----------+--------+
  |  AI Layer    |     |  Import Wizard    |
  |  Deepgram STT|     |  CSV Upload +     |
  |  Gemini Flash|     |  Gemini Column    |
  |  OpenAI TTS  |     |  Mapping          |
  +--------------+     +-------------------+
```

## Technology Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14 (App Router) | Server components, file-based routing, edge-ready |
| **Language** | TypeScript (strict) | Type safety across clinical data models |
| **Styling** | Tailwind + shadcn/ui | Tebra design tokens via CSS variables; accessible primitives |
| **Animation** | Framer Motion | Cinematic SOAP note reveal, session recording pulse |
| **Database** | Supabase (PostgreSQL) | RLS for multi-tenant isolation, realtime subscriptions, auth |
| **AI - STT** | Deepgram | Low-latency streaming transcription for session recording |
| **AI - LLM** | Gemini 2.0 Flash | Fast SOAP note generation + CSV column mapping |
| **AI - TTS** | OpenAI TTS-1 | Natural voice responses for "Hey Tebra" assistant |
| **Voice** | Web Speech API | Zero-dependency wake word detection in-browser |

## Key Design Decisions

### 1. Patient-as-Central-Object
All data (appointments, notes, measures, billing) references a patient UUID. No module silos -- the patient IS the organizing principle. This mirrors how therapists think: "What's going on with Tim?" not "Open the notes module."

### 2. Intelligence in Substrate, Not Chatbot
AI runs invisibly in the background. No chatbot window. Ambient recording produces SOAP notes; the import wizard auto-maps CSV columns. The therapist sees results, not prompts.

### 3. Human-in-the-Loop (HITL) Compliance
AI never submits clinical documentation without explicit provider approval. The "Sign & Lock" pattern ensures every AI-generated note is reviewed and sealed with a timestamp.

### 4. Voice-First, Touch-Ready
Commands like "Tebra, start session with Tim" eliminate context switching. The Web Speech API runs client-side with confidence thresholds (>0.7) and graceful degradation after 3 consecutive low-confidence results.

## Database Schema

```
practices (1)
  |-- users (N)           -- providers & staff
  |-- patients (N)        -- CENTRAL OBJECT
  |     |-- appointments (N)
  |     |-- session_notes (N)   -- SOAP format + AI metadata
  |     |-- outcome_measures (N) -- PHQ-9, GAD-7, PCL-5, AUDIT-C
  |
  |-- import_batches (N)  -- data migration tracking
        |-- import_records (N)
```

All tables carry `practice_id` for multi-tenant isolation via PostgreSQL Row Level Security.

## Multi-Agent Development

This MVP was built using a coordinated multi-agent Claude Code approach:

- **Agent Alpha** - Core schema, database migrations, seed data
- **Agent Beta** - Supabase integration, API routes, environment setup
- **Agent Gamma** - Voice system, command parsing, provider context
- **Agent Delta** - UI components, design system, responsive layout
- **Agent Epsilon** - Care workflow, SOAP generator, session recording
- **Agent Zeta** - Import wizard, AI column mapping, file upload
- **Agent Kappa** - Documentation, demo readiness, architecture

Agents operated in parallel with a shared CLAUDE.md contract defining the tech stack, design system rules, and architecture principles. The result: a production-quality MVP built in a 4-day sprint -- an AI-built product that showcases AI in healthcare.
