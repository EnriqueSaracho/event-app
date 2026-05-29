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
    <article>
      <div className="mb-6">
        <Link
          href="/agenda"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to agenda
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
        <div className="space-y-6">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={session.category} />
              <span className="text-sm text-muted">
                {formatDayLabel(session.conference_day)}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-foreground lg:text-3xl">
              {session.title}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {formatSessionDate(session.starts_at)} ·{" "}
              {formatSessionTime(session.starts_at, session.ends_at)}
            </p>
            <p className="mt-1 text-sm text-muted">{session.location}</p>
          </header>

          <div className="lg:hidden">
            <SaveSessionButton sessionId={session.id} />
          </div>

          <section>
            <h2 className="section-label mb-2">Overview</h2>
            <p className="leading-relaxed text-foreground/90">
              {session.summary}
            </p>
          </section>

          <section>
            <h2 className="section-label mb-2">Resources</h2>
            <Card variant="muted" className="border-dashed">
              <p className="text-sm text-muted">
                Session materials and slides will appear here.
              </p>
            </Card>
          </section>
        </div>

        <aside className="mt-6 hidden lg:sticky lg:top-6 lg:mt-0 lg:block">
          <SaveSessionButton sessionId={session.id} layout="rail" />
        </aside>
      </div>
    </article>
  );
}
