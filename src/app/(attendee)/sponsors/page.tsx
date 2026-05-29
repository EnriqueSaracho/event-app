import { listSponsors } from "@/lib/supabase/queries/sponsors";
import { safeQuery } from "@/lib/safe-query";
import { SponsorsView } from "@/components/attendee/SponsorsView";
import { PageHeader } from "@/components/ui/PageHeader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default async function SponsorsPage() {
  const result = await safeQuery(() => listSponsors());

  if (!result.ok) {
    return (
      <>
        <PageHeader title="Sponsors & exhibitors" />
        <ErrorMessage message="Could not load sponsors." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Sponsors & exhibitors"
        description="Discover partners supporting the conference."
      />
      <SponsorsView sponsors={result.data} />
    </>
  );
}
