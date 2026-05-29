"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Session, SessionCategory } from "@/lib/supabase/types";
import { FilterChip } from "@/components/ui/FilterChip";
import {
  categoryLabel,
  SESSION_CATEGORIES,
} from "@/components/ui/CategoryBadge";
import { SessionList } from "./SessionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDayLabel } from "@/lib/format/datetime";
import { getDistinctConferenceDays } from "@/lib/agenda/next-up";

type AgendaViewProps = {
  sessions: Session[];
};

export function AgendaView({ sessions }: AgendaViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const days = getDistinctConferenceDays(sessions);

  const dayParam = searchParams.get("day");
  const categoryParam = searchParams.get("category") as SessionCategory | null;

  const selectedDay =
    dayParam !== null ? Number(dayParam) : (days[0] ?? null);
  const selectedCategory = categoryParam ?? null;

  const filtered = sessions.filter((session) => {
    if (selectedDay !== null && session.conference_day !== selectedDay) {
      return false;
    }
    if (selectedCategory && session.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  function updateParams(updates: { day?: number | null; category?: string | null }) {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.day !== undefined) {
      if (updates.day === null) params.delete("day");
      else params.set("day", String(updates.day));
    }
    if (updates.category !== undefined) {
      if (updates.category === null) params.delete("category");
      else params.set("category", updates.category);
    }
    router.replace(`/agenda?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <FilterChip
            key={day}
            label={formatDayLabel(day)}
            active={selectedDay === day}
            onClick={() => updateParams({ day })}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="All categories"
          active={selectedCategory === null}
          onClick={() => updateParams({ category: null })}
        />
        {SESSION_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={categoryLabel(category)}
            active={selectedCategory === category}
            onClick={() => updateParams({ category })}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No sessions match your filters"
          description="Try a different day or category."
        />
      ) : (
        <SessionList sessions={filtered} />
      )}
    </div>
  );
}
