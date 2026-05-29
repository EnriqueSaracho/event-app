import { listMembers } from "@/lib/supabase/queries/members";
import { safeQuery } from "@/lib/safe-query";
import { MembersView } from "@/components/attendee/MembersView";
import { PageHeader } from "@/components/ui/PageHeader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default async function MembersPage() {
  const result = await safeQuery(() => listMembers());

  if (!result.ok) {
    return (
      <>
        <PageHeader title="Member directory" />
        <ErrorMessage message="Could not load members." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Member directory"
        description="Connect with fellow conference attendees."
      />
      <MembersView members={result.data} />
    </>
  );
}
