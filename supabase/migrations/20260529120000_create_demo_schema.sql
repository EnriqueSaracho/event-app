-- Demo v1 schema: ConcreteBC 2027 conference prototype
-- Content tables: anon read. Write tables: service_role only (no anon grants).

create extension if not exists pg_trgm with schema extensions;

create type public.session_category as enum (
  'keynote',
  'workshop',
  'panel',
  'networking',
  'social'
);

create type public.member_role as enum (
  'attendee',
  'speaker',
  'board_member',
  'staff'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  starts_on date not null,
  ends_on date not null,
  venue_name text not null default 'Main Stage',
  summary text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_date_range_check check (ends_on >= starts_on)
);

create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  title text not null,
  summary text not null default '',
  category public.session_category not null,
  conference_day smallint not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text not null default 'Main Stage',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sessions_time_range_check check (ends_at > starts_at),
  constraint sessions_conference_day_check check (conference_day between 1 and 7)
);

create trigger sessions_set_updated_at
  before update on public.sessions
  for each row execute function public.set_updated_at();

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  categories text[] not null default '{}',
  booth_location text not null default '',
  overview text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger sponsors_set_updated_at
  before update on public.sponsors
  for each row execute function public.set_updated_at();

create table public.members (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  organization_name text not null,
  role public.member_role not null,
  bio text,
  affiliation_tag text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger members_set_updated_at
  before update on public.members
  for each row execute function public.set_updated_at();

create table public.demo_visitors (
  id uuid primary key default gen_random_uuid(),
  label text,
  created_at timestamptz not null default now()
);

create table public.saved_sessions (
  id uuid primary key default gen_random_uuid(),
  demo_visitor_id uuid not null references public.demo_visitors (id) on delete cascade,
  session_id uuid not null references public.sessions (id) on delete cascade,
  saved_at timestamptz not null default now(),
  constraint saved_sessions_unique_visitor_session unique (demo_visitor_id, session_id)
);

create table public.sponsor_bookmarks (
  id uuid primary key default gen_random_uuid(),
  demo_visitor_id uuid not null references public.demo_visitors (id) on delete cascade,
  sponsor_id uuid not null references public.sponsors (id) on delete cascade,
  bookmarked_at timestamptz not null default now(),
  constraint sponsor_bookmarks_unique_visitor_sponsor unique (demo_visitor_id, sponsor_id)
);

-- Indexes
create index sessions_event_day_starts_idx
  on public.sessions (event_id, conference_day, starts_at);

create index sessions_category_idx
  on public.sessions (category);

create index sessions_time_range_idx
  on public.sessions (starts_at, ends_at);

create index sponsors_categories_gin_idx
  on public.sponsors using gin (categories);

create index sponsors_name_trgm_idx
  on public.sponsors using gin (name extensions.gin_trgm_ops);

create index members_role_idx
  on public.members (role);

create index members_search_trgm_idx
  on public.members using gin (
    (display_name || ' ' || organization_name) extensions.gin_trgm_ops
  );

create index saved_sessions_demo_visitor_id_idx
  on public.saved_sessions (demo_visitor_id);

create index saved_sessions_session_id_idx
  on public.saved_sessions (session_id);

create index sponsor_bookmarks_demo_visitor_id_idx
  on public.sponsor_bookmarks (demo_visitor_id);

create index sponsor_bookmarks_sponsor_id_idx
  on public.sponsor_bookmarks (sponsor_id);

-- Row Level Security
alter table public.events enable row level security;
alter table public.sessions enable row level security;
alter table public.sponsors enable row level security;
alter table public.members enable row level security;
alter table public.demo_visitors enable row level security;
alter table public.saved_sessions enable row level security;
alter table public.sponsor_bookmarks enable row level security;

-- Grants: content tables readable by anon/authenticated
grant usage on schema public to anon, authenticated;

grant select on public.events to anon, authenticated;
grant select on public.sessions to anon, authenticated;
grant select on public.sponsors to anon, authenticated;
grant select on public.members to anon, authenticated;

create policy events_public_read on public.events
  for select to anon, authenticated
  using (true);

create policy sessions_public_read on public.sessions
  for select to anon, authenticated
  using (true);

create policy sponsors_public_read on public.sponsors
  for select to anon, authenticated
  using (true);

create policy members_public_read on public.members
  for select to anon, authenticated
  using (true);

-- Write tables: RLS enabled, no anon/authenticated grants or policies.
-- Mutations via service_role (Next.js API routes) or migration context only.
