import { Suspense } from "react";
import { DEMO_EVENT_ID } from "@/lib/supabase/constants";
import { getSessionsForEvent } from "@/lib/supabase/queries/agenda";
import { safeQuery } from "@/lib/safe-query";
import { AgendaView } from "@/components/attendee/AgendaView";
import { PageHeader } from "@/components/ui/PageHeader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default async function AgendaPage() {
  const result = await safeQuery(() => getSessionsForEvent(DEMO_EVENT_ID));

  if (!result.ok) {
    return (
      <>
        <PageHeader title="Agenda" />
        <ErrorMessage message="Could not load the agenda." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Agenda"
        description="Browse sessions across all conference days."
      />
      <Suspense fallback={<PageLoadingSkeleton />}>
        <AgendaView sessions={result.data} />
      </Suspense>
    </>
  );
}
