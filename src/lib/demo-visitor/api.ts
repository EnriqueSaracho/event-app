import { SEEDED_DEMO_VISITOR_ID } from "@/lib/supabase/constants";
import { getStoredVisitorId, setStoredVisitorId } from "./storage";

export async function ensureDemoVisitorId(): Promise<string> {
  const seededId = process.env.NEXT_PUBLIC_SEEDED_DEMO_VISITOR_ID;
  if (seededId) {
    setStoredVisitorId(seededId);
    return seededId;
  }

  const stored = getStoredVisitorId();
  if (stored) return stored;

  const response = await fetch("/api/demo-visitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to create demo visitor");
  }

  const data = (await response.json()) as { id: string };
  setStoredVisitorId(data.id);
  return data.id;
}

export { SEEDED_DEMO_VISITOR_ID };
