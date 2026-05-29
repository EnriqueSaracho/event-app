import { createAdminClient } from "@/lib/supabase/admin";
import { parseJsonBody, requireUuid } from "@/lib/api/validate";
import {
  jsonError,
  jsonInternalError,
  jsonOk,
  noContent,
} from "@/lib/api/responses";
import type { SponsorBookmarkWithSponsor } from "@/lib/supabase/types";

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
    .from("sponsor_bookmarks")
    .select("*, sponsor:sponsors(*)")
    .eq("demo_visitor_id", visitorResult.value)
    .order("bookmarked_at", { ascending: true });

  if (error) {
    return jsonInternalError();
  }

  return jsonOk({
    bookmarks: (data ?? []) as SponsorBookmarkWithSponsor[],
  });
}

export async function POST(request: Request) {
  const parsedBody = await parseJsonBody<{
    demo_visitor_id?: string;
    sponsor_id?: string;
  }>(request);

  if (!parsedBody.ok) {
    return jsonError("Invalid JSON body", 400);
  }

  const { demo_visitor_id, sponsor_id } = parsedBody.body;

  const visitorResult = requireUuid(demo_visitor_id, "demo_visitor_id");
  if (!visitorResult.ok) {
    return jsonError("Invalid demo_visitor_id", 400);
  }

  const sponsorResult = requireUuid(sponsor_id, "sponsor_id");
  if (!sponsorResult.ok) {
    return jsonError("Invalid sponsor_id", 400);
  }

  const admin = createAdminClient();
  const { error } = await admin.from("sponsor_bookmarks").upsert(
    {
      demo_visitor_id: visitorResult.value,
      sponsor_id: sponsorResult.value,
    },
    {
      onConflict: "demo_visitor_id,sponsor_id",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    return jsonInternalError();
  }

  return jsonOk({ bookmarked: true }, 201);
}

export async function DELETE(request: Request) {
  const parsedBody = await parseJsonBody<{
    demo_visitor_id?: string;
    sponsor_id?: string;
  }>(request);

  if (!parsedBody.ok) {
    return jsonError("Invalid JSON body", 400);
  }

  const { demo_visitor_id, sponsor_id } = parsedBody.body;

  const visitorResult = requireUuid(demo_visitor_id, "demo_visitor_id");
  if (!visitorResult.ok) {
    return jsonError("Invalid demo_visitor_id", 400);
  }

  const sponsorResult = requireUuid(sponsor_id, "sponsor_id");
  if (!sponsorResult.ok) {
    return jsonError("Invalid sponsor_id", 400);
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("sponsor_bookmarks")
    .delete()
    .eq("demo_visitor_id", visitorResult.value)
    .eq("sponsor_id", sponsorResult.value);

  if (error) {
    return jsonInternalError();
  }

  return noContent();
}
