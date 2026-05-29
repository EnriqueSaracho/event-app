import type { SavedSessionWithSession } from "@/lib/supabase/types";

export async function fetchSavedSessions(
  demoVisitorId: string,
): Promise<SavedSessionWithSession[]> {
  const response = await fetch(
    `/api/saved-sessions?demo_visitor_id=${encodeURIComponent(demoVisitorId)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch saved sessions");
  }

  const data = (await response.json()) as {
    saved_sessions: SavedSessionWithSession[];
  };
  return data.saved_sessions;
}

export async function saveSession(
  demoVisitorId: string,
  sessionId: string,
): Promise<void> {
  const response = await fetch("/api/saved-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      demo_visitor_id: demoVisitorId,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save session");
  }
}

export async function unsaveSession(
  demoVisitorId: string,
  sessionId: string,
): Promise<void> {
  const response = await fetch("/api/saved-sessions", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      demo_visitor_id: demoVisitorId,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove saved session");
  }
}

export async function isSessionSaved(
  demoVisitorId: string,
  sessionId: string,
): Promise<boolean> {
  const saved = await fetchSavedSessions(demoVisitorId);
  return saved.some((item) => item.session_id === sessionId);
}
