"use client";

import { useState } from "react";
import type { Member, MemberRole } from "@/lib/supabase/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FilterChip } from "@/components/ui/FilterChip";
import { EmptyState } from "@/components/ui/EmptyState";

const ROLES: { value: MemberRole | null; label: string }[] = [
  { value: null, label: "All roles" },
  { value: "attendee", label: "Attendee" },
  { value: "speaker", label: "Speaker" },
  { value: "board_member", label: "Board member" },
  { value: "staff", label: "Staff" },
];

const roleLabels: Record<MemberRole, string> = {
  attendee: "Attendee",
  speaker: "Speaker",
  board_member: "Board member",
  staff: "Staff",
};

type MembersViewProps = {
  members: Member[];
};

export function MembersView({ members }: MembersViewProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<MemberRole | null>(null);

  const filtered = members.filter((member) => {
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      member.display_name.toLowerCase().includes(q) ||
      member.organization_name.toLowerCase().includes(q);
    const matchesRole = role === null || member.role === role;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search by name or organization…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
        aria-label="Search members"
      />

      <div className="flex flex-wrap gap-2">
        {ROLES.map(({ value, label }) => (
          <FilterChip
            key={label}
            label={label}
            active={role === value}
            onClick={() => setRole(value)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Try adjusting your search or role filter."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((member) => (
            <li key={member.id}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {member.display_name}
                    </h3>
                    <p className="text-sm text-muted">
                      {member.organization_name}
                    </p>
                  </div>
                  <Badge className="shrink-0 bg-primary/10 text-primary">
                    {roleLabels[member.role]}
                  </Badge>
                </div>
                {member.affiliation_tag ? (
                  <p className="mt-2 text-xs text-muted">
                    {member.affiliation_tag}
                  </p>
                ) : null}
                {member.bio ? (
                  <p className="mt-2 text-sm text-foreground/80">
                    {member.bio}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
