# Open questions

Update this file as decisions are made. Move resolved items into demo.md or vision.md.

## Demo blocking (answer before feature planning)

- [ ] Demo date or deadline?
- [ ] Are registration/badge static HTML mockups required for the next client meeting?
- [ ] Saved sessions: keep client-local for v1 or persist in Supabase?
- [ ] Admin prototype: mock UI only (default) vs minimal real CRUD in Supabase?
- [ ] Branding source: official ConcreteBC brand guidelines (Checkpoint 1A palette was inferred, not official)

## Roadmap (defer until after prototype v1)

- [ ] When should push notifications, badge generation, and seat registration enter the roadmap?

## Infrastructure (can defer for demo)

- [ ] Frontend hosting: Vercel or other?
- [ ] Does the client need Canada-residency messaging even for the demo narrative?

## Production (defer until after demo)

- [ ] Supabase vs custom Canadian-hosted Postgres for production?
- [ ] Vendor/compliance research timeline (logs, backups, support access, subprocessors)?
- [ ] Which provincial privacy requirements apply to target clients?

## Resolved

- **Mock/seed vs real backend** — Real Supabase backend with fake/test data only (no real PII)
- **Demo backend/hosting** — Supabase Canada Central (`ca-central-1`) for prototype
- **Supabase for production** — Still open; vendor confirmation required before real attendee/member data
- **Must-have demo screens/features** — Checkpoint 1A set: 7 attendee screens + 2 admin mock screens (see demo.md)
- **Auth for demo** — Default: no auth for prototype v1 (attendee and admin mock); confirm with team
- **Conference vs hackathon** — Richer agenda and more pages than hackathon app; hackathon was prior internal demo only
- **Venue model** — Single main stage simplifies location/room logic for prototype v1
