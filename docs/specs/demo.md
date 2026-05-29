# Demo scope

> **Horizon:** demo  
> **Status:** draft  
> **Goal:** Presentable MVP for client demo — not production-ready

## Summary

Build a ConcreteBC 2027 member conference / in-event attendee app prototype to demonstrate core value to the client. Use Supabase in Canada Central for seed data with fake/test content only. Prioritize screen-to-screen flows and polish; follow prototype guardrails below.

## Product framing

ConcreteBC member conference / **in-event experience** — not a generic registration signup product. Registration flows are **out of scope for in-app prototype v1** unless the team explicitly adds them.

## Context vs hackathon app

Same general app shape as the team hackathon build (prior internal demo). Main differences for ConcreteBC:

- **More pages and a richer, more detailed conference agenda** — hackathon = main event + some sessions; conference = fuller multi-session agenda across days
- Checkpoint 1A screen set reflects this broader in-event scope

## Venue note

Client said the event is **all held on the main stage**. For prototype v1, session location can be simplified (single venue/stage; no multi-room navigation logic required).

## Pre-meeting deliverables (optional, not v1 app scope)

Static HTML mockups for **registration flow** and **badge generation** may be needed for client meetings — fake data only, visual preview only. These are separate from the Checkpoint 1A Next.js app unless the team explicitly promotes them into the build.

## Navigation

Attendee app is **mobile-first** with bottom navigation: **Home → Agenda → Sponsors → Members → Saved**. Admin is a separate, desktop-oriented mock area.

## Demo flows

### Attendee
- Browse home dashboard with next-up session and quick links
- Browse and filter agenda (multi-day, categories); open session detail; save session
- Browse sponsors/exhibitors directory and profiles; bookmark profiles
- Browse privacy-safe member directory (search, role filters)
- View saved sessions with overlap warnings and empty state

### Admin (prototype v1)
- View mock content landing with queue/status cards
- View static form/detail with preview pane; mock save only — **no real CRUD or publishing**

## Pages / screens

### Attendee (Checkpoint 1A)
1. **Home / Dashboard** — event preview, next-up session, quick links (Agenda, Sponsors, Members, Resources), featured resource, fake saved/updates/reminders counts
2. **Agenda List** — multi-day tabs, category filters, session list, empty filter state
3. **Session Detail** — time/location/category, overview, resources placeholder, save session
4. **Sponsors & Exhibitors Directory** — search, category filters, listing cards
5. **Sponsor/Exhibitor Profile** — org header, categories, booth/location, overview, bookmark (no contact/outreach)
6. **Member Directory** — privacy-safe listing, role filters, search; no email, phone, photos, or org contact details
7. **Saved Sessions** — saved list, overlap conflict warning, empty state, remove actions

### Admin (mock preview)
8. **Content landing** — queue/status cards (draft, needs review, queued)
9. **Form/detail** — static title/summary/category/status fields + preview pane; mock save only

### Data approach
- Real Supabase backend (`ca-central-1`) with **fake/test data only** — no real attendee/member PII
- **Supabase seed data** for agenda, sponsors, members, and related content
- **Saved sessions:** prototype v1 default is **client-local** (not persisted in Supabase); revisit if team wants Supabase persistence
- Keep schema and code migration-friendly toward custom Canadian-hosted Postgres later

## Stack (demo)

- Next.js (App Router), TypeScript, Tailwind CSS
- Supabase in **Canada Central (`ca-central-1`)** — **prototype-only**; not approved for paid/client production with real personal data yet
- Sensitive logic in Next.js API routes (not Supabase Edge Functions for personal data)

## Prototype guardrails

- Use fake/test data only — no real names, emails, phone numbers, or registration details
- Do not use Supabase Edge Functions for personal data
- Keep sensitive logic in Next.js API routes
- Do not log names, emails, phone numbers, tokens, or private registration details
- Do not add analytics/tracking tools yet
- Keep code and database clean for possible migration to custom Canadian-hosted Postgres
- Build fast; do not make compliance promises we cannot prove yet

## Mocked vs deferred (prototype v1)

**Mocked:** UI flows, fake data cards, screen-to-screen navigation

**Deferred (Track B / later):** auth/authz, real admin CRUD/publishing, speaker/attachment depth, sponsor outreach/contact, consent/retention, analytics, operational controls, push notifications, badge generation, seat registration

**Not claiming:** production-ready, full Whova replacement, all-in-one event platform

**Human review still needed:** legal/vendor claim language, residency/privacy caveats

## Out of scope for demo

- In-app registration, badge generation, push notifications, or seat registration (client wants these long-term — see vision.md; PM deferred from prototype v1)
- Event registration / signup flows in the Next.js app (not in Checkpoint 1A)
- Full production compliance / vendor sign-off (logs, backups, support access, subprocessors)
- Real attendee/member personal data in Supabase
- Real admin CRUD, publishing, auth, or role enforcement (admin is mock UI for v1)
- Production email, SMS, or notification systems
- Analytics and tracking tools
- Multi-tenant / multi-org support
- Payment processing

## Scope rule

If demo scope conflicts with long-term vision, **demo wins** unless the team explicitly overrides.

## Success criteria (TBD)

- [ ] Client can follow a happy-path demo without errors
- [ ] UI feels credible for a nonprofit events product
- [ ] TBD — demo date / presentation format
