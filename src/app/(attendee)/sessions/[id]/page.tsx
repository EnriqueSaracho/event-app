import Link from "next/link";
import { notFound } from "next/navigation";
import { getSessionById } from "@/lib/supabase/queries/agenda";
import { safeQuery } from "@/lib/safe-query";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Card } from "@/components/ui/Card";
import { SaveSessionButton } from "@/components/attendee/SaveSessionButton";
import {
  formatDayLabel,
  formatSessionDate,
  formatSessionTime,
} from "@/lib/format/datetime";

type SessionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  const result = await safeQuery(() => getSessionById(id));

  if (!result.ok) {
    notFound();
  }

  const session = result.data;

  return (
    <article className="space-y-6">
      <div>
        <Link
          href="/agenda"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to agenda
        </Link>
      </div>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={session.category} />
          <span className="text-sm text-muted">
            {formatDayLabel(session.conference_day)}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-primary">
          {session.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {formatSessionDate(session.starts_at)} ·{" "}
          {formatSessionTime(session.starts_at, session.ends_at)}
        </p>
        <p className="mt-1 text-sm text-muted">{session.location}</p>
      </header>

      <SaveSessionButton sessionId={session.id} />

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          Overview
        </h2>
        <p className="leading-relaxed text-foreground/90">{session.summary}</p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          Resources
        </h2>
        <Card className="border-dashed bg-surface-muted">
          <p className="text-sm text-muted">
            Session materials and slides will appear here.
          </p>
        </Card>
      </section>
    </article>
  );
}
