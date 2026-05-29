"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import { fetchSavedSessions } from "@/lib/demo-visitor/saved-sessions";
import { Card } from "@/components/ui/Card";

export function SavedCountWidget() {
  const { visitorId, isReady } = useDemoVisitor();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isReady || !visitorId) return;

    let cancelled = false;
    fetchSavedSessions(visitorId)
      .then((saved) => {
        if (!cancelled) setCount(saved.length);
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, [isReady, visitorId]);

  return (
    <Link href="/saved">
      <Card className="transition-colors hover:border-primary/30 hover:bg-surface-muted/30">
        <p className="section-label">Your schedule</p>
        <p className="mt-2 text-3xl font-semibold text-primary">
          {count === null ? "—" : count}
        </p>
        <p className="mt-1 text-sm text-muted">
          saved session{count === 1 ? "" : "s"}
        </p>
      </Card>
    </Link>
  );
}
