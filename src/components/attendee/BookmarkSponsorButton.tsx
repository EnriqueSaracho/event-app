"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import {
  bookmarkSponsor,
  isSponsorBookmarked,
  unbookmarkSponsor,
} from "@/lib/demo-visitor/sponsor-bookmarks";

type BookmarkSponsorButtonProps = {
  sponsorId: string;
  layout?: "inline" | "rail";
};

export function BookmarkSponsorButton({
  sponsorId,
  layout = "inline",
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

  const button = (
    <Button
      variant={bookmarked ? "secondary" : "accent"}
      onClick={toggleBookmark}
      disabled={!isReady || !visitorId || loading || !initialized}
      aria-pressed={bookmarked}
      className={layout === "rail" ? "w-full" : undefined}
    >
      {loading ? "Saving…" : bookmarked ? "Bookmarked" : "Bookmark sponsor"}
    </Button>
  );

  if (layout === "rail") {
    return (
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Quick actions</p>
        <p className="text-sm text-muted">
          Save this sponsor to revisit their profile during the event.
        </p>
        {button}
      </Card>
    );
  }

  return button;
}
