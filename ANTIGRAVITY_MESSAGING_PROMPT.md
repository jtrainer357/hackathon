# ANTIGRAVITY PROMPT: Scalable Messaging Architecture Implementation

## CONTEXT

You are implementing a **channel-agnostic messaging system** for the Tebra Mental Health MVP. This system must handle SMS and Email for MVP while being architecturally ready for Voice, Fax, In-App, and future channels WITHOUT refactoring.

**Key Principle:** A message is a message. The channel is just a delivery mechanism. Build around conversations with patients, not delivery mechanisms.

---

## REFERENCE DOCUMENTS

Before starting, read these files in the project:
1. `MHMVP_Project_Instructions_v2.md` - Design system rules, tech stack, architecture principles
2. `mhmvp-prd-013126` - PRD with Communications page specifications
3. `MHMVP_Messaging_Architecture.md` - Complete technical architecture (just created)

**⚠️ CRITICAL RULES FROM PROJECT INSTRUCTIONS:**
- NO PURPLE ANYWHERE - Use Growth Teal for AI features
- NO HARDCODED HEX - Use CSS variables only
- ALL WIDGETS must use `WidgetContainer` component
- Mobile-first responsive design (test at 375px, 768px, 1280px)
- Touch targets minimum 44px on mobile
- Patient-as-Central-Object architecture
- RLS tenant isolation on ALL database queries

---

## SUCCESS CRITERIA

MVP Complete when:
- [ ] Can send SMS to patient from Communications page
- [ ] Can send Email to patient from Communications page
- [ ] Inbound SMS appears in conversation
- [ ] Inbound Email appears in conversation
- [ ] Conversations filterable by channel
- [ ] Unread count updates correctly
- [ ] Mobile responsive (sheet pattern works)
- [ ] Home page Messages widget shows recent conversations
- [ ] Patient page Communications tab filters to selected patient
- [ ] All Design System rules followed

Architecture Ready for Future:
- [ ] Voice channel type exists in database
- [ ] Voice channel icon configured
- [ ] AudioPlayer component placeholder exists
- [ ] AI flag fields in schema
- [ ] Attachment table ready for MMS
