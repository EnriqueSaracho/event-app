import { createAdminClient } from "@/lib/supabase/admin";
import { parseJsonBody, requireUuid } from "@/lib/api/validate";
import {
  jsonError,
  jsonInternalError,
  jsonOk,
  noContent,
} from "@/lib/api/responses";
import type { SavedSessionWithSession } from "@/lib/supabase/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const demoVisitorId = searchParams.get("demo_visitor_id");

  if (!demoVisitorId) {
    return jsonError("demo_visitor_id is required", 400);
  }

  const visitorResult = requireUuid(demoVisitorId, "demo_visitor_id");

  if (!visitorResult.ok) {
    return jsonError("Invalid demo_visitor_id", 400);
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("saved_sessions")
    .select("*, session:sessions(*)")
    .eq("demo_visitor_id", visitorResult.value)
    .order("saved_at", { ascending: true });

  if (error) {
    return jsonInternalError();
  }

  return jsonOk({
    saved_sessions: (data ?? []) as SavedSessionWithSession[],
  });
}

export async function POST(request: Request) {
  const parsedBody = await parseJsonBody<{
    demo_visitor_id?: string;
    session_id?: string;
  }>(request);

  if (!parsedBody.ok) {
    return jsonError("Invalid JSON body", 400);
  }

  const { demo_visitor_id, session_id } = parsedBody.body;

  const visitorResult = requireUuid(demo_visitor_id, "demo_visitor_id");
  if (!visitorResult.ok) {
    return jsonError("Invalid demo_visitor_id", 400);
  }

  const sessionResult = requireUuid(session_id, "session_id");
  if (!sessionResult.ok) {
    return jsonError("Invalid session_id", 400);
  }

  const admin = createAdminClient();
  const { error } = await admin.from("saved_sessions").upsert(
    {
      demo_visitor_id: visitorResult.value,
      session_id: sessionResult.value,
    },
    {
      onConflict: "demo_visitor_id,session_id",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    return jsonInternalError();
  }

  return jsonOk({ saved: true }, 201);
}

export async function DELETE(request: Request) {
  const parsedBody = await parseJsonBody<{
    demo_visitor_id?: string;
    session_id?: string;
  }>(request);

  if (!parsedBody.ok) {
    return jsonError("Invalid JSON body", 400);
  }

  const { demo_visitor_id, session_id } = parsedBody.body;

  const visitorResult = requireUuid(demo_visitor_id, "demo_visitor_id");
  if (!visitorResult.ok) {
    return jsonError("Invalid demo_visitor_id", 400);
  }

  const sessionResult = requireUuid(session_id, "session_id");
  if (!sessionResult.ok) {
    return jsonError("Invalid session_id", 400);
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("saved_sessions")
    .delete()
    .eq("demo_visitor_id", visitorResult.value)
    .eq("session_id", sessionResult.value);

  if (error) {
    return jsonInternalError();
  }

  return noContent();
}
