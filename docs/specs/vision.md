# Long-term vision

> **Horizon:** long-term  
> **Status:** reference — not default implementation scope

## Summary

Events platform for Canadian nonprofits supporting registrations, event lifecycle management, attendance, and communications. Production deployment must eventually address Canadian data residency expectations.

## Audience

- Canadian nonprofit organizations
- Event organizers, staff, and attendees

## Long-term capabilities

- CMS-like admin for content and event editing
- Event creation, scheduling, and management
- Registration and attendee management
- Attendance tracking
- Communications (email/notifications)

## Compliance direction

- Personal data may include attendee info, registration details, contact info, organizational data
- Production goal: store client personal data in Canada where practicable
- Relevant context: PIPEDA, provincial laws (BC, Alberta, Quebec), funder/board expectations
- Must account for: backups, logs, support access, subprocessors, analytics — **vendor confirmation required before production**
- **Prototype:** Supabase `ca-central-1` is approved for build/test with fake data and guardrails (see demo.md); not approved for real attendee/member data until vendor confirms residency details

## Stack

- **Prototype (current):** Supabase Canada Central (`ca-central-1`) + Next.js API routes
- **Production (TBD):** May migrate to custom Canadian-hosted Postgres + backend if Supabase does not meet production compliance
- Auth, file storage, email: TBD with residency review

## Status

Reference for naming, architecture direction, and client conversations. Do not implement unless explicitly requested.
