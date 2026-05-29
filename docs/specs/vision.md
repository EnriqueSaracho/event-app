# Long-term vision

> **Horizon:** long-term  
> **Status:** reference — not default implementation scope

## Summary

Events platform for Canadian nonprofits supporting registrations, event lifecycle management, attendance, and communications. Production deployment must eventually address Canadian data residency expectations.

## Audience

- Canadian nonprofit organizations
- Event organizers, staff, and attendees

## Long-term capabilities

- In-event attendee experience: agenda, sponsors/exhibitors, member directory, saved sessions
- CMS-like admin for content and event editing (prototype admin is lower fidelity — mock/static UI only)
- Event creation, scheduling, and management
- Registration and attendee management
- Attendance tracking
- Communications (email/notifications)

## Client-requested capabilities (long-term)

PM intentionally excluded these from prototype v1 to keep the build focused; client has expressed interest:

- **Push notifications**
- **Badge generation**
- **Seat registration** — register seats now, add attendee names later

## Reference / competitive context

Named competitors for inspiration and positioning reference only (not build targets):

- **Whova**, **PheedLoop**, **EventMobi**

PM maintains separate docs on pricing, licensing, vendor comparison, proposal strategy, and client positioning — detailed comparison lives outside this repo unless added later.

**Positioning guardrails:**

- Not building a full Whova clone or all-in-one event platform replacement
- Differentiate on Canadian nonprofit needs, data residency path, and tailored workflow — not feature parity with incumbents

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
