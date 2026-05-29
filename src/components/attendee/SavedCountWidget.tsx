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
      <Card className="transition-shadow hover:shadow-md">
        <p className="text-sm font-medium text-muted">Saved sessions</p>
        <p className="mt-1 text-2xl font-semibold text-primary">
          {count === null ? "—" : count}
        </p>
      </Card>
    </Link>
  );
}
