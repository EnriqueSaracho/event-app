import { escapeIlikePattern } from "@/lib/api/validate";
import { createClient } from "@/lib/supabase/server";
import type { Member, MemberRole } from "@/lib/supabase/types";
import { SupabaseQueryError } from "@/lib/supabase/types";

export type MemberFilters = {
  role?: MemberRole;
  search?: string;
};

export async function listMembers(filters?: MemberFilters): Promise<Member[]> {
  const supabase = await createClient();
  let query = supabase.from("members").select("*").order("sort_order", {
    ascending: true,
  });

  if (filters?.role) {
    query = query.eq("role", filters.role);
  }

  if (filters?.search) {
    const pattern = `%${escapeIlikePattern(filters.search)}%`;
    query = query.or(
      `display_name.ilike.${pattern},organization_name.ilike.${pattern}`,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabaseQueryError(error.message, error.code);
  }

  return data ?? [];
}
