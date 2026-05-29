# Open questions

Update this file as decisions are made. Move resolved items into demo.md or vision.md.

## Roadmap (defer until after prototype v1)

- [ ] When should push notifications and seat registration enter the roadmap?
- [ ] When should functional registration and badge generation move from static HTML mockups into the Next.js app?

## Infrastructure (can defer for demo)

- [ ] Frontend hosting: Vercel or other?
- [ ] Does the client need Canada-residency messaging even for the demo narrative?

## Production (defer until after demo)

- [ ] Supabase vs custom Canadian-hosted Postgres for production?
- [ ] Vendor/compliance research timeline (logs, backups, support access, subprocessors)?
- [ ] Which provincial privacy requirements apply to target clients?

## Resolved

- **Mock/seed vs real backend** — Real Supabase backend with fake/test data only (no real PII)
- **Demo backend/hosting** — Supabase Canada Central (`ca-central-1`) for prototype; Supabase is required and fundamental for the Next.js app
- **Supabase for production** — Still open; vendor confirmation required before real attendee/member data
- **Must-have demo screens/features** — 7 attendee screens + 2 admin mock screens in Next.js app; static HTML mockups for registration and badge generation (see demo.md)
- **Auth for demo** — Default: no auth for prototype v1 (attendee and admin mock)
- **Conference vs hackathon** — Richer agenda and more pages than hackathon app; hackathon was prior internal demo only
- **Venue model** — Single main stage simplifies location/room logic for prototype v1
- **Saved sessions** — Persist in Supabase for the demo (not client-local)
- **Registration/badge deliverable** — Static HTML mockups required for client meetings; functional Next.js integration deferred unless promoted
- **Admin prototype** — Mock UI only for v1 (no real CRUD in Supabase)
- **Branding/design** — Original team design; do not use Checkpoint 1A palette or design. May take inspiration from competition references in vision.md
- **Responsive layout** — Both attendee and admin UIs must be responsive (mobile and desktop)
- **Demo date/presentation format** — Not a spec blocker; team is building now
