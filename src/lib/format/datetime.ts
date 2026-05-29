const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-CA", {
  hour: "numeric",
  minute: "2-digit",
});

export function formatEventDateRange(startsOn: string, endsOn: string): string {
  const start = dateFormatter.format(new Date(`${startsOn}T12:00:00`));
  const end = dateFormatter.format(new Date(`${endsOn}T12:00:00`));
  if (startsOn === endsOn) return start;
  return `${start} – ${end}`;
}

export function formatSessionTime(startsAt: string, endsAt: string): string {
  const start = timeFormatter.format(new Date(startsAt));
  const end = timeFormatter.format(new Date(endsAt));
  return `${start} – ${end}`;
}

export function formatSessionDate(startsAt: string): string {
  return dateFormatter.format(new Date(startsAt));
}

export function formatDayLabel(conferenceDay: number): string {
  return `Day ${conferenceDay}`;
}
