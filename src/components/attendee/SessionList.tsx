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
    <ul className="space-y-3">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link href={`/sessions/${session.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted">
                    {formatSessionTime(session.starts_at, session.ends_at)}
                  </p>
                  <h3 className="mt-1 font-medium text-foreground">
                    {session.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {session.summary}
                  </p>
                </div>
                <CategoryBadge category={session.category} />
              </div>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
