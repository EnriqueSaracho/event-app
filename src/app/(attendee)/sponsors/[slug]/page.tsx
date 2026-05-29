import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsorBySlug } from "@/lib/supabase/queries/sponsors";
import { safeQuery } from "@/lib/safe-query";
import { Badge } from "@/components/ui/Badge";
import { BookmarkSponsorButton } from "@/components/attendee/BookmarkSponsorButton";

type SponsorProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SponsorProfilePage({
  params,
}: SponsorProfilePageProps) {
  const { slug } = await params;
  const result = await safeQuery(() => getSponsorBySlug(slug));

  if (!result.ok) {
    notFound();
  }

  const sponsor = result.data;

  return (
    <article className="space-y-6">
      <div>
        <Link
          href="/sponsors"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to sponsors
        </Link>
      </div>

      <header>
        <h1 className="text-2xl font-semibold text-primary">{sponsor.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {sponsor.categories.map((cat) => (
            <Badge key={cat} className="bg-primary/10 text-primary">
              {cat}
            </Badge>
          ))}
        </div>
        {sponsor.booth_location ? (
          <p className="mt-3 text-sm text-muted">
            Booth {sponsor.booth_location}
          </p>
        ) : null}
      </header>

      <BookmarkSponsorButton sponsorId={sponsor.id} />

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          Overview
        </h2>
        <p className="leading-relaxed text-foreground/90">{sponsor.overview}</p>
      </section>
    </article>
  );
}
