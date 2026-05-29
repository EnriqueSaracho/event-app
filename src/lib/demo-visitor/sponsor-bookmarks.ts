import type { SponsorBookmarkWithSponsor } from "@/lib/supabase/types";

export async function fetchSponsorBookmarks(
  demoVisitorId: string,
): Promise<SponsorBookmarkWithSponsor[]> {
  const response = await fetch(
    `/api/sponsor-bookmarks?demo_visitor_id=${encodeURIComponent(demoVisitorId)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sponsor bookmarks");
  }

  const data = (await response.json()) as {
    bookmarks: SponsorBookmarkWithSponsor[];
  };
  return data.bookmarks;
}

export async function bookmarkSponsor(
  demoVisitorId: string,
  sponsorId: string,
): Promise<void> {
  const response = await fetch("/api/sponsor-bookmarks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      demo_visitor_id: demoVisitorId,
      sponsor_id: sponsorId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to bookmark sponsor");
  }
}

export async function unbookmarkSponsor(
  demoVisitorId: string,
  sponsorId: string,
): Promise<void> {
  const response = await fetch("/api/sponsor-bookmarks", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      demo_visitor_id: demoVisitorId,
      sponsor_id: sponsorId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove bookmark");
  }
}

export async function isSponsorBookmarked(
  demoVisitorId: string,
  sponsorId: string,
): Promise<boolean> {
  const bookmarks = await fetchSponsorBookmarks(demoVisitorId);
  return bookmarks.some((item) => item.sponsor_id === sponsorId);
}
