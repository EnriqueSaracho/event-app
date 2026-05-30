# Demo scope

> **Horizon:** demo  
> **Status:** draft  
> **Goal:** Presentable MVP for client demo — not production-ready

## Summary

Build a ConcreteBC 2027 member conference / in-event attendee app prototype to demonstrate core value to the client. **Supabase in Canada Central is required and fundamental** — all demo content in the Next.js app reads from and writes to Supabase with fake/test data only. Prioritize screen-to-screen flows and polish; follow prototype guardrails below.

Also deliver **static HTML mockups** for registration and badge generation so the client can be walked through those flows in meetings (visual design only — separate from the Next.js app).

## Product framing

ConcreteBC member conference / **in-event experience** for the Next.js app. The main app is not a registration signup product, but registration and badge flows are part of the **overall demo narrative** via static HTML mockups (see below).

## Context vs hackathon app

Same general app shape as the team hackathon build (prior internal demo). Main differences for ConcreteBC:

- **More pages and a richer, more detailed conference agenda** — hackathon = main event + some sessions; conference = fuller multi-session agenda across days
- Attendee screen inventory below reflects this broader in-event scope (derived from prior Checkpoint 1A planning — **screen list only; not a design source**)

## Venue note

Client said the event is **all held on the main stage**. For prototype v1, session location can be simplified (single venue/stage; no multi-room navigation logic required).

## Design

- **Do not use Checkpoint 1A design or palette** — treat that as non-existent for this project.
- Team creates **original visual design** for both the Next.js app and static HTML mockups.
- May take **inspiration** from competition references in [vision.md](vision.md) (Whova, PheedLoop, EventMobi) — not copy them.

## Registration & badge mockups (required demo deliverable)

PM-delegated deliverable: static HTML pages showing what registration and badge generation **look like** before client meetings.

- **In scope (demo):** static HTML mockups for registration flow and badge generation — fake data only, visual preview, open in browser. **Required for client meetings.**
- **Deferred (Next.js v1):** functional registration and badge generation inside the main app — no Supabase-backed registration or badge routes, no real CRUD, no backend integration for these flows unless explicitly promoted later.
- Separate from the Next.js app unless the team explicitly promotes them into the build.

Suggested mockup coverage:

- **Registration:** event summary entry, form steps (fake attendee/org/ticket fields), confirmation screen
- **Badge generation:** badge preview (name, org, role, event branding, QR placeholder), generate/download UI state (non-functional is fine)

## Navigation

Attendee app is **mobile-first** with bottom navigation: **Home → Agenda → Sponsors → Members → Saved**.

Admin is a separate mock area with its own navigation. **Both attendee and admin UIs must be responsive** (mobile and desktop).

## Demo flows

### Attendee (Next.js app)
- Browse home dashboard with next-up session and quick links
- Browse and filter agenda (multi-day, categories); open session detail; save session (persisted in Supabase)
- Browse sponsors/exhibitors directory and profiles; bookmark profiles
- Browse privacy-safe member directory (search, role filters)
- View saved sessions with overlap warnings and empty state

### Admin (Next.js app, prototype v1)
- View mock content landing with queue/status cards
- View static form/detail with preview pane; mock save only — **no real CRUD or publishing**

### Registration & badges (static HTML — client meeting walkthrough)
- Walk through registration flow mockup pages (fake data)
- Walk through badge generation/preview mockup pages (fake data)

## Pages / screens

### Attendee (Next.js app)
1. **Home / Dashboard** — event preview, next-up session, quick links (Agenda, Sponsors, Members, Resources), featured resource, fake saved/updates/reminders counts
2. **Agenda List** — multi-day tabs, category filters, session list, empty filter state
3. **Session Detail** — time/location/category, overview, resources placeholder, save session
4. **Sponsors & Exhibitors Directory** — search, category filters, listing cards
5. **Sponsor/Exhibitor Profile** — org header, categories, booth/location, overview, bookmark (no contact/outreach)
6. **Member Directory** — privacy-safe listing, role filters, search (see appendix for fields)
7. **Saved Sessions** — saved list, overlap conflict warning, empty state, remove actions

### Admin (Next.js app, mock preview)
8. **Content landing** — queue/status cards (draft, needs review, queued)
9. **Form/detail** — static title/summary/category/status fields + preview pane; mock save only

### Registration & badges (static HTML — not Next.js routes)
10. **Registration flow** — multi-page HTML mockup (entry, form steps, confirmation)
11. **Badge generation** — HTML mockup (preview, generate/download UI)

## Data approach

- **Supabase is required** for the Next.js demo app — not optional. `.env.example` and Supabase client packages are in the repo; wiring/migrations are implementation tasks.
- Real Supabase backend (`ca-central-1`) with **fake/test data only** — no real attendee/member PII
- **Supabase seed data** for agenda, sponsors, members, saved sessions, and related content
- **Saved sessions:** persisted in **Supabase** for the demo (not client-local)
- **Schema/migrations/seed:** not defined in this spec — to be created during implementation (Supabase MCP), following conventional event-app patterns
- Keep schema and code migration-friendly toward custom Canadian-hosted Postgres later

## Stack (demo)

- Next.js (App Router), TypeScript, Tailwind CSS
- Supabase in **Canada Central (`ca-central-1`)** — **prototype-only**; not approved for paid/client production with real personal data yet
- Sensitive logic in Next.js API routes (not Supabase Edge Functions for personal data)
- Static HTML mockups in public/mockups/ — served locally at /mockups via Next.js dev server

## Prototype guardrails

- Use fake/test data only — no real names, emails, phone numbers, or registration details
- Do not use Supabase Edge Functions for personal data
- Keep sensitive logic in Next.js API routes
- Do not log names, emails, phone numbers, tokens, or private registration details
- Do not add analytics/tracking tools yet
- Keep code and database clean for possible migration to custom Canadian-hosted Postgres
- Build fast; do not make compliance promises we cannot prove yet

## Mocked vs deferred (prototype v1)

**In scope (demo):**
- Next.js app UI flows with Supabase-backed fake data
- Static HTML mockups for registration and badge generation (client meeting walkthrough)

**Mocked (Next.js admin):** queue cards, static form + preview, mock save — no real CRUD or publishing

**Deferred (Next.js v1 / later):**
- Functional registration and badge generation inside the main app (unless promoted)
- Auth/authz, real admin CRUD/publishing, speaker/attachment depth, sponsor outreach/contact
- Consent/retention, analytics, operational controls, push notifications, seat registration

**Not claiming:** production-ready, full Whova replacement, all-in-one event platform

**Human review still needed:** legal/vendor claim language, residency/privacy caveats

## Out of scope for demo

- Functional registration or badge generation **inside the Next.js app** (static HTML mockups cover the demo narrative)
- Push notifications or seat registration (client wants these long-term — see vision.md)
- Full production compliance / vendor sign-off (logs, backups, support access, subprocessors)
- Real attendee/member personal data in Supabase
- Real admin CRUD, publishing, auth, or role enforcement (admin is mock UI for v1)
- Production email, SMS, or notification systems
- Analytics and tracking tools
- Multi-tenant / multi-org support
- Payment processing

## Scope rule

If demo scope conflicts with long-term vision, **demo wins** unless the team explicitly overrides.

## Success criteria

- [ ] Client can follow a happy-path demo without errors (Next.js app + HTML mockup walkthrough)
- [ ] UI feels credible for a nonprofit events product
- [ ] Static HTML registration and badge mockups ready for client meetings

## Appendix: implementation conventions

Follow standard event-app conventions unless this spec says otherwise. Details below apply during implementation — not blockers for spec approval.

### Member directory (privacy-safe fields)

**Show:** display name (fake), organization name (fake), role/title (e.g. attendee, speaker, board member, staff), optional short bio or affiliation tag

**Do not show:** email, phone, photos, org contact details, or any real PII

### Agenda behavior

- **Categories/filters:** conventional conference categories (e.g. keynote, workshop, panel, networking, social)
- **Overlap warnings:** flag saved sessions whose time ranges overlap (standard interval overlap — warn on partial or full overlap)

### Seed data

- Fake/test content only; no real PII
- Multi-day agenda, representative sponsors/exhibitors, privacy-safe member entries
