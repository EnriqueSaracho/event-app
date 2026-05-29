import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsorBySlug } from "@/lib/supabase/queries/sponsors";
import { safeQuery } from "@/lib/safe-query";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
    <article>
      <div className="mb-6">
        <Link
          href="/sponsors"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to sponsors
        </Link>
      </div>

      <header className="mb-8 rounded-lg border border-border bg-surface-muted/50 px-5 py-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-foreground lg:text-3xl">
          {sponsor.name}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {sponsor.categories.map((cat) => (
            <Badge
              key={cat}
              className="bg-primary/10 text-primary ring-1 ring-primary/10"
            >
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

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
        <section>
          <h2 className="section-label mb-2">Overview</h2>
          <p className="leading-relaxed text-foreground/90">
            {sponsor.overview}
          </p>
        </section>

        <aside className="mt-6 space-y-4 lg:sticky lg:top-6 lg:mt-0">
          <div className="lg:hidden">
            <BookmarkSponsorButton sponsorId={sponsor.id} />
          </div>
          <div className="hidden lg:block">
            <BookmarkSponsorButton sponsorId={sponsor.id} layout="rail" />
          </div>
          {sponsor.booth_location ? (
            <Card variant="muted">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Location
              </p>
              <p className="mt-1 font-medium text-foreground">
                Booth {sponsor.booth_location}
              </p>
            </Card>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
