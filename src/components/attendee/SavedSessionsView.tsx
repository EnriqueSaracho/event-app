"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SavedSessionWithSession } from "@/lib/supabase/types";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import {
  fetchSavedSessions,
  unsaveSession,
} from "@/lib/demo-visitor/saved-sessions";
import { findOverlappingSessionPairs } from "@/lib/sessions/overlap";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { formatSessionTime } from "@/lib/format/datetime";

export function SavedSessionsView() {
  const { visitorId, isReady, error: visitorError } = useDemoVisitor();
  const [saved, setSaved] = useState<SavedSessionWithSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !visitorId) return;

    let cancelled = false;

    void fetchSavedSessions(visitorId)
      .then((data) => {
        if (!cancelled) {
          setSaved(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load saved sessions.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isReady, visitorId]);

  const sessions = useMemo(
    () =>
      saved
        .map((item) => item.session)
        .filter((s): s is NonNullable<typeof s> => s != null),
    [saved],
  );

  const overlapPairs = useMemo(
    () => findOverlappingSessionPairs(sessions),
    [sessions],
  );

  const overlappingIds = useMemo(() => {
    const ids = new Set<string>();
    for (const [a, b] of overlapPairs) {
      ids.add(a);
      ids.add(b);
    }
    return ids;
  }, [overlapPairs]);

  const sessionTitleById = useMemo(() => {
    const map = new Map<string, string>();
    for (const session of sessions) {
      map.set(session.id, session.title);
    }
    return map;
  }, [sessions]);

  async function handleRemove(sessionId: string) {
    if (!visitorId) return;
    setRemovingId(sessionId);
    try {
      await unsaveSession(visitorId, sessionId);
      setSaved((prev) => prev.filter((item) => item.session_id !== sessionId));
    } catch {
      setError("Could not remove session.");
    } finally {
      setRemovingId(null);
    }
  }

  if (visitorError) {
    return <ErrorMessage message={visitorError} />;
  }

  if (!isReady || loading) {
    return (
      <>
        <PageHeader
          title="Saved sessions"
          description="Your personal agenda for the conference."
        />
        <PageLoadingSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Saved sessions" />
        <ErrorMessage message={error} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Saved sessions"
        description="Your personal agenda for the conference."
      />

      {overlapPairs.length > 0 ? (
        <div
          className="mb-6 rounded-lg border border-warning-border bg-warning-bg px-4 py-4 lg:px-6"
          role="alert"
        >
          <p className="font-semibold text-warning">Schedule conflict</p>
          <p className="mt-1 text-sm text-foreground/80">
            Some saved sessions overlap in time:
          </p>
          <ul className="mt-3 space-y-1 text-sm lg:columns-2 lg:gap-8">
            {overlapPairs.map(([a, b]) => (
              <li key={`${a}-${b}`} className="break-inside-avoid">
                {sessionTitleById.get(a) ?? "Session"} and{" "}
                {sessionTitleById.get(b) ?? "Session"}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {saved.length === 0 ? (
        <EmptyState
          title="No saved sessions yet"
          description="Browse the agenda and save sessions you want to attend."
          action={
            <Link href="/agenda">
              <Button variant="accent">Browse agenda</Button>
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {saved.map((item) => {
            const session = item.session;
            if (!session) return null;
            const hasOverlap = overlappingIds.has(session.id);

            return (
              <li key={item.id}>
                <Card
                  className={`lg:flex lg:items-center lg:gap-6 lg:py-3 ${
                    hasOverlap ? "border-warning-border bg-warning-bg/40" : ""
                  }`}
                >
                  <div className="lg:w-40 lg:shrink-0">
                    <p className="text-xs font-semibold text-accent lg:text-sm">
                      {formatSessionTime(
                        session.starts_at,
                        session.ends_at,
                      )}
                    </p>
                  </div>
                  <div className="mt-2 min-w-0 flex-1 lg:mt-0">
                    <Link href={`/sessions/${session.id}`}>
                      <h3 className="font-medium text-foreground hover:text-primary">
                        {session.title}
                      </h3>
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <CategoryBadge category={session.category} />
                      {hasOverlap ? (
                        <span className="text-xs font-medium text-warning">
                          Overlaps with another session
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0 lg:shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(session.id)}
                      disabled={removingId === session.id}
                      aria-label={`Remove ${session.title} from saved`}
                    >
                      {removingId === session.id ? "…" : "Remove"}
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
