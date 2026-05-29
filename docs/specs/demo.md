# Demo scope

> **Horizon:** demo  
> **Status:** draft  
> **Goal:** Presentable MVP for client demo — not production-ready

## Summary

Build enough of the events app to demonstrate core value to a nonprofit client. Use Supabase in Canada Central for a real backend with fake/test data only. Prioritize visible flows and polish; follow prototype guardrails below.

## In scope (TBD — fill before feature planning)

### Demo flows
- [ ] TBD — e.g. browse events, view event detail, register for event
- [ ] TBD — e.g. admin create/edit event (simple)

### Pages / screens
- [ ] TBD — public event listing
- [ ] TBD — event detail + registration
- [ ] TBD — admin view (if in demo)

### Data approach
- Real Supabase backend (`ca-central-1`) with **fake/test data only** — no real attendee/member PII
- Persistence via Supabase Postgres for prototype flows; seed data for demo day
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

## Out of scope for demo

- Full production compliance / vendor sign-off (logs, backups, support access, subprocessors)
- Real attendee/member personal data in Supabase
- Full CMS, advanced admin, role-based permissions
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
