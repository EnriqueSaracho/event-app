import type { SessionCategory } from "@/lib/supabase/types";
import { Badge } from "./Badge";

const categoryConfig: Record<
  SessionCategory,
  { label: string; dotClass: string; className: string }
> = {
  keynote: {
    label: "Keynote",
    dotClass: "bg-purple-500",
    className: "bg-purple-50 text-purple-900 ring-1 ring-purple-200/60",
  },
  workshop: {
    label: "Workshop",
    dotClass: "bg-blue-500",
    className: "bg-blue-50 text-blue-900 ring-1 ring-blue-200/60",
  },
  panel: {
    label: "Panel",
    dotClass: "bg-teal-500",
    className: "bg-teal-50 text-teal-900 ring-1 ring-teal-200/60",
  },
  networking: {
    label: "Networking",
    dotClass: "bg-amber-500",
    className: "bg-amber-50 text-amber-900 ring-1 ring-amber-200/60",
  },
  social: {
    label: "Social",
    dotClass: "bg-rose-500",
    className: "bg-rose-50 text-rose-900 ring-1 ring-rose-200/60",
  },
};

export function CategoryBadge({ category }: { category: SessionCategory }) {
  const config = categoryConfig[category];
  return (
    <Badge className={config.className}>
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${config.dotClass}`}
        aria-hidden
      />
      {config.label}
    </Badge>
  );
}

export const SESSION_CATEGORIES: SessionCategory[] = [
  "keynote",
  "workshop",
  "panel",
  "networking",
  "social",
];

export function categoryLabel(category: SessionCategory): string {
  return categoryConfig[category].label;
}

export function categoryDotClass(category: SessionCategory): string {
  return categoryConfig[category].dotClass;
}
