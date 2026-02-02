# MHMVP Post-Hackathon Improvements

**Generated:** February 2, 2026
**Based on:** Comprehensive code quality audit (Score: 98/120)

## Before Production

### Authentication & Authorization
- [ ] Implement Supabase Auth login/signup flow in `src/app/(auth)/login/`
- [ ] Add `middleware.ts` for session validation on protected routes
- [ ] Add auth checks to all 9 API routes
- [ ] Set `app.current_practice_id` from auth context for messaging RLS

### Security Hardening
- [ ] Add rate limiting to remaining 7 API routes (messages, substrate, webhooks)
- [ ] Add audit logging to remaining 6 API routes (messages GET, substrate tasks, webhooks)
- [ ] Replace mock Twilio/SendGrid with real SDK calls
- [ ] Implement webhook retry handling
- [ ] Add CORS configuration for production domain

### Accessibility
- [ ] Add `aria-label` to icon-only buttons in NavigationRail and BottomNavigation
- [ ] Add skip-to-content link to root layout
- [ ] Run axe DevTools audit and fix all critical/serious violations
- [ ] Test full keyboard navigation flow
- [ ] Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 for text)

### Performance
- [ ] Parallelize patient detail DB queries (4 sequential → Promise.all)
- [ ] Add `dynamic()` imports for heavy components (Recharts, Framer Motion)
- [ ] Configure `@next/bundle-analyzer`
- [ ] Add virtualization for long patient lists

## Testing

- [ ] Add API route tests for all 9 endpoints
- [ ] Add component tests for: PatientList, ImportWizard, MessageThread, TasksWidget
- [ ] Add E2E tests with Playwright for critical flows:
  - [ ] Patient search → patient detail → SOAP note view
  - [ ] Import wizard: upload → mapping → preview → commit
  - [ ] Compose and send message
- [ ] Target: 60% overall coverage

## Technical Debt

- [ ] Add JSDoc to exported functions in `src/lib/substrate/`, `src/lib/ai/`, `src/lib/messaging/`
- [ ] Implement message status update in Twilio status webhook (currently TODO)
- [ ] Add monitoring and error tracking (Sentry)
- [ ] Create OpenAPI spec for API routes
- [ ] Add database migration rollback scripts

## Phase 2 Features

- [ ] Real-time collaborative SOAP note editing
- [ ] Batch patient import with progress tracking
- [ ] Advanced search with filters (diagnosis, date range, provider)
- [ ] Patient portal for secure messaging
- [ ] Automated appointment reminders via SMS/email
- [ ] Clinical decision support alerts
- [ ] Report generation and export (PDF/CSV)
