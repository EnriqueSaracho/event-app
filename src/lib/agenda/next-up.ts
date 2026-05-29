import type { Session } from "@/lib/supabase/types";

export function getNextUpSession(sessions: Session[]): Session | null {
  if (sessions.length === 0) return null;

  const now = new Date().toISOString();
  const upcoming = sessions
    .filter((session) => session.starts_at > now)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));

  if (upcoming.length > 0) return upcoming[0];

  return sessions[0] ?? null;
}

export function getDistinctConferenceDays(sessions: Session[]): number[] {
  const days = new Set(sessions.map((s) => s.conference_day));
  return [...days].sort((a, b) => a - b);
}
