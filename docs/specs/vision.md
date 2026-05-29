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
- Must account for: backups, logs, support access, subprocessors, analytics — **research needed before production**
- Demo does not need to satisfy these requirements

## Stack (under consideration)

- Backend/database: Supabase vs Canadian-hosted Postgres + custom backend — **not decided**
- Auth, file storage, email: TBD with residency review

## Status

Reference for naming, architecture direction, and client conversations. Do not implement unless explicitly requested.
