# Open questions

Update this file as decisions are made. Move resolved items into demo.md or vision.md.

## Demo blocking (answer before feature planning)

- [ ] What features/screens are must-have for the client demo?
- [ ] Demo date or deadline?
- [ ] Is auth required for demo (admin login, attendee accounts)?
- [ ] Branding source: Figma, existing client site, or greenfield?

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
