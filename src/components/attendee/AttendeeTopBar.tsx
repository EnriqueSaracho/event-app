import { formatEventDateRange } from "@/lib/format/datetime";

type AttendeeTopBarProps = {
  eventName?: string;
  startsOn?: string;
  endsOn?: string;
  venueName?: string;
};

export function AttendeeTopBar({
  eventName,
  startsOn,
  endsOn,
  venueName,
}: AttendeeTopBarProps) {
  if (!eventName) return null;

  const dateRange =
    startsOn && endsOn ? formatEventDateRange(startsOn, endsOn) : null;

  return (
    <header className="hidden border-b border-border bg-surface px-8 py-4 lg:block">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{eventName}</h1>
          {(dateRange || venueName) && (
            <p className="mt-0.5 text-sm text-muted">
              {[dateRange, venueName].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <span className="rounded-md bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          In event
        </span>
      </div>
    </header>
  );
}
