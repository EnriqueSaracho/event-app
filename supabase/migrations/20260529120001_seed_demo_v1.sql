-- Idempotent demo seed: ConcreteBC 2027 fake data only (no real PII).
-- Re-run safe via ON CONFLICT DO UPDATE on primary keys.

-- Fixed UUID reference (see docs/specs/data-model.md)
-- Event:        a0000000-0000-4000-8000-000000000001
-- Demo visitor: a0000000-0000-4000-8000-000000000002

insert into public.events (
  id, name, slug, starts_on, ends_on, venue_name, summary
) values (
  'a0000000-0000-4000-8000-000000000001',
  'ConcreteBC 2027 Member Conference',
  'concretebc-2027',
  '2027-06-15',
  '2027-06-17',
  'Main Stage',
  'Three days of keynotes, workshops, and community sessions for ConcreteBC members. All sessions on the main stage.'
)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  starts_on = excluded.starts_on,
  ends_on = excluded.ends_on,
  venue_name = excluded.venue_name,
  summary = excluded.summary,
  updated_at = now();

insert into public.sessions (
  id, event_id, title, summary, category, conference_day, starts_at, ends_at, location, sort_order
) values
  ('a0000000-0000-4000-8000-000000000101', 'a0000000-0000-4000-8000-000000000001',
   'Opening Keynote: Building Stronger Communities',
   'Welcome address and vision for nonprofit resilience across British Columbia.',
   'keynote', 1, '2027-06-15 09:00:00-07', '2027-06-15 10:00:00-07', 'Main Stage', 1),
  ('a0000000-0000-4000-8000-000000000102', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Grant Writing Basics',
   'Introductory workshop on structuring compelling grant applications.',
   'workshop', 1, '2027-06-15 10:30:00-07', '2027-06-15 12:00:00-07', 'Main Stage', 2),
  ('a0000000-0000-4000-8000-000000000103', 'a0000000-0000-4000-8000-000000000001',
   'Panel: Volunteer Engagement in 2027',
   'Leaders discuss recruiting and retaining volunteers post-pandemic.',
   'panel', 1, '2027-06-15 13:00:00-07', '2027-06-15 14:15:00-07', 'Main Stage', 3),
  ('a0000000-0000-4000-8000-000000000104', 'a0000000-0000-4000-8000-000000000001',
   'Networking: Day One Meet & Greet',
   'Informal networking with table prompts and facilitator introductions.',
   'networking', 1, '2027-06-15 14:30:00-07', '2027-06-15 15:30:00-07', 'Main Stage', 4),
  ('a0000000-0000-4000-8000-000000000105', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Board Governance Essentials',
   'Practical governance tools for small and mid-size nonprofits.',
   'workshop', 1, '2027-06-15 16:00:00-07', '2027-06-15 17:30:00-07', 'Main Stage', 5),
  ('a0000000-0000-4000-8000-000000000106', 'a0000000-0000-4000-8000-000000000001',
   'Social: Welcome Reception',
   'Light refreshments and music to kick off the conference.',
   'social', 1, '2027-06-15 18:00:00-07', '2027-06-15 20:00:00-07', 'Main Stage', 6),
  ('a0000000-0000-4000-8000-000000000107', 'a0000000-0000-4000-8000-000000000001',
   'Keynote: Data for Good',
   'How member organizations use outcomes data responsibly.',
   'keynote', 2, '2027-06-16 09:00:00-07', '2027-06-16 10:00:00-07', 'Main Stage', 1),
  ('a0000000-0000-4000-8000-000000000108', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Overlap Demo — Fundraising Campaigns',
   'Plan annual campaigns with realistic timelines and milestones.',
   'workshop', 2, '2027-06-16 10:00:00-07', '2027-06-16 11:30:00-07', 'Main Stage', 2),
  ('a0000000-0000-4000-8000-000000000109', 'a0000000-0000-4000-8000-000000000001',
   'Panel: Overlap Demo — Community Partnerships',
   'Panel on cross-sector partnerships; overlaps with fundraising workshop.',
   'panel', 2, '2027-06-16 11:00:00-07', '2027-06-16 12:00:00-07', 'Main Stage', 3),
  ('a0000000-0000-4000-8000-000000000110', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Digital Accessibility for Events',
   'Make in-person and hybrid events accessible to all attendees.',
   'workshop', 2, '2027-06-16 13:00:00-07', '2027-06-16 14:30:00-07', 'Main Stage', 4),
  ('a0000000-0000-4000-8000-000000000111', 'a0000000-0000-4000-8000-000000000001',
   'Panel: Youth Programs That Scale',
   'Program leads share models that grew beyond pilot phase.',
   'panel', 2, '2027-06-16 15:00:00-07', '2027-06-16 16:15:00-07', 'Main Stage', 5),
  ('a0000000-0000-4000-8000-000000000112', 'a0000000-0000-4000-8000-000000000001',
   'Networking: Sector Roundtables',
   'Topic-based tables for housing, food security, and arts nonprofits.',
   'networking', 2, '2027-06-16 16:30:00-07', '2027-06-16 17:30:00-07', 'Main Stage', 6),
  ('a0000000-0000-4000-8000-000000000113', 'a0000000-0000-4000-8000-000000000001',
   'Social: Demo Member Mixer',
   'Casual mixer with demo sponsors and member org representatives.',
   'social', 2, '2027-06-16 18:00:00-07', '2027-06-16 20:00:00-07', 'Main Stage', 7),
  ('a0000000-0000-4000-8000-000000000114', 'a0000000-0000-4000-8000-000000000001',
   'Keynote: Closing the Gap',
   'Closing keynote on equitable access to community services.',
   'keynote', 3, '2027-06-17 09:00:00-07', '2027-06-17 10:00:00-07', 'Main Stage', 1),
  ('a0000000-0000-4000-8000-000000000115', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Evaluation on a Shoestring',
   'Low-cost evaluation methods for resource-constrained teams.',
   'workshop', 3, '2027-06-17 10:30:00-07', '2027-06-17 12:00:00-07', 'Main Stage', 2),
  ('a0000000-0000-4000-8000-000000000116', 'a0000000-0000-4000-8000-000000000001',
   'Panel: Advocacy Without Burnout',
   'Sustain long-term advocacy work while protecting staff wellbeing.',
   'panel', 3, '2027-06-17 13:00:00-07', '2027-06-17 14:15:00-07', 'Main Stage', 3),
  ('a0000000-0000-4000-8000-000000000117', 'a0000000-0000-4000-8000-000000000001',
   'Workshop: Storytelling for Donors',
   'Craft narratives that connect mission to measurable impact.',
   'workshop', 3, '2027-06-17 14:30:00-07', '2027-06-17 16:00:00-07', 'Main Stage', 4),
  ('a0000000-0000-4000-8000-000000000118', 'a0000000-0000-4000-8000-000000000001',
   'Networking: Final Connections',
   'Open networking before closing remarks.',
   'networking', 3, '2027-06-17 16:15:00-07', '2027-06-17 17:15:00-07', 'Main Stage', 5),
  ('a0000000-0000-4000-8000-000000000119', 'a0000000-0000-4000-8000-000000000001',
   'Panel: Looking Ahead to 2028',
   'Board and staff preview priorities for the next conference cycle.',
   'panel', 3, '2027-06-17 17:30:00-07', '2027-06-17 18:30:00-07', 'Main Stage', 6),
  ('a0000000-0000-4000-8000-000000000120', 'a0000000-0000-4000-8000-000000000001',
   'Social: Closing Celebration',
   'Celebrate conference highlights with demo awards and thank-yous.',
   'social', 3, '2027-06-17 19:00:00-07', '2027-06-17 21:00:00-07', 'Main Stage', 7)
on conflict (id) do update set
  event_id = excluded.event_id,
  title = excluded.title,
  summary = excluded.summary,
  category = excluded.category,
  conference_day = excluded.conference_day,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  location = excluded.location,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.sponsors (
  id, name, slug, categories, booth_location, overview, sort_order
) values
  ('a0000000-0000-4000-8000-000000000201', 'Demo Foundation Partners', 'demo-foundation-partners',
   array['Platinum Sponsor'], 'Booth A1',
   'Sample philanthropic partner supporting ConcreteBC demo programs statewide.', 1),
  ('a0000000-0000-4000-8000-000000000202', 'Sample Nonprofit Co.', 'sample-nonprofit-co',
   array['Gold Sponsor', 'Community Partner'], 'Booth B2',
   'Fake member organization showcasing collaborative community initiatives.', 2),
  ('a0000000-0000-4000-8000-000000000203', 'Test Tech for Good Ltd.', 'test-tech-for-good',
   array['Gold Sponsor', 'Exhibitor'], 'Booth C3',
   'Demo technology vendor with tools for volunteer management and events.', 3),
  ('a0000000-0000-4000-8000-000000000204', 'Demo Credit Union', 'demo-credit-union',
   array['Silver Sponsor'], 'Booth D4',
   'Fictional financial institution supporting local nonprofit banking needs.', 4),
  ('a0000000-0000-4000-8000-000000000205', 'Sample Housing Alliance', 'sample-housing-alliance',
   array['Silver Sponsor', 'Exhibitor'], 'Booth E5',
   'Representative housing nonprofit with demo affordable housing programs.', 5),
  ('a0000000-0000-4000-8000-000000000206', 'Test Green Energy Collective', 'test-green-energy',
   array['Bronze Sponsor', 'Exhibitor'], 'Booth F6',
   'Fake clean energy collective offering demo sustainability grants.', 6),
  ('a0000000-0000-4000-8000-000000000207', 'Demo Arts Council', 'demo-arts-council',
   array['Bronze Sponsor', 'Community Partner'], 'Booth G7',
   'Sample arts council connecting creatives with community nonprofits.', 7),
  ('a0000000-0000-4000-8000-000000000208', 'Sample Food Bank Network', 'sample-food-bank',
   array['Community Partner', 'Exhibitor'], 'Booth H8',
   'Demo regional food security network with member distribution hubs.', 8),
  ('a0000000-0000-4000-8000-000000000209', 'Test Youth Programs Inc.', 'test-youth-programs',
   array['Exhibitor'], 'Booth I9',
   'Fictional youth development org with demo mentorship frameworks.', 9),
  ('a0000000-0000-4000-8000-000000000210', 'Demo Legal Aid Services', 'demo-legal-aid',
   array['Community Partner'], 'Booth J10',
   'Sample legal aid provider offering pro bono support to member orgs.', 10)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  categories = excluded.categories,
  booth_location = excluded.booth_location,
  overview = excluded.overview,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.members (
  id, display_name, organization_name, role, bio, affiliation_tag, sort_order
) values
  ('a0000000-0000-4000-8000-000000000301', 'Demo Speaker A', 'Sample Nonprofit Co.', 'speaker',
   'Keynote presenter on community resilience.', 'ConcreteBC Member', 1),
  ('a0000000-0000-4000-8000-000000000302', 'Demo Speaker B', 'Test Housing Alliance', 'speaker',
   'Panelist on affordable housing policy.', 'Housing Sector', 2),
  ('a0000000-0000-4000-8000-000000000303', 'Demo Board Member C', 'Demo Foundation Partners', 'board_member',
   'Volunteer board director since 2022.', 'Governance', 3),
  ('a0000000-0000-4000-8000-000000000304', 'Demo Staff D', 'ConcreteBC (Demo)', 'staff',
   'Demo conference coordinator.', 'Events Team', 4),
  ('a0000000-0000-4000-8000-000000000305', 'Demo Attendee E', 'Sample Food Bank Network', 'attendee',
   null, 'Food Security', 5),
  ('a0000000-0000-4000-8000-000000000306', 'Demo Attendee F', 'Test Youth Programs Inc.', 'attendee',
   'First-time conference attendee.', null, 6),
  ('a0000000-0000-4000-8000-000000000307', 'Demo Speaker G', 'Demo Arts Council', 'speaker',
   'Workshop lead on creative community programs.', 'Arts', 7),
  ('a0000000-0000-4000-8000-000000000308', 'Demo Board Member H', 'Sample Nonprofit Co.', 'board_member',
   null, 'Finance Committee', 8),
  ('a0000000-0000-4000-8000-000000000309', 'Demo Staff I', 'Test Tech for Good Ltd.', 'staff',
   'Demo exhibitor liaison.', 'Sponsor Desk', 9),
  ('a0000000-0000-4000-8000-000000000310', 'Demo Attendee J', 'Demo Credit Union', 'attendee',
   'Interested in grant workshops.', null, 10),
  ('a0000000-0000-4000-8000-000000000311', 'Demo Attendee K', 'Test Green Energy Collective', 'attendee',
   null, 'Sustainability', 11),
  ('a0000000-0000-4000-8000-000000000312', 'Demo Speaker L', 'Demo Legal Aid Services', 'speaker',
   'Panelist on advocacy and compliance.', 'Legal', 12),
  ('a0000000-0000-4000-8000-000000000313', 'Demo Board Member M', 'Sample Housing Alliance', 'board_member',
   'Long-serving volunteer director.', null, 13),
  ('a0000000-0000-4000-8000-000000000314', 'Demo Staff N', 'Sample Food Bank Network', 'staff',
   'Operations lead for demo programs.', 'Operations', 14),
  ('a0000000-0000-4000-8000-000000000315', 'Demo Attendee O', 'Demo Arts Council', 'attendee',
   null, 'Volunteer', 15),
  ('a0000000-0000-4000-8000-000000000316', 'Demo Attendee P', 'Sample Nonprofit Co.', 'attendee',
   'Workshop-focused attendee.', 'Programs', 16),
  ('a0000000-0000-4000-8000-000000000317', 'Demo Speaker Q', 'Test Green Energy Collective', 'speaker',
   'Keynote on sustainable community infrastructure.', 'Environment', 17),
  ('a0000000-0000-4000-8000-000000000318', 'Demo Attendee R', 'Demo Foundation Partners', 'attendee',
   null, 'Philanthropy', 18)
on conflict (id) do update set
  display_name = excluded.display_name,
  organization_name = excluded.organization_name,
  role = excluded.role,
  bio = excluded.bio,
  affiliation_tag = excluded.affiliation_tag,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.demo_visitors (id, label)
values (
  'a0000000-0000-4000-8000-000000000002',
  'Seed demo visitor (API testing)'
)
on conflict (id) do update set
  label = excluded.label;

insert into public.saved_sessions (id, demo_visitor_id, session_id, saved_at)
values
  ('a0000000-0000-4000-8000-000000000401', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000108', '2027-06-01 12:00:00+00'),
  ('a0000000-0000-4000-8000-000000000402', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000109', '2027-06-01 12:05:00+00'),
  ('a0000000-0000-4000-8000-000000000403', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000101', '2027-06-01 11:00:00+00'),
  ('a0000000-0000-4000-8000-000000000404', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000114', '2027-06-01 13:00:00+00')
on conflict (id) do update set
  demo_visitor_id = excluded.demo_visitor_id,
  session_id = excluded.session_id,
  saved_at = excluded.saved_at;

insert into public.sponsor_bookmarks (id, demo_visitor_id, sponsor_id, bookmarked_at)
values
  ('a0000000-0000-4000-8000-000000000501', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000201', '2027-06-01 14:00:00+00'),
  ('a0000000-0000-4000-8000-000000000502', 'a0000000-0000-4000-8000-000000000002',
   'a0000000-0000-4000-8000-000000000203', '2027-06-01 14:05:00+00')
on conflict (id) do update set
  demo_visitor_id = excluded.demo_visitor_id,
  sponsor_id = excluded.sponsor_id,
  bookmarked_at = excluded.bookmarked_at;
