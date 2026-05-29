import { createClient } from "@/lib/supabase/server";
import type { Event, Session, SessionCategory } from "@/lib/supabase/types";
import { SupabaseQueryError } from "@/lib/supabase/types";

export type SessionFilters = {
  conferenceDay?: number;
  category?: SessionCategory;
};

export async function getEventBySlug(slug: string): Promise<Event> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    throw new SupabaseQueryError(error?.message ?? "Event not found", error?.code);
  }

  return data;
}

export async function getSessionsForEvent(
  eventId: string,
  filters?: SessionFilters,
): Promise<Session[]> {
  const supabase = await createClient();
  let query = supabase
    .from("sessions")
    .select("*")
    .eq("event_id", eventId)
    .order("conference_day", { ascending: true })
    .order("starts_at", { ascending: true });

  if (filters?.conferenceDay !== undefined) {
    query = query.eq("conference_day", filters.conferenceDay);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabaseQueryError(error.message, error.code);
  }

  return data ?? [];
}

export async function getSessionById(sessionId: string): Promise<Session> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error || !data) {
    throw new SupabaseQueryError(
      error?.message ?? "Session not found",
      error?.code,
    );
  }

  return data;
}
