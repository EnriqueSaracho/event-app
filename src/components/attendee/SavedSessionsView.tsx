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
          className="mb-4 rounded-xl border border-warning-border bg-warning-bg px-4 py-3"
          role="alert"
        >
          <p className="font-medium text-warning">Schedule conflict</p>
          <p className="mt-1 text-sm text-foreground/80">
            Some saved sessions overlap in time:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {overlapPairs.map(([a, b]) => (
              <li key={`${a}-${b}`}>
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
              <Button>Browse agenda</Button>
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
                  className={
                    hasOverlap ? "border-warning-border bg-warning-bg/30" : ""
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <Link href={`/sessions/${session.id}`}>
                        <p className="text-xs font-medium text-muted">
                          {formatSessionTime(
                            session.starts_at,
                            session.ends_at,
                          )}
                        </p>
                        <h3 className="mt-1 font-medium text-foreground hover:text-primary">
                          {session.title}
                        </h3>
                      </Link>
                      <div className="mt-2">
                        <CategoryBadge category={session.category} />
                      </div>
                      {hasOverlap ? (
                        <p className="mt-2 text-xs font-medium text-warning">
                          Overlaps with another saved session
                        </p>
                      ) : null}
                    </div>
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
