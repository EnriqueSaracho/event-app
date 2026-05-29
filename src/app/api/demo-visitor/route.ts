import { createAdminClient } from "@/lib/supabase/admin";
import { parseJsonBody, requireUuid } from "@/lib/api/validate";
import {
  jsonError,
  jsonInternalError,
  jsonOk,
  noContent,
} from "@/lib/api/responses";

const MAX_LABEL_LENGTH = 100;

export async function POST(request: Request) {
  const parsedBody = await parseJsonBody<{
    id?: string;
    label?: string;
  }>(request);

  if (!parsedBody.ok) {
    return jsonError("Invalid JSON body", 400);
  }

  const { id, label } = parsedBody.body;

  if (id !== undefined) {
    const idResult = requireUuid(id, "id");
    if (!idResult.ok) {
      return jsonError("Invalid id", 400);
    }
  }

  if (label !== undefined && typeof label !== "string") {
    return jsonError("Invalid label", 400);
  }

  if (label !== undefined && label.length > MAX_LABEL_LENGTH) {
    return jsonError("Label must be 100 characters or fewer", 400);
  }

  const admin = createAdminClient();

  if (id) {
    const { data: existing, error: selectError } = await admin
      .from("demo_visitors")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (selectError) {
      return jsonInternalError();
    }

    if (existing) {
      return jsonOk({ id: existing.id }, 200);
    }

    const { data, error } = await admin
      .from("demo_visitors")
      .insert({ id, label: label ?? null })
      .select("id")
      .single();

    if (error) {
      return jsonInternalError();
    }

    return jsonOk({ id: data.id }, 201);
  }

  const { data, error } = await admin
    .from("demo_visitors")
    .insert({ label: label ?? null })
    .select("id")
    .single();

  if (error || !data) {
    return jsonInternalError();
  }

  return jsonOk({ id: data.id }, 201);
}
