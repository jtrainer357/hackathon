# Post-Hackathon Improvements

## Phase 2 Features
- [ ] Implement real authentication flow (Supabase Auth with practice context)
- [ ] Add Twilio webhook signature verification (HMAC)
- [ ] Add SendGrid webhook verification (basic auth)
- [ ] Build audit logging system for PHI access tracking
- [ ] Add rate limiting middleware (10 req/min search, 5 req/min import)
- [ ] Implement real-time notifications for new messages
- [ ] Add patient document upload and management
- [ ] Build outcome measure charting (PHQ-9, GAD-7 over time)

## Technical Debt
- [ ] Enable RLS on core tables (practices, users, patients, appointments, session_notes, outcome_measures)
- [ ] Add practice_id filtering to all API queries
- [ ] Install Zod and add input validation schemas to all 8 API routes
- [ ] Replace `any` type in `src/lib/supabase/server.ts:16`
- [ ] Fix error masking — return proper HTTP status codes in substrate task routes
- [ ] Add try-catch to `src/app/api/import/[batchId]/analyze/route.ts`
- [ ] Add authentication middleware to all API routes
- [ ] Standardize API error response format across all endpoints

## Performance Optimizations
- [ ] Add database indexes on foreign keys and frequently queried columns
- [ ] Implement virtualization for patient roster (long lists)
- [ ] Add code splitting for Patient 360 tabs
- [ ] Batch Gemini API calls where possible
- [ ] Add React Query cache invalidation strategy

## Accessibility
- [ ] Add aria-labels to all filter buttons on patients page
- [ ] Add aria-labels to channel selector buttons in messaging
- [ ] Add labels to file upload input in import wizard
- [ ] Fix heading hierarchy (h1 → h2 → h3) on patients page
- [ ] Add h1 heading to home dashboard page
- [ ] Add skip-to-content link
- [ ] Test full keyboard navigation flow
- [ ] Run axe DevTools audit and fix all issues

## Testing
- [ ] Install Vitest + React Testing Library
- [ ] Add `"test"` and `"test:coverage"` scripts to package.json
- [ ] Unit tests for voice command parsing (`src/lib/voice.ts`)
- [ ] Unit tests for column mapping AI (`src/lib/ai/gemini-import.ts`)
- [ ] Integration tests for all API routes
- [ ] E2E test: SimplePractice import → Dashboard flow
- [ ] E2E test: SOAP note generation workflow
- [ ] Test error scenarios (API timeout, invalid input, auth failure)

## Documentation
- [ ] Create DEPLOYMENT.md with production checklist
- [ ] Add JSDoc to all exported functions in src/lib/
- [ ] Document API endpoints (request/response schemas)
- [ ] Add inline comments for fuzzy matching and column mapping logic
