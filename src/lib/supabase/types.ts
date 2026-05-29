export type SessionCategory =
  | "keynote"
  | "workshop"
  | "panel"
  | "networking"
  | "social";

export type MemberRole = "attendee" | "speaker" | "board_member" | "staff";

export type Event = {
  id: string;
  name: string;
  slug: string;
  starts_on: string;
  ends_on: string;
  venue_name: string;
  summary: string;
  created_at: string;
  updated_at: string;
};

export type Session = {
  id: string;
  event_id: string;
  title: string;
  summary: string;
  category: SessionCategory;
  conference_day: number;
  starts_at: string;
  ends_at: string;
  location: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Sponsor = {
  id: string;
  name: string;
  slug: string;
  categories: string[];
  booth_location: string;
  overview: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Member = {
  id: string;
  display_name: string;
  organization_name: string;
  role: MemberRole;
  bio: string | null;
  affiliation_tag: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DemoVisitor = {
  id: string;
  label: string | null;
  created_at: string;
};

export type SavedSession = {
  id: string;
  demo_visitor_id: string;
  session_id: string;
  saved_at: string;
};

export type SponsorBookmark = {
  id: string;
  demo_visitor_id: string;
  sponsor_id: string;
  bookmarked_at: string;
};

export type SavedSessionWithSession = SavedSession & {
  session: Session;
};

export type SponsorBookmarkWithSponsor = SponsorBookmark & {
  sponsor: Sponsor;
};

export type Database = {
  public: {
    Tables: {
      events: {
        Row: Event;
        Insert: Omit<Event, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Event>;
        Relationships: [];
      };
      sessions: {
        Row: Session;
        Insert: Omit<Session, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Session>;
        Relationships: [];
      };
      sponsors: {
        Row: Sponsor;
        Insert: Omit<Sponsor, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Sponsor>;
        Relationships: [];
      };
      members: {
        Row: Member;
        Insert: Omit<Member, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Member>;
        Relationships: [];
      };
      demo_visitors: {
        Row: DemoVisitor;
        Insert: {
          id?: string;
          label?: string | null;
          created_at?: string;
        };
        Update: Partial<DemoVisitor>;
        Relationships: [];
      };
      saved_sessions: {
        Row: SavedSession;
        Insert: {
          id?: string;
          demo_visitor_id: string;
          session_id: string;
          saved_at?: string;
        };
        Update: Partial<SavedSession>;
        Relationships: [];
      };
      sponsor_bookmarks: {
        Row: SponsorBookmark;
        Insert: {
          id?: string;
          demo_visitor_id: string;
          sponsor_id: string;
          bookmarked_at?: string;
        };
        Update: Partial<SponsorBookmark>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      session_category: SessionCategory;
      member_role: MemberRole;
    };
    CompositeTypes: Record<string, never>;
  };
};

export class SupabaseQueryError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "SupabaseQueryError";
  }
}
