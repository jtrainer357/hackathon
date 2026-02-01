# Progress Log Guidelines

To maintain the high standards required for the Tebra Mental Health MVP development, all entries in `PROGRESS_LOG.md` must adhere to the following "10x Detail" specification.

## 📝 Required Sections per Update

### 1. Executive Summary
- High-level narrative of the day's shift in architecture or strategy.
- Clear statement of major milestones achieved.

### 2. Technical Deep-Dives
- **Database Schema:** Document all table changes, field logic, RLS policies, and triggers with rationale.
- **Service Layer logic:** Explain class methods, validation rules, design patterns (e.g., Provider, Singleton), and data flow.
- **Infrastructure/Providers:** Detail specific integration specs for external vendors (Twilio, SendGrid, etc.).
- **Design System:** Document all token extractions, CSS variable mappings, and UI logic adjustments.

### 3. UI/UX Architecture
- Component-level breakdown (e.g., `MessageThread`, `AudioPlayer`).
- Responsiveness strategy (Mobile-first, Sheet overlays, etc.).
- Accessibility considerations and touch target optimizations.

### 4. Strategic Rationale
- Link every technical decision back to specific PRD goals (e.g., "Patient-as-Central-Object").
- Explain the "Why" behind the "What."

### 5. Decision & Pivot Log
- Document every pivot in direction with a "Problem vs. Solution" narrative.
- Explain why a previous approach was abandoned.
- Detail any manual or automated fixes for substrate-level issues (e.g., Gemini model updates).

### 6. Build & Deployment Status
- Checklist of deployed features.
- Verification status (Type-safety, build outcome, linting).

## 🚀 Quality Bar
- **Granularity:** If a file was created or modified, the log should explain why its specific structure matters.
- **Traceability:** Every technical choice should be traceable to a business or clinical outcome.
- **Visuals:** Use tables, mermaid diagrams (where helpful), and code snippets to illustrate complex logic.
