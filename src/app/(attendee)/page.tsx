import Link from "next/link";
import {
  DEMO_EVENT_ID,
  DEMO_EVENT_SLUG,
} from "@/lib/supabase/constants";
import { getEventBySlug, getSessionsForEvent } from "@/lib/supabase/queries/agenda";
import { getNextUpSession } from "@/lib/agenda/next-up";
import {
  formatEventDateRange,
  formatSessionTime,
} from "@/lib/format/datetime";
import { safeQuery } from "@/lib/safe-query";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Card } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SavedCountWidget } from "@/components/attendee/SavedCountWidget";

export default async function HomePage() {
  const eventResult = await safeQuery(() => getEventBySlug(DEMO_EVENT_SLUG));

  if (!eventResult.ok) {
    return (
      <ErrorMessage
        title="Could not load event"
        message="Check your connection and try again."
      />
    );
  }

  const event = eventResult.data;
  const sessionsResult = await safeQuery(() =>
    getSessionsForEvent(DEMO_EVENT_ID),
  );
  const sessions = sessionsResult.ok ? sessionsResult.data : [];
  const nextUp = getNextUpSession(sessions);

  const quickLinks = [
    { href: "/agenda", label: "Agenda", description: "Browse all sessions" },
    {
      href: "/sponsors",
      label: "Sponsors",
      description: "Exhibitors & partners",
    },
    {
      href: "/members",
      label: "Members",
      description: "Conference directory",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-accent">Member conference</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
          {event.name}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {formatEventDateRange(event.starts_on, event.ends_on)} ·{" "}
          {event.venue_name}
        </p>
        {event.summary ? (
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            {event.summary}
          </p>
        ) : null}
      </header>

      {nextUp ? (
        <section aria-labelledby="next-up-heading">
          <h2
            id="next-up-heading"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
          >
            Next up
          </h2>
          <Link href={`/sessions/${nextUp.id}`}>
            <Card className="border-primary/20 bg-surface-muted transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-muted">
                    {formatSessionTime(nextUp.starts_at, nextUp.ends_at)}
                  </p>
                  <h3 className="mt-1 font-medium text-foreground">
                    {nextUp.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{nextUp.location}</p>
                </div>
                <CategoryBadge category={nextUp.category} />
              </div>
            </Card>
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="quick-links-heading">
        <h2
          id="quick-links-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Quick links
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <p className="font-medium text-foreground">{link.label}</p>
                <p className="mt-1 text-xs text-muted">{link.description}</p>
              </Card>
            </Link>
          ))}
          <Card className="opacity-60">
            <p className="font-medium text-foreground">Resources</p>
            <p className="mt-1 text-xs text-muted">Coming soon</p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="saved-heading">
        <h2
          id="saved-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Your schedule
        </h2>
        <SavedCountWidget />
      </section>
    </div>
  );
}
