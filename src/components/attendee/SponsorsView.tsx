"use client";

import { useMemo, useState } from "react";
import type { Sponsor } from "@/lib/supabase/types";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FilterChip } from "@/components/ui/FilterChip";
import { EmptyState } from "@/components/ui/EmptyState";

type SponsorsViewProps = {
  sponsors: Sponsor[];
};

export function SponsorsView({ sponsors }: SponsorsViewProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    for (const sponsor of sponsors) {
      for (const c of sponsor.categories) cats.add(c);
    }
    return [...cats].sort();
  }, [sponsors]);

  const filtered = sponsors.filter((sponsor) => {
    const matchesSearch =
      search.trim() === "" ||
      sponsor.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === null || sponsor.categories.includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search sponsors…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
        aria-label="Search sponsors"
      />

      {allCategories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={category === null}
            onClick={() => setCategory(null)}
          />
          {allCategories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState
          title="No sponsors found"
          description="Try adjusting your search or filter."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((sponsor) => (
            <li key={sponsor.id}>
              <Link href={`/sponsors/${sponsor.slug}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <h3 className="font-medium text-foreground">{sponsor.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {sponsor.categories.map((cat) => (
                      <Badge
                        key={cat}
                        className="bg-surface-muted text-foreground"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  {sponsor.booth_location ? (
                    <p className="mt-2 text-sm text-muted">
                      Booth {sponsor.booth_location}
                    </p>
                  ) : null}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
