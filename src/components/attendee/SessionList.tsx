"use client";

import Link from "next/link";
import type { Session } from "@/lib/supabase/types";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Card } from "@/components/ui/Card";
import { formatSessionTime } from "@/lib/format/datetime";

type SessionListProps = {
  sessions: Session[];
};

export function SessionList({ sessions }: SessionListProps) {
  if (sessions.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-3 lg:space-y-2">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link href={`/sessions/${session.id}`}>
            <Card className="transition-colors hover:border-primary/30 hover:bg-surface-muted/30 lg:flex lg:items-center lg:gap-6 lg:py-3">
              <div className="lg:w-36 lg:shrink-0">
                <p className="text-xs font-semibold text-accent lg:text-sm">
                  {formatSessionTime(session.starts_at, session.ends_at)}
                </p>
              </div>
              <div className="mt-2 min-w-0 flex-1 lg:mt-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-foreground">{session.title}</h3>
                  <CategoryBadge category={session.category} />
                </div>
                <p className="mt-1 text-sm text-muted line-clamp-2 lg:line-clamp-1">
                  {session.summary}
                </p>
                <p className="mt-1 text-xs text-muted lg:hidden">
                  {session.location}
                </p>
              </div>
              <p className="mt-2 hidden text-sm text-muted lg:block lg:w-32 lg:shrink-0">
                {session.location}
              </p>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
