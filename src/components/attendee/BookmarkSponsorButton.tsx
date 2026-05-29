"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import {
  bookmarkSponsor,
  isSponsorBookmarked,
  unbookmarkSponsor,
} from "@/lib/demo-visitor/sponsor-bookmarks";

type BookmarkSponsorButtonProps = {
  sponsorId: string;
};

export function BookmarkSponsorButton({
  sponsorId,
}: BookmarkSponsorButtonProps) {
  const { visitorId, isReady } = useDemoVisitor();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isReady || !visitorId) return;

    let cancelled = false;
    isSponsorBookmarked(visitorId, sponsorId)
      .then((isBookmarked) => {
        if (!cancelled) {
          setBookmarked(isBookmarked);
          setInitialized(true);
        }
      })
      .catch(() => {
        if (!cancelled) setInitialized(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isReady, visitorId, sponsorId]);

  async function toggleBookmark() {
    if (!visitorId) return;
    setLoading(true);
    const wasBookmarked = bookmarked;

    try {
      if (wasBookmarked) {
        setBookmarked(false);
        await unbookmarkSponsor(visitorId, sponsorId);
      } else {
        setBookmarked(true);
        await bookmarkSponsor(visitorId, sponsorId);
      }
    } catch {
      setBookmarked(wasBookmarked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={bookmarked ? "secondary" : "primary"}
      onClick={toggleBookmark}
      disabled={!isReady || !visitorId || loading || !initialized}
      aria-pressed={bookmarked}
    >
      {loading ? "Saving…" : bookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}
