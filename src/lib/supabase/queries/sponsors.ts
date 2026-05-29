import { escapeIlikePattern } from "@/lib/api/validate";
import { createClient } from "@/lib/supabase/server";
import type { Sponsor } from "@/lib/supabase/types";
import { SupabaseQueryError } from "@/lib/supabase/types";

export type SponsorFilters = {
  category?: string;
  search?: string;
};

export async function listSponsors(
  filters?: SponsorFilters,
): Promise<Sponsor[]> {
  const supabase = await createClient();
  let query = supabase.from("sponsors").select("*").order("sort_order", {
    ascending: true,
  });

  if (filters?.category) {
    query = query.contains("categories", [filters.category]);
  }

  if (filters?.search) {
    const pattern = `%${escapeIlikePattern(filters.search)}%`;
    query = query.ilike("name", pattern);
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabaseQueryError(error.message, error.code);
  }

  return data ?? [];
}

export async function getSponsorBySlug(slug: string): Promise<Sponsor> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    throw new SupabaseQueryError(
      error?.message ?? "Sponsor not found",
      error?.code,
    );
  }

  return data;
}
