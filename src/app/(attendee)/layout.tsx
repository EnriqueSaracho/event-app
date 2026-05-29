import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import { DemoVisitorProvider } from "@/lib/demo-visitor/DemoVisitorProvider";
import { DEMO_EVENT_SLUG } from "@/lib/supabase/constants";
import { getEventBySlug } from "@/lib/supabase/queries/agenda";
import { safeQuery } from "@/lib/safe-query";

export default async function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventResult = await safeQuery(() => getEventBySlug(DEMO_EVENT_SLUG));
  const event = eventResult.ok ? eventResult.data : null;

  return (
    <DemoVisitorProvider>
      <AttendeeShell
        eventName={event?.name}
        startsOn={event?.starts_on}
        endsOn={event?.ends_on}
        venueName={event?.venue_name ?? undefined}
      >
        {children}
      </AttendeeShell>
    </DemoVisitorProvider>
  );
}
