import type { SessionCategory } from "@/lib/supabase/types";
import { Badge } from "./Badge";

const categoryConfig: Record<
  SessionCategory,
  { label: string; className: string }
> = {
  keynote: { label: "Keynote", className: "bg-purple-100 text-purple-800" },
  workshop: { label: "Workshop", className: "bg-blue-100 text-blue-800" },
  panel: { label: "Panel", className: "bg-teal-100 text-teal-800" },
  networking: {
    label: "Networking",
    className: "bg-amber-100 text-amber-800",
  },
  social: { label: "Social", className: "bg-rose-100 text-rose-800" },
};

export function CategoryBadge({ category }: { category: SessionCategory }) {
  const config = categoryConfig[category];
  return <Badge className={config.className}>{config.label}</Badge>;
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
